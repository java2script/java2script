Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["org.eclipse.jface.viewers.CellEditor"], "org.eclipse.jface.viewers.ComboBoxCellEditor", ["java.text.MessageFormat", "org.eclipse.jface.util.Assert", "$wt.custom.CCombo", "$wt.events.FocusAdapter", "$.KeyAdapter", "$.SelectionAdapter", "$.TraverseListener", "$wt.graphics.GC"], function () {
c$ = Clazz.decorateAsClass (function () {
this.items = null;
this.selection = 0;
this.comboBox = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "ComboBoxCellEditor", org.eclipse.jface.viewers.CellEditor);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.jface.viewers.ComboBoxCellEditor, []);
this.setStyle (0);
});
Clazz.makeConstructor (c$, 
function (parent, items) {
this.construct (parent, items, 0);
}, "$wt.widgets.Composite,~A");
Clazz.makeConstructor (c$, 
function (parent, items, style) {
Clazz.superConstructor (this, org.eclipse.jface.viewers.ComboBoxCellEditor, [parent, style]);
this.setItems (items);
}, "$wt.widgets.Composite,~A,~N");
Clazz.defineMethod (c$, "getItems", 
function () {
return this.items;
});
Clazz.defineMethod (c$, "setItems", 
function (items) {
org.eclipse.jface.util.Assert.isNotNull (items);
this.items = items;
this.populateComboBoxItems ();
}, "~A");
Clazz.overrideMethod (c$, "createControl", 
function (parent) {
this.comboBox =  new $wt.custom.CCombo (parent, this.getStyle ());
this.comboBox.setFont (parent.getFont ());
this.comboBox.addKeyListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.ComboBoxCellEditor$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "ComboBoxCellEditor$1", $wt.events.KeyAdapter);
Clazz.overrideMethod (c$, "keyPressed", 
function (e) {
this.b$["org.eclipse.jface.viewers.ComboBoxCellEditor"].keyReleaseOccured (e);
}, "$wt.events.KeyEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.ComboBoxCellEditor$1, i$, v$);
}) (this, null));
this.comboBox.addSelectionListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.ComboBoxCellEditor$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "ComboBoxCellEditor$2", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetDefaultSelected", 
function (event) {
this.b$["org.eclipse.jface.viewers.ComboBoxCellEditor"].applyEditorValueAndDeactivate ();
}, "$wt.events.SelectionEvent");
Clazz.overrideMethod (c$, "widgetSelected", 
function (event) {
this.b$["org.eclipse.jface.viewers.ComboBoxCellEditor"].selection = this.b$["org.eclipse.jface.viewers.ComboBoxCellEditor"].comboBox.getSelectionIndex ();
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.ComboBoxCellEditor$2, i$, v$);
}) (this, null));
this.comboBox.addTraverseListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.ComboBoxCellEditor$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "ComboBoxCellEditor$3", null, $wt.events.TraverseListener);
Clazz.overrideMethod (c$, "keyTraversed", 
function (e) {
if (e.detail == 2 || e.detail == 4) {
e.doit = false;
}}, "$wt.events.TraverseEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.ComboBoxCellEditor$3, i$, v$);
}) (this, null));
this.comboBox.addFocusListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.ComboBoxCellEditor$4")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "ComboBoxCellEditor$4", $wt.events.FocusAdapter);
Clazz.overrideMethod (c$, "focusLost", 
function (e) {
this.b$["org.eclipse.jface.viewers.ComboBoxCellEditor"].focusLost ();
}, "$wt.events.FocusEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.ComboBoxCellEditor$4, i$, v$);
}) (this, null));
return this.comboBox;
}, "$wt.widgets.Composite");
Clazz.overrideMethod (c$, "doGetValue", 
function () {
return  new Integer (this.selection);
});
Clazz.overrideMethod (c$, "doSetFocus", 
function () {
this.comboBox.setFocus ();
});
Clazz.defineMethod (c$, "getLayoutData", 
function () {
var layoutData = Clazz.superCall (this, org.eclipse.jface.viewers.ComboBoxCellEditor, "getLayoutData", []);
if ((this.comboBox == null) || this.comboBox.isDisposed ()) layoutData.minimumWidth = 60;
 else {
var gc =  new $wt.graphics.GC (this.comboBox);
layoutData.minimumWidth = (gc.getFontMetrics ().getAverageCharWidth () * 10) + 10;
gc.dispose ();
}return layoutData;
});
Clazz.overrideMethod (c$, "doSetValue", 
function (value) {
org.eclipse.jface.util.Assert.isTrue (this.comboBox != null && (Clazz.instanceOf (value, Integer)));
this.selection = (value).intValue ();
this.comboBox.select (this.selection);
}, "~O");
Clazz.defineMethod (c$, "populateComboBoxItems", 
($fz = function () {
if (this.comboBox != null && this.items != null) {
this.comboBox.removeAll ();
for (var i = 0; i < this.items.length; i++) this.comboBox.add (this.items[i], i);

this.setValueValid (true);
this.selection = 0;
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "applyEditorValueAndDeactivate", 
function () {
this.selection = this.comboBox.getSelectionIndex ();
var newValue = this.doGetValue ();
this.markDirty ();
var isValid = this.isCorrect (newValue);
this.setValueValid (isValid);
if (!isValid) {
this.setErrorMessage (java.text.MessageFormat.format (this.getErrorMessage (), [this.items[this.selection]]));
}this.fireApplyEditorValue ();
this.deactivate ();
});
Clazz.overrideMethod (c$, "focusLost", 
function () {
if (this.isActivated ()) {
this.applyEditorValueAndDeactivate ();
}});
Clazz.overrideMethod (c$, "keyReleaseOccured", 
function (keyEvent) {
if ((keyEvent.character).charCodeAt (0) == ('\u001b').charCodeAt (0)) {
this.fireCancelEditor ();
} else if ((keyEvent.character).charCodeAt (0) == ('\t').charCodeAt (0)) {
this.applyEditorValueAndDeactivate ();
}}, "$wt.events.KeyEvent");
Clazz.defineStatics (c$,
"$defaultStyle", 0);
});
