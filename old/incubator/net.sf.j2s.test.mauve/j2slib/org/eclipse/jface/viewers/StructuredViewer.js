Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["org.eclipse.jface.util.SafeRunnable", "org.eclipse.jface.viewers.ContentViewer", "$.IPostSelectionProvider", "org.eclipse.jface.util.ListenerList"], "org.eclipse.jface.viewers.StructuredViewer", ["java.util.ArrayList", "org.eclipse.jface.util.Assert", "$.IOpenEventListener", "$.OpenStrategy", "org.eclipse.jface.viewers.CustomHashtable", "$.DoubleClickEvent", "$.OpenEvent", "$.SelectionChangedEvent", "$.StructuredSelection", "$wt.dnd.DragSource", "$.DropTarget", "$wt.events.SelectionAdapter", "$.SelectionListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.elementMap = null;
this.comparer = null;
this.sorter = null;
this.filters = null;
this.inChange = false;
this.restoreSelection = false;
this.doubleClickListeners = null;
this.openListeners = null;
this.postSelectionChangedListeners = null;
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.StructuredViewer.ColorAndFontCollector")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.foreground = null;
this.background = null;
this.font = null;
this.usedDecorators = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers.StructuredViewer, "ColorAndFontCollector");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "clear", 
function () {
this.foreground = null;
this.background = null;
this.font = null;
this.usedDecorators = false;
});
Clazz.defineMethod (c$, "setFontsAndColors", 
function (a) {
}, "~O");
Clazz.defineMethod (c$, "setUsedDecorators", 
function () {
this.usedDecorators = true;
});
Clazz.defineMethod (c$, "applyFontsAndColors", 
function (a) {
if (this.usedDecorators) {
if (this.background != null) a.setBackground (this.background);
if (this.foreground != null) a.setForeground (this.foreground);
if (this.font != null) a.setFont (this.font);
}this.clear ();
}, "$wt.widgets.TableItem");
Clazz.defineMethod (c$, "applyFontsAndColors", 
function (a) {
if (this.usedDecorators) {
if (this.background != null) a.setBackground (this.background);
if (this.foreground != null) a.setForeground (this.foreground);
if (this.font != null) a.setFont (this.font);
}this.clear ();
}, "$wt.widgets.TreeItem");
Clazz.defineMethod (c$, "applyFontsAndColors", 
function (a) {
if (this.usedDecorators) {
if (this.background != null) a.setBackground (this.background);
if (this.foreground != null) a.setForeground (this.foreground);
if (this.font != null) a.setFont (this.font);
}this.clear ();
}, "$wt.custom.TableTreeItem");
Clazz.defineMethod (c$, "setBackground", 
function (a) {
this.background = a;
}, "$wt.graphics.Color");
Clazz.defineMethod (c$, "setFont", 
function (a) {
this.font = a;
}, "$wt.graphics.Font");
Clazz.defineMethod (c$, "setForeground", 
function (a) {
this.foreground = a;
}, "$wt.graphics.Color");
c$ = Clazz.p0p ();
}
this.colorAndFontCollector = null;
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.StructuredViewer.ColorAndFontCollectorWithProviders")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.colorProvider = null;
this.fontProvider = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers.StructuredViewer, "ColorAndFontCollectorWithProviders", org.eclipse.jface.viewers.StructuredViewer.ColorAndFontCollector, null, Clazz.innerTypeInstance (org.eclipse.jface.viewers.StructuredViewer.ColorAndFontCollector, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, org.eclipse.jface.viewers.StructuredViewer.ColorAndFontCollectorWithProviders);
if (Clazz.instanceOf (a, org.eclipse.jface.viewers.IColorProvider)) this.colorProvider = a;
if (Clazz.instanceOf (a, org.eclipse.jface.viewers.IFontProvider)) this.fontProvider = a;
}, "org.eclipse.jface.viewers.IBaseLabelProvider");
Clazz.overrideMethod (c$, "setFontsAndColors", 
function (a) {
if (this.fontProvider != null) {
if (this.font == null) this.font = this.fontProvider.getFont (a);
}if (this.colorProvider == null) return ;
if (this.background == null) this.background = this.colorProvider.getBackground (a);
if (this.foreground == null) this.foreground = this.colorProvider.getForeground (a);
}, "~O");
Clazz.defineMethod (c$, "applyFontsAndColors", 
function (a) {
if (this.colorProvider == null) {
if (this.usedDecorators) {
if (this.background != null) a.setBackground (this.background);
if (this.foreground != null) a.setForeground (this.foreground);
}} else {
a.setBackground (this.background);
a.setForeground (this.foreground);
}if (this.fontProvider == null) {
if (this.usedDecorators && this.font != null) a.setFont (this.font);
} else a.setFont (this.font);
this.clear ();
}, "$wt.widgets.TableItem");
Clazz.defineMethod (c$, "applyFontsAndColors", 
function (a) {
if (this.colorProvider == null) {
if (this.usedDecorators) {
if (this.background != null) a.setBackground (this.background);
if (this.foreground != null) a.setForeground (this.foreground);
}} else {
a.setBackground (this.background);
a.setForeground (this.foreground);
}if (this.fontProvider == null) {
if (this.usedDecorators && this.font != null) a.setFont (this.font);
} else a.setFont (this.font);
this.clear ();
}, "$wt.widgets.TreeItem");
Clazz.defineMethod (c$, "applyFontsAndColors", 
function (a) {
if (this.colorProvider == null) {
if (this.usedDecorators) {
if (this.background != null) a.setBackground (this.background);
if (this.foreground != null) a.setForeground (this.foreground);
}} else {
a.setBackground (this.background);
a.setForeground (this.foreground);
}if (this.fontProvider == null) {
if (this.usedDecorators && this.font != null) a.setFont (this.font);
} else a.setFont (this.font);
this.clear ();
}, "$wt.custom.TableTreeItem");
c$ = Clazz.p0p ();
}
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.StructuredViewer.UpdateItemSafeRunnable")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.widget = null;
this.element = null;
this.fullMap = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers.StructuredViewer, "UpdateItemSafeRunnable", org.eclipse.jface.util.SafeRunnable);
Clazz.makeConstructor (c$, 
function (a, b, c) {
Clazz.superConstructor (this, org.eclipse.jface.viewers.StructuredViewer.UpdateItemSafeRunnable, []);
this.widget = a;
this.element = b;
this.fullMap = c;
}, "$wt.widgets.Widget,~O,~B");
Clazz.defineMethod (c$, "run", 
function () {
this.b$["org.eclipse.jface.viewers.StructuredViewer"].doUpdateItem (this.widget, this.element, this.fullMap);
});
c$ = Clazz.p0p ();
}
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "StructuredViewer", org.eclipse.jface.viewers.ContentViewer, org.eclipse.jface.viewers.IPostSelectionProvider);
Clazz.prepareFields (c$, function () {
this.doubleClickListeners =  new org.eclipse.jface.util.ListenerList (1);
this.openListeners =  new org.eclipse.jface.util.ListenerList (1);
this.postSelectionChangedListeners =  new org.eclipse.jface.util.ListenerList (1);
this.colorAndFontCollector = Clazz.innerTypeInstance (org.eclipse.jface.viewers.StructuredViewer.ColorAndFontCollector, this, null);
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.jface.viewers.StructuredViewer, []);
});
Clazz.defineMethod (c$, "addDoubleClickListener", 
function (listener) {
this.doubleClickListeners.add (listener);
}, "org.eclipse.jface.viewers.IDoubleClickListener");
Clazz.defineMethod (c$, "addOpenListener", 
function (listener) {
this.openListeners.add (listener);
}, "org.eclipse.jface.viewers.IOpenListener");
Clazz.overrideMethod (c$, "addPostSelectionChangedListener", 
function (listener) {
this.postSelectionChangedListeners.add (listener);
}, "org.eclipse.jface.viewers.ISelectionChangedListener");
Clazz.defineMethod (c$, "addDragSupport", 
function (operations, transferTypes, listener) {
var myControl = this.getControl ();
var dragSource =  new $wt.dnd.DragSource (myControl, operations);
dragSource.setTransfer (transferTypes);
dragSource.addDragListener (listener);
}, "~N,~A,$wt.dnd.DragSourceListener");
Clazz.defineMethod (c$, "addDropSupport", 
function (operations, transferTypes, listener) {
var control = this.getControl ();
var dropTarget =  new $wt.dnd.DropTarget (control, operations);
dropTarget.setTransfer (transferTypes);
dropTarget.addDropListener (listener);
}, "~N,~A,$wt.dnd.DropTargetListener");
Clazz.defineMethod (c$, "addFilter", 
function (filter) {
if (this.filters == null) this.filters =  new java.util.ArrayList ();
this.filters.add (filter);
this.refresh ();
}, "org.eclipse.jface.viewers.ViewerFilter");
Clazz.defineMethod (c$, "assertElementsNotNull", 
function (elements) {
org.eclipse.jface.util.Assert.isNotNull (elements);
for (var i = 0, n = elements.length; i < n; ++i) {
org.eclipse.jface.util.Assert.isNotNull (elements[i]);
}
}, "~A");
Clazz.defineMethod (c$, "associate", 
function (element, item) {
var data = item.getData ();
if (data !== element) {
if (data != null) this.disassociate (item);
item.setData (element);
}this.mapElement (element, item);
}, "~O,$wt.widgets.Item");
Clazz.defineMethod (c$, "disassociate", 
function (item) {
var element = item.getData ();
org.eclipse.jface.util.Assert.isNotNull (element);
this.unmapElement (element, item);
item.setData (null);
}, "$wt.widgets.Item");
Clazz.defineMethod (c$, "equals", 
function (elementA, elementB) {
if (this.comparer == null) return elementA == null ? elementB == null : elementA.equals (elementB);
 else return elementA == null ? elementB == null : this.comparer.equals (elementA, elementB);
}, "~O,~O");
Clazz.defineMethod (c$, "filter", 
function (elements) {
if (this.filters != null) {
var filtered =  new java.util.ArrayList (elements.length);
var root = this.getRoot ();
for (var i = 0; i < elements.length; i++) {
var add = true;
for (var j = 0; j < this.filters.size (); j++) {
add = (this.filters.get (j)).select (this, root, elements[i]);
if (!add) break;
}
if (add) filtered.add (elements[i]);
}
return filtered.toArray ();
}return elements;
}, "~A");
Clazz.defineMethod (c$, "findItem", 
function (element) {
var result = this.doFindInputItem (element);
if (result != null) return result;
if (this.elementMap != null) return this.elementMap.get (element);
return this.doFindItem (element);
}, "~O");
Clazz.defineMethod (c$, "fireDoubleClick", 
function (event) {
var listeners = this.doubleClickListeners.getListeners ();
for (var i = 0; i < listeners.length; ++i) {
var l = listeners[i];
org.eclipse.jface.util.SafeRunnable.run ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.StructuredViewer$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "StructuredViewer$1", org.eclipse.jface.util.SafeRunnable);
Clazz.defineMethod (c$, "run", 
function () {
this.f$.l.doubleClick (this.f$.event);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.StructuredViewer$1, i$, v$);
}) (this, Clazz.cloneFinals ("l", l, "event", event)));
}
}, "org.eclipse.jface.viewers.DoubleClickEvent");
Clazz.defineMethod (c$, "fireOpen", 
function (event) {
var listeners = this.openListeners.getListeners ();
for (var i = 0; i < listeners.length; ++i) {
var l = listeners[i];
org.eclipse.jface.util.SafeRunnable.run ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.StructuredViewer$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "StructuredViewer$2", org.eclipse.jface.util.SafeRunnable);
Clazz.defineMethod (c$, "run", 
function () {
this.f$.l.open (this.f$.event);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.StructuredViewer$2, i$, v$);
}) (this, Clazz.cloneFinals ("l", l, "event", event)));
}
}, "org.eclipse.jface.viewers.OpenEvent");
Clazz.defineMethod (c$, "firePostSelectionChanged", 
function (event) {
var listeners = this.postSelectionChangedListeners.getListeners ();
for (var i = 0; i < listeners.length; ++i) {
var l = listeners[i];
org.eclipse.jface.util.SafeRunnable.run ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.StructuredViewer$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "StructuredViewer$3", org.eclipse.jface.util.SafeRunnable);
Clazz.defineMethod (c$, "run", 
function () {
this.f$.l.selectionChanged (this.f$.event);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.StructuredViewer$3, i$, v$);
}) (this, Clazz.cloneFinals ("l", l, "event", event)));
}
}, "org.eclipse.jface.viewers.SelectionChangedEvent");
Clazz.defineMethod (c$, "getComparer", 
function () {
return this.comparer;
});
Clazz.defineMethod (c$, "getFilteredChildren", 
function (parent) {
var result = this.getRawChildren (parent);
if (this.filters != null) {
for (var iter = this.filters.iterator (); iter.hasNext (); ) {
var f = iter.next ();
result = f.filter (this, parent, result);
}
}return result;
}, "~O");
Clazz.defineMethod (c$, "getFilters", 
function () {
if (this.filters == null) return  new Array (0);
var result =  new Array (this.filters.size ());
this.filters.toArray (result);
return result;
});
Clazz.defineMethod (c$, "getItem", 
function (x, y) {
return null;
}, "~N,~N");
Clazz.defineMethod (c$, "getRawChildren", 
function (parent) {
var result = null;
if (parent != null) {
var cp = this.getContentProvider ();
if (cp != null) {
result = cp.getElements (parent);
this.assertElementsNotNull (result);
}}return (result != null) ? result :  new Array (0);
}, "~O");
Clazz.defineMethod (c$, "getRoot", 
function () {
return this.getInput ();
});
Clazz.overrideMethod (c$, "getSelection", 
function () {
var control = this.getControl ();
if (control == null || control.isDisposed ()) {
return org.eclipse.jface.viewers.StructuredSelection.EMPTY;
}var list = this.getSelectionFromWidget ();
return  new org.eclipse.jface.viewers.StructuredSelection (list);
});
Clazz.defineMethod (c$, "getSortedChildren", 
function (parent) {
var result = this.getFilteredChildren (parent);
if (this.sorter != null) {
result = result.clone ();
this.sorter.sort (this, result);
}return result;
}, "~O");
Clazz.defineMethod (c$, "getSorter", 
function () {
return this.sorter;
});
Clazz.defineMethod (c$, "handleDoubleSelect", 
function (event) {
var control = this.getControl ();
if (control != null && !control.isDisposed ()) {
var selection;
if (event.item != null && event.item.getData () != null) {
selection =  new org.eclipse.jface.viewers.StructuredSelection (event.item.getData ());
} else {
selection = this.getSelection ();
this.updateSelection (selection);
}this.fireDoubleClick ( new org.eclipse.jface.viewers.DoubleClickEvent (this, selection));
}}, "$wt.events.SelectionEvent");
Clazz.defineMethod (c$, "handleOpen", 
function (event) {
var control = this.getControl ();
if (control != null && !control.isDisposed ()) {
var selection = this.getSelection ();
this.fireOpen ( new org.eclipse.jface.viewers.OpenEvent (this, selection));
}}, "$wt.events.SelectionEvent");
Clazz.defineMethod (c$, "handleInvalidSelection", 
function (invalidSelection, newSelection) {
this.updateSelection (newSelection);
var event =  new org.eclipse.jface.viewers.SelectionChangedEvent (this, newSelection);
this.firePostSelectionChanged (event);
}, "org.eclipse.jface.viewers.ISelection,org.eclipse.jface.viewers.ISelection");
Clazz.defineMethod (c$, "handleLabelProviderChanged", 
function (event) {
var elements = event.getElements ();
if (elements != null) {
this.update (elements, null);
} else {
Clazz.superCall (this, org.eclipse.jface.viewers.StructuredViewer, "handleLabelProviderChanged", [event]);
}}, "org.eclipse.jface.viewers.LabelProviderChangedEvent");
Clazz.defineMethod (c$, "handleSelect", 
function (event) {
var control = this.getControl ();
if (control != null && !control.isDisposed ()) {
this.updateSelection (this.getSelection ());
}}, "$wt.events.SelectionEvent");
Clazz.defineMethod (c$, "handlePostSelect", 
function (e) {
var event =  new org.eclipse.jface.viewers.SelectionChangedEvent (this, this.getSelection ());
this.firePostSelectionChanged (event);
}, "$wt.events.SelectionEvent");
Clazz.defineMethod (c$, "hookControl", 
function (control) {
Clazz.superCall (this, org.eclipse.jface.viewers.StructuredViewer, "hookControl", [control]);
var handler =  new org.eclipse.jface.util.OpenStrategy (control);
handler.addSelectionListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.StructuredViewer$4")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "StructuredViewer$4", null, $wt.events.SelectionListener);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
this.b$["org.eclipse.jface.viewers.StructuredViewer"].handleSelect (e);
}, "$wt.events.SelectionEvent");
Clazz.overrideMethod (c$, "widgetDefaultSelected", 
function (e) {
this.b$["org.eclipse.jface.viewers.StructuredViewer"].handleDoubleSelect (e);
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.StructuredViewer$4, i$, v$);
}) (this, null));
handler.addPostSelectionListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.StructuredViewer$5")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "StructuredViewer$5", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
this.b$["org.eclipse.jface.viewers.StructuredViewer"].handlePostSelect (e);
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.StructuredViewer$5, i$, v$);
}) (this, null));
handler.addOpenListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.StructuredViewer$6")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "StructuredViewer$6", null, org.eclipse.jface.util.IOpenEventListener);
Clazz.overrideMethod (c$, "handleOpen", 
function (e) {
this.b$["org.eclipse.jface.viewers.StructuredViewer"].handleOpen (e);
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.StructuredViewer$6, i$, v$);
}) (this, null));
}, "$wt.widgets.Control");
Clazz.defineMethod (c$, "hasFilters", 
function () {
return this.filters != null && this.filters.size () > 0;
});
Clazz.defineMethod (c$, "internalRefresh", 
function (element, updateLabels) {
this.internalRefresh (element);
}, "~O,~B");
Clazz.defineMethod (c$, "mapElement", 
function (element, item) {
if (this.elementMap != null) this.elementMap.put (element, item);
}, "~O,$wt.widgets.Widget");
Clazz.defineMethod (c$, "needsRefilter", 
function (element, property) {
if (this.sorter != null && this.sorter.isSorterProperty (element, property)) return true;
if (this.filters != null) {
for (var i = 0, n = this.filters.size (); i < n; ++i) {
var filter = this.filters.get (i);
if (filter.isFilterProperty (element, property)) return true;
}
}return false;
}, "~O,~S");
Clazz.defineMethod (c$, "newHashtable", 
function (capacity) {
return  new org.eclipse.jface.viewers.CustomHashtable (capacity, this.getComparer ());
}, "~N");
Clazz.defineMethod (c$, "preservingSelection", 
function (updateCode) {
var oldSelection = null;
try {
oldSelection = this.getSelection ();
this.inChange = this.restoreSelection = true;
updateCode.run ();
} finally {
this.inChange = false;
if (this.restoreSelection) this.setSelectionToWidget (oldSelection, false);
var newSelection = this.getSelection ();
if (!newSelection.equals (oldSelection)) this.handleInvalidSelection (oldSelection, newSelection);
}
}, "Runnable");
Clazz.defineMethod (c$, "refresh", 
function () {
this.refresh (this.getRoot ());
});
Clazz.defineMethod (c$, "refresh", 
function (updateLabels) {
this.refresh (this.getRoot (), updateLabels);
}, "~B");
Clazz.defineMethod (c$, "refresh", 
function (element) {
this.preservingSelection ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.StructuredViewer$7")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "StructuredViewer$7", null, Runnable);
Clazz.defineMethod (c$, "run", 
function () {
this.b$["org.eclipse.jface.viewers.StructuredViewer"].internalRefresh (this.f$.element);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.StructuredViewer$7, i$, v$);
}) (this, Clazz.cloneFinals ("element", element)));
}, "~O");
Clazz.defineMethod (c$, "refresh", 
function (element, updateLabels) {
this.preservingSelection ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.StructuredViewer$8")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "StructuredViewer$8", null, Runnable);
Clazz.defineMethod (c$, "run", 
function () {
this.b$["org.eclipse.jface.viewers.StructuredViewer"].internalRefresh (this.f$.element, this.f$.updateLabels);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.StructuredViewer$8, i$, v$);
}) (this, Clazz.cloneFinals ("element", element, "updateLabels", updateLabels)));
}, "~O,~B");
Clazz.defineMethod (c$, "refreshItem", 
function (widget, element) {
org.eclipse.jface.util.SafeRunnable.run (Clazz.innerTypeInstance (org.eclipse.jface.viewers.StructuredViewer.UpdateItemSafeRunnable, this, null, widget, element, true));
}, "$wt.widgets.Widget,~O");
Clazz.defineMethod (c$, "removeOpenListener", 
function (listener) {
this.openListeners.remove (listener);
}, "org.eclipse.jface.viewers.IOpenListener");
Clazz.overrideMethod (c$, "removePostSelectionChangedListener", 
function (listener) {
this.postSelectionChangedListeners.remove (listener);
}, "org.eclipse.jface.viewers.ISelectionChangedListener");
Clazz.defineMethod (c$, "removeDoubleClickListener", 
function (listener) {
this.doubleClickListeners.remove (listener);
}, "org.eclipse.jface.viewers.IDoubleClickListener");
Clazz.defineMethod (c$, "removeFilter", 
function (filter) {
org.eclipse.jface.util.Assert.isNotNull (filter);
if (this.filters != null) {
for (var i = this.filters.iterator (); i.hasNext (); ) {
var o = i.next ();
if (o === filter) {
i.remove ();
this.refresh ();
if (this.filters.size () == 0) this.filters = null;
return ;
}}
}}, "org.eclipse.jface.viewers.ViewerFilter");
Clazz.defineMethod (c$, "resetFilters", 
function () {
if (this.filters != null) {
this.filters = null;
this.refresh ();
}});
Clazz.defineMethod (c$, "setContentProvider", 
function (provider) {
this.assertContentProviderType (provider);
Clazz.superCall (this, org.eclipse.jface.viewers.StructuredViewer, "setContentProvider", [provider]);
}, "org.eclipse.jface.viewers.IContentProvider");
Clazz.defineMethod (c$, "assertContentProviderType", 
function (provider) {
org.eclipse.jface.util.Assert.isTrue (Clazz.instanceOf (provider, org.eclipse.jface.viewers.IStructuredContentProvider));
}, "org.eclipse.jface.viewers.IContentProvider");
Clazz.defineMethod (c$, "setInput", 
function (input) {
try {
this.unmapAllElements ();
Clazz.superCall (this, org.eclipse.jface.viewers.StructuredViewer, "setInput", [input]);
} finally {
}
}, "~O");
Clazz.defineMethod (c$, "setSelection", 
function (selection, reveal) {
var control = this.getControl ();
if (control == null || control.isDisposed ()) {
return ;
}if (!this.inChange) {
this.setSelectionToWidget (selection, reveal);
var sel = this.getSelection ();
this.updateSelection (sel);
this.firePostSelectionChanged ( new org.eclipse.jface.viewers.SelectionChangedEvent (this, sel));
} else {
this.restoreSelection = false;
this.setSelectionToWidget (selection, reveal);
}}, "org.eclipse.jface.viewers.ISelection,~B");
Clazz.defineMethod (c$, "setSelectionToWidget", 
function (selection, reveal) {
if (Clazz.instanceOf (selection, org.eclipse.jface.viewers.IStructuredSelection)) this.setSelectionToWidget ((selection).toList (), reveal);
 else this.setSelectionToWidget (Clazz.castNullAs ("java.util.List"), reveal);
}, "org.eclipse.jface.viewers.ISelection,~B");
Clazz.defineMethod (c$, "setSorter", 
function (sorter) {
if (this.sorter !== sorter) {
this.sorter = sorter;
this.refresh ();
}}, "org.eclipse.jface.viewers.ViewerSorter");
Clazz.defineMethod (c$, "setUseHashlookup", 
function (enable) {
org.eclipse.jface.util.Assert.isTrue (this.getInput () == null, "Can only enable the hash look up before input has been set");
if (enable) {
this.elementMap = this.newHashtable (13);
} else {
this.elementMap = null;
}}, "~B");
Clazz.defineMethod (c$, "setComparer", 
function (comparer) {
this.comparer = comparer;
if (this.elementMap != null) {
this.elementMap =  new org.eclipse.jface.viewers.CustomHashtable (this.elementMap, comparer);
}}, "org.eclipse.jface.viewers.IElementComparer");
Clazz.defineMethod (c$, "testFindItem", 
function (element) {
return this.findItem (element);
}, "~O");
Clazz.defineMethod (c$, "unmapAllElements", 
function () {
if (this.elementMap != null) {
this.elementMap = this.newHashtable (13);
}});
Clazz.defineMethod (c$, "unmapElement", 
function (element) {
if (this.elementMap != null) {
this.elementMap.remove (element);
}}, "~O");
Clazz.defineMethod (c$, "unmapElement", 
function (element, item) {
if (this.elementMap != null && this.elementMap.get (element) === item) {
this.unmapElement (element);
}}, "~O,$wt.widgets.Widget");
Clazz.defineMethod (c$, "update", 
function (elements, properties) {
for (var i = 0; i < elements.length; ++i) this.update (elements[i], properties);

}, "~A,~A");
Clazz.defineMethod (c$, "update", 
function (element, properties) {
org.eclipse.jface.util.Assert.isNotNull (element);
var item = this.findItem (element);
if (item == null) return ;
this.internalUpdate (item, element, properties);
}, "~O,~A");
Clazz.defineMethod (c$, "internalUpdate", 
function (widget, element, properties) {
var needsRefilter = false;
if (properties != null) {
for (var i = 0; i < properties.length; ++i) {
needsRefilter = this.needsRefilter (element, properties[i]);
if (needsRefilter) break;
}
}if (needsRefilter) {
this.refresh ();
return ;
}var needsUpdate;
if (properties == null) {
needsUpdate = true;
} else {
needsUpdate = false;
var labelProvider = this.getLabelProvider ();
for (var i = 0; i < properties.length; ++i) {
needsUpdate = labelProvider.isLabelProperty (element, properties[i]);
if (needsUpdate) break;
}
}if (needsUpdate) {
this.updateItem (widget, element);
}}, "$wt.widgets.Widget,~O,~A");
Clazz.defineMethod (c$, "updateItem", 
function (widget, element) {
org.eclipse.jface.util.SafeRunnable.run (Clazz.innerTypeInstance (org.eclipse.jface.viewers.StructuredViewer.UpdateItemSafeRunnable, this, null, widget, element, true));
}, "$wt.widgets.Widget,~O");
Clazz.defineMethod (c$, "updateSelection", 
function (selection) {
var event =  new org.eclipse.jface.viewers.SelectionChangedEvent (this, selection);
this.fireSelectionChanged (event);
}, "org.eclipse.jface.viewers.ISelection");
Clazz.defineMethod (c$, "usingElementMap", 
function () {
return this.elementMap != null;
});
Clazz.defineMethod (c$, "setLabelProvider", 
function (labelProvider) {
if (Clazz.instanceOf (labelProvider, org.eclipse.jface.viewers.IColorProvider) || Clazz.instanceOf (labelProvider, org.eclipse.jface.viewers.IFontProvider)) this.colorAndFontCollector = Clazz.innerTypeInstance (org.eclipse.jface.viewers.StructuredViewer.ColorAndFontCollectorWithProviders, this, null, labelProvider);
 else this.colorAndFontCollector = Clazz.innerTypeInstance (org.eclipse.jface.viewers.StructuredViewer.ColorAndFontCollector, this, null);
Clazz.superCall (this, org.eclipse.jface.viewers.StructuredViewer, "setLabelProvider", [labelProvider]);
}, "org.eclipse.jface.viewers.IBaseLabelProvider");
Clazz.defineMethod (c$, "buildLabel", 
function (updateLabel, element) {
if (Clazz.instanceOf (this.getLabelProvider (), org.eclipse.jface.viewers.IViewerLabelProvider)) {
var itemProvider = this.getLabelProvider ();
itemProvider.updateLabel (updateLabel, element);
this.colorAndFontCollector.setUsedDecorators ();
if (updateLabel.hasNewBackground ()) this.colorAndFontCollector.setBackground (updateLabel.getBackground ());
if (updateLabel.hasNewForeground ()) this.colorAndFontCollector.setForeground (updateLabel.getForeground ());
if (updateLabel.hasNewFont ()) this.colorAndFontCollector.setFont (updateLabel.getFont ());
return ;
}if (Clazz.instanceOf (this.getLabelProvider (), org.eclipse.jface.viewers.ILabelProvider)) {
var labelProvider = this.getLabelProvider ();
updateLabel.setText (labelProvider.getText (element));
updateLabel.setImage (labelProvider.getImage (element));
}}, "org.eclipse.jface.viewers.ViewerLabel,~O");
Clazz.defineMethod (c$, "buildLabel", 
function (updateLabel, element, labelProvider) {
labelProvider.updateLabel (updateLabel, element);
this.colorAndFontCollector.setUsedDecorators ();
if (updateLabel.hasNewBackground ()) this.colorAndFontCollector.setBackground (updateLabel.getBackground ());
if (updateLabel.hasNewForeground ()) this.colorAndFontCollector.setForeground (updateLabel.getForeground ());
if (updateLabel.hasNewFont ()) this.colorAndFontCollector.setFont (updateLabel.getFont ());
}, "org.eclipse.jface.viewers.ViewerLabel,~O,org.eclipse.jface.viewers.IViewerLabelProvider");
Clazz.defineMethod (c$, "buildLabel", 
function (updateLabel, element, labelProvider) {
updateLabel.setText (labelProvider.getText (element));
updateLabel.setImage (labelProvider.getImage (element));
}, "org.eclipse.jface.viewers.ViewerLabel,~O,org.eclipse.jface.viewers.ILabelProvider");
Clazz.defineMethod (c$, "getColorAndFontCollector", 
function () {
return this.colorAndFontCollector;
});
});
