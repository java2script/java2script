Clazz.declarePackage ("org.eclipse.osgi.framework.eventmgr");
Clazz.load (null, "org.eclipse.osgi.framework.eventmgr.EventListeners", ["java.lang.IllegalArgumentException", "$.IndexOutOfBoundsException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.initialCapacity = 0;
this.list = null;
this.size = 0;
this.copyOnWrite = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.eventmgr, "EventListeners");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.primary = null;
this.companion = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.eventmgr.EventListeners, "ListElement");
Clazz.makeConstructor (c$, 
function (a, b) {
this.primary = a;
this.companion = b;
}, "~O,~O");
c$ = Clazz.p0p ();
Clazz.makeConstructor (c$, 
function () {
this.construct (10);
});
Clazz.makeConstructor (c$, 
function (capacity) {
if (capacity < 1) throw  new IllegalArgumentException ();
this.initialCapacity = capacity;
}, "~N");
Clazz.defineMethod (c$, "addListener", 
function (listener, listenerObject) {
if (listener == null) {
throw  new IllegalArgumentException ();
}if (this.size == 0) {
this.list =  new Array (this.initialCapacity);
} else {
if (this.copyOnWrite) {
this.copyList (this.size);
this.copyOnWrite = false;
}for (var i = 0; i < this.size; i++) {
if (this.list[i].primary === listener) {
this.list[i] =  new org.eclipse.osgi.framework.eventmgr.EventListeners.ListElement (listener, listenerObject);
return ;
}}
if (this.size == this.list.length) {
this.copyList (this.size);
}}this.list[this.size] =  new org.eclipse.osgi.framework.eventmgr.EventListeners.ListElement (listener, listenerObject);
this.size++;
}, "~O,~O");
Clazz.defineMethod (c$, "removeListener", 
function (listener) {
if (listener == null) {
throw  new IllegalArgumentException ();
}for (var i = 0; i < this.size; i++) {
if (this.list[i].primary === listener) {
this.size--;
if (this.size == 0) {
this.list = null;
return ;
}if (this.copyOnWrite) {
this.copyList (i);
this.copyOnWrite = false;
} else {
System.arraycopy (this.list, i + 1, this.list, i, this.size - i);
this.list[this.size] = null;
}return ;
}}
}, "~O");
Clazz.defineMethod (c$, "removeAllListeners", 
function () {
this.list = null;
this.size = 0;
});
Clazz.defineMethod (c$, "getListeners", 
function () {
if (this.size == 0) {
return org.eclipse.osgi.framework.eventmgr.EventListeners.emptyArray;
}this.copyOnWrite = true;
return this.list;
});
Clazz.defineMethod (c$, "copyList", 
($fz = function (i) {
if (i > this.size) {
throw  new IndexOutOfBoundsException ();
}var capacity = Math.floor ((this.size * 3) / 2) + 1;
if (capacity < this.initialCapacity) {
capacity = this.initialCapacity;
}var newList =  new Array (capacity);
System.arraycopy (this.list, 0, newList, 0, i);
if (i < this.size) {
System.arraycopy (this.list, i + 1, newList, i, this.size - i);
}this.list = newList;
}, $fz.isPrivate = true, $fz), "~N");
c$.emptyArray = c$.prototype.emptyArray =  new Array (0);
});
