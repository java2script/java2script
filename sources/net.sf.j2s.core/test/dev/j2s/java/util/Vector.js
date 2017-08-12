Clazz.load (["java.util.AbstractList", "$.List", "$.RandomAccess"], "java.util.Vector", ["java.lang.ArrayIndexOutOfBoundsException", "$.IllegalArgumentException", "$.IndexOutOfBoundsException", "$.StringBuffer", "java.lang.reflect.Array", "java.util.Arrays", "$.Collections", "$.Enumeration", "$.NoSuchElementException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "Vector", java.util.AbstractList, [java.util.List, java.util.RandomAccess, Cloneable, java.io.Serializable]);

Clazz.newMethod$(C$, '$init$', function () {
this.elementCount = 0;
this.elementData = null;
this.capacityIncrement = 0;
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
C$.construct$I$I.apply(this, [10, 0]);
}, 1);

Clazz.newMethod$ (C$, 'construct$I', function (capacity) {
C$.construct$I$I.apply(this, [capacity, 0]);
}, 1);

Clazz.newMethod$ (C$, 'construct$I$I', function (capacity, capacityIncrement) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.elementCount = 0;
try {
this.elementData = C$.prototype.newElementArray$I.apply(this, [capacity]);
} catch (e) {
if (Clazz.exceptionOf (e, NegativeArraySizeException)) {
throw Clazz.$new(IllegalArgumentException.construct);
} else {
throw e;
}
}
this.capacityIncrement = capacityIncrement;
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_Collection', function (collection) {
C$.construct$I$I.apply(this, [collection.size (), 0]);
var it = collection.iterator ();
while (it.hasNext ()) {
this.elementData[this.elementCount++] = it.next ();
}
}, 1);

Clazz.newMethod$ (C$, 'newElementArray$I', function (size) {
return  Clazz.newArray$('OA', Clazz.newA$, [size]);
});

Clazz.newMethod$ (C$, 'add$I$TE', function (location, object) {
this.insertElementAt$TE$I (object, location);
});

Clazz.newMethod$ (C$, 'add$TE', function (object) {
this.addElement$TE (object);
return true;
});

Clazz.newMethod$ (C$, 'addAll$I$java_util_Collection', function (location, collection) {
if (0 <= location && location <= this.elementCount) {
var size = collection.size ();
if (size == 0) {
return false;
}var required = size - (this.elementData.length - this.elementCount);
if (required > 0) {
C$.prototype.growBy$I.apply(this, [required]);
}var count = this.elementCount - location;
if (count > 0) {
System.arraycopy (this.elementData, location, this.elementData, location + size, count);
}var it = collection.iterator ();
while (it.hasNext ()) {
this.elementData[location++] = it.next ();
}
this.elementCount += size;
this.modCount++;
return true;
}throw Clazz.$new(ArrayIndexOutOfBoundsException.construct$I,[location]);
});

Clazz.newMethod$ (C$, 'addAll$java_util_Collection', function (collection) {
return this.addAll$I$java_util_Collection (this.elementCount, collection);
});

Clazz.newMethod$ (C$, 'addElement$TE', function (object) {
if (this.elementCount == this.elementData.length) {
C$.prototype.growByOne.apply(this, []);
}this.elementData[this.elementCount++] = object;
this.modCount++;
});

Clazz.newMethod$ (C$, 'capacity', function () {
return this.elementData.length;
});

Clazz.newMethod$ (C$, 'clear', function () {
this.removeAllElements ();
});

Clazz.newMethod$ (C$, 'clone', function () {
try {
var vector = C$.superClazz.prototype.clone.apply(this, arguments);
vector.elementData = this.elementData.clone ();
return vector;
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
return null;
} else {
throw e;
}
}
});

Clazz.newMethod$ (C$, 'contains$O', function (object) {
return this.indexOf$O$I (object, 0) != -1;
});

