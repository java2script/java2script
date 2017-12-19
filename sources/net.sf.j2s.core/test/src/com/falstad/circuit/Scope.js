(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "Scope");

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.FLAG_YELM = 0;
this.minV = null;
this.maxV = null;
this.minMaxV = null;
this.minI = null;
this.maxI = null;
this.minMaxI = null;
this.scopePointCount = 0;
this.ptr = 0;
this.ctr = 0;
this.speed = 0;
this.position = 0;
this.value = 0;
this.ivalue = 0;
this.text = null;
this.rect = null;
this.showI = false;
this.showV = false;
this.$showMax = false;
this.$showMin = false;
this.$showFreq = false;
this.lockScale = false;
this.plot2d = false;
this.plotXY = false;
this.elm = null;
this.xElm = null;
this.yElm = null;
this.imageSource = null;
this.image = null;
this.pixels = null;
this.draw_ox = 0;
this.draw_oy = 0;
this.dpixels = null;
this.sim = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.FLAG_YELM = 32;
this.scopePointCount = 128;
}, 1);

Clazz.newMeth(C$, 'c$$com_falstad_circuit_CirSim', function (s) {
C$.$init$.apply(this);
this.rect = Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Rectangle'))));
this.reset();
this.sim = s;
}, 1);

Clazz.newMeth(C$, 'showCurrent$Z', function (b) {
this.showI = b;
this.value = this.ivalue = 0;
});

Clazz.newMeth(C$, 'showVoltage$Z', function (b) {
this.showV = b;
this.value = this.ivalue = 0;
});

Clazz.newMeth(C$, 'showMax$Z', function (b) {
this.$showMax = b;
});

Clazz.newMeth(C$, 'showMin$Z', function (b) {
this.$showMin = b;
});

Clazz.newMeth(C$, 'showFreq$Z', function (b) {
this.$showFreq = b;
});

Clazz.newMeth(C$, 'setLockScale$Z', function (b) {
this.lockScale = b;
});

Clazz.newMeth(C$, 'resetGraph', function () {
this.scopePointCount = 1;
while (this.scopePointCount <= this.rect.width)this.scopePointCount = this.scopePointCount*(2);

this.minV = Clazz.array(Double.TYPE, [this.scopePointCount]);
this.maxV = Clazz.array(Double.TYPE, [this.scopePointCount]);
this.minI = Clazz.array(Double.TYPE, [this.scopePointCount]);
this.maxI = Clazz.array(Double.TYPE, [this.scopePointCount]);
this.ptr = this.ctr = 0;
this.allocImage();
});

Clazz.newMeth(C$, 'active', function () {
return this.elm != null ;
});

Clazz.newMeth(C$, 'reset', function () {
this.resetGraph();
this.minMaxV = 5;
this.minMaxI = 0.1;
this.speed = 64;
this.showI = this.showV = this.$showMax = true;
this.$showFreq = this.lockScale = this.$showMin = false;
this.plot2d = false;
if (this.elm != null  && (Clazz.instanceOf(this.elm, "com.falstad.circuit.OutputElm") || Clazz.instanceOf(this.elm, "com.falstad.circuit.LogicOutputElm") || Clazz.instanceOf(this.elm, "com.falstad.circuit.ProbeElm")  ) ) this.showI = false;
this.value = this.ivalue = 0;
if (Clazz.instanceOf(this.elm, "com.falstad.circuit.TransistorElm")) this.value = 6;
});

Clazz.newMeth(C$, 'setRect$java_awt_Rectangle', function (r) {
this.rect = r;
this.resetGraph();
});

Clazz.newMeth(C$, 'getWidth', function () {
return this.rect.width;
});

Clazz.newMeth(C$, 'rightEdge', function () {
return this.rect.x + this.rect.width;
});

Clazz.newMeth(C$, 'setElm$com_falstad_circuit_CircuitElm', function (ce) {
this.elm = ce;
this.reset();
});

