<%@ Page Language="C#" AutoEventWireup="true" Inherits="invPurList,WebApp" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1">
    <title></title>
<script type="text/javascript" src="../js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="../js/plugins.js"></script>
<script type="text/javascript" charset="utf-8" src="../js/json2.js"></script>
<script type="text/javascript" charset="utf-8" src="../js/common.js"></script>
<script type="text/javascript" charset="utf-8" src="../js/grid.js"></script>
<script type="text/javascript" charset="utf-8" src="../js/jquery.dialog.js"></script>
<script type="text/javascript">
    var WDURL = "";
    var SCHEME = "blue";
</script>
<link href="../css/common.css" rel="stylesheet" type="text/css"/>
<link href="../css/ui.min.css" rel="stylesheet" type="text/css"/>
<style>
#matchCon { width: 280px; }
#print{margin-left:10px;}
a.ui-btn{margin-left:10px;}
#reAudit,#audit{display:none;}
</style>
</head>
<body>
<div class="wrapper">
  <div class="mod-search cf">
    <div class="fl">
      <ul class="ul-inline">
        <li>
          <input type="text" id="matchCon" class="ui-input ui-input-ph" value="请输入单据号或客户名或备注">
        </li>
        <li>
          <label>日期:</label>
          <input type="text" id="beginDate" value="2014-07-02" class="ui-input ui-datepicker-input">
          <i>-</i>
          <input type="text" id="endDate" value="2014-07-08" class="ui-input ui-datepicker-input">
        </li>
        <li><a class="ui-btn" id="search">查询</a><!--<a class="ui-btn ui-btn-refresh" id="refresh" title="刷新"><b></b></a>--></li>
      </ul>
    </div>
    <div class="fr"><a class="ui-btn ui-btn-sp" id="add">新增</a><a class="ui-btn" id="print" target="_blank" href="javascript:void(0);">打印</a><a class="ui-btn dn" id="audit">审核</a><a class="ui-btn" id="reAudit">反审核</a></div>
  </div>

  <div class="grid-wrap">
    <table id="grid">
    </table>
    <div id="page"></div>
  </div>
</div>
<script src="../js/purchasesList.js"></script>

</body>
</html>

