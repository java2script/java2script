Clazz.declarePackage ("org.eclipse.jface.action");
Clazz.load (["org.eclipse.jface.action.ContributionItem"], "org.eclipse.jface.action.ToolBarContributionItem", ["java.lang.Exception", "java.util.ArrayList", "org.eclipse.jface.action.ActionContributionItem", "$.MenuManager", "$.Separator", "$.ToolBarManager", "org.eclipse.jface.util.Assert", "$.Policy", "$wt.events.DisposeListener", "$.SelectionAdapter", "$wt.widgets.CoolItem", "$.Listener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.chevronMenuManager = null;
this.coolItem = null;
this.currentHeight = -1;
this.currentWidth = -1;
this.disposed = false;
this.minimumItemsToShow = -1;
this.toolBarManager = null;
this.useChevron = true;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.action, "ToolBarContributionItem", org.eclipse.jface.action.ContributionItem);
Clazz.makeConstructor (c$, 
function () {
this.construct ( new org.eclipse.jface.action.ToolBarManager (), null);
});
Clazz.makeConstructor (c$, 
function (toolBarManager) {
this.construct (toolBarManager, null);
}, "org.eclipse.jface.action.IToolBarManager");
Clazz.makeConstructor (c$, 
function (toolBarManager, id) {
Clazz.superConstructor (this, org.eclipse.jface.action.ToolBarContributionItem, [id]);
org.eclipse.jface.util.Assert.isTrue (Clazz.instanceOf (toolBarManager, org.eclipse.jface.action.ToolBarManager));
this.toolBarManager = toolBarManager;
}, "org.eclipse.jface.action.IToolBarManager,~S");
Clazz.defineMethod (c$, "checkDisposed", 
($fz = function () {
if (this.disposed) {
if (org.eclipse.jface.util.Policy.TRACE_TOOLBAR) {
System.out.println ("Method invocation on a disposed tool bar contribution item.");
 new Exception ().printStackTrace (System.out);
}return true;
}return false;
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "dispose", 
function () {
if (this.toolBarManager != null) {
this.toolBarManager.dispose ();
this.toolBarManager = null;
}if ((this.coolItem != null) && (!this.coolItem.isDisposed ())) {
this.coolItem.dispose ();
this.coolItem = null;
}this.disposed = true;
});
Clazz.defineMethod (c$, "fill", 
function (coolBar, index) {
if (this.checkDisposed ()) {
return ;
}if (this.coolItem == null && coolBar != null) {
var oldToolBar = this.toolBarManager.getControl ();
var toolBar = this.toolBarManager.createControl (coolBar);
if ((oldToolBar != null) && (oldToolBar.equals (toolBar))) {
this.toolBarManager.update (true);
}if (toolBar.getItemCount () < 1) return ;
var flags = 4;
if (index >= 0) {
this.coolItem =  new $wt.widgets.CoolItem (coolBar, flags, index);
} else {
this.coolItem =  new $wt.widgets.CoolItem (coolBar, flags);
}this.coolItem.setData (this);
this.coolItem.setControl (toolBar);
if (oldToolBar !== toolBar) {
toolBar.addListener (35, (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.action.ToolBarContributionItem$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.action, "ToolBarContributionItem$1", null, $wt.widgets.Listener);
Clazz.overrideMethod (c$, "handleEvent", 
function (event) {
if (this.b$["org.eclipse.jface.action.ToolBarContributionItem"].toolBarManager.getContextMenuManager () == null) {
this.b$["org.eclipse.jface.action.ToolBarContributionItem"].handleContextMenu (event);
}}, "$wt.widgets.Event");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.action.ToolBarContributionItem$1, i$, v$);
}) (this, null));
}if (this.getUseChevron ()) {
this.coolItem.addSelectionListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.action.ToolBarContributionItem$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.action, "ToolBarContributionItem$2", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (event) {
if (event.detail == 4) {
this.b$["org.eclipse.jface.action.ToolBarContributionItem"].handleChevron (event);
}}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.action.ToolBarContributionItem$2, i$, v$);
}) (this, null));
}this.coolItem.addDisposeListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.action.ToolBarContributionItem$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.action, "ToolBarContributionItem$3", null, $wt.events.DisposeListener);
Clazz.overrideMethod (c$, "widgetDisposed", 
function (event) {
this.b$["org.eclipse.jface.action.ToolBarContributionItem"].handleWidgetDispose (event);
}, "$wt.events.DisposeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.action.ToolBarContributionItem$3, i$, v$);
}) (this, null));
this.updateSize (true);
}}, "$wt.widgets.CoolBar,~N");
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
Clazz.defineMethod (c$, "getCurrentHeight", 
function () {
if (this.checkDisposed ()) {
return -1;
}return this.currentHeight;
});
Clazz.defineMethod (c$, "getCurrentWidth", 
function () {
if (this.checkDisposed ()) {
return -1;
}return this.currentWidth;
});
Clazz.defineMethod (c$, "getMinimumItemsToShow", 
function () {
if (this.checkDisposed ()) {
return -1;
}return this.minimumItemsToShow;
});
Clazz.defineMethod (c$, "getToolBarManager", 
function () {
if (this.checkDisposed ()) {
return null;
}return this.toolBarManager;
});
Clazz.defineMethod (c$, "getUseChevron", 
function () {
if (this.checkDisposed ()) {
return false;
}return this.useChevron;
});
Clazz.defineMethod (c$, "handleChevron", 
($fz = function (event) {
var item = event.widget;
var control = item.getControl ();
if ((Clazz.instanceOf (control, $wt.widgets.ToolBar)) == false) {
return ;
}var coolBar = item.getParent ();
var toolBar = control;
var toolBarBounds = toolBar.getBounds ();
var items = toolBar.getItems ();
var hidden =  new java.util.ArrayList ();
for (var i = 0; i < items.length; ++i) {
var itemBounds = items[i].getBounds ();
if (!((itemBounds.x + itemBounds.width <= toolBarBounds.width) && (itemBounds.y + itemBounds.height <= toolBarBounds.height))) {
hidden.add (items[i]);
}}
if (this.chevronMenuManager != null) {
this.chevronMenuManager.dispose ();
}this.chevronMenuManager =  new org.eclipse.jface.action.MenuManager ();
for (var i = hidden.iterator (); i.hasNext (); ) {
var toolItem = i.next ();
var data = toolItem.getData ();
if (Clazz.instanceOf (data, org.eclipse.jface.action.ActionContributionItem)) {
var contribution =  new org.eclipse.jface.action.ActionContributionItem ((data).getAction ());
this.chevronMenuManager.add (contribution);
} else if (Clazz.instanceOf (data, org.eclipse.jface.action.SubContributionItem)) {
var innerData = (data).getInnerItem ();
if (Clazz.instanceOf (innerData, org.eclipse.jface.action.ActionContributionItem)) {
var contribution =  new org.eclipse.jface.action.ActionContributionItem ((innerData).getAction ());
this.chevronMenuManager.add (contribution);
}} else if (data.isSeparator ()) {
this.chevronMenuManager.add ( new org.eclipse.jface.action.Separator ());
}}
var popup = this.chevronMenuManager.createContextMenu (coolBar);
var chevronPosition = coolBar.toDisplay (event.x, event.y);
popup.setLocation (chevronPosition.x, chevronPosition.y);
popup.setVisible (true);
}, $fz.isPrivate = true, $fz), "$wt.events.SelectionEvent");
Clazz.defineMethod (c$, "handleContextMenu", 
($fz = function (event) {
var toolBar = this.toolBarManager.getControl ();
var parentMenu = toolBar.getParent ().getMenu ();
if ((parentMenu != null) && (!parentMenu.isDisposed ())) {
toolBar.setMenu (parentMenu);
parentMenu.addListener (23, (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.action.ToolBarContributionItem$4")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.action, "ToolBarContributionItem$4", null, $wt.widgets.Listener);
Clazz.overrideMethod (c$, "handleEvent", 
function (innerEvent) {
var innerToolBar = this.b$["org.eclipse.jface.action.ToolBarContributionItem"].toolBarManager.getControl ();
if (innerToolBar != null) {
innerToolBar.setMenu (null);
var innerParentMenu = innerToolBar.getParent ().getMenu ();
if (innerParentMenu != null) {
innerParentMenu.removeListener (23, this);
}}}, "$wt.widgets.Event");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.action.ToolBarContributionItem$4, i$, v$);
}) (this, null));
}}, $fz.isPrivate = true, $fz), "$wt.widgets.Event");
Clazz.defineMethod (c$, "handleWidgetDispose", 
($fz = function (event) {
this.coolItem = null;
}, $fz.isPrivate = true, $fz), "$wt.events.DisposeEvent");
Clazz.defineMethod (c$, "isVisible", 
function () {
if (this.checkDisposed ()) {
return false;
}var visibleItem = false;
if (this.toolBarManager != null) {
var contributionItems = this.toolBarManager.getItems ();
for (var i = 0; i < contributionItems.length; i++) {
var contributionItem = contributionItems[i];
if ((!contributionItem.isGroupMarker ()) && (!contributionItem.isSeparator ())) {
visibleItem = true;
break;
}}
}return (visibleItem || Clazz.superCall (this, org.eclipse.jface.action.ToolBarContributionItem, "isVisible", []));
});
Clazz.overrideMethod (c$, "saveWidgetState", 
function () {
if (this.checkDisposed ()) {
return ;
}if (this.coolItem == null) return ;
var coolBar = this.coolItem.getParent ();
var isLastOnRow = false;
var lastIndex = coolBar.getItemCount () - 1;
var coolItemIndex = coolBar.indexOf (this.coolItem);
var wrapIndicies = this.getAdjustedWrapIndices (coolBar.getWrapIndices ());
for (var row = wrapIndicies.length - 1; row >= 0; row--) {
if (wrapIndicies[row] <= coolItemIndex) {
var nextRow = row + 1;
var nextRowStartIndex;
if (nextRow > (wrapIndicies.length - 1)) {
nextRowStartIndex = lastIndex + 1;
} else {
nextRowStartIndex = wrapIndicies[nextRow];
}if (coolItemIndex == (nextRowStartIndex - 1)) {
isLastOnRow = true;
}break;
}}
var nCurrentWidth;
if (isLastOnRow) {
nCurrentWidth = this.coolItem.getPreferredSize ().x;
} else {
nCurrentWidth = this.coolItem.getSize ().x;
}this.setCurrentWidth (nCurrentWidth);
this.setCurrentHeight (this.coolItem.getSize ().y);
});
Clazz.defineMethod (c$, "setCurrentHeight", 
function (currentHeight) {
if (this.checkDisposed ()) {
return ;
}this.currentHeight = currentHeight;
}, "~N");
Clazz.defineMethod (c$, "setCurrentWidth", 
function (currentWidth) {
if (this.checkDisposed ()) {
return ;
}this.currentWidth = currentWidth;
}, "~N");
Clazz.defineMethod (c$, "setMinimumItemsToShow", 
function (minimumItemsToShow) {
if (this.checkDisposed ()) {
return ;
}this.minimumItemsToShow = minimumItemsToShow;
}, "~N");
Clazz.defineMethod (c$, "setUseChevron", 
function (value) {
if (this.checkDisposed ()) {
return ;
}this.useChevron = value;
}, "~B");
Clazz.defineMethod (c$, "update", 
function (propertyName) {
if (this.checkDisposed ()) {
return ;
}if (this.coolItem != null) {
var manager = this.getToolBarManager ();
if (manager != null) {
manager.update (true);
}if ((propertyName == null) || propertyName.equals ("size")) {
this.updateSize (true);
}}}, "~S");
Clazz.defineMethod (c$, "updateSize", 
($fz = function (changeCurrentSize) {
if (this.checkDisposed ()) {
return ;
}if (this.coolItem == null || this.coolItem.isDisposed ()) {
return ;
}var locked = false;
var coolBar = this.coolItem.getParent ();
try {
if (coolBar != null) {
if (coolBar.getLocked ()) {
coolBar.setLocked (false);
locked = true;
}}var toolBar = this.coolItem.getControl ();
if ((toolBar == null) || (toolBar.isDisposed ()) || (toolBar.getItemCount () <= 0)) {
this.coolItem.setData (null);
var control = this.coolItem.getControl ();
if ((control != null) && !control.isDisposed ()) {
control.dispose ();
this.coolItem.setControl (null);
}if (!this.coolItem.isDisposed ()) {
this.coolItem.dispose ();
}} else {
var toolBarSize = toolBar.computeSize (-1, -1);
var preferredSize = this.coolItem.computeSize (toolBarSize.x, toolBarSize.y);
this.coolItem.setPreferredSize (preferredSize);
if (this.getMinimumItemsToShow () != -1) {
var toolItemWidth = toolBar.getItems ()[0].getWidth ();
var minimumWidth = toolItemWidth * this.getMinimumItemsToShow ();
this.coolItem.setMinimumSize (minimumWidth, toolBarSize.y);
} else {
this.coolItem.setMinimumSize (toolBarSize.x, toolBarSize.y);
}if (changeCurrentSize) {
this.coolItem.setSize (preferredSize);
}}} finally {
if ((locked) && (coolBar != null)) {
coolBar.setLocked (true);
}}
}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineStatics (c$,
"SHOW_ALL_ITEMS", -1);
});