Clazz.newMeth(C$, 'timeStep', function () {
if (this.elm == null ) return;
var v = this.elm.getScopeValue$I(this.value);
if (v < this.minV[this.ptr] ) this.minV[this.ptr] = v;
if (v > this.maxV[this.ptr] ) this.maxV[this.ptr] = v;
var i = 0;
if (this.value == 0 || this.ivalue != 0 ) {
i = (this.ivalue == 0) ? this.elm.getCurrent() : this.elm.getScopeValue$I(this.ivalue);
if (i < this.minI[this.ptr] ) this.minI[this.ptr] = i;
if (i > this.maxI[this.ptr] ) this.maxI[this.ptr] = i;
}if (this.plot2d && this.dpixels != null  ) {
var newscale = false;
while (v > this.minMaxV  || v < -this.minMaxV  ){
this.minMaxV *= 2;
newscale = true;
}
var yval = i;
if (this.plotXY) yval = (this.yElm == null ) ? 0 : this.yElm.getVoltageDiff();
while (yval > this.minMaxI  || yval < -this.minMaxI  ){
this.minMaxI *= 2;
newscale = true;
}
if (newscale) this.clear2dView();
var xa = v / this.minMaxV;
var ya = yval / this.minMaxI;
var x = ((this.rect.width * (1 + xa) * 0.499 )|0);
var y = ((this.rect.height * (1 - ya) * 0.499 )|0);
this.drawTo$I$I(x, y);
} else {
this.ctr++;
if (this.ctr >= this.speed) {
this.ptr = (this.ptr + 1) & (this.scopePointCount - 1);
this.minV[this.ptr] = this.maxV[this.ptr] = v;
this.minI[this.ptr] = this.maxI[this.ptr] = i;
this.ctr = 0;
}}});

Clazz.newMeth(C$, 'drawTo$I$I', function (x2, y2) {
if (this.draw_ox == -1) {
this.draw_ox = x2;
this.draw_oy = y2;
}if (this.draw_ox == x2 && this.draw_oy == y2 ) {
this.dpixels[x2 + this.rect.width * y2] = 1;
} else if ((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).abs$I(y2 - this.draw_oy) > (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).abs$I(x2 - this.draw_ox)) {
var sgn = (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sign$I(y2 - this.draw_oy);
var x;
var y;
for (y = this.draw_oy; y != y2 + sgn ; y = (y+(sgn)|0)) {
x = this.draw_ox + ((x2 - this.draw_ox) * (y - this.draw_oy)/(y2 - this.draw_oy)|0);
this.dpixels[x + this.rect.width * y] = 1;
}
} else {
var sgn = (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sign$I(x2 - this.draw_ox);
var x;
var y;
for (x = this.draw_ox; x != x2 + sgn ; x = (x+(sgn)|0)) {
y = this.draw_oy + ((y2 - this.draw_oy) * (x - this.draw_ox)/(x2 - this.draw_ox)|0);
this.dpixels[x + this.rect.width * y] = 1;
}
}this.draw_ox = x2;
this.draw_oy = y2;
});

Clazz.newMeth(C$, 'clear2dView', function () {
for (var i = this.dpixels.length; --i >= 0; ) this.dpixels[i] = 0;

this.draw_ox = this.draw_oy = -1;
});

Clazz.newMeth(C$, 'adjustScale$D', function (x) {
this.minMaxV *= x;
this.minMaxI *= x;
});

Clazz.newMeth(C$, 'draw2d$java_awt_Graphics', function (g) {
if (this.pixels == null  || this.dpixels == null  ) return;
var col = ((this.sim.printableCheckItem.getState()) ? -1 : 0);
for (var i = this.pixels.length; --i >= 0; ) this.pixels[i] = col;

for (var off = this.rect.width * ((this.rect.height/2|0)), i = this.rect.width; --i >= 0; ) this.pixels[i + off] = -16711936;

var ycol = ((this.plotXY) ? -16711936 : -256);
for (var w = this.rect.width, w2 = (this.rect.width/2|0), i = this.rect.height; --i >= 0; ) this.pixels[w2 + w * i] = ycol;

for (var i = this.pixels.length; --i >= 0; ) {
var q = ((255 * this.dpixels[i])|0);
if (q > 0) this.pixels[i] = (-16777216 | (65793 * q));
this.dpixels[i] *= 0.997;
}
g.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.image, this.rect.x, this.rect.y, null);
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).whiteColor);
g.fillOval$I$I$I$I(this.rect.x + this.draw_ox - 2, this.rect.y + this.draw_oy - 2, 5, 5);
var yt = this.rect.y + 10;
var x = this.rect.x;
if (this.text != null  && this.rect.y + this.rect.height > yt + 5 ) {
g.drawString$S$I$I(this.text, x, yt);
yt = yt+(15);
}});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
if (this.elm == null ) return;
if (this.plot2d) {
this.draw2d$java_awt_Graphics(g);
return;
}if (this.pixels == null ) return;
var rw = this.rect.width;
var rh = this.rect.height;
var plen = this.pixels.length;
var spcm1 = this.scopePointCount - 1;
var col = ((this.sim.printableCheckItem.getState()) ? -1 : 0);
for (var i = plen; --i >= 0; ) this.pixels[i] = col;

