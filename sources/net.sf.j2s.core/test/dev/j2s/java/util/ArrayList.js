Clazz.load (["java.util.AbstractList", "$.List", "$.RandomAccess"], "java.util.ArrayList", ["java.lang.IllegalArgumentException", "$.IndexOutOfBoundsException", "java.util.Arrays"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "ArrayList", java.util.AbstractList, [java.util.List, Cloneable, java.io.Serializable, java.util.RandomAccess]);

Clazz.newMethod$(C$, '$init$', function () {
this.firstIndex = 0;
this.lastIndex = 0;
this.array = null;
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
C$.construct$I.apply(this, [0]);
}, 1);

Clazz.newMethod$(C$, 'construct$I', function (capacity) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.firstIndex = this.lastIndex = 0;
try {
this.array = C$.prototype.newElementArray$I.apply(this, [capacity]);
} catch (e) {
if (Clazz.exceptionOf(e, NegativeArraySizeException)){
throw Clazz.$new(IllegalArgumentException.construct,[]);
} else {
throw e;
}
}
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_Collection', function (collection) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
var size = collection.size ();
this.firstIndex = this.lastIndex = 0;
this.array = C$.prototype.newElementArray$I.apply(this, [size + (Clazz.doubleToInt (size / 10))]);
this.addAll$java_util_Collection (collection);
}, 1);

Clazz.newMethod$(C$, 'newElementArray$I', function (size) {
return  Clazz.newArray$(java.lang.Object, [size]);
});

Clazz.newMethod$(C$, 'add$I$TE', function (location, object) {
var size = this.size ();
if (0 < location && location < size) {
if (this.firstIndex == 0 && this.lastIndex == this.array.length) {
C$.prototype.growForInsert$I$I.apply(this, [location, 1]);
} else if ((location < Clazz.doubleToInt (size / 2) && this.firstIndex > 0) || this.lastIndex == this.array.length) {
System.arraycopy$O$I$O$I$I (this.array, this.firstIndex, this.array, --this.firstIndex, location);
} else {
var index = location + this.firstIndex;
System.arraycopy$O$I$O$I$I (this.array, index, this.array, index + 1, size - location);
this.lastIndex++;
}this.array[location + this.firstIndex] = object;
} else if (location == 0) {
if (this.firstIndex == 0) {
C$.prototype.growAtFront$I.apply(this, [1]);
}this.array[--this.firstIndex] = object;
} else if (location == size) {
if (this.lastIndex == this.array.length) {
C$.prototype.growAtEnd$I.apply(this, [1]);
}this.array[this.lastIndex++] = object;
} else {
throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
}this.modCount++;
});

Clazz.newMethod$(C$, 'add$TE', function (object) {
if (this.lastIndex == this.array.length) {
C$.prototype.growAtEnd$I.apply(this, [1]);
}this.array[this.lastIndex++] = object;
this.modCount++;
return true;
});

Clazz.newMethod$(C$, 'addAll$I$java_util_Collection', function (location, collection) {
var size = this.size ();
if (location < 0 || location > size) {
throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
}var growSize = collection.size ();
if (0 < location && location < size) {
if (this.array.length - size < growSize) {
C$.prototype.growForInsert$I$I.apply(this, [location, growSize]);
} else if ((location < Clazz.doubleToInt (size / 2) && this.firstIndex > 0) || this.lastIndex > this.array.length - growSize) {
var newFirst = this.firstIndex - growSize;
if (newFirst < 0) {
var index = location + this.firstIndex;
System.arraycopy$O$I$O$I$I (this.array, index, this.array, index - newFirst, size - location);
this.lastIndex -= newFirst;
newFirst = 0;
}System.arraycopy$O$I$O$I$I (this.array, this.firstIndex, this.array, newFirst, location);
this.firstIndex = newFirst;
} else {
var index = location + this.firstIndex;
System.arraycopy$O$I$O$I$I (this.array, index, this.array, index + growSize, size - location);
this.lastIndex += growSize;
}} else if (location == 0) {
C$.prototype.growAtFront$I.apply(this, [growSize]);
this.firstIndex -= growSize;
} else if (location == size) {
if (this.lastIndex > this.array.length - growSize) {
C$.prototype.growAtEnd$I.apply(this, [growSize]);
}this.lastIndex += growSize;
}if (growSize > 0) {
var it = collection.iterator ();
var index = location + this.firstIndex;
var end = index + growSize;
while (index < end) {
this.array[index++] = it.next ();
}
this.modCount++;
return true;
}return false;
});

Clazz.newMethod$(C$, 'addAll$java_util_Collection', function (collection) {
var growSize = collection.size ();
if (growSize > 0) {
if (this.lastIndex > this.array.length - growSize) {
C$.prototype.growAtEnd$I.apply(this, [growSize]);
}var it = collection.iterator ();
var end = this.lastIndex + growSize;
while (this.lastIndex < end) {
this.array[this.lastIndex++] = it.next ();
}
this.modCount++;
return true;
}return false;
});

