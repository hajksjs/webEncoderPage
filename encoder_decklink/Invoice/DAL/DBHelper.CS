using System;
using System.Web;
using System.Collections.Generic;
using System.Text;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using System.Data.OleDb;

///注意修改命名空间
namespace DAL
{

    public static class DBHelper
    {
 /*       public static List<SqlConnection> connectionPools = new List<SqlConnection>();

        public static SqlConnection Connection
        {
            get
            {
                return GetConnection();
            }
        }
        private static SqlConnection GetConnection()
        {

            for (int i = 0; i < connectionPools.Count; i++)
            {
                SqlConnection item = connectionPools[i];
                if (item.State == System.Data.ConnectionState.Broken)
                {
                    item.Close();
                    item.Open();
                    return item;
                }
                if (item.State == System.Data.ConnectionState.Closed)
                {
                    item.Open();
                    return item;
                }
            }
	    //注意修改配置节点名称
            string connectionString = ConfigurationManager.ConnectionStrings["connStr"].ConnectionString;
            //connectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + System.Web.HttpContext.Current.Server.MapPath(ConfigurationManager.AppSettings["AccessConnStr"].ToString());
            //OleDbConnection Cnn = new OleDbConnection(ConfigurationManager.ConnectionStrings["AccessConnStr"].ConnectionString);
            SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();
            connectionPools.Add(conn);
            return conn;
        }

*/

		#region DB Access Functions

		private static IsolationLevel m_isoLevel = IsolationLevel.ReadUncommitted;

		static public IsolationLevel IsolationLevel
		{
			get
			{
				return m_isoLevel;
			}
		}

        private static string connectionString="";

        static public string ConnectionString
        {
            get
            {
                return connectionString;
            }
            set
            {
                connectionString = value;
            }
        }

        /// <summary>
        /// Gets Connection out of Web.config
        /// </summary>
        /// <returns>Returns SqlConnection</returns>
        public static SqlConnection GetConnection()
        {
            if (HttpContext.Current.Items["DBID"] == null)
                connectionString = ConfigurationManager.ConnectionStrings["connStr"].ConnectionString;

            SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();
            return conn;
        }
        /// <summary>
        /// Gets data out of the database
        /// </summary>
        /// <param name="cmd">The SQL Command</param>
        /// <returns>DataTable with the results</returns>
        public static DataTable GetData(SqlCommand cmd)
        {
            try
            {
                if (cmd.Connection != null)
                {
                    using (DataSet ds = new DataSet())
                    {
                        using (SqlDataAdapter da = new SqlDataAdapter())
                        {
                            da.SelectCommand = cmd;
                            da.Fill(ds);
                            return ds.Tables[0];
                        }
                    }
                }
                else
                {
                    using (SqlConnection conn = GetConnection())
                    {
                        using (SqlTransaction trans = conn.BeginTransaction(m_isoLevel))
                        {
                            try
                            {
                                cmd.Transaction = trans;
                                using (DataSet ds = new DataSet())
                                {
                                    using (SqlDataAdapter da = new SqlDataAdapter())
                                    {
                                        da.SelectCommand = cmd;
                                        da.SelectCommand.Connection = conn;
                                        da.Fill(ds);
                                        return ds.Tables[0];
                                    }
                                }
                            }
                            finally
                            {
                                trans.Commit();
                            }
                        }
                    }
                }
            }
            finally
            {
            }
        }
        /// <summary>
        /// Gets data out of database using a plain text string command
        /// </summary>
        /// <param name="sql">string command to be executed</param>
        /// <returns>DataTable with results</returns>
        static public DataTable GetData(string sql)
        {
            try
            {
                using (SqlConnection conn = GetConnection())
                {
                    using (SqlTransaction trans = conn.BeginTransaction(m_isoLevel))
                    {
                        try
                        {
                            using (SqlCommand cmd = conn.CreateCommand())
                            {
                                cmd.Transaction = trans;
                                cmd.CommandType = CommandType.Text;
                                cmd.CommandText = sql;
                                using (DataSet ds = new DataSet())
                                {
                                    using (SqlDataAdapter da = new SqlDataAdapter())
                                    {
                                        da.SelectCommand = cmd;
                                        da.SelectCommand.Connection = conn;
                                        da.Fill(ds);
                                        return ds.Tables[0];
                                    }
                                }
                            }
                        }
                        finally
                        {
                            trans.Commit();
                        }
                    }
                }
            }
            finally
            {

            }
        }
        /// <summary>
        /// Executes a NonQuery
        /// </summary>
        /// <param name="cmd">NonQuery to execute</param>
        static public void ExecuteNonQuery(SqlCommand cmd)
        {

            try
            {
                using (SqlConnection conn = GetConnection())
                {
                    using (SqlTransaction trans = conn.BeginTransaction(m_isoLevel))
                    {
                        cmd.Connection = conn;
                        cmd.Transaction = trans;
                        cmd.ExecuteNonQuery();
                        trans.Commit();
                    }
                }
            }
            finally
            {

            }
        }


        static public object ExecuteScalar(SqlCommand cmd)
        {

