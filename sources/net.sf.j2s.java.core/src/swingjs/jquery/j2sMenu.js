// J2SMenu.js from JSmolMenu.js
// Original version for JSmol Bob Hanson 2/17/2014 
// author: Bob Hanson, hansonr@stolaf.edu
// last edited 1/23/2019 -- fixes for mouse-down effector (mac) operation

// TODO: test for dynamic update of menu items, as in Jmol

/*! jQuery UI - v1.9.2 - 2012-12-17
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.menu.js
* Copyright (c) 2012 jQuery Foundation and other contributors Licensed MIT */

;(function(Swing) {

if (J2S.isResourceLoaded("swingjs/jquery/j2sMenu.js", true))return;

;(function(jQuery) {

/*
 * ! jQuery UI - v1.9.2 - 2012-12-17 http://jqueryui.com Includes:
 * jquery.ui.core.css, jquery.ui.menu.css To view and modify this theme, visit
 * http://jqueryui.com/themeroller/?ffDefault=Lucida%20Grande%2CLucida%20Sans%2CArial%2Csans-serif&fwDefault=bold&fsDefault=1.1em&cornerRadius=5px&bgColorHeader=5c9ccc&bgTextureHeader=12_gloss_wave.png&bgImgOpacityHeader=55&borderColorHeader=4297d7&fcHeader=ffffff&iconColorHeader=d8e7f3&bgColorContent=fcfdfd&bgTextureContent=06_inset_hard.png&bgImgOpacityContent=100&borderColorContent=a6c9e2&fcContent=222222&iconColorContent=469bdd&bgColorDefault=dfeffc&bgTextureDefault=03_highlight_soft.png&bgImgOpacityDefault=85&borderColorDefault=c5dbec&fcDefault=2e6e9e&iconColorDefault=6da8d5&bgColorHover=d0e5f5&bgTextureHover=03_highlight_soft.png&bgImgOpacityHover=75&borderColorHover=79b7e7&fcHover=1d5987&iconColorHover=217bc0&bgColorActive=f5f8f9&bgTextureActive=06_inset_hard.png&bgImgOpacityActive=100&borderColorActive=79b7e7&fcActive=e17009&iconColorActive=f9bd01&bgColorHighlight=fbec88&bgTextureHighlight=01_flat.png&bgImgOpacityHighlight=55&borderColorHighlight=fad42e&fcHighlight=363636&iconColorHighlight=2e83ff&bgColorError=fef1ec&bgTextureError=02_glass.png&bgImgOpacityError=95&borderColorError=cd0a0a&fcError=cd0a0a&iconColorError=cd0a0a&bgColorOverlay=aaaaaa&bgTextureOverlay=01_flat.png&bgImgOpacityOverlay=0&opacityOverlay=30&bgColorShadow=aaaaaa&bgTextureShadow=01_flat.png&bgImgOpacityShadow=0&opacityShadow=30&thicknessShadow=8px&offsetTopShadow=-8px&offsetLeftShadow=-8px&cornerRadiusShadow=8px
 * Copyright (c) 2012 jQuery Foundation and other contributors Licensed MIT
 */

if (!jQuery.ui.j2smenu)
try{

// local methods here for help with debugging
	
 var delayMe = function(element, f, ms) {
	 var id = element._delay(f, ms);
	 return id;
 }	
 
 var clearMe = function(id, why) {
	 return clearTimeout(id);
 }

 var someMenuOpen = function(e) {
	 try {
	 return e(".swingjsPopupMenu:visible").length > 0;
	 } catch(e) {
		 System.out.println(e);
		 return 0;
	 }
 }
 
 var cleanText = function(n) {
	 return n && n.innerText.replace(/\n/g,"|");
 }
 
 var CLICK_OUT_DELAY = 200;// ms; 100 was too fast
 
 var outActive;
 
 var doCmd = function(trigger,me,e,t,n,why) {
	 why || (why = "");
	 switch(trigger) {
	 case "onover1":
	 case "onover2":
	 case "onover3":
	 case "onover":
		 // BH 2018
		 // -- added stopPropagation
		 // -- changed to mouseover from mouseenter, since we have children
		 var a = e(t.target).closest("li")
		 if (a.hasClass(".ui-state-focus"))
			 return;		 
		 if (!a.hasClass("j2s-popup-menu")) {
			 me._closeSubmenus(a.parent());			 
		 }
		 var m = a;
		 a = a.find(".a");
		 a[0] && a[0].focus();
		 var n=e(t.currentTarget).closest(".ui-j2smenu-item");
		 n.siblings().children(".ui-state-active").removeClass("ui-state-active");
		 t.stopPropagation();
		 me.focus(t,n);
		 t = m;
		 break;
	 case "onrelease":
	 case "onpress":
		 // t.preventDefault();
// break;
	 case "onclick":
		var n=e(t.target).closest(".ui-j2smenu-item");
		if (n.has(".ui-state-disabled").length)
			return;
		if (trigger != "onclick")
			break;
		me.select(t);
		if (n.has(".ui-j2smenu").length) {
			me.expand(t);
		} else {
			if (!me.element.is(":focus")) {
				me.element.trigger("focus",[!0]);
				me.active&&me.active.parents(".ui-j2smenu").length===1&&clearMe(me.timer, trigger);
			} 
   		 doCmd("collapseAll", me, e, 0, 1);			 
// doCmd("_hide", me, e, e(".ui-j2smenu"));
		}
		break;
	 case "clearOut":
		 //System.err.println("click removed " + me.uuid);
		 me._off(me.document, "click");
		 outActive = null;
		 return;
	 case "noclickout":
		 //System.err.println("noclickout " + me.uuid + " " + (+new Date));
		 if (outActive)
			 doCmd("clearOut", outActive);
		 setTimeout(function(){	
			 //System.err.println("click added " + me.uuid);
			 outActive = me;
			 me._on(me.document,{ "click":function(t){doCmd("onclick_out", me, $, t),n=!1}});			 
			 
		 },CLICK_OUT_DELAY);
		 return;
	 case "onclick_out":
		 if (outActive != me || !someMenuOpen(e)) {
			 doCmd("clearOut", me);
			 return;
		 }		 
		 //System.err.println("onclick_out " + me.uuid + " " + (+new Date));
		 e(t.target).closest(".j2s-menuBar-menu").length == 0 
		    && (e(t.target).closest(".ui-j2smenu").length||me.collapseAll(t));
	 	return;
	 case "onleave":
		 me.collapseAll(t);
		 return;
	 case "onfocus":
		 n||me.focus(t,me.active||me.element.children(".ui-j2smenu-item").eq(0));
		 return;
	 case "onblur":
		 me.timer = delayMe(me, function(){e.contains(me.element[0],me.document[0].activeElement)||me.collapseAll(t)});
		 break;
	 case "_activate":
		 me.active.is(".ui-state-disabled")||(me.active.children(".a[aria-haspopup='true']").length?me.expand(t):me.select(t));
		 break;
	 case "_startOpening":
		 if(t.attr("aria-hidden")!=="true") {
			 return;
		 }
		 me.timer=delayMe(me, function(){me._closeSubmenus(),me._openSubmenu(t);},me.delay);
		 return;
	 case "_hideAllMenus":
		 // trigger Java to deselect these - the JMenu class
		 t = me.element.find(".ui-j2smenu[aria-hidden!=true]").attr("aria-hidden","true").parent();
		 if (!t[0])
			 return;
		 break;
	 case "_openSubmenu":
		 n||(n = me.active || me.activeMenu);
		 if (n.is(".ui-state-disabled"))
			 return;
		 n = e.extend({of:n},me.options.position);
		 var ui = me.activeMenu && me.activeMenu[0] && me.activeMenu[0]["data-ui"];
	 	 ui && ui.processJ2SMenuCmd$OA([trigger,me,e,t.parent(),n,why]);
		 clearMe(me.timer, trigger);
		 me.refresh("_openSubmenu",n);
		 var v = me.element.find(".ui-j2smenu").not(t.parents(".ui-j2smenu"));
		 doCmd("_hide", me, e, v);
		 try {
			 // required if menu has been modified
			 doCmd("_show", me, e, me.activeMenu);
			 doCmd("_show", me, e, t);
			 t.removeAttr("aria-hidden").attr("aria-expanded","true").position(n);
		 } catch(err){
			 System.out.println("j2sMenu error: " + err);
		 }
		 return;
	 case "_closeSubmenus":
		 var a = me.active;
		 if (a && a[0] && a[0]["data-component"].uiClassID != "MenuUI")
			return;
		 t||(t=me.active?me.active.parent():me.element);
		 var m = t.closest("ul").find(".ui-state-active")
		 m.removeClass("ui-state-active");
		 var v = t.find(".ui-j2smenu");
		 if (!v.length)
			 return;
		 doCmd("_hide", me, e, v);
		 v.attr("aria-hidden","true").attr("aria-expanded","false");
		 t = v.parent();
		 break;
	 case "_move":
		 var a = n[0];
		 var b = n[1];
		 var r = me.active&&
				 (a==="first"||a==="last"? me.active[a==="first"?"prevAll":"nextAll"](".ui-j2smenu-item").eq(-1)
				   : me.active[a+"All"](".ui-j2smenu-item").eq(0));
		 if(!r||!r.length||!me.active)
			 r=me.activeMenu.children(".ui-j2smenu-item")[b]();
		 me._closeSubmenus(r);
		 me.focus(t,r);
		 return;
	 case "_show":
		 t.show();
		 break;
	 case "_hide":
		 if (!t[0])
			 return;
		 t.hide();
		 break;
	 case "expand":
		 if (!someMenuOpen(e) || me.active && me.active.is(".ui-state-disabled"))
			 return;
		 n = me.active&&me.active.children(".ui-j2smenu").children(".ui-j2smenu-item").first();
		 if (n&&n.length) {
			 me._openSubmenu(n.parent());
			 me.timer = delayMe(me,function(){me.focus(t,n)});
		 }
		 break;
	 case "collapse":
		 if (!someMenuOpen(e))
			 return;
		 me._closeSubmenus();
		 var v=me.active&&me.active.parent().closest(".ui-j2smenu-item",me.element);
		 if (v && v.length) {
			 me.focus(t,v);
			 me._closeSubmenus(v);
		 } else {
// doCmd("_hide", me, e, e(".ui-j2smenu"));
			 doCmd("collapseAll", me, e, 0, 1);			 
		 }
		 break;
	 case "collapseAll":
		 var u;
		 if ( me.closed || !n && (!someMenuOpen(e) ||
			  ((u=e(t&&t.target)).hasClass("ui-j2smenu-node") || u.hasClass("ui-j2smenu"))
			))
			 return;
		 doCmd("_hideAllMenus", me, e);
		 //System.err.println("collapseAll " + me.uuid);
		 clearMe(me.timer, trigger),
		 me.timer = delayMe(me,
	       function(){
			 doCmd("clearOut", me);
			 if (!someMenuOpen(e))
				 return;
			 var r=n?me.element:e(t&&t.target).closest(me.element.find(".ui-j2smenu"));
			 r.length||(r=me.element);
			 me._closeSubmenus(r);
			 me.blur(t);
			 me.activeMenu=r;
			 me.closed = true;
		   }, me.delay); 
		 break;
	 case "focus":
		 //System.out.println("j2smenu " + document.activeElement.id);
		 me.blur(t,t&&t.type==="focus");
		 me._scrollIntoView(n);
		 me.active=n.first();
		 var r=me.active.addClass("ui-state-focus");
		 var r=me.active.children(".a").addClass("ui-state-focus");
		 me.options.role&&me.element.attr("aria-activedescendant", r.attr("id"));
		 me.active.parent().closest(".ui-j2smenu-item").children(".a:first").addClass("ui-state-active");
// no! t&&t.type==="keydown"?me._closeSubmenus() : me.timer=delayMe(me,
// function(){me._closeSubmenus()},me.delay);
		 var u=n.children(".ui-j2smenu");
		 u.length&&/^mouse/.test(t.type)&&me._startOpening(u);
		 me.activeMenu=n.parent();
		 me._trigger("focus",t,{item:n});
		 t = n;
		 //System.out.println("j2smenu " + document.activeElement.id);
		 break;
	 case "blur":
		 //System.out.println("j2smenu " + document.activeElement.id);
		 if (me.active && t && typeof n == "undefined" && t.relatedTarget && t.relatedTarget.getAttribute("role") != "presentation")	 {
			 doCmd("_hide", me, t, me.element);
		 }
		 n||clearMe(me.timer, trigger);
		 if(!me.active)return;
		 me.active.removeClass("ui-state-focus");
		 me.active.children(".a").removeClass("ui-state-focus");
		 var a = me.active;
		 me.active=null;
		 me._trigger("blur",t,{item:a});
		 t = a;
		 //System.out.println("j2smenu " + document.activeElement.id);
		 break;
	 case "select":
		 me.active=me.active||e(t.target).closest(".ui-j2smenu-item");
		 me.active.has(".ui-j2smenu").length||me.collapseAll(t,!0);
		 me._trigger("select",t,{item:me.active});
		 if (!t[0])
			 return;
		 break;
	 case "refresh":
		 n=me.options.icons.submenu;
		 var role=me.options.role;
		 var r=me.element.find(me.options.menus);
		 t = r.filter(":not(.ui-j2smenu)")
		   .addClass("ui-j2smenu ui-widget ui-widget-content ui-corner-all");
		 doCmd("_hide", me, e, t);
		 t.attr({role:me.options.role,"aria-hidden":"true","aria-expanded":"false"})
		   .each(function(){
			   var t=e(this),r=t.prev(".a"),
			   i=e("<span>").addClass("ui-j2smenu-icon ui-icon "+n)
			   .attr({role:role})
			   .data("ui-j2smenu-submenu-carat",!0);
			   r.attr("aria-haspopup","true").prepend(i);
			   t.attr("aria-labelledby",r.attr("id"));
		   });
		 t=r.add(me.element);
		 t.children(":not(.ui-j2smenu-item):has(.a)").addClass("ui-j2smenu-item")
		   		.attr("role","presentation").children(".a").uniqueId()
		   		.addClass("ui-corner-all").attr({tabIndex:-1,role:"menuitem"});
		 t.children(":not(.ui-j2smenu-item)").addClass("ui-widget-content ui-j2smenu-divider");
		 t.children(".ui-state-disabled").attr("aria-disabled","true");
		 me.active&&!e.contains(me.element[0],me.active[0])&&me.blur();
		 return;
	 case "keyActivate":
		 
		 // BH 1/15/2019 key mnemonics
		 
		 var node = e(".j2s-popup-menu  > :visible.ui-mnem-" + Character.toLowerCase$I(t.keyCode));
		 switch (node.length) {
		 case 0:
			 doCmd("onclick", me, e, t);
			 break;
		 case 1:
			 doCmd("_openSubmenu", me, e, node.next("ul"), node);
			 break;
		 default:
			 // ignore multiple hits
			 break;
		 }
		 break;
	 }
	 
	 var ui = me.activeMenu && me.activeMenu[0] && me.activeMenu[0]["data-ui"];
 	 ui && ui.processJ2SMenuCmd$OA([trigger,me,e,t,n,why]);
 }
 
 // BH note that swingjs.plaf.JSButton will set and clear ui-state-disabled
	// on its own
 

;(function(e,t){var n=!1;e.widget("ui.j2smenu",{
 version:"1.9.2",
 defaultElement:"<ul>",
 delay:300,
 options:{icons:{submenu:"ui-icon-carat-1-e"},
 menus:"ul",
 position:{my:"left top",at:"right top"},
 role:"j2smenu",
 blur:null,
 focus:null,
 select:null,
 jPopupMenu:null
 },
 
 
 _create:function(){

	 this.closed = false;
	 
	 if (typeof this.options.delay == "number")
		 this.delay = this.options.delay;
	 
	 this.activeMenu=this.element,
	 this.element.uniqueId().addClass("ui-j2smenu ui-widget ui-widget-content ui-corner-all")
	   .toggleClass("ui-j2smenu-icons",!!this.element.find(".ui-icon").length)
	   .attr({role:this.options.role,tabIndex:0})
	   .bind("click"+this.eventNamespace,e.proxy(function(e){ this.options.disabled&&e.preventDefault() },this)),
	 this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),
	 this._on({
		 "mousedown .ui-j2smenu-item > .a":        function(t){ doCmd("onpress",this,e,t) },
		 "mouseup .ui-j2smenu-item > .a":        function(t){ doCmd("onrelease",this,e,t) },
		 "click .ui-state-disabled > .a":       function(t){t.preventDefault()},
		 "click .ui-j2smenu-item:has(.a)":         function(t){ doCmd("onclick",this,e,t);},
		 "mousemove .ui-j2smenu-node":function(t){ doCmd("onover1",this,e,t,0); },
		 "mousemove .swingjsPopupMenu ":function(t){ doCmd("onover2",this,e,t,0); },
		 "mouseover .ui-j2smenu-item":             function(t){ doCmd("onover3",this,e,t,1); },
		 mouseleave:                            function(t){ doCmd("onleave",this,e,t); },
		 "mouseleave .ui-j2smenu":                 function(t){ doCmd("onleave",this,e,t); },
		 focus:                                 function(t,n){doCmd("onfocus",this,e,t,n); },
		 blur:                                  function(t){doCmd("onblur",this,e,t)},
		 keydown:"_keydown"
	 }), 
	 this.refresh("create");
 	},
 _destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-j2smenu").andSelf()
	 .removeClass("ui-j2smenu ui-widget ui-widget-content ui-corner-all ui-j2smenu-icons")
	 .removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded")
	 .removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),
	 this.element.find(".ui-j2smenu-item").removeClass("ui-j2smenu-item")
	 .removeAttr("role").removeAttr("aria-disabled")
	 .children(".a").removeUniqueId().removeClass("ui-corner-all ui-state-hover")
	 .removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var t=e(this);t.data("ui-j2smenu-submenu-carat")&&t.remove()}),this.element.find(".ui-j2smenu-divider").removeClass("ui-j2smenu-divider ui-widget-content")
	 },
 _keydown:function(t){
	t.preventDefault();	 	
	 var n,r,i,s,o,u=!0;
	 switch(t.keyCode){
	 case 16:
	 case 17:
	 case 18: // CTRL ALT SHIFT alone
		 break;
	 case e.ui.keyCode.PAGE_UP:
		 this.previousPage(t);
		 break;
	 case e.ui.keyCode.PAGE_DOWN:
		 this.nextPage(t);
		 break;
	 case e.ui.keyCode.HOME:
		 this._move("first","first",t);
		 break;
	 case e.ui.keyCode.END:
		 this._move("last","last",t);
		 break;
	 case e.ui.keyCode.UP:
		 this.previous(t);
		 break;
	 case e.ui.keyCode.DOWN:
		 this.next(t);
		 break;
	 case e.ui.keyCode.LEFT:
		 this.collapse(t);
		 break;
	 case e.ui.keyCode.RIGHT:
		 this.active&&!this.active.is(".ui-state-disabled")&&this.expand(t);
		 break;
	 case e.ui.keyCode.ENTER:
	 case e.ui.keyCode.SPACE:
		 this._activate(t);
		 break;
	 case e.ui.keyCode.ESCAPE:
		 
		 this.collapse(t);
		 break;
	 default:
// function a(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}
// u=!1,
// r=this.previousFilter||"",
// i=String.fromCharCode(t.keyCode),
// s=!1,clearMe(this.filterTimer),
// i===r?s=!0:i=r+i,
// o=new RegExp("^"+a(i),"i"),
// n=this.activeMenu.children(".ui-j2smenu-item").filter(function(){return
// o.test(e(this).children(".a").text())}),
// n=s&&n.index(this.active.next())!==-1?this.active.nextAll(".ui-j2smenu-item"):n,
// n.length||(
// i=String.fromCharCode(t.keyCode),
// o=new RegExp("^"+a(i),"i"),
// n=this.activeMenu.children(".ui-j2smenu-item").filter(
// function(){
// return o.test(e(this).children(".a").text())
// }
// )),
// n.length?(
// this.focus(t,n),
// n.length>1?(
// this.previousFilter=i,
// this.filterTimer=delayMe(function(){delete this.previousFilter},1e3)
// ):delete this.previousFilter
// ):delete this.previousFilter;
		doCmd("keyActivate",this, e, t, true);
		break;
	}
 },
 _activate:function(t){     doCmd("_activate", this, e, t); },
 _startOpening: function(t){ doCmd("_startOpening", this, e, t); },
 focus:function(t,n){       doCmd("focus", this, e, t, n) },
 blur:function(t,n){        doCmd("blur", this, e, t, n);},
 _openSubmenu:function(t){  doCmd("_openSubmenu", this, e, t);},
 _closeSubmenus:function(t){doCmd("_closeSubmenus", this, e, t, n);},
 collapseAll:function(t,n,why){ doCmd("collapseAll",this, e, t, n, why);},
 collapse:function(t){      doCmd("collapse", this, e, t);},
 refresh:function(t,n){     doCmd("refresh", this, e, t, n); },
 expand:function(t){        doCmd("expand", this, e, t);},
 select:function(t){        doCmd("select", this, e, t); },
 noclickout:function() {    doCmd("noclickout", this); }, 
 next:function(t){this._move("next","first",t)},
 previous:function(t){this._move("prev","last",t)},
 _scrollIntoView:function(t){var n,r,i,s,o,u;this._hasScroll()&&(n=parseFloat(e.css(this.activeMenu[0],"borderTopWidth"))||0,r=parseFloat(e.css(this.activeMenu[0],"paddingTop"))||0,i=t.offset().top-this.activeMenu.offset().top-n-r,s=this.activeMenu.scrollTop(),o=this.activeMenu.height(),u=t.height(),i<0?this.activeMenu.scrollTop(s+i):i+u>o&&this.activeMenu.scrollTop(s+i-o+u))},
 isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-j2smenu-item").length},
 isLastItem:function(){return this.active&&!this.active.nextAll(".ui-j2smenu-item").length},
 nextPage:function(t){var n,r,i;if(!this.active){this.next(t);return}if(this.isLastItem())return;this._hasScroll()?(r=this.active.offset().top,i=this.element.height(),this.active.nextAll(".ui-j2smenu-item").each(function(){return n=e(this),n.offset().top-r-i<0}),this.focus(t,n)):this.focus(t,this.activeMenu.children(".ui-j2smenu-item")[this.active?"last":"first"]())},
 previousPage:function(t){var n,r,i;if(!this.active){this.next(t);return}if(this.isFirstItem())return;this._hasScroll()?(r=this.active.offset().top,i=this.element.height(),this.active.prevAll(".ui-j2smenu-item").each(function(){return n=e(this),n.offset().top-r+i>0}),this.focus(t,n)):this.focus(t,this.activeMenu.children(".ui-j2smenu-item").first())},

 _move:function(a,b,t){ doCmd("_move", this, e, t, [a,b]);},
 _hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")}
 })
 })(jQuery);
}catch (e) {
	System.out.println("JSmolMenu failed to load jQuery.ui.j2smenu. jQuery version conflict? should be at least 1.9.2 " + e.ui.version);
}

