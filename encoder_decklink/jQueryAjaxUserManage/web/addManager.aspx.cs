using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using prj_AjaxModels;
using prj_AjaxBLL;

public partial class addManager : System.Web.UI.Page
{
    UserManagers usermanager = new UserManagers();
    protected void Page_Load(object sender, EventArgs e)
    {
        string username = Request.QueryString["username"];
        string password = Request.QueryString["password"];


        string uname = usermanager.checkUserByUserName(username);
        if (uname.Equals(username))
        {
            Response.Write("fail");
        }
        else
        {
            Users user = new Users();
            user.Username = username;
            user.Password = password;

            int x = usermanager.addUser(user);
            if (x > 0)
            {

                Response.Write("添加成功\n\n下面是您注册的账号信息：\n\n用户名:" + user.Username + "\n密  码:" + user.Password + "\n\n请妥善保护好您的信息");
            }
            else
            {
                Response.Write("添加失败");
            }
        }
        Response.End();
    }
}
