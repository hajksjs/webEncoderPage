<%@ Page Language="C#" AutoEventWireup="true" CodeFile="add.aspx.cs" Inherits="add" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>无标题页</title>
    <script src="js/jquery.js"></script>
</head>
<body>
    <script>
        $(document).ready(function(){
            $("#btnAdd").click(function(){
                var txtName=$("#txtName").val();
                var txtPass=$("#txtPass").val();
                
                if(isVal()){
                        $.ajax(
                        {
                        type:"POST",
                        url:"addManager.aspx?username="+txtName+"&password="+txtPass,
                        data: null,
                        success: function(mes) {
                           if(mes!=""){
                               
                                if(mes=="fail"){
                                   $("#divResult").text("用户名已存在");
                                }else{
                                    alert(mes);
                                     window.location.href="index.aspx";
                                }
                               
                           }else{
                                $("#divResult").text("程序出错，请重新启动");
                           }
                        },
                        error:function(){
                            alert("error");
                        }
                    })
                }
            })
            
            function isVal(){
                var username=$("#txtName").val();
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
    <div id="divone" align="center" >
                <div style="width: 250px; border-right: #92b0dd 1px solid; border-left: #92b0dd 1px solid;
                    border-top: #92b0dd 1px solid; border-bottom: #92b0dd 1px solid; background-color: #e2eaf8">
                    添加用户:
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
                                <input type="button" id="btnAdd" value="add" style="height: 52px" /></td>
                        </tr>
                        <tr>
                            <td>
                                pass:
                            </td>
                            <td>
                                <input type="password"  id="txtPass" style="width: 149px"/></td>
                        </tr>
                    </table>
                     <div id="divResult"></div>
                </div>
            </div>
    </form>
</body>
</html>
