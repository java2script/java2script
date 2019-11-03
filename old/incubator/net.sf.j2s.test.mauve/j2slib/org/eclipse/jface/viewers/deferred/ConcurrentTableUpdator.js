Clazz.declarePackage ("org.eclipse.jface.viewers.deferred");
Clazz.load (["org.eclipse.jface.viewers.deferred.IntHashMap"], "org.eclipse.jface.viewers.deferred.ConcurrentTableUpdator", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.table = null;
this.sentObjects = null;
this.knownIndices = null;
this.knownObjects = null;
this.pendingClears = null;
this.lastClear = 0;
this.display = null;
this.lastRange = null;
this.updateScheduled = false;
this.disposed = false;
this.uiRunnable = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers.deferred, "ConcurrentTableUpdator");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.start = 0;
this.length = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers.deferred.ConcurrentTableUpdator, "Range");
Clazz.makeConstructor (c$, 
function (a, b) {
this.start = a;
this.length = b;
}, "~N,~N");
c$ = Clazz.p0p ();
Clazz.prepareFields (c$, function () {
this.sentObjects =  new Array (0);
this.knownIndices =  new org.eclipse.jface.viewers.deferred.IntHashMap ();
this.knownObjects =  new Array (0);
this.pendingClears =  Clazz.newArray (64, 0);
this.lastRange =  new org.eclipse.jface.viewers.deferred.ConcurrentTableUpdator.Range (0, 0);
this.uiRunnable = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.deferred.ConcurrentTableUpdator$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers.deferred, "ConcurrentTableUpdator$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.eclipse.jface.viewers.deferred.ConcurrentTableUpdator"].updateScheduled = false;
this.b$["org.eclipse.jface.viewers.deferred.ConcurrentTableUpdator"].updateTable ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.deferred.ConcurrentTableUpdator$1, i$, v$);
}) (this, null);
});
Clazz.makeConstructor (c$, 
function (table, display) {
this.table = table;
this.display = display;
}, "org.eclipse.jface.viewers.deferred.AbstractVirtualTable,$wt.widgets.Display");
Clazz.defineMethod (c$, "dispose", 
function () {
this.disposed = true;
});
Clazz.defineMethod (c$, "isDisposed", 
function () {
return this.disposed;
});
Clazz.defineMethod (c$, "getVisibleRange", 
function () {
return this.lastRange;
});
Clazz.defineMethod (c$, "clear", 
function (toFlush) {
{
var currentIdx = this.knownIndices.get (toFlush, -1);
if (currentIdx == -1) {
return ;
}this.pushClear (currentIdx);
}}, "~O");
Clazz.defineMethod (c$, "setTotalItems", 
function (newTotal) {
{
if (newTotal != this.knownObjects.length) {
if (newTotal < this.knownObjects.length) {
for (var i = newTotal; i < this.knownObjects.length; i++) {
var toFlush = this.knownObjects[i];
if (toFlush != null) {
this.knownIndices.remove (toFlush);
}}
}var minSize = Math.min (this.knownObjects.length, newTotal);
var newKnownObjects =  new Array (newTotal);
System.arraycopy (this.knownObjects, 0, newKnownObjects, 0, minSize);
this.knownObjects = newKnownObjects;
this.scheduleUIUpdate ();
}}}, "~N");
Clazz.defineMethod (c$, "pushClear", 
($fz = function (toClear) {
if (toClear >= this.sentObjects.length) {
return ;
}if (this.sentObjects[toClear] == null) {
return ;
}this.sentObjects[toClear] = null;
if (this.lastClear >= this.pendingClears.length) {
var newCapacity = Math.min (64, this.lastClear * 2);
var newPendingClears =  Clazz.newArray (newCapacity, 0);
System.arraycopy (this.pendingClears, 0, newPendingClears, 0, this.lastClear);
this.pendingClears = newPendingClears;
}this.pendingClears[this.lastClear++] = toClear;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "replace", 
function (value, idx) {
{
var oldObject = this.knownObjects[idx];
if (oldObject !== value) {
if (oldObject != null) {
this.knownIndices.remove (oldObject);
}this.knownObjects[idx] = value;
if (value != null) {
var oldIndex = this.knownIndices.get (value, -1);
if (oldIndex != -1) {
this.knownObjects[oldIndex] = null;
this.pushClear (oldIndex);
}this.knownIndices.put (value, idx);
}this.pushClear (idx);
this.scheduleUIUpdate ();
}}}, "~O,~N");
Clazz.defineMethod (c$, "scheduleUIUpdate", 
($fz = function () {
{
if (!this.updateScheduled) {
this.updateScheduled = true;
this.display.asyncExec (this.uiRunnable);
}}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "checkVisibleRange", 
function (includeIndex) {
var start = Math.min (this.table.getTopIndex () - 1, includeIndex);
var length = Math.max (this.table.getVisibleItemCount (), includeIndex - start);
var r = this.lastRange;
if (start != r.start || length != r.length) {
this.updateTable ();
}}, "~N");
Clazz.defineMethod (c$, "updateTable", 
($fz = function () {
{
if (this.sentObjects.length != this.knownObjects.length) {
var newSentObjects =  new Array (this.knownObjects.length);
System.arraycopy (newSentObjects, 0, this.sentObjects, 0, Math.min (newSentObjects.length, this.sentObjects.length));
this.sentObjects = newSentObjects;
this.table.setItemCount (newSentObjects.length);
}var start = Math.min (this.table.getTopIndex (), this.knownObjects.length);
var length = Math.min (this.table.getVisibleItemCount (), this.knownObjects.length - start);
var itemCount = this.table.getItemCount ();
var oldStart = this.lastRange.start;
var oldLen = this.lastRange.length;
this.lastRange =  new org.eclipse.jface.viewers.deferred.ConcurrentTableUpdator.Range (start, length);
for (var idx = 0; idx < oldLen; idx++) {
var row = idx + oldStart;
if (row < itemCount && (row < start || row >= start + length)) {
if (this.sentObjects[row] == null) {
this.table.clear (row);
}}}
if (this.lastClear > 0) {
for (var i = 0; i < this.lastClear; i++) {
var row = this.pendingClears[i];
if (row < this.sentObjects.length) {
this.table.clear (row);
}}
if (this.pendingClears.length > 64) {
this.pendingClears =  Clazz.newArray (64, 0);
}this.lastClear = 0;
}for (var idx = 0; idx < length; idx++) {
var row = idx + start;
var obj = this.knownObjects[row];
if (obj != null && obj !== this.sentObjects[idx]) {
this.table.replace (obj, row);
this.sentObjects[idx] = obj;
}}
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getKnownObjects", 
function () {
return this.knownObjects;
});
Clazz.defineStatics (c$,
"MIN_FLUSHLENGTH", 64);
});
