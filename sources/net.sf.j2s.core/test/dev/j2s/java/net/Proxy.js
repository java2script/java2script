Clazz.declarePackage ("java.net");
Clazz.load (["java.lang.Enum"], "java.net.Proxy", ["java.lang.IllegalArgumentException", "java.net.InetSocketAddress"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$type = null;
this.sa = null;
Clazz.instantialize (this, arguments);
}, java.net, "Proxy");
Clazz.makeConstructor (c$, 
 function () {
this.$type = java.net.Proxy.Type.DIRECT;
this.sa = null;
});
Clazz.makeConstructor (c$, 
function (type, sa) {
if ((type === java.net.Proxy.Type.DIRECT) || !(Clazz.instanceOf (sa, java.net.InetSocketAddress))) throw  new IllegalArgumentException ("type " + type + " is not compatible with address " + sa);
this.$type = type;
this.sa = sa;
}, "java.net.Proxy.Type,java.net.SocketAddress");
Clazz.defineMethod (c$, "type", 
function () {
return this.$type;
});
Clazz.defineMethod (c$, "address", 
function () {
return this.sa;
});
Clazz.overrideMethod (c$, "toString", 
function () {
if (this.type () === java.net.Proxy.Type.DIRECT) return "DIRECT";
return this.type () + " @ " + this.address ();
});
Clazz.defineMethod (c$, "equals", 
function (obj) {
if (obj == null || !(Clazz.instanceOf (obj, java.net.Proxy))) return false;
var p = obj;
if (p.type () === this.type ()) {
if (this.address () == null) {
return (p.address () == null);
} else return this.address ().equals (p.address ());
}return false;
}, "~O");
Clazz.defineMethod (c$, "hashCode", 
function () {
if (this.address () == null) return this.type ().hashCode ();
return this.type ().hashCode () + this.address ().hashCode ();
});
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.net.Proxy, "Type", Enum);
Clazz.defineEnumConstant (c$, "DIRECT", 0, []);
Clazz.defineEnumConstant (c$, "HTTP", 1, []);
Clazz.defineEnumConstant (c$, "SOCKS", 2, []);
c$ = Clazz.p0p ();
c$.NO_PROXY = c$.prototype.NO_PROXY =  new java.net.Proxy ();
});
