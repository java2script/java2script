Clazz.load (["java.util.AbstractList", "$.AbstractMap", "$.AbstractSet", "$.Collection", "$.Iterator", "$.List", "$.ListIterator", "$.Map", "$.RandomAccess", "$.Set", "$.SortedMap", "$.SortedSet", "java.lang.NullPointerException", "$.UnsupportedOperationException"], "java.util.Collections", ["java.lang.ArrayIndexOutOfBoundsException", "$.ClassCastException", "$.IllegalArgumentException", "$.IndexOutOfBoundsException", "java.util.ArrayList", "$.Arrays", "$.Enumeration", "java.util.Map.Entry", "java.util.NoSuchElementException", "$.Random"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "Collections");

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'binarySearch$java_util_List$TT', function (list, object) {
if (list == null) {
throw Clazz.$new(NullPointerException.construct,[]);
}if (list.isEmpty ()) {
return -1;
}var key = object;
if (!(Clazz.instanceOf(list, java.util.RandomAccess))) {
var it = list.listIterator ();
while (it.hasNext ()) {
var result;
if ((result = key.compareTo$TT (it.next ())) <= 0) {
if (result == 0) {
return it.previousIndex ();
}return -it.previousIndex () - 1;
}}
return -list.size () - 1;
}var low = 0;
var mid = list.size ();
var high = mid - 1;
var result = -1;
while (low <= high) {
mid = (low + high) >> 1;
if ((result = key.compareTo$TT (list.get$I (mid))) > 0) {
low = mid + 1;
} else if (result == 0) {
return mid;
} else {
high = mid - 1;
}}
return -mid - (result < 0 ? 1 : 2);
}, 1);

Clazz.newMethod$(C$, 'binarySearch$java_util_List$TT$java_util_Comparator', function (list, object, comparator) {
if (comparator == null) {
return java.util.Collections.binarySearch$java_util_List$TT (list, object);
}if (!(Clazz.instanceOf(list, java.util.RandomAccess))) {
var it = list.listIterator ();
while (it.hasNext ()) {
var result;
if ((result = comparator.compare$$ (object, it.next ())) <= 0) {
if (result == 0) {
return it.previousIndex ();
}return -it.previousIndex () - 1;
}}
return -list.size () - 1;
}var low = 0;
var mid = list.size ();
var high = mid - 1;
var result = -1;
while (low <= high) {
mid = (low + high) >> 1;
if ((result = comparator.compare$$ (object, list.get$I (mid))) > 0) {
low = mid + 1;
} else if (result == 0) {
return mid;
} else {
high = mid - 1;
}}
return -mid - (result < 0 ? 1 : 2);
}, 1);

Clazz.newMethod$(C$, 'copy$java_util_List$java_util_List', function (destination, source) {
if (destination.size () < source.size ()) {
throw Clazz.$new(ArrayIndexOutOfBoundsException.construct,[]);
}var srcIt = source.iterator ();
var destIt = destination.listIterator ();
while (srcIt.hasNext ()) {
try {
destIt.next ();
} catch (e) {
if (Clazz.exceptionOf(e, java.util.NoSuchElementException)){
throw Clazz.$new(ArrayIndexOutOfBoundsException.construct,[]);
} else {
throw e;
}
}
destIt.set$ (srcIt.next ());
}
}, 1);

Clazz.newMethod$(C$, 'enumeration$java_util_Collection', function (collection) {
var c = collection;
return ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "Collections$1", null, java.util.Enumeration);

Clazz.newMethod$(C$, '$init$', function () {
this.it = this.f$.c.iterator ();
}, 1);

Clazz.newMethod$(C$, 'hasMoreElements', function () {
return this.it.hasNext ();
});

Clazz.newMethod$(C$, 'nextElement', function () {
return this.it.next ();
});
})()
), Clazz.$new(java.util.Collections$1.$init$, [this, {c: c}]));
}, 1);

Clazz.newMethod$(C$, 'fill$java_util_List$TT', function (list, object) {
var it = list.listIterator ();
while (it.hasNext ()) {
it.next ();
it.set$ (object);
}
}, 1);

Clazz.newMethod$(C$, 'max$java_util_Collection', function (collection) {
var it = collection.iterator ();
var max = it.next ();
while (it.hasNext ()) {
var next = it.next ();
if (max.compareTo$ (next) < 0) {
max = next;
}}
return max;
}, 1);

Clazz.newMethod$(C$, 'max$java_util_Collection$java_util_Comparator', function (collection, comparator) {
var it = collection.iterator ();
var max = it.next ();
while (it.hasNext ()) {
var next = it.next ();
if (comparator.compare$$ (max, next) < 0) {
max = next;
}}
return max;
}, 1);

Clazz.newMethod$(C$, 'min$java_util_Collection', function (collection) {
var it = collection.iterator ();
var min = it.next ();
while (it.hasNext ()) {
var next = it.next ();
if (min.compareTo$ (next) > 0) {
min = next;
}}
return min;
}, 1);

Clazz.newMethod$(C$, 'min$java_util_Collection$java_util_Comparator', function (collection, comparator) {
var it = collection.iterator ();
var min = it.next ();
while (it.hasNext ()) {
var next = it.next ();
if (comparator.compare$$ (min, next) > 0) {
min = next;
}}
return min;
}, 1);

Clazz.newMethod$(C$, 'nCopies$I$TT', function (length, object) {
return Clazz.$new(java.util.Collections.CopiesList.construct$I$TT,[length, object]);
}, 1);

Clazz.newMethod$(C$, 'reverse$java_util_List', function (list) {
var size = list.size ();
var front = list.listIterator ();
var back = list.listIterator$I (size);
for (var i = 0; i < Clazz.doubleToInt (size / 2); i++) {
var frontNext = front.next ();
var backPrev = back.previous ();
front.set$O (backPrev);
back.set$O (frontNext);
}
}, 1);

Clazz.newMethod$(C$, 'reverseOrder', function () {
return Clazz.$new(java.util.Collections.ReverseComparator.construct,[]);
}, 1);

Clazz.newMethod$(C$, 'reverseOrder$java_util_Comparator', function (c) {
if (c == null) {
return java.util.Collections.reverseOrder ();
}return Clazz.$new(java.util.Collections.ReverseComparatorWithComparator.construct$java_util_Comparator,[c]);
}, 1);

Clazz.newMethod$(C$, 'shuffle$java_util_List', function (list) {
java.util.Collections.shuffle$java_util_List$java_util_Random (list, Clazz.$new(java.util.Random.construct,[]));
}, 1);

Clazz.newMethod$(C$, 'shuffle$java_util_List$java_util_Random', function (list, random) {
if (!(Clazz.instanceOf(list, java.util.RandomAccess))) {
var array = list.toArray ();
for (var i = array.length - 1; i > 0; i--) {
var index = random.nextInt () % (i + 1);
if (index < 0) {
index = -index;
}var temp = array[i];
array[i] = array[index];
array[index] = temp;
}
var i = 0;
var it = list.listIterator ();
while (it.hasNext ()) {
it.next ();
it.set$O (array[i++]);
}
} else {
var rawList = list;
for (var i = rawList.size () - 1; i > 0; i--) {
var index = random.nextInt () % (i + 1);
if (index < 0) {
index = -index;
}rawList.set$I$O (index, rawList.set$I$O (i, rawList.get$I (index)));
}
}}, 1);

Clazz.newMethod$(C$, 'singleton$TE', function (object) {
return Clazz.$new(java.util.Collections.SingletonSet.construct$TE,[object]);
}, 1);

Clazz.newMethod$(C$, 'singletonList$TE', function (object) {
return Clazz.$new(java.util.Collections.SingletonList.construct$TE,[object]);
}, 1);

Clazz.newMethod$(C$, 'singletonMap$TK$TV', function (key, value) {
return Clazz.$new(java.util.Collections.SingletonMap.construct$TK$TV,[key, value]);
}, 1);

Clazz.newMethod$(C$, 'sort$java_util_List', function (list) {
var array = list.toArray ();
java.util.Arrays.sort$OA (array);
var i = 0;
var it = list.listIterator ();
while (it.hasNext ()) {
it.next ();
it.set$TT (array[i++]);
}
}, 1);

Clazz.newMethod$(C$, 'sort$java_util_List$java_util_Comparator', function (list, comparator) {
var array = list.toArray$TTA ( Clazz.newArray$('OA', 1, [list.size ()]));
java.util.Arrays.sort$TTA$java_util_Comparator (array, comparator);
var i = 0;
var it = list.listIterator ();
while (it.hasNext ()) {
it.next ();
it.set$TT (array[i++]);
}
}, 1);

Clazz.newMethod$(C$, 'swap$java_util_List$I$I', function (list, index1, index2) {
if (list == null) {
throw Clazz.$new(NullPointerException.construct,[]);
}if (index1 == index2) {
return;
}var rawList = list;
rawList.set$I$O (index2, rawList.set$I$O (index1, rawList.get$I (index2)));
}, 1);

