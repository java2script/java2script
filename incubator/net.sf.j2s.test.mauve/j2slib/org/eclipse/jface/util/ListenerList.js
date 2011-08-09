Clazz.declarePackage ("org.eclipse.jface.util");
Clazz.load (null, "org.eclipse.jface.util.ListenerList", ["org.eclipse.jface.util.Assert"], function () {
c$ = Clazz.decorateAsClass (function () {
this.capacity = 0;
this.$size = 0;
this.listeners = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.util, "ListenerList");
Clazz.makeConstructor (c$, 
function () {
this.construct (1);
});
Clazz.makeConstructor (c$, 
function (capacity) {
org.eclipse.jface.util.Assert.isTrue (capacity >= 1);
this.capacity = capacity;
}, "~N");
Clazz.defineMethod (c$, "add", 
function (listener) {
org.eclipse.jface.util.Assert.isNotNull (listener);
if (this.$size == 0) {
this.listeners =  new Array (this.capacity);
} else {
for (var i = 0; i < this.$size; ++i) {
if (this.listeners[i] === listener) {
return ;
}}
if (this.$size == this.listeners.length) {
System.arraycopy (this.listeners, 0, this.listeners =  new Array (this.$size * 2 + 1), 0, this.$size);
}}this.listeners[this.$size] = listener;
this.$size++;
}, "~O");
Clazz.defineMethod (c$, "clear", 
function () {
this.$size = 0;
this.listeners = null;
});
Clazz.defineMethod (c$, "getListeners", 
function () {
if (this.$size == 0) return org.eclipse.jface.util.ListenerList.EmptyArray;
var result =  new Array (this.$size);
System.arraycopy (this.listeners, 0, result, 0, this.$size);
return result;
});
Clazz.defineMethod (c$, "isEmpty", 
function () {
return this.$size == 0;
});
Clazz.defineMethod (c$, "remove", 
function (listener) {
org.eclipse.jface.util.Assert.isNotNull (listener);
for (var i = 0; i < this.$size; ++i) {
if (this.listeners[i] === listener) {
if (this.$size == 1) {
this.listeners = null;
this.$size = 0;
} else {
System.arraycopy (this.listeners, i + 1, this.listeners, i, --this.$size - i);
this.listeners[this.$size] = null;
}return ;
}}
}, "~O");
Clazz.defineMethod (c$, "size", 
function () {
return this.$size;
});
c$.EmptyArray = c$.prototype.EmptyArray =  new Array (0);
});
