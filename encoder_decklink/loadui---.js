// JavaScript Document
function removeAllSpace(str) {
return str.replace(/\s+/g, "");
}

function getaudioshowname(audiochannelname)
{
	var channel12 = "1";
	if(audiochannelname == "stereo")
		channel12 = "2";
	return channel12;
}

function setcomboxselectbytext(com, seltext)
{
	var count=$("#selectvideoset option:last").index();	
  //alert(com.style);
  for(var i=0;i<count;i++) 
  { 
  		//if(com.get(0).options[i].text == undefined)
  	//if(com.get(0).options[i].text != undefined)
  	{
    	if(com.get(0).options[i].text == seltext) 
    	{ 	
        	com.get(0).options[i].selected = true; 
        	//alert("set successed");
        	break; 
    	}
  	}
  }
}

function loadvideoprocess()
{
	var urlvfprocess="setting/videoprocess.php";
	$.ajax({  
  type: "post",  
  url: urlvfprocess,  
  dataType: "json",  
  data: "",  
  success: function(msg){ 
   $.each(msg,function(name,value) {       	
        	var optiona = "<option value='" + name + "'>" + value + "</option>";
            $("#selectvideoprocess").append(optiona);
        }); 
        
        setvideoprocessstatus();      
    }  
  });  
  
  var urlvfprocessblur2level="setting/blur2.php";
	$.ajax({  
  type: "post",  
  url: urlvfprocessblur2level,  
  dataType: "json",  
  data: "",  
  success: function(msg){ 
   $.each(msg,function(name,value) {       	
        	var optiona = "<option value='" + name + "'>" + value + "</option>";
            $("#selectvflevelblur2").append(optiona);
        }); 
        
        setvideoprocessstatus();      
    }  
  });  
  
  var urlvfprocesssharpenlevel="setting/sharpen.php";
	$.ajax({  
  type: "post",  
  url: urlvfprocesssharpenlevel,  
  dataType: "json",  
  data: "",  
  success: function(msg){ 
   $.each(msg,function(name,value) {       	
        	var optiona = "<option value='" + name + "'>" + value + "</option>";
            $("#selectvflevelsharpen").append(optiona);
        }); 
        
        setvideoprocessstatus();      
    }  
  });  
}


function loadvideo(devname)
{
	//var devname = $("#selectdevice").val();    
	//var url2 = "decklink_" + devname + ".php";
  //alert("11"+devname+"22");
	var urlvideo = "setting/" + removeAllSpace(devname) + ".php"; 
  //alert(urlvideo);
  var params = {one:1,two:2,three:3};
    $.ajax({  
  type: "post",  
  url: urlvideo,  
  dataType: "json",  
  data: "",  
  success: function(msg){ 
  		//alert(msg.DeckLink Studio 4K);       
   $.each(msg,function(name,value) {
        	//alert(name);
        	//alert(value);        	
        	var optiona = "<option value='" + name + "'>" + value + "</option>";
          $("#selectvideoset").append(optiona);
        });

        //var count=$("#selectvideoset option:last").index();
        //alert(count);

    }  
  });  
 
}

function loadvedioresolutionratio()
{
		var urlaudiocodec="setting/vedioresolutionratio.php";
	$.ajax({  
  type: "post",  
  url: urlaudiocodec,  
  dataType: "json",  
  data: "",  
  success: function(msg){ 
   $.each(msg,function(name,value) {       	
        	var optiona = "<option value='" + name + "'>" + value + "</option>";
            $("#selectvedioresolutionratioset").append(optiona);
        });  

			var count=$("#selectvedioresolutionratioset option").length; 
			$("#selectvedioresolutionratioset").val("2");
    }  
  }); 
}

function loadvedioframerate()
{
		var urlaudiocodec="setting/vedioframerate.php";
	$.ajax({  
  type: "post",  
  url: urlaudiocodec,  
  dataType: "json",  
  data: "",  
  success: function(msg){ 
   $.each(msg,function(name,value) {       	
        	var optiona = "<option value='" + name + "'>" + value + "</option>";
            $("#selectvedioframerateset").append(optiona);
        });       
			var count=$("#selectvedioframerateset option").length; 
			$("#selectvedioframerateset").val("2");
    }  
  }); 
}

