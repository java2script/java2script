Clazz.declarePackage ("sun.awt");
Clazz.load (null, "sun.awt.EventListenerAggregate", ["java.lang.ClassCastException", "$.NullPointerException", "java.lang.reflect.Array", "java.util.EventListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.listenerList = null;
Clazz.instantialize (this, arguments);
}, sun.awt, "EventListenerAggregate");
Clazz.makeConstructor (c$, 
function (listenerClass) {
if (listenerClass == null) {
throw  new NullPointerException ("listener class is null");
}if (!java.util.EventListener.isAssignableFrom (listenerClass)) {
throw  new ClassCastException ("listener class " + listenerClass + " is not assignable to EventListener");
}this.listenerList = java.lang.reflect.Array.newInstance (listenerClass, 0);
}, "Class");
Clazz.defineMethod (c$, "getListenerClass", 
 function () {
return this.listenerList.getClass ().getComponentType ();
});
Clazz.defineMethod (c$, "add", 
function (listener) {
var listenerClass = this.getListenerClass ();
if (!listenerClass.isInstance (listener)) {
throw  new ClassCastException ("listener " + listener + " is not " + "an instance of listener class " + listenerClass);
}var tmp = java.lang.reflect.Array.newInstance (listenerClass, this.listenerList.length + 1);
System.arraycopy (this.listenerList, 0, tmp, 0, this.listenerList.length);
tmp[this.listenerList.length] = listener;
this.listenerList = tmp;
}, "java.util.EventListener");
Clazz.defineMethod (c$, "remove", 
function (listener) {
var listenerClass = this.getListenerClass ();
if (!listenerClass.isInstance (listener)) {
throw  new ClassCastException ("listener " + listener + " is not " + "an instance of listener class " + listenerClass);
}for (var i = 0; i < this.listenerList.length; i++) {
if (this.listenerList[i].equals (listener)) {
var tmp = java.lang.reflect.Array.newInstance (listenerClass, this.listenerList.length - 1);
System.arraycopy (this.listenerList, 0, tmp, 0, i);
System.arraycopy (this.listenerList, i + 1, tmp, i, this.listenerList.length - i - 1);
this.listenerList = tmp;
return true;
}}
return false;
}, "java.util.EventListener");
Clazz.defineMethod (c$, "getListenersInternal", 
function () {
return this.listenerList;
});
Clazz.defineMethod (c$, "getListenersCopy", 
function () {
return (this.listenerList.length == 0) ? this.listenerList : this.listenerList.clone ();
});
Clazz.defineMethod (c$, "size", 
function () {
return this.listenerList.length;
});
Clazz.defineMethod (c$, "isEmpty", 
function () {
return this.listenerList.length == 0;
});
});
