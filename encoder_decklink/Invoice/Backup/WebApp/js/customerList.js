function initGrid() {
    var t = Public.setGrid(),
    e = ["操作", "客户编号", "客户名称", "联系人", "手机", "座机", "QQ/MSN", "地址", "期初应收款", "期初预收款"],
    i = !(parent.SYSTEM.isAdmin || parent.SYSTEM.rights.AMOUNT_OUTAMOUNT),
    r = [{
        name: "operate",
        width: 60,
        fixed: !0,
        formatter: Public.operFmatter,
        title: !1
    },
    /*{
        name: "customerType",
        index: "customerType",
        width: 100,
        title: !1
    },*/
    {
        name: "number",
        index: "number",
        width: 100,
        title: !1
    },
    {
        name: "name",
        index: "name",
        width: 220,
        classes: "ui-ellipsis"
    },
    {
        name: "contacter",
        index: "contacter",
        width: 100,
        align: "center",
        //formatter: format.contacter,
        classes: "ui-ellipsis"
    },
    {
        name: "mobile",
        index: "mobile",
        width: 100,
        //formatter: format.mobile,
        align: "center",
        title: !1
    },
    {
        name: "telephone",
        index: "telephone",
        width: 100,
        //formatter: format.telephone,
        title: !1
    },
    {
        name: "linkIm",
        index: "linkIm",
        width: 100,
        //formatter: format.linkIm,
        title: !1
    },
    {
        name: "address",
        index: "address",
        width: 100,
        //formatter: format.telephone,
        title: !1
    },
    {
        name: "receivable",
        index: "receivable",
        width: 100,
        //formatter: format.telephone,
        title: !1
    },
    {
        name: "preReceived",
        index: "preReceived",
        width: 100,
        //formatter: format.linkIm,
        title: !1
    }
    /*
    {
    name: "difMoney",
    index: "amount",
    width: 100,
    align: "right",
    formatter: function (t, e, i) {
    return format.money(i.amount - i.periodMoney)
    },
    title: !1,
    hidden: i
    },
    {
    name: "firstLink",
    index: "firstLink",
    formatter: function (t) {
    return t ? t.address : "&#160;"
    },
    title: !1
    }
    */];
    $("#grid").jqGrid({
        url: "../basedata/contact.aspx?action=list&isDelete=2",
        datatype: "json",
        autowidth: !0,
        height: t.h,
        altRows: !0,
        gridview: !0,
        onselectrow: !1,
        multiselect: !0,
        colNames: e,
        colModel: r,
        pager: "#page",
        viewrecords: !0,
        cmTemplate: {
            sortable: !1
        },
        page: 1,
        rowNum: 1e3,
        shrinkToFit: !1,
        jsonReader: {
            root: "data.items",
            records: "data.totalsize",
            repeatitems: !1,
            id: "id"
        },
        loadComplete: function (t) {
            if (t && 200 == t.status) {
                var e = {};
                t = t.data;
                for (var i = 0; i < t.items.length; i++) {
                    var r = t.items[i];
                    e[r.id] = r
                }
                $("#grid").data("gridData", e)
            } else {
                var a = 250 === t.status ? searchFlag ? "没有满足条件的结果哦！" : "没有客户数据哦！" : t.msg;
                parent.Public.tips({
                    type: 2,
                    content: a
                })
            }
        },
        loadError: function () {
            parent.Public.tips({
                type: 1,
                content: "操作失败了哦，请检查您的网络链接！"
            })
        }
    })
}
function initEvent() {
    $_matchCon = $("#matchCon");
    $_matchCon.placeholder();
    $("#search").on("click",
    function (t) {
        
        t.preventDefault();
        var e = "按客户编号，客户名称，联系人，电话等查询" === $_matchCon.val() ? "" : $.trim($_matchCon.val());
        $("#grid").jqGrid("setGridParam", {
            postData: {
                skey: e
            }
        }).trigger("reloadGrid")
    });
    $("#btn-add").on("click",
    function (t) {
        t.preventDefault();
        Business.verifyRight("BU_ADD") && handle.operate("add")
    });
    $("#btn-print").on("click",
    function (t) {
        t.preventDefault()
    });
    $("#btn-import").on("click",
    function (t) {
        t.preventDefault();
        Business.verifyRight("BaseData_IMPORT") && parent.$.dialog({
            width: 560,
            height: 300,
            title: "批量导入",
            content: "url:/import.aspx",
            lock: !0
        })
    });
    $("#btn-export").on("click",
    function () {
        var t = "按客户编号，客户名称，联系人，电话等查询" === $_matchCon.val() ? "" : $.trim($_matchCon.val());
        $(this).attr("href", "/basedata/customer.aspx?action=exporter&isDelete=2&skey=" + t)
    });
    $("#grid").on("click", ".operating .ui-icon-pencil",
    function (t) {
        t.preventDefault();
        if (Business.verifyRight("BU_UPDATE")) {
            var e = $(this).parent().data("id");
            handle.operate("edit", e)
        }
    });
    $("#grid").on("click", ".operating .ui-icon-trash",
    function (t) {
        t.preventDefault();
        if (Business.verifyRight("BU_DELETE")) {
            var e = $(this).parent().data("id");
            handle.del(e + "")
        }
    });
    $("#btn-batchDel").click(function (t) {
        t.preventDefault();
        if (Business.verifyRight("BU_DELETE")) {
            var e = $("#grid").jqGrid("getGridParam", "selarrrow");
            e.length ? handle.del(e.join()) : parent.Public.tips({
                type: 2,
                content: "请选择需要删除的项"
            })
        }
    });
    $(window).resize(function () {
        Public.resizeGrid()
    })
}
var searchFlag = !1,
filterClassCombo, handle = {
    operate: function (t, e) {
        if ("add" == t) var i = "新增客户",
        r = {
            oper: t,
            callback: this.callback
        };
        else var i = "修改客户",
        r = {
            oper: t,
            rowId: e,
            callback: this.callback
        };
        $.dialog({
            title: i,
            content: "url:./settings/customer-manage.aspx",
            data: r,
            width: 640,
            height: 422,
            max: !1,
            min: !1,
            cache: !1,
            lock: !0
        })
    },
    del: function (t) {
        $.dialog.confirm("删除的客户将不能恢复，请确认是否删除？",
        function () {
            Public.ajaxPost("../basedata/contact.aspx?action=delete", {
                id: t
            },
            function (e) {
                if (e && 200 == e.status) {
                    var i = e.data.id || [];
                    parent.Public.tips(t.split(",").length === i.length ? {
                        content: "成功删除" + i.length + "个客户！"
                    } : {
                        type: 2,
                        content: e.data.msg
                    });
                    for (var r = 0,
                    a = i.length; a > r; r++) {
                        $("#grid").jqGrid("setSelection", i[r]);
                        $("#grid").jqGrid("delRowData", i[r])
                    }
                } else parent.Public.tips({
                    type: 1,
                    content: "删除客户失败！" + e.msg
                })
            })
        })
    },
    callback: function (t, e, i) {
        var r = $("#grid").data("gridData");
        if (!r) {
            r = {};
            $("#grid").data("gridData", r)
        }
        t.difMoney = t.amount - t.periodMoney;
        r[t.id] = t;
        if ("edit" == e) {
            $("#grid").jqGrid("setRowData", t.id, t);
            i && i.api.close()
        } else {
            $("#grid").jqGrid("addRowData", t.id, t, "last");
            i && i.resetForm(t)
        }
    }
},
format = {
    contacter: function (t, e, i) {
        if (!i.firstLink) return "&#160;";
        t = i.firstLink.name;
        return t ? t : "&#160;"
    },
    mobile: function (t, e, i) {
        if (!i.firstLink) return "&#160;";
        t = i.firstLink.mobile;
        return t ? t : "&#160;"
    },
    telephone: function (t, e, i) {
        if (!i.firstLink) return "&#160;";
        t = i.firstLink.phone;
        return t ? t : "&#160;"
    },
    linkIm: function (t, e, i) {
        if (!i.firstLink) return "&#160;";
        t = i.firstLink.im;
        return t ? t : "&#160;"
    },
    money: function (t) {
        var t = Public.numToCurrency(t);
        return t || "&#160;"
    }
};
initGrid();
initEvent();