Swing.menuCounter = 0;
Swing.menuInitialized = 0;

Swing.__getMenuStyle = function(applet) { return '\
	.swingjsPopupMenu{font-family:Arial,sans-serif;font-size:11px;position:absolute;z-index:'+J2S.getZ(applet, "menu")+'}\
	.swingjsPopupMenu,.swingjsPopupMenu .ui-corner-all{border-radius:5px}\
	.swingjsPopupMenu,.swingjsPopupMenu .ui-widget-content{border:1px solid #a6c9e2;background-color:#fcfdfd;color:#222}\
	.swingjsPopupMenu .a{color:#222;font-size:10px;}\
	.swingjsPopupMenu input[type="checkbox"]{vertical-align:middle;}\
	.swingjsPopupMenu,.swingjsPopupMenu .ui-j2smenu{list-style:none;padding:2px;margin:0;display:block;outline:none;box-shadow:1px 1px 5px rgba(50,50,50,0.75)}\
	.swingjsPopupMenu .ui-j2smenu{margin-top:-3px;position:absolute}\
	.swingjsPopupMenu .ui-j2smenu-item{cursor:pointer;margin:0 0 0 0;padding:0;width:100%}\
	.swingjsPopupMenu .ui-j2smenu-divider{margin:3px 1px;height:0;transform:translateY(-4px);position:absolute;font-size:0;line-height:0px;border-width:2px 0 0 0;width:93%;}\
	.swingjsPopupMenu .ui-j2smenu-item .a{display:block;padding:0.05em 0.4em;white-space:nowrap;border:1px solid transparent}\
	.swingjsPopupMenu .ui-j2smenu-icons{position:relative}\
	.swingjsPopupMenu .ui-j2smenu-icons .ui-j2smenu-item .a{position:relative;padding-left:2em}\
	.swingjsPopupMenu .ui-icon{display:block;text-indent:-99999px;overflow:hidden;background-repeat:no-repeat;position:absolute;top:.2em;left:.2em}\
	.swingjsPopupMenu .ui-j2smenu-icon{position:static;float:right}\
	.swingjsPopupMenu .ui-icon-alt-y{min-width:30ex;text-align:right;background-image:none;background-position:0 0}\
	.swingjsPopupMenu .ui-icon-alt-y:after{content:"alt-Y"}\
	.swingjsPopupMenu .ui-icon-alt-shift-x:{min-width:130ex;text-align:right;background-image:none;background-position:0 0}\
	.swingjsPopupMenu .ui-icon-alt-shift-x:after{content:"alt-shift-X"}\
	.swingjsPopupMenu .ui-icon-carat-1-e{min-width:10ex;text-align:right;background-image:none;background-position:0 0}\
	.swingjsPopupMenu .ui-icon-carat-1-e:after{content:"\\0025B6"}\
	.swingjsPopupMenu .ui-state-default{border:1px solid #c5dbec;background:#dfeffc;color:#2e6e9e}\
	.swingjsPopupMenu .ui-state-default .a{color:#2e6e9e;}\
	.swingjsPopupMenu .ui-state-hover,.swingjsPopupMenu .ui-state-focus{background:#d0e5f5;color:#1d5987}\
	.swingjsPopupMenu .ui-state-hover .a{color:#1d5987;cursor:pointer;}\
	.swingjsPopupMenu .ui-state-active{border:1px solid #79b7e7;background:#f5f8f9;color:#e17009}\
	.swingjsPopupMenu .ui-state-active .a{color:#e17009;cursor:pointer;}\
	.swingjsPopupMenu .ui-state-highlight{border:1px solid #fad42e;background:#fbec88;color:#363636}\
	.swingjsPopupMenu .ui-state-highlight .a{color:#363636}\
	.swingjsPopupMenu .ui-state-disabled *{color:#d6d6d6!important;font-weight:normal;cursor:default}\
	.swingjsPopupMenu .ui-state-disabled .a:hover{background-color:transparent!important;border-color:transparent!important}\
	.swingjsPopupMenu .ui-state-disabled .ui-icon{filter:Alpha(Opacity=35)}'};

