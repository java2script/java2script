Clazz.declarePackage ("org.eclipse.jface.wizard");
Clazz.load (["org.eclipse.core.runtime.IProgressMonitorWithBlocking", "$wt.widgets.Composite", "$.Listener"], "org.eclipse.jface.wizard.ProgressMonitorPart", ["java.lang.StringBuffer", "org.eclipse.jface.dialogs.ProgressIndicator", "org.eclipse.jface.resource.JFaceResources", "org.eclipse.jface.util.Assert", "$wt.graphics.GC", "$wt.layout.GridData", "$.GridLayout", "$wt.widgets.Label"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fLabel = null;
this.fTaskName = null;
this.fSubTaskName = null;
this.fProgressIndicator = null;
this.fCancelComponent = null;
this.fIsCanceled = false;
this.blockedStatus = null;
this.fCancelListener = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.wizard, "ProgressMonitorPart", $wt.widgets.Composite, org.eclipse.core.runtime.IProgressMonitorWithBlocking);
Clazz.prepareFields (c$, function () {
this.fCancelListener = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.wizard.ProgressMonitorPart$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.wizard, "ProgressMonitorPart$1", null, $wt.widgets.Listener);
Clazz.overrideMethod (c$, "handleEvent", 
function (e) {
this.b$["org.eclipse.jface.wizard.ProgressMonitorPart"].setCanceled (true);
if (this.b$["org.eclipse.jface.wizard.ProgressMonitorPart"].fCancelComponent != null) this.b$["org.eclipse.jface.wizard.ProgressMonitorPart"].fCancelComponent.setEnabled (false);
}, "$wt.widgets.Event");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.wizard.ProgressMonitorPart$1, i$, v$);
}) (this, null);
});
Clazz.makeConstructor (c$, 
function (parent, layout) {
this.construct (parent, layout, -1);
}, "$wt.widgets.Composite,$wt.widgets.Layout");
Clazz.makeConstructor (c$, 
function (parent, layout, progressIndicatorHeight) {
Clazz.superConstructor (this, org.eclipse.jface.wizard.ProgressMonitorPart, [parent, 0]);
this.initialize (layout, progressIndicatorHeight);
}, "$wt.widgets.Composite,$wt.widgets.Layout,~N");
Clazz.defineMethod (c$, "attachToCancelComponent", 
function (cancelComponent) {
org.eclipse.jface.util.Assert.isNotNull (cancelComponent);
this.fCancelComponent = cancelComponent;
this.fCancelComponent.addListener (13, this.fCancelListener);
}, "$wt.widgets.Control");
Clazz.overrideMethod (c$, "beginTask", 
function (name, totalWork) {
this.fTaskName = name;
this.updateLabel ();
if (totalWork == -1 || totalWork == 0) {
this.fProgressIndicator.beginAnimatedTask ();
} else {
this.fProgressIndicator.beginTask (totalWork);
}}, "~S,~N");
Clazz.overrideMethod (c$, "done", 
function () {
this.fLabel.setText ("");
this.fProgressIndicator.sendRemainingWork ();
this.fProgressIndicator.done ();
});
c$.escapeMetaCharacters = Clazz.defineMethod (c$, "escapeMetaCharacters", 
function ($in) {
if ($in == null || $in.indexOf ('&') < 0) return $in;
var length = $in.length;
var out =  new StringBuffer (length + 1);
for (var i = 0; i < length; i++) {
var c = $in.charAt (i);
if ((c).charCodeAt (0) == ('&').charCodeAt (0)) out.append ("&&");
 else out.append (c);
}
return out.toString ();
}, "~S");
Clazz.defineMethod (c$, "initialize", 
function (layout, progressIndicatorHeight) {
if (layout == null) {
var l =  new $wt.layout.GridLayout ();
l.marginWidth = 0;
l.marginHeight = 0;
l.numColumns = 1;
layout = l;
}this.setLayout (layout);
this.fLabel =  new $wt.widgets.Label (this, 16384);
this.fLabel.setLayoutData ( new $wt.layout.GridData (768));
if (progressIndicatorHeight == -1) {
var gc =  new $wt.graphics.GC (this.fLabel);
var fm = gc.getFontMetrics ();
gc.dispose ();
progressIndicatorHeight = fm.getHeight ();
}this.fProgressIndicator =  new org.eclipse.jface.dialogs.ProgressIndicator (this);
var gd =  new $wt.layout.GridData ();
gd.horizontalAlignment = 4;
gd.grabExcessHorizontalSpace = true;
gd.verticalAlignment = 2;
gd.heightHint = progressIndicatorHeight;
this.fProgressIndicator.setLayoutData (gd);
}, "$wt.widgets.Layout,~N");
Clazz.overrideMethod (c$, "internalWorked", 
function (work) {
this.fProgressIndicator.worked (work);
}, "~N");
Clazz.overrideMethod (c$, "isCanceled", 
function () {
return this.fIsCanceled;
});
Clazz.defineMethod (c$, "removeFromCancelComponent", 
function (cc) {
org.eclipse.jface.util.Assert.isTrue (this.fCancelComponent === cc && this.fCancelComponent != null);
this.fCancelComponent.removeListener (13, this.fCancelListener);
this.fCancelComponent = null;
}, "$wt.widgets.Control");
Clazz.overrideMethod (c$, "setCanceled", 
function (b) {
this.fIsCanceled = b;
}, "~B");
Clazz.defineMethod (c$, "setFont", 
function (font) {
Clazz.superCall (this, org.eclipse.jface.wizard.ProgressMonitorPart, "setFont", [font]);
this.fLabel.setFont (font);
this.fProgressIndicator.setFont (font);
}, "$wt.graphics.Font");
Clazz.overrideMethod (c$, "setTaskName", 
function (name) {
this.fTaskName = name;
this.updateLabel ();
}, "~S");
Clazz.overrideMethod (c$, "subTask", 
function (name) {
this.fSubTaskName = name;
this.updateLabel ();
}, "~S");
Clazz.defineMethod (c$, "updateLabel", 
function () {
if (this.blockedStatus == null) {
var text = this.taskLabel ();
this.fLabel.setText (text);
} else this.fLabel.setText (this.blockedStatus.getMessage ());
this.fLabel.update ();
});
Clazz.defineMethod (c$, "taskLabel", 
($fz = function () {
var text = this.fSubTaskName == null ? "" : this.fSubTaskName;
if (this.fTaskName != null && this.fTaskName.length > 0) {
text = org.eclipse.jface.resource.JFaceResources.format ("Set_SubTask", [this.fTaskName, text]);
}return org.eclipse.jface.wizard.ProgressMonitorPart.escapeMetaCharacters (text);
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "worked", 
function (work) {
this.internalWorked (work);
}, "~N");
Clazz.overrideMethod (c$, "clearBlocked", 
function () {
this.blockedStatus = null;
this.updateLabel ();
});
Clazz.overrideMethod (c$, "setBlocked", 
function (reason) {
this.blockedStatus = reason;
this.updateLabel ();
}, "org.eclipse.core.runtime.IStatus");
});
