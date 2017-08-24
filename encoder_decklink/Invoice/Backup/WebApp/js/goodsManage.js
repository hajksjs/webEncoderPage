function init() {
    void 0 !== cRowId ? Public.ajaxPost("../basedata/inventory.aspx?action=get", {
        id: cRowId
    },
    function (a) {
        //alert("1");
        200 === a.status ? (rowData = a.data, initField(), initEvent()) : parent.parent.Public.tips({
            type: 1,
            content: a.msg
        })
    }) : (initField(), initEvent())
}
function initPopBtns() {
    var a = "add" == oper ? ["\u4fdd\u5b58", "\u5173\u95ed"] : ["\u786e\u5b9a", "\u53d6\u6d88"];
    api.button({
        id: "confirm",
        name: a[0],
        focus: !0,
        callback: function() {
            return $form.trigger("validate"),
            !1
        }
    },
    {
        id: "cancel",
        name: a[1]
    })
}
function postCustomerData() {
    if ("add" == oper) {
        //cancleGridEdit();
        var a = $("#name").val();
        Public.ajaxPost("../basedata/inventory.aspx?action=checkName", {
            name: a
        },
        function (b) {
-1 == b.status ? $.dialog.confirm('商品名称 "' + a + '"已经存在！是否继续？',
            function() {
                postData()
            }) : postData()
        })
    } else postData()
}
function postData() {
    var a = "add" == oper ? "新增商品" : "修改商品",
    b = getCustomerData();
    if (b) {
        var c = {};
        c.skuAssistId = b.skuAssistId,
        c.skuClassId = 0,
        /*$itemList.find("input:checkbox").each(function() {
            var a = $(this).parent().text();
            this.checked && (c.skuName = c.skuName ? c.skuName + "+" + a: a)
        }),*/
        Public.ajaxPost("../basedata/inventory.aspx?action=" + ("add" == oper ? "add": "update"), b,
        function(d) {
            if (200 == d.status) {
                /*if (parent.parent.Public.tips({
                    content: a + "\u6210\u529f\uff01"
                }), b.isWarranty && (d.data.safeDays = b.safeDays, d.data.advanceDay = b.advanceDay), SYSTEM.enableAssistingProp && d.data.skuClassId) {
                    for (var e = !0,
                    f = 0,
                    g = SYSTEM.assistPropGroupInfo.length; g > f; f++) SYSTEM.assistPropGroupInfo[f].skuId === d.data.skuClassId && (e = !1);
                    e && (c.skuId = d.data.skuClassId, SYSTEM.assistPropGroupInfo.push(c))
                }*/
                if (callback && "function" == typeof callback) {
                    var h = getTempData(d.data);
                    callback(h, oper, window)
                }
            } else parent.parent.Public.tips({
                type: 1,
                content: a + "失败！" + d.msg
            })
        })
    }
}
function getCustomerData() {
   /* for (var a = getEntriesData(), b = {},
    c = 0, d = a.length; d > c; c++) {
        if (b[a[c].storageID]) {
            if (b[a[c].storageID][a[c].skuId + ""]) {
                var e = b[a[c].storageID][a[c].skuId + ""],
                f = c + 1;
                return parent.parent.Public.tips({
                    type: 2,
                    content: "\u7b2c" + e + "\u6761\u4e0e\u7b2c" + f + "\u6761\u7684\u4ed3\u5e93\u5c5e\u6027\u91cd\u590d\uff01"
                }),
                void 0
            }
        } else b[a[c].storageID] = {};
        b[a[c].storageID][a[c].skuId + ""] = c + 1
    }*/
    var g = {
        id: rowData.id,
        number: $.trim($("#number").val()),
        name: $.trim($("#name").val()),
        categoryid: categoryTree.getValue(),
        spec: $.trim($("#specs").val()),
        storageID: storageCombo.getValue(),
        storageName: 0 === storageCombo.getValue() ? "": storageCombo.getText(),
        unitID: unitCombo.getValue(),
        purPrice: Public.currencyToNum($("#purchasePrice").val()),
        salePrice: Public.currencyToNum($("#salePrice").val()),
        //wholesalePrice: Public.currencyToNum($("#wholesalePrice").val()),
        //vipPrice: Public.currencyToNum($("#vipPrice").val()),
        //discountRate1: $.trim($("#discountRate1").val()),
        //discountRate2: $.trim($("#discountRate2").val()),
        lowQty: $("#minInventory").val(),
        highQty: $("#maxInventory").val(),
        //propertys: JSON.stringify(a),
        remark: $("#note").val() == $("#note")[0].defaultValue ? "": $("#note").val(),
        barCode: $("#barCode").val()
    };
    /*return SYSTEM.enableStorage && (g.jianxing = jianxingCombo.getValue(), g.length = $("#length").val(), g.width = $("#width").val(), g.height = $("#height").val(), g.weight = $("#weight").val()),
    SYSTEM.enableAssistingProp && $itemList.find("input:checkbox").each(function() {
        this.checked && (g.skuAssistId = g.skuAssistId ? g.skuAssistId + "," + this.id: this.id)
    }),
    SYSTEM.ISSERNUM && (g.isSerNum = $isSerNum[0].checked ? 1 : 0),
    SYSTEM.ISWARRANTY && (g.isWarranty = $isWarranty[0].checked ? 1 : 0, g.isWarranty && (g.safeDays = $("#safeDays").val(), g.advanceDay = $("#advanceDay").val())),
    "edit" == oper && (g.deleteRow = JSON.stringify(deleteRow)),*/
    return g
}
function getEntriesData(a) {
    var b = [];
    return b
}
function getTempData(a) {
    var b, c, d, e, f = 0,
    g = 0; //,h = a.propertys;
    
    c = categoryTree.getText() || "",
    unitData[a.unitID] && (d = unitData[a.unitID].name || "");
    //for (var i = 0; i < h.length; i++) h[i].quantity && (f += h[i].quantity),h[i].amount && (g += h[i].amount);
    return f && g && (e = g / f),
    b = $.extend({},
    a, {
        categoryName: c,
        unitName: d,
        quantity: f,
        unitCost: e,
        amount: g
    })
}
function initField() {
    //alert(JSON.stringify(t.entries));
    //alert(rowData.categoryid);
    $("#note").placeholder(),
    "edit" == oper ? ($("#number").val(rowData.number), $("#name").val(rowData.name), $category.data("defItem", rowData.categoryid), $("#specs").val(rowData.spec), $("#storage").data("defItem", rowData.storageID),
     $("#unit").data("defItem", ["id", rowData.unitID]), void 0 != rowData.purPrice && $("#purchasePrice").val(Public.numToCurrency(rowData.purPrice, pricePlaces)), void 0 != rowData.salePrice && ($("#salePrice").val(Public.numToCurrency(rowData.salePrice, pricePlaces)), 
     $("#wholesalePrice").val(Public.numToCurrency(rowData.wholesalePrice, pricePlaces)), $("#vipPrice").val(Public.numToCurrency(rowData.vipPrice, pricePlaces)),
     $("#discountRate1").val(rowData.discountRate1), $("#discountRate2").val(rowData.discountRate2)), $("#minInventory").val(rowData.lowQty), $("#maxInventory").val(rowData.highQty), rowData.remark && $("#note").val(rowData.remark)//, 
     //$("#barCode").val(rowData.barCode), $("#length").val(rowData.length), $("#width").val(rowData.width), $("#height").val(rowData.height), $("#weight").val(rowData.weight),
     //rowData.isSerNum && ($isSerNum[0].checked = !0),
     //rowData.isWarranty && ($isWarranty[0].checked = !0, $(".isWarrantyIn").show(), $("#safeDays").val(rowData.safeDays), $("#advanceDay").val(rowData.advanceDay))
     ) : $("#storage").data("defItem", 0),
    api.opener.parent.SYSTEM.isAdmin || (rights.AMOUNT_INAMOUNT || $("#purchasePrice").closest("li").hide(), rights.AMOUNT_OUTAMOUNT || ($("#salePrice").closest("li").hide(), $("#wholesalePrice").closest("li").hide(), $("#vipPrice").closest("li").hide(), $("#discountRate1").closest("li").hide(), $("#discountRate2").closest("li").hide())),
    SYSTEM.enableStorage && ($(".manage-wrapper").parent().addClass("hasJDStorage"), $("#barCode").closest("li").show())/*,
    SYSTEM.enableAssistingProp && ($(".prop-wrap").show().on("click", "input",
    function(a) {
        getEntriesData().length && (a.preventDefault(), defaultPage.Public.tips({
            type: 2,
            content: "\u5df2\u7ecf\u8bbe\u7f6e\u4e86\u671f\u521d\u4e0d\u80fd\u4fee\u6539\u8be5\u5c5e\u6027\uff01"
        }))
    }), initSkuField()),
    SYSTEM.ISSERNUM && ($isSerNum.parent().show(), $isSerNum.click(function(a) {
        getEntriesData(!0).length && (a.preventDefault(), defaultPage.Public.tips({
            type: 2,
            content: "\u5df2\u7ecf\u8bbe\u7f6e\u4e86\u671f\u521d\u4e0d\u80fd\u4fee\u6539\u8be5\u5c5e\u6027\uff01"
        }))
    })),
    SYSTEM.ISWARRANTY && ($(".qur-wrap").show(), $isWarranty.click(function(a) {
        getEntriesData(!0).length ? (a.preventDefault(), defaultPage.Public.tips({
            type: 2,
            content: "\u5df2\u7ecf\u8bbe\u7f6e\u4e86\u671f\u521d\u4e0d\u80fd\u4fee\u6539\u8be5\u5c5e\u6027\uff01"
        })) : $(".isWarrantyIn").toggle()
    }))*/
}
/*function initSkuField() {
    var a = [];
    if (SYSTEM.assistPropTypeInfo) {
        var b = {};
        if ("edit" == oper) for (var c = 0,
        d = SYSTEM.assistPropGroupInfo.length; d > c; c++) if (SYSTEM.assistPropGroupInfo[c].skuId === rowData.skuClassId) for (var e = SYSTEM.assistPropGroupInfo[c].skuAssistId.split(","), c = 0, d = e.length; d > c; c++) b[e[c]] = !0;
        for (var c = 0,
        d = SYSTEM.assistPropTypeInfo.length; d > c; c++) {
            var f = SYSTEM.assistPropTypeInfo[c],
            g = b[f.id] ? "checked": "";
            a.push('<label><input type="checkbox" id="' + f.id + '" ' + g + ">" + f.name + "</label>")
        }
    }
    a.push('<label id="createSku">+</label>'),
    $itemList.html(a.join(""))
}*/
function initEvent() {
    var a = /[^\\<\\>\\&\\\\\']+/;
    Public.limitInput($("#number"), a),
    $("#name").blur(function() {});
    var b = {
        width: 200,
        inputWidth: 145,
        defaultSelectValue: rowData.categoryid || "",
        showRoot: !1
    };
    categoryTree = Public.categoryTree($category, b),
    $("#specs").blur(function() {
        var a = $.trim(this.value);
        "" == a || "edit" == oper && a == rowData.spec || Public.ajaxPost("../basedata/inventory.aspx?action=checkSpec", {
            spec: a
        },
        function(b) { - 1 == b.status && parent.parent.Public.tips({
                type: 2,
                content: '规格型号 "' + a + '" 已经存在！'
            })
        })
    }),
    storageCombo = $("#storage").combo({
        data: function() {
            for (var a = Public.getDefaultPage(), b = [], c = 0; c < a.SYSTEM.storageInfo.length; c++) {
                var d = a.SYSTEM.storageInfo[c];
                d["delete"] || b.push(d)
            }
            return b
        },
        value: "id",
        text: "name",
        width: comboWidth,
        defaultSelected: 0,
        cache: !1,
        editable: !1,
        emptyOptions: !0,
        extraListHtml: '<a href="#" class="quick-add-link" onclick="addStorage();return false;"><i class="ui-icon-add"></i>\u65b0\u589e</a>'
    }).getCombo(),
    storageCombo.selectByValue($("#storage").data("defItem")),
    unitCombo = $("#unit").combo({
        data: getBaseUnit(),
        value: "id",
        text: "name",
        formatText: function(a) {
            if (a.unitTypeId) {
                for (var b = 0; b < SYSTEM.unitGroupInfo.length; b++) if (a.unitTypeId === SYSTEM.unitGroupInfo[b].id) return a.name + "(" + SYSTEM.unitGroupInfo[b].name + ")";
                return a.name + "_"
            }
            return a.name
        },
        width: comboWidth,
        defaultSelected: $("#unit").data("defItem") || 0,
        extraListHtml: '<a href="#" class="quick-add-link" onclick="addUnit();return false;"><i class="ui-icon-add"></i>\u65b0\u589e</a>'
    }).getCombo(),
    $(".money").keypress(Public.numerical).focus(function() {
        var a = $(this);
        this.value = Public.currencyToNum(this.value),
        setTimeout(function() {
            a.select()
        },
        10)
    }).blur(function() {
        this.value = Public.numToCurrency(this.value, pricePlaces).replace("-", "")
    }),
    $(".rate").keypress(Public.numerical).focus(function() {
        var a = $(this);
        setTimeout(function() {
            a.select()
        },
        10)
    }),
    $("#minInventory, #maxInventory").keypress(Public.numerical),
   /* gridStoCombo = Business.storageCombo($(".storageAuto"), {
        data: function() {
            for (var a = Public.getDefaultPage(), b = [], c = 0; c < a.SYSTEM.storageInfo.length; c++) {
                var d = a.SYSTEM.storageInfo[c];
                d["delete"] || b.push(d)
            }
            return b
        },
        callback: {
            onChange: function(a) {
                var b = this.input.parents("tr"),
                c = b.data("storageInfo") || {};
                if (a) {
                    if (a.id != c.id) if (SYSTEM.enableAssistingProp) {
                        var d = "",
                        e = "";
                        if ($itemList.find("input:checkbox").each(function() {
                            if (this.checked) {
                                d = d ? d + "," + this.id: this.id;
                                var a = $(this).parent().text();
                                e = e ? e + "+" + a: a
                            }
                        }), d) {
                            var f = {};
                            //$grid.jqGrid("restoreCell", curRow, curCol);
                            for (var g = 0,
                            h = SYSTEM.assistPropGroupInfo.length; h > g; g++) SYSTEM.assistPropGroupInfo[g].skuAssistId === d && (f = SYSTEM.assistPropGroupInfo[g]);
                            var i = function(b) {
                                parent.$.dialog({
                                    width: 470,
                                    height: 400,
                                    title: "\u9009\u62e9\u5546\u54c1\u7684\u5c5e\u6027",
                                    content: "url:/settings/assistingProp-batch.aspx",
                                    data: {
                                        skey: "",
                                        skuClassId: b,
                                        callback: function(b, c) {
                                            for (var d = THISPAGE.curID,
                                            e = THISPAGE.newId,
                                            f = 0,
                                            g = b.length; g > f; f++) {
                                                var h = d || e,
                                                i = b[f];
                                                if (d) {
                                                    $("#" + d).data("storageInfo", null);
                                                    var j = $grid.jqGrid("setRowData", Number(d), {})
                                                } else {
                                                    var j = $grid.jqGrid("addRowData", Number(e), {},
                                                    "last");
                                                    e++
                                                }
                                                var k = $.extend(!0, {},
                                                a);
                                                k.storageName = k.name,
                                                k.quantity = i.qty,
                                                k.skuName = i.skuName,
                                                k.skuId = i.skuId,
                                                k.unitCost = 0,
                                                k.amount = 0,
                                                j && $("#" + h).data("storageInfo", k),
                                                $grid.jqGrid("setRowData", h, k),
                                                curRow && curRow++;
                                                var l = $("#" + d).next();
                                                d = l.length > 0 ? $("#" + d).next().attr("id") : ""
                                            }
                                            "" === d && ($grid.jqGrid("addRowData", e, {},
                                            "last"), THISPAGE.newId = e + 1),
                                            setTimeout(function() {
                                                $grid.jqGrid("editCell", curRow, 2, !0)
                                            },
                                            10),
                                            setGridFooter(),
                                            c.close()
                                        }
                                    },
                                    init: function() {},
                                    lock: !0,
                                    ok: !1,
                                    cancle: !1
                                })
                            };
                            if (f.skuId) i(f.skuId);
                            else {
                                var j = {
                                    skuClassId: 0,
                                    skuName: e,
                                    skuAssistId: d
                                };
                                Public.ajaxGet("/basedata/assistSku.aspx?action=add", j,
                                function(a) {
                                    200 === a.status ? (j.skuId = a.data.skuId, SYSTEM.assistPropGroupInfo.push(j), i(j.skuId)) : Public.tips({
                                        type: 1,
                                        content: a.msg
                                    })
                                })
                            }
                        } else b.data("storageInfo", a)
                    } else b.data("storageInfo", a)
                } else b.data("storageInfo", null)
            }
        }
    }),
    $(".grid-wrap").on("click", ".ui-icon-triangle-1-s",
    function() {
        $(this).siblings(),
        setTimeout(function() {
            gridStoCombo.active = !0,
            gridStoCombo.doQuery()
        },
        10)
    }),*/
    /*$("#tab").find("li").each(function(a) {
        var b = $(this),
        c = $(".manage-wrapper");
        b.click(function() {
            b.addClass("cur").siblings().removeClass("cur"),
            $(c[a]).show().siblings(".manage-wrapper").hide()
        })
    }),*/
    $(document).bind("click.cancel",
    function(a) { ! $(a.target).closest(".ui-jqgrid-bdiv").length > 0 && null !== curRow && null !== curCol && ($("#grid").jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null)
    }),
  /*  $("#createSku").click(function() {
        if (Business.verifyRight("FZSX_ADD")) {
            var b = function() {
                var a = $.trim($("#assistingName").val());
                a && Public.ajaxPost("/basedata/assistType.aspx?action=add", {
                    name: a
                },
                function(a) {
                    200 == a.status ? (defaultPage.Public.tips({
                        content: "\u4fdd\u5b58\u6210\u529f\uff01"
                    }), $("#assistingName").val("").focus(), defaultPage.SYSTEM.assistPropTypeInfo.push(a.data), initSkuField()) : defaultPage.Public.tips({
                        type: 1,
                        content: a.msg
                    })
                })
            },
            c = ['<div class="manage-wrap assisting-manage" id="manage-wrap">', '<form action="#" id="manage-form">', '<ul class="mod-form-rows">', '<li class="row-item">', '<div class="label-wrap fl">', '<label for="assistingName">\u540d\u79f0\uff1a</label>', "</div>", '<div class="ctn-wrap fl">', '<input type="text" id="assistingName" name="assistingName" class="ui-input" value="" />', "</div>", "</li>", "</ul>", "</form>", "<div>"].join("");
            manageDialog = $.dialog({
                title: "\u65b0\u589e\u5206\u7c7b",
                width: 320,
                height: 100,
                content: c,
                min: !1,
                max: !1,
                lock: !1,
                init: function() {
                    $("#assistingName").on("keypress",
                    function(a) {
                        return "13" == a.keyCode ? (a.stopPropagation(), b(), !1) : void 0
                    }).focus()
                },
                ok: function() {
                    return b(),
                    !1
                }
            })
        }
    }),*/
    initValidator(),
    bindEventForEnterKey()/*,
    SYSTEM.enableStorage && (jianxingCombo = $("#jianxing").combo({
        data: [{
            id: "0",
            name: "\u514d\u8d39"
        },
        {
            id: "1",
            name: "\u8d85\u5927\u4ef6"
        },
        {
            id: "2",
            name: "\u8d85\u5927\u4ef6\u534a\u4ef6"
        },
        {
            id: "3",
            name: "\u5927\u4ef6"
        },
        {
            id: "4",
            name: "\u5927\u4ef6\u534a\u4ef6"
        },
        {
            id: "5",
            name: "\u4e2d\u4ef6"
        },
        {
            id: "6",
            name: "\u4e2d\u4ef6\u534a\u4ef6"
        },
        {
            id: "7",
            name: "\u5c0f\u4ef6"
        },
        {
            id: "8",
            name: "\u8d85\u5c0f\u4ef6"
        }],
        value: "id",
        text: "name",
        width: comboWidth,
        defaultSelected: rowData.jianxing || void 0,
        editable: !1
    }).getCombo()),
    $("#itemList").on("click", "input",
    function() {
        var b = $(this),
        c = b.closest("div").find("input:checked");
        c.length >= 5 ? (b.closest("div").find("input").attr("disabled", !0), c.attr("disabled", !1), parent.parent.Public.tips({
            content: "\u8f85\u52a9\u5c5e\u6027\u4e0d\u80fd\u591a\u4e8e5\u4e2a\uff01"
        })) : b.closest("div").find("input").attr("disabled", !1)
    })*/
}
function addStorage() {
    parent.$.dialog({
        title: "新增仓库",
        content: "url:./settings/storage-manage.aspx?type=storage",
        data: {
            oper: "add",
            callback: function(a, b, c) {
                Public.ajaxPost("../basedata/invlocation.aspx?action=list", {},
                function(b) {
                    if (b && 200 == b.status) {
                        var c = b.data.rows;
                        parent.parent.SYSTEM.storageInfo = c
                    } else {
                        var c = [];
                        parent.parent.Public.tips({
                            type: 1,
                            content: "获取仓库信息失败！" + b.msg
                        })
                    }
                    storageCombo.loadData(c, "-1", !1),
                    storageCombo.selectByValue(a.id)
                }),
                c && c.api.close()
            }
        },
        width: 400,
        height: 160,
        max: !1,
        min: !1,
        cache: !1
    })
}
function addUnit() {
    parent.$.dialog({
        title: "新增计量单位",
        content: "url:./settings/storage-manage.aspx?type=unit",
        data: {
            oper: "add",
            callback: function(a, b, c) {
                unitCombo.loadData(getBaseUnit, ["id", a.id]),
                c && c.api.close()
            }
        },
        width: 400,
        height: 1 === siType ? 100 : 230,
        max: !1,
        min: !1,
        cache: !1,
        lock: !1
    })
}
function bindEventForEnterKey() {
    Public.bindEnterSkip($("#base-form"),
    function() {
        $("#grid tr.jqgrow:eq(0) td:eq(0)").trigger("click")
    })
}

function floatCheck(a, b) {
    var c = /^[0-9\.]+$/,
    a = $.trim(a);
    return "quantity" == b ? b = "期初数量" : "unitCost" == b && (b = "单位成本"),
    c.test(a) ? [!0, ""] : "" == a ? [!1, b + "不能为空！（如果不需要该行数据，可以删除行）"] : [!1, "请填写正确的" + b]
}
/*function setGridFooter() {
    for (var b, d, a = $grid.jqGrid("getRowData"), c = 0, e = 0, f = 0; f < a.length; f++) b = a[f],
    b.quantity && (c += parseFloat(b.quantity)),
    b.amount && (e += parseFloat(b.amount));
    c && e && (d = e / c),
    $grid.footerData("set", {
        storageName: "\u5408\u8ba1",
        quantity: c || "&#160",
        amount: e || "&#160"
    })
}*/
function initValidator() {
    var a = /[^\\<\\>\\&\\\\\']+/;
    $form.validator({
        rules: {
            code: [a, "商品编号只能包含<,>,&,,'字符组成"],
            number: function(a) {
                var c = $(a).val();
                try {
                    return c = Number(c),
                    c ? ($(a).val(c), !0) : "字段不合法！请输入数值"
                } catch(d) {
                    return "字段不合法！请输入数值"
                }
            },
            /*checkCode: function(a) {
                var c = $(a).val();
                return $.ajax({
                    type: "POST",
                    url: "../basedata/inventory.aspx?action=checkBarCode",
                    data: {
                        barCode: c
                    },
                    dataType: "json",
                    async: !1,
                    success: function(a) {
                        return a ? (c = -1 == a.status ? rowData && rowData.barCode === c ? !0 : "商品条码已经存在！" : !0, void 0) : !1
                    },
                    error: function() {
                        c = "远程数据校验失败！"
                    }
                }),
                c
            },
            myRemote: function(a, b, c) {
                return c.old.value === a.value || $(a).data("tip") === !1 && a.value.length > 1 ? !0 : $.ajax({
                    url: "/basedata/inventory.aspx?action=getNextNo",
                    type: "post",
                    data: "skey=" + a.value,
                    dataType: "json",
                    success: function(b) {
                        if (b.data && b.data.number) {
                            var c = a.value.length;
                            a.value = b.data.number;
                            var d = a.value.length;
                            if (a.createTextRange) {
                                var e = a.createTextRange();
                                e.moveEnd("character", d),
                                e.moveStart("character", c),
                                e.select()
                            } else a.setSelectionRange(c, d),
                            a.focus();
                            $(a).data("tip", !0)
                        } else $(a).data("tip", !1)
                    }
                })
            },*/
            checkInventory: function(a) {
                var d = $(a).val();
                if ("" !== d) {
                    var e = Number($("#minInventory").val()),
                    f = Number(d);
                    if (e > f) return "最高库存不能小于最低库存"
                }
            }
        },
        messages: {
            required: "\u8bf7\u586b\u5199{0}",
            checkCode: "{0}",
            name: "{0}"
        },
        fields: {
            number: {
                rule: "add" === oper ? "required; code; myRemote": "required; code",
                timely: 3
            },
            name: "required",
            maxInventory: "checkInventory",
            /*barCode: "code;checkCode;",
            length: "number;",
            width: "number;",
            height: "number;",*/
            weight: "number;"
        },
        display: function(a) {
            return $(a).closest(".row-item").find("label").text()
        },
        valid: function() {
            postCustomerData()
        },
        ignore: ":hidden",
        theme: "yellow_bottom",
        timely: 1,
        stopOnError: !0
    })
}
/*function cancleGridEdit() {
    null !== curRow && null !== curCol && ($grid.jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null)
}*/
function resetForm(a) {
    var b = [{},
    {},
    {},
    {}];
    $("#name").val(""),
    $("#specs").val(""),
    $("#purchasePrice").val(""),
    $("#salePrice").val(""),
    $("#wholesalePrice").val(""),
    $("#vipPrice").val(""),
    $("#discountRate1").val(""),
    $("#discountRate2").val(""),
    $("#lowQty").val(""),
    $("#highQty").val(""),
    $("#note").val(""),
    /*$grid.jqGrid("clearGridData", !0).jqGrid("setGridParam", {
        data: b
    }).trigger("reloadGrid"),
    gridStoCombo.collapse(),*/
    $("#number").val(Public.getSuggestNum(a.number)).focus().select(),
    $("#barCode").val(""),
    //jianxingCombo && jianxingCombo.selectByIndex(0),
    $("#length").val(""),
    $("#width").val(""),
    $("#height").val(""),
    $("#weight").val("")
}
function getBaseUnit() {
    var a = {},
    b = [];
    b.push({
        id: 0,
        name: "\uff08\u7a7a\uff09"
    });
    for (var c = 0; c < SYSTEM.unitInfo.length; c++) {
        var d = SYSTEM.unitInfo[c],
        e = d.unitTypeId || c;
        a[e] || (a[e] = []),
        a[e].push(d),
        unitData[d.id] = d
    }
    for (var f in a) {
        var g = a[f];
        if (1 == g.length) b.push(g[0]);
        else for (var c = 0; c < g.length; c++) g[c]["default"] && b.push(g[c])
    }
    return b
}
var curRow, curCol, curArrears, api = frameElement.api,
oper = api.data.oper,
cRowId = api.data.rowId,
rowData = {},
propertysIds = [],
deleteRow = [],
callback = api.data.callback,
defaultPage = Public.getDefaultPage(),
siType = defaultPage.SYSTEM.siType,
categoryTree,
storageCombo,
unitCombo,
//gridStoCombo,
//jianxingCombo,
comboWidth = 147,
//gridWidth = 970,
//$grid = $("#grid"),
//$itemList = $("#itemList"),
$form = $("#manage-form"),
$category = $("#category"),
//$isSerNum = $("#isSerNum"),
//$isWarranty = $("#isWarranty "),
categoryData = {},
unitData = {},
tempAssistPropGroupInfo = {},
SYSTEM = parent.parent.SYSTEM,
qtyPlaces = Number(SYSTEM.qtyPlaces) || 4,
pricePlaces = Number(SYSTEM.pricePlaces) || 4,
amountPlaces = Number(SYSTEM.amountPlaces) || 2,
format = {
    quantity: function(a) {
        var b = parseFloat(a);
        return isNaN(b) ? "&#160;": a
    },
    money: function(a) {
        var a = Public.numToCurrency(a, pricePlaces);
        return a || "&#160;"
    }
},
THISPAGE = {
    newId: 5
},
rights = api.opener.parent.SYSTEM.rights;
initPopBtns(),
init();