function loadvediobitrate()
{
		var urlaudiocodec="setting/vediobitrate.php";
	$.ajax({  
  type: "post",  
  url: urlaudiocodec,  
  dataType: "json",  
  data: "",  
  success: function(msg){ 
   $.each(msg,function(name,value) {       	
        	var optiona = "<option value='" + name + "'>" + value + "</option>";
            $("#selectvediobitrateset").append(optiona);
        });    
			var count=$("#selectvediobitrateset option").length; 
			$("#selectvediobitrateset").val("5");
    }  
  }); 
}

function loadvideopara()
{

}

function loadvideolevel()
{
  var urlvideolevel="setting/videolevel.php";
	$.ajax({  
  type: "post",  
  url: urlvideolevel,  
  dataType: "json",  
  data: "",  
  success: function(msg){ 
   $.each(msg,function(name,value) {       	
        	var optiona = "<option value='" + name + "'>" + value + "</option>";
            $("#selectvediolevelset").append(optiona);
        }); 
		var count=$("#selectvediolevelset option").length; 
		$("#selectvediolevelset").val("3");
  }     
    
  });  
  

}

function loaddecklinkaudio(devname)
{
	var urlaudio = "setting/" + removeAllSpace(devname) + "audio" + ".php";  
  //alert(urlaudio);
  var params = {one:1,two:2,three:3};
  $.ajax({  
  type: "post",  
  url: urlaudio,  
  dataType: "json",  
  data: "",  
  success: function(msg){      
   $.each(msg,function(name,value) {
        	//alert(name);
        	//alert(value);        	
        	var optiona = "<option value='" + name + "'>" + value + "</option>";
            $("#selectaudio").append(optiona);
        });
        var count=$("#selectaudio").length; 
    }  
  });  
 
}

function loadaudiocodec()
{
	var urlaudiocodec="setting/audiocodec.php";
	$.ajax({  
  type: "post",  
  url: urlaudiocodec,  
  dataType: "json",  
  data: "",  
  success: function(msg){ 
  
   $.each(msg,function(name,value) {       	
        	var optiona = "<option value='" + name + "'>" + value + "</option>";
            $("#selectaudiocodecset").append(optiona);
        });    
			var count=$("#selectaudiocodecset option").length; 
			$("#selectaudiocodecset").val("2");
    }  
  });  
}

function loadaudiosamplerate()
{
	var urlaudiosamplerate="setting/audiosamplerate.php";
	$.ajax({  
  type: "post",  
  url: urlaudiosamplerate,  
  dataType: "json",  
  data: "",  
  success: function(msg){ 
   $.each(msg,function(name,value) {       	
        	var optiona = "<option value='" + name + "'>" + value + "</option>";
            $("#selectaudiosamplerateset").append(optiona);
        });      
			var count=$("#selectaudiosamplerateset option").length; 
			$("#selectaudiosamplerateset").val("5");
    }  
  });  
}
function loadaudiochannel()
{
	var urlaudiochannel="setting/audiochannel.php";
	$.ajax({  
  type: "post",  
  url: urlaudiochannel,  
  dataType: "json",  
  data: "",  
  success: function(msg){ 
   $.each(msg,function(name,value) {       	        	
        	var optiona = "<option value='" + name + "'>" + value + "</option>";
            $("#selectaudiochannelset").append(optiona);
        });     
			var count=$("#selectaudiochannelset option").length; 
			$("#selectaudiochannelset").val("stereo");
			//alert("loadaudiochannel"+count);
    }  
  });  
}

function loadaudiobitrate()
{
	var urlaudiochannel="setting/audiobitrate.php";
	$.ajax({  
  type: "post",  
  url: urlaudiochannel,  
  dataType: "json",  
  data: "",  
  success: function(msg){ 
   $.each(msg,function(name,value) {       	
        	var optiona = "<option value='" + name + "'>" + value + "</option>";
            $("#selectaudiobitrateset").append(optiona);
        });      

			var count=$("#selectaudiobitrateset option").length; 
			$("#selectaudiobitrateset").val("3");
    }  
  });  
}



