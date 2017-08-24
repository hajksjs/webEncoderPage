function callback(a) {
    var b = frameElement.api,
    c = b.data.curID,
    d = b.data.newId,
    e = b.data.callback,
    f = $("#grid").jqGrid("getGridParam", "selarrrow"),
    g = f.length,
    h = oldRow = parent.frames[parent.tab.getSelectedTabItemID()].curRow,
    i = parent.frames[parent.tab.getSelectedTabItemID()].curCol;
    
/*    if (urlParam.byOnlineStore) {
        parent.$("#grid").jqGrid("restoreCell", h, i);
        var j = $("#grid").jqGrid("getRowData", $("#grid").jqGrid("getGridParam", "selrow")),
        k = j.name,
        m = parent.$("#grid").jqGrid("getRowData", Number(c));
        return m = $.extend({},
        m, {
            goods: k,
            invNumber: j.number,
            invName: j.name,
            unitName: j.unitName,
            quantity: 1,
            price: j.salePrice,
            spec: j.spec
        }),
        parent.$("#grid").jqGrid("setRowData", Number(c), m),
        parent.$("#" + c).data("goodsInfo", {
            id: j.id,
            invNumber: j.number,
            invName: j.name,
            unitName: j.unitName,
            quantity: j.quantity,
            spec: j.spec
        }),
        e(c),
        void 0
    }*/
    return g > 0 &&
    (parent.frames[parent.tab.getSelectedTabItemID()].$("#grid").jqGrid("restoreCell", h, i), $.each(f,
    function (b, e) {
        //function(index, value) 
        var f = $("#grid").jqGrid("getRowData", e);
        if ("" === f.spec) var g = f.number + " " + f.name;
        else var g = f.number + " " + f.name + "_" + f.spec;
        if (c) var i = c;
        else var i = d;
        switch (a) {
            /*case "purchase":
                var j = {
                    id: i,
                    goods: g,
                    mainUnit: f.unitName,
                    quantity: 1,
                    price: f.purPrice,
                    discountRate: 0,
                    deduction: 0,
                    amount: f.purPrice,
                    storageName: f.storageName
                };
                if (taxRequiredCheck) {
                    var k = Number(f.purPrice),
                l = parent.taxRequiredInput,
                m = k * l / 100,
                n = k + Number(m);
                    j.taxRate = l,
                j.tax = m,
                j.taxAmount = n
                }
                break;*/
            case "sales":
                var j = {
                    id: i,
                    goods: g,
                    mainUnit: f.unitName,
                    quantity: 1,
                    price: f.salePrice,
                    discountRate: 0,
                    deduction: 0,
                    amount: f.salePrice,
                    storageName: f.storageName
                };
                /*if (taxRequiredCheck) {
                var k = Number(f.salePrice),
                l = taxRequiredInput,
                m = k * l / 100,
                n = k + Number(m);
                j.taxRate = l,
                j.tax = m,
                j.taxAmount = n
                }*/
                break;
            case "otherWarehouse":
                var j = {
                    id: i,
                    goods: g,
                    mainUnit: f.unitName,
                    quantity: 1,
                    price: f.purPrice,
                    amount: f.purPrice,
                    storageName: f.storageName
                };
                break;
            case "transfers":
                var j = {
                    id: i,
                    goods: g,
                    mainUnit: f.unitName,
                    quantity: 1,
                    price: f.salePrice,
                    amount: f.salePrice,
                    outLocationName: f.storageName
                };
                break;
            case "otherOutbound":
                var j = {
                    id: i,
                    goods: g,
                    mainUnit: f.unitName,
                    quantity: 1,
                    outLocationName: f.storageName
                };
                break;
            default:
                var j = {
                    id: i,
                    goods: g,
                    mainUnit: f.unitName,
                    quantity: 1,
                    price: f.salePrice,
                    amount: f.salePrice,
                    storageName: f.storageName
                }
        }
        if (c) { var o = parent.frames[parent.tab.getSelectedTabItemID()].$("#grid").jqGrid("setRowData", Number(c), j); }
        else {
            var o = parent.frames[parent.tab.getSelectedTabItemID()].$("#grid").jqGrid("addRowData", Number(d), j, "last");
            d++;
        }
        o && parent.frames[parent.tab.getSelectedTabItemID()].$("#" + i).data("goodsInfo", {
            id: f.id,
            number: f.number,
            name: f.name,
            spec: f.spec,
            unitId: f.unitId,
            unitName: f.unitName
        }).data("storageInfo", {
            id: f.storageID,
            name: f.storageName
        }),
        h++;
        var p = parent.frames[parent.tab.getSelectedTabItemID()].$("#" + c).next();
        c = p.length > 0 ? parent.frames[parent.tab.getSelectedTabItemID()].$("#" + c).next().attr("id") : ""
    }), e(d, c, h)),
    !1
}
var queryConditions = {
    skey: ""
},
urlParam = Public.urlParam();
//SYSTEM = parent.parent.SYSTEM,
//parent = parent.frames[parent.tab.getSelectedTabItemID()];
//taxRequiredCheck = SYSTEM.taxRequiredCheck;
//taxRequiredInput = SYSTEM.taxRequiredInput;

