Clazz.declarePackage ("org.eclipse.jface.action");
Clazz.load (["org.eclipse.jface.action.IContributionItem"], "org.eclipse.jface.action.ContributionItem", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.id = null;
this.visible = true;
this.parent = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.action, "ContributionItem", null, org.eclipse.jface.action.IContributionItem);
Clazz.makeConstructor (c$, 
function () {
this.construct (null);
});
Clazz.makeConstructor (c$, 
function (id) {
this.id = id;
}, "~S");
Clazz.overrideMethod (c$, "dispose", 
function () {
});
Clazz.defineMethod (c$, "fill", 
function (parent) {
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "fill", 
function (menu, index) {
}, "$wt.widgets.Menu,~N");
Clazz.defineMethod (c$, "fill", 
function (parent, index) {
}, "$wt.widgets.ToolBar,~N");
Clazz.defineMethod (c$, "fill", 
function (parent, index) {
}, "$wt.widgets.CoolBar,~N");
Clazz.overrideMethod (c$, "saveWidgetState", 
function () {
});
Clazz.overrideMethod (c$, "getId", 
function () {
return this.id;
});
Clazz.defineMethod (c$, "getParent", 
function () {
return this.parent;
});
Clazz.overrideMethod (c$, "isDirty", 
function () {
return this.isDynamic ();
});
Clazz.overrideMethod (c$, "isEnabled", 
function () {
return true;
});
Clazz.overrideMethod (c$, "isDynamic", 
function () {
return false;
});
Clazz.overrideMethod (c$, "isGroupMarker", 
function () {
return false;
});
Clazz.overrideMethod (c$, "isSeparator", 
function () {
return false;
});
Clazz.overrideMethod (c$, "isVisible", 
function () {
return this.visible;
});
Clazz.overrideMethod (c$, "setVisible", 
function (visible) {
this.visible = visible;
}, "~B");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "(id=" + this.getId () + ")";
});
Clazz.defineMethod (c$, "update", 
function () {
});
Clazz.overrideMethod (c$, "setParent", 
function (parent) {
this.parent = parent;
}, "org.eclipse.jface.action.IContributionManager");
Clazz.defineMethod (c$, "update", 
function (id) {
}, "~S");
});
