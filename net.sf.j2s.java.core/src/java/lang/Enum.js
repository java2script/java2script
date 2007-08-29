Clazz.load (["java.io.Serializable", "java.lang.Comparable"], "java.lang.Enum", ["java.lang.ClassCastException", "$.CloneNotSupportedException", "$.IllegalArgumentException", "$.NullPointerException"], function () {
c$ = java.lang.Enum = Enum = function () {
this.$name = null;
this.$ordinal = 0;
Clazz.instantialize (this, arguments);
};
Clazz.decorateAsType (c$, "Enum", null, [Comparable, java.io.Serializable]);
Clazz.defineMethod (c$, "name", 
function () {
return this.$name;
});
Clazz.defineMethod (c$, "ordinal", 
function () {
return this.$ordinal;
});
Clazz.makeConstructor (c$, 
function (name, ordinal) {
this.$name = name;
this.$ordinal = ordinal;
}, "String, Number");
Clazz.defineMethod (c$, "toString", 
function () {
return this.$name;
});
Clazz.defineMethod (c$, "equals", 
function (other) {
return this == other;
}, "Object");
Clazz.defineMethod (c$, "hashCode", 
function () {
return System.identityHashCode (this);
});
Clazz.defineMethod (c$, "clone", 
function () {
throw  new CloneNotSupportedException ();
});
Clazz.defineMethod (c$, "compareTo", 
function (o) {
var other = o;
var self = this;
if (self.getClass () != other.getClass () && self.getDeclaringClass () != other.getDeclaringClass ()) throw  new ClassCastException ();
return self.ordinal - other.ordinal;
}, "E");
Clazz.defineMethod (c$, "getDeclaringClass", 
function () {
var clazz = this.getClass ();
var zuper = clazz.getSuperclass ();
return (zuper == Enum) ? clazz : zuper;
});
Clazz.defineMethod (Enum, "$valueOf", 
function (enumType, name) {
	return enumType.$valueOf (name);
}, "Object, String"); /* "Class, String" */
Clazz.defineMethod (Enum, "$valueOf", 
function (name) {
if (name == null) throw  new NullPointerException ("Name is null");
var vals = this.values ();
for (var i = 0; i < vals.length; i++) {
	if (name == vals[i].name ()) {
		return vals[i];
	}
}
throw  new IllegalArgumentException ("No enum const " + enumType + "." + name);
}, "String");
Enum.$valueOf = Enum.prototype.$valueOf;
Clazz.defineMethod (Enum, "values", 
function () {
	if (this.$ALL$ENUMS != null) {
		return this.$ALL$ENUMS;
	}
	this.$ALL$ENUMS = new Array ();
	var clazzThis = this.getClass ();
	for (var e in clazzThis) {
		if (clazzThis[e] != null && clazzThis[e].__CLASS_NAME__ != null 
				&& e != "prototype"
				&& Clazz.instanceOf (clazzThis[e], clazzThis)) {
			this.$ALL$ENUMS[this.$ALL$ENUMS.length] = clazzThis[e];
		}
	}
	return this.$ALL$ENUMS;
});
Enum.values = Enum.prototype.values;
});