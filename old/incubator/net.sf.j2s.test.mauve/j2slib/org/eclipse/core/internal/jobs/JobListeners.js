Clazz.declarePackage ("org.eclipse.core.internal.jobs");
Clazz.load (["org.eclipse.core.internal.runtime.ListenerList"], "org.eclipse.core.internal.jobs.JobListeners", ["org.eclipse.core.internal.jobs.JobChangeEvent", "org.eclipse.core.internal.runtime.InternalPlatform", "$.Messages", "org.eclipse.core.runtime.Status", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$aboutToRun = null;
this.$awake = null;
this.$done = null;
this.$running = null;
this.$scheduled = null;
this.$sleeping = null;
this.global = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.jobs, "JobListeners");
Clazz.declareInterface (org.eclipse.core.internal.jobs.JobListeners, "IListenerDoit");
Clazz.prepareFields (c$, function () {
this.$aboutToRun = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.jobs.JobListeners$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.jobs, "JobListeners$1", null, org.eclipse.core.internal.jobs.JobListeners.IListenerDoit);
Clazz.defineMethod (c$, "notify", 
function (listener, event) {
listener.aboutToRun (event);
}, "org.eclipse.core.runtime.jobs.IJobChangeListener,org.eclipse.core.runtime.jobs.IJobChangeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.jobs.JobListeners$1, i$, v$);
}) (this, null);
this.$awake = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.jobs.JobListeners$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.jobs, "JobListeners$2", null, org.eclipse.core.internal.jobs.JobListeners.IListenerDoit);
Clazz.defineMethod (c$, "notify", 
function (listener, event) {
listener.awake (event);
}, "org.eclipse.core.runtime.jobs.IJobChangeListener,org.eclipse.core.runtime.jobs.IJobChangeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.jobs.JobListeners$2, i$, v$);
}) (this, null);
this.$done = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.jobs.JobListeners$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.jobs, "JobListeners$3", null, org.eclipse.core.internal.jobs.JobListeners.IListenerDoit);
Clazz.defineMethod (c$, "notify", 
function (listener, event) {
listener.done (event);
}, "org.eclipse.core.runtime.jobs.IJobChangeListener,org.eclipse.core.runtime.jobs.IJobChangeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.jobs.JobListeners$3, i$, v$);
}) (this, null);
this.$running = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.jobs.JobListeners$4")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.jobs, "JobListeners$4", null, org.eclipse.core.internal.jobs.JobListeners.IListenerDoit);
Clazz.defineMethod (c$, "notify", 
function (listener, event) {
listener.running (event);
}, "org.eclipse.core.runtime.jobs.IJobChangeListener,org.eclipse.core.runtime.jobs.IJobChangeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.jobs.JobListeners$4, i$, v$);
}) (this, null);
this.$scheduled = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.jobs.JobListeners$5")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.jobs, "JobListeners$5", null, org.eclipse.core.internal.jobs.JobListeners.IListenerDoit);
Clazz.defineMethod (c$, "notify", 
function (listener, event) {
listener.scheduled (event);
}, "org.eclipse.core.runtime.jobs.IJobChangeListener,org.eclipse.core.runtime.jobs.IJobChangeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.jobs.JobListeners$5, i$, v$);
}) (this, null);
this.$sleeping = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.jobs.JobListeners$6")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.jobs, "JobListeners$6", null, org.eclipse.core.internal.jobs.JobListeners.IListenerDoit);
Clazz.defineMethod (c$, "notify", 
function (listener, event) {
listener.sleeping (event);
}, "org.eclipse.core.runtime.jobs.IJobChangeListener,org.eclipse.core.runtime.jobs.IJobChangeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.jobs.JobListeners$6, i$, v$);
}) (this, null);
this.global =  new org.eclipse.core.internal.runtime.ListenerList (1);
});
c$.newEvent = Clazz.defineMethod (c$, "newEvent", 
function (job) {
var instance =  new org.eclipse.core.internal.jobs.JobChangeEvent ();
instance.job = job;
return instance;
}, "org.eclipse.core.runtime.jobs.Job");
c$.newEvent = Clazz.defineMethod (c$, "newEvent", 
function (job, result) {
var instance =  new org.eclipse.core.internal.jobs.JobChangeEvent ();
instance.job = job;
instance.result = result;
return instance;
}, "org.eclipse.core.runtime.jobs.Job,org.eclipse.core.runtime.IStatus");
c$.newEvent = Clazz.defineMethod (c$, "newEvent", 
function (job, delay) {
var instance =  new org.eclipse.core.internal.jobs.JobChangeEvent ();
instance.job = job;
instance.delay = delay;
return instance;
}, "org.eclipse.core.runtime.jobs.Job,~N");
Clazz.defineMethod (c$, "doNotify", 
($fz = function (doit, event) {
var listeners = this.global.getListeners ();
var size = listeners.length;
for (var i = 0; i < size; i++) {
try {
if (listeners[i] != null) doit.notify (listeners[i], event);
} catch (e$$) {
if (Clazz.instanceOf (e$$, Exception)) {
var e = e$$;
{
this.handleException (listeners[i], e);
}
} else if (Clazz.instanceOf (e$$, LinkageError)) {
var e = e$$;
{
this.handleException (listeners[i], e);
}
} else {
throw e$$;
}
}
}
var list = (event.getJob ()).getListeners ();
listeners = list == null ? null : list.getListeners ();
if (listeners == null) return ;
size = listeners.length;
for (var i = 0; i < size; i++) {
try {
if (listeners[i] != null) doit.notify (listeners[i], event);
} catch (e$$) {
if (Clazz.instanceOf (e$$, Exception)) {
var e = e$$;
{
this.handleException (listeners[i], e);
}
} else if (Clazz.instanceOf (e$$, LinkageError)) {
var e = e$$;
{
this.handleException (listeners[i], e);
}
} else {
throw e$$;
}
}
}
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.jobs.JobListeners.IListenerDoit,org.eclipse.core.runtime.jobs.IJobChangeEvent");
Clazz.defineMethod (c$, "handleException", 
($fz = function (listener, e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.OperationCanceledException)) return ;
var platform = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ();
if (platform != null && platform.isRunning ()) {
var pluginId = platform.getBundleId (listener);
if (pluginId == null) pluginId = "org.eclipse.core.runtime";
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.meta_pluginProblems, pluginId);
platform.log ( new org.eclipse.core.runtime.Status (4, pluginId, 2, message, e));
} else e.printStackTrace ();
}, $fz.isPrivate = true, $fz), "~O,Throwable");
Clazz.defineMethod (c$, "add", 
function (listener) {
this.global.add (listener);
}, "org.eclipse.core.runtime.jobs.IJobChangeListener");
Clazz.defineMethod (c$, "remove", 
function (listener) {
this.global.remove (listener);
}, "org.eclipse.core.runtime.jobs.IJobChangeListener");
Clazz.defineMethod (c$, "aboutToRun", 
function (job) {
this.doNotify (this.$aboutToRun, org.eclipse.core.internal.jobs.JobListeners.newEvent (job));
}, "org.eclipse.core.runtime.jobs.Job");
Clazz.defineMethod (c$, "awake", 
function (job) {
this.doNotify (this.$awake, org.eclipse.core.internal.jobs.JobListeners.newEvent (job));
}, "org.eclipse.core.runtime.jobs.Job");
Clazz.defineMethod (c$, "done", 
function (job, result, reschedule) {
var event = org.eclipse.core.internal.jobs.JobListeners.newEvent (job, result);
event.reschedule = reschedule;
this.doNotify (this.$done, event);
}, "org.eclipse.core.runtime.jobs.Job,org.eclipse.core.runtime.IStatus,~B");
Clazz.defineMethod (c$, "running", 
function (job) {
this.doNotify (this.$running, org.eclipse.core.internal.jobs.JobListeners.newEvent (job));
}, "org.eclipse.core.runtime.jobs.Job");
Clazz.defineMethod (c$, "scheduled", 
function (job, delay, reschedule) {
var event = org.eclipse.core.internal.jobs.JobListeners.newEvent (job, delay);
event.reschedule = reschedule;
this.doNotify (this.$scheduled, event);
}, "org.eclipse.core.runtime.jobs.Job,~N,~B");
Clazz.defineMethod (c$, "sleeping", 
function (job) {
this.doNotify (this.$sleeping, org.eclipse.core.internal.jobs.JobListeners.newEvent (job));
}, "org.eclipse.core.runtime.jobs.Job");
});
