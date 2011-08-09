Clazz.declarePackage ("org.eclipse.jface.bindings");
Clazz.load (null, "org.eclipse.jface.bindings.TriggerSequence", ["java.lang.IllegalArgumentException", "$.NullPointerException", "java.util.Arrays", "org.eclipse.jface.util.Util"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$hashCode = 0;
this.triggers = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.bindings, "TriggerSequence");
Clazz.makeConstructor (c$, 
function (triggers) {
if (triggers == null) {
throw  new NullPointerException ("The triggers cannot be null");
}for (var i = 0; i < triggers.length; i++) {
if (triggers[i] == null) {
throw  new IllegalArgumentException ("All triggers in a trigger sequence must be an instance of Trigger");
}}
var triggerLength = triggers.length;
this.triggers =  new Array (triggerLength);
System.arraycopy (triggers, 0, this.triggers, 0, triggerLength);
}, "~A");
Clazz.defineMethod (c$, "endsWith", 
function (triggerSequence, equals) {
if (triggerSequence == null) {
throw  new NullPointerException ("Cannot end with a null trigger sequence");
}return org.eclipse.jface.util.Util.endsWith (this.triggers, triggerSequence.triggers, equals);
}, "org.eclipse.jface.bindings.TriggerSequence,~B");
Clazz.overrideMethod (c$, "equals", 
function (object) {
if (!(Clazz.instanceOf (object, org.eclipse.jface.bindings.TriggerSequence))) return false;
var triggerSequence = object;
return java.util.Arrays.equals (this.triggers, triggerSequence.triggers);
}, "~O");
Clazz.defineMethod (c$, "getTriggers", 
function () {
var triggerLength = this.triggers.length;
var triggerCopy =  new Array (triggerLength);
System.arraycopy (this.triggers, 0, triggerCopy, 0, triggerLength);
return triggerCopy;
});
Clazz.overrideMethod (c$, "hashCode", 
function () {
if (this.$hashCode == -1) {
this.$hashCode = org.eclipse.jface.bindings.TriggerSequence.HASH_INITIAL;
this.$hashCode = this.$hashCode * 89 + org.eclipse.jface.util.Util.hashCode (this.triggers);
if (this.$hashCode == -1) {
this.$hashCode++;
}}return this.$hashCode;
});
Clazz.defineMethod (c$, "isEmpty", 
function () {
return (this.triggers.length == 0);
});
Clazz.defineMethod (c$, "startsWith", 
function (triggerSequence, equals) {
if (triggerSequence == null) throw  new NullPointerException ("A trigger sequence cannot start with null");
return org.eclipse.jface.util.Util.startsWith (this.triggers, triggerSequence.triggers, equals);
}, "org.eclipse.jface.bindings.TriggerSequence,~B");
Clazz.defineStatics (c$,
"HASH_CODE_NOT_COMPUTED", -1,
"HASH_FACTOR", 89);
c$.HASH_INITIAL = c$.prototype.HASH_INITIAL = org.eclipse.jface.bindings.TriggerSequence.getName ().hashCode ();
});
