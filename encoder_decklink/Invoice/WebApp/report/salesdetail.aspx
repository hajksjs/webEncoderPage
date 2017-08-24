<%@ Page Language="C#" AutoEventWireup="true" Inherits="salesdetail,WebApp" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="salesdetail">
    <title></title>
<link href="../css/common.css" rel="stylesheet" type="text/css"/>
<link href="../css/ui.min.css" rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="../js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="../js/plugins.js"></script>
<!--<script type="text/javascript" charset="utf-8" src="../js/json2.js"></script>-->
<script type="text/javascript" charset="utf-8" src="../js/common.js"></script>
<script type="text/javascript" charset="utf-8" src="../js/grid.js"></script>
<script type="text/javascript" charset="utf-8" src="../js/json3.min.js"></script>
<script type="text/javascript" charset="utf-8" src="../js/jquery.dialog.js"></script>
<script type="text/javascript">
    var WDURL = "";
    var SCHEME = "blue";
</script>

<link rel="stylesheet" href="../css/report.css" />
<style>
.filter-list li.chk-list{height: 20px;}
.mod-report{position: relative;*zoom: 1;padding:66px 0 0 18px;}
.mod-report .search-wrap{position: fixed;left: 0;top: 0;width: 100%;_position:absolute;_left:expression(eval(document.documentElement.scrollLeft));_top:expression(eval(document.documentElement.scrollTop));background: #f5f5f5;}
.mod-report .search-wrap .s-inner{padding: 18px;}
.mod-report .search-wrap strong.tit{font-size:14px;line-height: 30px;}
.mod-report .search-wrap .txt{display: inline-block;*display: inline;*zoom: 1;font-size: 14px;line-height: 30px;}

.mod-report .grid-wrap:after{content: '.';display: block;clear: both;visibility: hidden;overflow: hidden;height: 0;}
.mod-report .grid-wrap{*zoom: 1;}
.mod-report .grid-wrap .grid{float: left;padding: 18px;border:1px solid #cfcfcf;background: #fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);}
.mod-report .grid-wrap .H{font-size:24px;font-weight:bold;text-align: center;}
.mod-report .grid-wrap .R{text-align: right;}
.mod-report .grid-wrap .B{font-weight: bold;}
.mod-report .grid-wrap table{border-collapse:collapse;}
.mod-report .grid-wrap table.caption{margin-bottom: 5px;}
.mod-report .grid-wrap table.list{border:1px solid #666;}
.mod-report .grid-wrap table.list td{padding: 5px 5px;border:1px solid #666;}
.mod-report .grid-wrap table.list thead td{text-align: center;font-weight: bold;}
.link{ cursor:pointer; }
.tr-hover{ background:#f8ff94;}

#filter-menu .mod-choose-input{position: relative;*zoom: 1;}
#filter-menu .mod-choose-input .ui-input{padding-right: 25px;width:226px; font-family:"宋体";}
#filter-menu .ui-datepicker-input{width:105px; font-family:"宋体";}
.ui-icon-ellipsis{ right:3px; }

thead{word-break: keep-all;white-space:nowrap;}

@media print{
body{background: #fff;}
.mod-report{padding: 0;}
.mod-report .search-wrap{display: none;}
.mod-report .grid-wrap .grid{float: none;padding: 0;border:none;background: none;box-shadow:none;}
.mod-report .grid-wrap table.caption{margin-bottom: 0;}
.mod-report .grid-wrap table.list{width:100%;}
.mod-report .grid-wrap table.list td{padding: 1px;}
}
</style>
<script>
    var defParams = {
        beginDate: '2015-05-01',
        endDate: '2015-05-15'
    };
    /*$(function(){
    var SYSTEM = parent.SYSTEM;
    alert(SYSTEM.rights.SAREPORTDETAIL_COST);
    $('#lhtest').html("vvv");
    if(SYSTEM.rights.SAREPORTDETAIL_COST || SYSTEM.isAdmin){
    $('#lhtest').show();
    } else {
    $('#lhtest').hide();
    };
    });
    $(function(){
    $('.list').width($(window).width() - 74);
    });
    $(window).resize(function(){
    $('.list').width($(window).width() - 74);
    });*/
</script>
</head>
<body>
<div class="mod-report">
  <div class="search-wrap" id="report-search">
    <div class="s-inner cf">
      <div class="fl"> <strong class="tit mrb fl">查询条件</strong>
        <div class="ui-btn-menu fl" id="filter-menu"> <span class="ui-btn menu-btn"> <strong id="selected-period">请选择查询条件</strong><b></b> </span>
          <div class="con">
            <ul class="filter-list">
              <li>
                <label class="tit">日期:</label>
                <input type="text" value="" class="ui-input ui-datepicker-input" name="filter-fromDate" id="filter-fromDate" />
                <span>至</span>
                <input type="text" value="" class="ui-input ui-datepicker-input" name="filter-toDate" id="filter-toDate" />
              </li>
            </ul>
            <ul class="filter-list" id="more-conditions">
              <li>
                <label class="tit">客户:</label>
                <span class="mod-choose-input" id="filter-customer"><input type="text" class="ui-input" id="supplierAuto"/><span class="ui-icon-ellipsis"></span></span>
              </li>
              <li style="height:60px; ">
                <label class="tit">商品:</label>
                <span class="mod-choose-input" id="filter-goods"><input type="text" class="ui-input" id="goodsAuto"/><span class="ui-icon-ellipsis"></span></span>
                <p style="color:#999; padding:3px 0 0 0; ">（可用,分割多个编码如1001,1008,2001，或直接输入编码段如1001--1009查询）</p>
              </li>
              <li>
                <label class="tit">仓库:</label>
                <span class="mod-choose-input" id="filter-storage"><input type="text" class="ui-input" id="storageAuto"/><span class="ui-icon-ellipsis"></span></span>
              </li>
            </ul>
            <div class="btns"> <a href="#" id="conditions-trigger" class="conditions-trigger" tabindex="-1">更多条件<b></b></a> <a class="ui-btn ui-btn-sp" id="filter-submit" href="#">确定</a> <a class="ui-btn" id="filter-reset" href="#" tabindex="-1">重置</a> </div>
          </div>
        </div>
        <a id="refresh" class="ui-btn ui-btn-refresh fl mrb"><b></b></a> <span class="txt fl" id="cur-search-tip"></span> </div>
      <div class="fr"><a href="#" class="ui-btn ui-btn-sp mrb fl" id="btn-print">打印</a><a href="#" class="ui-btn fl" id="btn-export">导出</a></div>
    </div>
  </div>
  
  
  <div class="grid-wrap">
  	<div class="grid">
  		<table width='100%' class="caption">
  			<tr><td class='H'>商品销售明细表</td></tr>
  			<tr><td>日期：2015-05-01至2015-05-15</td></tr>
  		</table>
  		<table width="1440px" class="list">
  			<thead>
  				<tr>
  				<td>销售日期</td>
  				<td>销售单据号</td>
  				<td>业务类别</td>
  				<td>客户</td>
  				<td>商品编号</td>
  				<td>商品名称</td>
  				<td>规格型号</td>
  				<td>单位</td>
  				<td>仓库</td>
  				<td>数量</td>
  				
  				<td>单价</td>
  				<td>销售金额</td>
  				
  				</tr>
  			</thead>
            <tbody id='tbody' runat="server"></tbody>
  			<!--<tbody>
  			    
  				<tr>
  				<td colspan="9" class="R B">合计：</td>
  				<td class="R B">0.0000</td>
  				
  				<td class="R B">0.0000</td>
  				<td class="R B">0.00</td>
  				
  				
  				</tr>
  			</tbody>-->
  		</table>
  	</div>
  </div>
  
  
  
</div>
<script type="text/javascript" charset="utf-8" src="../js/salesDetail.js"></script>
</body>
</html>

