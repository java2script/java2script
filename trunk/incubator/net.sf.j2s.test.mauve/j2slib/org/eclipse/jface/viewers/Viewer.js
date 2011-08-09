Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["org.eclipse.jface.viewers.IInputSelectionProvider", "org.eclipse.jface.util.ListenerList"], "org.eclipse.jface.viewers.Viewer", ["org.eclipse.jface.util.Assert", "$.SafeRunnable", "$wt.events.HelpListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.selectionChangedListeners = null;
this.helpListeners = null;
this.keys = null;
this.values = null;
this.helpHooked = false;
this.helpListener = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "Viewer", null, org.eclipse.jface.viewers.IInputSelectionProvider);
Clazz.prepareFields (c$, function () {
this.selectionChangedListeners =  new org.eclipse.jface.util.ListenerList (3);
this.helpListeners =  new org.eclipse.jface.util.ListenerList (1);
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "addHelpListener", 
function (listener) {
this.helpListeners.add (listener);
if (!this.helpHooked) {
var control = this.getControl ();
if (control != null && !control.isDisposed ()) {
if (this.helpListener == null) {
this.helpListener = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.Viewer$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "Viewer$1", null, $wt.events.HelpListener);
Clazz.defineMethod (c$, "helpRequested", 
function (event) {
this.b$["org.eclipse.jface.viewers.Viewer"].handleHelpRequest (event);
}, "$wt.events.HelpEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.Viewer$1, i$, v$);
}) (this, null);
}control.addHelpListener (this.helpListener);
this.helpHooked = true;
}}}, "$wt.events.HelpListener");
Clazz.overrideMethod (c$, "addSelectionChangedListener", 
function (listener) {
this.selectionChangedListeners.add (listener);
}, "org.eclipse.jface.viewers.ISelectionChangedListener");
Clazz.defineMethod (c$, "fireHelpRequested", 
function (event) {
var listeners = this.helpListeners.getListeners ();
for (var i = 0; i < listeners.length; ++i) {
(listeners[i]).helpRequested (event);
}
}, "$wt.events.HelpEvent");
Clazz.defineMethod (c$, "fireSelectionChanged", 
function (event) {
var listeners = this.selectionChangedListeners.getListeners ();
for (var i = 0; i < listeners.length; ++i) {
var l = listeners[i];
org.eclipse.jface.util.SafeRunnable.run ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.Viewer$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "Viewer$2", org.eclipse.jface.util.SafeRunnable);
Clazz.defineMethod (c$, "run", 
function () {
this.f$.l.selectionChanged (this.f$.event);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.Viewer$2, i$, v$);
}) (this, Clazz.cloneFinals ("l", l, "event", event)));
}
}, "org.eclipse.jface.viewers.SelectionChangedEvent");
Clazz.defineMethod (c$, "getData", 
function (key) {
org.eclipse.jface.util.Assert.isNotNull (key);
if (this.keys == null) return null;
for (var i = 0; i < this.keys.length; i++) {
if (this.keys[i].equals (key)) return this.values[i];
}
return null;
}, "~S");
Clazz.defineMethod (c$, "handleHelpRequest", 
function (event) {
var oldData = event.data;
event.data = this;
this.fireHelpRequested (event);
event.data = oldData;
}, "$wt.events.HelpEvent");
Clazz.defineMethod (c$, "inputChanged", 
function (input, oldInput) {
}, "~O,~O");
Clazz.defineMethod (c$, "removeHelpListener", 
function (listener) {
this.helpListeners.remove (listener);
if (this.helpListeners.size () == 0) {
var control = this.getControl ();
if (control != null && !control.isDisposed ()) {
control.removeHelpListener (this.helpListener);
this.helpHooked = false;
}}}, "$wt.events.HelpListener");
Clazz.overrideMethod (c$, "removeSelectionChangedListener", 
function (listener) {
this.selectionChangedListeners.remove (listener);
}, "org.eclipse.jface.viewers.ISelectionChangedListener");
Clazz.defineMethod (c$, "scrollDown", 
function (x, y) {
return null;
}, "~N,~N");
Clazz.defineMethod (c$, "scrollUp", 
function (x, y) {
return null;
}, "~N,~N");
Clazz.defineMethod (c$, "setData", 
function (key, value) {
org.eclipse.jface.util.Assert.isNotNull (key);
if (value == null) {
if (this.keys == null) return ;
var index = 0;
while (index < this.keys.length && !this.keys[index].equals (key)) index++;

if (index == this.keys.length) return ;
if (this.keys.length == 1) {
this.keys = null;
this.values = null;
} else {
var newKeys =  new Array (this.keys.length - 1);
var newValues =  new Array (this.values.length - 1);
System.arraycopy (this.keys, 0, newKeys, 0, index);
System.arraycopy (this.keys, index + 1, newKeys, index, newKeys.length - index);
System.arraycopy (this.values, 0, newValues, 0, index);
System.arraycopy (this.values, index + 1, newValues, index, newValues.length - index);
this.keys = newKeys;
this.values = newValues;
}return ;
}if (this.keys == null) {
this.keys = [key];
this.values = [value];
return ;
}for (var i = 0; i < this.keys.length; i++) {
if (this.keys[i].equals (key)) {
this.values[i] = value;
return ;
}}
var newKeys =  new Array (this.keys.length + 1);
var newValues =  new Array (this.values.length + 1);
System.arraycopy (this.keys, 0, newKeys, 0, this.keys.length);
System.arraycopy (this.values, 0, newValues, 0, this.values.length);
newKeys[this.keys.length] = key;
newValues[this.values.length] = value;
this.keys = newKeys;
this.values = newValues;
}, "~S,~O");
Clazz.defineMethod (c$, "setSelection", 
function (selection) {
this.setSelection (selection, false);
}, "org.eclipse.jface.viewers.ISelection");
Clazz.defineStatics (c$,
"WIDGET_DATA_KEY", "org.eclipse.jface.viewers.WIDGET_DATA");
});
