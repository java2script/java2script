Clazz.declarePackage ("org.eclipse.jface.dialogs");
Clazz.load (["org.eclipse.core.runtime.IProgressMonitorWithBlocking", "org.eclipse.jface.dialogs.IconAndMessageDialog", "org.eclipse.jface.operation.IRunnableContext", "org.eclipse.jface.resource.JFaceResources"], "org.eclipse.jface.dialogs.ProgressMonitorDialog", ["org.eclipse.jface.dialogs.IDialogConstants", "$.ProgressIndicator", "org.eclipse.jface.operation.ModalContext", "$wt.graphics.Cursor", "$wt.layout.GridData", "$wt.widgets.Label"], function () {
c$ = Clazz.decorateAsClass (function () {
this.progressIndicator = null;
this.taskLabel = null;
this.subTaskLabel = null;
this.cancel = null;
this.operationCancelableState = false;
this.enableCancelButton = false;
this.progressMonitor = null;
this.task = null;
this.nestingDepth = 0;
this.arrowCursor = null;
this.waitCursor = null;
this.openOnRun = true;
if (!Clazz.isClassDefined ("org.eclipse.jface.dialogs.ProgressMonitorDialog.ProgressMonitor")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.fSubTask = "";
this.fIsCanceled = false;
this.forked = false;
this.locked = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.dialogs.ProgressMonitorDialog, "ProgressMonitor", null, org.eclipse.core.runtime.IProgressMonitorWithBlocking);
Clazz.overrideMethod (c$, "beginTask", 
function (a, b) {
if (this.b$["org.eclipse.jface.dialogs.ProgressMonitorDialog"].progressIndicator.isDisposed ()) return ;
if (a == null) this.b$["org.eclipse.jface.dialogs.ProgressMonitorDialog"].task = "";
 else this.b$["org.eclipse.jface.dialogs.ProgressMonitorDialog"].task = a;
var c = this.b$["org.eclipse.jface.dialogs.ProgressMonitorDialog"].task;
if (c.length <= 0) c = org.eclipse.jface.dialogs.ProgressMonitorDialog.DEFAULT_TASKNAME;
this.b$["org.eclipse.jface.dialogs.ProgressMonitorDialog"].setMessage (c);
if (!this.forked) this.b$["org.eclipse.jface.dialogs.ProgressMonitorDialog"].update ();
if (b == -1) {
this.b$["org.eclipse.jface.dialogs.ProgressMonitorDialog"].progressIndicator.beginAnimatedTask ();
} else {
this.b$["org.eclipse.jface.dialogs.ProgressMonitorDialog"].progressIndicator.beginTask (b);
}}, "~S,~N");
Clazz.overrideMethod (c$, "done", 
function () {
if (!this.b$["org.eclipse.jface.dialogs.ProgressMonitorDialog"].progressIndicator.isDisposed ()) {
this.b$["org.eclipse.jface.dialogs.ProgressMonitorDialog"].progressIndicator.sendRemainingWork ();
this.b$["org.eclipse.jface.dialogs.ProgressMonitorDialog"].progressIndicator.done ();
}});
Clazz.overrideMethod (c$, "setTaskName", 
function (a) {
if (a == null) this.b$["org.eclipse.jface.dialogs.ProgressMonitorDialog"].task = "";
 else this.b$["org.eclipse.jface.dialogs.ProgressMonitorDialog"].task = a;
var b = this.b$["org.eclipse.jface.dialogs.ProgressMonitorDialog"].task;
if (b.length <= 0) b = org.eclipse.jface.dialogs.ProgressMonitorDialog.DEFAULT_TASKNAME;
this.b$["org.eclipse.jface.dialogs.ProgressMonitorDialog"].setMessage (b);
if (!this.forked) this.b$["org.eclipse.jface.dialogs.ProgressMonitorDialog"].update ();
}, "~S");
Clazz.overrideMethod (c$, "isCanceled", 
function () {
return this.fIsCanceled;
});
Clazz.overrideMethod (c$, "setCanceled", 
function (a) {
this.fIsCanceled = a;
if (this.locked) this.clearBlocked ();
}, "~B");
Clazz.overrideMethod (c$, "subTask", 
function (a) {
if (this.b$["org.eclipse.jface.dialogs.ProgressMonitorDialog"].subTaskLabel.isDisposed ()) return ;
if (a == null) this.fSubTask = "";
 else this.fSubTask = a;
this.b$["org.eclipse.jface.dialogs.ProgressMonitorDialog"].subTaskLabel.setText (org.eclipse.jface.dialogs.Dialog.shortenText (this.fSubTask, this.b$["org.eclipse.jface.dialogs.ProgressMonitorDialog"].subTaskLabel));
if (!this.forked) this.b$["org.eclipse.jface.dialogs.ProgressMonitorDialog"].subTaskLabel.update ();
}, "~S");
Clazz.overrideMethod (c$, "worked", 
function (a) {
this.internalWorked (a);
}, "~N");
Clazz.overrideMethod (c$, "internalWorked", 
function (a) {
if (!this.b$["org.eclipse.jface.dialogs.ProgressMonitorDialog"].progressIndicator.isDisposed ()) this.b$["org.eclipse.jface.dialogs.ProgressMonitorDialog"].progressIndicator.worked (a);
}, "~N");
Clazz.overrideMethod (c$, "clearBlocked", 
function () {
this.locked = false;
this.b$["org.eclipse.jface.dialogs.ProgressMonitorDialog"].updateForClearBlocked ();
});
Clazz.overrideMethod (c$, "setBlocked", 
function (a) {
this.locked = true;
this.b$["org.eclipse.jface.dialogs.ProgressMonitorDialog"].updateForSetBlocked (a);
}, "org.eclipse.core.runtime.IStatus");
c$ = Clazz.p0p ();
}
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.dialogs, "ProgressMonitorDialog", org.eclipse.jface.dialogs.IconAndMessageDialog, org.eclipse.jface.operation.IRunnableContext);
Clazz.prepareFields (c$, function () {
this.progressMonitor = Clazz.innerTypeInstance (org.eclipse.jface.dialogs.ProgressMonitorDialog.ProgressMonitor, this, null);
});
Clazz.defineMethod (c$, "updateForClearBlocked", 
function () {
this.setMessage (this.task);
this.imageLabel.setImage (this.getImage ());
});
Clazz.defineMethod (c$, "updateForSetBlocked", 
function (reason) {
this.setMessage (reason.getMessage ());
this.imageLabel.setImage (this.getImage ());
}, "org.eclipse.core.runtime.IStatus");
Clazz.makeConstructor (c$, 
function (parent) {
Clazz.superConstructor (this, org.eclipse.jface.dialogs.ProgressMonitorDialog, [parent]);
this.setShellStyle (org.eclipse.jface.window.Window.getDefaultOrientation () | 2048 | 32 | 65536);
this.setBlockOnOpen (false);
}, "$wt.widgets.Shell");
Clazz.defineMethod (c$, "asyncSetOperationCancelButtonEnabled", 
($fz = function (b) {
if (this.getShell () != null) {
this.getShell ().getDisplay ().asyncExec ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.dialogs.ProgressMonitorDialog$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.dialogs, "ProgressMonitorDialog$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.eclipse.jface.dialogs.ProgressMonitorDialog"].setOperationCancelButtonEnabled (this.f$.b);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.dialogs.ProgressMonitorDialog$1, i$, v$);
}) (this, Clazz.cloneFinals ("b", b)));
}}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "cancelPressed", 
function () {
this.cancel.setEnabled (false);
this.progressMonitor.setCanceled (true);
Clazz.superCall (this, org.eclipse.jface.dialogs.ProgressMonitorDialog, "cancelPressed", []);
});
Clazz.defineMethod (c$, "close", 
function () {
if (this.getNestingDepth () <= 0) {
this.clearCursors ();
return Clazz.superCall (this, org.eclipse.jface.dialogs.ProgressMonitorDialog, "close", []);
}return false;
});
Clazz.defineMethod (c$, "clearCursors", 
function () {
if (this.cancel != null && !this.cancel.isDisposed ()) {
this.cancel.setCursor (null);
}var shell = this.getShell ();
if (shell != null && !shell.isDisposed ()) {
shell.setCursor (null);
}if (this.arrowCursor != null) this.arrowCursor.dispose ();
if (this.waitCursor != null) this.waitCursor.dispose ();
this.arrowCursor = null;
this.waitCursor = null;
});
Clazz.defineMethod (c$, "configureShell", 
function (shell) {
Clazz.superCall (this, org.eclipse.jface.dialogs.ProgressMonitorDialog, "configureShell", [shell]);
shell.setText (org.eclipse.jface.resource.JFaceResources.getString ("ProgressMonitorDialog.title"));
if (this.waitCursor == null) this.waitCursor =  new $wt.graphics.Cursor (shell.getDisplay (), 1);
shell.setCursor (this.waitCursor);
}, "$wt.widgets.Shell");
Clazz.overrideMethod (c$, "createButtonsForButtonBar", 
function (parent) {
this.createCancelButton (parent);
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createCancelButton", 
function (parent) {
this.cancel = this.createButton (parent, 1, org.eclipse.jface.dialogs.IDialogConstants.CANCEL_LABEL, true);
if (this.arrowCursor == null) this.arrowCursor =  new $wt.graphics.Cursor (this.cancel.getDisplay (), 0);
this.cancel.setCursor (this.arrowCursor);
this.setOperationCancelButtonEnabled (this.enableCancelButton);
}, "$wt.widgets.Composite");
Clazz.overrideMethod (c$, "createDialogArea", 
function (parent) {
this.setMessage (org.eclipse.jface.dialogs.ProgressMonitorDialog.DEFAULT_TASKNAME);
this.createMessageArea (parent);
this.taskLabel = this.messageLabel;
this.progressIndicator =  new org.eclipse.jface.dialogs.ProgressIndicator (parent);
var gd =  new $wt.layout.GridData ();
gd.heightHint = this.convertVerticalDLUsToPixels (org.eclipse.jface.dialogs.ProgressMonitorDialog.BAR_DLUS);
gd.horizontalAlignment = 4;
gd.grabExcessHorizontalSpace = true;
gd.horizontalSpan = 2;
this.progressIndicator.setLayoutData (gd);
this.subTaskLabel =  new $wt.widgets.Label (parent, 16448);
gd =  new $wt.layout.GridData (768);
gd.heightHint = this.convertVerticalDLUsToPixels (org.eclipse.jface.dialogs.ProgressMonitorDialog.LABEL_DLUS);
gd.horizontalSpan = 2;
this.subTaskLabel.setLayoutData (gd);
this.subTaskLabel.setFont (parent.getFont ());
return parent;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "getInitialSize", 
function () {
var calculatedSize = Clazz.superCall (this, org.eclipse.jface.dialogs.ProgressMonitorDialog, "getInitialSize", []);
if (calculatedSize.x < 450) calculatedSize.x = 450;
return calculatedSize;
});
Clazz.defineMethod (c$, "getProgressMonitor", 
function () {
return this.progressMonitor;
});
Clazz.overrideMethod (c$, "run", 
function (fork, cancelable, runnable) {
this.setCancelable (cancelable);
try {
this.aboutToRun ();
this.progressMonitor.forked = fork;
org.eclipse.jface.operation.ModalContext.run (runnable, fork, this.getProgressMonitor (), this.getShell ().getDisplay ());
} finally {
this.finishedRun ();
}
}, "~B,~B,org.eclipse.jface.operation.IRunnableWithProgress");
Clazz.defineMethod (c$, "getOpenOnRun", 
function () {
return this.openOnRun;
});
Clazz.defineMethod (c$, "setOpenOnRun", 
function (openOnRun) {
this.openOnRun = openOnRun;
}, "~B");
Clazz.defineMethod (c$, "getNestingDepth", 
function () {
return this.nestingDepth;
});
Clazz.defineMethod (c$, "incrementNestingDepth", 
function () {
this.nestingDepth++;
});
Clazz.defineMethod (c$, "decrementNestingDepth", 
function () {
this.nestingDepth--;
});
Clazz.defineMethod (c$, "aboutToRun", 
function () {
if (this.getOpenOnRun ()) {
this.open ();
} else {
this.create ();
}this.incrementNestingDepth ();
});
Clazz.defineMethod (c$, "finishedRun", 
function () {
this.decrementNestingDepth ();
this.close ();
});
Clazz.defineMethod (c$, "setCancelable", 
function (cancelable) {
if (this.cancel == null) this.enableCancelButton = cancelable;
 else this.asyncSetOperationCancelButtonEnabled (cancelable);
}, "~B");
Clazz.defineMethod (c$, "setOperationCancelButtonEnabled", 
function (b) {
this.operationCancelableState = b;
this.cancel.setEnabled (b);
}, "~B");
Clazz.defineMethod (c$, "getImage", 
function () {
return this.getInfoImage ();
});
Clazz.defineMethod (c$, "setMessage", 
($fz = function (messageString) {
this.message = messageString == null ? "" : messageString;
if (this.messageLabel == null || this.messageLabel.isDisposed ()) return ;
this.messageLabel.setText (org.eclipse.jface.dialogs.Dialog.shortenText (this.message, this.messageLabel));
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "update", 
($fz = function () {
if (this.messageLabel == null || this.messageLabel.isDisposed ()) return ;
this.messageLabel.update ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "open", 
function () {
if (!this.getOpenOnRun ()) {
if (this.getNestingDepth () == 0) return 0;
}return Clazz.superCall (this, org.eclipse.jface.dialogs.ProgressMonitorDialog, "open", []);
});
c$.DEFAULT_TASKNAME = c$.prototype.DEFAULT_TASKNAME = org.eclipse.jface.resource.JFaceResources.getString ("ProgressMonitorDialog.message");
Clazz.defineStatics (c$,
"LABEL_DLUS", 21,
"BAR_DLUS", 9);
});
