(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "CircuitElm", null, null, 'com.falstad.circuit.Editable');
C$.voltageRange = 0;
C$.colorScaleCount = 0;
C$.colorScale = null;
C$.currentMult = 0;
C$.powerMult = 0;
C$.ps1 = null;
C$.ps2 = null;
C$.sim = null;
C$.whiteColor = null;
C$.selectColor = null;
C$.lightGrayColor = null;
C$.unitsFont = null;
C$.showFormat = null;
C$.shortFormat = null;
C$.noCommaFormat = null;

C$.$clinit$ = function() {Clazz.load(C$, 1);
C$.voltageRange = 5;
C$.colorScaleCount = 32;
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.x = 0;
this.y = 0;
this.x2 = 0;
this.y2 = 0;
this.flags = 0;
this.nodes = 0;
this.voltSource = 0;
this.dx = 0;
this.dy = 0;
this.dsign = 0;
this.dn = 0;
this.dpx1 = 0;
this.dpy1 = 0;
this.point1 = null;
this.point2 = null;
this.lead1 = null;
this.lead2 = null;
this.volts = null;
this.current = 0;
this.curcount = 0;
this.boundingBox = null;
this.noDiagonal = false;
this.selected = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getDumpType', function () {
return 0;
});

Clazz.newMeth(C$, 'getDumpClass', function () {
return this.getClass();
});

Clazz.newMeth(C$, 'getDefaultFlags', function () {
return 0;
});

Clazz.newMeth(C$, 'initClass$com_falstad_circuit_CirSim', function (s) {
C$.unitsFont = Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Font'))).c$$S$I$I,["SansSerif", 0, 10]);
C$.sim = s;
C$.colorScale = Clazz.array((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))), [C$.colorScaleCount]);
var i;
for (i = 0; i != C$.colorScaleCount; i++) {
var v = i * 2.0 / C$.colorScaleCount - 1;
if (v < 0 ) {
var n1 = ((128 * -v)|0) + 127;
var n2 = ((127 * (1 + v))|0);
C$.colorScale[i] = Clazz.new_((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).c$$I$I$I,[n1, n2, n2]);
} else {
var n1 = ((128 * v)|0) + 127;
var n2 = ((127 * (1 - v))|0);
C$.colorScale[i] = Clazz.new_((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).c$$I$I$I,[n2, n1, n2]);
}}
C$.ps1 = Clazz.new_((I$[2]||(I$[2]=Clazz.load('java.awt.Point'))));
C$.ps2 = Clazz.new_((I$[2]||(I$[2]=Clazz.load('java.awt.Point'))));
C$.showFormat = (I$[3]||(I$[3]=Clazz.load('java.text.NumberFormat'))).getInstance();
C$.showFormat.setMaximumFractionDigits$I(2);
C$.shortFormat = (I$[3]||(I$[3]=Clazz.load('java.text.NumberFormat'))).getInstance();
C$.shortFormat.setMaximumFractionDigits$I(1);
C$.noCommaFormat = (I$[3]||(I$[3]=Clazz.load('java.text.NumberFormat'))).getInstance();
C$.noCommaFormat.setMaximumFractionDigits$I(10);
C$.noCommaFormat.setGroupingUsed$Z(false);
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.$init$.apply(this);
this.x = this.x2 = xx;
this.y = this.y2 = yy;
this.flags = this.getDefaultFlags();
this.allocNodes();
this.initBoundingBox();
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I', function (xa, ya, xb, yb, f) {
C$.$init$.apply(this);
this.x = xa;
this.y = ya;
this.x2 = xb;
this.y2 = yb;
this.flags = f;
this.allocNodes();
this.initBoundingBox();
}, 1);

Clazz.newMeth(C$, 'initBoundingBox', function () {
this.boundingBox = Clazz.new_((I$[4]||(I$[4]=Clazz.load('java.awt.Rectangle'))));
this.boundingBox.setBounds$I$I$I$I(C$.min$I$I(this.x, this.x2), C$.min$I$I(this.y, this.y2), C$.abs$I(this.x2 - this.x) + 1, C$.abs$I(this.y2 - this.y) + 1);
});

