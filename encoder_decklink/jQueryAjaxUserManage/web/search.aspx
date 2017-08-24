<%@ Page Language="C#" AutoEventWireup="true" CodeFile="search.aspx.cs" Inherits="search" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>无标题页</title>

    <script src="js/jquery.js"></script>
   

</head>
<body>
    <script language="javascript">
        $(document).ready(function(){
                $("#btnXml").click(function(){
                    $.ajax({
                    url:"mes.xml",
                    dataType:"xml",
                    success:function(xml){
     
                        $(xml).find("Messages>people").each(function(){
                            var ENName=$(this).find("ENName").text();
                            var CNName=$(this).find("CNName").text();
                            var message=$(this).find("message").text();
                                           
                            
                            $("#divone").append("ENName:"+ENName+"<br/>CNName:"+CNName+"<br/>Message:"+message+"<br/><br/>");
                        })
                    }
                }) 
            })  
        })
    </script>

    <form id="form1" runat="server">
        <div>
           
                <div id="divone"style="width: 100%; border-right: #92b0dd 1px solid; border-left: #92b0dd 1px solid;
                    border-top: #92b0dd 1px solid; border-bottom: #92b0dd 1px solid; background-color: #e2eaf8">
                    
                </div>
                 <div id="div1"style="width: 100%; border-right: #92b0dd 1px solid; border-left: #92b0dd 1px solid;
                    border-top: #92b0dd 1px solid; border-bottom: #92b0dd 1px solid; background-color: #e2eaf8">
                    <input  type="button" id="btnXml" value="click btnXml"/>
                </div>
               
         
        </div>
    </form>
</body>
</html>
