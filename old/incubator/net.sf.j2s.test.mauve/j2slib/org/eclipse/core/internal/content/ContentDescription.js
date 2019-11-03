Clazz.declarePackage ("org.eclipse.core.internal.content");
Clazz.load (["org.eclipse.core.internal.content.BasicDescription"], "org.eclipse.core.internal.content.ContentDescription", ["java.lang.IllegalStateException", "$.StringBuffer", "org.eclipse.core.runtime.content.IContentDescription"], function () {
c$ = Clazz.decorateAsClass (function () {
this.flags = 0;
this.keys = null;
this.values = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.content, "ContentDescription", org.eclipse.core.internal.content.BasicDescription);
Clazz.makeConstructor (c$, 
function (requested, contentTypeInfo) {
Clazz.superConstructor (this, org.eclipse.core.internal.content.ContentDescription, [contentTypeInfo]);
if (requested === org.eclipse.core.runtime.content.IContentDescription.ALL) {
this.flags |= 1;
return ;
}if (requested.length > 1) {
this.keys = requested;
this.values =  new Array (requested.length);
} else if (requested.length == 1) this.keys = requested[0];
}, "~A,org.eclipse.core.internal.content.IContentTypeInfo");
Clazz.defineMethod (c$, "assertMutable", 
($fz = function () {
if ((this.flags & 2) != 0) throw  new IllegalStateException ("Content description is immutable");
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "getCharset", 
function () {
var bom = this.getProperty (org.eclipse.core.runtime.content.IContentDescription.BYTE_ORDER_MARK);
if (bom === org.eclipse.core.runtime.content.IContentDescription.BOM_UTF_8) return "UTF-8";
 else if (bom === org.eclipse.core.runtime.content.IContentDescription.BOM_UTF_16BE || bom === org.eclipse.core.runtime.content.IContentDescription.BOM_UTF_16LE) return "UTF-16";
return this.getProperty (org.eclipse.core.runtime.content.IContentDescription.CHARSET);
});
Clazz.defineMethod (c$, "getDescribedProperty", 
($fz = function (key) {
if (this.values == null) return null;
if (Clazz.instanceOf (this.keys, org.eclipse.core.runtime.QualifiedName)) return this.keys.equals (key) ? this.values : null;
var tmpKeys = this.keys;
for (var i = 0; i < tmpKeys.length; i++) if (tmpKeys[i].equals (key)) return (this.values)[i];

return null;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.QualifiedName");
Clazz.overrideMethod (c$, "getProperty", 
function (key) {
var describedProperty = this.getDescribedProperty (key);
if (describedProperty != null) return describedProperty;
return this.contentTypeInfo.getDefaultProperty (key);
}, "org.eclipse.core.runtime.QualifiedName");
Clazz.overrideMethod (c$, "isRequested", 
function (propertyKey) {
if ((this.flags & 1) != 0) return true;
if (this.keys == null) return false;
if (Clazz.instanceOf (this.keys, org.eclipse.core.runtime.QualifiedName)) return this.keys.equals (propertyKey);
var tmpKeys = this.keys;
for (var i = 0; i < tmpKeys.length; i++) if (tmpKeys[i].equals (propertyKey)) return true;

return false;
}, "org.eclipse.core.runtime.QualifiedName");
Clazz.defineMethod (c$, "isSet", 
function () {
if (this.keys == null || this.values == null) return false;
if (Clazz.instanceOf (this.keys, org.eclipse.core.runtime.QualifiedName)) return true;
var tmpValues = this.values;
for (var i = 0; i < tmpValues.length; i++) if (tmpValues[i] != null) return true;

return false;
});
Clazz.defineMethod (c$, "markImmutable", 
function () {
this.assertMutable ();
this.flags |= 2;
});
Clazz.defineMethod (c$, "setContentTypeInfo", 
function (info) {
this.contentTypeInfo = info;
}, "org.eclipse.core.internal.content.IContentTypeInfo");
Clazz.overrideMethod (c$, "setProperty", 
function (newKey, newValue) {
this.assertMutable ();
if (this.keys == null) {
if ((this.flags & 1) != 0) {
this.keys = newKey;
this.values = newValue;
}return ;
}if (this.keys.equals (newKey)) {
this.values = newValue;
return ;
}if (Clazz.instanceOf (this.keys, org.eclipse.core.runtime.QualifiedName)) {
if ((this.flags & 1) != 0) {
this.keys = [this.keys, newKey];
this.values = [this.values, newValue];
}return ;
}var tmpKeys = this.keys;
for (var i = 0; i < tmpKeys.length; i++) if (tmpKeys[i].equals (newKey)) {
(this.values)[i] = newValue;
return ;
}
if ((this.flags & 1) == 0) return ;
var currentSize = tmpKeys.length;
tmpKeys =  new Array (currentSize + 1);
System.arraycopy (this.keys, 0, tmpKeys, 0, currentSize);
var tmpValues =  new Array (currentSize + 1);
System.arraycopy (this.values, 0, tmpValues, 0, currentSize);
tmpKeys[tmpKeys.length - 1] = newKey;
tmpValues[tmpValues.length - 1] = newValue;
this.keys = tmpKeys;
this.values = tmpValues;
}, "org.eclipse.core.runtime.QualifiedName,~O");
Clazz.overrideMethod (c$, "toString", 
function () {
var result =  new StringBuffer ("{");
if (this.keys != null) if (Clazz.instanceOf (this.keys, org.eclipse.core.runtime.QualifiedName)) {
if (this.values != null) result.append (this.keys + "=" + this.values);
} else {
var tmpKeys = this.keys;
var tmpValues = this.values;
var any = false;
for (var i = 0; i < tmpKeys.length; i++) if (tmpValues[i] != null) {
result.append (tmpKeys[i] + "=" + tmpValues[i] + ",");
any = true;
}
if (any) result.deleteCharAt (result.length () - 1);
}result.append ("} : ");
result.append (this.contentTypeInfo.getContentType ());
return result.toString ();
});
Clazz.defineStatics (c$,
"CHARSET_UTF_16", "UTF-16",
"CHARSET_UTF_8", "UTF-8",
"FLAG_ALL_OPTIONS", 0x01,
"FLAG_IMMUTABLE", 0x02);
});
