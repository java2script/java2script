Clazz.declarePackage ("org.eclipse.jface.viewers.deferred");
Clazz.load (["java.util.LinkedList"], "org.eclipse.jface.viewers.deferred.ChangeQueue", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.queue = null;
this.workload = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers.deferred, "ChangeQueue");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.type = 0;
this.elements = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers.deferred.ChangeQueue, "Change");
Clazz.makeConstructor (c$, 
function (a, b) {
this.type = a;
this.elements = b;
}, "~N,~A");
Clazz.defineMethod (c$, "getType", 
function () {
return this.type;
});
Clazz.defineMethod (c$, "getElements", 
function () {
return this.elements;
});
c$ = Clazz.p0p ();
Clazz.prepareFields (c$, function () {
this.queue =  new java.util.LinkedList ();
});
Clazz.defineMethod (c$, "enqueue", 
function (type, elements) {
this.enqueue ( new org.eclipse.jface.viewers.deferred.ChangeQueue.Change (type, elements));
}, "~N,~A");
Clazz.defineMethod (c$, "enqueue", 
function (toQueue) {
if (toQueue.type == 2) {
this.workload = 0;
var newQueue =  new java.util.LinkedList ();
for (var iter = this.queue.iterator (); iter.hasNext (); ) {
var next = iter.next ();
if (next.getType () == 0 || next.getType () == 1 || next.getType () == 2) {
continue ;}newQueue.add (next);
this.workload += next.elements.length;
}
this.queue = newQueue;
}this.queue.add (toQueue);
this.workload += toQueue.elements.length;
}, "org.eclipse.jface.viewers.deferred.ChangeQueue.Change");
Clazz.defineMethod (c$, "dequeue", 
function () {
var result = this.queue.removeFirst ();
this.workload -= result.elements.length;
return result;
});
Clazz.defineMethod (c$, "isEmpty", 
function () {
return this.queue.isEmpty ();
});
Clazz.defineStatics (c$,
"ADD", 0,
"REMOVE", 1,
"SET", 2,
"UPDATE", 3);
});
