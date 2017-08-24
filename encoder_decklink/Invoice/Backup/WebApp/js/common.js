var Public = Public || {};
var Business = Business || {};
Public.isIE6 = !window.XMLHttpRequest; //ie6

function isTime(str) {
    var a = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
    if (a == null)
        return false;
    if (a[1] > 24 || a[3] > 60 || a[4] > 60)
        return false
    return true;
}

function toShortDateTime(str) {
    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r == null)
        return "";
    var d = new Date(r[1], r[3] - 1, r[4]);
    return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
}

function toLongDateTime(str) {
    var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
    var r = str.match(reg);
    if (r == null)
        return "";
    var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
    return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7]);
}

function isMail(mail) {
    return (new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(mail));
}

function isIdCardNo(num) {
    var len = num.length;
    if (len == 15)
        re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{3})$/);
    else if (len == 18)
        re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\d)$/);
    else
        return false;
    var a = num.match(re);
    if (a != null) {
        if (len == 15) {
            var D = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
            var B = D.getYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
        }
        else {
            var D = new Date(a[3] + "/" + a[4] + "/" + a[5]);
            var B = D.getFullYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
        }
        if (!B) {
            return false;
        }
    }
    return true;
}

function ltrim(str) {
    var whitespace = new String(" \t\n\r");
    var htmlspace1 = new String("&nbsp;");

    var s = new String(str);
    if (whitespace.indexOf(s.charAt(0)) != -1) {
        var j = 0, i = s.length;
        while (j < i && whitespace.indexOf(s.charAt(j)) != -1) {
            j++;
        }
        s = s.substring(j, i);
    }
    if (htmlspace1.indexOf(s.charAt(0)) != -1) {
        var j = 0, i = s.length;
        while (j < i && htmlspace1.indexOf(s.charAt(j)) != -1) {
            j++;
        }
        s = s.substring(j, i);
    }
    return s;
}

function rtrim(str) {
    var whitespace = new String(" \t\n\r");
    var htmlspace1 = new String("&nbsp;");

    var s = new String(str);

    if (whitespace.indexOf(s.charAt(s.length - 1)) != -1) {
        var i = s.length - 1;
        while (i >= 0 && whitespace.indexOf(s.charAt(i)) != -1) {
            i--;
        }
        s = s.substring(0, i + 1);
    }
    if (htmlspace1.indexOf(s.charAt(s.length - 1)) != -1) {
        var i = s.length - 1;
        while (i >= 0 && htmlspace1.indexOf(s.charAt(i)) != -1) {
            i--;
        }
        s = s.substring(0, i + 1);
    }
    return s;
}

/**
* 节点赋100%高度
*
* @param {object} obj 赋高的对象
*/
Public.setAutoHeight = function (obj) {
    if (!obj || obj.length < 1) {
        return;
    }

    Public._setAutoHeight(obj);
    $(window).bind('resize', function () {
        Public._setAutoHeight(obj);
    });

}

Public._setAutoHeight = function (obj) {
    obj = $(obj);
    //parent = parent || window;
    var winH = $(window).height();
    var h = winH - obj.offset().top - (obj.outerHeight() - obj.height());
    obj.height(h);
}

function trim(str) {
    var str = String(str);
    return str.replace(/^ +/, "").replace(/ +$/, "");
}

$(function () {
    //菜单按钮
    $('.ui-btn-menu .menu-btn').on('mouseenter.menuEvent', function (e) {
        if ($(this).hasClass("ui-btn-dis")) {
            return false;
        }
        $(this).parent().addClass('ui-btn-menu-cur');
        $(this).blur();
        e.preventDefault();
    });

    $(document).on('click.menu', function (e) {
        var target = e.target || e.srcElement;
        $('.ui-btn-menu').each(function () {
            var menu = $(this);
            if ($(target).closest(menu).length == 0 && $('.con', menu).is(':visible')) {
                menu.removeClass('ui-btn-menu-cur');
            }
        })
    });
});

Public.parseDate = function (format, timestamp) {
    var a, jsdate = ((timestamp) ? new Date(timestamp * 1000) : new Date());
    var pad = function (n, c) {
        if ((n = n + "").length < c) {
            return new Array(++c - n.length).join("0") + n;
        } else {
            return n;
        }
    };
    var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var txt_ordin = { 1: "st", 2: "nd", 3: "rd", 21: "st", 22: "nd", 23: "rd", 31: "st" };
    var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var f = {
        // Day
        d: function () { return pad(f.j(), 2) },
        D: function () { return f.l().substr(0, 3) },
        j: function () { return jsdate.getDate() },
        l: function () { return txt_weekdays[f.w()] },
        N: function () { return f.w() + 1 },
        S: function () { return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th' },
        w: function () { return jsdate.getDay() },
        z: function () { return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0 },

        // Week
        W: function () {
            var a = f.z(), b = 364 + f.L() - a;
            var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
            if (b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b) {
                return 1;
            } else {
                if (a <= 2 && nd >= 4 && a >= (6 - nd)) {
                    nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
                    return date("W", Math.round(nd2.getTime() / 1000));
                } else {
                    return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
                }
            }
        },

        // Month
        F: function () { return txt_months[f.n()] },
        m: function () { return pad(f.n(), 2) },
        M: function () { return f.F().substr(0, 3) },
        n: function () { return jsdate.getMonth() + 1 },
        t: function () {
            var n;
            if ((n = jsdate.getMonth() + 1) == 2) {
                return 28 + f.L();
            } else {
                if (n & 1 && n < 8 || !(n & 1) && n > 7) {
                    return 31;
                } else {
                    return 30;
                }
            }
        },

        // Year
        L: function () { var y = f.Y(); return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0 },
        //o not supported yet
        Y: function () { return jsdate.getFullYear() },
        y: function () { return (jsdate.getFullYear() + "").slice(2) },

        // Time
        a: function () { return jsdate.getHours() > 11 ? "pm" : "am" },
        A: function () { return f.a().toUpperCase() },
        B: function () {
            // peter paul koch:
            var off = (jsdate.getTimezoneOffset() + 60) * 60;
            var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
            var beat = Math.floor(theSeconds / 86.4);
            if (beat > 1000) beat -= 1000;
            if (beat < 0) beat += 1000;
            if ((String(beat)).length == 1) beat = "00" + beat;
            if ((String(beat)).length == 2) beat = "0" + beat;
            return beat;
        },
        g: function () { return jsdate.getHours() % 12 || 12 },
        G: function () { return jsdate.getHours() },
        h: function () { return pad(f.g(), 2) },
        H: function () { return pad(jsdate.getHours(), 2) },
        i: function () { return pad(jsdate.getMinutes(), 2) },
        s: function () { return pad(jsdate.getSeconds(), 2) },
        //u not supported yet

        // Timezone
        //e not supported yet
        //I not supported yet
        O: function () {
            var t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4);
            if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t;
            return t;
        },
        P: function () { var O = f.O(); return (O.substr(0, 3) + ":" + O.substr(3, 2)) },
        //T not supported yet
        //Z not supported yet

        // Full Date/Time
        c: function () { return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P() },
        //r not supported yet
        U: function () { return Math.round(jsdate.getTime() / 1000) }
    };

    return format.replace(/[\\]?([a-zA-Z])/g, function (t, s) {
        if (t != s) {
            // escaped
            ret = s;
        } else if (f[s]) {
            // a date function exists
            ret = f[s]();
        } else {
            // nothing special
            ret = s;
        }
        return ret;
    });
};

//设置表格宽高
Public.setGrid = function (adjustH, adjustW) {
    var adjustH = adjustH || 65;
    var adjustW = adjustW || 20;
    var gridW = $(window).width() - adjustW, gridH = $(window).height() - $(".grid-wrap").offset().top - adjustH;
    return {
        w: gridW,
        h: gridH
    }
};
//重设表格宽高
Public.resizeGrid = function (adjustH, adjustW) {
    var grid = $("#grid");
    var gridWH = Public.setGrid(adjustH, adjustW);
    grid.jqGrid('setGridHeight', gridWH.h);
    grid.jqGrid('setGridWidth', gridWH.w);
};
//自定义报表宽高初始化以及自适应
Public.initCustomGrid = function (tableObj) {
    //去除报表原始定义的宽度
    $(tableObj).css("width") && $(tableObj).attr("width", "auto");
    //获取报表宽度当做最小宽度
    var _minWidth = $(tableObj).outerWidth();
    $(tableObj).css("min-width", _minWidth + "px");
    //获取当前window对象的宽度作为报表原始的宽度
    $(tableObj).width($(window).width() - 74);
    $(tableObj).closest('.mod-report').height($(window).height() - 66);
    //设置resize事件
    var _throttle = function (method, context) {
        clearTimeout(method.tid);
        method.tid = setTimeout(function () {
            method.call(context);
        }, 100)
    };
    var _resize = function () {
        $(tableObj).width($(window).width() - 74);
        $(tableObj).closest('.mod-report').height($(window).height() - 66);
    };
    $(window).resize(function () {
        _throttle(_resize);
    });
}

