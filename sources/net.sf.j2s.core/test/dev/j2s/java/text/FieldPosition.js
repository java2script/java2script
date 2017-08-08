Clazz.declarePackage ("java.text");
Clazz.load (["java.text.Format"], "java.text.FieldPosition", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.field = 0;
this.endIndex = 0;
this.beginIndex = 0;
this.attribute = null;
if (!Clazz.isClassDefined ("java.text.FieldPosition.Delegate")) {
java.text.FieldPosition.$FieldPosition$Delegate$ ();
}
Clazz.instantialize (this, arguments);
}, java.text, "FieldPosition");
Clazz.makeConstructor (c$, 
function (field) {
this.field = field;
}, "~N");
Clazz.makeConstructor (c$, 
function (attribute) {
this.construct (attribute, -1);
}, "java.text.Format.Field");
Clazz.makeConstructor (c$, 
function (attribute, fieldID) {
this.attribute = attribute;
this.field = fieldID;
}, "java.text.Format.Field,~N");
Clazz.defineMethod (c$, "getFieldAttribute", 
function () {
return this.attribute;
});
Clazz.defineMethod (c$, "getField", 
function () {
return this.field;
});
Clazz.defineMethod (c$, "getBeginIndex", 
function () {
return this.beginIndex;
});
Clazz.defineMethod (c$, "getEndIndex", 
function () {
return this.endIndex;
});
Clazz.defineMethod (c$, "setBeginIndex", 
function (bi) {
this.beginIndex = bi;
}, "~N");
Clazz.defineMethod (c$, "setEndIndex", 
function (ei) {
this.endIndex = ei;
}, "~N");
Clazz.defineMethod (c$, "getFieldDelegate", 
function () {
return Clazz.innerTypeInstance (java.text.FieldPosition.Delegate, this, null);
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (obj == null) return false;
if (!(Clazz.instanceOf (obj, java.text.FieldPosition))) return false;
var other = obj;
if (this.attribute == null) {
if (other.attribute != null) {
return false;
}} else if (!this.attribute.equals (other.attribute)) {
return false;
}return (this.beginIndex == other.beginIndex && this.endIndex == other.endIndex && this.field == other.field);
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return (this.field << 24) | (this.beginIndex << 16) | this.endIndex;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "[field=" + this.field + ",attribute=" + this.attribute + ",beginIndex=" + this.beginIndex + ",endIndex=" + this.endIndex + ']';
});
Clazz.defineMethod (c$, "matchesField", 
 function (attribute) {
if (this.attribute != null) {
return this.attribute.equals (attribute);
}return false;
}, "java.text.Format.Field");
Clazz.defineMethod (c$, "matchesField", 
 function (attribute, field) {
if (this.attribute != null) {
return this.attribute.equals (attribute);
}return (field == this.field);
}, "java.text.Format.Field,~N");
c$.$FieldPosition$Delegate$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.encounteredField = false;
Clazz.instantialize (this, arguments);
}, java.text.FieldPosition, "Delegate", null, java.text.Format.FieldDelegate);
Clazz.defineMethod (c$, "formatted", 
function (a, b, c, d, e) {
if (!this.encounteredField && this.b$["java.text.FieldPosition"].matchesField (a)) {
this.b$["java.text.FieldPosition"].setBeginIndex (c);
this.b$["java.text.FieldPosition"].setEndIndex (d);
this.encounteredField = (c != d);
}}, "java.text.Format.Field,~O,~N,~N,StringBuffer");
Clazz.defineMethod (c$, "formatted", 
function (a, b, c, d, e, f) {
if (!this.encounteredField && this.b$["java.text.FieldPosition"].matchesField (b, a)) {
this.b$["java.text.FieldPosition"].setBeginIndex (d);
this.b$["java.text.FieldPosition"].setEndIndex (e);
this.encounteredField = (d != e);
}}, "~N,java.text.Format.Field,~O,~N,~N,StringBuffer");
c$ = Clazz.p0p ();
};
});