Clazz.newMethod$(C$, 'clear', function () {
if (this.firstIndex != this.lastIndex) {
java.util.Arrays.fill$OA$I$I$O (this.array, this.firstIndex, this.lastIndex, null);
this.firstIndex = this.lastIndex = 0;
this.modCount++;
}});

Clazz.newMethod$(C$, 'clone', function () {
try {
var newList = C$.superClazz.prototype.clone.apply(this, arguments);
newList.array = this.array.clone ();
return newList;
} catch (e) {
if (Clazz.exceptionOf(e, CloneNotSupportedException)){
return null;
} else {
throw e;
}
}
});

Clazz.newMethod$(C$, 'contains$O', function (object) {
if (object != null) {
for (var i = this.firstIndex; i < this.lastIndex; i++) {
if (object.equals$O (this.array[i])) {
return true;
}}
} else {
for (var i = this.firstIndex; i < this.lastIndex; i++) {
if (this.array[i] == null) {
return true;
}}
}return false;
});

Clazz.newMethod$(C$, 'ensureCapacity$I', function (minimumCapacity) {
if (this.array.length < minimumCapacity) {
if (this.firstIndex > 0) {
C$.prototype.growAtFront$I.apply(this, [minimumCapacity - this.array.length]);
} else {
C$.prototype.growAtEnd$I.apply(this, [minimumCapacity - this.array.length]);
}}});

Clazz.newMethod$(C$, 'get$I', function (location) {
if (0 <= location && location < this.size ()) {
return this.array[this.firstIndex + location];
}throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
});

Clazz.newMethod$(C$, 'growAtEnd$I', function (required) {
var size = this.size ();
if (this.firstIndex >= required - (this.array.length - this.lastIndex)) {
var newLast = this.lastIndex - this.firstIndex;
if (size > 0) {
System.arraycopy$O$I$O$I$I (this.array, this.firstIndex, this.array, 0, size);
var start = newLast < this.firstIndex ? this.firstIndex : newLast;
java.util.Arrays.fill$OA$I$I$O (this.array, start, this.array.length, null);
}this.firstIndex = 0;
this.lastIndex = newLast;
} else {
var increment = Clazz.doubleToInt (size / 2);
if (required > increment) {
increment = required;
}if (increment < 12) {
increment = 12;
}var newArray = C$.prototype.newElementArray$I.apply(this, [size + increment]);
if (size > 0) {
System.arraycopy$O$I$O$I$I (this.array, this.firstIndex, newArray, this.firstIndex, size);
}this.array = newArray;
}});

Clazz.newMethod$(C$, 'growAtFront$I', function (required) {
var size = this.size ();
if (this.array.length - this.lastIndex >= required) {
var newFirst = this.array.length - size;
if (size > 0) {
System.arraycopy$O$I$O$I$I (this.array, this.firstIndex, this.array, newFirst, size);
var length = this.firstIndex + size > newFirst ? newFirst : this.firstIndex + size;
java.util.Arrays.fill$OA$I$I$O (this.array, this.firstIndex, length, null);
}this.firstIndex = newFirst;
this.lastIndex = this.array.length;
} else {
var increment = Clazz.doubleToInt (size / 2);
if (required > increment) {
increment = required;
}if (increment < 12) {
increment = 12;
}var newArray = C$.prototype.newElementArray$I.apply(this, [size + increment]);
if (size > 0) {
System.arraycopy$O$I$O$I$I (this.array, this.firstIndex, newArray, newArray.length - size, size);
}this.firstIndex = newArray.length - size;
this.lastIndex = newArray.length;
this.array = newArray;
}});

Clazz.newMethod$(C$, 'growForInsert$I$I', function (location, required) {
var size = this.size ();
var increment = Clazz.doubleToInt (size / 2);
if (required > increment) {
increment = required;
}if (increment < 12) {
increment = 12;
}var newArray = C$.prototype.newElementArray$I.apply(this, [size + increment]);
if (location < Clazz.doubleToInt (size / 2)) {
var newFirst = newArray.length - (size + required);
System.arraycopy$O$I$O$I$I (this.array, location, newArray, location + increment, size - location);
System.arraycopy$O$I$O$I$I (this.array, this.firstIndex, newArray, newFirst, location);
this.firstIndex = newFirst;
this.lastIndex = newArray.length;
} else {
System.arraycopy$O$I$O$I$I (this.array, this.firstIndex, newArray, 0, location);
System.arraycopy$O$I$O$I$I (this.array, location, newArray, location + required, size - location);
this.firstIndex = 0;
this.lastIndex += required;
}this.array = newArray;
});