//操作项格式化，适用于有“修改、删除”操作的表格
Public.operFmatter = function (val, opt, row) {
    var html_con = '<div class="operating" data-id="' + row.id + '"><span class="ui-icon ui-icon-pencil" title="修改"></span><span class="ui-icon ui-icon-trash" title="删除"></span></div>';
    return html_con;
};

Public.billsOper = function (val, opt, row) {
    var html_con = '<div class="operating" data-id="' + opt.rowId + '"><span class="ui-icon ui-icon-plus" title="新增行"></span><span class="ui-icon ui-icon-trash" title="删除行"></span></div>';
    return html_con;
};

Public.dateCheck = function () {
    $('.ui-datepicker-input').bind('focus', function (e) {
        $(this).data('original', $(this).val());
    }).bind('blur', function (e) {
        var reg = /((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/;
        var _self = $(this);
        setTimeout(function () {
            if (!reg.test(_self.val())) {
                parent.Public.tips({ type: 1, content: '日期格式有误！如：2013-08-08。' });
                _self.val(_self.data('original'));
            };
        }, 10)

    });
}

//根据之前的编码生成下一个编码
Public.getSuggestNum = function (prevNum) {
    if (prevNum == '' || !prevNum) {
        return '';
    }
    var reg = /^([a-zA-Z0-9\-_]*[a-zA-Z\-_]+)?(\d+)$/;
    var match = prevNum.match(reg);
    if (match) {
        var prefix = match[1] || '';
        var prevNum = match[2];
        var num = parseInt(prevNum, 10) + 1;
        var delta = prevNum.toString().length - num.toString().length;
        if (delta > 0) {
            for (var i = 0; i < delta; i++) {
                num = '0' + num;
            }
        }
        return prefix + num;
    } else {
        return '';
    }
};

Public.bindEnterSkip = function (obj, func) {
    var args = arguments;
    $(obj).on('keydown', 'input:visible:not(:disabled)', function (e) {
        if (e.keyCode == '13') {
            var inputs = $(obj).find('input:visible:not(:disabled)');
            var idx = inputs.index($(this));
            idx = idx + 1;
            if (idx >= inputs.length) {
                if (typeof func == 'function') {
                    var _args = Array.prototype.slice.call(args, 2);
                    func.apply(null, _args);
                }
            } else {
                inputs.eq(idx).focus();
            }
        }
    });
};

/*获取URL参数值*/
Public.getRequest = Public.urlParam = function () {
    var param, url = location.search, theRequest = {};
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0, len = strs.length; i < len; i++) {
            param = strs[i].split("=");
            theRequest[param[0]] = decodeURIComponent(param[1]);
        }
    }
    return theRequest;
};
/*
通用post请求，返回json
url:请求地址， params：传递的参数{...}， callback：请求成功回调
*/
Public.ajaxPost = function (url, params, callback) {
    $.ajax({
        type: "POST",
        url: url,
        data: params,
        dataType: "json",
        success: function (data, status) {
            callback(data);
        },
        /*error: function(err){  
        parent.Public.tips({type: 1, content : '操作失败了哦，请检查您的网络链接！'});
        }*/
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(XMLHttpRequest.status);
            var _div = $('<div></div>');
            _div.html(XMLHttpRequest.responseText);
            //parent.Public.tips({ type: 1, content: XMLHttpRequest.status + ':' + errorThrown + '；' + _div.find("title").text() });
            parent.Public.tips({ type: 1, content: XMLHttpRequest.status + ':' + errorThrown + '；' + XMLHttpRequest.responseText });
        }
        //alert(textStatus);
    });
};
Public.ajaxGet = function (url, params, callback) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        data: params,
        success: function (data, status) {
            callback(data);
        },
        /*error: function(err){  
        parent.Public.tips({type: 1, content : '操作失败了哦，请检查您的网络链接！'});
        }*/
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(XMLHttpRequest.status);
            //parent.Public.tips({ type: 1, content: textStatus });
            var responseDiv = $('<div></div>');
            responseDiv.html(XMLHttpRequest.responseText);
            //parent.Public.tips({ type: 1, content: XMLHttpRequest.status + ':' + errorThrown + '；' + responseDiv.find("title").text() });
            parent.Public.tips({ type: 1, content: XMLHttpRequest.status + ':' + errorThrown + '；' + XMLHttpRequest.responseText });
        }
    });
};
/*操作提示*/
Public.tips = function (options) { return new Public.Tips(options); }
Public.Tips = function (options) {
    var defaults = {
        renderTo: 'body',
        type: 0,
        autoClose: true,
        removeOthers: true,
        time: undefined,
        top: 10,
        onClose: null,
        onShow: null
    }
    this.options = $.extend({}, defaults, options);
    this._init();

    !Public.Tips._collection ? Public.Tips._collection = [this] : Public.Tips._collection.push(this);

}

Public.Tips.removeAll = function () {
    try {
        for (var i = Public.Tips._collection.length - 1; i >= 0; i--) {
            Public.Tips._collection[i].remove();
        }
    } catch (e) { }
}

Public.Tips.prototype = {
    _init: function () {
        var self = this, opts = this.options, time;
        if (opts.removeOthers) {
            Public.Tips.removeAll();
        }

        this._create();

        this.closeBtn.bind('click', function () {
            self.remove();
        });

        if (opts.autoClose) {
            time = opts.time || opts.type == 1 ? 5000 : 3000;
            window.setTimeout(function () {
                self.remove();
            }, time);
        }

    },

    _create: function () {
        var opts = this.options;
        this.obj = $('<div class="ui-tips"><i></i><span class="close"></span></div>').append(opts.content);
        this.closeBtn = this.obj.find('.close');

        switch (opts.type) {
            case 0:
                this.obj.addClass('ui-tips-success');
                break;
            case 1:
                this.obj.addClass('ui-tips-error');
                break;
            case 2:
                this.obj.addClass('ui-tips-warning');
                break;
            default:
                this.obj.addClass('ui-tips-success');
                break;
        }

        this.obj.appendTo('body').hide();
        this._setPos();
        if (opts.onShow) {
            opts.onShow();
        }

    },

    _setPos: function () {
        var self = this, opts = this.options;
        if (opts.width) {
            this.obj.css('width', opts.width);
        }
        var h = this.obj.outerHeight(), winH = $(window).height(), scrollTop = $(window).scrollTop();
        //var top = parseInt(opts.top) ? (parseInt(opts.top) + scrollTop) : (winH > h ? scrollTop+(winH - h)/2 : scrollTop);
        var top = parseInt(opts.top) + scrollTop;
        this.obj.css({
            position: Public.isIE6 ? 'absolute' : 'fixed',
            left: '50%',
            top: top,
            zIndex: '9999',
            marginLeft: -self.obj.outerWidth() / 2
        });

        window.setTimeout(function () {
            self.obj.show().css({
                marginLeft: -self.obj.outerWidth() / 2
            });
        }, 150);

        if (Public.isIE6) {
            $(window).bind('resize scroll', function () {
                var top = $(window).scrollTop() + parseInt(opts.top);
                self.obj.css('top', top);
            })
        }
    },

    remove: function () {
        var opts = this.options;
        this.obj.fadeOut(200, function () {
            $(this).remove();
            if (opts.onClose) {
                opts.onClose();
            }
        });
    }
};
//数值显示格式转化
Public.numToCurrency = function (val, dec) {
    val = parseFloat(val);
    dec = dec || 2; //小数位
    if (val === 0 || isNaN(val)) {
        return '';
    }
    val = val.toFixed(dec).split('.');
    var reg = /(\d{1,3})(?=(\d{3})+(?:$|\D))/g;
    return val[0].replace(reg, "$1,") + '.' + val[1];
};
//数值显示
Public.currencyToNum = function (val) {
    var val = String(val);
    if ($.trim(val) == '') {
        return 0;
    }
    val = val.replace(/,/g, '');
    val = parseFloat(val);
    return isNaN(val) ? 0 : val;
};
//只允许输入数字
Public.numerical = function (e) {
    var allowed = '0123456789.-', allowedReg;
    allowed = allowed.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    allowedReg = new RegExp('[' + allowed + ']');
    var charCode = typeof e.charCode != 'undefined' ? e.charCode : e.keyCode;
    var keyChar = String.fromCharCode(charCode);
    if (!e.ctrlKey && charCode != 0 && !allowedReg.test(keyChar)) {
        e.preventDefault();
    };
};

