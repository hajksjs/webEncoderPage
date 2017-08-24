using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using prj_AjaxModels;
namespace prj_AjaxDAL
{
    public class UserServices
    {

        /// <summary>
        /// 查询 Users 对象集合
        /// </summary>
        /// <returns>返回List集合</returns>
        public List<Users> findAllUsers()
        {
            string sql = "select * from _Users";
            List<Users> userlist = new List<Users>();
            DataTable table = DBHelper.ExcuteDataQuery(sql);
            foreach (DataRow row in table.Rows)
            {
                Users user = new Users();
                user.Id = Convert.ToInt32(row["Id"]);
                user.Username = Convert.ToString(row["username"]);
                user.Password = Convert.ToString(row["password"]);
             

                userlist.Add(user);
            }

            return userlist;
        }
        /// <summary>
        /// 带参数(string UserName)查出要添加的用户是否重复 对象集合
        /// </summary>
        /// <param name="UserName"></param>
        /// <returns></returns>
        public string checkUserByUserName(string username)
        {
            string sql = string.Format("select username from _Users where username='{0}'", username);
            string uname = Convert.ToString(DBHelper.ExcuteScalar(sql));
            return uname;
        }

        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public int login(Users user)
        {
            string sql = string.Format("select count(*) from _Users where username='{0}' and password='{1}'", user.Username, user.Password);
            int x = (int)DBHelper.ExcuteScalar(sql);
            return x;

        }
        /// <summary>
        /// 添加用户
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public int addUser(Users user)
        {
            string sql = "insert into _Users values(@username,@password)";
            SqlParameter[] param = new SqlParameter[] { 
                new SqlParameter("@username",user.Username),
                new SqlParameter("@password",user.Password)
            };
            return DBHelper.ExcuteNonQuery(sql,param);

        }

    }
}
