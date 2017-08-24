var curRow, curCol, loading, SYSTEM = system = parent.SYSTEM,
billRequiredCheck = system.billRequiredCheck,
requiredMoney = system.requiredMoney,
taxRequiredCheck = system.taxRequiredCheck,
taxRequiredInput = system.taxRequiredInput,
hiddenAmount = !1,
hideCustomerCombo = !1,
hideEmployeeCombo = !1,
urlParam = Public.urlParam(),
quantityPlaces = Number(parent.SYSTEM.quantityPlaces),
pricePlaces = Number(parent.SYSTEM.pricePlaces),
amountPlaces = Number(parent.SYSTEM.amountPlaces),
THISPAGE = {
    init: function (t) {
        if (SYSTEM.isAdmin === !1 && !SYSTEM.rights.AMOUNT_OUTAMOUNT) {
            hiddenAmount = !0;
            $("#amountArea").hide()
        }
        this.loadGrid(t);
        this.initDom(t);
        this.initCombo();
        if (t.id !== '' && t.checked) this.disableEdit();
        else {
            this.editable = !0;
            $("#grid").jqGrid("setGridParam", {
                cellEdit: !0
            })
        }
        this.addEvent();
    },
    initDom: function (t) {
        var e = this;
        this.$_customer = $("#customer");
        //this.$_saleDate = $("#saleDate").val(system.endDate);
        this.$_saleDate = $("#saleDate");
        //alert(SYSTEM.curDate);
        this.$_saleDate.val(SYSTEM.curDate);
        this.$_number = $("#number");
        this.$_classes = $("#classes");
        this.$_note = $("#note");
        this.$_employee = $("#employee");
        this.$_receipt = $("#receipt");
        this.$_payment = $("#payment");
        this.$_rpAmount = $("#rpAmount");
        //this.$_totalArrears = $("#totalArrears");
        //this.$_toolTop = $("#toolTop");
        this.$_toolBottom = $("#toolBottom");
        this.$_paymentTxt = $("#paymentTxt");
        this.$_accountInfo = $("#accountInfo");
        this.$_userName = $("#userName");
        this.customerArrears = 0;

        if ("add" !== t.status || t.customerID) var i = t.customerID; //var i = ["id", t.customerID];
        else var i = 0;
        /**/
        this.customerCombo = Business.customerCombo($("#customer"), {
            defaultSelected: i, emptyOptions: !0
        });

        this.customerCombo.selectByValue(i, !1);

        hideCustomerCombo && this.customerCombo.disable();

        if ("add" !== t.status || t.employeeID) var i = t.employeeID; //var i = ["id", t.employeeID];
        else var i = 0;
        this.employeeCombo = Business.employeeCombo($("#employee"), {
            defaultSelected: i, emptyOptions: !0
        });
        //this.employeeCombo.selectByValue(t.employeeID, !1);
        hideEmployeeCombo && this.employeeCombo.disable();

        this.$_saleDate.datepicker();
        //$("input[name='classes'][value=150602]").attr('checked', true);
        //$('input:radio[name="classes"][value="150602"]').prop('checked', true);
        //$('input:radio[name=class6][value=150603]').click();
        /*自定义界面的radio,假的radio*/
        this.classes = this.$_classes.cssRadio({
            callback: function (t) {
                e.$_paymentTxt.text("150601" === t.find("input").val() ? "本次收款:" : "本次退款:")
            }
        });
        this.classes.setValue(150601 === t.transType ? 0 : 1);

        this.$_note.val(t.note);
        //this.$_employee.val(t.disRate);
        this.$_receipt.val(t.receipt);
        this.$_rpAmount.val(t.rpAmount);
        //this.$_arrears.val(t.arrears);
        if (requiredMoney) {
            $("#accountWrap").show();
            this.accountCombo = Business.accountCombo($("#account"), {
                width: 200,
                height: 300,
                emptyOptions: !0,
                addOptions: {
                    text: "多账户",
                    value: -1
                },
                defaultSelected: ["id", t.accountID],
                callback: {
                    onChange: function () {
                        if (-1 === this.getValue()) e.chooseAccount();
                        else {
                            var t = [];
                            t.push({
                                accountID: this.getValue(),
                                account: "",
                                payment: e.$_payment.val(),
                                wayId: 0,
                                way: "",
                                settlement: ""
                            });
                            e.$_accountInfo.data("accountInfo", t).hide();
                            e.$_payment.removeAttr("disabled").removeClass("ui-input-dis")
                        }
                    }
                }
            })
        } /**/
        var a = '<!--<a id="original" class="ui-btn ui-btn-sc">选择源单</a>--><a id="savaAndAdd" class="ui-btn ui-btn-sp">保存并新增</a><a id="save" class="ui-btn">保存</a>',
        r = '<!--<a id="original" class="ui-btn ui-btn-sc">选择源单</a>--><a id="add" class="ui-btn ui-btn-sp">新增</a><a id="edit" class="ui-btn">保存</a><a href="/scm/invSa.aspx?action=toPdf&id=' + t.id + '" target="_blank" id="print" class="ui-btn">打印</a>',
        n = '<a id="add" class="ui-btn ui-btn-sp">新增</a><a href="/scm/invSa.aspx?action=toPdf&id=' + t.id + '" target="_blank" id="print" class="ui-btn">打印</a>',
        o = "",
        s = "";
        if (billRequiredCheck) {
            o = '<a class="ui-btn" id="audit">审核</a>';
            s = '<a class="ui-btn" id="reAudit">反审核</a>'
        }
        var l = '<a class="ui-btn-prev" id="prev" title="上一张"><b></b></a><a class="ui-btn-next" id="next" title="下一张"><b></b></a>';
        this.btn_add = a;
        this.btn_edit = r;
        this.btn_audit = o;
        this.btn_view = n;
        this.btn_reaudit = s;
        if (t.id !== '') {
            //alert(t.id);
            this.$_number.text(t.number);
            this.$_saleDate.val(Public.parseDate('Y-m-d', String(t.saleDate).replace(/[^0-9]/ig, "") / 1000));
            //this.$_totalArrears.val(t.totalArrears);
            this.$_accountInfo.data("accountInfo", t.accounts);
            if (-1 === t.accountID) {
                this.$_accountInfo.show();
                e.$_payment.attr("disabled", "disabled").addClass("ui-input-dis")
            } /**/
            $("#grid").jqGrid("footerData", "set", {
                quantity: t.totalQty,
                amount: t.totalAmount
            });
            "list" !== urlParam.flag && (l = "");

            if ("edit" === t.status) this.$_toolBottom.html("<span id=groupBtn>" + r + o + "</span>" + l);
            else if ("add" === t.status) this.$_toolBottom.html("<span id=groupBtn>" + a + "</span>" + l)
            //ll
            else if (t.checked) {
                $("#mark").addClass("has-audit");
                this.$_toolBottom.html('<span id="groupBtn">' + n + s + "</span>" + l)
            } else this.$_toolBottom.html('<span id="groupBtn">' + n + "</span>" + l);
            this.idList = parent.cacheList.salesId || [];
            this.idPostion = $.inArray(String(t.id), this.idList);
            this.idLength = this.idList.length;
            0 === this.idPostion && $("#prev").addClass("ui-btn-prev-dis");
            this.idPostion === this.idLength - 1 && $("#next").addClass("ui-btn-next-dis");
            this.$_userName.html(t.userName)
        } else {
            this.$_toolBottom.html(billRequiredCheck ? "<span id=groupBtn>" + a + o + "</span>" : '<span id="groupBtn">' + a + "</span>");
            this.$_userName.html(system.realName || "")
        }
    },
    loadGrid: function (t) {
        function e(t) {
            /*if (taxRequiredCheck) {
            var e = $("#grid").jqGrid("getRowData", t),
            i = parseFloat(e.taxRate);
            if ($.isNumeric(i)) {
            var a = parseFloat(e.amount),
            r = a * i / 100,
            n = a + r;
            $("#grid").jqGrid("setRowData", t, {
            tax: r,
            taxAmount: n
            })
            }
            }*/
        }
        function i(t, e, i) {
            //return t ? t : i.invNumber ? i.invSpec ? i.invNumber + " " + i.invName + "_" + i.invSpec : i.invNumber + " " + i.invName : "&#160;"
            return t ? t : i.number ? i.spec ? i.number + " " + i.name + "_" + i.spec : i.number + " " + i.name : "&#160;"
        }
        function a() {
            var t = $(".goodsAuto")[0];
            return t
        }
        function r(t, e, i) {
            if ("get" === e) {
                if ("" !== $(".goodsAuto").getCombo().getValue()) return $(t).val();
                var a = $(t).parents("tr");
                a.removeData("goodsInfo");
                return ""
            }
            "set" === e && $("input", t).val(i)
        }
        function n() {
            $("#initCombo").append($(".goodsAuto").val("").unbind("focus.once"))
        }
        function o() {
            var t = $(".storageAuto")[0];
            return t
        }
        function s(t, e, i) {
            if ("get" === e) {
                if ("" !== $(".storageAuto").getCombo().getValue()) return $(t).val();
                var a = $(t).parents("tr");
                a.removeData("storageInfo");
                return ""
            }
            "set" === e && $("input", t).val(i)
        }
        function l() {
            $("#initCombo").append($(".storageAuto").val(""))
        }

        function eU() {
            var t = $(".unitAuto")[0];
            return t
        }
        function vU(t, e, i) {
            if ("get" === e) {
                if ("" !== $(".unitAuto").getCombo().getValue()) return $(t).val();
                var a = $(t).parents("tr");
                a.removeData("unitInfo");
                return ""
            }
            "set" === e && $("input", t).val(i)
        }
        function hU() {
            $("#initCombo").append($(".unitAuto").val(""))
        }


        var d = this;
        //alert(t.entries.length);
        if (t.id) {
            var c = 8 - t.entries.length;
            if (c > 0) for (var u = 0; c > u; u++) t.entries.push({})
        }
        //alert(JSON.stringify(t.entries));
        d.newId = 9;
        var p = !1;
        1 === SYSTEM.siType && (p = !0);
        var f = 1190,
        h = [{
            name: "operating",
            label: " ",
            width: 40,
            fixed: !0,
            formatter: Public.billsOper,
            align: "center"
        },
        {
            name: "goods",
            label: "商品",
            width: 300,
            classes: "ui-ellipsis",
            formatter: i,
            editable: !0,
            edittype: "custom",
            editoptions: {
                custom_element: a,
                custom_value: r,
                handle: n,
                trigger: "ui-icon-ellipsis"
            }
        },
        /*{
        name: "mainUnit",
        label: "单位",
        width: 60
        },*/
        {
        name: "unitName",
        label: '单位',
        width: 100,
        editable: !0,
        edittype: "custom",
        editoptions: {
            custom_element: eU,
            custom_value: vU,
            handle: hU,
            trigger: "ui-icon-triangle-1-u"
        }
    },

    /* {
    name: "unitName",
    label: '单位',
    width: 100,
    editable: !0,
    edittype: "select",
    formatter: 'select',
    editoptions: { value: SYSTEM.units }
    },*/
        {
        name: "quantity",
        label: "数量",
        width: 80,
        align: "right",
        formatter: "number",
        formatoptions: {
            decimalPlaces: quantityPlaces
        },
        editable: !0
    },
        {
            name: "price",
            label: "销售单价",
            hidden: hiddenAmount,
            width: 100,
            fixed: !0,
            align: "right",
            formatter: "currency",
            formatoptions: {
                showZero: !0,
                decimalPlaces: pricePlaces
            },
            editable: !0
        },
    /*      {
    name: "employee",
    label: "折扣率(%)",
    hidden: hiddenAmount,
    width: 70,
    fixed: !0,
    align: "right",
    formatter: "integer",
    editable: !0
    },
    {
    name: "receipt",
    label: "折扣额",
    hidden: hiddenAmount,
    width: 70,
    fixed: !0,
    align: "right",
    formatter: "currency",
    formatoptions: {
    showZero: !0,
    decimalPlaces: amountPlaces
    },
    editable: !0
    },*/
        {
        name: "amount",
        label: "销售金额",
        hidden: hiddenAmount,
        width: 100,
        fixed: !0,
        align: "right",
        formatter: "currency",
        formatoptions: {
            showZero: !0,
            decimalPlaces: amountPlaces
        },
        editable: !0
    }];
    this.calAmount = "amount";
    if (taxRequiredCheck) {
        if (hiddenAmount === !1) {
            f = f + 70 + 70 + 100;
            $(".sales").width(f + 2)
        }
        h.pop();
        h.push({
            name: "amount",
            label: "金额",
            hidden: hiddenAmount,
            width: 100,
            fixed: !0,
            align: "right",
            formatter: "currency",
            formatoptions: {
                showZero: !0,
                decimalPlaces: amountPlaces
            },
            editable: !0
        },
            {
                name: "taxRate",
                label: "税率(%)",
                hidden: hiddenAmount,
                width: 70,
                fixed: !0,
                align: "right",
                formatter: "integer",
                editable: !0
            },
            {
                name: "tax",
                label: "税额",
                hidden: hiddenAmount,
                width: 70,
                fixed: !0,
                align: "right",
                formatter: "currency",
                formatoptions: {
                    showZero: !0,
                    decimalPlaces: amountPlaces
                },
                editable: !0
            },
            {
                name: "taxAmount",
                label: "价税合计",
                hidden: hiddenAmount,
                width: 100,
                fixed: !0,
                align: "right",
                formatter: "currency",
                formatoptions: {
                    showZero: !0,
                    decimalPlaces: amountPlaces
                },
                editable: !0
            });
        this.calAmount = "taxAmount"
    }
    h.push({
        name: "storageName",
        label: '仓库<small id="batchStorage">(批量)</small>',
        width: 100,
        editable: !0,
        edittype: "custom",
        editoptions: {
            custom_element: o,
            custom_value: s,
            handle: l,
            trigger: "ui-icon-triangle-1-s"
        }
    },
        {
            name: "note",
            label: "备注",
            width: 150,
            classes: "ui-ellipsis",
            title: !0,
            editable: !0
        }/*,
        {
            name: "srcOrderEntryId",
            label: "源单分录ID",
            width: 0,
            hidden: !0
        },
        {
            name: "srcOrderId",
            label: "源单ID",
            width: 0,
            hidden: !0
        },
        {
            name: "srcOrderNo",
            label: "源单号",
            width: 120,
            fixed: !0,
            hidden: p,
            formatter: function (t) {
                t && (hideCustomerCombo = !0);
                return t || "&#160;"
            }
        }*/);
    $("#grid").jqGrid({
        data: t.entries,
        datatype: "clientSide",
        width: f,
        height: "100%",
        rownumbers: !0,
        gridview: !0,
        onselectrow: !1,
        //onselectrow: !0,
        colModel: h,
        cmTemplate: {
            sortable: !1,
            title: !1
        },
        shrinkToFit: !0,
        forceFit: !0,
        rowNum: 1e3,
        cellEdit: !1,
        cellsubmit: "clientArray",
        localReader: {
            root: "rows",
            records: "records",
            repeatitems: !1,
            id: "id"
        },
        jsonReader: {
            root: "data.entries",
            records: "records",
            repeatitems: !1,
            id: "id"
        },
        loadComplete: function (t) {
            //if (urlParam.id > 0) {
            if (urlParam.id) {
                var e = t.rows,
                    i = e.length;
                d.newId = i + 1;
                for (var a = 0; i > a; a++) {
                    var r = a + 1,
                        n = e[a];
                    if ($.isEmptyObject(e[a])) break;
                    $("#" + r).data("goodsInfo", {
                        /*id: n.goodsid,
                        number: n.invNumber,
                        name: n.invName,
                        spec: n.invSpec,
                        unitId: n.unitId,
                        unitName: n.mainUnit*/
                        id: n.goodsID,
                        number: n.number,
                        name: n.name,
                        spec: n.spec/*,
                        unitId: n.unitId,
                        unitName: n.mainUnit*/
                    }).data("storageInfo", {
                        id: n.storageID,
                        name: n.storageName
                    }).data("unitInfo", {
                        id: n.unitID,
                        name: n.unitName
                    })
                }
            }
        },
        gridComplete: function () { },
        afterEditCell: function (t, e, i, a) {
            if ("goods" === e) {
                $("#" + a + "_goods", "#grid").val(i);
                THISPAGE.goodsCombo.selectByText(i);
                THISPAGE.curID = t
            }
            "storageName" === e && $("#" + a + "_storageName", "#grid").val(i)
            "unitName" === e && $("#" + a + "_unitName", "#grid").val(i)
        },
        formatCell: function () { },
        beforeSubmitCell: function () { },
        afterSaveCell: function (t, i, a, r, n) {
            switch (i) {
                case "goods":
                    var o = $("#" + t).data("goodsInfo");
                    if (o) {
                        var s = o.salePrice,
                        l = {
                            mainUnit: o.unitName,
                            quantity: 1,
                            price: o.salePrice,
                            employee: 0,
                            receipt: 0,
                            amount: o.salePrice,
                            storageName: o.storageName
                        };
                        if (taxRequiredCheck) {
                            var d = taxRequiredInput,
                            c = s * d / 100,
                            u = s + c;
                            l.taxRate = d;
                            l.tax = c;
                            l.taxAmount = u
                        }
                        var p = $("#grid").jqGrid("setRowData", t, l);
                        p && THISPAGE.calTotal()
                    }
                    break;
                case "quantity":
                    var a = parseFloat(a),
                    f = parseFloat($("#grid").jqGrid("getCell", t, n + 1)),
                    h = parseFloat($("#grid").jqGrid("getCell", t, n + 2));
                    if ($.isNumeric(f)) if ($.isNumeric(h)) var m = a * f * h / 100,
                    s = a * f - m,
                    p = $("#grid").jqGrid("setRowData", t, {
                        //receipt: m,
                        amount: s
                    });
                    else var p = $("#grid").jqGrid("setRowData", t, {
                        amount: a * f
                    });
                    e(t);
                    p && THISPAGE.calTotal();
                    break;
                case "price":
                    var a = parseFloat(a),
                    g = parseFloat($("#grid").jqGrid("getCell", t, n - 1)),
                    h = parseFloat($("#grid").jqGrid("getCell", t, n + 1));
                    if ($.isNumeric(g)) if ($.isNumeric(h)) var m = a * g * h / 100,
                    s = a * g - m,
                    p = $("#grid").jqGrid("setRowData", t, {
                        receipt: m,
                        amount: s
                    });
                    else var p = $("#grid").jqGrid("setRowData", t, {
                        amount: a * g
                    });
                    e(t);
                    p && THISPAGE.calTotal();
                    break;
                case "employee":
                    var a = parseFloat(a),
                    g = parseFloat($("#grid").jqGrid("getCell", t, n - 2)),
                    f = parseFloat($("#grid").jqGrid("getCell", t, n - 1));
                    if ($.isNumeric(g) && $.isNumeric(f)) var b = g * f,
                    m = b * a / 100,
                    s = b - m,
                    p = $("#grid").jqGrid("setRowData", t, {
                        receipt: m,
                        amount: s
                    });
                    e(t);
                    p && THISPAGE.calTotal();
                    break;
                case "receipt":
                    var a = parseFloat(a),
                    g = parseFloat($("#grid").jqGrid("getCell", t, n - 3)),
                    f = parseFloat($("#grid").jqGrid("getCell", t, n - 2));
                    if ($.isNumeric(g) && $.isNumeric(f)) var b = g * f,
                    s = b - a,
                    h = (100 * a / b).toFixed(amountPlaces),
                    p = $("#grid").jqGrid("setRowData", t, {
                        amount: s
                    });
                    e(t);
                    p && THISPAGE.calTotal();
                    break;
                case "amount":
                    e(t);
                    THISPAGE.calTotal();
                    break;
                case "taxRate":
                    var v = a,
                    a = parseFloat(a),
                    D = $("#grid").jqGrid("getRowData", t),
                    s = parseFloat(D.amount);
                    if ($.isNumeric(a)) {
                        var c = s * a / 100,
                        u = s + c,
                        p = $("#grid").jqGrid("setRowData", t, {
                            tax: c,
                            taxAmount: u
                        });
                        p && THISPAGE.calTotal();
                        break
                    }
                    if ("" === v) {
                        var p = $("#grid").jqGrid("setRowData", t, {
                            tax: "",
                            taxAmount: s
                        });
                        p && THISPAGE.calTotal();
                        break
                    }
                case "tax":
                    var a = parseFloat(a),
                    D = $("#grid").jqGrid("getRowData", t);
                    if ($.isNumeric(a)) {
                        var s = parseFloat(D.amount),
                        u = s + a,
                        p = $("#grid").jqGrid("setRowData", t, {
                            taxAmount: u
                        });
                        p && THISPAGE.calTotal()
                    }
                    break;
                case "taxAmount":
                    var a = parseFloat(a),
                    D = $("#grid").jqGrid("getRowData", t);
                    if ($.isNumeric(a)) {
                        var m = parseFloat(D.receipt),
                        d = parseFloat(D.taxRate) / 100,
                        y = parseFloat(D.quantity),
                        f = (a + m) / (1 + d) / y,
                        s = a / (1 + d),
                        c = a - s,
                        p = $("#grid").jqGrid("setRowData", t, {
                            price: f,
                            amount: s,
                            tax: c
                        });
                        p && THISPAGE.calTotal()
                    }
            }
        },
        loadonce: !0,
        footerrow: !0,
        userData: {
            goods: "合计：",
            quantity: t.totalQty,
            discount: t.totalDiscount,
            amount: t.totalAmount,
            tax: t.totalTax,
            taxAmount: t.totalTaxAmount
        },
        userDataOnFooter: !0,
        loadError: function (t, e) {
            Public.tips({
                type: 1,
                content: "Type: " + e + "; Response: " + t.status + " " + t.statusText
            })
        }
    })
},
reloadData: function (t) {
    function e() {
        i.customerCombo.selectByValue(t.customerID, !1);
        //i.customerCombo.selectByValue(t.customerID, '');
        //i.$_saleDate.val(t.saleDate);
        i.$_saleDate.val(Public.parseDate('Y-m-d', t.saleDate.replace(/[^0-9]/ig, "") / 1000));
        i.$_number.text(t.number);
        //i.classes.setValue(150601 === t.transType ? 0 : 1);
        i.$_note.val(t.note);
        i.$_employee.val(t.employeeID, 0);
        i.$_receipt.val(t.receipt);
        i.$_rpAmount.val(t.rpAmount);
        i.accountCombo.selectByValue(t.accountID, !1);
        i.$_accountInfo.data("accountInfo", t.accounts); -1 === t.accountID ? i.$_accountInfo.show() : i.$_accountInfo.hide();
        //i.$_arrears.val(t.arrears);
        //i.$_totalArrears.val(t.totalArrears);
        i.$_userName.html(t.userName)
    }
    $("#grid").clearGridData();
    var i = this;
    originalData = t;
    var a = 8 - t.entries.length;
    //alert(JSON.stringify(t.entries));
    if (a > 0) for (var r = 0; a > r; r++) t.entries.push({});
    //alert(JSON.stringify(t.entries));
    $("#grid").jqGrid("setGridParam", {
        data: t.entries,
        userData: {
        /*quantity: t.totalQty,
        discount: t.totalDiscount,
        amount: t.totalAmount,
        tax: t.totalTax,
        taxAmount: t.totalTaxAmount*/
    }
}).trigger("reloadGrid");
e();
if ("edit" === t.status) {
    if (!this.editable) {
        i.enableEdit();
        $("#groupBtn").html(i.btn_edit + i.btn_audit);
        $("#mark").removeClass("has-audit")
    }
} else if (this.editable) {
    i.disableEdit();
    $("#groupBtn").html(i.btn_view + i.btn_reaudit);
    $("#mark").addClass("has-audit")
}
},
initCombo: function () {
    this.goodsCombo = Business.goodsCombo($(".goodsAuto"));
    //Business.storageCombo($(".storageAuto"));
    Business.storageCombo($(".storageAuto"), {
        defaultSelected: 0,
        forceSelection: !0
    });
    //Business.unitCombo($(".unitAuto"));
    Business.unitCombo($(".unitAuto"), {
        defaultSelected: 0,
        forceSelection: !1
    });
},
disableEdit: function () {
    this.customerCombo.disable();
    this.$_saleDate.attr("disabled", "disabled").addClass("ui-input-dis");
    this.$_note.attr("disabled", "disabled").addClass("ui-input-dis");
    //this.$_employee.attr("disabled", "disabled").addClass("ui-input-dis");
    this.employeeCombo.disable();
    this.$_receipt.attr("disabled", "disabled").addClass("ui-input-dis");
    this.$_payment.attr("disabled", "disabled").addClass("ui-input-dis");
    this.accountCombo.disable();
    $("#grid").jqGrid("setGridParam", {
        cellEdit: !1
    });
    this.editable = !1
},
enableEdit: function () {
    !hideCustomerCombo && this.customerCombo.enable();
    this.$_saleDate.removeAttr("disabled").removeClass("ui-input-dis");
    this.$_note.removeAttr("disabled").removeClass("ui-input-dis");
    this.$_employee.removeAttr("disabled").removeClass("ui-input-dis");
    this.$_receipt.removeAttr("disabled").removeClass("ui-input-dis");
    this.$_payment.removeAttr("disabled").removeClass("ui-input-dis");
    this.accountCombo.enable();
    $("#grid").jqGrid("setGridParam", {
        cellEdit: !0
    });
    this.editable = !0
},
chooseAccount: function (t) {
    var e = this;
    e.$_accountInfo.show();
    e.$_payment.attr("disabled", "disabled").addClass("ui-input-dis");
    $.dialog({
        width: 670,
        height: 250,
        title: "多账户结算",
        content: "url:/settings/choose-account.aspx",
        data: {
            accountInfo: t,
            type: "purchase"
        },
        lock: !0,
        ok: function () {
            var t = this.content.callback();
            if (!t) return !1;
            e.$_payment.val(t.payment).trigger("keyup");
            e.$_accountInfo.data("accountInfo", t.accounts);
            e.accountCombo.blur()
        },
        cancel: !0
    })
},
addEvent: function () {
    var t = this;
    this.customerCombo.input.enterKey();
    this.employeeCombo.input.enterKey();
    this.$_saleDate.bind("keydown",
        function (t) {
            13 === t.which && $("#grid").jqGrid("editCell", 1, 2, !0)
        }).bind("focus",
        function () {
            t.dateValue = $(this).val()
        }).bind("blur",
        function () {
            var e = /((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/;
            if (!e.test($(this).val())) {
                parent.Public.tips({
                    type: 2,
                    content: "日期格式有误！如：2012-08-08。"
                });
                $(this).val(t.dateValue)
            }
        });
    this.$_note.enterKey();
    //this.$_discount.enterKey();
    //this.$_employee.enterKey();
    $(".grid-wrap").on("click", ".ui-icon-triangle-1-s",
        function () {
            setTimeout(function () {
                $(".storageAuto").trigger("click")
            },
            100)
        });

    $(".grid-wrap").on("click", ".ui-icon-triangle-1-u",
        function () {
            setTimeout(function () {
                $(".unitAuto").trigger("click")
            },
            100)
        });

    Business.billsEvent(t, "sales");
    /*this.$_receipt.keyup(function () {
    var e = Number($(this).val()),
    i = Number($("#grid").jqGrid("footerData", "get")[t.calAmount].replace(/,/g, "")),
    a = (i - e).toFixed(amountPlaces);
    if (i) {
    var r = e / i * 100,
    n = a - Number($.trim(t.$_payment.val()));
    THISPAGE.$_employee.val(r.toFixed(amountPlaces));
    THISPAGE.$_discount.val(a);
    THISPAGE.$_arrears.val(n)
    }
    }).on("keypress",
    function (t) {
    Public.numerical(t)
    }).on("click",
    function () {
    this.select()
    });
    this.$_employee.keyup(function () {
    var e = Number($(this).val()),
    i = Number($("#grid").jqGrid("footerData", "get")[t.calAmount].replace(/,/g, "")),
    a = i * (e / 100),
    r = a.toFixed(amountPlaces),
    n = (i - r).toFixed(amountPlaces),
    o = n - Number($.trim(t.$_payment.val()));
    THISPAGE.$_receipt.val(r);
    THISPAGE.$_discount.val(n);
    THISPAGE.$_arrears.val(o)
    }).on("keypress",
    function (t) {
    Public.numerical(t)
    }).on("click",
    function () {
    this.select()
    });
    this.$_payment.keyup(function () {
    var e = $(this).val() || 0,
    i = t.$_discount.val(),
    a = Number(parseFloat(i) - parseFloat(e)),
    r = Number(a + THISPAGE.customerArrears);
    THISPAGE.$_arrears.val(a.toFixed(amountPlaces));
    THISPAGE.$_totalArrears.val(r.toFixed(amountPlaces));
    var n = t.$_accountInfo.data("accountInfo");
    n && 1 === n.length && (n[0].payment = e)
    }).on("keypress",
    function (t) {
    Public.numerical(t)
    }).on("click",
    function () {
    this.select()
    });*/
    $(".wrapper").on("click", "#save",
        function (e) {

            e.preventDefault();
            var i = THISPAGE.getPostData();
            //alert(JSON.stringify(i));

            if (i) {
                if ("edit" === originalData.stata) {
                    i.id = originalData.id;
                    i.stata = "edit"
                }

                Public.ajaxPost("../scm/invSa.aspx?action=add", {

                    postData: '[' + JSON.stringify(i) + ']'
                },
                function (e) {
                    if (200 === e.status) {
                        originalData.id = e.data.id;
                        t.$_toolBottom.html(billRequiredCheck ? '<span id="groupBtn">' + t.btn_edit + t.btn_audit + "</span>" : '<span id="groupBtn">' + t.btn_edit + "</span>");
                        parent.Public.tips({
                            content: "保存成功！"
                        })
                    } else parent.Public.tips({
                        type: 1,
                        content: e.msg
                    })
                })
            }
        });
    $(".wrapper").on("click", "#edit",
        function (t) {
            t.preventDefault();
            if (Business.verifyRight("SA_UPDATE")) {
                var e = THISPAGE.getPostData();
                //alert(JSON.stringify(e));
                e && Public.ajaxPost("../scm/invSa.aspx?action=update", {
                    postData: '[' + JSON.stringify(e) + ']'//JSON.stringify(e)
                },
                function (t) {
                    if (200 === t.status) {
                        originalData.id = t.data.id;
                        parent.Public.tips({
                            content: "修改成功！"
                        })
                    } else parent.Public.tips({
                        type: 1,
                        content: t.msg
                    })
                })
            }
        });
    $(".wrapper").on("click", "#audit",
        function (e) {
            e.preventDefault();
            if (Business.verifyRight("SA_CHECK")) {
                var i = THISPAGE.getPostData();
                i && Public.ajaxPost("../scm/invSa.aspx?action=check", {
                    postData: JSON.stringify(i)
                },
                function (e) {
                    if (200 === e.status) {
                        originalData.id = e.data.id;
                        $("#mark").addClass("has-audit");
                        $("#edit").hide();
                        t.disableEdit();
                        $("#groupBtn").html(t.btn_view + t.btn_reaudit);
                        parent.Public.tips({
                            content: "审核成功！"
                        })
                    } else parent.Public.tips({
                        type: 1,
                        content: e.msg
                    })
                })
            }
        });
    $(".wrapper").on("click", "#reAudit",
        function (e) {
            e.preventDefault();
            if (Business.verifyRight("SA_UNCHECK")) {
                var i = THISPAGE.getPostData();
                i && Public.ajaxPost("/scm/invSa.aspx?action=revsCheckInvSa", {
                    postData: JSON.stringify(i)
                },
                function (e) {
                    if (200 === e.status) {
                        $("#mark").removeClass();
                        $("#edit").show();
                        t.enableEdit();
                        $("#groupBtn").html(t.btn_edit + t.btn_audit);
                        parent.Public.tips({
                            content: "反审核成功！"
                        })
                    } else parent.Public.tips({
                        type: 1,
                        content: e.msg
                    })
                })
            }
        });
    $(".wrapper").on("click", "#savaAndAdd",
        function (e) {
            e.preventDefault();
            var i = THISPAGE.getPostData();
            i && Public.ajaxPost("../scm/invSa.aspx?action=addNew", {
                postData: JSON.stringify(i)
            },
            function (e) {
                if (200 === e.status) {
                    t.$_number.text(e.data.number);
                    $("#grid").clearGridData();
                    $("#grid").clearGridData(!0);
                    for (var i = 1; 8 >= i; i++) $("#grid").jqGrid("addRowData", i, {});
                    t.newId = 9;
                    t.$_note.val("");
                    //t.$_employee.val(originalData.employee);
                    t.$_receipt.val(originalData.receipt);
                    //t.$_amount.val(originalData.amount);
                    t.$_rpAmount.val(originalData.rpAmount);
                    t.$_arrears.val(originalData.arrears);
                    t.accountCombo.selectByValue(0, !0);
                    parent.Public.tips({
                        content: "保存成功！"
                    })
                } else parent.Public.tips({
                    type: 1,
                    content: e.msg
                })
            })
        });
    $(".wrapper").on("click", "#add",
        function (t) {
            t.preventDefault();
            Business.verifyRight("SA_ADD") && parent.tab.overrideSelectedTabItem({
                tabid: "sales-sales",
                text: "销售单",
                url: "./scm/invSa.aspx?action=initSale"
            })
        });
    $(".wrapper").on("click", "#print",
        function (t) {
            t.preventDefault();
            Business.verifyRight("SA_PRINT") && Public.print({
                title: "销货单列表",
                $grid: $("#grid"),
                pdf: "/scm/invSa.aspx?action=toPdf",
                saleType: 10201,
                filterConditions: {
                    id: originalData.id
                }
            })
        });
    $(".wrapper").on("click", "#original",
        function (t) {
            t.preventDefault();
            //if (originalData.customerID <= 0) {
            if (originalData.customerID == 0) {
                parent.Public.tips({
                    type: 1,
                    content: "请先选择销货单位！"
                });
                return !1
            }
            var e = $("#grid");
            $.dialog({
                width: 765,
                height: 510,
                title: "选择源单",
                content: "url:/scm/receipt.aspx?action=initUnhxList",
                data: {
                    url: "/scm/invSa.aspx?action=findUnhxList&customerID=" + originalData.customerID + "&id=" + originalData.id
                },
                lock: !0,
                ok: function () {
                    setFilter(this.content, e)
                },
                cancel: !0
            })
        });
    this.$_accountInfo.click(function () {
        var e = $(this).data("accountInfo");
        t.chooseAccount(e)
    });
    $("#prev").click(function (e) {
        e.preventDefault();
        if ($(this).hasClass("ui-btn-prev-dis")) {
            parent.Public.tips({
                type: 2,
                content: "已经没有上一张了！"
            });
            return !1
        }
        t.idPostion = t.idPostion - 1;
        0 === t.idPostion && $(this).addClass("ui-btn-prev-dis");
        loading = $.dialog.tips("数据加载中...", 1e3, "loading.gif", !0);
        Public.ajaxGet("../scm/invSa.aspx?action=get", {
            id: t.idList[t.idPostion]
        },
            function (t) {
                THISPAGE.reloadData(t.data);
                $("#next").removeClass("ui-btn-next-dis");
                loading && loading.close()
            })
    });
    $("#next").click(function (e) {
        e.preventDefault();
        if ($(this).hasClass("ui-btn-next-dis")) {
            parent.Public.tips({
                type: 2,
                content: "已经没有下一张了！"
            });
            return !1
        }
        t.idPostion = t.idPostion + 1;
        t.idLength === t.idPostion + 1 && $(this).addClass("ui-btn-next-dis");
        loading = $.dialog.tips("数据加载中...", 1e3, "loading.gif", !0);
        Public.ajaxGet("../scm/invSa.aspx?action=get", {
            id: t.idList[t.idPostion]
        },
            function (t) {
                THISPAGE.reloadData(t.data);
                $("#prev").removeClass("ui-btn-prev-dis");
                loading && loading.close()
            })
    })
},
resetData: function () {
    var t = this;
    $("#grid").clearGridData();
    for (var e = 1; 8 >= e; e++) {
        $("#grid").jqGrid("addRowData", e, {});
        $("#grid").jqGrid("footerData", "set", {
            quantity: 0,
            amount: 0
        })
    }
    t.$_note.val("");
    t.$_employee.val(originalData.employee);
    t.$_receipt.val(originalData.receipt);
    //t.$_discount.val(originalData.discount);
    t.$_rpAmount.val(originalData.rpAmount);
    //t.$_arrears.val(originalData.arrears)
},
calTotal: function () {
    for (var t = $("#grid").jqGrid("getDataIDs"), e = 0, i = 0, a = 0, r = 0, n = 0, o = 0, s = t.length; s > o; o++) {
        var l = t[o],
            d = $("#grid").jqGrid("getRowData", l);
        d.quantity && (e += parseFloat(d.quantity));
        //d.receipt && (i += parseFloat(d.receipt));
        d.amount && (a += parseFloat(d.amount));
        //d.tax && (r += parseFloat(d.tax));
        //d.taxAmount && (n += parseFloat(d.taxAmount))
    }
    $("#grid").jqGrid("footerData", "set", {
        quantity: e,
        //receipt: i,
        amount: a
        //tax: r,
        //taxAmount: n
    });
    //if (taxRequiredCheck) var c = (n - Number(this.$_receipt.val())).toFixed(2);
    //else var c = (a - Number(this.$_receipt.val())).toFixed(2);
    //var u = (c - Number(this.$_payment.val())).toFixed(2);
    //this.$_discount.val(c);
    //this.$_arrears.val(u)
},
_getEntriesData: function () {
    //var  strtmp = "";

    for (var t = [], e = $("#grid").jqGrid("getDataIDs"), i = 0, a = e.length; a > i; i++) {
        var r, n = e[i],
            o = $("#grid").jqGrid("getRowData", n);
        //strtmp =strtmp+JSON.stringify(o);
        if ("" !== o.goods && "" !== o.storageName) {
            var s = $("#" + n).data("goodsInfo"),
                l = $("#" + n).data("storageInfo"), u = $("#" + n).data("unitInfo");
            r = {
                id: e[i],
                goodsid: s.id,
                number: s.number,
                name: s.name,
                spec: s.spec,
                quantity: o.quantity,
                price: o.price,
                amount: o.amount,
                //unitID: o.unitName,
                unitID: u.id == null ? 0 : u.id,
                unitName: u.name ? u.name : '',
                //$("#"+n+"_unitName").val(),  
                storageID: l.id,
                storageName: l.name,
                note: o.note,
                srcOrderEntryId: o.srcOrderEntryId,
                srcOrderId: o.srcOrderId,
                srcOrderNo: o.srcOrderNo
            };
            if (taxRequiredCheck) {
                r.taxRate = o.taxRate;
                r.tax = o.tax;
                r.taxAmount = o.taxAmount
            }
            t.push(r)
        }
    }
    //alert(strtmp);
    return t
},
getPostData: function () {
    var t = this;
    if (null !== curRow && null !== curCol) {
        $("#grid").jqGrid("saveCell", curRow, curCol);
        curRow = null;
        curCol = null
    }
    var e = t.customerCombo.getValue();
    if ("" === e || 0 === e) {
        parent.Public.tips({
            type: 2,
            content: "销货单位不能为空！"
        });
        return !1
    }
    /*try {
    var i = this._getEntriesData();
    } catch (e) {
    parent.Public.tips({
    type: 2,
    content: e.message
    });
    }*/
    var i = this._getEntriesData();
    if (i.length > 0) {

        var a = {
            id: originalData.id,
            //customerID: e,
            customerID: t.customerCombo.getValue(), //t.customerCombo.getText(),
            saleDate: $.trim(t.$_saleDate.val()),
            number: $.trim(t.$_number.text()),
            transType: t.classes.getValue(),
            entries: i,
            totalQty: $("#grid").jqGrid("footerData", "get").quantity.replace(/,/g, ""),
            //totalDiscount: $("#grid").jqGrid("footerData", "get").receipt.replace(/,/g, ""),
            totalAmount: $("#grid").jqGrid("footerData", "get").amount.replace(/,/g, ""),
            note: $.trim(t.$_note.val()),
            employeeID: t.employeeCombo.getValue(),
            //employee: $.trim(t.$_employee.val()),
            receipt: $.trim(t.$_receipt.val()),
            //discount: $.trim(t.$_discount.val()),
            rpAmount: $.trim(t.$_rpAmount.val()),
            payment: $.trim(t.$_payment.val()),
            totalArrears: ""
        };
        /*if (taxRequiredCheck) {
        a.totalTax = $("#grid").jqGrid("footerData", "get").tax.replace(/,/g, "");
        a.totalTaxAmount = $("#grid").jqGrid("footerData", "get").taxAmount.replace(/,/g, "")
        }
        if (requiredMoney) {
        a.accountID = t.accountCombo.getValue();
        a.accounts = t.$_accountInfo.data("accountInfo");
        if (0 !== Number(a.rpAmount) && 0 === a.accountID) {
        parent.Public.tips({
        type: 1,
        content: "请选择结算账户！"
        });
        return !1
        }
        if (0 === Number(a.rpAmount) && 0 !== a.accountID) {
        parent.Public.tips({
        type: 1,
        content: "结算账户不为空时，需要输入收款额！！"
        });
        return !1
        }
        if (-1 === a.accountID && !a.accounts) {
        parent.Public.tips({
        type: 1,
        content: "请检查账户信息是否正确！"
        });
        return !1
        }
        }*/
        return a
    }
    parent.Public.tips({
        type: 2,
        content: "商品信息和仓库信息不能为空！"
    });
    $("#grid").jqGrid("editCell", 1, 2, !0);
    return !1
}
},
hasLoaded = !1,
originalData;
if (urlParam.id) {
    if (!hasLoaded) {
        var $_sales = $(".sales").hide();
        Public.ajaxGet("../scm/invSa.aspx?action=get", {
            id: urlParam.id
        },
        function (t) {
            if (200 === t.status) {
                originalData = t.data;
                originalData.id = t.data.id;
                originalData.orderId = t.data.id;
                originalData.orderNo = t.data.number;
                //originalData.status = "add";
                originalData.status = "edit";
                //alert(JSON.stringify(t.data));
                //alert(JSON.stringify(t.data.entries));
                THISPAGE.init(t.data);
                $_sales.show();
                hasLoaded = !0
            } else parent.Public.tips({
                type: 1,
                content: t.msg
            })
        })
    }
} else {
    originalData = {
        id: '',
        status: "add",
        customerID: 0,
        employeeID: 0,
        transType: 150601,
        entries: [{
            id: "1"//,mainUnit: null
        },
        {
            id: "2"
        },
        {
            id: "3"
        },
        {
            id: "4"
        },
        {
            id: "5"
        },
        {
            id: "6"
        },
        {
            id: "7"
        },
        {
            id: "8"
        }],
        note: "",
        totalQty: 0,
        totalDiscount: 0,
        totalAmount: 0,
        totalTax: 0,
        totalTaxAmount: 0,
        disRate: 0,
        receipt: "",
        amount: "0.00",
        rpAmount: "0.00",
        arrears: "0.00",
        accountID: 0
    };
    THISPAGE.init(originalData)
}