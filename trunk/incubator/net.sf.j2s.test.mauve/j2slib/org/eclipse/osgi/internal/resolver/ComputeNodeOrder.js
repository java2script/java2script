Clazz.declarePackage ("org.eclipse.osgi.internal.resolver");
Clazz.load (["java.util.ArrayList", "$.HashMap"], "org.eclipse.osgi.internal.resolver.ComputeNodeOrder", ["java.lang.IllegalArgumentException", "java.util.Arrays"], function () {
c$ = Clazz.declareType (org.eclipse.osgi.internal.resolver, "ComputeNodeOrder");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.vertexList = null;
this.vertexMap = null;
this.time = 0;
this.initialized = false;
this.cycles = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.resolver.ComputeNodeOrder, "Digraph");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.color = "white";
this.predecessor = null;
this.finishTime = 0;
this.id = null;
this.adjacent = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.resolver.ComputeNodeOrder.Digraph, "Vertex");
Clazz.prepareFields (c$, function () {
this.adjacent =  new java.util.ArrayList (3);
});
Clazz.makeConstructor (c$, 
function (a) {
this.id = a;
}, "~O");
Clazz.defineStatics (c$,
"WHITE", "white",
"GREY", "grey",
"BLACK", "black");
c$ = Clazz.p0p ();
Clazz.prepareFields (c$, function () {
this.vertexList =  new java.util.ArrayList (100);
this.vertexMap =  new java.util.HashMap (100);
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "freeze", 
function () {
if (!this.initialized) {
this.initialized = true;
this.DFS ();
}});
Clazz.defineMethod (c$, "addVertex", 
function (a) {
if (this.initialized) {
throw  new IllegalArgumentException ();
}var b =  new org.eclipse.osgi.internal.resolver.ComputeNodeOrder.Digraph.Vertex (a);
var c = this.vertexMap.put (a, b);
if (c != null) {
throw  new IllegalArgumentException ();
}this.vertexList.add (b);
}, "~O");
Clazz.defineMethod (c$, "addEdge", 
function (a, b) {
if (this.initialized) {
throw  new IllegalArgumentException ();
}var c = this.vertexMap.get (a);
var d = this.vertexMap.get (b);
if (c == null || d == null) return ;
c.adjacent.add (d);
}, "~O,~O");
Clazz.defineMethod (c$, "idsByDFSFinishTime", 
function (a) {
if (!this.initialized) {
throw  new IllegalArgumentException ();
}var b = this.vertexList.size ();
var c =  new Array (b);
for (var d = this.vertexList.iterator (); d.hasNext (); ) {
var e = d.next ();
var f = e.finishTime;
if (a) {
c[f - 1] = e.id;
} else {
c[b - f] = e.id;
}}
return java.util.Arrays.asList (c);
}, "~B");
Clazz.defineMethod (c$, "containsCycles", 
function () {
if (!this.initialized) {
throw  new IllegalArgumentException ();
}return this.cycles;
});
Clazz.defineMethod (c$, "nonTrivialComponents", 
function () {
if (!this.initialized) {
throw  new IllegalArgumentException ();
}var a =  new java.util.HashMap ();
for (var b = this.vertexList.iterator (); b.hasNext (); ) {
var c = b.next ();
if (c.predecessor == null) {
} else {
var d = c;
while (d.predecessor != null) {
d = d.predecessor;
}
var e = a.get (d);
if (e == null) {
e =  new java.util.ArrayList (2);
e.add (d.id);
a.put (d, e);
}e.add (c.id);
}}
var c =  new java.util.ArrayList (a.size ());
for (var d = a.values ().iterator (); d.hasNext (); ) {
var e = d.next ();
if (e.size () > 1) {
c.add (e.toArray ());
}}
return c;
});
Clazz.defineMethod (c$, "DFS", 
($fz = function () {
var a;
var b = 1;
var c = 2;
var d = 3;
var e = 4;
var f =  new Integer (1);
var g =  new Integer (4);
this.time = 0;
var h =  new java.util.ArrayList (Math.max (1, this.vertexList.size ()));
var i = null;
var j = null;
var k = this.vertexList.iterator ();
a = 1;
nextStateLoop : while (true) {
switch (a) {
case 1:
if (!k.hasNext ()) {
break nextStateLoop;
}var l = k.next ();
if (l.color === "white") {
h.add (f);
j = l;
a = 2;
continue nextStateLoop;} else {
a = 1;
continue nextStateLoop;}case 2:
j.color = "grey";
i = j.adjacent.iterator ();
a = 3;
continue nextStateLoop;case 3:
if (i.hasNext ()) {
var m = i.next ();
if (m.color === "white") {
m.predecessor = j;
h.add (i);
h.add (j);
h.add (g);
j = m;
a = 2;
continue nextStateLoop;}if (m.color === "grey") {
this.cycles = true;
}a = 3;
continue nextStateLoop;} else {
j.color = "black";
this.time++;
j.finishTime = this.time;
a = (h.remove (h.size () - 1)).intValue ();
continue nextStateLoop;}case 4:
j = h.remove (h.size () - 1);
i = h.remove (h.size () - 1);
a = 3;
continue nextStateLoop;}
}
}, $fz.isPrivate = true, $fz));
c$ = Clazz.p0p ();
c$.computeNodeOrder = Clazz.defineMethod (c$, "computeNodeOrder", 
function (objects, references) {
var g1 =  new org.eclipse.osgi.internal.resolver.ComputeNodeOrder.Digraph ();
for (var i = 0; i < objects.length; i++) g1.addVertex (objects[i]);

for (var i = 0; i < references.length; i++) g1.addEdge (references[i][1], references[i][0]);

g1.freeze ();
var g2 =  new org.eclipse.osgi.internal.resolver.ComputeNodeOrder.Digraph ();
var resortedVertexes = g1.idsByDFSFinishTime (false);
for (var it = resortedVertexes.iterator (); it.hasNext (); ) g2.addVertex (it.next ());

for (var i = 0; i < references.length; i++) g2.addEdge (references[i][0], references[i][1]);

g2.freeze ();
var sortedProjectList = g2.idsByDFSFinishTime (true);
var orderedNodes =  new Array (sortedProjectList.size ());
sortedProjectList.toArray (orderedNodes);
var knots;
var hasCycles = g2.containsCycles ();
if (hasCycles) {
var knotList = g2.nonTrivialComponents ();
knots = knotList.toArray ( new Array (knotList.size ()));
} else {
knots =  new Array (0);
}for (var i = 0; i < orderedNodes.length; i++) objects[i] = orderedNodes[i];

return knots;
}, "~A,~A");
});
