Clazz.declarePackage ("java.math");
Clazz.load (["java.lang.Enum"], "java.math.RoundingMode", ["java.lang.IllegalArgumentException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.oldMode = 0;
Clazz.instantialize (this, arguments);
}, java.math, "RoundingMode", Enum);
Clazz.makeConstructor (c$, 
 function (oldMode) {
this.oldMode = oldMode;
}, "~N");
c$.$valueOf = Clazz.defineMethod (c$, "$valueOf", 
function (rm) {
switch (rm) {
case 0:
return java.math.RoundingMode.UP;
case 1:
return java.math.RoundingMode.DOWN;
case 2:
return java.math.RoundingMode.CEILING;
case 3:
return java.math.RoundingMode.FLOOR;
case 4:
return java.math.RoundingMode.HALF_UP;
case 5:
return java.math.RoundingMode.HALF_DOWN;
case 6:
return java.math.RoundingMode.HALF_EVEN;
case 7:
return java.math.RoundingMode.UNNECESSARY;
default:
throw  new IllegalArgumentException ("argument out of range");
}
}, "~N");
Clazz.defineEnumConstant (c$, "UP", 0, [0]);
Clazz.defineEnumConstant (c$, "DOWN", 1, [1]);
Clazz.defineEnumConstant (c$, "CEILING", 2, [2]);
Clazz.defineEnumConstant (c$, "FLOOR", 3, [3]);
Clazz.defineEnumConstant (c$, "HALF_UP", 4, [4]);
Clazz.defineEnumConstant (c$, "HALF_DOWN", 5, [5]);
Clazz.defineEnumConstant (c$, "HALF_EVEN", 6, [6]);
Clazz.defineEnumConstant (c$, "UNNECESSARY", 7, [7]);
});
