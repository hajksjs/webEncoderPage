var retryTime = 0;
var appUrl;
var logining=false;
var loginType;

function showMsg(retStr) {
	if(retStr == "mustUseUkey")
	{
		loginTip.innerHTML = '<img src="../images/guide_warning.gif" align="absmiddle">&nbsp;&nbsp;必须使用友盾登录';
	}
	else if(retStr == "ydnameBlank")
	{
		loginTip.innerHTML = '<img src="../images/guide_warning.gif" align="absmiddle">&nbsp;&nbsp;友盾登录用户名不能为空';
	}
	else if(retStr == "nameMismatch")
	{
		loginTip.innerHTML = '<img src="../images/guide_warning.gif" align="absmiddle">&nbsp;&nbsp;友盾登陆名和证书关联的不是同一个用户';
	}
	else if(retStr == "certOverdue")
	{
		loginTip.innerHTML = '<img src="../images/guide_warning.gif" align="absmiddle">&nbsp;&nbsp;您的证书已经过期';
	}
	else if(retStr == "certRevocatory")
	{
		loginTip.innerHTML = '<img src="../images/guide_warning.gif" align="absmiddle">&nbsp;&nbsp;您的证书已经作废';
	}
	else if(retStr == "forbidToUseCurrentCert")
	{
		loginTip.innerHTML = '<img src="../images/guide_warning.gif" align="absmiddle">&nbsp;&nbsp;您的友盾已被停用或挂失';
	}
	else if(retStr == "certVerifyFailed,error code...")
	{
		loginTip.innerHTML = '<img src="../images/guide_warning.gif" align="absmiddle">&nbsp;&nbsp;友盾登录失败，未知错误';
	}
	else if(retStr == "corporationInHaltState")
	{
		loginTip.innerHTML = '<img src="../images/guide_warning.gif" align="absmiddle">&nbsp;&nbsp;该公司服务已被停用，无法登录';
	}
	else
	{
		//showErr("Info", "登录失败，" + retStr);
		showErr("Info", "登录失败，失败原因：系统系统内部错误");
	}
}

