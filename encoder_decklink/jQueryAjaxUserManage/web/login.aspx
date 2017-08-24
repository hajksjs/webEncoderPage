<%@ Page Language="C#" AutoEventWireup="true" CodeFile="login.aspx.cs" Inherits="login" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>无标题页</title>

    <script src="js/jquery.js"></script>

    <style>
    #progress_bar {  
    width:160px;  
    height:20px;  
    border:1px solid #ccc;  
    padding:0;  
    margin:0;  
    position:relative;  
    background-image:url("image/gundong.gif");  
    background-repeat:repeat-x;  
} 
 
#progress_bar div {  
    background-color:#fff;  
} 
    </style>
</head>
<body>
<%--<script>
 $(document).ready(function(){
   var tab_to=$("#tab_to");
   var divLogin=$("#divone");
   tab_to.hideFocus();
 })
</script>--%>

    <script>
        $(document).ready(function(){
            var tab_to=$("#tab_to");
            var divLogin=$("#divone");
            tab_to.hide();
            
            $("#btnLogin").click(function(){
                var txtName=$("#txtName").val();
                var txtPass=$("#txtPass").val();
            
                if(isVal()){
                    tab_to.show();
                    divLogin.hide()
                    
                    window.setTimeout(login,1000); //超时
                   
                   //ajax登录
                   function login(){
                    $.ajax(
                    {
                        type:"POST",
                        url:"loginManager.aspx?username="+txtName+"&password="+txtPass,
                        data: null,
                        success: function(mes) {
                           if(mes!=""){
                                tab_to.hide();
                                if(mes=="success"){
                                    window.location.href="index.aspx";
                                }else{
                                    divLogin.show()
                                     $("#divResult").text("登录失败");
                                }
                                
                           }
                        },
                        error:function(){
                         tab_to.hide();
                         divLogin.show()
                           
                            alert("程序出错，请重新启动");
                        }
                    })
                   }
                    
                      
                       
                }
                
                
            })
            
            function isVal(){
                var username=$("#txtName").val;
                var pass=$("#txtPass").val();
                if(username==""){
                   alert("用户名不能为空！");
                    return false;
                }
                if(pass==""){
                    alert("密码不能为空！");
                    return false;
                }
                return true;
            }
            
            

            
        })
    </script>

    <form id="form1" runat="server">
        <table id="tab_to" align="center" cellspacing="0" cellpadding="0" border="0">
            <tr align="center">
                <td>
                    <div id="progress_bar">
                    </div>
                </td>
            </tr>
            <tr align="center">
                <td>
                    <font size="2">登录中...</font></td>
            </tr>
        </table>
        <div id="divone" align="center">
            <div style="width: 250px; border-right: #92b0dd 1px solid; border-left: #92b0dd 1px solid;
                border-top: #92b0dd 1px solid; border-bottom: #92b0dd 1px solid; background-color: #e2eaf8">
                用户登录:
            </div>
            <div style="width: 250px; border-right: #92b0dd 1px solid; border-left: #92b0dd 1px solid;
                border-top: #92b0dd 1px solid; border-bottom: #92b0dd 1px solid; background-color: #e2eaf8">
                <table style="width: 133px">
                    <tr>
                        <td style="width: 3px">
                            name:
                        </td>
                        <td>
                            <input type="text" id="txtName" /></td>
                        <td rowspan="2">
                            <input type="button" id="btnLogin" value="click" style="height: 52px" /></td>
                    </tr>
                    <tr>
                        <td>
                            pass:
                        </td>
                        <td>
                            <input type="password" id="txtPass" style="width: 149px" /></td>
                    </tr>
                </table>
                <div id="divResult">
                </div>
            </div>
        </div>
    </form>
</body>
</html>
