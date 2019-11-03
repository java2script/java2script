Clazz.declarePackage ("org.eclipse.jface.dialogs");
Clazz.load (["org.eclipse.jface.dialogs.IconAndMessageDialog"], "org.eclipse.jface.dialogs.ErrorDialog", ["java.lang.StringBuffer", "org.eclipse.jface.dialogs.IDialogConstants", "org.eclipse.jface.resource.JFaceResources", "$wt.dnd.Clipboard", "$.TextTransfer", "$wt.events.SelectionListener", "$wt.graphics.Point", "$wt.layout.GridData", "$.GridLayout", "$wt.widgets.Composite", "$.Label", "$.List", "$.Menu", "$.MenuItem"], function () {
c$ = Clazz.decorateAsClass (function () {
this.detailsButton = null;
this.title = null;
this.list = null;
this.listCreated = false;
this.displayMask = 0xFFFF;
this.status = null;
this.clipboard = null;
this.shouldIncludeTopLevelErrorInDetails = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.dialogs, "ErrorDialog", org.eclipse.jface.dialogs.IconAndMessageDialog);
Clazz.makeConstructor (c$, 
function (parentShell, dialogTitle, message, status, displayMask) {
Clazz.superConstructor (this, org.eclipse.jface.dialogs.ErrorDialog, [parentShell]);
this.title = dialogTitle == null ? org.eclipse.jface.resource.JFaceResources.getString ("Problem_Occurred") : dialogTitle;
this.message = message == null ? status.getMessage () : org.eclipse.jface.resource.JFaceResources.format ("Reason", [message, status.getMessage ()]);
this.status = status;
this.displayMask = displayMask;
this.setShellStyle (this.getShellStyle () | 16);
}, "$wt.widgets.Shell,~S,~S,org.eclipse.core.runtime.IStatus,~N");
Clazz.defineMethod (c$, "buttonPressed", 
function (id) {
if (id == 13) {
this.toggleDetailsArea ();
} else {
Clazz.superCall (this, org.eclipse.jface.dialogs.ErrorDialog, "buttonPressed", [id]);
}}, "~N");
Clazz.defineMethod (c$, "configureShell", 
function (shell) {
Clazz.superCall (this, org.eclipse.jface.dialogs.ErrorDialog, "configureShell", [shell]);
shell.setText (this.title);
}, "$wt.widgets.Shell");
Clazz.overrideMethod (c$, "createButtonsForButtonBar", 
function (parent) {
this.createButton (parent, 0, org.eclipse.jface.dialogs.IDialogConstants.OK_LABEL, true);
if (this.shouldShowDetailsButton ()) {
this.detailsButton = this.createButton (parent, 13, org.eclipse.jface.dialogs.IDialogConstants.SHOW_DETAILS_LABEL, false);
}}, "$wt.widgets.Composite");
Clazz.overrideMethod (c$, "createDialogArea", 
function (parent) {
this.createMessageArea (parent);
var composite =  new $wt.widgets.Composite (parent, 0);
var layout =  new $wt.layout.GridLayout ();
layout.marginHeight = this.convertVerticalDLUsToPixels (7);
layout.marginWidth = this.convertHorizontalDLUsToPixels (7);
layout.verticalSpacing = this.convertVerticalDLUsToPixels (4);
layout.horizontalSpacing = this.convertHorizontalDLUsToPixels (4);
layout.numColumns = 2;
composite.setLayout (layout);
var childData =  new $wt.layout.GridData (1808);
childData.horizontalSpan = 2;
composite.setLayoutData (childData);
composite.setFont (parent.getFont ());
return composite;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createDialogAndButtonArea", 
function (parent) {
Clazz.superCall (this, org.eclipse.jface.dialogs.ErrorDialog, "createDialogAndButtonArea", [parent]);
if (Clazz.instanceOf (this.dialogArea, $wt.widgets.Composite)) {
var dialogComposite = this.dialogArea;
if (dialogComposite.getChildren ().length == 0)  new $wt.widgets.Label (dialogComposite, 0);
}}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "getImage", 
function () {
if (this.status != null) {
if (this.status.getSeverity () == 2) return this.getWarningImage ();
if (this.status.getSeverity () == 1) return this.getInfoImage ();
}return this.getErrorImage ();
});
Clazz.defineMethod (c$, "createDropDownList", 
function (parent) {
this.list =  new $wt.widgets.List (parent, 2818);
this.populateList (this.list);
var data =  new $wt.layout.GridData (1808);
data.heightHint = this.list.getItemHeight () * 7;
data.horizontalSpan = 2;
this.list.setLayoutData (data);
this.list.setFont (parent.getFont ());
var copyMenu =  new $wt.widgets.Menu (this.list);
var copyItem =  new $wt.widgets.MenuItem (copyMenu, 0);
copyItem.addSelectionListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.dialogs.ErrorDialog$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.dialogs, "ErrorDialog$1", null, $wt.events.SelectionListener);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
this.b$["org.eclipse.jface.dialogs.ErrorDialog"].copyToClipboard ();
}, "$wt.events.SelectionEvent");
Clazz.overrideMethod (c$, "widgetDefaultSelected", 
function (e) {
this.b$["org.eclipse.jface.dialogs.ErrorDialog"].copyToClipboard ();
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.dialogs.ErrorDialog$1, i$, v$);
}) (this, null));
copyItem.setText (org.eclipse.jface.resource.JFaceResources.getString ("copy"));
this.list.setMenu (copyMenu);
this.listCreated = true;
return this.list;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "open", 
function () {
if (!org.eclipse.jface.dialogs.ErrorDialog.AUTOMATED_MODE && org.eclipse.jface.dialogs.ErrorDialog.shouldDisplay (this.status, this.displayMask)) {
return Clazz.superCall (this, org.eclipse.jface.dialogs.ErrorDialog, "open", []);
}this.setReturnCode (0);
return 0;
});
c$.openError = Clazz.defineMethod (c$, "openError", 
function (parent, dialogTitle, message, status) {
return org.eclipse.jface.dialogs.ErrorDialog.openError (parent, dialogTitle, message, status, 7);
}, "$wt.widgets.Shell,~S,~S,org.eclipse.core.runtime.IStatus");
c$.openError = Clazz.defineMethod (c$, "openError", 
function (parentShell, title, message, status, displayMask) {
var dialog =  new org.eclipse.jface.dialogs.ErrorDialog (parentShell, title, message, status, displayMask);
return dialog.open ();
}, "$wt.widgets.Shell,~S,~S,org.eclipse.core.runtime.IStatus,~N");
Clazz.defineMethod (c$, "populateList", 
($fz = function (listToPopulate) {
this.populateList (listToPopulate, this.status, 0, this.shouldIncludeTopLevelErrorInDetails);
}, $fz.isPrivate = true, $fz), "$wt.widgets.List");
Clazz.defineMethod (c$, "populateList", 
($fz = function (listToPopulate, buildingStatus, nesting, includeStatus) {
if (!buildingStatus.matches (this.displayMask)) {
return ;
}var t = buildingStatus.getException ();
var isCoreException = Clazz.instanceOf (t, org.eclipse.core.runtime.CoreException);
var incrementNesting = false;
if (includeStatus) {
var sb =  new StringBuffer ();
for (var i = 0; i < nesting; i++) {
sb.append ("  ");
}
var message = buildingStatus.getMessage ();
sb.append (message);
listToPopulate.add (sb.toString ());
incrementNesting = true;
}if (!isCoreException && t != null) {
var sb =  new StringBuffer ();
for (var i = 0; i < nesting; i++) {
sb.append ("  ");
}
var message = t.getLocalizedMessage ();
if (message == null) message = t.toString ();
sb.append (message);
listToPopulate.add (sb.toString ());
incrementNesting = true;
}if (incrementNesting) nesting++;
if (isCoreException) {
var ce = t;
var eStatus = ce.getStatus ();
if (this.message == null || this.message.indexOf (eStatus.getMessage ()) == -1) {
this.populateList (listToPopulate, eStatus, nesting, true);
}}var children = buildingStatus.getChildren ();
for (var i = 0; i < children.length; i++) {
this.populateList (listToPopulate, children[i], nesting, true);
}
}, $fz.isPrivate = true, $fz), "$wt.widgets.List,org.eclipse.core.runtime.IStatus,~N,~B");
c$.shouldDisplay = Clazz.defineMethod (c$, "shouldDisplay", 
function (status, mask) {
var children = status.getChildren ();
if (children == null || children.length == 0) {
return status.matches (mask);
}for (var i = 0; i < children.length; i++) {
if (children[i].matches (mask)) return true;
}
return false;
}, "org.eclipse.core.runtime.IStatus,~N");
Clazz.defineMethod (c$, "toggleDetailsArea", 
($fz = function () {
var windowSize = this.getShell ().getSize ();
var oldSize = this.getShell ().computeSize (-1, -1);
if (this.listCreated) {
this.list.dispose ();
this.listCreated = false;
this.detailsButton.setText (org.eclipse.jface.dialogs.IDialogConstants.SHOW_DETAILS_LABEL);
} else {
this.list = this.createDropDownList (this.getContents ());
this.detailsButton.setText (org.eclipse.jface.dialogs.IDialogConstants.HIDE_DETAILS_LABEL);
}var newSize = this.getShell ().computeSize (-1, -1);
this.getShell ().setSize ( new $wt.graphics.Point (windowSize.x, windowSize.y + (newSize.y - oldSize.y)));
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "populateCopyBuffer", 
($fz = function (buildingStatus, buffer, nesting) {
if (!buildingStatus.matches (this.displayMask)) {
return ;
}for (var i = 0; i < nesting; i++) {
buffer.append ("  ");
}
buffer.append (buildingStatus.getMessage ());
buffer.append ("\n");
var t = buildingStatus.getException ();
if (Clazz.instanceOf (t, org.eclipse.core.runtime.CoreException)) {
var ce = t;
this.populateCopyBuffer (ce.getStatus (), buffer, nesting + 1);
}var children = buildingStatus.getChildren ();
for (var i = 0; i < children.length; i++) {
this.populateCopyBuffer (children[i], buffer, nesting + 1);
}
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.IStatus,StringBuffer,~N");
Clazz.defineMethod (c$, "copyToClipboard", 
($fz = function () {
if (this.clipboard != null) this.clipboard.dispose ();
var statusBuffer =  new StringBuffer ();
this.populateCopyBuffer (this.status, statusBuffer, 0);
this.clipboard =  new $wt.dnd.Clipboard (this.list.getDisplay ());
this.clipboard.setContents ([statusBuffer.toString ()], [$wt.dnd.TextTransfer.getInstance ()]);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "close", 
function () {
if (this.clipboard != null) this.clipboard.dispose ();
return Clazz.superCall (this, org.eclipse.jface.dialogs.ErrorDialog, "close", []);
});
Clazz.defineMethod (c$, "showDetailsArea", 
function () {
if (!this.listCreated) {
var control = this.getContents ();
if (control != null && !control.isDisposed ()) this.toggleDetailsArea ();
}});
Clazz.defineMethod (c$, "shouldShowDetailsButton", 
function () {
return this.status.isMultiStatus () || this.status.getException () != null;
});
Clazz.defineMethod (c$, "setStatus", 
function (status) {
if (this.status !== status) {
this.status = status;
}this.shouldIncludeTopLevelErrorInDetails = true;
if (this.listCreated) {
this.repopulateList ();
}}, "org.eclipse.core.runtime.IStatus");
Clazz.defineMethod (c$, "repopulateList", 
($fz = function () {
if (this.list != null && !this.list.isDisposed ()) {
this.list.removeAll ();
this.populateList (this.list);
}}, $fz.isPrivate = true, $fz));
Clazz.defineStatics (c$,
"AUTOMATED_MODE", false,
"LIST_ITEM_COUNT", 7,
"NESTING_INDENT", "  ");
});