Clazz.newMeth(C$, 'allocNodes', function () {
this.nodes = Clazz.array(Integer.TYPE, [this.getPostCount() + this.getInternalNodeCount()]);
this.volts = Clazz.array(Double.TYPE, [this.getPostCount() + this.getInternalNodeCount()]);
});

Clazz.newMeth(C$, 'dump', function () {
var t = this.getDumpType();
return (t < 127 ? (String.fromCharCode(t)) + " " : t + " ") + this.x + " " + this.y + " " + this.x2 + " " + this.y2 + " " + this.flags ;
});

Clazz.newMeth(C$, 'reset', function () {
var i;
for (i = 0; i != this.getPostCount() + this.getInternalNodeCount(); i++) this.volts[i] = 0;

this.curcount = 0;
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
});

Clazz.newMeth(C$, 'setCurrent$I$D', function (x, c) {
this.current = c;
});

Clazz.newMeth(C$, 'getCurrent', function () {
return this.current;
});

Clazz.newMeth(C$, 'doStep', function () {
});

Clazz.newMeth(C$, '$delete', function () {
});

Clazz.newMeth(C$, 'startIteration', function () {
});

Clazz.newMeth(C$, 'getPostVoltage$I', function (x) {
return this.volts[x];
});

Clazz.newMeth(C$, 'setNodeVoltage$I$D', function (n, c) {
this.volts[n] = c;
this.calculateCurrent();
});

Clazz.newMeth(C$, 'calculateCurrent', function () {
});

Clazz.newMeth(C$, 'setPoints', function () {
this.dx = this.x2 - this.x;
this.dy = this.y2 - this.y;
this.dn = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
this.dpx1 = this.dy / this.dn;
this.dpy1 = -this.dx / this.dn;
this.dsign = (this.dy == 0) ? C$.sign$I(this.dx) : C$.sign$I(this.dy);
this.point1 = Clazz.new_((I$[2]||(I$[2]=Clazz.load('java.awt.Point'))).c$$I$I,[this.x, this.y]);
this.point2 = Clazz.new_((I$[2]||(I$[2]=Clazz.load('java.awt.Point'))).c$$I$I,[this.x2, this.y2]);
});

Clazz.newMeth(C$, 'calcLeads$I', function (len) {
if (this.dn < len  || len == 0 ) {
this.lead1 = this.point1;
this.lead2 = this.point2;
return;
}this.lead1 = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, (this.dn - len) / (2 * this.dn));
this.lead2 = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, (this.dn + len) / (2 * this.dn));
});

Clazz.newMeth(C$, 'interpPoint$java_awt_Point$java_awt_Point$D', function (a, b, f) {
var p = Clazz.new_((I$[2]||(I$[2]=Clazz.load('java.awt.Point'))));
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D(a, b, p, f);
return p;
});

Clazz.newMeth(C$, 'interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D', function (a, b, c, f) {
var xpd = b.x - a.x;
var ypd = b.y - a.y;
c.x = (Math.floor(a.x * (1 - f) + b.x * f + 0.48)|0);
c.y = (Math.floor(a.y * (1 - f) + b.y * f + 0.48)|0);
});

Clazz.newMeth(C$, 'interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D', function (a, b, c, f, g) {
var xpd = b.x - a.x;
var ypd = b.y - a.y;
var gx = b.y - a.y;
var gy = a.x - b.x;
g /= Math.sqrt(gx * gx + gy * gy);
c.x = (Math.floor(a.x * (1 - f) + b.x * f + g * gx + 0.48)|0);
c.y = (Math.floor(a.y * (1 - f) + b.y * f + g * gy + 0.48)|0);
});