//限制只能输入允许的字符，不支持中文的控制
Public.limitInput = function (obj, allowedReg) {
    var ctrlKey = null;
    obj.css('ime-mode', 'disabled').on('keydown', function (e) {
        ctrlKey = e.ctrlKey;
    }).on('keypress', function (e) {
        Public.tips({ content: "保存成功！" });
        allowedReg = typeof allowedReg == 'string' ? new RegExp(allowedReg) : allowedReg;
        var charCode = typeof e.charCode != 'undefined' ? e.charCode : e.keyCode;
        var keyChar = $.trim(String.fromCharCode(charCode));
        if (!ctrlKey && charCode != 0 && charCode != 13 && !allowedReg.test(keyChar)) {
            e.preventDefault();
        }
    });
};
//限制输入的字符长度
Public.limitLength = function (obj, count) {
    obj.on('keyup', function (e) {
        if (count < obj.val().length) {
            e.preventDefault();
            obj.val(obj.val().substr(0, count));
        }
    });
};
/*批量绑定页签打开*/
Public.pageTab = function () {
    $(document).on('click', '[rel=pageTab]', function (e) {
        e.preventDefault();
        var right = $(this).data('right');
        if (right && !Business.verifyRight(right)) {
            return false;
        };
        var tabid = $(this).attr('tabid'), url = $(this).attr('href'), showClose = $(this).attr('showClose'), text = $(this).attr('tabTxt') || $(this).text(), parentOpen = $(this).attr('parentOpen');
        if (parentOpen) {
            parent.tab.addTabItem({ tabid: tabid, text: text, url: url, showClose: showClose });
        } else {
            tab.addTabItem({ tabid: tabid, text: text, url: url, showClose: showClose });
        }
    });
};

$.fn.artTab = function (options) {
    var defaults = {};
    var opts = $.extend({}, defaults, options);
    var callback = opts.callback || function () { };
    this.each(function () {
        var $tab_a = $("dt>a", this);
        var $this = $(this);
        $tab_a.bind("click", function () {
            var target = $(this);
            target.siblings().removeClass("cur").end().addClass("cur");
            var index = $tab_a.index(this);
            var showContent = $("dd>div", $this).eq(index);
            showContent.siblings().hide().end().show();
            callback(target, showContent, opts);
        });
        if (opts.tab)
            $tab_a.eq(opts.tab).trigger("click");
        if (location.hash) {
            var tabs = location.hash.substr(1);
            $tab_a.eq(tabs).trigger("click");
        }
    });
};

//文本列表滚动
Public.txtSlide = function (opt) {
    var def = {
        notice: '#notices > ul',
        size: 1, //显示出来的条数
        pause_time: 5000, //每次滚动后停留的时间
        speed: 'normal', //滚动动画执行的时间
        stop: true //鼠标移到列表时停止动画
    };
    opt = opt || {};
    opt = $.extend({}, def, opt);

    var $list = $(opt.notice),
		$lis = $list.children(),
		height = $lis.eq(0).outerHeight() * opt.size,
		interval_id;
    if ($lis.length <= opt.size) return;
    interval_id = setInterval(begin, opt.pause_time);

    opt.stop && $list.on({
        'mouseover': function () {
            clearInterval(interval_id);
            $list.stop(true, true);
        },
        'mouseleave': function () {
            interval_id = setInterval(begin, opt.pause_time);
        }
    });

    function begin() {
        $list.stop(true, true).animate({ marginTop: -height }, opt.speed, function () {
            for (var i = 0; i < opt.size; i++) {
                $list.append($list.find('li:first'));
            }
            $list.css('margin-top', 0);
        });
    }
};

$.fn.enterKey = function () {
    this.each(function () {
        $(this).keydown(function (e) {
            if (e.which == 13) {
                var ref = $(this).data("ref");
                parent.Public.tips({ type: 1, content: '操作失败了哦，请检查您的网络链接！' }); /**/
                if (ref) {
                    $('#' + ref).select().focus().click();
                }
                else {
                    eval($(this).data("enterKeyHandler"));
                }
            }
        });
    });
};


//input占位符
$.fn.placeholder = function () {
    this.each(function () {
        $(this).focus(function () {
            if ($.trim(this.value) == this.defaultValue) {
                this.value = '';
            }
            $(this).removeClass('ui-input-ph');
        }).blur(function () {
            var val = $.trim(this.value);
            if (val == '' || val == this.defaultValue) {
                $(this).addClass('ui-input-ph');
            }
            val == '' && $(this).val(this.defaultValue);
        });
    });
};

//单选框插件
$.fn.cssRadio = function (opts) {
    var opts = $.extend({}, opts);
    var $_radio = $('label.radio', this), $_this = this;
    $_radio.each(function () {
        var self = $(this);
        if (self.find("input")[0].checked) {
            self.addClass("checked");
        };

    }).hover(function () {
        $(this).addClass("over");
    }, function () {
        $(this).removeClass("over");
    }).click(function (event) {
        $_radio.find("input").removeAttr("checked");
        $_radio.removeClass("checked");
        $(this).find("input").attr("checked", "checked");
        $(this).addClass("checked");
        opts.callback($(this));
    });
    return {
        getValue: function () {
            return $_radio.find("input[checked]").val();
        },
        setValue: function (index) {
            return $_radio.eq(index).click();
            //return $_radio.find('value=150601').click();
        }
    }
};
/*
$.fn是指jquery的命名空间，加上fn上的方法及属性，会对jquery实例每一个有效。
如扩展$.fn.abc(),即$.fn.abc()是对jquery扩展了一个abc方法,那么后面你的每一个jquery实例都可以引用这个方法了.
那么你可以这样子：$("#div").abc();
jQuery.fn
= jQuery.prototype = {
}
*/
//复选框插件
$.fn.cssCheckbox = function () {
    var $_chk = $(".chk", this);
    $_chk.each(function () {
        if ($(this).find("input")[0].checked) {
            $(this).addClass("checked");
        };
        if ($(this).find("input")[0].disabled) {
            $(this).addClass("dis_check");
        };
    }).hover(function () {
        $(this).addClass("over")
    }, function () {
        $(this).removeClass("over")
    }).click(function (event) {
        if ($(this).find("input")[0].disabled) {
            return;
        };
        $(this).toggleClass("checked");
        $(this).find("input")[0].checked = !$(this).find("input")[0].checked;
        event.preventDefault();
    });

    return {
        chkAll: function () {
            $_chk.addClass("checked");
            $_chk.find("input").attr("checked", "checked");
        },
        chkNot: function () {
            $_chk.removeClass("checked");
            $_chk.find("input").removeAttr("checked");
        },
        chkVal: function () {
            var val = [];
            $_chk.find("input:checked").each(function () {
                val.push($(this).val());
            });
            return val;
        }
    }
};

Public.getDefaultPage = function () {
    var win = window.self;
    do {
        if (win.CONFIG) {
            return win;
        }
        win = win.parent;
    } while (true);
};

//权限验证
Business.verifyRight = function (right) {
    var system = Public.getDefaultPage().SYSTEM;
    var isAdmin = system.isAdmin;
    var siExperied = system.siExpired;
    var rights = system.rights;
    if (isAdmin && !siExperied) {
        return true;
    };

    if (siExperied) {
        if (rights[right]) {
            return true;
        } else {
            var html = [
				'<div class="ui-dialog-tips">',
				'<h4 class="tit">谢谢您使用本产品，您的当前服务已经到期，到期3个月后数据将被自动清除，如需继续使用请购买/续费！</h4>',
				'</div>'
			].join('');
            $.dialog({
                width: 280,
                title: '系统提示',
                icon: 'alert.gif',
                fixed: true,
                lock: true,
                resize: false,
                ok: true,
                content: html
            });
            return false;
        }
    } else {
        if (rights[right]) {
            return true;
        } else {
            var html = [
				'<div class="ui-dialog-tips">',
				'<h4 class="tit">您没有该功能的使用权限哦！</h4>',
				'<p>请联系管理员（' + system.realName + '）为您授权！</p>',
				'</div>'
			].join('');
            $.dialog({
                width: 240,
                title: '系统提示',
                icon: 'alert.gif',
                fixed: true,
                lock: true,
                resize: false,
                ok: true,
                content: html
            });
            return false;
        }
    };
};

//获取文件
Business.getFile = function (url, args, isNewWinOpen) {
    if (typeof url != 'string') {
        return;
    }
    var url = url.indexOf('?') == -1 ? url += '?' : url;
    url += '&random=' + new Date().getTime();
    var downloadForm = $('form#downloadForm');
    if (downloadForm.length == 0) {
        downloadForm = $('<form method="post" />').attr('id', 'downloadForm').hide().appendTo('body');
    } else {
        downloadForm.empty();
    }
    downloadForm.attr('action', url);
    for (k in args) {
        $('<input type="hidden" />').attr({ name: k, value: args[k] }).appendTo(downloadForm);
    }
    if (isNewWinOpen) {
        downloadForm.attr('target', '_blank');
    } else {
        var downloadIframe = $('iframe#downloadIframe');
        if (downloadIframe.length == 0) {
            downloadIframe = $('<iframe />').attr('id', 'downloadIframe').hide().appendTo('body');
        }
        downloadForm.attr('target', 'downloadIframe');
    }
    downloadForm.trigger('submit');
};

