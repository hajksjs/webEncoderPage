<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title> 配置界面</title>
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
			<input type="submit" name="buttonwork" class="button1" value="工作状态" id="buttonwork" /> 
			<input type="submit" name="buttonsetting" class="button1" value="配置" id="buttonsetting" style="background-color:#4CAF50"/>

 		</form>

	  
        <form name="form1" method="post" action="">
          <table width="136%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td width="19%" height="20"></td>
            </tr>
            <tr>
              <td height="45"  align="left" class="textstyle3" colspan="2"><label>视频</label></td>
              <td width="17%" height="45"  align="left" class="textstyle3" ><label>音频</label></td>
              <td width="30%" style="font-size:16px;color:#000000"><p>
                  <input type="checkbox" name="category"  id="category" checked="checked"/>
                勾选启用</p></td>
            </tr>
			
            <tr>
              <td height="35" align="center" class="textstyle5" >分辨率/帧率：</td>
              <td >
			  
			  <select name="select"  id="selectvideoset" style="WIDTH: 230px">
                </select>
                  <select name="select"  id="selectdevice"  style="WIDTH: 0px">
                </select></td>
              <td height="35" align="center" class="textstyle5" >编码器：</td>
              <td><select name="select"  id="selectaudiocodecset" style="WIDTH: 230px">
                </select>
                  <select name="select"  id="selectaudio" style="WIDTH: 0px">
                </select></td>
            </tr>
            <tr>
              <td height="35" align="center" class="textstyle5">编码级别：</td>
              <td width="32%"><select name="select"  id="selectvediolevelset" style="WIDTH: 230px">
              </select></td>
              <td height="35" align="center" class="textstyle5">采样率：</td>
              <td><select name="select"  id="selectaudiosamplerateset" style="WIDTH: 120px">
                </select>
                  <label  class="textstyle5">&nbsp;Hz</label></td>
            </tr>
            <tr>
				<td height="35" align="center" class="textstyle5">码率：</td>
				<td align="left">
				  <select id="selectvediobitrateset" style="position: absolute; width: 230px; height: 20px; top: 411px;" onchange="javascript:document.getElementById('inputvediobit').value=document.getElementById('selectvediobitrateset').options[document.getElementById('selectvediobitrateset').selectedIndex].text;">  
				  </select>

				 <input id="inputvediobit"  type="text" value="输入或选择"  style="position: absolute; WIDTH: 210px; top: 411px; height:18px"/>			  </td>
              
              <td height="35" align="center" class="textstyle5">声道：</td>
              <td><select name="select"  id="selectaudiochannelset" style="WIDTH: 230px">
              </select></td>
            </tr>
            <tr>
              <td height="35" align="center" class="textstyle5">GOP长度：</td>
              <td width="32%"><input name="text" type="text" id="text"  style="WIDTH: 230px;HEIGHT:23px" /></td>
              <td height="35" align="center" class="textstyle5">码率：</td>
              <td><select name="select"  id="selectaudiobitrateset" style="WIDTH: 120px">
                </select>
                  <label  class="textstyle5">&nbsp;kbps</label></td>
              <td width="2%"></td>
            </tr>
            <tr>
              <td height="35" align="center" class="textstyle5">GOP结构：</td>
              <td width="32%"><label class="textstyle5">M=</label>
                  <input name="text" type="text" id="text"  style="WIDTH: 40px;HEIGHT:23px" />
                &nbsp;&nbsp;&nbsp;
                  <label class="textstyle5">N=</label>
                <input name="text" type="text" id="text"  style="WIDTH: 40px;HEIGHT:23px" /></td>
            </tr>
            <tr>
              <td height="45"  align="left" class="textstyle3"><label>复用设置</label></td>
            </tr>
            <tr>
              <td height="35" align="center" class="textstyle5">比特率：</td>
              <td ><input name="text" type="text" id="textfieldmuxoutputbitset"  style="WIDTH: 50px;HEIGHT:23px" />
                  <label  class="textstyle5">mbps</label>
                <label  class="textstyle2">（大于视频+音频总码率）</label></td>
              <td align="center" class="textstyle5">PMT PID： </td>
              <td><input name="text" type="text" id="textfieldpmtpidset"  style="WIDTH: 50px;HEIGHT:23px" />
                &nbsp;
                <label  class="textstyle2">（10——7936）</label></td>
            </tr>
            <tr>
              <td height="35" align="center" class="textstyle5">节目号：</td>
              <td><input name="text2" type="text" id="textfieldserviceidset"  style="WIDTH: 50px;HEIGHT:23px" />
                &nbsp;
                <label  class="textstyle2">（0——65535）</label></td>
              <td height="35" align="center" class="textstyle5">视频 PID：</td>
              <td><input name="text3" type="text" id="textfieldvediopidset"  style="WIDTH: 50px;HEIGHT:23px" />
                &nbsp;
                <label  class="textstyle2">（32——3840）</label></td>
            </tr>
            <tr>
              <td align="center" class="textstyle5" height="35">节目名： </td>
              <td><input name="text" type="text" id="textfieldservicenameset"  style="WIDTH: 230px;HEIGHT:23px" /></td>
              <td align="center" class="textstyle5">音频 PID： </td>
              <td><label id="textfieldaudiopidset" class="textstyle5" ></label>
                  <label  class="textstyle2">（视频pid+1）</label></td>
            </tr>
            <tr>
              <td align="center" class="textstyle5" height="35">提供商： </td>
              <td><input name="text" type="text" id="textfieldproviderset"  style="WIDTH: 230px;HEIGHT:23px" /></td>
              <td align="center" class="textstyle5">PCR  PID： </td>
              <td><label id="textfieldpcrpidset" class="textstyle5" ></label>
                  <label  class="textstyle2">（和视频pid相同）</label></td>
            </tr>
            <tr>
              <td height="45"  align="left" class="textstyle3"><label>输出</label></td>
            </tr>
            <tr>
              <td height="35" width="30%" align="center" style="font-size:16px;color:#000000">                  <input type="radio" name="output"  id="outputASI" class="radio" checked="checked"/>
                  <label> TS over ASI</label>              </td>
			  <td colspan="3"><select name="selectoutputset"  id="selectoutputset" style="WIDTH: 230px">
              </select></td>
            </tr>
            <tr>
				<td height="35" width="30%" align="center" style="font-size:16px;color:#000000">
				  <input type="radio" name="output"  id="outputIP" class="radio"/>
               	<label> TS over IP</label>              </td>
                <td colspan="3"><input name="text4" type="text" id="textfieldoutputnameset" style="WIDTH: 230px;HEIGHT:23px" value="udp://192.168.3.169:9002" /></td>
            </tr>
            <tr>
              <td height="45"  align="left" class="textstyle3"><label>状态简析</label></td>
            </tr>
            <tr>
              <td></td>
              <td height="35" align="left" colspan="3" class="textstyle5" id="textfieldstatus"></td>
            </tr>
            <tr>
              <td height="37" align="right" colspan="4" >
			  <input name="" type="button" class="button" id="" value="导入配置文件" />
			  <input name="button" type="button" class="button" id="Submitstop" value="停止" />
                  <input name="button" type="button" class="button" id="Submitstart" value="应用" /></td>
            </tr>
          </table>
        </form>            
      </div>
    </div>
  </div>
</div>



</body>
</html>