Clazz.newMeth(C$, 'interpPoint$java_awt_Point$java_awt_Point$D$D', function (a, b, f, g) {
var p = Clazz.new_((I$[2]||(I$[2]=Clazz.load('java.awt.Point'))));
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(a, b, p, f, g);
return p;
});

Clazz.newMeth(C$, 'interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D', function (a, b, c, d, f, g) {
var xpd = b.x - a.x;
var ypd = b.y - a.y;
var gx = b.y - a.y;
var gy = a.x - b.x;
g /= Math.sqrt(gx * gx + gy * gy);
c.x = (Math.floor(a.x * (1 - f) + b.x * f + g * gx + 0.48)|0);
c.y = (Math.floor(a.y * (1 - f) + b.y * f + g * gy + 0.48)|0);
d.x = (Math.floor(a.x * (1 - f) + b.x * f - g * gx + 0.48)|0);
d.y = (Math.floor(a.y * (1 - f) + b.y * f - g * gy + 0.48)|0);
});

Clazz.newMeth(C$, 'draw2Leads$java_awt_Graphics', function (g) {
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[0]);
C$.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.point1, this.lead1);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[1]);
C$.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.lead2, this.point2);
});

Clazz.newMeth(C$, 'newPointArray$I', function (n) {
var a = Clazz.array((I$[2]||(I$[2]=Clazz.load('java.awt.Point'))), [n]);
while (n > 0)a[--n] = Clazz.new_((I$[2]||(I$[2]=Clazz.load('java.awt.Point'))));

return a;
});

Clazz.newMeth(C$, 'drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D', function (g, pa, pb, pos) {
if (C$.sim.stoppedCheck.getState() || pos == 0   || !C$.sim.dotsCheckItem.getState() ) return;
var dx = pb.x - pa.x;
var dy = pb.y - pa.y;
var dn = Math.sqrt(dx * dx + dy * dy);
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).yellow);
var ds = 16;
pos %= ds;
if (pos < 0 ) pos += ds;
var di = 0;
for (di = pos; di < dn ; di += ds) {
var x0 = ((pa.x + di * dx / dn)|0);
var y0 = ((pa.y + di * dy / dn)|0);
g.fillRect$I$I$I$I(x0 - 1, y0 - 1, 4, 4);
}
});

Clazz.newMeth(C$, 'calcArrow$java_awt_Point$java_awt_Point$D$D', function (a, b, al, aw) {
var poly = Clazz.new_((I$[5]||(I$[5]=Clazz.load('java.awt.Polygon'))));
var p1 = Clazz.new_((I$[2]||(I$[2]=Clazz.load('java.awt.Point'))));
var p2 = Clazz.new_((I$[2]||(I$[2]=Clazz.load('java.awt.Point'))));
var adx = b.x - a.x;
var ady = b.y - a.y;
var l = Math.sqrt(adx * adx + ady * ady);
poly.addPoint$I$I(b.x, b.y);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(a, b, p1, p2, 1 - al / l, aw);
poly.addPoint$I$I(p1.x, p1.y);
poly.addPoint$I$I(p2.x, p2.y);
return poly;
});

Clazz.newMeth(C$, 'createPolygon$java_awt_Point$java_awt_Point$java_awt_Point', function (a, b, c) {
var p = Clazz.new_((I$[5]||(I$[5]=Clazz.load('java.awt.Polygon'))));
p.addPoint$I$I(a.x, a.y);
p.addPoint$I$I(b.x, b.y);
p.addPoint$I$I(c.x, c.y);
return p;
});

Clazz.newMeth(C$, 'createPolygon$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point', function (a, b, c, d) {
var p = Clazz.new_((I$[5]||(I$[5]=Clazz.load('java.awt.Polygon'))));
p.addPoint$I$I(a.x, a.y);
p.addPoint$I$I(b.x, b.y);
p.addPoint$I$I(c.x, c.y);
p.addPoint$I$I(d.x, d.y);
return p;
});

