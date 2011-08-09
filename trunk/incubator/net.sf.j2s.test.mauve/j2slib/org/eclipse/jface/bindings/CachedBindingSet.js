Clazz.declarePackage ("org.eclipse.jface.bindings");
Clazz.load (null, "org.eclipse.jface.bindings.CachedBindingSet", ["java.lang.NullPointerException", "org.eclipse.jface.util.Util"], function () {
c$ = Clazz.decorateAsClass (function () {
this.activeContextTree = null;
this.bindingsByTrigger = null;
this.$hashCode = 0;
this.hashCodeComputed = false;
this.locales = null;
this.platforms = null;
this.prefixTable = null;
this.schemeIds = null;
this.triggersByCommandId = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.bindings, "CachedBindingSet");
Clazz.makeConstructor (c$, 
function (activeContextTree, locales, platforms, schemeIds) {
if (locales == null) {
throw  new NullPointerException ("The locales cannot be null.");
}if (locales.length == 0) {
throw  new NullPointerException ("The locales cannot be empty.");
}if (platforms == null) {
throw  new NullPointerException ("The platforms cannot be null.");
}if (platforms.length == 0) {
throw  new NullPointerException ("The platforms cannot be empty.");
}this.activeContextTree = activeContextTree;
this.locales = locales;
this.platforms = platforms;
this.schemeIds = schemeIds;
}, "java.util.Map,~A,~A,~A");
Clazz.overrideMethod (c$, "equals", 
function (object) {
if (!(Clazz.instanceOf (object, org.eclipse.jface.bindings.CachedBindingSet))) {
return false;
}var other = object;
if (!org.eclipse.jface.util.Util.equals (this.activeContextTree, other.activeContextTree)) return false;
if (!org.eclipse.jface.util.Util.equals (this.locales, other.locales)) return false;
if (!org.eclipse.jface.util.Util.equals (this.platforms, other.platforms)) return false;
return org.eclipse.jface.util.Util.equals (this.schemeIds, other.schemeIds);
}, "~O");
Clazz.defineMethod (c$, "getBindingsByTrigger", 
function () {
return this.bindingsByTrigger;
});
Clazz.defineMethod (c$, "getPrefixTable", 
function () {
return this.prefixTable;
});
Clazz.defineMethod (c$, "getTriggersByCommandId", 
function () {
return this.triggersByCommandId;
});
Clazz.overrideMethod (c$, "hashCode", 
function () {
if (!this.hashCodeComputed) {
this.$hashCode = org.eclipse.jface.bindings.CachedBindingSet.HASH_INITIAL;
this.$hashCode = this.$hashCode * 89 + org.eclipse.jface.util.Util.hashCode (this.activeContextTree);
this.$hashCode = this.$hashCode * 89 + org.eclipse.jface.util.Util.hashCode (this.locales);
this.$hashCode = this.$hashCode * 89 + org.eclipse.jface.util.Util.hashCode (this.platforms);
this.$hashCode = this.$hashCode * 89 + org.eclipse.jface.util.Util.hashCode (this.schemeIds);
this.hashCodeComputed = true;
}return this.$hashCode;
});
Clazz.defineMethod (c$, "setBindingsByTrigger", 
function (commandIdsByTrigger) {
if (commandIdsByTrigger == null) {
throw  new NullPointerException ("Cannot set a null binding resolution");
}this.bindingsByTrigger = commandIdsByTrigger;
}, "java.util.Map");
Clazz.defineMethod (c$, "setPrefixTable", 
function (prefixTable) {
if (prefixTable == null) {
throw  new NullPointerException ("Cannot set a null prefix table");
}this.prefixTable = prefixTable;
}, "java.util.Map");
Clazz.defineMethod (c$, "setTriggersByCommandId", 
function (triggersByCommandId) {
if (triggersByCommandId == null) {
throw  new NullPointerException ("Cannot set a null binding resolution");
}this.triggersByCommandId = triggersByCommandId;
}, "java.util.Map");
Clazz.defineStatics (c$,
"HASH_FACTOR", 89);
c$.HASH_INITIAL = c$.prototype.HASH_INITIAL = org.eclipse.jface.bindings.CachedBindingSet.getName ().hashCode ();
});
