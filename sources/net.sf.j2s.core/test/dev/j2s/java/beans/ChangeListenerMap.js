Clazz.declarePackage ("java.beans");
Clazz.load (null, "java.beans.ChangeListenerMap", ["java.util.ArrayList", "$.Collections", "$.EventListenerProxy", "$.HashMap"], function () {
c$ = Clazz.decorateAsClass (function () {
this.map = null;
Clazz.instantialize (this, arguments);
}, java.beans, "ChangeListenerMap");
Clazz.defineMethod (c$, "add", 
function (name, listener) {
if (this.map == null) {
this.map =  new java.util.HashMap ();
}var array = this.map.get (name);
var size = (array != null) ? array.length : 0;
var clone = this.newArray (size + 1);
clone[size] = listener;
if (array != null) {
System.arraycopy (array, 0, clone, 0, size);
}this.map.put (name, clone);
}, "~S,~O");
Clazz.defineMethod (c$, "remove", 
function (name, listener) {
if (this.map != null) {
var array = this.map.get (name);
if (array != null) {
for (var i = 0; i < array.length; i++) {
if (listener.equals (array[i])) {
var size = array.length - 1;
if (size > 0) {
var clone = this.newArray (size);
System.arraycopy (array, 0, clone, 0, i);
System.arraycopy (array, i + 1, clone, i, size - i);
this.map.put (name, clone);
} else {
this.map.remove (name);
if (this.map.isEmpty ()) {
this.map = null;
}}break;
}}
}}}, "~S,~O");
Clazz.defineMethod (c$, "get", 
function (name) {
return (this.map != null) ? this.map.get (name) : null;
}, "~S");
Clazz.defineMethod (c$, "set", 
function (name, listeners) {
if (listeners != null) {
if (this.map == null) {
this.map =  new java.util.HashMap ();
}this.map.put (name, listeners);
} else if (this.map != null) {
this.map.remove (name);
if (this.map.isEmpty ()) {
this.map = null;
}}}, "~S,~A");
Clazz.defineMethod (c$, "getListeners", 
function () {
if (this.map == null) {
return this.newArray (0);
}var list =  new java.util.ArrayList ();
var listeners = this.map.get (null);
if (listeners != null) {
for (var listener, $listener = 0, $$listener = listeners; $listener < $$listener.length && ((listener = $$listener[$listener]) || true); $listener++) {
list.add (listener);
}
}for (var entry, $entry = this.map.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var name = entry.getKey ();
if (name != null) {
for (var listener, $listener = 0, $$listener = entry.getValue (); $listener < $$listener.length && ((listener = $$listener[$listener]) || true); $listener++) {
list.add (this.newProxy (name, listener));
}
}}
return list.toArray (this.newArray (list.size ()));
});
Clazz.defineMethod (c$, "getListeners", 
function (name) {
if (name != null) {
var listeners = this.get (name);
if (listeners != null) {
return listeners.clone ();
}}return this.newArray (0);
}, "~S");
Clazz.defineMethod (c$, "hasListeners", 
function (name) {
if (this.map == null) {
return false;
}var array = this.map.get (null);
return (array != null) || ((name != null) && (null != this.map.get (name)));
}, "~S");
Clazz.defineMethod (c$, "getEntries", 
function () {
return (this.map != null) ? this.map.entrySet () : java.util.Collections.emptySet ();
});
Clazz.defineMethod (c$, "extract", 
function (listener) {
while (Clazz.instanceOf (listener, java.util.EventListenerProxy)) {
var proxy = listener;
listener = proxy.getListener ();
}
return listener;
}, "~O");
});
