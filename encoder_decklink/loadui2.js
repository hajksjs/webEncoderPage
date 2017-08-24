// JavaScript Document
function removeAllSpace(str) {
return str.replace(/\s+/g, "");
}

function setcomboxselectbytext(com, seltext)
{
	var count=$("#selectvideo option:last").index();	
  for(var i=0;i<count;i++) 
  { 
    if(com.get(0).options[i].text == seltext) 
    { 
        com.get(0).options[i].selected = true; 
        //alert("set successed");
        break; 
    }
  }
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
          $("#selectvideo").append(optiona);
        });

        //var count=$("#selectvideo option:last").index();
        //alert(count);

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
            $("#selectlevel").append(optiona);
        }); 
    //var count=$("#selectlevel option:last").index();
    var count=$("#selectlevel option").length; 
    //alert("selectlevel " + count); 
    //$("#selectlevel").get(0).selectedIndex=2;
    $("#selectlevel").val("3");
    // $("#selectleve").find("option[text='3']").attr("selected",true);
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
            $("#selectaudiocodec").append(optiona);
        });       
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
            $("#selectsamplerate").append(optiona);
        });       
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
            $("#selectchannel").append(optiona);
        });       
    }  
  });  
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


function getencoderstatus()
{ 
	var urlencoder = "getstatus.action";  
	$.ajax({  
		type: "post",  
		url: urlencoder,  
		dataType: "json",  
    data: JSON.stringify([
    {
        "cmd": "status"
    }]
    ),     
		success: function(msg){  
			//alert(msg.length);
			if(msg.length == 2)
			{
				//alert(msg[1].curstatus);
				$("#textfieldstatus").html(msg[1].curstatus);
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
								//setcomboxselectbytext($("#selectvideo"), msg[istart].video_input_para);
								$("#selectvideo").val(msg[istart].videocapset);
							}             
						} 
						else if(msg[istart].video_encpara == 1)
						{
							if(msg[istart].bitrate != undefined)
							{
								$("#textvideobitrate").val(msg[istart].bitrate);
							}
							if(msg[istart].framerate != undefined)
							{
								$("#textfieldframerate").val(msg[istart].framerate);
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
								setcomboxselectbytext($("#selectlevel"), msg[istart].level);
							}               
						}
						else if(msg[istart].audio_encpara == 1)
						{							
							if(msg[istart].bitrate != undefined)
							{
								$("#textfieldaudiobitrate").val(msg[istart].bitrate);
							}
							if(msg[istart].channel != undefined)
							{
								setcomboxselectbytext($("#selectchannel"), msg[istart].channel);								
							}
							if(msg[istart].codec != undefined)
							{
								setcomboxselectbytext($("#selectaudiocodec"), msg[istart].codec);
							}
							if(msg[istart].sample != undefined)
							{
								setcomboxselectbytext($("#selectsamplerate"), msg[istart].sample);
							}
						}
						else if(msg[istart].mux_para == 1)
						{
							//alert(msg[istart].bitrate);
							//alert(msg[istart].provider);
							if(msg[istart].bitrate != undefined)
							{
								$("#textfieldmuxoutputbit").val(msg[istart].bitrate);
							}
							if(msg[istart].provider != undefined)
							{
								$("#textfieldprovider").val(msg[istart].provider);								
							}											
						}				
						else if(msg[istart].output_para == 1)
						{
							if(msg[istart].url != undefined)
							{
							  $("#textfieldoutputname").val(msg[istart].url);							
							}
						}		
					}
				}
			}
			

		}  
	}); 
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
			if(msg.length == 2)
			{
				//alert(msg[1].curstatus);
				$("#textfieldstatus").html(msg[1].curstatus);
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
$(document).ready(function(){
    loaddev();
    
    loadvideopara();
    loadvideolevel();
    
    loadaudiocodec();
    loadaudiosamplerate();
    loadaudiochannel();
    
    loadvideoprocess();
    
    getstatusid = window.setInterval(getencoderstatus,1000); 
    getsettingid = window.setTimeout(getencodersetting,1000),


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
	
	$("#selectvideo").change(function(){
	var pp1="";
	
	alert("pp1sss" +pp1);
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

$("#Submit").click(function() {  
	//var params = $("Submit").serialize();  
	var paraencoder=$("form").serialize();
	var paraencoder2 = decodeURIComponent(paraencoder);
	//var pp1="";
	//paraencoder2 = window.btoa(paraencoder2);
	//alert($("#selectdevice").find("option:selected").text());
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
        "audio_input_para": $("#selectaudio").find("option:selected").text(),//"2  48000fps",
        "audiocapset": $("#selectaudio").find("option:selected").val(),
        "input_name": $("#selectdevice").find("option:selected").text(),//"DeckLink Studio 4K",        
        "video_input_para": $("#selectvideo").find("option:selected").text(),
        "videocapset": $("#selectvideo").find("option:selected").val()
    },
    {
        "bitrate": $("#textvideobitrate").val(),
        "framerate": $("#textfieldframerate").val(),
        "gop": $("#textfieldgop").val(),
        "height": $("#textfieldheight").val(),
        "level": $("#selectlevel").find("option:selected").text(),
        "video_encpara": 1,
        "width": $("#textfieldwidth").val()
    },
    {
        "audio_encpara": 1,
        "bitrate": $("#textfieldaudiobitrate").val(),
        "channel": $("#selectchannel").find("option:selected").text(),
        "codec": $("#selectaudiocodec").find("option:selected").text(),
        "sample": $("#selectsamplerate").find("option:selected").text()
    },
    {
    },
    {
        "bitrate": $("#textfieldmuxoutputbit").val(),
        "mux_para": 1,
        "provider": $("#textfieldprovider").val()
    },
    {
        "output_para": 1,
        "url": $("#textfieldoutputname").val()
    }
]

    	),     
		//data:{  //not work
		//	 data:JSON.stringify(paraencoder2)
		//	},
		success: function(msg){  

		}  
	});  
	
});  


$("#SubmitStatus").click(function() {
 
	getencoderstatus();
});  

$("#SubmitStop").click(function() {
  stopencoder();
	
});  


});//end $(document).ready