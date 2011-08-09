Clazz.declarePackage ("org.eclipse.jface.action");
Clazz.load (["org.eclipse.jface.action.IContributionManager", "java.util.ArrayList"], "org.eclipse.jface.action.ContributionManager", ["java.lang.IllegalArgumentException", "$.IndexOutOfBoundsException", "org.eclipse.jface.action.ActionContributionItem", "$.IContributionManagerOverrides", "org.eclipse.jface.util.Policy"], function () {
c$ = Clazz.decorateAsClass (function () {
this.contributions = null;
this.$isDirty = true;
this.dynamicItems = 0;
this.overrides = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.action, "ContributionManager", null, org.eclipse.jface.action.IContributionManager);
Clazz.prepareFields (c$, function () {
this.contributions =  new java.util.ArrayList ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "add", 
function (action) {
this.add ( new org.eclipse.jface.action.ActionContributionItem (action));
}, "org.eclipse.jface.action.IAction");
Clazz.defineMethod (c$, "add", 
function (item) {
if (this.allowItem (item)) {
this.contributions.add (item);
this.itemAdded (item);
}}, "org.eclipse.jface.action.IContributionItem");
Clazz.defineMethod (c$, "addToGroup", 
($fz = function (groupName, item, append) {
var i;
var items = this.contributions.iterator ();
for (i = 0; items.hasNext (); i++) {
var o = items.next ();
if (o.isGroupMarker ()) {
var id = o.getId ();
if (id != null && id.equalsIgnoreCase (groupName)) {
i++;
if (append) {
for (; items.hasNext (); i++) {
var ci = items.next ();
if (ci.isGroupMarker ()) break;
}
}if (this.allowItem (item)) {
this.contributions.add (i, item);
this.itemAdded (item);
}return ;
}}}
throw  new IllegalArgumentException ("Group not found: " + groupName);
}, $fz.isPrivate = true, $fz), "~S,org.eclipse.jface.action.IContributionItem,~B");
Clazz.defineMethod (c$, "appendToGroup", 
function (groupName, action) {
this.addToGroup (groupName,  new org.eclipse.jface.action.ActionContributionItem (action), true);
}, "~S,org.eclipse.jface.action.IAction");
Clazz.defineMethod (c$, "appendToGroup", 
function (groupName, item) {
this.addToGroup (groupName, item, true);
}, "~S,org.eclipse.jface.action.IContributionItem");
Clazz.defineMethod (c$, "allowItem", 
function (itemToAdd) {
return true;
}, "org.eclipse.jface.action.IContributionItem");
Clazz.defineMethod (c$, "dumpStatistics", 
function () {
var size = 0;
if (this.contributions != null) size = this.contributions.size ();
System.out.println (this.toString ());
System.out.println ("   Number of elements: " + size);
var sum = 0;
for (var i = 0; i < size; i++) if ((this.contributions.get (i)).isVisible ()) sum++;

System.out.println ("   Number of visible elements: " + sum);
System.out.println ("   Is dirty: " + this.isDirty ());
});
Clazz.overrideMethod (c$, "find", 
function (id) {
var e = this.contributions.iterator ();
while (e.hasNext ()) {
var item = e.next ();
var itemId = item.getId ();
if (itemId != null && itemId.equalsIgnoreCase (id)) return item;
}
return null;
}, "~S");
Clazz.overrideMethod (c$, "getItems", 
function () {
var items =  new Array (this.contributions.size ());
this.contributions.toArray (items);
return items;
});
Clazz.overrideMethod (c$, "getOverrides", 
function () {
if (this.overrides == null) {
this.overrides = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.action.ContributionManager$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.action, "ContributionManager$1", null, org.eclipse.jface.action.IContributionManagerOverrides);
Clazz.overrideMethod (c$, "getEnabled", 
function (item) {
return null;
}, "org.eclipse.jface.action.IContributionItem");
Clazz.overrideMethod (c$, "getAccelerator", 
function (item) {
return null;
}, "org.eclipse.jface.action.IContributionItem");
Clazz.overrideMethod (c$, "getAcceleratorText", 
function (item) {
return null;
}, "org.eclipse.jface.action.IContributionItem");
Clazz.overrideMethod (c$, "getText", 
function (item) {
return null;
}, "org.eclipse.jface.action.IContributionItem");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.action.ContributionManager$1, i$, v$);
}) (this, null);
}return this.overrides;
});
Clazz.defineMethod (c$, "hasDynamicItems", 
function () {
return (this.dynamicItems > 0);
});
Clazz.defineMethod (c$, "indexOf", 
function (id) {
for (var i = 0; i < this.contributions.size (); i++) {
var item = this.contributions.get (i);
var itemId = item.getId ();
if (itemId != null && itemId.equalsIgnoreCase (id)) return i;
}
return -1;
}, "~S");
Clazz.defineMethod (c$, "indexOf", 
function (item) {
return this.contributions.indexOf (item);
}, "org.eclipse.jface.action.IContributionItem");
Clazz.defineMethod (c$, "insert", 
function (index, item) {
if (index > this.contributions.size ()) throw  new IndexOutOfBoundsException ("inserting " + item.getId () + " at " + index);
if (this.allowItem (item)) {
this.contributions.add (index, item);
this.itemAdded (item);
}}, "~N,org.eclipse.jface.action.IContributionItem");
Clazz.defineMethod (c$, "insertAfter", 
function (ID, action) {
this.insertAfter (ID,  new org.eclipse.jface.action.ActionContributionItem (action));
}, "~S,org.eclipse.jface.action.IAction");
Clazz.defineMethod (c$, "insertAfter", 
function (ID, item) {
var ci = this.find (ID);
if (ci == null) throw  new IllegalArgumentException ("can't find ID");
var ix = this.contributions.indexOf (ci);
if (ix >= 0) {
if (this.allowItem (item)) {
this.contributions.add (ix + 1, item);
this.itemAdded (item);
}}}, "~S,org.eclipse.jface.action.IContributionItem");
Clazz.defineMethod (c$, "insertBefore", 
function (ID, action) {
this.insertBefore (ID,  new org.eclipse.jface.action.ActionContributionItem (action));
}, "~S,org.eclipse.jface.action.IAction");
Clazz.defineMethod (c$, "insertBefore", 
function (ID, item) {
var ci = this.find (ID);
if (ci == null) throw  new IllegalArgumentException ("can't find ID " + ID);
var ix = this.contributions.indexOf (ci);
if (ix >= 0) {
if (this.allowItem (item)) {
this.contributions.add (ix, item);
this.itemAdded (item);
}}}, "~S,org.eclipse.jface.action.IContributionItem");
Clazz.overrideMethod (c$, "isDirty", 
function () {
if (this.$isDirty) return true;
if (this.hasDynamicItems ()) {
for (var iter = this.contributions.iterator (); iter.hasNext (); ) {
var item = iter.next ();
if (item.isDirty ()) return true;
}
}return false;
});
Clazz.overrideMethod (c$, "isEmpty", 
function () {
return this.contributions.isEmpty ();
});
Clazz.defineMethod (c$, "itemAdded", 
function (item) {
item.setParent (this);
this.markDirty ();
if (item.isDynamic ()) this.dynamicItems++;
}, "org.eclipse.jface.action.IContributionItem");
Clazz.defineMethod (c$, "itemRemoved", 
function (item) {
item.setParent (null);
this.markDirty ();
if (item.isDynamic ()) this.dynamicItems--;
}, "org.eclipse.jface.action.IContributionItem");
Clazz.overrideMethod (c$, "markDirty", 
function () {
this.setDirty (true);
});
Clazz.defineMethod (c$, "prependToGroup", 
function (groupName, action) {
this.addToGroup (groupName,  new org.eclipse.jface.action.ActionContributionItem (action), false);
}, "~S,org.eclipse.jface.action.IAction");
Clazz.defineMethod (c$, "prependToGroup", 
function (groupName, item) {
this.addToGroup (groupName, item, false);
}, "~S,org.eclipse.jface.action.IContributionItem");
Clazz.defineMethod (c$, "remove", 
function (ID) {
var ci = this.find (ID);
if (ci == null) return null;
return this.remove (ci);
}, "~S");
Clazz.defineMethod (c$, "remove", 
function (item) {
if (this.contributions.remove (item)) {
this.itemRemoved (item);
return item;
}return null;
}, "org.eclipse.jface.action.IContributionItem");
Clazz.overrideMethod (c$, "removeAll", 
function () {
var items = this.getItems ();
this.contributions.clear ();
for (var i = 0; i < items.length; i++) {
var item = items[i];
this.itemRemoved (item);
}
this.dynamicItems = 0;
this.markDirty ();
});
Clazz.defineMethod (c$, "replaceItem", 
function (identifier, replacementItem) {
if (identifier == null) {
return false;
}var index = this.indexOf (identifier);
if (index < 0) {
return false;
}var oldItem = this.contributions.get (index);
this.itemRemoved (oldItem);
this.contributions.set (index, replacementItem);
this.itemAdded (replacementItem);
for (var i = this.contributions.size () - 1; i > index; i--) {
var item = this.contributions.get (i);
if ((item != null) && (identifier.equals (item.getId ()))) {
if (org.eclipse.jface.util.Policy.TRACE_TOOLBAR) {
System.out.println ("Removing duplicate on replace: " + identifier);
}this.contributions.remove (i);
this.itemRemoved (item);
}}
return true;
}, "~S,org.eclipse.jface.action.IContributionItem");
Clazz.defineMethod (c$, "setDirty", 
function (dirty) {
this.$isDirty = dirty;
}, "~B");
Clazz.defineMethod (c$, "setOverrides", 
function (newOverrides) {
this.overrides = newOverrides;
}, "org.eclipse.jface.action.IContributionManagerOverrides");
Clazz.defineMethod (c$, "internalSetItems", 
function (items) {
this.contributions.clear ();
for (var i = 0; i < items.length; i++) {
if (this.allowItem (items[i])) {
this.contributions.add (items[i]);
}}
}, "~A");
});
