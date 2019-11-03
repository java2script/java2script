Clazz.declarePackage ("org.eclipse.jface.action");
Clazz.load (["org.eclipse.jface.action.IMenuManager", "$.SubContributionManager", "org.eclipse.jface.util.ListenerList"], "org.eclipse.jface.action.SubMenuManager", ["java.util.HashMap", "org.eclipse.jface.action.IMenuListener", "org.eclipse.jface.util.Assert"], function () {
c$ = Clazz.decorateAsClass (function () {
this.mapMenuToWrapper = null;
this.menuListeners = null;
this.menuListener = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.action, "SubMenuManager", org.eclipse.jface.action.SubContributionManager, org.eclipse.jface.action.IMenuManager);
Clazz.prepareFields (c$, function () {
this.menuListeners =  new org.eclipse.jface.util.ListenerList (1);
});
Clazz.defineMethod (c$, "addMenuListener", 
function (listener) {
this.menuListeners.add (listener);
if (this.menuListener == null) {
this.menuListener = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.action.SubMenuManager$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.action, "SubMenuManager$1", null, org.eclipse.jface.action.IMenuListener);
Clazz.defineMethod (c$, "menuAboutToShow", 
function (manager) {
var listeners = this.b$["org.eclipse.jface.action.SubMenuManager"].menuListeners.getListeners ();
for (var i = 0; i < listeners.length; ++i) {
(listeners[i]).menuAboutToShow (this.b$["org.eclipse.jface.action.SubMenuManager"]);
}
}, "org.eclipse.jface.action.IMenuManager");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.action.SubMenuManager$1, i$, v$);
}) (this, null);
}this.getParentMenuManager ().addMenuListener (this.menuListener);
}, "org.eclipse.jface.action.IMenuListener");
Clazz.overrideMethod (c$, "dispose", 
function () {
});
Clazz.defineMethod (c$, "disposeManager", 
function () {
if (this.menuListener != null) {
this.getParentMenuManager ().removeMenuListener (this.menuListener);
this.menuListener = null;
this.menuListeners.clear ();
}if (this.mapMenuToWrapper != null) {
var iter = this.mapMenuToWrapper.values ().iterator ();
while (iter.hasNext ()) {
var wrapper = iter.next ();
wrapper.disposeManager ();
}
this.mapMenuToWrapper.clear ();
this.mapMenuToWrapper = null;
}Clazz.superCall (this, org.eclipse.jface.action.SubMenuManager, "disposeManager", []);
});
Clazz.defineMethod (c$, "fill", 
function (parent) {
if (this.isVisible ()) this.getParentMenuManager ().fill (parent);
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "fill", 
function (parent, index) {
}, "$wt.widgets.CoolBar,~N");
Clazz.defineMethod (c$, "fill", 
function (parent, index) {
if (this.isVisible ()) this.getParentMenuManager ().fill (parent, index);
}, "$wt.widgets.Menu,~N");
Clazz.defineMethod (c$, "fill", 
function (parent, index) {
if (this.isVisible ()) this.getParentMenuManager ().fill (parent, index);
}, "$wt.widgets.ToolBar,~N");
Clazz.defineMethod (c$, "find", 
function (id) {
var item = this.getParentMenuManager ().find (id);
if (Clazz.instanceOf (item, org.eclipse.jface.action.SubContributionItem)) item = this.unwrap (item);
if (Clazz.instanceOf (item, org.eclipse.jface.action.IMenuManager)) {
var menu = item;
item = this.getWrapper (menu);
}return item;
}, "~S");
Clazz.overrideMethod (c$, "findMenuUsingPath", 
function (path) {
var item = this.findUsingPath (path);
if (Clazz.instanceOf (item, org.eclipse.jface.action.IMenuManager)) {
return item;
}return null;
}, "~S");
Clazz.defineMethod (c$, "findUsingPath", 
function (path) {
var id = path;
var rest = null;
var separator = path.indexOf ('/');
if (separator != -1) {
id = path.substring (0, separator);
rest = path.substring (separator + 1);
}var item = this.find (id);
if (rest != null && Clazz.instanceOf (item, org.eclipse.jface.action.IMenuManager)) {
var menu = item;
item = menu.findUsingPath (rest);
}return item;
}, "~S");
Clazz.defineMethod (c$, "getId", 
function () {
return this.getParentMenuManager ().getId ();
});
Clazz.defineMethod (c$, "getParentMenuManager", 
function () {
return this.getParent ();
});
Clazz.overrideMethod (c$, "getRemoveAllWhenShown", 
function () {
return false;
});
Clazz.defineMethod (c$, "getWrapper", 
function (mgr) {
if (this.mapMenuToWrapper == null) {
this.mapMenuToWrapper =  new java.util.HashMap (4);
}var wrapper = this.mapMenuToWrapper.get (mgr);
if (wrapper == null) {
wrapper = this.wrapMenu (mgr);
this.mapMenuToWrapper.put (mgr, wrapper);
}return wrapper;
}, "org.eclipse.jface.action.IMenuManager");
Clazz.defineMethod (c$, "isDynamic", 
function () {
return this.getParentMenuManager ().isDynamic ();
});
Clazz.defineMethod (c$, "isEnabled", 
function () {
return this.isVisible () && this.getParentMenuManager ().isEnabled ();
});
Clazz.defineMethod (c$, "isGroupMarker", 
function () {
return this.getParentMenuManager ().isGroupMarker ();
});
Clazz.defineMethod (c$, "isSeparator", 
function () {
return this.getParentMenuManager ().isSeparator ();
});
Clazz.defineMethod (c$, "isVisible", 
function () {
return Clazz.superCall (this, org.eclipse.jface.action.SubMenuManager, "isVisible", []) && this.getParentMenuManager ().isVisible ();
});
Clazz.overrideMethod (c$, "removeAll", 
function () {
Clazz.superCall (this, org.eclipse.jface.action.SubMenuManager, "removeAll", []);
if (this.mapMenuToWrapper != null) {
var iter = this.mapMenuToWrapper.values ().iterator ();
while (iter.hasNext ()) {
var wrapper = iter.next ();
wrapper.removeAll ();
}
this.mapMenuToWrapper.clear ();
this.mapMenuToWrapper = null;
}});
Clazz.defineMethod (c$, "removeMenuListener", 
function (listener) {
this.menuListeners.remove (listener);
}, "org.eclipse.jface.action.IMenuListener");
Clazz.overrideMethod (c$, "saveWidgetState", 
function () {
});
Clazz.overrideMethod (c$, "setParent", 
function (parent) {
}, "org.eclipse.jface.action.IContributionManager");
Clazz.overrideMethod (c$, "setRemoveAllWhenShown", 
function (removeAll) {
org.eclipse.jface.util.Assert.isTrue (false, "Should not be called on submenu manager");
}, "~B");
Clazz.overrideMethod (c$, "setVisible", 
function (visible) {
Clazz.superCall (this, org.eclipse.jface.action.SubMenuManager, "setVisible", [visible]);
if (this.mapMenuToWrapper != null) {
var iter = this.mapMenuToWrapper.values ().iterator ();
while (iter.hasNext ()) {
var wrapper = iter.next ();
wrapper.setVisible (visible);
}
}}, "~B");
Clazz.defineMethod (c$, "update", 
function () {
this.getParentMenuManager ().update ();
});
Clazz.defineMethod (c$, "update", 
function (force) {
this.getParentMenuManager ().update (force);
}, "~B");
Clazz.defineMethod (c$, "update", 
function (id) {
this.getParentMenuManager ().update (id);
}, "~S");
Clazz.defineMethod (c$, "updateAll", 
function (force) {
this.getParentMenuManager ().updateAll (force);
}, "~B");
Clazz.defineMethod (c$, "wrapMenu", 
function (menu) {
var mgr =  new org.eclipse.jface.action.SubMenuManager (menu);
mgr.setVisible (this.isVisible ());
return mgr;
}, "org.eclipse.jface.action.IMenuManager");
});