function getencoderstatus()
{ 
	var urlencoder = "getstatus2.action";  
	$.ajax({  
		type: "post",  
		url: urlencoder,  
		dataType: "json",  
    data: JSON.stringify([
    {
        "cmd": "status2"
    }]
    ),     
		success: function(msg){  
			//alert(msg.length);
			if(msg.length == 2)
			{
				//alert(msg[1].curstatus);
				$("#textfieldstatus").html(msg[1].curstatus);
				$("#veidofpswork").html(msg[1].framefps);
				$("#vediobitratework").html((msg[1].encbitrate/1000).toFixed(4));
				if(1 == msg[1].ret)
				{
					var textclientcurstatus="运行中";
					$("#textclientcurstatus").html(textclientcurstatus);
				}
				else
				{
					var textclientcurstatus="已结束";
					$("#textclientcurstatus").html(textclientcurstatus);
				}
			}

		}  
	}); 
} 


function getclientstatus()
{
	//return;
	var urlencoder = "getclient.action";  
	$.ajax({  
		type: "post",  
		url: urlencoder,  
		dataType: "json",  
    data: JSON.stringify([
    {
        "cmd": "encclient"
    },	
	]
    ),     
		success: function(msg){  
			//alert(msg.length);
			if(msg.length > 1)
			{
				//alert(msg[1].num)
				for(var i=0;i < msg[1].num ;i++)
				{
					var tempid = "clientstatus"+i;

					if(1 == msg[i+2].clientstatus)
					{
						document.getElementById(tempid).style.backgroundColor="#7CFC00";/* LawnGreen */
					}
					else
					{				
						document.getElementById(tempid).style.backgroundColor="#FF0000"; /* red */
					}
				}
			}
		}  
	}); 
}



function getencodersetting() 
{
	var urlencoder = "getsetting.action";  
	$.ajax({  
		type: "post",  
		url: urlencoder,  
		dataType: "json",  
    data: JSON.stringify([
    {
        "cmd": "setting"
    }]
    ),     
		success: function(msg){  
			//alert("bbb"+msg.length);
			if(msg.length > 2)
			{
				//alert(msg[0].cmd);
				if(msg[0].cmd == "setting")
				{
					//alert(msg[1].input_src);
					for(var istart=1; istart < msg.length; istart++)
					{				
						//alert(istart);
						if(msg[istart].input_src == 1)
						{
							//alert(msg[istart].input_src);
							if(msg[istart].audio_input_para != undefined)
							{
								//alert("msg[istart].audio_input_para != undefined"+msg[istart].audio_input_para);
								$("#selectaudio").val(msg[istart].audiocapset);
							}
							if(msg[istart].input_name != undefined)
							{
                //alert("msg[istart].input_name != undefined" + msg[istart].input_name);
								$("#selectdevice").val(msg[istart].input_name);
							}			
							if(msg[istart].video_input_para != undefined)
							{
								//setcomboxselectbytext($("#selectvideoset"), msg[istart].video_input_para);
								$("#selectvideoset").val(msg[istart].videocapset);
							}             
						} 
						else if(msg[istart].video_encpara == 1)
						{
							if(msg[istart].bitrate != undefined)
							{
								//$("#vediobitratework").html(msg[istart].bitrate);
								
							}
							if(msg[istart].framerate != undefined)
							{
								//
							}
							if(msg[istart].width2 != undefined)
							{
								$("#width").html(msg[istart].width2);
							}
							if(msg[istart].height2 != undefined)
							{
								$("#height").html(msg[istart].height2);
							}
							if(msg[istart].gop != undefined)
							{
								//$("#textfieldgop").val(msg[istart].gop);
							}
							if(msg[istart].level != undefined)
							{
								$("#vediolevelwork").html(msg[istart].level);
							}               
						}
						else if(msg[istart].audio_encpara == 1)
						{							
							if(msg[istart].bitrate != undefined)
							{
								$("#audiobitratework").html(msg[istart].bitrate);
							}
							if(msg[istart].channel != undefined)
							{
								$("#audiochannelwork").html(msg[istart].channel);
							}
							if(msg[istart].codec != undefined)
							{
								$("#audiocodecwork").html(msg[istart].codec);
							}
							if(msg[istart].sample != undefined)
							{
								$("#audiosampleratework").html(msg[istart].sample);
							}
						}
						else if(msg[istart].mux_para == 1)
						{
							//alert(msg[istart].bitrate);
							//alert(msg[istart].provider);
							if(msg[istart].bitrate != undefined)
							{
								$("#textfieldmuxoutputbitwork").html((msg[istart].bitrate/1000).toFixed(0));
								$("#textfieldmuxoutputbitset").val((msg[istart].bitrate/1000).toFixed(0));
								//$("#textfieldmuxoutputbitwork").html(msg[istart].bitrate);
							}
							if(msg[istart].provider != undefined)
							{
								$("#textfieldproviderwork").html(msg[istart].provider);	
								$("#textfieldproviderset").val(msg[istart].provider);	
							}	
							if(msg[istart].service != undefined)
							{
								$("#textfieldserviceidwork").html(msg[istart].service);	
								$("#textfieldserviceidset").val(msg[istart].service);
							}
							if(msg[istart].stream != undefined)
							{
								$("#textfieldvediopidwork").html(msg[istart].stream);	
								$("#textfieldpcrpidwork").html(msg[istart].stream);
								$("#textfieldvediopidset").val(msg[istart].stream);	
								$("#textfieldpcrpidset").html(msg[istart].stream);
							}	
							if(msg[istart].stream != undefined)
							{
								var audiopidwork1 = parseInt(msg[istart].stream);
								var audiopidwork2 = parseInt("1");
								var audiopidwork = audiopidwork1+audiopidwork2;
								$("#textfieldaudiopidwork").html(audiopidwork);	
								$("#textfieldaudiopidset").html(audiopidwork);	
							}
							if(msg[istart].servicename != undefined)
							{
								$("#textfieldservicenamework").html(msg[istart].servicename);
								$("#textfieldservicenameset").val(msg[istart].servicename);									
							}
							if(msg[istart].pcrid != undefined)
							{
																
							}
							if(msg[istart].pmtid != undefined)
							{
								$("#textfieldpmtpidwork").html(msg[istart].pmtid);	
								$("#textfieldpmtpidset").val(msg[istart].pmtid);
							}										
						}				
						else if(msg[istart].output_para == 1)
						{
							if(msg[istart].url != undefined)
							{
							  $("#textfieldoutputnamework").html(msg[istart].url);							
							}
						}		
					}
				}
			}
			

		}  
	}); 
}


