var retryTime = 0;
var appUrl;
var loginType;

function initEvent() {
    var t = $("#name");
    Public.limitInput(t, /^[a-zA-Z0-9\-_]*$/);
    Public.bindEnterSkip($("#manage-wrap"), login);
    t.focus().select()
}

function initDom() {
    this.$_curDate = $("#curDate");
    this.$_curDate.val(new Date());
    this.$_curDate.datepicker();

    this.$_name = $("#_name");
    this.usersCombo = Business.usersCombo($("#_name"), {
        defaultSelected: 0
    });
}

function login(loginType) {
	loginType = loginType;
	if(loginType == null)
		loginType = "password";
	if("password" == loginType){
		if(!isValideInput()){
			return;
		}	
	}else{
    $("#loginTip").html("未知登录方式：" + loginType);
		return;
	}


   $("#loginTip").html("正在登录中...");

	var name = $("#name");
	var password = $("#userpassword");

	var handleSuccess = function (e) {
	    if (e.status == "OK") {
	        //$("#loginTip").html("登录成功！");
	        window.location = "./default.aspx";
	        return;
	    }
	    else {
	        $("#loginTip").html("用户名或密码错误!");
	        return;
	    }

	}

	var handleFailure = function (XMLHttpRequest, textStatus, errorThrown) {
	    //alert("请求对象XMLHttpRequest: " + XMLHttpRequest.responseText.title);
	    $("#loginTip").html(XMLHttpRequest.responseText);
	    $("#loginTip").html(XMLHttpRequest.status + ':' + errorThrown + '；' + $("#loginTip").find("title").html());
	    //alert("错误类型textStatus: " + textStatus);
	    //alert("异常对象errorThrown: " + errorThrown);
	}
//var params = $("#loginForm").serialize();
    $.ajax({
        type: "POST",
        url: "./login.aspx?action=verify",
        data: $("#loginForm").serialize(),
        dataType: "json",
        success: handleSuccess,
        error: handleFailure
    }); 
	  
}
function isValideInput(){
    var name = $("#name");
    var password = $("#userpassword");
    if (trim(name.value) == '') {
	    $("#loginTip").html("请输入用户名");
		return false;
	}
if (password.val() == null || password.val().length == 0 || password.val() == '') {
    $("#loginTip").html("请输入密码");
		return false;
	}
	return true;
}
function toRegister(url){
	window.location=url;
}

function onEnterKeyDown(event, next)
{
    var name = $("#name");
    var password = $("#userpassword");

	if (event.keyCode == 13)
	{
		// 先判断当前操作对象
		//if(checkValidate(cur))
		//{	
			if(next == "name")
			{
				password.focus();
			}else if(next=="password"&&$("#needAuth").value=='Y'){
				$("#authCode").focus();
			}else
			{
				login('password');	
			}
		//}
	}
}

function isIE() {
	if(document.all) return true;
	return false;
}


initDom();
initEvent();