function login(loginType) {
    if(logining) return;
    
	logining=true;
	loginType = loginType;
	var loginTip = document.getElementById("loginTip");
	if(loginType == null)
		loginType = "password";
	if("cert" == loginType){
		var theSignedObj = document.getElementById("signedInfo");
		if(theSignedObj == null || theSignedObj.value == ""){
			loginTip.innerHTML = "signedInfo not set properly";
			logining=false;
			return;
		}
	}else if("password" == loginType){
		if(!isValideInput()){
			logining=false;
			return;
		}	
	}else{
		loginTip.innerHTML = "未知登录方式："+loginType;
		logining=false;
		return;
	}

	
	loginTip.innerHTML = "正在登录中...";
	
	var sUrl = "../sso/loginSPProvideLoginInfoServlet?";
	var name = document.getElementById("name");
	
	var password = document.getElementById("password");
	document.getElementById("kickout").value="N";
	var handleSuccess = function(req){					
		var retStr = req.responseText;
			if (retStr.substring(0,2) == "OK"){
				loginTip.innerHTML = "登录成功！";
				var sessionId = retStr.substring(2);					
				var ReqID = document.getElementById("ReqID");
				ReqID.value = sessionId;
				// 认证成功什么的。。。					
				document.forms[0].action="../idpSSO";
				document.forms[0].submit();
				return;
			} else if(retStr == "invalideCode") {
				document.getElementById("imgAuth").src="../image?id="+Math.random();
				showErr("Info", '<img src="../images/guide_warning.gif" align="absmiddle">&nbsp;&nbsp;验证码输入错误');
				//document.forms[0].txtCompany.select();
			} else if(retStr == "notActivateYet") {
				//showErr("Info", '<img src="../images/guide_warning.gif" align="absmiddle">&nbsp;&nbsp;帐号尚未激活');
				window.location=appUrl+"/commonservice/register/activateUser.aspx?act=request&name="+name.value;					
			} else if(retStr == "wrongPassword"||retStr == 'userNotFound') {
				//showErr("Password", '<img src="../images/guide_warning.gif">&nbsp;&nbsp;密码错误');
				//document.forms[0].password.select();
				retryTime++;
				if(retryTime>3){
					document.getElementById("needAuth").value="Y";
					document.getElementById("imgAuth").src="../image?id="+Math.random();
					try {
						document.getElementById("authRow").style.display="table-row";
					} catch (e) {
						document.getElementById("authRow").style.display="block";
					}
				}
				loginTip.innerHTML = '<img src="../images/guide_warning.gif" align="absmiddle">&nbsp;&nbsp;用户名或密码错误';
			} 
			else if(retStr == "notAuditYet") 
			{
				showErr("Info", '<img src="../images/guide_warning.gif" align="absmiddle">&nbsp;&nbsp;帐号尚未审核通过');					
			} 
			else if(retStr == "CompanyExpired") 
			{
				showErr("Info", '<img src="../images/guide_warning.gif" align="absmiddle">&nbsp;&nbsp;帐号已过期');					
			} 
			else if(retStr == "userLocked") 
			{
				showErr("Account", '<img src="../images/guide_warning.gif" align="absmiddle">&nbsp;&nbsp;用户帐号已被锁定');					
			} 
			else if (retStr == "name can not be null"||retStr == 'password can not be null') 
			{
				loginTip.innerHTML = '<img src="../images/guide_warning.gif" align="absmiddle">&nbsp;&nbsp;用户名或密码不能为空';
			}
			else if(retStr == 'E3')
			{
				showErr("Auth", '<img src="../images/guide_warning.gif" align="absmiddle">&nbsp;&nbsp;输入错误');
				document.forms[0].txtAuth.select();
				document.forms[0].imgAuth.src = "image";
			}
			else if(retStr == 'logined')
			{
				loginTip.innerHTML = "";
				showPanel(null, "您的帐号已在别处登录，是否仍要登录？",300,
					"是",
					function(){
						document.getElementById("kickout").value="Y";
						YAHOO.util.Connect.setForm(document.getElementById("loginForm"));
						var request = YAHOO.util.Connect.asyncRequest('POST', sUrl, callback);return true;
					},"否",function(){return true;}
				);
				password.blur();
			}
			else {
				if (loginType == 'cert') {
					window.location = "../login/sso.aspx?ret="+retStr+"&certLogin=true";
				} else {
					window.location = "../login/sso.aspx?ret="+retStr;
				}
			}
				
			logining=false;
	}

	var handleFailure = function(req){
		logining=false;
		alert("Server side error:"+req.responseText);
	}
	
	var callback = {
	  success: handleSuccess,
	  failure: handleFailure
	};
	
	YAHOO.util.Connect.setForm(document.getElementById("loginForm"));
	var request = YAHOO.util.Connect.asyncRequest('POST', sUrl, callback);
	  
}
function isValideInput(){
	var name = document.getElementById("name");
	var password = document.getElementById("password");
	if(trim(name.value) == ''){
		PopPanel.alert("请输入用户名");
		return false;
	}
	if(password.value == null || password.value.length==0 ||password.value==''){
		PopPanel.alert("请输入密码");
		return false;
	}
	if(document.getElementById("needAuth").value=='Y'){
	   	if(document.getElementById("authCode").value==''){
			PopPanel.alert("请输入验证码",function(){document.getElementById("imgAuth").src="../image?id="+Math.random();});
			return;	
		}
	}
	return true;
}
function showErr(objname, desc){
		var errObj = document.getElementById("loginTip");
		errObj.innerHTML = desc;
}

function toRegister(url){
	window.location=url;
}

function onEnterKeyDown(event, next)
{
	var name = document.getElementById("name");
	var password = document.getElementById("password");

	if (event.keyCode == 13)
	{
		// 先判断当前操作对象
		//if(checkValidate(cur))
		//{	
			if(next == "name")
			{
				password.focus();
			}else if(next=="password"&&document.getElementById("needAuth").value=='Y'){
				document.getElementById("authCode").focus();
			}else
			{
				login('password');	
			}
			//YAHOO.util.Event.stopEvent(event);
		//}
	}
}

