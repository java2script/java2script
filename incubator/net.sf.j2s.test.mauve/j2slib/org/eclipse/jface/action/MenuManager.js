Clazz.declarePackage ("org.eclipse.jface.action");
Clazz.load (["org.eclipse.jface.action.ContributionManager", "$.IMenuManager", "org.eclipse.jface.util.ListenerList"], "org.eclipse.jface.action.MenuManager", ["java.lang.Character", "java.util.ArrayList", "org.eclipse.jface.action.ExternalActionManager", "$.IContributionManagerOverrides", "$wt.events.MenuAdapter", "$wt.widgets.Menu", "$.MenuItem"], function () {
c$ = Clazz.decorateAsClass (function () {
this.id = null;
this.listeners = null;
this.menu = null;
this.menuItem = null;
this.menuText = null;
this.$overrides = null;
this.parent = null;
this.removeAllWhenShown = false;
this.visible = true;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.action, "MenuManager", org.eclipse.jface.action.ContributionManager, org.eclipse.jface.action.IMenuManager);
Clazz.prepareFields (c$, function () {
this.listeners =  new org.eclipse.jface.util.ListenerList (1);
});
Clazz.makeConstructor (c$, 
function () {
this.construct (null, null);
});
Clazz.makeConstructor (c$, 
function (text) {
this.construct (text, null);
}, "~S");
Clazz.makeConstructor (c$, 
function (text, id) {
Clazz.superConstructor (this, org.eclipse.jface.action.MenuManager, []);
this.menuText = text;
this.id = id;
}, "~S,~S");
Clazz.overrideMethod (c$, "addMenuListener", 
function (listener) {
this.listeners.add (listener);
}, "org.eclipse.jface.action.IMenuListener");
Clazz.defineMethod (c$, "createContextMenu", 
function (parent) {
if (!this.menuExist ()) {
this.menu =  new $wt.widgets.Menu (parent);
this.initializeMenu ();
}return this.menu;
}, "$wt.widgets.Control");
Clazz.defineMethod (c$, "createMenuBar", 
function (parent) {
if (!this.menuExist ()) {
this.menu =  new $wt.widgets.Menu (parent, 2);
this.update (false);
}return this.menu;
}, "$wt.widgets.Decorations");
Clazz.defineMethod (c$, "dispose", 
function () {
if (this.menuExist ()) this.menu.dispose ();
this.menu = null;
if (this.menuItem != null) {
this.menuItem.dispose ();
this.menuItem = null;
}var items = this.getItems ();
for (var i = 0; i < items.length; i++) {
items[i].dispose ();
}
});
Clazz.defineMethod (c$, "fill", 
function (parent) {
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "fill", 
function (parent, index) {
}, "$wt.widgets.CoolBar,~N");
Clazz.defineMethod (c$, "fill", 
function (parent, index) {
if (this.menuItem == null || this.menuItem.isDisposed ()) {
if (index >= 0) this.menuItem =  new $wt.widgets.MenuItem (parent, 64, index);
 else this.menuItem =  new $wt.widgets.MenuItem (parent, 64);
this.menuItem.setText (this.getMenuText ());
if (!this.menuExist ()) this.menu =  new $wt.widgets.Menu (parent);
this.menuItem.setMenu (this.menu);
this.initializeMenu ();
this.update (true);
}}, "$wt.widgets.Menu,~N");
Clazz.defineMethod (c$, "fill", 
function (parent, index) {
}, "$wt.widgets.ToolBar,~N");
Clazz.overrideMethod (c$, "findMenuUsingPath", 
function (path) {
var item = this.findUsingPath (path);
if (Clazz.instanceOf (item, org.eclipse.jface.action.IMenuManager)) return item;
return null;
}, "~S");
Clazz.defineMethod (c$, "findUsingPath", 
function (path) {
var id = path;
var rest = null;
var separator = path.indexOf ('/');
if (separator != -1) {
id = path.substring (0, separator);
rest = path.substring (separator + 1);
} else {
return Clazz.superCall (this, org.eclipse.jface.action.MenuManager, "find", [path]);
}var item = Clazz.superCall (this, org.eclipse.jface.action.MenuManager, "find", [id]);
if (Clazz.instanceOf (item, org.eclipse.jface.action.IMenuManager)) {
var manager = item;
return manager.findUsingPath (rest);
}return null;
}, "~S");
Clazz.defineMethod (c$, "fireAboutToShow", 
($fz = function (manager) {
var listeners = this.listeners.getListeners ();
for (var i = 0; i < listeners.length; ++i) {
(listeners[i]).menuAboutToShow (manager);
}
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.action.IMenuManager");
Clazz.overrideMethod (c$, "getId", 
function () {
return this.id;
});
Clazz.defineMethod (c$, "getMenu", 
function () {
return this.menu;
});
Clazz.defineMethod (c$, "getMenuText", 
function () {
return this.menuText;
});
Clazz.defineMethod (c$, "getOverrides", 
function () {
if (this.$overrides == null) {
if (this.parent == null) {
this.$overrides = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.action.MenuManager$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.action, "MenuManager$1", null, org.eclipse.jface.action.IContributionManagerOverrides);
Clazz.overrideMethod (c$, "getAccelerator", 
function (item) {
return null;
}, "org.eclipse.jface.action.IContributionItem");
Clazz.overrideMethod (c$, "getAcceleratorText", 
function (item) {
return null;
}, "org.eclipse.jface.action.IContributionItem");
Clazz.overrideMethod (c$, "getEnabled", 
function (item) {
return null;
}, "org.eclipse.jface.action.IContributionItem");
Clazz.defineMethod (c$, "getText", 
function (item) {
return null;
}, "org.eclipse.jface.action.IContributionItem");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.action.MenuManager$1, i$, v$);
}) (this, null);
} else {
this.$overrides = this.parent.getOverrides ();
}Clazz.superCall (this, org.eclipse.jface.action.MenuManager, "setOverrides", [this.$overrides]);
}return this.$overrides;
});
Clazz.defineMethod (c$, "getParent", 
function () {
return this.parent;
});
Clazz.overrideMethod (c$, "getRemoveAllWhenShown", 
function () {
return this.removeAllWhenShown;
});
Clazz.defineMethod (c$, "handleAboutToShow", 
($fz = function () {
if (this.removeAllWhenShown) this.removeAll ();
this.fireAboutToShow (this);
this.update (false, true);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "initializeMenu", 
($fz = function () {
this.menu.addMenuListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.action.MenuManager$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.action, "MenuManager$2", $wt.events.MenuAdapter);
Clazz.overrideMethod (c$, "menuHidden", 
function (e) {
}, "$wt.events.MenuEvent");
Clazz.overrideMethod (c$, "menuShown", 
function (e) {
this.b$["org.eclipse.jface.action.MenuManager"].handleAboutToShow ();
}, "$wt.events.MenuEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.action.MenuManager$2, i$, v$);
}) (this, null));
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "isDynamic", 
function () {
return false;
});
Clazz.overrideMethod (c$, "isEnabled", 
function () {
return true;
});
Clazz.overrideMethod (c$, "isGroupMarker", 
function () {
return false;
});
Clazz.defineMethod (c$, "isSeparator", 
function () {
return false;
});
Clazz.defineMethod (c$, "isSubstituteFor", 
function (item) {
return this.equals (item);
}, "org.eclipse.jface.action.IContributionItem");
Clazz.defineMethod (c$, "isVisible", 
function () {
if (!this.visible) return false;
var childItems = this.getItems ();
var visibleChildren = false;
for (var j = 0; j < childItems.length; j++) {
if (childItems[j].isVisible () && !childItems[j].isSeparator ()) {
visibleChildren = true;
break;
}}
return visibleChildren;
});
Clazz.defineMethod (c$, "markDirty", 
function () {
Clazz.superCall (this, org.eclipse.jface.action.MenuManager, "markDirty", []);
var parent = this.getParent ();
if (parent != null) {
parent.markDirty ();
}});
Clazz.defineMethod (c$, "menuExist", 
($fz = function () {
return this.menu != null && !this.menu.isDisposed ();
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "removeMenuListener", 
function (listener) {
this.listeners.remove (listener);
}, "org.eclipse.jface.action.IMenuListener");
Clazz.overrideMethod (c$, "saveWidgetState", 
function () {
});
Clazz.defineMethod (c$, "setOverrides", 
function (newOverrides) {
this.$overrides = newOverrides;
Clazz.superCall (this, org.eclipse.jface.action.MenuManager, "setOverrides", [this.$overrides]);
}, "org.eclipse.jface.action.IContributionManagerOverrides");
Clazz.overrideMethod (c$, "setParent", 
function (manager) {
this.parent = manager;
}, "org.eclipse.jface.action.IContributionManager");
Clazz.overrideMethod (c$, "setRemoveAllWhenShown", 
function (removeAll) {
this.removeAllWhenShown = removeAll;
}, "~B");
Clazz.overrideMethod (c$, "setVisible", 
function (visible) {
this.visible = visible;
}, "~B");
Clazz.defineMethod (c$, "update", 
function () {
this.updateMenuItem ();
});
Clazz.defineMethod (c$, "update", 
function (force) {
this.update (force, false);
}, "~B");
Clazz.defineMethod (c$, "update", 
function (force, recursive) {
if (this.isDirty () || force) {
if (this.menuExist ()) {
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
var mi = this.menu.getItems ();
for (var i = 0; i < mi.length; i++) {
var data = mi[i].getData ();
if (data == null || !clean.contains (data)) {
mi[i].dispose ();
} else if (Clazz.instanceOf (data, org.eclipse.jface.action.IContributionItem) && (data).isDynamic () && (data).isDirty ()) {
mi[i].dispose ();
}}
mi = this.menu.getItems ();
var srcIx = 0;
var destIx = 0;
for (var e = clean.iterator (); e.hasNext (); ) {
var src = e.next ();
var dest;
if (srcIx < mi.length) dest = mi[srcIx].getData ();
 else dest = null;
if (dest != null && src.equals (dest)) {
srcIx++;
destIx++;
} else if (dest != null && dest.isSeparator () && src.isSeparator ()) {
mi[srcIx].setData (src);
srcIx++;
destIx++;
} else {
var start = this.menu.getItemCount ();
src.fill (this.menu, destIx);
var newItems = this.menu.getItemCount () - start;
for (var i = 0; i < newItems; i++) {
var item = this.menu.getItem (destIx++);
item.setData (src);
}
}if (recursive) {
var item = src;
if (Clazz.instanceOf (item, org.eclipse.jface.action.SubContributionItem)) item = (item).getInnerItem ();
if (Clazz.instanceOf (item, org.eclipse.jface.action.IMenuManager)) (item).updateAll (force);
}}
for (; srcIx < mi.length; srcIx++) mi[srcIx].dispose ();

this.setDirty (false);
}} else {
if (recursive) {
var items = this.getItems ();
for (var i = 0; i < items.length; ++i) {
var ci = items[i];
if (Clazz.instanceOf (ci, org.eclipse.jface.action.IMenuManager)) {
var mm = ci;
if (mm.isVisible ()) {
mm.updateAll (force);
}}}
}}this.updateMenuItem ();
}, "~B,~B");
Clazz.defineMethod (c$, "update", 
function (property) {
var items = this.getItems ();
for (var i = 0; i < items.length; i++) items[i].update (property);

if (this.menu != null && !this.menu.isDisposed () && this.menu.getParentItem () != null && "text".equals (property)) {
var text = this.getOverrides ().getText (this);
if (text == null) text = this.getMenuText ();
if (text != null) {
var callback = org.eclipse.jface.action.ExternalActionManager.getInstance ().getCallback ();
if (callback != null) {
var index = text.indexOf ('&');
if (index >= 0 && index < text.length - 1) {
var character = Character.toUpperCase (text.charAt (index + 1));
if (callback.isAcceleratorInUse (65536 | (character).charCodeAt (0))) {
if (index == 0) text = text.substring (1);
 else text = text.substring (0, index) + text.substring (index + 1);
}}}this.menu.getParentItem ().setText (text);
}}}, "~S");
Clazz.defineMethod (c$, "updateAll", 
function (force) {
this.update (force, true);
}, "~B");
Clazz.defineMethod (c$, "updateMenuItem", 
($fz = function () {
if (this.menuItem != null && !this.menuItem.isDisposed () && this.menuExist ()) {
var enabled = this.menu.getItemCount () > 0;
if (this.menuItem.getEnabled () != enabled) {
var topMenu = this.menu;
while (topMenu.getParentMenu () != null) topMenu = topMenu.getParentMenu ();

if ((topMenu.getStyle () & 2) == 0) this.menuItem.setEnabled (enabled);
}}}, $fz.isPrivate = true, $fz));
});
