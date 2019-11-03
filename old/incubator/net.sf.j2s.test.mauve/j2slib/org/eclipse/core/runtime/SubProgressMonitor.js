Clazz.declarePackage ("org.eclipse.core.runtime");
Clazz.load (["org.eclipse.core.runtime.ProgressMonitorWrapper"], "org.eclipse.core.runtime.SubProgressMonitor", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.parentTicks = 0;
this.sentToParent = 0.0;
this.scale = 0.0;
this.nestedBeginTasks = 0;
this.usedUp = false;
this.style = 0;
this.mainTaskLabel = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime, "SubProgressMonitor", org.eclipse.core.runtime.ProgressMonitorWrapper);
Clazz.makeConstructor (c$, 
function (monitor, ticks) {
this.construct (monitor, ticks, 0);
}, "org.eclipse.core.runtime.IProgressMonitor,~N");
Clazz.makeConstructor (c$, 
function (monitor, ticks, style) {
Clazz.superConstructor (this, org.eclipse.core.runtime.SubProgressMonitor, [monitor]);
this.parentTicks = ticks;
this.style = style;
}, "org.eclipse.core.runtime.IProgressMonitor,~N,~N");
Clazz.overrideMethod (c$, "beginTask", 
function (name, totalWork) {
this.nestedBeginTasks++;
if (this.nestedBeginTasks > 1) {
return ;
}this.scale = totalWork <= 0 ? 0 : this.parentTicks / totalWork;
if ((this.style & 4) != 0) {
this.mainTaskLabel = name;
}}, "~S,~N");
Clazz.overrideMethod (c$, "done", 
function () {
if (this.nestedBeginTasks == 0 || --this.nestedBeginTasks > 0) return ;
var remaining = this.parentTicks - this.sentToParent;
if (remaining > 0) Clazz.superCall (this, org.eclipse.core.runtime.SubProgressMonitor, "internalWorked", [remaining]);
this.subTask ("");
this.sentToParent = 0;
});
Clazz.defineMethod (c$, "internalWorked", 
function (work) {
if (this.usedUp || this.nestedBeginTasks != 1) {
return ;
}var realWork = this.scale * work;
Clazz.superCall (this, org.eclipse.core.runtime.SubProgressMonitor, "internalWorked", [realWork]);
this.sentToParent += realWork;
if (this.sentToParent >= this.parentTicks) {
this.usedUp = true;
}}, "~N");
Clazz.defineMethod (c$, "subTask", 
function (name) {
if ((this.style & 2) != 0) {
return ;
}var label = name;
if ((this.style & 4) != 0 && this.mainTaskLabel != null && this.mainTaskLabel.length > 0) {
label = this.mainTaskLabel + ' ' + label;
}Clazz.superCall (this, org.eclipse.core.runtime.SubProgressMonitor, "subTask", [label]);
}, "~S");
Clazz.overrideMethod (c$, "worked", 
function (work) {
this.internalWorked (work);
}, "~N");
Clazz.defineStatics (c$,
"SUPPRESS_SUBTASK_LABEL", 2,
"PREPEND_MAIN_LABEL_TO_SUBTASK", 4);
});