Clazz.newMethod$ (C$, 'containsAll$java_util_Collection', function (collection) {
return C$.superClazz.prototype.containsAll$java_util_Collection.apply(this, arguments);
});

Clazz.newMethod$ (C$, 'copyInto$OA', function (elements) {
System.arraycopy (this.elementData, 0, elements, 0, this.elementCount);
});

Clazz.newMethod$ (C$, 'elementAt$I', function (location) {
if (location < this.elementCount) {
return this.elementData[location];
}throw Clazz.$new(ArrayIndexOutOfBoundsException.construct$I,[location]);
});

Clazz.newMethod$ (C$, 'elements', function () {
return ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "Vector$1", null, java.util.Enumeration);

Clazz.newMethod$(C$, '$init$', function () {
this.pos = 0;
}, 1);

Clazz.newMethod$ (C$, 'hasMoreElements', function () {
return this.pos < this.b$["java.util.Vector"].elementCount;
});

Clazz.newMethod$ (C$, 'nextElement', function () {
{
if (this.pos < this.b$["java.util.Vector"].elementCount) {
return this.b$["java.util.Vector"].elementData[this.pos++];
}}throw Clazz.$new(java.util.NoSuchElementException.construct);
});
})()
), Clazz.$new(java.util.Vector$1.$init$, [this, null]));
});

Clazz.newMethod$ (C$, 'ensureCapacity$I', function (minimumCapacity) {
if (this.elementData.length < minimumCapacity) {
var next = (this.capacityIncrement <= 0 ? this.elementData.length : this.capacityIncrement) + this.elementData.length;
C$.prototype.grow$I.apply(this, [minimumCapacity > next ? minimumCapacity : next]);
}});

Clazz.newMethod$ (C$, 'equals$O', function (object) {
if (this === object) {
return true;
}if (Clazz.instanceOf(object, java.util.List)) {
var list = object;
if (list.size () != this.size ()) {
return false;
}var index = 0;
var it = list.iterator ();
while (it.hasNext ()) {
var e1 = this.elementData[index++];
var e2 = it.next ();
if (!(e1 == null ? e2 == null : e1.equals$O (e2))) {
return false;
}}
return true;
}return false;
});

Clazz.newMethod$ (C$, 'firstElement', function () {
if (this.elementCount > 0) {
return this.elementData[0];
}throw Clazz.$new(java.util.NoSuchElementException.construct);
});

Clazz.newMethod$ (C$, 'get$I', function (location) {
return this.elementAt$I (location);
});

Clazz.newMethod$ (C$, 'grow$I', function (newCapacity) {
var newData = C$.prototype.newElementArray$I.apply(this, [newCapacity]);
System.arraycopy (this.elementData, 0, newData, 0, this.elementCount);
this.elementData = newData;
});

Clazz.newMethod$ (C$, 'growByOne', function () {
var adding = 0;
if (this.capacityIncrement <= 0) {
if ((adding = this.elementData.length) == 0) {
adding = 1;
}} else {
adding = this.capacityIncrement;
}var newData = C$.prototype.newElementArray$I.apply(this, [this.elementData.length + adding]);
System.arraycopy (this.elementData, 0, newData, 0, this.elementCount);
this.elementData = newData;
});

Clazz.newMethod$ (C$, 'growBy$I', function (required) {
var adding = 0;
if (this.capacityIncrement <= 0) {
if ((adding = this.elementData.length) == 0) {
adding = required;
}while (adding < required) {
adding += adding;
}
} else {
adding = (Clazz.doubleToInt (required / this.capacityIncrement)) * this.capacityIncrement;
if (adding < required) {
adding += this.capacityIncrement;
}}var newData = C$.prototype.newElementArray$I.apply(this, [this.elementData.length + adding]);
System.arraycopy (this.elementData, 0, newData, 0, this.elementCount);
this.elementData = newData;
});

Clazz.newMethod$ (C$, 'hashCode', function () {
var result = 1;
for (var i = 0; i < this.elementCount; i++) {
result = (31 * result) + (this.elementData[i] == null ? 0 : this.elementData[i].hashCode ());
}
return result;
});