function getencodersettingset() 
{
	var urlencoder = "getsetting.action";  
	$.ajax({  
		type: "post",  
		url: urlencoder,  
		dataType: "json",  
    data: JSON.stringify([
    {
        "cmd": "setting"
    }]
    ),     
		success: function(msg){  
			//alert("bbb"+msg.length);
			if(msg.length > 2)
			{
				//alert(msg[0].cmd);
				if(msg[0].cmd == "setting")
				{
					//alert(msg[1].input_src);
					for(var istart=1; istart < msg.length; istart++)
					{			//alert(msg[istart].mux_para)	
						//alert(istart);
						if(msg[istart].input_src == 1)
						{
							//alert(msg[istart].input_src);
							if(msg[istart].audio_input_para != undefined)
							{
								//alert("msg[istart].audio_input_para != undefined"+msg[istart].audio_input_para);
								$("#selectaudio").val(msg[istart].audiocapset);
							}
							if(msg[istart].input_name != undefined)
							{
                //alert("msg[istart].input_name != undefined" + msg[istart].input_name);
								$("#selectdevice").val(msg[istart].input_name);
							}			
							if(msg[istart].video_input_para != undefined)
							{
								//setcomboxselectbytext($("#selectvideoset"), msg[istart].video_input_para);
								$("#selectvideoset").val(msg[istart].videocapset);
							}             
						} 
						else if(msg[istart].video_encpara == 1)
						{
							if(msg[istart].bitrate != undefined)
							{
								//alert("selectvediobitrateset");
								setcomboxselectbytext($("#selectvediobitrateset"), msg[istart].bitrate);	
							}
							if(msg[istart].framerate != undefined)
							{
								$("#selectvedioframerateset").html(msg[istart].framerate);
							}
							if(msg[istart].width != undefined)
							{
								$("#textfieldwidth").val(msg[istart].width);
							}
							if(msg[istart].height != undefined)
							{
								$("#textfieldheight").val(msg[istart].height);
							}
							if(msg[istart].gop != undefined)
							{
								$("#textfieldgop").val(msg[istart].gop);
							}
							if(msg[istart].level != undefined)
							{
								//alert("selectvediolevelset");
								setcomboxselectbytext($("#selectvediolevelset"), msg[istart].level);
							}               
						}
						else if(msg[istart].audio_encpara == 1)
						{												
							if(msg[istart].bitrate != undefined)
							{
								//alert("selectaudiobitrateset");
								setcomboxselectbytext($("#selectaudiobitrateset"), msg[istart].bitrate);	
							}
							if(msg[istart].channel != undefined)
							{
								//alert("selectaudiochannelset66");
								//alert(msg[istart].channel);
								var channelname = getaudioshowname(msg[istart].channel);
								setcomboxselectbytext($("#selectaudiochannelset"), channelname);
								//setcomboxselectbytext($("#selectaudiochannelset"), msg[istart].channel);	//error?						
							}
							if(msg[istart].codec != undefined)
							{
								//alert("selectaudiocodecset");
								setcomboxselectbytext($("#selectaudiocodecset"), msg[istart].codec);
							}
							if(msg[istart].sample != undefined)
							{
								//alert("selectaudiosamplerateset");
								setcomboxselectbytext($("#selectaudiosamplerateset"), msg[istart].sample);
							}
						}
						else if(msg[istart].mux_para == 1)
						{
							//alert(msg[istart].bitrate);
							//alert(msg[istart].provider);
							if(msg[istart].bitrate != undefined)
							{
								//$("#textfieldmuxoutputbitset").val(msg[istart].bitrate);
							}
							if(msg[istart].provider != undefined)
							{
								//$("#textfieldproviderset").val(msg[istart].provider);								
							}	
							if(msg[istart].service != undefined)
							{
								//$("#textfieldserviceidset").val(msg[istart].service);								
							}
							if(msg[istart].stream != undefined)
							{
								//$("#textfieldvediopidset").val(msg[istart].stream);								
							}	
							
							if(msg[istart].servicename != undefined)
							{
								//$("#textfieldservicenameset").val(msg[istart].servicename);								
							}
							if(msg[istart].pcrid != undefined)
							{
								//$("#textfieldpcrpidset").html(msg[istart].stream);								
							}
							if(msg[istart].pmtid != undefined)
							{
								//$("#textfieldpmtpidset").val(msg[istart].pmtid);								
							}
							
							if(msg[istart].stream != undefined)
							{
								//var audiopidset1 = parseInt(msg[istart].stream);
								//var audiopidset2 = parseInt("1");
								//var audiopidset = audiopidwork1+audiopidwork2;
								//$("#textfieldaudiopidset").val(audiopidset);							
							}
							
						}				
						else if(msg[istart].output_para == 1)
						{
							if(msg[istart].url != undefined)
							{
							  $("#textfieldoutputnameset").val(msg[istart].url);							
							}
						}		
					}
				}
			}
			

		}  
	}); 
}