// var bindMenuActionCommands = function(eventType, menu, isBind) {
// // called internally
// var children = (menu.uiClassID ? menu.ui.getChildren() :
// menu.getComponents());
// for(var i = children.length; --i >= 0;)
// bindMenuActionCommands(eventType, children[i], isBind);
// if (!menu.uiClassID || !menu["data-ui"])
// return;
// J2S.$documentOff(eventType, menu.id);
// if (isBind) {
// J2S.$documentOn(eventType, menu.id, function(event) {
// if (menu.uiClassID) {
// Swing.hideMenus(menu._applet);
// menu["data-ui"].handleJSEvent$O$I$O(event);
// } else if (menu.itemListener) {
// menu.selected = (menu.btnType == 2 /*javajs.swing.JMenuItem.TYPE_CHECKBOX*/ ?
// J2S.$prop(menu.id + "-cb", "checked") : true);
// Swing.hideMenus(menu._applet);
// menu.itemListener.itemStateChanged$java_awt_event_ItemEvent({getSource:function(){return
// menu}});
// } else if (menu.actionListener) {
// Swing.hideMenus(menu._applet);
// menu.actionListener.actionPerformed$java_awt_event_ActionEvent({getSource:function(){return
// menu},getActionCommand:function(){return menu.actionCommand}});
// }
// });
// }
// }

