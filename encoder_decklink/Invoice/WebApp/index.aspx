<%@ Page Language="C#" AutoEventWireup="true"  Inherits="_Index,WebApp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
<meta name="viewport" content="width=1280, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
<meta name="renderer" content="webkit|ie-comp|ie-stand"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>

<script type="text/javascript" src="./js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="./js/plugins.js"></script>
<script type="text/javascript" charset="utf-8" src="./js/json2.js"></script>
<script type="text/javascript" charset="utf-8" src="./js/common.js"></script>

<script type="text/javascript">
    var WDURL = "";
    var SCHEME = "blue";
</script>
<link href="./css/ui.min.css" rel="stylesheet" type="text/css">
<link href="./css/common.css" rel="stylesheet" type="text/css">
<link href="./css/base.css" rel="stylesheet" type="text/css">
<link href="./css/index.css" rel="stylesheet" type="text/css">
<link href="./css/index-blue.css" rel="stylesheet" type="text/css" id="indexFile">
</head>
<body>
<div id="hd" class="cf">
  <p class="fl welcome"><strong><span id="greetings"></span>，<span id="username"></span>！</strong>维护<a tabid="setting-customerList" data-right="BU_QUERY" tabTxt="客户管理" parentOpen="true" rel="pageTab" href="settings/customerlist.aspx">「客户」、</a><a tabid="setting-vendorList" data-right="PUR_QUERY" tabTxt="供应商管理" parentOpen="true" rel="pageTab" href="settings/supplierlist.aspx">「供应商」、</a><a tabid="setting-goodsList" data-right="INVENTORY_QUERY" tabTxt="商品管理" parentOpen="true" rel="pageTab" href="settings/goodslist.aspx">「商品」</a>信息
  </p>
</div>
<script>
var greetings = "", cur_time = new Date().getHours();
if(cur_time >= 0 && cur_time <= 4 ) {
	greetings = "已经夜深了，请注意休息"
} else if (cur_time > 4 && cur_time <= 7 ) {
	greetings = "早上好";
} else if (cur_time > 7 && cur_time < 12 ) {
	greetings = "上午好";
} else if (cur_time >= 12 && cur_time <= 18 ) {
	greetings = "下午好";
} else {
	greetings = "晚上好";
};
$("#greetings").text(greetings);
$("#username").text(parent.SYSTEM.realName);
</script>
<div id="bd" class="clearfix">
  <div class="col-main">
    <div class="main-wrap cf">
      <div class="m-top">
      	 <div class="storages-search"><label for="">商品即时库存:</label><span class="ui-search"><input type="text" id="goodsAuto" class="ui-input" /></span><span class="red" id="result"></span><a href="" class="ui-btn" id="search">查询</a></div>
      </div>
      <ul class="quick-links">
        <li class="purchase-purchase">
        	<a tabid="purchase-purchase" data-right="PU_ADD" tabTxt="购货单" parentOpen="true" rel="pageTab" href="./scm/invPur.aspx?action=initPur"><span></span>采购入库</a>
        </li>
        <li class="sales-sales">
        	<a tabid="sales-sales" data-right="SA_ADD" tabTxt="销货单" parentOpen="true" rel="pageTab" href="./scm/invSa.aspx?action=initSale"><span></span>销货出库</a>
        </li>
        <li class="storage-transfers">
        	<a tabid="storage-transfers" data-right="TF_ADD" tabTxt="调拨单" parentOpen="true" rel="pageTab" href="/scm/invTf.aspx?action=initTf"><span></span>仓库调拨</a>
        </li>
        <li class="storage-inventory">
        	<a tabid="storage-inventory" data-right="PD_GENPD" tabTxt="盘点" parentOpen="true" rel="pageTab" href="/storage/inventory.aspx"><span></span>库存盘点</a>
        </li>
        <li class="storage-otherWarehouse">
        	<a tabid="storage-otherWarehouse" data-right="IO_ADD" tabTxt="其他入库" parentOpen="true" rel="pageTab" href="/scm/invOi.aspx?action=initOi&type=in"><span></span>其他入库</a>
        </li>
        <li class="storage-otherOutbound">
        	<a tabid="storage-otherOutbound" data-right="OO_ADD" tabTxt="其他出库" parentOpen="true" rel="pageTab" href="/scm/invOi.aspx?action=initOi&type=out"><span></span>其他出库</a>
        </li>
        <li class="added-service">
        	<a tabid="money-receiptList" tabTxt="收款记录" data-right="RECEIPT_QUERY" parentOpen="true" rel="pageTab" href="/scm/receipt.aspx?action=initReceiptList"><span></span>收款记录</a>
        </li>
        <li class="feedback">
        	<a href="#" id="feedback"><span></span>帮助</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="col-extra">
    <div class="extra-wrap">
      <h2>快速查看</h2>
      <div class="list">
        <ul>
        	<!--<li><a href="/scm/receipt.aspx?action=initReceiptList" rel="pageTab" tabid="money-receiptList" tabTxt="收款记录" data-right="RECEIPT_QUERY" parentOpen="true">查看收款记录</a></li>
            <li><a href="/scm/payment.aspx?action=initPayList" rel="pageTab" tabid="money-paymentList" tabTxt="付款记录" data-right="PAYMENT_QUERY" parentOpen="true">查看付款记录</a></li>
        	<li><a tabid="report-initialBalance" data-right="InvBalanceReport_QUERY" tabTxt="商品库存余额" parentOpen="true" rel="pageTab" href="/report/invBalance.aspx?action=detail">查看商品库存余额</a></li>
        	<li><a tabid="report-contactDebt" data-right="ContactDebtReport_QUERY" tabTxt="往来单位欠款表" parentOpen="true" rel="pageTab" href="/report/contactDebt.aspx?action=detail">查看往来单位欠款</a></li>-->
        	<li><a href="./report/salesdetail.aspx?beginDate=2015-05-01&endDate=2015-05-26" rel="pageTab" tabid="report-salesDetail" tabTxt="销售明细表" data-right="SAREPORTDETAIL_QUERY" parentOpen="true">查看销售明细表</a></li>
            <li><a href="./report/purchasedetail.aspx?beginDate=2015-05-01&endDate=2015-05-26" rel="pageTab" tabid="report-puDetail" tabTxt="采购明细表" data-right="PUREOORTDETAIL_QUERY" parentOpen="true">查看采购明细表</a></li>
            <li><a tabid="purchase-salesList" data-right="PU_QUERY" tabTxt="购货记录" parentOpen="true" rel="pageTab" href="./scm/invPurList.aspx?action=initPurchaseList">查看购货记录</a></li>
        	<li><a tabid="sales-salesList" data-right="SA_QUERY" tabTxt="销货记录" parentOpen="true" rel="pageTab" href="./scm/invSaList.aspx?action=initSaleList">查看销货记录</a></li>
        	<!--<li style="border-bottom:none;"><a tabid="storage-transfersList" data-right="TF_QUERY" tabTxt="调拨记录" parentOpen="true" rel="pageTab" href="/scm/invTf.aspx?action=initTfList">查看调拨记录</a></li>
        	<li><a tabid="storage-otherWarehouseList" data-right="IO_QUERY" tabTxt="其他入库记录" parentOpen="true" rel="pageTab" href="/scm/invOi.aspx?action=initOiList&type=in">查看其他入库记录</a></li>
        	<li style="border-bottom:none;"><a tabid="storage-otherOutboundList" data-right="OO_QUERY" tabTxt="其他出库记录" parentOpen="true" rel="pageTab" href="/scm/invOi.aspx?action=initOiList&type=out">查看其他出库记录</a></li>-->
        </ul>
      </div>
    </div>
  </div>
