<%@ Page Language="C#" AutoEventWireup="true" Inherits="_Default,WebApp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="default" runat="server">
<meta name="viewport" content="width=1280, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
<meta name="renderer" content="webkit|ie-comp|ie-stand"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
<link href="./css/common.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="./js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="./js/plugins.js"></script>
<script type="text/javascript" charset="utf-8" src="./js/json2.js"></script>
<script type="text/javascript" charset="utf-8" src="./js/common.js"></script>
<script type="text/javascript" charset="utf-8" src="./js/grid.js"></script>
<script type="text/javascript" charset="utf-8" src="./js/jquery.dialog.js"></script>
<script type="text/javascript">
    var WDURL = "";
    var SCHEME = "blue";
</script>
<link href="./css/ui.min.css" rel="stylesheet" type="text/css"/>
<link href="./css/base.css" rel="stylesheet" type="text/css">
<link href="./css/default.css" rel="stylesheet" type="text/css" id="defaultFile">
<script type="text/javascript" src="./js/tabs.js"></script>
<script type="text/javascript">

    var CONFIG = {
        DEFAULT_PAGE: true,
        SERVICE_URL: ''
    };

    //系统参数控制
    var SYSTEM = {
        version: "<%= GetParamValue("version","1") %>",
        skin: "blue",
        curDate: "<%= curDate %>",  //系统当前日期
        DBID: '<%= DBID %>', //账套ID
        serviceType: '12', //账套类型，13：表示收费服务，12：表示免费服务
        realName: '体验用户', //真实姓名
        userName: "<%= UserName %>", //用户名
        companyName: '公司名', //公司名称
        companyAddr: '', //公司地址
        phone: '', //公司电话
        fax: '', //公司传真
        postcode: '', //公司邮编
        startDate: '2013-09-17', //启用日期
        currency: 'RMB', //本位币
        quantityPlaces: '1', //数量小数位
        pricePlaces: '3', //单价小数位
        amountPlaces: '2', //金额小数位
        valMethods: 'movingAverage', //存货计价方法
        invEntryCount: '', //试用版单据分录数
        rights: {}, //权限列表
        userRights:{},
        billRequiredCheck: 1, //是否启用单据审核功能  1：是、0：否
        requiredCheckStore: 1, //是否检查负库存  1：是、0：否
        requiredMoney: 1, //是否启用资金功能  1：是、0：否
        taxRequiredCheck: 0,
        taxRequiredInput: 17,
        isAdmin: true, //是否管理员
        siExpired: false, //是否过期
        siType: 1, //服务版本，1表示基础版，2表示标准版
        siVersion: 4, //1表示试用、2表示免费（百度版）、3表示收费，4表示体验版
        Mobile: "", //当前用户手机号码
        isMobile: true, //是否验证手机
        isshortUser: false, //是否联邦用户
        shortName: "", //shortName
        isOpen: false//是否弹出手机验证
    };
    //区分服务支持
    SYSTEM.servicePro = SYSTEM.siType === 2 ? 'forbscm3' : 'forscm3';
    var cacheList = {}; //缓存列表查询

    var menu = {
    init: function (t, e) {
        var i = {
            callback: {}
        };
        this.obj = t;
        this.opts = $.extend(!0, {},
        i, e);
        this.sublist = this.opts.sublist;
        this.sublist || this._getMenuData();
        this._menuControl();
        this._initDom()
    },
    _display: function (t, e) {
        for (var i = t.length - 1; i >= 0; i--) { if (this.sublist[t[i]]) this.sublist[t[i]].disable = !e; }
        //for (var i = t.length - 1; i >= 0; i--) this.sublist[t[i]].disable = !e; 
        return this
    },
    _show: function (t) {
        return this._display(t, !0)
    },
    _hide: function (t) {
        return this._display(t, !1)
    },
    _getMenuData: function () {
        this.sublist = SYSTEM.userRights
    },
    _menuControl: function () {
        var t = SYSTEM.siType,
        e = SYSTEM.isAdmin,
        i = SYSTEM.siVersion;
        //this._hide(["authority", "reInitial"]);
        switch (t) {
            case 1:
                //this._hide(["onlineStoreList", "onlineStoreRelation", "logisticsList", "onlineOrderList", "onlineSalesList", "purchaseOrder", "purchaseOrderList", "salesOrder", "salesOrderList", "verification", "verificationList", "shippingAddress", "puOrderTracking", "salesOrderTracking"]);
                break;
            case 2:
        }
        switch (i) {
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break
                //this._hide(["backup"])
        }
        if (e) {
            3 == i && this._show(["reInitial"]);
            this._show(["authority"])
        }
    },
    _getDom: function () {
        this.objCopy = this.obj.clone(!0);
        this.container = this.obj.closest("div")
    },
    _setDom: function () {
        this.obj.remove();
        this.container.append(this.objCopy)
    },
    _initDom: function () {
        if (this.sublist && this.obj) {
            this.obj.find("li:not(.item)").remove();
            this._getDom();
            var t = this.sublist,
            e = {};
            e.target = {};
            for (var i in t) if (!t[i].disable) {
                var r = t[i],
                a = e.target[r.target],
                n = r.id ? "id=" + r.id : "",
                o = r.id ? "" : "rel=pageTab",
                s = "<li><a " + n + ' tabid="' + r.target.split("-")[0] + "-" + i + '" ' + o + ' href="' + r.href + '" data-right="' + r.dataRight + '">' + r.name + "</a></li>";
                if (a) a.append(s);
                else {
                    e.target[r.target] = this.objCopy.find("#" + r.target);
                    e.target[r.target] && e.target[r.target].append(s)
                }
            }
            this.objCopy.find("li.item").each(function () {
                var t = $(this);
                t.find("li").length || t.remove()
            });
            this._setDom()
        }
    }
};

    //全局基础数据
    (function () {
        /*
        * 判断IE6，提示使用高级版本
        */
        if (Public.isIE6) {
            var Oldbrowser = {
                init: function () {
                    this.addDom();
                },
                addDom: function () {
                    var html = $('<div id="browser">您使用的浏览器版本过低，影响网页性能，建议您换用<a href="http://www.google.cn/chrome/intl/zh-CN/landing_chrome.html" target="_blank">谷歌</a>、<a href="http://download.microsoft.com/download/4/C/A/4CA9248C-C09D-43D3-B627-76B0F6EBCD5E/IE9-Windows7-x86-chs.exe" target="_blank">IE9</a>、或<a href=http://firefox.com.cn/" target="_blank">火狐浏览器</a>，以便更好的使用！<a id="bClose" title="关闭">x</a></div>').insertBefore('#container').slideDown(500);
                    this._colse();
                },
                _colse: function () {
                    $('#bClose').click(function () {
                        $('#browser').remove();
                    });
                }
            };
            Oldbrowser.init();
        };
        getMenus();
        getGoods();
        getBaseData();
        getCustomer();
        getSupplier();
    })();

    //缓存商品信息
    function getGoods() {
        if (SYSTEM.isAdmin || SYSTEM.rights.INVENTORY_QUERY) {
            Public.ajaxGet('./basedata/inventory.aspx?action=list', {}, function (data) {
                if (data.status === 200) {
                    SYSTEM.goodsInfo = data.data.rows;
                } else if (data.status === 250) {
                    SYSTEM.goodsInfo = [];
                } else {
                    Public.tips({ type: 1, content: data.msg });
                }
            });
        } else {
            SYSTEM.goodsInfo = [];
        }
    };

    //缓存权限信息
    function getMenus() {
            Public.ajaxGet('./settings/authority.aspx?action=getUserMenu', {}, function (data) {
                if (data.status === 200) {
                    SYSTEM.userRights = data.data;
                    //alert(SYSTEM.userRights.sales.dataRight.P);
                    menu.init($("#nav"));
                    var e = $("#nav"),
                        i = $("#nav > li");
                        $.each(i,
                        function() {
                            var i = $(this).find(".sub-nav-wrap");
                            $(this).on("mouseover",
                            function() {
                                e.removeClass("static");
                                $(this).addClass("on");
                                i.stop(!0, !0).fadeIn(250)
                            }).on("mouseleave",
                            function() {
                                e.addClass("static");
                                $(this).removeClass("on");
                                i.stop(!0, !0).hide()
                            });
                            if (0 != i.length && "auto" == i.css("top") && "auto" == i.css("bottom")) {
                                var r = ($(this).outerHeight() - i.outerHeight()) / 2;
                                i.css({
                                    top: r
                                })
                            }
                        });
                        $(".sub-nav-wrap a").bind("click",
                        function() {
                            $(this).parents(".sub-nav-wrap").hide()
                        });

                } else if (data.status === 250) {
                    SYSTEM.userRights = {};
                } else {
                    Public.tips({ type: 1, content: data.msg });
                }
            });
    };

    //缓存仓库信息
    function getStorage() {
        if (SYSTEM.isAdmin || SYSTEM.rights.INVLOCTION_QUERY) {
            Public.ajaxGet('./basedata/baseData.aspx?action=get&type=storage&isDelete=2', {}, function (data) {
                if (data.status === 200) {
                    SYSTEM.allStorageInfo = data.data.items;
                    SYSTEM.storageInfo = [];
                    $.each(SYSTEM.allStorageInfo, function (i, n) {
                        /*if (n['delete'] === false)*/ {
                            SYSTEM.storageInfo.push(n);
                        };
                    });
                } else if (data.status === 250) {
                    SYSTEM.allStorageInfo = [];
                    SYSTEM.storageInfo = [];
                } else {
                    Public.tips({ type: 1, content: data.msg });
                }
            });
        } else {
            SYSTEM.allStorageInfo = [];
            SYSTEM.storageInfo = [];
        }
    };

    //缓存仓库信息
    function getBaseData() {
        if (SYSTEM.isAdmin || SYSTEM.rights.INVLOCTION_QUERY) {
            Public.ajaxGet('./basedata/basedata.aspx?action=getall&isDelete=2', {}, function (data) {
                if (data.status === 200) {
                    SYSTEM.allStorageInfo = data.data.storage;
                    SYSTEM.storageInfo = [];
                    $.each(SYSTEM.allStorageInfo, function (i, n) {
                        /*if (n['delete'] === false)*/ {
                            SYSTEM.storageInfo.push(n);
                        };
                    });

                    SYSTEM.allUnitInfo = data.data.unit;
                    SYSTEM.unitInfo = [];
                    SYSTEM.units = "";
                    $.each(SYSTEM.allUnitInfo, function (i, n) {
                        /*if (n['delete'] === false)*/ {
                            SYSTEM.unitInfo.push(n);
                            if (i==0)
                            SYSTEM.units += n.id+":"+n.name;
                            else SYSTEM.units += ";"+n.id+":"+n.name;
                        };
                    });

                    SYSTEM.allEmployeeInfo = data.data.employee;
                    SYSTEM.employeeInfo = [];
                    SYSTEM.employees = "";
                    $.each(SYSTEM.allEmployeeInfo, function (i, n) {
                        /*if (n['delete'] === false)*/ {
                            SYSTEM.employeeInfo.push(n);
                            if (i==0)
                            SYSTEM.employees += n.id+":"+n.name;
                            else SYSTEM.employees += ";"+n.id+":"+n.name;
                        };
                    });


                    SYSTEM.allAccountInfo = data.data.account;
                    SYSTEM.accountInfo = [];
                    SYSTEM.accounts = "";
                    $.each(SYSTEM.allAccountInfo, function (i, n) {
                        /*if (n['delete'] === false)*/ {
                            SYSTEM.accountInfo.push(n);
                            if (i==0)
                            SYSTEM.accounts += n.id+":"+n.name;
                            else SYSTEM.accounts += ";"+n.id+":"+n.name;
                        };
                    });
                    //alert((SYSTEM.units));
                } else if (data.status === 250) {
                    SYSTEM.allStorageInfo = [];
                    SYSTEM.storageInfo = [];
                    SYSTEM.allUnitInfo = [];
                    SYSTEM.unitInfo = [];
                } else {
                    Public.tips({ type: 1, content: data.msg });
                }
            });
        } else {
            SYSTEM.allStorageInfo = [];
            SYSTEM.storageInfo = [];
        }
    };

    //缓存客户信息
    function getCustomer() {
        if (SYSTEM.isAdmin || SYSTEM.rights.BU_QUERY) {
            Public.ajaxGet('./basedata/contact.aspx?action=list', {}, function (data) {
                if (data.status === 200) {
                    SYSTEM.customerInfo = data.data.items;
                } else if (data.status === 250) {
                    SYSTEM.customerInfo = [];
                } else {
                    Public.tips({ type: 1, content: data.msg });
                }
            });
        } else {
            SYSTEM.customerInfo = [];
        }
    };
    //缓存供应商信息
    function getSupplier() {
        if (SYSTEM.isAdmin || SYSTEM.rights.PUR_QUERY) {
            Public.ajaxGet('./basedata/contact.aspx?type=10&action=list', {}, function (data) {
                if (data.status === 200) {
                    SYSTEM.supplierInfo = data.data.items;
                } else if (data.status === 250) {
                    SYSTEM.supplierInfo = [];
                } else {
                    Public.tips({ type: 1, content: data.msg });
                }
            });
        } else {
            SYSTEM.supplierInfo = [];
        }
    };
    //缓存账户信息
    function getAccounts() {
        if (true) {
            Public.ajaxGet('/basedata/settAcct.aspx?action=list', {}, function (data) {
                if (data.status === 200) {
                    SYSTEM.accountInfo = data.data.items;
                } else if (data.status === 250) {
                    SYSTEM.accountInfo = [];
                } else {
                    Public.tips({ type: 1, content: data.msg });
                }
            });
        } else {
            SYSTEM.accountInfo = [];
        }
    };


    //缓存结算方式
    function getPayments() {
        if (true) {
            Public.ajaxGet('/basedata/assist.aspx?action=list&typeNumber=PayMethod&isDelete=2', {}, function (data) {
                if (data.status === 200) {
                    SYSTEM.paymentInfo = data.data.items;
                } else if (data.status === 250) {
                    SYSTEM.paymentInfo = [];
                } else {
                    Public.tips({ type: 1, content: data.msg });
                }
            });
        } else {
            SYSTEM.paymentInfo = [];
        }
    };
    //左上侧版本标识控制
    function markupVension() {
        var imgSrcList = {
            base: '/img/icon_v_b.png', //基础版正式版
            baseExp: './img/icon_v_b_e.png', //基础版体验版
            baseTrial: '/img/icon_v_b_t.png', //基础版试用版
            standard: '/img/icon_v_s.png', //标准版正式版
            standardExp: '/img/icon_v_s_e.png', //标准版体验版
            standardTrial: '/css/blue/img/icon_v_s_t.png' //标准版试用版
        };
        var imgModel = $("<img id='icon-vension' src='' alt=''/>");
        if (SYSTEM.siType === 1) {
            switch (SYSTEM.siVersion) {
                case 1: imgModel.attr('src', imgSrcList.baseTrial).attr('alt', '基础版试用版');
                    break;
                case 2: imgModel.attr('src', imgSrcList.baseExp).attr('alt', '免费版（百度版）');
                    break;
                case 3: imgModel.attr('src', imgSrcList.base).attr('alt', '基础版'); //标准版
                    break;
                case 4: imgModel.attr('src', imgSrcList.baseExp).attr('alt', '基础版体验版'); //标准版
                    break;
            };
        } else {
            switch (SYSTEM.siVersion) {
                case 1: imgModel.attr('src', imgSrcList.standardTrial).attr('alt', '标准版试用版');
                    break;
                case 3: imgModel.attr('src', imgSrcList.standard).attr('alt', '标准版'); //标准版
                    break;
                case 4: imgModel.attr('src', imgSrcList.standardExp).attr('alt', '标准版体验版'); //标准版
                    break;
            };
        };

        $('#col-side').prepend(imgModel);
    };
      window.setInterval(function(){
		Public.ajaxGet('./basedata/checkonline.aspx?action=check'+"&random=" + Math.random(), {}, function(data){
			if(data.status != '200') {
				$.dialog.alert("帐号已在别处登陆，你被强迫下线！",
                function () { window.location.href = "login.aspx"; })

			} else {
				/*$.dialog.alert(data.status,
                function () { })*/
			}
		});
		},10e3);


