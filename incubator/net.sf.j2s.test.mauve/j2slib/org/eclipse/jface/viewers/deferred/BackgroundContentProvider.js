Clazz.declarePackage ("org.eclipse.jface.viewers.deferred");
Clazz.load (["org.eclipse.core.runtime.Status", "org.eclipse.core.runtime.jobs.Job", "org.eclipse.jface.resource.JFaceResources", "org.eclipse.jface.viewers.AcceptAllFilter", "org.eclipse.jface.viewers.deferred.ChangeQueue", "$.ConcurrentTableUpdator", "$.FastProgressReporter", "$.IConcurrentModelListener"], "org.eclipse.jface.viewers.deferred.BackgroundContentProvider", ["org.eclipse.jface.util.Assert", "org.eclipse.jface.viewers.deferred.LazySortedCollection"], function () {
c$ = Clazz.decorateAsClass (function () {
this.limit = -1;
this.model = null;
this.sortOrder = null;
this.filter = null;
this.changeQueue = null;
this.listener = null;
this.updator = null;
this.sortJob = null;
this.sortMon = null;
this.range = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers.deferred, "BackgroundContentProvider");
Clazz.prepareFields (c$, function () {
this.filter = org.eclipse.jface.viewers.AcceptAllFilter.getInstance ();
this.changeQueue =  new org.eclipse.jface.viewers.deferred.ChangeQueue ();
this.listener = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.deferred.BackgroundContentProvider$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers.deferred, "BackgroundContentProvider$1", null, org.eclipse.jface.viewers.deferred.IConcurrentModelListener);
Clazz.overrideMethod (c$, "add", 
function (added) {
this.b$["org.eclipse.jface.viewers.deferred.BackgroundContentProvider"].add (added);
}, "~A");
Clazz.overrideMethod (c$, "remove", 
function (removed) {
this.b$["org.eclipse.jface.viewers.deferred.BackgroundContentProvider"].remove (removed);
}, "~A");
Clazz.overrideMethod (c$, "setContents", 
function (newContents) {
this.b$["org.eclipse.jface.viewers.deferred.BackgroundContentProvider"].setContents (newContents);
}, "~A");
Clazz.overrideMethod (c$, "update", 
function (changed) {
this.b$["org.eclipse.jface.viewers.deferred.BackgroundContentProvider"].update (changed);
}, "~A");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.deferred.BackgroundContentProvider$1, i$, v$);
}) (this, null);
this.sortJob = (function (i$, arg0, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.deferred.BackgroundContentProvider$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers.deferred, "BackgroundContentProvider$2", org.eclipse.core.runtime.jobs.Job);
Clazz.overrideMethod (c$, "run", 
function (monitor) {
this.b$["org.eclipse.jface.viewers.deferred.BackgroundContentProvider"].doSort (monitor);
return org.eclipse.core.runtime.Status.OK_STATUS;
}, "org.eclipse.core.runtime.IProgressMonitor");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.deferred.BackgroundContentProvider$2, i$, v$, arg0);
}) (this, org.eclipse.jface.viewers.deferred.BackgroundContentProvider.SORTING, null);
this.sortMon =  new org.eclipse.jface.viewers.deferred.FastProgressReporter ();
this.range =  new org.eclipse.jface.viewers.deferred.ConcurrentTableUpdator.Range (0, 0);
});
Clazz.makeConstructor (c$, 
function (table, model, sortOrder, display) {
this.updator =  new org.eclipse.jface.viewers.deferred.ConcurrentTableUpdator (table, display);
this.model = model;
this.sortOrder = sortOrder;
this.sortJob.setSystem (true);
this.sortJob.setPriority (20);
model.addListener (this.listener);
}, "org.eclipse.jface.viewers.deferred.AbstractVirtualTable,org.eclipse.jface.viewers.deferred.IConcurrentModel,java.util.Comparator,$wt.widgets.Display");
Clazz.defineMethod (c$, "dispose", 
function () {
this.cancelSortJob ();
this.updator.dispose ();
this.model.removeListener (this.listener);
});
Clazz.defineMethod (c$, "refresh", 
function () {
if (this.updator.isDisposed ()) {
return ;
}this.model.requestUpdate (this.listener);
});
Clazz.defineMethod (c$, "doSort", 
($fz = function (mon) {
mon.setCanceled (false);
mon.beginTask (org.eclipse.jface.viewers.deferred.BackgroundContentProvider.SORTING, 100);
var order = this.sortOrder;
var f = this.filter;
var collection =  new org.eclipse.jface.viewers.deferred.LazySortedCollection (order);
var knownObjects = this.updator.getKnownObjects ();
for (var i = 0; i < knownObjects.length; i++) {
var object = knownObjects[i];
if (object != null) {
collection.add (object);
}}
var dirty = false;
var prevSize = knownObjects.length;
this.updator.setTotalItems (prevSize);
while (true) {
if (order !== this.sortOrder) {
dirty = true;
order = this.sortOrder;
var newCollection =  new org.eclipse.jface.viewers.deferred.LazySortedCollection (order);
var items = collection.getItems (false);
for (var j = 0; j < items.length && order === this.sortOrder; j++) {
var item = items[j];
newCollection.add (item);
}
if (order !== this.sortOrder) {
continue ;}collection = newCollection;
continue ;}if (f !== this.filter) {
dirty = true;
f = this.filter;
var items = collection.getItems (false);
for (var j = 0; j < items.length && f === this.filter; j++) {
var toTest = items[j];
if (!f.select (toTest)) {
collection.remove (toTest);
}}
continue ;}if (!this.changeQueue.isEmpty ()) {
dirty = true;
var next = this.changeQueue.dequeue ();
switch (next.getType ()) {
case 0:
{
org.eclipse.jface.viewers.deferred.BackgroundContentProvider.filteredAdd (collection, next.getElements (), f);
break;
}case 1:
{
var toRemove = next.getElements ();
this.flush (toRemove, collection);
collection.removeAll (toRemove);
break;
}case 3:
{
var items = next.getElements ();
for (var i = 0; i < items.length; i++) {
var item = items[i];
if (collection.contains (item)) {
collection.remove (item);
collection.add (item);
this.updator.clear (item);
}}
break;
}case 2:
{
var items = next.getElements ();
collection.clear ();
org.eclipse.jface.viewers.deferred.BackgroundContentProvider.filteredAdd (collection, items, f);
break;
}}
continue ;}var totalElements = collection.size ();
if (this.limit != -1) {
if (totalElements > this.limit) {
totalElements = this.limit;
}}if (totalElements != prevSize) {
prevSize = totalElements;
this.updator.setTotalItems (totalElements);
dirty = true;
}if (!dirty) {
break;
}try {
var updateRange = this.updator.getVisibleRange ();
this.sortMon =  new org.eclipse.jface.viewers.deferred.FastProgressReporter ();
this.range = updateRange;
var sortStart = updateRange.start;
var sortLength = updateRange.length;
if (this.limit != -1) {
collection.retainFirst (this.limit, this.sortMon);
}sortLength = Math.min (sortLength, totalElements - sortStart);
sortLength = Math.max (sortLength, 0);
var objectsOfInterest =  new Array (sortLength);
collection.getRange (objectsOfInterest, sortStart, true, this.sortMon);
for (var i = 0; i < sortLength; i++) {
var object = objectsOfInterest[i];
this.updator.replace (object, sortStart + i);
}
objectsOfInterest =  new Array (collection.size ());
collection.getFirst (objectsOfInterest, true, this.sortMon);
for (var i = 0; i < totalElements; i++) {
var object = objectsOfInterest[i];
this.updator.replace (object, i);
}
} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
continue ;} else {
throw e;
}
}
dirty = false;
}
mon.done ();
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.IProgressMonitor");
c$.filteredAdd = Clazz.defineMethod (c$, "filteredAdd", 
($fz = function (collection, toAdd, filter) {
if (filter !== org.eclipse.jface.viewers.AcceptAllFilter.getInstance ()) {
for (var i = 0; i < toAdd.length; i++) {
var object = toAdd[i];
if (filter.select (object)) {
collection.add (object);
}}
} else {
collection.addAll (toAdd);
}}, $fz.isPrivate = true, $fz), "org.eclipse.jface.viewers.deferred.LazySortedCollection,~A,org.eclipse.jface.viewers.IFilter");
Clazz.defineMethod (c$, "setSortOrder", 
function (sorter) {
org.eclipse.jface.util.Assert.isNotNull (sorter);
this.sortOrder = sorter;
this.sortMon.cancel ();
this.refresh ();
}, "java.util.Comparator");
Clazz.defineMethod (c$, "setFilter", 
function (toSet) {
org.eclipse.jface.util.Assert.isNotNull (toSet);
this.filter = toSet;
this.sortMon.cancel ();
this.refresh ();
}, "org.eclipse.jface.viewers.IFilter");
Clazz.defineMethod (c$, "setLimit", 
function (limit) {
this.limit = limit;
this.refresh ();
}, "~N");
Clazz.defineMethod (c$, "getLimit", 
function () {
return this.limit;
});
Clazz.defineMethod (c$, "checkVisibleRange", 
function (includeIndex) {
this.updator.checkVisibleRange (includeIndex);
var newRange = this.updator.getVisibleRange ();
var oldRange = this.range;
if (newRange.start != oldRange.start || newRange.length != oldRange.length) {
this.sortMon.cancel ();
}}, "~N");
Clazz.defineMethod (c$, "makeDirty", 
($fz = function () {
this.sortMon.cancel ();
this.sortJob.schedule ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "cancelSortJob", 
($fz = function () {
this.sortMon.cancel ();
this.sortJob.cancel ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "add", 
($fz = function (toAdd) {
this.changeQueue.enqueue (0, toAdd);
this.makeDirty ();
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "setContents", 
($fz = function (contents) {
this.changeQueue.enqueue (2, contents);
this.makeDirty ();
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "remove", 
($fz = function (toRemove) {
this.changeQueue.enqueue (1, toRemove);
this.makeDirty ();
this.refresh ();
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "flush", 
($fz = function (toFlush, collection) {
for (var i = 0; i < toFlush.length; i++) {
var item = toFlush[i];
if (collection.contains (item)) {
this.updator.clear (item);
}}
}, $fz.isPrivate = true, $fz), "~A,org.eclipse.jface.viewers.deferred.LazySortedCollection");
Clazz.defineMethod (c$, "update", 
($fz = function (items) {
this.changeQueue.enqueue (3, items);
this.makeDirty ();
}, $fz.isPrivate = true, $fz), "~A");
c$.SORTING = c$.prototype.SORTING = org.eclipse.jface.resource.JFaceResources.getString ("Sorting");
});
