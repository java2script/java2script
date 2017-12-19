(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "AntennaFrame", function(){
Clazz.newInstance(this, arguments,0,C$);
}, 'a2s.Frame', ['java.awt.event.ComponentListener', 'java.awt.event.ActionListener', 'java.awt.event.AdjustmentListener', 'java.awt.event.MouseMotionListener', 'java.awt.event.MouseListener', 'java.awt.event.ItemListener']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.engine = null;
this.winSize = null;
this.dbimage = null;
this.random = null;
this.windowWidth = 0;
this.windowHeight = 0;
this.wallWidth = 0;
this.stoppedCheck = null;
this.memoryImageSourceCheck = null;
this.intensityCheck = null;
this.graphCheck = null;
this.infoCheck = null;
this.setupChooser = null;
this.setupList = null;
this.setup = null;
this.zoomBar = null;
this.angleBar = null;
this.freqBar = null;
this.resBar = null;
this.speedBar = null;
this.brightnessBar = null;
this.colorMult = 0;
this.auxLabels = null;
this.auxBars = null;
this.colorFunc = null;
this.apertureR = null;
this.apertureI = null;
this.dragX = 0;
this.dragY = 0;
this.xpoints = null;
this.ypoints = null;
this.dragging = false;
this.dragClear = false;
this.dragSet = false;
this.recompute = false;
this.t = 0;
this.wavelength = 0;
this.pause = 0;
this.imageSource = null;
this.pixels = null;
this.viewFourier = null;
this.viewGraph = null;
this.fourierFunc = null;
this.arrayCount = 0;
this.arrayStart = 0;
this.arraySep = 0;
this.phaseColors = null;
this.cv = null;
this.applet = null;
this.useFrame = false;
this.main = null;
this.shown = false;
this.calculateNotice = false;
this.resBarValue = 0;
this.bessj0 = 0;
this.bessy0 = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.engine = null;
this.windowWidth = 50;
this.windowHeight = 50;
this.arrayCount = 0;
this.shown = false;
this.resBarValue = -1;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "Antenna by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'c$$com_falstad_Antenna', function (a) {
C$.superclazz.c$$S.apply(this, ["Antenna Applet"]);
C$.$init$.apply(this);
this.applet = a;
if (a == null ) this.useFrame = true;
}, 1);

Clazz.newMeth(C$, 'init', function () {
this.setupList = Clazz.new_((I$[10]||(I$[10]=Clazz.load('java.util.Vector'))));
var s = Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.AntennaFrame').LinearSetup))), [this, null]);
while (s != null ){
this.setupList.addElement$TE(s);
s = s.createNext();
}
try {
if (this.applet != null ) {
var param = this.applet.getParameter$S("useFrame");
if (param != null  && param.equalsIgnoreCase$S("false") ) this.useFrame = false;
}} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
e.printStackTrace();
} else {
throw e;
}
}
if (this.useFrame) this.main = this;
 else this.main = this.applet;
