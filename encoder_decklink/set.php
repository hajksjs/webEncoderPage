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
  <div class="banner"><img src="images/img_2.gif" width="100%" height="148" /></div>

  <div class="main">
    <div class="right">
			<form name="myform" method="post" action="">
				<input type="submit" name="buttonstatus" class="button1" value="工作状态" id="buttonstatus" /> 
				<input type="submit" name="buttonset" class="button1" value="配置" id="buttonset" style="background-color:#4CAF50"/>
			</form>	  
        <form name="form1" method="post" action="">
          <table width="100%" cellspacing="0" cellpadding="0"  style="word-wrap:break-word; word-break:break-all;">
            <tr>
              <td width="6%" height="20"></td>
            </tr>
            <tr>
			<td width="6%" height="20"></td>
              <td height="45"  align="left" class="textstyle3  " colspan="2"><label>视频</label></td>
              <td height="45"  align="left" class="textstyle3  " colspan="2"><label>复用设置</label></td>
              <td height="45"  align="left" class="textstyle3   " colspan="2"><label>输出</label></td>
			  <td width="5%" height="20"></td>
            </tr>
            <tr>
			<td width="6%" height="20"></td>
              <td width="13%" height="35" align="center" class="textstyle5 " >分辨率/帧率：</td>
              <td align="left" ><select name="select"  id="selectvideoset" style="WIDTH: 230px">
                </select>
                  <select name="select"  id="selectdevice"  style="WIDTH: 0px">
                </select></td>
              <td height="35" width="9%"  align="center" class="textstyle5 " >比特率：</td>
              <td width="19%" align="left"><input name="text" type="text" id="textfieldmuxoutputbitset"  style="WIDTH: 50px;HEIGHT:23px" />
                  <label  class="textstyle5">mbps</label>
              <label  class="textstyle2">（大于视频+音频总码率）</label></td>
              <td height="35" align="left" style="font-size:16px;color:#000000" class=""><input type="radio" name="output"  id="outputASI" class="radio" checked="checked"/>
              <label> TS over ASI</label></td>
              
            </tr>
            <tr>
			<td width="6%" height="20"></td>
              <td height="35" align="center" class="textstyle5 ">编码级别：</td>
              <td align="left" width="18%"><select name="select"  id="selectvediolevelset" style="WIDTH: 230px">
              </select></td>
              <td height="35" align="center" class="textstyle5 ">节目号：</td>
              <td align="left"><input name="text2" type="text" id="textfieldserviceidset"  style="WIDTH: 50px;HEIGHT:23px" />
                &nbsp;
                <label  class="textstyle2">（0——65535）</label></td>
              <td align="left" colspan="2" height="22" class=" " style="padding-left:5px"><select name="selectoutputset"  id="selectoutputset" style="WIDTH: 230px">
              </select></td>
            </tr>
            <tr>
			<td width="6%" height="20"></td>
              <td height="35" align="center" class="textstyle5 ">码率：</td>
              <td align="left"><select name="select" id="selectvediobitrateset" style="position: absolute; width: 230px; height: 22px; top: 351px;" onChange="javascript:document.getElementById('inputvediobit').value=document.getElementById('selectvediobitrateset').options[document.getElementById('selectvediobitrateset').selectedIndex].text;">
                                                                                                                                                                                                                                                </select>
                  <input name="text"  type="text" id="inputvediobit"  style="position: absolute; WIDTH: 210px; top: 351px; height:18px" value="输入或选择"/>
              </td>
              <td height="35" align="center" class="textstyle5 ">节目名：</td>
              <td align="left"><input name="text" type="text" id="textfieldservicenameset"  style="WIDTH: 230px;HEIGHT:23px" /></td>
              <td height="35" align="left" style="font-size:16px;color:#000000" width="15%" class=""><input type="radio" name="output"  id="outputIP" class="radio"/>
              <label> TS over IP</label></td>
            </tr>
            <tr>
			<td width="6%" height="20"></td>
              <td height="35" align="center" class="textstyle5 ">GOP长度：</td>
              <td align="left" width="18%"><input name="text" type="text" id="text"  style="WIDTH: 230px;HEIGHT:23px" /></td>
              <td height="35" align="center" class="textstyle5 ">提供商：</td>
              <td align="left"><input name="text" type="text" id="textfieldproviderset"  style="WIDTH: 230px;HEIGHT:23px" /></td>
			  <td align="left" colspan="2" height="20" class=" " style="padding-left:5px"><input name="text4" type="text" id="textfieldoutputnameset" style="WIDTH: 230px;HEIGHT:23px" value="udp://192.168.3.169:9002" /></td>
			  
            </tr>
            <tr>
			<td width="6%" height="20"></td>
              <td height="35" align="center" class="textstyle5 ">GOP结构：</td>
              <td align="left"><label class="textstyle5">M=</label>
                  <input name="text" type="text" id="text"  style="WIDTH: 40px;HEIGHT:23px" />
                &nbsp;&nbsp;&nbsp;
                <label class="textstyle5">N=</label>
                <input name="text" type="text" id="text"  style="WIDTH: 40px;HEIGHT:23px" /></td>
			  
              <td class="" colspan="2"></td>
			  <td class=" " colspan="2"></td>
            </tr>
            <tr>
			<td width="6%" height="20"></td>
              <td height="45"  align="left" class="textstyle3 "><label>音频</label></td>
              <td style="font-size:16px;color:#000000" align="left"><p>
                  <input type="checkbox" name="category"  id="category" checked="checked"/>
                勾选启用</p></td>
			  <td height="35" align="center" class="textstyle5 ">视频 PID：</td>
              <td align="left"><input name="text3" type="text" id="textfieldvediopidset"  style="WIDTH: 50px;HEIGHT:23px" />
                &nbsp;
                <label  class="textstyle2">（32——3840）</label></td>
              <td height="45"  align="left" class="textstyle3   " colspan="2"><label>状态简析</label></td>
            </tr>
            <tr>
			<td width="6%" height="20"></td>
              <td height="35" align="center" class="textstyle5 ">编码器：</td>
              <td width="18%" align="left" ><select name="select2"  id="selectaudiocodecset" style="WIDTH: 230px">
                </select>
                  <select name="select"  id="selectaudio" style="WIDTH: 0px">
              </select></td>
              <td align="center" class="textstyle5 ">PMT PID： </td>
              <td align="left"><input name="text5" type="text" id="textfieldpmtpidset"  style="WIDTH: 50px;HEIGHT:23px" />
                &nbsp;
                <label  class="textstyle2">（10——7936）</label></td>
              <td height="35" align="left" class="textstyle5   " id="textfieldstatus" rowspan="4" colspan="2">encoder</td>
            </tr>
            <tr>
			<td width="6%" height="20"></td>
              <td height="35" align="center" class="textstyle5 ">采样率：</td>
              <td align="left"><select name="select"  id="selectaudiosamplerateset" style="WIDTH: 120px">
                </select>
                  <label  class="textstyle5">&nbsp;Hz</label></td>
              
              <td align="center" class="textstyle5 ">音频 PID： </td>
              <td align="left"><label id="textfieldaudiopidset" class="textstyle5" ></label>
                  <label  class="textstyle2">（视频pid+1）</label></td>
            </tr>
            <tr>
			<td width="6%" height="20"></td>
              <td align="center" class="textstyle5 " height="35">声道： </td>
              <td align="left" ><select name="select"  id="selectaudiochannelset" style="WIDTH: 230px">
              </select></td>
              <td align="center" class="textstyle5 ">PCR  PID： </td>
              <td align="left" ><label id="textfieldpcrpidset" class="textstyle5" ></label>
                  <label  class="textstyle2">（和视频pid相同）</label></td>
            </tr>
            <tr>
			<td width="6%" height="20"></td>
              <td align="center" class="textstyle5  " height="35">码率： </td>
              <td align="left"><select name="select"  id="selectaudiobitrateset" style="WIDTH: 120px">
                </select>
                  <label  class="textstyle5">&nbsp;kbps</label></td>
              <td class=" " colspan="2"></td>
            </tr>
            <tr>
              <td height="37"></td>
            </tr>
            <tr>
              <td height="37" align="center" colspan="8" ><input name="Input" type="button" class="button" id="Input" value="导入配置文件" />
                  <input name="button" type="button" class="button" id="Submitstop" value="停止" />
                  <input name="button" type="button" class="button" id="Submitstart" value="应用" /></td>
            </tr>
          </table>
        </form>            

    </div>
  </div>
</div>



</body>
</html>
