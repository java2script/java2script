Clazz.declarePackage ("org.eclipse.osgi.framework.eventmgr");
Clazz.load (null, "org.eclipse.osgi.framework.eventmgr.ListenerQueue", ["java.lang.IllegalArgumentException", "$.IllegalStateException", "java.util.ArrayList", "org.eclipse.osgi.framework.eventmgr.EventListeners", "$.EventManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.manager = null;
this.queue = null;
this.readOnly = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.eventmgr, "ListenerQueue");
Clazz.makeConstructor (c$, 
function (manager) {
if (manager == null) {
throw  new IllegalArgumentException ();
}this.manager = manager;
this.queue =  new java.util.ArrayList ();
this.readOnly = false;
}, "org.eclipse.osgi.framework.eventmgr.EventManager");
Clazz.defineMethod (c$, "queueListeners", 
function (listeners, dispatcher) {
if (this.readOnly) {
throw  new IllegalStateException ();
}if (listeners != null) {
var list = listeners.getListeners ();
if (list.length > 0) {
this.queue.add ( new org.eclipse.osgi.framework.eventmgr.EventListeners.ListElement (list, dispatcher));
}}}, "org.eclipse.osgi.framework.eventmgr.EventListeners,org.eclipse.osgi.framework.eventmgr.EventDispatcher");
Clazz.defineMethod (c$, "dispatchEventAsynchronous", 
function (eventAction, eventObject) {
{
this.readOnly = true;
}var eventThread = this.manager.getEventThread ();
{
var size = this.queue.size ();
for (var i = 0; i < size; i++) {
var list = this.queue.get (i);
eventThread.postEvent (list.primary, list.companion, eventAction, eventObject);
}
}}, "~N,~O");
Clazz.defineMethod (c$, "dispatchEventSynchronous", 
function (eventAction, eventObject) {
{
this.readOnly = true;
}var size = this.queue.size ();
for (var i = 0; i < size; i++) {
var list = this.queue.get (i);
org.eclipse.osgi.framework.eventmgr.EventManager.dispatchEvent (list.primary, list.companion, eventAction, eventObject);
}
}, "~N,~O");
});
