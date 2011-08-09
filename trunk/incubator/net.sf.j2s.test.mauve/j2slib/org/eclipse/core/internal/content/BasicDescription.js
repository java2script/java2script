Clazz.declarePackage ("org.eclipse.core.internal.content");
Clazz.load (["org.eclipse.core.runtime.content.IContentDescription"], "org.eclipse.core.internal.content.BasicDescription", ["org.eclipse.core.internal.content.ContentTypeHandler"], function () {
c$ = Clazz.decorateAsClass (function () {
this.contentTypeInfo = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.content, "BasicDescription", null, org.eclipse.core.runtime.content.IContentDescription);
Clazz.makeConstructor (c$, 
function (contentTypeInfo) {
this.contentTypeInfo = contentTypeInfo;
}, "org.eclipse.core.internal.content.IContentTypeInfo");
Clazz.overrideMethod (c$, "getContentType", 
function () {
var contentType = this.contentTypeInfo.getContentType ();
return  new org.eclipse.core.internal.content.ContentTypeHandler (contentType, contentType.getCatalog ().getGeneration ());
});
Clazz.defineMethod (c$, "getContentTypeInfo", 
function () {
return this.contentTypeInfo;
});
});
