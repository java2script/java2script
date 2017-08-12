Clazz.load (null, "java.util.EventObject", ["java.lang.IllegalArgumentException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "EventObject", null, java.io.Serializable);

Clazz.newMethod$(C$, '$init$', function () {
this.source = null;
}, 1);

Clazz.newMethod$ (C$, 'construct', function (source) {
C$.$init$.apply(this);
if (source != null) this.source = source;
 else throw Clazz.$new(IllegalArgumentException.construct);
}, 1);

Clazz.newMethod$ (C$, 'getSource', function () {
return this.source;
});

Clazz.newMethod$ (C$, 'toString', function () {
return this.getClass ().getName () + "[source=" + String.valueOf$O (this.source) + ']';
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
});

//Created 2017-08-12 07:32:19
