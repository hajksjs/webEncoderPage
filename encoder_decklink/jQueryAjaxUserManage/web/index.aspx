<%@ Page Language="C#" AutoEventWireup="true" CodeFile="index.aspx.cs" Inherits="index" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>无标题页</title>
</head>
<body>
    <center>
        <form id="form1" runat="server">
            &nbsp;<div style="width: 600px; background-color: #e2eaf8; border-left: #92b0dd 1px solid;
                border-right: #92b0dd 1px solid; border-top: #92b0dd 1px solid; border-bottom: #92b0dd 1px solid">
                当前用户名:<asp:Label ID="lab_username" runat="server" Text="Label"></asp:Label>
            </div>
            <div style="width: 600px; background-color: #e2eaf8; border-left: #92b0dd 1px solid;
                border-right: #92b0dd 1px solid; border-top: #92b0dd 1px solid; border-bottom: #92b0dd 1px solid;">
                <asp:GridView ID="GridView1" runat="server" Width="599px" AutoGenerateColumns="False"
                    DataSourceID="ObjectDataSource1" OnRowDeleted="GridView1_RowDeleted">
                    <Columns>
                     <asp:TemplateField>
                      <HeaderTemplate>删除</HeaderTemplate>
                      <ItemTemplate>
                       <asp:Label ID="btnDel" runat="server" Text="删除"></asp:Label>
                      </ItemTemplate>
                     </asp:TemplateField>
                        <asp:BoundField DataField="Id" HeaderText="编号" SortExpression="Id" />
                        <asp:BoundField DataField="Username" HeaderText="用户名" SortExpression="Username" />
                        <asp:BoundField DataField="Password" HeaderText="密码" SortExpression="Password" />
                    </Columns>                    
                </asp:GridView>
                <asp:ObjectDataSource ID="ObjectDataSource1" runat="server" SelectMethod="findAllUsers"
                    TypeName="prj_AjaxBLL.UserManagers"></asp:ObjectDataSource>
            </div>
            <div style="width: 600px; background-color: #e2eaf8; border-left: #92b0dd 1px solid;
                border-right: #92b0dd 1px solid; border-top: #92b0dd 1px solid; border-bottom: #92b0dd 1px solid">
                <table border="0" cellpadding="0" cellspacing="0" width="60%">
                    <tr>
                        <td>
                            <a href="add.aspx">添加新用户</a></td>
                        <td>
                            <a href="login.aspx">重新登录</a></td>
                    </tr>
                </table>
            </div>
        </form>
    </center>
</body>
</html>