function startencoder()
{
	//var params = $("Submit").serialize();  
	var paraencoder=$("form").serialize();
	var paraencoder2 = decodeURIComponent(paraencoder);
	//var pp1="";
	//paraencoder2 = window.btoa(paraencoder2);
	//alert($("#selectdevice").find("option:selected").text());

	//alert($("#selectvediobitrateset").find("option:selected").text()*1000)
	var items = document.getElementsByName("category");
	//alert(items[0].checked);
	var selectvediobitrateset = $("#selectvediobitrateset").find("option:selected").text()*1000;
	
	var textfieldmuxoutputbitset = $("#textfieldmuxoutputbitset").val()*1000;

	
	
	if(items[0].checked)
	{
	var urlencoder = "encoder.action";  
	$.ajax({  
		type: "post",  
		url: urlencoder,  
		dataType: "json",  
		//data: paraencoder2,
    data: JSON.stringify([
    {
        "cmd": "start"
    },
    {
    	"input_src": 1,
        "audio_input_para": $("#selectaudio").find("option:selected").text(),//"2  48000fps", no use now.
        "audiocapset": $("#selectaudio").find("option:selected").val(),
        "input_name": $("#selectdevice").find("option:selected").val(),//"DeckLink Studio 4K",        
        "video_input_para": $("#selectvideoset").find("option:selected").text(),
        "videocapset": $("#selectvideoset").find("option:selected").val()
    },
    {
        "bitrate": selectvediobitrateset.toString(),//"30000",//$("#selectvediobitrateset").find("option:selected").text(),//$("#selectvediobitrateset").text(),
        //"framerate": $("#selectvedioframerateset").text(),
        "gop": $("#textfieldgop").val(),
        "height": "0",
        "level": $("#selectvediolevelset").find("option:selected").text(),
        "video_encpara": 1,
        "width": "0"
    },  
    {
		//var items = document.getElementsByName("category"),
		//if(items[0].checked)
		//{
		"audio_encpara": 1,
        "bitrate": $("#selectaudiobitrateset").find("option:selected").text(),
        "channel": $("#selectaudiochannelset").find("option:selected").val(),
        "codec": $("#selectaudiocodecset").find("option:selected").text(),
        "sample": $("#selectaudiosamplerateset").find("option:selected").text()
		//}
    },
    {
        "bitrate": textfieldmuxoutputbitset.toString(),//$("#textfieldmuxoutputbitset").val(),
        "mux_para": 1,
        "provider": $("#textfieldproviderset").val(),
		"service": $("#textfieldserviceidset").val(),
		"stream": $("#textfieldvediopidset").val(),
		"servicename": $("#textfieldservicenameset").val(),
		"pcrid": $("#textfieldpcrpidset").val(),
		"pmtid": $("#textfieldpmtpidset").val()			
		
    },
    {
        "output_para": 1,
        "url": $("#textfieldoutputnameset").val()
    }
]

    	),     
		//data:{  //not work
		//	 data:JSON.stringify(paraencoder2)
		//	},
		success: function(msg){  
			
		}  
	}); 
	}
	else
	{
			var urlencoder = "encoder.action";  
	$.ajax({  
		type: "post",  
		url: urlencoder,  
		dataType: "json",  
		//data: paraencoder2,
    data: JSON.stringify([
    {
        "cmd": "start"
    },
    {
    	"input_src": 1,
        "audio_input_para": $("#selectaudio").find("option:selected").text(),//"2  48000fps", no use now.
        "audiocapset": $("#selectaudio").find("option:selected").val(),
        "input_name": $("#selectdevice").find("option:selected").val(),//"DeckLink Studio 4K",        
        "video_input_para": $("#selectvideoset").find("option:selected").text(),
        "videocapset": $("#selectvideoset").find("option:selected").val()
    },
    {
        "bitrate": selectvediobitrateset.toString(),//"30000",//$("#selectvediobitrateset").find("option:selected").text(),//$("#selectvediobitrateset").text(),
        //"framerate": $("#selectvedioframerateset").text(),
        "gop": $("#textfieldgop").val(),
        "height": "0",
        "level": $("#selectvediolevelset").find("option:selected").text(),
        "video_encpara": 1,
        "width": "0"
    },  
    {
		//var items = document.getElementsByName("category"),
		"audio_encpara": 1,
        "bitrate": $("#selectaudiobitrateset").find("option:selected").text(),
        "channel": $("#selectaudiochannelset").find("option:selected").val(),
        "codec": "disable",
        "sample": $("#selectaudiosamplerateset").find("option:selected").text()

    },
    {
        "bitrate": textfieldmuxoutputbitset.toString(),//$("#textfieldmuxoutputbitset").val(),
        "mux_para": 1,
        "provider": $("#textfieldproviderset").val(),
		"service": $("#textfieldserviceidset").val(),
		"stream": $("#textfieldvediopidset").val(),
		"servicename": $("#textfieldservicenameset").val(),
		"pcrid": $("#textfieldpcrpidset").val(),
		"pmtid": $("#textfieldpmtpidset").val()			
		
    },
    {
        "output_para": 1,
        "url": $("#textfieldoutputnameset").val()
    }
]

    	),     
		//data:{  //not work
		//	 data:JSON.stringify(paraencoder2)
		//	},
		success: function(msg){  
			
		}  
	});
	}

	alert("配置完成");
	
}

