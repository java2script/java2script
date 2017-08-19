Clazz.declarePackage ("sun.awt");
Clazz.load (["java.util.HashSet", "$.IdentityHashMap"], "sun.awt.AWTAutoShutdown", ["java.awt.AWTEvent"], function () {
c$ = Clazz.decorateAsClass (function () {
this.busyThreadSet = null;
this.toolkitThreadBusy = false;
this.peerMap = null;
Clazz.instantialize (this, arguments);
}, sun.awt, "AWTAutoShutdown", null, Runnable);
Clazz.prepareFields (c$, function () {
this.busyThreadSet =  new java.util.HashSet (7);
this.peerMap =  new java.util.IdentityHashMap ();
});
Clazz.makeConstructor (c$, 
 function () {
});
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function () {
return (sun.awt.AWTAutoShutdown.theInstance == null ? (sun.awt.AWTAutoShutdown.theInstance =  new sun.awt.AWTAutoShutdown ()) : sun.awt.AWTAutoShutdown.theInstance);
});
c$.notifyToolkitThreadBusy = Clazz.defineMethod (c$, "notifyToolkitThreadBusy", 
function () {
sun.awt.AWTAutoShutdown.getInstance ().setToolkitBusy (true);
});
c$.notifyToolkitThreadFree = Clazz.defineMethod (c$, "notifyToolkitThreadFree", 
function () {
sun.awt.AWTAutoShutdown.getInstance ().setToolkitBusy (false);
});
Clazz.defineMethod (c$, "notifyThreadBusy", 
function (thread) {
this.busyThreadSet.add (thread);
}, "Thread");
Clazz.defineMethod (c$, "notifyThreadFree", 
function (thread) {
this.busyThreadSet.remove (thread);
}, "Thread");
Clazz.defineMethod (c$, "notifyPeerMapUpdated", 
function () {
if (!this.isReadyToShutdown ()) {
this.activateBlockerThread ();
}});
Clazz.defineMethod (c$, "isReadyToShutdown", 
 function () {
return (!this.toolkitThreadBusy && this.peerMap.isEmpty () && this.busyThreadSet.isEmpty ());
});
Clazz.defineMethod (c$, "setToolkitBusy", 
 function (busy) {
if (busy != this.toolkitThreadBusy) {
if (busy != this.toolkitThreadBusy) {
if (busy) {
this.toolkitThreadBusy = busy;
} else {
this.toolkitThreadBusy = busy;
}}}}, "~B");
Clazz.overrideMethod (c$, "run", 
function () {
});
c$.getShutdownEvent = Clazz.defineMethod (c$, "getShutdownEvent", 
function () {
return ((Clazz.isClassDefined ("sun.awt.AWTAutoShutdown$1") ? 0 : sun.awt.AWTAutoShutdown.$AWTAutoShutdown$1$ ()), Clazz.innerTypeInstance (sun.awt.AWTAutoShutdown$1, this, null, sun.awt.AWTAutoShutdown.getInstance (), 0));
});
Clazz.defineMethod (c$, "activateBlockerThread", 
 function () {
});
Clazz.defineMethod (c$, "registerPeer", 
function (target, peer) {
this.peerMap.put (target, peer);
this.notifyPeerMapUpdated ();
}, "~O,~O");
Clazz.defineMethod (c$, "unregisterPeer", 
function (target, peer) {
if (this.peerMap.get (target) === peer) {
this.peerMap.remove (target);
}}, "~O,~O");
Clazz.defineMethod (c$, "getPeer", 
function (target) {
return this.peerMap.get (target);
}, "~O");
Clazz.defineMethod (c$, "dumpPeers", 
function (aLog) {
aLog.fine ("Mapped peers:");
for (var key, $key = this.peerMap.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) {
aLog.fine (key + "->" + this.peerMap.get (key));
}
}, "java.util.logging.Logger");
c$.$AWTAutoShutdown$1$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.declareAnonymous (sun.awt, "AWTAutoShutdown$1", java.awt.AWTEvent);
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"theInstance", null);
});
