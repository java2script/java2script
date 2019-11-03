Clazz.declarePackage ("junit.extensions");
Clazz.load (["junit.extensions.TestDecorator"], "junit.extensions.RepeatedTest", ["java.lang.IllegalArgumentException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fTimesRepeat = 0;
Clazz.instantialize (this, arguments);
}, junit.extensions, "RepeatedTest", junit.extensions.TestDecorator);
Clazz.makeConstructor (c$, 
function (test, repeat) {
Clazz.superConstructor (this, junit.extensions.RepeatedTest, [test]);
if (repeat < 0) throw  new IllegalArgumentException ("Repetition count must be > 0");
this.fTimesRepeat = repeat;
}, "junit.framework.Test,~N");
Clazz.defineMethod (c$, "countTestCases", 
function () {
return Clazz.superCall (this, junit.extensions.RepeatedTest, "countTestCases", []) * this.fTimesRepeat;
});
Clazz.defineMethod (c$, "run", 
function (result) {
for (var i = 0; i < this.fTimesRepeat; i++) {
if (result.shouldStop ()) break;
Clazz.superCall (this, junit.extensions.RepeatedTest, "run", [result]);
}
}, "junit.framework.TestResult");
Clazz.defineMethod (c$, "toString", 
function () {
return Clazz.superCall (this, junit.extensions.RepeatedTest, "toString", []) + "(repeated)";
});
});