Clazz.newMethod$ (C$, 'indexOf$O', function (object) {
return this.indexOf$O$I (object, 0);
});

Clazz.newMethod$ (C$, 'indexOf$O$I', function (object, location) {
if (object != null) {
for (var i = location; i < this.elementCount; i++) {
if (object.equals$O (this.elementData[i])) {
return i;
}}
} else {
for (var i = location; i < this.elementCount; i++) {
if (this.elementData[i] == null) {
return i;
}}
}return -1;
});

Clazz.newMethod$ (C$, 'insertElementAt$TE$I', function (object, location) {
if (0 <= location && location <= this.elementCount) {
if (this.elementCount == this.elementData.length) {
C$.prototype.growByOne.apply(this, []);
}var count = this.elementCount - location;
if (count > 0) {
System.arraycopy (this.elementData, location, this.elementData, location + 1, count);
}this.elementData[location] = object;
this.elementCount++;
this.modCount++;
} else {
throw Clazz.$new(ArrayIndexOutOfBoundsException.construct$I,[location]);
}});

Clazz.newMethod$ (C$, 'isEmpty', function () {
return this.elementCount == 0;
});

Clazz.newMethod$ (C$, 'lastElement', function () {
try {
return this.elementData[this.elementCount - 1];
} catch (e) {
if (Clazz.exceptionOf (e, IndexOutOfBoundsException)) {
throw Clazz.$new(java.util.NoSuchElementException.construct);
} else {
throw e;
}
}
});

Clazz.newMethod$ (C$, 'lastIndexOf$O', function (object) {
return this.lastIndexOf$O$I (object, this.elementCount - 1);
});

Clazz.newMethod$ (C$, 'lastIndexOf$O$I', function (object, location) {
if (location < this.elementCount) {
if (object != null) {
for (var i = location; i >= 0; i--) {
if (object.equals$O (this.elementData[i])) {
return i;
}}
} else {
for (var i = location; i >= 0; i--) {
if (this.elementData[i] == null) {
return i;
}}
}return -1;
}throw Clazz.$new(ArrayIndexOutOfBoundsException.construct$I,[location]);
});

Clazz.newMethod$ (C$, 'remove$I', function (location) {
if (location < this.elementCount) {
var result = this.elementData[location];
this.elementCount--;
var size = this.elementCount - location;
if (size > 0) {
System.arraycopy (this.elementData, location + 1, this.elementData, location, size);
}this.elementData[this.elementCount] = null;
this.modCount++;
return result;
}throw Clazz.$new(ArrayIndexOutOfBoundsException.construct$I,[location]);
});

Clazz.newMethod$ (C$, 'remove$O', function (object) {
return this.removeElement$O (object);
});

Clazz.newMethod$ (C$, 'removeAll$java_util_Collection', function (collection) {
return C$.superClazz.prototype.removeAll$java_util_Collection.apply(this, arguments);
});

Clazz.newMethod$ (C$, 'removeAllElements', function () {
java.util.Arrays.fill$OA$I$I$O (this.elementData, 0, this.elementCount, null);
this.modCount++;
this.elementCount = 0;
});

Clazz.newMethod$ (C$, 'removeElement$O', function (object) {
var index;
if ((index = this.indexOf$O$I (object, 0)) == -1) {
return false;
}this.removeElementAt$I (index);
return true;
});

Clazz.newMethod$ (C$, 'removeElementAt$I', function (location) {
if (0 <= location && location < this.elementCount) {
this.elementCount--;
var size = this.elementCount - location;
if (size > 0) {
System.arraycopy (this.elementData, location + 1, this.elementData, location, size);
}this.elementData[this.elementCount] = null;
this.modCount++;
} else {
throw Clazz.$new(ArrayIndexOutOfBoundsException.construct$I,[location]);
}});

