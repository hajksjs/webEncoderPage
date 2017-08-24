BizQQWPA.define("wpa.SelectPanel", "lang.browser,util.Style,util.className,util.events,util.offset,util.css,util.proxy,lang.extend",
function(B) {
    var q = B("Style"),
    u = B("className"),
    p = B("events"),
    z = B("offset"),
    x = B("browser"),
    w = B("css"),
    t = B("proxy"),
    v = B("extend");
    var y = 1;
    var r = document;
    var o = function(c, a) {
        var g = function(k, i) {
            for (var l = 0,
            j = i.length; l !== j; k.push(i[l++])) {}
            return k
        },
        e = g([], c.childNodes),
        h = e.length,
        b = 0,
        d,
        f = null;
        while (h > b) {
            d = e[b++];
            if (d.nodeType !== y) {
                continue
            }
            if (d.getAttribute("id") === a) {
                f = d;
                break
            }
            g(e, d.childNodes);
            h = e.length
        }
        return f
    };
    var s = {
        container: r.getElementsByTagName("body")[0],
        template: ['<div class="WPA3-SELECT-PANEL">', '<div class="WPA3-SELECT-PANEL-TOP">', '<a id="WPA3-SELECT-PANEL-CLOSE" href="javascript:;" class="WPA3-SELECT-PANEL-CLOSE"></a>', "</div>", '<div class="WPA3-SELECT-PANEL-MAIN">', '<p class="WPA3-SELECT-PANEL-GUIDE">请选择发起聊天的方式：</p>', '<div class="WPA3-SELECT-PANEL-SELECTS">', '<a id="WPA3-SELECT-PANEL-AIO-CHAT" href="javascript:;" class="WPA3-SELECT-PANEL-CHAT WPA3-SELECT-PANEL-AIO-CHAT">', '<span class="WPA3-SELECT-PANEL-QQ WPA3-SELECT-PANEL-QQ-AIO"></span>', '<span class="WPA3-SELECT-PANEL-LABEL">QQ帐号聊天</span>', "</a>", '<a id="WPA3-SELECT-PANEL-ANONY-CHAT" href="javascript:;" class="WPA3-SELECT-PANEL-CHAT WPA3-SELECT-PANEL-ANONY-CHAT">', '<span class="WPA3-SELECT-PANEL-QQ WPA3-SELECT-PANEL-QQ-ANONY"></span>', '<span class="WPA3-SELECT-PANEL-LABEL">匿名聊天</span>', "</a>", "</div>", "</div>", '<div class="WPA3-SELECT-PANEL-BOTTOM">', '<a target="_blank" href="http://im.qq.com" class="WPA3-SELECT-PANEL-INSTALL">安装QQ</a>', "</div>", "</div>"].join(""),
        cssText: [".WPA3-SELECT-PANEL { z-index:2147483647; width:463px; height:292px; margin:0; padding:0; border:1px solid #d4d4d4; background-color:#fff; border-radius:5px; box-shadow:0 0 15px #d4d4d4;}", '.WPA3-SELECT-PANEL * { position:static; z-index:auto; top:auto; left:auto; right:auto; bottom:auto; width:auto; height:auto; max-height:auto; max-width:auto; min-height:0; min-width:0; margin:0; padding:0; border:0; clear:none; clip:auto; background:transparent; color:#333; cursor:auto; direction:ltr; filter:; float:none; font:normal normal normal 12px "Helvetica Neue", Arial, sans-serif; line-height:16px; letter-spacing:normal; list-style:none; marks:none; overflow:visible; page:auto; quotes:none; -o-set-link-source:none; size:auto; text-align:left; text-decoration:none; text-indent:0; text-overflow:clip; text-shadow:none; text-transform:none; vertical-align:baseline; visibility:visible; white-space:normal; word-spacing:normal; word-wrap:normal; -webkit-box-shadow:none; -moz-box-shadow:none; -ms-box-shadow:none; -o-box-shadow:none; box-shadow:none; -webkit-border-radius:0; -moz-border-radius:0; -ms-border-radius:0; -o-border-radius:0; border-radius:0; -webkit-opacity:1; -moz-opacity:1; -ms-opacity:1; -o-opacity:1; opacity:1; -webkit-outline:0; -moz-outline:0; -ms-outline:0; -o-outline:0; outline:0; -webkit-text-size-adjust:none; font-family:Microsoft YaHei,Simsun;}', ".WPA3-SELECT-PANEL a { cursor:auto;}", ".WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-TOP { height:25px;}", ".WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-CLOSE { float:right; display:block; width:47px; height:25px; background:url(http://combo.b.qq.com/crm/wpa/release/3.3/wpa/views/SelectPanel-sprites.png) no-repeat;}", ".WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-CLOSE:hover { background-position:0 -25px;}", ".WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-MAIN { padding:23px 20px 45px;}", '.WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-GUIDE { margin-bottom:42px; font-family:"Microsoft Yahei"; font-size:16px;}', ".WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-SELECTS { width:246px; height:111px; margin:0 auto;}", ".WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-CHAT { float:right; display:block; width:88px; height:111px; background:url(http://combo.b.qq.com/crm/wpa/release/3.3/wpa/views/SelectPanel-sprites.png) no-repeat 0 -80px;}", ".WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-CHAT:hover { background-position:-88px -80px;}", ".WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-AIO-CHAT { float:left;}", ".WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-QQ { display:block; width:76px; height:76px; margin:6px; background:url(http://combo.b.qq.com/crm/wpa/release/3.3/wpa/views/SelectPanel-sprites.png) no-repeat -50px 0;}", ".WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-QQ-ANONY { background-position:-130px 0;}", ".WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-LABEL { display:block; padding-top:10px; color:#00a2e6; text-align:center;}", ".WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-BOTTOM { padding:0 20px; text-align:right;}", ".WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-INSTALL { color:#8e8e8e;}"].join(""),
        modal: true
    };
    q.add("_WPA_SELECT_PANEL_STYLE", s.cssText);
    var A = function(a) {
        this.opts = v({},
        a, s);
        this.render()
    };
    A.prototype = {
        render: function() {
            var d = this,
            c = this.opts,
            e = this.container = c.container;
            var a = r.createElement("div"),
            b;
            a.innerHTML = c.template;
            this.$el = b = a.firstChild;
            p.addEvent(o(b, "WPA3-SELECT-PANEL-CLOSE"), "click",
            function() {
                d.remove();
                c.onClose && c.onClose()
            });
            p.addEvent(o(b, "WPA3-SELECT-PANEL-AIO-CHAT"), "click",
            function() {
                d.remove();
                c.onAIOChat && c.onAIOChat()
            });
            p.addEvent(o(b, "WPA3-SELECT-PANEL-ANONY-CHAT"), "click",
            function() {
                d.remove();
                c.onAnonyChat && c.onAnonyChat()
            }); (function() {
                try {
                    e.appendChild(b)
                } catch(f) {
                    setTimeout(arguments.callee, 1);
                    return
                }
                if (c.modal) {
                    d.renderModal()
                }
                d.setCenter()
            })()
        },
        show: function() {
            this.css("display", "block");
            this.modal && w(this.modal, "display", "block");
            return this
        },
        hide: function() {
            this.css("display", "none");
            this.modal && w(this.modal, "display", "none");
            return this
        },
        remove: function() {
            this.$el.parentNode.removeChild(this.$el);
            this.modal && this.modal.parentNode.removeChild(this.modal);
            return this
        },
        css: function() {
            var a = [this.$el].concat(Array.prototype.slice.call(arguments));
            return w.apply(this, a)
        },
        setCenter: function() {
            this.css({
                position: "absolute",
                top: "50%",
                left: "50%"
            });
            var c = {
                position: "fixed",
                marginLeft: "-" + this.outerWidth() / 2 + "px",
                marginTop: "-" + this.outerHeight() / 2 + "px"
            };
            var b = r.compatMode === "BackCompat";
            if ((x.msie && parseInt(x.version, 10) < 7) || b) {
                c.position = "absolute";
                c.marginTop = 0;
                var a = c.top = (z.getClientHeight() - this.outerHeight()) / 2;
                setInterval(t(this.$el,
                function() {
                    this.style.top = z.getScrollTop() + a + "px"
                }), 128)
            }
            this.css(c)
        },
        renderModal: function() {
            var e = this.container,
            d = w(e, "width"),
            f = w(e, "height"),
            a = w(e, "overflow");
            var g = r.createElement("div"),
            c = {
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 2147483647,
                width: z.getClientWidth() + "px",
                height: z.getClientHeight() + "px",
                backgroundColor: "white",
                opacity: 0.1,
                filter: "alpha(opacity=10)"
            };
            var b = r.compatMode === "BackCompat";
            if ((x.msie && parseInt(x.version, 10) < 7) || b) {
                c.position = "absolute";
                setInterval(t(g,
                function() {
                    this.style.top = z.getScrollTop() + "px"
                }), 128)
            }
            w(g, c);
            e.insertBefore(g, this.$el);
            this.modal = g;
            p.addEvent(window, "resize", t(g,
            function() {
                w(this, {
                    width: z.getClientWidth() + "px",
                    height: z.getClientHeight() + "px"
                })
            }))
        },
        outerWidth: function() {
            return this.$el.offsetWidth
        },
        outerHeight: function() {
            return this.$el.offsetHeight
        }
    };
    return A
});
BizQQWPA.define("util.css", "util.contains",
function(f) {
    var i = f("contains");
    var g = document.defaultView && document.defaultView.getComputedStyle ?
    function(a, b) {
        b = b.replace(/([A-Z])/g, "-$1").toLowerCase();
        var c = document.defaultView.getComputedStyle(a, "");
        return c && c.getPropertyValue(b)
    }: function(a, b) {
        return a.currentStyle[b]
    };
    var h = function(c, d) {
        if (!i(c, document)) {
            return d()
        }
        var n = {
            opacity: 0,
            filter: "alpha(opacity=0)"
        },
        e = c.parentNode,
        b = c.nextSibling,
        a = document.createElement("div"),
        m;
        a.appendChild(c);
        j(a, n);
        j(c, n);
        document.body.appendChild(a);
        m = d();
        b ? e.insertBefore(c, b) : e.appendChild(c);
        a.parentNode.removeChild(a);
        return m
    };
    var j = function(b, c, a) {
        var d;
        if (!a) {
            if (typeof c === "string") {
                return h(b,
                function() {
                    return g(b, c)
                })
            }
            if (typeof c !== "object") {
                new TypeError("Arg style should be string or object")
            }
            d = [];
            for (var e in c) {
                d.push(e + ":" + c[e])
            }
            d = d.join(";")
        } else {
            d = c + ":" + a
        }
        d = d.replace(/([A-Z])/g, "-$1").toLowerCase();
        b.style.cssText += ";" + d;
        return b
    };
    return j
});
BizQQWPA.define("util.contains",
function() {
    return document.documentElement.contains ?
    function(h, e) {
        var g = h.nodeType === 9 ? h.documentElement: h,
        f = e && e.parentNode;
        return h === f || !!(f && f.nodeType === 1 && g.contains && g.contains(f))
    }: document.documentElement.compareDocumentPosition ?
    function(c, d) {
        return d && !!(c.compareDocumentPosition(d) & 16)
    }: function(c, d) {
        while ((d = d.parentNode)) {
            if (d === c) {
                return true
            }
        }
        return false
    }
});