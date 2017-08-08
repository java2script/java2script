Clazz.declarePackage ("java.text");
c$ = Clazz.decorateAsClass (function () {
this.index = 0;
this.errorIndex = -1;
Clazz.instantialize (this, arguments);
}, java.text, "ParsePosition");
Clazz.defineMethod (c$, "getIndex", 
function () {
return this.index;
});
Clazz.defineMethod (c$, "setIndex", 
function (index) {
this.index = index;
}, "~N");
Clazz.makeConstructor (c$, 
function (index) {
this.index = index;
}, "~N");
Clazz.defineMethod (c$, "setErrorIndex", 
function (ei) {
this.errorIndex = ei;
}, "~N");
Clazz.defineMethod (c$, "getErrorIndex", 
function () {
return this.errorIndex;
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (obj == null) return false;
if (!(Clazz.instanceOf (obj, java.text.ParsePosition))) return false;
var other = obj;
return (this.index == other.index && this.errorIndex == other.errorIndex);
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return (this.errorIndex << 16) | this.index;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "[index=" + this.index + ",errorIndex=" + this.errorIndex + ']';
});
