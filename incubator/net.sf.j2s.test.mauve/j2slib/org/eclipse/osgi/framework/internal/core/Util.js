Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (null, "org.eclipse.osgi.framework.internal.core.Util", ["java.lang.StringBuffer"], function () {
c$ = Clazz.declareType (org.eclipse.osgi.framework.internal.core, "Util");
c$.sort = Clazz.defineMethod (c$, "sort", 
function (array) {
org.eclipse.osgi.framework.internal.core.Util.qsort (array, 0, array.length - 1);
}, "~A");
c$.qsort = Clazz.defineMethod (c$, "qsort", 
function (array, start, stop) {
if (start >= stop) return ;
var left = start;
var right = stop;
var temp;
var mid = String.valueOf (array[Math.floor ((start + stop) / 2)]);
while (left <= right) {
while ((left < stop) && (String.valueOf (array[left]).compareTo (mid) < 0)) {
++left;
}
while ((right > start) && (mid.compareTo (String.valueOf (array[right])) < 0)) {
--right;
}
if (left <= right) {
temp = array[left];
array[left] = array[right];
array[right] = temp;
++left;
--right;
}}
if (start < right) {
org.eclipse.osgi.framework.internal.core.Util.qsort (array, start, right);
}if (left < stop) {
org.eclipse.osgi.framework.internal.core.Util.qsort (array, left, stop);
}}, "~A,~N,~N");
c$.sort = Clazz.defineMethod (c$, "sort", 
function (array, start, end) {
var middle = Math.floor ((start + end) / 2);
if (start + 1 < middle) org.eclipse.osgi.framework.internal.core.Util.sort (array, start, middle);
if (middle + 1 < end) org.eclipse.osgi.framework.internal.core.Util.sort (array, middle, end);
if (start + 1 >= end) return ;
if ((array[middle - 1]).compareTo (array[middle]) <= 0) return ;
if (start + 2 == end) {
var temp = array[start];
array[start] = array[middle];
array[middle] = temp;
return ;
}var i1 = start;
var i2 = middle;
var i3 = 0;
var merge =  new Array (end - start);
while (i1 < middle && i2 < end) {
merge[i3++] = (array[i1]).compareTo (array[i2]) <= 0 ? array[i1++] : array[i2++];
}
if (i1 < middle) System.arraycopy (array, i1, merge, i3, middle - i1);
System.arraycopy (merge, 0, array, start, i2 - start);
}, "~A,~N,~N");
c$.dsort = Clazz.defineMethod (c$, "dsort", 
function (array, start, end) {
org.eclipse.osgi.framework.internal.core.Util.sort (array, start, end);
org.eclipse.osgi.framework.internal.core.Util.swap (array);
}, "~A,~N,~N");
c$.swap = Clazz.defineMethod (c$, "swap", 
function (array) {
var start = 0;
var end = array.length - 1;
while (start < end) {
var temp = array[start];
array[start++] = array[end];
array[end--] = temp;
}
}, "~A");
c$.toString = Clazz.defineMethod (c$, "toString", 
function (object, length) {
var onLeft = Clazz.instanceOf (object, Number);
return org.eclipse.osgi.framework.internal.core.Util.toString (object, length, ' ', onLeft);
}, "~O,~N");
c$.toString = Clazz.defineMethod (c$, "toString", 
function (object, length, pad, onLeft) {
var input = String.valueOf (object);
var size = input.length;
if (size >= length) {
var start = (onLeft) ? size - length : 0;
return input.substring (start, length);
}var padding =  new StringBuffer (length - size);
for (var i = size; i < length; i++) padding.append (pad);

var stringBuffer =  new StringBuffer (length);
if (onLeft) stringBuffer.append (padding.toString ());
stringBuffer.append (input);
if (!onLeft) stringBuffer.append (padding.toString ());
return stringBuffer.toString ();
}, "~O,~N,~N,~B");
});