function onEnterKeyDownYD(event, next)
{
	var name = document.getElementById("ydname");
	var password = document.getElementById("ydpassword");
	
	if (event.keyCode == 13)
	{
		if (next == "name")
		{
			password.focus();
		}
		else if(next == "password")
		{
			doCertLogin();
		}
	}
}

function isIE() {
	if(document.all) return true;
	return false;
}

function checkLoginResult(retStr){
	if (retStr.substring(0,2) == "OK"){
		loginTip.innerHTML = "登录成功！";
		var sessionId = retStr.substring(2);					
		var ReqID = document.getElementById("ReqID");
		ReqID.value = sessionId;
		// 认证成功什么的。。。					
		document.forms[0].action="../idpSSO";
		document.forms[0].submit();
		return;
	} else if(retStr == "invalideCode") {
		document.getElementById("imgAuth").src="../image?id="+Math.random();
		showErr("Info", '<img src="../images/guide_warning.gif" align="absmiddle">&nbsp;&nbsp;验证码输入错误');
		//document.forms[0].txtCompany.select();
	} else if(retStr == "notActivateYet") {
		//showErr("Info", '<img src="../images/guide_warning.gif" align="absmiddle">&nbsp;&nbsp;帐号尚未激活');
		window.location=appUrl+"/commonservice/register/activateUser.aspx?act=request&name="+name.value;					
	} else if(retStr == "wrongPassword"||retStr == 'userNotFound') {
		//showErr("Password", '<img src="../images/guide_warning.gif">&nbsp;&nbsp;密码错误');
		//document.forms[0].password.select();
		retryTime++;
		if(retryTime>3){
			document.getElementById("needAuth").value="Y";
			document.getElementById("imgAuth").src="../image?id="+Math.random();
			try {
				document.getElementById("authRow").style.display="table-row";
			} catch (e) {
				document.getElementById("authRow").style.display="block";
			}
		}
		loginTip.innerHTML = '<img src="../images/guide_warning.gif" align="absmiddle">&nbsp;&nbsp;用户名或密码错误';
	} 
	else if(retStr == "notAuditYet") 
	{
		showErr("Info", '<img src="../images/guide_warning.gif" align="absmiddle">&nbsp;&nbsp;帐号尚未审核通过');					
	} 
	else if(retStr == "CompanyExpired") 
	{
		showErr("Info", '<img src="../images/guide_warning.gif" align="absmiddle">&nbsp;&nbsp;帐号已过期');					
	} 
	else if(retStr == "userLocked") 
	{
		showErr("Account", '<img src="../images/guide_warning.gif" align="absmiddle">&nbsp;&nbsp;用户帐号已被锁定');					
	}
	else if(retStr == "wrongInput"){
		loginTip.innerHTML = '<img src="../images/guide_warning.gif" align="absmiddle">&nbsp;&nbsp;用户名或密码错误';
	}
	else if (retStr == "name can not be null"||retStr == 'password can not be null') 
	{
		loginTip.innerHTML = '<img src="../images/guide_warning.gif" align="absmiddle">&nbsp;&nbsp;用户名或密码不能为空';
	}
	else if(retStr == 'E3')
	{
		showErr("Auth", '<img src="../images/guide_warning.gif" align="absmiddle">&nbsp;&nbsp;输入错误');
		document.forms[0].txtAuth.select();
		document.forms[0].imgAuth.src = "image";
	}
	else if(retStr == 'logined')
	{
		loginTip.innerHTML = "";
		showPanel(null, "您的帐号已在别处登录，是否仍要登录？",300,
			"是",
			function(){
				document.getElementById("kickout").value="Y";
				YAHOO.util.Connect.setForm(document.getElementById("loginForm"));
				var request = YAHOO.util.Connect.asyncRequest('POST', sUrl, callback);return true;
			},"否",function(){return true;}
		);
		password.blur();
	}
	else {
		if (loginType == 'cert') {
			window.location = "../login/sso.aspx?ret="+retStr+"&certLogin=true";
		} else {
			window.location = "../login/sso.aspx?ret="+retStr;
		}
	}
		
	logining=false;
}