Business.customerCombo = function ($_obj, opts) {
    if ($_obj.length == 0) { return };
    var opts = $.extend(true, {
        data: function () {
            return parent.SYSTEM.customerInfo;
        },
        ajaxOptions: {
            formatData: function (data) {
                parent.SYSTEM.customerInfo = data.data.items; //更新
                return data.data.items;
            }
        },
        width: 200,
        height: 300,
        formatText: function (row) {
            return row.number + ' ' + row.name;
        },
        //formatResult: 'name',
        text: 'name',
        value: 'id',
        defaultSelected: 0,
        defaultFlag: false,
        cache: false,
        editable: true,
        callback: {
            onChange: function (data) {
            }
        },
        extraListHtml: '<a href="javascript:void(0);" id="quickAddCustomer" class="quick-add-link"><i class="ui-icon-add"></i>新增客户</a>'
    }, opts);

    var customerCombo = $_obj.combo(opts).getCombo();
    //新增客户
    $('#quickAddCustomer').on('click', function (e) {
        e.preventDefault();
        if (!Business.verifyRight('BU_ADD')) {
            return;
        };
        $.dialog({
            title: '新增客户',
            content: 'url:/settings/customer-manage.aspx',
            data: { oper: 'add', callback: function (data, oper, dialogWin) {
                //parent.getCustomer();
                //_self.customerCombo.selectByValue(data.id, false);
                customerCombo.loadData('./basedata/contact.aspx?action=list', ['id', data.id]);
                dialogWin && dialogWin.api.close();
            }
            },
            width: 640,
            height: 456,
            max: false,
            min: false,
            cache: false,
            lock: true
        });
    });
    return customerCombo;
};

Business.supplierCombo = function ($_obj, opts) {
    if ($_obj.length == 0) { return };
    var opts = $.extend(true, {
        data: function () {
            return parent.SYSTEM.supplierInfo; ;
        },
        ajaxOptions: {
            formatData: function (data) {
                parent.SYSTEM.supplierInfo = data.data.items; //更新
                return data.data.items;
            }
        },
        width: 200,
        height: 300,
        formatText: function (row) {
            return row.number + ' ' + row.name;
        },
        //formatResult: 'name',
        text: 'name',
        value: 'id',
        defaultSelected: 0,
        defaultFlag: false,
        cache: false,
        editable: true,
        callback: {
            onChange: function (data) {
            }
        },
        extraListHtml: '<a href="javascript:void(0);" id="quickAddVendor" class="quick-add-link"><i class="ui-icon-add"></i>新增供应商</a>'
    }, opts);

    var supplierCombo = $_obj.combo(opts).getCombo();
    //新增供应商
    $('#quickAddVendor').on('click', function (e) {
        e.preventDefault();
        if (!Business.verifyRight('PUR_ADD')) {
            return;
        };
        $.dialog({
            title: '新增供应商',
            content: 'url:/settings/vendor-manage.aspx',
            data: { oper: 'add', callback: function (data, oper, dialogWin) {
                //parent.getCustomer();
                //_self.customerCombo.selectByValue(data.id, false);
                supplierCombo.loadData('./basedata/contact.aspx?type=10&action=list', ['id', data.id]);
                dialogWin && dialogWin.api.close();
            }
            },
            width: 640,
            height: 496,
            max: false,
            min: false,
            cache: false,
            lock: true
        });
    });
    return supplierCombo;
};
//结算账户下拉框初始化
Business.settlementAccountCombo = function ($_obj, opts) {
    if ($_obj.length == 0) { return };
    var getInfo = (function () {
        Public.ajaxGet('/basedata/settAcct.aspx?action=list', {}, function (data) {
            if (data.status === 200) {
                parent.SYSTEM.settlementAccountInfo = data.data.items;
            } else if (data.status === 250) {
                parent.SYSTEM.settlementAccountInfo = [];
            } else {
                Public.tips({ type: 1, content: data.msg });
            }
        });
    })();
    var opts = $.extend(true, {
        data: function () {
            return parent.SYSTEM.settlementAccountInfo || [];
        },
        ajaxOptions: {
            formatData: function (data) {
                parent.SYSTEM.settlementAccountInfo = data.data.items; //更新
                return data.data.items;
            }
        },
        width: 200,
        height: 300,
        /*			formatText: function(row){
        return row.number + ' ' + row.name;
        },*/
        //formatResult: 'name',
        text: 'name',
        value: 'id',
        defaultSelected: -1,
        defaultFlag: false,
        cache: false,
        editable: true,
        callback: {
            onChange: function (data) {
            }
        },
        extraListHtml: '<a href="javascript:void(0);" id="quickAddVendor" class="quick-add-link"><i class="ui-icon-add"></i>新增结算账户</a>'
    }, opts);

    var settlementAccountCombo = $_obj.combo(opts).getCombo();
    //新增结算账户
    $('#quickAddVendor').on('click', function (e) {
        e.preventDefault();
        if (!Business.verifyRight('SettAcct_ADD')) {
            return;
        };
        $.dialog({
            title: '新增结算账户',
            content: 'url:/settings/settlementAccount-manage.aspx',
            data: { oper: 'add', callback: function (data, oper, dialogWin) {
                parent.SYSTEM.settlementAccountInfo.push(data);
                settlementAccountCombo.loadData('/basedata/settAcct.aspx?action=query', ['id', data.id]);
                dialogWin && dialogWin.api.close();
            }
            },
            width: 640,
            height: 205,
            max: false,
            min: false,
            cache: false,
            lock: true
        });
    });
    return settlementAccountCombo;
};

Business.goodsCombo = function ($_obj, opts) {
    if ($_obj.length == 0) { return };
    var opts = $.extend(true, {
        data: function () {
            if (parent.SYSTEM.goodsInfo) {
                return parent.SYSTEM.goodsInfo;
            } else {
                return './basedata/inventory.aspx?action=list';
            }
        },
        ajaxOptions: {
            formatData: function (data) {
                parent.SYSTEM.goodsInfo = data.data.rows; //更新
                return data.data.rows;
            }
        },
        formatText: function (data) {
            if (data.spec === '') {
                return data.number + ' ' + data.name;
            } else {
                return data.number + ' ' + data.name + '_' + data.spec;
            }
        },
        value: 'id',
        //defaultSelected: -1,
        defaultSelected: '',
        editable: true,
        extraListHtml: '<a href="javascript:void(0);" id="quickAddGoods" class="quick-add-link"><i class="ui-icon-add"></i>新增商品</a>',
        maxListWidth: 500,
        cache: false,
        forceSelection: true,
        maxFilter: 10,
        trigger: false,
        listHeight: 182,
        listWrapCls: 'ui-droplist-wrap',
        callback: {
            onChange: function (data) {
                var parentTr = this.input.parents('tr');
                if (data) {
                    parentTr.data('goodsInfo', data);
                    parentTr.data('storageInfo', { id: data.storageID, name: data.storageName });
                    parentTr.data('unitInfo', { id: data.unitID, name: data.unitName });
                }
            },
            onListClick: function () {

            }
        },
        queryDelay: 0,
        inputCls: 'edit_subject',
        wrapCls: 'edit_subject_wrap',
        focusCls: '',
        disabledCls: '',
        activeCls: ''
    }, opts);

    var goodsCombo = $_obj.combo(opts).getCombo();

    //新增商品
    $('#quickAddGoods').on('click', function (e) {
        e.preventDefault();
        if (!Business.verifyRight('INVENTORY_ADD')) {
            return;
        };
        $.dialog({
            title: '新增商品',
            content: 'url:/settings/goods-manage.aspx',
            data: { oper: 'add', callback: function (data, oper, dialogWin) {
                var goodID = data.id;
                //_self.goodsCombo.getAllRawData().push(data);
                parent.SYSTEM.goodsInfo.push(data);
                dialogWin && dialogWin.api.close();
                //var allRawData = _self.goodsCombo.getAllRawData();
                goodsCombo.loadData(parent.SYSTEM.goodsInfo, '-1', false);
                setTimeout(function () {
                    //$("#grid").jqGrid("editCell", editRow, 2, true)
                    goodsCombo.selectByValue(goodID, true);
                    $_obj.focus();
                }, 10);

            }
            },
            width: 640,
            height: 530,
            max: false,
            min: false,
            cache: false,
            lock: true
        });
    });
    return goodsCombo;
};

Business.forSearch = function (id, text) {
    if (id) {
        $.dialog({
            width: 472,
            height: 400,
            title: '即时库存',
            content: 'url:/inventory.aspx',
            data: { id: id, text: text },
            cancel: true,
            //lock: true,
            cancelVal: '关闭'

        });
        //goodsCombo.removeSelected(false);
    } else {
        parent.Public.tips({ type: 2, content: '请先选择一个商品！' });
    };
};

