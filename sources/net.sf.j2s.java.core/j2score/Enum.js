Clazz.declarePackage ("java.lang");
cla$$ = java.lang.Enum = Enum = function () {
this.$name = null;
this.$ordinal = 0;
Clazz.instantialize (this, arguments);
};
Clazz.decorateAsType (cla$$, "Enum", null, [Comparable, java.io.Serializable]);
Clazz.defineMethod (cla$$, "name", 
function () {
return this.$name;
});
Clazz.defineMethod (cla$$, "ordinal", 
function () {
return this.$ordinal;
});
Clazz.makeConstructor (cla$$, 
function (name, ordinal) {
this.$name = name;
this.$ordinal = ordinal;
}, "String, Number");
Clazz.defineMethod (cla$$, "toString", 
function () {
return this.$name;
});
Clazz.defineMethod (cla$$, "equals", 
function (other) {
return this == other;
}, "Object");
Clazz.defineMethod (cla$$, "hashCode", 
function () {
return System.identityHashCode (this);
});
Clazz.defineMethod (cla$$, "clone", 
function () {
throw  new CloneNotSupportedException ();
});
Clazz.defineMethod (cla$$, "compareTo", 
function (o) {
var other = o;
var self = this;
if (self.getClass () != other.getClass () && self.getDeclaringClass () != other.getDeclaringClass ()) throw  new ClassCastException ();
return self.ordinal - other.ordinal;
}, "E");
Clazz.defineMethod (cla$$, "getDeclaringClass", 
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