function stopencoder()
{

	var urlencoder = "stop.action";  
	$.ajax({  
		type: "post",  
		url: urlencoder,  
		dataType: "json",  
    data: JSON.stringify([
    {
        "cmd": "stop"
    }]
    ),     
		success: function(msg){  
			//alert(msg.length);
			alert("停止编码");
			if(msg.length == 1)
			{
				//alert(msg[1].curstatus);
				$("#textfieldstatus").html("encoder stop");
				
			}

		}  
	}); 
}
function loaddev()
{
  var url = "setting/devlist.php";  
  $.ajax({  
  type: "post",  
  url: url,  
  dataType: "json",  
  data: "",  
  success: function(msg){
  		//alert(msg.DeckLink Studio 4K);       
   $.each(msg,function(name,value) {
        	//alert(name);
        	var optiona = "<option value='" + name + "'>" + value + "</option>";
            $("#selectdevice").append(optiona);
        });
        var count=$("#selectdevice").length; 
        //alert(count);
        //var count=$("#selectdevice option:last").index();
        if(count > 0)
        {
        	//alert(count + " ddd");
        	$("#selectdevice").get(0).selectedIndex=0;
        	//alert($("#selectdevice").text());
        	var selectdev = $("#selectdevice").find("option:selected").text();
			$('#selectdevice').hide();
			$('#selectaudio').hide();
        	loadvideo(selectdev);
        	//var le = $("#selectdevice option:selected").attr("val"); //chrome not support?
        	//alert(le);
        	loaddecklinkaudio(selectdev);

        }
    }  
  });  

}  