Business.storageCombo = function ($_obj, opts) {
    if ($_obj.length == 0) { return };
    var opts = $.extend(true, {
        //data: parent.SYSTEM.storageInfo/*'/basedata/baseData.aspx?action=get&type=storage&isEnable=1'*/,
        data: function () {
            return (parent.SYSTEM || opts.userData.system).storageInfo;
        },
        /*			ajaxOptions: {
        formatData: function(data){
        return data.data.items;
        }	
        },*/
        text: 'name',
        value: 'id',
        defaultSelected: 0,
        cache: false,
        //editable: false,
        editable: true,
        trigger: false,
        defaultFlag: false,
        callback: {
            onChange: function (data) {
                var parentTr = this.input.parents('tr');
                //var storageInfo = parentTr.data('storageInfo');
                //console.log(parentTr.data('storageInfo'))
                /*					if(!storageInfo) {
                storageInfo = {};
                };*/
                if (data) {
                    parentTr.data('storageInfo', { id: data.id, name: data.name });
                    //storageInfo.id = data.id;
                    //storageInfo.name = data.name;
                }
            }
        }
    }, opts);

    var storageCombo = $_obj.combo(opts).getCombo();
    return storageCombo;
};

Business.unitCombo = function ($_obj, opts) {
    if ($_obj.length == 0) { return };
    var opts = $.extend(true, {
        //data: parent.SYSTEM.unitInfo/*'/basedata/baseData.aspx?action=get&type=storage&isEnable=1'*/,
        data: function () {
            return (parent.SYSTEM || opts.userData.system).unitInfo;
        },
        /*			ajaxOptions: {
        formatData: function(data){
        return data.data.items;
        }	
        },*/
        text: 'name',
        value: 'id',
        defaultSelected: 0,
        cache: false,
        //editable: false,
        editable: true,
        trigger: false,
        defaultFlag: false,
        callback: {
            onChange: function (data) {
                var parentTr = this.input.parents('tr');
                //var unitInfo = parentTr.data('unitInfo');
                //console.log(parentTr.data('unitInfo'))
                /*					if(!unitInfo) {
                unitInfo = {};
                };*/
                if (data) {
                    parentTr.data('unitInfo', { id: data.id, name: data.name });
                    //unitInfo.id = data.id;
                    //unitInfo.name = data.name;
                }
            }
        }
    }, opts);

    var unitCombo = $_obj.combo(opts).getCombo();
    return unitCombo;
};

Business.accountCombo = function ($_obj, opts) {
    if ($_obj.length == 0) { return };
    var opts = $.extend(true, {
        //data: parent.SYSTEM.accountInfo/*'/basedata/baseData.aspx?action=get&type=storage&isEnable=1'*/,
        data: function () {
            return (parent.SYSTEM || opts.userData.system).accountInfo;
        },
        /*			ajaxOptions: {
        formatData: function(data){
        return data.data.items;
        }	
        },*/
        text: 'name',
        value: 'id',
        //defaultSelected: 0,
        defaultSelected: '',
        cache: false,
        //editable: false,
        editable: true,
        trigger: false,
        defaultFlag: false,
        callback: {
            onChange: function (data) {
                var parentTr = this.input.parents('tr');
                //var accountInfo = parentTr.data('accountInfo');
                //console.log(parentTr.data('accountInfo'))
                /*					if(!accountInfo) {
                accountInfo = {};
                };*/
                if (data) {
                    parentTr.data('accountInfo', { id: data.id, name: data.name });
                    //accountInfo.id = data.id;
                    //accountInfo.name = data.name;
                }
            }
        }
    }, opts);

    var accountCombo = $_obj.combo(opts).getCombo();
    return accountCombo;
};

Business.employeeCombo = function ($_obj, opts) {
    if ($_obj.length == 0) { return };
    var opts = $.extend(true, {
        //data: parent.SYSTEM.employeeInfo/*'/basedata/baseData.aspx?action=get&type=storage&isEnable=1'*/,
        data: function () {
            return (parent.SYSTEM || opts.userData.system).employeeInfo;
        },
        /*			ajaxOptions: {
        formatData: function(data){
        return data.data.items;
        }	
        },*/
        text: 'name',
        value: 'id',
        //defaultSelected: 0,
        defaultSelected: '',
        cache: false,
        //editable: false,
        editable: true,
        trigger: false,
        defaultFlag: false,
        callback: {
            onChange: function (data) {
                var parentTr = this.input.parents('tr');
                //var employeeInfo = parentTr.data('employeeInfo');
                //console.log(parentTr.data('employeeInfo'))
                /*					if(!employeeInfo) {
                employeeInfo = {};
                };*/
                if (data) {
                    parentTr.data('employeeInfo', { id: data.id, name: data.name });
                    //employeeInfo.id = data.id;
                    //employeeInfo.name = data.name;
                }
            }
        }
    }, opts);

    var employeeCombo = $_obj.combo(opts).getCombo();
    return employeeCombo;
};

/*Business.accountCombo = function ($_obj, opts) {
if ($_obj.length == 0) { return };
var opts = $.extend(true, {
data: function () {
if (SYSTEM.accountInfo) {
return SYSTEM.accountInfo;
} else {
return '/basedata/settAcct.aspx?action=list';
}
},
ajaxOptions: {
formatData: function (data) {
SYSTEM.accountInfo = data.data.items; //更新
return data.data.items;
}
},
formatText: function (data) {
return data.number + ' ' + data.name;
},
value: 'id',
defaultSelected: 0,
defaultFlag: false,
cache: false,
editable: true
}, opts);
var accountCombo = $_obj.combo(opts).getCombo();
return accountCombo;
};
*/

/*
* 用户下拉框
*/
Business.usersCombo = function ($_obj, opts) {
    if ($_obj.length == 0) { return };
    var opts = $.extend(true, {
        data: function () {
            if (SYSTEM.usersInfo) {
                return SYSTEM.usersInfo;
            } else {
                return './basedata/users.aspx?action=list';
            }
        },
        ajaxOptions: {
            formatData: function (data) {
                SYSTEM.usersInfo = data.items; //更新
                return data.items;
            }
        },
        formatText: function (data) {
            //return data.number + ' ' + data.name;
            return data.name;
        },
        value: 'id',
        defaultSelected: 0,
        defaultFlag: false,
        cache: false,
        editable: true
    }, opts);
    var usersCombo = $_obj.combo(opts).getCombo();
    return usersCombo;
};

