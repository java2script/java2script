Clazz.declarePackage ("org.eclipse.jface.action");
Clazz.load (["org.eclipse.jface.action.IContributionManager", "java.util.HashMap"], "org.eclipse.jface.action.SubContributionManager", ["java.util.Enumeration", "org.eclipse.jface.action.ActionContributionItem", "$.SubContributionItem"], function () {
c$ = Clazz.decorateAsClass (function () {
this.parentMgr = null;
this.mapItemToWrapper = null;
this.visible = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.action, "SubContributionManager", null, org.eclipse.jface.action.IContributionManager);
Clazz.prepareFields (c$, function () {
this.mapItemToWrapper =  new java.util.HashMap ();
});
Clazz.makeConstructor (c$, 
function (mgr) {
this.parentMgr = mgr;
}, "org.eclipse.jface.action.IContributionManager");
Clazz.defineMethod (c$, "add", 
function (action) {
this.add ( new org.eclipse.jface.action.ActionContributionItem (action));
}, "org.eclipse.jface.action.IAction");
Clazz.defineMethod (c$, "add", 
function (item) {
item.setParent (this);
var wrap = this.wrap (item);
wrap.setVisible (this.visible);
this.parentMgr.add (wrap);
this.itemAdded (item, wrap);
}, "org.eclipse.jface.action.IContributionItem");
Clazz.defineMethod (c$, "appendToGroup", 
function (groupName, action) {
this.appendToGroup (groupName,  new org.eclipse.jface.action.ActionContributionItem (action));
}, "~S,org.eclipse.jface.action.IAction");
Clazz.defineMethod (c$, "appendToGroup", 
function (groupName, item) {
item.setParent (this);
var wrap = this.wrap (item);
wrap.setVisible (this.visible);
this.parentMgr.appendToGroup (groupName, wrap);
this.itemAdded (item, wrap);
}, "~S,org.eclipse.jface.action.IContributionItem");
Clazz.defineMethod (c$, "disposeManager", 
function () {
var it = this.mapItemToWrapper.values ().iterator ();
while (it.hasNext ()) {
var item = it.next ();
item.dispose ();
}
this.removeAll ();
});
Clazz.defineMethod (c$, "find", 
function (id) {
var item = this.parentMgr.find (id);
item = this.unwrap (item);
return item;
}, "~S");
Clazz.overrideMethod (c$, "getItems", 
function () {
var result =  new Array (this.mapItemToWrapper.size ());
this.mapItemToWrapper.keySet ().toArray (result);
return result;
});
Clazz.defineMethod (c$, "getParent", 
function () {
return this.parentMgr;
});
Clazz.defineMethod (c$, "getOverrides", 
function () {
return this.parentMgr.getOverrides ();
});
Clazz.defineMethod (c$, "insertAfter", 
function (id, action) {
this.insertAfter (id,  new org.eclipse.jface.action.ActionContributionItem (action));
}, "~S,org.eclipse.jface.action.IAction");
Clazz.defineMethod (c$, "insertAfter", 
function (id, item) {
item.setParent (this);
var wrap = this.wrap (item);
wrap.setVisible (this.visible);
this.parentMgr.insertAfter (id, wrap);
this.itemAdded (item, wrap);
}, "~S,org.eclipse.jface.action.IContributionItem");
Clazz.defineMethod (c$, "insertBefore", 
function (id, action) {
this.insertBefore (id,  new org.eclipse.jface.action.ActionContributionItem (action));
}, "~S,org.eclipse.jface.action.IAction");
Clazz.defineMethod (c$, "insertBefore", 
function (id, item) {
item.setParent (this);
var wrap = this.wrap (item);
wrap.setVisible (this.visible);
this.parentMgr.insertBefore (id, wrap);
this.itemAdded (item, wrap);
}, "~S,org.eclipse.jface.action.IContributionItem");
Clazz.defineMethod (c$, "isDirty", 
function () {
return this.parentMgr.isDirty ();
});
Clazz.defineMethod (c$, "isEmpty", 
function () {
return this.parentMgr.isEmpty ();
});
Clazz.defineMethod (c$, "isVisible", 
function () {
return this.visible;
});
Clazz.defineMethod (c$, "itemAdded", 
function (item, wrap) {
this.mapItemToWrapper.put (item, wrap);
}, "org.eclipse.jface.action.IContributionItem,org.eclipse.jface.action.SubContributionItem");
Clazz.defineMethod (c$, "itemRemoved", 
function (item) {
this.mapItemToWrapper.remove (item);
}, "org.eclipse.jface.action.IContributionItem");
Clazz.defineMethod (c$, "items", 
function () {
var i = this.mapItemToWrapper.values ().iterator ();
return (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.action.SubContributionManager$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.action, "SubContributionManager$1", null, java.util.Enumeration);
Clazz.overrideMethod (c$, "hasMoreElements", 
function () {
return this.f$.i.hasNext ();
});
Clazz.overrideMethod (c$, "nextElement", 
function () {
return this.f$.i.next ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.action.SubContributionManager$1, i$, v$);
}) (this, Clazz.cloneFinals ("i", i));
});
Clazz.defineMethod (c$, "markDirty", 
function () {
this.parentMgr.markDirty ();
});
Clazz.defineMethod (c$, "prependToGroup", 
function (groupName, action) {
this.prependToGroup (groupName,  new org.eclipse.jface.action.ActionContributionItem (action));
}, "~S,org.eclipse.jface.action.IAction");
Clazz.defineMethod (c$, "prependToGroup", 
function (groupName, item) {
item.setParent (this);
var wrap = this.wrap (item);
wrap.setVisible (this.visible);
this.parentMgr.prependToGroup (groupName, wrap);
this.itemAdded (item, wrap);
}, "~S,org.eclipse.jface.action.IContributionItem");
Clazz.defineMethod (c$, "remove", 
function (id) {
var result = this.parentMgr.remove (id);
if (result != null) this.itemRemoved (result);
return result;
}, "~S");
Clazz.defineMethod (c$, "remove", 
function (item) {
var wrap = this.mapItemToWrapper.get (item);
if (wrap == null) return null;
var result = this.parentMgr.remove (wrap);
if (result == null) return null;
this.itemRemoved (item);
return item;
}, "org.eclipse.jface.action.IContributionItem");
Clazz.overrideMethod (c$, "removeAll", 
function () {
var it = this.mapItemToWrapper.values ().iterator ();
while (it.hasNext ()) {
var item = it.next ();
this.parentMgr.remove (item);
}
this.mapItemToWrapper.clear ();
});
Clazz.defineMethod (c$, "setVisible", 
function (visible) {
this.visible = visible;
if (this.mapItemToWrapper.size () > 0) {
var it = this.mapItemToWrapper.values ().iterator ();
while (it.hasNext ()) {
var item = it.next ();
item.setVisible (visible);
}
this.parentMgr.markDirty ();
}}, "~B");
Clazz.defineMethod (c$, "wrap", 
function (item) {
return  new org.eclipse.jface.action.SubContributionItem (item);
}, "org.eclipse.jface.action.IContributionItem");
Clazz.defineMethod (c$, "unwrap", 
function (item) {
if (Clazz.instanceOf (item, org.eclipse.jface.action.SubContributionItem)) {
return (item).getInnerItem ();
}return item;
}, "org.eclipse.jface.action.IContributionItem");
});