function setvideoprocessstatus()
{
	var seltext = $("#selectvideoprocess").find("option:selected").val();
	if(seltext == "hflip"
	|| seltext == "vflip"
	|| seltext == "deinterlace"
	|| seltext == "deinterlace2"
	|| seltext == "denoise"
	|| seltext == "blur"
	|| seltext == "deshake"
	)
	{
		//alert("textfieldwidthitem diable");
		$('#textfieldwidthitem').attr("disabled",true);
		$('#textfieldheightitem').attr("disabled",true);
		$('#textfieldwidthitem').hide();
		$('#textfieldheightitem').hide();
				
	  $('#vfwidthlabel').html("");
	  $('#vfheightlabel').html("");
	  
	  $("#selectvflevelsharpen").hide();
	  $("#selectvflevelblur2").hide();
	  
	}
	else if(seltext == "scale")
	{
		$('#textfieldwidthitem').attr("disabled",false);
		$('#textfieldheightitem').attr("disabled",false);
		$('#textfieldwidthitem').show();
		$('#textfieldheightitem').show();

		$('#vfwidthlabel').html("宽");
		$('#vfheightlabel').html("高");
		
	  $("#selectvflevelsharpen").hide();
	  $("#selectvflevelblur2").hide();
		
	}
	else if(seltext == "blur2"
  ||	seltext == "sharpen")
  {
  	$('#textfieldwidthitem').attr("disabled",false);
		$('#textfieldheightitem').attr("disabled",false);
		$('#textfieldwidthitem').hide();
		$('#textfieldheightitem').hide();

		$('#vfwidthlabel').html("level");
		$('#vfheightlabel').html("");
		if(seltext == "blur2")
		{
			$("#selectvflevelsharpen").hide();
	    $("#selectvflevelblur2").show();
		}
		else
		{
			$("#selectvflevelsharpen").show();
	    $("#selectvflevelblur2").hide();
		}
  }
	
}
var getstatusid;
var getsettingid;
var getsettingid2;
var getclientstatusid;

var colorTag = 1;
var colors = ["#4CAF50", "#008CBA"];
function workphp1(){	
	colorTag = 1 - colorTag;

	document.getElementById("buttonwork1").style.backgroundColor = colors[ colorTag];
}
$("#buttonwork1").click(function() {
  workphp1();	
}); 

