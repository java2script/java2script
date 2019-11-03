Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["org.eclipse.jface.viewers.CellEditor"], "org.eclipse.jface.viewers.TextCellEditor", ["java.text.MessageFormat", "org.eclipse.jface.util.Assert", "$wt.events.FocusAdapter", "$.KeyAdapter", "$.ModifyListener", "$.MouseAdapter", "$.SelectionAdapter", "$.TraverseListener", "$wt.widgets.Text"], function () {
c$ = Clazz.decorateAsClass (function () {
this.text = null;
this.modifyListener = null;
this.isSelection = false;
this.isDeleteable = false;
this.isSelectable = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "TextCellEditor", org.eclipse.jface.viewers.CellEditor);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.jface.viewers.TextCellEditor, []);
this.setStyle (4);
});
Clazz.makeConstructor (c$, 
function (parent) {
this.construct (parent, 4);
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "checkDeleteable", 
($fz = function () {
var oldIsDeleteable = this.isDeleteable;
this.isDeleteable = this.isDeleteEnabled ();
if (oldIsDeleteable != this.isDeleteable) {
this.fireEnablementChanged ("delete");
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "checkSelectable", 
($fz = function () {
var oldIsSelectable = this.isSelectable;
this.isSelectable = this.isSelectAllEnabled ();
if (oldIsSelectable != this.isSelectable) {
this.fireEnablementChanged ("selectall");
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "checkSelection", 
($fz = function () {
var oldIsSelection = this.isSelection;
this.isSelection = this.text.getSelectionCount () > 0;
if (oldIsSelection != this.isSelection) {
this.fireEnablementChanged ("copy");
this.fireEnablementChanged ("cut");
}}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "createControl", 
function (parent) {
this.text =  new $wt.widgets.Text (parent, this.getStyle ());
this.text.addSelectionListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.TextCellEditor$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "TextCellEditor$1", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetDefaultSelected", 
function (e) {
this.b$["org.eclipse.jface.viewers.TextCellEditor"].handleDefaultSelection (e);
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.TextCellEditor$1, i$, v$);
}) (this, null));
this.text.addKeyListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.TextCellEditor$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "TextCellEditor$2", $wt.events.KeyAdapter);
Clazz.overrideMethod (c$, "keyPressed", 
function (e) {
this.b$["org.eclipse.jface.viewers.TextCellEditor"].keyReleaseOccured (e);
if ((this.b$["org.eclipse.jface.viewers.TextCellEditor"].getControl () == null) || this.b$["org.eclipse.jface.viewers.TextCellEditor"].getControl ().isDisposed ()) return ;
this.b$["org.eclipse.jface.viewers.TextCellEditor"].checkSelection ();
this.b$["org.eclipse.jface.viewers.TextCellEditor"].checkDeleteable ();
this.b$["org.eclipse.jface.viewers.TextCellEditor"].checkSelectable ();
}, "$wt.events.KeyEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.TextCellEditor$2, i$, v$);
}) (this, null));
this.text.addTraverseListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.TextCellEditor$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "TextCellEditor$3", null, $wt.events.TraverseListener);
Clazz.overrideMethod (c$, "keyTraversed", 
function (e) {
if (e.detail == 2 || e.detail == 4) {
e.doit = false;
}}, "$wt.events.TraverseEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.TextCellEditor$3, i$, v$);
}) (this, null));
this.text.addMouseListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.TextCellEditor$4")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "TextCellEditor$4", $wt.events.MouseAdapter);
Clazz.overrideMethod (c$, "mouseUp", 
function (e) {
this.b$["org.eclipse.jface.viewers.TextCellEditor"].checkSelection ();
this.b$["org.eclipse.jface.viewers.TextCellEditor"].checkDeleteable ();
this.b$["org.eclipse.jface.viewers.TextCellEditor"].checkSelectable ();
}, "$wt.events.MouseEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.TextCellEditor$4, i$, v$);
}) (this, null));
this.text.addFocusListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.TextCellEditor$5")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "TextCellEditor$5", $wt.events.FocusAdapter);
Clazz.overrideMethod (c$, "focusLost", 
function (e) {
this.b$["org.eclipse.jface.viewers.TextCellEditor"].focusLost ();
}, "$wt.events.FocusEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.TextCellEditor$5, i$, v$);
}) (this, null));
this.text.setFont (parent.getFont ());
this.text.setBackground (parent.getBackground ());
this.text.setText ("");
this.text.addModifyListener (this.getModifyListener ());
return this.text;
}, "$wt.widgets.Composite");
Clazz.overrideMethod (c$, "doGetValue", 
function () {
return this.text.getText ();
});
Clazz.overrideMethod (c$, "doSetFocus", 
function () {
if (this.text != null) {
this.text.selectAll ();
this.text.setFocus ();
this.checkSelection ();
this.checkDeleteable ();
this.checkSelectable ();
}});
Clazz.overrideMethod (c$, "doSetValue", 
function (value) {
org.eclipse.jface.util.Assert.isTrue (this.text != null && (Clazz.instanceOf (value, String)));
this.text.removeModifyListener (this.getModifyListener ());
this.text.setText (value);
this.text.addModifyListener (this.getModifyListener ());
}, "~O");
Clazz.defineMethod (c$, "editOccured", 
function (e) {
var value = this.text.getText ();
if (value == null) value = "";
var typedValue = value;
var oldValidState = this.isValueValid ();
var newValidState = this.isCorrect (typedValue);
if (typedValue == null && newValidState) org.eclipse.jface.util.Assert.isTrue (false, "Validator isn't limiting the cell editor's type range");
if (!newValidState) {
this.setErrorMessage (java.text.MessageFormat.format (this.getErrorMessage (), [value]));
}this.valueChanged (oldValidState, newValidState);
}, "$wt.events.ModifyEvent");
Clazz.overrideMethod (c$, "getLayoutData", 
function () {
return  new org.eclipse.jface.viewers.CellEditor.LayoutData ();
});
Clazz.defineMethod (c$, "getModifyListener", 
($fz = function () {
if (this.modifyListener == null) {
this.modifyListener = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.TextCellEditor$6")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "TextCellEditor$6", null, $wt.events.ModifyListener);
Clazz.overrideMethod (c$, "modifyText", 
function (e) {
this.b$["org.eclipse.jface.viewers.TextCellEditor"].editOccured (e);
}, "$wt.events.ModifyEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.TextCellEditor$6, i$, v$);
}) (this, null);
}return this.modifyListener;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "handleDefaultSelection", 
function (event) {
this.fireApplyEditorValue ();
this.deactivate ();
}, "$wt.events.SelectionEvent");
Clazz.overrideMethod (c$, "isCopyEnabled", 
function () {
if (this.text == null || this.text.isDisposed ()) return false;
return this.text.getSelectionCount () > 0;
});
Clazz.overrideMethod (c$, "isCutEnabled", 
function () {
if (this.text == null || this.text.isDisposed ()) return false;
return this.text.getSelectionCount () > 0;
});
Clazz.overrideMethod (c$, "isDeleteEnabled", 
function () {
if (this.text == null || this.text.isDisposed ()) return false;
return this.text.getSelectionCount () > 0 || this.text.getCaretPosition () < this.text.getCharCount ();
});
Clazz.overrideMethod (c$, "isPasteEnabled", 
function () {
if (this.text == null || this.text.isDisposed ()) return false;
return true;
});
Clazz.defineMethod (c$, "isSaveAllEnabled", 
function () {
if (this.text == null || this.text.isDisposed ()) return false;
return true;
});
Clazz.overrideMethod (c$, "isSelectAllEnabled", 
function () {
if (this.text == null || this.text.isDisposed ()) return false;
return this.text.getCharCount () > 0;
});
Clazz.defineMethod (c$, "keyReleaseOccured", 
function (keyEvent) {
if ((keyEvent.character).charCodeAt (0) == ('\r').charCodeAt (0)) {
if (this.text != null && !this.text.isDisposed () && (this.text.getStyle () & 2) != 0) {
if ((keyEvent.stateMask & 262144) != 0) {
Clazz.superCall (this, org.eclipse.jface.viewers.TextCellEditor, "keyReleaseOccured", [keyEvent]);
}}return ;
}Clazz.superCall (this, org.eclipse.jface.viewers.TextCellEditor, "keyReleaseOccured", [keyEvent]);
}, "$wt.events.KeyEvent");
Clazz.overrideMethod (c$, "performCopy", 
function () {
this.text.copy ();
});
Clazz.overrideMethod (c$, "performCut", 
function () {
this.text.cut ();
this.checkSelection ();
this.checkDeleteable ();
this.checkSelectable ();
});
Clazz.overrideMethod (c$, "performDelete", 
function () {
if (this.text.getSelectionCount () > 0) this.text.insert ("");
 else {
var pos = this.text.getCaretPosition ();
if (pos < this.text.getCharCount ()) {
this.text.setSelection (pos, pos + 1);
this.text.insert ("");
}}this.checkSelection ();
this.checkDeleteable ();
this.checkSelectable ();
});
Clazz.overrideMethod (c$, "performPaste", 
function () {
this.text.paste ();
this.checkSelection ();
this.checkDeleteable ();
this.checkSelectable ();
});
Clazz.overrideMethod (c$, "performSelectAll", 
function () {
this.text.selectAll ();
this.checkSelection ();
this.checkDeleteable ();
});
Clazz.defineStatics (c$,
"$defaultStyle", 4);
});