Clazz.newMethod$(C$, 'replaceAll$java_util_List$TT$TT', function (list, obj, obj2) {
var index;
var found = false;
while ((index = list.indexOf$O (obj)) > -1) {
found = true;
list.set$I$TT (index, obj2);
}
return found;
}, 1);

Clazz.newMethod$(C$, 'rotate$java_util_List$I', function (lst, dist) {
var list = lst;
var size = list.size ();
if (size == 0) {
return;
}var normdist;
if (dist > 0) {
normdist = dist % size;
} else {
normdist = size - ((dist % size) * (-1));
}if (normdist == 0 || normdist == size) {
return;
}if (Clazz.instanceOf(list, java.util.RandomAccess)) {
var temp = list.get$I (0);
var index = 0;
var beginIndex = 0;
for (var i = 0; i < size; i++) {
index = (index + normdist) % size;
temp = list.set$I$O (index, temp);
if (index == beginIndex) {
index = ++beginIndex;
temp = list.get$I (beginIndex);
}}
} else {
var divideIndex = (size - normdist) % size;
var sublist1 = list.subList$I$I (0, divideIndex);
var sublist2 = list.subList$I$I (divideIndex, size);
java.util.Collections.reverse$java_util_List (sublist1);
java.util.Collections.reverse$java_util_List (sublist2);
java.util.Collections.reverse$java_util_List (list);
}}, 1);

Clazz.newMethod$(C$, 'indexOfSubList$java_util_List$java_util_List', function (list, sublist) {
var size = list.size ();
var sublistSize = sublist.size ();
if (sublistSize > size) {
return -1;
}if (sublistSize == 0) {
return 0;
}var firstObj = sublist.get$I (0);
var index = list.indexOf$O (firstObj);
if (index == -1) {
return -1;
}while (index < size && (size - index >= sublistSize)) {
var listIt = list.listIterator$I (index);
if ((firstObj == null) ? listIt.next () == null : firstObj.equals$O (listIt.next ())) {
var sublistIt = sublist.listIterator$I (1);
var difFound = false;
while (sublistIt.hasNext ()) {
var element = sublistIt.next ();
if (!listIt.hasNext ()) {
return -1;
}if ((element == null) ? listIt.next () != null : !element.equals$O (listIt.next ())) {
difFound = true;
break;
}}
if (!difFound) {
return index;
}}index++;
}
return -1;
}, 1);

Clazz.newMethod$(C$, 'lastIndexOfSubList$java_util_List$java_util_List', function (list, sublist) {
var sublistSize = sublist.size ();
var size = list.size ();
if (sublistSize > size) {
return -1;
}if (sublistSize == 0) {
return size;
}var lastObj = sublist.get$I (sublistSize - 1);
var index = list.lastIndexOf$O (lastObj);
while ((index > -1) && (index + 1 >= sublistSize)) {
var listIt = list.listIterator$I (index + 1);
if ((lastObj == null) ? listIt.previous () == null : lastObj.equals$O (listIt.previous ())) {
var sublistIt = sublist.listIterator$I (sublistSize - 1);
var difFound = false;
while (sublistIt.hasPrevious ()) {
var element = sublistIt.previous ();
if (!listIt.hasPrevious ()) {
return -1;
}if ((element == null) ? listIt.previous () != null : !element.equals$O (listIt.previous ())) {
difFound = true;
break;
}}
if (!difFound) {
return listIt.nextIndex ();
}}index--;
}
return -1;
}, 1);

Clazz.newMethod$(C$, 'list$java_util_Enumeration', function (enumeration) {
var list = Clazz.$new(java.util.ArrayList.construct,[]);
while (enumeration.hasMoreElements ()) {
list.add$TT (enumeration.nextElement ());
}
return list;
}, 1);

Clazz.newMethod$(C$, 'synchronizedCollection$java_util_Collection', function (collection) {
if (collection == null) {
throw Clazz.$new(NullPointerException.construct,[]);
}return Clazz.$new(java.util.Collections.SynchronizedCollection.construct$java_util_Collection,[collection]);
}, 1);

Clazz.newMethod$(C$, 'synchronizedList$java_util_List', function (list) {
if (list == null) {
throw Clazz.$new(NullPointerException.construct,[]);
}if (Clazz.instanceOf(list, java.util.RandomAccess)) {
return Clazz.$new(java.util.Collections.SynchronizedRandomAccessList.construct$java_util_List,[list]);
}return Clazz.$new(java.util.Collections.SynchronizedList.construct$java_util_List,[list]);
}, 1);

Clazz.newMethod$(C$, 'synchronizedMap$java_util_Map', function (map) {
if (map == null) {
throw Clazz.$new(NullPointerException.construct,[]);
}return Clazz.$new(java.util.Collections.SynchronizedMap.construct$java_util_Map,[map]);
}, 1);

Clazz.newMethod$(C$, 'synchronizedSet$java_util_Set', function (set) {
if (set == null) {
throw Clazz.$new(NullPointerException.construct,[]);
}return Clazz.$new(java.util.Collections.SynchronizedSet.construct$java_util_Set,[set]);
}, 1);

Clazz.newMethod$(C$, 'synchronizedSortedMap$java_util_SortedMap', function (map) {
if (map == null) {
throw Clazz.$new(NullPointerException.construct,[]);
}return Clazz.$new(java.util.Collections.SynchronizedSortedMap.construct$java_util_SortedMap,[map]);
}, 1);

Clazz.newMethod$(C$, 'synchronizedSortedSet$java_util_SortedSet', function (set) {
if (set == null) {
throw Clazz.$new(NullPointerException.construct,[]);
}return Clazz.$new(java.util.Collections.SynchronizedSortedSet.construct$java_util_SortedSet,[set]);
}, 1);

Clazz.newMethod$(C$, 'unmodifiableCollection$java_util_Collection', function (collection) {
if (collection == null) {
throw Clazz.$new(NullPointerException.construct,[]);
}return Clazz.$new(java.util.Collections.UnmodifiableCollection.construct$java_util_Collection,[collection]);
}, 1);

Clazz.newMethod$(C$, 'unmodifiableList$java_util_List', function (list) {
if (list == null) {
throw Clazz.$new(NullPointerException.construct,[]);
}if (Clazz.instanceOf(list, java.util.RandomAccess)) {
return Clazz.$new(java.util.Collections.UnmodifiableRandomAccessList.construct$java_util_List,[list]);
}return Clazz.$new(java.util.Collections.UnmodifiableList.construct$java_util_List,[list]);
}, 1);

Clazz.newMethod$(C$, 'unmodifiableMap$java_util_Map', function (map) {
if (map == null) {
throw Clazz.$new(NullPointerException.construct,[]);
}return Clazz.$new(java.util.Collections.UnmodifiableMap.construct$java_util_Map,[map]);
}, 1);

Clazz.newMethod$(C$, 'unmodifiableSet$java_util_Set', function (set) {
if (set == null) {
throw Clazz.$new(NullPointerException.construct,[]);
}return Clazz.$new(java.util.Collections.UnmodifiableSet.construct$java_util_Set,[set]);
}, 1);

Clazz.newMethod$(C$, 'unmodifiableSortedMap$java_util_SortedMap', function (map) {
if (map == null) {
throw Clazz.$new(NullPointerException.construct,[]);
}return Clazz.$new(java.util.Collections.UnmodifiableSortedMap.construct$java_util_SortedMap,[map]);
}, 1);

Clazz.newMethod$(C$, 'unmodifiableSortedSet$java_util_SortedSet', function (set) {
if (set == null) {
throw Clazz.$new(NullPointerException.construct,[]);
}return Clazz.$new(java.util.Collections.UnmodifiableSortedSet.construct$java_util_SortedSet,[set]);
}, 1);

Clazz.newMethod$(C$, 'frequency$java_util_Collection$O', function (c, o) {
if (c == null) {
throw Clazz.$new(NullPointerException.construct,[]);
}if (c.isEmpty ()) {
return 0;
}var result = 0;
var itr = c.iterator ();
while (itr.hasNext ()) {
var e = itr.next ();
if (o == null ? e == null : o.equals$O (e)) {
result++;
}}
return result;
}, 1);

Clazz.newMethod$(C$, 'emptyList', function () {
return java.util.Collections.EMPTY_LIST;
}, 1);

Clazz.newMethod$(C$, 'emptySet', function () {
return java.util.Collections.EMPTY_SET;
}, 1);

Clazz.newMethod$(C$, 'emptyMap', function () {
return java.util.Collections.EMPTY_MAP;
}, 1);

Clazz.newMethod$(C$, 'checkedCollection$java_util_Collection$Class', function (c, type) {
return Clazz.$new(java.util.Collections.CheckedCollection.construct$java_util_Collection$Class,[c, type]);
}, 1);

