Clazz.declarePackage ("org.eclipse.jface.dialogs");
Clazz.load (["$wt.widgets.Composite"], "org.eclipse.jface.dialogs.ProgressIndicator", ["$wt.custom.StackLayout", "$wt.widgets.ProgressBar"], function () {
c$ = Clazz.decorateAsClass (function () {
this.animated = true;
this.$$layout = null;
this.determinateProgressBar = null;
this.indeterminateProgressBar = null;
this.totalWork = 0;
this.sumWorked = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.dialogs, "ProgressIndicator", $wt.widgets.Composite);
Clazz.makeConstructor (c$, 
function (parent) {
Clazz.superConstructor (this, org.eclipse.jface.dialogs.ProgressIndicator, [parent, 0]);
this.determinateProgressBar =  new $wt.widgets.ProgressBar (this, 256);
this.indeterminateProgressBar =  new $wt.widgets.ProgressBar (this, 258);
this.$$layout =  new $wt.custom.StackLayout ();
this.setLayout (this.$$layout);
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "beginAnimatedTask", 
function () {
this.done ();
this.$$layout.topControl = this.indeterminateProgressBar;
this.layout ();
this.animated = true;
});
Clazz.defineMethod (c$, "beginTask", 
function (max) {
this.done ();
this.totalWork = max;
this.sumWorked = 0;
this.determinateProgressBar.setMinimum (0);
this.determinateProgressBar.setMaximum (1000);
this.determinateProgressBar.setSelection (0);
this.$$layout.topControl = this.determinateProgressBar;
this.layout ();
this.animated = false;
}, "~N");
Clazz.defineMethod (c$, "done", 
function () {
if (!this.animated) {
this.determinateProgressBar.setMinimum (0);
this.determinateProgressBar.setMaximum (0);
this.determinateProgressBar.setSelection (0);
}this.$$layout.topControl = null;
this.layout ();
});
Clazz.defineMethod (c$, "sendRemainingWork", 
function () {
this.worked (this.totalWork - this.sumWorked);
});
Clazz.defineMethod (c$, "worked", 
function (work) {
if (work == 0 || this.animated) {
return ;
}this.sumWorked += work;
if (this.sumWorked > this.totalWork) {
this.sumWorked = this.totalWork;
}if (this.sumWorked < 0) {
this.sumWorked = 0;
}var value = Math.round ((this.sumWorked / this.totalWork * 1000));
if (this.determinateProgressBar.getSelection () < value) {
this.determinateProgressBar.setSelection (value);
}}, "~N");
Clazz.defineStatics (c$,
"PROGRESS_MAX", 1000);
});
