Clazz.declarePackage ("java.beans");
Clazz.load (["java.beans.PropertyChangeEvent"], "java.beans.IndexedPropertyChangeEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.index = 0;
Clazz.instantialize (this, arguments);
}, java.beans, "IndexedPropertyChangeEvent", java.beans.PropertyChangeEvent);
Clazz.makeConstructor (c$, 
function (source, propertyName, oldValue, newValue, index) {
Clazz.superConstructor (this, java.beans.IndexedPropertyChangeEvent, [source, propertyName, oldValue, newValue]);
this.index = index;
}, "~O,~S,~O,~O,~N");
Clazz.defineMethod (c$, "getIndex", 
function () {
return this.index;
});
});
