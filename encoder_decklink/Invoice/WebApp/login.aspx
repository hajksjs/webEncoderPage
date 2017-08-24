<%@ Page Language="C#" AutoEventWireup="true"  Inherits="_login,WebApp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="default">
<title>在线进销存</title>
<script type="text/javascript" src="./js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" charset="utf-8" src="./js/common.js"></script>
<script type="text/javascript" src="./js/plugins.js"></script>
<link href="./css/common.css" rel="stylesheet" type="text/css"/>
<link href="./css/ui.min.css" rel="stylesheet" type="text/css"/>
<style>
body{background: #fff;}
.manage-wrap{margin: 20px auto 10px;width: 300px;}
.manage-wrap .ui-input{width: 200px;font-size:14px;}
</style>
<script type="text/javascript">

    var SYSTEM = {};
    (function () {
        /*
        * 判断IE6，提示使用高级版本
        */
        if (Public.isIE6) {
            var Oldbrowser = {
                init: function () {
                    this.addDom();
                },
                addDom: function () {
                    var html = $('<div id="browser">您使用的浏览器版本过低，影响网页性能，建议您换用<a href="http://www.google.cn/chrome/intl/zh-CN/landing_chrome.html" target="_blank">谷歌</a>、<a href="http://download.microsoft.com/download/4/C/A/4CA9248C-C09D-43D3-B627-76B0F6EBCD5E/IE9-Windows7-x86-chs.exe" target="_blank">IE9</a>、或<a href=http://firefox.com.cn/" target="_blank">火狐浏览器</a>，以便更好的使用！<a id="bClose" title="关闭">x</a></div>').insertBefore('#container').slideDown(500);
                    this._colse();
                },
                _colse: function () {
                    $('#bClose').click(function () {
                        $('#browser').remove();
                    });
                }
            };
            Oldbrowser.init();
        };

        getUsers();
    })();

    //缓存用户信息
 /*    function getUsers() {
        if (true) {
            Public.ajaxGet('/basedata/users.aspx?action=list', {}, function (data) {
                if (data.status === 200) {
                    SYSTEM.userInfo = data.data.items;
                } else if (data.status === 250) {
                    SYSTEM.userInfo = [];
                } else {
                    Public.tips({ type: 1, content: data.msg });
                }
            });
        } else {
            SYSTEM.userInfo = [];
        }
    };
   */

    function getUsers() {
        if (true) {
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "./basedata/users.aspx?action=list",
                success: function (data) {
                    if (data.status === 200) {
                        SYSTEM.userInfo = data.items;
                        //Public.tips({ type: 1, content: JSON.stringify(data.items) });
                    } else if (data.status === 250) {
                        SYSTEM.userInfo = [];
                    } else {
                        Public.tips({ type: 1, content: "未知" });
                    } 
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    var _div = $('<div></div>');
                    _div.html(XMLHttpRequest.responseText);
                    parent.Public.tips({ type: 1, content: XMLHttpRequest.status + ':' + errorThrown + '；' + _div.find("title").text() });
                }
            });
        }
      };
</script>
</head>
<body>
<table class="ui_dialog manage-wrap"  style="margin: 190px auto;">
<tbody><tr><td colspan="3">
<div class="ui_title_bar"><div class="ui_title">XX管理</div>
</div></td></tr>
<tr>
<td class="ui_icon"><img alt='logo' style='width:78px;height:78px' src="./img/logo.gif" class="ui_icon_bg"/></td>
<td style="width: 400px;" class="ui_main">
<div style="padding: 10px;" class="ui_content ui_state_full">
<div id="manage-wrap" class="manage-wrap">
	<form id="loginForm" name="loginForm" action="login.aspx">
    <div id="loginTip" class="ui-tips-error" style="margin-bottom:5px"></div>
		<ul class="mod-form-rows">
			<li class="row-item">
				<div class="label-wrap"><label for="curDate">默认日期:</label></div>
				<div class="ctn-wrap"><input type="text" id="curDate" name="curDate" class="ui-input ui-datepicker-input" value=""/></div>
			</li>
			<li class="row-item" >
               <div class="label-wrap"><label for="number">用户名称:</label></div>
                <div class="ctn-wrap"><span class="ui-combo-wrap" id="_name">
                <input type="text" class="input-txt" style='width:185px;' autocomplete="off" name="name" id="name"/><i class="trigger"></i></span>
				</div>
				<!--<div class="ctn-wrap"><input type="text" class="ui-input" name="name" id="name"/></div>-->
			</li>
			<li class="row-item">
				<div class="label-wrap"><label for="name">登录密码:</label></div>
				<div class="ctn-wrap"><input type="password" class="ui-input" name="userpassword" id="userpassword"/></div>
			</li>


		</ul>
	</form>
</div>
</div></td>
<td ><div class="ui_buttons" style="background:none;border:none"><input class="ui_state_highlight" style="margin:70px 10px 10px 10px" value="确定" type="submit" onclick="login('password');"/></div></td>
</tr>
<tr><td colspan="3"><div class="ui_buttons" style="text-align:center;">Conpyright 2015 Co.Ltd</div></td></tr></tbody>
</table>
<script type="text/javascript" charset="utf-8" src="./js/login.js"></script>
</body></html>