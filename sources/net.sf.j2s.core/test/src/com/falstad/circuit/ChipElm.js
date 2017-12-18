(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "ChipElm", function(){
Clazz.newInstance(this, arguments,0,C$);
}, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.csize = 0;
this.cspc = 0;
this.cspc2 = 0;
this.bits = 0;
this.FLAG_SMALL = 0;
this.FLAG_FLIP_X = 0;
this.FLAG_FLIP_Y = 0;
this.rectPointsX = null;
this.rectPointsY = null;
this.clockPointsX = null;
this.clockPointsY = null;
this.pins = null;
this.sizeX = 0;
this.sizeY = 0;
this.lastClock = false;
this.SIDE_N = 0;
this.SIDE_S = 0;
this.SIDE_W = 0;
this.SIDE_E = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.FLAG_SMALL = 1;
this.FLAG_FLIP_X = 1024;
this.FLAG_FLIP_Y = 2048;
this.SIDE_N = 0;
this.SIDE_S = 1;
this.SIDE_W = 2;
this.SIDE_E = 3;
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
if (this.needsBits()) this.bits = (Clazz.instanceOf(this, "com.falstad.circuit.DecadeElm")) ? 10 : 4;
this.noDiagonal = true;
this.setupPins();
this.setSize$I((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.smallGridCheckItem.getState() ? 1 : 2);
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
if (this.needsBits()) this.bits =  new Integer(st.nextToken()).intValue();
this.noDiagonal = true;
this.setupPins();
this.setSize$I((f & 1) != 0 ? 1 : 2);
var i;
for (i = 0; i != this.getPostCount(); i++) {
if (this.pins[i].state) {
this.volts[i] =  new Double(st.nextToken()).doubleValue();
this.pins[i].value = this.volts[i] > 2.5 ;
}}
}, 1);

Clazz.newMeth(C$, 'needsBits', function () {
return false;
});

Clazz.newMeth(C$, 'setSize$I', function (s) {
this.csize = s;
this.cspc = 8 * s;
this.cspc2 = this.cspc * 2;
this.flags = this.flags&(-2);
this.flags = this.flags|((s == 1) ? 1 : 0);
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
this.drawChip$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'drawChip$java_awt_Graphics', function (g) {
var i;
var f = Clazz.new_((I$[2]||(I$[2]=Clazz.load('java.awt.Font'))).c$$S$I$I,["SansSerif", 0, 10 * this.csize]);
g.setFont$java_awt_Font(f);
var fm = g.getFontMetrics();
for (i = 0; i != this.getPostCount(); i++) {
var p = this.pins[i];
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[i]);
var a = p.post;
var b = p.stub;
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, a, b);
p.curcount = this.updateDotCount$D$D(p.current, p.curcount);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, b, a, p.curcount);
if (p.bubble) {
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.printableCheckItem.getState() ? (I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).white : (I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).black);
P$.CircuitElm.drawThickCircle$java_awt_Graphics$I$I$I(g, p.bubbleX, p.bubbleY, 1);
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).lightGrayColor);
P$.CircuitElm.drawThickCircle$java_awt_Graphics$I$I$I(g, p.bubbleX, p.bubbleY, 3);
}g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).whiteColor);
var sw = fm.stringWidth$S(p.text);
g.drawString$S$I$I(p.text, p.textloc.x - (sw/2|0), p.textloc.y + (fm.getAscent()/2|0));
if (p.lineOver) {
var ya = p.textloc.y - (fm.getAscent()/2|0);
g.drawLine$I$I$I$I(p.textloc.x - (sw/2|0), ya, p.textloc.x + (sw/2|0), ya);
}}
g.setColor$java_awt_Color(this.needsHighlight() ? (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).selectColor : (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).lightGrayColor);
P$.CircuitElm.drawThickPolygon$java_awt_Graphics$IA$IA$I(g, this.rectPointsX, this.rectPointsY, 4);
if (this.clockPointsX != null ) g.drawPolyline$IA$IA$I(this.clockPointsX, this.clockPointsY, 3);
for (i = 0; i != this.getPostCount(); i++) this.drawPost$java_awt_Graphics$I$I$I(g, this.pins[i].post.x, this.pins[i].post.y, this.nodes[i]);

});

