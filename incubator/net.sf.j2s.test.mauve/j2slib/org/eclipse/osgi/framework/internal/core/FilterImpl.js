Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["java.security.PrivilegedAction", "org.osgi.framework.Filter"], "org.eclipse.osgi.framework.internal.core.FilterImpl", ["java.lang.Boolean", "$.Byte", "$.Character", "$.Double", "$.Float", "$.Long", "$.Short", "$.StringBuffer", "java.security.AccessController", "java.util.Vector", "org.eclipse.osgi.framework.debug.Debug", "org.eclipse.osgi.framework.internal.core.Msg", "org.eclipse.osgi.framework.util.Headers", "org.eclipse.osgi.util.NLS", "org.osgi.framework.InvalidSyntaxException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.operation = 0;
this.attr = null;
this.value = null;
this.filter = null;
this.topLevel = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "FilterImpl", null, org.osgi.framework.Filter);
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.filterstring = null;
this.filter = null;
this.pos = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core.FilterImpl, "Parser");
Clazz.makeConstructor (c$, 
function (a) {
this.filterstring = a;
this.filter = a.toCharArray ();
this.pos = 0;
}, "~S");
Clazz.defineMethod (c$, "parse", 
function (a) {
try {
this.parse_filter (a);
} catch (e) {
if (Clazz.instanceOf (e, ArrayIndexOutOfBoundsException)) {
throw  new org.osgi.framework.InvalidSyntaxException (org.eclipse.osgi.framework.internal.core.Msg.FILTER_TERMINATED_ABRUBTLY, this.filterstring);
} else {
throw e;
}
}
if (this.pos != this.filter.length) {
throw  new org.osgi.framework.InvalidSyntaxException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.FILTER_TRAILING_CHARACTERS, String.valueOf (this.pos)), this.filterstring);
}}, "org.eclipse.osgi.framework.internal.core.FilterImpl");
Clazz.defineMethod (c$, "parse_filter", 
function (a) {
this.skipWhiteSpace ();
if ((this.filter[this.pos]).charCodeAt (0) != ('(').charCodeAt (0)) {
throw  new org.osgi.framework.InvalidSyntaxException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.FILTER_MISSING_LEFTPAREN, String.valueOf (this.pos)), this.filterstring);
}this.pos++;
this.parse_filtercomp (a);
this.skipWhiteSpace ();
if ((this.filter[this.pos]).charCodeAt (0) != (')').charCodeAt (0)) {
throw  new org.osgi.framework.InvalidSyntaxException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.FILTER_MISSING_RIGHTPAREN, String.valueOf (this.pos)), this.filterstring);
}this.pos++;
this.skipWhiteSpace ();
}, "org.eclipse.osgi.framework.internal.core.FilterImpl");
Clazz.defineMethod (c$, "parse_filtercomp", 
function (a) {
this.skipWhiteSpace ();
var b = this.filter[this.pos];
switch (b) {
case '&':
{
this.pos++;
this.parse_and (a);
break;
}case '|':
{
this.pos++;
this.parse_or (a);
break;
}case '!':
{
this.pos++;
this.parse_not (a);
break;
}default:
{
this.parse_item (a);
break;
}}
}, "org.eclipse.osgi.framework.internal.core.FilterImpl");
Clazz.defineMethod (c$, "parse_and", 
function (a) {
this.skipWhiteSpace ();
if ((this.filter[this.pos]).charCodeAt (0) != ('(').charCodeAt (0)) {
throw  new org.osgi.framework.InvalidSyntaxException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.FILTER_MISSING_LEFTPAREN, String.valueOf (this.pos)), this.filterstring);
}var b =  new java.util.Vector (10, 10);
while ((this.filter[this.pos]).charCodeAt (0) == ('(').charCodeAt (0)) {
var c =  new org.eclipse.osgi.framework.internal.core.FilterImpl ();
this.parse_filter (c);
b.addElement (c);
}
var c = b.size ();
var d =  new Array (c);
b.copyInto (d);
a.setFilter (7, null, d);
}, "org.eclipse.osgi.framework.internal.core.FilterImpl");
Clazz.defineMethod (c$, "parse_or", 
function (a) {
this.skipWhiteSpace ();
if ((this.filter[this.pos]).charCodeAt (0) != ('(').charCodeAt (0)) {
throw  new org.osgi.framework.InvalidSyntaxException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.FILTER_MISSING_LEFTPAREN, String.valueOf (this.pos)), this.filterstring);
}var b =  new java.util.Vector (10, 10);
while ((this.filter[this.pos]).charCodeAt (0) == ('(').charCodeAt (0)) {
var c =  new org.eclipse.osgi.framework.internal.core.FilterImpl ();
this.parse_filter (c);
b.addElement (c);
}
var c = b.size ();
var d =  new Array (c);
b.copyInto (d);
a.setFilter (8, null, d);
}, "org.eclipse.osgi.framework.internal.core.FilterImpl");
Clazz.defineMethod (c$, "parse_not", 
function (a) {
this.skipWhiteSpace ();
if ((this.filter[this.pos]).charCodeAt (0) != ('(').charCodeAt (0)) {
throw  new org.osgi.framework.InvalidSyntaxException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.FILTER_MISSING_LEFTPAREN, String.valueOf (this.pos)), this.filterstring);
}var b =  new org.eclipse.osgi.framework.internal.core.FilterImpl ();
this.parse_filter (b);
a.setFilter (9, null, b);
}, "org.eclipse.osgi.framework.internal.core.FilterImpl");
Clazz.defineMethod (c$, "parse_item", 
function (a) {
var b = this.parse_attr ();
this.skipWhiteSpace ();
switch (this.filter[this.pos]) {
case '~':
{
if ((this.filter[this.pos + 1]).charCodeAt (0) == ('=').charCodeAt (0)) {
this.pos += 2;
a.setFilter (2, b, this.parse_value ());
return ;
}break;
}case '>':
{
if ((this.filter[this.pos + 1]).charCodeAt (0) == ('=').charCodeAt (0)) {
this.pos += 2;
a.setFilter (3, b, this.parse_value ());
return ;
}break;
}case '<':
{
if ((this.filter[this.pos + 1]).charCodeAt (0) == ('=').charCodeAt (0)) {
this.pos += 2;
a.setFilter (4, b, this.parse_value ());
return ;
}break;
}case '=':
{
if ((this.filter[this.pos + 1]).charCodeAt (0) == ('*').charCodeAt (0)) {
var c = this.pos;
this.pos += 2;
this.skipWhiteSpace ();
if ((this.filter[this.pos]).charCodeAt (0) == (')').charCodeAt (0)) {
a.setFilter (5, b, null);
return ;
}this.pos = c;
}this.pos++;
var c = this.parse_substring ();
if (Clazz.instanceOf (c, String)) {
a.setFilter (1, b, c);
} else {
a.setFilter (6, b, c);
}return ;
}}
throw  new org.osgi.framework.InvalidSyntaxException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.FILTER_INVALID_OPERATOR, String.valueOf (this.pos)), this.filterstring);
}, "org.eclipse.osgi.framework.internal.core.FilterImpl");
Clazz.defineMethod (c$, "parse_attr", 
function () {
this.skipWhiteSpace ();
var a = this.pos;
var b = this.pos;
var c = this.filter[this.pos];
while ("~<>=()".indexOf (c) == -1) {
this.pos++;
if (!Character.isWhitespace (c)) {
b = this.pos;
}c = this.filter[this.pos];
}
var d = b - a;
if (d == 0) {
throw  new org.osgi.framework.InvalidSyntaxException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.FILTER_MISSING_ATTR, String.valueOf (this.pos)), this.filterstring);
}return  String.instantialize (this.filter, a, d);
});
Clazz.defineMethod (c$, "parse_value", 
function () {
var a =  new StringBuffer (this.filter.length - this.pos);
parseloop : while (true) {
var b = this.filter[this.pos];
switch (b) {
case ')':
{
break parseloop;
}case '(':
{
throw  new org.osgi.framework.InvalidSyntaxException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.FILTER_INVALID_VALUE, String.valueOf (this.pos)), this.filterstring);
}case '\\':
{
this.pos++;
b = this.filter[this.pos];
}default:
{
a.append (b);
this.pos++;
break;
}}
}
if (a.length () == 0) {
throw  new org.osgi.framework.InvalidSyntaxException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.FILTER_MISSING_VALUE, String.valueOf (this.pos)), this.filterstring);
}return a.toString ();
});
Clazz.defineMethod (c$, "parse_substring", 
function () {
var a =  new StringBuffer (this.filter.length - this.pos);
var b =  new java.util.Vector (10, 10);
parseloop : while (true) {
var c = this.filter[this.pos];
switch (c) {
case ')':
{
if (a.length () > 0) {
b.addElement (a.toString ());
}break parseloop;
}case '(':
{
throw  new org.osgi.framework.InvalidSyntaxException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.FILTER_INVALID_VALUE, String.valueOf (this.pos)), this.filterstring);
}case '*':
{
if (a.length () > 0) {
b.addElement (a.toString ());
}a.setLength (0);
b.addElement (null);
this.pos++;
break;
}case '\\':
{
this.pos++;
c = this.filter[this.pos];
}default:
{
a.append (c);
this.pos++;
break;
}}
}
var c = b.size ();
if (c == 0) {
throw  new org.osgi.framework.InvalidSyntaxException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.FILTER_MISSING_VALUE, String.valueOf (this.pos)), this.filterstring);
}if (c == 1) {
var d = b.elementAt (0);
if (d != null) {
return d;
}}var d =  new Array (c);
b.copyInto (d);
return d;
});
Clazz.defineMethod (c$, "skipWhiteSpace", 
function () {
var a = this.filter.length;
while ((this.pos < a) && Character.isWhitespace (this.filter[this.pos])) {
this.pos++;
}
});
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.constructor = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core.FilterImpl, "SetAccessibleAction", null, java.security.PrivilegedAction);
Clazz.makeConstructor (c$, 
function (a) {
this.constructor = a;
}, "java.lang.reflect.Constructor");
Clazz.overrideMethod (c$, "run", 
function () {
this.constructor.setAccessible (true);
return null;
});
c$ = Clazz.p0p ();
Clazz.makeConstructor (c$, 
function (filter) {
this.topLevel = true;
 new org.eclipse.osgi.framework.internal.core.FilterImpl.Parser (filter).parse (this);
}, "~S");
Clazz.defineMethod (c$, "match", 
function (reference) {
return this.match0 ((reference).registration.properties);
}, "org.osgi.framework.ServiceReference");
Clazz.defineMethod (c$, "match", 
function (dictionary) {
if (dictionary != null) {
dictionary =  new org.eclipse.osgi.framework.util.Headers (dictionary);
}return this.match0 (dictionary);
}, "java.util.Dictionary");
Clazz.overrideMethod (c$, "matchCase", 
function (dictionary) {
return this.match0 (dictionary);
}, "java.util.Dictionary");
Clazz.overrideMethod (c$, "toString", 
function () {
if (this.filter == null) {
var filter =  new StringBuffer ();
filter.append ('(');
switch (this.operation) {
case 7:
{
filter.append ('&');
var filters = this.value;
var size = filters.length;
for (var i = 0; i < size; i++) {
filter.append (filters[i].toString ());
}
break;
}case 8:
{
filter.append ('|');
var filters = this.value;
var size = filters.length;
for (var i = 0; i < size; i++) {
filter.append (filters[i].toString ());
}
break;
}case 9:
{
filter.append ('!');
filter.append (this.value.toString ());
break;
}case 6:
{
filter.append (this.attr);
filter.append ('=');
var substrings = this.value;
var size = substrings.length;
for (var i = 0; i < size; i++) {
var substr = substrings[i];
if (substr == null) {
filter.append ('*');
} else {
filter.append (org.eclipse.osgi.framework.internal.core.FilterImpl.encodeValue (substr));
}}
break;
}case 1:
{
filter.append (this.attr);
filter.append ('=');
filter.append (org.eclipse.osgi.framework.internal.core.FilterImpl.encodeValue (this.value.toString ()));
break;
}case 3:
{
filter.append (this.attr);
filter.append (">=");
filter.append (org.eclipse.osgi.framework.internal.core.FilterImpl.encodeValue (this.value.toString ()));
break;
}case 4:
{
filter.append (this.attr);
filter.append ("<=");
filter.append (org.eclipse.osgi.framework.internal.core.FilterImpl.encodeValue (this.value.toString ()));
break;
}case 2:
{
filter.append (this.attr);
filter.append ("~=");
filter.append (org.eclipse.osgi.framework.internal.core.FilterImpl.encodeValue (org.eclipse.osgi.framework.internal.core.FilterImpl.approxString (this.value.toString ())));
break;
}case 5:
{
filter.append (this.attr);
filter.append ("=*");
break;
}}
filter.append (')');
if (this.topLevel) {
this.filter = filter.toString ();
} else {
return filter.toString ();
}}return this.filter;
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (obj === this) {
return true;
}if (!(Clazz.instanceOf (obj, org.eclipse.osgi.framework.internal.core.FilterImpl))) {
return false;
}return this.toString ().equals (obj.toString ());
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.toString ().hashCode ();
});
Clazz.makeConstructor (c$, 
function () {
this.topLevel = false;
});
Clazz.defineMethod (c$, "setFilter", 
function (operation, attr, value) {
this.operation = operation;
this.attr = attr;
this.value = value;
}, "~N,~S,~O");
Clazz.defineMethod (c$, "match", 
function (reference) {
return this.match0 (reference.registration.properties);
}, "org.eclipse.osgi.framework.internal.core.ServiceReferenceImpl");
Clazz.defineMethod (c$, "match0", 
function (properties) {
switch (this.operation) {
case 7:
{
var filters = this.value;
var size = filters.length;
for (var i = 0; i < size; i++) {
if (!filters[i].match0 (properties)) {
return false;
}}
return true;
}case 8:
{
var filters = this.value;
var size = filters.length;
for (var i = 0; i < size; i++) {
if (filters[i].match0 (properties)) {
return true;
}}
return false;
}case 9:
{
var filter = this.value;
return !filter.match0 (properties);
}case 6:
case 1:
case 3:
case 4:
case 2:
{
var prop = (properties == null) ? null : properties.get (this.attr);
return this.compare (this.operation, prop, this.value);
}case 5:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("PRESENT(" + this.attr + ")");
}var prop = (properties == null) ? null : properties.get (this.attr);
return prop != null;
}}
return false;
}, "java.util.Dictionary");
c$.encodeValue = Clazz.defineMethod (c$, "encodeValue", 
function (value) {
var encoded = false;
var inlen = value.length;
var outlen = inlen << 1;
var output =  Clazz.newArray (outlen, '\0');
value.getChars (0, inlen, output, inlen);
var cursor = 0;
for (var i = inlen; i < outlen; i++) {
var c = output[i];
switch (c) {
case '(':
case '*':
case ')':
case '\\':
{
output[cursor] = '\\';
cursor++;
encoded = true;
break;
}}
output[cursor] = c;
cursor++;
}
return encoded ?  String.instantialize (output, 0, cursor) : value;
}, "~S");
Clazz.defineMethod (c$, "compare", 
function (operation, value1, value2) {
if (value1 == null) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("compare(" + value1 + "," + value2 + ")");
}return false;
}if (Clazz.instanceOf (value1, String)) {
return this.compare_String (operation, value1, value2);
}var clazz = value1.getClass ();
if (clazz.isArray ()) {
var type = clazz.getComponentType ();
if (type.isPrimitive ()) {
return this.compare_PrimitiveArray (operation, type, value1, value2);
} else {
return this.compare_ObjectArray (operation, value1, value2);
}}if (Clazz.instanceOf (value1, java.util.Vector)) {
return this.compare_Vector (operation, value1, value2);
}if (Clazz.instanceOf (value1, Integer)) {
return this.compare_Integer (operation, (value1).intValue (), value2);
}if (Clazz.instanceOf (value1, Long)) {
return this.compare_Long (operation, (value1).longValue (), value2);
}if (Clazz.instanceOf (value1, Byte)) {
return this.compare_Byte (operation, (value1).byteValue (), value2);
}if (Clazz.instanceOf (value1, Short)) {
return this.compare_Short (operation, (value1).shortValue (), value2);
}if (Clazz.instanceOf (value1, Character)) {
return this.compare_Character (operation, (value1).charValue (), value2);
}if (Clazz.instanceOf (value1, Float)) {
return this.compare_Float (operation, (value1).floatValue (), value2);
}if (Clazz.instanceOf (value1, Double)) {
return this.compare_Double (operation, (value1).doubleValue (), value2);
}if (Clazz.instanceOf (value1, Boolean)) {
return this.compare_Boolean (operation, (value1).booleanValue (), value2);
}if (Clazz.instanceOf (value1, Comparable)) {
return this.compare_Comparable (operation, value1, value2);
}return this.compare_Unknown (operation, value1, value2);
}, "~N,~O,~O");
Clazz.defineMethod (c$, "compare_Vector", 
function (operation, vector, value2) {
var size = vector.size ();
for (var i = 0; i < size; i++) {
if (this.compare (operation, vector.elementAt (i), value2)) {
return true;
}}
return false;
}, "~N,java.util.Vector,~O");
Clazz.defineMethod (c$, "compare_ObjectArray", 
function (operation, array, value2) {
var size = array.length;
for (var i = 0; i < size; i++) {
if (this.compare (operation, array[i], value2)) {
return true;
}}
return false;
}, "~N,~A,~O");
Clazz.defineMethod (c$, "compare_PrimitiveArray", 
function (operation, type, primarray, value2) {
if (Integer.TYPE.isAssignableFrom (type)) {
var array = primarray;
var size = array.length;
for (var i = 0; i < size; i++) {
if (this.compare_Integer (operation, array[i], value2)) {
return true;
}}
return false;
}if (Long.TYPE.isAssignableFrom (type)) {
var array = primarray;
var size = array.length;
for (var i = 0; i < size; i++) {
if (this.compare_Long (operation, array[i], value2)) {
return true;
}}
return false;
}if (Byte.TYPE.isAssignableFrom (type)) {
var array = primarray;
var size = array.length;
for (var i = 0; i < size; i++) {
if (this.compare_Byte (operation, array[i], value2)) {
return true;
}}
return false;
}if (Short.TYPE.isAssignableFrom (type)) {
var array = primarray;
var size = array.length;
for (var i = 0; i < size; i++) {
if (this.compare_Short (operation, array[i], value2)) {
return true;
}}
return false;
}if (Character.TYPE.isAssignableFrom (type)) {
var array = primarray;
var size = array.length;
for (var i = 0; i < size; i++) {
if (this.compare_Character (operation, array[i], value2)) {
return true;
}}
return false;
}if (Float.TYPE.isAssignableFrom (type)) {
var array = primarray;
var size = array.length;
for (var i = 0; i < size; i++) {
if (this.compare_Float (operation, array[i], value2)) {
return true;
}}
return false;
}if (Double.TYPE.isAssignableFrom (type)) {
var array = primarray;
var size = array.length;
for (var i = 0; i < size; i++) {
if (this.compare_Double (operation, array[i], value2)) {
return true;
}}
return false;
}if (Boolean.TYPE.isAssignableFrom (type)) {
var array = primarray;
var size = array.length;
for (var i = 0; i < size; i++) {
if (this.compare_Boolean (operation, array[i], value2)) {
return true;
}}
return false;
}return false;
}, "~N,Class,~O,~O");
Clazz.defineMethod (c$, "compare_String", 
function (operation, string, value2) {
switch (operation) {
case 6:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("SUBSTRING(" + string + "," + value2 + ")");
}var substrings = value2;
var pos = 0;
var size = substrings.length;
for (var i = 0; i < size; i++) {
var substr = substrings[i];
if (i + 1 < size) {
if (substr == null) {
var substr2 = substrings[i + 1];
if (substr2 == null) continue ;if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("indexOf(\"" + substr2 + "\"," + pos + ")");
}var index = string.indexOf (substr2, pos);
if (index == -1) {
return false;
}pos = index + substr2.length;
if (i + 2 < size) i++;
} else {
var len = substr.length;
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("regionMatches(" + pos + ",\"" + substr + "\")");
}if (string.regionMatches (pos, substr, 0, len)) {
pos += len;
} else {
return false;
}}} else {
if (substr == null) {
return true;
} else {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("regionMatches(" + pos + "," + substr + ")");
}return string.endsWith (substr);
}}}
return true;
}case 1:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("EQUAL(" + string + "," + value2 + ")");
}return string.equals (value2);
}case 2:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("APPROX(" + string + "," + value2 + ")");
}string = org.eclipse.osgi.framework.internal.core.FilterImpl.approxString (string);
var string2 = org.eclipse.osgi.framework.internal.core.FilterImpl.approxString (value2);
return string.equalsIgnoreCase (string2);
}case 3:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("GREATER(" + string + "," + value2 + ")");
}return string.compareTo (value2) >= 0;
}case 4:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("LESS(" + string + "," + value2 + ")");
}return string.compareTo (value2) <= 0;
}}
return false;
}, "~N,~S,~O");
Clazz.defineMethod (c$, "compare_Integer", 
function (operation, intval, value2) {
var intval2 = Integer.parseInt ((value2).trim ());
switch (operation) {
case 6:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("SUBSTRING(" + intval + "," + value2 + ")");
}return false;
}case 1:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("EQUAL(" + intval + "," + value2 + ")");
}return intval == intval2;
}case 2:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("APPROX(" + intval + "," + value2 + ")");
}return intval == intval2;
}case 3:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("GREATER(" + intval + "," + value2 + ")");
}return intval >= intval2;
}case 4:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("LESS(" + intval + "," + value2 + ")");
}return intval <= intval2;
}}
return false;
}, "~N,~N,~O");
Clazz.defineMethod (c$, "compare_Long", 
function (operation, longval, value2) {
var longval2 = Long.parseLong ((value2).trim ());
switch (operation) {
case 6:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("SUBSTRING(" + longval + "," + value2 + ")");
}return false;
}case 1:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("EQUAL(" + longval + "," + value2 + ")");
}return longval == longval2;
}case 2:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("APPROX(" + longval + "," + value2 + ")");
}return longval == longval2;
}case 3:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("GREATER(" + longval + "," + value2 + ")");
}return longval >= longval2;
}case 4:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("LESS(" + longval + "," + value2 + ")");
}return longval <= longval2;
}}
return false;
}, "~N,~N,~O");
Clazz.defineMethod (c$, "compare_Byte", 
function (operation, byteval, value2) {
var byteval2 = Byte.parseByte ((value2).trim ());
switch (operation) {
case 6:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("SUBSTRING(" + byteval + "," + value2 + ")");
}return false;
}case 1:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("EQUAL(" + byteval + "," + value2 + ")");
}return byteval == byteval2;
}case 2:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("APPROX(" + byteval + "," + value2 + ")");
}return byteval == byteval2;
}case 3:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("GREATER(" + byteval + "," + value2 + ")");
}return byteval >= byteval2;
}case 4:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("LESS(" + byteval + "," + value2 + ")");
}return byteval <= byteval2;
}}
return false;
}, "~N,~N,~O");
Clazz.defineMethod (c$, "compare_Short", 
function (operation, shortval, value2) {
var shortval2 = Short.parseShort ((value2).trim ());
switch (operation) {
case 6:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("SUBSTRING(" + shortval + "," + value2 + ")");
}return false;
}case 1:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("EQUAL(" + shortval + "," + value2 + ")");
}return shortval == shortval2;
}case 2:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("APPROX(" + shortval + "," + value2 + ")");
}return shortval == shortval2;
}case 3:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("GREATER(" + shortval + "," + value2 + ")");
}return shortval >= shortval2;
}case 4:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("LESS(" + shortval + "," + value2 + ")");
}return shortval <= shortval2;
}}
return false;
}, "~N,~N,~O");
Clazz.defineMethod (c$, "compare_Character", 
function (operation, charval, value2) {
var charval2 = ((value2).trim ()).charAt (0);
switch (operation) {
case 6:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("SUBSTRING(" + charval + "," + value2 + ")");
}return false;
}case 1:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("EQUAL(" + charval + "," + value2 + ")");
}return (charval).charCodeAt (0) == (charval2).charCodeAt (0);
}case 2:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("APPROX(" + charval + "," + value2 + ")");
}return (Character.toLowerCase (charval)).charCodeAt (0) == (Character.toLowerCase (charval2)).charCodeAt (0);
}case 3:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("GREATER(" + charval + "," + value2 + ")");
}return (charval).charCodeAt (0) >= (charval2).charCodeAt (0);
}case 4:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("LESS(" + charval + "," + value2 + ")");
}return (charval).charCodeAt (0) <= (charval2).charCodeAt (0);
}}
return false;
}, "~N,~N,~O");
Clazz.defineMethod (c$, "compare_Boolean", 
function (operation, boolval, value2) {
var boolval2 =  new Boolean ((value2).trim ()).booleanValue ();
switch (operation) {
case 6:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("SUBSTRING(" + boolval + "," + value2 + ")");
}return false;
}case 1:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("EQUAL(" + boolval + "," + value2 + ")");
}return boolval == boolval2;
}case 2:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("APPROX(" + boolval + "," + value2 + ")");
}return boolval == boolval2;
}case 3:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("GREATER(" + boolval + "," + value2 + ")");
}return boolval == boolval2;
}case 4:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("LESS(" + boolval + "," + value2 + ")");
}return boolval == boolval2;
}}
return false;
}, "~N,~B,~O");
Clazz.defineMethod (c$, "compare_Float", 
function (operation, floatval, value2) {
var floatval2 = Float.parseFloat ((value2).trim ());
switch (operation) {
case 6:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("SUBSTRING(" + floatval + "," + value2 + ")");
}return false;
}case 1:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("EQUAL(" + floatval + "," + value2 + ")");
}return floatval == floatval2;
}case 2:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("APPROX(" + floatval + "," + value2 + ")");
}return floatval == floatval2;
}case 3:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("GREATER(" + floatval + "," + value2 + ")");
}return floatval >= floatval2;
}case 4:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("LESS(" + floatval + "," + value2 + ")");
}return floatval <= floatval2;
}}
return false;
}, "~N,~N,~O");
Clazz.defineMethod (c$, "compare_Double", 
function (operation, doubleval, value2) {
var doubleval2 = Double.parseDouble ((value2).trim ());
switch (operation) {
case 6:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("SUBSTRING(" + doubleval + "," + value2 + ")");
}return false;
}case 1:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("EQUAL(" + doubleval + "," + value2 + ")");
}return doubleval == doubleval2;
}case 2:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("APPROX(" + doubleval + "," + value2 + ")");
}return doubleval == doubleval2;
}case 3:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("GREATER(" + doubleval + "," + value2 + ")");
}return doubleval >= doubleval2;
}case 4:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("LESS(" + doubleval + "," + value2 + ")");
}return doubleval <= doubleval2;
}}
return false;
}, "~N,~N,~O");
Clazz.defineMethod (c$, "compare_Comparable", 
function (operation, value1, value2) {
var constructor;
try {
constructor = value1.getClass ().getConstructor (org.eclipse.osgi.framework.internal.core.FilterImpl.constructorType);
} catch (e) {
if (Clazz.instanceOf (e, NoSuchMethodException)) {
return false;
} else {
throw e;
}
}
try {
if (!constructor.isAccessible ()) java.security.AccessController.doPrivileged ( new org.eclipse.osgi.framework.internal.core.FilterImpl.SetAccessibleAction (constructor));
value2 = constructor.newInstance ([(value2).trim ()]);
} catch (e$$) {
if (Clazz.instanceOf (e$$, IllegalAccessException)) {
var e = e$$;
{
return false;
}
} else if (Clazz.instanceOf (e$$, java.lang.reflect.InvocationTargetException)) {
var e = e$$;
{
return false;
}
} else if (Clazz.instanceOf (e$$, InstantiationException)) {
var e = e$$;
{
return false;
}
} else {
throw e$$;
}
}
switch (operation) {
case 6:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("SUBSTRING(" + value1 + "," + value2 + ")");
}return false;
}case 1:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("EQUAL(" + value1 + "," + value2 + ")");
}return value1.compareTo (value2) == 0;
}case 2:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("APPROX(" + value1 + "," + value2 + ")");
}return value1.compareTo (value2) == 0;
}case 3:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("GREATER(" + value1 + "," + value2 + ")");
}return value1.compareTo (value2) >= 0;
}case 4:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("LESS(" + value1 + "," + value2 + ")");
}return value1.compareTo (value2) <= 0;
}}
return false;
}, "~N,Comparable,~O");
Clazz.defineMethod (c$, "compare_Unknown", 
function (operation, value1, value2) {
var constructor;
try {
constructor = value1.getClass ().getConstructor (org.eclipse.osgi.framework.internal.core.FilterImpl.constructorType);
} catch (e) {
if (Clazz.instanceOf (e, NoSuchMethodException)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("Type not supported");
}return false;
} else {
throw e;
}
}
try {
if (!constructor.isAccessible ()) java.security.AccessController.doPrivileged ( new org.eclipse.osgi.framework.internal.core.FilterImpl.SetAccessibleAction (constructor));
value2 = constructor.newInstance ([(value2).trim ()]);
} catch (e$$) {
if (Clazz.instanceOf (e$$, IllegalAccessException)) {
var e = e$$;
{
return false;
}
} else if (Clazz.instanceOf (e$$, java.lang.reflect.InvocationTargetException)) {
var e = e$$;
{
return false;
}
} else if (Clazz.instanceOf (e$$, InstantiationException)) {
var e = e$$;
{
return false;
}
} else {
throw e$$;
}
}
switch (operation) {
case 6:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("SUBSTRING(" + value1 + "," + value2 + ")");
}return false;
}case 1:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("EQUAL(" + value1 + "," + value2 + ")");
}return value1.equals (value2);
}case 2:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("APPROX(" + value1 + "," + value2 + ")");
}return value1.equals (value2);
}case 3:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("GREATER(" + value1 + "," + value2 + ")");
}return value1.equals (value2);
}case 4:
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER) {
org.eclipse.osgi.framework.debug.Debug.println ("LESS(" + value1 + "," + value2 + ")");
}return value1.equals (value2);
}}
return false;
}, "~N,~O,~O");
c$.approxString = Clazz.defineMethod (c$, "approxString", 
function (input) {
var changed = false;
var output = input.toCharArray ();
var length = output.length;
var cursor = 0;
for (var i = 0; i < length; i++) {
var c = output[i];
if (Character.isWhitespace (c)) {
changed = true;
continue ;}output[cursor] = c;
cursor++;
}
return changed ?  String.instantialize (output, 0, cursor) : input;
}, "~S");
Clazz.defineStatics (c$,
"EQUAL", 1,
"APPROX", 2,
"GREATER", 3,
"LESS", 4,
"PRESENT", 5,
"SUBSTRING", 6,
"AND", 7,
"OR", 8,
"NOT", 9);
c$.constructorType = c$.prototype.constructorType = [String];
});