Swing.setMenu = function(menu) {
  // the object will be installed using $(body).after()
  
  // called by javajs.swing.JPopupMenu or swingjs.plaf.JSPopupMenuUI
	// (menu.uiClassID)
  // note that the z-index is only set by the FIRST applet accessing this
	// method
  // this is an oversight.
  menu._applet = (menu.ui ? menu.ui.applet : menu.applet); // SwingJS vs JSmol
	Swing.__getMenuStyle && J2S.$after("head", '<style>'+Swing.__getMenuStyle(menu._applet)+'</style>');  
	Swing.__getMenuStyle = null; // "static"
// if (menu.uiClassID) {
	  
	// TODO: We can't be creating fields in JPopupMenu! This is ancient stuff.
	  
    menu._visible = false;
    menu._j2sname = menu.id = menu.ui.id + '_' + (++Swing.menuCounter);
    menu.$ulTop = J2S.__$(); // empty jQuery selector
    var proto = menu.$init$.exClazz.prototype;
    proto._hideJSMenu = function(){Swing.hideMenu(this)};
    proto.dragBind || ( proto.dragBind = function(isBind){} );
    proto.setContainer || ( proto.setContainer = function(c){ this.$ulTop = c } );
    proto.setPosition || ( proto.setPosition = function(x,y) {
      this.$ulTop.css({left:x+"px",top:y+"px",position:"absolute"});
    } );    
    // delay addition to the DOM
// } else {
// menu._actionEvent = 'click';
// menu.popupMenu = menu;
// menu.id = menu.popupMenu._applet._id + "_" + menu.popupMenu.name + "_top_" +
// (++Swing.menuCounter);
// menu._j2sname = menu.name;
// J2S.$after("body",'<ul id="' + menu.id + '" class="swingJSPopupMenu"></ul>');
// menu.setContainer(J2S.$('#' + menu.id));
// }
	menu._applet._menus || (menu._applet._menus = {});
	menu._applet._menus[menu._j2sname] = menu;
	menu._tainted = true;
}
// Swing.initMenuItem = function(item) {
// // called by javajs.swing.AbstractButton only (Jmol)
// item._applet = item.popupMenu._applet;
// item.id = Swing.getMenuID(item);
// item.icon && (item.icon = '<img src="' + item._applet._j2sPath + '/' +
// item.icon + '" style="max-height: 20px;" />')
// }

