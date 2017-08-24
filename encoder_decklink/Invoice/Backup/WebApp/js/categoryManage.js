
function init() {
    var a = oper,c = $(".hideFeild"),
                d = $("#ParentCategory"),
                e = $("#category");
    if (showParentCategory && (d.closest("li").show(), $("#ParentCategory").click(function () {
        c.show().data("hasInit") || (c.show().data("hasInit", !0), Public.zTree.init(c, {
            defaultClass: "ztreeDefault"
        },
                    {
                        callback: {
                            beforeClick: function (a, b) {
                                d.val(b.name),
                                d.data("PID", b.id),
                                c.hide()
                            }
                        }
                    }))
    }), $(".ui_dialog").click(function () {
        c.hide()
    }), $("#ParentCategory").closest(".row-item").click(function (a) {
        var b = a || window.event;
        b.stopPropagation ? b.stopPropagation() : window.event && (window.event.cancelBubble = !0)
    }), document.onclick = function () {
        c.hide()
    }), "add" != a) {
        var f = rowData;
        e.val(f.name),
                    d.val(f.categoryName),
                    d.data("PID", f.parentID)
    }
    initValidator();
}

function initPopBtns() {
    var t = "add" == oper ? ["保存", "关闭"] : ["确定", "取消"];
    api.button({
        id: "confirm",
        name: t[0],
        focus: !0,
        callback: function() {
            postData(oper, rowData.id);
            return ! 1
        }
    },
    {
        id: "cancel",
        name: t[1]
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
    })
}


function postData(e) {
    if ($("#manage-form").validate().form()) {
        //alert('rr');
        var t = $.trim($("#category").val()),
        i = $.trim($("#ParentCategory").val()),
        a = e ? "update" : "add",
        r = i ? $("#ParentCategory").data("PID") : "";
        if (r !== e) {
            var n = {
                parentID: r,
                type: conditions.type,
                id: rowData.id,
                name: t
            },
            o = "add" == a ? "新增" + conditions.name + "类别" : "修改" + conditions.name + "类别";
            n.typeNumber = conditions.typeNumber;
            Public.ajaxPost("../settings/category-manage.aspx?action=" + e, n,
            function (e) {
                if (200 == e.status) {
                    parent.parent.Public.tips({
                        content: o + "成功！"
                    });
                    callback && "function" == typeof callback && callback(e.data, t, window)
                } else parent.parent.Public.tips({
                    type: 1,
                    content: o + "失败！" + e.msg
                })
            })
        } else parent.parent.Public.tips({
            type: 2,
            content: "当前分类和上级分类不能相同！"
        })
    } else {
        $("#manage-form").find("input.valid-error").eq(0).focus();
    }
}

function resetForm() {
    $("#manage-form").validate().resetForm();
    $("#ParentCategory").val("");
    $("#category").val("").focus().select()
}
var typeNumber, showParentCategory = !0, 
 api = frameElement.api,
oper = api.data.oper,
urlParam = Public.urlParam(),
 conditions = {
    type: urlParam.type,
    id: "",
    oper: "",
    name: ""
},
operType,
rowData = api.data.rowData || {},
callback = api.data.callback;
urlParam.type == 'child' && (operType = '子类别'),
urlParam.type == 'category' && (operType = '类别'),
initPopBtns();
init();