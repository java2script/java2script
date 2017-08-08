Clazz.declarePackage ("java.beans");
Clazz.load (["java.beans.FeatureDescriptor"], "java.beans.PropertyDescriptor", ["java.lang.RuntimeException", "$.Void", "java.beans.IntrospectionException", "$.PropertyChangeListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.propertyTypeRef = null;
this.readMethodRef = null;
this.writeMethodRef = null;
this.propertyEditorClassRef = null;
this.bound = false;
this.constrained = false;
this.baseName = null;
this.writeMethodName = null;
this.readMethodName = null;
Clazz.instantialize (this, arguments);
}, java.beans, "PropertyDescriptor", java.beans.FeatureDescriptor);
Clazz.makeConstructor (c$, 
function (propertyName, beanClass) {
this.construct (propertyName, beanClass, propertyName, propertyName);
}, "~S,Class");
Clazz.makeConstructor (c$, 
function (propertyName, beanClass, readMethodName, writeMethodName) {
Clazz.superConstructor (this, java.beans.PropertyDescriptor, []);
if (beanClass == null) {
throw  new java.beans.IntrospectionException ("Target Bean class is null");
}if (propertyName == null || propertyName.length == 0) {
throw  new java.beans.IntrospectionException ("bad property name");
}if ("".equals (readMethodName) || "".equals (writeMethodName)) {
throw  new java.beans.IntrospectionException ("read or write method name should not be the empty string");
}this.setName (propertyName);
this.setClass0 (beanClass);
this.readMethodName = readMethodName;
if (readMethodName != null && this.getReadMethod () == null) {
throw  new java.beans.IntrospectionException ("Method not found: " + readMethodName);
}this.writeMethodName = writeMethodName;
if (writeMethodName != null && this.getWriteMethod () == null) {
throw  new java.beans.IntrospectionException ("Method not found: " + writeMethodName);
}var name = "addPropertyChangeListener";
var args =  Clazz.newArray (-1, [java.beans.PropertyChangeListener]);
}, "~S,Class,~S,~S");
Clazz.makeConstructor (c$, 
function (propertyName, readMethod, writeMethod) {
Clazz.superConstructor (this, java.beans.PropertyDescriptor, []);
if (propertyName == null || propertyName.length == 0) {
throw  new java.beans.IntrospectionException ("bad property name");
}this.setName (propertyName);
this.setReadMethod (readMethod);
this.setWriteMethod (writeMethod);
}, "~S,java.lang.reflect.Method,java.lang.reflect.Method");
Clazz.makeConstructor (c$, 
function (bean, base, read, write) {
Clazz.superConstructor (this, java.beans.PropertyDescriptor, []);
if (bean == null) {
throw  new java.beans.IntrospectionException ("Target Bean class is null");
}this.setClass0 (bean);
this.setReadMethod (read);
this.setWriteMethod (write);
this.baseName = base;
}, "Class,~S,java.lang.reflect.Method,java.lang.reflect.Method");
Clazz.defineMethod (c$, "getPropertyType", 
function () {
var type = this.getPropertyType0 ();
if (type == null) {
try {
type = this.findPropertyType (this.getReadMethod (), this.getWriteMethod ());
this.setPropertyType (type);
} catch (ex) {
if (Clazz.exceptionOf (ex, java.beans.IntrospectionException)) {
} else {
throw ex;
}
}
}return type;
});
Clazz.defineMethod (c$, "setPropertyType", 
 function (type) {
this.propertyTypeRef = type;
}, "Class");
Clazz.defineMethod (c$, "getPropertyType0", 
 function () {
return (this.propertyTypeRef != null) ? this.propertyTypeRef : null;
});
Clazz.defineMethod (c$, "getReadMethod", 
function () {
var readMethod = this.getReadMethod0 ();
if (readMethod == null) {
var cls = this.getClass0 ();
if (cls == null || (this.readMethodName == null && this.readMethodRef == null)) {
return null;
}if (this.readMethodName == null) {
var type = this.getPropertyType0 ();
}try {
this.setReadMethod (readMethod);
} catch (ex) {
if (Clazz.exceptionOf (ex, java.beans.IntrospectionException)) {
} else {
throw ex;
}
}
}return readMethod;
});
Clazz.defineMethod (c$, "setReadMethod", 
function (readMethod) {
if (readMethod == null) {
this.readMethodName = null;
this.readMethodRef = null;
return;
}this.setPropertyType (this.findPropertyType (readMethod, this.getWriteMethod0 ()));
this.setClass0 (readMethod.getDeclaringClass ());
this.readMethodName = readMethod.getName ();
this.readMethodRef = readMethod;
}, "java.lang.reflect.Method");
Clazz.defineMethod (c$, "getWriteMethod", 
function () {
var writeMethod = this.getWriteMethod0 ();
if (writeMethod == null) {
var cls = this.getClass0 ();
if (cls == null || (this.writeMethodName == null && this.writeMethodRef == null)) {
return null;
}var type = this.getPropertyType0 ();
if (type == null) {
try {
type = this.findPropertyType (this.getReadMethod (), null);
this.setPropertyType (type);
} catch (ex) {
if (Clazz.exceptionOf (ex, java.beans.IntrospectionException)) {
return null;
} else {
throw ex;
}
}
}if (this.writeMethodName == null) {
}try {
this.setWriteMethod (writeMethod);
} catch (ex) {
if (Clazz.exceptionOf (ex, java.beans.IntrospectionException)) {
} else {
throw ex;
}
}
}return writeMethod;
});
Clazz.defineMethod (c$, "setWriteMethod", 
function (writeMethod) {
if (writeMethod == null) {
this.writeMethodName = null;
this.writeMethodRef = null;
return;
}this.setPropertyType (this.findPropertyType (this.getReadMethod (), writeMethod));
this.setClass0 (writeMethod.getDeclaringClass ());
this.writeMethodName = writeMethod.getName ();
this.writeMethodRef = writeMethod;
}, "java.lang.reflect.Method");
Clazz.defineMethod (c$, "getReadMethod0", 
 function () {
return (this.readMethodRef != null) ? this.readMethodRef : null;
});
Clazz.defineMethod (c$, "getWriteMethod0", 
 function () {
return (this.writeMethodRef != null) ? this.writeMethodRef : null;
});
Clazz.defineMethod (c$, "setClass0", 
function (clz) {
if (this.getClass0 () != null && clz.isAssignableFrom (this.getClass0 ())) {
return;
}Clazz.superCall (this, java.beans.PropertyDescriptor, "setClass0", [clz]);
}, "Class");
Clazz.defineMethod (c$, "isBound", 
function () {
return this.bound;
});
Clazz.defineMethod (c$, "setBound", 
function (bound) {
this.bound = bound;
}, "~B");
Clazz.defineMethod (c$, "isConstrained", 
function () {
return this.constrained;
});
Clazz.defineMethod (c$, "setConstrained", 
function (constrained) {
this.constrained = constrained;
}, "~B");
Clazz.defineMethod (c$, "setPropertyEditorClass", 
function (propertyEditorClass) {
this.propertyEditorClassRef = (propertyEditorClass);
}, "Class");
Clazz.defineMethod (c$, "getPropertyEditorClass", 
function () {
return (this.propertyEditorClassRef != null) ? this.propertyEditorClassRef : null;
});
Clazz.defineMethod (c$, "createPropertyEditor", 
function (bean) {
var editor = null;
var cls = this.getPropertyEditorClass ();
if (cls != null) {
var ctor = null;
if (bean != null) {
try {
ctor = cls.getConstructor ( Clazz.newArray (-1, [Clazz._O]));
} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
} else {
throw ex;
}
}
}try {
if (ctor == null) {
editor = cls.newInstance ();
} else {
editor = ctor.newInstance ( Clazz.newArray (-1, [bean]));
}} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
throw  new RuntimeException ("PropertyEditor not instantiated", ex);
} else {
throw ex;
}
}
}return editor;
}, "~O");
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (this === obj) {
return true;
}if (obj != null && Clazz.instanceOf (obj, java.beans.PropertyDescriptor)) {
var other = obj;
var otherReadMethod = other.getReadMethod ();
var otherWriteMethod = other.getWriteMethod ();
if (!this.compareMethods (this.getReadMethod (), otherReadMethod)) {
return false;
}if (!this.compareMethods (this.getWriteMethod (), otherWriteMethod)) {
return false;
}if (this.getPropertyType () === other.getPropertyType () && this.getPropertyEditorClass () === other.getPropertyEditorClass () && this.bound == other.isBound () && this.constrained == other.isConstrained () && this.writeMethodName === other.writeMethodName && this.readMethodName === other.readMethodName) {
return true;
}}return false;
}, "~O");
Clazz.defineMethod (c$, "compareMethods", 
function (a, b) {
if ((a == null) != (b == null)) {
return false;
}if (a != null && b != null) {
if (!a.equals (b)) {
return false;
}}return true;
}, "java.lang.reflect.Method,java.lang.reflect.Method");
Clazz.makeConstructor (c$, 
function (x, y) {
Clazz.superConstructor (this, java.beans.PropertyDescriptor, [x, y]);
if (y.baseName != null) {
this.baseName = y.baseName;
} else {
this.baseName = x.baseName;
}if (y.readMethodName != null) {
this.readMethodName = y.readMethodName;
} else {
this.readMethodName = x.readMethodName;
}if (y.writeMethodName != null) {
this.writeMethodName = y.writeMethodName;
} else {
this.writeMethodName = x.writeMethodName;
}if (y.propertyTypeRef != null) {
this.propertyTypeRef = y.propertyTypeRef;
} else {
this.propertyTypeRef = x.propertyTypeRef;
}var xr = x.getReadMethod ();
var yr = y.getReadMethod ();
try {
if (yr != null && yr.getDeclaringClass () === this.getClass0 ()) {
this.setReadMethod (yr);
} else {
this.setReadMethod (xr);
}} catch (ex) {
if (Clazz.exceptionOf (ex, java.beans.IntrospectionException)) {
} else {
throw ex;
}
}
if (xr != null && yr != null && xr.getDeclaringClass () === yr.getDeclaringClass () && java.beans.FeatureDescriptor.getReturnType (this.getClass0 (), xr) === Boolean && java.beans.FeatureDescriptor.getReturnType (this.getClass0 (), yr) === Boolean) {
try {
this.setReadMethod (xr);
} catch (ex) {
if (Clazz.exceptionOf (ex, java.beans.IntrospectionException)) {
} else {
throw ex;
}
}
}var xw = x.getWriteMethod ();
var yw = y.getWriteMethod ();
try {
if (yw != null && yw.getDeclaringClass () === this.getClass0 ()) {
this.setWriteMethod (yw);
} else {
this.setWriteMethod (xw);
}} catch (ex) {
if (Clazz.exceptionOf (ex, java.beans.IntrospectionException)) {
} else {
throw ex;
}
}
if (y.getPropertyEditorClass () != null) {
this.setPropertyEditorClass (y.getPropertyEditorClass ());
} else {
this.setPropertyEditorClass (x.getPropertyEditorClass ());
}this.bound =  new Boolean (x.bound | y.bound).valueOf ();
this.constrained =  new Boolean (x.constrained | y.constrained).valueOf ();
}, "java.beans.PropertyDescriptor,java.beans.PropertyDescriptor");
Clazz.makeConstructor (c$, 
function (old) {
Clazz.superConstructor (this, java.beans.PropertyDescriptor, [old]);
this.propertyTypeRef = old.propertyTypeRef;
this.readMethodRef = old.readMethodRef;
this.writeMethodRef = old.writeMethodRef;
this.propertyEditorClassRef = old.propertyEditorClassRef;
this.writeMethodName = old.writeMethodName;
this.readMethodName = old.readMethodName;
this.baseName = old.baseName;
this.bound = old.bound;
this.constrained = old.constrained;
}, "java.beans.PropertyDescriptor");
Clazz.defineMethod (c$, "findPropertyType", 
 function (readMethod, writeMethod) {
var propertyType = null;
try {
if (readMethod != null) {
var params = java.beans.FeatureDescriptor.getParameterTypes (this.getClass0 (), readMethod);
if (params.length != 0) {
throw  new java.beans.IntrospectionException ("bad read method arg count: " + readMethod);
}propertyType = java.beans.FeatureDescriptor.getReturnType (this.getClass0 (), readMethod);
if (propertyType === Void.TYPE) {
throw  new java.beans.IntrospectionException ("read method " + readMethod.getName () + " returns void");
}}if (writeMethod != null) {
var params = java.beans.FeatureDescriptor.getParameterTypes (this.getClass0 (), writeMethod);
if (params.length != 1) {
throw  new java.beans.IntrospectionException ("bad write method arg count: " + writeMethod);
}if (propertyType != null && propertyType !== params[0]) {
throw  new java.beans.IntrospectionException ("type mismatch between read and write methods");
}propertyType = params[0];
}} catch (ex) {
if (Clazz.exceptionOf (ex, java.beans.IntrospectionException)) {
throw ex;
} else {
throw ex;
}
}
return propertyType;
}, "java.lang.reflect.Method,java.lang.reflect.Method");
Clazz.defineMethod (c$, "hashCode", 
function () {
var result = 7;
result = 37 * result + ((this.getPropertyType () == null) ? 0 : this.getPropertyType ().hashCode ());
result = 37 * result + ((this.getReadMethod () == null) ? 0 : this.getReadMethod ().hashCode ());
result = 37 * result + ((this.getWriteMethod () == null) ? 0 : this.getWriteMethod ().hashCode ());
result = 37 * result + ((this.getPropertyEditorClass () == null) ? 0 : this.getPropertyEditorClass ().hashCode ());
result = 37 * result + ((this.writeMethodName == null) ? 0 : this.writeMethodName.hashCode ());
result = 37 * result + ((this.readMethodName == null) ? 0 : this.readMethodName.hashCode ());
result = 37 * result + this.getName ().hashCode ();
result = 37 * result + ((this.bound == false) ? 0 : 1);
result = 37 * result + ((this.constrained == false) ? 0 : 1);
return result;
});
Clazz.defineMethod (c$, "getBaseName", 
function () {
if (this.baseName == null) {
}return this.baseName;
});
});
