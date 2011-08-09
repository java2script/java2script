Clazz.declarePackage ("org.eclipse.jface.action");
Clazz.load (["org.eclipse.jface.action.IContributionItem"], "org.eclipse.jface.action.SubContributionItem", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.visible = false;
this.innerItem = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.action, "SubContributionItem", null, org.eclipse.jface.action.IContributionItem);
Clazz.makeConstructor (c$, 
function (item) {
this.innerItem = item;
}, "org.eclipse.jface.action.IContributionItem");
Clazz.defineMethod (c$, "dispose", 
function () {
this.innerItem.dispose ();
});
Clazz.defineMethod (c$, "fill", 
function (parent) {
if (this.visible) this.innerItem.fill (parent);
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "fill", 
function (parent, index) {
if (this.visible) this.innerItem.fill (parent, index);
}, "$wt.widgets.Menu,~N");
Clazz.defineMethod (c$, "fill", 
function (parent, index) {
if (this.visible) this.innerItem.fill (parent, index);
}, "$wt.widgets.ToolBar,~N");
Clazz.defineMethod (c$, "getId", 
function () {
return this.innerItem.getId ();
});
Clazz.defineMethod (c$, "getInnerItem", 
function () {
return this.innerItem;
});
Clazz.defineMethod (c$, "isEnabled", 
function () {
return this.innerItem.isEnabled ();
});
Clazz.defineMethod (c$, "isDirty", 
function () {
return this.innerItem.isDirty ();
});
Clazz.defineMethod (c$, "isDynamic", 
function () {
return this.innerItem.isDynamic ();
});
Clazz.defineMethod (c$, "isGroupMarker", 
function () {
return this.innerItem.isGroupMarker ();
});
Clazz.defineMethod (c$, "isSeparator", 
function () {
return this.innerItem.isSeparator ();
});
Clazz.defineMethod (c$, "isVisible", 
function () {
return this.visible && this.innerItem.isVisible ();
});
Clazz.overrideMethod (c$, "setParent", 
function (parent) {
}, "org.eclipse.jface.action.IContributionManager");
Clazz.overrideMethod (c$, "setVisible", 
function (visible) {
this.visible = visible;
}, "~B");
Clazz.defineMethod (c$, "update", 
function () {
this.innerItem.update ();
});
Clazz.defineMethod (c$, "update", 
function (id) {
this.innerItem.update (id);
}, "~S");
Clazz.defineMethod (c$, "fill", 
function (parent, index) {
if (this.visible) this.innerItem.fill (parent, index);
}, "$wt.widgets.CoolBar,~N");
Clazz.overrideMethod (c$, "saveWidgetState", 
function () {
});
});
