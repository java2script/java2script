Clazz.declarePackage ("org.eclipse.core.internal.content");
Clazz.load (["org.eclipse.core.internal.content.BasicDescription"], "org.eclipse.core.internal.content.DefaultDescription", ["java.lang.IllegalStateException", "org.eclipse.core.runtime.content.IContentDescription"], function () {
c$ = Clazz.declareType (org.eclipse.core.internal.content, "DefaultDescription", org.eclipse.core.internal.content.BasicDescription);
Clazz.defineMethod (c$, "equals", 
function (obj) {
if (!(Clazz.instanceOf (obj, org.eclipse.core.internal.content.DefaultDescription))) return false;
return this.contentTypeInfo.equals ((obj).contentTypeInfo);
}, "~O");
Clazz.overrideMethod (c$, "getCharset", 
function () {
return this.getProperty (org.eclipse.core.runtime.content.IContentDescription.CHARSET);
});
Clazz.overrideMethod (c$, "getProperty", 
function (key) {
return this.contentTypeInfo.getDefaultProperty (key);
}, "org.eclipse.core.runtime.QualifiedName");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.contentTypeInfo.getContentType ().hashCode ();
});
Clazz.overrideMethod (c$, "isRequested", 
function (key) {
return false;
}, "org.eclipse.core.runtime.QualifiedName");
Clazz.overrideMethod (c$, "setProperty", 
function (key, value) {
throw  new IllegalStateException ();
}, "org.eclipse.core.runtime.QualifiedName,~O");
Clazz.overrideMethod (c$, "toString", 
function () {
return "{default} : " + this.contentTypeInfo.getContentType ();
});
});
