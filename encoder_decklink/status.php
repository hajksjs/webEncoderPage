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
  <div class="banner"><img src="images/img_2.gif" width="100%" height="148" /></div>

  <div class="main">
    <div class="right">

	  	<form name="myform" method="post" action="">
	  	  <input type="submit" class="button1" name="buttonstatus" value="工作状态" id="buttonstatus" style="background-color:#4CAF50"/>
	  	  <input type="submit" class="button1" name="buttonset" value="配置" id="buttonset" />

	  	</form>
	  
        <form id="form1" name="form1" method="post" action="">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">

            <tr>
              <td height="20"></td>
            </tr>


            <tr>
			  <td width="19%" align="right" ></td>
              <td  height="35" width="23%" class="textstyle3" align="left">视频</td>
              <td width="20%" class="textstyle3" align="left">复用信息</td>
			  <td width="20%" height="45"  align="left" class="textstyle3"><label>硬件状态：</label><input name="button" type="button" class="button" id="" value="导出告警日志" /></td>

			  <td width="18%" align="right" ></td>
            </tr>
            <tr>
			<td width="19%" align="right" ></td>
              <td  height="35" align="left" class="textstyle5">分辨率：&nbsp;
                  <label id="width" class="textstyle4"></label>
                  <label class="textstyle4">&nbsp;x&nbsp;</label>
                  <label id="height" class="textstyle4"></label></td>
              
				<td width="20%" align="left" class="textstyle3"></td>

				<td align="left" colspan="2"><label class="textstyle5">电源：</label><button  class=buttongreen  id="" name=""></button>  <button  class=buttongreen  id="" name=""></button></td>

				
            </tr>
            <tr>
			<td width="19%" align="right" ></td>
              <td  height="35" align="left" class="textstyle5">帧&nbsp;率：&nbsp;
                  <label id="veidofpswork" class="textstyle4" ></label>
                <label class="textstyle4" >&nbsp;&nbsp;帧/秒</label></td>
				<td align="left" class="textstyle5">输出码率：
                  <label id="textfieldmuxoutputbitwork" class="textstyle4" ></label>
                <label class="textstyle4" >mbps</label></td>
              

				<td align="left" colspan="2"><label class="textstyle5">输入信号：</label><button  class=buttongreen  id="" name=""></button></td>
            </tr>
            <tr>
			<td width="19%" align="right" ></td>
              <td  height="35" align="left" class="textstyle5">码&nbsp;率：&nbsp;
                  <label id="vediobitratework" class="textstyle4" ></label>
                <label class="textstyle4" >mbps</label></td>
              <td align="left" class="textstyle5">节目名：&nbsp;
                  <label id="textfieldservicenamework" class="textstyle4" ></label></td>

				<td align="left" colspan="2"><label class="textstyle5">编码板：</label><button  class=buttongreen  id="" name=""></button> <button  class=buttongreen  id="" name=""></button> <button  class=buttongreen  id="" name=""></button> <button  class=buttongreen  id="" name=""></button></td>
            </tr>
            <tr>
			<td width="19%" align="right" ></td>
              <td   height="35" align="left" class="textstyle5">编码等级：
                  <label id="vediolevelwork" class="textstyle4" ></label></td>
              <td align="left" class="textstyle5">提供商：&nbsp;
                  <label id="textfieldproviderwork" class="textstyle4" ></label></td>
				  
				<td align="left" colspan="2"><label class="textstyle5">风扇：</label><button  class=buttongreen  id="" name=""></button> <button  class=buttongreen  id="" name=""></button> <button  class=buttongreen  id="" name=""></button> <button  class=buttongreen  id="" name=""></button> <button  class=buttongreen  id="" name=""></button></td>
			 
            </tr>
			<tr>
				<td width="19%" align="right" ></td>
              <td  height="35" align="left" class="textstyle5">GOP长度：
                  <label id="" class="" ></label></td>
				  <td align="left" class="textstyle5">节目号：&nbsp;
                  <label id="textfieldserviceidwork" class="textstyle4" ></label></td>
				  
				  
				  
              
            </tr>
			<tr>
			<td width="19%" align="right" ></td>	
              <td  height="35" align="left" class="textstyle5" >GOP结构： M = 
                  <label id="" class="" ></label>N = <label id="" class="" ></label></td>
				  
			  <td align="left" class="textstyle5">PCR  PID：&nbsp;
                  <label id="textfieldpcrpidwork" class="textstyle4" ></label></td>
				  <td align="left" class="textstyle3" colspan="2"  rowspan="2"><label>流输出：</label><label id="textfieldoutputnamework" class="textstyle4" ></label></td>
            </tr>
            <tr>
			<td width="19%" align="right" ></td>
				<td  height="35" width="23%" class="textstyle3" align="left">音频</td>
				<td align="left" class="textstyle5">音频 PID：&nbsp;
                  <label id="textfieldaudiopidwork" class="textstyle4" ></label></td>
            
            </tr>
            <tr>
			<td width="19%" align="right" ></td>
              <td height="35" align="left" class="textstyle5">编码器：&nbsp;
                  <label id="audiocodecwork" class="textstyle4" ></label></td>
              
              <td align="left" class="textstyle5">PMT  PID：&nbsp;<label id="textfieldpmtpidwork" class="textstyle4" ></label></td>
		      
            </tr>
            <tr>
			<td width="19%" align="right" ></td>
              <td height="35"  align="left" class="textstyle5">采样率：&nbsp;
                  <label id="audiosampleratework" class="textstyle4" ></label></td>
              <td  align="left" class="textstyle5">视频 PID：&nbsp;
                  <label id="textfieldvediopidwork" class="textstyle4" ></label></td>    
				  
				  <td align="left" class="textstyle3" colspan="2" ><label>当前状态：</label><label id="textclientcurstatus" class="textstyle4" ></label></td>         
            </tr>
			<tr>
			<td width="19%" align="right" ></td>
              <td height="35"  align="left" class="textstyle5">声&nbsp;道：&nbsp;
                  <label id="audiochannelwork" class="textstyle4" ></label></td>
              
              
            </tr>
			<tr>
			<td width="19%" align="right" ></td>
              <td height="35"  align="left" class="textstyle5" colspan="2">码&nbsp;率：&nbsp;
                  <label id="audiobitratework" class="textstyle4" ></label>
                <label class="textstyle4" >kbps</label></td>
				
				
              
              
            </tr>


            <tr>
              <td colspan="5" align="center"><input name="button" type="button" class="button" id="buttonstartup" value="开始" />               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="button" class="button"  value="重启" id="buttonreset" />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="button" class="button" value="关机" id="buttonshutdown" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="button" class="button" value="导出参数配置" id="" /></td>
            </tr>
			

			<tr>
				
			</tr>
			<tr>
				
			</tr>
			<tr>
				
			</tr>
			
            <tr>
              <td height="20"></td>
			  
            </tr>
            <tr>
              </tr>
          </table>
        </form>            
    </div>
  </div>
</div>

</body>
</html>
