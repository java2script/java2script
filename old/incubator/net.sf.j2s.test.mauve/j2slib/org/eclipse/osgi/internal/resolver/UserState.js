Clazz.declarePackage ("org.eclipse.osgi.internal.resolver");
Clazz.load (["org.eclipse.osgi.internal.resolver.StateImpl", "java.util.ArrayList"], "org.eclipse.osgi.internal.resolver.UserState", ["org.eclipse.osgi.internal.resolver.StateDeltaImpl"], function () {
c$ = Clazz.decorateAsClass (function () {
this.added = null;
this.removed = null;
this.updated = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.resolver, "UserState", org.eclipse.osgi.internal.resolver.StateImpl);
Clazz.prepareFields (c$, function () {
this.added =  new java.util.ArrayList ();
this.removed =  new java.util.ArrayList ();
this.updated =  new java.util.ArrayList ();
});
Clazz.defineMethod (c$, "addBundle", 
function (description) {
if (!Clazz.superCall (this, org.eclipse.osgi.internal.resolver.UserState, "addBundle", [description])) return false;
this.added.add (description.getLocation ());
return true;
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.defineMethod (c$, "removeBundle", 
function (description) {
if (!Clazz.superCall (this, org.eclipse.osgi.internal.resolver.UserState, "removeBundle", [description])) return false;
this.removed.add (description.getLocation ());
return true;
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.defineMethod (c$, "updateBundle", 
function (newDescription) {
if (!Clazz.superCall (this, org.eclipse.osgi.internal.resolver.UserState, "updateBundle", [newDescription])) return false;
this.updated.add (newDescription.getLocation ());
return true;
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.defineMethod (c$, "getAllAdded", 
function () {
return this.added.toArray ( new Array (this.added.size ()));
});
Clazz.defineMethod (c$, "getAllRemoved", 
function () {
return this.removed.toArray ( new Array (this.removed.size ()));
});
Clazz.defineMethod (c$, "getAllUpdated", 
function () {
return this.updated.toArray ( new Array (this.updated.size ()));
});
Clazz.overrideMethod (c$, "compare", 
function (baseState) {
var current = this.getBundles ();
var delta =  new org.eclipse.osgi.internal.resolver.StateDeltaImpl (this);
for (var i = 0; i < current.length; i++) {
var existing = baseState.getBundleByLocation (current[i].getLocation ());
if (existing == null) delta.recordBundleAdded (current[i]);
 else if (this.updated.contains (current[i].getLocation ())) delta.recordBundleUpdated (current[i]);
}
var existing = baseState.getBundles ();
for (var i = 0; i < existing.length; i++) {
var local = this.getBundleByLocation (existing[i].getLocation ());
if (local == null) delta.recordBundleRemoved (existing[i]);
}
return delta;
}, "org.eclipse.osgi.service.resolver.State");
});