Clazz.newMethod$(C$, 'checkedMap$java_util_Map$Class$Class', function (m, keyType, valueType) {
return Clazz.$new(java.util.Collections.CheckedMap.construct$java_util_Map$Class$Class,[m, keyType, valueType]);
}, 1);

Clazz.newMethod$(C$, 'checkedList$java_util_List$Class', function (list, type) {
if (Clazz.instanceOf(list, java.util.RandomAccess)) {
return Clazz.$new(java.util.Collections.CheckedRandomAccessList.construct$java_util_List$Class,[list, type]);
}return Clazz.$new(java.util.Collections.CheckedList.construct$java_util_List$Class,[list, type]);
}, 1);

Clazz.newMethod$(C$, 'checkedSet$java_util_Set$Class', function (s, type) {
return Clazz.$new(java.util.Collections.CheckedSet.construct$java_util_Set$Class,[s, type]);
}, 1);

Clazz.newMethod$(C$, 'checkedSortedMap$java_util_SortedMap$Class$Class', function (m, keyType, valueType) {
return Clazz.$new(java.util.Collections.CheckedSortedMap.construct$java_util_SortedMap$Class$Class,[m, keyType, valueType]);
}, 1);

Clazz.newMethod$(C$, 'checkedSortedSet$java_util_SortedSet$Class', function (s, type) {
return Clazz.$new(java.util.Collections.CheckedSortedSet.construct$java_util_SortedSet$Class,[s, type]);
}, 1);

Clazz.newMethod$(C$, 'addAll$java_util_Collection$TTA', function (c, a) {
var modified = false;
for (var i = 0; i < a.length; i++) {
modified = new Boolean (modified | c.add$ (a[i])).valueOf ();
}
return modified;
}, 1);

Clazz.newMethod$(C$, 'disjoint$java_util_Collection$java_util_Collection', function (c1, c2) {
if ((Clazz.instanceOf(c1, java.util.Set)) && !(Clazz.instanceOf(c2, java.util.Set)) || (c2.size ()) > c1.size ()) {
var tmp = c1;
c1 = c2;
c2 = tmp;
}var it = c1.iterator ();
while (it.hasNext ()) {
if (c2.contains$O (it.next ())) {
return false;
}}
return true;
}, 1);

Clazz.newMethod$(C$, 'checkType$TE$Class', function (obj, type) {
if (!type.isInstance$O (obj)) {
throw Clazz.$new(ClassCastException.construct$S,["Attempt to insert " + obj.getClass () + " element into collection with element type " + type]);
}return obj;
}, 1);
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "CopiesList", java.util.AbstractList, java.io.Serializable);

Clazz.newMethod$(C$, '$init$', function () {
this.n = 0;
this.element = null;
}, 1);

Clazz.newMethod$(C$, 'construct$I$TE', function (length, object) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
if (length < 0) {
throw Clazz.$new(IllegalArgumentException.construct,[]);
}this.n = length;
this.element = object;
}, 1);

Clazz.newMethod$(C$, 'contains$O', function (object) {
return this.element == null ? object == null : this.element.equals$O (object);
});

Clazz.newMethod$(C$, 'size', function () {
return this.n;
});

Clazz.newMethod$(C$, 'get$I', function (location) {
if (0 <= location && location < this.n) {
return this.element;
}throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "EmptyList", java.util.AbstractList, java.io.Serializable);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'contains$O', function (object) {
return false;
});

Clazz.newMethod$(C$, 'size', function () {
return 0;
});

Clazz.newMethod$(C$, 'get$I', function (location) {
throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
});

Clazz.newMethod$(C$, 'readResolve', function () {
return java.util.Collections.EMPTY_LIST;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "EmptySet", java.util.AbstractSet, java.io.Serializable);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'contains$O', function (object) {
return false;
});

Clazz.newMethod$(C$, 'size', function () {
return 0;
});

Clazz.newMethod$(C$, 'iterator', function () {
return ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "Collections$EmptySet$1", null, java.util.Iterator);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'hasNext', function () {
return false;
});

Clazz.newMethod$(C$, 'next', function () {
throw Clazz.$new(java.util.NoSuchElementException.construct,[]);
});

Clazz.newMethod$(C$, 'remove', function () {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});
})()
), Clazz.$new(java.util.Collections$EmptySet$1.$init$, [this, null]));
});

Clazz.newMethod$(C$, 'readResolve', function () {
return java.util.Collections.EMPTY_SET;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "EmptyMap", java.util.AbstractMap, java.io.Serializable);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'containsKey$O', function (key) {
return false;
});

Clazz.newMethod$(C$, 'containsValue$O', function (value) {
return false;
});

Clazz.newMethod$(C$, 'entrySet', function () {
return java.util.Collections.EMPTY_SET;
});

Clazz.newMethod$(C$, 'get$O', function (key) {
return null;
});

Clazz.newMethod$(C$, 'keySet', function () {
return java.util.Collections.EMPTY_SET;
});

Clazz.newMethod$(C$, 'values', function () {
return java.util.Collections.EMPTY_LIST;
});

Clazz.newMethod$(C$, 'readResolve', function () {
return java.util.Collections.EMPTY_MAP;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "ReverseComparator", null, [java.util.Comparator, java.io.Serializable]);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'compare$TT$TT', function (o1, o2) {
var c2 = o2;
return c2.compareTo$TT (o1);
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "ReverseComparatorWithComparator", null, [java.util.Comparator, java.io.Serializable]);

Clazz.newMethod$(C$, '$init$', function () {
this.comparator = null;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_Comparator', function (comparator) {
this.comparator = comparator;
}, 1);

Clazz.newMethod$(C$, 'compare$TT$TT', function (o1, o2) {
return this.comparator.compare$TT$TT (o2, o1);
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "SingletonSet", java.util.AbstractSet, java.io.Serializable);

Clazz.newMethod$(C$, '$init$', function () {
this.element = null;
}, 1);

Clazz.newMethod$(C$, 'construct$TE', function (object) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.element = object;
}, 1);

Clazz.newMethod$(C$, 'contains$O', function (object) {
return this.element == null ? object == null : this.element.equals$O (object);
});

Clazz.newMethod$(C$, 'size', function () {
return 1;
});

Clazz.newMethod$(C$, 'iterator', function () {
return ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "Collections$SingletonSet$1", null, java.util.Iterator);

Clazz.newMethod$(C$, '$init$', function () {
this.$hasNext = true;
}, 1);

Clazz.newMethod$(C$, 'hasNext', function () {
return this.$hasNext;
});

Clazz.newMethod$(C$, 'next', function () {
if (this.$hasNext) {
this.$hasNext = false;
return this.b$["java.util.Collections.SingletonSet"].element;
}throw Clazz.$new(java.util.NoSuchElementException.construct,[]);
});

Clazz.newMethod$(C$, 'remove', function () {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});
})()
), Clazz.$new(java.util.Collections$SingletonSet$1.$init$, [this, null]));
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "SingletonList", java.util.AbstractList, java.io.Serializable);

Clazz.newMethod$(C$, '$init$', function () {
this.element = null;
}, 1);

Clazz.newMethod$(C$, 'construct$TE', function (object) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.element = object;
}, 1);

Clazz.newMethod$(C$, 'contains$O', function (object) {
return this.element == null ? object == null : this.element.equals$O (object);
});

Clazz.newMethod$(C$, 'get$I', function (location) {
if (location == 0) {
return this.element;
}throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
});

Clazz.newMethod$(C$, 'size', function () {
return 1;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "SingletonMap", java.util.AbstractMap, java.io.Serializable);

Clazz.newMethod$(C$, '$init$', function () {
this.k = null;
this.v = null;
}, 1);

Clazz.newMethod$(C$, 'construct$TK$TV', function (key, value) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.k = key;
this.v = value;
}, 1);

Clazz.newMethod$(C$, 'containsKey$O', function (key) {
return this.k == null ? key == null : this.k.equals$O (key);
});

Clazz.newMethod$(C$, 'containsValue$O', function (value) {
return this.v == null ? value == null : this.v.equals$O (value);
});

Clazz.newMethod$(C$, 'get$O', function (key) {
if (this.containsKey$O (key)) {
return this.v;
}return null;
});

Clazz.newMethod$(C$, 'size', function () {
return 1;
});

Clazz.newMethod$(C$, 'entrySet', function () {
return ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "Collections$SingletonMap$1", java.util.AbstractSet);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'contains$O', function (object) {
if (Clazz.instanceOf(object, java.util.Map.Entry)) {
var entry = object;
return this.b$["java.util.Collections.SingletonMap"].containsKey$O (entry.getKey ()) && this.b$["java.util.Collections.SingletonMap"].containsValue$O (entry.getValue ());
}return false;
});

Clazz.newMethod$(C$, 'size', function () {
return 1;
});

