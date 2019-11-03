Clazz.declarePackage ("org.eclipse.jface.dialogs");
Clazz.load (["java.io.PrintWriter", "org.eclipse.jface.dialogs.IDialogSettings"], "org.eclipse.jface.dialogs.DialogSettings", ["java.io.BufferedReader", "$.FileInputStream", "$.FileOutputStream", "$.InputStreamReader", "$.OutputStreamWriter", "java.lang.Boolean", "$.Double", "$.Float", "$.Long", "$.NumberFormatException", "$.StringBuffer", "java.util.ArrayList", "$.Collections", "$.HashMap", "javax.xml.parsers.DocumentBuilderFactory", "org.xml.sax.InputSource"], function () {
c$ = Clazz.decorateAsClass (function () {
this.name = null;
this.sections = null;
this.items = null;
this.arrayItems = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.dialogs, "DialogSettings", null, org.eclipse.jface.dialogs.IDialogSettings);
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.tab = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.dialogs.DialogSettings, "XMLWriter", java.io.PrintWriter);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, org.eclipse.jface.dialogs.DialogSettings.XMLWriter, [ new java.io.OutputStreamWriter (a, "UTF8")]);
this.tab = 0;
this.println ("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
}, "java.io.OutputStream");
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, org.eclipse.jface.dialogs.DialogSettings.XMLWriter, [a]);
this.tab = 0;
this.println ("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
}, "java.io.Writer");
Clazz.defineMethod (c$, "endTag", 
function (a) {
this.tab--;
this.printTag ("/" + a, null, false);
}, "~S");
Clazz.defineMethod (c$, "printTabulation", 
($fz = function () {
for (var a = 0; a < this.tab; a++) Clazz.superCall (this, org.eclipse.jface.dialogs.DialogSettings.XMLWriter, "print", ['\t']);

}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "printTag", 
function (a, b, c) {
this.printTag (a, b, true, true, c);
}, "~S,java.util.HashMap,~B");
Clazz.defineMethod (c$, "printTag", 
($fz = function (a, b, c, d, e) {
var f =  new StringBuffer ();
f.append ('<');
f.append (a);
if (b != null) for (var g = java.util.Collections.enumeration (b.keySet ()); g.hasMoreElements (); ) {
f.append (" ");
var h = g.nextElement ();
f.append (h);
f.append ("=\"");
f.append (org.eclipse.jface.dialogs.DialogSettings.XMLWriter.getEscaped (String.valueOf (b.get (h))));
f.append ("\"");
}
if (e) f.append ('/');
f.append ('>');
if (c) this.printTabulation ();
if (d) this.println (f.toString ());
 else this.print (f.toString ());
}, $fz.isPrivate = true, $fz), "~S,java.util.HashMap,~B,~B,~B");
Clazz.defineMethod (c$, "startTag", 
function (a, b) {
this.startTag (a, b, true);
this.tab++;
}, "~S,java.util.HashMap");
Clazz.defineMethod (c$, "startTag", 
($fz = function (a, b, c) {
this.printTag (a, b, true, c, false);
}, $fz.isPrivate = true, $fz), "~S,java.util.HashMap,~B");
c$.appendEscapedChar = Clazz.defineMethod (c$, "appendEscapedChar", 
($fz = function (a, b) {
var c = org.eclipse.jface.dialogs.DialogSettings.XMLWriter.getReplacement (b);
if (c != null) {
a.append ('&');
a.append (c);
a.append (';');
} else {
a.append (b);
}}, $fz.isPrivate = true, $fz), "StringBuffer,~N");
c$.getEscaped = Clazz.defineMethod (c$, "getEscaped", 
($fz = function (a) {
var b =  new StringBuffer (a.length + 10);
for (var c = 0; c < a.length; ++c) org.eclipse.jface.dialogs.DialogSettings.XMLWriter.appendEscapedChar (b, a.charAt (c));

return b.toString ();
}, $fz.isPrivate = true, $fz), "~S");
c$.getReplacement = Clazz.defineMethod (c$, "getReplacement", 
($fz = function (a) {
switch (a) {
case '<':
return "lt";
case '>':
return "gt";
case '"':
return "quot";
case '\'':
return "apos";
case '&':
return "amp";
case '\r':
return "#x0D";
case '\n':
return "#x0A";
case '\u0009':
return "#x09";
}
return null;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineStatics (c$,
"XML_VERSION", "<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
c$ = Clazz.p0p ();
Clazz.makeConstructor (c$, 
function (sectionName) {
this.name = sectionName;
this.items =  new java.util.HashMap ();
this.arrayItems =  new java.util.HashMap ();
this.sections =  new java.util.HashMap ();
}, "~S");
Clazz.overrideMethod (c$, "addNewSection", 
function (sectionName) {
var section =  new org.eclipse.jface.dialogs.DialogSettings (sectionName);
this.addSection (section);
return section;
}, "~S");
Clazz.overrideMethod (c$, "addSection", 
function (section) {
this.sections.put (section.getName (), section);
}, "org.eclipse.jface.dialogs.IDialogSettings");
Clazz.overrideMethod (c$, "get", 
function (key) {
return this.items.get (key);
}, "~S");
Clazz.overrideMethod (c$, "getArray", 
function (key) {
return this.arrayItems.get (key);
}, "~S");
Clazz.overrideMethod (c$, "getBoolean", 
function (key) {
return  new Boolean (this.items.get (key)).booleanValue ();
}, "~S");
Clazz.overrideMethod (c$, "getDouble", 
function (key) {
var setting = this.items.get (key);
if (setting == null) throw  new NumberFormatException ("There is no setting associated with the key \"" + key + "\"");
return  new Double (setting).doubleValue ();
}, "~S");
Clazz.overrideMethod (c$, "getFloat", 
function (key) {
var setting = this.items.get (key);
if (setting == null) throw  new NumberFormatException ("There is no setting associated with the key \"" + key + "\"");
return  new Float (setting).floatValue ();
}, "~S");
Clazz.overrideMethod (c$, "getInt", 
function (key) {
var setting = this.items.get (key);
if (setting == null) {
throw  new NumberFormatException ("There is no setting associated with the key \"" + key + "\"");
}return  new Integer (setting).intValue ();
}, "~S");
Clazz.overrideMethod (c$, "getLong", 
function (key) {
var setting = this.items.get (key);
if (setting == null) {
throw  new NumberFormatException ("There is no setting associated with the key \"" + key + "\"");
}return  new Long (setting).longValue ();
}, "~S");
Clazz.defineMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.overrideMethod (c$, "getSection", 
function (sectionName) {
return this.sections.get (sectionName);
}, "~S");
Clazz.overrideMethod (c$, "getSections", 
function () {
var values = this.sections.values ();
var result =  new Array (values.size ());
values.toArray (result);
return result;
});
Clazz.defineMethod (c$, "load", 
function (r) {
var document = null;
try {
var parser = javax.xml.parsers.DocumentBuilderFactory.newInstance ().newDocumentBuilder ();
document = parser.parse ( new org.xml.sax.InputSource (r));
var root = document.firstChild;
while (root.nodeType == 8) {
document.removeChild (root);
root = document.firstChild;
}
this.load (document, root);
} catch (e$$) {
if (Clazz.instanceOf (e$$, javax.xml.parsers.ParserConfigurationException)) {
var e = e$$;
{
}
} else if (Clazz.instanceOf (e$$, java.io.IOException)) {
var e = e$$;
{
}
} else if (Clazz.instanceOf (e$$, org.xml.sax.SAXException)) {
var e = e$$;
{
}
} else {
throw e$$;
}
}
}, "java.io.Reader");
Clazz.defineMethod (c$, "load", 
function (fileName) {
var stream =  new java.io.FileInputStream (fileName);
var reader =  new java.io.BufferedReader ( new java.io.InputStreamReader (stream, "utf-8"));
this.load (reader);
reader.close ();
}, "~S");
Clazz.defineMethod (c$, "load", 
($fz = function (document, root) {
this.name = root.getAttribute ("name");
var l = root.getElementsByTagName ("item");
for (var i = 0; i < l.length; i++) {
var n = l.item (i);
if (root === n.parentNode) {
var key = (l.item (i)).getAttribute ("key");
var value = (l.item (i)).getAttribute ("value");
this.items.put (key, value);
}}
l = root.getElementsByTagName ("list");
for (var i = 0; i < l.length; i++) {
var n = l.item (i);
if (root === n.parentNode) {
var child = l.item (i);
var key = child.getAttribute ("key");
var list = child.getElementsByTagName ("item");
var valueList =  new java.util.ArrayList ();
for (var j = 0; j < list.length; j++) {
var node = list.item (j);
if (child === node.parentNode) {
valueList.add (node.getAttribute ("value"));
}}
var value =  new Array (valueList.size ());
valueList.toArray (value);
this.arrayItems.put (key, value);
}}
l = root.getElementsByTagName ("section");
for (var i = 0; i < l.length; i++) {
var n = l.item (i);
if (root === n.parentNode) {
var s =  new org.eclipse.jface.dialogs.DialogSettings ("NoName");
s.load (document, n);
this.addSection (s);
}}
}, $fz.isPrivate = true, $fz), "org.w3c.dom.Document,org.w3c.dom.Element");
Clazz.defineMethod (c$, "put", 
function (key, value) {
this.arrayItems.put (key, value);
}, "~S,~A");
Clazz.defineMethod (c$, "put", 
function (key, value) {
this.put (key, String.valueOf (value));
}, "~S,~N");
Clazz.defineMethod (c$, "put", 
function (key, value) {
this.put (key, String.valueOf (value));
}, "~S,~N");
Clazz.defineMethod (c$, "put", 
function (key, value) {
this.put (key, String.valueOf (value));
}, "~S,~N");
Clazz.defineMethod (c$, "put", 
function (key, value) {
this.put (key, String.valueOf (value));
}, "~S,~N");
Clazz.defineMethod (c$, "put", 
function (key, value) {
this.items.put (key, value);
}, "~S,~S");
Clazz.defineMethod (c$, "put", 
function (key, value) {
this.put (key, String.valueOf (value));
}, "~S,~B");
Clazz.defineMethod (c$, "save", 
function (writer) {
this.save ( new org.eclipse.jface.dialogs.DialogSettings.XMLWriter (writer));
}, "java.io.Writer");
Clazz.defineMethod (c$, "save", 
function (fileName) {
var stream =  new java.io.FileOutputStream (fileName);
var writer =  new org.eclipse.jface.dialogs.DialogSettings.XMLWriter (stream);
this.save (writer);
writer.close ();
}, "~S");
Clazz.defineMethod (c$, "save", 
($fz = function (out) {
var attributes =  new java.util.HashMap (2);
attributes.put ("name", this.name == null ? "" : this.name);
out.startTag ("section", attributes);
attributes.clear ();
for (var i = this.items.keySet ().iterator (); i.hasNext (); ) {
var key = i.next ();
attributes.put ("key", key == null ? "" : key);
var string = this.items.get (key);
attributes.put ("value", string == null ? "" : string);
out.printTag ("item", attributes, true);
}
attributes.clear ();
for (var i = this.arrayItems.keySet ().iterator (); i.hasNext (); ) {
var key = i.next ();
attributes.put ("key", key == null ? "" : key);
out.startTag ("list", attributes);
var value = this.arrayItems.get (key);
attributes.clear ();
if (value != null) {
for (var index = 0; index < value.length; index++) {
var string = value[index];
attributes.put ("value", string == null ? "" : string);
out.printTag ("item", attributes, true);
}
}out.endTag ("list");
}
for (var i = this.sections.values ().iterator (); i.hasNext (); ) {
(i.next ()).save (out);
}
out.endTag ("section");
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.dialogs.DialogSettings.XMLWriter");
Clazz.defineStatics (c$,
"TAG_SECTION", "section",
"TAG_NAME", "name",
"TAG_KEY", "key",
"TAG_VALUE", "value",
"TAG_LIST", "list",
"TAG_ITEM", "item");
});