/*
* 网店下拉框
*/
Business.paymentCombo = function ($_obj, opts) {
    if ($_obj.length == 0) { return };
    var opts = $.extend(true, {
        data: function () {
            if (SYSTEM.paymentInfo) {
                return SYSTEM.paymentInfo;
            } else {
                return '/basedata/assist.aspx?action=list&typeNumber=PayMethod&isDelete=2';
            }
        },
        ajaxOptions: {
            formatData: function (data) {
                SYSTEM.paymentInfo = data.data.items; //更新缓存
                return data.data.items;
            }
        },
        emptyOptions: true,
        text: 'name',
        value: 'id',
        defaultSelected: 0,
        cache: false,
        editable: false,
        trigger: false,
        defaultFlag: false

    }, opts);
    var paymentCombo = $_obj.combo(opts).getCombo();
    return paymentCombo;
};
/*
* 网店下拉框
*/
Business.storeCombo = function ($_obj, opts) {
    if ($_obj.length == 0) { return };
    var SYSTEM = SYSTEM || parent.SYSTEM || opts.system;
    var opts = $.extend(true, {
        data: function () {
            if (SYSTEM.storeInfo) {
                return SYSTEM.storeInfo;
            } else {
                return '/bs/cloudStore.aspx?action=list';
            }
        },
        ajaxOptions: {
            formatData: function (data) {
                SYSTEM.storeInfo = data.data.items; //更新
                return data.data.items;
            }
        },
        formatText: function (data) {
            return data.number + ' ' + data.name;
        },
        value: 'id',
        defaultSelected: 0,
        addOptions: { text: '(所有)', value: -1 },
        defaultFlag: false,
        cache: false,
        editable: true
    }, opts);
    var storeCombo = $_obj.combo(opts).getCombo();
    return storeCombo;
};
/*
* 物流公司下拉框
*/
Business.logisticCombo = function ($_obj, opts) {
    if ($_obj.length == 0) { return };
    var SYSTEM = SYSTEM || parent.SYSTEM || opts.system;
    var opts = $.extend(true, {
        data: function () {
            if (SYSTEM.logisticInfo) {
                return SYSTEM.logisticInfo;
            } else {
                return '/bs/express.aspx?action=list';
            }
        },
        ajaxOptions: {
            formatData: function (data) {
                SYSTEM.logisticInfo = data.data.items; //更新
                return data.data.items;
            }
        },
        formatText: function (data) {
            return data.number + ' ' + data.name;
        },
        value: 'id',
        defaultSelected: 0,
        addOptions: { text: '(空)', value: 0 },
        defaultFlag: false,
        cache: false,
        editable: true
    }, opts);
    var logisticCombo = $_obj.combo(opts).getCombo();
    return logisticCombo;
};
Business.billsEvent = function (obj, type, flag) {
    var _self = obj;
    //新增分录
    $('.grid-wrap').on('click', '.ui-icon-plus', function (e) {
        var rowId = $(this).parent().data('id');
        var newId = $('#grid tbody tr').length;
        var datarow = { id: _self.newId };
        var su = $("#grid").jqGrid('addRowData', _self.newId, datarow, 'before', rowId);
        if (su) {
            $(this).parents('td').removeAttr('class');
            $(this).parents('tr').removeClass('selected-row ui-state-hover');
            $("#grid").jqGrid('resetSelection');
            _self.newId++;
        }
    });
    //删除分录
    $('.grid-wrap').on('click', '.ui-icon-trash', function (e) {
        if ($('#grid tbody tr').length === 2) {
            parent.Public.tips({ type: 2, content: '至少保留一条分录！' });
            return false;
        }
        var rowId = $(this).parent().data('id');
        var su = $("#grid").jqGrid('delRowData', rowId);
        if (su) {
            _self.calTotal();
        };
    });
    //批量添加
    $('.grid-wrap').on('click', '.ui-icon-ellipsis', function (e) {
        var $_input = $(this).prev('input');
        $.dialog({
            width: 775,
            height: 510,
            title: '选择商品',
            content: 'url:./settings/goods-batch.aspx',
            data: {
                curID: _self.curID,
                newId: _self.newId,
                callback: function (newId, curID, curRow) {
                    if (curID === '') {
                        $("#grid").jqGrid('addRowData', newId, {}, 'last');
                        _self.newId = newId + 1;
                    };
                    setTimeout(function () { $("#grid").jqGrid("editCell", curRow, 2, true) }, 10);
                    _self.calTotal();
                }
            },
            lock: true, /*
            ok: function () {
                this.content.callback(type);
                //return false;
            },
            cancel: true*/
            button: [{ name: '选中', defClass: 'ui_state_highlight fl', callback: function () {
                this.content.callback(type);
                return false;
            }
            },
					{ name: '选中并关闭', defClass: 'ui_state_highlight', callback: function () {
					    this.content.callback(type);
					    this.close();
					    return false;
					}
					},
					{ name: '关闭', callback: function () {
					    return true;
					}
					}]
        });
    });
    //取消分录编辑状态
    $(document).bind('click.cancel', function (e) {
        if (!$(e.target).closest(".ui-jqgrid-bdiv").length > 0 && curRow !== null && curCol !== null) {
            $("#grid").jqGrid("saveCell", curRow, curCol);
            curRow = null;
            curCol = null;
        };
    });

    initStorage();

    function initStorage() {
        var data = parent.SYSTEM.storageInfo;
        var list = '<ul>';
        for (var i = 0, len = data.length; i < data.length; i++) {
            list += '<li data-id="' + data[i].id + '" data-name="' + data[i].name + '" >' + data[i].storageNo + ' ' + data[i].name + '</li>';
        };
        list += '</ul>';
        $("#storageBox").html(list);
    };

    if (type === 'transfers') {
        return;
    };

    $("#batchStorage").powerFloat({
        eventType: "click",
        hoverHold: false,
        reverseSharp: true,
        target: function () {
            if (curRow !== null && curCol !== null) {
                $("#grid").jqGrid("saveCell", curRow, curCol);
                curRow = null;
                curCol = null;
            };
            return $("#storageBox");
        }
    });

    $('.wrapper').on('click', '#storageBox li', function (e) {
        var stoId = $(this).data('id');
        var stoName = $(this).data('name');
        var ids = $("#grid").jqGrid('getDataIDs');
        var batName = 'storageName';
        var batInfo = 'storageInfo';
        for (var i = 0, len = ids.length; i < len; i++) {
            var id = ids[i], itemData;
            var row = $("#grid").jqGrid('getRowData', id);
            var $_id = $('#' + id);
            if (row.goods === '' || $_id.data('goodsInfo') === undefined) {
                continue; //跳过无效分录
            };
            var setData = {};
            setData[batName] = stoName;
            $("#grid").jqGrid('setRowData', id, setData);
            $('#' + id).data(batInfo, { id: stoId, name: stoName });
        };
        $.powerFloat.hide();
    });


    initEmployee();

    function initEmployee() {
        var data = parent.SYSTEM.employeeInfo;
        var list = '<ul>';
        for (var i = 0, len = data.length; i < data.length; i++) {
            list += '<li data-id="' + data[i].id + '" data-name="' + data[i].name + '" >' + data[i].employeeNo + ' ' + data[i].name + '</li>';
        };
        list += '</ul>';
        $("#employeeBox").html(list);
    };

    if (type === 'transfers') {
        return;
    };

    $("#batchemployee").powerFloat({
        eventType: "click",
        hoverHold: false,
        reverseSharp: true,
        target: function () {
            if (curRow !== null && curCol !== null) {
                $("#grid").jqGrid("saveCell", curRow, curCol);
                curRow = null;
                curCol = null;
            };
            return $("#employeeBox");
        }
    });

    $('.wrapper').on('click', '#employeeBox li', function (e) {
        var stoId = $(this).data('id');
        var stoName = $(this).data('name');
        var ids = $("#grid").jqGrid('getDataIDs');
        var batName = 'employeeName';
        var batInfo = 'employeeInfo';
        for (var i = 0, len = ids.length; i < len; i++) {
            var id = ids[i], itemData;
            var row = $("#grid").jqGrid('getRowData', id);
            var $_id = $('#' + id);
            if (row.goods === '' || $_id.data('goodsInfo') === undefined) {
                continue; //跳过无效分录
            };
            var setData = {};
            setData[batName] = stoName;
            $("#grid").jqGrid('setRowData', id, setData);
            $('#' + id).data(batInfo, { id: stoId, name: stoName });
        };
        $.powerFloat.hide();
    });

    initUnit();

    function initUnit() {
        var data = parent.SYSTEM.unitInfo;
        var list = '<ul>';
        for (var i = 0, len = data.length; i < data.length; i++) {
            list += '<li data-id="' + data[i].id + '" data-name="' + data[i].name + '" >' + data[i].unitNo + ' ' + data[i].name + '</li>';
        };
        list += '</ul>';
        $("#unitBox").html(list);
    };

    if (type === 'transfers') {
        return;
    };

    $("#batchUnit").powerFloat({
        eventType: "click",
        hoverHold: false,
        reverseSharp: true,
        target: function () {
            if (curRow !== null && curCol !== null) {
                $("#grid").jqGrid("saveCell", curRow, curCol);
                curRow = null;
                curCol = null;
            };
            return $("#unitBox");
        }
    });

    $('.wrapper').on('click', '#unitBox li', function (e) {
        var stoId = $(this).data('id');
        var stoName = $(this).data('name');
        var ids = $("#grid").jqGrid('getDataIDs');
        var batName = 'unitName';
        var batInfo = 'unitInfo';
        for (var i = 0, len = ids.length; i < len; i++) {
            var id = ids[i], itemData;
            var row = $("#grid").jqGrid('getRowData', id);
            var $_id = $('#' + id);
            if (row.goods === '' || $_id.data('goodsInfo') === undefined) {
                continue; //跳过无效分录
            };
            var setData = {};
            setData[batName] = stoName;
            $("#grid").jqGrid('setRowData', id, setData);
            $('#' + id).data(batInfo, { id: stoId, name: stoName });
        };
        $.powerFloat.hide();
    });
};
Business.filterCustomer = function () {
    Business.customerCombo($('#customerAuto'), {
        width: '',
        formatText: function (data) {
            return data.number + ' ' + data.name;
        },
        trigger: false,
        forceSelection: false,
        noDataText: '',
        extraListHtmlCls: '',
        extraListHtml: '',
        callback: {
            onChange: function (data) {
                if (data) {
                    //this.input.data('ids', data.id);
                    this.input.val(data.number);
                }
            }
        }
    });

    //客户
    $('#filter-customer .ui-icon-ellipsis').on('click', function () {
        var $input = $(this).prev('input');
        $.dialog({
            width: 570,
            height: 500,
            title: '选择客户',
            content: 'url:/settings/customer-batch.aspx',
            lock: true,
            ok: function () {
                Business.setFilterData(this.content, $input);
            },
            cancel: function () {
                return true;
            }
        });
    });
};

