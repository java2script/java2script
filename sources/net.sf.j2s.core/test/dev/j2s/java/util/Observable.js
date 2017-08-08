Clazz.load (["java.util.Vector"], "java.util.Observable", ["java.lang.NullPointerException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "Observable");

Clazz.newMethod$(C$, '$init$', function () {
this.observers = Clazz.$new(java.util.Vector.construct);
this.changed = false;
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
}, 1);

Clazz.newMethod$ (C$, 'addObserver$java_util_Observer', function (observer) {
if (observer == null) {
throw Clazz.$new(NullPointerException.construct);
}if (!this.observers.contains$O (observer)) this.observers.addElement$java_util_Observer (observer);
});

Clazz.newMethod$ (C$, 'clearChanged', function () {
this.changed = false;
});

Clazz.newMethod$ (C$, 'countObservers', function () {
return this.observers.size ();
});

Clazz.newMethod$ (C$, 'deleteObserver$java_util_Observer', function (observer) {
this.observers.removeElement$O (observer);
});

Clazz.newMethod$ (C$, 'deleteObservers', function () {
this.observers.setSize$I (0);
});

Clazz.newMethod$ (C$, 'hasChanged', function () {
return this.changed;
});

Clazz.newMethod$ (C$, 'notifyObservers', function () {
this.notifyObservers$O (null);
});

Clazz.newMethod$ (C$, 'notifyObservers$O', function (data) {
if (this.changed) {
var clone = this.observers.clone ();
var size = clone.size ();
for (var i = 0; i < size; i++) {
clone.elementAt$I (i).update$java_util_Observable$O (this, data);
}
this.clearChanged ();
}});

Clazz.newMethod$ (C$, 'setChanged', function () {
this.changed = true;
});
})()
});

//Created 2017-08-08 06:13:48
