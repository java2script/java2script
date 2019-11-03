Clazz.declarePackage ("org.eclipse.jface.preference");
Clazz.load (null, "org.eclipse.jface.preference.ColorSelector", ["org.eclipse.jface.resource.JFaceResources", "org.eclipse.jface.util.ListenerList", "$.PropertyChangeEvent", "$wt.accessibility.AccessibleAdapter", "$wt.events.DisposeListener", "$.SelectionAdapter", "$wt.graphics.Color", "$.GC", "$.Image", "$.Point", "$wt.widgets.Button", "$.ColorDialog"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fButton = null;
this.fColor = null;
this.fColorValue = null;
this.fExtent = null;
this.fImage = null;
this.listeners = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.preference, "ColorSelector");
Clazz.makeConstructor (c$, 
function (parent) {
this.listeners =  new org.eclipse.jface.util.ListenerList ();
this.fButton =  new $wt.widgets.Button (parent, 8);
this.fExtent = this.computeImageSize (parent);
this.fImage =  new $wt.graphics.Image (parent.getDisplay (), this.fExtent.x, this.fExtent.y);
var gc =  new $wt.graphics.GC (this.fImage);
gc.setBackground (this.fButton.getBackground ());
gc.fillRectangle (0, 0, this.fExtent.x, this.fExtent.y);
gc.dispose ();
this.fButton.setImage (this.fImage);
this.fButton.addSelectionListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.ColorSelector$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "ColorSelector$1", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (event) {
var colorDialog =  new $wt.widgets.ColorDialog (this.b$["org.eclipse.jface.preference.ColorSelector"].fButton.getShell ());
colorDialog.setRGB (this.b$["org.eclipse.jface.preference.ColorSelector"].fColorValue);
DialogSync2Async.block (colorDialog, this, function () {
var newColor = colorDialog.dialogReturn;
if (newColor != null) {
var oldValue = this.b$["org.eclipse.jface.preference.ColorSelector"].fColorValue;
this.b$["org.eclipse.jface.preference.ColorSelector"].fColorValue = newColor;
var finalListeners = this.b$["org.eclipse.jface.preference.ColorSelector"].listeners.getListeners ();
if (finalListeners.length > 0) {
var pEvent =  new org.eclipse.jface.util.PropertyChangeEvent (this, "colorValue", oldValue, newColor);
for (var i = 0; i < finalListeners.length; ++i) {
var listener = finalListeners[i];
listener.propertyChange (pEvent);
}
}this.b$["org.eclipse.jface.preference.ColorSelector"].updateColorImage ();
}});
return;
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.ColorSelector$1, i$, v$);
}) (this, null));
this.fButton.addDisposeListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.ColorSelector$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "ColorSelector$2", null, $wt.events.DisposeListener);
Clazz.overrideMethod (c$, "widgetDisposed", 
function (event) {
if (this.b$["org.eclipse.jface.preference.ColorSelector"].fImage != null) {
this.b$["org.eclipse.jface.preference.ColorSelector"].fImage.dispose ();
this.b$["org.eclipse.jface.preference.ColorSelector"].fImage = null;
}if (this.b$["org.eclipse.jface.preference.ColorSelector"].fColor != null) {
this.b$["org.eclipse.jface.preference.ColorSelector"].fColor.dispose ();
this.b$["org.eclipse.jface.preference.ColorSelector"].fColor = null;
}}, "$wt.events.DisposeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.ColorSelector$2, i$, v$);
}) (this, null));
this.fButton.getAccessible ().addAccessibleListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.ColorSelector$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "ColorSelector$3", $wt.accessibility.AccessibleAdapter);
Clazz.overrideMethod (c$, "getName", 
function (e) {
e.result = org.eclipse.jface.resource.JFaceResources.getString ("ColorSelector.Name");
}, "$wt.accessibility.AccessibleEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.ColorSelector$3, i$, v$);
}) (this, null));
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "addListener", 
function (listener) {
this.listeners.add (listener);
}, "org.eclipse.jface.util.IPropertyChangeListener");
Clazz.defineMethod (c$, "computeImageSize", 
($fz = function (window) {
var gc =  new $wt.graphics.GC (window);
var f = org.eclipse.jface.resource.JFaceResources.getFontRegistry ().get ("org.eclipse.jface.defaultfont");
gc.setFont (f);
var height = gc.getFontMetrics ().getHeight ();
gc.dispose ();
var p =  new $wt.graphics.Point (height * 3 - 6, height);
return p;
}, $fz.isPrivate = true, $fz), "$wt.widgets.Control");
Clazz.defineMethod (c$, "getButton", 
function () {
return this.fButton;
});
Clazz.defineMethod (c$, "getColorValue", 
function () {
return this.fColorValue;
});
Clazz.defineMethod (c$, "removeListener", 
function (listener) {
this.listeners.remove (listener);
}, "org.eclipse.jface.util.IPropertyChangeListener");
Clazz.defineMethod (c$, "setColorValue", 
function (rgb) {
this.fColorValue = rgb;
this.updateColorImage ();
}, "$wt.graphics.RGB");
Clazz.defineMethod (c$, "setEnabled", 
function (state) {
this.getButton ().setEnabled (state);
}, "~B");
Clazz.defineMethod (c$, "updateColorImage", 
function () {
var display = this.fButton.getDisplay ();
var gc =  new $wt.graphics.GC (this.fImage);
gc.setForeground (display.getSystemColor (2));
gc.drawRectangle (0, 2, this.fExtent.x - 1, this.fExtent.y - 4);
if (this.fColor != null) this.fColor.dispose ();
this.fColor =  new $wt.graphics.Color (display, this.fColorValue);
gc.setBackground (this.fColor);
gc.fillRectangle (1, 3, this.fExtent.x - 2, this.fExtent.y - 5);
gc.dispose ();
this.fButton.setImage (this.fImage);
});
Clazz.defineStatics (c$,
"PROP_COLORCHANGE", "colorValue");
});
