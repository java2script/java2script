Clazz.declarePackage ("java.awt");
Clazz.load (null, "java.awt.Insets", ["java.lang.InternalError"], function () {
c$ = Clazz.decorateAsClass (function () {
this.top = 0;
this.left = 0;
this.bottom = 0;
this.right = 0;
Clazz.instantialize (this, arguments);
}, java.awt, "Insets", null, [Cloneable, java.io.Serializable]);
Clazz.makeConstructor (c$, 
function (top, left, bottom, right) {
this.top = top;
this.left = left;
this.bottom = bottom;
this.right = right;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "set", 
function (top, left, bottom, right) {
this.top = top;
this.left = left;
this.bottom = bottom;
this.right = right;
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (Clazz.instanceOf (obj, java.awt.Insets)) {
var insets = obj;
return ((this.top == insets.top) && (this.left == insets.left) && (this.bottom == insets.bottom) && (this.right == insets.right));
}return false;
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
var sum1 = this.left + this.bottom;
var sum2 = this.right + this.top;
var val1 = Clazz.doubleToInt (sum1 * (sum1 + 1) / 2) + this.left;
var val2 = Clazz.doubleToInt (sum2 * (sum2 + 1) / 2) + this.top;
var sum3 = val1 + val2;
return Clazz.doubleToInt (sum3 * (sum3 + 1) / 2) + val2;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "[top=" + this.top + ",left=" + this.left + ",bottom=" + this.bottom + ",right=" + this.right + "]";
});
Clazz.defineMethod (c$, "clone", 
function () {
try {
return Clazz.superCall (this, java.awt.Insets, "clone", []);
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
throw  new InternalError ();
} else {
throw e;
}
}
});
});
