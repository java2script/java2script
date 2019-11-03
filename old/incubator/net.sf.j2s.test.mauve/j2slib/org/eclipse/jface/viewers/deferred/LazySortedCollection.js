Clazz.declarePackage ("org.eclipse.jface.viewers.deferred");
Clazz.load (null, "org.eclipse.jface.viewers.deferred.LazySortedCollection", ["java.lang.InterruptedException", "org.eclipse.jface.util.Assert", "org.eclipse.jface.viewers.deferred.FastProgressReporter", "$.IntHashMap"], function () {
c$ = Clazz.decorateAsClass (function () {
this.MIN_CAPACITY = 8;
this.contents = null;
this.leftSubTree = null;
this.rightSubTree = null;
this.nextUnsorted = null;
this.treeSize = null;
this.parentTree = null;
this.root = -1;
this.lastNode = 0;
this.firstUnusedNode = -1;
this.objectIndices = null;
this.comparator = null;
this.enableDebug = false;
this.lazyRemovalFlag = null;
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.deferred.LazySortedCollection.Edge")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.startNode = 0;
this.direction = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers.deferred.LazySortedCollection, "Edge");
Clazz.makeConstructor (c$, 
($fz = function (a, b) {
this.startNode = a;
this.direction = b;
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "getStart", 
($fz = function () {
return this.startNode;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getTarget", 
($fz = function () {
if (this.startNode == -1) {
if (this.direction == 2) {
return this.b$["org.eclipse.jface.viewers.deferred.LazySortedCollection"].firstUnusedNode;
} else if (this.direction == 3) {
return this.b$["org.eclipse.jface.viewers.deferred.LazySortedCollection"].root;
}return -1;
}if (this.direction == 0) {
return this.b$["org.eclipse.jface.viewers.deferred.LazySortedCollection"].leftSubTree[this.startNode];
}if (this.direction == 1) {
return this.b$["org.eclipse.jface.viewers.deferred.LazySortedCollection"].rightSubTree[this.startNode];
}return this.b$["org.eclipse.jface.viewers.deferred.LazySortedCollection"].nextUnsorted[this.startNode];
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "isNull", 
($fz = function () {
return this.getTarget () == -1;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setTarget", 
($fz = function (a) {
if (this.direction == 0) {
this.b$["org.eclipse.jface.viewers.deferred.LazySortedCollection"].leftSubTree[this.startNode] = a;
} else if (this.direction == 1) {
this.b$["org.eclipse.jface.viewers.deferred.LazySortedCollection"].rightSubTree[this.startNode] = a;
} else if (this.direction == 2) {
this.b$["org.eclipse.jface.viewers.deferred.LazySortedCollection"].nextUnsorted[this.startNode] = a;
} else if (this.direction == 3) {
this.b$["org.eclipse.jface.viewers.deferred.LazySortedCollection"].root = a;
} else if (this.direction == 4) {
this.b$["org.eclipse.jface.viewers.deferred.LazySortedCollection"].firstUnusedNode = a;
}if (a != -1) {
this.b$["org.eclipse.jface.viewers.deferred.LazySortedCollection"].parentTree[a] = this.startNode;
}}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "advance", 
($fz = function (a) {
this.startNode = this.getTarget ();
this.direction = a;
}, $fz.isPrivate = true, $fz), "~N");
c$ = Clazz.p0p ();
}
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers.deferred, "LazySortedCollection");
Clazz.prepareFields (c$, function () {
this.contents =  new Array (8);
this.leftSubTree =  Clazz.newArray (8, 0);
this.rightSubTree =  Clazz.newArray (8, 0);
this.nextUnsorted =  Clazz.newArray (8, 0);
this.treeSize =  Clazz.newArray (8, 0);
this.parentTree =  Clazz.newArray (8, 0);
this.lazyRemovalFlag = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.deferred.LazySortedCollection$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers.deferred, "LazySortedCollection$1");
Clazz.overrideMethod (c$, "toString", 
function () {
return "Lazy removal flag";
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.deferred.LazySortedCollection$1, i$, v$);
}) (this, null);
});
Clazz.defineMethod (c$, "setRootNode", 
($fz = function (node) {
this.root = node;
if (node != -1) {
this.parentTree[node] = -1;
}}, $fz.isPrivate = true, $fz), "~N");
Clazz.makeConstructor (c$, 
function (c) {
this.comparator = c;
}, "java.util.Comparator");
Clazz.defineMethod (c$, "testInvariants", 
function () {
if (!this.enableDebug) {
return ;
}this.testInvariants (this.root);
});
Clazz.defineMethod (c$, "testInvariants", 
($fz = function (node) {
if (node == -1) {
return ;
}var treeSize = this.getSubtreeSize (node);
var left = this.leftSubTree[node];
var right = this.rightSubTree[node];
var unsorted = this.nextUnsorted[node];
if (this.isUnsorted (node)) {
org.eclipse.jface.util.Assert.isTrue (left == -1, "unsorted nodes shouldn't have a left subtree");
org.eclipse.jface.util.Assert.isTrue (right == -1, "unsorted nodes shouldn't have a right subtree");
}if (left != -1) {
this.testInvariants (left);
org.eclipse.jface.util.Assert.isTrue (this.parentTree[left] == node, "left node has invalid parent pointer");
}if (right != -1) {
this.testInvariants (right);
org.eclipse.jface.util.Assert.isTrue (this.parentTree[right] == node, "right node has invalid parent pointer");
}var previous = node;
while (unsorted != -1) {
var oldTreeSize = this.treeSize[unsorted];
this.recomputeTreeSize (unsorted);
org.eclipse.jface.util.Assert.isTrue (this.treeSize[unsorted] == oldTreeSize, "Invalid node size for unsorted node");
org.eclipse.jface.util.Assert.isTrue (this.leftSubTree[unsorted] == -1, "unsorted nodes shouldn't have left subtrees");
org.eclipse.jface.util.Assert.isTrue (this.rightSubTree[unsorted] == -1, "unsorted nodes shouldn't have right subtrees");
org.eclipse.jface.util.Assert.isTrue (this.parentTree[unsorted] == previous, "unsorted node has invalid parent pointer");
org.eclipse.jface.util.Assert.isTrue (this.contents[unsorted] !== this.lazyRemovalFlag, "unsorted nodes should not be lazily removed");
previous = unsorted;
unsorted = this.nextUnsorted[unsorted];
}
this.recomputeTreeSize (node);
org.eclipse.jface.util.Assert.isTrue (treeSize == this.getSubtreeSize (node), "invalid tree size");
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "isUnsorted", 
($fz = function (node) {
var parent = this.parentTree[node];
if (parent != -1) {
return this.nextUnsorted[parent] == node;
}return false;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "isLess", 
($fz = function (element1, element2) {
return this.comparator.compare (this.contents[element1], this.contents[element2]) < 0;
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "addUnsorted", 
($fz = function (subTree, elementToAdd) {
if (elementToAdd == -1) {
return subTree;
}if (subTree == -1) {
this.nextUnsorted[elementToAdd] = -1;
this.treeSize[elementToAdd] = 1;
return elementToAdd;
}if (this.treeSize[subTree] == 0) {
this.removeSubTree (subTree);
this.nextUnsorted[elementToAdd] = -1;
this.treeSize[elementToAdd] = 1;
return elementToAdd;
}var addedTreeSize = this.treeSize[elementToAdd];
if (!this.enableDebug && this.leftSubTree[subTree] == -1 && this.rightSubTree[subTree] == -1 && this.leftSubTree[elementToAdd] == -1 && this.rightSubTree[elementToAdd] == -1) {
($t$ = org.eclipse.jface.viewers.deferred.LazySortedCollection.counter --, org.eclipse.jface.viewers.deferred.LazySortedCollection.prototype.counter = org.eclipse.jface.viewers.deferred.LazySortedCollection.counter, $t$);
if (org.eclipse.jface.viewers.deferred.LazySortedCollection.counter % this.treeSize[subTree] == 0) {
this.nextUnsorted[elementToAdd] = subTree;
this.parentTree[elementToAdd] = this.parentTree[subTree];
this.parentTree[subTree] = elementToAdd;
this.treeSize[elementToAdd] = this.treeSize[subTree] + 1;
return elementToAdd;
}}var oldNextUnsorted = this.nextUnsorted[subTree];
this.nextUnsorted[elementToAdd] = oldNextUnsorted;
if (oldNextUnsorted == -1) {
this.treeSize[elementToAdd] = 1;
} else {
this.treeSize[elementToAdd] = this.treeSize[oldNextUnsorted] + 1;
this.parentTree[oldNextUnsorted] = elementToAdd;
}this.parentTree[elementToAdd] = subTree;
this.nextUnsorted[subTree] = elementToAdd;
this.treeSize[subTree]++;
return subTree;
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "size", 
function () {
var result = this.getSubtreeSize (this.root);
this.testInvariants ();
return result;
});
Clazz.defineMethod (c$, "partition", 
($fz = function (subTree, toMove) {
var result = this.nextUnsorted[toMove];
if (this.isLess (toMove, subTree)) {
var nextLeft = this.addUnsorted (this.leftSubTree[subTree], toMove);
this.leftSubTree[subTree] = nextLeft;
this.parentTree[nextLeft] = subTree;
} else {
var nextRight = this.addUnsorted (this.rightSubTree[subTree], toMove);
this.rightSubTree[subTree] = nextRight;
this.parentTree[nextRight] = subTree;
}return result;
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "partition", 
($fz = function (subTree, mon) {
if (subTree == -1) {
return -1;
}if (this.contents[subTree] === this.lazyRemovalFlag) {
subTree = this.removeNode (subTree);
if (subTree == -1) {
return -1;
}}for (var idx = this.nextUnsorted[subTree]; idx != -1; ) {
idx = this.partition (subTree, idx);
this.nextUnsorted[subTree] = idx;
if (idx != -1) {
this.parentTree[idx] = subTree;
}if (mon.isCanceled ()) {
throw  new InterruptedException ();
}}
this.nextUnsorted[subTree] = -1;
return subTree;
}, $fz.isPrivate = true, $fz), "~N,org.eclipse.jface.viewers.deferred.FastProgressReporter");
Clazz.defineMethod (c$, "getSubtreeSize", 
($fz = function (subTree) {
if (subTree == -1) {
return 0;
}return this.treeSize[subTree];
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "setCapacity", 
function (newSize) {
if (newSize > this.contents.length) {
this.setArraySize (newSize);
}}, "~N");
Clazz.defineMethod (c$, "setArraySize", 
($fz = function (newCapacity) {
var newContents =  new Array (newCapacity);
System.arraycopy (this.contents, 0, newContents, 0, this.lastNode);
this.contents = newContents;
var newLeftSubTree =  Clazz.newArray (newCapacity, 0);
System.arraycopy (this.leftSubTree, 0, newLeftSubTree, 0, this.lastNode);
this.leftSubTree = newLeftSubTree;
var newRightSubTree =  Clazz.newArray (newCapacity, 0);
System.arraycopy (this.rightSubTree, 0, newRightSubTree, 0, this.lastNode);
this.rightSubTree = newRightSubTree;
var newNextUnsorted =  Clazz.newArray (newCapacity, 0);
System.arraycopy (this.nextUnsorted, 0, newNextUnsorted, 0, this.lastNode);
this.nextUnsorted = newNextUnsorted;
var newTreeSize =  Clazz.newArray (newCapacity, 0);
System.arraycopy (this.treeSize, 0, newTreeSize, 0, this.lastNode);
this.treeSize = newTreeSize;
var newParentTree =  Clazz.newArray (newCapacity, 0);
System.arraycopy (this.parentTree, 0, newParentTree, 0, this.lastNode);
this.parentTree = newParentTree;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "createNode", 
($fz = function (value) {
var result = -1;
if (this.firstUnusedNode == -1) {
result = this.lastNode;
if (this.contents.length <= this.lastNode) {
this.setCapacity (this.lastNode * 2);
}this.lastNode++;
} else {
result = this.firstUnusedNode;
this.firstUnusedNode = this.nextUnsorted[result];
}this.contents[result] = value;
this.treeSize[result] = 1;
this.leftSubTree[result] = -1;
this.rightSubTree[result] = -1;
this.nextUnsorted[result] = -1;
if (this.objectIndices != null) {
this.objectIndices.put (value, result);
}return result;
}, $fz.isPrivate = true, $fz), "~O");
Clazz.defineMethod (c$, "getObjectIndex", 
($fz = function (value) {
if (this.objectIndices == null) {
var result = -1;
this.objectIndices =  new org.eclipse.jface.viewers.deferred.IntHashMap (Math.round ((this.contents.length / 0.75)) + 1, 0.75);
for (var i = 0; i < this.lastNode; i++) {
var element = this.contents[i];
if (element != null && element !== this.lazyRemovalFlag) {
this.objectIndices.put (element, i);
if (value === element) {
result = i;
}}}
return result;
}return this.objectIndices.get (value, -1);
}, $fz.isPrivate = true, $fz), "~O");
Clazz.defineMethod (c$, "replaceNode", 
($fz = function (nodeToReplace, replacementNode) {
var parent = this.parentTree[nodeToReplace];
if (parent == -1) {
if (this.root == nodeToReplace) {
this.setRootNode (replacementNode);
}} else {
if (this.leftSubTree[parent] == nodeToReplace) {
this.leftSubTree[parent] = replacementNode;
} else if (this.rightSubTree[parent] == nodeToReplace) {
this.rightSubTree[parent] = replacementNode;
} else if (this.nextUnsorted[parent] == nodeToReplace) {
this.nextUnsorted[parent] = replacementNode;
}if (replacementNode != -1) {
this.parentTree[replacementNode] = parent;
}}}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "recomputeAncestorTreeSizes", 
($fz = function (node) {
while (node != -1) {
var oldSize = this.treeSize[node];
this.recomputeTreeSize (node);
if (this.treeSize[node] == oldSize) {
break;
}node = this.parentTree[node];
}
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "recomputeTreeSize", 
($fz = function (node) {
if (node == -1) {
return ;
}this.treeSize[node] = this.getSubtreeSize (this.leftSubTree[node]) + this.getSubtreeSize (this.rightSubTree[node]) + this.getSubtreeSize (this.nextUnsorted[node]) + (this.contents[node] === this.lazyRemovalFlag ? 0 : 1);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "forceRecomputeTreeSize", 
($fz = function (toRecompute, whereToStop) {
while (toRecompute != -1 && toRecompute != whereToStop) {
this.recomputeTreeSize (toRecompute);
toRecompute = this.parentTree[toRecompute];
}
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "destroyNode", 
($fz = function (nodeToDestroy) {
if (this.objectIndices != null) {
var oldContents = this.contents[nodeToDestroy];
if (oldContents !== this.lazyRemovalFlag) {
this.objectIndices.remove (oldContents);
}}this.contents[nodeToDestroy] = null;
this.leftSubTree[nodeToDestroy] = -1;
this.rightSubTree[nodeToDestroy] = -1;
if (this.firstUnusedNode == -1) {
this.treeSize[nodeToDestroy] = 1;
} else {
this.treeSize[nodeToDestroy] = this.treeSize[this.firstUnusedNode] + 1;
this.parentTree[this.firstUnusedNode] = nodeToDestroy;
}this.nextUnsorted[nodeToDestroy] = this.firstUnusedNode;
this.firstUnusedNode = nodeToDestroy;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "pack", 
($fz = function () {
if (this.firstUnusedNode == -1) {
return ;
}var reusableNodes = this.getSubtreeSize (this.firstUnusedNode);
var nonPackableNodes = this.lastNode - reusableNodes;
if (this.contents.length < 8 || nonPackableNodes > Math.floor (this.contents.length / 4)) {
return ;
}this.objectIndices = null;
var mapNewIdxOntoOld =  Clazz.newArray (this.contents.length, 0);
var mapOldIdxOntoNew =  Clazz.newArray (this.contents.length, 0);
var nextNewIdx = 0;
for (var oldIdx = 0; oldIdx < this.lastNode; oldIdx++) {
if (this.contents[oldIdx] != null) {
mapOldIdxOntoNew[oldIdx] = nextNewIdx;
mapNewIdxOntoOld[nextNewIdx] = oldIdx;
nextNewIdx++;
} else {
mapOldIdxOntoNew[oldIdx] = -1;
}}
var newNodes = nextNewIdx;
var newCapacity = Math.max (newNodes * 2, 8);
var newContents =  new Array (newCapacity);
var newTreeSize =  Clazz.newArray (newCapacity, 0);
var newNextUnsorted =  Clazz.newArray (newCapacity, 0);
var newLeftSubTree =  Clazz.newArray (newCapacity, 0);
var newRightSubTree =  Clazz.newArray (newCapacity, 0);
var newParentTree =  Clazz.newArray (newCapacity, 0);
for (var newIdx = 0; newIdx < newNodes; newIdx++) {
var oldIdx = mapNewIdxOntoOld[newIdx];
newContents[newIdx] = this.contents[oldIdx];
newTreeSize[newIdx] = this.treeSize[oldIdx];
var left = this.leftSubTree[oldIdx];
if (left == -1) {
newLeftSubTree[newIdx] = -1;
} else {
newLeftSubTree[newIdx] = mapOldIdxOntoNew[left];
}var right = this.rightSubTree[oldIdx];
if (right == -1) {
newRightSubTree[newIdx] = -1;
} else {
newRightSubTree[newIdx] = mapOldIdxOntoNew[right];
}var unsorted = this.nextUnsorted[oldIdx];
if (unsorted == -1) {
newNextUnsorted[newIdx] = -1;
} else {
newNextUnsorted[newIdx] = mapOldIdxOntoNew[unsorted];
}var parent = this.parentTree[oldIdx];
if (parent == -1) {
newParentTree[newIdx] = -1;
} else {
newParentTree[newIdx] = mapOldIdxOntoNew[parent];
}}
this.contents = newContents;
this.nextUnsorted = newNextUnsorted;
this.treeSize = newTreeSize;
this.leftSubTree = newLeftSubTree;
this.rightSubTree = newRightSubTree;
this.parentTree = newParentTree;
if (this.root != -1) {
this.root = mapOldIdxOntoNew[this.root];
}this.firstUnusedNode = -1;
this.lastNode = newNodes;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "add", 
function (toAdd) {
org.eclipse.jface.util.Assert.isNotNull (toAdd);
var newIdx = this.createNode (toAdd);
this.setRootNode (this.addUnsorted (this.root, newIdx));
this.testInvariants ();
}, "~O");
Clazz.defineMethod (c$, "addAll", 
function (toAdd) {
org.eclipse.jface.util.Assert.isNotNull (toAdd);
var iter = toAdd.iterator ();
while (iter.hasNext ()) {
this.add (iter.next ());
}
this.testInvariants ();
}, "java.util.Collection");
Clazz.defineMethod (c$, "addAll", 
function (toAdd) {
org.eclipse.jface.util.Assert.isNotNull (toAdd);
for (var i = 0; i < toAdd.length; i++) {
var object = toAdd[i];
this.add (object);
}
this.testInvariants ();
}, "~A");
Clazz.defineMethod (c$, "isEmpty", 
function () {
var result = (this.root == -1);
this.testInvariants ();
return result;
});
Clazz.defineMethod (c$, "remove", 
function (toRemove) {
this.internalRemove (toRemove);
this.pack ();
this.testInvariants ();
}, "~O");
Clazz.defineMethod (c$, "internalRemove", 
($fz = function (toRemove) {
var objectIndex = this.getObjectIndex (toRemove);
if (objectIndex != -1) {
var parent = this.parentTree[objectIndex];
this.lazyRemoveNode (objectIndex);
this.recomputeAncestorTreeSizes (parent);
}}, $fz.isPrivate = true, $fz), "~O");
Clazz.defineMethod (c$, "removeAll", 
function (toRemove) {
org.eclipse.jface.util.Assert.isNotNull (toRemove);
for (var i = 0; i < toRemove.length; i++) {
var object = toRemove[i];
this.internalRemove (object);
}
this.pack ();
}, "~A");
Clazz.defineMethod (c$, "retainFirst", 
function (n, mon) {
var sz = this.size ();
if (n >= sz) {
return ;
}this.removeRange (n, sz - n, mon);
this.testInvariants ();
}, "~N,org.eclipse.jface.viewers.deferred.FastProgressReporter");
Clazz.defineMethod (c$, "retainFirst", 
function (n) {
try {
this.retainFirst (n,  new org.eclipse.jface.viewers.deferred.FastProgressReporter ());
} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
} else {
throw e;
}
}
this.testInvariants ();
}, "~N");
Clazz.defineMethod (c$, "removeRange", 
function (first, length) {
try {
this.removeRange (first, length,  new org.eclipse.jface.viewers.deferred.FastProgressReporter ());
} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
} else {
throw e;
}
}
this.testInvariants ();
}, "~N,~N");
Clazz.defineMethod (c$, "removeRange", 
function (first, length, mon) {
this.removeRange (this.root, first, length, mon);
this.pack ();
this.testInvariants ();
}, "~N,~N,org.eclipse.jface.viewers.deferred.FastProgressReporter");
Clazz.defineMethod (c$, "removeRange", 
($fz = function (node, rangeStart, rangeLength, mon) {
if (rangeLength == 0) {
return ;
}var size = this.getSubtreeSize (node);
if (size <= rangeStart) {
return ;
}if (rangeStart == 0 && rangeLength >= size) {
this.removeSubTree (node);
return ;
}try {
node = this.partition (node, mon);
var left = this.leftSubTree[node];
var leftSize = this.getSubtreeSize (left);
var toRemoveFromLeft = Math.min (leftSize - rangeStart, rangeLength);
if (toRemoveFromLeft >= 0) {
this.removeRange (this.leftSubTree[node], rangeStart, toRemoveFromLeft, mon);
var toRemoveFromRight = rangeStart + rangeLength - leftSize - 1;
if (toRemoveFromRight >= 0) {
this.removeRange (this.rightSubTree[node], 0, toRemoveFromRight, mon);
this.removeNode (node);
return ;
}} else {
this.removeRange (this.rightSubTree[node], rangeStart - leftSize - 1, rangeLength, mon);
}} finally {
this.recomputeTreeSize (node);
}
}, $fz.isPrivate = true, $fz), "~N,~N,~N,org.eclipse.jface.viewers.deferred.FastProgressReporter");
Clazz.defineMethod (c$, "removeSubTree", 
($fz = function (subTree) {
if (subTree == -1) {
return ;
}for (var next = this.nextUnsorted[subTree]; next != -1; ) {
var current = next;
next = this.nextUnsorted[next];
this.destroyNode (current);
}
this.removeSubTree (this.leftSubTree[subTree]);
this.removeSubTree (this.rightSubTree[subTree]);
this.replaceNode (subTree, -1);
this.destroyNode (subTree);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "lazyRemoveNode", 
($fz = function (subTree) {
var left = this.leftSubTree[subTree];
var right = this.rightSubTree[subTree];
if (left == -1 && right == -1) {
var result = this.nextUnsorted[subTree];
this.replaceNode (subTree, result);
this.destroyNode (subTree);
return result;
}var value = this.contents[subTree];
this.contents[subTree] = this.lazyRemovalFlag;
this.treeSize[subTree]--;
if (this.objectIndices != null) {
this.objectIndices.remove (value);
}return subTree;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "removeNode", 
($fz = function (subTree) {
var left = this.leftSubTree[subTree];
var right = this.rightSubTree[subTree];
if (left == -1 || right == -1) {
var result = -1;
if (left == -1 && right == -1) {
result = this.nextUnsorted[subTree];
} else {
if (left == -1) {
result = right;
} else {
result = left;
}try {
result = this.partition (result,  new org.eclipse.jface.viewers.deferred.FastProgressReporter ());
} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
} else {
throw e;
}
}
if (result == -1) {
result = this.nextUnsorted[subTree];
} else {
var unsorted = this.nextUnsorted[subTree];
this.nextUnsorted[result] = unsorted;
var additionalNodes = 0;
if (unsorted != -1) {
this.parentTree[unsorted] = result;
additionalNodes = this.treeSize[unsorted];
}this.treeSize[result] += additionalNodes;
}}this.replaceNode (subTree, result);
this.destroyNode (subTree);
return result;
}var nextSmallest = Clazz.innerTypeInstance (org.eclipse.jface.viewers.deferred.LazySortedCollection.Edge, this, null, subTree, 0);
while (!nextSmallest.isNull ()) {
nextSmallest.advance (1);
}
var nextLargest = Clazz.innerTypeInstance (org.eclipse.jface.viewers.deferred.LazySortedCollection.Edge, this, null, subTree, 1);
while (!nextLargest.isNull ()) {
nextLargest.advance (0);
}
var replacementNode = -1;
var leftSize = this.getSubtreeSize (left);
var rightSize = this.getSubtreeSize (right);
if (leftSize > rightSize) {
replacementNode = nextSmallest.getStart ();
var unsorted = Clazz.innerTypeInstance (org.eclipse.jface.viewers.deferred.LazySortedCollection.Edge, this, null, replacementNode, 2);
while (!unsorted.isNull ()) {
var target = unsorted.getTarget ();
if (!this.isLess (target, replacementNode)) {
unsorted.setTarget (this.nextUnsorted[target]);
nextLargest.setTarget (this.addUnsorted (nextLargest.getTarget (), target));
} else {
unsorted.advance (2);
}}
this.forceRecomputeTreeSize (unsorted.getStart (), replacementNode);
this.forceRecomputeTreeSize (nextLargest.getStart (), subTree);
} else {
replacementNode = nextLargest.getStart ();
var unsorted = Clazz.innerTypeInstance (org.eclipse.jface.viewers.deferred.LazySortedCollection.Edge, this, null, replacementNode, 2);
while (!unsorted.isNull ()) {
var target = unsorted.getTarget ();
if (this.isLess (target, replacementNode)) {
unsorted.setTarget (this.nextUnsorted[target]);
nextSmallest.setTarget (this.addUnsorted (nextSmallest.getTarget (), target));
} else {
unsorted.advance (2);
}}
this.forceRecomputeTreeSize (unsorted.getStart (), replacementNode);
this.forceRecomputeTreeSize (nextSmallest.getStart (), subTree);
}var replacementContent = this.contents[replacementNode];
this.contents[replacementNode] = this.contents[subTree];
this.contents[subTree] = replacementContent;
if (this.objectIndices != null) {
this.objectIndices.put (replacementContent, subTree);
}var replacementParent = this.parentTree[replacementNode];
this.replaceNode (replacementNode, this.removeNode (replacementNode));
this.forceRecomputeTreeSize (replacementParent, subTree);
this.recomputeTreeSize (subTree);
return subTree;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "clear", 
function () {
this.lastNode = 0;
this.setArraySize (8);
this.root = -1;
this.firstUnusedNode = -1;
this.objectIndices = null;
this.testInvariants ();
});
Clazz.defineMethod (c$, "getComparator", 
function () {
return this.comparator;
});
Clazz.defineMethod (c$, "getFirst", 
function (result, sorted, mon) {
var returnValue = this.getRange (result, 0, sorted, mon);
this.testInvariants ();
return returnValue;
}, "~A,~B,org.eclipse.jface.viewers.deferred.FastProgressReporter");
Clazz.defineMethod (c$, "getFirst", 
function (result, sorted) {
var returnValue = 0;
try {
returnValue = this.getFirst (result, sorted,  new org.eclipse.jface.viewers.deferred.FastProgressReporter ());
} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
} else {
throw e;
}
}
this.testInvariants ();
return returnValue;
}, "~A,~B");
Clazz.defineMethod (c$, "getRange", 
function (result, rangeStart, sorted, mon) {
return this.getRange (result, 0, rangeStart, this.root, sorted, mon);
}, "~A,~N,~B,org.eclipse.jface.viewers.deferred.FastProgressReporter");
Clazz.defineMethod (c$, "getRange", 
function (result, rangeStart, sorted) {
var returnValue = 0;
try {
returnValue = this.getRange (result, rangeStart, sorted,  new org.eclipse.jface.viewers.deferred.FastProgressReporter ());
} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
} else {
throw e;
}
}
this.testInvariants ();
return returnValue;
}, "~A,~N,~B");
Clazz.defineMethod (c$, "getItem", 
function (index) {
var result =  new Array (1);
try {
this.getRange (result, index, false,  new org.eclipse.jface.viewers.deferred.FastProgressReporter ());
} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
} else {
throw e;
}
}
var returnValue = result[0];
this.testInvariants ();
return returnValue;
}, "~N");
Clazz.defineMethod (c$, "getItems", 
function (sorted) {
var result =  new Array (this.size ());
this.getRange (result, 0, sorted);
return result;
}, "~B");
Clazz.defineMethod (c$, "getRange", 
($fz = function (result, resultIdx, rangeStart, node, sorted, mon) {
if (node == -1) {
return 0;
}var availableSpace = result.length - resultIdx;
if (rangeStart == 0) {
if (this.treeSize[node] <= availableSpace) {
return this.getChildren (result, resultIdx, node, sorted, mon);
}}node = this.partition (node, mon);
if (node == -1) {
return 0;
}var inserted = 0;
var numberLessThanNode = this.getSubtreeSize (this.leftSubTree[node]);
if (rangeStart < numberLessThanNode) {
if (inserted < availableSpace) {
inserted += this.getRange (result, resultIdx, rangeStart, this.leftSubTree[node], sorted, mon);
}}if (rangeStart <= numberLessThanNode) {
if (inserted < availableSpace) {
result[resultIdx + inserted] = this.contents[node];
inserted++;
}}if (inserted < availableSpace) {
inserted += this.getRange (result, resultIdx + inserted, Math.max (rangeStart - numberLessThanNode - 1, 0), this.rightSubTree[node], sorted, mon);
}return inserted;
}, $fz.isPrivate = true, $fz), "~A,~N,~N,~N,~B,org.eclipse.jface.viewers.deferred.FastProgressReporter");
Clazz.defineMethod (c$, "getChildren", 
($fz = function (result, resultIdx, node, sorted, mon) {
if (node == -1) {
return 0;
}var tempIdx = resultIdx;
if (sorted) {
node = this.partition (node, mon);
if (node == -1) {
return 0;
}}if (tempIdx < result.length) {
tempIdx += this.getChildren (result, tempIdx, this.leftSubTree[node], sorted, mon);
}if (tempIdx < result.length) {
var value = this.contents[node];
if (value !== this.lazyRemovalFlag) {
result[tempIdx++] = value;
}}if (tempIdx < result.length) {
tempIdx += this.getChildren (result, tempIdx, this.rightSubTree[node], sorted, mon);
}for (var unsortedNode = this.nextUnsorted[node]; unsortedNode != -1 && tempIdx < result.length; unsortedNode = this.nextUnsorted[unsortedNode]) {
result[tempIdx++] = this.contents[unsortedNode];
}
return tempIdx - resultIdx;
}, $fz.isPrivate = true, $fz), "~A,~N,~N,~B,org.eclipse.jface.viewers.deferred.FastProgressReporter");
Clazz.defineMethod (c$, "contains", 
function (item) {
org.eclipse.jface.util.Assert.isNotNull (item);
var returnValue = (this.getObjectIndex (item) != -1);
this.testInvariants ();
return returnValue;
}, "~O");
Clazz.defineStatics (c$,
"loadFactor", 0.75,
"counter", 0,
"DIR_LEFT", 0,
"DIR_RIGHT", 1,
"DIR_UNSORTED", 2,
"DIR_ROOT", 3,
"DIR_UNUSED", 4);
});