$(document).ready(function(){
    loaddev();
    
    loadvideopara();
    loadvideolevel();
	loadvedioresolutionratio();
	//loadvedioframerate();
	loadvediobitrate();
    
    loadaudiocodec();
    loadaudiosamplerate();
    loadaudiochannel();
	loadaudiobitrate()
    
    loadvideoprocess();
    
    getstatusid = window.setInterval(getencoderstatus,1000); 
	
    getsettingid = window.setTimeout(getencodersetting,1000);
	
	getsettingid2 = window.setTimeout(getencodersettingset,1000);

	getclientstatusid = window.setInterval(getclientstatus,1000);
	


$("#selectdevice").change(function(){
  //$(this).css("background-color","#FFFFCC");
  //alert($("#selectdevice").find("option:selected").text());
  //alert($("#selectdevice").val());     
  //var pp1=$("form").serialize();
	var pp1="";
	var url3 = "1.action";  
	$.ajax({  
		type: "post",  
		url: url3,  
		dataType: "json",  
		data: pp1,
		success: function(msg){  

		}  
	});
})  
	
	$("#selectvideoset").change(function(){
	var pp1="";
	
	//alert("pp1sss" +pp1);
	//var url3 = "1.action";  
	//$.ajax({  
	//	type: "post",  
	//	url: url3,  
	//	dataType: "json",  
	//	data: pp1,
	//	success: function(msg){  
	//	}  
	//});  
	
});

$("#selectvideoprocess").change(function(){
  
  setvideoprocessstatus();
	//alert(seltext);
})  


$("#Submitstart").click(function() {
	startencoder();
});  

$("#SubmitStatus").click(function() {
	getencoderstatus();
});  

$("#Submitstop").click(function() {
  stopencoder();
	
});  









function buttoncolorchange()
{alert("1111")
	document.getElementById("new").style.backgroundColor="#4CAF50";/* Green */
}

function msover(){
{event.srcElement.style.color="000099";event.srcElement.style.backgroundColor="99ccff";event.srcElement.style.cursor = "hand";}}
function msout(){{event.srcElement.style.color="red";event.srcElement.style.backgroundColor="white";event.srcElement.style.cursor = "auto";}}

function sss()
{

	document.getElementById("sss").style.backgroundColor="#FF0000";

}

$("#sss").click(function() {
  sss();	
});  

function workphp(){	
	document.forms[0].action="work.php";
	
}
$("#buttonwork").click(function() {
  workphp();	
});  

function indexphp(){
	document.forms[0].action="index.php";
}
$("#buttonsetting").click(function() {
  indexphp();	
});  

function userphp(){
	document.forms[0].action="user.php";
}
$("#buttonuser").click(function() {
  userphp();	
});  

var loginpassword = "123";
function changepassword()
{
	loginpassword = document.getElementById("changepassword").value;
	alert(loginpassword)
}
$("#changebutton").click(function() {
  changepassword();	
});

function toopen(){

	

    if(document.getElementById("password").value==loginpassword){
           document.forms[0].action="user.php";
           return true;
        }else{
        alert("密码不正确！")
        return false;
        }
    }
$("#login").click(function() {
  toopen();	
});


//======================开关机按钮======================//
function buttonstartup(){
		var urlencoder = "cmd.action";  
	$.ajax({  
		type: "post",  
		url: urlencoder,  
		dataType: "json",  
    data: JSON.stringify([
    {
        "cmd": "run"
    },
	{
        "command": "shutdown /i /r /t 60"
    },
	{
        "sub": "0"
    }]
    ),     
		success: function(msg){  
			alert("正在开机");

		}  
	}); 
}
$("#buttonstartup").click(function() {
  buttonstartup();	
}); 

function buttonreset(){
	var urlencoder = "cmd.action";  
	$.ajax({  
		type: "post",  
		url: urlencoder,  
		dataType: "json",  
    data: JSON.stringify([
    {
        "cmd": "run"
    },
	{
        "command": "shutdown /s /t 60",
		"sub": "0"
    }]
    ),     
		success: function(msg){  
			alert("正在重启");

		}  
	}); 
}
$("#buttonreset").click(function() {
  buttonreset();	
}); 

function buttonshutdown(){
		var urlencoder = "cmd.action";  
	$.ajax({  
		type: "post",  
		url: urlencoder,  
		dataType: "json",  
    data: JSON.stringify([
    {
        "cmd": "run"
    },
	{
        "command": "shutdown /s /t 60",
		"sub": "0"
    }
	]
    ),     
		success: function(msg){  
			alert("正在关机");

		}  
	}); 
}
$("#buttonshutdown").click(function() {
  buttonshutdown();	
}); 

});//end $(document).ready