Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["org.eclipse.jface.util.ListenerList"], "org.eclipse.jface.viewers.CellEditor", ["org.eclipse.jface.util.Assert", "$.PropertyChangeEvent", "$.SafeRunnable"], function () {
c$ = Clazz.decorateAsClass (function () {
this.listeners = null;
this.propertyChangeListeners = null;
this.valid = false;
this.validator = null;
this.errorMessage = null;
this.dirty = false;
this.control = null;
this.style = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "CellEditor");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.horizontalAlignment = 16384;
this.grabHorizontal = true;
this.minimumWidth = 50;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers.CellEditor, "LayoutData");
c$ = Clazz.p0p ();
Clazz.prepareFields (c$, function () {
this.listeners =  new org.eclipse.jface.util.ListenerList (3);
this.propertyChangeListeners =  new org.eclipse.jface.util.ListenerList (3);
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (parent) {
this.construct (parent, 0);
}, "$wt.widgets.Composite");
Clazz.makeConstructor (c$, 
function (parent, style) {
this.style = style;
this.create (parent);
}, "$wt.widgets.Composite,~N");
Clazz.defineMethod (c$, "activate", 
function () {
});
Clazz.defineMethod (c$, "addListener", 
function (listener) {
this.listeners.add (listener);
}, "org.eclipse.jface.viewers.ICellEditorListener");
Clazz.defineMethod (c$, "addPropertyChangeListener", 
function (listener) {
this.propertyChangeListeners.add (listener);
}, "org.eclipse.jface.util.IPropertyChangeListener");
Clazz.defineMethod (c$, "create", 
function (parent) {
org.eclipse.jface.util.Assert.isTrue (this.control == null);
this.control = this.createControl (parent);
this.deactivate ();
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "deactivate", 
function () {
if (this.control != null && !this.control.isDisposed ()) this.control.setVisible (false);
});
Clazz.defineMethod (c$, "dispose", 
function () {
if (this.control != null && !this.control.isDisposed ()) {
this.control.dispose ();
}this.control = null;
});
Clazz.defineMethod (c$, "fireApplyEditorValue", 
function () {
var array = this.listeners.getListeners ();
for (var i = 0; i < array.length; i++) {
var l = array[i];
org.eclipse.jface.util.SafeRunnable.run ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.CellEditor$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "CellEditor$1", org.eclipse.jface.util.SafeRunnable);
Clazz.defineMethod (c$, "run", 
function () {
this.f$.l.applyEditorValue ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.CellEditor$1, i$, v$);
}) (this, Clazz.cloneFinals ("l", l)));
}
});
Clazz.defineMethod (c$, "fireCancelEditor", 
function () {
var array = this.listeners.getListeners ();
for (var i = 0; i < array.length; i++) {
var l = array[i];
org.eclipse.jface.util.SafeRunnable.run ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.CellEditor$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "CellEditor$2", org.eclipse.jface.util.SafeRunnable);
Clazz.defineMethod (c$, "run", 
function () {
this.f$.l.cancelEditor ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.CellEditor$2, i$, v$);
}) (this, Clazz.cloneFinals ("l", l)));
}
});
Clazz.defineMethod (c$, "fireEditorValueChanged", 
function (oldValidState, newValidState) {
var array = this.listeners.getListeners ();
for (var i = 0; i < array.length; i++) {
var l = array[i];
org.eclipse.jface.util.SafeRunnable.run ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.CellEditor$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "CellEditor$3", org.eclipse.jface.util.SafeRunnable);
Clazz.defineMethod (c$, "run", 
function () {
this.f$.l.editorValueChanged (this.f$.oldValidState, this.f$.newValidState);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.CellEditor$3, i$, v$);
}) (this, Clazz.cloneFinals ("l", l, "oldValidState", oldValidState, "newValidState", newValidState)));
}
}, "~B,~B");
Clazz.defineMethod (c$, "fireEnablementChanged", 
function (actionId) {
var array = this.propertyChangeListeners.getListeners ();
for (var i = 0; i < array.length; i++) {
var l = array[i];
org.eclipse.jface.util.SafeRunnable.run ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.CellEditor$4")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "CellEditor$4", org.eclipse.jface.util.SafeRunnable);
Clazz.defineMethod (c$, "run", 
function () {
this.f$.l.propertyChange ( new org.eclipse.jface.util.PropertyChangeEvent (this, this.f$.actionId, null, null));
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.CellEditor$4, i$, v$);
}) (this, Clazz.cloneFinals ("l", l, "actionId", actionId)));
}
}, "~S");
Clazz.defineMethod (c$, "setStyle", 
function (style) {
this.style = style;
}, "~N");
Clazz.defineMethod (c$, "getStyle", 
function () {
return this.style;
});
Clazz.defineMethod (c$, "getControl", 
function () {
return this.control;
});
Clazz.defineMethod (c$, "getErrorMessage", 
function () {
return this.errorMessage;
});
Clazz.defineMethod (c$, "getLayoutData", 
function () {
var result =  new org.eclipse.jface.viewers.CellEditor.LayoutData ();
var control = this.getControl ();
if (control != null) {
result.minimumWidth = control.computeSize (-1, -1, true).x;
}return result;
});
Clazz.defineMethod (c$, "getValidator", 
function () {
return this.validator;
});
Clazz.defineMethod (c$, "getValue", 
function () {
if (!this.valid) return null;
return this.doGetValue ();
});
Clazz.defineMethod (c$, "isActivated", 
function () {
return this.control != null && this.control.isVisible ();
});
Clazz.defineMethod (c$, "isCopyEnabled", 
function () {
return false;
});
Clazz.defineMethod (c$, "isCorrect", 
function (value) {
this.errorMessage = null;
if (this.validator == null) return true;
this.errorMessage = this.validator.isValid (value);
return (this.errorMessage == null || this.errorMessage.equals (""));
}, "~O");
Clazz.defineMethod (c$, "isCutEnabled", 
function () {
return false;
});
Clazz.defineMethod (c$, "isDeleteEnabled", 
function () {
return false;
});
Clazz.defineMethod (c$, "isDirty", 
function () {
return this.dirty;
});
Clazz.defineMethod (c$, "markDirty", 
function () {
this.dirty = true;
});
Clazz.defineMethod (c$, "isFindEnabled", 
function () {
return false;
});
Clazz.defineMethod (c$, "isPasteEnabled", 
function () {
return false;
});
Clazz.defineMethod (c$, "isRedoEnabled", 
function () {
return false;
});
Clazz.defineMethod (c$, "isSelectAllEnabled", 
function () {
return false;
});
Clazz.defineMethod (c$, "isUndoEnabled", 
function () {
return false;
});
Clazz.defineMethod (c$, "isValueValid", 
function () {
return this.valid;
});
Clazz.defineMethod (c$, "keyReleaseOccured", 
function (keyEvent) {
if ((keyEvent.character).charCodeAt (0) == ('\u001b').charCodeAt (0)) {
this.fireCancelEditor ();
} else if ((keyEvent.character).charCodeAt (0) == ('\r').charCodeAt (0)) {
this.fireApplyEditorValue ();
this.deactivate ();
}}, "$wt.events.KeyEvent");
Clazz.defineMethod (c$, "focusLost", 
function () {
if (this.isActivated ()) {
this.fireApplyEditorValue ();
this.deactivate ();
}});
Clazz.defineMethod (c$, "performCopy", 
function () {
});
Clazz.defineMethod (c$, "performCut", 
function () {
});
Clazz.defineMethod (c$, "performDelete", 
function () {
});
Clazz.defineMethod (c$, "performFind", 
function () {
});
Clazz.defineMethod (c$, "performPaste", 
function () {
});
Clazz.defineMethod (c$, "performRedo", 
function () {
});
Clazz.defineMethod (c$, "performSelectAll", 
function () {
});
Clazz.defineMethod (c$, "performUndo", 
function () {
});
Clazz.defineMethod (c$, "removeListener", 
function (listener) {
this.listeners.remove (listener);
}, "org.eclipse.jface.viewers.ICellEditorListener");
Clazz.defineMethod (c$, "removePropertyChangeListener", 
function (listener) {
this.propertyChangeListeners.remove (listener);
}, "org.eclipse.jface.util.IPropertyChangeListener");
Clazz.defineMethod (c$, "setErrorMessage", 
function (message) {
this.errorMessage = message;
}, "~S");
Clazz.defineMethod (c$, "setFocus", 
function () {
this.doSetFocus ();
});
Clazz.defineMethod (c$, "setValidator", 
function (validator) {
this.validator = validator;
}, "org.eclipse.jface.viewers.ICellEditorValidator");
Clazz.defineMethod (c$, "setValue", 
function (value) {
this.valid = this.isCorrect (value);
this.dirty = false;
this.doSetValue (value);
}, "~O");
Clazz.defineMethod (c$, "setValueValid", 
function (valid) {
this.valid = valid;
}, "~B");
Clazz.defineMethod (c$, "valueChanged", 
function (oldValidState, newValidState) {
this.valid = newValidState;
this.dirty = true;
this.fireEditorValueChanged (oldValidState, newValidState);
}, "~B,~B");
Clazz.defineStatics (c$,
"defaultStyle", 0,
"COPY", "copy",
"CUT", "cut",
"DELETE", "delete",
"FIND", "find",
"PASTE", "paste",
"REDO", "redo",
"SELECT_ALL", "selectall",
"UNDO", "undo");
});
