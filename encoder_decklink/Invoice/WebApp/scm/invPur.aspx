<%@ Page Language="C#" AutoEventWireup="true" Inherits="invPur,WebApp" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="invPur">
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
<link href="../css/bills.css" rel="stylesheet" type="text/css"/>
</head>
<body>
<div class="wrapper">
  <div class="mod-toolbar-top mr0 cf dn" id="toolTop"></div>
  <div class="bills" id='purchase123' style="width:1192px;">
    <div class="con-header">
      <dl class="cf">
        <dd class="p30">
          <label>销货单位:</label>
          <span class="ui-combo-wrap" id="supplier">
          <input type="text" name="" class="input-txt" autocomplete="off" value="" data-ref="date">
          <i class="trigger"></i></span></dd>
        <dd class="p25 tc">
          <label>单据日期:</label>
          <input type="text" id="purchaseDate" class="ui-input ui-datepicker-input" value="2014-06-23">
        </dd>
        <dd id="identifier" class="p25 tc">
          <label>单据编号:</label>
          <span id="number" runat="server"></span></dd>
        <dd id="classes" class="p20 tr">
          <label class="radio">
            <input type="radio" name="classes" value="150601"/>
            购货</label>
          <label class="radio">
            <input type="radio" name="classes" value="150602"/>
            退货</label>
        </dd>
      </dl>
    </div>
    <div class="grid-wrap">
      <table id="grid">
      </table>
      <div id="page"></div>
    </div>
    <div class="con-footer cf">
      <div class="mb10">
      	<div class="label-wrap">
        	<label>备注:</label>
        </div>
        <div class="ctn-wrap">
        	<input type="text" id="note" class="ui-input" data-ref="discount" style="width:100%; margin:0 -6px; ">
        </div>
      </div>
      <div id="amountArea">
          <p>
            <!--<label>职员:</label>
            <input type="text" id="employee" class="ui-input" data-ref="receipt"/>%-->

          <label>职员:</label>
          <span class="ui-combo-wrap" id="employee">
          <input type="text" name="" class="input-txt" autocomplete="off"/>
          <i class="trigger"></i></span>
            <span>
            <label>票据类型:</label>
            <input type="text" id="receipt" class="ui-input" data-ref="payment"/>
            </span>
            <span>
            <label>付款类型:</label>
            <input type="text" id="payment" class="ui-input ui-input-dis" data-ref="rpAmount" disabled/>
            </span></p>
          <p>
            <label id="paymentTxt">本次收款:</label>
            <input type="text" id="rpAmount" class="ui-input">&emsp;
            <span id="accountWrap" class="dn">
            <label>结算方式:</label>
              <span class="ui-combo-wrap" id="account" style="padding:0;">
              <input type="text" class="input-txt" autocomplete="off"/>
              <i class="trigger"></i></span><a id="accountInfo" class="ui-icon ui-icon-folder-open" style="display:none;"></a>
            </span>
            <span><!---->
            <label>本次欠款:</label>
            <input type="text" id="arrears" class="ui-input ui-input-dis" disabled/>
            </span>
            <span class="dn">
            <label>累计欠款:</label>
            <input type="text" id="totalArrears" class="ui-input ui-input-dis" disabled/>
            
            </span></p>
       </div>
    </div>
    <div class="cf" id="bottomField">
    	<div class="fr" id="toolBottom"></div>
    	<div>
           <label>制单人:</label>
           <span id="userName"></span>
        </div>
    </div>
    <div id="mark"></div>
  </div>
  
  <div id="initCombo" class="dn">
    <input type="text" class="textbox goodsAuto" name="goods" autocomplete="off"/>
    <input type="text" class="textbox storageAuto" name="storage" autocomplete="on"/>
    <input type="text" class="textbox unitAuto" name="unit" autocomplete="off"/>
  </div>
  <div id="storageBox" class="shadow target_box dn">
  <div id="unitBox" class="shadow target_box dn">
  </div>
</div>
<script src="../js/purchases.js"></script>

</body>
</html>