Clazz.newMethod$(C$, 'iterator', function () {
return ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "Collections$SingletonMap$1$1", null, java.util.Iterator);

Clazz.newMethod$(C$, '$init$', function () {
this.$hasNext = true;
}, 1);

Clazz.newMethod$(C$, 'hasNext', function () {
return this.$hasNext;
});

Clazz.newMethod$(C$, 'next', function () {
if (this.$hasNext) {
this.$hasNext = false;
return ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "Collections$SingletonMap$1$1$1", null, java.util.Map.Entry);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'equals$O', function (object) {
return this.b$["java.util.Collections$SingletonMap$1"].contains$O (object);
});

Clazz.newMethod$(C$, 'getKey', function () {
return this.b$["java.util.Collections.SingletonMap"].k;
});

Clazz.newMethod$(C$, 'getValue', function () {
return this.b$["java.util.Collections.SingletonMap"].v;
});

Clazz.newMethod$(C$, 'hashCode', function () {
return (this.b$["java.util.Collections.SingletonMap"].k == null ? 0 : this.b$["java.util.Collections.SingletonMap"].k.hashCode ()) ^ (this.b$["java.util.Collections.SingletonMap"].v == null ? 0 : this.b$["java.util.Collections.SingletonMap"].v.hashCode ());
});

Clazz.newMethod$(C$, 'setValue$TV', function (value) {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});
})()
), Clazz.$new(java.util.Collections$SingletonMap$1$1$1.$init$, [this, null]));
}throw Clazz.$new(java.util.NoSuchElementException.construct,[]);
});

Clazz.newMethod$(C$, 'remove', function () {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});
})()
), Clazz.$new(java.util.Collections$SingletonMap$1$1.$init$, [this, null]));
});
})()
), Clazz.$new(java.util.Collections$SingletonMap$1.superClazz.construct, [this, null],java.util.Collections$SingletonMap$1));
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "SynchronizedCollection", null, [java.util.Collection, java.io.Serializable]);

Clazz.newMethod$(C$, '$init$', function () {
this.c = null;
this.mutex = null;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_Collection', function (collection) {
C$.$init$.apply(this);
this.c = collection;
this.mutex = this;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_Collection$O', function (collection, mutex) {
C$.$init$.apply(this);
this.c = collection;
this.mutex = mutex;
}, 1);

Clazz.newMethod$(C$, 'add$TE', function (object) {
{
return this.c.add$TE (object);
}});

Clazz.newMethod$(C$, 'addAll$java_util_Collection', function (collection) {
{
return this.c.addAll$java_util_Collection (collection);
}});

Clazz.newMethod$(C$, 'clear', function () {
{
this.c.clear ();
}});

Clazz.newMethod$(C$, 'contains$O', function (object) {
{
return this.c.contains$O (object);
}});

Clazz.newMethod$(C$, 'containsAll$java_util_Collection', function (collection) {
{
return this.c.containsAll$java_util_Collection (collection);
}});

Clazz.newMethod$(C$, 'isEmpty', function () {
{
return this.c.isEmpty ();
}});

Clazz.newMethod$(C$, 'iterator', function () {
{
return this.c.iterator ();
}});

Clazz.newMethod$(C$, 'remove$O', function (object) {
{
return this.c.remove$O (object);
}});

Clazz.newMethod$(C$, 'removeAll$java_util_Collection', function (collection) {
{
return this.c.removeAll$java_util_Collection (collection);
}});

Clazz.newMethod$(C$, 'retainAll$java_util_Collection', function (collection) {
{
return this.c.retainAll$java_util_Collection (collection);
}});

Clazz.newMethod$(C$, 'size', function () {
{
return this.c.size ();
}});

Clazz.newMethod$(C$, 'toArray', function () {
{
return this.c.toArray ();
}});

Clazz.newMethod$(C$, 'toString', function () {
{
return this.c.toString ();
}});

Clazz.newMethod$(C$, 'toArray$TTA', function (array) {
{
return this.c.toArray$TTA (array);
}});

Clazz.newMethod$(C$, 'writeObject$java_io_ObjectOutputStream', function (stream) {
{
stream.defaultWriteObject ();
}});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "SynchronizedRandomAccessList", java.util.Collections.SynchronizedList, java.util.RandomAccess);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_List', function (l) {
C$.superClazz.construct$java_util_List.apply(this, [l]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_List$O', function (l, mutex) {
C$.superClazz.construct$java_util_List$O.apply(this, [l, mutex]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'subList$I$I', function (start, end) {
{
return Clazz.$new(java.util.Collections.SynchronizedRandomAccessList.construct$java_util_List$O,[this.list.subList$I$I (start, end), this.mutex]);
}});

Clazz.newMethod$(C$, 'writeReplace', function () {
return Clazz.$new(java.util.Collections.SynchronizedList.construct$java_util_List,[this.list]);
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "SynchronizedList", java.util.Collections.SynchronizedCollection, java.util.List);

Clazz.newMethod$(C$, '$init$', function () {
this.list = null;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_List', function (l) {
C$.superClazz.construct$java_util_Collection.apply(this, [l]);
C$.$init$.apply(this);
this.list = l;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_List$O', function (l, mutex) {
C$.superClazz.construct$java_util_Collection$O.apply(this, [l, mutex]);
C$.$init$.apply(this);
this.list = l;
}, 1);

Clazz.newMethod$(C$, 'add$I$TE', function (location, object) {
{
this.list.add$I$TE (location, object);
}});

Clazz.newMethod$(C$, 'addAll$I$java_util_Collection', function (location, collection) {
{
return this.list.addAll$I$java_util_Collection (location, collection);
}});

Clazz.newMethod$(C$, 'equals$O', function (object) {
{
return this.list.equals$O (object);
}});

Clazz.newMethod$(C$, 'get$I', function (location) {
{
return this.list.get$I (location);
}});

Clazz.newMethod$(C$, 'hashCode', function () {
{
return this.list.hashCode ();
}});

Clazz.newMethod$(C$, 'indexOf$O', function (object) {
{
return this.list.indexOf$O (object);
}});

Clazz.newMethod$(C$, 'lastIndexOf$O', function (object) {
{
return this.list.lastIndexOf$O (object);
}});

Clazz.newMethod$(C$, 'listIterator', function () {
{
return this.list.listIterator ();
}});

Clazz.newMethod$(C$, 'listIterator$I', function (location) {
{
return this.list.listIterator$I (location);
}});

Clazz.newMethod$(C$, 'remove$I', function (location) {
{
return this.list.remove$I (location);
}});

Clazz.newMethod$(C$, 'set$I$TE', function (location, object) {
{
return this.list.set$I$TE (location, object);
}});

Clazz.newMethod$(C$, 'subList$I$I', function (start, end) {
{
return Clazz.$new(java.util.Collections.SynchronizedList.construct$java_util_List$O,[this.list.subList$I$I (start, end), this.mutex]);
}});

Clazz.newMethod$(C$, 'writeObject$java_io_ObjectOutputStream', function (stream) {
{
stream.defaultWriteObject ();
}});

Clazz.newMethod$(C$, 'readResolve', function () {
if (Clazz.instanceOf(this.list, java.util.RandomAccess)) {
return Clazz.$new(java.util.Collections.SynchronizedRandomAccessList.construct$java_util_List$O,[this.list, this.mutex]);
}return this;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "SynchronizedMap", null, [java.util.Map, java.io.Serializable]);

Clazz.newMethod$(C$, '$init$', function () {
this.m = null;
this.mutex = null;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_Map', function (map) {
C$.$init$.apply(this);
this.m = map;
this.mutex = this;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_Map$O', function (map, mutex) {
C$.$init$.apply(this);
this.m = map;
this.mutex = mutex;
}, 1);

Clazz.newMethod$(C$, 'clear', function () {
{
this.m.clear ();
}});

Clazz.newMethod$(C$, 'containsKey$O', function (key) {
{
return this.m.containsKey$O (key);
}});

Clazz.newMethod$(C$, 'containsValue$O', function (value) {
{
return this.m.containsValue$O (value);
}});

Clazz.newMethod$(C$, 'entrySet', function () {
{
return Clazz.$new(java.util.Collections.SynchronizedSet.construct$java_util_Set$O,[this.m.entrySet (), this.mutex]);
}});

Clazz.newMethod$(C$, 'equals$O', function (object) {
{
return this.m.equals$O (object);
}});

Clazz.newMethod$(C$, 'get$O', function (key) {
{
return this.m.get$O (key);
}});

Clazz.newMethod$(C$, 'hashCode', function () {
{
return this.m.hashCode ();
}});

Clazz.newMethod$(C$, 'isEmpty', function () {
{
return this.m.isEmpty ();
}});

Clazz.newMethod$(C$, 'keySet', function () {
{
return Clazz.$new(java.util.Collections.SynchronizedSet.construct$java_util_Set$O,[this.m.keySet (), this.mutex]);
}});

Clazz.newMethod$(C$, 'put$TK$TV', function (key, value) {
{
return this.m.put$TK$TV (key, value);
}});

Clazz.newMethod$(C$, 'putAll$java_util_Map', function (map) {
{
this.m.putAll$java_util_Map (map);
}});

Clazz.newMethod$(C$, 'remove$O', function (key) {
{
return this.m.remove$O (key);
}});

Clazz.newMethod$(C$, 'size', function () {
{
return this.m.size ();
}});

Clazz.newMethod$(C$, 'values', function () {
{
return Clazz.$new(java.util.Collections.SynchronizedCollection.construct$java_util_Collection$O,[this.m.values (), this.mutex]);
}});

Clazz.newMethod$(C$, 'toString', function () {
{
return this.m.toString ();
}});

Clazz.newMethod$(C$, 'writeObject$java_io_ObjectOutputStream', function (stream) {
{
stream.defaultWriteObject ();
}});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "SynchronizedSet", java.util.Collections.SynchronizedCollection, java.util.Set);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_Set', function (set) {
C$.superClazz.construct$java_util_Collection.apply(this, [set]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_Set$O', function (set, mutex) {
C$.superClazz.construct$java_util_Collection$O.apply(this, [set, mutex]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'equals$O', function (object) {
{
return this.c.equals$O (object);
}});

Clazz.newMethod$(C$, 'hashCode', function () {
{
return this.c.hashCode ();
}});

Clazz.newMethod$(C$, 'writeObject$java_io_ObjectOutputStream', function (stream) {
{
stream.defaultWriteObject ();
}});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "SynchronizedSortedMap", java.util.Collections.SynchronizedMap, java.util.SortedMap);

Clazz.newMethod$(C$, '$init$', function () {
this.sm = null;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_SortedMap', function (map) {
C$.superClazz.construct$java_util_Map.apply(this, [map]);
C$.$init$.apply(this);
this.sm = map;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_SortedMap$O', function (map, mutex) {
C$.superClazz.construct$java_util_Map$O.apply(this, [map, mutex]);
C$.$init$.apply(this);
this.sm = map;
}, 1);

Clazz.newMethod$(C$, 'comparator', function () {
{
return this.sm.comparator ();
}});

Clazz.newMethod$(C$, 'firstKey', function () {
{
return this.sm.firstKey ();
}});

Clazz.newMethod$(C$, 'headMap$TK', function (endKey) {
{
return Clazz.$new(java.util.Collections.SynchronizedSortedMap.construct$java_util_SortedMap$O,[this.sm.headMap$TK (endKey), this.mutex]);
}});

Clazz.newMethod$(C$, 'lastKey', function () {
{
return this.sm.lastKey ();
}});

Clazz.newMethod$(C$, 'subMap$TK$TK', function (startKey, endKey) {
{
return Clazz.$new(java.util.Collections.SynchronizedSortedMap.construct$java_util_SortedMap$O,[this.sm.subMap$TK$TK (startKey, endKey), this.mutex]);
}});

Clazz.newMethod$(C$, 'tailMap$TK', function (startKey) {
{
return Clazz.$new(java.util.Collections.SynchronizedSortedMap.construct$java_util_SortedMap$O,[this.sm.tailMap$TK (startKey), this.mutex]);
}});

Clazz.newMethod$(C$, 'writeObject$java_io_ObjectOutputStream', function (stream) {
{
stream.defaultWriteObject ();
}});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "SynchronizedSortedSet", java.util.Collections.SynchronizedSet, java.util.SortedSet);

Clazz.newMethod$(C$, '$init$', function () {
this.ss = null;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_SortedSet', function (set) {
C$.superClazz.construct$java_util_Set.apply(this, [set]);
C$.$init$.apply(this);
this.ss = set;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_SortedSet$O', function (set, mutex) {
C$.superClazz.construct$java_util_Set$O.apply(this, [set, mutex]);
C$.$init$.apply(this);
this.ss = set;
}, 1);

Clazz.newMethod$(C$, 'comparator', function () {
{
return this.ss.comparator ();
}});

Clazz.newMethod$(C$, 'first', function () {
{
return this.ss.first ();
}});

Clazz.newMethod$(C$, 'headSet$TE', function (end) {
{
return Clazz.$new(java.util.Collections.SynchronizedSortedSet.construct$java_util_SortedSet$O,[this.ss.headSet$TE (end), this.mutex]);
}});

Clazz.newMethod$(C$, 'last', function () {
{
return this.ss.last ();
}});

Clazz.newMethod$(C$, 'subSet$TE$TE', function (start, end) {
{
return Clazz.$new(java.util.Collections.SynchronizedSortedSet.construct$java_util_SortedSet$O,[this.ss.subSet$TE$TE (start, end), this.mutex]);
}});

Clazz.newMethod$(C$, 'tailSet$TE', function (start) {
{
return Clazz.$new(java.util.Collections.SynchronizedSortedSet.construct$java_util_SortedSet$O,[this.ss.tailSet$TE (start), this.mutex]);
}});

Clazz.newMethod$(C$, 'writeObject$java_io_ObjectOutputStream', function (stream) {
{
stream.defaultWriteObject ();
}});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "UnmodifiableCollection", null, [java.util.Collection, java.io.Serializable]);

