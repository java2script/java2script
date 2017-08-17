Clazz.load (null, "java.lang.Thread", ["java.lang.IllegalArgumentException", "$.ThreadGroup", "java.util.Date"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang, "Thread", null, Runnable);

Clazz.newMethod$(C$, '$init$', function () {
this.target = null;
this.group = null;
this.name = null;
this.priority = 0;
}, 1);

Clazz.newMethod$(C$, 'currentThread', function () {
if (Thread.J2S_THREAD == null) {
Thread.J2S_THREAD = Clazz.$new(Thread.construct,[]);
}return Thread.J2S_THREAD;
}, 1);

Clazz.newMethod$(C$, 'sleep', function (millis) {
alert ("Thread.sleep is not implemented in Java2Script!");
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'construct', function (target) {
C$.$init$.apply(this);
C$.prototype.init.apply(this, [null, target, "Thread-" + Clazz.$new(java.util.Date.construct,[]).getTime () + Math.random (), 0]);
}, 1);

Clazz.newMethod$(C$, 'construct', function (group, target) {
C$.$init$.apply(this);
C$.prototype.init.apply(this, [group, target, "Thread-" + Clazz.$new(java.util.Date.construct,[]).getTime () + Math.random (), 0]);
}, 1);

Clazz.newMethod$(C$, 'construct', function (name) {
C$.$init$.apply(this);
C$.prototype.init.apply(this, [null, null, name, 0]);
}, 1);

Clazz.newMethod$(C$, 'construct', function (group, name) {
C$.$init$.apply(this);
C$.prototype.init.apply(this, [group, null, name, 0]);
}, 1);

Clazz.newMethod$(C$, 'construct', function (target, name) {
C$.$init$.apply(this);
C$.prototype.init.apply(this, [null, target, name, 0]);
}, 1);

Clazz.newMethod$(C$, 'construct', function (group, target, name) {
C$.$init$.apply(this);
C$.prototype.init.apply(this, [group, target, name, 0]);
}, 1);

Clazz.newMethod$(C$, 'construct', function (group, target, name, stackSize) {
C$.$init$.apply(this);
C$.prototype.init.apply(this, [group, target, name, stackSize]);
}, 1);

Clazz.newMethod$(C$, 'init', function (g, target, name, stackSize) {
if (g == null) {
g = Clazz.$new(ThreadGroup.construct,[]);
}this.group = g;
this.target = target;
this.name = name;
this.priority = 5;
});

Clazz.newMethod$(C$, 'start', function () {
window.setTimeout ((function (runnable) {
return function () {
runnable.run ();
};
}) (this), 0);
});

Clazz.newMethod$(C$, 'run', function () {
if (this.target != null) {
this.target.run ();
}});

Clazz.newMethod$(C$, 'setPriority', function (newPriority) {
if (newPriority > 10 || newPriority < 1) {
throw Clazz.$new(IllegalArgumentException.construct,[]);
}this.priority = newPriority;
});

Clazz.newMethod$(C$, 'getPriority', function () {
return this.priority;
});

Clazz.newMethod$(C$, 'setName', function (name) {
this.name = name;
});

Clazz.newMethod$(C$, 'getName', function () {
return String.valueOf$O (this.name);
});

Clazz.newMethod$(C$, 'getThreadGroup', function () {
return this.group;
});

Clazz.newMethod$(C$, 'toString', function () {
var group = this.getThreadGroup ();
if (group != null) {
return "Thread[" + this.getName () + "," + this.getPriority () + "," + group.getName () + "]";
} else {
return "Thread[" + this.getName () + "," + this.getPriority () + "," + "" + "]";
}});
Clazz.defineStatics (C$,
"MIN_PRIORITY", 1,
"NORM_PRIORITY", 5,
"MAX_PRIORITY", 10,
"J2S_THREAD", null);
})()
});

//Created 2017-08-17 10:33:14