Clazz.newMethod$ (C$, 'removeRange$I$I', function (start, end) {
if (start >= 0 && start <= end && end <= this.size ()) {
if (start == end) {
return;
}if (end != this.elementCount) {
System.arraycopy (this.elementData, end, this.elementData, start, this.elementCount - end);
var newCount = this.elementCount - (end - start);
java.util.Arrays.fill$OA$I$I$O (this.elementData, newCount, this.elementCount, null);
this.elementCount = newCount;
} else {
java.util.Arrays.fill$OA$I$I$O (this.elementData, start, this.elementCount, null);
this.elementCount = start;
}this.modCount++;
} else {
throw Clazz.$new(IndexOutOfBoundsException.construct);
}});

Clazz.newMethod$ (C$, 'retainAll$java_util_Collection', function (collection) {
return C$.superClazz.prototype.retainAll$java_util_Collection.apply(this, arguments);
});

Clazz.newMethod$ (C$, 'set$I$TE', function (location, object) {
if (location < this.elementCount) {
var result = this.elementData[location];
this.elementData[location] = object;
return result;
}throw Clazz.$new(ArrayIndexOutOfBoundsException.construct$I,[location]);
});

Clazz.newMethod$ (C$, 'setElementAt$TE$I', function (object, location) {
if (location < this.elementCount) {
this.elementData[location] = object;
} else {
throw Clazz.$new(ArrayIndexOutOfBoundsException.construct$I,[location]);
}});

Clazz.newMethod$ (C$, 'setSize$I', function (length) {
if (length == this.elementCount) {
return;
}this.ensureCapacity$I (length);
if (this.elementCount > length) {
java.util.Arrays.fill$OA$I$I$O (this.elementData, length, this.elementCount, null);
}this.elementCount = length;
this.modCount++;
});

Clazz.newMethod$ (C$, 'size', function () {
return this.elementCount;
});

Clazz.newMethod$ (C$, 'subList$I$I', function (start, end) {
return Clazz.$new(java.util.Collections.SynchronizedRandomAccessList.construct$java_util_List$O,[C$.superClazz.prototype.subList$I$I.apply(this, arguments), this]);
});

Clazz.newMethod$ (C$, 'toArray', function () {
var result =  Clazz.newArray$('OA', Clazz.newA$, [this.elementCount]);
System.arraycopy (this.elementData, 0, result, 0, this.elementCount);
return result;
});

Clazz.newMethod$ (C$, 'toArray$TTA', function (contents) {
if (this.elementCount > contents.length) {
var ct = contents.getClass ().getComponentType ();
contents = java.lang.reflect.Array.newInstance (ct, this.elementCount);
}System.arraycopy (this.elementData, 0, contents, 0, this.elementCount);
if (this.elementCount < contents.length) {
contents[this.elementCount] = null;
}return contents;
});

Clazz.newMethod$ (C$, 'toString', function () {
if (this.elementCount == 0) {
return "[]";
}var length = this.elementCount - 1;
var buffer = Clazz.$new(StringBuffer.construct$I,[this.size () * 16]);
buffer.append$C ('[');
for (var i = 0; i < length; i++) {
if (this.elementData[i] === this) {
buffer.append$S ("(this Collection)");
} else {
buffer.append$O (this.elementData[i]);
}buffer.append$S (", ");
}
if (this.elementData[length] === this) {
buffer.append$S ("(this Collection)");
} else {
buffer.append$O (this.elementData[length]);
}buffer.append$C (']');
return buffer.toString ();
});

Clazz.newMethod$ (C$, 'trimToSize', function () {
if (this.elementData.length != this.elementCount) {
C$.prototype.grow$I.apply(this, [this.elementCount]);
}});

Clazz.newMethod$ (C$, 'writeObject$java_io_ObjectOutputStream', function (stream) {
stream.defaultWriteObject ();
});
Clazz.defineStatics (C$,
"DEFAULT_SIZE", 10);
})()
});

//Created 2017-08-12 07:32:21