var x = 0;
var maxy = ((this.rect.height - 1)/2|0);
var y = maxy;
var gotI = false;
var gotV = false;
var minRange = 4;
var realMaxV = -1.0E8;
var realMaxI = -1.0E8;
var realMinV = 1.0E8;
var realMinI = 1.0E8;
var curColor = -256;
var voltColor = (this.value > 0 ? -1 : -16711936);
if (this.sim.scopeSelected == -1 && this.elm === this.sim.mouseElm  ) curColor = voltColor = -16711681;
var ipa = this.ptr + this.scopePointCount - rw;
for (var i = rw; --i >= 0; ) {
var ip = (i + ipa) & spcm1;
while (this.maxV[ip] > this.minMaxV )this.minMaxV *= 2;

while (this.minV[ip] < -this.minMaxV )this.minMaxV *= 2;

while (this.maxI[ip] > this.minMaxI )this.minMaxI *= 2;

while (this.minI[ip] < -this.minMaxI )this.minMaxI *= 2;

}
var gridStep = 1.0E-8;
var gridMax = (this.showI ? this.minMaxI : this.minMaxV);
while (gridStep * 100 < gridMax )gridStep *= 10;

if (maxy * gridStep / gridMax < 0.3 ) gridStep = 0;
var sublines = (maxy * gridStep / gridMax > 3 );
var showIandV = ((this.showI && this.showV ) || gridStep == 0  );
for (var ll = -100; ll <= 100; ll++) {
if (ll != 0 && showIandV ) continue;
var yl = maxy - ((maxy * ll * gridStep  / gridMax)|0);
if (yl < 0 || yl >= rh - 1 ) continue;
col = (ll == 0 ? -7303024 : -12566464);
if (ll % 10 != 0) {
col = -15724528;
if (!sublines) continue;
}for (var ii = 0, off = yl * rw; ii < rw; ii++) this.pixels[ii + off] = col;

}
gridStep = 1.0E-15;
var ts = this.sim.timeStep * this.speed;
while (gridStep < ts * 5 )gridStep *= 10;