Clazz.newMethod$(C$, 'indexOf$O', function (object) {
if (object != null) {
for (var i = this.firstIndex; i < this.lastIndex; i++) {
if (object.equals$O (this.array[i])) {
return i - this.firstIndex;
}}
} else {
for (var i = this.firstIndex; i < this.lastIndex; i++) {
if (this.array[i] == null) {
return i - this.firstIndex;
}}
}return -1;
});

Clazz.newMethod$(C$, 'isEmpty', function () {
return this.lastIndex == this.firstIndex;
});

Clazz.newMethod$(C$, 'lastIndexOf$O', function (object) {
if (object != null) {
for (var i = this.lastIndex - 1; i >= this.firstIndex; i--) {
if (object.equals$O (this.array[i])) {
return i - this.firstIndex;
}}
} else {
for (var i = this.lastIndex - 1; i >= this.firstIndex; i--) {
if (this.array[i] == null) {
return i - this.firstIndex;
}}
}return -1;
});

Clazz.newMethod$(C$, 'remove$I', function (location) {
var result;
var size = this.size ();
if (0 <= location && location < size) {
if (location == size - 1) {
result = this.array[--this.lastIndex];
this.array[this.lastIndex] = null;
} else if (location == 0) {
result = this.array[this.firstIndex];
this.array[this.firstIndex++] = null;
} else {
var elementIndex = this.firstIndex + location;
result = this.array[elementIndex];
if (location < Clazz.doubleToInt (size / 2)) {
System.arraycopy$O$I$O$I$I (this.array, this.firstIndex, this.array, this.firstIndex + 1, location);
this.array[this.firstIndex++] = null;
} else {
System.arraycopy$O$I$O$I$I (this.array, elementIndex + 1, this.array, elementIndex, size - location - 1);
this.array[--this.lastIndex] = null;
}}} else {
throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
}this.modCount++;
return result;
});

Clazz.newMethod$(C$, 'removeRange$I$I', function (start, end) {
if (start >= 0 && start <= end && end <= this.size ()) {
if (start == end) {
return;
}var size = this.size ();
if (end == size) {
java.util.Arrays.fill$OA$I$I$O (this.array, this.firstIndex + start, this.lastIndex, null);
this.lastIndex = this.firstIndex + start;
} else if (start == 0) {
java.util.Arrays.fill$OA$I$I$O (this.array, this.firstIndex, this.firstIndex + end, null);
this.firstIndex += end;
} else {
System.arraycopy$O$I$O$I$I (this.array, this.firstIndex + end, this.array, this.firstIndex + start, size - end);
var newLast = this.lastIndex + start - end;
java.util.Arrays.fill$OA$I$I$O (this.array, newLast, this.lastIndex, null);
this.lastIndex = newLast;
}this.modCount++;
} else {
throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
}});

Clazz.newMethod$(C$, 'set$I$TE', function (location, object) {
if (0 <= location && location < this.size ()) {
var result = this.array[this.firstIndex + location];
this.array[this.firstIndex + location] = object;
return result;
}throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
});

Clazz.newMethod$(C$, 'size', function () {
return this.lastIndex - this.firstIndex;
});

Clazz.newMethod$(C$, 'toArray', function () {
var size = this.size ();
var result =  Clazz.newArray$(java.lang.Object, [size]);
System.arraycopy$O$I$O$I$I (this.array, this.firstIndex, result, 0, size);
return result;
});

Clazz.newMethod$(C$, 'toArray$TTA', function (contents) {
var size = this.size ();
if (size > contents.length) {
var ct = contents.getClass ().getComponentType ();
contents = Clazz.newArray$ (ct, size);
}System.arraycopy$O$I$O$I$I (this.array, this.firstIndex, contents, 0, size);
if (size < contents.length) {
contents[size] = null;
}return contents;
});

Clazz.newMethod$(C$, 'trimToSize', function () {
var size = this.size ();
var newArray = C$.prototype.newElementArray$I.apply(this, [size]);
System.arraycopy$O$I$O$I$I (this.array, this.firstIndex, newArray, 0, size);
this.array = newArray;
this.firstIndex = 0;
this.lastIndex = this.array.length;
});

Clazz.newMethod$(C$, 'writeObject$java_io_ObjectOutputStream', function (stream) {
var fields = stream.putFields ();
fields.put$S$I ("size", this.size ());
stream.writeFields ();
stream.writeInt$I (this.array.length);
var it = this.iterator ();
while (it.hasNext ()) {
stream.writeObject$O (it.next ());
}
});

Clazz.newMethod$(C$, 'readObject$java_io_ObjectInputStream', function (stream) {
var fields = stream.readFields ();
this.lastIndex = fields.get$S$I ("size", 0);
this.array = C$.prototype.newElementArray$I.apply(this, [stream.readInt ()]);
for (var i = 0; i < this.lastIndex; i++) {
this.array[i] = stream.readObject ();
}
});
})()
});

//Created 2017-08-18 22:18:02
