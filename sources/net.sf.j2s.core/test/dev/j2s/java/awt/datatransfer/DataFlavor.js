Clazz.declarePackage ("java.awt.datatransfer");
Clazz.load (["java.io.Externalizable", "sun.awt.datatransfer.DataTransferer", "java.io.InputStream"], "java.awt.datatransfer.DataFlavor", ["java.io.ByteArrayInputStream", "$.CharArrayReader", "$.IOException", "$.InputStreamReader", "$.Reader", "$.StringReader", "java.lang.ClassLoader", "$.ClassNotFoundException", "$.IllegalArgumentException", "$.NullPointerException", "$.Thread", "java.security.AccessController", "$.PrivilegedAction", "java.util.Arrays", "$.Collections", "$.List", "java.awt.datatransfer.MimeType", "$.MimeTypeParameterList"], function () {
c$ = Clazz.decorateAsClass (function () {
this.atom = 0;
this.mimeType = null;
this.humanPresentableName = null;
this.representationClass = null;
Clazz.instantialize (this, arguments);
}, java.awt.datatransfer, "DataFlavor", null, [java.io.Externalizable, Cloneable]);
c$.tryToLoadClass = Clazz.defineMethod (c$, "tryToLoadClass", 
function (className, fallback) {
var systemClassLoader = java.security.AccessController.doPrivileged (((Clazz.isClassDefined ("java.awt.datatransfer.DataFlavor$1") ? 0 : java.awt.datatransfer.DataFlavor.$DataFlavor$1$ ()), Clazz.innerTypeInstance (java.awt.datatransfer.DataFlavor$1, this, null)));
try {
return Clazz._4Name (className, true, systemClassLoader);
} catch (e2) {
if (Clazz.exceptionOf (e2, ClassNotFoundException)) {
if (fallback != null) {
return Clazz._4Name (className, true, fallback);
} else {
throw  new ClassNotFoundException (className);
}} else {
throw e2;
}
}
}, "~S,ClassLoader");
c$.createConstant = Clazz.defineMethod (c$, "createConstant", 
 function (rc, prn) {
try {
return  new java.awt.datatransfer.DataFlavor (rc, prn);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
}, "Class,~S");
c$.createConstant = Clazz.defineMethod (c$, "createConstant", 
 function (mt, prn) {
try {
return  new java.awt.datatransfer.DataFlavor (mt, prn);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
}, "~S,~S");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
 function (primaryType, subType, params, representationClass, humanPresentableName) {
if (primaryType == null) {
throw  new NullPointerException ("primaryType");
}if (subType == null) {
throw  new NullPointerException ("subType");
}if (representationClass == null) {
throw  new NullPointerException ("representationClass");
}if (params == null) params =  new java.awt.datatransfer.MimeTypeParameterList ();
params.set ("class", representationClass.getName ());
if (humanPresentableName == null) {
humanPresentableName = params.get ("humanPresentableName");
if (humanPresentableName == null) humanPresentableName = primaryType + "/" + subType;
}try {
this.mimeType =  new java.awt.datatransfer.MimeType (primaryType, subType, params);
} catch (mtpe) {
if (Clazz.exceptionOf (mtpe, java.awt.datatransfer.MimeTypeParseException)) {
throw  new IllegalArgumentException ("MimeType Parse Exception: " + mtpe.getMessage ());
} else {
throw mtpe;
}
}
this.representationClass = representationClass;
this.humanPresentableName = humanPresentableName;
this.mimeType.removeParameter ("humanPresentableName");
}, "~S,~S,java.awt.datatransfer.MimeTypeParameterList,Class,~S");
Clazz.makeConstructor (c$, 
function (representationClass, humanPresentableName) {
this.construct ("application", "x-java-serialized-object", null, representationClass, humanPresentableName);
if (representationClass == null) {
throw  new NullPointerException ("representationClass");
}}, "Class,~S");
Clazz.makeConstructor (c$, 
function (mimeType, humanPresentableName) {
if (mimeType == null) {
throw  new NullPointerException ("mimeType");
}try {
this.initialize (mimeType, humanPresentableName, this.getClass ().getClassLoader ());
} catch (e$$) {
if (Clazz.exceptionOf (e$$, java.awt.datatransfer.MimeTypeParseException)) {
var mtpe = e$$;
{
throw  new IllegalArgumentException ("failed to parse:" + mimeType);
}
} else if (Clazz.exceptionOf (e$$, ClassNotFoundException)) {
var cnfe = e$$;
{
throw  new IllegalArgumentException ("can't find specified class: " + cnfe.getMessage ());
}
} else {
throw e$$;
}
}
}, "~S,~S");
Clazz.makeConstructor (c$, 
function (mimeType, humanPresentableName, classLoader) {
if (mimeType == null) {
throw  new NullPointerException ("mimeType");
}try {
this.initialize (mimeType, humanPresentableName, classLoader);
} catch (mtpe) {
if (Clazz.exceptionOf (mtpe, java.awt.datatransfer.MimeTypeParseException)) {
throw  new IllegalArgumentException ("failed to parse:" + mimeType);
} else {
throw mtpe;
}
}
}, "~S,~S,ClassLoader");
Clazz.makeConstructor (c$, 
function (mimeType) {
if (mimeType == null) {
throw  new NullPointerException ("mimeType");
}try {
this.initialize (mimeType, null, this.getClass ().getClassLoader ());
} catch (mtpe) {
if (Clazz.exceptionOf (mtpe, java.awt.datatransfer.MimeTypeParseException)) {
throw  new IllegalArgumentException ("failed to parse:" + mimeType);
} else {
throw mtpe;
}
}
}, "~S");
Clazz.defineMethod (c$, "initialize", 
 function (mimeType, humanPresentableName, classLoader) {
if (mimeType == null) {
throw  new NullPointerException ("mimeType");
}this.mimeType =  new java.awt.datatransfer.MimeType (mimeType);
var rcn = this.getParameter ("class");
if (rcn == null) {
if ("application/x-java-serialized-object".equals (this.mimeType.getBaseType ())) throw  new IllegalArgumentException ("no representation class specified for:" + mimeType);
 else this.representationClass = java.io.InputStream;
} else {
this.representationClass = java.awt.datatransfer.DataFlavor.tryToLoadClass (rcn, classLoader);
}this.mimeType.setParameter ("class", this.representationClass.getName ());
if (humanPresentableName == null) {
humanPresentableName = this.mimeType.getParameter ("humanPresentableName");
if (humanPresentableName == null) humanPresentableName = this.mimeType.getPrimaryType () + "/" + this.mimeType.getSubType ();
}this.humanPresentableName = humanPresentableName;
this.mimeType.removeParameter ("humanPresentableName");
}, "~S,~S,ClassLoader");
Clazz.overrideMethod (c$, "toString", 
function () {
var string = this.getClass ().getName ();
string += "[" + this.paramString () + "]";
return string;
});
Clazz.defineMethod (c$, "paramString", 
 function () {
var params = "";
params += "mimetype=";
if (this.mimeType == null) {
params += "null";
} else {
params += this.mimeType.getBaseType ();
}params += ";representationclass=";
if (this.representationClass == null) {
params += "null";
} else {
params += this.representationClass.getName ();
}return params;
});
c$.getTextPlainUnicodeFlavor = Clazz.defineMethod (c$, "getTextPlainUnicodeFlavor", 
function () {
var encoding = null;
var transferer = sun.awt.datatransfer.DataTransferer.getInstance ();
if (transferer != null) {
encoding = transferer.getDefaultUnicodeEncoding ();
}return  new java.awt.datatransfer.DataFlavor ("text/plain;charset=" + encoding + ";class=java.io.InputStream", "Plain Text");
});
c$.selectBestTextFlavor = Clazz.defineMethod (c$, "selectBestTextFlavor", 
function (availableFlavors) {
if (availableFlavors == null || availableFlavors.length == 0) {
return null;
}if (java.awt.datatransfer.DataFlavor.textFlavorComparator == null) {
java.awt.datatransfer.DataFlavor.textFlavorComparator =  new java.awt.datatransfer.DataFlavor.TextFlavorComparator ();
}var bestFlavor = java.util.Collections.max (java.util.Arrays.asList (availableFlavors), java.awt.datatransfer.DataFlavor.textFlavorComparator);
if (!bestFlavor.isFlavorTextType ()) {
return null;
}return bestFlavor;
}, "~A");
Clazz.defineMethod (c$, "getReaderForText", 
function (transferable) {
var transferObject = transferable.getTransferData (this);
if (transferObject == null) {
throw  new IllegalArgumentException ("getTransferData() returned null");
}if (Clazz.instanceOf (transferObject, java.io.Reader)) {
return transferObject;
} else if (Clazz.instanceOf (transferObject, String)) {
return  new java.io.StringReader (transferObject);
} else if (Clazz.instanceOf (transferObject, Array)) {
return  new java.io.CharArrayReader (transferObject);
}var stream = null;
if (Clazz.instanceOf (transferObject, java.io.InputStream)) {
stream = transferObject;
} else if (Clazz.instanceOf (transferObject, Array)) {
stream =  new java.io.ByteArrayInputStream (transferObject);
}if (stream == null) {
throw  new IllegalArgumentException ("transfer data is not Reader, String, CharBuffer, char array, InputStream, ByteBuffer, or byte array");
}var encoding = this.getParameter ("charset");
return (encoding == null) ?  new java.io.InputStreamReader (stream) :  new java.io.InputStreamReader (stream, encoding);
}, "java.awt.datatransfer.Transferable");
Clazz.defineMethod (c$, "getMimeType", 
function () {
return (this.mimeType != null) ? this.mimeType.toString () : null;
});
Clazz.defineMethod (c$, "getRepresentationClass", 
function () {
return this.representationClass;
});
Clazz.defineMethod (c$, "getHumanPresentableName", 
function () {
return this.humanPresentableName;
});
Clazz.defineMethod (c$, "getPrimaryType", 
function () {
return (this.mimeType != null) ? this.mimeType.getPrimaryType () : null;
});
Clazz.defineMethod (c$, "getSubType", 
function () {
return (this.mimeType != null) ? this.mimeType.getSubType () : null;
});
Clazz.defineMethod (c$, "getParameter", 
function (paramName) {
if (paramName.equals ("humanPresentableName")) {
return this.humanPresentableName;
} else {
return (this.mimeType != null) ? this.mimeType.getParameter (paramName) : null;
}}, "~S");
Clazz.defineMethod (c$, "setHumanPresentableName", 
function (humanPresentableName) {
this.humanPresentableName = humanPresentableName;
}, "~S");
Clazz.defineMethod (c$, "equals", 
function (o) {
return ((Clazz.instanceOf (o, java.awt.datatransfer.DataFlavor)) && this.equals (o));
}, "~O");
Clazz.defineMethod (c$, "equals", 
function (that) {
if (that == null) {
return false;
}if (this === that) {
return true;
}if (this.representationClass == null) {
if (that.getRepresentationClass () != null) {
return false;
}} else {
if (!this.representationClass.equals (that.getRepresentationClass ())) {
return false;
}}if (this.mimeType == null) {
if (that.mimeType != null) {
return false;
}} else {
if (!this.mimeType.match (that.mimeType)) {
return false;
}if ("text".equals (this.getPrimaryType ()) && sun.awt.datatransfer.DataTransferer.doesSubtypeSupportCharset (this) && this.representationClass != null && !(this.isRepresentationClassReader () || String.equals (this.representationClass) || this.isRepresentationClassCharBuffer () || sun.awt.datatransfer.DataTransferer.charArrayClass.equals (this.representationClass))) {
}}return true;
}, "java.awt.datatransfer.DataFlavor");
Clazz.defineMethod (c$, "equals", 
function (s) {
if (s == null || this.mimeType == null) return false;
return this.isMimeTypeEqual (s);
}, "~S");
Clazz.defineMethod (c$, "hashCode", 
function () {
var total = 0;
if (this.representationClass != null) {
total += this.representationClass.hashCode ();
}if (this.mimeType != null) {
var primaryType = this.mimeType.getPrimaryType ();
if (primaryType != null) {
total += primaryType.hashCode ();
}if ("text".equals (primaryType) && sun.awt.datatransfer.DataTransferer.doesSubtypeSupportCharset (this) && this.representationClass != null && !(this.isRepresentationClassReader () || String.equals (this.representationClass) || this.isRepresentationClassCharBuffer () || sun.awt.datatransfer.DataTransferer.charArrayClass.equals (this.representationClass))) {
}}return total;
});
Clazz.defineMethod (c$, "match", 
function (that) {
return this.equals (that);
}, "java.awt.datatransfer.DataFlavor");
Clazz.defineMethod (c$, "isMimeTypeEqual", 
function (mimeType) {
if (mimeType == null) {
throw  new NullPointerException ("mimeType");
}if (this.mimeType == null) {
return false;
}try {
return this.mimeType.match ( new java.awt.datatransfer.MimeType (mimeType));
} catch (mtpe) {
if (Clazz.exceptionOf (mtpe, java.awt.datatransfer.MimeTypeParseException)) {
return false;
} else {
throw mtpe;
}
}
}, "~S");
Clazz.defineMethod (c$, "isMimeTypeEqual", 
function (dataFlavor) {
return this.isMimeTypeEqual (dataFlavor.mimeType);
}, "java.awt.datatransfer.DataFlavor");
Clazz.defineMethod (c$, "isMimeTypeEqual", 
 function (mtype) {
if (this.mimeType == null) {
return (mtype == null);
}return this.mimeType.match (mtype);
}, "java.awt.datatransfer.MimeType");
Clazz.defineMethod (c$, "isMimeTypeSerializedObject", 
function () {
return this.isMimeTypeEqual ("application/x-java-serialized-object");
});
Clazz.defineMethod (c$, "getDefaultRepresentationClass", 
function () {
return java.awt.datatransfer.DataFlavor.ioInputStreamClass;
});
Clazz.defineMethod (c$, "getDefaultRepresentationClassAsString", 
function () {
return this.getDefaultRepresentationClass ().getName ();
});
Clazz.defineMethod (c$, "isRepresentationClassInputStream", 
function () {
return java.awt.datatransfer.DataFlavor.ioInputStreamClass.isAssignableFrom (this.representationClass);
});
Clazz.defineMethod (c$, "isRepresentationClassReader", 
function () {
return java.io.Reader.isAssignableFrom (this.representationClass);
});
Clazz.defineMethod (c$, "isRepresentationClassCharBuffer", 
function () {
return false;
});
Clazz.defineMethod (c$, "isRepresentationClassByteBuffer", 
function () {
return false;
});
Clazz.defineMethod (c$, "isRepresentationClassSerializable", 
function () {
return java.io.Serializable.isAssignableFrom (this.representationClass);
});
Clazz.defineMethod (c$, "isRepresentationClassRemote", 
function () {
return false;
});
Clazz.defineMethod (c$, "isFlavorSerializedObjectType", 
function () {
return false;
});
Clazz.defineMethod (c$, "isFlavorRemoteObjectType", 
function () {
return this.isRepresentationClassRemote () && this.isRepresentationClassSerializable () && this.isMimeTypeEqual ("application/x-java-remote-object");
});
Clazz.defineMethod (c$, "isFlavorJavaFileListType", 
function () {
if (this.mimeType == null || this.representationClass == null) return false;
return java.util.List.isAssignableFrom (this.representationClass) && this.mimeType.match (java.awt.datatransfer.DataFlavor.javaFileListFlavor.mimeType);
});
Clazz.defineMethod (c$, "isFlavorTextType", 
function () {
return (sun.awt.datatransfer.DataTransferer.isFlavorCharsetTextType (this) || sun.awt.datatransfer.DataTransferer.isFlavorNoncharsetTextType (this));
});
Clazz.overrideMethod (c$, "writeExternal", 
function (os) {
if (this.mimeType != null) {
this.mimeType.setParameter ("humanPresentableName", this.humanPresentableName);
os.writeObject (this.mimeType);
this.mimeType.removeParameter ("humanPresentableName");
} else {
os.writeObject (null);
}os.writeObject (this.representationClass);
}, "java.io.ObjectOutput");
Clazz.overrideMethod (c$, "readExternal", 
function (is) {
var rcn = null;
this.mimeType = is.readObject ();
if (this.mimeType != null) {
this.humanPresentableName = this.mimeType.getParameter ("humanPresentableName");
this.mimeType.removeParameter ("humanPresentableName");
rcn = this.mimeType.getParameter ("class");
if (rcn == null) {
throw  new java.io.IOException ("no class parameter specified in: " + this.mimeType);
}}try {
this.representationClass = is.readObject ();
} catch (ode) {
if (Clazz.exceptionOf (ode, java.io.OptionalDataException)) {
if (!ode.eof || ode.length != 0) {
throw ode;
}if (rcn != null) {
this.representationClass = java.awt.datatransfer.DataFlavor.tryToLoadClass (rcn, this.getClass ().getClassLoader ());
}} else {
throw ode;
}
}
}, "java.io.ObjectInput");
Clazz.defineMethod (c$, "clone", 
function () {
var newObj = Clazz.superCall (this, java.awt.datatransfer.DataFlavor, "clone", []);
if (this.mimeType != null) {
(newObj).mimeType = this.mimeType.clone ();
}return newObj;
});
Clazz.defineMethod (c$, "normalizeMimeTypeParameter", 
function (parameterName, parameterValue) {
return parameterValue;
}, "~S,~S");
Clazz.defineMethod (c$, "normalizeMimeType", 
function (mimeType) {
return mimeType;
}, "~S");
c$.$DataFlavor$1$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.declareAnonymous (java.awt.datatransfer, "DataFlavor$1", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
var cl = Thread.currentThread ().getContextClassLoader ();
return (cl != null) ? cl : ClassLoader.getSystemClassLoader ();
});
c$ = Clazz.p0p ();
};
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.awt.datatransfer.DataFlavor, "TextFlavorComparator", sun.awt.datatransfer.DataTransferer.DataFlavorComparator);
Clazz.defineMethod (c$, "compare", 
function (a, b) {
var c = a;
var d = b;
if (c.isFlavorTextType ()) {
if (d.isFlavorTextType ()) {
return Clazz.superCall (this, java.awt.datatransfer.DataFlavor.TextFlavorComparator, "compare", [a, b]);
} else {
return 1;
}} else if (d.isFlavorTextType ()) {
return -1;
} else {
return 0;
}}, "~O,~O");
c$ = Clazz.p0p ();
c$.ioInputStreamClass = c$.prototype.ioInputStreamClass = java.io.InputStream;
c$.stringFlavor = c$.prototype.stringFlavor = java.awt.datatransfer.DataFlavor.createConstant (String, "Unicode String");
c$.imageFlavor = c$.prototype.imageFlavor = java.awt.datatransfer.DataFlavor.createConstant ("image/x-java-image; class=java.awt.Image", "Image");
c$.plainTextFlavor = c$.prototype.plainTextFlavor = java.awt.datatransfer.DataFlavor.createConstant ("text/plain; charset=unicode; class=java.io.InputStream", "Plain Text");
Clazz.defineStatics (c$,
"javaSerializedObjectMimeType", "application/x-java-serialized-object");
c$.javaFileListFlavor = c$.prototype.javaFileListFlavor = java.awt.datatransfer.DataFlavor.createConstant ("application/x-java-file-list;class=java.util.List", null);
Clazz.defineStatics (c$,
"javaJVMLocalObjectMimeType", "application/x-java-jvm-local-objectref",
"javaRemoteObjectMimeType", "application/x-java-remote-object",
"textFlavorComparator", null);
});