Clazz.newMeth(C$, 'createPolygon$java_awt_PointA', function (a) {
var p = Clazz.new_((I$[5]||(I$[5]=Clazz.load('java.awt.Polygon'))));
var i;
for (i = 0; i != a.length; i++) p.addPoint$I$I(a[i].x, a[i].y);

return p;
});

Clazz.newMeth(C$, 'drag$I$I', function (xx, yy) {
xx = C$.sim.snapGrid$I(xx);
yy = C$.sim.snapGrid$I(yy);
if (this.noDiagonal) {
if (Math.abs(this.x - xx) < Math.abs(this.y - yy)) {
xx = this.x;
} else {
yy = this.y;
}}this.x2 = xx;
this.y2 = yy;
this.setPoints();
});

Clazz.newMeth(C$, 'move$I$I', function (dx, dy) {
this.x = this.x+(dx);
this.y = this.y+(dy);
this.x2 = this.x2+(dx);
this.y2 = this.y2+(dy);
this.boundingBox.move$I$I(dx, dy);
this.setPoints();
});

Clazz.newMeth(C$, 'allowMove$I$I', function (dx, dy) {
var nx = this.x + dx;
var ny = this.y + dy;
var nx2 = this.x2 + dx;
var ny2 = this.y2 + dy;
var i;
for (i = 0; i != C$.sim.elmList.size(); i++) {
var ce = C$.sim.getElm$I(i);
if (ce.x == nx && ce.y == ny  && ce.x2 == nx2  && ce.y2 == ny2 ) return false;
if (ce.x == nx2 && ce.y == ny2  && ce.x2 == nx  && ce.y2 == ny ) return false;
}
return true;
});

Clazz.newMeth(C$, 'movePoint$I$I$I', function (n, dx, dy) {
if (n == 0) {
this.x = this.x+(dx);
this.y = this.y+(dy);
} else {
this.x2 = this.x2+(dx);
this.y2 = this.y2+(dy);
}this.setPoints();
});

Clazz.newMeth(C$, 'drawPosts$java_awt_Graphics', function (g) {
var i;
for (i = 0; i != this.getPostCount(); i++) {
var p = this.getPost$I(i);
this.drawPost$java_awt_Graphics$I$I$I(g, p.x, p.y, this.nodes[i]);
}
});

Clazz.newMeth(C$, 'stamp', function () {
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return 0;
});

Clazz.newMeth(C$, 'getInternalNodeCount', function () {
return 0;
});

Clazz.newMeth(C$, 'setNode$I$I', function (p, n) {
this.nodes[p] = n;
});

Clazz.newMeth(C$, 'setVoltageSource$I$I', function (n, v) {
this.voltSource = v;
});

Clazz.newMeth(C$, 'getVoltageSource', function () {
return this.voltSource;
});

Clazz.newMeth(C$, 'getVoltageDiff', function () {
return this.volts[0] - this.volts[1];
});

Clazz.newMeth(C$, 'nonLinear', function () {
return false;
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 2;
});

Clazz.newMeth(C$, 'getNode$I', function (n) {
return this.nodes[n];
});

Clazz.newMeth(C$, 'getPost$I', function (n) {
return (n == 0) ? this.point1 : (n == 1) ? this.point2 : null;
});

Clazz.newMeth(C$, 'drawPost$java_awt_Graphics$I$I$I', function (g, x0, y0, n) {
if (C$.sim.dragElm == null  && !this.needsHighlight()  && C$.sim.getCircuitNode$I(n).links.size() == 2 ) return;
if (C$.sim.mouseMode == 2 || C$.sim.mouseMode == 3 ) return;
this.drawPost$java_awt_Graphics$I$I(g, x0, y0);
});

Clazz.newMeth(C$, 'drawPost$java_awt_Graphics$I$I', function (g, x0, y0) {
g.setColor$java_awt_Color(C$.whiteColor);
g.fillOval$I$I$I$I(x0 - 3, y0 - 3, 7, 7);
});

