<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title> 工作界面</title>
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
	  	  <input type="submit" class="button1" name="buttonwork" value="工作状态" id="buttonwork" style="background-color:#4CAF50"/>
	  	  <input type="submit" class="button1" name="buttonsetting" value="配置" id="buttonsetting" />

	  	</form>
	  
        <form id="form1" name="form1" method="post" action="">
          <table width="136%" border="0" cellspacing="0" cellpadding="0">

            <tr>
              <td height="20"></td>
            </tr>

            <tr>
              <td height="45" align="left" class="textstyle3"><label>当前状态：</label></td>
              <td align="left" class="textstyle4" id="textclientcurstatus" colspan="2">&nbsp;</td>
            </tr>
            <tr>
              <td height="45" align="left" class="textstyle3"><label>当前配置：</label></td>
            </tr>
            <tr>
              <td height="35"></td>
              <td width="40%" class="textstyle3">视频</td>
              <td width="40%" class="textstyle3">音频</td>
            </tr>
            <tr>
              <td height="35">&nbsp;</td>
              <td align="left" class="textstyle5">分辨率：&nbsp;
                  <label id="width" class="textstyle4"></label>
                  <label class="textstyle4">&nbsp;x&nbsp;</label>
                  <label id="height" class="textstyle4"></label></td>
              <td align="left" class="textstyle5">编码器：&nbsp;
                  <label id="audiocodecwork" class="textstyle4" ></label></td>
            </tr>
            <tr>
              <td height="35">&nbsp;</td>
              <td align="left" class="textstyle5">帧&nbsp;率：&nbsp;
                  <label id="veidofpswork" class="textstyle4" ></label>
                <label class="textstyle4" >&nbsp;&nbsp;帧/秒</label></td>
              <td align="left" class="textstyle5">采样率：&nbsp;
                  <label id="audiosampleratework" class="textstyle4" ></label></td>
            </tr>
            <tr>
              <td height="35">&nbsp;</td>
              <td align="left" class="textstyle5">码&nbsp;率：&nbsp;
                  <label id="vediobitratework" class="textstyle4" ></label>
                <label class="textstyle4" >mbps</label></td>
              <td align="left" class="textstyle5">声&nbsp;道：&nbsp;
                  <label id="audiochannelwork" class="textstyle4" ></label></td>
            </tr>
            <tr>
              <td height="35">&nbsp;</td>
              <td align="left" class="textstyle5">编码等级：
                  <label id="vediolevelwork" class="textstyle4" ></label></td>
              <td align="left" class="textstyle5">码&nbsp;率：&nbsp;
                  <label id="audiobitratework" class="textstyle4" ></label>
                <label class="textstyle4" >kbps</label></td>
            </tr>
			<tr>
              <td height="35">&nbsp;</td>
              <td align="left" class="textstyle5" colspan="2">GOP长度：
                  <label id="" class="" ></label></td>
            </tr>
			<tr>
              <td height="35">&nbsp;</td>
              <td align="left" class="textstyle5" colspan="2">GOP结构： M = 
                  <label id="" class="" ></label>N = <label id="" class="" ></label></td>
            </tr>
            <tr>
              <td height="45" align="left" class="textstyle3"><label>复用信息:</label></td>
            </tr>
            <tr>
              <td height="35">&nbsp;</td>
              <td align="left" class="textstyle5">输出码率：
                  <label id="textfieldmuxoutputbitwork" class="textstyle4" ></label>
                <label class="textstyle4" >mbps</label></td>
              <td align="left" class="textstyle5">PMT  PID：&nbsp;<label id="textfieldpmtpidwork" class="textstyle4" ></label></td>
            </tr>
            <tr>
              <td height="35">&nbsp;</td>
              <td align="left" class="textstyle5">节目号：&nbsp;
                  <label id="textfieldserviceidwork" class="textstyle4" ></label></td>
              <td align="left" class="textstyle5">视频 PID：&nbsp;
                  <label id="textfieldvediopidwork" class="textstyle4" ></label></td>
            </tr>
			<tr>
              <td height="35">&nbsp;</td>
              <td align="left" class="textstyle5">节目名：&nbsp;
                  <label id="textfieldservicenamework" class="textstyle4" ></label></td>
              <td align="left" class="textstyle5">音频 PID：&nbsp;
                  <label id="textfieldaudiopidwork" class="textstyle4" ></label></td>
            </tr>
			<tr>
              <td height="35">&nbsp;</td>
              <td align="left" class="textstyle5">提供商：&nbsp;
                  <label id="textfieldproviderwork" class="textstyle4" ></label></td>
              <td align="left" class="textstyle5">PCR  PID：&nbsp;
                  <label id="textfieldpcrpidwork" class="textstyle4" ></label></td>
            </tr>
            <tr>
              <td height="45" align="left" class="textstyle3"><label>流输出：</label></td>
              <td align="left" colspan="2" class="textstyle4" id="textfieldoutputnamework"></td>
            </tr>

            <tr>
              <td width="20%" height="45"  align="left" class="textstyle3"><label>硬件状态：</label></td>
              			
				<td align="left" >
					<button  class=buttonred  id="" name="" ></button><label class="textstyle5">表示正常</label>
                	<button  class=buttongreen  id="" name="" ></button><label class="textstyle5">表示有故障</label>                </td>
				<td><input name="button" type="button" class="button" id="" value="导出告警日志" /> </td>
            </tr>
			
			<tr>
				<td width="20%" height="45"  align="left" class="textstyle3"></td>
				<td align="left" colspan="2"><label class="textstyle5">电源：</label><button  class=buttongreen  id="" name=""></button>  <button  class=buttongreen  id="" name=""></button><td>
			</tr>
			<tr>
				<td width="20%" height="45"  align="left" class="textstyle3"></td>
				<td align="left" colspan="2"><label class="textstyle5">风扇：</label><button  class=buttongreen  id="" name=""></button> <button  class=buttongreen  id="" name=""></button> <button  class=buttongreen  id="" name=""></button> <button  class=buttongreen  id="" name=""></button> <button  class=buttongreen  id="" name=""></button><td>
			</tr>
			<tr>
				<td width="20%" height="45"  align="left" class="textstyle3"></td>
				<td align="left" colspan="2"><label class="textstyle5">电源：</label><button  class=buttongreen  id="" name=""></button><td>
			</tr>
			<tr>
				<td width="20%" height="45"  align="left" class="textstyle3"></td>
				<td align="left" colspan="2"><label class="textstyle5">电源：</label><button  class=buttongreen  id="" name=""></button> <button  class=buttongreen  id="" name=""></button> <button  class=buttongreen  id="" name=""></button> <button  class=buttongreen  id="" name=""></button><td>
			</tr>
			
            <tr>
              <td height="20"></td>
			  
            </tr>
            <tr>
              <td height="45" align="left" class="textstyle3"><label>操作：</label></td>
              <td colspan=2><input name="button" type="button" class="button" id="buttonstartup" value="开始" />               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="button" class="button"  value="重启" id="buttonreset" />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="button" class="button" value="关机" id="buttonshutdown" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="button" class="button" value="导出参数配置" id="" /></td></tr>
          </table>
        </form>            
      </div>
    </div>

  </div>
  </div>

</body>
</html>
