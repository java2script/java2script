Clazz.declarePackage ("org.eclipse.jface.action");
Clazz.load (["org.eclipse.jface.action.ICoolBarManager", "$.SubContributionManager"], "org.eclipse.jface.action.SubCoolBarManager", ["org.eclipse.jface.action.ToolBarContributionItem", "org.eclipse.jface.util.Assert"], function () {
c$ = Clazz.declareType (org.eclipse.jface.action, "SubCoolBarManager", org.eclipse.jface.action.SubContributionManager, org.eclipse.jface.action.ICoolBarManager);
Clazz.makeConstructor (c$, 
function (mgr) {
Clazz.superConstructor (this, org.eclipse.jface.action.SubCoolBarManager, [mgr]);
org.eclipse.jface.util.Assert.isNotNull (mgr);
}, "org.eclipse.jface.action.ICoolBarManager");
Clazz.defineMethod (c$, "add", 
function (toolBarManager) {
org.eclipse.jface.util.Assert.isNotNull (toolBarManager);
Clazz.superCall (this, org.eclipse.jface.action.SubCoolBarManager, "add", [ new org.eclipse.jface.action.ToolBarContributionItem (toolBarManager)]);
}, "org.eclipse.jface.action.IToolBarManager");
Clazz.overrideMethod (c$, "getStyle", 
function () {
return (this.getParent ()).getStyle ();
});
Clazz.defineMethod (c$, "getParentCoolBarManager", 
function () {
return this.getParent ();
});
Clazz.defineMethod (c$, "getLockLayout", 
function () {
return this.getParentCoolBarManager ().getLockLayout ();
});
Clazz.overrideMethod (c$, "setLockLayout", 
function (value) {
}, "~B");
Clazz.overrideMethod (c$, "getContextMenuManager", 
function () {
return null;
});
Clazz.overrideMethod (c$, "setContextMenuManager", 
function (menuManager) {
}, "org.eclipse.jface.action.IMenuManager");
Clazz.defineMethod (c$, "update", 
function (force) {
this.getParentCoolBarManager ().update (force);
}, "~B");
});
