Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["$wt.dnd.DropTargetAdapter"], "org.eclipse.jface.viewers.ViewerDropAdapter", ["$wt.graphics.Point"], function () {
c$ = Clazz.decorateAsClass (function () {
this.viewer = null;
this.currentOperation = 0;
this.lastValidOperation = 0;
this.currentTarget = null;
this.currentLocation = 0;
this.feedbackEnabled = true;
this.scrollExpandEnabled = true;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "ViewerDropAdapter", $wt.dnd.DropTargetAdapter);
Clazz.makeConstructor (c$, 
function (viewer) {
Clazz.superConstructor (this, org.eclipse.jface.viewers.ViewerDropAdapter, []);
this.viewer = viewer;
}, "org.eclipse.jface.viewers.Viewer");
Clazz.defineMethod (c$, "determineLocation", 
function (event) {
if (!(Clazz.instanceOf (event.item, $wt.widgets.Item))) {
return 4;
}var item = event.item;
var coordinates =  new $wt.graphics.Point (event.x, event.y);
coordinates = this.viewer.getControl ().toControl (coordinates);
if (item != null) {
var bounds = this.getBounds (item);
if (bounds == null) {
return 4;
}if ((coordinates.y - bounds.y) < 5) {
return 1;
}if ((bounds.y + bounds.height - coordinates.y) < 5) {
return 2;
}}return 3;
}, "$wt.dnd.DropTargetEvent");
Clazz.defineMethod (c$, "determineTarget", 
function (event) {
return event.item == null ? null : event.item.getData ();
}, "$wt.dnd.DropTargetEvent");
Clazz.defineMethod (c$, "doDropValidation", 
($fz = function (event) {
if (event.detail != 0) {
this.lastValidOperation = event.detail;
}if (this.validateDrop (this.currentTarget, event.detail, event.currentDataType)) {
this.currentOperation = this.lastValidOperation;
} else {
this.currentOperation = 0;
}event.detail = this.currentOperation;
}, $fz.isPrivate = true, $fz), "$wt.dnd.DropTargetEvent");
Clazz.overrideMethod (c$, "dragEnter", 
function (event) {
this.currentTarget = this.determineTarget (event);
this.doDropValidation (event);
}, "$wt.dnd.DropTargetEvent");
Clazz.overrideMethod (c$, "dragOperationChanged", 
function (event) {
this.currentTarget = this.determineTarget (event);
this.doDropValidation (event);
}, "$wt.dnd.DropTargetEvent");
Clazz.overrideMethod (c$, "dragOver", 
function (event) {
var target = this.determineTarget (event);
var oldLocation = this.currentLocation;
this.currentLocation = this.determineLocation (event);
this.setFeedback (event, this.currentLocation);
if (target !== this.currentTarget || this.currentLocation != oldLocation) {
this.currentTarget = target;
this.doDropValidation (event);
}}, "$wt.dnd.DropTargetEvent");
Clazz.overrideMethod (c$, "drop", 
function (event) {
this.currentLocation = this.determineLocation (event);
if (!this.performDrop (event.data)) {
event.detail = 0;
}this.currentOperation = event.detail;
}, "$wt.dnd.DropTargetEvent");
Clazz.overrideMethod (c$, "dropAccept", 
function (event) {
if (!this.validateDrop (this.currentTarget, event.detail, event.currentDataType)) {
event.detail = 0;
}}, "$wt.dnd.DropTargetEvent");
Clazz.defineMethod (c$, "getBounds", 
function (item) {
if (Clazz.instanceOf (item, $wt.widgets.TreeItem)) {
return (item).getBounds ();
}if (Clazz.instanceOf (item, $wt.widgets.TableItem)) {
return (item).getBounds (0);
}return null;
}, "$wt.widgets.Item");
Clazz.defineMethod (c$, "getCurrentLocation", 
function () {
return this.currentLocation;
});
Clazz.defineMethod (c$, "getCurrentOperation", 
function () {
return this.currentOperation;
});
Clazz.defineMethod (c$, "getCurrentTarget", 
function () {
return this.currentTarget;
});
Clazz.defineMethod (c$, "getFeedbackEnabled", 
function () {
return this.feedbackEnabled;
});
Clazz.defineMethod (c$, "getSelectedObject", 
function () {
var selection = this.viewer.getSelection ();
if (Clazz.instanceOf (selection, org.eclipse.jface.viewers.IStructuredSelection) && !selection.isEmpty ()) {
var structured = selection;
return structured.getFirstElement ();
}return null;
});
Clazz.defineMethod (c$, "getViewer", 
function () {
return this.viewer;
});
Clazz.defineMethod (c$, "handleException", 
function (exception, event) {
exception.printStackTrace ();
event.detail = 0;
}, "Throwable,$wt.dnd.DropTargetEvent");
Clazz.defineMethod (c$, "setFeedback", 
($fz = function (event, location) {
if (this.feedbackEnabled) {
switch (location) {
case 1:
event.feedback = 2;
break;
case 2:
event.feedback = 4;
break;
case 3:
default:
event.feedback = 1;
break;
}
}if (this.scrollExpandEnabled) event.feedback |= 24;
}, $fz.isPrivate = true, $fz), "$wt.dnd.DropTargetEvent,~N");
Clazz.defineMethod (c$, "setFeedbackEnabled", 
function (value) {
this.feedbackEnabled = value;
}, "~B");
Clazz.defineMethod (c$, "setScrollExpandEnabled", 
function (value) {
this.scrollExpandEnabled = value;
}, "~B");
Clazz.defineStatics (c$,
"LOCATION_BEFORE", 1,
"LOCATION_AFTER", 2,
"LOCATION_ON", 3,
"LOCATION_NONE", 4);
});