Clazz.newMeth(C$, 'setBbox$I$I$I$I', function (x1, y1, x2, y2) {
if (x1 > x2) {
var q = x1;
x1 = x2;
x2 = q;
}if (y1 > y2) {
var q = y1;
y1 = y2;
y2 = q;
}this.boundingBox.setBounds$I$I$I$I(x1, y1, x2 - x1 + 1, y2 - y1 + 1);
});

Clazz.newMeth(C$, 'setBbox$java_awt_Point$java_awt_Point$D', function (p1, p2, w) {
this.setBbox$I$I$I$I(p1.x, p1.y, p2.x, p2.y);
var gx = p2.y - p1.y;
var gy = p1.x - p2.x;
var dpx = ((this.dpx1 * w)|0);
var dpy = ((this.dpy1 * w)|0);
this.adjustBbox$I$I$I$I(p1.x + dpx, p1.y + dpy, p1.x - dpx, p1.y - dpy);
});

Clazz.newMeth(C$, 'adjustBbox$I$I$I$I', function (x1, y1, x2, y2) {
if (x1 > x2) {
var q = x1;
x1 = x2;
x2 = q;
}if (y1 > y2) {
var q = y1;
y1 = y2;
y2 = q;
}x1 = C$.min$I$I(this.boundingBox.x, x1);
y1 = C$.min$I$I(this.boundingBox.y, y1);
x2 = C$.max$I$I(this.boundingBox.x + this.boundingBox.width - 1, x2);
y2 = C$.max$I$I(this.boundingBox.y + this.boundingBox.height - 1, y2);
this.boundingBox.setBounds$I$I$I$I(x1, y1, x2 - x1, y2 - y1);
});

Clazz.newMeth(C$, 'adjustBbox$java_awt_Point$java_awt_Point', function (p1, p2) {
this.adjustBbox$I$I$I$I(p1.x, p1.y, p2.x, p2.y);
});

Clazz.newMeth(C$, 'isCenteredText', function () {
return false;
});

Clazz.newMeth(C$, 'drawCenteredText$java_awt_Graphics$S$I$I$Z', function (g, s, x, y, cx) {
var fm = g.getFontMetrics();
var w = fm.stringWidth$S(s);
if (cx) x = x-((w/2|0));
g.drawString$S$I$I(s, x, y + (fm.getAscent()/2|0));
this.adjustBbox$I$I$I$I(x, y - (fm.getAscent()/2|0), x + w, y + (fm.getAscent()/2|0) + fm.getDescent());
});

Clazz.newMeth(C$, 'drawValues$java_awt_Graphics$S$D', function (g, s, hs) {
if (s == null ) return;
g.setFont$java_awt_Font(C$.unitsFont);
var fm = g.getFontMetrics();
var w = fm.stringWidth$S(s);
g.setColor$java_awt_Color(C$.whiteColor);
var ya = (fm.getAscent()/2|0);
var xc;
var yc;
if (Clazz.instanceOf(this, "com.falstad.circuit.RailElm") || Clazz.instanceOf(this, "com.falstad.circuit.SweepElm") ) {
xc = this.x2;
yc = this.y2;
} else {
xc = ((this.x2 + this.x)/2|0);
yc = ((this.y2 + this.y)/2|0);
}var dpx = ((this.dpx1 * hs)|0);
var dpy = ((this.dpy1 * hs)|0);
if (dpx == 0) {
g.drawString$S$I$I(s, xc - (w/2|0), yc - C$.abs$I(dpy) - 2 );
} else {
var xx = xc + C$.abs$I(dpx) + 2 ;
if (Clazz.instanceOf(this, "com.falstad.circuit.VoltageElm") || (this.x < this.x2 && this.y > this.y2 ) ) xx = xc - (w + C$.abs$I(dpx) + 2 );
g.drawString$S$I$I(s, xx, yc + dpy + ya );
}});