            try
            {
                using (SqlConnection conn = GetConnection())
                {
                    using (SqlTransaction trans = conn.BeginTransaction(m_isoLevel))
                    {
                        cmd.Connection = conn;
                        cmd.Transaction = trans;
                        object res = cmd.ExecuteScalar();
                        trans.Commit();
                        return res;
                    }
                }
            }
            finally
            {

            }
        }
        /// <summary>
        /// Gets the database size
        /// </summary>
        /// <returns>intager value for database size</returns>
        static public int DBSize()
        {
            using (SqlCommand cmd = new SqlCommand("select sum(cast(size as integer))/128 from sysfiles"))
            {
                cmd.CommandType = CommandType.Text;
                return (int)ExecuteScalar(cmd);
            }
        }
        #endregion


        public static int ExecuteCommand(string sql)
        {
            try
            {
                using (SqlConnection conn = GetConnection())
                {

                    using (SqlCommand cmd = new SqlCommand(sql, conn))
                    {
                        int result = cmd.ExecuteNonQuery();
                        return result;
                    }
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
            
        }

        public static int ExecuteCommand(string sql, params SqlParameter[] values)
        {
            int num = 0;
            try
             {
                using (SqlConnection conn = GetConnection())
                {

                    using (SqlCommand cmd = new SqlCommand(sql, conn))
                    {
                         cmd.Parameters.AddRange(values);
                         num = cmd.ExecuteNonQuery();
                    }
                }
             }

            catch (Exception e)
            {
                throw (e);
            }
            finally
            {

            }
            return num;
        }

        public static int ExecuteProcedure(string sql, params SqlParameter[] values)
        {
            int num = 0;
            try
             {
                using (SqlConnection conn = GetConnection())
                {

                    using (SqlCommand cmd = new SqlCommand(sql, conn))
                    {
                         cmd.CommandType = CommandType.StoredProcedure;
                         cmd.Parameters.AddRange(values);
                         num = cmd.ExecuteNonQuery();
                    }
                }
             }

            catch (Exception e)
            {
                throw (e);
            }
            finally
            {

            }
            return num;
        }

        public static string ReturnStringScalar(string sql)
        {
            try
            {
                using (SqlConnection conn = GetConnection())
                {

                    using (SqlCommand cmd = new SqlCommand(sql, conn))
                    {
                        string result = cmd.ExecuteScalar().ToString();
                        return result;
                    }
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        public static string ReturnStringScalar(string sql, params SqlParameter[] values)
        {
            try
            {
                using (SqlConnection conn = GetConnection())
                {

                    using (SqlCommand cmd = new SqlCommand(sql, conn))
                    {
                        cmd.Parameters.AddRange(values);
                        string result = cmd.ExecuteScalar().ToString();
                        return result;
                    }
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        public static int GetScalar(string sql)
        {
            try
            {
                using (SqlConnection conn = GetConnection())
                {
                    using (SqlCommand cmd = new SqlCommand(sql, conn))
                    {
                        int result = Convert.ToInt32(cmd.ExecuteScalar());
                        return result;
                    }
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        public static int GetScalar(string sql, params SqlParameter[] values)
        {
            try
            {
                using (SqlConnection conn = GetConnection())
                {
                    using (SqlCommand cmd = new SqlCommand(sql, conn))
                    {
                        cmd.Parameters.AddRange(values);
                        int result = Convert.ToInt32(cmd.ExecuteScalar());
                        return result;
                    }
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }


        public static SqlDataReader GetReader(string sql)
        {
            try
            {
                using (SqlConnection conn = GetConnection())
                {
                    using (SqlCommand cmd = new SqlCommand(sql, conn))
                    {
                        return cmd.ExecuteReader(CommandBehavior.CloseConnection);
                    }
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        public static SqlDataReader GetReader(string sql, params SqlParameter[] values)
        {
            try
            {
                using (SqlConnection conn = GetConnection())
                {
                    using (SqlCommand cmd = new SqlCommand(sql, conn))
                    {
                        cmd.Parameters.AddRange(values);
                        return cmd.ExecuteReader(CommandBehavior.CloseConnection);
                    }
                }
            }
            catch (Exception e)
            {
                throw (e);
            }

        }

        public static DataTable GetDataSet(string sql)
        {
            try
            {
                using (SqlConnection conn = GetConnection())
                {
                    using (SqlCommand cmd = new SqlCommand(sql, conn))
                    {
                        using (DataSet ds = new DataSet())
                        {
                            using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                            {
                                da.Fill(ds);
                                return ds.Tables[0];
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                throw (e);
            }

        }

        public static DataTable GetDataSet(string sql, params SqlParameter[] values)
        {
            try
            {
                using (SqlConnection conn = GetConnection())
                {
                    using (SqlCommand cmd = new SqlCommand(sql, conn))
                    {
                        cmd.Parameters.AddRange(values);
                        using (DataSet ds = new DataSet())
                        {
                            using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                            {
                                da.Fill(ds);
                                return ds.Tables[0];
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                throw (e);
            }

        }

    }
}
