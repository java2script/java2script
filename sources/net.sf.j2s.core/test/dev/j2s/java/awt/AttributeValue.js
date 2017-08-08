Clazz.declarePackage ("java.awt");
c$ = Clazz.decorateAsClass (function () {
this.value = 0;
this.names = null;
Clazz.instantialize (this, arguments);
}, java.awt, "AttributeValue");
Clazz.makeConstructor (c$, 
function (value, names) {
this.value = value;
this.names = names;
}, "~N,~A");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.value;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.names[this.value];
});