var tstart = this.sim.t - this.sim.timeStep * this.speed * rw ;
var tx = this.sim.t - (this.sim.t % gridStep);
for (var ll = 0; ; ll++) {
var tl = tx - gridStep * ll;
var gx = (((tl - tstart) / ts)|0);
if (gx < 0) break;
if (gx >= rw) continue;
if (tl < 0 ) continue;
col = -14671840;
if (((tl + gridStep / 4) % (gridStep * 10)) < gridStep ) {
col = -7303024;
if (((tl + gridStep / 4) % (gridStep * 100)) < gridStep ) col = -12566320;
}for (var i = 0; i < plen; i = i+(rw)) this.pixels[i + gx] = col;

}
var f = maxy / this.minMaxI;
if (this.value == 0 && this.showI ) {
var ox = -1;
var oy = -1;
for (var i = 0; i != rw; i++) {
var ip = (i + ipa) & spcm1;
var xi = x + i;
var minip = this.minI[ip];
var maxip = this.maxI[ip];
var miniy = ((f * minip)|0);
var maxiy = ((f * maxip)|0);
if (maxip > realMaxI ) realMaxI = maxip;
if (minip < realMinI ) realMinI = minip;
if (miniy <= maxy) {
if (miniy < -minRange || maxiy > minRange ) gotI = true;
if (ox != -1) {
if (miniy == oy && maxiy == oy ) continue;
for (var j = ox, off = rw * (y - oy); j != xi; j++) this.pixels[j + off] = curColor;

ox = oy = -1;
}if (miniy == maxiy) {
ox = x + i;
oy = miniy;
continue;
}for (var j = miniy; j <= maxiy; j++) this.pixels[xi + rw * (y - j)] = curColor;

}}
}if (this.value != 0 || this.showV ) {
var ox = -1;
var oy = -1;
for (var i = 0; i != rw; i++) {
var ip = (i + ipa) & spcm1;
var xi = x + i;
var minip = this.minI[ip];
var maxip = this.maxI[ip];
var minvy = ((f * minip)|0);
var maxvy = ((f * maxip)|0);
if (maxip > realMaxV ) realMaxV = maxip;
if (minip < realMinV ) realMinV = minip;
if (minvy <= maxy) {
if (minvy < -minRange || maxvy > minRange ) gotV = true;
if (ox != -1) {
if (minvy == oy && maxvy == oy ) continue;
for (var j = ox, off = rw * (y - oy); j != xi; j++) this.pixels[j + off] = voltColor;

ox = oy = -1;
}if (minvy == maxvy) {
ox = xi;
oy = minvy;
continue;
}for (var j = minvy; j <= maxvy; j++) this.pixels[xi + rw * (y - j)] = voltColor;

}}
}var freq = 0;
if (this.$showFreq) {
var avg = 0;
for (var i = 0; i != rw; i++) {
var ip = (i + ipa) & spcm1;
avg += this.minV[ip] + this.maxV[ip];
}
avg /= (rw * 2);
var state = 0;
var thresh = avg * 0.05;
var oi = 0;
var avperiod = 0;
var periodct = -1;
var avperiod2 = 0;
for (var i = 0; i < rw; i++) {
var ip = (i + ipa) & spcm1;
var q = this.maxV[ip] - avg;
var os = state;
if (q < thresh ) state = 1;
 else if (q > -thresh ) state = 2;
if (state == 2 && os == 1 ) {
var pd = i - oi;
oi = i;
if (pd < 12) continue;
if (periodct >= 0) {
avperiod += pd;
avperiod2 += pd * pd;
}periodct++;
}}
avperiod /= periodct;
avperiod2 /= periodct;
var periodstd = Math.sqrt(avperiod2 - avperiod * avperiod);
freq = 1 / (avperiod * this.sim.timeStep * this.speed );
if (periodct < 1 || periodstd > 2  ) freq = 0;
}g.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.image, this.rect.x, this.rect.y, null);
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).whiteColor);
var yt = this.rect.y + 10;
x = x+(this.rect.x);
if (this.$showMax) {
if (this.value != 0) g.drawString$S$I$I((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).getUnitText$D$S(realMaxV, this.elm.getScopeUnits$I(this.value)), x, yt);
 else if (this.showV) g.drawString$S$I$I((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).getVoltageText$D(realMaxV), x, yt);
 else if (this.showI) g.drawString$S$I$I((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).getCurrentText$D(realMaxI), x, yt);
yt = yt+(15);
}if (this.$showMin) {
var ym = this.rect.y + rh - 5;
if (this.value != 0) g.drawString$S$I$I((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).getUnitText$D$S(realMinV, this.elm.getScopeUnits$I(this.value)), x, ym);
 else if (this.showV) g.drawString$S$I$I((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).getVoltageText$D(realMinV), x, ym);
 else if (this.showI) g.drawString$S$I$I((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).getCurrentText$D(realMinI), x, ym);
}if (this.text != null  && this.rect.y + rh > yt + 5 ) {
g.drawString$S$I$I(this.text, x, yt);
yt = yt+(15);
}if (this.$showFreq && freq != 0   && this.rect.y + rh > yt + 5 ) g.drawString$S$I$I((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).getUnitText$D$S(freq, "Hz"), x, yt);
if (this.ptr > 5 && !this.lockScale ) {
if (!gotI && this.minMaxI > 1.0E-4  ) this.minMaxI /= 2;
if (!gotV && this.minMaxV > 1.0E-4  ) this.minMaxV /= 2;
}});

Clazz.newMeth(C$, 'speedUp', function () {
if (this.speed > 1) {
this.speed = (this.speed/(2)|0);
this.resetGraph();
}});

Clazz.newMeth(C$, 'slowDown', function () {
this.speed = this.speed*(2);
this.resetGraph();
});

