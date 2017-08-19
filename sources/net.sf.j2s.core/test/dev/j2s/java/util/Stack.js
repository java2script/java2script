Clazz.load (["java.util.Vector"], "java.util.Stack", ["java.util.EmptyStackException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "Stack", java.util.Vector);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
C$.superClazz.construct.apply(this, []);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'empty', function () {
return this.elementCount == 0;
});

Clazz.newMethod$(C$, 'peek', function () {
try {
return this.elementData[this.elementCount - 1];
} catch (e) {
if (Clazz.exceptionOf(e, IndexOutOfBoundsException)){
throw Clazz.$new(java.util.EmptyStackException.construct,[]);
} else {
throw e;
}
}
});

Clazz.newMethod$(C$, 'pop', function () {
try {
var index = this.elementCount - 1;
var obj = this.elementData[index];
this.removeElementAt$I (index);
return obj;
} catch (e) {
if (Clazz.exceptionOf(e, IndexOutOfBoundsException)){
throw Clazz.$new(java.util.EmptyStackException.construct,[]);
} else {
throw e;
}
}
});

Clazz.newMethod$(C$, 'push$TE', function (object) {
this.addElement$TE (object);
return object;
});

Clazz.newMethod$(C$, 'search$O', function (o) {
var index = this.lastIndexOf$O (o);
if (index >= 0) return (this.elementCount - index);
return -1;
});
})()
});

//Created 2017-08-18 22:18:04
