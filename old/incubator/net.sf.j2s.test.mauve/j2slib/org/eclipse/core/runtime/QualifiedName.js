Clazz.declarePackage ("org.eclipse.core.runtime");
Clazz.load (null, "org.eclipse.core.runtime.QualifiedName", ["org.eclipse.core.internal.runtime.Assert"], function () {
c$ = Clazz.decorateAsClass (function () {
this.qualifier = null;
this.localName = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime, "QualifiedName");
Clazz.makeConstructor (c$, 
function (qualifier, localName) {
org.eclipse.core.internal.runtime.Assert.isLegal (localName != null && localName.length != 0);
this.qualifier = qualifier;
this.localName = localName;
}, "~S,~S");
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (obj === this) {
return true;
}if (!(Clazz.instanceOf (obj, org.eclipse.core.runtime.QualifiedName))) {
return false;
}var qName = obj;
if (this.qualifier == null && qName.getQualifier () != null) {
return false;
}if (this.qualifier != null && !this.qualifier.equals (qName.getQualifier ())) {
return false;
}return this.localName.equals (qName.getLocalName ());
}, "~O");
Clazz.defineMethod (c$, "getLocalName", 
function () {
return this.localName;
});
Clazz.defineMethod (c$, "getQualifier", 
function () {
return this.qualifier;
});
Clazz.overrideMethod (c$, "hashCode", 
function () {
return (this.qualifier == null ? 0 : this.qualifier.hashCode ()) + this.localName.hashCode ();
});
Clazz.overrideMethod (c$, "toString", 
function () {
return (this.getQualifier () == null ? "" : this.getQualifier () + ':') + this.getLocalName ();
});
});
