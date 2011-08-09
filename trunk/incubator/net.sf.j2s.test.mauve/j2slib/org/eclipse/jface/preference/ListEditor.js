Clazz.declarePackage ("org.eclipse.jface.preference");
Clazz.load (["org.eclipse.jface.preference.FieldEditor"], "org.eclipse.jface.preference.ListEditor", ["org.eclipse.jface.resource.JFaceResources", "org.eclipse.jface.util.Assert", "$wt.events.DisposeListener", "$.SelectionAdapter", "$wt.layout.GridData", "$.GridLayout", "$wt.widgets.Button", "$.Composite", "$.List"], function () {
c$ = Clazz.decorateAsClass (function () {
this.list = null;
this.buttonBox = null;
this.addButton = null;
this.removeButton = null;
this.upButton = null;
this.downButton = null;
this.selectionListener = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.preference, "ListEditor", org.eclipse.jface.preference.FieldEditor);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.jface.preference.ListEditor, []);
});
Clazz.makeConstructor (c$, 
function (name, labelText, parent) {
Clazz.superConstructor (this, org.eclipse.jface.preference.ListEditor, []);
this.init (name, labelText);
this.createControl (parent);
}, "~S,~S,$wt.widgets.Composite");
Clazz.defineMethod (c$, "addPressed", 
($fz = function () {
this.setPresentsDefaultValue (false);
var input = this.getNewInputObject ();
if (input != null) {
var index = this.list.getSelectionIndex ();
if (index >= 0) this.list.add (input, index + 1);
 else this.list.add (input, 0);
this.selectionChanged ();
}}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "adjustForNumColumns", 
function (numColumns) {
var control = this.getLabelControl ();
(control.getLayoutData ()).horizontalSpan = numColumns;
(this.list.getLayoutData ()).horizontalSpan = numColumns - 1;
}, "~N");
Clazz.defineMethod (c$, "createButtons", 
($fz = function (box) {
this.addButton = this.createPushButton (box, "ListEditor.add");
this.removeButton = this.createPushButton (box, "ListEditor.remove");
this.upButton = this.createPushButton (box, "ListEditor.up");
this.downButton = this.createPushButton (box, "ListEditor.down");
}, $fz.isPrivate = true, $fz), "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createPushButton", 
($fz = function (parent, key) {
var button =  new $wt.widgets.Button (parent, 8);
button.setText (org.eclipse.jface.resource.JFaceResources.getString (key));
button.setFont (parent.getFont ());
var data =  new $wt.layout.GridData (768);
var widthHint = this.convertHorizontalDLUsToPixels (button, 61);
data.widthHint = Math.max (widthHint, button.computeSize (-1, -1, true).x);
button.setLayoutData (data);
button.addSelectionListener (this.getSelectionListener ());
return button;
}, $fz.isPrivate = true, $fz), "$wt.widgets.Composite,~S");
Clazz.defineMethod (c$, "createSelectionListener", 
function () {
this.selectionListener = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.ListEditor$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "ListEditor$1", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (event) {
var widget = event.widget;
if (widget === this.b$["org.eclipse.jface.preference.ListEditor"].addButton) {
this.b$["org.eclipse.jface.preference.ListEditor"].addPressed ();
} else if (widget === this.b$["org.eclipse.jface.preference.ListEditor"].removeButton) {
this.b$["org.eclipse.jface.preference.ListEditor"].removePressed ();
} else if (widget === this.b$["org.eclipse.jface.preference.ListEditor"].upButton) {
this.b$["org.eclipse.jface.preference.ListEditor"].upPressed ();
} else if (widget === this.b$["org.eclipse.jface.preference.ListEditor"].downButton) {
this.b$["org.eclipse.jface.preference.ListEditor"].downPressed ();
} else if (widget === this.b$["org.eclipse.jface.preference.ListEditor"].list) {
this.b$["org.eclipse.jface.preference.ListEditor"].selectionChanged ();
}}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.ListEditor$1, i$, v$);
}) (this, null);
});
Clazz.overrideMethod (c$, "doFillIntoGrid", 
function (parent, numColumns) {
var control = this.getLabelControl (parent);
var gd =  new $wt.layout.GridData ();
gd.horizontalSpan = numColumns;
control.setLayoutData (gd);
this.list = this.getListControl (parent);
gd =  new $wt.layout.GridData (768);
gd.verticalAlignment = 4;
gd.horizontalSpan = numColumns - 1;
gd.grabExcessHorizontalSpace = true;
this.list.setLayoutData (gd);
this.buttonBox = this.getButtonBoxControl (parent);
gd =  new $wt.layout.GridData ();
gd.verticalAlignment = 1;
this.buttonBox.setLayoutData (gd);
}, "$wt.widgets.Composite,~N");
Clazz.overrideMethod (c$, "doLoad", 
function () {
if (this.list != null) {
var s = this.getPreferenceStore ().getString (this.getPreferenceName ());
var array = this.parseString (s);
for (var i = 0; i < array.length; i++) {
this.list.add (array[i]);
}
}});
Clazz.overrideMethod (c$, "doLoadDefault", 
function () {
if (this.list != null) {
this.list.removeAll ();
var s = this.getPreferenceStore ().getDefaultString (this.getPreferenceName ());
var array = this.parseString (s);
for (var i = 0; i < array.length; i++) {
this.list.add (array[i]);
}
}});
Clazz.overrideMethod (c$, "doStore", 
function () {
var s = this.createList (this.list.getItems ());
if (s != null) this.getPreferenceStore ().setValue (this.getPreferenceName (), s);
});
Clazz.defineMethod (c$, "downPressed", 
($fz = function () {
this.swap (false);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getButtonBoxControl", 
function (parent) {
if (this.buttonBox == null) {
this.buttonBox =  new $wt.widgets.Composite (parent, 0);
var layout =  new $wt.layout.GridLayout ();
layout.marginWidth = 0;
this.buttonBox.setLayout (layout);
this.createButtons (this.buttonBox);
this.buttonBox.addDisposeListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.ListEditor$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "ListEditor$2", null, $wt.events.DisposeListener);
Clazz.overrideMethod (c$, "widgetDisposed", 
function (event) {
this.b$["org.eclipse.jface.preference.ListEditor"].addButton = null;
this.b$["org.eclipse.jface.preference.ListEditor"].removeButton = null;
this.b$["org.eclipse.jface.preference.ListEditor"].upButton = null;
this.b$["org.eclipse.jface.preference.ListEditor"].downButton = null;
this.b$["org.eclipse.jface.preference.ListEditor"].buttonBox = null;
}, "$wt.events.DisposeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.ListEditor$2, i$, v$);
}) (this, null));
} else {
this.checkParent (this.buttonBox, parent);
}this.selectionChanged ();
return this.buttonBox;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "getListControl", 
function (parent) {
if (this.list == null) {
this.list =  new $wt.widgets.List (parent, 2820);
this.list.setFont (parent.getFont ());
this.list.addSelectionListener (this.getSelectionListener ());
this.list.addDisposeListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.ListEditor$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "ListEditor$3", null, $wt.events.DisposeListener);
Clazz.overrideMethod (c$, "widgetDisposed", 
function (event) {
this.b$["org.eclipse.jface.preference.ListEditor"].list = null;
}, "$wt.events.DisposeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.ListEditor$3, i$, v$);
}) (this, null));
} else {
this.checkParent (this.list, parent);
}return this.list;
}, "$wt.widgets.Composite");
Clazz.overrideMethod (c$, "getNumberOfControls", 
function () {
return 2;
});
Clazz.defineMethod (c$, "getSelectionListener", 
($fz = function () {
if (this.selectionListener == null) this.createSelectionListener ();
return this.selectionListener;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getShell", 
function () {
if (this.addButton == null) return null;
return this.addButton.getShell ();
});
Clazz.defineMethod (c$, "removePressed", 
($fz = function () {
this.setPresentsDefaultValue (false);
var index = this.list.getSelectionIndex ();
if (index >= 0) {
this.list.remove (index);
this.selectionChanged ();
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "selectionChanged", 
($fz = function () {
var index = this.list.getSelectionIndex ();
var size = this.list.getItemCount ();
this.removeButton.setEnabled (index >= 0);
this.upButton.setEnabled (size > 1 && index > 0);
this.downButton.setEnabled (size > 1 && index >= 0 && index < size - 1);
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "setFocus", 
function () {
if (this.list != null) {
this.list.setFocus ();
}});
Clazz.defineMethod (c$, "swap", 
($fz = function (up) {
this.setPresentsDefaultValue (false);
var index = this.list.getSelectionIndex ();
var target = up ? index - 1 : index + 1;
if (index >= 0) {
var selection = this.list.getSelection ();
org.eclipse.jface.util.Assert.isTrue (selection.length == 1);
this.list.remove (index);
this.list.add (selection[0], target);
this.list.setSelection (target);
}this.selectionChanged ();
}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "upPressed", 
($fz = function () {
this.swap (true);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setEnabled", 
function (enabled, parent) {
Clazz.superCall (this, org.eclipse.jface.preference.ListEditor, "setEnabled", [enabled, parent]);
this.getListControl (parent).setEnabled (enabled);
this.addButton.setEnabled (enabled);
this.removeButton.setEnabled (enabled);
this.upButton.setEnabled (enabled);
this.downButton.setEnabled (enabled);
}, "~B,$wt.widgets.Composite");
});
