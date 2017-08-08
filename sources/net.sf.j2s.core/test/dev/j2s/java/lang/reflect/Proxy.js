Clazz.load (null, "java.lang.reflect.Proxy", ["java.lang.IllegalArgumentException", "$.NullPointerException", "org.apache.harmony.luni.util.Msg"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang.reflect, "Proxy", null, java.io.Serializable);

Clazz.newMethod$(C$, '$init$', function () {
this.h = null;
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'construct$reflect_InvocationHandler', function (h) {
C$.$init$.apply(this);
this.h = h;
}, 1);

Clazz.newMethod$ (C$, 'getProxyClass$ClassLoader$ClassA', function (loader, interfaces) {
if (interfaces == null) {
throw Clazz.$new(NullPointerException.construct);
}return null;
}, 1);

Clazz.newMethod$ (C$, 'newProxyInstance$ClassLoader$ClassA$reflect_InvocationHandler', function (loader, interfaces, h) {
if (h != null) {
}throw Clazz.$new(NullPointerException.construct);
}, 1);

Clazz.newMethod$ (C$, 'isProxyClass$Class', function (cl) {
if (cl != null) {
}throw Clazz.$new(NullPointerException.construct);
}, 1);

Clazz.newMethod$ (C$, 'getInvocationHandler$O', function (proxy) {
if (java.lang.reflect.Proxy.isProxyClass$Class (proxy.getClass ())) {
return (proxy).h;
}throw Clazz.$new(IllegalArgumentException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K00f1")]);
}, 1);
})()
});

//Created 2017-08-08 06:13:45
