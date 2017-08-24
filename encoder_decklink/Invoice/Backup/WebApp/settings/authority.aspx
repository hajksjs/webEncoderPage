<%@ Page Language="C#" AutoEventWireup="true"  Inherits="authority,WebApp" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=1280, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<title>在线进销存</title>

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
</head>

<body>
<div class="wrapper">
  <div class="mod-toolbar-top cf">
    <div class="fl"><h3 class="f14">详细权限设置<span class="fwn">（请为 <b id="userName"></b> 分配的权限）</span></h3></div>
    <div class="fr"><a class="ui-btn ui-btn-sp mrb" id="save">确定</a><a class="ui-btn" href="authority.aspx">返回</a></div>
  </div>
<table>
<tr><td valign="top">
      <div class="grid-wrap">
        <table id="usergrid">
        </table>
        <div id="page"></div>
      </div>
 </td><td valign="top">
        <div class="grid-wrap mb10" id="acGridWrap">
          <table id="grid">
          </table>
        </div>
</td></tr>    
</table>
</div>

<script>
    var urlParam = Public.urlParam(), userName = urlParam.userName, curGroup, lastSel, RelationalMapping = {}; //Rowid与名字的映射
    var height = Public.setGrid().h;
        var $grid = $('#grid');
        $("#grid").jqGrid({
            //url: './authority.aspx?action=getUserRightEx&userName=' + userName,
            datatype: "json",
            //caption: "科目余额表",
            //autowidth: true, //如果为ture时，则当表格在首次被创建时会根据父元素比例重新调整表格宽度。如果父元素宽度改变，为了使表格宽度能够自动调整则需要实现函数：setGridWidth
            width: 800,
            height: height,
            altRows: true, //设置隔行显示
            //rownumbers: true,//如果为ture则会在表格左边新增一列，显示行顺序号，从1开始递增。此列名为'rn'
            //gridview: true,
            colNames: ['<input type="checkbox" id="all" class="vm">', '功能类别', '', '功能', '查看', '添加', '编辑', '删除', '审核', '<label for="all">打印</label>'],
            colModel: [
	  	  { name: 'category', width: 40, align: "center", formatter: groupFmatter },
		  { name: 'categoryName', width: 100, formatter: moduleFmatter },
		  { name: 'name', label: "name", width: 0, hidden: !0 },
          { name: 'caption', width: 150, align: "center" },
		  { name: 'rightQ', width: 50, align: "center", formatter: rightFmatter },
          { name: 'rightA', width: 50, align: "center", formatter: rightFmatter },
          { name: 'rightE', width: 50, align: "center", formatter: rightFmatter },
          { name: 'rightD', width: 50, align: "center", formatter: rightFmatter },
          { name: 'rightC', width: 50, align: "center", formatter: rightFmatter },
          { name: 'rightP', width: 50, align: "center", formatter: rightFmatter }
	  ],
            cmTemplate: { sortable: false, title: false },
            //idPrefix: 'ys',
            //loadui: 'block',
            //multiselect: true,
            //multiboxonly: true,
            page: 1,
            //sortname: 'number',
            //sortorder: "desc",
            pager: "#page",
            rowNum: 2000,
            rowList: [300, 500, 1000],
            scroll: 1, //创建一个动态滚动的表格，当为true时，翻页栏被禁用，使用垂直滚动条加载数据，且在首次访问服务器端时将加载所有数据到客户端。当此参数为数字时，表格只控制可见的几行，所有数据都在这几行中加载
            loadonce: false,
            viewrecords: true,
            shrinkToFit: false,
            forceFit: false,
            jsonReader: {
                //root: "data.items",
                root: "data",
                //records: "data.totalsize",
                repeatitems: false,
                id: -1
            },
            afterInsertRow: function (rowid, rowdata, rowelem) {

            },
            loadComplete: function (data) {
                //alert(JSON.stringify(data));
                $('.group').each(function (index, element) {
                    var groupId = $(this).attr('id');
                    var $_ckbox = $('.ckbox[data-for=' + groupId + ']');
                    if ($_ckbox.length === $_ckbox.filter(':checked').length) {
                        this.checked = true;
                    };
                });
            },
            loadError: function (xhr, st, err) {

            }
        });

    function getPostData() {
        for (var t = [], e = $("#grid").jqGrid("getDataIDs"), i = 0, a = e.length; a > i; i++) {
            var r, n = e[i], checkboxs = $("#" + n).find(".ckbox"), items = [];
            var o = $("#grid").jqGrid("getRowData", n);
            if (checkboxs[0].checked) items.push('Q');
            if (checkboxs[1].checked) items.push('A');
            if (checkboxs[2].checked) items.push('E');
            if (checkboxs[3].checked) items.push('D');
            if (checkboxs[4].checked) items.push('C');
            if (checkboxs[5].checked) items.push('P');
                r = {
                    name: o.name,
                    rights: items.join(',')
                };
                t.push(r)
        }
        return t
    };

    function groupFmatter(val, opt, row) {
        if (curGroup !== val) {
            return '<input class="group" type="checkbox" id="' + val + '">';
        } else {
            return '';
        };
    };
    function moduleFmatter(val, opt, row) {
        fillMap(val, opt, row); //缓存映射关系
        if (curGroup !== row.category) {
            curGroup = row.category;
            return val;
        } else {
            return '';
        };
    };

    function rightFmatter(val, opt, row) {
        var html_str = '<input type="checkbox" class="ckbox" data-for="' + row.category + '" data-id="' + row.rightQid + '"';
        if (row.Caption === '查询') {
            html_str = html_str + 'data-view="true"';
        };
        if (val > 0) {
            return html_str + ' checked="checked">';
        } else {
            return html_str + '>';
        };
    };

    $('#all').click(function (e) {
        e.stopPropagation();
        if (this.checked) {
            $('.ckbox').each(function () {
                this.checked = true;
            });
            $('.group').each(function () {
                this.checked = true;
            });
        } else {
            $('.ckbox').removeAttr('checked');
            $('.group').removeAttr('checked');
        }
    });
    $('#save').click(function (e) {
        var items = [];
        $('.ckbox').each(function (i) {
            if (this.checked) {
                items.push($(this).data('id'));
            }
        });
        var i = getPostData();
        //alert(userName+JSON.stringify(i));
        //Public.ajaxPost('./authority.aspx?action=addRights&userName=' + userName + '&rightid={rightids:[' + items.join(',') + ']}', { postData: '[' + JSON.stringify(i) + ']' }, function (data) {
        Public.ajaxPost('./authority.aspx?action=addRights&userName=' + userName, { postData: JSON.stringify(i) }, function (data) {
            if (data.status === 200) {
                parent.Public.tips({ content: '保存成功！' });
            } else {
                parent.Public.tips({ type: 1, content: data.msg });
            }
        });
    });
    $('.grid-wrap').on('click', '.group', function () {
        var groupId = $(this).attr('id');
        if (this.checked) {
            $('.ckbox[data-for=' + groupId + ']').each(function () {
                this.checked = true;
            });
        } else {
            $('.ckbox[data-for=' + groupId + ']').removeAttr('checked');
        };
        $(this).closest('tr').find('input').filter('[data-view=true]').trigger('checkChange');
    });
    $('.grid-wrap').on('click', '.ckbox', function () {
        var groupId = $(this).data('for');
        var $_group = $('.ckbox[data-for=' + groupId + ']'), $_view = $_group.filter('[data-view=true]'), $_others = $_group.not('[data-view=true]');
        if (!$(this).data('view')) {
            if (this.checked && $_view.length > 0) {
                $_view[0].checked = true;
            };
        } else {
            if ($_others.length > 0 && $_others.filter(':checked').length > 0) {
                this.checked = true;
            };
        };
        $_view.trigger('checkChange');
        if ($_group.length === $_group.filter(':checked').length) {
            $('#' + groupId)[0].checked = true;
        } else {
            $('#' + groupId).removeAttr('checked');
        };
    });
    /**
    * 关联权限处理
    */
    function fillMap(val, opt, row) {
        RelationalMapping[val + "-" + row.Caption] = opt.rowId;
    }



    var $usergrid = $('#usergrid');

    function t(t, e, i) {
        var a = '<div class="operating" data-id="' + i.id + '"><a class="ui-icon ui-icon-pencil" title="配置"></a></div>';
        return a
    }

    $("#usergrid").jqGrid({
        url: '../basedata/users.aspx?action=list',
        datatype: "json",
        autowidth: false, //如果为ture时，则当表格在首次被创建时会根据父元素比例重新调整表格宽度。如果父元素宽度改变，为了使表格宽度能够自动调整则需要实现函数：setgridWidth
        width: 250,
        height: height,
        altRows: true, //设置隔行显示
        //colNames: ['用户'],
        colModel: [
          { name: "operating", label: "操作", width: 60, fixed: !0, formatter: t, align: "center" },
	  	  { name: "name", label: "用户", width: 70, align: "center" }
	  ],
        cmTemplate: { sortable: false, title: false },
        //idPrefix: 'ys',
        //loadui: 'block',
        //multiselect: true,
        //multiboxonly: true,
        page: 1,
        //sortname: 'number',
        //sortorder: "desc",
        rowNum: 2000,
        scroll: 1, //创建一个动态滚动的表格，当为true时，翻页栏被禁用，使用垂直滚动条加载数据，且在首次访问服务器端时将加载所有数据到客户端。当此参数为数字时，表格只控制可见的几行，所有数据都在这几行中加载
        loadonce: true,
        viewrecords: true,
        shrinkToFit: false,
        forceFit: false,
        jsonReader: {
            root: "items",
            //root: "data",
            //records: "data.totalsize",
            //repeatitems: false,
            id: -1
        },
        afterInsertRow: function (rowid, rowdata, rowelem) {

        },
        onSelectRow: function (id) {
            if (id && id !== lastSel) {
                var j = $("#usergrid").jqGrid("getRowData", $("#usergrid").jqGrid("getGridParam", "selrow"));
                //k = j.name;
                userName = j.name;
                $('#userName').text(userName);
                lastSel = id;
                jQuery("#grid").setGridParam({ url: './authority.aspx?action=getUserRightsEx&userName=' + userName }).trigger("reloadGrid");
            }
        },
        loadComplete: function (data) {
            //alert(JSON.stringify(data.items));
            var ids = $("#usergrid").jqGrid('getDataIDs');
            if (ids.length > 0)
                $("#usergrid").jqGrid("setSelection", ids[0]);

        },
        loadError: function (xhr, st, err) {

        }
    });

    $(".grid-wrap").on("click", ".ui-icon-pencil",
        function (t) {
            t.preventDefault();
            var j = $("#usergrid").jqGrid("getRowData", $("#usergrid").jqGrid("getGridParam", "selrow"));
            //k = j.name;
            userName = j.name;
            
        });
</script>
</body>
</html>