</script>
	</head>
<body>
<div id="container" class="cf">
  <div id="col-side">
    <ul id="nav" class="cf">
      <li class="item item-onlineStore"> <a class="onlineStore main-nav" tabid="onlineStore-map" tabTxt="网店导航" rel="pageTab" href="/online-store/map.aspx">网店<span class="arrow">&gt;</span></a>
        <div class="sub-nav-wrap group-nav-t0" >
          <ul class="sub-nav" id="onlineStore">
          </ul>
          </div>
      </li>
      <li class="item item-purchase"> <a href="javascript:void(0);" class="purchase main-nav">购货<span class="arrow">&gt;</span></a>
        <div class="sub-nav-wrap single-nav">
          <ul class="sub-nav" id="purchase">
          </ul>
          </div>
      </li>
      <li class="item item-sales"> <a href="javascript:void(0);" class="sales main-nav">销货<span class="arrow">&gt;</span></a>
        <div class="sub-nav-wrap single-nav">
          <ul class="sub-nav" id="sales">
          </ul></div>
      </li>
      <li class="item item-storage"> <a href="javascript:void(0);" class="storage main-nav">仓库<span class="arrow">&gt;</span></a>
        <div class="sub-nav-wrap single-nav">
          <ul class="sub-nav" id="storage">
          </ul>
          </div>
      </li>           
      <li class="item item-money"> <a href="javascript:void(0);" class="money main-nav">资金<span class="arrow">&gt;</span></a>
        <div class="sub-nav-wrap single-nav">
          <ul class="sub-nav" id="money"> 
          </ul>
          </div>
      </li>
      <li class="item item-report"> <a href="javascript:void(0);" class="report main-nav">报表<span class="arrow">&gt;</span></a>
        <div class="sub-nav-wrap group-nav report-nav cf">
          <div class="nav-item nav-pur">
            <h3>采购报表</h3>
            <ul class="sub-nav" id="report-purchase">
            </ul>
          </div>
          <div class="nav-item nav-sales">
            <h3>销售报表</h3>
            <ul class="sub-nav" id="report-sales">
            </ul>
          </div>
          <div class="nav-item nav-fund">
            <h3>仓存报表</h3>
            <ul class="sub-nav" id="report-storage">
            </ul>
          </div>
          
          <div class="nav-item nav-fund last">
            <h3>资金报表</h3>
            <ul class="sub-nav" id="report-money">
            </ul>
          </div>
          
          </div>
      </li>
      <li class="item item-setting"> <a href="javascript:void(0);" class="setting main-nav">设置<span class="arrow">&gt;</span></a>
        <div class="sub-nav-wrap cf group-nav setting-nav">
          <div class="nav-item">
            <h3>基础资料</h3>
            <ul class="sub-nav" id="setting-base">
            </ul>
          </div>
          <div class="nav-item">
            <h3>辅助资料</h3>
            <ul class="sub-nav" id="setting-auxiliary">
            </ul>
          </div>
          <div class="nav-item cf last">
            <h3>高级设置</h3>
            <ul class="sub-nav" id="setting-advancedSetting">
            </ul>
            <ul class="sub-nav" id="setting-advancedSetting-right">
            </ul>
          </div>
          </div>
      </li>
    </ul>
    <!--<div id="navScroll" class="cf"><span id="scollUp"><i>dd</i></span><span id="scollDown"><i>aa</i></span></div>-->
    <!--<a href="#" class="side_fold">收起</a>--> 
  </div>
  <div id="col-main">
    <div id="main-hd" class="cf">
      <div class="tit"> <span class="company" id="companyName"></span> <span class="period" id="period"></span> </div>
      <ul class="user-menu">
        
        <li class="qq"><a href="#" onClick="return false;" id="wpa">QQ咨询：729513406</a></li>
      	<li class="space">|</li>
      	<li class="telphone">电话：400-800-0000</li>
        <li class="space">|</li>
      	<li><a href="http://item.taobao.com/item.htm?id=45658612273" target="_blank" class="buy-now">源码购买</a></li>
        <li class="space">|</li>
      	<li id="sysSkin">换肤</li>
        <li class="space">|</li>
        
      	<li><a class="service-tab" data-tab="3">在线提问</a></li>
        <li class="space">|</li>

        <li><a href="#" target="_blank">帮助</a></li>
        <li class="space">|</li>
        <li><a href="login.aspx">退出</a></li>
      </ul>   
    </div>
    <div id="main-bd">
      <div class="page-tab" id="page-tab"> 
        <!--<ul class="tab_hd">
					<li><a href="#">首页</a></li>
					<li><a href="#">会计科目</a></li>
				</ul>
				<div class="tab_bd">
					内容
				</div>--> 
      </div>
    </div>
  </div>
</div>
<div id="selectSkin" class="shadow dn">
	<ul class="cf">
    	<li><a id="skin-default"><span></span><small>经典</small></a></li>
        <li><a id="skin-blue"><span></span><small>丰收</small></a></li>
        <li><a id="skin-green"><span></span><small>小清新</small></a></li>
    </ul>
</div>
<script type="text/javascript" src="./js/default.js"></script>
</body>
</html>