Clazz.newMeth(C$, 'drawCoil$java_awt_Graphics$I$java_awt_Point$java_awt_Point$D$D', function (g, hs, p1, p2, v1, v2) {
var len = C$.distance$java_awt_Point$java_awt_Point(p1, p2);
var segments = 30;
var i;
var segf = 1.0 / segments;
C$.ps1.setLocation$java_awt_Point(p1);
for (i = 0; i != segments; i++) {
var cx = (((i + 1) * 6.0 * segf ) % 2) - 1;
var hsx = Math.sqrt(1 - cx * cx);
if (hsx < 0 ) hsx = -hsx;
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(p1, p2, C$.ps2, i * segf, hsx * hs);
var v = v1 + (v2 - v1) * i / segments;
this.setVoltageColor$java_awt_Graphics$D(g, v);
C$.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, C$.ps1, C$.ps2);
C$.ps1.setLocation$java_awt_Point(C$.ps2);
}
});

Clazz.newMeth(C$, 'drawThickLine$java_awt_Graphics$I$I$I$I', function (g, x, y, x2, y2) {
g.drawLine$I$I$I$I(x, y, x2, y2);
g.drawLine$I$I$I$I(x + 1, y, x2 + 1, y2);
g.drawLine$I$I$I$I(x, y + 1, x2, y2 + 1);
g.drawLine$I$I$I$I(x + 1, y + 1, x2 + 1, y2 + 1);
}, 1);

Clazz.newMeth(C$, 'drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point', function (g, pa, pb) {
g.drawLine$I$I$I$I(pa.x, pa.y, pb.x, pb.y);
g.drawLine$I$I$I$I(pa.x + 1, pa.y, pb.x + 1, pb.y);
g.drawLine$I$I$I$I(pa.x, pa.y + 1, pb.x, pb.y + 1);
g.drawLine$I$I$I$I(pa.x + 1, pa.y + 1, pb.x + 1, pb.y + 1);
}, 1);

Clazz.newMeth(C$, 'drawThickPolygon$java_awt_Graphics$IA$IA$I', function (g, xs, ys, c) {
var i;
for (i = 0; i != c - 1; i++) C$.drawThickLine$java_awt_Graphics$I$I$I$I(g, xs[i], ys[i], xs[i + 1], ys[i + 1]);

C$.drawThickLine$java_awt_Graphics$I$I$I$I(g, xs[i], ys[i], xs[0], ys[0]);
}, 1);

Clazz.newMeth(C$, 'drawThickPolygon$java_awt_Graphics$java_awt_Polygon', function (g, p) {
C$.drawThickPolygon$java_awt_Graphics$IA$IA$I(g, p.xpoints, p.ypoints, p.npoints);
}, 1);

Clazz.newMeth(C$, 'drawThickCircle$java_awt_Graphics$I$I$I', function (g, cx, cy, ri) {
var a;
var m = 0.017453292519943295;
var r = ri * 0.98;
for (a = 0; a != 360; a = a+(20)) {
var ax = Math.cos(a * m) * r + cx;
var ay = Math.sin(a * m) * r + cy;
var bx = Math.cos((a + 20) * m) * r + cx;
var by = Math.sin((a + 20) * m) * r + cy;
C$.drawThickLine$java_awt_Graphics$I$I$I$I(g, (ax|0), (ay|0), (bx|0), (by|0));
}
}, 1);

Clazz.newMeth(C$, 'getVoltageDText$D', function (v) {
return C$.getUnitText$D$S(Math.abs(v), "V");
}, 1);

Clazz.newMeth(C$, 'getVoltageText$D', function (v) {
return C$.getUnitText$D$S(v, "V");
}, 1);