Business.filterSupplier = function () {
    Business.supplierCombo($('#supplierAuto'), {
        width: '',
        formatText: function (data) {
            return data.number + ' ' + data.name;
        },
        trigger: false,
        forceSelection: false,
        noDataText: '',
        extraListHtmlCls: '',
        extraListHtml: '',
        callback: {
            onChange: function (data) {
                if (data) {
                    //this.input.data('ids', data.id);
                    this.input.val(data.number);
                }
            }
        }
    });

    //客户
    $('#filter-customer .ui-icon-ellipsis').on('click', function () {
        var $input = $(this).prev('input');
        $.dialog({
            width: 570,
            height: 500,
            title: '选择供应商',
            content: 'url:/settings/supplier-batch.aspx',
            lock: true,
            ok: function () {
                Business.setFilterData(this.content, $input);
            },
            cancel: function () {
                return true;
            }
        });
    });
};
//结算账户查询区域下拉框初始化
Business.filterSettlementAccount = function () {
    Business.settlementAccountCombo($('#settlementAccountAuto'), {
        width: '',
        formatText: function (data) {
            return data.number + ' ' + data.name;
        },
        trigger: false,
        forceSelection: false,
        noDataText: '',
        extraListHtmlCls: '',
        extraListHtml: '',
        callback: {
            onChange: function (data) {
                if (data) {
                    //this.input.data('ids', data.id);
                    this.input.val(data.number);
                }
            }
        }
    });

    //结算账户
    $('#filter-settlementAccount .ui-icon-ellipsis').on('click', function () {
        var $input = $(this).prev('input');
        $.dialog({
            width: 470,
            height: 500,
            title: '选择结算账户',
            content: 'url:/settings/settlementAccount-batch.aspx',
            lock: true,
            ok: function () {
                Business.setFilterData(this.content, $input);
            },
            cancel: function () {
                return true;
            }
        });
    });
};

Business.filterGoods = function () {
    Business.goodsCombo($('#goodsAuto'), {
        forceSelection: false,
        noDataText: '',
        extraListHtmlCls: '',
        extraListHtml: '',
        forceSelection: false,
        callback: {
            onChange: function (data) {
                if (data) {
                    this.input.data('ids', data.number);
                    this.input.val(data.number);
                }
            }
        }
    });
    //商品	
    $('#filter-goods .ui-icon-ellipsis').on('click', function () {
        var $input = $(this).prev('input');
        $.dialog({
            width: 620,
            height: 500,
            title: '选择商品',
            content: 'url:./settings/goods-batch.aspx',
            lock: true,
            ok: function () {
                Business.setFilterGoods(this.content, $input);
            },
            cancel: function () {
                return true;
            }
        });
    });
};
Business.filterStorage = function () {
    Business.storageCombo($('#storageAuto'), {
        data: function () {
            return parent.SYSTEM.allStorageInfo;
        },
        formatText: function (data) {
            //return data.storageNo + ' ' + data.name;
            return data.name;
        },
        editable: true,
        forceSelection: false,
        callback: {
            onChange: function (data) {
                if (data) {
                    this.input.data('ids', data.id);
                    //this.input.val(data.storageNo);
                    this.input.val(data.name);
                }
            }
        }
    });
    //仓库

    $('#filter-storage .ui-icon-ellipsis').on('click', function () {
        var $input = $(this).prev('input');
        $.dialog({
            width: 510,
            height: 500,
            title: '选择仓库',
            content: 'url:./settings/storage-batch.aspx',
            lock: true,
            ok: function () {
                Business.setFilterData(this.content, $input);
            },
            cancel: function () {
                return true;
            }
        });
    });
};

Business.filteremployee = function () {
    Business.employeeCombo($('#employeeAuto'), {
        data: function () {
            return parent.SYSTEM.allemployeeInfo;
        },
        formatText: function (data) {
            //return data.employeeNo + ' ' + data.name;
            return data.name;
        },
        editable: true,
        forceSelection: false,
        callback: {
            onChange: function (data) {
                if (data) {
                    this.input.data('ids', data.id);
                    //this.input.val(data.employeeNo);
                    this.input.val(data.name);
                }
            }
        }
    });
    //职员

    $('#filter-employee .ui-icon-ellipsis').on('click', function () {
        var $input = $(this).prev('input');
        $.dialog({
            width: 510,
            height: 500,
            title: '选择职员',
            content: 'url:./settings/employee-batch.aspx',
            lock: true,
            ok: function () {
                Business.setFilterData(this.content, $input);
            },
            cancel: function () {
                return true;
            }
        });
    });
};

Business.filterUnit = function () {
    Business.unitCombo($('#unitAuto'), {
        data: function () {
            return parent.SYSTEM.allUnitInfo;
        },
        formatText: function (data) {
            //return data.unitNo + ' ' + data.name;
            return data.name;
        },
        editable: true,
        forceSelection: false,
        callback: {
            onChange: function (data) {
                if (data) {
                    this.input.data('ids', data.id);
                    //this.input.val(data.unitNo);
                    this.input.val(data.name);
                }
            }
        }
    });
    //仓库

    $('#filter-unit .ui-icon-ellipsis').on('click', function () {
        var $input = $(this).prev('input');
        $.dialog({
            width: 510,
            height: 500,
            title: '选择仓库',
            content: 'url:./settings/unit-batch.aspx',
            lock: true,
            ok: function () {
                Business.setFilterData(this.content, $input);
            },
            cancel: function () {
                return true;
            }
        });
    });
};



//将弹窗中返回的数据记录到相应的input中
Business.setFilterData = function (dialogCtn, $input) {
    var ids = dialogCtn.$("#grid").jqGrid('getGridParam', 'selarrrow'),
		len = ids.length,
		numbers = [];
    if (len > 0) {
        $.each(ids, function (idx, val) {
            var row = dialogCtn.$("#grid").jqGrid('getRowData', val);
            numbers.push(row.number || row.storageNo);
        });
        $input.data('ids', ids.join(',')).val(numbers.join(','));
    }
};

Business.setFilterGoods = function (dialogCtn, $input) {
    var ids = dialogCtn.$("#grid").jqGrid('getGridParam', 'selarrrow'),
		len = ids.length,
		numbers = [];
    if ($.trim($input.val()) !== '') {
        numbers.push($input.val());
    };
    if (len > 0) {
        $.each(ids, function (idx, val) {
            var row = dialogCtn.$("#grid").jqGrid('getRowData', val);
            numbers.push(row.number);
        });
        $input.data('ids', numbers.join(',')).val(numbers.join(','));
    }
};

Business.moreFilterEvent = function () {
    $('#conditions-trigger').on('click', function (e) {
        e.preventDefault();
        if (!$(this).hasClass('conditions-expand')) {
            $('#more-conditions').stop().slideDown(200, function () {
                $('#conditions-trigger').addClass('conditions-expand').html('收起更多<b></b>');
                $('#filter-reset').css('display', 'inline');
            });
        } else {
            $('#more-conditions').stop().slideUp(200, function () {
                $('#conditions-trigger').removeClass('conditions-expand').html('更多条件<b></b>');
                $('#filter-reset').css('display', 'none');
            });
        };
    });
};

Business.gridEvent = function () {
    $('.grid-wrap').on('mouseenter', '.list tbody tr', function (e) {
        $(this).addClass('tr-hover');
        if ($_curTr) {
            $_curTr.removeClass('tr-hover');
            $_curTr = null;
        }
    }).on('mouseleave', '.list tbody tr', function (e) {
        $(this).removeClass('tr-hover');
    });
};

//判断:当前元素是否是被筛选元素的子元素
$.fn.isChildOf = function (b) {
    return (this.parents(b).length > 0);
};

//判断:当前元素是否是被筛选元素的子元素或者本身
$.fn.isChildAndSelfOf = function (b) {
    return (this.closest(b).length > 0);
};

//数字输入框
$.fn.digital = function () {
    this.each(function () {
        $(this).keyup(function () {
            this.value = this.value.replace(/\D/g, '');
        })
    });
};

