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
using prj_AjaxBLL;
using prj_AjaxModels;
public partial class index : System.Web.UI.Page
{
    UserManagers usermanager = new UserManagers();
    protected void Page_Load(object sender, EventArgs e)
    {
        Users user = Session["Users"] as Users;
        if (user != null)
        {
            lab_username.Text = user.Username;
        }
        else
        {
            lab_username.Text = "暂无人员登录";
        }
    }
    protected void GridView1_RowDeleted(object sender, GridViewDeletedEventArgs e)
    {
        
    }
}