var THISPAGE = {
    init: function() {
        this.initDom(),
        this.loadGrid(),
        this.initZtree(),
        this.addEvent()
    },
    initDom: function() {
        this.$_matchCon = $("#matchCon"),
        this.$_matchCon.placeholder()
    },
    initZtree: function () {
        zTree = Public.zTree.init($(".grid-wrap"), {
            defaultClass: "ztreeDefault",
            showRoot: !1
        },
        {
            callback: {
                beforeClick: function (e, t) {
                    //alert(JSON.stringify(t));
                    //if (t.parentID!='' )
                    queryConditions.assistId = t.id;
                    $("#search").trigger("click")
                }
            }
        })
    },
    loadGrid: function() {
        function b(a, b, c) {
            var d = '<div class="operating" data-id="' + c.id + '"><a class="ui-icon ui-icon-search" title="\u67e5\u8be2"></a></div>';
            return d
        }
        $(window).height() - $(".grid-wrap").offset().top - 84,
        $("#grid").jqGrid({
            url: "../basedata/inventory.aspx?action=list",
            postData: queryConditions,
            datatype: "json",
            width: 578,
            height: 354,
            altRows: !0,
            gridview: !0,
            colModel: [{
                name: "id",
                label: "id",
                width: 0,
                hidden: !0
            },
            {
                name: "operating",
                label: "\u64cd\u4f5c",
                width: 40,
                fixed: !0,
                formatter: b,
                align: "center"
            },
            {
                name: "number",
                label: "\u5546\u54c1\u7f16\u53f7",
                width: 100,
                sortable: true,
                title: !1
            },
            {
                name: "name",
                label: "\u5546\u54c1\u540d\u79f0",
                
                width: 200,
                classes: "ui-ellipsis"
                
            },
            {
                name: "spec",
                label: "\u89c4\u683c\u578b\u53f7",
                width: 106,
                title: !1
            },
            {
                name: "unitName",
                label: "\u5355\u4f4d",
                width: 60,
                title: !1
            },
            {
                name: "unitId",
                label: "\u5355\u4f4dID",
                width: 0,
                hidden: !0
            },
            {
                name: "salePrice",
                label: "\u9500\u552e\u5355\u4ef7",
                width: 0,
                hidden: !0
            },
            {
                name: "purPrice",
                label: "\u91c7\u8d2d\u5355\u4ef7",
                width: 0,
                hidden: !0
            },
            {
                name: "storageID",
                label: "\u4ed3\u5e93ID",
                width: 0,
                hidden: !0
            },
            {
                name: "storageName",
                label: "\u4ed3\u5e93\u540d\u79f0",
                width: 0,
                hidden: !0
            }],
            cmTemplate: {
                sortable: !1
            },
            multiselect: urlParam.byOnlineStore ? !1 : !0,
            page: 1,
            sortname: "number",
            sortorder: "desc",
            pager: "#page",
            page: 1,
            rowNum: 1e3,
            viewrecords: !0,
            shrinkToFit: !0,
            forceFit: !1,
            jsonReader: {
                root: "data.rows",
                records: "data.records",
                total: "data.total",
                repeatitems: !1,
                id: "id"
            },
            loadError: function() {}
        })
    },
    reloadData: function(a) {
        $("#grid").jqGrid("setGridParam", {
            url: "../basedata/inventory.aspx?action=list",
            datatype: "json",
            postData: a
        }).trigger("reloadGrid")
    },
    addEvent: function() {
        var a = this;
        $(".grid-wrap").on("click", ".ui-icon-search",
        function(a) {
            a.preventDefault();
            var b = $(this).parent().data("id");
            Business.forSearch(b, "")
        }),
        $("#search").click(function() {
            queryConditions.skey = "\u8bf7\u8f93\u5165\u5546\u54c1\u7f16\u53f7\u6216\u540d\u79f0\u6216\u578b\u53f7" === a.$_matchCon.val() ? "": a.$_matchCon.val(),
            THISPAGE.reloadData(queryConditions)
        }),
        $("#refresh").click(function() {
            THISPAGE.reloadData(queryConditions)
        })
    }
};
THISPAGE.init();