Clazz.newMethod$(C$, '$init$', function () {
this.c = null;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_Collection', function (collection) {
C$.$init$.apply(this);
this.c = collection;
}, 1);

Clazz.newMethod$(C$, 'add$TE', function (object) {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});

Clazz.newMethod$(C$, 'addAll$java_util_Collection', function (collection) {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});

Clazz.newMethod$(C$, 'clear', function () {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});

Clazz.newMethod$(C$, 'contains$O', function (object) {
return this.c.contains$O (object);
});

Clazz.newMethod$(C$, 'containsAll$java_util_Collection', function (collection) {
return this.c.containsAll$java_util_Collection (collection);
});

Clazz.newMethod$(C$, 'isEmpty', function () {
return this.c.isEmpty ();
});

Clazz.newMethod$(C$, 'iterator', function () {
return ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "Collections$UnmodifiableCollection$1", null, java.util.Iterator);

Clazz.newMethod$(C$, '$init$', function () {
this.iterator = this.b$["java.util.Collections.UnmodifiableCollection"].c.iterator ();
}, 1);

Clazz.newMethod$(C$, 'hasNext', function () {
return this.iterator.hasNext ();
});

Clazz.newMethod$(C$, 'next', function () {
return this.iterator.next ();
});

Clazz.newMethod$(C$, 'remove', function () {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});
})()
), Clazz.$new(java.util.Collections$UnmodifiableCollection$1.$init$, [this, null]));
});

Clazz.newMethod$(C$, 'remove$O', function (object) {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});

Clazz.newMethod$(C$, 'removeAll$java_util_Collection', function (collection) {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});

Clazz.newMethod$(C$, 'retainAll$java_util_Collection', function (collection) {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});

Clazz.newMethod$(C$, 'size', function () {
return this.c.size ();
});

Clazz.newMethod$(C$, 'toArray', function () {
return this.c.toArray ();
});

Clazz.newMethod$(C$, 'toArray$TTA', function (array) {
return this.c.toArray$TTA (array);
});

Clazz.newMethod$(C$, 'toString', function () {
return this.c.toString ();
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "UnmodifiableRandomAccessList", java.util.Collections.UnmodifiableList, java.util.RandomAccess);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_List', function (l) {
C$.superClazz.construct$java_util_List.apply(this, [l]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'subList$I$I', function (start, end) {
return Clazz.$new(java.util.Collections.UnmodifiableRandomAccessList.construct$java_util_List,[this.list.subList$I$I (start, end)]);
});

Clazz.newMethod$(C$, 'writeReplace', function () {
return Clazz.$new(java.util.Collections.UnmodifiableList.construct$java_util_List,[this.list]);
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "UnmodifiableList", java.util.Collections.UnmodifiableCollection, java.util.List);

Clazz.newMethod$(C$, '$init$', function () {
this.list = null;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_List', function (l) {
C$.superClazz.construct$java_util_Collection.apply(this, [l]);
C$.$init$.apply(this);
this.list = l;
}, 1);

Clazz.newMethod$(C$, 'add$I$TE', function (location, object) {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});

Clazz.newMethod$(C$, 'addAll$I$java_util_Collection', function (location, collection) {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});

Clazz.newMethod$(C$, 'equals$O', function (object) {
return this.list.equals$O (object);
});

Clazz.newMethod$(C$, 'get$I', function (location) {
return this.list.get$I (location);
});

Clazz.newMethod$(C$, 'hashCode', function () {
return this.list.hashCode ();
});

Clazz.newMethod$(C$, 'indexOf$O', function (object) {
return this.list.indexOf$O (object);
});

Clazz.newMethod$(C$, 'lastIndexOf$O', function (object) {
return this.list.lastIndexOf$O (object);
});

Clazz.newMethod$(C$, 'listIterator', function () {
return this.listIterator$I (0);
});

Clazz.newMethod$(C$, 'listIterator$I', function (location) {
return ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "Collections$UnmodifiableList$1", null, java.util.ListIterator);

Clazz.newMethod$(C$, '$init$', function () {
this.iterator = this.b$["java.util.Collections.UnmodifiableList"].list.listIterator$I (this.f$.location);
}, 1);

Clazz.newMethod$(C$, 'add$TE', function (object) {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});

Clazz.newMethod$(C$, 'hasNext', function () {
return this.iterator.hasNext ();
});

Clazz.newMethod$(C$, 'hasPrevious', function () {
return this.iterator.hasPrevious ();
});

Clazz.newMethod$(C$, 'next', function () {
return this.iterator.next ();
});

Clazz.newMethod$(C$, 'nextIndex', function () {
return this.iterator.nextIndex ();
});

Clazz.newMethod$(C$, 'previous', function () {
return this.iterator.previous ();
});

Clazz.newMethod$(C$, 'previousIndex', function () {
return this.iterator.previousIndex ();
});

Clazz.newMethod$(C$, 'remove', function () {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});

Clazz.newMethod$(C$, 'set$TE', function (object) {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});
})()
), Clazz.$new(java.util.Collections$UnmodifiableList$1.$init$, [this, {location: location}]));
});

