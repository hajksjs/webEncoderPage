<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title> 用户界面</title>
<link href="css/work.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="loadui.js"></script>  
</head>
<body>
<div class="zhong">
  <div class="banner"><img src="images/img_2.gif" /></div>

  <div class="main">
    <div class="right">
      <div class="news">
	  	<form name="myform" method="post" action="">
			<input type="submit" class="button1" name="buttonwork" value="工作状态" id="buttonwork" /> 
			<input type="submit" class="button1" name="buttonsetting" value="配置" id="buttonsetting" />
			<input type="submit" class="button1" name="buttonuser" value="密码管理" id="buttonuser" style="background-color:#4CAF50"/> 
 		</form>
	  
        <form id="form1" name="form1" method="post" action="">
          <table width="136%" border="0" cellspacing="0" cellpadding="0">

            <tr>
            	<td width="20%" height="20"></td>
            </tr>
			
			<tr>
				<td height="40" align="right" class="textstyle5">原始密码：&nbsp;&nbsp;</td>
			  <td width="30%"><input type="password" id="" name=""  placeholder="请输入密码" value="123"   style="WIDTH: 190px;HEIGHT:27px" /></td>
				<td width="50%">&nbsp;</td>
			</tr>
			
			<tr>
				<td height="40" align="right" class="textstyle5">新改密码：&nbsp;&nbsp;</td>
				<td><input type="password" id="changepassword" name="changepassword"  placeholder="···" value=""   style="WIDTH: 190px;HEIGHT:27px" /></td>
			</tr>
			
			<tr>
				<td height="40" align="right" class="textstyle5">确认密码：&nbsp;&nbsp;</td>
				<td><input  type="password" id="" name=""  placeholder="···" value=""    style="WIDTH: 190px;HEIGHT:27px" /></td>
			</tr>
			
			<tr>
				<td height="20"></td>
            </tr>
			
            <tr>
            	<td height="37" align="right" colspan="2" ><input type="button" class="button" name="changebutton" value="修改密码" id="changebutton" /></td>
            </tr>

          </table>
        </form>  
		          
      </div>
    </div>

  </div>
  </div>

</body>
</html>
