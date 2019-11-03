Clazz.declarePackage ("org.eclipse.core.internal.jobs");
Clazz.load (["org.eclipse.core.runtime.PlatformObject", "org.eclipse.core.internal.jobs.JobManager"], "org.eclipse.core.internal.jobs.InternalJob", ["java.lang.IllegalArgumentException", "$.IllegalStateException", "org.eclipse.core.internal.runtime.Assert", "$.ListenerList", "$.ObjectMap", "org.eclipse.core.runtime.jobs.MultiRule"], function () {
c$ = Clazz.decorateAsClass (function () {
this.flags = 0;
this.jobNumber = 0;
this.listeners = null;
this.monitor = null;
this.name = null;
this.$next = null;
this.$previous = null;
this.priority = 30;
this.properties = null;
this.result = null;
this.schedulingRule = null;
this.startTime = 0;
this.thread = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.jobs, "InternalJob", org.eclipse.core.runtime.PlatformObject, Comparable);
Clazz.prepareFields (c$, function () {
this.jobNumber = ($t$ = org.eclipse.core.internal.jobs.InternalJob.nextJobNumber ++, org.eclipse.core.internal.jobs.InternalJob.prototype.nextJobNumber = org.eclipse.core.internal.jobs.InternalJob.nextJobNumber, $t$);
});
Clazz.makeConstructor (c$, 
function (name) {
Clazz.superConstructor (this, org.eclipse.core.internal.jobs.InternalJob, []);
org.eclipse.core.internal.runtime.Assert.isNotNull (name);
this.name = name;
}, "~S");
Clazz.defineMethod (c$, "addJobChangeListener", 
function (listener) {
if (this.listeners == null) this.listeners =  new org.eclipse.core.internal.runtime.ListenerList (1);
this.listeners.add (listener);
}, "org.eclipse.core.runtime.jobs.IJobChangeListener");
Clazz.defineMethod (c$, "addLast", 
function (entry) {
if (this.$previous == null) {
this.$previous = entry;
entry.$next = this;
entry.$previous = null;
} else {
org.eclipse.core.internal.runtime.Assert.isTrue (this.$previous.next () === this);
this.$previous.addLast (entry);
}}, "org.eclipse.core.internal.jobs.InternalJob");
Clazz.defineMethod (c$, "belongsTo", 
function (family) {
return false;
}, "~O");
Clazz.defineMethod (c$, "cancel", 
function () {
return org.eclipse.core.internal.jobs.InternalJob.manager.cancel (this);
});
Clazz.overrideMethod (c$, "compareTo", 
function (otherJob) {
return (otherJob).startTime >= this.startTime ? 1 : -1;
}, "~O");
Clazz.defineMethod (c$, "done", 
function (endResult) {
org.eclipse.core.internal.jobs.InternalJob.manager.endJob (this, endResult, true);
}, "org.eclipse.core.runtime.IStatus");
Clazz.defineMethod (c$, "getListeners", 
function () {
return this.listeners;
});
Clazz.defineMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.defineMethod (c$, "getPriority", 
function () {
return this.priority;
});
Clazz.defineMethod (c$, "getProgressMonitor", 
function () {
return this.monitor;
});
Clazz.defineMethod (c$, "getProperty", 
function (key) {
var temp = this.properties;
if (temp == null) return null;
return temp.get (key);
}, "org.eclipse.core.runtime.QualifiedName");
Clazz.defineMethod (c$, "getResult", 
function () {
return this.result;
});
Clazz.defineMethod (c$, "getRule", 
function () {
return this.schedulingRule;
});
Clazz.defineMethod (c$, "getStartTime", 
function () {
return this.startTime;
});
Clazz.defineMethod (c$, "getState", 
function () {
var state = this.flags & 255;
switch (state) {
case 8:
return 2;
case 16:
return 4;
case 32:
return 2;
default:
return state;
}
});
Clazz.defineMethod (c$, "getThread", 
function () {
return this.thread;
});
Clazz.defineMethod (c$, "internalGetState", 
function () {
return this.flags & 255;
});
Clazz.defineMethod (c$, "internalSetPriority", 
function (newPriority) {
this.priority = newPriority;
}, "~N");
Clazz.defineMethod (c$, "internalSetRule", 
function (rule) {
this.schedulingRule = rule;
}, "org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.defineMethod (c$, "internalSetState", 
function (i) {
this.flags = (this.flags & -256) | i;
}, "~N");
Clazz.defineMethod (c$, "isBlocking", 
function () {
return org.eclipse.core.internal.jobs.InternalJob.manager.isBlocking (this);
});
Clazz.defineMethod (c$, "isConflicting", 
function (otherJob) {
var otherRule = otherJob.getRule ();
if (this.schedulingRule == null || otherRule == null) return false;
if (this.schedulingRule.getClass () === org.eclipse.core.runtime.jobs.MultiRule) return this.schedulingRule.isConflicting (otherRule);
return otherRule.isConflicting (this.schedulingRule);
}, "org.eclipse.core.internal.jobs.InternalJob");
Clazz.defineMethod (c$, "isSystem", 
function () {
return (this.flags & 256) != 0;
});
Clazz.defineMethod (c$, "isUser", 
function () {
return (this.flags & 512) != 0;
});
Clazz.defineMethod (c$, "join", 
function () {
org.eclipse.core.internal.jobs.InternalJob.manager.join (this);
});
Clazz.defineMethod (c$, "next", 
function () {
return this.$next;
});
Clazz.defineMethod (c$, "previous", 
function () {
return this.$previous;
});
Clazz.defineMethod (c$, "remove", 
function () {
if (this.$next != null) this.$next.setPrevious (this.$previous);
if (this.$previous != null) this.$previous.setNext (this.$next);
this.$next = this.$previous = null;
return this;
});
Clazz.defineMethod (c$, "removeJobChangeListener", 
function (listener) {
if (this.listeners != null) this.listeners.remove (listener);
}, "org.eclipse.core.runtime.jobs.IJobChangeListener");
Clazz.defineMethod (c$, "schedule", 
function (delay) {
if (this.shouldSchedule ()) org.eclipse.core.internal.jobs.InternalJob.manager.schedule (this, delay, false);
}, "~N");
Clazz.defineMethod (c$, "setName", 
function (name) {
org.eclipse.core.internal.runtime.Assert.isNotNull (name);
this.name = name;
}, "~S");
Clazz.defineMethod (c$, "setNext", 
function (entry) {
this.$next = entry;
}, "org.eclipse.core.internal.jobs.InternalJob");
Clazz.defineMethod (c$, "setPrevious", 
function (entry) {
this.$previous = entry;
}, "org.eclipse.core.internal.jobs.InternalJob");
Clazz.defineMethod (c$, "setPriority", 
function (newPriority) {
switch (newPriority) {
case 10:
case 20:
case 30:
case 40:
case 50:
org.eclipse.core.internal.jobs.InternalJob.manager.setPriority (this, newPriority);
break;
default:
throw  new IllegalArgumentException (String.valueOf (newPriority));
}
}, "~N");
Clazz.defineMethod (c$, "setProgressGroup", 
function (group, ticks) {
org.eclipse.core.internal.runtime.Assert.isNotNull (group);
var pm = org.eclipse.core.internal.jobs.InternalJob.manager.createMonitor (this, group, ticks);
if (pm != null) this.setProgressMonitor (pm);
}, "org.eclipse.core.runtime.IProgressMonitor,~N");
Clazz.defineMethod (c$, "setProgressMonitor", 
function (monitor) {
this.monitor = monitor;
}, "org.eclipse.core.runtime.IProgressMonitor");
Clazz.defineMethod (c$, "setProperty", 
function (key, value) {
if (value == null) {
if (this.properties == null) return ;
var temp = this.properties.clone ();
temp.remove (key);
if (temp.isEmpty ()) this.properties = null;
 else this.properties = temp;
} else {
var temp = this.properties;
if (temp == null) temp =  new org.eclipse.core.internal.runtime.ObjectMap (5);
 else temp = this.properties.clone ();
temp.put (key, value);
this.properties = temp;
}}, "org.eclipse.core.runtime.QualifiedName,~O");
Clazz.defineMethod (c$, "setResult", 
function (result) {
this.result = result;
}, "org.eclipse.core.runtime.IStatus");
Clazz.defineMethod (c$, "setRule", 
function (rule) {
org.eclipse.core.internal.jobs.InternalJob.manager.setRule (this, rule);
}, "org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.defineMethod (c$, "setStartTime", 
function (time) {
this.startTime = time;
}, "~N");
Clazz.defineMethod (c$, "setSystem", 
function (value) {
if (this.getState () != 0) throw  new IllegalStateException ();
this.flags = value ? this.flags | 256 : this.flags & -257;
}, "~B");
Clazz.defineMethod (c$, "setThread", 
function (thread) {
this.thread = thread;
}, "Thread");
Clazz.defineMethod (c$, "setUser", 
function (value) {
if (this.getState () != 0) throw  new IllegalStateException ();
this.flags = value ? this.flags | 512 : this.flags & -513;
}, "~B");
Clazz.defineMethod (c$, "shouldSchedule", 
function () {
return true;
});
Clazz.defineMethod (c$, "sleep", 
function () {
return org.eclipse.core.internal.jobs.InternalJob.manager.sleep (this);
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getName () + "(" + this.jobNumber + ")";
});
Clazz.defineMethod (c$, "wakeUp", 
function (delay) {
org.eclipse.core.internal.jobs.InternalJob.manager.wakeUp (this, delay);
}, "~N");
Clazz.defineStatics (c$,
"ABOUT_TO_RUN", 0x10,
"ABOUT_TO_SCHEDULE", 0x20,
"BLOCKED", 0x08,
"M_STATE", 0xFF,
"M_SYSTEM", 0x0100,
"M_USER", 0x0200);
c$.manager = c$.prototype.manager = org.eclipse.core.internal.jobs.JobManager.getInstance ();
Clazz.defineStatics (c$,
"nextJobNumber", 0,
"T_INFINITE", 9223372036854775807,
"T_NONE", -1);
});
