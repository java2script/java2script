Clazz.declarePackage ("org.eclipse.core.commands.common");
Clazz.load (null, "org.eclipse.core.commands.common.HandleObject", ["java.lang.NullPointerException", "org.eclipse.core.internal.commands.util.Util"], function () {
c$ = Clazz.decorateAsClass (function () {
this.defined = false;
this.$hashCode = -1;
this.id = null;
this.string = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.commands.common, "HandleObject");
Clazz.makeConstructor (c$, 
function (id) {
if (id == null) {
throw  new NullPointerException ("Cannot create a handle with a null id");
}this.id = id;
}, "~S");
Clazz.defineMethod (c$, "getId", 
function () {
return this.id;
});
Clazz.overrideMethod (c$, "hashCode", 
function () {
if (this.$hashCode == -1) {
this.$hashCode = org.eclipse.core.commands.common.HandleObject.HASH_INITIAL * 89 + org.eclipse.core.internal.commands.util.Util.hashCode (this.id);
if (this.$hashCode == -1) {
this.$hashCode++;
}}return this.$hashCode;
});
Clazz.defineMethod (c$, "isDefined", 
function () {
return this.defined;
});
Clazz.defineStatics (c$,
"HASH_CODE_NOT_COMPUTED", -1,
"HASH_FACTOR", 89);
c$.HASH_INITIAL = c$.prototype.HASH_INITIAL = org.eclipse.core.commands.common.HandleObject.getName ().hashCode ();
});