Clazz.newMeth(C$, 'getMenu', function () {
if (this.elm == null ) return null;
if (Clazz.instanceOf(this.elm, "com.falstad.circuit.TransistorElm")) {
this.sim.scopeIbMenuItem.setState$Z(this.value == 1);
this.sim.scopeIcMenuItem.setState$Z(this.value == 2);
this.sim.scopeIeMenuItem.setState$Z(this.value == 3);
this.sim.scopeVbeMenuItem.setState$Z(this.value == 4);
this.sim.scopeVbcMenuItem.setState$Z(this.value == 5);
this.sim.scopeVceMenuItem.setState$Z(this.value == 6 && this.ivalue != 2 );
this.sim.scopeVceIcMenuItem.setState$Z(this.value == 6 && this.ivalue == 2 );
return this.sim.transScopeMenu;
} else {
this.sim.scopeVMenuItem.setState$Z(this.showV && this.value == 0 );
this.sim.scopeIMenuItem.setState$Z(this.showI && this.value == 0 );
this.sim.scopeMaxMenuItem.setState$Z(this.$showMax);
this.sim.scopeMinMenuItem.setState$Z(this.$showMin);
this.sim.scopeFreqMenuItem.setState$Z(this.$showFreq);
this.sim.scopePowerMenuItem.setState$Z(this.value == 1);
this.sim.scopeVIMenuItem.setState$Z(this.plot2d && !this.plotXY );
this.sim.scopeXYMenuItem.setState$Z(this.plotXY);
this.sim.scopeSelectYMenuItem.setEnabled$Z(this.plotXY);
this.sim.scopeResistMenuItem.setState$Z(this.value == 2);
this.sim.scopeResistMenuItem.setEnabled$Z(Clazz.instanceOf(this.elm, "com.falstad.circuit.MemristorElm"));
return this.sim.scopeMenu;
}});

Clazz.newMeth(C$, 'setValue$I', function (x) {
this.reset();
this.value = x;
});

Clazz.newMeth(C$, 'dump', function () {
if (this.elm == null ) return null;
var flags = (this.showI ? 1 : 0) | (this.showV ? 2 : 0) | (this.$showMax ? 0 : 4) | (this.$showFreq ? 8 : 0) | (this.lockScale ? 16 : 0) | (this.plot2d ? 64 : 0) | (this.plotXY ? 128 : 0) | (this.$showMin ? 256 : 0) ;
flags = flags|(32);
var eno = this.sim.locateElm$com_falstad_circuit_CircuitElm(this.elm);
if (eno < 0) return null;
var yno = this.yElm == null  ? -1 : this.sim.locateElm$com_falstad_circuit_CircuitElm(this.yElm);
var x = "o " + eno + " " + this.speed + " " + this.value + " " + flags + " " + new Double(this.minMaxV).toString() + " " + new Double(this.minMaxI).toString() + " " + this.position + " " + yno ;
if (this.text != null ) x += " " + this.text;
return x;
});

Clazz.newMeth(C$, 'undump$java_util_StringTokenizer', function (st) {
this.reset();
var e =  new Integer(st.nextToken()).intValue();
if (e == -1) return;
this.elm = this.sim.getElm$I(e);
this.speed =  new Integer(st.nextToken()).intValue();
this.value =  new Integer(st.nextToken()).intValue();
var flags =  new Integer(st.nextToken()).intValue();
this.minMaxV =  new Double(st.nextToken()).doubleValue();
this.minMaxI =  new Double(st.nextToken()).doubleValue();
if (this.minMaxV == 0 ) this.minMaxV = 0.5;
if (this.minMaxI == 0 ) this.minMaxI = 1;
this.text = null;
this.yElm = null;
try {
this.position =  new Integer(st.nextToken()).intValue();
var ye = -1;
if ((flags & 32) != 0) {
ye =  new Integer(st.nextToken()).intValue();
if (ye != -1) this.yElm = this.sim.getElm$I(ye);
}while (st.hasMoreTokens()){
if (this.text == null ) this.text = st.nextToken();
 else this.text += " " + st.nextToken();
}
} catch (ee) {
if (Clazz.exceptionOf(ee, Exception)){
} else {
throw ee;
}
}
this.showI = (flags & 1) != 0;
this.showV = (flags & 2) != 0;
this.$showMax = (flags & 4) == 0;
this.$showFreq = (flags & 8) != 0;
this.lockScale = (flags & 16) != 0;
this.plot2d = (flags & 64) != 0;
this.plotXY = (flags & 128) != 0;
this.$showMin = (flags & 256) != 0;
});