var os = System.getProperty("os.name");
var jv = System.getProperty("java.version");
this.fourierFunc = Clazz.array(Double.TYPE, [181]);
this.main.setLayout$java_awt_LayoutManager(Clazz.new_((I$[12]||(I$[12]=Clazz.load('com.falstad.AntennaLayout')))));
this.cv = Clazz.new_((I$[13]||(I$[13]=Clazz.load('com.falstad.AntennaCanvas'))).c$$com_falstad_AntennaFrame,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
this.main.add$java_awt_Component(this.cv);
this.setupChooser = Clazz.new_((I$[14]||(I$[14]=Clazz.load('a2s.Choice'))));
var i;
for (i = 0; i != this.setupList.size(); i++) this.setupChooser.add$S("Setup: " + (this.setupList.elementAt$I(i)).getName());

this.setup = this.setupList.elementAt$I(0);
this.setupChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.setupChooser);
this.intensityCheck = Clazz.new_((I$[15]||(I$[15]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Show Intensity", true]);
this.intensityCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.intensityCheck);
this.graphCheck = Clazz.new_((I$[15]||(I$[15]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Show Graph", false]);
this.graphCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.graphCheck);
this.infoCheck = Clazz.new_((I$[15]||(I$[15]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Show Info", true]);
this.infoCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.infoCheck);
this.stoppedCheck = Clazz.new_((I$[15]||(I$[15]=Clazz.load('a2s.Checkbox'))).c$$S,["Stopped"]);
this.stoppedCheck.addItemListener$java_awt_event_ItemListener(this);
this.stoppedCheck.disable();
this.main.add$java_awt_Component(this.stoppedCheck);
this.memoryImageSourceCheck = Clazz.new_((I$[15]||(I$[15]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Alternate Rendering", true]);
this.memoryImageSourceCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[16]||(I$[16]=Clazz.load('a2s.Label'))).c$$S$I,["Speed", 0]));
this.main.add$java_awt_Component(this.speedBar = Clazz.new_((I$[17]||(I$[17]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 14, 1, 1, 40]));
this.speedBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.speedBar.disable();
this.main.add$java_awt_Component(Clazz.new_((I$[16]||(I$[16]=Clazz.load('a2s.Label'))).c$$S$I,["Zoom Out", 0]));
this.main.add$java_awt_Component(this.zoomBar = Clazz.new_((I$[17]||(I$[17]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 10, 1, 10, 200]));
this.zoomBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[16]||(I$[16]=Clazz.load('a2s.Label'))).c$$S$I,["Resolution", 0]));
this.main.add$java_awt_Component(this.resBar = Clazz.new_((I$[17]||(I$[17]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 300, 5, 120, 600]));
this.resBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[16]||(I$[16]=Clazz.load('a2s.Label'))).c$$S$I,["Source Frequency", 0]));
this.main.add$java_awt_Component(this.freqBar = Clazz.new_((I$[17]||(I$[17]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 120, 1, 1, 236]));
this.freqBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[16]||(I$[16]=Clazz.load('a2s.Label'))).c$$S$I,["Brightness", 0]));
this.main.add$java_awt_Component(this.brightnessBar = Clazz.new_((I$[17]||(I$[17]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 27, 1, 1, 1000]));
this.brightnessBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.auxLabels = Clazz.array((I$[16]||(I$[16]=Clazz.load('a2s.Label'))), [5]);
this.auxBars = Clazz.array((I$[17]||(I$[17]=Clazz.load('a2s.Scrollbar'))), [5]);
for (i = 0; i != 5; i++) {
this.main.add$java_awt_Component(this.auxLabels[i] = Clazz.new_((I$[16]||(I$[16]=Clazz.load('a2s.Label'))).c$$S$I,["Aux " + (i + 1), 0]));
this.main.add$java_awt_Component(this.auxBars[i] = Clazz.new_((I$[17]||(I$[17]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 50, 1, 0, 100]));
this.auxBars[i].addAdjustmentListener$java_awt_event_AdjustmentListener(this);
}
this.main.add$java_awt_Component(Clazz.new_((I$[16]||(I$[16]=Clazz.load('a2s.Label'))).c$$S,["http://www.falstad.com"]));
try {
var param = this.applet.getParameter$S("PAUSE");
if (param != null ) this.pause = Integer.parseInt(param);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
this.phaseColors = Clazz.array((I$[18]||(I$[18]=Clazz.load('java.awt.Color'))), [481]);
for (i = 0; i != 480; i++) {
var pm = 80;
var a1 = i % pm;
var a2 = (a1 * 255/pm|0);
var a3 = 255 - a2;
var c = null;
switch ((i/pm|0)) {
case 0:
c = Clazz.new_((I$[18]||(I$[18]=Clazz.load('java.awt.Color'))).c$$I$I$I,[255, a2, 0]);
break;
case 1:
c = Clazz.new_((I$[18]||(I$[18]=Clazz.load('java.awt.Color'))).c$$I$I$I,[a3, 255, 0]);
break;
case 2:
c = Clazz.new_((I$[18]||(I$[18]=Clazz.load('java.awt.Color'))).c$$I$I$I,[0, 255, a2]);
break;
case 3:
c = Clazz.new_((I$[18]||(I$[18]=Clazz.load('java.awt.Color'))).c$$I$I$I,[0, a3, 255]);
break;
case 4:
c = Clazz.new_((I$[18]||(I$[18]=Clazz.load('java.awt.Color'))).c$$I$I$I,[a2, 0, 255]);
break;
case 5:
c = Clazz.new_((I$[18]||(I$[18]=Clazz.load('java.awt.Color'))).c$$I$I$I,[255, 0, a3]);
break;
}
this.phaseColors[i] = c;
}
this.phaseColors[480] = this.phaseColors[0];
this.random = Clazz.new_((I$[19]||(I$[19]=Clazz.load('java.util.Random'))));
this.setResolution();
this.reinit();
this.setup = this.setupList.elementAt$I(0);
this.cv.setBackground$java_awt_Color((I$[18]||(I$[18]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[18]||(I$[18]=Clazz.load('java.awt.Color'))).lightGray);
if (this.useFrame) {
this.setSize$I$I(800, 640);
this.handleResize();
var x = this.getSize();
var screen = this.getToolkit().getScreenSize();
this.setLocation$I$I(((screen.width - x.width)/2|0), ((screen.height - x.height)/2|0));
this.setVisible$Z(true);
} else {
this.setVisible$Z(false);
this.handleResize();
this.applet.validate();
this.cv.repaint();
}this.main.requestFocus();
});

Clazz.newMeth(C$, 'reinit', function () {
this.doSetup();
});

Clazz.newMeth(C$, 'apertureChanged', function () {
this.clearAperture();
this.setup.doAperture();
var i;
var maxf = 0;
for (i = 0; i != this.wallWidth; i++) {
var f = java.lang.Math.sqrt(this.apertureR[i] * this.apertureR[i] + this.apertureI[i] * this.apertureI[i]);
if (f > maxf ) maxf = f;
}
for (i = 0; i != this.wallWidth; i++) {
this.apertureR[i] /= maxf;
this.apertureI[i] /= maxf;
}
this.recompute = true;
});

Clazz.newMeth(C$, 'triggerShow', function () {
if (!this.shown) this.setVisible$Z(true);
this.shown = true;
});

Clazz.newMeth(C$, 'handleResize', function () {
var d = this.winSize = this.cv.getSize();
if (this.winSize.width == 0) return;
this.dbimage = this.cv.createImage$I$I(d.width, d.height);
this.pixels = Clazz.array(Integer.TYPE, [d.width * d.height]);
var i;
for (i = 0; i != d.width * d.height; i++) this.pixels[i] = -16777216;

this.imageSource = Clazz.new_((I$[20]||(I$[20]=Clazz.load('java.awt.image.MemoryImageSource'))).c$$I$I$IA$I$I,[d.width, d.height, this.pixels, 0, d.width]);
this.viewFourier = Clazz.new_((I$[21]||(I$[21]=Clazz.load('java.awt.Rectangle'))).c$$I$I$I$I,[this.winSize.width - 100, this.winSize.height - 100, 100, 100]);
});

Clazz.newMeth(C$, 'handleEvent$java_awt_Event', function (ev) {
if (ev.id == 201) {
if (this.applet == null ) this.dispose();
 else this.applet.destroyFrame();
return true;
}return C$.superclazz.prototype.handleEvent$java_awt_Event.apply(this, [ev]);
});

Clazz.newMeth(C$, 'centerString$java_awt_Graphics$S$I', function (g, s, y) {
var fm = g.getFontMetrics();
g.drawString$S$I$I(s, ((this.winSize.width - fm.stringWidth$S(s))/2|0), y);
});

Clazz.newMeth(C$, 'updateAntenna$java_awt_Graphics', function (realg) {
if (this.winSize == null  || this.winSize.width == 0 ) {
this.handleResize();
return;
}var g = null;
if (!this.calculateNotice && this.recompute ) {
var fm = realg.getFontMetrics();
realg.setColor$java_awt_Color((I$[18]||(I$[18]=Clazz.load('java.awt.Color'))).black);
var cs = "Calculating...";
realg.fillRect$I$I$I$I(0, this.winSize.height - 30, 20 + fm.stringWidth$S(cs), 30);
realg.setColor$java_awt_Color((I$[18]||(I$[18]=Clazz.load('java.awt.Color'))).white);
realg.drawString$S$I$I(cs, 10, this.winSize.height - 10);
this.cv.repaint$J(0);
this.calculateNotice = true;
return;
}this.calculateNotice = false;
var mis = true;
g = this.dbimage.getGraphics();
if (!mis) {
g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(0, 0, this.winSize.width, this.winSize.height);
}var tadd = 0;
if (!this.stoppedCheck.getState()) {
var val = this.speedBar.getValue();
tadd = val * 0.05;
tadd += val * this.getrand$I(20) * 2.7279275E-5 ;
tadd *= this.freqBar.getValue() / 34.0;
this.t += tadd;
}var trotr = Math.cos(this.t);
var troti = Math.sin(this.t);
var i;
var j;
var stopFunc = false;
if (this.stoppedCheck.getState()) stopFunc = true;
if (this.recompute) {
this.recompute = false;
var zoom = (this.zoomBar.getValue() / 10.0);
var apStart = -1;
var apEnd = -1;
var compWidth = ((zoom * this.windowWidth)|0);
for (i = 0; i != this.wallWidth; i++) {
if (this.apertureR[i] != 0  || this.apertureI[i] != 0  ) {
apEnd = i;
if (apStart == -1) apStart = i;
}}
if (apStart == -1) apStart = apEnd = (this.wallWidth/2|0);
var waveStart = (this.wallWidth/2|0) - apEnd;
var waveEnd = (this.wallWidth/2|0) + (compWidth/2|0) - apStart;
var sz = 1;
while (sz < compWidth + waveEnd - waveStart)sz = sz*(2);

var szm = sz * 2 - 1;
var line1 = Clazz.array(Double.TYPE, [sz * 2]);
var line2 = Clazz.array(Double.TYPE, [sz * 2]);
var line1_last = Clazz.array(Double.TYPE, [sz * 2]);
for (i = 0; i != this.wallWidth; i++) if (this.apertureR[i] != 0  || this.apertureI[i] != 0  ) {
var ii = (i - (this.wallWidth/2|0)) * 2;
var i0 = i - (this.wallWidth/2|0);
line2[ii & szm] = this.apertureR[i];
line2[(ii + 1) & szm] = this.apertureI[i];
}
this.four1$DA$I$I(line2, sz, 1);
var m = this.freqBar.getValue() / 120.0;
var m0 = Math.sqrt(m);
this.wavelength = 6.283185307179586 / m;
var jh = (this.windowHeight/2|0);
var dipole = Clazz.instanceOf(this.setup, "com.falstad.AntennaFrame.LinearSetup");
for (j = 0; j <= jh; j++) {
for (i = 0; i != sz * 2; i++) line1[i] = 0;

var jj = j - jh;
var jz2 = jj * jj * zoom * zoom ;
var i2;
var sz2 = sz * 2;
for (i = i2 = 0; i <= waveEnd; i++, i2 = i2+(2)) {
var dist1 = Math.sqrt(i * i + jz2);
var dist2 = dist1 * m;
var dr = 1 / (dist1 + 1.0E-4);
line1[i2] = Math.cos(dist2) * dr;
line1[i2 + 1] = -Math.sin(dist2) * dr;
if (dipole) {
var jz3a = jj * zoom + 1;
var jz32 = jz3a * jz3a;
dist1 = Math.sqrt(i * i + jz32);
dist2 = dist1 * m;
dr = 1 / (dist1 + 1.0E-4);
line1[i2] -= Math.cos(dist2) * dr;
line1[i2 + 1] += Math.sin(dist2) * dr;
}if (i > 0) {
line1[sz2 - i2] = line1[i2];
line1[sz2 - i2 + 1] = line1[i2 + 1];
}}
this.four1$DA$I$I(line1, sz, 1);
for (i = 0; i != sz; i++) {
var ii = i * 2;
var a = line1[ii] * line2[ii] - line1[ii + 1] * line2[ii + 1];
var b = line1[ii + 1] * line2[ii] + line1[ii] * line2[ii + 1];
line1[ii] = a;
line1[ii + 1] = b;
}
this.four1$DA$I$I(line1, sz, -1);
var qmult = 400.0 / sz;
var oaddr = 0;
var oaddi = 0;
for (i = 0; i != this.windowWidth; i++) {
var ir1 = (((i - (this.windowWidth/2|0)) * zoom)|0);
var ir2 = (((i - (this.windowWidth/2|0) + 1) * zoom)|0);
var ii1 = (ir1|0);
var ii2 = (ir2|0);
var iic = ii2 - ii1;
if (this.intensityCheck.getState()) this.colorFunc[i][j][0] = 0;
 else {
this.colorFunc[i][j][0] = 0;
this.colorFunc[i][j][1] = 0;
}var ii;
for (ii = ii1; ii <= ii2; ii++) {
var q1 = line1[szm & (ii * 2)] * qmult;
var q2 = line1[szm & (ii * 2 + 1)] * qmult;
var mu = 0.001;
if (ii == ii1) mu *= 1 - (ir1 - ii1);
 else if (ii == ii2) mu *= ir2 - ii2;
if (this.intensityCheck.getState()) this.colorFunc[i][j][0] += (q1 * q1 + q2 * q2) * mu;
 else {
this.colorFunc[i][j][0] += q1 * mu;
this.colorFunc[i][j][1] += q2 * mu;
}}
if (this.intensityCheck.getState()) {
this.colorFunc[i][j][0] /= ir2 - ir1;
} else {
this.colorFunc[i][j][0] /= ir2 - ir1;
this.colorFunc[i][j][1] /= ir2 - ir1;
}}
}
var sign = (this.intensityCheck.getState() || !dipole ) ? 1 : -1;
for (j = 0; j != jh; j++) {
var j2 = this.windowHeight - 1 - j ;
for (i = 0; i != this.windowWidth; i++) {
this.colorFunc[i][j2][0] = sign * this.colorFunc[i][j][0];
this.colorFunc[i][j2][1] = sign * this.colorFunc[i][j][1];
}
}
}this.colorMult = 30 * Math.exp(this.brightnessBar.getValue() / 50.0 - 10);
if (!this.intensityCheck.getState()) this.colorMult *= 1.5;
var ix = 0;
var k;
var l;
for (j = 0; j != this.windowHeight; j++) {
for (i = 0; i != this.windowWidth; i++) {
var x = (i * this.winSize.width/this.windowWidth|0);
var y = (j * this.winSize.height/this.windowHeight|0);
var x2 = ((i + 1) * this.winSize.width/this.windowWidth|0);
var y2 = ((j + 1) * this.winSize.height/this.windowHeight|0);
var colval = 0;
if (this.intensityCheck.getState()) {
colval = -16777216 + (this.getColorValue$I$I$I(i, j, 0) << 8);
} else {
var q1 = this.colorFunc[i][j][0];
var q2 = this.colorFunc[i][j][1];
var q = (q1 * trotr - q2 * troti) * this.colorMult;
if (q > 0 ) {
var qq = ((q * 255)|0);
if (qq > 255) qq = 255;
colval = -16777216 + (qq << 8);
} else {
var qq = ((-q * 255)|0);
if (qq > 255) qq = 255;
colval = -16777216 + (qq << 16);
}}if (mis) {
for (k = x; k < x2; k++) for (l = y; l < y2; l++) this.pixels[k + l * this.winSize.width] = colval;


} else {
g.setColor$java_awt_Color(Clazz.new_((I$[18]||(I$[18]=Clazz.load('java.awt.Color'))).c$$I,[colval]));
g.fillRect$I$I$I$I(x, y, x2 - x, y2 - y);
}}
}
var zoom = (this.zoomBar.getValue() / 10.0);
for (i = 0; i != this.windowWidth; i++) {
var ir1 = (((i - (this.windowWidth/2|0)) * zoom)|0);
var ir2 = (((i - (this.windowWidth/2|0) + 1) * zoom)|0);
var ii1 = (ir1|0);
var ii2 = (ir2|0);
var iic = ii2 - ii1;
var ii;
var funcr = 0;
var funcb = 0;
for (ii = ii1; ii <= ii2; ii++) {
var ij = ii + (this.wallWidth/2|0);
if (ij < 0 || ij >= this.wallWidth ) continue;
var mu = 1;
if (ii == ii1) mu *= 1 - (ir1 - ii1);
 else if (ii == ii2) mu *= ir2 - ii2;
funcb += (this.apertureR[ij] * this.apertureR[ij] + this.apertureI[ij] * this.apertureI[ij]) * mu;
var ph = Math.atan2(this.apertureI[ij], this.apertureR[ij]) / 3.141592653589793;
if (ph < 0 ) funcr += (2 + ph) * mu;
 else funcr += ph * mu;
}
funcb /= ir2 - ir1;
funcr /= (ir2 - ir1) * 2;
var valb = ((funcb * 255)|0);
var valr = ((funcr * funcb * 255 )|0);
if (valb < 64) valb = 64;
if (valb > 255) valb = 255;
if (valr < 0) valr = 0;
if (valr > 255) valr = 255;
if (funcb == 0 ) continue;
var colval = -16777216 + (valr << 16) | valb;
var x = (i * this.winSize.width/this.windowWidth|0);
var x2 = ((i + 1) * this.winSize.width/this.windowWidth|0);
var y = (((this.windowHeight/2|0)) * this.winSize.height/this.windowHeight|0);
var y2 = (((this.windowHeight/2|0) + 1) * this.winSize.height/this.windowHeight|0);
if (mis) {
for (k = x; k < x2; k++) for (l = y; l < y2; l++) this.pixels[k + l * this.winSize.width] = colval;


} else {
g.setColor$java_awt_Color(Clazz.new_((I$[18]||(I$[18]=Clazz.load('java.awt.Color'))).c$$I,[colval]));
g.fillRect$I$I$I$I(x, y, x2 - x, y2 - y);
}}
if (mis) {
var img = this.cv.createImage$java_awt_image_ImageProducer(this.imageSource);
g.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(img, 0, 0, this);
}if (Clazz.instanceOf(this.setup, "com.falstad.AntennaFrame.FourierFunctionSetup")) {
g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(this.viewFourier.x, this.viewFourier.y, this.viewFourier.width, this.viewFourier.height);
var cx = this.viewFourier.x + (this.viewFourier.width/2|0);
var cy = this.viewFourier.y + this.viewFourier.height - 10;
var cr = 40;
var ox = -1;
var oy = -1;
g.setColor$java_awt_Color((I$[18]||(I$[18]=Clazz.load('java.awt.Color'))).darkGray);
g.drawLine$I$I$I$I(this.viewFourier.x, cy, this.viewFourier.x + this.viewFourier.width, cy);
g.drawLine$I$I$I$I(cx, this.viewFourier.y, cx, cy);
g.setColor$java_awt_Color((I$[18]||(I$[18]=Clazz.load('java.awt.Color'))).white);
for (i = 0; i <= 180; i++) {
var ang = (180 - i) * 3.141592653589793 / 180.0;
var x = cx + ((Math.cos(ang) * cr * this.fourierFunc[i] )|0);
var y = cy - ((Math.sin(ang) * cr * this.fourierFunc[i] )|0);
if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
ox = x;
oy = y;
}
}var infoWidth = 100;
if (this.infoCheck.getState()) {
var nf = (I$[22]||(I$[22]=Clazz.load('java.text.NumberFormat'))).getInstance();
nf.setMaximumFractionDigits$I(2);
var s = this.setup.getInfo$java_text_NumberFormat(nf);
if (s != null ) {
g.setColor$java_awt_Color((I$[18]||(I$[18]=Clazz.load('java.awt.Color'))).black);
var fm = g.getFontMetrics();
var x = 20 + fm.stringWidth$S(s);
g.fillRect$I$I$I$I(this.winSize.width - x, this.winSize.height - 30, x, 30);
g.setColor$java_awt_Color((I$[18]||(I$[18]=Clazz.load('java.awt.Color'))).white);
g.drawString$S$I$I(s, this.winSize.width - x + 10, this.winSize.height - 10);
infoWidth = x;
}}if (this.graphCheck.getState()) {
this.viewGraph = Clazz.new_((I$[21]||(I$[21]=Clazz.load('java.awt.Rectangle'))).c$$I$I$I$I,[0, this.winSize.height - 100, this.winSize.width - infoWidth, 100]);
g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(this.viewGraph.x, this.viewGraph.y, this.viewGraph.width, this.viewGraph.height);
var cx = this.viewGraph.x + (this.viewGraph.width/2|0);
var cy = this.viewGraph.y + this.viewGraph.height - 10;
g.setColor$java_awt_Color((I$[18]||(I$[18]=Clazz.load('java.awt.Color'))).darkGray);
g.drawLine$I$I$I$I(this.viewGraph.x, cy, this.viewGraph.x + this.viewGraph.width, cy);
g.drawLine$I$I$I$I(cx, this.viewGraph.y, cx, this.viewGraph.y + this.viewGraph.height);
g.setColor$java_awt_Color((I$[18]||(I$[18]=Clazz.load('java.awt.Color'))).white);
var ox = -1;
var oy = -1;
var vheight = this.viewGraph.height - 20;
var spacing = (this.viewGraph.width/this.arrayCount|0);
for (i = 0; i != this.arrayCount; i++) {
var x = (i * this.viewGraph.width/this.arrayCount|0);
if (spacing > 1) {
x = i * spacing + (spacing/2|0) + ((this.viewGraph.width - (spacing * this.arrayCount))/2|0);
}var s = this.arrayStart + i * this.arraySep;
var f = Math.sqrt(this.apertureR[s] * this.apertureR[s] + this.apertureI[s] * this.apertureI[s]);
var y = cy - ((vheight * f)|0);
var ang = java.lang.Math.atan2(this.apertureI[s], this.apertureR[s]);
g.setColor$java_awt_Color(this.phaseColors[(((ang + 3.141592653589793) * 480 / 6.483185307179586)|0)]);
g.drawLine$I$I$I$I(x, y, x, cy);
}
}realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
if (!this.intensityCheck.getState() && !this.stoppedCheck.getState() ) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'getColorValue$I$I$I', function (i, j, k) {
var val = (this.colorFunc[i][j][k] * this.colorMult);
if (val > 255 ) val = 255;
return (val|0);
});

Clazz.newMeth(C$, 'abs$I', function (x) {
return x < 0 ? -x : x;
});

Clazz.newMeth(C$, 'sign$I', function (x) {
return (x < 0) ? -1 : (x == 0) ? 0 : 1;
});

Clazz.newMeth(C$, 'componentHidden$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentMoved$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentShown$java_awt_event_ComponentEvent', function (e) {
this.cv.repaint();
});

Clazz.newMeth(C$, 'componentResized$java_awt_event_ComponentEvent', function (e) {
this.handleResize();
this.cv.repaint$J(100);
});

Clazz.newMeth(C$, 'actionPerformed$java_awt_event_ActionEvent', function (e) {
});

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
System.out.print$S((e.getSource()).getValue() + "\n");
if (e.getSource() === this.resBar  && this.resBar.getValue() != this.resBarValue ) this.setResolution();
var i;
for (i = 0; i != 5; i++) if (e.getSource() === this.auxBars[i] ) {
this.apertureChanged();
break;
}
if (e.getSource() === this.zoomBar  || e.getSource() === this.freqBar  ) this.apertureChanged();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'setResolution', function () {
this.resBarValue = this.windowWidth = this.windowHeight = this.resBar.getValue();
if ((this.windowWidth & 1) == 1) this.windowWidth = this.windowHeight = this.resBarValue - 1;
this.windowHeight++;
this.colorFunc = Clazz.array(Double.TYPE, [this.windowWidth, this.windowHeight, 2]);
this.wallWidth = 512;
this.apertureR = Clazz.array(Double.TYPE, [this.wallWidth]);
this.apertureI = Clazz.array(Double.TYPE, [this.wallWidth]);
System.out.print$S(this.windowWidth + " " + this.windowHeight + "\n" );
this.apertureChanged();
});

Clazz.newMeth(C$, 'setResolution$I', function (x) {
this.resBar.setValue$I(x);
this.setResolution();
});

Clazz.newMeth(C$, 'mouseDragged$java_awt_event_MouseEvent', function (e) {
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'mouseMoved$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) != 0) return;
var x = e.getX();
var y = e.getY();
this.dragX = x;
this.dragY = y;
});

Clazz.newMeth(C$, 'mouseClicked$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseEntered$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseExited$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mousePressed$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
this.dragging = false;
this.dragSet = this.dragClear = false;
this.apertureChanged();
this.cv.repaint();
});

Clazz.newMeth(C$, 'edit$java_awt_event_MouseEvent', function (e) {
var x = e.getX();
var y = e.getY();
if (!this.viewFourier.contains$I$I(x, y)) return;
var cx = this.viewFourier.x + (this.viewFourier.width/2|0);
var cy = this.viewFourier.y + this.viewFourier.height - 10;
var cr = 40;
x = x-(cx);
y = y-(cy);
var ang2 = Math.atan2(-y, x);
var ai2 = ((180 - ang2 * 180 / 3.141592653589793)|0);
var x1 = this.dragX - cx;
var y1 = this.dragY - cy;
var ang1 = Math.atan2(-y1, x1);
var ai1 = ((180 - ang1 * 180 / 3.141592653589793)|0);
this.dragX = e.getX();
this.dragY = e.getY();
while (true){
if (ai2 < 0 || ai2 > 180 ) return;
this.fourierFunc[ai2] = Math.sqrt(x * x + y * y) / cr;
if (ai2 == ai1) break;
if (ai1 < ai2) ai2--;
 else ai2++;
}
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
if (e.getItemSelectable() === this.intensityCheck ) {
this.setResolution();
this.recompute = true;
this.cv.repaint();
if (this.intensityCheck.getState()) {
this.stoppedCheck.disable();
this.speedBar.disable();
} else {
this.stoppedCheck.enable();
this.speedBar.enable();
}return;
}if (e.getItemSelectable() === this.stoppedCheck  || e.getItemSelectable() === this.graphCheck   || e.getItemSelectable() === this.infoCheck  ) {
this.cv.repaint();
return;
}if (e.getItemSelectable() === this.memoryImageSourceCheck ) {
this.dbimage = this.createImage$I$I(this.winSize.width, this.winSize.height);
}if (e.getItemSelectable() === this.setupChooser ) {
this.doSetup();
this.cv.repaint$J(this.pause);
}});

Clazz.newMeth(C$, 'clearAperture', function () {
var i;
for (i = 0; i != this.wallWidth; i++) this.apertureR[i] = this.apertureI[i] = 0;

});

Clazz.newMeth(C$, 'doSetup', function () {
var i;
for (i = 0; i != 5; i++) this.auxBars[i].setValue$I(10);

this.freqBar.setValue$I(120);
this.zoomBar.setValue$I(10);
this.setup = this.setupList.elementAt$I(this.setupChooser.getSelectedIndex());
this.brightnessBar.setValue$I(500);
this.setup.select();
var m = this.freqBar.getValue() / 120.0;
this.wavelength = 6.283185307179586 / m;
this.apertureChanged();
for (i = 0; i < this.setup.getAuxBarCount(); i++) {
this.auxLabels[i].show();
this.auxBars[i].show();
}
for (; i < 5; i++) {
this.auxLabels[i].hide();
this.auxBars[i].hide();
}
this.validate();
});

Clazz.newMeth(C$, 'four1$DA$I$I', function (data, nn, isign) {
var n;
var mmax;
var m;
var j;
var istep;
var i;
var wtemp;
var wr;
var wpr;
var wpi;
var wi;
var theta;
var tempr;
var tempi;
n = nn << 1;
j = 1;
for (i = 1; i < n; i = i+(2)) {
if (j > i) {
tempr = data[j - 1];
data[j - 1] = data[i - 1];
data[i - 1] = tempr;
tempr = data[j];
data[j] = data[i];
data[i] = tempr;
}m = n >> 1;
while (m >= 2 && j > m ){
j = j-(m);
m = m>>(1);
}
j = j+(m);
}
mmax = 2;
while (n > mmax){
istep = 2 * mmax;
theta = 6.28318530717959 / (isign * mmax);
wtemp = Math.sin(0.5 * theta);
wpr = -2.0 * wtemp * wtemp ;
wpi = Math.sin(theta);
wr = 1.0;
wi = 0.0;
for (m = 1; m < mmax; m = m+(2)) {
for (i = m; i <= n; i = i+(istep)) {
j = i + mmax;
tempr = wr * data[j - 1] - wi * data[j];
tempi = wr * data[j] + wi * data[j - 1];
data[j - 1] = data[i - 1] - tempr;
data[j] = data[i] - tempi;
data[i - 1] += tempr;
data[i] += tempi;
}
wr = (wtemp = wr) * wpr - wi * wpi + wr;
wi = wi * wpr + wtemp * wpi + wi;
}
mmax = istep;
}
});

Clazz.newMeth(C$, 'computeBessel$D', function (x) {
var ax = x;
var z;
var xx;
var y;
var ans;
var ans1;
var ans2;
if (x < 8.0 ) {
y = x * x;
ans1 = 5.7568490574E10 + y * (-1.3362590354E10 + y * (6.516196407E8 + y * (-1.121442418E7 + y * (77392.33017 + y * -184.9052456))));
ans2 = 5.7568490411E10 + y * (1.029532985E9 + y * (9494680.718 + y * (59272.64853 + y * (267.8532712 + y * 1.0))));
this.bessj0 = ans = ans1 / ans2;
ans1 = -2.957821389E9 + y * (7.062834065E9 + y * (-5.123598036E8 + y * (1.087988129E7 + y * (-86327.92757 + y * 228.4622733))));
ans2 = 4.0076544269E10 + y * (7.452499648E8 + y * (7189466.438 + y * (47447.2647 + y * (226.1030244 + y * 1.0))));
this.bessy0 = (ans1 / ans2) + 0.636619772 * this.bessj0 * Math.log(x) ;
} else {
z = 8.0 / ax;
y = z * z;
xx = ax - 0.785398164;
ans1 = 1.0 + y * (-0.001098628627 + y * (2.734510407E-5 + y * (-2.073370639E-6 + y * 2.093887211E-7)));
ans2 = -0.01562499995 + y * (1.430488765E-4 + y * (-6.911147651E-6 + y * (7.621095161E-7 - y * 9.34935152E-8)));
var sax = Math.sqrt(0.636619772 / ax);
var cosxx = Math.cos(xx);
var sinxx = Math.sin(xx);
this.bessj0 = sax * (cosxx * ans1 - z * sinxx * ans2 );
ans2 = -0.01562499995 + y * (1.430488765E-4 + y * (-6.911147651E-6 + y * (7.621095161E-7 + y * -9.34945152E-8)));
this.bessy0 = sax * (sinxx * ans1 + z * cosxx * ans2 );
}});
;
(function(){var C$=Clazz.newClass(P$.AntennaFrame, "Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getInfo$java_text_NumberFormat', function (nf) {
return null;
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 2;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.AntennaFrame, "LinearSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.AntennaFrame','com.falstad.AntennaFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Linear Antenna (End-Fed)";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.AntennaFrame'].auxLabels[0].setText$S("Length");
this.b$['com.falstad.AntennaFrame'].brightnessBar.setValue$I(580);
this.b$['com.falstad.AntennaFrame'].freqBar.setValue$I(19);
});

Clazz.newMeth(C$, 'doAperture', function () {
var x;
var w = this.b$['com.falstad.AntennaFrame'].auxBars[0].getValue() * 2;
if (w == 0) w = 2;
var m = this.b$['com.falstad.AntennaFrame'].freqBar.getValue() / 120.0;
for (x = 0; x != w; x++) this.b$['com.falstad.AntennaFrame'].apertureR[(this.b$['com.falstad.AntennaFrame'].wallWidth/2|0) - (w/2|0) + x] = Math.sin((w - x) * m);

this.b$['com.falstad.AntennaFrame'].arrayCount = w;
this.b$['com.falstad.AntennaFrame'].arraySep = 1;
this.b$['com.falstad.AntennaFrame'].arrayStart = (this.b$['com.falstad.AntennaFrame'].wallWidth/2|0) - (w/2|0);
});

Clazz.newMeth(C$, 'getInfo$java_text_NumberFormat', function (nf) {
var w = this.b$['com.falstad.AntennaFrame'].auxBars[0].getValue() * 2;
return "Length/wavelength = " + nf.format$D(w / this.b$['com.falstad.AntennaFrame'].wavelength);
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[2]||(I$[2]=Clazz.load(Clazz.load('com.falstad.AntennaFrame').LinearCenterSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.AntennaFrame, "LinearCenterSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.AntennaFrame','com.falstad.AntennaFrame.LinearSetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Linear Antenna (Center-Fed)";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.AntennaFrame'].auxLabels[0].setText$S("Length");
this.b$['com.falstad.AntennaFrame'].auxLabels[1].setText$S("Feed Separation");
this.b$['com.falstad.AntennaFrame'].auxBars[1].setValue$I(0);
this.b$['com.falstad.AntennaFrame'].brightnessBar.setValue$I(580);
this.b$['com.falstad.AntennaFrame'].freqBar.setValue$I(19);
this.b$['com.falstad.AntennaFrame'].auxBars[0].setValue$I(20);
});

Clazz.newMeth(C$, 'doAperture', function () {
var x;
var w = this.b$['com.falstad.AntennaFrame'].auxBars[0].getValue();
var s = this.b$['com.falstad.AntennaFrame'].auxBars[1].getValue();
if (w == 0) w = 2;
var m = this.b$['com.falstad.AntennaFrame'].freqBar.getValue() / 120.0;
for (x = 0; x != w; x++) {
var f = Math.sin((w - x) * m);
this.b$['com.falstad.AntennaFrame'].apertureR[(this.b$['com.falstad.AntennaFrame'].wallWidth/2|0) - (s/2|0) - x] = this.b$['com.falstad.AntennaFrame'].apertureR[(this.b$['com.falstad.AntennaFrame'].wallWidth/2|0) + (s/2|0) + x] = f;
}
this.b$['com.falstad.AntennaFrame'].arrayCount = w * 2 + s;
this.b$['com.falstad.AntennaFrame'].arraySep = 1;
this.b$['com.falstad.AntennaFrame'].arrayStart = (this.b$['com.falstad.AntennaFrame'].wallWidth/2|0) - (s/2|0) - w;
});

Clazz.newMeth(C$, 'getInfo$java_text_NumberFormat', function (nf) {
var w = this.b$['com.falstad.AntennaFrame'].auxBars[0].getValue() * 2;
return "Total length/wavelength = " + nf.format$D(w / this.b$['com.falstad.AntennaFrame'].wavelength);
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 2;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[3]||(I$[3]=Clazz.load(Clazz.load('com.falstad.AntennaFrame').LoopSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.AntennaFrame, "LoopSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.AntennaFrame','com.falstad.AntennaFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Loop Cross Section";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.AntennaFrame'].auxLabels[0].setText$S("Size");
this.b$['com.falstad.AntennaFrame'].brightnessBar.setValue$I(620);
this.b$['com.falstad.AntennaFrame'].freqBar.setValue$I(17);
});

Clazz.newMeth(C$, 'doAperture', function () {
var w = this.b$['com.falstad.AntennaFrame'].auxBars[0].getValue() + 1;
this.b$['com.falstad.AntennaFrame'].apertureR[(this.b$['com.falstad.AntennaFrame'].wallWidth/2|0) + w] = 1;
this.b$['com.falstad.AntennaFrame'].apertureR[(this.b$['com.falstad.AntennaFrame'].wallWidth/2|0) - w] = -1;
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 1;
});

Clazz.newMeth(C$, 'getInfo$java_text_NumberFormat', function (nf) {
var w = (this.b$['com.falstad.AntennaFrame'].auxBars[0].getValue() + 1) * 2;
return "Diameter/wavelength = " + nf.format$D(w / this.b$['com.falstad.AntennaFrame'].wavelength);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[4]||(I$[4]=Clazz.load(Clazz.load('com.falstad.AntennaFrame').BroadsideArraySetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.AntennaFrame, "UniformArraySetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.AntennaFrame','com.falstad.AntennaFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.spacing = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.AntennaFrame'].auxLabels[0].setText$S("Separation");
this.b$['com.falstad.AntennaFrame'].auxLabels[1].setText$S("Phase Difference");
this.b$['com.falstad.AntennaFrame'].auxLabels[2].setText$S("Count");
this.b$['com.falstad.AntennaFrame'].brightnessBar.setValue$I(550);
});

Clazz.newMeth(C$, 'doAperture', function () {
var s = this.b$['com.falstad.AntennaFrame'].auxBars[0].getValue();
var pd = this.b$['com.falstad.AntennaFrame'].auxBars[1].getValue() * 2 * 3.141592653589793  / 100.0;
var c = this.b$['com.falstad.AntennaFrame'].auxBars[2].getValue();
if (c == 0) c = 1;
if (s == 0) s = 1;
if (s * c > this.b$['com.falstad.AntennaFrame'].wallWidth) s = (this.b$['com.falstad.AntennaFrame'].wallWidth/c|0);
this.spacing = s;
var x;
for (x = 0; x != c; x++) {
var xx = (this.b$['com.falstad.AntennaFrame'].wallWidth/2|0) - ((c * s - s + 1)/2|0) + x * s;
if (x == 0) this.b$['com.falstad.AntennaFrame'].arrayStart = xx;
this.b$['com.falstad.AntennaFrame'].apertureR[xx] = Math.cos(pd * x);
this.b$['com.falstad.AntennaFrame'].apertureI[xx] = Math.sin(pd * x);
}
this.b$['com.falstad.AntennaFrame'].arrayCount = c;
this.b$['com.falstad.AntennaFrame'].arraySep = s;
});

Clazz.newMeth(C$, 'getInfo$java_text_NumberFormat', function (nf) {
return "Separation/wavelength = " + nf.format$D(this.spacing / this.b$['com.falstad.AntennaFrame'].wavelength);
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 3;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.AntennaFrame, "BroadsideArraySetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.AntennaFrame','com.falstad.AntennaFrame.UniformArraySetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Broadside Array";
});

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
this.b$['com.falstad.AntennaFrame'].freqBar.setValue$I(77);
this.b$['com.falstad.AntennaFrame'].auxBars[0].setValue$I(3);
this.b$['com.falstad.AntennaFrame'].auxBars[1].setValue$I(0);
this.b$['com.falstad.AntennaFrame'].auxBars[2].setValue$I(10);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[5]||(I$[5]=Clazz.load(Clazz.load('com.falstad.AntennaFrame').EndFireArraySetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.AntennaFrame, "EndFireArraySetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.AntennaFrame','com.falstad.AntennaFrame.UniformArraySetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "End-Fire Array";
});

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
this.b$['com.falstad.AntennaFrame'].freqBar.setValue$I(77);
this.b$['com.falstad.AntennaFrame'].auxBars[0].setValue$I(3);
this.b$['com.falstad.AntennaFrame'].auxBars[1].setValue$I(33);
this.b$['com.falstad.AntennaFrame'].auxBars[2].setValue$I(10);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[6]||(I$[6]=Clazz.load(Clazz.load('com.falstad.AntennaFrame').BinomialArraySetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.AntennaFrame, "BinomialArraySetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.AntennaFrame','com.falstad.AntennaFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.spacing = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Binomial Array";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.AntennaFrame'].freqBar.setValue$I(77);
this.b$['com.falstad.AntennaFrame'].auxLabels[0].setText$S("Separation");
this.b$['com.falstad.AntennaFrame'].auxLabels[1].setText$S("Phase Difference");
this.b$['com.falstad.AntennaFrame'].auxLabels[2].setText$S("Count");
this.b$['com.falstad.AntennaFrame'].auxBars[0].setValue$I(3);
this.b$['com.falstad.AntennaFrame'].auxBars[1].setValue$I(0);
this.b$['com.falstad.AntennaFrame'].auxBars[2].setValue$I(10);
this.b$['com.falstad.AntennaFrame'].brightnessBar.setValue$I(600);
});

Clazz.newMeth(C$, 'doAperture', function () {
var s = this.b$['com.falstad.AntennaFrame'].auxBars[0].getValue();
var pd = this.b$['com.falstad.AntennaFrame'].auxBars[1].getValue() * 2 * 3.141592653589793  / 100.0;
var c = this.b$['com.falstad.AntennaFrame'].auxBars[2].getValue();
if (c == 0) c = 1;
if (s == 0) s = 1;
if (s * c > this.b$['com.falstad.AntennaFrame'].wallWidth) s = (this.b$['com.falstad.AntennaFrame'].wallWidth/c|0);
this.spacing = s;
var mx = this.binom$I$I(c, (c/2|0));
var x;
for (x = 0; x != c; x++) {
var xx = (this.b$['com.falstad.AntennaFrame'].wallWidth/2|0) - ((c * s - s + 1)/2|0) + x * s;
if (x == 0) this.b$['com.falstad.AntennaFrame'].arrayStart = xx;
var mult = this.binom$I$I(c, x) / mx;
this.b$['com.falstad.AntennaFrame'].apertureR[xx] = Math.cos(pd * x) * mult;
this.b$['com.falstad.AntennaFrame'].apertureI[xx] = Math.sin(pd * x) * mult;
}
this.b$['com.falstad.AntennaFrame'].arrayCount = c;
this.b$['com.falstad.AntennaFrame'].arraySep = s;
});

Clazz.newMeth(C$, 'binom$I$I', function (a, b) {
var q = 1;
var i;
for (i = 1; i <= b; i++) q *= (a - i) / i;

return q;
});

Clazz.newMeth(C$, 'getInfo$java_text_NumberFormat', function (nf) {
return "Separation/wavelength = " + nf.format$D(this.spacing / this.b$['com.falstad.AntennaFrame'].wavelength);
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 3;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[7]||(I$[7]=Clazz.load(Clazz.load('com.falstad.AntennaFrame').SchelkunoffSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.AntennaFrame, "SchelkunoffSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.AntennaFrame','com.falstad.AntennaFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Schelkunoff Polynomial Array";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.AntennaFrame'].auxLabels[0].setText$S("Separation");
this.b$['com.falstad.AntennaFrame'].auxLabels[1].setText$S("Zero 1");
this.b$['com.falstad.AntennaFrame'].auxLabels[2].setText$S("Zero 2");
this.b$['com.falstad.AntennaFrame'].auxBars[0].setValue$I(3);
this.b$['com.falstad.AntennaFrame'].auxBars[1].setValue$I(25);
this.b$['com.falstad.AntennaFrame'].auxBars[2].setValue$I(75);
this.b$['com.falstad.AntennaFrame'].brightnessBar.setValue$I(723);
});

Clazz.newMeth(C$, 'doAperture', function () {
var s = this.b$['com.falstad.AntennaFrame'].auxBars[0].getValue();
var psi = 2 * 3.141592653589793 * s  / this.b$['com.falstad.AntennaFrame'].wavelength;
var ang1 = (1 - this.b$['com.falstad.AntennaFrame'].auxBars[1].getValue() / 50.0) * psi;
var ang2 = (1 - this.b$['com.falstad.AntennaFrame'].auxBars[2].getValue() / 50.0) * psi;
var a1 = Math.cos(ang1);
var b1 = Math.sin(ang1);
var a2 = Math.cos(ang2);
var b2 = Math.sin(ang2);
this.b$['com.falstad.AntennaFrame'].apertureR[(this.b$['com.falstad.AntennaFrame'].wallWidth/2|0) - s] = 1;
this.b$['com.falstad.AntennaFrame'].apertureR[(this.b$['com.falstad.AntennaFrame'].wallWidth/2|0)] = -2 * (a1 + a2);
this.b$['com.falstad.AntennaFrame'].apertureI[(this.b$['com.falstad.AntennaFrame'].wallWidth/2|0)] = -2 * (b1 + b2);
this.b$['com.falstad.AntennaFrame'].apertureR[(this.b$['com.falstad.AntennaFrame'].wallWidth/2|0) + s] = a1 * a2 - b1 * b2;
this.b$['com.falstad.AntennaFrame'].apertureI[(this.b$['com.falstad.AntennaFrame'].wallWidth/2|0) + s] = a1 * b2 + a2 * b1;
this.b$['com.falstad.AntennaFrame'].arrayCount = 3;
this.b$['com.falstad.AntennaFrame'].arraySep = s;
this.b$['com.falstad.AntennaFrame'].arrayStart = (this.b$['com.falstad.AntennaFrame'].wallWidth/2|0) - s;
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 3;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[8]||(I$[8]=Clazz.load(Clazz.load('com.falstad.AntennaFrame').FourierSectoralSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.AntennaFrame, "FourierSectoralSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.AntennaFrame','com.falstad.AntennaFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Sectoral (Fourier)";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.AntennaFrame'].auxLabels[0].setText$S("Size");
this.b$['com.falstad.AntennaFrame'].auxLabels[1].setText$S("Angle");
this.b$['com.falstad.AntennaFrame'].auxLabels[2].setText$S("Beam Width");
this.b$['com.falstad.AntennaFrame'].auxBars[0].setValue$I(40);
this.b$['com.falstad.AntennaFrame'].auxBars[1].setValue$I(35);
this.b$['com.falstad.AntennaFrame'].auxBars[2].setValue$I(65);
this.b$['com.falstad.AntennaFrame'].zoomBar.setValue$I(50);
this.b$['com.falstad.AntennaFrame'].brightnessBar.setValue$I(750);
});

Clazz.newMeth(C$, 'doAperture', function () {
var s = this.b$['com.falstad.AntennaFrame'].auxBars[0].getValue();
var ag = (this.b$['com.falstad.AntennaFrame'].auxBars[1].getValue() / 50.0 - 1) * 3.141592653589793;
var wid = (this.b$['com.falstad.AntennaFrame'].auxBars[2].getValue() / 300.0) * 3.141592653589793 + 0.5235987755982988;
var q1 = ag - wid;
var q2 = ag + wid;
if (q2 > 3.141592653589793 ) q2 = 3.141592653589793;
if (q1 < -3.141592653589793 ) q1 = -3.141592653589793;
var i;
for (i = 0; i <= 180; i++) {
var ang = (i - 90) * 3.141592653589793 / 90.0;
this.b$['com.falstad.AntennaFrame'].fourierFunc[i] = (ang >= q1  && ang <= q2  ) ? 1 : 0;
}
var sep = ((this.b$['com.falstad.AntennaFrame'].wavelength / 2)|0);
if (sep == 0) sep = 1;
var x;
if (s * sep > (this.b$['com.falstad.AntennaFrame'].wallWidth/2|0)) s = (this.b$['com.falstad.AntennaFrame'].wallWidth/2 / sep |0);
for (x = -s; x <= s; x++) {
var xx = (this.b$['com.falstad.AntennaFrame'].wallWidth/2|0) + x * sep;
if (xx < 0 || xx >= this.b$['com.falstad.AntennaFrame'].wallWidth ) continue;
var a = -(Math.sin(-x * q2) - Math.sin(-x * q1)) / x;
var b = (Math.cos(x * q2) - Math.cos(x * q1)) / x;
if (x == 0) {
a = q2 - q1;
b = 0;
}this.b$['com.falstad.AntennaFrame'].apertureR[xx] = a;
this.b$['com.falstad.AntennaFrame'].apertureI[xx] = b;
}
this.b$['com.falstad.AntennaFrame'].arrayCount = s * 2 + 1;
this.b$['com.falstad.AntennaFrame'].arraySep = sep;
this.b$['com.falstad.AntennaFrame'].arrayStart = (this.b$['com.falstad.AntennaFrame'].wallWidth/2|0) - s * sep;
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 3;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[9]||(I$[9]=Clazz.load(Clazz.load('com.falstad.AntennaFrame').FourierFunctionSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.AntennaFrame, "FourierFunctionSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.AntennaFrame','com.falstad.AntennaFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Fourier Function";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.AntennaFrame'].auxLabels[0].setText$S("Size");
this.b$['com.falstad.AntennaFrame'].auxBars[0].setValue$I(40);
var i;
for (i = 0; i <= 180; i++) {
this.b$['com.falstad.AntennaFrame'].fourierFunc[i] = (i > 90) ? 0 : i / 90.0;
}
this.b$['com.falstad.AntennaFrame'].zoomBar.setValue$I(50);
this.b$['com.falstad.AntennaFrame'].brightnessBar.setValue$I(750);
});

Clazz.newMeth(C$, 'doAperture', function () {
var s = this.b$['com.falstad.AntennaFrame'].auxBars[0].getValue();
var sep = ((this.b$['com.falstad.AntennaFrame'].wavelength / 2)|0);
if (sep == 0) sep = 1;
var x;
if (s * sep > (this.b$['com.falstad.AntennaFrame'].wallWidth/2|0)) s = (this.b$['com.falstad.AntennaFrame'].wallWidth/2 / sep |0);
for (x = -s; x <= s; x++) {
var xx = (this.b$['com.falstad.AntennaFrame'].wallWidth/2|0) + x * sep;
if (xx < 0 || xx >= this.b$['com.falstad.AntennaFrame'].wallWidth ) continue;
var i;
var a0 = 0;
var b0 = 0;
for (i = 0; i <= 180; i++) {
var ang = (i - 90) * 3.141592653589793 / 90.0 * x;
var a1 = Math.cos(ang);
var b1 = Math.sin(-ang);
a0 += a1 * this.b$['com.falstad.AntennaFrame'].fourierFunc[i];
b0 += b1 * this.b$['com.falstad.AntennaFrame'].fourierFunc[i];
}
this.b$['com.falstad.AntennaFrame'].apertureR[xx] = a0;
this.b$['com.falstad.AntennaFrame'].apertureI[xx] = b0;
}
this.b$['com.falstad.AntennaFrame'].arrayCount = s * 2 + 1;
this.b$['com.falstad.AntennaFrame'].arraySep = sep;
this.b$['com.falstad.AntennaFrame'].arrayStart = (this.b$['com.falstad.AntennaFrame'].wallWidth/2|0) - s * sep;
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 1;
});

Clazz.newMeth(C$, 'createNext', function () {
return null;
});

Clazz.newMeth(C$);
})()

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:27:58
