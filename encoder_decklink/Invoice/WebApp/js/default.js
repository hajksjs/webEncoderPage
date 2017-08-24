function setTabHeight() {
    var t = $(window).height(),
    e = $("#main-bd"),
    i = t - e.offset().top;
    e.height(i)
}

function initDate() {
    var t = new Date,
    e = t.getFullYear(),
    i = ("0" + (t.getMonth() + 1)).slice( - 2),
    r = ("0" + t.getDate()).slice( - 2);
    SYSTEM.beginDate = e + "-" + i + "-01";
    SYSTEM.endDate = e + "-" + i + "-" + r
}
function addUrlParam() {
    var t = "beginDate=" + SYSTEM.beginDate + "&endDate=" + SYSTEM.endDate;
    $("#nav").find("li.item-report .nav-item a").each(function() {
        var e = this.href;
        e += -1 === this.href.lastIndexOf("?") ? "?": "&";
        this.href = "商品库存余额表" === $(this).html() ? e + "beginDate=" + SYSTEM.startDate + "&endDate=" + SYSTEM.endDate: e + t
    })
}

function getStores() {
    SYSTEM.isAdmin || SYSTEM.rights.CLOUDSTORE_QUERY ? Public.ajaxGet("/bs/cloudStore.aspx?action=list", {},
    function(t) {
        200 === t.status ? SYSTEM.storeInfo = t.data.items: 250 === t.status ? SYSTEM.storeInfo = [] : Public.tips({
            type: 1,
            content: t.msg
        })
    }) : SYSTEM.storeInfo = []
}
function getLogistics() {
    SYSTEM.isAdmin || SYSTEM.rights.EXPRESS_QUERY ? Public.ajaxGet("/bs/express.aspx?action=list", {},
    function(t) {
        200 === t.status ? SYSTEM.logisticInfo = t.data.items: 250 === t.status ? SYSTEM.logisticInfo = [] : Public.tips({
            type: 1,
            content: t.msg
        })
    }) : SYSTEM.logisticInfo = []
}
function setCurrentNav(t) {
    if (t) {
        var e = t.match(/([a-zA-Z]+)[-]?/)[1];
        $("#nav > li").removeClass("current");
        $("#nav > li.item-" + e).addClass("current")
    }
}

