
function initEvent() {
    $("#btn-add").click(function (e) {
        e.preventDefault();
        verifyRight(rightsAction.add) && handle.operate("add")
    });
    $("#grid").on("click", ".operating .ui-icon-pencil",
    function (e) {
        e.preventDefault();
        if (verifyRight(rightsAction.update)) {
            var t = $(this).parent().data("id");
            handle.operate("update", t)
        }
    });
    $("#grid").on("click", ".operating .ui-icon-trash",
    function (e) {
        e.preventDefault();
        if (verifyRight(rightsAction.del)) {
            var t = $(this).parent().data("id");
            handle.del(t)
        }
    });
    $("#btn-refresh").click(function (e) {
        e.preventDefault();
        $("#grid").trigger("reloadGrid")
    });
    $("#search").click(function (e) {
        e.preventDefault();
        var t = $.trim($("#matchCon").val());
        conditions.skey = "输入类别名称查询" == t ? "" : t;
        $("#grid").setGridParam({
            postData: conditions
        }).trigger("reloadGrid")
    });
    $("#matchCon").placeholder();
    $(window).resize(function () {
        Public.resizeGrid()
    })
}
function initGrid() {
    var e = [{
        name: "operate",
        label: "操作",
        width: 60,
        fixed: !0,
        align: "center",
        formatter: Public.operFmatter
    },
    {
        name: "name",
        label: "类别",
        width: 200,
        formatter: function (e, t, i) {
            //for (var a = parseInt(i.level) - 1, r = "", n = 0; a > n; n++) r += "   ";
            for (var a = i.allID.replace(/[^,]/g, '').length + 1, r = "", n = 0; a > n; n++) r += "&nbsp; ";
            return r + e
        }
    },
    {
        name: "id",
        label: "id",
        hidden: !0
    },
    {
        name: "level",
        label: "level",
        hidden: !0
    },
    {
        name: "parentID",
        label: "parentID",
        hidden: !0
    },
    {
        name: "parentname",
        label: "parentname",
        hidden: !0
    },
    {
        name: "detail",
        label: "是否叶",
        hidden: !0
    }];
    $("#grid").jqGrid({
        url: url,
        postData: conditions,
        datatype: "json",
        height: Public.setGrid().h,
        altRows: !0,
        gridview: !0,
        colModel: e,
        autowidth: !0,
        viewrecords: !0,
        cmTemplate: {
            sortable: !1,
            title: !1
        },
        page: 1,
        pager: "#page",
        rowNum: 2e3,
        shrinkToFit: !1,
        scroll: 1,
        jsonReader: {
            root: "data.items",
            records: "data.totalsize",
            repeatitems: !1,
            id: "id"
        },
        loadComplete: function (e) {
            if (e && 200 == e.status) {
                var t = {};
                e = e.data;
                for (var i = 0; i < e.items.length; i++) {
                    var a = e.items[i];
                    t[a.id] = a
                }
                //showParentCategory = "trade" === conditions.typeNumber ? !0 : !1;
                for (var i = 0; i < e.items.length; i++) {
                    var a = e.items[i],
                    r = t[a.parentID] || {};
                    if (r.name) {
                        //showParentCategory = !0;
                        t[a.id].parentname = r.name
                    }
                }
                parent.SYSTEM.categoryInfo = parent.SYSTEM.categoryInfo || {};
                parent.SYSTEM.categoryInfo[conditions.typeNumber] = e.items;
                $("#grid").data("gridData", t)
            } else {
                var n = 250 == e.status ? "没有" + conditions.name + "类别数据！" : "获取" + conditions.name + "类别数据失败！" + e.msg;
                parent.Public.tips({
                    type: 2,
                    content: n
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
function initValidator() {

    $("#manage-form").validate({
        rules: {
            category: {
                required: !0
            }
        },
        messages: {
            category: {
                required: "类别不能为空"
            }
        },
        errorClass: "valid-error"
    });
}


function verifyRight(e) {
    var t = rightsType[conditions.typeNumber];
    if (!t) return !0;
    switch (e) {
        case rightsAction.query:
            break;
        case rightsAction.add:
            break;
        case rightsAction.del:
            break;
        case rightsAction.update:
            break;
        default:
            return !1
    }
    return Business.verifyRight(t += e)
}
var typeNumber, showParentCategory,
url = "../basedata/assist.aspx?action=list&isDelete=2",
urlParam = Public.urlParam();
urlParam.typeNumber && (typeNumber = urlParam.typeNumber);
var conditions = {
    typeNumber: typeNumber,
    skey: "",
    name: ""
},
rightsType = {
    customertype: "BUTYPE",
    supplytype: "SUPPLYTYPE",
    trade: "TRADETYPE",
    raccttype: "RACCTTYPE",
    paccttype: "PACCTTYPE"
},
rightsAction = {
    query: "_QUERY",
    add: "_ADD",
    del: "_DELETE",
    update: "_UPDATE"
},
handle = {
    operate: function (e, t) {
        if ("add" == e) var i = "新增类别",
        a = {
            oper: e,
            rowData: $("#grid").data("gridData")[t],
            callback: this.callback
        };
        else var i = "修改类别",
        a = {
            oper: e,
            rowData: $("#grid").data("gridData")[t],
            callback: this.callback
        };
        $.dialog({
            title: i,
            content: "url:./settings/category-manage.aspx?type=category",
            data: a,
            width: 400,
            height: 160,
            max: !1,
            min: !1,
            cache: !1,
            lock: !0
        })
    },
    del: function (e) {
        $.dialog.confirm("删除的" + conditions.name + "类别将不能恢复，请确认是否删除？",
        function () {
            Public.ajaxPost("../settings/category-manage.aspx?action=delete", {
                id: e,
                typeNumber: conditions.typeNumber
            },
            function (t) {
                if (t && 200 == t.status) {
                    parent.Public.tips({
                        content: "类别删除成功！"
                    });
                    $("#grid").jqGrid("delRowData", e)
                } else parent.Public.tips({
                    type: 1,
                    content: "类别删除失败！" + t.msg
                })
            })
        })
    },
    callback: function (e, t, i) {
        $("#grid").trigger("reloadGrid");
        i && i.api.close();
    }
};
initEvent();
initGrid();