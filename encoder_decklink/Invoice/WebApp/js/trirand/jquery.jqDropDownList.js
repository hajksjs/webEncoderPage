; (function($, window, document, undefined) {
"use strict";
	var pluginName = 'jqDropDownList',
		defaults = {
			id: "", 
			uniqueID: "", // needed for ASP.NET WebForms to trigger postback events			
			selectedIndex: -1,
			width: 100,
			height: 100,
			dropDownWidth: null,
			enabled: true,
			items: [],
			tabIndex: 0,
			initialText: "",
			itemTemplateID: "",
			headerTemplateID: "",
			footerTemplateID: "",
			toggleImageCssClass: "ui-icon-triangle-1-s",
			onShow: null,
			onHide: null,
			onSelect: null,
			onMouseOver: null,
			onMouseOut: null,
			onInitialized: null,
			onKeyDown: null
		};

	function DropDownList(element, options) {
		this.self = $(element);
		//$("#dropdowndialog").text(this.id); 
		this.options = $.extend({}, defaults, options);
		this.options.id = element.id;
		if (this.options.dropDownWidth === null) {
			this.options.dropDownWidth = this.options.width;
		} 
		
		this.toggleActive = false;
		this.dropDownVisible = false;
		//this.selectedIndex = this.options.selectedIndex;
		
		$(element).prop("dropdownlist", this);		
		
		//this.renderButton();  //luan
		if (this.options.items.length > 0) {
			this.renderItems(this.options.items);
		}
			
		this.renderHiddenValueField();			
		this.attachEvents();		
		//this.getInitialText();
		//this.getButtonTextElement().text(this.initialText);
		//this.getButtonTextElement().val(this.initialText);//luan
		//this.selectedIndex=this.getItemByValue(this.getButtonTextElement().val()).index;
		this.selectedIndex= this.getIndexByValue(this.getButtonTextElement().val());
		
		if (this.selectedIndex > -1) {
			var item = this.getItemByIndex(this.selectedIndex);
			item.find("tr:eq(0)").addClass("ui-state-highlight");
		}
		
		this.serializeSelectedValue();
		
		if (this.options.onInitialized) {
			this.options.onInitialized(this);
		}		
	}
	
	DropDownList.prototype.renderButton = function() {
		/**/	var sb = [];
		var o = this.options;
		sb.push("<button id='");
		sb.push(o.id + "_button");
		sb.push("' class='ui-widget ui-state-default ui-corner-all ui-jqdropdownlist-button'");
		sb.push(" style='width:" + o.width +  "px;' tabindex=" + o.tabIndex + ">");
		//sb.push("<span class='ui-icon ui-jqdropdownlist-toggle-image " + o.toggleImageCssClass +  "'></span>");
		//sb.push("<span class='ui-jqdropdownlist-button-text'>" + o.initialText +  "</span>");
		sb.push("<table cellpadding=0 cellspacing=0>");
		sb.push("<tr>");		
		sb.push("<td width=" + (o.width - 20) + " valign=middle align=left>" + o.initialText + "</td>");
		sb.push("<td valign=middle align=right>" + "<span class='ui-icon ui-jqdropdownlist-toggle-image " + o.toggleImageCssClass +  "'></span>" + "</td>");
		sb.push("</tr>");
		sb.push("</table>");
		sb.push("</button>");
        
		
		var htmlElement = $(sb.join(""));
		this.self.append(htmlElement);
        	
	};
	
	DropDownList.prototype.renderItems = function(json) {
		var that = this;
		var sb = [];		
		
		sb.push("<div id=" + this.options.id + "_dropDownWrapper class='ui-jqdropdownlist-dropdown-wrapper ui-widget ui-widget-content ui-corner-all'");
		sb.push(">");
		
		if (this.options.headerTemplateID) {
			sb.push("<div id=" + this.options.id + "_dropDownHeader>");
			sb.push(this.renderTemplate(this.options.headerTemplateID));
			sb.push("</div>");
		}
		
		sb.push("<div id=" + this.options.id + "_dropDown class='ui-jqdropdownlist-dropdown'");
		sb.push(" style='");		
		sb.push("width:" + this.options.dropDownWidth+"px;");
		if (this.options.height !== 100){
			sb.push("height:" + this.options.height + "px;");
		}
		sb.push("'>");
			
		sb.push("<ul class='ui-helper-reset' style='width:" + this.options.dropDownWidth + "px;");
		if (this.options.height !== 100){
			sb.push("height:" + this.options.height + "px;");
		}
		sb.push("'>");
		sb.push("</ul>");
		sb.push("</div>");
		
		if (this.options.footerTemplateID) {
			sb.push("<div id=" + this.options.id + "_dropDownFooter>");
			sb.push(this.renderTemplate(this.options.footerTemplateID));
			sb.push("</div>");
		}
		
		sb.push("</div>");		
		
		var htmlElement = $(sb.join(""));
		this.parentElement = htmlElement.find("ul:eq(0)");
		
		$.each(json, function(index, options) {
			if (options.selected) { 
				this.selectedIndex = index; 
			}
			options.index = index;
			if (options.value === undefined){
				options.value = options.text;
			}
			options.enabled = (options.enabled === undefined) ?  true : false;
				
			that.renderItem(options, that.parentElement);
		});
		
		if (this.selectedIndex === -1 && json.length > 0) {
			this.selectedIndex = 0;
		}
		
		$("body").append(htmlElement);
	};
	
	DropDownList.prototype.renderItem = function(json, parentElement) {
		var templateID = null;
		var sb = [];
		var text = json.text;	
		var disabledCss = "";
		
		if (this.options.itemTemplateID) {
			templateID = this.options.itemTemplateID;
		}
		if (json.itemTemplateID) {
			templateID = json.itemTemplateID;
		}
		if (templateID) {
			text = this.renderTemplate(templateID, json);
		}
		if (!json.enabled){
			disabledCss = "ui-state-disabled";
		}
				
		sb.push("<li class='ui-jqdropdownlist-item'>");
		sb.push("<a onfocus='this.blur();'>");
		sb.push("<table cellpadding=0 cellspacing=0 style='width:100%;' class='ui-helper-reset'>");
		sb.push("<tr>");		
		if (json.imageUrl) {
			sb.push("<td valign=middle style='width:21px;text-align:center;'><img class='ui-jqdropdownlist-item-image' src='" + json.imageUrl + "' /></td>");
		}
		sb.push("<td valign=middle style='width:100%;' class='ui-corner-all'>");
		sb.push("<span class='ui-jqdropdownlist-item-text " + disabledCss + "'>" + text + "</span>");
		sb.push("</td>");
		sb.push("</tr></table></a>");
		sb.push("</li>");
		
		var newItem = $(sb.join(""));		
		newItem.data("options", json);
		
		parentElement.append(newItem);
	};
	
	DropDownList.prototype.renderTemplate = function(templateID, json) {
		if (!$.isFunction($.tmpl)) {
			alert("You have specified using templates with jqDropDownList, but the jQuery template library javascript is not referenced in the HTML.");
			return;
		}
		if ($("#" + templateID).length === 0) {
			alert("You have not specified a jQuery template with ID " + templateID + " that is not defined on the page");
			return;
		}
		
		if (json) {
			return $("#" + templateID).tmpl(json).clone().wrap('<div></div>').parent().html();
		}
		
		return $("#" + templateID).tmpl().clone().wrap('<div></div>').parent().html();
	};
	
	DropDownList.prototype.renderHiddenValueField = function() {		
		var selectedID = this.getSelectedValueHiddenID();				
		this.self.remove("#" + selectedID).append("<input type='hidden' id='" + selectedID + "' name='" + selectedID + "' />");		
	};
	
	DropDownList.prototype.getInitialText = function() {
		var that = this;
		this.initialText = "";				
		if (this.options.items.length > 0) {
			this.initialText = this.options.items[0].text;
		}
		
		var index = this.options.selectedIndex == -1 ? 0 : this.options.selectedIndex;		
		var selectedItem = this.options.items[index];
		that.initialText = selectedItem.text;	
	};
	
	DropDownList.prototype.showDropDown = function() {		
		if (this.options.onShow) {
			this.options.onShow();
		}
	
		this.dropDownVisible = true;		
		var dropDown = this.getDropDownElement();
		var button = this.getButtonElement();
		var offset = button.offset();
				
		dropDown.css({
				top: offset.top + button.outerHeight(),
				left: offset.left
			}).slideDown(120);
			
		if (this.selectedIndex > -1) {
			var item = this.getItemByIndex(this.selectedIndex);
			this.getDropDownElement().find(".ui-state-highlight").removeClass("ui-state-highlight");
			item.find("tr:eq(0)").addClass("ui-state-highlight");
			this.ensureVisible(this.getItemByIndex(this.selectedIndex));
		}
		
		
	};
	
	DropDownList.prototype.hideDropDown = function() {
		if (this.options.onHide) {
			this.options.onHide();
		}
		
		this.dropDownVisible = false;
		var dropDown = this.getDropDownElement();
		dropDown.slideUp(120);
	};
	
	DropDownList.prototype.toggleDropDown = function() {
		if( this.dropDownVisible ) { 
			this.hideDropDown();
		} else {
			this.showDropDown();
		}
	};
	
	DropDownList.prototype.handleMouseOver = function(event) {
		if (this.options.enabled) {
			var button = this.getButtonElement();
			//button.addClass("ui-state-hover");
		}
	};
	
	DropDownList.prototype.handleMouseOut = function(event) {
		if (this.options.enabled) {
			var button = this.getButtonElement();
			//button.removeClass("ui-state-hover");
		}
	};
	
	
	DropDownList.prototype.handleClick = function(event) {
		if (this.options.enabled) {
			//this.getButtonElement().focus();//luan
			if (!this.dropDownVisible)//luan
			this.toggleDropDown();
			event.preventDefault();
			return false;
		}
	};
	
	// need this to cancel blur from firing on scrollbar click
	DropDownList.prototype.handleDropDownMouseDown = function(event) {	
		event.preventDefault();
		return false;		
	};
	
	// need this to cancel blur from firing in IE - hack
	DropDownList.prototype.handleDropDownFocus = function(event) {
		this.getButtonElement().focus();		
	};
		
	DropDownList.prototype.handleKeyDown = function(event) {		
		if (this.options.onKeyDown) {
			var result = this.options.onKeyDown(this, event);
			if (result === false) {
				return;
			}
		}
		var item;
		switch (event.keyCode) {
			case 40:
				this.selectedIndex = this.getNextActiveIndex(this.selectedIndex);
				item = this.getItemByIndex(this.selectedIndex);
				this.select(item);
				event.preventDefault();
				break;
			case 38:
				this.selectedIndex = this.getPrevActiveIndex(this.selectedIndex);
				item = this.getItemByIndex(this.selectedIndex);
				this.select(item);
				event.preventDefault();
				break;
			case 27:
				if (this.dropDownVisible) {
					this.hideDropDown();
				}
				break;
			case 13:
				if (this.dropDownVisible) {
					this.hideDropDown();
				}
				break;
			case 9:
				if (this.dropDownVisible) {
					this.hideDropDown();
				}
				break;
		}
	};
	
	DropDownList.prototype.getNextActiveIndex = function(index) {
		while (index < this.getItemCount() - 1) {
			index++;
			var item = this.getItemByIndex(index);
			var options = this.getItemOptions(item);
			if (options.enabled) {
				break;			
			}
		}
		
		return index;
	};
	
	DropDownList.prototype.getPrevActiveIndex = function(index) {
		while (index > 0) {
			index--;			
			var item = this.getItemByIndex(index);
			var options = this.getItemOptions(item);
			if (options.enabled) {
				break;
			}
		}
		return index;
	};
	
	DropDownList.prototype.handleFocus = function() {
		this.closeActive = false;
		var button = this.getButtonElement();
		
		this.toggleDropDown();//button.addClass("ui-state-focus");//luan
	};	
	
	DropDownList.prototype.handleBlur = function() {
		//$("#dropdowndialog").text((new Date()).Format("yyyy-MM-dd hh:mm:ss.S")); //luan
		var that = this;
		this.closeActive = true;
		window.setTimeout(
			function() {
				if (that.closeActive) {
					var button = that.getButtonElement();
					//button.removeClass("ui-state-focus");//luan
					that.hideDropDown();
					that.closeActive = false;
				}
			},
		100);		
	};	
	
	DropDownList.prototype.handleDropDownMouseOver = function(event) {
		var target = $(event.target);
		var parentLi = this.getItemParentLiElement(target);
		var options = this.getItemOptions(parentLi);
		
		if (options && options.enabled) {		
			parentLi.find("tr:eq(0)").addClass("ui-state-hover");
			
			if (this.options.onMouseOver) {
				var item = this.getItemParentLiElement(target);
				this.options.onMouseOver(item, event);
			}
		}
	};
	
	DropDownList.prototype.handleDropDownMouseOut = function(event) {
		var target = $(event.target);
		var parentLi = this.getItemParentLiElement(target);
		var options = this.getItemOptions(parentLi);
		
		if (options && options.enabled) {		
			target.parents("tr:eq(0)").removeClass("ui-state-hover");
		
			if (this.options.onMouseOut) {
				var item = this.getItemParentLiElement(target);
				this.options.onMouseOut(item, event);
			}
		}		
	};
	
	DropDownList.prototype.handleDropDownClick = function(event) {
		var target = $(event.target);
		var item = this.getItemParentLiElement(target);	
		var options = this.getItemOptions(item);
		
		if (item && options && options.enabled) {
			if (this.options.onSelect) {
				item = this.getItemParentLiElement(target);
				var result = this.options.onSelect(item, event);
				if (result === false) {
					return;
				}
			}
			this.selectedIndex = options.index;
			this.select(item);
			this.hideDropDown();
			this.serializeSelectedValue();
		}
	};
	
	DropDownList.prototype.getItemOptions = function(target) {
		return this.getItemParentLiElement(target).data("options");
	};

	DropDownList.prototype.getItemParentLiElement = function(target) {
		return target.hasClass("ui-jqdropdownlist-item") ? target : target.parents("li:eq(0)");		
	};
	
	DropDownList.prototype.getItemTextElement = function(target) {
		return this.getItemParentLiElement(target).find(".ui-jqdropdownlist-item-text");
	};
		
	DropDownList.prototype.getDropDownElement = function() {
		return $("#" + this.options.id + "_dropDownWrapper");
	};
	
	DropDownList.prototype.getDropDownItemsElement = function() {
		return $("#" + this.options.id + "_dropDown");
	};
	
	DropDownList.prototype.getDropDownHeaderElement = function() {
		return $("#" + this.options.id + "_dropDownHeader");
	};
	
	DropDownList.prototype.getDropDownFooterElement = function() {
		return $("#" + this.options.id + "_dropDownFooter");
	};
	
	DropDownList.prototype.getButtonElement = function() {
		//return $("#" + this.options.id + "_button"); //luan
		return this.self;
	};
	
	DropDownList.prototype.getButtonTextElement = function() {
		//return this.getButtonElement().find("td:eq(0)"); //luan
		return this.self;
	};
	
	DropDownList.prototype.getSelectedValueHiddenID = function() {
		return this.options.id + "_selectedValue";
	};
	
	DropDownList.prototype.getSelectedIndexHiddenID = function() {
		return this.options.uniqueID + "_selectedIndex";
	};
	
	DropDownList.prototype.serializeSelectedValue = function() {
		var item = this.getItemByIndex(this.selectedIndex);
		if (item) {
			var options = this.getItemOptions(item);
			$("#" + this.getSelectedValueHiddenID()).val(options.value);
			$('#' + this.getSelectedIndexHiddenID()).val(this.selectedIndex);
		}
	};

	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new DropDownList(this, options));
			}
		});
	};
	
	DropDownList.prototype.attachEvents = function() {
		var button = this.getButtonElement();
		button.bind('mouseover', this.executeInContext(this, this.handleMouseOver));
		button.bind('mouseout', this.executeInContext(this, this.handleMouseOut));
		button.bind('click', this.executeInContext(this, this.handleClick));
		button.bind('focus', this.executeInContext(this, this.handleFocus));
		button.bind('blur', this.executeInContext(this, this.handleBlur));
		button.bind('keydown', this.executeInContext(this, this.handleKeyDown));		
		
		var dropDown = this.getDropDownElement();
		dropDown.bind('mouseover', this.executeInContext(this, this.handleDropDownMouseOver));
		dropDown.bind('mouseout', this.executeInContext(this, this.handleDropDownMouseOut));
		dropDown.bind('click', this.executeInContext(this, this.handleDropDownClick));
		dropDown.bind('mousedown', this.executeInContext(this, this.handleDropDownMouseDown));
		dropDown.bind('focus', this.executeInContext(this, this.handleDropDownFocus));
		
		var dropDownItems = this.getDropDownItemsElement();
		dropDownItems.bind('focus', this.executeInContext(this, this.handleDropDownFocus));
	};
	
	DropDownList.prototype.executeInContext = function(context, func) {
		return function() {
			func.apply(context, arguments);
		};
	};
	
	// Public API
	
	DropDownList.prototype.getItemByText = function(text) {
		var that = this;
		that.resultItem = null;
		var items = this.getDropDownElement().find(".ui-jqdropdownlist-item");
		$.each(items, function(index, item) {
			if (that.getItemOptions($(item)).text == text) {
				that.resultItem = $(item);
				return false;
			}
		});

		return that.resultItem;
	};

	DropDownList.prototype.getItemByValue = function(value) {
		var that = this;
		that.resultItem = null;
		var items = this.getDropDownElement().find(".ui-jqdropdownlist-item");
		$.each(items, function(index, item) {
			if (that.getItemOptions($(item)).value == value) {
				that.resultItem = $(item);
				return false;
			}
		});

		return that.resultItem;
	};
	
	DropDownList.prototype.getIndexByValue = function(value) {
		var that = this;
		that.SelectedIndex = 0;
		var items = this.getDropDownElement().find(".ui-jqdropdownlist-item");
		$.each(items, function(index, item) {
			if (that.getItemOptions($(item)).value == value) {
				that.SelectedIndex = index;
				return false;
			}
		});

		return that.SelectedIndex;
	};
	
	DropDownList.prototype.getSelectedValue = function() {
		var id = this.getSelectedValueHiddenID();
		return $("#"+id).val();
	}
	
	DropDownList.prototype.getSelectedIndex = function() {
		return this.selectedIndex;
	}
	
	DropDownList.prototype.getSelectedText = function() {
		return this.getButtonTextElement.text();
	}
	
	DropDownList.prototype.getItemByIndex = function(index) {
		return this.getDropDownElement().find(".ui-jqdropdownlist-item:eq(" + index + ")");
	};
	
	DropDownList.prototype.getItemCount = function() {
		return this.getDropDownElement().find("li").length;
	};
	
	DropDownList.prototype.select = function(item) {
		var options = this.getItemOptions(item);
		this.getButtonTextElement().text(options.text);
		this.getButtonTextElement().val(options.text);//luan

		//this.getDropDownElement().find(".ui-state-highlight").removeClass("ui-state-highlight");
		//item.find("tr:eq(0)").addClass("ui-state-highlight");
		
		this.serializeSelectedValue();		
		this.ensureVisible(item);
	};
	
	DropDownList.prototype.ensureVisible = function(item) {		
		var headerHeight = this.getDropDownHeaderElement().length > 0 ?
									this.getDropDownHeaderElement().outerHeight() : 0;
		var footerHeight = this.getDropDownFooterElement().length > 0 ?
									this.getDropDownFooterElement().outerHeight() : 0;
									
		var positionTop = item.position().top - headerHeight - footerHeight;						
		this.getDropDownItemsElement().prop("scrollTop", positionTop);		
	};
	
	DropDownList.prototype.enableItem = function(item) {
		this.getItemOptions(item).enabled = true;
		this.getItemTextElement(item).removeClass("ui-state-disabled");
	};
	
	DropDownList.prototype.disableItem = function(item) {
		this.getItemOptions(item).enabled = false;		
		this.getItemTextElement(item).addClass("ui-state-disabled");
	};
	
	DropDownList.prototype.enable = function() {
		this.options.enabled = true;
		this.getButtonTextElement().removeClass("ui-state-disabled");
	};	
	
	DropDownList.prototype.disable = function() {
		this.options.enabled = false;
		this.getButtonTextElement().addClass("ui-state-disabled");
	};	
	

	$.fn.getDropDownListInstance = function() {
		return $(this).prop("dropdownlist");
	};

})(jQuery, window, document);