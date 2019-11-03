Clazz.declarePackage ("org.eclipse.osgi.internal.resolver");
Clazz.load (["org.eclipse.osgi.service.resolver.StateDelta", "java.util.HashMap"], "org.eclipse.osgi.internal.resolver.StateDeltaImpl", ["java.util.ArrayList", "org.eclipse.osgi.internal.resolver.BundleDeltaImpl"], function () {
c$ = Clazz.decorateAsClass (function () {
this.state = null;
this.changes = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.resolver, "StateDeltaImpl", null, org.eclipse.osgi.service.resolver.StateDelta);
Clazz.prepareFields (c$, function () {
this.changes =  new java.util.HashMap ();
});
Clazz.makeConstructor (c$, 
function (state) {
this.state = state;
}, "org.eclipse.osgi.service.resolver.State");
Clazz.defineMethod (c$, "getChanges", 
function () {
return this.changes.values ().toArray ( new Array (this.changes.size ()));
});
Clazz.defineMethod (c$, "getChanges", 
function (mask, exact) {
var result =  new java.util.ArrayList ();
for (var changesIter = this.changes.values ().iterator (); changesIter.hasNext (); ) {
var change = changesIter.next ();
if (mask == change.getType () || (!exact && (change.getType () & mask) == mask)) result.add (change);
}
return result.toArray ( new Array (result.size ()));
}, "~N,~B");
Clazz.overrideMethod (c$, "getState", 
function () {
return this.state;
});
Clazz.defineMethod (c$, "recordBundleAdded", 
function (added) {
var change = this.changes.get (added);
if (change == null) {
this.changes.put (added,  new org.eclipse.osgi.internal.resolver.BundleDeltaImpl (added, 1));
return ;
}if (change.getType () == 2) {
this.changes.remove (added);
return ;
}var newType = change.getType ();
if ((newType & 2) != 0) newType &= -3;
change.setType (newType | 1);
change.setBundle (added);
}, "org.eclipse.osgi.internal.resolver.BundleDescriptionImpl");
Clazz.defineMethod (c$, "recordBundleUpdated", 
function (updated) {
var change = this.changes.get (updated);
if (change == null) {
this.changes.put (updated,  new org.eclipse.osgi.internal.resolver.BundleDeltaImpl (updated, 4));
return ;
}if ((change.getType () & (3)) != 0) return ;
change.setType (change.getType () | 4);
change.setBundle (updated);
}, "org.eclipse.osgi.internal.resolver.BundleDescriptionImpl");
Clazz.defineMethod (c$, "recordBundleRemoved", 
function (removed) {
var change = this.changes.get (removed);
if (change == null) {
this.changes.put (removed,  new org.eclipse.osgi.internal.resolver.BundleDeltaImpl (removed, 2));
return ;
}if (change.getType () == 1) {
this.changes.remove (removed);
return ;
}var newType = change.getType ();
if ((newType & 1) != 0) newType &= -2;
change.setType (newType | 2);
}, "org.eclipse.osgi.internal.resolver.BundleDescriptionImpl");
Clazz.defineMethod (c$, "recordBundleRemovalPending", 
function (removed) {
removed.setStateBit (4, true);
var change = this.changes.get (removed);
if (change == null) {
this.changes.put (removed,  new org.eclipse.osgi.internal.resolver.BundleDeltaImpl (removed, 128));
return ;
}var newType = change.getType ();
if ((newType & 256) != 0) newType &= -257;
change.setType (newType | 128);
}, "org.eclipse.osgi.internal.resolver.BundleDescriptionImpl");
Clazz.defineMethod (c$, "recordBundleRemovalComplete", 
function (removed) {
var change = this.changes.get (removed);
if (change == null) {
this.changes.put (removed,  new org.eclipse.osgi.internal.resolver.BundleDeltaImpl (removed, 256));
return ;
}var newType = change.getType ();
if ((newType & 128) != 0) newType &= -129;
change.setType (newType | 256);
}, "org.eclipse.osgi.internal.resolver.BundleDescriptionImpl");
Clazz.defineMethod (c$, "recordBundleResolved", 
function (resolved, result) {
if (resolved.isResolved () == result) return ;
var change = this.changes.get (resolved);
var newType = result ? 8 : 16;
if (change == null) {
change =  new org.eclipse.osgi.internal.resolver.BundleDeltaImpl (resolved, newType);
this.changes.put (resolved, change);
return ;
}newType = newType | (change.getType () & -25);
change.setType (newType);
change.setBundle (resolved);
}, "org.eclipse.osgi.internal.resolver.BundleDescriptionImpl,~B");
});