Clazz.newMeth(C$, 'getUnitText$D$S', function (v, u) {
var va = Math.abs(v);
if (va < 1.0E-14 ) return "0 " + u;
if (va < 1.0E-9 ) return C$.showFormat.format$D(v * 1.0E12) + " p" + u ;
if (va < 1.0E-6 ) return C$.showFormat.format$D(v * 1.0E9) + " n" + u ;
if (va < 0.001 ) return C$.showFormat.format$D(v * 1000000.0) + " " + (I$[6]||(I$[6]=Clazz.load('com.falstad.circuit.CirSim'))).muString + u ;
if (va < 1 ) return C$.showFormat.format$D(v * 1000.0) + " m" + u ;
if (va < 1000.0 ) return C$.showFormat.format$D(v) + " " + u ;
if (va < 1000000.0 ) return C$.showFormat.format$D(v * 0.001) + " k" + u ;
if (va < 1.0E9 ) return C$.showFormat.format$D(v * 1.0E-6) + " M" + u ;
return C$.showFormat.format$D(v * 1.0E-9) + " G" + u ;
}, 1);

Clazz.newMeth(C$, 'getShortUnitText$D$S', function (v, u) {
var va = Math.abs(v);
if (va < 1.0E-13 ) return null;
if (va < 1.0E-9 ) return C$.shortFormat.format$D(v * 1.0E12) + "p" + u ;
if (va < 1.0E-6 ) return C$.shortFormat.format$D(v * 1.0E9) + "n" + u ;
if (va < 0.001 ) return C$.shortFormat.format$D(v * 1000000.0) + (I$[6]||(I$[6]=Clazz.load('com.falstad.circuit.CirSim'))).muString + u ;
if (va < 1 ) return C$.shortFormat.format$D(v * 1000.0) + "m" + u ;
if (va < 1000.0 ) return C$.shortFormat.format$D(v) + u;
if (va < 1000000.0 ) return C$.shortFormat.format$D(v * 0.001) + "k" + u ;
if (va < 1.0E9 ) return C$.shortFormat.format$D(v * 1.0E-6) + "M" + u ;
return C$.shortFormat.format$D(v * 1.0E-9) + "G" + u ;
}, 1);

Clazz.newMeth(C$, 'getCurrentText$D', function (i) {
return C$.getUnitText$D$S(i, "A");
}, 1);

Clazz.newMeth(C$, 'getCurrentDText$D', function (i) {
return C$.getUnitText$D$S(Math.abs(i), "A");
}, 1);

Clazz.newMeth(C$, 'updateDotCount', function () {
this.curcount = this.updateDotCount$D$D(this.current, this.curcount);
});

Clazz.newMeth(C$, 'updateDotCount$D$D', function (cur, cc) {
if (C$.sim.stoppedCheck.getState()) return cc;
var cadd = cur * C$.currentMult;
cadd %= 8;
return cc + cadd;
});

Clazz.newMeth(C$, 'doDots$java_awt_Graphics', function (g) {
this.updateDotCount();
if (C$.sim.dragElm !== this ) this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.point1, this.point2, this.curcount);
});

Clazz.newMeth(C$, 'doAdjust', function () {
});

Clazz.newMeth(C$, 'setupAdjust', function () {
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
});

Clazz.newMeth(C$, 'getBasicInfo$SA', function (arr) {
arr[1] = "I = " + C$.getCurrentDText$D(this.getCurrent());
arr[2] = "Vd = " + C$.getVoltageDText$D(this.getVoltageDiff());
return 3;
});

Clazz.newMeth(C$, 'setVoltageColor$java_awt_Graphics$D', function (g, volts) {
if (this.needsHighlight()) {
g.setColor$java_awt_Color(C$.selectColor);
return;
}if (!C$.sim.voltsCheckItem.getState()) {
if (!C$.sim.powerCheckItem.getState()) g.setColor$java_awt_Color(C$.whiteColor);
return;
}var c = (((volts + C$.voltageRange) * (C$.colorScaleCount - 1) / (C$.voltageRange * 2))|0);
if (c < 0) c = 0;
if (c >= C$.colorScaleCount) c = C$.colorScaleCount - 1;
g.setColor$java_awt_Color(C$.colorScale[c]);
});

