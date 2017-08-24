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

public partial class loginManager : System.Web.UI.Page
{
    UserManagers usermanager = new UserManagers();
    protected void Page_Load(object sender, EventArgs e)
    {
        //接收用户名和密码
        string username = Request.QueryString["username"];
        string password = Request.QueryString["password"];


        if (username != "" && password != "")
        {
            Users user = new Users();
            user.Username = username;
            user.Password = password;
            int x = usermanager.login(user);
            if (x > 0)
            {
                Session["Users"] = user;
                Response.Write("success");
            }
            else
            {
                Response.Write("fail");

            }

        }
        else
        {
            return;
        }
        Response.End();

    }
}
