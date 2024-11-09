package swingjs.jquery;

import java.util.HashMap;
import java.util.Map;

import swingjs.JSUtil;

//based on  jQuery UI - v1.9.2 - 2015-05-28 

// BH 2023.01.07 updated j2sMenu.js for better touch with delayed menu closure detecting mouse

/**
 * This class checks for jQuery.ui having been loaded and loads it if it has not
 * been loaded. It provides three static methods used in
 * swingjs.plaf.JSComboBoxUI, JSPopupMenuUI, and JSSliderUI to create a static
 * instance of their respective JQuery widgets: j2sCB, j2smenu, and j2sslider.  
 *
 * 
 * 
 * Note that if you change one of the JavaScript files in this directory
 * (j2sComboBox.js, j2sMenu.js, j2sSlider.js), the transpiler will not transfer
 * it to the site directory unless you also touch this java file. Just add and remove
 * a space before the package command or after the next line and save to trigger that.
 * 
 * @author Bob Hanson
 * 
 *
 */  
public class JQueryUI {
	
	private final static String RESOURCE_J2SCOMBOBOX = "swingjs/jquery/j2sComboBox.js";
	private final static String RESOURCE_J2SMENU = "swingjs/jquery/j2sMenu.js";
	private final static String RESOURCE_J2SSLIDER = "swingjs/jquery/j2sSlider.js";

	static boolean loadResourceInternal = true;
	public static void loadJQComboBox() {
		String resource = RESOURCE_J2SCOMBOBOX;
		if (/** @j2sNative !J2S.__makeComboBox && */true) {
			loadResource(resource);
		}
		// outside {} in case j2sComboBox.js has been preloaded, overriding the setting here
		JSUtil.J2S.__makeComboBox();
	}
	
	public static void loadJQMenu() {
		String resource = RESOURCE_J2SMENU;
		if (/** @j2sNative !J2S.__makeMenu && */true) {
			loadResource(resource);
		}
		// outside {} in case j2sMenu.js has been preloaded, overriding the setting here
		JSUtil.J2S.__makeMenu();
	}

	public static void loadJQSlider() {
		String resource = RESOURCE_J2SSLIDER;
		if (/** @j2sNative !J2S.__makeSlider && */true) {
			loadResource(resource);
		}
		// outside {} in case j2sSlider.js has been preloaded, overriding the setting here
		JSUtil.J2S.__makeSlider();
	}

	private static void loadResource(String resourceName) {
		if (loadResourceInternal) {
			JSUtil.processJS(htResource.get(resourceName), resourceName);
		} else {
			JSUtil.loadStaticResource(resourceName);
		}
	}

	private static Map<String, String> htResource = new HashMap<>();

