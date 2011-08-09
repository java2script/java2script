Clazz.declarePackage ("org.eclipse.core.internal.jobs");
Clazz.load (null, "org.eclipse.core.internal.jobs.Queue", ["java.lang.StringBuffer", "java.util.ArrayList", "$.Arrays"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$elements = null;
this.head = 0;
this.reuse = false;
this.tail = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.jobs, "Queue");
Clazz.makeConstructor (c$, 
function () {
this.construct (20, false);
});
Clazz.makeConstructor (c$, 
function (size, reuse) {
this.$elements =  new Array (size);
this.head = this.tail = 0;
this.reuse = reuse;
}, "~N,~B");
Clazz.defineMethod (c$, "enqueue", 
function (element) {
var newTail = this.increment (this.tail);
if (newTail == this.head) {
this.grow ();
newTail = this.tail + 1;
}this.$elements[this.tail] = element;
this.tail = newTail;
}, "~O");
Clazz.defineMethod (c$, "decrement", 
function (index) {
return (index == 0) ? (this.$elements.length - 1) : index - 1;
}, "~N");
Clazz.defineMethod (c$, "elements", 
function () {
if (this.isEmpty ()) return  new java.util.ArrayList (0).iterator ();
if (this.head <= this.tail) return java.util.Arrays.asList (this.$elements).iterator ();
var newElements =  new Array (this.size ());
var end = (this.$elements.length - this.head);
System.arraycopy (this.$elements, this.head, newElements, 0, end);
System.arraycopy (this.$elements, 0, newElements, end, this.tail);
return java.util.Arrays.asList (newElements).iterator ();
});
Clazz.defineMethod (c$, "get", 
function (o) {
var index = this.head;
while (index != this.tail) {
if (this.$elements[index].equals (o)) return this.$elements[index];
index = this.increment (index);
}
return null;
}, "~O");
Clazz.defineMethod (c$, "remove", 
function (o) {
var index = this.head;
while (index != this.tail) {
if (this.$elements[index].equals (o)) break;
index = this.increment (index);
}
if (index == this.tail) return false;
var toRemove = this.$elements[index];
var nextIndex = -1;
while (index != this.tail) {
nextIndex = this.increment (index);
if (nextIndex != this.tail) this.$elements[index] = this.$elements[nextIndex];
index = nextIndex;
}
this.tail = this.decrement (this.tail);
this.$elements[this.tail] = this.reuse ? toRemove : null;
return true;
}, "~O");
Clazz.defineMethod (c$, "grow", 
function () {
var newSize = Math.round ((this.$elements.length * 1.5));
var newElements =  new Array (newSize);
if (this.tail >= this.head) System.arraycopy (this.$elements, this.head, newElements, this.head, this.size ());
 else {
var newHead = newSize - (this.$elements.length - this.head);
System.arraycopy (this.$elements, 0, newElements, 0, this.tail + 1);
System.arraycopy (this.$elements, this.head, newElements, newHead, (newSize - newHead));
this.head = newHead;
}this.$elements = newElements;
});
Clazz.defineMethod (c$, "increment", 
function (index) {
return (index == (this.$elements.length - 1)) ? 0 : index + 1;
}, "~N");
Clazz.defineMethod (c$, "isEmpty", 
function () {
return this.tail == this.head;
});
Clazz.defineMethod (c$, "peek", 
function () {
return this.$elements[this.head];
});
Clazz.defineMethod (c$, "dequeue", 
function () {
if (this.isEmpty ()) return null;
var result = this.peek ();
if (!this.reuse) this.$elements[this.head] = null;
this.head = this.increment (this.head);
return result;
});
Clazz.defineMethod (c$, "size", 
function () {
return this.tail > this.head ? (this.tail - this.head) : ((this.$elements.length - this.head) + this.tail);
});
Clazz.overrideMethod (c$, "toString", 
function () {
var sb =  new StringBuffer ();
sb.append ("[");
if (!this.isEmpty ()) {
var it = this.elements ();
while (true) {
sb.append (it.next ());
if (it.hasNext ()) sb.append (", ");
 else break;
}
}sb.append ("]");
return sb.toString ();
});
});