$(function() {
    $("#companyName").text(SYSTEM.companyName)
});
if (SYSTEM.siExpired) {
    var button = [{
        name: "立即续费",
        focus: !0,
        callback: function() {
            window.open("http://service.youshang.com/fee/renew.aspx?langOption=zh-CHS&accIds=" + SYSTEM.DBID)
        }
    },
    {
        name: "下次再说"
    }],
    tipsContent = ['<div class="ui-dialog-tips">', "<p>谢谢您使用本产品，您的当前服务已经到期，到期3个月后数据将被自动清除，如需继续使用请购买/续费！</p>", '<p style="color:#AAA; font-size:12px;">(续费后请刷新页面或重新登录。)</p>', "</div>"].join("");
    $.dialog({
        width: 400,
        min: !1,
        max: !1,
        title: "系统提示",
        fixed: !0,
        lock: !0,
        button: button,
        resize: !1,
        content: tipsContent
    })
}
setTabHeight();
$(window).bind("resize",
function() {
    setTabHeight()
}); !
function(t) {
    //menu.init(t("#nav"));
    initDate();
    addUrlParam();
    //BBSPop();
    /*var e = t("#nav"),
    i = t("#nav > li");
    t.each(i,
    function() {
        var i = t(this).find(".sub-nav-wrap");
        t(this).on("mouseover",
        function() {
            e.removeClass("static");
            t(this).addClass("on");
            i.stop(!0, !0).fadeIn(250)
        }).on("mouseleave",
        function() {
            e.addClass("static");
            t(this).removeClass("on");
            i.stop(!0, !0).hide()
        });
        if (0 != i.length && "auto" == i.css("top") && "auto" == i.css("bottom")) {
            var r = (t(this).outerHeight() - i.outerHeight()) / 2;
            i.css({
                top: r
            })
        }
    });
    t(".sub-nav-wrap a").bind("click",
    function() {
        t(this).parents(".sub-nav-wrap").hide()
    })*/
} (jQuery);
$("#page-tab").ligerTab({
    height: "100%",
    changeHeightOnResize: !0,
    onBeforeAddTabItem: function(t) {
        setCurrentNav(t)
    },
    onAfterAddTabItem: function() {},
    onAfterSelectTabItem: function(t) {
        setCurrentNav(t)
    },
    onBeforeRemoveTabItem: function() {},
    onAfterLeaveTabItem: function(t) {
        switch (t) {
        case "setting-vendorList":
            getSupplier();
            break;
        case "setting-customerList":
            getCustomer();
            break;
        case "setting-storageList":
            getStorage();
            break;
        case "setting-goodsList":
            getGoods();
            break;
        case "setting-settlementaccount":
            getAccounts();
            break;
        case "setting-settlementCL":
            getPayments();
            break;
        case "onlineStore-onlineStoreList":
            getStores();
            break;
        case "onlineStore-logisticsList":
            getLogistics()
        }
    }
});
var tab = $("#page-tab").ligerGetTabManager();
$("#nav").on("click", "a[rel=pageTab]",
function(t) {
    t.preventDefault();
    var e = $(this).data("right");
    //if (e && !Business.verifyRight(e)) return ! 1;//luanlin
    var i = $(this).attr("tabid"),
    r = $(this).attr("href"),
    a = $(this).attr("showClose"),
    n = $(this).attr("tabTxt") || $(this).text().replace(">", ""),
    o = $(this).attr("parentOpen");
    o ? parent.tab.addTabItem({
        tabid: i,
        text: n,
        url: r,
        showClose: a
    }) : tab.addTabItem({
        tabid: i,
        text: n,
        url: r,
        showClose: a
    });
    return ! 1
});
tab.addTabItem({
    tabid: "index",
    text: "首页",
    url: "./index.aspx", //luanlin
    showClose: !1
}); !
function(t) {
    if (2 === SYSTEM.siVersion && SYSTEM.isOpen) {
        var e, i = location.protocol + "//" + location.host + "/update_info.aspx",
        r = '您的单据分录已经录入达到300条，继续使用选择<a href="http://www.youshang.com/buy/invoicing/" target="_blank">购买产品</a>或者完善个人信息赠送1000条免费容量。';
        if (SYSTEM.isshortUser) {
            if (SYSTEM.isshortUser) {
                e = "http://service.youshang.com/user/set_password.aspx?updateUrl=" + encodeURIComponent(i) + "&warning=" + encodeURIComponent(r) + "&loginPage=http://www.youshang.com/buy/invoicing/";
                t.dialog({
                    min: !1,
                    max: !1,
                    cancle: !1,
                    lock: !0,
                    width: 450,
                    height: 490,
                    title: "完善个人信息",
                    content: "url:" + e
                })
            }
        } else {
            e = "http://service.youshang.com/user/phone_validate.aspx?updateUrl=" + encodeURIComponent(i) + "&warning=" + encodeURIComponent(r);
            t.dialog({
                min: !1,
                max: !1,
                cancle: !1,
                lock: !0,
                width: 400,
                height: 280,
                title: "完善个人信息",
                content: "url:" + e
            })
        }
    }
} (jQuery);
$(window).load(function() {
    function t() {
        var t;
        switch (SYSTEM.siVersion) {
        case 3:
            t = "1";
            break;
        case 4:
            t = "3";
            break;
        default:
            t = "2"
        }
    }
    markupVension();
    t();
    $("#skin-" + SYSTEM.skin).addClass("select").append("<i></i>");

    $("#selectSkin li a").click(function() {
        var t = this.id.split("-")[1];
        Public.ajaxPost("/basedata/systemProfile.aspx?action=changeSysSkin", {
            skin: t
        },
        function(t) {
            200 === t.status && window.location.reload()
        })
    });
    var e = $("#nav .item");
    $("#scollUp").click(function() {
        var t = e.filter(":visible");
        if (t.first().prev().length > 0) {
            t.first().prev().show(500);
            t.last().hide()
        }
    });
    $("#scollDown").click(function() {
        var t = e.filter(":visible");
        if (t.last().next().length > 0) {
            t.first().hide();
            t.last().next().show(500)
        }
    });
    $(".service-tab").click(function() {
        var t = $(this).data("tab");
        tab.addTabItem({
            tabid: "myService",
            text: "服务支持",
            url: "/service/service.aspx",
            callback: function() {
                document.getElementById("myService").contentWindow.openTab(t)
            }
        })
    });
    if ($.cookie("ReloadTips")) {
        Public.tips({
            content: $.cookie("ReloadTips")
        });
        $.cookie("ReloadTips", null)
    }
    $("#nav").on("click", "#reInitial",
    function(t) {
        t.preventDefault();
        $.dialog({
            lock: !0,
            width: 430,
            height: 180,
            title: "系统提示",
            content: '<div class="re-initialize"><h3>重新初始化系统将会清空你录入的所有数据，请慎重！</h3><ul><li>系统将删除您新增的所有商品、供应商、客户</li><li>系统将删除您录入的所有单据</li><li>系统将删除您录入的所有初始化数据</li></ul><p><input type="checkbox" id="understand" /><label for="understand">我已清楚了解将产生的后果</label></p><p class="check-confirm">（请先确认并勾选“我已清楚了解将产生的后果”）</p></div>',
            icon: "alert.gif",
            okVal: "重新初始化",
            ok: function() {
                if ($("#understand").is(":checked")) {
                    this.close();
                    var t = $.dialog.tips("正在重新初始化，请稍候...", 1e3, "loading.gif", !0).show();
                    $.ajax({
                        type: "GET",
                        url: "/user/recover?siId=" + SYSTEM.DBID + "&userName=" + SYSTEM.userName,
                        cache: !1,
                        async: !0,
                        dataType: "json",
                        success: function(e) {
                            if (200 === e.status) {
                                $("#container").html("");
                                t.close();
                                window.location.href = "start.html?re-initial=true&serviceType=" + SYSTEM.serviceType
                            }
                        },
                        error: function(t) {
                            Public.tips({
                                type: 1,
                                content: "操作失败了哦！" + t
                            })
                        }
                    })
                } else $(".check-confirm").css("visibility", "visible");
                return ! 1
            },
            cancelVal: "放弃",
            cancel: !0
        })
    })
});