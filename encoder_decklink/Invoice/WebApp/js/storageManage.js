function initField() {
    if (rowData.id) {
        //$("#number").val(rowData.number);
        $("#name").val(rowData.name)
    }
}
function initEvent() {
    //var t = $("#number");
    var t = $("#name");
    Public.limitInput(t, /^[a-zA-Z0-9\-_]*$/);
    Public.bindEnterSkip($("#manage-wrap"), postData, oper, rowData.id);
    initValidator();
    t.focus().select()
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
    /*$.validator.addMethod("number",
    function(t) {
        return /^[a-zA-Z0-9\-_]*$/.test(t)
    });*/
    //conditions.type == 'category' && (operType = '类型');
    $("#manage-form").validate({
        rules: {
            /*number: {
                required: !0,
                number: !0
            },*/
            name: {
                required: !0
            }
        },
        messages: {
            /*number: {
                required: "仓库编号不能为空",
                number: "仓库编号只能由数字、字母、-或_等字符组成"
            },*/
            name: {
                required: operType + "名称不能为空"
            }
        },
        errorClass: "valid-error"
    })
}
function postData(t, e) {
    if ($("#manage-form").validate().form()) {
        var //i = $.trim($("#number").val()),
        a = $.trim($("#name").val()),
        r = "add" == t ? "新增" + operType : "修改" + operType,
        params = rowData.id ? {
            id: e,
            //locationNo: i,
            type: conditions.type,
            name: a,
            isDelete: rowData["delete"]//删除不通过这里
        }: {
            //locationNo: i,
            name: a,
            type: conditions.type,
            isDelete: !1
        };
        //var jsonlocation ='[' +  JSON.stringify(params) + ']';
        //var infolocation = {jsonStr:jsonlocation};
        //alert(jsonlocation);

        Public.ajaxPost("../basedata/basedata.aspx?action=" + ("add" == t ? "add" : "update"), params,
        //Public.ajaxPost("../basedata/invlocation.aspx?action=" + ("add" == t ? "add" : "update"), infolocation,
        function(e) {
            if (200 == e.status) {
                parent.parent.Public.tips({
                    content: r + "成功！"
                });
                callback && "function" == typeof callback && callback(e.data, t, window)
            } else parent.parent.Public.tips({
                type: 1,
                content: r + "失败！" + e.msg
            })
        })
    } else $("#manage-form").find("input.valid-error").eq(0).focus()
}
function resetForm(t) {
    $("#manage-form").validate().resetForm();
    $("#name").val("");
    //$("#number").val(Public.getSuggestNum(t.locationNo)).focus().select()
}
var api = frameElement.api,
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
urlParam.type == 'category' && (operType = '类型'),
urlParam.type == 'storage' && (operType = '仓库'),
urlParam.type == 'unit' && (operType = '单位'),
initPopBtns();
initField();
initEvent();