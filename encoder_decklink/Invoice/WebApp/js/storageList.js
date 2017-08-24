function initEvent() {
    $("#btn-add").click(function (t) {
        t.preventDefault();
        Business.verifyRight("INVLOCTION_ADD") && handle.operate("add")
    });
    $("#btn-disable").click(function (t) {
        t.preventDefault();
        var e = $("#grid").jqGrid("getGridParam", "selarrrow").concat();
        e && 0 != e.length ? handle.setStatuses(e, !0) : parent.Public.tips({
            type: 1,
            content: " 请先选择要禁用的仓库！"
        })
    });
    $("#btn-enable").click(function (t) {
        t.preventDefault();
        var e = $("#grid").jqGrid("getGridParam", "selarrrow").concat();
        e && 0 != e.length ? handle.setStatuses(e, !1) : parent.Public.tips({
            type: 1,
            content: " 请先选择要启用的仓库！"
        })
    });
    $("#btn-import").click(function (t) {
        t.preventDefault()
    });
    $("#btn-export").click(function (t) {
        t.preventDefault()
    });
    $("#btn-print").click(function (t) {
        t.preventDefault()
    });
    $("#btn-refresh").click(function (t) {
        t.preventDefault();
        $("#grid").trigger("reloadGrid")
    });
    $("#grid").on("click", ".operating .ui-icon-pencil",
    function (t) {
        t.preventDefault();
        if (Business.verifyRight("INVLOCTION_UPDATE")) {
            var e = $(this).parent().data("id");
            handle.operate("edit", e)
        }
    });
    $("#grid").on("click", ".operating .ui-icon-trash",
    function (t) {
        t.preventDefault();
        if (Business.verifyRight("INVLOCTION_DELETE")) {
            var e = $(this).parent().data("id");
            handle.del(e)
        }
    });
    $("#grid").on("click", ".set-status",
    function (t) {
        t.preventDefault();
        if (Business.verifyRight("INVLOCTION_UPDATE")) {
            var e = $(this).data("id"),
            i = !$(this).data("delete");
            handle.setStatus(e, i)
        }
    });
    $(window).resize(function () {
        Public.resizeGrid()
    })
}
function initGrid() {
    var t = ["操作", "仓库名称", "状态"],
    e = [{
        name: "operate",
        width: 60,
        fixed: !0,
        align: "center",
        formatter: Public.operFmatter
    },
    /*{
        name: "locationNo",
        index: "locationNo",
        width: 150
    },*/
    {
        name: "name",
        index: "name",
        width: 350
    },
    {
        name: "delete",
        /*index: "delete",
        width: 100,
        formatter: statusFmatter,*/
        align: "center"
    }];
    $("#grid").jqGrid({
        url: "../basedata/baseData.aspx?action=get&type=storage&isDelete=2",
        datatype: "json",
        height: Public.setGrid().h,
        altRows: !0,
        gridview: !0,
        colNames: t,
        colModel: e,
        autowidth: !0,
        pager: "#page",
        viewrecords: !0,
        cmTemplate: {
            sortable: !1,
            title: !1
        },
        page: 1,
        rowNum: 3e3,
        shrinkToFit: !1,
        scroll: 1,
        cellLayout: 8,
        jsonReader: {
        root: "data.items",
        records: "data.totalsize",
        repeatitems: !1,
        id: "id"
        },/**/
        loadComplete: function (t) {
            if (t && 200 == t.status) {
                //alert(JSON.stringify(t));
                var e = {};
                /**/t = t.data;
                for (var i = 0; i < t.items.length; i++) {
                    var a = t.items[i];
                    e[a.id] = a
                }
                $("#grid").data("gridData", e);
                0 == t.items.length && parent.Public.tips({
                    type: 2,
                    content: "没有仓库数据！"
                })
            } else {
                //alert(JSON.stringify(t));
                parent.Public.tips({
                    type: 2,
                    content: "获取仓库数据失败！" + t.msg
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
function statusFmatter(t, e, i) {
    var a = t === !0 ? "已禁用" : "已启用",
    r = t === !0 ? "ui-label-default" : "ui-label-success";
    return '<span class="set-status ui-label ' + r + '" data-delete="' + t + '" data-id="' + i.id + '">' + a + "</span>"
}
var handle = {
    operate: function (t, e) {
        if ("add" == t) var i = "新增仓库",
        a = {
            oper: t,
            callback: this.callback
        };
        else var i = "修改仓库",
        a = {
            oper: t,
            rowData: $("#grid").data("gridData")[e],
            callback: this.callback
        };
        $.dialog({
            title: i,
            content: "url:./settings/storage-manage.aspx?type=storage",
            data: a,
            width: 400,
            height: 160,
            max: !1,
            min: !1,
            cache: !1,
            lock: !0
        })
    },
    callback: function (t, e, i) {
        var a = $("#grid").data("gridData");
        if (!a) {
            a = {};
            $("#grid").data("gridData", a)
        }
        a[t.id] = t;
        if ("edit" == e) {
            $("#grid").jqGrid("setRowData", t.id, t);
            i && i.api.close()
        } else {
            $("#grid").jqGrid("addRowData", t.id, t, "last");
            i && i.resetForm(t)
        }
    },
    del: function (t) {
        $.dialog.confirm("删除的仓库将不能恢复，请确认是否删除？",
        function () {
            Public.ajaxPost("../basedata/invlocation.aspx?action=delete", {
                id: t
            },
            function (e) {
                if (e && 200 == e.status) {
                    parent.Public.tips({
                        content: "仓库删除成功！"
                    });
                    $("#grid").jqGrid("delRowData", t)
                } else parent.Public.tips({
                    type: 1,
                    content: "仓库删除失败！" + e.msg
                })
            })
        })
    },
    setStatus: function (t, e) {
        t && Public.ajaxPost("../basedata/invlocation.aspx?action=disable", {
            storageID: t,
            disable: Number(e)
        },
        function (i) {
            if (i && 200 == i.status) {
                parent.Public.tips({
                    content: "仓库状态修改成功！"
                });
                $("#grid").jqGrid("setCell", t, "delete", e)
            } else parent.Public.tips({
                type: 1,
                content: "仓库状态修改失败！" + i.msg
            })
        })
    },
    setStatuses: function (t, e) {
        t && 0 != t.length && Public.ajaxPost("../basedata/invlocation.aspx?action=disable", {
            storageIDs: JSON.stringify(t),
            disable: Number(e)
        },
        function (i) {
            if (i && 200 == i.status) {
                parent.Public.tips({
                    content: "仓库状态修改成功！"
                });
                for (var a = 0; a < t.length; a++) {
                    var r = t[a];
                    $("#grid").jqGrid("setCell", r, "delete", e)
                }
            } else parent.Public.tips({
                type: 1,
                content: "仓库状态修改失败！" + i.msg
            })
        })
    }
};
initEvent();
initGrid();
