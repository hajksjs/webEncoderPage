<%@ Page Language="C#" AutoEventWireup="true"  Inherits="storagemanage,WebApp" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1">
    <title></title>
<script type="text/javascript" src="../js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="../js/plugins.js"></script>
<script type="text/javascript" charset="utf-8" src="../js/json2.js"></script>
<script type="text/javascript" charset="utf-8" src="../js/common.js"></script>
<script type="text/javascript">
    var WDURL = "";
    var SCHEME = "blue";
</script>
<link href="../css/common.css" rel="stylesheet" type="text/css"/>
<link href="../css/ui.min.css" rel="stylesheet" type="text/css"/>
<style>
body{background: #fff;}
.manage-wrap{margin: 20px auto 10px;width: 300px;}
.manage-wrap .ui-input{width: 200px;font-size:14px;}
</style>
</head>
<body>
<div id="manage-wrap" class="manage-wrap">
	<form id="manage-form" action="storage-manage.aspx">
		<ul class="mod-form-rows">
			<!--<li class="row-item">
				<div class="label-wrap"><label for="number">仓库编号:</label></div>
				<div class="ctn-wrap"><input type="text" value="" class="ui-input" name="number" id="number"></div>
			</li>-->
			<li class="row-item">
				<div class="label-wrap"><label for="name">名称:</label></div>
				<div class="ctn-wrap"><input type="text" value="" class="ui-input" name="name" id="name"></div>
			</li>
		</ul>
	</form>
</div>
<script src="../js/storagemanage.js"></script>
</body>
</html>