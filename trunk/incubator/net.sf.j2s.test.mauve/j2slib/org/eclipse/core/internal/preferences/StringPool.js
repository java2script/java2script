Clazz.declarePackage ("org.eclipse.core.internal.preferences");
Clazz.load (["java.util.HashMap"], "org.eclipse.core.internal.preferences.StringPool", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.savings = 0;
this.map = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.preferences, "StringPool");
Clazz.prepareFields (c$, function () {
this.map =  new java.util.HashMap ();
});
Clazz.defineMethod (c$, "add", 
function (string) {
if (string == null) return string;
var result = this.map.get (string);
if (result != null) {
if (result !== string) this.savings += 44 + 2 * string.length;
return result;
}this.map.put (string, string);
return string;
}, "~S");
Clazz.defineMethod (c$, "getSavedStringCount", 
function () {
return this.savings;
});
});
