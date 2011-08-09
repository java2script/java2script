Clazz.declarePackage ("org.eclipse.jface.action");
Clazz.load (["org.eclipse.jface.action.ContributionManager", "$.ICoolBarManager", "java.util.ArrayList"], "org.eclipse.jface.action.CoolBarManager", ["java.lang.Exception", "java.util.HashMap", "org.eclipse.jface.action.Separator", "$.ToolBarContributionItem", "org.eclipse.jface.util.Assert", "$.Policy", "$wt.widgets.CoolBar"], function () {
c$ = Clazz.decorateAsClass (function () {
this.cbItemsCreationOrder = null;
this.contextMenuManager = null;
this.coolBar = null;
this.itemStyle = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.action, "CoolBarManager", org.eclipse.jface.action.ContributionManager, org.eclipse.jface.action.ICoolBarManager);
Clazz.prepareFields (c$, function () {
this.cbItemsCreationOrder =  new java.util.ArrayList ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.jface.action.CoolBarManager, []);
});
Clazz.makeConstructor (c$, 
function (coolBar) {
this.construct ();
org.eclipse.jface.util.Assert.isNotNull (coolBar);
this.coolBar = coolBar;
this.itemStyle = coolBar.getStyle ();
}, "$wt.widgets.CoolBar");
Clazz.makeConstructor (c$, 
function (style) {
Clazz.superConstructor (this, org.eclipse.jface.action.CoolBarManager, []);
this.itemStyle = style;
}, "~N");
Clazz.defineMethod (c$, "add", 
function (toolBarManager) {
org.eclipse.jface.util.Assert.isNotNull (toolBarManager);
Clazz.superCall (this, org.eclipse.jface.action.CoolBarManager, "add", [ new org.eclipse.jface.action.ToolBarContributionItem (toolBarManager)]);
}, "org.eclipse.jface.action.IToolBarManager");
Clazz.defineMethod (c$, "adjustContributionList", 
($fz = function (contributionList) {
var item;
if (contributionList.size () != 0) {
item = contributionList.get (0);
if (item.isSeparator ()) {
contributionList.remove (0);
}var iterator = contributionList.listIterator ();
while (iterator.hasNext ()) {
item = iterator.next ();
if (item.isSeparator ()) {
while (iterator.hasNext ()) {
item = iterator.next ();
if (item.isSeparator ()) {
iterator.remove ();
} else {
break;
}}
}}
item = contributionList.get (contributionList.size () - 1);
if (item.isSeparator ()) {
contributionList.remove (contributionList.size () - 1);
}}return contributionList;
}, $fz.isPrivate = true, $fz), "java.util.ArrayList");
Clazz.overrideMethod (c$, "allowItem", 
function (itemToAdd) {
if (itemToAdd == null) {
return true;
}var firstId = itemToAdd.getId ();
if (firstId == null) {
return true;
}var currentItems = this.getItems ();
for (var i = 0; i < currentItems.length; i++) {
var currentItem = currentItems[i];
if (currentItem == null) {
continue ;}var secondId = currentItem.getId ();
if (firstId.equals (secondId)) {
if (org.eclipse.jface.util.Policy.TRACE_TOOLBAR) {
System.out.println ("Trying to add a duplicate item.");
 new Exception ().printStackTrace (System.out);
System.out.println ("DONE --------------------------");
}return false;
}}
return true;
}, "org.eclipse.jface.action.IContributionItem");
Clazz.defineMethod (c$, "collapseSeparators", 
($fz = function (iterator) {
while (iterator.hasNext ()) {
var item = iterator.next ();
if (!item.isSeparator ()) {
iterator.previous ();
return ;
}}
}, $fz.isPrivate = true, $fz), "java.util.ListIterator");
Clazz.defineMethod (c$, "coolBarExist", 
($fz = function () {
return this.coolBar != null && !this.coolBar.isDisposed ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "createControl", 
function (parent) {
org.eclipse.jface.util.Assert.isNotNull (parent);
if (!this.coolBarExist ()) {
this.coolBar =  new $wt.widgets.CoolBar (parent, this.itemStyle);
this.coolBar.setMenu (this.getContextMenuControl ());
this.coolBar.setLocked (false);
this.update (false);
}return this.coolBar;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "dispose", 
function () {
if (this.coolBarExist ()) {
var items = this.getItems ();
for (var i = 0; i < items.length; i++) {
items[i].dispose ();
}
this.coolBar.dispose ();
this.coolBar = null;
}if (this.contextMenuManager != null) {
this.contextMenuManager.dispose ();
this.contextMenuManager = null;
}});
Clazz.defineMethod (c$, "dispose", 
($fz = function (item) {
if ((item != null) && !item.isDisposed ()) {
item.setData (null);
var control = item.getControl ();
if ((control != null) && !control.isDisposed ()) {
item.setControl (null);
}item.dispose ();
}}, $fz.isPrivate = true, $fz), "$wt.widgets.CoolItem");
Clazz.defineMethod (c$, "findCoolItem", 
($fz = function (item) {
if (this.coolBar == null) return null;
var items = this.coolBar.getItems ();
for (var i = 0; i < items.length; i++) {
var coolItem = items[i];
var data = coolItem.getData ();
if (data != null && data.equals (item)) return coolItem;
}
return null;
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.action.IContributionItem");
Clazz.defineMethod (c$, "getAdjustedWrapIndices", 
($fz = function (wraps) {
var adjustedWrapIndices;
if (wraps.length == 0) {
adjustedWrapIndices = [0];
} else {
if (wraps[0] != 0) {
adjustedWrapIndices =  Clazz.newArray (wraps.length + 1, 0);
adjustedWrapIndices[0] = 0;
for (var i = 0; i < wraps.length; i++) {
adjustedWrapIndices[i + 1] = wraps[i];
}
} else {
adjustedWrapIndices = wraps;
}}return adjustedWrapIndices;
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "getContextMenuControl", 
($fz = function () {
if ((this.contextMenuManager != null) && (this.coolBar != null)) {
var menuWidget = this.contextMenuManager.getMenu ();
if ((menuWidget == null) || (menuWidget.isDisposed ())) {
menuWidget = this.contextMenuManager.createContextMenu (this.coolBar);
}return menuWidget;
}return null;
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "getContextMenuManager", 
function () {
return this.contextMenuManager;
});
Clazz.defineMethod (c$, "getControl", 
function () {
return this.coolBar;
});
Clazz.defineMethod (c$, "getItemList", 
($fz = function () {
var cbItems = this.getItems ();
var list =  new java.util.ArrayList (cbItems.length);
for (var i = 0; i < cbItems.length; i++) {
list.add (cbItems[i]);
}
return list;
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "getLockLayout", 
function () {
if (!this.coolBarExist ()) {
return false;
}return this.coolBar.getLocked ();
});
Clazz.defineMethod (c$, "getNumRows", 
($fz = function (items) {
var numRows = 1;
var separatorFound = false;
for (var i = 0; i < items.length; i++) {
if (items[i].isSeparator ()) {
separatorFound = true;
}if ((separatorFound) && (items[i].isVisible ()) && (!items[i].isGroupMarker ()) && (!items[i].isSeparator ())) {
numRows++;
separatorFound = false;
}}
return numRows;
}, $fz.isPrivate = true, $fz), "~A");
Clazz.overrideMethod (c$, "getStyle", 
function () {
return this.itemStyle;
});
Clazz.defineMethod (c$, "itemAdded", 
function (item) {
org.eclipse.jface.util.Assert.isNotNull (item);
Clazz.superCall (this, org.eclipse.jface.action.CoolBarManager, "itemAdded", [item]);
var insertedAt = this.indexOf (item);
var replaced = false;
var size = this.cbItemsCreationOrder.size ();
for (var i = 0; i < size; i++) {
var created = this.cbItemsCreationOrder.get (i);
if (created.getId () != null && created.getId ().equals (item.getId ())) {
this.cbItemsCreationOrder.set (i, item);
replaced = true;
break;
}}
if (!replaced) {
this.cbItemsCreationOrder.add (Math.min (Math.max (insertedAt, 0), this.cbItemsCreationOrder.size ()), item);
}}, "org.eclipse.jface.action.IContributionItem");
Clazz.defineMethod (c$, "itemRemoved", 
function (item) {
org.eclipse.jface.util.Assert.isNotNull (item);
Clazz.superCall (this, org.eclipse.jface.action.CoolBarManager, "itemRemoved", [item]);
var coolItem = this.findCoolItem (item);
if (coolItem != null) {
coolItem.setData (null);
}}, "org.eclipse.jface.action.IContributionItem");
Clazz.defineMethod (c$, "nextRow", 
($fz = function (iterator, ignoreCurrentItem) {
var currentElement = null;
if (!ignoreCurrentItem && iterator.hasPrevious ()) {
currentElement = iterator.previous ();
iterator.next ();
}if ((currentElement != null) && (currentElement.isSeparator ())) {
this.collapseSeparators (iterator);
return ;
} else {
while (iterator.hasNext ()) {
var item = iterator.next ();
if (item.isSeparator ()) {
this.collapseSeparators (iterator);
return ;
}}
}}, $fz.isPrivate = true, $fz), "java.util.ListIterator,~B");
Clazz.defineMethod (c$, "refresh", 
function () {
if (!this.coolBarExist ()) {
return ;
}var contributionList = this.getItemList ();
if (contributionList.size () == 0) return ;
var coolItems = this.coolBar.getItems ();
var wrapIndicies = this.getAdjustedWrapIndices (this.coolBar.getWrapIndices ());
var row = 0;
var coolItemIndex = 0;
var displayedItems =  new java.util.ArrayList (this.coolBar.getItemCount ());
for (var i = 0; i < coolItems.length; i++) {
var coolItem = coolItems[i];
if (Clazz.instanceOf (coolItem.getData (), org.eclipse.jface.action.IContributionItem)) {
var cbItem = coolItem.getData ();
displayedItems.add (Math.min (i, displayedItems.size ()), cbItem);
}}
var offset = 0;
for (var i = 1; i < wrapIndicies.length; i++) {
var insertAt = wrapIndicies[i] + offset;
displayedItems.add (insertAt,  new org.eclipse.jface.action.Separator ("UserSeparator"));
offset++;
}
var existingVisibleRows =  new java.util.ArrayList (4);
var rowIterator = contributionList.listIterator ();
this.collapseSeparators (rowIterator);
var numRow = 0;
while (rowIterator.hasNext ()) {
while (rowIterator.hasNext ()) {
var cbItem = rowIterator.next ();
if (displayedItems.contains (cbItem)) {
existingVisibleRows.add ( new Integer (numRow));
break;
}if (cbItem.isSeparator ()) {
break;
}}
this.nextRow (rowIterator, false);
numRow++;
}
var existingRows = existingVisibleRows.iterator ();
if (existingRows.hasNext ()) {
row = (existingRows.next ()).intValue ();
}var itemLocation =  new java.util.HashMap ();
for (var locationIterator = displayedItems.listIterator (); locationIterator.hasNext (); ) {
var item = locationIterator.next ();
if (item.isSeparator ()) {
if (existingRows.hasNext ()) {
var value = existingRows.next ();
row = value.intValue ();
} else {
row++;
}} else {
itemLocation.put (item,  new Integer (row));
}}
for (var iterator = displayedItems.listIterator (); iterator.hasNext (); ) {
var cbItem = iterator.next ();
if (cbItem.isSeparator ()) {
coolItemIndex = 0;
} else {
this.relocate (cbItem, coolItemIndex, contributionList, itemLocation);
cbItem.saveWidgetState ();
coolItemIndex++;
}}
if (contributionList.size () != 0) {
contributionList = this.adjustContributionList (contributionList);
var array =  new Array (contributionList.size () - 1);
array = contributionList.toArray (array);
this.internalSetItems (array);
}});
Clazz.defineMethod (c$, "relocate", 
($fz = function (cbItem, index, contributionList, itemLocation) {
if (!(Clazz.instanceOf (itemLocation.get (cbItem), Integer))) return ;
var targetRow = (itemLocation.get (cbItem)).intValue ();
var cbInternalIndex = contributionList.indexOf (cbItem);
var insertAt = contributionList.size ();
var iterator = contributionList.listIterator ();
this.collapseSeparators (iterator);
var currentRow = -1;
while (iterator.hasNext ()) {
currentRow++;
if (currentRow == targetRow) {
var virtualIndex = 0;
insertAt = iterator.nextIndex ();
while (iterator.hasNext ()) {
var item = iterator.next ();
var itemRow = itemLocation.get (item);
if (item.isSeparator ()) break;
if ((itemRow != null) && (itemRow.intValue () == targetRow)) {
if (virtualIndex >= index) break;
virtualIndex++;
}insertAt++;
}
if (cbInternalIndex == insertAt) return ;
break;
}this.nextRow (iterator, true);
}
contributionList.remove (cbItem);
if (cbInternalIndex < insertAt) {
insertAt--;
}if (currentRow != targetRow) {
contributionList.add ( new org.eclipse.jface.action.Separator ("UserSeparator"));
insertAt = contributionList.size ();
}insertAt = Math.min (insertAt, contributionList.size ());
contributionList.add (insertAt, cbItem);
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.action.IContributionItem,~N,java.util.ArrayList,java.util.HashMap");
Clazz.defineMethod (c$, "resetItemOrder", 
function () {
for (var iterator = this.cbItemsCreationOrder.listIterator (); iterator.hasNext (); ) {
var item = iterator.next ();
if ((item.getId () != null) && (item.getId ().equals ("UserSeparator"))) {
iterator.remove ();
}}
var itemsToSet =  new Array (this.cbItemsCreationOrder.size ());
this.cbItemsCreationOrder.toArray (itemsToSet);
this.setItems (itemsToSet);
});
Clazz.overrideMethod (c$, "setContextMenuManager", 
function (contextMenuManager) {
this.contextMenuManager = contextMenuManager;
if (this.coolBar != null) {
this.coolBar.setMenu (this.getContextMenuControl ());
}}, "org.eclipse.jface.action.IMenuManager");
Clazz.defineMethod (c$, "setItems", 
function (newItems) {
if (this.coolBar != null) {
var coolItems = this.coolBar.getItems ();
for (var i = 0; i < coolItems.length; i++) {
this.dispose (coolItems[i]);
}
}this.internalSetItems (newItems);
this.update (true);
}, "~A");
Clazz.overrideMethod (c$, "setLockLayout", 
function (value) {
if (!this.coolBarExist ()) {
return ;
}this.coolBar.setLocked (value);
}, "~B");
Clazz.overrideMethod (c$, "update", 
function (force) {
if ((!this.isDirty () && !force) || (!this.coolBarExist ())) {
return ;
}var relock = false;
var changed = false;
try {
this.coolBar.setRedraw (false);
this.refresh ();
if (this.coolBar.getLocked ()) {
this.coolBar.setLocked (false);
relock = true;
}var items = this.getItems ();
var visibleItems =  new java.util.ArrayList (items.length);
for (var i = 0; i < items.length; i++) {
var item = items[i];
if (item.isVisible ()) {
visibleItems.add (item);
}}
var coolItems = this.coolBar.getItems ();
var coolItemsToRemove =  new java.util.ArrayList (coolItems.length);
for (var i = 0; i < coolItems.length; i++) {
var data = coolItems[i].getData ();
if ((data == null) || (!visibleItems.contains (data)) || ((Clazz.instanceOf (data, org.eclipse.jface.action.IContributionItem)) && (data).isDynamic ())) {
coolItemsToRemove.add (coolItems[i]);
}}
for (var i = coolItemsToRemove.size () - 1; i >= 0; i--) {
var coolItem = coolItemsToRemove.get (i);
if (!coolItem.isDisposed ()) {
var control = coolItem.getControl ();
if (control != null) {
coolItem.setControl (null);
control.dispose ();
}coolItem.dispose ();
}}
coolItems = this.coolBar.getItems ();
var sourceItem;
var destinationItem;
var sourceIndex = 0;
var destinationIndex = 0;
var visibleItemItr = visibleItems.iterator ();
while (visibleItemItr.hasNext ()) {
sourceItem = visibleItemItr.next ();
if (sourceIndex < coolItems.length) {
destinationItem = coolItems[sourceIndex].getData ();
} else {
destinationItem = null;
}if (destinationItem != null) {
if (sourceItem.equals (destinationItem)) {
sourceIndex++;
destinationIndex++;
sourceItem.update ();
continue ;} else if ((destinationItem.isSeparator ()) && (sourceItem.isSeparator ())) {
coolItems[sourceIndex].setData (sourceItem);
sourceIndex++;
destinationIndex++;
sourceItem.update ();
continue ;}}var start = this.coolBar.getItemCount ();
sourceItem.fill (this.coolBar, destinationIndex);
var newItems = this.coolBar.getItemCount () - start;
for (var i = 0; i < newItems; i++) {
this.coolBar.getItem (destinationIndex++).setData (sourceItem);
}
changed = true;
}
for (var i = coolItems.length - 1; i >= sourceIndex; i--) {
var item = coolItems[i];
if (!item.isDisposed ()) {
var control = item.getControl ();
if (control != null) {
item.setControl (null);
control.dispose ();
}item.dispose ();
changed = true;
}}
this.updateWrapIndices ();
for (var i = 0; i < items.length; i++) {
var item = items[i];
item.update ("size");
}
if (relock) {
this.coolBar.setLocked (true);
}if (changed) {
this.updateTabOrder ();
}this.setDirty (false);
} finally {
this.coolBar.setRedraw (true);
}
}, "~B");
Clazz.defineMethod (c$, "updateTabOrder", 
function () {
if (this.coolBar != null) {
var items = this.coolBar.getItems ();
if (items != null) {
var children =  new java.util.ArrayList (items.length);
for (var i = 0; i < items.length; i++) {
if ((items[i].getControl () != null) && (!items[i].getControl ().isDisposed ())) {
children.add (items[i].getControl ());
}}
var childrenArray =  new Array (0);
childrenArray = children.toArray (childrenArray);
if (childrenArray != null) {
this.coolBar.setTabList (childrenArray);
}}}});
Clazz.defineMethod (c$, "updateWrapIndices", 
($fz = function () {
var items = this.getItems ();
var numRows = this.getNumRows (items) - 1;
var wrapIndices =  Clazz.newArray (numRows, 0);
var foundSeparator = false;
var j = 0;
for (var i = 0; i < items.length; i++) {
var item = items[i];
var coolItem = this.findCoolItem (item);
if (item.isSeparator ()) {
foundSeparator = true;
}if ((!item.isSeparator ()) && (!item.isGroupMarker ()) && (item.isVisible ()) && (coolItem != null) && (foundSeparator)) {
wrapIndices[j] = this.coolBar.indexOf (coolItem);
j++;
foundSeparator = false;
}}
var oldIndices = this.coolBar.getWrapIndices ();
var shouldUpdate = false;
if (oldIndices.length == wrapIndices.length) {
for (var i = 0; i < oldIndices.length; i++) {
if (oldIndices[i] != wrapIndices[i]) {
shouldUpdate = true;
break;
}}
} else {
shouldUpdate = true;
}if (shouldUpdate) {
this.coolBar.setWrapIndices (wrapIndices);
}}, $fz.isPrivate = true, $fz));
Clazz.defineStatics (c$,
"USER_SEPARATOR", "UserSeparator");
});