Clazz.newMethod$(C$, 'remove$I', function (location) {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});

Clazz.newMethod$(C$, 'set$I$TE', function (location, object) {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});

Clazz.newMethod$(C$, 'subList$I$I', function (start, end) {
return Clazz.$new(java.util.Collections.UnmodifiableList.construct$java_util_List,[this.list.subList$I$I (start, end)]);
});

Clazz.newMethod$(C$, 'readResolve', function () {
if (Clazz.instanceOf(this.list, java.util.RandomAccess)) {
return Clazz.$new(java.util.Collections.UnmodifiableRandomAccessList.construct$java_util_List,[this.list]);
}return this;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "UnmodifiableMap", null, [java.util.Map, java.io.Serializable]);

Clazz.newMethod$(C$, '$init$', function () {
this.m = null;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_Map', function (map) {
C$.$init$.apply(this);
this.m = map;
}, 1);

Clazz.newMethod$(C$, 'clear', function () {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});

Clazz.newMethod$(C$, 'containsKey$O', function (key) {
return this.m.containsKey$O (key);
});

Clazz.newMethod$(C$, 'containsValue$O', function (value) {
return this.m.containsValue$O (value);
});

Clazz.newMethod$(C$, 'entrySet', function () {
return Clazz.$new(java.util.Collections.UnmodifiableMap.UnmodifiableEntrySet.construct$java_util_Set,[this.m.entrySet ()]);
});

Clazz.newMethod$(C$, 'equals$O', function (object) {
return this.m.equals$O (object);
});

Clazz.newMethod$(C$, 'get$O', function (key) {
return this.m.get$O (key);
});

Clazz.newMethod$(C$, 'hashCode', function () {
return this.m.hashCode ();
});

Clazz.newMethod$(C$, 'isEmpty', function () {
return this.m.isEmpty ();
});

Clazz.newMethod$(C$, 'keySet', function () {
return Clazz.$new(java.util.Collections.UnmodifiableSet.construct$java_util_Set,[this.m.keySet ()]);
});

Clazz.newMethod$(C$, 'put$TK$TV', function (key, value) {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});

Clazz.newMethod$(C$, 'putAll$java_util_Map', function (map) {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});

Clazz.newMethod$(C$, 'remove$O', function (key) {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});

Clazz.newMethod$(C$, 'size', function () {
return this.m.size ();
});

Clazz.newMethod$(C$, 'values', function () {
return Clazz.$new(java.util.Collections.UnmodifiableCollection.construct$java_util_Collection,[this.m.values ()]);
});

Clazz.newMethod$(C$, 'toString', function () {
return this.m.toString ();
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections.UnmodifiableMap, "UnmodifiableEntrySet", java.util.Collections.UnmodifiableSet);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_Set', function (set) {
C$.superClazz.construct$java_util_Set.apply(this, [set]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'iterator', function () {
return ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "Collections$UnmodifiableMap$UnmodifiableEntrySet$1", null, java.util.Iterator);

Clazz.newMethod$(C$, '$init$', function () {
this.iterator = this.b$["java.util.Collections.UnmodifiableMap.UnmodifiableEntrySet"].c.iterator ();
}, 1);

Clazz.newMethod$(C$, 'hasNext', function () {
return this.iterator.hasNext ();
});

Clazz.newMethod$(C$, 'next', function () {
return Clazz.$new(java.util.Collections.UnmodifiableMap.UnmodifiableEntrySet.UnmodifiableMapEntry.construct$java_util_Map_Entry,[this.iterator.next ()]);
});

Clazz.newMethod$(C$, 'remove', function () {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});
})()
), Clazz.$new(java.util.Collections$UnmodifiableMap$UnmodifiableEntrySet$1.$init$, [this, null]));
});

Clazz.newMethod$(C$, 'toArray', function () {
var length = this.c.size ();
var result =  Clazz.newArray$('OA', 1, [length]);
var it = this.iterator ();
for (var i = length; --i >= 0; ) {
result[i] = it.next ();
}
return result;
});

Clazz.newMethod$(C$, 'toArray$TTA', function (contents) {
var size = this.c.size ();
var index = 0;
var it = this.iterator ();
if (size > contents.length) {
var ct = contents.getClass ().getComponentType ();
contents = Clazz.newArray$ (ct, size);
}while (index < size) {
contents[index++] = it.next ();
}
if (index < contents.length) {
contents[index] = null;
}return contents;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections.UnmodifiableMap.UnmodifiableEntrySet, "UnmodifiableMapEntry", null, java.util.Map.Entry);

Clazz.newMethod$(C$, '$init$', function () {
this.mapEntry = null;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_Map_Entry', function (entry) {
C$.$init$.apply(this);
this.mapEntry = entry;
}, 1);

Clazz.newMethod$(C$, 'equals$O', function (object) {
return this.mapEntry.equals$O (object);
});

Clazz.newMethod$(C$, 'getKey', function () {
return this.mapEntry.getKey ();
});

Clazz.newMethod$(C$, 'getValue', function () {
return this.mapEntry.getValue ();
});

Clazz.newMethod$(C$, 'hashCode', function () {
return this.mapEntry.hashCode ();
});

Clazz.newMethod$(C$, 'setValue$TV', function (object) {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});

Clazz.newMethod$(C$, 'toString', function () {
return this.mapEntry.toString ();
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
})()
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "UnmodifiableSet", java.util.Collections.UnmodifiableCollection, java.util.Set);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_Set', function (set) {
C$.superClazz.construct$java_util_Collection.apply(this, [set]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'equals$O', function (object) {
return this.c.equals$O (object);
});

