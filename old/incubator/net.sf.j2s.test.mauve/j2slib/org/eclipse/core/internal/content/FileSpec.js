Clazz.declarePackage ("org.eclipse.core.internal.content");
c$ = Clazz.decorateAsClass (function () {
this.text = null;
this.type = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.content, "FileSpec");
Clazz.makeConstructor (c$, 
function (text, type) {
this.text = text;
this.type = type;
}, "~S,~N");
Clazz.defineMethod (c$, "getText", 
function () {
return this.text;
});
Clazz.defineMethod (c$, "getType", 
function () {
return this.type;
});
c$.getBasicType = Clazz.defineMethod (c$, "getBasicType", 
function (type) {
return 12 & type;
}, "~N");
Clazz.defineMethod (c$, "equals", 
function (other) {
if (!(Clazz.instanceOf (other, org.eclipse.core.internal.content.FileSpec))) return false;
var otherFileSpec = other;
return this.equals (this.text, otherFileSpec.getType (), false);
}, "~O");
Clazz.defineMethod (c$, "equals", 
function (text, otherType, strict) {
return ((!strict && org.eclipse.core.internal.content.FileSpec.getBasicType (this.type) == org.eclipse.core.internal.content.FileSpec.getBasicType (otherType)) || this.type == otherType) && this.text.equalsIgnoreCase (text);
}, "~S,~N,~B");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.text.hashCode ();
});
c$.getMappingKeyFor = Clazz.defineMethod (c$, "getMappingKeyFor", 
function (fileSpecText) {
return fileSpecText.toLowerCase ();
}, "~S");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getText ();
});
Clazz.defineStatics (c$,
"BASIC_TYPE", 12);