Clazz.newMeth(C$, 'drag$I$I', function (xx, yy) {
yy = (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.snapGrid$I(yy);
if (xx < this.x) {
xx = this.x;
yy = this.y;
} else {
this.y = this.y2 = yy;
this.x2 = (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.snapGrid$I(xx);
}this.setPoints();
});

Clazz.newMeth(C$, 'setPoints', function () {
if (this.x2 - this.x > this.sizeX * this.cspc2 && this === (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.dragElm  ) this.setSize$I(2);
var hs = this.cspc;
var x0 = this.x + this.cspc2;
var y0 = this.y;
var xr = x0 - this.cspc;
var yr = y0 - this.cspc;
var xs = this.sizeX * this.cspc2;
var ys = this.sizeY * this.cspc2;
this.rectPointsX = Clazz.array(Integer.TYPE, -1, [xr, xr + xs, xr + xs, xr]);
this.rectPointsY = Clazz.array(Integer.TYPE, -1, [yr, yr, yr + ys, yr + ys]);
this.setBbox$I$I$I$I(xr, yr, this.rectPointsX[2], this.rectPointsY[2]);
var i;
for (i = 0; i != this.getPostCount(); i++) {
var p = this.pins[i];
switch (p.side) {
case 0:
p.setPoint$I$I$I$I$I$I$I$I(x0, y0, 1, 0, 0, -1, 0, 0);
break;
case 1:
p.setPoint$I$I$I$I$I$I$I$I(x0, y0, 1, 0, 0, 1, 0, ys - this.cspc2);
break;
case 2:
p.setPoint$I$I$I$I$I$I$I$I(x0, y0, 0, 1, -1, 0, 0, 0);
break;
case 3:
p.setPoint$I$I$I$I$I$I$I$I(x0, y0, 0, 1, 1, 0, xs - this.cspc2, 0);
break;
}
}
});

Clazz.newMeth(C$, 'getPost$I', function (n) {
return this.pins[n].post;
});

Clazz.newMeth(C$, 'setVoltageSource$I$I', function (j, vs) {
var i;
for (i = 0; i != this.getPostCount(); i++) {
var p = this.pins[i];
if (p.output && j-- == 0 ) {
p.voltSource = vs;
return;
}}
System.out.println$S("setVoltageSource failed for " + this);
});

Clazz.newMeth(C$, 'stamp', function () {
var i;
for (i = 0; i != this.getPostCount(); i++) {
var p = this.pins[i];
if (p.output) (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVoltageSource$I$I$I(0, this.nodes[i], p.voltSource);
}
});

Clazz.newMeth(C$, 'execute', function () {
});

Clazz.newMeth(C$, 'doStep', function () {
var i;
for (i = 0; i != this.getPostCount(); i++) {
var p = this.pins[i];
if (!p.output) p.value = this.volts[i] > 2.5 ;
}
this.execute();
for (i = 0; i != this.getPostCount(); i++) {
var p = this.pins[i];
if (p.output) (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.updateVoltageSource$I$I$I$D(0, this.nodes[i], p.voltSource, p.value ? 5 : 0);
}
});

Clazz.newMeth(C$, 'reset', function () {
var i;
for (i = 0; i != this.getPostCount(); i++) {
this.pins[i].value = false;
this.pins[i].curcount = 0;
this.volts[i] = 0;
}
this.lastClock = false;
});

Clazz.newMeth(C$, 'dump', function () {
var t = this.getDumpType();
var s = C$.superclazz.prototype.dump.apply(this, []);
if (this.needsBits()) s += " " + this.bits;
var i;
for (i = 0; i != this.getPostCount(); i++) {
if (this.pins[i].state) s += " " + new Double(this.volts[i]).toString();
}
return s;
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = this.getChipName();
var i;
var a = 1;
for (i = 0; i != this.getPostCount(); i++) {
var p = this.pins[i];
if (arr[a] != null ) arr[a] += "; ";
 else arr[a] = "";
var t = p.text;
if (p.lineOver) t += '\'';
if (p.clock) t = "Clk";
arr[a] += t + " = " + P$.CircuitElm.getVoltageText$D(this.volts[i]) ;
if (i % 2 == 1) a++;
}
});

Clazz.newMeth(C$, 'setCurrent$I$D', function (x, c) {
var i;
for (i = 0; i != this.getPostCount(); i++) if (this.pins[i].output && this.pins[i].voltSource == x ) this.pins[i].current = c;

});

Clazz.newMeth(C$, 'getChipName', function () {
return "chip";
});

Clazz.newMeth(C$, 'getConnection$I$I', function (n1, n2) {
return false;
});

Clazz.newMeth(C$, 'hasGroundConnection$I', function (n1) {
return this.pins[n1].output;
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) {
var ei = Clazz.new_((I$[4]||(I$[4]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Flip X", (this.flags & 1024) != 0]);
return ei;
}if (n == 1) {
var ei = Clazz.new_((I$[4]||(I$[4]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Flip Y", (this.flags & 2048) != 0]);
return ei;
}return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0) {
if (ei.checkbox.getState()) this.flags = this.flags|(1024);
 else this.flags = this.flags&(-1025);
this.setPoints();
}if (n == 1) {
if (ei.checkbox.getState()) this.flags = this.flags|(2048);
 else this.flags = this.flags&(-2049);
this.setPoints();
}});
;
(function(){var C$=Clazz.newClass(P$.ChipElm, "Pin", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.post = null;
this.stub = null;
this.textloc = null;
this.pos = 0;
this.side = 0;
this.voltSource = 0;
this.bubbleX = 0;
this.bubbleY = 0;
this.text = null;
this.lineOver = false;
this.bubble = false;
this.clock = false;
this.output = false;
this.value = false;
this.state = false;
this.curcount = 0;
this.current = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I$S', function (p, s, t) {
C$.$init$.apply(this);
this.pos = p;
this.side = s;
this.text = t;
}, 1);

Clazz.newMeth(C$, 'setPoint$I$I$I$I$I$I$I$I', function (px, py, dx, dy, dax, day, sx, sy) {
if ((this.b$['com.falstad.circuit.ChipElm'].flags & 1024) != 0) {
dx = -dx;
dax = -dax;
px = px+(this.b$['com.falstad.circuit.ChipElm'].cspc2 * (this.b$['com.falstad.circuit.ChipElm'].sizeX - 1));
sx = -sx;
}if ((this.b$['com.falstad.circuit.ChipElm'].flags & 2048) != 0) {
dy = -dy;
day = -day;
py = py+(this.b$['com.falstad.circuit.ChipElm'].cspc2 * (this.b$['com.falstad.circuit.ChipElm'].sizeY - 1));
sy = -sy;
}var xa = px + this.b$['com.falstad.circuit.ChipElm'].cspc2 * dx * this.pos  + sx;
var ya = py + this.b$['com.falstad.circuit.ChipElm'].cspc2 * dy * this.pos  + sy;
this.post = Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Point'))).c$$I$I,[xa + dax * this.b$['com.falstad.circuit.ChipElm'].cspc2, ya + day * this.b$['com.falstad.circuit.ChipElm'].cspc2]);
this.stub = Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Point'))).c$$I$I,[xa + dax * this.b$['com.falstad.circuit.ChipElm'].cspc, ya + day * this.b$['com.falstad.circuit.ChipElm'].cspc]);
this.textloc = Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Point'))).c$$I$I,[xa, ya]);
if (this.bubble) {
this.bubbleX = xa + dax * 10 * this.b$['com.falstad.circuit.ChipElm'].csize ;
this.bubbleY = ya + day * 10 * this.b$['com.falstad.circuit.ChipElm'].csize ;
}if (this.clock) {
this.b$['com.falstad.circuit.ChipElm'].clockPointsX = Clazz.array(Integer.TYPE, [3]);
this.b$['com.falstad.circuit.ChipElm'].clockPointsY = Clazz.array(Integer.TYPE, [3]);
this.b$['com.falstad.circuit.ChipElm'].clockPointsX[0] = xa + dax * this.b$['com.falstad.circuit.ChipElm'].cspc - (dx * this.b$['com.falstad.circuit.ChipElm'].cspc/2|0);
this.b$['com.falstad.circuit.ChipElm'].clockPointsY[0] = ya + day * this.b$['com.falstad.circuit.ChipElm'].cspc - (dy * this.b$['com.falstad.circuit.ChipElm'].cspc/2|0);
this.b$['com.falstad.circuit.ChipElm'].clockPointsX[1] = xa;
this.b$['com.falstad.circuit.ChipElm'].clockPointsY[1] = ya;
this.b$['com.falstad.circuit.ChipElm'].clockPointsX[2] = xa + dax * this.b$['com.falstad.circuit.ChipElm'].cspc + (dx * this.b$['com.falstad.circuit.ChipElm'].cspc/2|0);
this.b$['com.falstad.circuit.ChipElm'].clockPointsY[2] = ya + day * this.b$['com.falstad.circuit.ChipElm'].cspc + (dy * this.b$['com.falstad.circuit.ChipElm'].cspc/2|0);
}});

Clazz.newMeth(C$);
})()

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:17