Swing.updateMenu = function(menu, andShow) {
// if (menu.uiClassID) {
	    // for SwingJS the top node is domNode itself, which is already <ul>
    var node = menu.ui.domNode;
    if (node != menu.$ulTop[0]) {
        if (menu.$ulTop) {
          // bindMenuActionCommands(menu._actionEvent, menu, false);
          menu.$ulTop.remove();
        }
        menu.setContainer(J2S.$(node));
        J2S.$(node).addClass("swingjsPopupMenu");
    }
	node.style.display = (andShow ? "block" : "none");
    J2S.$after("body",node);
// } else {
// menu.$ulTop.html(menu.toHTML());
// bindMenuActionCommands(menu._actionEvent, menu, true);
// }
    var m = menu.$ulTop.j2smenu({delay:100, jPopupMenu: menu});
    m.j2smenu('refresh');  
    // this next is critical for SwingJS
// if (menu.uiClassID)
    var v = menu.$ulTop.find("[role=menuitem]");
    for (var i = v.length; --i >= 0;)
    	setMouseMenuItem(menu, v[i]);
	menu._tainted = false;
}

Swing.getInstance = function(menu) {
	return menu.$ulTop.data("ui-j2smenu");
}

var setMouseMenuItem = function(menu, node) {
    J2S.unsetMouse(node);
    node.applet = menu._applet;
    node._frameViewer = menu.invoker.getFrameViewer$();
    node._menu = menu;
    J2S.setMouse(node, true);
}

