Clazz.declarePackage ("org.eclipse.jface.action");
Clazz.load (["org.eclipse.jface.action.ContributionManager", "$.IToolBarManager"], "org.eclipse.jface.action.ToolBarManager", ["java.util.ArrayList", "$wt.accessibility.AccessibleAdapter", "$wt.widgets.ToolBar"], function () {
c$ = Clazz.decorateAsClass (function () {
this.itemStyle = 0;
this.toolBar = null;
this.contextMenuManager = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.action, "ToolBarManager", org.eclipse.jface.action.ContributionManager, org.eclipse.jface.action.IToolBarManager);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.jface.action.ToolBarManager, []);
});
Clazz.makeConstructor (c$, 
function (style) {
Clazz.superConstructor (this, org.eclipse.jface.action.ToolBarManager, []);
this.itemStyle = style;
}, "~N");
Clazz.makeConstructor (c$, 
function (toolbar) {
this.construct ();
this.toolBar = toolbar;
}, "$wt.widgets.ToolBar");
Clazz.defineMethod (c$, "createControl", 
function (parent) {
if (!this.toolBarExist () && parent != null) {
this.toolBar =  new $wt.widgets.ToolBar (parent, this.itemStyle);
this.toolBar.setMenu (this.getContextMenuControl ());
this.update (false);
if (this.toolBar.getAccessible () != null) this.toolBar.getAccessible ().addAccessibleListener (this.getAccessibleListener ());
}return this.toolBar;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "getAccessibleListener", 
($fz = function () {
return (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.action.ToolBarManager$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.action, "ToolBarManager$1", $wt.accessibility.AccessibleAdapter);
Clazz.overrideMethod (c$, "getName", 
function (e) {
if (e.childID != -1) {
var item = this.b$["org.eclipse.jface.action.ToolBarManager"].toolBar.getItem (e.childID);
if (item != null) {
var toolTip = item.getToolTipText ();
if (toolTip != null) {
e.result = toolTip;
}}}}, "$wt.accessibility.AccessibleEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.action.ToolBarManager$1, i$, v$);
}) (this, null);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "dispose", 
function () {
if (this.toolBarExist ()) {
this.toolBar.dispose ();
}this.toolBar = null;
var items = this.getItems ();
for (var i = 0; i < items.length; i++) {
items[i].dispose ();
}
if (this.getContextMenuManager () != null) {
this.getContextMenuManager ().dispose ();
this.setContextMenuManager (null);
}});
Clazz.defineMethod (c$, "getControl", 
function () {
return this.toolBar;
});
Clazz.defineMethod (c$, "relayout", 
function (layoutBar, oldCount, newCount) {
if ((oldCount == 0) != (newCount == 0)) layoutBar.getParent ().layout ();
}, "$wt.widgets.ToolBar,~N,~N");
Clazz.defineMethod (c$, "toolBarExist", 
($fz = function () {
return this.toolBar != null && !this.toolBar.isDisposed ();
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "update", 
function (force) {
if (this.isDirty () || force) {
if (this.toolBarExist ()) {
var oldCount = this.toolBar.getItemCount ();
var items = this.getItems ();
var clean =  new java.util.ArrayList (items.length);
var separator = null;
for (var i = 0; i < items.length; ++i) {
var ci = items[i];
if (!ci.isVisible ()) continue ;if (ci.isSeparator ()) {
separator = ci;
} else {
if (separator != null) {
if (clean.size () > 0) clean.add (separator);
separator = null;
}clean.add (ci);
}}
var mi = this.toolBar.getItems ();
var toRemove =  new java.util.ArrayList (mi.length);
for (var i = 0; i < mi.length; i++) {
var data = mi[i].getData ();
if (data == null || !clean.contains (data) || (Clazz.instanceOf (data, org.eclipse.jface.action.IContributionItem) && (data).isDynamic ())) {
toRemove.add (mi[i]);
}}
var useRedraw = (clean.size () - (mi.length - toRemove.size ())) >= 3;
try {
if (useRedraw) {
this.toolBar.setRedraw (false);
}for (var i = toRemove.size (); --i >= 0; ) {
var item = toRemove.get (i);
if (!item.isDisposed ()) {
var ctrl = item.getControl ();
if (ctrl != null) {
item.setControl (null);
ctrl.dispose ();
}item.dispose ();
}}
var src;
var dest;
mi = this.toolBar.getItems ();
var srcIx = 0;
var destIx = 0;
for (var e = clean.iterator (); e.hasNext (); ) {
src = e.next ();
if (srcIx < mi.length) dest = mi[srcIx].getData ();
 else dest = null;
if (dest != null && src.equals (dest)) {
srcIx++;
destIx++;
continue ;}if (dest != null && dest.isSeparator () && src.isSeparator ()) {
mi[srcIx].setData (src);
srcIx++;
destIx++;
continue ;}var start = this.toolBar.getItemCount ();
src.fill (this.toolBar, destIx);
var newItems = this.toolBar.getItemCount () - start;
for (var i = 0; i < newItems; i++) {
var item = this.toolBar.getItem (destIx++);
item.setData (src);
}
}
for (var i = mi.length; --i >= srcIx; ) {
var item = mi[i];
if (!item.isDisposed ()) {
var ctrl = item.getControl ();
if (ctrl != null) {
item.setControl (null);
ctrl.dispose ();
}item.dispose ();
}}
this.setDirty (false);
} finally {
if (useRedraw) {
this.toolBar.setRedraw (true);
}}
var newCount = this.toolBar.getItemCount ();
this.relayout (this.toolBar, oldCount, newCount);
}}}, "~B");
Clazz.defineMethod (c$, "getContextMenuControl", 
($fz = function () {
if ((this.contextMenuManager != null) && (this.toolBar != null)) {
var menuWidget = this.contextMenuManager.getMenu ();
if ((menuWidget == null) || (menuWidget.isDisposed ())) {
menuWidget = this.contextMenuManager.createContextMenu (this.toolBar);
}return menuWidget;
}return null;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getContextMenuManager", 
function () {
return this.contextMenuManager;
});
Clazz.defineMethod (c$, "setContextMenuManager", 
function (contextMenuManager) {
this.contextMenuManager = contextMenuManager;
if (this.toolBar != null) {
this.toolBar.setMenu (this.getContextMenuControl ());
}}, "org.eclipse.jface.action.MenuManager");
});
