Clazz.declarePackage ("sun.awt.geom");
Clazz.load (null, "sun.awt.geom.AreaOp", ["java.lang.InternalError", "java.util.Arrays", "$.Vector", "sun.awt.geom.ChainEnd", "$.CurveLink", "$.Edge"], function () {
c$ = Clazz.declareType (sun.awt.geom, "AreaOp");
Clazz.defineMethod (c$, "calculate", 
function (left, right) {
var edges =  new java.util.Vector ();
sun.awt.geom.AreaOp.addEdges (edges, left, 0);
sun.awt.geom.AreaOp.addEdges (edges, right, 1);
edges = this.pruneEdges (edges);
if (false) {
System.out.println ("result: ");
var numcurves = edges.size ();
var curvelist = edges.toArray ( new Array (numcurves));
for (var i = 0; i < numcurves; i++) {
System.out.println ("curvelist[" + i + "] = " + curvelist[i]);
}
}return edges;
}, "java.util.Vector,java.util.Vector");
c$.addEdges = Clazz.defineMethod (c$, "addEdges", 
 function (edges, curves, curvetag) {
var enum_ = curves.elements ();
while (enum_.hasMoreElements ()) {
var c = enum_.nextElement ();
if (c.getOrder () > 0) {
edges.add ( new sun.awt.geom.Edge (c, curvetag));
}}
}, "java.util.Vector,java.util.Vector,~N");
Clazz.defineMethod (c$, "pruneEdges", 
 function (edges) {
var numedges = edges.size ();
if (numedges < 2) {
return edges;
}var edgelist = edges.toArray ( new Array (numedges));
java.util.Arrays.sort (edgelist, sun.awt.geom.AreaOp.YXTopComparator);
if (false) {
System.out.println ("pruning: ");
for (var i = 0; i < numedges; i++) {
System.out.println ("edgelist[" + i + "] = " + edgelist[i]);
}
}var e;
var left = 0;
var right = 0;
var cur = 0;
var next = 0;
var yrange =  Clazz.newDoubleArray (2, 0);
var subcurves =  new java.util.Vector ();
var chains =  new java.util.Vector ();
var links =  new java.util.Vector ();
while (left < numedges) {
var y = yrange[0];
for (cur = next = right - 1; cur >= left; cur--) {
e = edgelist[cur];
if (e.getCurve ().getYBot () > y) {
if (next > cur) {
edgelist[next] = e;
}next--;
}}
left = next + 1;
if (left >= right) {
if (right >= numedges) {
break;
}y = edgelist[right].getCurve ().getYTop ();
if (y > yrange[0]) {
sun.awt.geom.AreaOp.finalizeSubCurves (subcurves, chains);
}yrange[0] = y;
}while (right < numedges) {
e = edgelist[right];
if (e.getCurve ().getYTop () > y) {
break;
}right++;
}
yrange[1] = edgelist[left].getCurve ().getYBot ();
if (right < numedges) {
y = edgelist[right].getCurve ().getYTop ();
if (yrange[1] > y) {
yrange[1] = y;
}}if (false) {
System.out.println ("current line: y = [" + yrange[0] + ", " + yrange[1] + "]");
for (cur = left; cur < right; cur++) {
System.out.println ("  " + edgelist[cur]);
}
}var nexteq = 1;
for (cur = left; cur < right; cur++) {
e = edgelist[cur];
e.setEquivalence (0);
for (next = cur; next > left; next--) {
var prevedge = edgelist[next - 1];
var ordering = e.compareTo (prevedge, yrange);
if (yrange[1] <= yrange[0]) {
throw  new InternalError ("backstepping to " + yrange[1] + " from " + yrange[0]);
}if (ordering >= 0) {
if (ordering == 0) {
var eq = prevedge.getEquivalence ();
if (eq == 0) {
eq = nexteq++;
prevedge.setEquivalence (eq);
}e.setEquivalence (eq);
}break;
}edgelist[next] = prevedge;
}
edgelist[next] = e;
}
if (false) {
System.out.println ("current sorted line: y = [" + yrange[0] + ", " + yrange[1] + "]");
for (cur = left; cur < right; cur++) {
System.out.println ("  " + edgelist[cur]);
}
}this.newRow ();
var ystart = yrange[0];
var yend = yrange[1];
for (cur = left; cur < right; cur++) {
e = edgelist[cur];
var etag;
var eq = e.getEquivalence ();
if (eq != 0) {
var origstate = this.getState ();
etag = (origstate == 1 ? -1 : 1);
var activematch = null;
var longestmatch = e;
var furthesty = yend;
do {
this.classify (e);
if (activematch == null && e.isActiveFor (ystart, etag)) {
activematch = e;
}y = e.getCurve ().getYBot ();
if (y > furthesty) {
longestmatch = e;
furthesty = y;
}} while (++cur < right && (e = edgelist[cur]).getEquivalence () == eq);
--cur;
if (this.getState () == origstate) {
etag = 0;
} else {
e = (activematch != null ? activematch : longestmatch);
}} else {
etag = this.classify (e);
}if (etag != 0) {
e.record (yend, etag);
links.add ( new sun.awt.geom.CurveLink (e.getCurve (), ystart, yend, etag));
}}
if (this.getState () != -1) {
System.out.println ("Still inside at end of active edge list!");
System.out.println ("num curves = " + (right - left));
System.out.println ("num links = " + links.size ());
System.out.println ("y top = " + yrange[0]);
if (right < numedges) {
System.out.println ("y top of next curve = " + edgelist[right].getCurve ().getYTop ());
} else {
System.out.println ("no more curves");
}for (cur = left; cur < right; cur++) {
e = edgelist[cur];
System.out.println (e);
var eq = e.getEquivalence ();
if (eq != 0) {
System.out.println ("  was equal to " + eq + "...");
}}
}if (false) {
System.out.println ("new links:");
for (var i = 0; i < links.size (); i++) {
var link = links.elementAt (i);
System.out.println ("  " + link.getSubCurve ());
}
}sun.awt.geom.AreaOp.resolveLinks (subcurves, chains, links);
links.clear ();
yrange[0] = yend;
}
sun.awt.geom.AreaOp.finalizeSubCurves (subcurves, chains);
var ret =  new java.util.Vector ();
var enum_ = subcurves.elements ();
while (enum_.hasMoreElements ()) {
var link = enum_.nextElement ();
ret.add (link.getMoveto ());
var nextlink = link;
while ((nextlink = nextlink.getNext ()) != null) {
if (!link.absorb (nextlink)) {
ret.add (link.getSubCurve ());
link = nextlink;
}}
ret.add (link.getSubCurve ());
}
return ret;
}, "java.util.Vector");
c$.finalizeSubCurves = Clazz.defineMethod (c$, "finalizeSubCurves", 
function (subcurves, chains) {
var numchains = chains.size ();
if (numchains == 0) {
return;
}if ((numchains & 1) != 0) {
throw  new InternalError ("Odd number of chains!");
}var endlist =  new Array (numchains);
chains.toArray (endlist);
for (var i = 1; i < numchains; i += 2) {
var open = endlist[i - 1];
var close = endlist[i];
var subcurve = open.linkTo (close);
if (subcurve != null) {
subcurves.add (subcurve);
}}
chains.clear ();
}, "java.util.Vector,java.util.Vector");
c$.resolveLinks = Clazz.defineMethod (c$, "resolveLinks", 
function (subcurves, chains, links) {
var numlinks = links.size ();
var linklist;
if (numlinks == 0) {
linklist = sun.awt.geom.AreaOp.EmptyLinkList;
} else {
if ((numlinks & 1) != 0) {
throw  new InternalError ("Odd number of new curves!");
}linklist =  new Array (numlinks + 2);
links.toArray (linklist);
}var numchains = chains.size ();
var endlist;
if (numchains == 0) {
endlist = sun.awt.geom.AreaOp.EmptyChainList;
} else {
if ((numchains & 1) != 0) {
throw  new InternalError ("Odd number of chains!");
}endlist =  new Array (numchains + 2);
chains.toArray (endlist);
}var curchain = 0;
var curlink = 0;
chains.clear ();
var chain = endlist[0];
var nextchain = endlist[1];
var link = linklist[0];
var nextlink = linklist[1];
while (chain != null || link != null) {
var connectchains = (link == null);
var connectlinks = (chain == null);
if (!connectchains && !connectlinks) {
connectchains = ((curchain & 1) == 0 && chain.getX () == nextchain.getX ());
connectlinks = ((curlink & 1) == 0 && link.getX () == nextlink.getX ());
if (!connectchains && !connectlinks) {
var cx = chain.getX ();
var lx = link.getX ();
connectchains = (nextchain != null && cx < lx && sun.awt.geom.AreaOp.obstructs (nextchain.getX (), lx, curchain));
connectlinks = (nextlink != null && lx < cx && sun.awt.geom.AreaOp.obstructs (nextlink.getX (), cx, curlink));
}}if (connectchains) {
var subcurve = chain.linkTo (nextchain);
if (subcurve != null) {
subcurves.add (subcurve);
}curchain += 2;
chain = endlist[curchain];
nextchain = endlist[curchain + 1];
}if (connectlinks) {
var openend =  new sun.awt.geom.ChainEnd (link, null);
var closeend =  new sun.awt.geom.ChainEnd (nextlink, openend);
openend.setOtherEnd (closeend);
chains.add (openend);
chains.add (closeend);
curlink += 2;
link = linklist[curlink];
nextlink = linklist[curlink + 1];
}if (!connectchains && !connectlinks) {
chain.addLink (link);
chains.add (chain);
curchain++;
chain = nextchain;
nextchain = endlist[curchain + 1];
curlink++;
link = nextlink;
nextlink = linklist[curlink + 1];
}}
if ((chains.size () & 1) != 0) {
System.out.println ("Odd number of chains!");
}}, "java.util.Vector,java.util.Vector,java.util.Vector");
c$.obstructs = Clazz.defineMethod (c$, "obstructs", 
function (v1, v2, phase) {
return (((phase & 1) == 0) ? (v1 <= v2) : (v1 < v2));
}, "~N,~N,~N");
c$.$AreaOp$1$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.declareAnonymous (sun.awt.geom, "AreaOp$1", null, java.util.Comparator);
Clazz.overrideMethod (c$, "compare", 
function (o1, o2) {
var c1 = (o1).getCurve ();
var c2 = (o2).getCurve ();
var v1;
var v2;
if ((v1 = c1.getYTop ()) == (v2 = c2.getYTop ())) {
if ((v1 = c1.getXTop ()) == (v2 = c2.getXTop ())) {
return 0;
}}if (v1 < v2) {
return -1;
}return 1;
}, "~O,~O");
c$ = Clazz.p0p ();
};
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.inLeft = false;
this.inRight = false;
this.inResult = false;
Clazz.instantialize (this, arguments);
}, sun.awt.geom.AreaOp, "CAGOp", sun.awt.geom.AreaOp);
Clazz.overrideMethod (c$, "newRow", 
function () {
this.inLeft = false;
this.inRight = false;
this.inResult = false;
});
Clazz.overrideMethod (c$, "classify", 
function (a) {
if (a.getCurveTag () == 0) {
this.inLeft = !this.inLeft;
} else {
this.inRight = !this.inRight;
}var b = this.newClassification (this.inLeft, this.inRight);
if (this.inResult == b) {
return 0;
}this.inResult = b;
return (b ? 1 : -1);
}, "sun.awt.geom.Edge");
Clazz.overrideMethod (c$, "getState", 
function () {
return (this.inResult ? 1 : -1);
});
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.declareType (sun.awt.geom.AreaOp, "AddOp", sun.awt.geom.AreaOp.CAGOp);
Clazz.overrideMethod (c$, "newClassification", 
function (a, b) {
return (a || b);
}, "~B,~B");
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.declareType (sun.awt.geom.AreaOp, "SubOp", sun.awt.geom.AreaOp.CAGOp);
Clazz.overrideMethod (c$, "newClassification", 
function (a, b) {
return (a && !b);
}, "~B,~B");
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.declareType (sun.awt.geom.AreaOp, "IntOp", sun.awt.geom.AreaOp.CAGOp);
Clazz.overrideMethod (c$, "newClassification", 
function (a, b) {
return (a && b);
}, "~B,~B");
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.declareType (sun.awt.geom.AreaOp, "XorOp", sun.awt.geom.AreaOp.CAGOp);
Clazz.overrideMethod (c$, "newClassification", 
function (a, b) {
return (a != b);
}, "~B,~B");
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.count = 0;
Clazz.instantialize (this, arguments);
}, sun.awt.geom.AreaOp, "NZWindOp", sun.awt.geom.AreaOp);
Clazz.overrideMethod (c$, "newRow", 
function () {
this.count = 0;
});
Clazz.overrideMethod (c$, "classify", 
function (a) {
var b = this.count;
var c = (b == 0 ? 1 : 0);
b += a.getCurve ().getDirection ();
this.count = b;
return (b == 0 ? -1 : c);
}, "sun.awt.geom.Edge");
Clazz.overrideMethod (c$, "getState", 
function () {
return ((this.count == 0) ? -1 : 1);
});
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.inside = false;
Clazz.instantialize (this, arguments);
}, sun.awt.geom.AreaOp, "EOWindOp", sun.awt.geom.AreaOp);
Clazz.overrideMethod (c$, "newRow", 
function () {
this.inside = false;
});
Clazz.overrideMethod (c$, "classify", 
function (a) {
var b = !this.inside;
this.inside = b;
return (b ? 1 : -1);
}, "sun.awt.geom.Edge");
Clazz.overrideMethod (c$, "getState", 
function () {
return (this.inside ? 1 : -1);
});
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"CTAG_LEFT", 0,
"CTAG_RIGHT", 1,
"ETAG_IGNORE", 0,
"ETAG_ENTER", 1,
"ETAG_EXIT", -1,
"RSTAG_INSIDE", 1,
"RSTAG_OUTSIDE", -1);
c$.YXTopComparator = c$.prototype.YXTopComparator = ((Clazz.isClassDefined ("sun.awt.geom.AreaOp$1") ? 0 : sun.awt.geom.AreaOp.$AreaOp$1$ ()), Clazz.innerTypeInstance (sun.awt.geom.AreaOp$1, this, null));
c$.EmptyLinkList = c$.prototype.EmptyLinkList =  new Array (2);
c$.EmptyChainList = c$.prototype.EmptyChainList =  new Array (2);
});