	static {
	  
		/**      
		 * note -- lines will get wrapped by the transpiler
		 * 
		 * @j2sNative 


if (!J2S.__$.ui)
try{

var styles = "
.swingjs .ui-corner-all, .swingjs .ui-corner-bottom, .swingjs .ui-corner-left, .swingjs .ui-corner-bl { -moz-border-radius-bottomleft: 4px; -webkit-border-bottom-left-radius: 4px; -khtml-border-bottom-left-radius: 4px; border-bottom-left-radius: 4px; }
.swingjs .ui-corner-all, .swingjs .ui-corner-bottom, .swingjs .ui-corner-right, .swingjs .ui-corner-br { -moz-border-radius-bottomright: 4px; -webkit-border-bottom-right-radius: 4px; -khtml-border-bottom-right-radius: 4px; border-bottom-right-radius: 4px; }
.swingjs .ui-corner-all, .swingjs .ui-corner-top, .swingjs .ui-corner-left, .swingjs .ui-corner-tl { -moz-border-radius-topleft: 4px; -webkit-border-top-left-radius: 4px; -khtml-border-top-left-radius: 4px; border-top-left-radius: 4px; }
.swingjs .ui-corner-all, .swingjs .ui-corner-top, .swingjs .ui-corner-right, .swingjs .ui-corner-tr { -moz-border-radius-topright: 4px; -webkit-border-top-right-radius: 4px; -khtml-border-top-right-radius: 4px; border-top-right-radius: 4px; }
.swingjs .ui-state-active a, .swingjs .ui-state-active a:link, .swingjs .ui-state-active a:visited { color: #eb8f00; text-decoration: none; }
.swingjs .ui-state-active, .swingjs .ui-widget-content .ui-state-active{ border: 1px solid #fbd850; background: #ffffff; font-weight: bold; color: #eb8f00; }
.swingjs .ui-state-default a, .swingjs .ui-state-default a:link, .swingjs .ui-state-default a:visited { color: #1c94c4; text-decoration: none; }
.swingjs .ui-state-default, .swingjs .ui-widget-content .ui-state-default{ border: 1px solid #cccccc; background: #f6f6f6; font-weight: bold; color: #1c94c4; }
.swingjs .ui-state-disabled, .swingjs .ui-widget-content .ui-state-disabled{ opacity: .35; filter:Alpha(Opacity=35); background-image: none; }
.swingjs .ui-state-hover a, .swingjs .ui-state-hover a:hover, .swingjs .ui-state-hover a:link, .swingjs .ui-state-hover a:visited { color: #c77405; text-decoration: none; }
.swingjs .ui-state-hover, .swingjs .ui-widget-content .ui-state-hover, .swingjs .ui-state-focus, .swingjs .ui-widget-content .ui-state-focus{ border: 1px solid #fbcb09; background: #fdf5ce; font-weight: bold; color: #c77405; }
.swingjs .ui-widget-content { border: 1px solid #dddddd; background: #eeeeee; color: #333333; }
.swingjs .ui-widget-content a { color: #333333; }
.swingjs .ui-widget .ui-widget { font-size: 1em; }
.swingjs .ui-state-disabled { cursor: default !important; }
";
J2S.$after("head", '<style>'+styles+'</style>');  
styles = null;


;(function(e,t){function i(t,n){var r,i,o,u=t.nodeName.toLowerCase();return"area"===u?(r=t.parentNode,i=r.name,!t.href||!i||r.nodeName.toLowerCase()!=="map"?!1:(o=e("img[usemap=#"+i+"]")[0],!!o&&s(o))):(/input|select|textarea|button|object/.test(u)?!t.disabled:"a"===u?t.href||n:n)&&s(t)}function s(t){return e.expr.filters.visible(t)&&!e(t).parents().andSelf().filter(function(){return e.css(this,"visibility")==="hidden"}).length}var n=0,r=/^ui-id-\d+$/;e.ui=e.ui||{};if(e.ui.version)return;e.extend(e.ui,{version:"1.9.2",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({_focus:e.fn.focus,focus:function(t,n){return typeof t=="number"?this.each(function(){var r=this;setTimeout(function(){e(r).focus(),n&&n.call(r)},t)}):this._focus.apply(this,arguments)},scrollParent:function(){var t;return e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?t=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):t=this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(n){if(n!==t)return this.css("zIndex",n);if(this.length){var r=e(this[0]),i,s;while(r.length&&r[0]!==document){i=r.css("position");if(i==="absolute"||i==="relative"||i==="fixed"){s=parseInt(r.css("zIndex"),10);if(!isNaN(s)&&s!==0)return s}r=r.parent()}}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++n)})},removeUniqueId:function(){return this.each(function(){r.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(n){return!!e.data(n,t)}}):function(t,n,r){return!!e.data(t,r[3])},focusable:function(t){return i(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var n=e.attr(t,"tabindex"),r=isNaN(n);return(r||n>=0)&&i(t,!r)}}),e(function(){var t=document.body,n=t.appendChild(n=document.createElement("div"));n.offsetHeight,e.extend(n.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),e.support.minHeight=n.offsetHeight===100,e.support.selectstart="onselectstart"in n,t.removeChild(n).style.display="none"}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(n,r){function u(t,n,r,s){return e.each(i,function(){n-=parseFloat(e.css(t,"padding"+this))||0,r&&(n-=parseFloat(e.css(t,"border"+this+"Width"))||0),s&&(n-=parseFloat(e.css(t,"margin"+this))||0)}),n}var i=r==="Width"?["Left","Right"]:["Top","Bottom"],s=r.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+r]=function(n){return n===t?o["inner"+r].call(this):this.each(function(){e(this).css(s,u(this,n)+"px")})},e.fn["outer"+r]=function(t,n){return typeof t!="number"?o["outer"+r].call(this,t):this.each(function(){e(this).css(s,u(this,t,!0,n)+"px")})}}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(n){return arguments.length?t.call(this,e.camelCase(n)):t.call(this)}}(e.fn.removeData)),function(){var t=/msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase())||[];e.ui.ie=t.length?!0:!1,e.ui.ie6=parseFloat(t[1],10)===6}(),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),e.extend(e.ui,{plugin:{add:function(t,n,r){var i,s=e.ui[t].prototype;for(i in r)s.plugins[i]=s.plugins[i]||[],s.plugins[i].push([n,r[i]])},call:function(e,t,n){var r,i=e.plugins[t];if(!i||!e.element[0].parentNode||e.element[0].parentNode.nodeType===11)return;for(r=0;r<i.length;r++)e.options[i[r][0]]&&i[r][1].apply(e.element,n)}},contains:e.contains,hasScroll:function(t,n){if(e(t).css("overflow")==="hidden")return!1;var r=n&&n==="left"?"scrollLeft":"scrollTop",i=!1;return t[r]>0?!0:(t[r]=1,i=t[r]>0,t[r]=0,i)},isOverAxis:function(e,t,n){return e>t&&e<t+n},isOver:function(t,n,r,i,s,o){return e.ui.isOverAxis(t,r,s)&&e.ui.isOverAxis(n,i,o)}})
 })(J2S.__$);
}catch (e) {
	System.err.println("JQueryUI failed to load jQuery.ui.core -- jQuery version conflict?");
}


if (!J2S.__$.ui.widget)
try{
 (function(e,t){var n=0,r=Array.prototype.slice,i=e.cleanData;e.cleanData=function(t){for(var n=0,r;(r=t[n])!=null;n++)try{e(r).triggerHandler("remove")}catch(s){}i(t)},e.widget=function(t,n,r){var i,s,o,u,a=t.split(".")[0];t=t.split(".")[1],i=a+"-"+t,r||(r=n,n=e.Widget),e.expr[":"][i.toLowerCase()]=function(t){return!!e.data(t,i)},e[a]=e[a]||{},s=e[a][t],o=e[a][t]=function(e,t){if(!this._createWidget)return new o(e,t);arguments.length&&this._createWidget(e,t)},e.extend(o,s,{version:r.version,_proto:e.extend({},r),_childConstructors:[]}),u=new n,u.options=e.widget.extend({},u.options),e.each(r,function(t,i){e.isFunction(i)&&(r[t]=function(){var e=function(){return n.prototype[t].apply(this,arguments)},r=function(e){return n.prototype[t].apply(this,e)};return function(){var t=this._super,n=this._superApply,s;return this._super=e,this._superApply=r,s=i.apply(this,arguments),this._super=t,this._superApply=n,s}}())}),o.prototype=e.widget.extend(u,{widgetEventPrefix:s?u.widgetEventPrefix:t},r,{constructor:o,namespace:a,widgetName:t,widgetBaseClass:i,widgetFullName:i}),s?(e.each(s._childConstructors,function(t,n){var r=n.prototype;e.widget(r.namespace+"."+r.widgetName,o,n._proto)}),delete s._childConstructors):n._childConstructors.push(o),e.widget.bridge(t,o)},e.widget.extend=function(n){var i=r.call(arguments,1),s=0,o=i.length,u,a;for(;s<o;s++)for(u in i[s])a=i[s][u],i[s].hasOwnProperty(u)&&a!==t&&(e.isPlainObject(a)?n[u]=e.isPlainObject(n[u])?e.widget.extend({},n[u],a):e.widget.extend({},a):n[u]=a);return n},e.widget.bridge=function(n,i){var s=i.prototype.widgetFullName||n;e.fn[n]=function(o){var u=typeof o=="string",a=r.call(arguments,1),f=this;return o=!u&&a.length?e.widget.extend.apply(null,[o].concat(a)):o,u?this.each(function(){var r,i=e.data(this,s);if(!i)return e.error("cannot call methods on "+n+" prior to initialization; "+"attempted to call method '"+o+"'");if(!e.isFunction(i[o])||o.charAt(0)==="_")return e.error("no such method '"+o+"' for "+n+" widget instance");r=i[o].apply(i,a);if(r!==i&&r!==t)return f=r&&r.jquery?f.pushStack(r.get()):r,!1}):this.each(function(){var t=e.data(this,s);t?t.option(o||{})._init():e.data(this,s,new i(o,this))}),f}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,r){r=e(r||this.defaultElement||this)[0],this.element=e(r),this.uuid=n++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),r!==this&&(e.data(r,this.widgetName,this),e.data(r,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===r&&this.destroy()}}),this.document=e(r.style?r.ownerDocument:r.document||r),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(n,r){var i=n,s,o,u;if(arguments.length===0)return e.widget.extend({},this.options);if(typeof n=="string"){i={},s=n.split("."),n=s.shift();if(s.length){o=i[n]=e.widget.extend({},this.options[n]);for(u=0;u<s.length-1;u++)o[s[u]]=o[s[u]]||{},o=o[s[u]];n=s.pop();if(r===t)return o[n]===t?null:o[n];o[n]=r}else{if(r===t)return this.options[n]===t?null:this.options[n];i[n]=r}}return this._setOptions(i),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,e==="disabled"&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(t,n,r){var i,s=this;typeof t!="boolean"&&(r=n,n=t,t=!1),r?(n=i=e(n),this.bindings=this.bindings.add(n)):(r=n,n=this.element,i=this.widget()),e.each(r,function(r,o){function u(){if(!t&&(s.options.disabled===!0||e(this).hasClass("ui-state-disabled")))return;return(typeof o=="string"?s[o]:o).apply(s,arguments)}typeof o!="string"&&(u.guid=o.guid=o.guid||u.guid||e.guid++);var a=r.match(/^(\w+)\s*(.*)$/),f=a[1]+s.eventNamespace,l=a[2];l?i.delegate(l,f,u):n.bind(f,u)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function n(){return(typeof e=="string"?r[e]:e).apply(r,arguments)}var r=this;return setTimeout(n,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,n,r){var i,s,o=this.options[t];r=r||{},n=e.Event(n),n.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),n.target=this.element[0],s=n.originalEvent;if(s)for(i in s)i in n||(n[i]=s[i]);return this.element.trigger(n,r),!(e.isFunction(o)&&o.apply(this.element[0],[n].concat(r))===!1||n.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,n){e.Widget.prototype["_"+t]=function(r,i,s){typeof i=="string"&&(i={effect:i});var o,u=i?i===!0||typeof i=="number"?n:i.effect||n:t;i=i||{},typeof i=="number"&&(i={duration:i}),o=!e.isEmptyObject(i),i.complete=s,i.delay&&r.delay(i.delay),o&&e.effects&&(e.effects.effect[u]||e.uiBackCompat!==!1&&e.effects[u])?r[t](i):u!==t&&r[u]?r[u](i.duration,i.easing,s):r.queue(function(n){e(this)[t](),s&&s.call(r[0]),n()})}}),e.uiBackCompat!==!1&&(e.Widget.prototype._getCreateOptions=function(){return e.metadata&&e.metadata.get(this.element[0])[this.widgetName]})
 })(J2S.__$);
}catch (e) {
	System.err.println("JQueryUI failed to load jQuery.ui.widget -- jQuery version conflict?");
}


if (!J2S.__$.ui.mouse)
try{
 (function(e,t){var n=!1;e(document).mouseup(function(e){n=!1}),e.widget("ui.mouse",{version:"1.9.2",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(n){if(!0===e.data(n.target,t.widgetName+".preventClickEvent"))return e.removeData(n.target,t.widgetName+".preventClickEvent"),n.stopImmediatePropagation(),!1}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(t){if(n)return;this._mouseStarted&&this._mouseUp(t),this._mouseDownEvent=t;var r=this,i=t.which===1,s=typeof this.options.cancel=="string"&&t.target.nodeName?e(t.target).closest(this.options.cancel).length:!1;if(!i||s||!this._mouseCapture(t))return!0;this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){r.mouseDelayMet=!0},this.options.delay));if(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)){this._mouseStarted=this._mouseStart(t)!==!1;if(!this._mouseStarted)return t.preventDefault(),!0}return!0===e.data(t.target,this.widgetName+".preventClickEvent")&&e.removeData(t.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return r._mouseMove(e)},this._mouseUpDelegate=function(e){return r._mouseUp(e)},e(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),t.preventDefault(),n=!0,!0},_mouseMove:function(t){return!e.ui.ie||document.documentMode>=9||!!t.button?this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted):this._mouseUp(t)},_mouseUp:function(t){return e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(e){return this.mouseDelayMet},_mouseStart:function(e){},_mouseDrag:function(e){},_mouseStop:function(e){},_mouseCapture:function(e){return!0}})
 })(J2S.__$);
}catch (e) {
	System.err.println("JQueryUI failed to load jQuery.ui.mouse -- jQuery version conflict?");
}


if (!J2S.__$.ui.position)
try{
 (function(e,t){function h(e,t,n){return[parseInt(e[0],10)*(l.test(e[0])?t/100:1),parseInt(e[1],10)*(l.test(e[1])?n/100:1)]}function p(t,n){return parseInt(e.css(t,n),10)||0}e.ui=e.ui||{};var n,r=Math.max,i=Math.abs,s=Math.round,o=/left|center|right/,u=/top|center|bottom/,a=/[\+\-]\d+%?/,f=/^\w+/,l=/%$/,c=e.fn.position;e.position={scrollbarWidth:function(){if(n!==t)return n;var r,i,s=e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=s.children()[0];return e("body").append(s),r=o.offsetWidth,s.css("overflow","scroll"),i=o.offsetWidth,r===i&&(i=s[0].clientWidth),s.remove(),n=r-i},getScrollInfo:function(t){var n=t.isWindow?"":t.element.css("overflow-x"),r=t.isWindow?"":t.element.css("overflow-y"),i=n==="scroll"||n==="auto"&&t.width<t.element[0].scrollWidth,s=r==="scroll"||r==="auto"&&t.height<t.element[0].scrollHeight;return{width:i?e.position.scrollbarWidth():0,height:s?e.position.scrollbarWidth():0}},getWithinInfo:function(t){var n=e(t||window),r=e.isWindow(n[0]);return{element:n,isWindow:r,offset:n.offset()||{left:0,top:0},scrollLeft:n.scrollLeft(),scrollTop:n.scrollTop(),width:r?n.width():n.outerWidth(),height:r?n.height():n.outerHeight()}}},e.fn.position=function(t){if(!t||!t.of)return c.apply(this,arguments);t=e.extend({},t);var n,l,d,v,m,g=e(t.of),y=e.position.getWithinInfo(t.within),b=e.position.getScrollInfo(y),w=g[0],E=(t.collision||"flip").split(" "),S={};return w.nodeType===9?(l=g.width(),d=g.height(),v={top:0,left:0}):e.isWindow(w)?(l=g.width(),d=g.height(),v={top:g.scrollTop(),left:g.scrollLeft()}):w.preventDefault?(t.at="left top",l=d=0,v={top:w.pageY,left:w.pageX}):(l=g.outerWidth(),d=g.outerHeight(),v=g.offset()),m=e.extend({},v),e.each(["my","at"],function(){var e=(t[this]||"").split(" "),n,r;e.length===1&&(e=o.test(e[0])?e.concat(["center"]):u.test(e[0])?["center"].concat(e):["center","center"]),e[0]=o.test(e[0])?e[0]:"center",e[1]=u.test(e[1])?e[1]:"center",n=a.exec(e[0]),r=a.exec(e[1]),S[this]=[n?n[0]:0,r?r[0]:0],t[this]=[f.exec(e[0])[0],f.exec(e[1])[0]]}),E.length===1&&(E[1]=E[0]),t.at[0]==="right"?m.left+=l:t.at[0]==="center"&&(m.left+=l/2),t.at[1]==="bottom"?m.top+=d:t.at[1]==="center"&&(m.top+=d/2),n=h(S.at,l,d),m.left+=n[0],m.top+=n[1],this.each(function(){var o,u,a=e(this),f=a.outerWidth(),c=a.outerHeight(),w=p(this,"marginLeft"),x=p(this,"marginTop"),T=f+w+p(this,"marginRight")+b.width,N=c+x+p(this,"marginBottom")+b.height,C=e.extend({},m),k=h(S.my,a.outerWidth(),a.outerHeight());t.my[0]==="right"?C.left-=f:t.my[0]==="center"&&(C.left-=f/2),t.my[1]==="bottom"?C.top-=c:t.my[1]==="center"&&(C.top-=c/2),C.left+=k[0],C.top+=k[1],e.support.offsetFractions||(C.left=s(C.left),C.top=s(C.top)),o={marginLeft:w,marginTop:x},e.each(["left","top"],function(r,i){e.ui.position[E[r]]&&e.ui.position[E[r]][i](C,{targetWidth:l,targetHeight:d,elemWidth:f,elemHeight:c,collisionPosition:o,collisionWidth:T,collisionHeight:N,offset:[n[0]+k[0],n[1]+k[1]],my:t.my,at:t.at,within:y,elem:a})}),e.fn.bgiframe&&a.bgiframe(),t.using&&(u=function(e){var n=v.left-C.left,s=n+l-f,o=v.top-C.top,u=o+d-c,h={target:{element:g,left:v.left,top:v.top,width:l,height:d},element:{element:a,left:C.left,top:C.top,width:f,height:c},horizontal:s<0?"left":n>0?"right":"center",vertical:u<0?"top":o>0?"bottom":"middle"};l<f&&i(n+s)<l&&(h.horizontal="center"),d<c&&i(o+u)<d&&(h.vertical="middle"),r(i(n),i(s))>r(i(o),i(u))?h.important="horizontal":h.important="vertical",t.using.call(this,e,h)}),a.offset(e.extend(C,{using:u}))})},e.ui.position={fit:{left:function(e,t){var n=t.within,i=n.isWindow?n.scrollLeft:n.offset.left,s=n.width,o=e.left-t.collisionPosition.marginLeft,u=i-o,a=o+t.collisionWidth-s-i,f;t.collisionWidth>s?u>0&&a<=0?(f=e.left+u+t.collisionWidth-s-i,e.left+=u-f):a>0&&u<=0?e.left=i:u>a?e.left=i+s-t.collisionWidth:e.left=i:u>0?e.left+=u:a>0?e.left-=a:e.left=r(e.left-o,e.left)},top:function(e,t){var n=t.within,i=n.isWindow?n.scrollTop:n.offset.top,s=t.within.height,o=e.top-t.collisionPosition.marginTop,u=i-o,a=o+t.collisionHeight-s-i,f;t.collisionHeight>s?u>0&&a<=0?(f=e.top+u+t.collisionHeight-s-i,e.top+=u-f):a>0&&u<=0?e.top=i:u>a?e.top=i+s-t.collisionHeight:e.top=i:u>0?e.top+=u:a>0?e.top-=a:e.top=r(e.top-o,e.top)}},flip:{left:function(e,t){var n=t.within,r=n.offset.left+n.scrollLeft,s=n.width,o=n.isWindow?n.scrollLeft:n.offset.left,u=e.left-t.collisionPosition.marginLeft,a=u-o,f=u+t.collisionWidth-s-o,l=t.my[0]==="left"?-t.elemWidth:t.my[0]==="right"?t.elemWidth:0,c=t.at[0]==="left"?t.targetWidth:t.at[0]==="right"?-t.targetWidth:0,h=-2*t.offset[0],p,d;if(a<0){p=e.left+l+c+h+t.collisionWidth-s-r;if(p<0||p<i(a))e.left+=l+c+h}else if(f>0){d=e.left-t.collisionPosition.marginLeft+l+c+h-o;if(d>0||i(d)<f)e.left+=l+c+h}},top:function(e,t){var n=t.within,r=n.offset.top+n.scrollTop,s=n.height,o=n.isWindow?n.scrollTop:n.offset.top,u=e.top-t.collisionPosition.marginTop,a=u-o,f=u+t.collisionHeight-s-o,l=t.my[1]==="top",c=l?-t.elemHeight:t.my[1]==="bottom"?t.elemHeight:0,h=t.at[1]==="top"?t.targetHeight:t.at[1]==="bottom"?-t.targetHeight:0,p=-2*t.offset[1],d,v;a<0?(v=e.top+c+h+p+t.collisionHeight-s-r,e.top+c+h+p>a&&(v<0||v<i(a))&&(e.top+=c+h+p)):f>0&&(d=e.top-t.collisionPosition.marginTop+c+h+p-o,e.top+c+h+p>f&&(d>0||i(d)<f)&&(e.top+=c+h+p))}},flipfit:{left:function(){e.ui.position.flip.left.apply(this,arguments),e.ui.position.fit.left.apply(this,arguments)},top:function(){e.ui.position.flip.top.apply(this,arguments),e.ui.position.fit.top.apply(this,arguments)}}},function(){var t,n,r,i,s,o=document.getElementsByTagName("body")[0],u=document.createElement("div");t=document.createElement(o?"div":"body"),r={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},o&&e.extend(r,{position:"absolute",left:"-1000px",top:"-1000px"});for(s in r)t.style[s]=r[s];t.appendChild(u),n=o||document.documentElement,n.insertBefore(t,n.firstChild),u.style.cssText="position: absolute; left: 10.7432222px;",i=e(u).offset().left,e.support.offsetFractions=i>10&&i<11,t.innerHTML="",n.removeChild(t)}(),e.uiBackCompat!==!1&&function(e){var n=e.fn.position;e.fn.position=function(r){if(!r||!r.offset)return n.call(this,r);var i=r.offset.split(" "),s=r.at.split(" ");return i.length===1&&(i[1]=i[0]),/^\d/.test(i[0])&&(i[0]="+"+i[0]),/^\d/.test(i[1])&&(i[1]="+"+i[1]),s.length===1&&(/left|center|right/.test(s[0])?s[1]="center":(s[1]=s[0],s[0]="center")),n.call(this,e.extend(r,{at:s[0]+i[0]+" "+s[1]+i[1],offset:t}))}}(jQuery)
 })(J2S.__$);
}catch (e) {
	System.err.println("JQueryUI failed to load jQuery.ui.position -- jQuery version conflict?");
}
		 */
		
		

		// BH 2024.06.28
		
	htResource.put(RESOURCE_J2SCOMBOBOX, ";(function($) {\n" + 
			"\n" + 
			"J2S.__makeComboBox = function() {\n" + 
			"  J2S.__makeComboBox = function(){};	\n" + 
			"  \n" + 
			"  $( function() {\n" + 
			"    $('head').append('<style>.j2scb-sel {background-color:#B8CFE5;}'\n" + 
			"    		+'\\n.j2scb-unsel {background-color:inherit;}'\n" + 
			"    		+'\\n.j2scb-hov {background-color:lightblue;}'\n" + 
			"    		+'\\n.j2scbcont {position:absolute; left:0px;top:0px;}'\n" + 
			"    		+'\\n.j2scbhead {position:absolute; left:0px;top:0px;text-align:left;overflow:hidden;padding:0px 2px 1px 2px}'\n" + 
			"    		+'\\n.j2scbbtn {position:absolute; leftbackground-color:inherit;:100px;top:0px; width:20px;text-align:center;cursor:pointer;background-color:lightblue;padding:0px}'\n" + 
			"    		+'\\n.j2scbpopup {position:absolute; list-style:none}'\n" + 
			"    		+'\\n.j2scblist {background-color:inherit;position:absolute; left:0px;top:0px;margin:0;border:black solid 1px;cursor:pointer;text-align:left;padding:0em;scrollbar-width:thin;cursor:pointer;}</style>'\n" + 
			"    );\n" + 
			"    \n" + 
			"    var CLOSE_DELAY = 100; // BH 2019.10.04 50 was just a bit too fast; could close early\n" + 
			"        \n" + 
			"    // the widget definition, where 'custom' is the namespace,\n" + 
			"    // 'j2sCB' the widget name\n" + 
			"\n" + 
			"    $.widget( 'custom.j2sCB', {\n" + 
			"    	\n" + 
			"      options: {\n" + 
			"    	mode: 's', // or 'm'\n" + 
			" 		height: 0,\n" + 
			" 		items: null,\n" + 
			" 		disabled: false,\n" + 
			" 		popupVisible: false,\n" + 
			" 		selectedIndex: -1,\n" + 
			" 		backgroundColor: \"blue\",\n" + 
			" 		// z-index\n" + 
			" 		zIndex:999999,\n" + 
			" 		name:null,\n" + 
			"        // Callbacks\n" + 
			"        change: null\n" + 
			"      },\n" + 
			"      itemCount: 0,\n" + 
			"      \n" + 
			"      id: function() {return this.element[0].id},\n" + 
			"      find: function(x) {return this.element.find(x)},\n" + 
			"      on: function(a, x) {for(var i = a.length; --i >= 0;)this._on(a[i],x)},\n" + 
			"      on2: function(obj, evts, handle) {var a = {};for(var i = evts.length; --i >= 0;)a[evts[i]]=handle;this._on(obj, a)},\n" + 
			"\n" + 
			"  	  popupVisible: function() { return this.options.popupVisible; }, \n" + 
			"\n" + 
			"  	  setHeight: function(h) {\n" + 
			"		  this.options.height = h;\n" + 
			"	  },\n" + 
			"      setZIndex: function(z) {\n" + 
			"    	this.options.zIndex = z;\n" + 
			"      },\n" + 
			"      \n" + 
			"      _mouse: function(e) { \n" + 
			"    	  var opt = $(e.target).closest('.j2scbopt');\n" + 
			"    	  this._trigger('change', e, [this, 'mouse', (opt[0] ? opt[0].j2scbIndex : -1)])\n" + 
			"      },\n" + 
			"      _keyEvent: function(e) {\n" + 
			"    	  this._trigger('change', e, [this, 'keyevent']);\n" + 
			"      },\n" + 
			" \n" + 
			"      // Called when created, and later when changing options\n" + 
			"      _refresh: function() {\n" + 
			" \n" + 
			"        // Trigger a callback/event\n" + 
			"        this._trigger( 'change' , null, [this, \"refreshed\"] );\n" + 
			"      },\n" + 
			" \n" + 
			"      // The constructor\n" + 
			"      _create: function() {\n" + 
			"    	var id = this.id();\n" + 
			"        this.element.addClass( 'custom-j2sCB' );\n" + 
			"        this.cont = $( '<div>', {'class': 'j2scbcont', 'id':id+'_cont' });\n" + 
			"        this.cont.append(this.head = $( '<button>', {'class': 'j2scbhead', 'id':id+'_head' }));\n" + 
			"        this.cont.append(this.btn = $( '<button>', {'class': 'j2scbbtn', 'id':id+'_btn' , text:'\\u25bc'}));\n" + 
			"        this.btn.addClass(\"swingjs-ui\");\n" + 
			"        this.popup = $( '<div>', {'class': 'j2scbpopup', 'name':this.options.name, 'id':id+'_popup' });\n" + 
			"        this.popup.css({\n" + 
			"        	display:'none'\n" + 
			"        });\n" + 
			"        this.list = $( '<ul>', {'class': 'j2scblist', 'id':id+'_list' });\n" + 
			"        this.on2(this.list, 'click pointerdown mousedown touchstart mousemove touchmove pointermove pointerup mouseup touchend mousewheel mouseover mouseout mouseenter mouseexit'.split(' '), '_mouse');\n" + 
			"        this.popup.append(this.list);        \n" + 
			"        this.element.append(this.cont);\n" + 
			"        // important to add popup after body so that it does not take on any body attributes \n" + 
			"        $('body').after(this.popup);\n" + 
			"        this.updateCSS();    	\n" + 
			"        this.on( [this.head, this.btn, this.cont], { click: '_tog' });\n" + 
			"        this.on( [this.popup, this.list], {mouseover: '_stopT' });\n" + 
			"        this.on( [this.cont, this.head, this.btn, this.popup, this.list], {\n" + 
			"        	mouseleave: '_close'//,\n" + 
			"        	//keydown: '_keyEvent'\n" + 
			"        		});\n" + 
			"        \n" + 
			"        if (this.options.items)\n" + 
			"        	this.add(this.options.items, 1);\n" + 
			"        \n" + 
			"        this.setSelectedIndex(this.options.selectedIndex)\n" + 
			"        this._refresh();\n" + 
			"      },\n" + 
			"      // Events bound via _on are removed automatically\n" + 
			"      // revert other modifications here\n" + 
			"      _destroy: function() {\n" + 
			"        // remove generated elements\n" + 
			"        this.cont.remove();\n" + 
			"        // must append to body, as otherwise it is not actually removed\n" + 
			"        $(\"body\").append(this.popup);\n" + 
			"        this.popup.remove();\n" + 
			"        this.element\n" + 
			"          .removeClass( 'custom-j2sCB' )\n" + 
			"          .enableSelection()\n" + 
			"          .css( 'background-color', 'transparent' );\n" + 
			"		this._trigger('change', null, [this, 'destroyed']);\n" + 
			"      },\n" + 
			" \n" + 
			"      // _setOptions is called with a hash of all options that are changing\n" + 
			"      // always refresh when changing options\n" + 
			"      _setOptions: function() {\n" + 
			"        // _super and _superApply handle keeping the right this-context\n" + 
			"        this._superApply( arguments );\n" + 
			"        this._refresh();\n" + 
			"      },\n" + 
			" \n" + 
			"      // _setOption is called for each individual option that is changing\n" + 
			"      _setOption: function( key, value ) {\n" + 
			"    	  if (key == \"disabled\") {\n" + 
			"    		  this.options.disabled = true;\n" + 
			"    	  }\n" + 
			"        //[prevent invalid value here with test and return]\n" + 
			"        this._super( key, value );\n" + 
			"      },\n" + 
			"\n" + 
			"      update: function(andTrigger) {\n" + 
			"   		 var sel = this._selectedItem();\n" + 
			"   		 var all;\n" + 
			"   		 var i = (sel[0] ? sel[0].j2scbIndex : -1);\n" + 
			"   		 this.options.selectedIndex = i;\n" + 
			"   		 if (sel.length == 0) {\n" + 
			"   			 this.head.text(\"\");\n" + 
			"   		 } else if (this.options.mode == 's') {\n" + 
			"   			 var item = this.list[\"j2shead\"+i];\n" + 
			"   			 if (item) {\n" + 
			"   				 this.head[0].removeChild(this.head[0].firstChild);\n" + 
			"   				 item.style.top=\"0px\";\n" + 
			"   				 this.head[0].appendChild(item);\n" + 
			"   			 } else {\n" + 
			"   				 this.head.text(sel.text());\n" + 
			"   			 }\n" + 
			"   		 } else {\n" + 
			"   	   		 this.head.text(sel.length + ' of ' \n" + 
			"   	   					+ (all = this.list.find('.j2scbopt').length) + ' selected option' + (all > 1 ? 's' :''));\n" + 
			"   		 }\n" + 
			"   		 if (andTrigger)\n" + 
			" 	      	this._trigger( 'change' , null, [this, \"selected\", sel[0].j2scbIndex]);\n" + 
			"// 	     else\n" + 
			"// 	    	 this._stopT(\"update\");\n" + 
			"       },  \n" + 
			"      updateList: function(items) {\n" + 
			"    	  this.list.children().detach();\n" + 
			"    	  this.add(items, 1);\n" + 
			"	  },\n" + 
			"      updateList2: function(items) {\n" + 
			"    	  this.list.children().detach();\n" + 
			"    	  this.add(items, 2);\n" + 
			"	  },\n" + 
			"      add: function(items, step) {\n" + 
			"      	  var y = 0;\n" + 
			"    	  if (Array.isArray(items)) {\n" + 
			"        	this.itemCount = 0;    		\n" + 
			"    	  } else {\n" + 
			"    	  	this.list.children().each(function(a) {y += a.height()});\n" + 
			"    		items = [items];  \n" + 
			"    	  }\n" + 
			"    	  for (var i = 0; i < items.length; i += step) {\n" + 
			"    		var item = items[i];\n" + 
			"    		if (!item)continue;\n" + 
			"    		var opt = $('<li>', {'class':'j2scbopt j2scb-unsel', 'id': this.id() + '_opt' + this.itemCount});\n" + 
			"    		var pt = opt[0].j2scbIndex = this.itemCount++;    		\n" + 
			"    		this.list.append(opt);\n" + 
			"			if (typeof item == 'string') {\n" + 
			"				opt.text(item);\n" + 
			"    		} else {\n" + 
			"    			var ji = $(item);\n" + 
			"    			ji.css(\"background-color\", \"transparent\");\n" + 
			"    			opt.append(item);\n" + 
			"    			opt.css({height:ji.css(\"height\")});\n" + 
			"	    		y += opt.height();\n" + 
			"	    		if (step == 2)\n" + 
			"	    			this.list[\"j2shead\" + pt] = items[i + 1];\n" + 
			"    		}\n" + 
			"    		this.list.css({height: (y + 2) + \"px\"});\n" + 
			"	        this._on(opt, {mouseleave: '_close', mouseover: '_overOpt', click : '_clickOpt', touchend : '_clickOpt', pointerup : '_clickOpt', mouseup : '_clickOpt'});\n" + 
			"    	  }\n" + 
			"      },\n" + 
			"      updateCSS: function() {\n" + 
			"    	  var cbox = this.cont.parent();\n" + 
			"    	  var bg = cbox.css(\"background-color\");\n" + 
			"    	  this.options.backgroundColor = bg;\n" + 
			"    	  var font = {\"font-family\": cbox.css(\"font-family\")\n" + 
			"    			  , \"font-size\": cbox.css(\"font-size\")\n" + 
			"    			  , \"font-weight\": cbox.css(\"font-weight\")\n" + 
			"    			  , \"font-style\": cbox.css(\"font-style\")\n" + 
			"    			  , \"font-style\": cbox.css(\"font-style\")\n" + 
			"    			  , backgroundColor: bg\n" + 
			"    			  }; 	  \n" + 
			"          var w = this.element.width();\n" + 
			"          if (w == 0)\n" + 
			"        	  return;\n" + 
			"          var h = this.element.height() + 'px';\n" + 
			"          this.cont.css({\n" + 
			"          	width: (w - 2) + 'px',\n" + 
			"          	height: h,\n" + 
			"          	backgroundColor: bg\n" + 
			"          });\n" + 
			"          this.head.css({\n" + 
			"          	width: (w - 20) + 'px',\n" + 
			"          	height: h\n" + 
			"          });\n" + 
			"          this.head.css(font);\n" + 
			"          this.btn.css({\n" + 
			"          	left: (w - 20) + 'px',\n" + 
			"          	height: h,\n" + 
			"          	backgroundColor: bg\n" + 
			"          });\n" + 
			"          h = (this.options.height ? this.options.height + 'px' : null);\n" + 
			"          this.popup.css({\n" + 
			"            width: w + 'px',\n" + 
			"        	height: h\n" + 
			"         });  \n" + 
			"          this.popup.css(font);\n" + 
			"          this.list.css({\n" + 
			"            width: w + 'px',\n" + 
			"          	height: h,\n" + 
			"          	overflowY: (h ? null : 'auto')\n" + 
			"          }); \n" + 
			"          this.list.css(font);\n" + 
			"          font[\"font-size\"] = \"0.7em\";\n" + 
			"          this.btn.css(font);\n" + 
			"      },\n" + 
			"      \n" + 
			"      setSelectedIndex: function(n) { return this._clickOpt({target: $('#' + this.id() + '_opt' + n)}, false) },\n" + 
			"      _selectedItem: function() { return this.list && this.list.find('.j2scb-sel') },\n" + 
			"            \n" + 
			"      setText: function(s) { this.head.text(s) },\n" + 
			"      hoverOver: function(i) {\n" + 
			"      	this._overOpt(i >= 0 ? this.list[0].children[i] : null);  \n" + 
			"        },\n" + 
			"      showPopup: function() { this._open(null);},\n" + 
			"      _tog: function(e) {\n" + 
			"    	  if (this.popup.css(\"display\") == \"block\") {\n" + 
			"    		  this.hidePopup();\n" + 
			"    	  } else {\n" + 
			"    		  var me = this;\n" + 
			"    		setTimeout(function(){ me._open(e) },100);\n" + 
			"    	  }\n" + 
			"    	  return false;\n" + 
			"      },\n" + 
			"  	  _open: function(e) {\n" + 
			"  		this.cont.focus();\n" + 
			"  		if (this.options.disabled)\n" + 
			"  			return;\n" + 
			"		this._stopT(\"_open\");\n" + 
			"		var loc = this.element.offset();\n" + 
			"		if (e)\n" + 
			"			this._trigger('change', null, [this, 'opening']);\n" + 
			"		this.options.popupVisible = true;\n" + 
			"	 	this.popup.css({\n" + 
			"	 		'display':'block',\n" + 
			"	 		left: loc.left + 'px',\n" + 
			"        	top: (loc.top + this.element.height()) + 'px',\n" + 
			"        	width:this.element.css('width') - 2,\n" + 
			"	 		'z-index': this.options.zIndex\n" + 
			"	 	});\n" + 
			"	  	this.list.scrollTop(0);\n" + 
			"	  	this.element.focus();\n" + 
			"	  },\n" + 
			"  	  hidePopup: function() {\n" + 
			"  		  // we need a time click here\n" + 
			"  		 var me = this;\n" + 
			"  		 setTimeout(function(){\n" + 
			"   		 if (me.options.popupVisible) {\n" + 
			"   			me.options.popupVisible = false;\n" + 
			"   			me.popup.hide();\n" + 
			"   		 }\n" + 
			"  		},10);\n" + 
			"   	  },\n" + 
			"      _overOpt: function(e) {\n" + 
			"    	  this._stopT(\"_overOpt\");\n" + 
			"    	  this.list.find('.j2scbopt').removeClass('j2scb-hov j2scb-sel');\n" + 
			"    	  var opt = $(e && e.target || e).closest('.j2scbopt');\n" + 
			"    	  opt.addClass('j2scb-hov');\n" + 
			"    	  this.options.hoveredIndex = (opt[0] ? opt[0].j2scbIndex : -1);\n" + 
			"      },\n" + 
			"      _clickOpt: function(e, andTrigger) {\n" + 
			"    	    andTrigger |= (arguments.length == 1);\n" + 
			"    	    var opt = $(e.target || e).closest('.j2scbopt');\n" + 
			"    	  	var opts = this.list.find('.j2scbopt');\n" + 
			"    	  	opts.removeClass('j2scb-hov');\n" + 
			"	    	if (this.options.mode=='s') {\n" + 
			"	    		opts.removeClass('j2scb-sel');\n" + 
			"	    	    opts.addClass('j2scb-unsel');\n" + 
			"	    	    opt.removeClass('j2scb-unsel');\n" + 
			"	    	    opt.addClass('j2scb-sel');\n" + 
			"	    	    if (andTrigger)\n" + 
			"	    	    	this._close();\n" + 
			"	    	} else if (mode == 'm') {  \n" + 
			"	    		  if (opt.is('.j2scb-sel')) {\n" + 
			"	    			opt.addClass('j2scb-unsel');\n" + 
			"	    			opt.removeClass('j2scb-sel');\n" + 
			"	    	      } else {\n" + 
			"	    			opt.addClass('j2scb-sel');\n" + 
			"	    			opt.removeClass('j2scb-unsel');\n" + 
			"	    	      }  \n" + 
			"	    	}  \n" + 
			"	    	this.update(andTrigger);\n" + 
			"	    	return opt;\n" + 
			"      },\n" + 
			"      _stopT: function(why) {\n" + 
			"    	  clearTimeout(this.t);\n" + 
			"    	  this.t = 0;\n" + 
			"      },\n" + 
			"      _close: function() {\n" + 
			"          if (this.t)return;\n" + 
			"          var me = this;\n" + 
			"          this.t = setTimeout(function() {  \n" + 
			"      		  me.hidePopup();\n" + 
			"      		  me.t = 0;\n" + 
			"      	  },CLOSE_DELAY);\n" + 
			"      }\n" + 
			"      \n" + 
			"    });\n" + 
			" \n" + 
			"  });\n" + 
			"  \n" + 
			"};  \n" + 
			"\n" + 
			"})(J2S.__$);\n" + 
			"");
	
	// BH 2024.06.28
	
		
	htResource.put(RESOURCE_J2SMENU, ";(function(Swing, $) {\n" + 
			"\n" + 
			"J2S.__makeMenu = function() {\n" + 
			"// run once; set to NOP\n" + 
			"J2S.__makeMenu = function(){};	\n" + 
			"\n" + 
			"\n" + 
			" var MODE_UNKNOWN = 0;\n" + 
			" var MODE_TOUCH = 1;\n" + 
			" var MODE_MOUSE = 2;\n" + 
			"\n" + 
			" var outActive;\n" + 
			" var vart;\n" + 
			"\n" + 
			" var n=!1, e = $;\n" + 
			"\n" + 
			" // local methods here for help with debugging\n" + 
			"	\n" + 
			" \n" + 
			" // BH note that swingjs.plaf.JSButton will set and clear ui-state-disabled on its own\n" + 
			" \n" + 
			"\n" + 
			" var delayMe = function(element, f, ms) {\n" + 
			"	 var id = element._delay(f, ms);\n" + 
			"	 return id;\n" + 
			" }	\n" + 
			" \n" + 
			" var clearMe = function(id, why) {\n" + 
			"	 return clearTimeout(id);\n" + 
			" }\n" + 
			"\n" + 
			" var someMenuOpen = function() {\n" + 
			"	 return $(\".swingjsPopupMenu:visible\").length > 0;\n" + 
			" }\n" + 
			" \n" + 
			" var closeOnLeave = function(me, t) {\n" + 
			"	 	$.contains(me.element[0],me.document[0].activeElement)\n" + 
			"	 	  ||me.collapseAll(t)\n" + 
			" }\n" + 
			" \n" + 
			" var cleanText = function(n) {\n" + 
			"	 return n && n.innerText.replace(/\\n/g,\"|\");\n" + 
			" }\n" + 
			" \n" + 
			" var CLICK_OUT_DELAY = 200;// ms; 100 was too fast\n" + 
			" var CLOSE_DELAY = 700;\n" + 
			" \n" + 
			" var setCloseTimer = function(me) {\n" + 
			"	 if (vart)\n" + 
			"		 clearTimeout(vart);\n" + 
			"     vart = me.t = setTimeout(function() {  	 \n" + 
			"    	 me._getT();\n" + 
			"    	 me._stopT(\"closeTimer collapsing\");\n" + 
			"    	 me.collapseAll();\n" + 
			" 		  vart = me.t = 0;\n" + 
			" 	  },CLOSE_DELAY);\n" + 
			" }\n" + 
			" var setCollapseTimer = function(me, t) {\n" + 
			"	 //System.err.println(\"collapseAll \" + me.uuid);\n" + 
			"	 me.timer = delayMe(me,\n" + 
			"       function(){\n" + 
			"		 doCmd(\"clearClickOut\", me);\n" + 
			"		 if (!someMenuOpen())\n" + 
			"			 return;\n" + 
			"		 var r=n?me.element:e(t&&t.target).closest(me.element.find(\".ui-j2smenu\"));\n" + 
			"		 r.length||(r=me.element);\n" + 
			"		 me._closeSubmenus(r);\n" + 
			"		 me.unsetFocus(t);\n" + 
			"		 me.activeMenu=r;\n" + 
			"		 me.closed = true;\n" + 
			"	   }, me.delay); \n" + 
			"\n" + 
			" }\n" + 
			" \n" + 
			" var myMenuItem = function(t) { return $(t).closest(\".ui-j2smenu-item\") }\n" + 
			" var myMenuBar = function(t) { return $(t).closest(\".j2s-menuBar-menu\") }\n" + 
			" var myMenu = function(t) { return $(t).closest(\".ui-j2smenu\") }\n" + 
			" var isPopupMenu = function(t) { return t && t.is(\".ui-j2s-popup-menu\") }\n" + 
			" var isDisabled = function(t) { return t && t.is(\".ui-state-disabled\") }\n" + 
			" var isMenu = function(t) { return t && (t.has(\".ui-j2smenu\").length > 0) }\n" + 
			" \n" + 
			" var doCmd = function(trigger,me,t,n,why) {\n" + 
			"	 \n" + 
			"	 var debug = function(){}\n" + 
			"	 \n" + 
			"	 debug(\"j2sMenu trigger \" + trigger + \" \" + (me.active && me.active[0].innerText.split(\"\\n\").join(\"-\")))\n" + 
			"	 \n" + 
			"	 why || (why = \"\");\n" + 
			"	 var event = t;\n" + 
			"	 var target = (!t || !t.target ? null : myMenuItem(t.target)[0]);\n" + 
			"\n" + 
			"	 switch(trigger) {\n" + 
			"	 case \"onoutn\":\n" + 
			"		 me._closeMe();\n" + 
			"		 break;\n" + 
			"	 case \"onmoven\":\n" + 
			"		 me.clickoutDisabled = false;\n" + 
			"		 if ($(target).hasClass(\"ui-j2smenu\")) {\n" + 
			"			 // this is the most likely way we will leave, via a mousemove on the border\n" + 
			"			 me._closeMe();  \n" + 
			"			 break;\n" + 
			"		 }\n" + 
			"	 case \"onmovep\":\n" + 
			"	 case \"onovern\":\n" + 
			"		 me.clickoutDisabled = false;\n" + 
			"		 me._stopT(trigger);\n" + 
			"		 if (!t)return;\n" + 
			"		 // BH 2018\n" + 
			"		 // -- added stopPropagation\n" + 
			"		 // -- changed to mouseover from mouseenter, since we have children\n" + 
			"		 var a = myMenuItem(target)\n" + 
			"		 if (a.hasClass(\".ui-state-focus\"))\n" + 
			"			 return;		 \n" + 
			"		 if (!a.hasClass(\"j2s-popup-menu\") && !a.hasClass(\"ui-j2smenu-node\")) {\n" + 
			"			 me._closeSubmenus(a.parent());			 \n" + 
			"		 }\n" + 
			"		 var m = a;\n" + 
			"		 //testing a = a.find(\".a\");\n" + 
			"		 a[0] && a[0].focus();\n" + 
			"		 var n=myMenuItem(t.currentTarget);\n" + 
			"		 n.siblings().children(\".ui-state-active\").removeClass(\"ui-state-active\");\n" + 
			"		 t.stopPropagation();\n" + 
			"		 me.setFocus(t,n);\n" + 
			"		 t = m;\n" + 
			"		 break;\n" + 
			"	 case \"onpress\":\n" + 
			"		var n=myMenuItem(target);\n" + 
			"		me.setFocus(t,n);\n" + 
			"		me.elementPressed = n[0];\n" + 
			"	 case \"onrelease\":\n" + 
			"	 case \"onclick\":\n" + 
			"		var n=myMenuItem(target);\n" + 
			"		if (isDisabled(n) || n[0] != me.elementPressed)\n" + 
			"			return;\n" + 
			"		if (isDisabled(n.first()))\n" + 
			"			break;\n" + 
			"		me.select(t);\n" + 
			"		var doOpen = isPopupMenu(n.first());\n" + 
			"		if (doOpen) {\n" + 
			"			// must disable clickout in progress, or a click here will close all menus just after expanding\n" + 
			"			me.clickoutDisabled = true;\n" + 
			"			me.expand(t);\n" + 
			"		} else {\n" + 
			"			if (!me.element.is(\":focus\")) {\n" + 
			"				me.element.trigger(\"setFocus\",[!0]);\n" + 
			"				me.active&&me.active.parents(\".ui-j2smenu\").length===1&&clearMe(me.timer, trigger);\n" + 
			"			} \n" + 
			"			if (me.mouseState != MODE_TOUCH)\n" + 
			"				doCmd(\"collapseAll\", me, 0, 1);			 \n" + 
			"		}\n" + 
			"		break;\n" + 
			"	 case \"clearClickOut\":\n" + 
			"		 me._off(me.document, \"click\");\n" + 
			"		 outActive = null;\n" + 
			"		 me._stopT(\"clearClickOut\");\n" + 
			"		 return;\n" + 
			"	 case \"setClickOut\":\n" + 
			"		 if (me.clickoutDisabled)\n" + 
			"			 return;\n" + 
			"		 if (outActive)\n" + 
			"			 doCmd(\"clearClickOut\", outActive);\n" + 
			"		 setTimeout(function(){	\n" + 
			"			 if (me.clickoutDisabled)\n" + 
			"				 return;\n" + 
			"			 outActive = me;\n" + 
			"			 me._on(me.document,{ \"click\":function(t){doCmd(\"onclick_out\", me, $, t),n=!1}});			 			 \n" + 
			"		 },CLICK_OUT_DELAY);\n" + 
			"		 return;\n" + 
			"	 case \"onclick_out\":\n" + 
			"		 if (me.clickoutDisabled || outActive != me || !someMenuOpen()) {\n" + 
			"			 me.clickoutDisabled = false;\n" + 
			"			 doCmd(\"clearClickOut\", me);\n" + 
			"			 return;\n" + 
			"		 }		 \n" + 
			"		 myMenuBar(target).length == 0 && (myMenu(target).length||me.collapseAll(t));\n" + 
			"	 	return;\n" + 
			"	 case \"onleave\":\n" + 
			"		 if (me.mouseState != MODE_TOUCH)\n" + 
			"		   me._closeMe(\"onleave\");\n" + 
			"		 return;\n" + 
			"	 case \"onfocus\":\n" + 
			"		 n||me.setFocus(t,me.active||me.element.children(\".ui-j2smenu-item\").eq(0));\n" + 
			"		 return;\n" + 
			"	 case \"onblur\":\n" + 
			"		 me.timer = delayMe(me, function(){closeOnLeave(me, t)});\n" + 
			"		 break;\n" + 
			"	 case \"_activate\":\n" + 
			"		 isDisabled(me.active)||(me.active.children(\".a[aria-haspopup='true']\").length?me.expand(t):me.select(t));\n" + 
			"		 break;\n" + 
			"	 case \"_startOpening\":\n" + 
			"		 if(t.attr(\"aria-hidden\")!==\"true\" && t.css('display') !== 'none') {\n" + 
			"			 return;\n" + 
			"		 }\n" + 
			"		 me.closed = false;\n" + 
			"		 //me.timer=delayMe(me, function(){\n" + 
			"			 me._closeSubmenus(),me._openSubmenu(t);\n" + 
			"		//	 },me.delay);\n" + 
			"		 return;\n" + 
			"	 case \"_hidePopupMenu\":\n" + 
			"		 // trigger Java to deselect these - the JMenu class\n" + 
			"		 me.mouseState = MODE_UNKNOWN; // unknown\n" + 
			"		 t = me.element.find(\".ui-j2smenu[aria-hidden!=true]\").attr(\"aria-hidden\",\"true\").parent();\n" + 
			"		 var a = me;\n" + 
			"		 doCmd(\"_hide\", a, a.element);\n" + 
			"		 if (!t[0])\n" + 
			"			 return;\n" + 
			"		 break;\n" + 
			"	 case \"_openSubmenu\":\n" + 
			"		 n||(n = me.active || me.activeMenu);\n" + 
			"		 if (isDisabled(n))\n" + 
			"			 return;\n" + 
			"		 var item = n[0].firstElementChild;\n" + 
			"		 var li = n;\n" + 
			"		 n = e.extend({of:n},me.options.position);\n" + 
			"		 me._stopT(\"opening\");\n" + 
			"		 clearMe(me.timer, trigger);\n" + 
			"		 var ui = me.activeMenu && me.activeMenu[0] && me.activeMenu[0][\"data-ui\"];\n" + 
			"	 	 ui && ui.processJ2SMenuCmd$OA([trigger,me,null,t.parent(),n,why]);\n" + 
			"		 // adds role=xxxx\n" + 
			"	 	 me.refresh(\"_openSubmenu\",n);\n" + 
			"		 // adds mouse binding to role=menuitem\n" + 
			"	 	 ensureMouseSet(ui.popupMenu, li);\n" + 
			"		 var v = me.element.find(\".ui-j2smenu\").not(t.parents(\".ui-j2smenu\"));\n" + 
			"		 doCmd(\"_hide\", me, v);\n" + 
			"		 try {\n" + 
			"			 // required if menu has been modified\n" + 
			"			 doCmd(\"_show\", me, me.activeMenu);\n" + 
			"			 doCmd(\"_show\", me, t);\n" + 
			"			 t.removeAttr(\"aria-hidden\").attr(\"aria-expanded\",\"true\").position(n);\n" + 
			"			 me.closed = false;\n" + 
			"		 } catch(err){\n" + 
			"			 System.err.println(\"j2sMenu error: \" + err);\n" + 
			"		 }\n" + 
			"		 return;\n" + 
			"	 case \"closeSiblingMenus\":\n" + 
			"		 var m = t.closest(\"ul\").find(\".ui-state-active\")\n" + 
			"		 m.removeClass(\"ui-state-active\");\n" + 
			"		 var v = t.find(\".ui-j2smenu\");\n" + 
			"		 if (!v.length)\n" + 
			"			 return;\n" + 
			"		 doCmd(\"_hide\", me, v);\n" + 
			"		 v.attr(\"aria-hidden\",\"true\").attr(\"aria-expanded\",\"false\");\n" + 
			"		 t = v.parent();\n" + 
			"		 return;\n" + 
			"	 case \"_closeSubmenus\":\n" + 
			"		 var a = me.active;\n" + 
			"		 if (a && a[0] && a[0][\"data-component\"].getUIClassID$() != \"MenuUI\")\n" + 
			"			return;\n" + 
			"		 t||(t=me.active?me.active.parent():me.element);\n" + 
			"		 var m = t.closest(\"ul\").find(\".ui-state-active\")\n" + 
			"		 m.removeClass(\"ui-state-active\");\n" + 
			"		 var v = t.find(\".ui-j2smenu\");\n" + 
			"		 if (!v.length)\n" + 
			"			 return;\n" + 
			"		 doCmd(\"_hide\", me, v);\n" + 
			"		 v.attr(\"aria-hidden\",\"true\").attr(\"aria-expanded\",\"false\");\n" + 
			"		 t = v.parent();\n" + 
			"		 break;\n" + 
			"	 case \"_move\":\n" + 
			"		 var a = n[0];\n" + 
			"		 var b = n[1];\n" + 
			"		 var r = me.active&&\n" + 
			"				 (a===\"first\"||a===\"last\"? me.active[a===\"first\"?\"prevAll\":\"nextAll\"](\".ui-j2smenu-item\").eq(-1)\n" + 
			"				   : me.active[a+\"All\"](\".ui-j2smenu-item\").eq(0));\n" + 
			"		 if(!r||!r.length||!me.active)\n" + 
			"			 r=me.activeMenu.children(\".ui-j2smenu-item\")[b]();\n" + 
			"		 me._closeSubmenus(r);\n" + 
			"		 me.setFocus(t,r);\n" + 
			"		 return;\n" + 
			"	 case \"_show\":\n" + 
			"		 t.show();\n" + 
			"		 break;\n" + 
			"	 case \"_hide\":\n" + 
			"		 if (!t[0])\n" + 
			"			 return;\n" + 
			"		 t.hide();\n" + 
			"		 break;\n" + 
			"	 case \"expand\":\n" + 
			"    	 if (!someMenuOpen() || isDisabled(me.active))\n" + 
			"			 return;\n" + 
			"		 n = me.active&&me.active.children(\".ui-j2smenu\").children(\".ui-j2smenu-item\").first();\n" + 
			"		 if (n&&n.length) {\n" + 
			"			 me._openSubmenu(n.parent());\n" + 
			"			 //me.timer = delayMe(me,function(){\n" + 
			"				 me.setFocus(t,n)\n" + 
			"				// });\n" + 
			"		 }\n" + 
			"		 break;\n" + 
			"	 case \"collapse\":\n" + 
			"		 if (!someMenuOpen())\n" + 
			"			 return;\n" + 
			"		 me._closeSubmenus();\n" + 
			"		 var v=me.active&&me.active.parent().closest(\".ui-j2smenu-item\",me.element);\n" + 
			"		 if (v && v.length) {\n" + 
			"			 me.setFocus(t,v);\n" + 
			"			 me._closeSubmenus(v);\n" + 
			"		 } else {\n" + 
			"			 doCmd(\"collapseAll\", me, 0, 1);			 \n" + 
			"		 }\n" + 
			"		 break;\n" + 
			"	 case \"collapseAll\":\n" + 
			"		 // touch needs this setTimeout to delay close action until touch is processed\n" + 
			"		 setTimeout(function() {\n" + 
			"			 if (me.closed || me.clickoutDisabled) {\n" + 
			"				 return;\n" + 
			"			 }\n" + 
			"			 doCmd(\"_hidePopupMenu\", me);\n" + 
			"			 clearMe(me.timer, trigger),\n" + 
			"			 setCollapseTimer(me, t)\n" + 
			"		 }, 100);\n" + 
			"		 break;\n" + 
			"	 case \"setFocus\":\n" + 
			"		 me.clickoutDisabled = true;\n" + 
			"		 // we determine this to be a touch because a \n" + 
			"		 // focus from DOWN is made before a focus from OVER or MOVE\n" + 
			"		 if (event.type == \"pointermove\" || event.type == \"pointerover\")\n" + 
			"			 me.mouseState = MODE_MOUSE;// TODO menu only\n" + 
			"		 else if (event.type == \"pointerdown\" && me.mouseState == MODE_UNKNOWN)\n" + 
			"			 me.mouseState = MODE_TOUCH;\n" + 
			"		 var a = n.first();\n" + 
			"		 var u=n.children(\".ui-j2smenu\");\n" + 
			"		 var subIsActive = (a[0] == (me.active && me.active[0]));\n" + 
			"		 if (u.length == 0 && subIsActive)\n" + 
			"			 return;\n" + 
			"		 me.unsetFocus(t,t&&t.type===\"focus\", \"fromSetFocus\");\n" + 
			"		 me._scrollIntoView(n);\n" + 
			"		 // BH added 2024.01.16\n" + 
			"		 n.siblings().each(function(a,b){\n" + 
			"				 doCmd(\"closeSiblingMenus\", me, $(b));\n" + 
			"		 })\n" + 
			"		 me.active=a;\n" + 
			"		 var r=me.active.addClass(\"ui-state-focus\");\n" + 
			"		 //testing var r=me.active.children(\".a\").addClass(\"ui-state-focus\");\n" + 
			"		 me.options.role&&me.element.attr(\"aria-activedescendant\", r.attr(\"id\"));\n" + 
			"		 myMenuItem(me.active.parent()).children(\".a:first\").addClass(\"ui-state-active\");\n" + 
			"		 u.length&&(/^pointer/.test(t.type) || /^mouse/.test(t.type))&&me._startOpening(u);\n" + 
			"		 me.activeMenu=n.parent();\n" + 
			"		 me._trigger(\"focus\",t,{item:n});\n" + 
			"		 t = n;\n" + 
			"		 break;\n" + 
			"	 case \"unsetFocus\":\n" + 
			"		 if (me.active && t && typeof n == \"undefined\" && t.relatedTarget && t.relatedTarget.getAttribute(\"role\") != \"presentation\") {\n" + 
			"			 doCmd(\"_hide\", me, t, me.element);\n" + 
			"		 }\n" + 
			"		 n||clearMe(me.timer);\n" + 
			"		 if(!me.active)return;\n" + 
			"		 me.active.removeClass(\"ui-state-focus\");\n" + 
			"		 // testing me.active.children(\".a\").removeClass(\"ui-state-focus\");\n" + 
			"		 var a = me.active;\n" + 
			"		 me.active=null;\n" + 
			"		 me._trigger(\"blur\",t,{item:a});\n" + 
			"		 t = a;\n" + 
			"		 break;\n" + 
			"	 case \"select\":\n" + 
			"		 if (me.mouseMode == MODE_MOUSE) {\n" + 
			"			 return;\n" + 
			"		 } \n" + 
			"		 me.active=me.active||myMenuItem(target);\n" + 
			"		 if (isMenu(me.active)) {\n" + 
			"			 // the anchor element is the first child.\n" + 
			"			me.clickoutDisabled = !me.active.children().first().is(\".ui-state-active\");\n" + 
			"		 } else {\n" + 
			"			me.collapseAll(t,!0);\n" + 
			"		 }\n" + 
			"		 me._trigger(\"select\",t,{item:me.active});\n" + 
			"		 if (!t[0]) {\n" + 
			"			 return;\n" + 
			"		 }\n" + 
			"		 break;\n" + 
			"	 case \"refresh\":\n" + 
			"		 n=me.options.icons.submenu;\n" + 
			"		 var role=me.options.role;\n" + 
			"		 var r=me.element.find(me.options.menus);\n" + 
			"		 t = r.filter(\":not(.ui-j2smenu)\")\n" + 
			"		   .addClass(\"ui-j2smenu ui-widget ui-widget-content ui-corner-all\");\n" + 
			"		 doCmd(\"_hide\", me, t);\n" + 
			"		 t.attr({role:me.options.role,\"aria-hidden\":\"true\",\"aria-expanded\":\"false\"})\n" + 
			"		   .each(function(){\n" + 
			"			   var t=e(this),r=t.prev(\".a\"),\n" + 
			"			   i=e(\"<span>\").addClass(\"ui-j2smenu-icon ui-icon \"+n)\n" + 
			"			   .attr({role:role})\n" + 
			"			   .data(\"ui-j2smenu-submenu-carat\",!0);\n" + 
			"			   r.attr(\"aria-haspopup\",\"true\").prepend(i);\n" + 
			"			   t.attr(\"aria-labelledby\",r.attr(\"id\"));\n" + 
			"		   });\n" + 
			"		 t=r.add(me.element);\n" + 
			"		 t.children(\":not(.ui-j2smenu-item):has(.a)\").addClass(\"ui-j2smenu-item\")\n" + 
			"		   		.attr(\"role\",\"presentation\").children(\".a\").uniqueId()\n" + 
			"		   		.addClass(\"ui-corner-all\").attr({tabIndex:-1,role:\"menuitem\"});\n" + 
			"		 t.children(\":not(.ui-j2smenu-item)\").addClass(\"ui-widget-content ui-j2smenu-divider\");\n" + 
			"		 t.children(\".ui-state-disabled\").attr(\"aria-disabled\",\"true\");\n" + 
			"		 me.active&&!e.contains(me.element[0],me.active[0])&&me.unsetFocus();\n" + 
			"		 return;\n" + 
			"	 case \"keyActivate\":\n" + 
			"		 \n" + 
			"		 // BH 1/15/2019 key mnemonics\n" + 
			"		 \n" + 
			"		 var node = e(\".j2s-popup-menu  > :visible.ui-mnem-\" + Character.toLowerCase$I(t.keyCode));\n" + 
			"		 switch (node.length) {\n" + 
			"		 case 0:\n" + 
			"			 doCmd(\"onclick\", me, t);\n" + 
			"			 break;\n" + 
			"		 case 1:\n" + 
			"			 doCmd(\"_openSubmenu\", me, node.next(\"ul\"), node);\n" + 
			"			 break;\n" + 
			"		 default:\n" + 
			"			 // ignore multiple hits\n" + 
			"			 break;\n" + 
			"		 }\n" + 
			"		 break;\n" + 
			"	 }\n" + 
			"	 \n" + 
			"	 var ui = me.activeMenu && me.activeMenu[0] && me.activeMenu[0][\"data-ui\"];\n" + 
			" 	 ui && ui.processJ2SMenuCmd$OA([trigger,me,event,t,n,target,why]);\n" + 
			" }\n" + 
			" \n" + 
			"$.widget(\"ui.j2smenu\",{\n" + 
			" version:\"1.9.2\",\n" + 
			" defaultElement:\"<ul>\",\n" + 
			" delay:300,\n" + 
			" options:{icons:{submenu:\"ui-icon-carat-1-e\"},\n" + 
			" menus:\"ul\",\n" + 
			" position:{my:\"left top\",at:\"right top\"},\n" + 
			" role:\"j2smenu\",\n" + 
			" blur:null,\n" + 
			" focus:null,\n" + 
			" select:null,\n" + 
			" jPopupMenu:null\n" + 
			" },\n" + 
			" \n" + 
			" \n" + 
			" _create:function(){\n" + 
			"\n" + 
			"	 this.t = this.timer = 0;\n" + 
			"	 \n" + 
			"	 this.closed = false;\n" + 
			"	 \n" + 
			"//	 if (typeof this.options.delay == \"number\")\n" + 
			"//		 this.delay = this.options.delay;\n" + 
			"	 \n" + 
			"	 this.activeMenu=this.element,\n" + 
			"	 this.element.uniqueId().addClass(\"ui-j2smenu ui-widget ui-widget-content ui-corner-all\")\n" + 
			"	   .toggleClass(\"ui-j2smenu-icons\",!!this.element.find(\".ui-icon\").length)\n" + 
			"	   .attr({role:this.options.role,tabIndex:0})\n" + 
			"	   .bind(\"click\"+this.eventNamespace,e.proxy(function(e){ this.options.disabled&&e.preventDefault() },this)),\n" + 
			"	 this.options.disabled&&this.element.addClass(\"ui-state-disabled\").attr(\"aria-disabled\",\"true\"),\n" + 
			"	 this._on({\n" + 
			"		 \"click .ui-state-disabled > .a\":	function(t){ t.preventDefault() },\n" + 
			"		 \"click .ui-j2smenu-item:has(.a)\":	function(t){ doCmd(\"onclick\",this,t);},\n" + 
			"                 \"pointerdown .ui-j2smenu-item > .a\":   function(t){ doCmd(\"onpress\",this,t) },\n" + 
			"                 \"pointerup .ui-j2smenu-item > .a\":     function(t){ doCmd(\"onrelease\",this,t) },\n" + 
			"		 \"mousedown .ui-j2smenu-item > .a\":	function(t){ doCmd(\"onpress\",this,t) },\n" + 
			"		 \"mouseup .ui-j2smenu-item > .a\":	function(t){ doCmd(\"onrelease\",this,t) },\n" + 
			"		 \"mousemove .swingjsPopupMenu \":	function(t){ doCmd(\"onmovep\",this,t,0); },\n" + 
			"		 \"mouseleave .ui-j2smenu\":			function(t){ doCmd(\"onleave\",this,t); },\n" + 
			"		 \"mousemove .ui-j2smenu-node\":		function(t){ doCmd(\"onmoven\",this,t,0); },\n" + 
			"		 \"mouseout  .ui-j2smenu-node\":		function(t){ doCmd(\"onoutn\",this,t,0); },\n" + 
			"		 \"mouseover .ui-j2smenu-node\":		function(t){ doCmd(\"onovern\",this,t,0); },		 \n" + 
			"		 mouseleave:						function(t){ doCmd(\"onleave\",this,t); },\n" + 
			"		 blur:								function(t){ doCmd(\"onblur\",this,t)},\n" + 
			"		 focus:								function(t,n){ doCmd(\"onfocus\",this,t,n); },\n" + 
			"		 keydown:		\"_keydown\"\n" + 
			"	 }), \n" + 
			"	 this.refresh(\"create\");\n" + 
			" 	},\n" + 
			" _destroy:function(){this.element.removeAttr(\"aria-activedescendant\").find(\".ui-j2smenu\").andSelf()\n" + 
			"	 .removeClass(\"ui-j2smenu ui-widget ui-widget-content ui-corner-all ui-j2smenu-icons\")\n" + 
			"	 .removeAttr(\"role\").removeAttr(\"tabIndex\").removeAttr(\"aria-labelledby\").removeAttr(\"aria-expanded\")\n" + 
			"	 .removeAttr(\"aria-hidden\").removeAttr(\"aria-disabled\").removeUniqueId().show(),\n" + 
			"	 this.element.find(\".ui-j2smenu-item\").removeClass(\"ui-j2smenu-item\")\n" + 
			"	 .removeAttr(\"role\").removeAttr(\"aria-disabled\")\n" + 
			"	 .children(\".a\").removeUniqueId().removeClass(\"ui-corner-all ui-state-hover\")\n" + 
			"	 .removeAttr(\"tabIndex\").removeAttr(\"role\").removeAttr(\"aria-haspopup\").children().each(function(){var t=e(this);t.data(\"ui-j2smenu-submenu-carat\")&&t.remove()}),this.element.find(\".ui-j2smenu-divider\").removeClass(\"ui-j2smenu-divider ui-widget-content\")\n" + 
			"	 },\n" + 
			" _keydown:function(t){\n" + 
			"	t.preventDefault();	 	\n" + 
			"	 var n,r,i,s,o,u=!0;\n" + 
			"	 switch(t.keyCode){\n" + 
			"	 case 16:\n" + 
			"	 case 17:\n" + 
			"	 case 18: // CTRL ALT SHIFT alone\n" + 
			"		 break;\n" + 
			"	 case e.ui.keyCode.PAGE_UP:\n" + 
			"		 this.previousPage(t);\n" + 
			"		 break;\n" + 
			"	 case e.ui.keyCode.PAGE_DOWN:\n" + 
			"		 this.nextPage(t);\n" + 
			"		 break;\n" + 
			"	 case e.ui.keyCode.HOME:\n" + 
			"		 this._move(\"first\",\"first\",t);\n" + 
			"		 break;\n" + 
			"	 case e.ui.keyCode.END:\n" + 
			"		 this._move(\"last\",\"last\",t);\n" + 
			"		 break;\n" + 
			"	 case e.ui.keyCode.UP:\n" + 
			"		 this.previous(t);\n" + 
			"		 break;\n" + 
			"	 case e.ui.keyCode.DOWN:\n" + 
			"		 this.next(t);\n" + 
			"		 break;\n" + 
			"	 case e.ui.keyCode.LEFT:\n" + 
			"		 this.collapse(t);\n" + 
			"		 break;\n" + 
			"	 case e.ui.keyCode.RIGHT:\n" + 
			"		 this.active && !isDisabled(this.active) && this.expand(t);\n" + 
			"		 break;\n" + 
			"	 case e.ui.keyCode.ENTER:\n" + 
			"	 case e.ui.keyCode.SPACE:\n" + 
			"		 this._activate(t);\n" + 
			"		 break;\n" + 
			"	 case e.ui.keyCode.ESCAPE:\n" + 
			"		 \n" + 
			"		 this.collapse(t);\n" + 
			"		 break;\n" + 
			"	 default:\n" + 
			"		doCmd(\"keyActivate\",this, t, true);\n" + 
			"		break;\n" + 
			"	}\n" + 
			" },\n" + 
			"\n" + 
			" on: function(a, x) {for(var i = a.length; --i >= 0;)this._on(a[i],x)},\n" + 
			" on2: function(obj, evts, handle) {var a = {};for(var i = evts.length; --i >= 0;)a[evts[i]]=handle;this._on(obj, a)},\n" + 
			" _stopT: function(why) {\n" + 
			"	  clearTimeout(this.t);\n" + 
			"	  this.t = 0;\n" + 
			" },\n" + 
			" _getT: function() {vart = this.t;},\n" + 
			" _closeMe: function() {\n" + 
			"     if (this.t){\n" + 
			"    	 this._stopT(\"closeMe\");\n" + 
			"     }\n" + 
			"     if (vart){\n" + 
			"    	 this.t = vart;\n" + 
			"    	 this._stopT(\"closeMe\");\n" + 
			"    	 vart = 0;\n" + 
			"     }\n" + 
			"     setCloseTimer(this);\n" + 
			" },\n" + 
			"\n" + 
			" mouseState:MODE_UNKNOWN,\n" + 
			" \n" + 
			" _activate:function(t){     doCmd(\"_activate\", this, t); },\n" + 
			" _startOpening: function(t){ doCmd(\"_startOpening\", this, t); },\n" + 
			" setFocus:function(t,n){       doCmd(\"setFocus\", this, t, n) },\n" + 
			" unsetFocus:function(t,n){        doCmd(\"unsetFocus\", this, t, n);},\n" + 
			" _openSubmenu:function(t){  doCmd(\"_openSubmenu\", this, t);},\n" + 
			" _closeSubmenus:function(t){doCmd(\"_closeSubmenus\", this, t, n);},\n" + 
			" collapseAll:function(t,n,why){ doCmd(\"collapseAll\",this, t, n, why);},\n" + 
			" collapse:function(t){      doCmd(\"collapse\", this, t);},\n" + 
			" refresh:function(t,n){     doCmd(\"refresh\", this, t, n); },\n" + 
			" expand:function(t){        doCmd(\"expand\", this, t);},\n" + 
			" select:function(t){        doCmd(\"select\", this, t); },\n" + 
			" setClickOut:function() {    doCmd(\"setClickOut\", this); }, \n" + 
			" next:function(t){this._move(\"next\",\"first\",t)},\n" + 
			" previous:function(t){this._move(\"prev\",\"last\",t)},\n" + 
			" _scrollIntoView:function(t){var n,r,i,s,o,u;this._hasScroll()&&(n=parseFloat(e.css(this.activeMenu[0],\"borderTopWidth\"))||0,r=parseFloat(e.css(this.activeMenu[0],\"paddingTop\"))||0,i=t.offset().top-this.activeMenu.offset().top-n-r,s=this.activeMenu.scrollTop(),o=this.activeMenu.height(),u=t.height(),i<0?this.activeMenu.scrollTop(s+i):i+u>o&&this.activeMenu.scrollTop(s+i-o+u))},\n" + 
			" isFirstItem:function(){return this.active&&!this.active.prevAll(\".ui-j2smenu-item\").length},\n" + 
			" isLastItem:function(){return this.active&&!this.active.nextAll(\".ui-j2smenu-item\").length},\n" + 
			" nextPage:function(t){var n,r,i;if(!this.active){this.next(t);return}if(this.isLastItem())return;this._hasScroll()?(r=this.active.offset().top,i=this.element.height(),this.active.nextAll(\".ui-j2smenu-item\").each(function(){return n=e(this),n.offset().top-r-i<0}),this.setFocus(t,n)):this.setFocus(t,this.activeMenu.children(\".ui-j2smenu-item\")[this.active?\"last\":\"first\"]())},\n" + 
			" previousPage:function(t){var n,r,i;if(!this.active){this.next(t);return}if(this.isFirstItem())return;this._hasScroll()?(r=this.active.offset().top,i=this.element.height(),this.active.prevAll(\".ui-j2smenu-item\").each(function(){return n=e(this),n.offset().top-r+i>0}),this.setFocus(t,n)):this.setFocus(t,this.activeMenu.children(\".ui-j2smenu-item\").first())},\n" + 
			"\n" + 
			" _move:function(a,b,t){ doCmd(\"_move\", this, t, [a,b]);},\n" + 
			" _hasScroll:function(){return this.element.outerHeight()<this.element.prop(\"scrollHeight\")}\n" + 
			" })\n" + 
			"\n" + 
			"Swing.menuCounter = 0;\n" + 
			"Swing.menuInitialized = 0;\n" + 
			"\n" + 
			"Swing.__getMenuStyle = function(applet) { return '\\\n" + 
			"	.swingjsPopupMenu{font-family:Arial,sans-serif;font-size:11px;position:absolute;z-index:'+J2S.getZ(applet, \"menu\")+'}\\\n" + 
			"	.swingjsPopupMenu,.swingjsPopupMenu .ui-corner-all{border-radius:5px}\\\n" + 
			"	.swingjsPopupMenu,.swingjsPopupMenu .ui-widget-content{border:1px solid #a6c9e2;background-color:#fcfdfd;color:#222}\\\n" + 
			"	.swingjsPopupMenu .a{color:#222;font-size:10px;}\\\n" + 
			"	.swingjsPopupMenu input[type=\"checkbox\"]{vertical-align:middle;}\\\n" + 
			"	.swingjsPopupMenu,.swingjsPopupMenu .ui-j2smenu{list-style:none;padding:2px;margin:0;display:block;outline:none;box-shadow:1px 1px 5px rgba(50,50,50,0.75)}\\\n" + 
			"	.swingjsPopupMenu .ui-j2s-menuBar-menu:focus{outline:none;background:#d0e5f5}\\\n" + 
			"	.swingjsPopupMenu .ui-j2smenu{cursor:pointer;outline:none;margin-top:-3px;position:absolute}\\\n" + 
			"	.swingjsPopupMenu .ui-j2smenu-item{outline:none;cursor:pointer;margin:0 0 0 0;padding:0.1em;width:100%}\\\n" + 
			"	.swingjsPopupMenu .a:focus{outline:none;cursor:pointer;margin:0 0 0 0;padding:0.1em}\\\n" + 
			"	.swingjsPopupMenu .ui-j2smenu-divider{position:absolute;margin:3px 1px;height:0;transform:translateY(-0.2em);font-size:1;line-height:1px;border-width:1px 0 0 0;width:93%;}\\\n" + 
			"	.swingjsPopupMenu .ui-j2smenu-item .a{display:block;padding:0.05em 0.4em;white-space:nowrap;border:1px solid transparent}\\\n" + 
			"	.swingjsPopupMenu .ui-j2smenu-icons{position:relative}\\\n" + 
			"	.swingjsPopupMenu .ui-j2smenu-icons .ui-j2smenu-item .a{position:relative;padding-left:2em}\\\n" + 
			"	.swingjsPopupMenu .ui-icon{display:block;text-indent:-99999px;overflow:hidden;background-repeat:no-repeat;position:absolute;top:.2em;left:.2em}\\\n" + 
			"	.swingjsPopupMenu .ui-j2smenu-icon{position:static;float:right}\\\n" + 
			"	.swingjsPopupMenu .ui-icon-alt-y{min-width:30ex;text-align:right;background-image:none;background-position:0 0}\\\n" + 
			"	.swingjsPopupMenu .ui-icon-alt-y:after{content:\"alt-Y\"}\\\n" + 
			"	.swingjsPopupMenu .ui-icon-alt-shift-x:{min-width:130ex;text-align:right;background-image:none;background-position:0 0}\\\n" + 
			"	.swingjsPopupMenu .ui-icon-alt-shift-x:after{content:\"alt-shift-X\"}\\\n" + 
			"	.swingjsPopupMenu .ui-icon-carat-1-e{min-width:1ex;text-align:right;background-image:none;background-position:0 0}\\\n" + 
			"	.swingjsPopupMenu .ui-icon-carat-1-e:after{content:\"\\\\0025B6\"}\\\n" + 
			"	.swingjsPopupMenu .ui-state-default{border:1px solid #c5dbec;background:#dfeffc;color:#2e6e9e}\\\n" + 
			"	.swingjsPopupMenu .ui-state-default .a{color:#2e6e9e;}\\\n" + 
			"	.swingjsPopupMenu .ui-state-hover,.swingjsPopupMenu .ui-state-focus{background:#d0e5f5;color:#1d5987}\\\n" + 
			"	.swingjsPopupMenu .ui-state-hover .a{color:#1d5987;cursor:pointer;}\\\n" + 
			"	.swingjsPopupMenu .ui-state-active{border:1px solid #79b7e7;background:#f5f8f9;color:#e17009}\\\n" + 
			"	.swingjsPopupMenu .ui-state-active .a{color:#e17009;cursor:pointer;}\\\n" + 
			"	.swingjsPopupMenu .ui-state-highlight{border:1px solid #fad42e;background:#fbec88;color:#363636}\\\n" + 
			"	.swingjsPopupMenu .ui-state-highlight .a{color:#363636}\\\n" + 
			"	.swingjsPopupMenu .ui-state-disabled *{color:#d6d6d6!important;font-weight:normal;cursor:default}\\\n" + 
			"	.swingjsPopupMenu .ui-state-disabled .a:hover{background-color:transparent!important;border-color:transparent!important}\\\n" + 
			"	.swingjsPopupMenu .ui-state-disabled .ui-icon{filter:Alpha(Opacity=35)}'};\n" + 
			"\n" + 
			"Swing.setMenu = function(menu) {\n" + 
			"  // the object will be installed using $(body).after()\n" + 
			"  \n" + 
			"  // called by javajs.swing.JPopupMenu or swingjs.plaf.JSPopupMenuUI\n" + 
			"  menu._applet = (menu.ui ? menu.ui.applet : menu.applet); // SwingJS vs JSmol\n" + 
			"	Swing.__getMenuStyle && J2S.$after(\"head\", '<style>'+Swing.__getMenuStyle(menu._applet)+'</style>');  \n" + 
			"	Swing.__getMenuStyle = null; // \"static\"\n" + 
			"	  \n" + 
			"	// TODO: We can't be creating fields in JPopupMenu! This is ancient stuff.\n" + 
			"	  \n" + 
			"    menu._visible = false;\n" + 
			"    menu._j2sname = menu.id = menu.ui.id + '_' + (++Swing.menuCounter);\n" + 
			"    menu.$ulTop = J2S.__$(); // empty jQuery selector\n" + 
			"    var proto = menu.$init$.exClazz[\"prototype\"];\n" + 
			"    proto._hideJSMenu = function(){Swing.hideMenu(this)};\n" + 
			"    proto.dragBind || ( proto.dragBind = function(isBind){} );\n" + 
			"    proto.setContainer || ( proto.setContainer = function(c){ this.$ulTop = c } );\n" + 
			"    proto.setPosition || ( proto.setPosition = function(x,y) {\n" + 
			"      this.$ulTop.css({left:x+\"px\",top:y+\"px\",position:\"absolute\"});\n" + 
			"    } );    \n" + 
			"	menu._applet._menus || (menu._applet._menus = {});\n" + 
			"	menu._applet._menus[menu._j2sname] = menu;\n" + 
			"	menu._tainted = true;\n" + 
			"}\n" + 
			"\n" + 
			"Swing.updateMenu = function(menu, andShow) {\n" + 
			"	    // for SwingJS the top node is domNode itself, which is already <ul>\n" + 
			"    var node = menu.ui.domNode;\n" + 
			"    if (node != menu.$ulTop[0]) {\n" + 
			"        if (menu.$ulTop) {\n" + 
			"          menu.$ulTop.remove();\n" + 
			"        }\n" + 
			"        menu.setContainer(J2S.$(node));\n" + 
			"        J2S.$(node).addClass(\"swingjsPopupMenu\");\n" + 
			"    }\n" + 
			"	node.style.display = (andShow ? \"block\" : \"none\");\n" + 
			"    J2S.$after(\"body\",node);\n" + 
			"    var m = menu.$ulTop.j2smenu({delay:100, jPopupMenu: menu});\n" + 
			"    m.j2smenu('refresh');  \n" + 
			"    // this next is critical for SwingJS\n" + 
			"	menu._tainted = false;\n" + 
			"}\n" + 
			"\n" + 
			"Swing.getInstance = function(menu) {\n" + 
			"	return menu.$ulTop.data(\"ui-j2smenu\");\n" + 
			"}\n" + 
			"\n" + 
			"var ensureMouseSet = function(menu, node) {\n" + 
			"	// allow mouseup and other events to do their job\n" + 
			"	// for all JMenu and JMenuItem entries\n" + 
			"    var v = node.find(\"[role=menuitem]\");\n" + 
			"    for (var i = v.length; --i >= 0;) {\n" + 
			"    	if (v[i]._menu != menu) {\n" + 
			"    		setMouseMenuItem(menu, v[i]);\n" + 
			"    	}\n" + 
			"    }\n" + 
			"}\n" + 
			"\n" + 
			"var setMouseMenuItem = function(menu, node) {\n" + 
			"    J2S.unsetMouse(node);\n" + 
			"    node._menu = menu;\n" + 
			"    node.applet = menu._applet;\n" + 
			"    while (!node.applet && menu.invoker.parent != null) {\n" + 
			"    	menu = menu.invoker.parent;\n" + 
			"    node.applet = menu._applet;\n" + 
			"    }\n" + 
			"    node._frameViewer = menu.invoker.getFrameViewer$();\n" + 
			"    J2S.setMouse(node, true);\n" + 
			"}\n" + 
			"\n" + 
			"Swing.showMenu = function(menu, x, y) {\n" + 
			"  // called by javajs.swing.JPopupMenu and swingjs.plaf.JSPopupMenuUI\n" + 
			"  // allow for a user callback for customization of menu\n" + 
			" \n" + 
			"  for (var i in menu._applet._menus)\n" + 
			"    Swing.hideMenu(menu._applet._menus[i], true);  \n" + 
			"  if (J2S._showMenuCallback)\n" + 
			"	J2S._showMenuCallback(menu, x, y);\n" + 
			"  var wasTainted = menu._tainted;\n" + 
			"  \n" + 
			"  // TODO: We can't be creating fields in JPopupMenu!\n" + 
			"  \n" + 
			"  if (menu._tainted)\n" + 
			"	  Swing.updateMenu(menu);\n" + 
			"  ensureMouseSet(menu, menu.$ulTop);\n" + 
			"  menu.setPosition(x, y);\n" + 
			"  menu.$ulTop.hide().j2smenu(\"setClickOut\").show();  \n" + 
			"  menu._visible = true;\n" + 
			"  menu.timestamp = System.currentTimeMillis$();\n" + 
			"  menu.dragBind(true);\n" + 
			"  menu.$ulTop.bind(\"contextmenu\", function() {return false;});\n" + 
			"} \n" + 
			"\n" + 
			"Swing.hideMenu = function(menu, force) {\n" + 
			"  // called internally often -- even on mouse moves\n" + 
			"	if (menu._visible === false && !force) return;\n" + 
			"	menu.dragBind(false);\n" + 
			"	menu.$ulTop.hide();\n" + 
			"	menu._visible = menu.isDragging = false;\n" + 
			"}\n" + 
			"\n" + 
			"Swing.disposeMenu = function(menu) {\n" + 
			"  // called by javajs.swing.JPopupMenu\n" + 
			"  if (J2S._persistentMenu)\n" + 
			"  	return\n" + 
			"  Swing.hideMenu(menu);\n" + 
			"  menu.$ulTop.j2smenu().destroy && menu.$ulTop.j2smenu().destroy();\n" + 
			"    var v = menu.$ulTop.find(\"[role=menuitem]\");\n" + 
			"    for (var i = v.length; --i >= 0;) {\n" + 
			"        v[i].applet = menu.ui.applet;\n" + 
			"        J2S.unsetMouse(v[i]);\n" + 
			"//??        v[i]._frameViewer = null;\n" + 
			"//??        v[i]._menu = null;\n" + 
			"    }\n" + 
			"	delete menu._applet._menus[menu._j2sname];\n" + 
			"}\n" + 
			"\n" + 
			"\n" + 
			"};\n" + 
			"\n" + 
			"})(J2S.Swing, J2S.__$);\n" + 
			"");

	// BH 2024.06.28
	
	htResource.put(RESOURCE_J2SSLIDER, ";(function($) {\n" + 
			"	\n" + 
			"J2S.__makeSlider = function() {\n" + 
			"	// run once; set to NOP\n" + 
			"  J2S.__makeSlider = function(){};	\n" + 
			"\n" + 
			"		$('head').append('<style>\\\n" + 
			"	.ui-j2sslider-at-bottom { border-bottom-color:red }\\\n" + 
			"	.ui-j2sslider-at-left { border-left-color:red }\\\n" + 
			"	.ui-j2sslider-at-right { border-right-color:red }\\\n" + 
			"	.ui-j2sslider-at-top { border-top-color:red }\\\n" + 
			"	.ui-j2sslider-tick-mark-horiz { display:inline-block; height:1px; background: black; border:1px; width:5px; position:absolute; left:14px; }\\\n" + 
			"	.ui-j2sslider-tick-mark-vert { display:inline-block; width:1px; background: black; border:1px; height:5px; position:absolute; top:12px; }\\\n" + 
			"	.ui-j2sscrollbar-horizontal { color:black;border-style:none solid none solid; border-width: 0px 5px; height: .3em; top: 40%;margin:0px 2px}\\\n" + 
			"	.ui-j2sscrollbar-vertical { color:black;border-style:solid none solid none; border-width: 5px 0px; width: .3em; left: 40%; margin:2px 0px }\\\n" + 
			"	.ui-j2sslider-horizontal .ui-j2sslider-handle { margin-left: -.4em; border:1px solid blue; box-sizing:border-box;}\\\n" + 
			"	.ui-j2sslider-horizontal .ui-j2sslider-range-max { right: 0; }\\\n" + 
			"	.ui-j2sslider-horizontal .ui-j2sslider-range-min { left: 0; }\\\n" + 
			"	.ui-j2sslider-horizontal .ui-j2sslider-range { top: 0.1em; height: 30%; }\\\n" + 
			"	.ui-j2sslider-horizontal { height: .3em; top: 40%;margin:0px 9px}\\\n" + 
			"	.ui-j2sslider-vertical .ui-j2sslider-handle { margin-left: 0; margin-bottom: -.3em;border:1px solid blue; box-sizing:border-box; }\\\n" + 
			"	.ui-j2sslider-vertical .ui-j2sslider-range-max { top: 0; }\\\n" + 
			"	.ui-j2sslider-vertical .ui-j2sslider-range-min { bottom: 0; }\\\n" + 
			"	.ui-j2sslider-vertical .ui-j2sslider-range { left: 0.1em; width: 30%; }\\\n" + 
			"	.ui-j2sslider-vertical { width: .3em; left: 40%; margin:10px 0px }\\\n" + 
			"	.ui-j2sslider .ui-j2sslider-handle { position: absolute; width: 0.8em; height: 0.8em; cursor: default; }\\\n" + 
			"	.ui-j2sslider .ui-j2sslider-range { position: absolute; font-size: 0.3em; display: block; border: 0; background-position: 0 0; }\\\n" + 
			"	.ui-j2sslider { position: relative; text-align: left;}\\\n" + 
			"	.ui-state-disabled { cursor: default !important; }</style>');\n" + 
			"		\n" + 
			"\n" + 
			"		\n" + 
			"// number of pages in a slider\n" + 
			"// (how many times can you page 3/down to go through the whole range)\n" + 
			"var numPages = 5;\n" + 
			"\n" + 
			"var closestHandle, index, allowed, offset, dir;\n" + 
			"\n" + 
			"var actionTimer, actionTimer2;\n" + 
			"var actionDelay = 60, actionDelay0 = 200;\n" + 
			"var startAction = function(me, dir) {\n" + 
			"	if (actionTimer)\n" + 
			"		return;\n" + 
			"	me.jslider.ui.scrollByUnit$I(dir)\n" + 
			"	actionTimer = setTimeout(function(){\n" + 
			"		actionTimer = setInterval(function() {\n" + 
			"			me.jslider.ui.scrollByUnit$I(dir)\n" + 
			"		}, actionDelay);\n" + 
			"	}, actionDelay0);\n" + 
			"}\n" + 
			"\n" + 
			"var startAction2 = function(me, dir, val) {\n" + 
			"	me.jslider.ui.scrollDueToClickInTrack$I$I(dir, val);\n" + 
			"	if (!me.isScrollBar)\n" + 
			"		return;\n" + 
			"	actionTimer2 = \n" + 
			"		setTimeout(function(){\n" + 
			"			actionTimer2 = setInterval(function() {\n" + 
			"				me.jslider.ui.scrollDueToClickInTrack$I$I(dir);\n" + 
			"			}, actionDelay);\n" + 
			"		}, actionDelay0);\n" + 
			"}\n" + 
			"\n" + 
			"var clearEnds = function(me) {\n" + 
			"	var e = me.element;\n" + 
			"	if (actionTimer)\n" + 
			"		clearInterval(actionTimer);\n" + 
			"	if (actionTimer2)\n" + 
			"		clearInterval(actionTimer2);\n" + 
			"	actionTimer = 0;\n" + 
			"	actionTimer2 = 0;\n" + 
			"	e.removeClass(\"ui-j2sslider-at-top\");\n" + 
			"	e.removeClass(\"ui-j2sslider-at-bottom\");\n" + 
			"	e.removeClass(\"ui-j2sslider-at-left\");\n" + 
			"	e.removeClass(\"ui-j2sslider-at-right\");\n" + 
			"}\n" + 
			"\n" + 
			"var OBJ_WRAP = 0;\n" + 
			"var OBJ_TRACK = 1;\n" + 
			"var OBJ_HANDLE = 2;\n" + 
			"\n" + 
			"var doMouseCapture = function(me, event, obj, isEndCheck) {\n" + 
			"\n" + 
			"	var that = me, o = me.options;\n" + 
			"	\n" + 
			"	if (o.disabled ||\n" + 
			"			(event.type == \"mousemove\" || event.type == \"pointermove\") && event.buttons == 0) {\n" + 
			"		return false;\n" + 
			"	}\n" + 
			"\n" + 
			"	var position = me._getPosition(event);\n" + 
			"\n" + 
			"	index = event.target.index;\n" + 
			"\n" + 
			"	closestHandle = $(event.target);// handles[index];//$(\n" + 
			"									// me );\n" + 
			"\n" + 
			"	// workaround for bug #3736 (if both handles of\n" + 
			"	// a range are at 0,\n" + 
			"	// the first is always used as the one with\n" + 
			"	// least distance,\n" + 
			"	// and moving it is obviously prevented by\n" + 
			"	// preventing negative ranges)\n" + 
			"	if (o.range === true\n" + 
			"			&& me.values(1) === o.min) {\n" + 
			"		index += 1;\n" + 
			"		closestHandle = $(me.handles[index]);\n" + 
			"	}\n" + 
			"\n" + 
			"	allowed = (obj == OBJ_HANDLE ? me._start(event, index) : true);\n" + 
			"	if (allowed === false) {\n" + 
			"		return false;\n" + 
			"	}\n" + 
			"	\n" + 
			"	me._mouseSliding = true;\n" + 
			"\n" + 
			"	me._handleIndex = index;\n" + 
			"\n" + 
			"	if (obj == OBJ_HANDLE)\n" + 
			"		closestHandle.addClass(\"ui-state-active\").focus();\n" + 
			"\n" + 
			"	offset = closestHandle.offset();\n" + 
			"	var mouseOverHandle = (obj == OBJ_HANDLE) && $(event.target).parents()\n" + 
			"			.andSelf().is(\".ui-j2sslider-handle\");\n" + 
			"	me.closestHandle = closestHandle;\n" + 
			"	me._clickOffset = (mouseOverHandle ? \n" + 
			"		{\n" + 
			"		left : position.x\n" + 
			"				- offset.left\n" + 
			"				- (closestHandle.width() / 2 * o.scaleX)\n" + 
			"				,\n" + 
			"		top : position.y\n" + 
			"				- offset.top\n" + 
			"				- (closestHandle.height() / 2 * o.scaleY)\n" + 
			"				- (parseInt(closestHandle\n" + 
			"						.css(\"borderTopWidth\"), 10) || 0)\n" + 
			"				- (parseInt(closestHandle\n" + 
			"						.css(\"borderBottomWidth\"),\n" + 
			"						10) || 0)\n" + 
			"				+ (parseInt(closestHandle\n" + 
			"						.css(\"marginTop\"), 10) || 0)\n" + 
			"		} : {\n" + 
			"			left : 0,\n" + 
			"			top : 0\n" + 
			"		});\n" + 
			"	var val = normValueFromMouse(me, position, obj);\n" + 
			"	var pixmouse = getPixelMouse(me, position, false);\n" + 
			"	\n" + 
			"	var isAtEnd = !mouseOverHandle && (!me.isScrollBar ? 0 : \n" + 
			"		pixmouse < 5 ? -1 : pixmouse > length(me) + 5 ? 1 : 0);\n" + 
			"	var dir = Math.signum(!isAtEnd ? val - me.jslider.getValue$() : isAtEnd);\n" + 
			"	if (isAtEnd) {\n" + 
			"		me.element.addClass(me.orientation === \"horizontal\" ? \n" + 
			"				(isAtEnd == 1 ? \"ui-j2sslider-at-right\" : \"ui-j2sslider-at-left\")\n" + 
			"				: (isAtEnd == 1 ? \"ui-j2sslider-at-bottom\" : \"ui-j2sslider-at-top\"));\n" + 
			"		startAction(me, dir);	\n" + 
			"	} else {\n" + 
			"		clearEnds(me);				\n" + 
			"		if (isEndCheck) {\n" + 
			"			return;\n" + 
			"		}\n" + 
			"//				if (!me.handles.hasClass(\"ui-state-hover\")) {\n" + 
			"			if (obj != OBJ_HANDLE) {\n" + 
			"				startAction2(me, dir, val);\n" + 
			"//					}\n" + 
			"		}\n" + 
			"	}\n" + 
			"	me._animateOff = true;\n" + 
			"	return true;\n" + 
			"}\n" + 
			"\n" + 
			"var normValueFromMouse = function(me, position, obj) {\n" + 
			"	var pixelMouse = getPixelMouse(me, position, true);\n" + 
			"	var fMouse = (pixelMouse / getPixelTotal(me));						\n" + 
			"	if (fMouse > 1) {\n" + 
			"		fMouse = 1;\n" + 
			"	}\n" + 
			"	if (fMouse < 0) {\n" + 
			"		fMouse = 0;\n" + 
			"	}\n" + 
			"	if (me.orientation === \"vertical\") {\n" + 
			"		fMouse = 1 - fMouse;\n" + 
			"	}\n" + 
			"	if (me.options.inverted) {\n" + 
			"		fMouse = 1 - fMouse;\n" + 
			"	}\n" + 
			"	var valueTotal = me._valueMax()\n" + 
			"			- me._valueMin();\n" + 
			"	var valueMouse = me._valueMin() + fMouse * valueTotal;\n" + 
			"	return me._trimAlignValue(valueMouse);\n" + 
			"}\n" + 
			"\n" + 
			"var getPixelMouse = function(me, position, offsetHandle) {\n" + 
			"	var offset = me.element.offset();\n" + 
			"	var p = (me.orientation === \"horizontal\" ?\n" + 
			"			position.x\n" + 
			"				- offset.left\n" + 
			"				- (me._clickOffset ? me._clickOffset.left : 0)\n" + 
			"		 : position.y\n" + 
			"				- offset.top\n" + 
			"				- (me._clickOffset ? me._clickOffset.top : 0));\n" + 
			"	return p - (offsetHandle ? me.handleSize / 2 : 0);\n" + 
			"}\n" + 
			"\n" + 
			"var length = function(me) {\n" + 
			"	return (me.orientation == \"horizontal\" ? width(me) : height(me))\n" + 
			"}\n" + 
			"\n" + 
			"var getPixelTotal = function(me) {\n" + 
			"	return length(me) - me.visibleAdjust || 100;	\n" + 
			"}\n" + 
			"\n" + 
			"var postMouseEvent = function(me, xye, id) {\n" + 
			"	// set target to the handle\n" + 
			"	xye.ev.currentTarget\n" + 
			"		&& (xye.ev.target = xye.ev.currentTarget);\n" + 
			"	// pass event to JSlider in case there is a\n" + 
			"	// mouse listener implemented for that\n" + 
			"	// InputEvent.BUTTON1 +\n" + 
			"	// InputEvent.BUTTON1_DOWN_MASK;\n" + 
			"	// same call here as in j2sApplet\n" + 
			"	me.jslider.getFrameViewer$()\n" + 
			"		.processMouseEvent$I$I$I$I$J$O$I(\n" + 
			"				id, xye.x, xye.y, 1040,\n" + 
			"				System.currentTimeMillis$(),\n" + 
			"				xye.ev);\n" + 
			"}\n" + 
			"\n" + 
			"var width = function(me) {\n" + 
			"	var w = Math.max(0, me.element.width() || me.element.parent().width() - me.marginX || 0);\n" + 
			"	return w;\n" + 
			"}\n" + 
			"\n" + 
			"var height = function(me) {\n" + 
			"	return Math.max(0, me.element.height() || me.element.parent().height() - me.marginY || 0);\n" + 
			"}\n" + 
			"\n" + 
			"\n" + 
			"$.widget(\n" + 
			"	\"ui.j2sslider\",\n" + 
			"	$.ui.mouse,\n" + 
			"	{\n" + 
			"		version : \"1.9.2\",\n" + 
			"		widgetEventPrefix : \"slide\",\n" + 
			"\n" + 
			"		options : {\n" + 
			"			jslider : null,\n" + 
			"			animate : false,\n" + 
			"			distance : 0,\n" + 
			"			scaleX : 1, // diamond cursor scaling X\n" + 
			"			scaleY : 1, // diamand cursor scaling Y\n" + 
			"			max : 100,\n" + 
			"			min : 0,\n" + 
			"			isScrollBar : false,\n" + 
			"			orientation : \"horizontal\",\n" + 
			"			range : false,\n" + 
			"			step : 1,\n" + 
			"			value : 0,\n" + 
			"			inverted : false,\n" + 
			"			values : null\n" + 
			"		},\n" + 
			"\n" + 
			"		_create : function() {\n" + 
			"			var handleCount, \n" + 
			"				o = this.options, \n" + 
			"				existingHandles = this.element.find(\".ui-j2sslider-handle\").addClass(\"ui-state-default\"),// ui-corner-all\"), \n" + 
			"				handle = \"<a class='ui-j2sslider-handle ui-state-default' href='#'></a>\", // was ui-corner-all \n" + 
			"				handles = [];\n" + 
			"			this.jslider || (this.jslider = o.jslider);\n" + 
			"			this._keySliding = false;\n" + 
			"			this._mouseSliding = false;\n" + 
			"			this._animateOff = true;\n" + 
			"			this._handleIndex = null;\n" + 
			"			this._detectOrientation();\n" + 
			"			this._mouseInit();\n" + 
			"			this.isScrollBar = o.isScrollBar;\n" + 
			"			this.handleSize = 0; // scrollbar only\n" + 
			"			this.visibleAmount = 0;\n" + 
			"			this.visibleAdjust = 0;\n" + 
			"			this.visibleFraction = 0;\n" + 
			"			this.handleFraction = 0;\n" + 
			"			this.marginX = (o.isScrollBar ? 0 : 19); // from CSS - margin * 2 + border\n" + 
			"			this.marginY = (o.isScrollBar ? 0 : 0);\n" + 
			"			this.element\n" + 
			"					.addClass(\"ui-j2sslider\"\n" + 
			"							+ \" ui-j2sslider-\"\n" + 
			"							+ this.orientation\n" + 
			"							+ \" ui-widget\"\n" + 
			"							+ \" ui-widget-content\"\n" + 
			"							+ \" ui-corner-all\"\n" + 
			"							+ (o.disabled ? \" ui-j2sslider-disabled ui-disabled\"\n" + 
			"									: \"\"));\n" + 
			"			this.range = $([]);\n" + 
			"\n" + 
			"			if (o.range) {\n" + 
			"				if (o.range === true) {\n" + 
			"					if (!o.values) {\n" + 
			"						o.values = [ this._valueMin(),\n" + 
			"								this._valueMin() ];\n" + 
			"					}\n" + 
			"					if (o.values.length\n" + 
			"							&& o.values.length !== 2) {\n" + 
			"						o.values = [ o.values[0],\n" + 
			"								o.values[0] ];\n" + 
			"					}\n" + 
			"				}\n" + 
			"\n" + 
			"				this.range = $(\"<div></div>\")\n" + 
			"					.appendTo(this.element)\n" + 
			"					.addClass(\n" + 
			"							\"ui-j2sslider-range\"\n" + 
			"								+\n" + 
			"								// note: this isn't\n" + 
			"								// the most\n" + 
			"								// fittingly\n" + 
			"								// semantic\n" + 
			"								// framework class\n" + 
			"								// for this element,\n" + 
			"								// but worked best\n" + 
			"								// visually with a\n" + 
			"								// variety of themes\n" + 
			"								\" ui-widget-header\"\n" + 
			"								+ ((o.range === \"min\" || o.range === \"max\") ? \" ui-j2sslider-range-\" + o.range : \"\")\n" + 
			"					);\n" + 
			"			}\n" + 
			"\n" + 
			"			var me = this;\n" + 
			"\n" + 
			"			var fDown = function(xye, id) {\n" + 
			"				doMouseCapture(me, xye.ev, OBJ_HANDLE, false);\n" + 
			"				postMouseEvent(me, xye, id);\n" + 
			"			};\n" + 
			"\n" + 
			"			var fDownTrack = function(event, id) {\n" + 
			"				doMouseCapture(me, event, OBJ_TRACK, false);\n" + 
			"				me._mouseSliding = false;\n" + 
			"			};\n" + 
			"\n" + 
			"			var fUpTrack = function(event, id) {\n" + 
			"				//me._stop(event, me._handleIndex);\n" + 
			"				me._change(event, me._handleIndex);\n" + 
			"				clearEnds(me);\n" + 
			"			};\n" + 
			"\n" + 
			"			var fDownWrap = function(event, id) {\n" + 
			"				doMouseCapture(me, event, OBJ_WRAP, false);\n" + 
			"				me._mouseSliding = false;\n" + 
			"			};\n" + 
			"\n" + 
			"			var fDrag = function(xye, id) {\n" + 
			"				if (id != 506 || me.options.disabled)\n" + 
			"					return;\n" + 
			"				var event = xye.ev;\n" + 
			"				var position = me._getPosition(event);\n" + 
			"				var normValue = normValueFromMouse(me, position, OBJ_HANDLE);\n" + 
			"				me._slide(event, me._handleIndex, normValue);\n" + 
			"				postMouseEvent(me, xye, id);\n" + 
			"			};\n" + 
			"\n" + 
			"			var fUp = function(xye, id) {\n" + 
			"				if (me.options.disabled)\n" + 
			"					return;\n" + 
			"				var event = xye.ev;\n" + 
			"				me.handles.removeClass(\"ui-state-active\");\n" + 
			"				me._mouseSliding = false;\n" + 
			"				me._stop(event, me._handleIndex);\n" + 
			"				me._change(event, me._handleIndex);\n" + 
			"				me._handleIndex = null;\n" + 
			"				me._clickOffset = null;\n" + 
			"				me._animateOff = false;\n" + 
			"				postMouseEvent(me, xye, id);\n" + 
			"			};\n" + 
			"\n" + 
			"			var fOutTrack = function(event, id) {\n" + 
			"				clearEnds(me);\n" + 
			"			};\n" + 
			"\n" + 
			"			var fMoveTrack = function(event, id) {\n" + 
			"				doMouseCapture(me, event, OBJ_TRACK, true);\n" + 
			"			};\n" + 
			"\n" + 
			"			handleCount = (o.values && o.values.length) || 1;\n" + 
			"\n" + 
			"			for (var i = 0; i < handleCount; i++) {\n" + 
			"				handles.push(handle);\n" + 
			"			}\n" + 
			"\n" + 
			"			this.handles = existingHandles.add($(\n" + 
			"					handles.join(\"\"))\n" + 
			"					.appendTo(this.element));\n" + 
			"\n" + 
			"			for (var i = 0; i < handleCount; i++) {\n" + 
			"				handle = this.handles[i];\n" + 
			"				handle.index = i;\n" + 
			"				J2S.setDraggable(handle, [ fDown, fDrag, fUp ]);\n" + 
			"			}\n" + 
			"			\n" + 
			"			if (handleCount == 1) {\n" + 
			"				$(this.element).mousedown(fDownTrack);\n" + 
			"				if (this.isScrollBar) {\n" + 
			"					$(this.element).mousemove(fMoveTrack);\n" + 
			"					$(this.element).mouseup(fUpTrack);\n" + 
			"					$(this.element).mouseout(fOutTrack);\n" + 
			"				} else {\n" + 
			"					$(this.element).closest(\".ui-j2sslider-wrap\").mousedown(fDownWrap);\n" + 
			"				}\n" + 
			"			}\n" + 
			"			\n" + 
			"			this.handle = this.handles.eq(0);\n" + 
			"			this.handles.add(this.range).filter(\"a\").click(function(event) {event.preventDefault();})\n" + 
			"			this.handles.each(function(i) {$(this).data(\"ui-j2sslider-handle-index\", i);});\n" + 
			"			this._refreshValue();\n" + 
			"			this._animateOff = false;\n" + 
			"		},\n" + 
			"		\n" + 
			"		_destroy : function() {\n" + 
			"			\n" + 
			"			for (var i = 0; i < this.handles.length; i++) {\n" + 
			"				J2S.setDraggable(this.handles[i], false);\n" + 
			"			}\n" + 
			"			\n" + 
			"\n" + 
			"			this.handles.remove();\n" + 
			"			this.range.remove();\n" + 
			"\n" + 
			"			this.element.removeClass(\n" + 
			"					\"ui-j2sslider\"\n" + 
			"					+ \" ui-j2sslider-horizontal\"\n" + 
			"					+ \" ui-j2sslider-vertical\"\n" + 
			"					+ \" ui-j2sscrollbar-horizontal\"\n" + 
			"					+ \" ui-j2sscrollbar-vertical\"\n" + 
			"					+ \" ui-j2sslider-disabled\"\n" + 
			"					+ \" ui-widget\" \n" + 
			"					+ \" ui-widget-content\"\n" + 
			"					+ \" ui-corner-all\");\n" + 
			"\n" + 
			"			this._mouseDestroy();\n" + 
			"		},\n" + 
			"\n" + 
			"		_detectOrientation : function() {\n" + 
			"			this.orientation = (this.options.orientation === \"vertical\") ? \"vertical\"\n" + 
			"					: \"horizontal\";\n" + 
			"		},\n" + 
			"		_resetClass : function() {\n" + 
			"			var type = (this.isScrollBar ? \"scrollbar\" : \"slider\");\n" + 
			"			this.element\n" + 
			"					.removeClass(\n" + 
			"							\"ui-j2sscrollbar-horizontal ui-j2sscrollbar-vertical ui-j2sslider-horizontal ui-j2sslider-vertical\")\n" + 
			"					.addClass(\n" + 
			"							\"ui-j2s\" + type + \"-\"\n" + 
			"									+ this.orientation);\n" + 
			"			if (this.isScrollBar)\n" + 
			"				this.element.removeClass(\"ui-widget-content\");\n" + 
			"		},\n" + 
			"		_start : function(event, index) {\n" + 
			"			var uiHash = {\n" + 
			"				handle : this.handles[index],\n" + 
			"				value : this.value()\n" + 
			"			};\n" + 
			"			if (this.options.values\n" + 
			"					&& this.options.values.length) {\n" + 
			"				uiHash.value = this.values(index);\n" + 
			"				uiHash.values = this.values();\n" + 
			"			}\n" + 
			"			return this._trigger(\"start\", event, uiHash);\n" + 
			"		},\n" + 
			"\n" + 
			"		_slide : function(event, index, newVal) {\n" + 
			"			var otherVal, newValues, allowed;\n" + 
			"\n" + 
			"			if (this.options.values\n" + 
			"					&& this.options.values.length) {\n" + 
			"				otherVal = this.values(index ? 0 : 1);\n" + 
			"\n" + 
			"				if ((this.options.values.length === 2 && this.options.range === true)\n" + 
			"						&& ((index === 0 && newVal > otherVal) || (index === 1 && newVal < otherVal))) {\n" + 
			"					newVal = otherVal;\n" + 
			"				}\n" + 
			"\n" + 
			"				if (newVal !== this.values(index)) {\n" + 
			"					newValues = this.values();\n" + 
			"					newValues[index] = newVal;\n" + 
			"					// A slide can be canceled by returning\n" + 
			"					// false from the slide callback\n" + 
			"					allowed = this\n" + 
			"							._trigger(\n" + 
			"									\"slide\",\n" + 
			"									event,\n" + 
			"									{\n" + 
			"										handle : this.handles[index],\n" + 
			"										value : newVal,\n" + 
			"										values : newValues\n" + 
			"									});\n" + 
			"					otherVal = this.values(index ? 0 : 1);\n" + 
			"					if (allowed !== false) {\n" + 
			"						this.values(index, newVal, true);\n" + 
			"					}\n" + 
			"				}\n" + 
			"			} else {\n" + 
			"				if (newVal !== this.value()) {\n" + 
			"					// A slide can be canceled by returning\n" + 
			"					// false from the slide callback\n" + 
			"					allowed = this\n" + 
			"							._trigger(\n" + 
			"									\"slide\",\n" + 
			"									event,\n" + 
			"									{\n" + 
			"										handle : this.handles[index],\n" + 
			"										value : newVal\n" + 
			"									});\n" + 
			"					if (allowed !== false) {\n" + 
			"						this.value(newVal);\n" + 
			"					}\n" + 
			"				}\n" + 
			"			}\n" + 
			"		},\n" + 
			"\n" + 
			"		_stop : function(event, index) {\n" + 
			"			var uiHash = {\n" + 
			"				handle : this.handles[index],\n" + 
			"				value : this.value()\n" + 
			"			};\n" + 
			"			if (this.options.values\n" + 
			"					&& this.options.values.length) {\n" + 
			"				uiHash.value = this.values(index);\n" + 
			"				uiHash.values = this.values();\n" + 
			"			}\n" + 
			"\n" + 
			"			this._trigger(\"stop\", event, uiHash);\n" + 
			"		},\n" + 
			"\n" + 
			"		_change : function(event, index) {\n" + 
			"			if (!this._keySliding && !this._mouseSliding) {\n" + 
			"				var uiHash = {\n" + 
			"					handle : this.handles[index],\n" + 
			"					value : this.value()\n" + 
			"				};\n" + 
			"				if (this.options.values\n" + 
			"						&& this.options.values.length) {\n" + 
			"					uiHash.value = this.values(index);\n" + 
			"					uiHash.values = this.values();\n" + 
			"				}\n" + 
			"\n" + 
			"				this._trigger(\"change\", event, uiHash);\n" + 
			"			}\n" + 
			"		},\n" + 
			"\n" + 
			"		getState : function() {\n" + 
			"			return this.options\n" + 
			"		},\n" + 
			"\n" + 
			"		value : function(newValue) {\n" + 
			"			if (arguments.length) {\n" + 
			"\n" + 
			"				this.options.value = this\n" + 
			"						._trimAlignValue(newValue);\n" + 
			"				this._refreshValue();\n" + 
			"				this._change(null, 0);\n" + 
			"				return;\n" + 
			"			}\n" + 
			"\n" + 
			"			return this._value();\n" + 
			"		},\n" + 
			"\n" + 
			"		values : function(index, newValue) {\n" + 
			"			var vals, newValues, i;\n" + 
			"\n" + 
			"			if (arguments.length > 1) {\n" + 
			"				this.options.values[index] = this\n" + 
			"						._trimAlignValue(newValue);\n" + 
			"				this._refreshValue();\n" + 
			"				this._change(null, index);\n" + 
			"				return;\n" + 
			"			}\n" + 
			"\n" + 
			"			if (arguments.length) {\n" + 
			"				if ($.isArray(arguments[0])) {\n" + 
			"					vals = this.options.values;\n" + 
			"					newValues = arguments[0];\n" + 
			"					for (var i = 0; i < vals.length; i += 1) {\n" + 
			"						vals[i] = this\n" + 
			"								._trimAlignValue(newValues[i]);\n" + 
			"						this._change(null, i);\n" + 
			"					}\n" + 
			"					this._refreshValue();\n" + 
			"				} else {\n" + 
			"					if (this.options.values\n" + 
			"							&& this.options.values.length) {\n" + 
			"						return this._values(index);\n" + 
			"					} else {\n" + 
			"						return this.value();\n" + 
			"					}\n" + 
			"				}\n" + 
			"			} else {\n" + 
			"				return this._values();\n" + 
			"			}\n" + 
			"		},\n" + 
			"\n" + 
			"		_setOption : function(key, value) {\n" + 
			"			var i, valsLength = 0;\n" + 
			"\n" + 
			"			if ($.isArray(this.options.values)) {\n" + 
			"				valsLength = this.options.values.length;\n" + 
			"			}\n" + 
			"\n" + 
			"			$.Widget.prototype._setOption.apply(this,\n" + 
			"					arguments);\n" + 
			"\n" + 
			"			switch (key) {\n" + 
			"			case \"disabled\":\n" + 
			"				if (value) {\n" + 
			"					this.handles.filter(\".ui-state-focus\")\n" + 
			"							.blur();\n" + 
			"					this.handles\n" + 
			"							.removeClass(\"ui-state-hover\");\n" + 
			"					this.handles.prop(\"disabled\", true);\n" + 
			"					this.element.addClass(\"ui-disabled\");\n" + 
			"				} else {\n" + 
			"					this.handles.prop(\"disabled\", false);\n" + 
			"					this.element.removeClass(\"ui-disabled\");\n" + 
			"				}\n" + 
			"				break;\n" + 
			"			case \"orientation\":\n" + 
			"				this._detectOrientation();\n" + 
			"				this._resetClass();\n" + 
			"				this._refreshValue();\n" + 
			"				break;\n" + 
			"			case \"value\":\n" + 
			"				this._animateOff = true;\n" + 
			"				this._refreshValue();\n" + 
			"				this._change(null, 0);\n" + 
			"				this._animateOff = false;\n" + 
			"				break;\n" + 
			"			case \"values\":\n" + 
			"				this._animateOff = true;\n" + 
			"				this._refreshValue();\n" + 
			"				for (var i = 0; i < valsLength; i += 1) {\n" + 
			"					this._change(null, i);\n" + 
			"				}\n" + 
			"				this._animateOff = false;\n" + 
			"				break;\n" + 
			"			case \"min\":\n" + 
			"			case \"max\":\n" + 
			"				this._animateOff = true;\n" + 
			"				this._refreshValue();\n" + 
			"				this._animateOff = false;\n" + 
			"			break;\n" + 
			"			case \"visibleAmount\":\n" + 
			"				this.isScrollBar = true;\n" + 
			"				this.visibleAmount = value;\n" + 
			"				var min = this._valueMin();\n" + 
			"				var max = this._valueMax();\n" + 
			"				var f = (value >= 0 && min + value <= max ? \n" + 
			"					 value * 1 / (max - min) : 0.1);\n" + 
			"				this.visibleFraction = f;\n" + 
			"				if (f < 0.1)\n" + 
			"					f = 0.1;\n" + 
			"				this.handleFraction = f;\n" + 
			"				var hw = length(this);\n" + 
			"				if (this.orientation === \"horizontal\")\n" + 
			"					$(this.handles[0]).width(this.handleSize = f * hw);\n" + 
			"				else\n" + 
			"					$(this.handles[0]).height(this.handleSize = f * hw);\n" + 
			"				this.visibleAdjust = (f - this.visibleFraction) * hw;\n" + 
			"				this._animateOff = true;\n" + 
			"				this._resetClass();\n" + 
			"				this._refreshValue();\n" + 
			"				this._animateOff = false;\n" + 
			"			break;\n" + 
			"			}\n" + 
			"		},\n" + 
			"\n" + 
			"		// internal value getter\n" + 
			"		// _value() returns value trimmed by min and max,\n" + 
			"		// aligned by step\n" + 
			"		_value : function() {\n" + 
			"			return this._trimAlignValue(this.options.value);\n" + 
			"		},\n" + 
			"\n" + 
			"		// internal values getter\n" + 
			"		// _values() returns array of values trimmed by min\n" + 
			"		// and max, aligned by step\n" + 
			"		// _values( index ) returns single value trimmed by\n" + 
			"		// min and max, aligned by step\n" + 
			"		_values : function(index) {\n" + 
			"			if (arguments.length) {\n" + 
			"				return this._trimAlignValue(this.options.values[index]);\n" + 
			"			} \n" + 
			"			// .slice() creates a copy of the array\n" + 
			"			// this copy gets trimmed by min and max and\n" + 
			"			// then returned\n" + 
			"			var vals = this.options.values.slice();\n" + 
			"			for (var i = 0; i < vals.length; i += 1) {\n" + 
			"				vals[i] = this._trimAlignValue(vals[i]);\n" + 
			"			}\n" + 
			"			return vals;\n" + 
			"		},\n" + 
			"\n" + 
			"		_getPosition : function(event) {\n" + 
			"			var position = (event.pageX || event.pageX === 0 ?\n" + 
			"				{\n" + 
			"					x : event.pageX,\n" + 
			"					y : event.pageY\n" + 
			"				} : {\n" + 
			"					// touch event? get position from touch\n" + 
			"					x : event.originalEvent.touches[0].pageX,\n" + 
			"					y : event.originalEvent.touches[0].pageY\n" + 
			"				});\n" + 
			"			return position;\n" + 
			"		},\n" + 
			"		\n" + 
			"		// returns the step-aligned value that val is\n" + 
			"		// closest to, between (inclusive) min and max\n" + 
			"		_trimAlignValue : function(val) {\n" + 
			"			if (val <= this._valueMin()) {\n" + 
			"				return this._valueMin();\n" + 
			"			}\n" + 
			"			var max = Math.round(this._valueMax() - this.visibleAmount); //* (1-this.handleFraction)\n" + 
			"			if (val >= max) {\n" + 
			"				return max;\n" + 
			"			}\n" + 
			"			var step = (this.options.step > 0) ? this.options.step\n" + 
			"					: 1, valModStep = (val - this\n" + 
			"					._valueMin())\n" + 
			"					% step, alignValue = val - valModStep;\n" + 
			"\n" + 
			"			if (Math.abs(valModStep) * 2 >= step) {\n" + 
			"				alignValue += (valModStep > 0) ? step\n" + 
			"						: (-step);\n" + 
			"			}\n" + 
			"\n" + 
			"			// Since JavaScript has problems with large\n" + 
			"			// floats, round\n" + 
			"			// the final value to 5 digits after the decimal\n" + 
			"			// point (see #4124)\n" + 
			"\n" + 
			"			return Math.round(alignValue);// parseFloat(alignValue.toFixed(5));\n" + 
			"		},\n" + 
			"\n" + 
			"		_valueMin : function() {\n" + 
			"			return this.options.min;\n" + 
			"		},\n" + 
			"\n" + 
			"		_valueMax : function() {\n" + 
			"			return this.options.max;\n" + 
			"		},\n" + 
			"\n" + 
			"		_getValPercent : function(i) {\n" + 
			"			var dif = this._valueMax() - this._valueMin();\n" + 
			"			var valPercent = (dif == 0 ? 0\n" + 
			"					: ((i >= 0 ? this.values(i) : this\n" + 
			"							.value()) - this._valueMin())\n" + 
			"							/ dif * 100);\n" + 
			"			return (this.options.inverted && !this.isScrollBar ? 100 - valPercent\n" + 
			"					: valPercent);\n" + 
			"		},\n" + 
			"\n" + 
			"		_refreshValue : function() {\n" + 
			"			var lastValPercent, valPercent, value, valueMin, valueMax;\n" + 
			"			var o = this.options;\n" + 
			"			var oRange = o.range;\n" + 
			"			var that = this;\n" + 
			"			var animate = (!this._animateOff) ? o.animate : false;\n" + 
			"			var _set = {};\n" + 
			"			if (this.options.values\n" + 
			"					&& this.options.values.length) {\n" + 
			"				this.handles\n" + 
			"						.each(function(i) {\n" + 
			"							valPercent = that\n" + 
			"									._getValPercent(i);\n" + 
			"							_set[that.orientation === \"horizontal\" ? \"left\"\n" + 
			"									: \"bottom\"] = valPercent\n" + 
			"									+ \"%\";\n" + 
			"							$(this).stop(1, 1)[animate ? \"animate\"\n" + 
			"									: \"css\"](_set,\n" + 
			"									o.animate);\n" + 
			"							if (that.options.range === true) {\n" + 
			"								if (that.orientation === \"horizontal\") {\n" + 
			"									if (i === 0) {\n" + 
			"										that.range.stop(1,\n" + 
			"												1)[animate ? \"animate\"\n" + 
			"												: \"css\"]\n" + 
			"												(\n" + 
			"														{\n" + 
			"															left : valPercent\n" + 
			"																	+ \"%\"\n" + 
			"														},\n" + 
			"														o.animate);\n" + 
			"									}\n" + 
			"									if (i === 1) {\n" + 
			"										that.range[animate ? \"animate\"\n" + 
			"												: \"css\"]\n" + 
			"												(\n" + 
			"														{\n" + 
			"															width : (valPercent - lastValPercent)\n" + 
			"																	+ \"%\"\n" + 
			"														},\n" + 
			"														{\n" + 
			"															queue : false,\n" + 
			"															duration : o.animate\n" + 
			"														});\n" + 
			"									}\n" + 
			"								} else {\n" + 
			"									if (i === 0) {\n" + 
			"										that.range.stop(1,\n" + 
			"												1)[animate ? \"animate\"\n" + 
			"												: \"css\"]\n" + 
			"												(\n" + 
			"														{\n" + 
			"															bottom : (valPercent)\n" + 
			"																	+ \"%\"\n" + 
			"														},\n" + 
			"														o.animate);\n" + 
			"									}\n" + 
			"									if (i === 1) {\n" + 
			"										that.range[animate ? \"animate\"\n" + 
			"												: \"css\"]\n" + 
			"												(\n" + 
			"														{\n" + 
			"															height : (valPercent - lastValPercent)\n" + 
			"																	+ \"%\"\n" + 
			"														},\n" + 
			"														{\n" + 
			"															queue : false,\n" + 
			"															duration : o.animate\n" + 
			"														});\n" + 
			"									}\n" + 
			"								}\n" + 
			"							}\n" + 
			"							lastValPercent = valPercent;\n" + 
			"						});\n" + 
			"			} else {\n" + 
			"				// just one handle\n" + 
			"				valPercent = this._getValPercent(-1);\n" + 
			"				var isHorizontal = (this.orientation === \"horizontal\");\n" + 
			"				var val = (valPercent * getPixelTotal(this)/100) + \"px\";									\n" + 
			"				_set[isHorizontal ? \"left\"\n" + 
			"						: this.isScrollBar ? \"top\" : \"bottom\"] = val;\n" + 
			"				this.handle.stop(1, 1)[animate ? \"animate\"\n" + 
			"						: \"css\"](_set, o.animate);\n" + 
			"\n" + 
			"				if (oRange === \"min\" && isHorizontal) {\n" + 
			"					this.range.stop(1, 1)[animate ? \"animate\"\n" + 
			"							: \"css\"]({\n" + 
			"						width : valPercent + \"%\"\n" + 
			"					}, o.animate);\n" + 
			"				}\n" + 
			"				if (oRange === \"max\" && isHorizontal) {\n" + 
			"					this.range[animate ? \"animate\" : \"css\"]\n" + 
			"							({\n" + 
			"								width : (100 - valPercent)\n" + 
			"										+ \"%\"\n" + 
			"							}, {\n" + 
			"								queue : false,\n" + 
			"								duration : o.animate\n" + 
			"							});\n" + 
			"				}\n" + 
			"				if (oRange === \"min\"\n" + 
			"						&& this.orientation === \"vertical\") {\n" + 
			"					this.range.stop(1, 1)[animate ? \"animate\"\n" + 
			"							: \"css\"]({\n" + 
			"						height : valPercent + \"%\"\n" + 
			"					}, o.animate);\n" + 
			"				}\n" + 
			"				if (oRange === \"max\"\n" + 
			"						&& this.orientation === \"vertical\") {\n" + 
			"					this.range[animate ? \"animate\" : \"css\"]\n" + 
			"							({\n" + 
			"								height : (100 - valPercent)\n" + 
			"										+ \"%\"\n" + 
			"							}, {\n" + 
			"								queue : false,\n" + 
			"								duration : o.animate\n" + 
			"							});\n" + 
			"				}\n" + 
			"			}\n" + 
			"		}\n" + 
			"\n" + 
			"	});\n" + 
			"};\n" + 
			"\n" + 
			"})(J2S.__$);\n" + 
			"");

   }
	
	
}
