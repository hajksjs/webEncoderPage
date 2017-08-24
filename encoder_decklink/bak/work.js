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

var getclientstatusid;

$(document).ready(function(){


	getclientstatusid = window.setInterval(getclientstatus,1000);
	

})  
	