/** 
1. 设置cookie的值，把name变量的值设为value   
example $.cookie(’name’, ‘value’);
2.新建一个cookie 包括有效期 路径 域名等
example $.cookie(’name’, ‘value’, {expires: 7, path: ‘/’, domain: ‘jquery.com’, secure: true});
3.新建cookie
example $.cookie(’name’, ‘value’);
4.删除一个cookie
example $.cookie(’name’, null);
5.取一个cookie(name)值给myvar
var account= $.cookie('name');
**/
$.cookie = function (name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
Public.print = function (opt) {
    var voucherIds = opt.$grid.jqGrid('getGridParam', 'selarrrow').join();
    var pdfUrl = opt.pdf;
    var sidx = opt.$grid.jqGrid('getGridParam', 'sortname');
    var sord = opt.$grid.jqGrid('getGridParam', 'sortorder');
    var billType = opt.billType;
    var data = {
        sidx: sidx,
        sord: sord,
        op: 2
    };
    if (!voucherIds) {
        //$.extend(data,opt.filterConditions);
        if (!opt.filterConditions.id) {
            parent.Public.tips({ type: 2, content: "请先选择需要打印的项！" });
            return;
        } else {
            data.id = opt.filterConditions.id;
        }
    } else {
        data.id = voucherIds;
    }
    $.dialog({
        title: opt.title,
        content: 'url:../print/print-settings-voucher.aspx',
        data: { taodaData: data, pdfData: data, pdfUrl: pdfUrl, billType: billType, opt: opt },
        width: 520,
        height: 400,
        min: false,
        max: false,
        lock: true,
        ok: function () {
            this.content.doPrint();
            return false;
        },
        okVal: '打印',
        cancel: true
    });
};

//生成树
Public.zTree = {
    zTree: {},
    opts: {
        showRoot: true,
        defaultClass: '',
        disExpandAll: false, //showRoot为true时无效
        callback: '',
        rootTxt: '全部'
    },
    setting: {
        view: {
            dblClickExpand: false,
            showLine: true,
            selectedMulti: false
        },
        data: {
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "parentID",
                rootPId: ""
            }
        },
        callback: {
        //beforeClick: function(treeId, treeNode) {}
    }
},
_getTemplate: function (opts) {
    this.id = 'tree' + parseInt(Math.random() * 10000);
    var _defaultClass = "ztree";
    if (opts) {
        if (opts.defaultClass) {
            _defaultClass += ' ' + opts.defaultClass;
        }
    }
    return '<ul id="' + this.id + '" class="' + _defaultClass + '"></ul>';
},
init: function ($target, opts, setting, callback) {
    if ($target.length === 0) {
        return;
    }
    var self = this;
    self.opts = $.extend(true, self.opts, opts);
    self.container = $($target);
    self.obj = $(self._getTemplate(opts));
    self.container.append(self.obj);
    setting = $.extend(true, self.setting, setting);
    Public.ajaxPost('../basedata/assist.aspx?action=list&typeNumber=trade&isDelete=2', {}, function (data) {
        if (data.status === 200 && data.data) {
            self._callback(data.data.items);
        } else {
            Public.tips({
                type: 2,
                content: "加载分类信息失败！"
            });
        }
    });
    return self;
},
_callback: function (data) {
    var self = this;
    var callback = self.opts.callback;
    if (self.opts.showRoot) {
        data.unshift({ name: self.opts.rootTxt, id: 0 });
        self.obj.addClass('showRoot');
    }
    if (!data.length) return;
    self.zTree = $.fn.zTree.init(self.obj, self.setting, data);
    //self.zTree.selectNode(self.zTree.getNodeByParam("id", 101));
    self.zTree.expandAll(!self.opts.disExpandAll);
    if (callback && typeof callback === 'function') {
        callback(self, data);
    }
}
};
//分类下拉框
Public.categoryTree = function ($obj, opts) {
    if ($obj.length === 0) {
        return;
    }
    opts = opts ? opts : opts = {};
    var opts = $.extend(true, {
        inputWidth: '145',
        width: '', //'auto' or int
        height: '240', //'auto' or int
        trigger: true,
        defaultClass: 'ztreeCombo',
        disExpandAll: false, //展开全部
        defaultSelectValue: 0,
        showRoot: true, //显示root选择
        rootTxt: '全部',
        treeSettings: {
            callback: {
                beforeClick: function (treeId, treeNode) {
                    if (_Combo.obj) {
                        _Combo.obj.val(treeNode.name);
                        _Combo.obj.data('id', treeNode.id);
                        _Combo.hideTree();
                    }
                }
            }
        }
    }, opts);
    var _Combo = {
        container: $('<span class="ui-tree-wrap" style="width:' + opts.inputWidth + 'px"></span>'),
        obj: $('<input type="text" class="input-txt" style="width:' + (opts.inputWidth - 26) + 'px" id="' + $obj.attr('id') + '" autocomplete="off" readonly value="' + ($obj.val() || $obj.text()) + '">'),
        trigger: $('<span class="trigger"></span>'),
        data: {},
        init: function () {
            var _parent = $obj.parent();
            var _this = this;
            $obj.remove();
            this.obj.appendTo(this.container);
            if (opts.trigger) {
                this.container.append(this.trigger);
            }
            this.container.appendTo(_parent);
            opts.callback = function (publicTree, data) {
                _this.zTree = publicTree;
                //_this.data = data;
                if (publicTree) {
                    publicTree.obj.css({
                        'max-height': opts.height
                    });
                    for (var i = 0, len = data.length; i < len; i++) {
                        _this.data[data[i].id] = data[i];
                    };
                    if (opts.defaultSelectValue !== '') {
                        _this.selectByValue(opts.defaultSelectValue);
                    };
                    _this._eventInit();
                }
            };
            this.zTree = Public.zTree.init($('body'), opts, opts.treeSettings);
            return this;
        },
        showTree: function () {
            if (!this.zTree) return;
            if (this.zTree) {
                var offset = this.obj.offset();
                var topDiff = this.obj.outerHeight();
                var w = opts.width ? opts.width : this.obj.width();
                var _o = this.zTree.obj.hide();
                _o.css({ width: w, top: offset.top + topDiff, left: offset.left - 1 });
            }
            var _o = this.zTree.obj.show();
            this.isShow = true;
            this.container.addClass('ui-tree-active');
        },
        hideTree: function () {
            if (!this.zTree) return;
            var _o = this.zTree.obj.hide();
            this.isShow = false;
            this.container.removeClass('ui-tree-active');
        },
        _eventInit: function () {
            var _this = this;
            if (opts.trigger) {
                _this.trigger.on('click', function (e) {
                    e.stopPropagation();
                    if (_this.zTree && !_this.isShow) {
                        _this.showTree();
                    } else {
                        _this.hideTree();
                    }
                });
            };
            _this.obj.on('click', function (e) {
                e.stopPropagation();
                if (_this.zTree && !_this.isShow) {
                    _this.showTree();
                } else {
                    _this.hideTree();
                }
            });
            if (_this.zTree) {
                _this.zTree.obj.on('click', function (e) {
                    e.stopPropagation();
                });
            }
            $(document).click(function () {
                _this.hideTree();
            });
        },
        getValue: function () {
            var id = this.obj.data('id') || '';
            if (!id) {
                var text = this.obj.val();
                if (this.data) {
                    for (var item in this.data) {
                        if (this.data[item].name === text) {
                            id = this.data[item].id;
                        }
                    }
                }
            }
            return id;
        },
        getText: function () {
            if (this.obj.data('id'))
                return this.obj.val();
            return '';
        },
        selectByValue: function (value) {
            if (value !== '') {
                if (this.data) {
                    this.obj.data('id', value);
                    this.obj.val(this.data[value].name);
                }
            }
            return this;
        }
    };
    return _Combo.init();
};
/*
* 分类新增弹窗
* 不支持多级结构（树）
* type string 分类类型
* parentWin object 父窗口对象,决定弹窗的覆盖范围，默认当前窗口的parent
*/
Public.categoryPop = function (type, targetWin, callback) {
    var defaultPage = Public.getDefaultPage();
    var self = {
        init: function () {
            var myParent = targetWin || parent;
            var showParentCategory = false;
            var content = $(['<form id="manage-form" action="" style="width: 282px;">',
				               '<ul class="mod-form-rows manage-wrap" id="manager">',
						           '<li class="row-item">',
						               '<div class="label-wrap"><label for="category">类别:</label></div>',
						               '<div class="ctn-wrap"><input type="text" value="" class="ui-input" name="category" id="category" style="width:190px;"></div>',
						           '</li>',
						       '</ul>',
					       '</form>'].join(''));
            var height = 90;
            var dialog = myParent.$.dialog({
                title: '新增类别',
                content: content,
                //data: data,
                width: 400,
                height: height,
                max: false,
                min: false,
                cache: false,
                lock: true,
                okVal: '确定',
                ok: function () {
                    var category = $.trim(content.find('#category').val());
                    if (!category) {
                        defaultPage.Public.tips({ content: '请输入类别名称！' });
                        category.focus();
                        return false;
                    }
                    var oper = 'add';
                    var params = { name: category, typeNumber: type };
                    var msg = '新增类别';
                    Public.ajaxPost('../basedata/assist.aspx?action=' + oper, params, function (data) {
                        if (data.status == 200) {
                            defaultPage.Public.tips({ content: msg + '成功！' });
                            defaultPage.SYSTEM.categoryInfo[type].push(data.data);
                            if (typeof callback === 'function') {
                                callback(data.data, dialog);
                            }
                        } else {
                            defaultPage.Public.tips({ type: 1, content: msg + '失败！' + data.msg });
                        }
                    });
                    return false;
                },
                cancelVal: '取消',
                cancel: function () {
                    return true;
                }
            });
        }
    };
    self.init();
};
/*
* 兼容IE8 数组对象不支持indexOf()
* create by guoliang_zou ,20140812
*/
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt /*, from*/) {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
        if (from < 0)
            from += len;
        for (; from < len; from++) {
            if (from in this &&
          this[from] === elt)
                return from;
        }
        return -1;
    };
}