Clazz.newMeth(C$, 'allocImage', function () {
this.pixels = null;
var w = this.rect.width;
var h = this.rect.height;
var n = w * h;
if (w == 0 || h == 0 ) return;
if (this.sim.useBufferedImage) {
try {
this.image = Clazz.new_((I$[2]||(I$[2]=Clazz.load('java.awt.image.BufferedImage'))).c$$I$I$I,[w, h, 1]);
var db = ((this.image).getRaster().getDataBuffer());
var dbi = db;
this.pixels = dbi.getData();
} catch (ee) {
if (Clazz.exceptionOf(ee, Exception)){
System.out.println$S("BufferedImage failed");
} else {
throw ee;
}
}
}if (this.pixels == null ) {
this.pixels = Clazz.array(Integer.TYPE, [n]);
for (var i = n; --i >= 0; ) this.pixels[i] = -16777216;

this.imageSource = Clazz.new_((I$[3]||(I$[3]=Clazz.load('java.awt.image.MemoryImageSource'))).c$$I$I$IA$I$I,[w, h, this.pixels, 0, w]);
this.imageSource.setAnimated$Z(true);
this.imageSource.setFullBufferUpdates$Z(true);
this.image = this.sim.cv.createImage$java_awt_image_ImageProducer(this.imageSource);
}this.dpixels = Clazz.array(Float.TYPE, [n]);
this.draw_ox = this.draw_oy = -1;
});

Clazz.newMeth(C$, 'handleMenu$java_awt_event_ItemEvent$O', function (e, mi) {
if (mi === this.sim.scopeVMenuItem ) this.showVoltage$Z(this.sim.scopeVMenuItem.getState());
 else if (mi === this.sim.scopeIMenuItem ) this.showCurrent$Z(this.sim.scopeIMenuItem.getState());
 else if (mi === this.sim.scopeMaxMenuItem ) this.showMax$Z(this.sim.scopeMaxMenuItem.getState());
 else if (mi === this.sim.scopeMinMenuItem ) this.showMin$Z(this.sim.scopeMinMenuItem.getState());
 else if (mi === this.sim.scopeFreqMenuItem ) this.showFreq$Z(this.sim.scopeFreqMenuItem.getState());
 else if (mi === this.sim.scopePowerMenuItem ) this.setValue$I(1);
 else if (mi === this.sim.scopeIbMenuItem ) this.setValue$I(1);
 else if (mi === this.sim.scopeIcMenuItem ) this.setValue$I(2);
 else if (mi === this.sim.scopeIeMenuItem ) this.setValue$I(3);
 else if (mi === this.sim.scopeVbeMenuItem ) this.setValue$I(4);
 else if (mi === this.sim.scopeVbcMenuItem ) this.setValue$I(5);
 else if (mi === this.sim.scopeVceMenuItem ) this.setValue$I(6);
 else if (mi === this.sim.scopeVceIcMenuItem ) {
this.plot2d = true;
this.plotXY = false;
this.value = 6;
this.ivalue = 2;
this.resetGraph();
} else if (mi === this.sim.scopeVIMenuItem ) {
this.plot2d = this.sim.scopeVIMenuItem.getState();
this.plotXY = false;
this.resetGraph();
} else if (mi === this.sim.scopeXYMenuItem ) {
this.plotXY = this.plot2d = this.sim.scopeXYMenuItem.getState();
if (this.yElm == null ) this.selectY();
this.resetGraph();
} else if (mi === this.sim.scopeResistMenuItem ) this.setValue$I(2);
});

Clazz.newMeth(C$, 'select', function () {
this.sim.mouseElm = this.elm;
if (this.plotXY) {
this.sim.plotXElm = this.elm;
this.sim.plotYElm = this.yElm;
}});

Clazz.newMeth(C$, 'selectY', function () {
var e = (this.yElm == null  ? -1 : this.sim.locateElm$com_falstad_circuit_CircuitElm(this.yElm));
var firstE = e;
var n = this.sim.elmList.size();
while (true){
for (e++; e < n; e++) {
var ce = this.sim.getElm$I(e);
switch (ce.getDumpType()) {
case 79:
case 112:
if (ce !== this.elm ) {
this.yElm = ce;
return;
}break;
}
}
if (firstE == -1) return;
e = firstE = -1;
}
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:21
