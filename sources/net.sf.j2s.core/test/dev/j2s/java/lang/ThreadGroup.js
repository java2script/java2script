Clazz.load (null, "java.lang.ThreadGroup", ["java.lang.NullPointerException", "$.Thread"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang, "ThreadGroup");

Clazz.newMethod$(C$, '$init$', function () {
this.parent = null;
this.name = null;
this.maxPriority = 0;
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
C$.$init$.apply(this);
this.name = "system";
this.maxPriority = 10;
}, 1);

Clazz.newMethod$(C$, 'construct', function (name) {
C$.construct.apply(this, [Thread.currentThread ().getThreadGroup (), name]);
}, 1);

Clazz.newMethod$(C$, 'construct', function (parent, name) {
C$.$init$.apply(this);
if (parent == null) {
throw Clazz.$new(NullPointerException.construct,[]);
}this.name = name;
this.parent = parent;
this.maxPriority = 10;
}, 1);

Clazz.newMethod$(C$, 'getName', function () {
return this.name;
});

Clazz.newMethod$(C$, 'getParent', function () {
return this.parent;
});

Clazz.newMethod$(C$, 'getMaxPriority', function () {
return this.maxPriority;
});
})()
});

//Created 2017-08-17 10:33:14
