var queryConditions = {
    matchCon: ""
},
SYSTEM = system = parent.SYSTEM,
hiddenAmount = !1,
billRequiredCheck = system.billRequiredCheck,
THISPAGE = {
    init: function () {
        SYSTEM.isAdmin !== !1 || SYSTEM.rights.AMOUNT_OUTAMOUNT || (hiddenAmount = !0);
        this.initDom();
        this.loadGrid();
        this.addEvent()
    },
    initDom: function () {
        this.$_matchCon = $("#matchCon");
        this.$_beginDate = $("#beginDate").val(system.beginDate);
        this.$_endDate = $("#endDate").val(system.endDate);
        this.$_matchCon.placeholder();
        this.$_beginDate.datepicker();
        this.$_endDate.datepicker()
    },
    loadGrid: function () {
        function t(t, e, i) {
            var a = '<div class="operating" data-id="' + i.id + '"><a class="ui-icon ui-icon-pencil" title="修改"></a><a class="ui-icon ui-icon-trash" title="删除"></a></div>';
            return a
        }
        function e(t, e, i) {
            if (150601 === t) return "销货";
            a.markRow.push(i.id);
            return "退货"
        }
        var i = $(window).height() - $(".grid-wrap").offset().top - 65,
        a = this;
        queryConditions.beginDate = this.$_beginDate.val();
        queryConditions.endDate = this.$_endDate.val();
        a.markRow = [];
        var r = [{
            name: "operating",
            label: "操作",
            width: 60,
            fixed: !0,
            formatter: t,
            align: "center"
        },
        {
            name: "saleDate",
            label: "单据日期",
            index: "saleDate",
            width: 100,
            formatter: 'date',
            align: "center"
        },
        {
            name: "number",
            label: "单据编号",
            index: "number",
            width: 120,
            align: "center"
        },
        {
            name: "transType",
            label: "业务类别",
            //index: "transType",
            width: 100,
            formatter: e,
            align: "center"
        },
        {
            name: "customerName",
            label: "客户",
            index: "customerName",
            width: 200
        },
        {
            name: "totalAmount",
            label: "销售金额",
            hidden: hiddenAmount,
            //index: "totalAmount",
            width: 100,
            align: "right",
            formatter: "currency"
        },
        {
            name: "employeeName",
            label: "职员",
            //hidden: hiddenAmount,
            index: "employeeName",
            width: 100//,
            //align: "right",
            //formatter: "currency"
        },
        {
            name: "rpAmount",
            label: "已收款金额",
            hidden: hiddenAmount,
           // index: "rpAmount",
            width: 100,
            align: "right",
            formatter: "currency"
        },
        {
            name: "creator",
            label: "制单人",
            index: "creator",
            width: 80,
            fixed: !0,
            align: "center",
            title: !0,
            classes: "ui-ellipsis"
        },
        {
            name: "auditor",
            label: "审核人",
            //index: "auditor",
            width: 80,
            hidden: billRequiredCheck ? !1 : !0,
            fixed: !0,
            align: "center",
            title: !0,
            classes: "ui-ellipsis"
        },
        {
            name: "note",
            label: "备注",
            index: "note",
            width: 200,
            title: !0,
            classes: "ui-ellipsis"
        }];
        $("#grid").jqGrid({
            url: "../scm/invSaList.aspx?action=list",
            postData: queryConditions,
            datatype: "json",
            autowidth: !0,
            height: i,
            altRows: !0,
            gridview: !0,
            multiselect: !0,
            colModel: r,
            cmTemplate: {
                sortable: !1,
                title: !1
            },
            page: 1,
            sortname: "number",
            sortorder: "desc",
            pager: "#page",
            rowNum: 100,
            rowList: [100, 200, 500],
            viewrecords: !0,
            shrinkToFit: !1,
            forceFit: !1,
            jsonReader: {
                root: "data.rows",
                records: "data.records",
                total: "data.total",
                repeatitems: !1,
                id: "id"
            },
            loadComplete: function () {
                var t = a.markRow.length;
                if (t > 0) for (var e = 0; t > e; e++) $("#" + a.markRow[e]).addClass("red")
            },
            loadError: function () { },
            ondblClickRow: function (t) {
                $("#" + t).find(".ui-icon-pencil").trigger("click")
            }
        })
    },
    reloadData: function (t) {
        this.markRow = [];
        $("#grid").jqGrid("setGridParam", {
            url: "../scm/invSaList.aspx?action=list",
            datatype: "json",
            postData: t
        }).trigger("reloadGrid")
    },
    addEvent: function () {
        var t = this;
        $(".grid-wrap").on("click", ".ui-icon-pencil",
        function (t) {
            t.preventDefault();
            var e = $(this).parent().data("id");
            //$("#grid").jqGrid("getDataIDs");

            parent.cacheList.salesId = $("#grid").jqGrid("getDataIDs")
            parent.tab.addTabItem({
                tabid: "sales-sales",
                text: "销售单",
                url: "./scm/invSa.aspx?id=" + e + "&flag=list"
            });

        });
        $(".grid-wrap").on("click", ".ui-icon-trash",
        function (t) {
            t.preventDefault();
            if (Business.verifyRight("SA_DELETE")) {
                var e = $(this).parent().data("id");
                $.dialog.confirm("您确定要删除该销货记录吗？",
                function () {
                    Public.ajaxGet("../scm/invSaList.aspx?action=delete", {
                        id: e
                    },
                    function (t) {
                        if (200 === t.status) {
                            $("#grid").jqGrid("delRowData", e);
                            parent.Public.tips({
                                content: "删除成功！"
                            })
                        } else parent.Public.tips({
                            type: 1,
                            content: t.msg
                        })
                    })
                })
            }
        });
        $(".wrapper").on("click", "#print",
        function (t) {
            t.preventDefault();
            Business.verifyRight("PU_PRINT") && Public.print({
                title: "购货单列表",
                $grid: $("#grid"),
                pdf: "../scm/invSaList.aspx?action=toPdf",
                saleType: 10201,
                filterConditions: queryConditions
            })
        });
        if (billRequiredCheck) {
            {
                $("#audit").css("display", "inline-block"),
                $("#reAudit").css("display", "inline-block")
            }
            $(".wrapper").on("click", "#audit",
            function (t) {
                t.preventDefault();
                var e = $("#grid").jqGrid("getGridParam", "selarrrow"),
                i = e.join();
                i ? Public.ajaxPost("../scm/invSa.aspx?action=batchCheckInvSa", {
                    id: i
                },
                function (t) {
                    if (200 === t.status) {
                        for (var i = 0,
                        a = e.length; a > i; i++) $("#grid").setCell(e[i], "auditor", system.realName);
                        parent.Public.tips({
                            content: "审核成功！"
                        })
                    } else parent.Public.tips({
                        type: 1,
                        content: t.msg
                    })
                }) : parent.Public.tips({
                    type: 2,
                    content: "请先选择需要审核的项！"
                })
            });
            $(".wrapper").on("click", "#reAudit",
            function (t) {
                t.preventDefault();
                var e = $("#grid").jqGrid("getGridParam", "selarrrow"),
                i = e.join();
                i ? Public.ajaxPost("../scm/invSa.aspx?action=rsBatchCheckInvSa", {
                    id: i
                },
                function (t) {
                    if (200 === t.status) {
                        for (var i = 0,
                        a = e.length; a > i; i++) $("#grid").setCell(e[i], "auditor", "&#160;");
                        parent.Public.tips({
                            content: "反审核成功！"
                        })
                    } else parent.Public.tips({
                        type: 1,
                        content: t.msg
                    })
                }) : parent.Public.tips({
                    type: 2,
                    content: "请先选择需要反审核的项！"
                })
            })
        }
        $("#search").click(function () {
            queryConditions.matchCon = "请输入单据号或客户名或备注" === t.$_matchCon.val() ? "" : $.trim(t.$_matchCon.val());
            queryConditions.beginDate = t.$_beginDate.val();
            queryConditions.endDate = t.$_endDate.val();
            THISPAGE.reloadData(queryConditions)
        });
        $("#refresh").click(function () {
            THISPAGE.reloadData(queryConditions)
        });
        $("#add").click(function (t) {
            t.preventDefault();
            Business.verifyRight("SA_ADD") && parent.tab.addTabItem({
                tabid: "sales-sales",
                text: "销售单",
                url: "./scm/invSa.aspx?action=initSale"
            })
        });
        $(window).resize(function () {
            Public.resizeGrid()
        })
    }
};
THISPAGE.init();