Clazz.newMeth(C$, 'setPowerColor$java_awt_Graphics$Z', function (g, yellow) {
if (!C$.sim.powerCheckItem.getState()) return;
this.setPowerColor$java_awt_Graphics$D(g, this.getPower());
});

Clazz.newMeth(C$, 'setPowerColor$java_awt_Graphics$D', function (g, w0) {
w0 *= C$.powerMult;
var w = (w0 < 0 ) ? -w0 : w0;
if (w > 1 ) w = 1;
var rg = 128 + ((w * 127)|0);
var b = ((128 * (1 - w))|0);
if (w0 > 0 ) g.setColor$java_awt_Color(Clazz.new_((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).c$$I$I$I,[rg, b, b]));
 else g.setColor$java_awt_Color(Clazz.new_((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).c$$I$I$I,[b, rg, b]));
});

Clazz.newMeth(C$, 'setConductanceColor$java_awt_Graphics$D', function (g, w0) {
w0 *= C$.powerMult;
var w = (w0 < 0 ) ? -w0 : w0;
if (w > 1 ) w = 1;
var rg = ((w * 255)|0);
g.setColor$java_awt_Color(Clazz.new_((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).c$$I$I$I,[rg, rg, rg]));
});

Clazz.newMeth(C$, 'getPower', function () {
return this.getVoltageDiff() * this.current;
});

Clazz.newMeth(C$, 'getScopeValue$I', function (x) {
return (x == 1) ? this.getPower() : this.getVoltageDiff();
});

Clazz.newMeth(C$, 'getScopeUnits$I', function (x) {
return (x == 1) ? "W" : "V";
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
});

Clazz.newMeth(C$, 'getConnection$I$I', function (n1, n2) {
return true;
});

Clazz.newMeth(C$, 'hasGroundConnection$I', function (n1) {
return false;
});

Clazz.newMeth(C$, 'isWire', function () {
return false;
});

Clazz.newMeth(C$, 'canViewInScope', function () {
return this.getPostCount() <= 2;
});

Clazz.newMeth(C$, 'comparePair$I$I$I$I', function (x1, x2, y1, y2) {
return ((x1 == y1 && x2 == y2 ) || (x1 == y2 && x2 == y1 ) );
});

Clazz.newMeth(C$, 'needsHighlight', function () {
return C$.sim.mouseElm === this  || this.selected ;
});

Clazz.newMeth(C$, 'isSelected', function () {
return this.selected;
});

Clazz.newMeth(C$, 'setSelected$Z', function (x) {
this.selected = x;
});

Clazz.newMeth(C$, 'selectRect$java_awt_Rectangle', function (r) {
this.selected = r.intersects$java_awt_Rectangle(this.boundingBox);
});

Clazz.newMeth(C$, 'abs$I', function (x) {
return x < 0 ? -x : x;
}, 1);

Clazz.newMeth(C$, 'sign$I', function (x) {
return (x < 0) ? -1 : (x == 0) ? 0 : 1;
}, 1);

Clazz.newMeth(C$, 'min$I$I', function (a, b) {
return (a < b) ? a : b;
}, 1);

Clazz.newMeth(C$, 'max$I$I', function (a, b) {
return (a > b) ? a : b;
}, 1);

Clazz.newMeth(C$, 'distance$java_awt_Point$java_awt_Point', function (p1, p2) {
var x = p1.x - p2.x;
var y = p1.y - p2.y;
return Math.sqrt(x * x + y * y);
}, 1);

Clazz.newMeth(C$, 'getBoundingBox', function () {
return this.boundingBox;
});

Clazz.newMeth(C$, 'needsShortcut', function () {
return this.getShortcut() > 0;
});

Clazz.newMeth(C$, 'getShortcut', function () {
return 0;
});

Clazz.newMeth(C$, 'isGraphicElmt', function () {
return false;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:18
