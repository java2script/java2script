Clazz.declarePackage ("java.beans");
Clazz.load (["java.beans.ChangeListenerMap"], "java.beans.PropertyChangeSupport", ["java.lang.Boolean", "$.NullPointerException", "java.beans.IndexedPropertyChangeEvent", "$.PropertyChangeEvent", "$.PropertyChangeListenerProxy"], function () {
c$ = Clazz.decorateAsClass (function () {
this.map = null;
this.source = null;
Clazz.instantialize (this, arguments);
}, java.beans, "PropertyChangeSupport");
Clazz.prepareFields (c$, function () {
this.map =  new java.beans.PropertyChangeSupport.PropertyChangeListenerMap ();
});
Clazz.makeConstructor (c$, 
function (sourceBean) {
if (sourceBean == null) {
throw  new NullPointerException ();
}this.source = sourceBean;
}, "~O");
Clazz.defineMethod (c$, "addPropertyChangeListener", 
function (listener) {
this.addPropertyChangeListener1 (listener);
}, "java.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "addPropertyChangeListener1", 
function (listener) {
if (listener == null) {
return;
}if (Clazz.instanceOf (listener, java.beans.PropertyChangeListenerProxy)) {
var proxy = listener;
this.addPropertyChangeListener (proxy.getPropertyName (), proxy.getListener ());
} else {
this.map.add (null, listener);
}}, "java.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "removePropertyChangeListener", 
function (listener) {
if (listener == null) {
return;
}if (Clazz.instanceOf (listener, java.beans.PropertyChangeListenerProxy)) {
var proxy = listener;
this.removePropertyChangeListener (proxy.getPropertyName (), proxy.getListener ());
} else {
this.map.remove (null, listener);
}}, "java.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "getPropertyChangeListeners", 
function () {
return this.map.getListeners ();
});
Clazz.defineMethod (c$, "addPropertyChangeListener", 
function (propertyName, listener) {
{
if (arguments.length == 1) {
this.addPropertyChangeListener1(propertyName);
return;
}
}this.addPropertyChangeListener2 (propertyName, listener);
}, "~S,java.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "addPropertyChangeListener2", 
function (propertyName, listener) {
if (listener == null || propertyName == null) {
return;
}listener = this.map.extract (listener);
if (listener != null) {
this.map.add (propertyName, listener);
}}, "~S,java.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "removePropertyChangeListener", 
function (propertyName, listener) {
if (listener == null || propertyName == null) {
return;
}listener = this.map.extract (listener);
if (listener != null) {
this.map.remove (propertyName, listener);
}}, "~S,java.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "getPropertyChangeListeners", 
function (propertyName) {
return this.map.getListeners (propertyName);
}, "~S");
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
if (oldValue != null && newValue != null && oldValue.equals (newValue)) {
return;
}this.firePropertyChangeEvt ( new java.beans.PropertyChangeEvent (this.source, propertyName, oldValue, newValue));
}, "~S,~O,~O");
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
if (oldValue == newValue) {
return;
}this.firePropertyChange (propertyName, Integer.$valueOf (oldValue), Integer.$valueOf (newValue));
}, "~S,~N,~N");
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
if (oldValue == newValue) {
return;
}this.firePropertyChange (propertyName, Boolean.$valueOf (oldValue), Boolean.$valueOf (newValue));
}, "~S,~B,~B");
Clazz.defineMethod (c$, "firePropertyChangeEvt", 
function (evt) {
var oldValue = evt.getOldValue ();
var newValue = evt.getNewValue ();
var propertyName = evt.getPropertyName ();
if (oldValue != null && newValue != null && oldValue.equals (newValue)) {
return;
}var common = this.map.get (null);
var named = (propertyName != null) ? this.map.get (propertyName) : null;
this.fire (common, evt);
this.fire (named, evt);
}, "java.beans.PropertyChangeEvent");
Clazz.defineMethod (c$, "fire", 
 function (listeners, event) {
if (listeners != null) {
for (var listener, $listener = 0, $$listener = listeners; $listener < $$listener.length && ((listener = $$listener[$listener]) || true); $listener++) {
listener.propertyChange (event);
}
}}, "~A,java.beans.PropertyChangeEvent");
Clazz.defineMethod (c$, "fireIndexedPropertyChange", 
function (propertyName, index, oldValue, newValue) {
this.firePropertyChangeEvt ( new java.beans.IndexedPropertyChangeEvent (this.source, propertyName, oldValue, newValue, index));
}, "~S,~N,~O,~O");
Clazz.defineMethod (c$, "fireIndexedPropertyChange", 
function (propertyName, index, oldValue, newValue) {
if (oldValue == newValue) {
return;
}this.fireIndexedPropertyChange (propertyName, index, Integer.$valueOf (oldValue), Integer.$valueOf (newValue));
}, "~S,~N,~N,~N");
Clazz.defineMethod (c$, "fireIndexedPropertyChange", 
function (propertyName, index, oldValue, newValue) {
if (oldValue == newValue) {
return;
}this.fireIndexedPropertyChange (propertyName, index, Boolean.$valueOf (oldValue), Boolean.$valueOf (newValue));
}, "~S,~N,~B,~B");
Clazz.defineMethod (c$, "hasListeners", 
function (propertyName) {
return this.map.hasListeners (propertyName);
}, "~S");
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.beans.PropertyChangeSupport, "PropertyChangeListenerMap", java.beans.ChangeListenerMap);
Clazz.overrideMethod (c$, "newArray", 
function (a) {
return (0 < a) ?  new Array (a) : java.beans.PropertyChangeSupport.PropertyChangeListenerMap.EMPTY;
}, "~N");
Clazz.overrideMethod (c$, "newProxy", 
function (a, b) {
return  new java.beans.PropertyChangeListenerProxy (a, b);
}, "~S,java.beans.PropertyChangeListener");
Clazz.defineStatics (c$,
"EMPTY",  Clazz.newArray (-1, []));
c$ = Clazz.p0p ();
});
