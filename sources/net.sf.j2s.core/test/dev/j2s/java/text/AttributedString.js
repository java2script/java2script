Clazz.declarePackage ("java.text");
Clazz.load (["java.util.AbstractMap", "$.Map", "java.text.AttributedCharacterIterator"], ["java.text.AttributeEntry", "$.AttributedString"], ["java.lang.IllegalArgumentException", "$.InternalError", "$.NullPointerException", "$.StringBuffer", "$.UnsupportedOperationException", "java.util.HashSet", "$.Hashtable", "$.Vector", "java.text.Annotation"], function () {
c$ = Clazz.decorateAsClass (function () {
this.text = null;
this.runArraySize = 0;
this.runCount = 0;
this.runStarts = null;
this.runAttributes = null;
this.runAttributeValues = null;
if (!Clazz.isClassDefined ("java.text.AttributedString.AttributedStringIterator")) {
java.text.AttributedString.$AttributedString$AttributedStringIterator$ ();
}
if (!Clazz.isClassDefined ("java.text.AttributedString.AttributeMap")) {
java.text.AttributedString.$AttributedString$AttributeMap$ ();
}
Clazz.instantialize (this, arguments);
}, java.text, "AttributedString");
Clazz.makeConstructor (c$, 
function (iterators) {
if (iterators == null) {
throw  new NullPointerException ("Iterators must not be null");
}if (iterators.length == 0) {
this.text = "";
} else {
var buffer =  new StringBuffer ();
for (var counter = 0; counter < iterators.length; counter++) {
this.appendContents (buffer, iterators[counter]);
}
this.text = buffer.toString ();
if (this.text.length > 0) {
var offset = 0;
var last = null;
for (var counter = 0; counter < iterators.length; counter++) {
var iterator = iterators[counter];
var start = iterator.getBeginIndex ();
var end = iterator.getEndIndex ();
var index = start;
while (index < end) {
iterator.setIndex (index);
var attrs = iterator.getAttributes ();
if (java.text.AttributedString.mapsDiffer (last, attrs)) {
this.setAttributes (attrs, index - start + offset);
}last = attrs;
index = iterator.getRunLimit ();
}
offset += (end - start);
}
}}}, "~A");
Clazz.makeConstructor (c$, 
function (text) {
if (text == null) {
throw  new NullPointerException ();
}this.text = text;
}, "~S");
Clazz.makeConstructor (c$, 
function (text, attributes) {
if (text == null || attributes == null) {
throw  new NullPointerException ();
}this.text = text;
if (text.length == 0) {
if (attributes.isEmpty ()) return;
throw  new IllegalArgumentException ("Can't add attribute to 0-length text");
}var attributeCount = attributes.size ();
if (attributeCount > 0) {
this.createRunAttributeDataVectors ();
var newRunAttributes =  new java.util.Vector (attributeCount);
var newRunAttributeValues =  new java.util.Vector (attributeCount);
this.runAttributes[0] = newRunAttributes;
this.runAttributeValues[0] = newRunAttributeValues;
var iterator = attributes.entrySet ().iterator ();
while (iterator.hasNext ()) {
var entry = iterator.next ();
newRunAttributes.addElement (entry.getKey ());
newRunAttributeValues.addElement (entry.getValue ());
}
}}, "~S,java.util.Map");
Clazz.makeConstructor (c$, 
function (text) {
this.construct (text, text.getBeginIndex (), text.getEndIndex (), null);
}, "java.text.AttributedCharacterIterator");
Clazz.makeConstructor (c$, 
function (text, beginIndex, endIndex) {
this.construct (text, beginIndex, endIndex, null);
}, "java.text.AttributedCharacterIterator,~N,~N");
Clazz.makeConstructor (c$, 
function (text, beginIndex, endIndex, attributes) {
if (text == null) {
throw  new NullPointerException ();
}var textBeginIndex = text.getBeginIndex ();
var textEndIndex = text.getEndIndex ();
if (beginIndex < textBeginIndex || endIndex > textEndIndex || beginIndex > endIndex) throw  new IllegalArgumentException ("Invalid substring range");
var textBuffer =  new StringBuffer ();
text.setIndex (beginIndex);
for (var c = text.current (); text.getIndex () < endIndex; c = text.next ()) textBuffer.append (c);

this.text = textBuffer.toString ();
if (beginIndex == endIndex) return;
var keys =  new java.util.HashSet ();
if (attributes == null) {
keys.addAll (text.getAllAttributeKeys ());
} else {
for (var i = 0; i < attributes.length; i++) keys.add (attributes[i]);

keys.retainAll (text.getAllAttributeKeys ());
}if (keys.isEmpty ()) return;
var itr = keys.iterator ();
while (itr.hasNext ()) {
var attributeKey = itr.next ();
text.setIndex (textBeginIndex);
while (text.getIndex () < endIndex) {
var start = text.getRunStart (attributeKey);
var limit = text.getRunLimit (attributeKey);
var value = text.getAttribute (attributeKey);
if (value != null) {
if (Clazz.instanceOf (value, java.text.Annotation)) {
if (start >= beginIndex && limit <= endIndex) {
this.addAttribute (attributeKey, value, start - beginIndex, limit - beginIndex);
} else {
if (limit > endIndex) break;
}} else {
if (start >= endIndex) break;
if (limit > beginIndex) {
if (start < beginIndex) start = beginIndex;
if (limit > endIndex) limit = endIndex;
if (start != limit) {
this.addAttribute (attributeKey, value, start - beginIndex, limit - beginIndex);
}}}}text.setIndex (limit);
}
}
}, "java.text.AttributedCharacterIterator,~N,~N,~A");
Clazz.defineMethod (c$, "addAttribute", 
function (attribute, value) {
if (attribute == null) {
throw  new NullPointerException ();
}var len = this.length ();
if (len == 0) {
throw  new IllegalArgumentException ("Can't add attribute to 0-length text");
}this.addAttributeImpl (attribute, value, 0, len);
}, "java.text.AttributedCharacterIterator.Attribute,~O");
Clazz.defineMethod (c$, "addAttribute", 
function (attribute, value, beginIndex, endIndex) {
if (attribute == null) {
throw  new NullPointerException ();
}if (beginIndex < 0 || endIndex > this.length () || beginIndex >= endIndex) {
throw  new IllegalArgumentException ("Invalid substring range");
}this.addAttributeImpl (attribute, value, beginIndex, endIndex);
}, "java.text.AttributedCharacterIterator.Attribute,~O,~N,~N");
Clazz.defineMethod (c$, "addAttributes", 
function (attributes, beginIndex, endIndex) {
if (attributes == null) {
throw  new NullPointerException ();
}if (beginIndex < 0 || endIndex > this.length () || beginIndex > endIndex) {
throw  new IllegalArgumentException ("Invalid substring range");
}if (beginIndex == endIndex) {
if (attributes.isEmpty ()) return;
throw  new IllegalArgumentException ("Can't add attribute to 0-length text");
}if (this.runCount == 0) {
this.createRunAttributeDataVectors ();
}var beginRunIndex = this.ensureRunBreak (beginIndex);
var endRunIndex = this.ensureRunBreak (endIndex);
var iterator = attributes.entrySet ().iterator ();
while (iterator.hasNext ()) {
var entry = iterator.next ();
this.addAttributeRunData (entry.getKey (), entry.getValue (), beginRunIndex, endRunIndex);
}
}, "java.util.Map,~N,~N");
Clazz.defineMethod (c$, "addAttributeImpl", 
 function (attribute, value, beginIndex, endIndex) {
if (this.runCount == 0) {
this.createRunAttributeDataVectors ();
}var beginRunIndex = this.ensureRunBreak (beginIndex);
var endRunIndex = this.ensureRunBreak (endIndex);
this.addAttributeRunData (attribute, value, beginRunIndex, endRunIndex);
}, "java.text.AttributedCharacterIterator.Attribute,~O,~N,~N");
Clazz.defineMethod (c$, "createRunAttributeDataVectors", 
 function () {
var newRunStarts =  Clazz.newIntArray (10, 0);
var newRunAttributes =  new Array (10);
var newRunAttributeValues =  new Array (10);
this.runStarts = newRunStarts;
this.runAttributes = newRunAttributes;
this.runAttributeValues = newRunAttributeValues;
this.runArraySize = 10;
this.runCount = 1;
});
Clazz.defineMethod (c$, "ensureRunBreak", 
 function (offset) {
return this.ensureRunBreak (offset, true);
}, "~N");
Clazz.defineMethod (c$, "ensureRunBreak", 
 function (offset, copyAttrs) {
if (offset == this.length ()) {
return this.runCount;
}var runIndex = 0;
while (runIndex < this.runCount && this.runStarts[runIndex] < offset) {
runIndex++;
}
if (runIndex < this.runCount && this.runStarts[runIndex] == offset) {
return runIndex;
}if (this.runCount == this.runArraySize) {
var newArraySize = this.runArraySize + 10;
var newRunStarts =  Clazz.newIntArray (newArraySize, 0);
var newRunAttributes =  new Array (newArraySize);
var newRunAttributeValues =  new Array (newArraySize);
for (var i = 0; i < this.runArraySize; i++) {
newRunStarts[i] = this.runStarts[i];
newRunAttributes[i] = this.runAttributes[i];
newRunAttributeValues[i] = this.runAttributeValues[i];
}
this.runStarts = newRunStarts;
this.runAttributes = newRunAttributes;
this.runAttributeValues = newRunAttributeValues;
this.runArraySize = newArraySize;
}var newRunAttributes = null;
var newRunAttributeValues = null;
if (copyAttrs) {
var oldRunAttributes = this.runAttributes[runIndex - 1];
var oldRunAttributeValues = this.runAttributeValues[runIndex - 1];
if (oldRunAttributes != null) {
newRunAttributes = oldRunAttributes.clone ();
}if (oldRunAttributeValues != null) {
newRunAttributeValues = oldRunAttributeValues.clone ();
}}this.runCount++;
for (var i = this.runCount - 1; i > runIndex; i--) {
this.runStarts[i] = this.runStarts[i - 1];
this.runAttributes[i] = this.runAttributes[i - 1];
this.runAttributeValues[i] = this.runAttributeValues[i - 1];
}
this.runStarts[runIndex] = offset;
this.runAttributes[runIndex] = newRunAttributes;
this.runAttributeValues[runIndex] = newRunAttributeValues;
return runIndex;
}, "~N,~B");
Clazz.defineMethod (c$, "addAttributeRunData", 
 function (attribute, value, beginRunIndex, endRunIndex) {
for (var i = beginRunIndex; i < endRunIndex; i++) {
var keyValueIndex = -1;
if (this.runAttributes[i] == null) {
var newRunAttributes =  new java.util.Vector ();
var newRunAttributeValues =  new java.util.Vector ();
this.runAttributes[i] = newRunAttributes;
this.runAttributeValues[i] = newRunAttributeValues;
} else {
keyValueIndex = this.runAttributes[i].indexOf (attribute);
}if (keyValueIndex == -1) {
var oldSize = this.runAttributes[i].size ();
this.runAttributes[i].addElement (attribute);
try {
this.runAttributeValues[i].addElement (value);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.runAttributes[i].setSize (oldSize);
this.runAttributeValues[i].setSize (oldSize);
} else {
throw e;
}
}
} else {
this.runAttributeValues[i].set (keyValueIndex, value);
}}
}, "java.text.AttributedCharacterIterator.Attribute,~O,~N,~N");
Clazz.defineMethod (c$, "getIterator", 
function () {
return this.getIterator (null, 0, this.length ());
});
Clazz.defineMethod (c$, "getIterator", 
function (attributes) {
return this.getIterator (attributes, 0, this.length ());
}, "~A");
Clazz.defineMethod (c$, "getIterator", 
function (attributes, beginIndex, endIndex) {
return Clazz.innerTypeInstance (java.text.AttributedString.AttributedStringIterator, this, null, attributes, beginIndex, endIndex);
}, "~A,~N,~N");
Clazz.defineMethod (c$, "length", 
function () {
return this.text.length;
});
Clazz.defineMethod (c$, "charAt", 
 function (index) {
return this.text.charAt (index);
}, "~N");
Clazz.defineMethod (c$, "getAttribute", 
 function (attribute, runIndex) {
var currentRunAttributes = this.runAttributes[runIndex];
var currentRunAttributeValues = this.runAttributeValues[runIndex];
if (currentRunAttributes == null) {
return null;
}var attributeIndex = currentRunAttributes.indexOf (attribute);
if (attributeIndex != -1) {
return currentRunAttributeValues.elementAt (attributeIndex);
} else {
return null;
}}, "java.text.AttributedCharacterIterator.Attribute,~N");
Clazz.defineMethod (c$, "getAttributeCheckRange", 
 function (attribute, runIndex, beginIndex, endIndex) {
var value = this.getAttribute (attribute, runIndex);
if (Clazz.instanceOf (value, java.text.Annotation)) {
if (beginIndex > 0) {
var currIndex = runIndex;
var runStart = this.runStarts[currIndex];
while (runStart >= beginIndex && java.text.AttributedString.valuesMatch (value, this.getAttribute (attribute, currIndex - 1))) {
currIndex--;
runStart = this.runStarts[currIndex];
}
if (runStart < beginIndex) {
return null;
}}var textLength = this.length ();
if (endIndex < textLength) {
var currIndex = runIndex;
var runLimit = (currIndex < this.runCount - 1) ? this.runStarts[currIndex + 1] : textLength;
while (runLimit <= endIndex && java.text.AttributedString.valuesMatch (value, this.getAttribute (attribute, currIndex + 1))) {
currIndex++;
runLimit = (currIndex < this.runCount - 1) ? this.runStarts[currIndex + 1] : textLength;
}
if (runLimit > endIndex) {
return null;
}}}return value;
}, "java.text.AttributedCharacterIterator.Attribute,~N,~N,~N");
Clazz.defineMethod (c$, "attributeValuesMatch", 
 function (attributes, runIndex1, runIndex2) {
var iterator = attributes.iterator ();
while (iterator.hasNext ()) {
var key = iterator.next ();
if (!java.text.AttributedString.valuesMatch (this.getAttribute (key, runIndex1), this.getAttribute (key, runIndex2))) {
return false;
}}
return true;
}, "java.util.Set,~N,~N");
c$.valuesMatch = Clazz.defineMethod (c$, "valuesMatch", 
 function (value1, value2) {
if (value1 == null) {
return value2 == null;
} else {
return value1.equals (value2);
}}, "~O,~O");
Clazz.defineMethod (c$, "appendContents", 
 function (buf, iterator) {
var index = iterator.getBeginIndex ();
var end = iterator.getEndIndex ();
while (index < end) {
iterator.setIndex (index++);
buf.append (iterator.current ());
}
}, "StringBuffer,java.text.CharacterIterator");
Clazz.defineMethod (c$, "setAttributes", 
 function (attrs, offset) {
if (this.runCount == 0) {
this.createRunAttributeDataVectors ();
}var index = this.ensureRunBreak (offset, false);
var size;
if (attrs != null && (size = attrs.size ()) > 0) {
var runAttrs =  new java.util.Vector (size);
var runValues =  new java.util.Vector (size);
var iterator = attrs.entrySet ().iterator ();
while (iterator.hasNext ()) {
var entry = iterator.next ();
runAttrs.add (entry.getKey ());
runValues.add (entry.getValue ());
}
this.runAttributes[index] = runAttrs;
this.runAttributeValues[index] = runValues;
}}, "java.util.Map,~N");
c$.mapsDiffer = Clazz.defineMethod (c$, "mapsDiffer", 
 function (last, attrs) {
if (last == null) {
return (attrs != null && attrs.size () > 0);
}return (!last.equals (attrs));
}, "java.util.Map,java.util.Map");
c$.$AttributedString$AttributedStringIterator$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.beginIndex = 0;
this.endIndex = 0;
this.currentIndex = 0;
this.currentRunIndex = 0;
this.currentRunStart = 0;
this.currentRunLimit = 0;
Clazz.instantialize (this, arguments);
}, java.text.AttributedString, "AttributedStringIterator", null, java.text.AttributedCharacterIterator);
Clazz.makeConstructor (c$, 
function (a, b, c) {
if (b < 0 || b > c || c > this.b$["java.text.AttributedString"].length ()) {
throw  new IllegalArgumentException ("Invalid substring range");
}this.beginIndex = b;
this.endIndex = c;
this.currentIndex = b;
this.updateRunInfo ();
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "equals", 
function (a) {
if (this === a) {
return true;
}if (!(Clazz.instanceOf (a, java.text.AttributedString.AttributedStringIterator))) {
return false;
}var b = a;
if (this.b$["java.text.AttributedString"] !== b.getString ()) return false;
if (this.currentIndex != b.currentIndex || this.beginIndex != b.beginIndex || this.endIndex != b.endIndex) return false;
return true;
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.b$["java.text.AttributedString"].text.hashCode () ^ this.currentIndex ^ this.beginIndex ^ this.endIndex;
});
Clazz.overrideMethod (c$, "clone", 
function () {
try {
var a = Clazz.superCall (this, java.text.AttributedString.AttributedStringIterator, "clone", []);
return a;
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
throw  new InternalError ();
} else {
throw e;
}
}
});
Clazz.overrideMethod (c$, "first", 
function () {
return this.internalSetIndex (this.beginIndex);
});
Clazz.overrideMethod (c$, "last", 
function () {
if (this.endIndex == this.beginIndex) {
return this.internalSetIndex (this.endIndex);
} else {
return this.internalSetIndex (this.endIndex - 1);
}});
Clazz.overrideMethod (c$, "current", 
function () {
if (this.currentIndex == this.endIndex) {
return '\uffff';
} else {
return this.b$["java.text.AttributedString"].charAt (this.currentIndex);
}});
Clazz.overrideMethod (c$, "next", 
function () {
if (this.currentIndex < this.endIndex) {
return this.internalSetIndex (this.currentIndex + 1);
} else {
return '\uffff';
}});
Clazz.overrideMethod (c$, "previous", 
function () {
if (this.currentIndex > this.beginIndex) {
return this.internalSetIndex (this.currentIndex - 1);
} else {
return '\uffff';
}});
Clazz.overrideMethod (c$, "setIndex", 
function (a) {
if (a < this.beginIndex || a > this.endIndex) throw  new IllegalArgumentException ("Invalid index");
return this.internalSetIndex (a);
}, "~N");
Clazz.overrideMethod (c$, "getBeginIndex", 
function () {
return this.beginIndex;
});
Clazz.overrideMethod (c$, "getEndIndex", 
function () {
return this.endIndex;
});
Clazz.overrideMethod (c$, "getIndex", 
function () {
return this.currentIndex;
});
Clazz.defineMethod (c$, "getRunStart", 
function () {
return this.currentRunStart;
});
Clazz.defineMethod (c$, "getRunStart", 
function (a) {
if (this.currentRunStart == this.beginIndex || this.currentRunIndex == -1) {
return this.currentRunStart;
} else {
var b = this.getAttribute (a);
var c = this.currentRunStart;
var d = this.currentRunIndex;
while (c > this.beginIndex && java.text.AttributedString.valuesMatch (b, this.b$["java.text.AttributedString"].getAttribute (a, d - 1))) {
d--;
c = this.b$["java.text.AttributedString"].runStarts[d];
}
if (c < this.beginIndex) {
c = this.beginIndex;
}return c;
}}, "java.text.AttributedCharacterIterator.Attribute");
Clazz.defineMethod (c$, "getRunStart", 
function (a) {
if (this.currentRunStart == this.beginIndex || this.currentRunIndex == -1) {
return this.currentRunStart;
} else {
var b = this.currentRunStart;
var c = this.currentRunIndex;
while (b > this.beginIndex && this.b$["java.text.AttributedString"].attributeValuesMatch (a, this.currentRunIndex, c - 1)) {
c--;
b = this.b$["java.text.AttributedString"].runStarts[c];
}
if (b < this.beginIndex) {
b = this.beginIndex;
}return b;
}}, "java.util.Set");
Clazz.defineMethod (c$, "getRunLimit", 
function () {
return this.currentRunLimit;
});
Clazz.defineMethod (c$, "getRunLimit", 
function (a) {
if (this.currentRunLimit == this.endIndex || this.currentRunIndex == -1) {
return this.currentRunLimit;
} else {
var b = this.getAttribute (a);
var c = this.currentRunLimit;
var d = this.currentRunIndex;
while (c < this.endIndex && java.text.AttributedString.valuesMatch (b, this.b$["java.text.AttributedString"].getAttribute (a, d + 1))) {
d++;
c = d < this.b$["java.text.AttributedString"].runCount - 1 ? this.b$["java.text.AttributedString"].runStarts[d + 1] : this.endIndex;
}
if (c > this.endIndex) {
c = this.endIndex;
}return c;
}}, "java.text.AttributedCharacterIterator.Attribute");
Clazz.defineMethod (c$, "getRunLimit", 
function (a) {
if (this.currentRunLimit == this.endIndex || this.currentRunIndex == -1) {
return this.currentRunLimit;
} else {
var b = this.currentRunLimit;
var c = this.currentRunIndex;
while (b < this.endIndex && this.b$["java.text.AttributedString"].attributeValuesMatch (a, this.currentRunIndex, c + 1)) {
c++;
b = c < this.b$["java.text.AttributedString"].runCount - 1 ? this.b$["java.text.AttributedString"].runStarts[c + 1] : this.endIndex;
}
if (b > this.endIndex) {
b = this.endIndex;
}return b;
}}, "java.util.Set");
Clazz.overrideMethod (c$, "getAttributes", 
function () {
if (this.b$["java.text.AttributedString"].runAttributes == null || this.currentRunIndex == -1 || this.b$["java.text.AttributedString"].runAttributes[this.currentRunIndex] == null) {
return  new java.util.Hashtable ();
}return Clazz.innerTypeInstance (java.text.AttributedString.AttributeMap, this, null, this.currentRunIndex, this.beginIndex, this.endIndex);
});
Clazz.overrideMethod (c$, "getAllAttributeKeys", 
function () {
if (this.b$["java.text.AttributedString"].runAttributes == null) {
return  new java.util.HashSet ();
}{
var a =  new java.util.HashSet ();
var b = 0;
while (b < this.b$["java.text.AttributedString"].runCount) {
if (this.b$["java.text.AttributedString"].runStarts[b] < this.endIndex && (b == this.b$["java.text.AttributedString"].runCount - 1 || this.b$["java.text.AttributedString"].runStarts[b + 1] > this.beginIndex)) {
var c = this.b$["java.text.AttributedString"].runAttributes[b];
if (c != null) {
var d = c.size ();
while (d-- > 0) {
a.add (c.get (d));
}
}}b++;
}
return a;
}});
Clazz.overrideMethod (c$, "getAttribute", 
function (a) {
var b = this.currentRunIndex;
if (b < 0) {
return null;
}return this.b$["java.text.AttributedString"].getAttributeCheckRange (a, b, this.beginIndex, this.endIndex);
}, "java.text.AttributedCharacterIterator.Attribute");
Clazz.defineMethod (c$, "getString", 
 function () {
return this.b$["java.text.AttributedString"];
});
Clazz.defineMethod (c$, "internalSetIndex", 
 function (a) {
this.currentIndex = a;
if (a < this.currentRunStart || a >= this.currentRunLimit) {
this.updateRunInfo ();
}if (this.currentIndex == this.endIndex) {
return '\uffff';
} else {
return this.b$["java.text.AttributedString"].charAt (a);
}}, "~N");
Clazz.defineMethod (c$, "updateRunInfo", 
 function () {
if (this.currentIndex == this.endIndex) {
this.currentRunStart = this.currentRunLimit = this.endIndex;
this.currentRunIndex = -1;
} else {
{
var a = -1;
while (a < this.b$["java.text.AttributedString"].runCount - 1 && this.b$["java.text.AttributedString"].runStarts[a + 1] <= this.currentIndex) a++;

this.currentRunIndex = a;
if (a >= 0) {
this.currentRunStart = this.b$["java.text.AttributedString"].runStarts[a];
if (this.currentRunStart < this.beginIndex) this.currentRunStart = this.beginIndex;
} else {
this.currentRunStart = this.beginIndex;
}if (a < this.b$["java.text.AttributedString"].runCount - 1) {
this.currentRunLimit = this.b$["java.text.AttributedString"].runStarts[a + 1];
if (this.currentRunLimit > this.endIndex) this.currentRunLimit = this.endIndex;
} else {
this.currentRunLimit = this.endIndex;
}}}});
c$ = Clazz.p0p ();
};
c$.$AttributedString$AttributeMap$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.runIndex = 0;
this.beginIndex = 0;
this.endIndex = 0;
Clazz.instantialize (this, arguments);
}, java.text.AttributedString, "AttributeMap", java.util.AbstractMap);
Clazz.makeConstructor (c$, 
function (a, b, c) {
Clazz.superConstructor (this, java.text.AttributedString.AttributeMap, []);
this.runIndex = a;
this.beginIndex = b;
this.endIndex = c;
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "entrySet", 
function () {
var a =  new java.util.HashSet ();
{
var b = this.b$["java.text.AttributedString"].runAttributes[this.runIndex].size ();
for (var c = 0; c < b; c++) {
var d = this.b$["java.text.AttributedString"].runAttributes[this.runIndex].get (c);
var e = this.b$["java.text.AttributedString"].runAttributeValues[this.runIndex].get (c);
if (Clazz.instanceOf (e, java.text.Annotation)) {
e = this.b$["java.text.AttributedString"].getAttributeCheckRange (d, this.runIndex, this.beginIndex, this.endIndex);
if (e == null) {
continue;
}}var f =  new java.text.AttributeEntry (d, e);
a.add (f);
}
}return a;
});
Clazz.overrideMethod (c$, "get", 
function (a) {
return this.b$["java.text.AttributedString"].getAttributeCheckRange (a, this.runIndex, this.beginIndex, this.endIndex);
}, "~O");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"ARRAY_SIZE_INCREMENT", 10);
c$ = Clazz.decorateAsClass (function () {
this.key = null;
this.value = null;
Clazz.instantialize (this, arguments);
}, java.text, "AttributeEntry", null, java.util.Map.Entry);
Clazz.makeConstructor (c$, 
function (key, value) {
this.key = key;
this.value = value;
}, "java.text.AttributedCharacterIterator.Attribute,~O");
Clazz.overrideMethod (c$, "equals", 
function (o) {
if (!(Clazz.instanceOf (o, java.text.AttributeEntry))) {
return false;
}var other = o;
return other.key.equals (this.key) && (this.value == null ? other.value == null : other.value.equals (this.value));
}, "~O");
Clazz.overrideMethod (c$, "getKey", 
function () {
return this.key;
});
Clazz.overrideMethod (c$, "getValue", 
function () {
return this.value;
});
Clazz.overrideMethod (c$, "setValue", 
function (newValue) {
throw  new UnsupportedOperationException ();
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.key.hashCode () ^ (this.value == null ? 0 : this.value.hashCode ());
});
Clazz.defineMethod (c$, "toString", 
function () {
return this.key.toString () + "=" + this.value.toString ();
});
});