Swing.showMenu = function(menu, x, y) {
  // called by javajs.swing.JPopupMenu and swingjs.plaf.JSPopupMenuUI
	// (menu.uiClassID)
  // allow for a user callback for customization of menu
 // debugger;
 
  for (var i in menu._applet._menus)
    Swing.hideMenu(menu._applet._menus[i], true);  
  if (J2S._showMenuCallback)
	J2S._showMenuCallback(menu, x, y);
  var wasTainted = menu._tainted;
  
  // TODO: We can't be creating fields in JPopupMenu!
  
  if (menu._tainted)
	  Swing.updateMenu(menu);
  menu.setPosition(x, y);
  menu.$ulTop.hide().j2smenu("noclickout").show();  
  menu._visible = true;
  menu.timestamp = System.currentTimeMillis$();
  menu.dragBind(true);
// menu.$ulTop.unbind('clickoutjsmol mousemoveoutjsmol');
// if (!J2S._persistentMenu)
// menu.$ulTop.bind('clickoutjsmol mousemoveoutjsmol', function(evspecial,
// target, ev) {
// if (System.currentTimeMillis$() - menu.timestamp > 500)
// Swing.hideMenu(menu);
// });
  menu.$ulTop.bind("contextmenu", function() {return false;});
} 

Swing.hideMenu = function(menu, force) {
  // called internally often -- even on mouse moves
	if (menu._visible === false && !force) return;
	// menu.$ulTop.unbind('clickoutjsmol');
	menu.dragBind(false);
	menu.$ulTop.hide();
	menu._visible = menu.isDragging = false;
};

Swing.disposeMenu = function(menu) {
  // called by javajs.swing.JPopupMenu
  if (J2S._persistentMenu)
  	return
  Swing.hideMenu(menu);
  menu.$ulTop.j2smenu().destroy && menu.$ulTop.j2smenu().destroy();
// if (menu.uiClassID) {
	    var v = menu.$ulTop.find("[role=menuitem]");
	    for (var i = v.length; --i >= 0;) {
	        v[i].applet = menu.ui.applet;
	        J2S.unsetMouse(v[i]);
	    }
// } else {
// Swing.bindMenuActionCommands(menu, false);
// }
	delete menu._applet._menus[menu._j2sname];
}


})(J2S.__$);

})(J2S.Swing);