</div>
<script>
Public.pageTab();
//获取公告
(function(){
	var URL = parent.CONFIG.SERVICE_URL;
	var system = SYSTEM = parent.SYSTEM;
	var version;
	switch (system.siVersion) {
		case 3:
		  version = '1';
		  break;
		case 4:
		  version = '3';
		  break;
		default:
		  version = '2';
	};
	var param = '?eventType=2&serviceId=' + parent.SYSTEM.DBID;	//自带参数
	/*$.getJSON( URL+ "asy/Services.ashx?callback=?", {coid : system.DBID, loginuserno: system.UserName, version: version, type: 'getsystemmsg' + SYSTEM.servicePro}, function(data){ 
		if(data.msg == 'success'){
			if(data.data.length == 0){
				return;
			}
			var $notices = $('<div class="fr notices" id="notices"></div>'), 
				html = [], 
				notice,
				li = '';
			data = data.data;
			for(var i=0; i<data.length; i++){
				notice = data[i];
				if(notice.msglink){
					li = '<li><a target="_blank" href="' + notice.msglink + param + '" title="' + notice.msgtitle + '" data-id="' + notice.msgid + '"><i></i>' + notice.msgtitle + '</a></li>'
				}else{
					li = '<li><a href="/service/service.html?newsId=' + notice.msgid + '" rel="pageTab" tabId="myService" tabTxt="服务支持" parentOpen="true" title="' + notice.msgtitle + '" data-id="' + notice.msgid + '"><i></i>' + notice.msgtitle + '</a></li>'
				}
				html.push(li);
			}
			$notices.append('<ul>' + html.join('') + '</ul>').appendTo('#hd');
			Public.pageTab();
			Public.txtSlide();
		}
	});*/
	$("[tabid^='report']").each(function(){
		var dateParams = "beginDate="+parent.SYSTEM.beginDate+"&endDate="+parent.SYSTEM.endDate;
		var href = this.href;
		href += (this.href.lastIndexOf("?")===-1) ? "?" : "&";
		if($(this).html() === '商品库存余额表'){
			this.href = href + "beginDate="+parent.SYSTEM.startDate+"&endDate="+parent.SYSTEM.endDate;
		}
		else{
			this.href = href + dateParams;
		}
	});
})();

var goodsCombo = Business.goodsCombo($('#goodsAuto'), {
	extraListHtml: ''
});

$('#goodsAuto').click(function(){
	var _self = this;
	setTimeout(function(){
		_self.select();
	}, 50);
});

$('#search').click(function(e){
	e.preventDefault();
	//$('#result').html('').addClass('loading');
	var id = goodsCombo.getValue();
	var text = $('#goodsAuto').val();
	Business.forSearch(id, text);
});

$("#feedback").click(function(e){
	e.preventDefault();
	parent.tab.addTabItem({tabid: 'myService', text: '服务支持', url: '/service/service.aspx', callback: function(){
		parent.aspxcument.getElementById('myService').contentWindow.openTab(3);

	}});
});

$('#bulkImport').click(function(e){
  e.preventDefault();
  if (!Business.verifyRight('BaseData_IMPORT')) {
	  return ;
  };
  parent.$.dialog({
	  width: 560,
	  height: 300,
	  title: '批量导入',
	  content: 'url:/import.aspx',
	  data: {
		  callback: function(row){

		  }
	  },
	  lock: true
  });
});
</script>
</body>
</html>