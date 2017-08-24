using System;
using System.Collections.Generic;
using System.Text;
using prj_AjaxDAL;
using prj_AjaxModels;
namespace prj_AjaxBLL
{
    public class UserManagers
    {

        UserServices userservice = new UserServices();
        /// <summary>
        /// 查询 Users 对象集合
        /// </summary>
        /// <returns>返回List集合</returns>
        public List<Users> findAllUsers()
        {
            return userservice.findAllUsers();
        }
        /// <summary>
        /// 带参数(string UserName)查出要添加的用户是否重复 对象集合
        /// </summary>
        /// <param name="UserName"></param>
        /// <returns></returns>
        public string checkUserByUserName(string username)
        {
            return userservice.checkUserByUserName(username);
        }

        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public int login(Users user)
        {
            return userservice.login(user);

        }

        /// <summary>
        /// 添加用户
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public int addUser(Users user)
        {
            return userservice.addUser(user);

        }
    }
}