Clazz.newMethod$(C$, 'hashCode', function () {
return this.c.hashCode ();
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "UnmodifiableSortedMap", java.util.Collections.UnmodifiableMap, java.util.SortedMap);

Clazz.newMethod$(C$, '$init$', function () {
this.sm = null;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_SortedMap', function (map) {
C$.superClazz.construct$java_util_Map.apply(this, [map]);
C$.$init$.apply(this);
this.sm = map;
}, 1);

Clazz.newMethod$(C$, 'comparator', function () {
return this.sm.comparator ();
});

Clazz.newMethod$(C$, 'firstKey', function () {
return this.sm.firstKey ();
});

Clazz.newMethod$(C$, 'headMap$TK', function (before) {
return Clazz.$new(java.util.Collections.UnmodifiableSortedMap.construct$java_util_SortedMap,[this.sm.headMap$TK (before)]);
});

Clazz.newMethod$(C$, 'lastKey', function () {
return this.sm.lastKey ();
});

Clazz.newMethod$(C$, 'subMap$TK$TK', function (start, end) {
return Clazz.$new(java.util.Collections.UnmodifiableSortedMap.construct$java_util_SortedMap,[this.sm.subMap$TK$TK (start, end)]);
});

Clazz.newMethod$(C$, 'tailMap$TK', function (after) {
return Clazz.$new(java.util.Collections.UnmodifiableSortedMap.construct$java_util_SortedMap,[this.sm.tailMap$TK (after)]);
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "UnmodifiableSortedSet", java.util.Collections.UnmodifiableSet, java.util.SortedSet);

Clazz.newMethod$(C$, '$init$', function () {
this.ss = null;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_SortedSet', function (set) {
C$.superClazz.construct$java_util_Set.apply(this, [set]);
C$.$init$.apply(this);
this.ss = set;
}, 1);

Clazz.newMethod$(C$, 'comparator', function () {
return this.ss.comparator ();
});

Clazz.newMethod$(C$, 'first', function () {
return this.ss.first ();
});

Clazz.newMethod$(C$, 'headSet$TE', function (before) {
return Clazz.$new(java.util.Collections.UnmodifiableSortedSet.construct$java_util_SortedSet,[this.ss.headSet$TE (before)]);
});

Clazz.newMethod$(C$, 'last', function () {
return this.ss.last ();
});

Clazz.newMethod$(C$, 'subSet$TE$TE', function (start, end) {
return Clazz.$new(java.util.Collections.UnmodifiableSortedSet.construct$java_util_SortedSet,[this.ss.subSet$TE$TE (start, end)]);
});

Clazz.newMethod$(C$, 'tailSet$TE', function (after) {
return Clazz.$new(java.util.Collections.UnmodifiableSortedSet.construct$java_util_SortedSet,[this.ss.tailSet$TE (after)]);
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "CheckedCollection", null, [java.util.Collection, java.io.Serializable]);

Clazz.newMethod$(C$, '$init$', function () {
this.c = null;
this.type = null;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_Collection$Class', function (c, type) {
C$.$init$.apply(this);
if (c == null || type == null) {
throw Clazz.$new(NullPointerException.construct,[]);
}this.c = c;
this.type = type;
}, 1);

Clazz.newMethod$(C$, 'size', function () {
return this.c.size ();
});

Clazz.newMethod$(C$, 'isEmpty', function () {
return this.c.isEmpty ();
});

Clazz.newMethod$(C$, 'contains$O', function (obj) {
return this.c.contains$O (obj);
});

Clazz.newMethod$(C$, 'iterator', function () {
var i = this.c.iterator ();
if (Clazz.instanceOf(i, java.util.ListIterator)) {
i = Clazz.$new(java.util.Collections.CheckedListIterator.construct$java_util_ListIterator$Class,[i, this.type]);
}return i;
});

Clazz.newMethod$(C$, 'toArray', function () {
return this.c.toArray ();
});

Clazz.newMethod$(C$, 'toArray$TTA', function (arr) {
return this.c.toArray$TTA (arr);
});

Clazz.newMethod$(C$, 'add$TE', function (obj) {
return this.c.add$TE (java.util.Collections.checkType$TE$Class (obj, this.type));
});

Clazz.newMethod$(C$, 'remove$O', function (obj) {
return this.c.remove$O (obj);
});

Clazz.newMethod$(C$, 'containsAll$java_util_Collection', function (c1) {
return this.c.containsAll$java_util_Collection (c1);
});

Clazz.newMethod$(C$, 'addAll$java_util_Collection', function (c1) {
var size = c1.size ();
if (size == 0) {
return false;
}var arr =  Clazz.newArray$('OA', 1, [size]);
var it = c1.iterator ();
for (var i = 0; i < size; i++) {
arr[i] = java.util.Collections.checkType$TE$Class (it.next (), this.type);
}
var added = false;
for (var i = 0; i < size; i++) {
added = new Boolean (added | this.c.add$TE (arr[i])).valueOf ();
}
return added;
});

Clazz.newMethod$(C$, 'removeAll$java_util_Collection', function (c1) {
return this.c.removeAll$java_util_Collection (c1);
});

Clazz.newMethod$(C$, 'retainAll$java_util_Collection', function (c1) {
return this.c.retainAll$java_util_Collection (c1);
});

Clazz.newMethod$(C$, 'clear', function () {
this.c.clear ();
});

Clazz.newMethod$(C$, 'toString', function () {
return this.c.toString ();
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "CheckedListIterator", null, java.util.ListIterator);

Clazz.newMethod$(C$, '$init$', function () {
this.i = null;
this.type = null;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_ListIterator$Class', function (i, type) {
C$.$init$.apply(this);
this.i = i;
this.type = type;
}, 1);

Clazz.newMethod$(C$, 'hasNext', function () {
return this.i.hasNext ();
});

Clazz.newMethod$(C$, 'next', function () {
return this.i.next ();
});

Clazz.newMethod$(C$, 'remove', function () {
this.i.remove ();
});

Clazz.newMethod$(C$, 'hasPrevious', function () {
return this.i.hasPrevious ();
});

Clazz.newMethod$(C$, 'previous', function () {
return this.i.previous ();
});

Clazz.newMethod$(C$, 'nextIndex', function () {
return this.i.nextIndex ();
});

Clazz.newMethod$(C$, 'previousIndex', function () {
return this.i.previousIndex ();
});

Clazz.newMethod$(C$, 'set$TE', function (obj) {
this.i.set$TE (java.util.Collections.checkType$TE$Class (obj, this.type));
});

Clazz.newMethod$(C$, 'add$TE', function (obj) {
this.i.add$TE (java.util.Collections.checkType$TE$Class (obj, this.type));
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "CheckedList", java.util.Collections.CheckedCollection, java.util.List);

Clazz.newMethod$(C$, '$init$', function () {
this.l = null;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_List$Class', function (l, type) {
C$.superClazz.construct$java_util_Collection$Class.apply(this, [l, type]);
C$.$init$.apply(this);
this.l = l;
}, 1);

Clazz.newMethod$(C$, 'addAll$I$java_util_Collection', function (index, c1) {
var size = c1.size ();
if (size == 0) {
return false;
}var arr =  Clazz.newArray$('OA', 1, [size]);
var it = c1.iterator ();
for (var i = 0; i < size; i++) {
arr[i] = java.util.Collections.checkType$TE$Class (it.next (), this.type);
}
return this.l.addAll$I$java_util_Collection (index, java.util.Arrays.asList$TEA (arr));
});

Clazz.newMethod$(C$, 'get$I', function (index) {
return this.l.get$I (index);
});

Clazz.newMethod$(C$, 'set$I$TE', function (index, obj) {
return this.l.set$I$TE (index, java.util.Collections.checkType$TE$Class (obj, this.type));
});

Clazz.newMethod$(C$, 'add$I$TE', function (index, obj) {
this.l.add$I$TE (index, java.util.Collections.checkType$TE$Class (obj, this.type));
});

Clazz.newMethod$(C$, 'remove$I', function (index) {
return this.l.remove$I (index);
});

Clazz.newMethod$(C$, 'indexOf$O', function (obj) {
return this.l.indexOf$O (obj);
});

Clazz.newMethod$(C$, 'lastIndexOf$O', function (obj) {
return this.l.lastIndexOf$O (obj);
});

Clazz.newMethod$(C$, 'listIterator', function () {
return Clazz.$new(java.util.Collections.CheckedListIterator.construct$java_util_ListIterator$Class,[this.l.listIterator (), this.type]);
});

Clazz.newMethod$(C$, 'listIterator$I', function (index) {
return Clazz.$new(java.util.Collections.CheckedListIterator.construct$java_util_ListIterator$Class,[this.l.listIterator$I (index), this.type]);
});

Clazz.newMethod$(C$, 'subList$I$I', function (fromIndex, toIndex) {
return java.util.Collections.checkedList$java_util_List$Class (this.l.subList$I$I (fromIndex, toIndex), this.type);
});

Clazz.newMethod$(C$, 'equals$O', function (obj) {
return this.l.equals$O (obj);
});

Clazz.newMethod$(C$, 'hashCode', function () {
return this.l.hashCode ();
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "CheckedRandomAccessList", java.util.Collections.CheckedList, java.util.RandomAccess);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_List$Class', function (l, type) {
C$.superClazz.construct$java_util_List$Class.apply(this, [l, type]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "CheckedSet", java.util.Collections.CheckedCollection, java.util.Set);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_Set$Class', function (s, type) {
C$.superClazz.construct$java_util_Collection$Class.apply(this, [s, type]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'equals$O', function (obj) {
return this.c.equals$O (obj);
});

Clazz.newMethod$(C$, 'hashCode', function () {
return this.c.hashCode ();
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "CheckedMap", null, [java.util.Map, java.io.Serializable]);

Clazz.newMethod$(C$, '$init$', function () {
this.m = null;
this.keyType = null;
this.valueType = null;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_Map$Class$Class', function (m, keyType, valueType) {
C$.$init$.apply(this);
if (m == null || keyType == null || valueType == null) {
throw Clazz.$new(NullPointerException.construct,[]);
}this.m = m;
this.keyType = keyType;
this.valueType = valueType;
}, 1);

Clazz.newMethod$(C$, 'size', function () {
return this.m.size ();
});

Clazz.newMethod$(C$, 'isEmpty', function () {
return this.m.isEmpty ();
});

Clazz.newMethod$(C$, 'containsKey$O', function (key) {
return this.m.containsKey$O (key);
});

Clazz.newMethod$(C$, 'containsValue$O', function (value) {
return this.m.containsValue$O (value);
});

Clazz.newMethod$(C$, 'get$O', function (key) {
return this.m.get$O (key);
});

Clazz.newMethod$(C$, 'put$TK$TV', function (key, value) {
return this.m.put$TK$TV (java.util.Collections.checkType$TK$Class (key, this.keyType), java.util.Collections.checkType$TV$Class (value, this.valueType));
});

Clazz.newMethod$(C$, 'remove$O', function (key) {
return this.m.remove$O (key);
});

Clazz.newMethod$(C$, 'putAll$java_util_Map', function (map) {
var size = map.size ();
if (size == 0) {
return;
}var entries =  Clazz.newArray$('java_util_Map_EntryA', 1, [size]);
var it = map.entrySet ().iterator ();
for (var i = 0; i < size; i++) {
var e = it.next ();
java.util.Collections.checkType$TK$Class (e.getKey (), this.keyType);
java.util.Collections.checkType$TV$Class (e.getValue (), this.valueType);
entries[i] = e;
}
for (var i = 0; i < size; i++) {
this.m.put$TK$TV (entries[i].getKey (), entries[i].getValue ());
}
});

Clazz.newMethod$(C$, 'clear', function () {
this.m.clear ();
});

Clazz.newMethod$(C$, 'keySet', function () {
return this.m.keySet ();
});

Clazz.newMethod$(C$, 'values', function () {
return this.m.values ();
});

Clazz.newMethod$(C$, 'entrySet', function () {
return Clazz.$new(java.util.Collections.CheckedMap.CheckedEntrySet.construct$java_util_Set$Class,[this.m.entrySet (), this.valueType]);
});

Clazz.newMethod$(C$, 'equals$O', function (obj) {
return this.m.equals$O (obj);
});

Clazz.newMethod$(C$, 'hashCode', function () {
return this.m.hashCode ();
});

Clazz.newMethod$(C$, 'toString', function () {
return this.m.toString ();
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections.CheckedMap, "CheckedEntry", null, java.util.Map.Entry);

Clazz.newMethod$(C$, '$init$', function () {
this.e = null;
this.valueType = null;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_Map_Entry$Class', function (e, valueType) {
C$.$init$.apply(this);
if (e == null) {
throw Clazz.$new(NullPointerException.construct,[]);
}this.e = e;
this.valueType = valueType;
}, 1);

Clazz.newMethod$(C$, 'getKey', function () {
return this.e.getKey ();
});

Clazz.newMethod$(C$, 'getValue', function () {
return this.e.getValue ();
});

Clazz.newMethod$(C$, 'setValue$TV', function (obj) {
return this.e.setValue$TV (java.util.Collections.checkType$TV$Class (obj, this.valueType));
});

Clazz.newMethod$(C$, 'equals$O', function (obj) {
return this.e.equals$O (obj);
});

Clazz.newMethod$(C$, 'hashCode', function () {
return this.e.hashCode ();
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections.CheckedMap, "CheckedEntrySet", null, java.util.Set);

Clazz.newMethod$(C$, '$init$', function () {
this.s = null;
this.valueType = null;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_Set$Class', function (s, valueType) {
C$.$init$.apply(this);
this.s = s;
this.valueType = valueType;
}, 1);

Clazz.newMethod$(C$, 'iterator', function () {
return Clazz.$new(java.util.Collections.CheckedMap.CheckedEntrySet.CheckedEntryIterator.construct$java_util_Iterator$Class,[this.s.iterator (), this.valueType]);
});

Clazz.newMethod$(C$, 'toArray', function () {
var thisSize = this.size ();
var array =  Clazz.newArray$('OA', 1, [thisSize]);
var it = this.iterator ();
for (var i = 0; i < thisSize; i++) {
array[i] = it.next ();
}
return array;
});

Clazz.newMethod$(C$, 'toArray$TTA', function (array) {
var thisSize = this.size ();
if (array.length < thisSize) {
var ct = array.getClass ().getComponentType ();
{
array = Clazz._newArrayType$(ct, thisSize);
}}var it = this.iterator ();
for (var i = 0; i < thisSize; i++) {
array[i] = it.next ();
}
if (thisSize < array.length) {
array[thisSize] = null;
}return array;
});

Clazz.newMethod$(C$, 'retainAll$java_util_Collection', function (c) {
return this.s.retainAll$java_util_Collection (c);
});

Clazz.newMethod$(C$, 'removeAll$java_util_Collection', function (c) {
return this.s.removeAll$java_util_Collection (c);
});

Clazz.newMethod$(C$, 'containsAll$java_util_Collection', function (c) {
return this.s.containsAll$java_util_Collection (c);
});

Clazz.newMethod$(C$, 'addAll$java_util_Collection', function (c) {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});

Clazz.newMethod$(C$, 'remove$O', function (o) {
return this.s.remove$O (o);
});

Clazz.newMethod$(C$, 'contains$O', function (o) {
return this.s.contains$O (o);
});

Clazz.newMethod$(C$, 'add$java_util_Map_Entry', function (o) {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});

Clazz.newMethod$(C$, 'isEmpty', function () {
return this.s.isEmpty ();
});

Clazz.newMethod$(C$, 'clear', function () {
this.s.clear ();
});

Clazz.newMethod$(C$, 'size', function () {
return this.s.size ();
});

Clazz.newMethod$(C$, 'hashCode', function () {
return this.s.hashCode ();
});

Clazz.newMethod$(C$, 'equals$O', function (object) {
return this.s.equals$O (object);
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections.CheckedMap.CheckedEntrySet, "CheckedEntryIterator", null, java.util.Iterator);

Clazz.newMethod$(C$, '$init$', function () {
this.i = null;
this.valueType = null;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_Iterator$Class', function (i, valueType) {
C$.$init$.apply(this);
this.i = i;
this.valueType = valueType;
}, 1);

Clazz.newMethod$(C$, 'hasNext', function () {
return this.i.hasNext ();
});

Clazz.newMethod$(C$, 'remove', function () {
this.i.remove ();
});

Clazz.newMethod$(C$, 'next', function () {
return Clazz.$new(java.util.Collections.CheckedMap.CheckedEntry.construct$java_util_Map_Entry$Class,[this.i.next (), this.valueType]);
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
})()
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "CheckedSortedSet", java.util.Collections.CheckedSet, java.util.SortedSet);

Clazz.newMethod$(C$, '$init$', function () {
this.ss = null;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_SortedSet$Class', function (s, type) {
C$.superClazz.construct$java_util_Set$Class.apply(this, [s, type]);
C$.$init$.apply(this);
this.ss = s;
}, 1);

Clazz.newMethod$(C$, 'comparator', function () {
return this.ss.comparator ();
});

Clazz.newMethod$(C$, 'subSet$TE$TE', function (fromElement, toElement) {
return Clazz.$new(java.util.Collections.CheckedSortedSet.construct$java_util_SortedSet$Class,[this.ss.subSet$TE$TE (fromElement, toElement), this.type]);
});

Clazz.newMethod$(C$, 'headSet$TE', function (toElement) {
return Clazz.$new(java.util.Collections.CheckedSortedSet.construct$java_util_SortedSet$Class,[this.ss.headSet$TE (toElement), this.type]);
});

Clazz.newMethod$(C$, 'tailSet$TE', function (fromElement) {
return Clazz.$new(java.util.Collections.CheckedSortedSet.construct$java_util_SortedSet$Class,[this.ss.tailSet$TE (fromElement), this.type]);
});

Clazz.newMethod$(C$, 'first', function () {
return this.ss.first ();
});

Clazz.newMethod$(C$, 'last', function () {
return this.ss.last ();
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Collections, "CheckedSortedMap", java.util.Collections.CheckedMap, java.util.SortedMap);

Clazz.newMethod$(C$, '$init$', function () {
this.sm = null;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_SortedMap$Class$Class', function (m, keyType, valueType) {
C$.superClazz.construct$java_util_Map$Class$Class.apply(this, [m, keyType, valueType]);
C$.$init$.apply(this);
this.sm = m;
}, 1);

Clazz.newMethod$(C$, 'comparator', function () {
return this.sm.comparator ();
});

Clazz.newMethod$(C$, 'subMap$TK$TK', function (fromKey, toKey) {
return Clazz.$new(java.util.Collections.CheckedSortedMap.construct$java_util_SortedMap$Class$Class,[this.sm.subMap$TK$TK (fromKey, toKey), this.keyType, this.valueType]);
});

Clazz.newMethod$(C$, 'headMap$TK', function (toKey) {
return Clazz.$new(java.util.Collections.CheckedSortedMap.construct$java_util_SortedMap$Class$Class,[this.sm.headMap$TK (toKey), this.keyType, this.valueType]);
});

Clazz.newMethod$(C$, 'tailMap$TK', function (fromKey) {
return Clazz.$new(java.util.Collections.CheckedSortedMap.construct$java_util_SortedMap$Class$Class,[this.sm.tailMap$TK (fromKey), this.keyType, this.valueType]);
});

Clazz.newMethod$(C$, 'firstKey', function () {
return this.sm.firstKey ();
});

Clazz.newMethod$(C$, 'lastKey', function () {
return this.sm.lastKey ();
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
Clazz.defineStatics (C$,
"EMPTY_LIST", Clazz.$new(java.util.Collections.EmptyList.construct,[]),
"EMPTY_SET", Clazz.$new(java.util.Collections.EmptySet.construct,[]),
"EMPTY_MAP", Clazz.$new(java.util.Collections.EmptyMap.construct,[]));
})()
});

//Created 2017-08-17 10:33:16
