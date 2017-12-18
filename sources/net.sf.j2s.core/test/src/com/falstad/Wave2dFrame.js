(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "Wave2dFrame", function(){
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
this.intensityCheck = null;
this.triChromaticCheck = null;
this.symmCheck = null;
this.infoCheck = null;
this.setupChooser = null;
this.setupList = null;
this.setup = null;
this.resetTimeButton = null;
this.zoomBar = null;
this.angleBar = null;
this.freqBar = null;
this.resBar = null;
this.speedBar = null;
this.brightnessBar = null;
this.colorMult = 0;
this.wavelength = 0;
this.auxLabels = null;
this.auxBars = null;
this.colorFunc = null;
this.apertureR = null;
this.apertureI = null;
this.dragX = 0;
this.dragY = 0;
this.dragging = false;
this.dragClear = false;
this.dragSet = false;
this.useFrame = false;
this.showControls = false;
this.adjustResolution = false;
this.recompute = false;
this.t = 0;
this.pause = 0;
this.imageSource = null;
this.pixels = null;
this.muString = null;
this.cv = null;
this.applet = null;
this.useBufferedImage = false;
this.main = null;
this.shown = false;
this.calculateNotice = false;
this.lastTime = 0;
this.resBarValue = 0;
this.bessj0 = 0;
this.bessy0 = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.engine = null;
this.windowWidth = 50;
this.windowHeight = 50;
this.adjustResolution = true;
this.muString = "u";
this.useBufferedImage = false;
this.shown = false;
this.resBarValue = -1;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "Wave2d by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'c$$com_falstad_Wave2d', function (a) {
C$.superclazz.c$$S.apply(this, ["Wave2d Applet v1.2c"]);
C$.$init$.apply(this);
this.applet = a;
this.useFrame = true;
this.showControls = true;
this.adjustResolution = true;
}, 1);

Clazz.newMeth(C$, 'initFrame', function () {
try {
if (this.applet != null ) {
var param = this.applet.getParameter$S("useFrame");
if (param != null  && param.equalsIgnoreCase$S("false") ) this.useFrame = false;
param = this.applet.getParameter$S("showControls");
if (param != null  && param.equalsIgnoreCase$S("false") ) this.showControls = false;
}} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
e.printStackTrace();
} else {
throw e;
}
}
if (this.useFrame) this.main = this;
 else this.main = this.applet;
this.setupList = Clazz.new_((I$[11]||(I$[11]=Clazz.load('java.util.Vector'))));
var s = Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.Wave2dFrame').SingleSlitSetup))), [this, null]);
while (s != null ){
this.setupList.addElement$TE(s);
s = s.createNext();
}
var os = System.getProperty("os.name");
var res = 120;
var jv = System.getProperty("java.class.version");
var jvf =  new Double(jv).doubleValue();
this.muString = "u";
if (jvf >= 48 ) {
this.muString = "\u03bc";
this.useBufferedImage = true;
}this.main.setLayout$java_awt_LayoutManager(Clazz.new_((I$[13]||(I$[13]=Clazz.load('com.falstad.Wave2dLayout')))));
this.cv = Clazz.new_((I$[14]||(I$[14]=Clazz.load('com.falstad.Wave2dCanvas'))).c$$com_falstad_Wave2dFrame,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
if (this.showControls) this.main.add$java_awt_Component(this.cv);
this.setupChooser = Clazz.new_((I$[15]||(I$[15]=Clazz.load('a2s.Choice'))));
var i;
for (i = 0; i != this.setupList.size(); i++) this.setupChooser.add$S("Setup: " + (this.setupList.elementAt$I(i)).getName());

this.setup = this.setupList.elementAt$I(0);
this.setupChooser.addItemListener$java_awt_event_ItemListener(this);
if (this.showControls) this.main.add$java_awt_Component(this.setupChooser);
this.intensityCheck = Clazz.new_((I$[16]||(I$[16]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Show Intensity", true]);
this.intensityCheck.addItemListener$java_awt_event_ItemListener(this);
if (this.showControls) this.main.add$java_awt_Component(this.intensityCheck);
System.out.println$S("Location" + this.intensityCheck.getLocale());
this.stoppedCheck = Clazz.new_((I$[16]||(I$[16]=Clazz.load('a2s.Checkbox'))).c$$S,["Stopped"]);
this.stoppedCheck.addItemListener$java_awt_event_ItemListener(this);
this.stoppedCheck.setEnabled$Z(false);
if (this.showControls) this.main.add$java_awt_Component(this.stoppedCheck);
this.triChromaticCheck = Clazz.new_((I$[16]||(I$[16]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Tri-Chromatic", false]);
this.triChromaticCheck.addItemListener$java_awt_event_ItemListener(this);
if (this.showControls) this.main.add$java_awt_Component(this.triChromaticCheck);
this.infoCheck = Clazz.new_((I$[16]||(I$[16]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Show Units", false]);
this.infoCheck.addItemListener$java_awt_event_ItemListener(this);
if (this.showControls) this.main.add$java_awt_Component(this.infoCheck);
if (this.showControls) this.main.add$java_awt_Component(this.resetTimeButton = Clazz.new_((I$[17]||(I$[17]=Clazz.load('a2s.Button'))).c$$S,["Reset Time"]));
this.resetTimeButton.addActionListener$java_awt_event_ActionListener(this);
if (this.showControls) this.main.add$java_awt_Component(Clazz.new_((I$[18]||(I$[18]=Clazz.load('a2s.Label'))).c$$S$I,["Incidence Angle", 0]));
if (this.showControls) this.main.add$java_awt_Component(this.angleBar = Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 90, 1, 10, 170]));
this.angleBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
if (this.showControls) this.main.add$java_awt_Component(Clazz.new_((I$[18]||(I$[18]=Clazz.load('a2s.Label'))).c$$S$I,["Speed", 0]));
if (this.showControls) this.main.add$java_awt_Component(this.speedBar = Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 70, 1, 1, 200]));
this.speedBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.speedBar.setEnabled$Z(false);
if (this.showControls) this.main.add$java_awt_Component(Clazz.new_((I$[18]||(I$[18]=Clazz.load('a2s.Label'))).c$$S$I,["Zoom Out", 0]));
if (this.showControls) this.main.add$java_awt_Component(this.zoomBar = Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 10, 1, 10, 200]));
this.zoomBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
if (this.showControls) this.main.add$java_awt_Component(Clazz.new_((I$[18]||(I$[18]=Clazz.load('a2s.Label'))).c$$S$I,["Resolution", 0]));
if (this.showControls) this.main.add$java_awt_Component(this.resBar = Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, res, 5, 120, 600]));
this.resBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
if (this.showControls) this.main.add$java_awt_Component(Clazz.new_((I$[18]||(I$[18]=Clazz.load('a2s.Label'))).c$$S$I,["Source Frequency", 0]));
if (this.showControls) this.main.add$java_awt_Component(this.freqBar = Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 120, 1, 1, 236]));
this.freqBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
if (this.showControls) this.main.add$java_awt_Component(Clazz.new_((I$[18]||(I$[18]=Clazz.load('a2s.Label'))).c$$S$I,["Brightness", 0]));
if (this.showControls) this.main.add$java_awt_Component(this.brightnessBar = Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 27, 1, 1, 1000]));
this.brightnessBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.auxLabels = Clazz.array((I$[18]||(I$[18]=Clazz.load('a2s.Label'))), [5]);
this.auxBars = Clazz.array((I$[19]||(I$[19]=Clazz.load('a2s.Scrollbar'))), [5]);
for (i = 0; i != 5; i++) {
if (this.showControls) this.main.add$java_awt_Component(this.auxLabels[i] = Clazz.new_((I$[18]||(I$[18]=Clazz.load('a2s.Label'))).c$$S$I,["Aux " + (i + 1), 0]));
if (this.showControls) this.main.add$java_awt_Component(this.auxBars[i] = Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 50, 1, 1, 100]));
this.auxBars[i].addAdjustmentListener$java_awt_event_AdjustmentListener(this);
}
if (this.showControls) this.main.add$java_awt_Component(Clazz.new_((I$[18]||(I$[18]=Clazz.load('a2s.Label'))).c$$S,["http://www.falstad.com"]));
try {
var param;
param = this.applet.getParameter$S("setup");
if (param != null ) this.setupChooser.select$I(Integer.parseInt(param));
param = this.applet.getParameter$S("setupClass");
if (param != null ) {
for (i = 0; i != this.setupList.size(); i++) {
if (this.setupList.elementAt$I(i).getClass().getName().equalsIgnoreCase$S("RippleFrame$" + param)) break;
}
if (i != this.setupList.size()) this.setupChooser.select$I(i);
}} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
if (this.applet != null ) e.printStackTrace();
} else {
throw e;
}
}
this.random = Clazz.new_((I$[20]||(I$[20]=Clazz.load('java.util.Random'))));
this.setResolution();
this.setup = this.setupList.elementAt$I(this.setupChooser.getSelectedIndex());
this.reinit();
this.cv.setBackground$java_awt_Color((I$[21]||(I$[21]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[21]||(I$[21]=Clazz.load('java.awt.Color'))).lightGray);
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
}this.requestFocus();
});

Clazz.newMeth(C$, 'reinit', function () {
this.doSetup();
});

Clazz.newMeth(C$, 'apertureChanged', function () {
this.clearAperture();
this.setup.doAperture();
this.recompute = true;
});

Clazz.newMeth(C$, 'triggerShow', function () {
if (!this.shown) this.setVisible$Z(true);
this.shown = true;
});

Clazz.newMeth(C$, 'handleResize', function () {
var d = this.winSize = this.cv.getSize();
if (this.winSize.width == 0) return;
this.pixels = null;
if (this.useBufferedImage) {
try {
var biclass = Clazz.forName("java.awt.image.BufferedImage");
var dbiclass = Clazz.forName("java.awt.image.DataBufferInt");
var rasclass = Clazz.forName("java.awt.image.Raster");
var cstr = biclass.getConstructor$ClassA(Clazz.array(java.lang.Class, -1, [Integer.TYPE, Integer.TYPE, Integer.TYPE]));
this.dbimage = cstr.newInstance$OA(Clazz.array(java.lang.Object, -1, [ new Integer(d.width),  new Integer(d.height),  new Integer(1)]));
var m = biclass.getMethod$S$ClassA("getRaster", null);
var ras = m.invoke$O$OA(this.dbimage, null);
var db = rasclass.getMethod$S$ClassA("getDataBuffer", null).invoke$O$OA(ras, null);
this.pixels = dbiclass.getMethod$S$ClassA("getData", null).invoke$O$OA(db, null);
} catch (ee) {
if (Clazz.exceptionOf(ee, Exception)){
System.out.println$S("BufferedImage failed");
} else {
throw ee;
}
}
}if (this.pixels == null ) {
var n = d.width * d.height;
this.pixels = Clazz.array(Integer.TYPE, [n]);
var i;
for (i = 0; i != n; i++) this.pixels[i] = -16777216;

this.imageSource = Clazz.new_((I$[22]||(I$[22]=Clazz.load('java.awt.image.MemoryImageSource'))).c$$I$I$IA$I$I,[d.width, d.height, this.pixels, 0, d.width]);
this.imageSource.setAnimated$Z(true);
this.imageSource.setFullBufferUpdates$Z(true);
this.dbimage = this.cv.createImage$java_awt_image_ImageProducer(this.imageSource);
}});

Clazz.newMeth(C$, 'processEvent$java_awt_AWTEvent', function (ev) {
if (ev.getID() == 201) {
System.exit(0);
}C$.superclazz.prototype.processEvent$java_awt_AWTEvent.apply(this, [ev]);
});

Clazz.newMeth(C$, 'centerString$java_awt_Graphics$S$I', function (g, s, y) {
var fm = g.getFontMetrics();
g.drawString$S$I$I(s, ((this.winSize.width - fm.stringWidth$S(s))/2|0), y);
});

Clazz.newMeth(C$, 'updateWave2d$java_awt_Graphics', function (realg) {
if (this.winSize == null  || this.winSize.width == 0 ) {
this.handleResize();
return;
}if (!this.calculateNotice && this.recompute ) {
var fm = realg.getFontMetrics();
realg.setColor$java_awt_Color((I$[21]||(I$[21]=Clazz.load('java.awt.Color'))).black);
var cs = "Calculating...";
realg.fillRect$I$I$I$I(0, this.winSize.height - 30, 20 + fm.stringWidth$S(cs), 30);
realg.setColor$java_awt_Color((I$[21]||(I$[21]=Clazz.load('java.awt.Color'))).white);
realg.drawString$S$I$I(cs, 10, this.winSize.height - 10);
this.cv.repaint$J(0);
this.calculateNotice = true;
return;
}this.calculateNotice = false;
var tadd = 0;
if (!this.stoppedCheck.getState()) {
var val = this.speedBar.getValue();
tadd = Math.exp(val / 20.0) * 0.02;
var sysTime = System.currentTimeMillis();
if (this.lastTime == 0) this.lastTime = sysTime;
tadd *= (sysTime - this.lastTime) * 0.02;
tadd *= this.freqBar.getValue() / 34.0;
this.t += tadd;
this.lastTime = sysTime;
} else this.lastTime = 0;
var trotr = Math.cos(this.t);
var troti = Math.sin(this.t);
var i;
var j;
var stopFunc = false;
if (this.stoppedCheck.getState()) stopFunc = true;
var obstacle = Clazz.instanceOf(this.setup, "com.falstad.Wave2dFrame.ObstacleSetup");
var zoom = (this.zoomBar.getValue() / 10.0);
if (this.recompute) {
this.recompute = false;
var fm = (this.angleBar.getValue() - 90) * 3.141592653589793 / 180;
var apStart = -1;
var apEnd = -1;
var compWidth = ((zoom * this.windowWidth)|0);
var symm0 = true;
var symm1 = true;
for (i = 0; i != this.wallWidth; i++) {
if (this.apertureR[i] != 0  || this.apertureI[i] != 0  ) {
if (this.apertureR[i] != this.apertureR[this.wallWidth - 1 - i ]  || this.apertureI[i] != this.apertureI[this.wallWidth - 1 - i ]  ) symm1 = false;
if (i == 0 || this.apertureR[i] != this.apertureR[this.wallWidth - i]   || this.apertureI[i] != this.apertureI[this.wallWidth - i]  ) symm0 = false;
apEnd = i;
if (apStart == -1) apStart = i;
}}
var symmetric = (symm0 || symm1 ) && !obstacle && fm == 0   ;
if (apStart == -1) apStart = apEnd = (this.wallWidth/2|0);
var waveEnd = (this.wallWidth/2|0) + (compWidth/2|0) - apStart;
var spaceNeeded = apEnd - apStart + 1;
var symmStop = (spaceNeeded/2|0);
if (symmetric) compWidth = (compWidth/2|0) + ((apEnd - apStart)/2|0);
var sz = 1;
while (sz < compWidth + spaceNeeded)sz = sz*(2);

var symmReflect = (symm0) ? sz : sz - 1;
var szm = sz * 2 - 1;
var line1 = Clazz.array(Double.TYPE, [sz * 2]);
var line2 = Clazz.array(Double.TYPE, [sz * 2]);
for (i = 0; i != this.wallWidth; i++) if (this.apertureR[i] != 0  || this.apertureI[i] != 0  ) {
var ii = (i - (this.wallWidth/2|0)) * 2;
var i0 = i - (this.wallWidth/2|0);
var a = Math.cos(fm * i0);
var b = Math.sin(fm * i0);
line2[ii & szm] = (a * this.apertureR[i] - b * this.apertureI[i]);
line2[(ii + 1) & szm] = (a * this.apertureI[i] + b * this.apertureR[i]);
}
var fft = Clazz.new_((I$[23]||(I$[23]=Clazz.load('com.falstad.FFT'))).c$$I,[sz]);
fft.transform$DA$Z(line2, false);
var f = 0;
var fstart = this.triChromaticCheck.getState() ? 0 : 1;
var fend = this.triChromaticCheck.getState() ? 2 : 1;
if (this.intensityCheck.getState()) this.t = 1.0E8;
 else this.triChromaticCheck.setState$Z(false);
var cfoff = 0;
for (f = fstart; f <= fend; f++) {
var m = this.freqBar.getValue() / 50.0;
if (f == 0) m /= 1.2745098039215685;
if (f == 2) m /= 0.9313725490196079;
var m0 = Math.sqrt(m);
this.wavelength = 6.283185307179586 / m;
var freq = 0.15915494309189535;
var speed = this.wavelength * freq;
var noWaves = this.wavelength < 2 * zoom ;
if (this.t < this.resBar.getValue() * zoom * 1.23  / speed ) this.recompute = true;
for (j = 0; j != this.windowHeight; j++) {
for (i = 0; i != sz * 2; i++) line1[i] = 0;

var jj = j + 1;
var jz2 = jj * jj * zoom * zoom ;
var i2;
var sz2 = sz * 2;
var maxdist = this.t * speed - this.wavelength / 8;
for (i = i2 = 0; i <= waveEnd; i++, i2 = i2+(2)) {
var dist1 = Math.sqrt(i * i + jz2);
var dist2 = dist1 * m;
this.computeBessel$D(dist2);
if (dist1 > maxdist ) this.bessj0 = this.bessy0 = 0;
var f1 = (this.bessj0 * m0);
var f2 = (-this.bessy0 * m0);
if (i > 0) {
line1[sz2 - i2] = f1;
line1[sz2 - i2 + 1] = f2;
}if (!symmetric || i < spaceNeeded ) {
line1[i2] = f1;
line1[i2 + 1] = f2;
}}
var t1 = System.currentTimeMillis();
fft.transform$DA$Z(line1, false);
for (i = 0; i != sz; i++) {
var ii = i * 2;
var a = line1[ii] * line2[ii] - line1[ii + 1] * line2[ii + 1];
var b = line1[ii + 1] * line2[ii] + line1[ii] * line2[ii + 1];
line1[ii] = a;
line1[ii + 1] = b;
}
fft.transform$DA$Z(line1, true);
var qmult = 400.0 / sz;
if (obstacle) {
var oaddr = (Math.cos(jj * zoom * m ) * 800 / m0);
var oaddi = -(Math.sin(jj * zoom * m ) * 800 / m0);
var ww = ((this.windowWidth * zoom)|0);
for (i = 0; i != ww; i++) {
var ii = i - (ww/2|0);
var a = Math.cos(fm * ii);
var b = Math.sin(fm * ii);
var aa = (a * oaddr - b * oaddi) / qmult;
var bb = (a * oaddi + b * oaddr) / qmult;
line1[szm & (ii * 2)] = aa - line1[szm & (ii * 2)];
line1[szm & (ii * 2) + 1] = bb - line1[szm & (ii * 2) + 1];
}
}for (i = 0; i != this.windowWidth; i++) {
var ir1 = (((i - (this.windowWidth/2|0)) * zoom)|0);
var ir2 = (((i - (this.windowWidth/2|0) + 1) * zoom)|0);
var ii1 = (ir1|0);
var ii2 = (ir2|0);
var iic = ii2 - ii1;
if (this.intensityCheck.getState()) this.colorFunc[cfoff] = 0;
 else {
this.colorFunc[cfoff] = 0;
this.colorFunc[cfoff + 1] = 0;
}var ii;
for (ii = ii1; ii <= ii2; ii++) {
var q1 = 0;
var q2 = 0;
if (symmetric && ii >= symmStop ) {
q1 = line1[szm & ((symmReflect - ii) * 2)] * qmult;
q2 = line1[szm & ((symmReflect - ii) * 2 + 1)] * qmult;
} else {
q1 = line1[szm & (ii * 2)] * qmult;
q2 = line1[szm & (ii * 2 + 1)] * qmult;
}var mu = 0.001;
if (ii == ii1) mu *= 1 - (ir1 - ii1);
 else if (ii == ii2) mu *= ir2 - ii2;
if (this.intensityCheck.getState()) this.colorFunc[cfoff] += (q1 * q1 + q2 * q2) * mu;
 else if (noWaves) {
this.colorFunc[cfoff] += Math.sqrt(q1 * q1 + q2 * q2) * mu;
} else {
this.colorFunc[cfoff] += q1 * mu;
this.colorFunc[cfoff + 1] += q2 * mu;
}}
if (this.intensityCheck.getState()) {
this.colorFunc[cfoff++] /= ir2 - ir1;
} else {
this.colorFunc[cfoff++] /= ir2 - ir1;
this.colorFunc[cfoff++] /= ir2 - ir1;
}}
}
}
}this.colorMult = 30 * Math.exp(this.brightnessBar.getValue() / 50.0 - 10);
if (!this.intensityCheck.getState()) this.colorMult *= 1.5;
var ix = 0;
var k;
var l;
var height = this.winSize.height - 16;
var cfoff = 0;
var grncfadd = this.windowWidth * this.windowHeight;
var blucfadd = grncfadd * 2;
var m = this.freqBar.getValue() / 50.0;
this.wavelength = 6.283185307179586 / m;
var noWaves = this.wavelength < 2 * zoom ;
for (j = 0; j != this.windowHeight; j++) {
for (i = 0; i != this.windowWidth; i++, cfoff++) {
var x = (i * this.winSize.width/this.windowWidth|0);
var y = (j * height/this.windowHeight|0) + 16;
var x2 = ((i + 1) * this.winSize.width/this.windowWidth|0);
var y2 = ((j + 1) * height/this.windowHeight|0) + 16;
var colval = 0;
if (this.intensityCheck.getState()) {
if (this.triChromaticCheck.getState()) colval = -16777216 + (this.getColorValue$I(cfoff) << 16) | (this.getColorValue$I(cfoff + grncfadd) << 8) | (this.getColorValue$I(cfoff + blucfadd));
 else colval = -16777216 + (this.getColorValue$I(cfoff) << 8);
} else {
var q1 = this.colorFunc[cfoff++];
var q2 = this.colorFunc[cfoff];
if (noWaves) {
var qq = ((q1 * 255)|0);
if (qq > 255) qq = 255;
colval = -16777216 + qq * 65792;
} else {
var q = (q1 * trotr - q2 * troti) * this.colorMult;
if (q > 0 ) {
var qq = ((q * 255)|0);
if (qq > 255) qq = 255;
colval = -16777216 + (qq << 8);
} else {
var qq = ((-q * 255)|0);
if (qq > 255) qq = 255;
colval = -16777216 + (qq << 16);
}}}for (k = x; k < x2; k++) for (l = y; l < y2; l++) this.pixels[k + l * this.winSize.width] = colval;


}
}
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
var mu = 1;
if (ii == ii1) mu *= 1 - (ir1 - ii1);
 else if (ii == ii2) mu *= ir2 - ii2;
if (ij < 0 || ij >= this.wallWidth ) {
funcb += mu;
continue;
}funcb += (1 - (this.apertureR[ij] * this.apertureR[ij] + this.apertureI[ij] * this.apertureI[ij])) * mu;
var ph = Math.atan2(this.apertureI[ij], this.apertureR[ij]) / 3.141592653589793;
if (ph < 0 ) funcr += (2 + ph) * mu;
 else funcr += ph * mu;
}
funcb /= ir2 - ir1;
funcr /= (ir2 - ir1) * 2;
if (obstacle) funcb = 1 - funcb;
var valb = ((funcb * 255)|0);
var valr = ((funcr * 255)|0);
if (valb < 0) valb = 0;
if (valb > 255) valb = 255;
if (valr < 0) valr = 0;
if (valb > 255) valb = 255;
var colval = -16777216 + (valr << 16) | valb;
var x = (i * this.winSize.width/this.windowWidth|0);
var x2 = ((i + 1) * this.winSize.width/this.windowWidth|0);
var y = 0;
var y2 = 16;
for (k = x; k < x2; k++) for (l = y; l < y2; l++) this.pixels[k + l * this.winSize.width] = colval;


}
if (this.imageSource != null ) this.imageSource.newPixels();
realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
if (this.infoCheck.getState()) {
var aw = this.auxBars[0].getValue();
var s1 = this.setup.getInfo$I(0);
var s2 = this.setup.getInfo$I(1);
var s3 = "Screen height = " + this.getLength$D(zoom * this.windowHeight);
realg.setColor$java_awt_Color((I$[21]||(I$[21]=Clazz.load('java.awt.Color'))).black);
var fm = realg.getFontMetrics();
var ms = s1 == null  ? 0 : fm.stringWidth$S(s1);
ms = s2 == null  ? 0 : this.max$I$I(fm.stringWidth$S(s2), ms);
ms = this.max$I$I(fm.stringWidth$S(s3), ms);
var x = 20 + ms;
var h = s1 == null  ? (s2 == null  ? 30 : 50) : 70;
realg.fillRect$I$I$I$I(this.winSize.width - x, this.winSize.height - h, x, h);
realg.setColor$java_awt_Color((I$[21]||(I$[21]=Clazz.load('java.awt.Color'))).white);
if (s1 != null ) realg.drawString$S$I$I(s1, this.winSize.width - x + 10, this.winSize.height - 50);
if (s2 != null ) realg.drawString$S$I$I(s2, this.winSize.width - x + 10, this.winSize.height - 30);
realg.drawString$S$I$I(s3, this.winSize.width - x + 10, this.winSize.height - 10);
}if (!this.intensityCheck.getState() && !this.stoppedCheck.getState() ) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'max$I$I', function (m1, m2) {
return (m1 > m2) ? m1 : m2;
});

Clazz.newMeth(C$, 'getLength$D', function (pix) {
var nf = (I$[24]||(I$[24]=Clazz.load('java.text.NumberFormat'))).getInstance();
nf.setMaximumFractionDigits$I(2);
var l = pix * 510 / this.wavelength;
if (l < 1000.0 ) return nf.format$D(l) + " nm";
if (l < 1000000.0 ) return nf.format$D(l * 0.001) + " " + this.muString + "m" ;
if (l < 1.0E9 ) return nf.format$D(l * 1.0E-6) + " mm";
return nf.format$D(l * 1.0E-9) + " m";
});

Clazz.newMeth(C$, 'getColorValue$I', function (i) {
var val = ((this.colorFunc[i] * this.colorMult)|0);
if (val > 255) val = 255;
return val;
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
if (e.getSource() === this.resetTimeButton ) {
this.t = 0;
this.recompute = true;
this.cv.repaint();
}});

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
System.out.print$S((e.getSource()).getValue() + "\n");
if (e.getSource() === this.resBar  && this.resBar.getValue() != this.resBarValue ) this.setResolution();
var i;
for (i = 0; i != 5; i++) if (e.getSource() === this.auxBars[i] ) {
this.apertureChanged();
break;
}
if (e.getSource() === this.zoomBar  || e.getSource() === this.angleBar   || e.getSource() === this.freqBar  ) this.recompute = true;
this.setResetTimeButton();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'setResetTimeButton', function () {
if (Clazz.instanceOf(this.setup, "com.falstad.Wave2dFrame.ObstacleSetup") || this.freqBar.getValue() < 8  || this.intensityCheck.getState() ) this.resetTimeButton.setEnabled$Z(false);
 else this.resetTimeButton.setEnabled$Z(true);
});

Clazz.newMeth(C$, 'setResolution', function () {
this.resBarValue = this.windowWidth = this.windowHeight = this.resBar.getValue();
if ((this.windowWidth & 1) == 1) this.windowWidth = this.windowHeight = this.resBarValue - 1;
this.colorFunc = Clazz.array(Float.TYPE, [this.windowWidth * this.windowHeight * 3 ]);
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
});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
this.dragging = false;
this.dragSet = this.dragClear = false;
this.cv.repaint();
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
this.cv.repaint();
if (e.getItemSelectable() === this.symmCheck ) {
this.recompute = true;
}if (e.getItemSelectable() === this.triChromaticCheck  || e.getItemSelectable() === this.intensityCheck  ) {
this.setResolution();
this.recompute = true;
if (this.intensityCheck.getState()) {
this.stoppedCheck.setEnabled$Z(false);
this.speedBar.setEnabled$Z(false);
this.triChromaticCheck.setEnabled$Z(true);
} else {
this.stoppedCheck.setEnabled$Z(true);
this.speedBar.setEnabled$Z(true);
this.triChromaticCheck.setEnabled$Z(false);
}this.setResetTimeButton();
return;
}if (e.getItemSelectable() === this.setupChooser ) this.doSetup();
});

Clazz.newMeth(C$, 'clearAperture', function () {
var i;
for (i = 0; i != this.wallWidth; i++) this.apertureR[i] = this.apertureI[i] = 0;

});

Clazz.newMeth(C$, 'doSetup', function () {
this.t = 1.0E8;
var i;
for (i = 0; i != 5; i++) this.auxBars[i].setValue$I(10);

this.freqBar.setValue$I(120);
this.zoomBar.setValue$I(10);
this.angleBar.setValue$I(90);
this.setup = this.setupList.elementAt$I(this.setupChooser.getSelectedIndex());
this.angleBar.setEnabled$Z(true);
this.setResetTimeButton();
this.setup.select();
this.apertureChanged();
for (i = 0; i < this.setup.getAuxBarCount(); i++) {
this.auxLabels[i].setVisible$Z(true);
this.auxBars[i].setVisible$Z(true);
}
for (; i < 5; i++) {
this.auxLabels[i].setVisible$Z(false);
this.auxBars[i].setVisible$Z(false);
}
this.validate();
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
if (x > 83 ) {
ans1 = 1;
ans2 = -0.0156249;
} else {
ans1 = 1.0 + y * (-0.001098628627 + y * (2.734510407E-5 + y * (-2.073370639E-6 + y * 2.093887211E-7)));
ans2 = -0.01562499995 + y * (1.430488765E-4 + y * (-6.911147651E-6 + y * (7.621095161E-7 - y * 9.34935152E-8)));
}var sax = Math.sqrt(0.636619772 / ax);
var cosxx = Math.cos(xx);
var sinxx = Math.sin(xx);
ans2 *= z;
this.bessj0 = sax * (cosxx * ans1 - sinxx * ans2);
this.bessy0 = sax * (sinxx * ans1 + cosxx * ans2);
}});
;
(function(){var C$=Clazz.newClass(P$.Wave2dFrame, "Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getInfo$I', function (x) {
return null;
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 2;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Wave2dFrame, "SingleSlitSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Wave2dFrame','com.falstad.Wave2dFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.w = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Single Slit";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.Wave2dFrame'].auxLabels[0].setText$S("Slit Width");
this.b$['com.falstad.Wave2dFrame'].brightnessBar.setValue$I(440);
});

Clazz.newMeth(C$, 'doAperture', function () {
var x;
this.w = this.b$['com.falstad.Wave2dFrame'].auxBars[0].getValue();
for (x = 0; x != this.w; x++) this.b$['com.falstad.Wave2dFrame'].apertureR[(this.b$['com.falstad.Wave2dFrame'].wallWidth/2|0) - (this.w/2|0) + x] = 1;

});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 1;
});

Clazz.newMeth(C$, 'getInfo$I', function (x) {
if (x == 1) return "Aperture width = " + this.b$['com.falstad.Wave2dFrame'].getLength$D(this.w);
return null;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[2]||(I$[2]=Clazz.load(Clazz.load('com.falstad.Wave2dFrame').DoubleSlitSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Wave2dFrame, "DoubleSlitSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Wave2dFrame','com.falstad.Wave2dFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Double Slit";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.Wave2dFrame'].auxLabels[0].setText$S("Slit Width");
this.b$['com.falstad.Wave2dFrame'].auxLabels[1].setText$S("Separation");
this.b$['com.falstad.Wave2dFrame'].auxLabels[2].setText$S("Balance");
this.b$['com.falstad.Wave2dFrame'].auxLabels[3].setText$S("Phase Difference");
this.b$['com.falstad.Wave2dFrame'].auxBars[2].setValue$I(50);
this.b$['com.falstad.Wave2dFrame'].auxBars[3].setValue$I(1);
this.b$['com.falstad.Wave2dFrame'].brightnessBar.setValue$I(380);
});

Clazz.newMeth(C$, 'doAperture', function () {
var x;
var w = this.b$['com.falstad.Wave2dFrame'].auxBars[0].getValue();
var s = this.b$['com.falstad.Wave2dFrame'].auxBars[1].getValue();
var bal2 = this.b$['com.falstad.Wave2dFrame'].auxBars[2].getValue() / 100.0;
var bal1 = 1 - bal2;
if (bal1 > bal2 ) {
bal2 /= bal1;
bal1 = 1;
} else {
bal1 /= bal2;
bal2 = 1;
}var ph = (this.b$['com.falstad.Wave2dFrame'].auxBars[3].getValue() - 1) * 3.141592653589793 / 50.0;
var a2r = bal2 * Math.cos(ph);
var a2i = bal2 * Math.sin(ph);
for (x = 0; x != w; x++) {
this.b$['com.falstad.Wave2dFrame'].apertureR[(this.b$['com.falstad.Wave2dFrame'].wallWidth/2|0) - s - x] = bal1;
this.b$['com.falstad.Wave2dFrame'].apertureR[(this.b$['com.falstad.Wave2dFrame'].wallWidth/2|0) + s + x] = a2r;
this.b$['com.falstad.Wave2dFrame'].apertureI[(this.b$['com.falstad.Wave2dFrame'].wallWidth/2|0) + s + x] = a2i;
}
});

Clazz.newMeth(C$, 'getInfo$I', function (x) {
if (x == 0) return "Slit width = " + this.b$['com.falstad.Wave2dFrame'].getLength$D(this.b$['com.falstad.Wave2dFrame'].auxBars[0].getValue());
return "Separation = " + this.b$['com.falstad.Wave2dFrame'].getLength$D(2 * this.b$['com.falstad.Wave2dFrame'].auxBars[1].getValue() - 1);
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 4;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[3]||(I$[3]=Clazz.load(Clazz.load('com.falstad.Wave2dFrame').GratingSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Wave2dFrame, "GratingSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Wave2dFrame','com.falstad.Wave2dFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.w = 0;
this.s = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Multiple Slits";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.Wave2dFrame'].auxLabels[0].setText$S("Slit Count");
this.b$['com.falstad.Wave2dFrame'].auxLabels[1].setText$S("Slit Width");
this.b$['com.falstad.Wave2dFrame'].auxLabels[2].setText$S("Separation");
this.b$['com.falstad.Wave2dFrame'].brightnessBar.setValue$I(345);
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 3;
});

Clazz.newMeth(C$, 'doAperture', function () {
var x;
this.w = this.b$['com.falstad.Wave2dFrame'].auxBars[1].getValue();
this.s = this.b$['com.falstad.Wave2dFrame'].auxBars[2].getValue() + 3;
if (this.w > this.s - 1) this.w = this.s - 1;
var i;
var n = (this.b$['com.falstad.Wave2dFrame'].auxBars[0].getValue()/5|0) + 1;
var sub = 0;
while (true){
sub = ((this.s * (n - 1) + this.w)/2|0);
if (-sub + this.s * (n - 1) + this.w < (this.b$['com.falstad.Wave2dFrame'].wallWidth/2|0)) break;
n--;
}
for (x = 0; x != this.w; x++) for (i = 0; i != n; i++) this.b$['com.falstad.Wave2dFrame'].apertureR[(this.b$['com.falstad.Wave2dFrame'].wallWidth/2|0) - sub + this.s * i + x] = 1;


});

Clazz.newMeth(C$, 'getInfo$I', function (x) {
if (x == 0) return "Slit width = " + this.b$['com.falstad.Wave2dFrame'].getLength$D(this.w);
return "Separation = " + this.b$['com.falstad.Wave2dFrame'].getLength$D(this.s - this.w);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[4]||(I$[4]=Clazz.load(Clazz.load('com.falstad.Wave2dFrame').ObstacleSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Wave2dFrame, "ObstacleSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Wave2dFrame','com.falstad.Wave2dFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.w = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Obstacle";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.Wave2dFrame'].auxLabels[0].setText$S("Width");
this.b$['com.falstad.Wave2dFrame'].angleBar.setEnabled$Z(false);
this.b$['com.falstad.Wave2dFrame'].angleBar.setValue$I(90);
this.b$['com.falstad.Wave2dFrame'].resetTimeButton.setVisible$Z(false);
this.b$['com.falstad.Wave2dFrame'].brightnessBar.setValue$I(310);
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 1;
});

Clazz.newMeth(C$, 'doAperture', function () {
var x;
this.w = ((this.b$['com.falstad.Wave2dFrame'].auxBars[0].getValue() * 1.5)|0);
for (x = 0; x != this.w; x++) this.b$['com.falstad.Wave2dFrame'].apertureR[(this.b$['com.falstad.Wave2dFrame'].wallWidth/2|0) - (this.w/2|0) + x] = 1;

});

Clazz.newMeth(C$, 'getInfo$I', function (x) {
if (x == 1) return "Width = " + this.b$['com.falstad.Wave2dFrame'].getLength$D(this.w);
return null;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[5]||(I$[5]=Clazz.load(Clazz.load('com.falstad.Wave2dFrame').ZonePlateEvenSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Wave2dFrame, "ZonePlateEvenSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Wave2dFrame','com.falstad.Wave2dFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.evenOdd = 0;
this.phase = false;
this.blazed = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.evenOdd = 0;
this.phase = false;
this.blazed = false;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Zone Plate (Even)";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.Wave2dFrame'].auxLabels[0].setText$S("Intended Frequency");
this.b$['com.falstad.Wave2dFrame'].auxBars[0].setValue$I((this.b$['com.falstad.Wave2dFrame'].freqBar.getValue() * 100/236|0));
this.b$['com.falstad.Wave2dFrame'].auxLabels[1].setText$S("Focal Length");
this.b$['com.falstad.Wave2dFrame'].auxBars[1].setValue$I(20);
this.b$['com.falstad.Wave2dFrame'].auxLabels[2].setText$S("Plate Width");
this.b$['com.falstad.Wave2dFrame'].auxBars[2].setValue$I(100);
this.b$['com.falstad.Wave2dFrame'].brightnessBar.setValue$I(111);
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 3;
});

Clazz.newMeth(C$, 'doAperture', function () {
var i;
var m = this.b$['com.falstad.Wave2dFrame'].auxBars[0].getValue() * 0.0472;
var halfwave = 3.141592653589793 / m;
var pw = this.b$['com.falstad.Wave2dFrame'].auxBars[2].getValue() * 3;
var dy = this.b$['com.falstad.Wave2dFrame'].auxBars[1].getValue() * 5;
var cx = (this.b$['com.falstad.Wave2dFrame'].wallWidth/2|0);
for (i = 1; i != this.b$['com.falstad.Wave2dFrame'].wallWidth; i++) {
var dx = cx - i;
if (dx < -pw || dx > pw ) continue;
var dist = Math.sqrt(dx * dx + dy * dy);
dist = (dist - dy);
if (this.blazed) {
var ph = dist / halfwave * 3.141592653589793;
this.b$['com.falstad.Wave2dFrame'].apertureR[i] = Math.cos(ph);
this.b$['com.falstad.Wave2dFrame'].apertureI[i] = Math.sin(ph);
} else {
var zone = ((dist / halfwave)|0);
this.b$['com.falstad.Wave2dFrame'].apertureR[i] = ((zone & 1) == this.evenOdd) ? 1 : (this.phase) ? -1 : 0;
}}
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[6]||(I$[6]=Clazz.load(Clazz.load('com.falstad.Wave2dFrame').ZonePlateOddSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Wave2dFrame, "ZonePlateOddSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Wave2dFrame','com.falstad.Wave2dFrame.ZonePlateEvenSetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.evenOdd = 1;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Zone Plate (Odd)";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[7]||(I$[7]=Clazz.load(Clazz.load('com.falstad.Wave2dFrame').ZonePlatePhaseSetup))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Wave2dFrame, "ZonePlatePhaseSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Wave2dFrame','com.falstad.Wave2dFrame.ZonePlateOddSetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.phase = true;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Phase-Reversal Zone Plate";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[8]||(I$[8]=Clazz.load(Clazz.load('com.falstad.Wave2dFrame').ZonePlateBlazedSetup))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Wave2dFrame, "ZonePlateBlazedSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Wave2dFrame','com.falstad.Wave2dFrame.ZonePlateOddSetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.blazed = true;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Blazed Zone Plate";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[9]||(I$[9]=Clazz.load(Clazz.load('com.falstad.Wave2dFrame').Hologram1Setup))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Wave2dFrame, "Hologram1Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Wave2dFrame','com.falstad.Wave2dFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Absorption Hologram";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.Wave2dFrame'].auxLabels[0].setText$S("Intended Frequency");
this.b$['com.falstad.Wave2dFrame'].auxBars[0].setValue$I((this.b$['com.falstad.Wave2dFrame'].freqBar.getValue() * 100/236|0));
this.b$['com.falstad.Wave2dFrame'].auxLabels[1].setText$S("X 1");
this.b$['com.falstad.Wave2dFrame'].auxLabels[2].setText$S("Y 1");
this.b$['com.falstad.Wave2dFrame'].auxLabels[3].setText$S("X 2");
this.b$['com.falstad.Wave2dFrame'].auxLabels[4].setText$S("Y 2");
this.b$['com.falstad.Wave2dFrame'].auxBars[1].setValue$I(40);
this.b$['com.falstad.Wave2dFrame'].auxBars[2].setValue$I(15);
this.b$['com.falstad.Wave2dFrame'].auxBars[3].setValue$I(70);
this.b$['com.falstad.Wave2dFrame'].auxBars[4].setValue$I(40);
this.b$['com.falstad.Wave2dFrame'].brightnessBar.setValue$I(285);
this.b$['com.falstad.Wave2dFrame'].zoomBar.setValue$I(15);
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 5;
});

Clazz.newMeth(C$, 'doAperture', function () {
var i;
var m = this.b$['com.falstad.Wave2dFrame'].auxBars[0].getValue() * 0.0472;
var halfwave = 3.141592653589793 / m;
var px1 = this.b$['com.falstad.Wave2dFrame'].auxBars[1].getValue() * 2 - 100;
var py1 = this.b$['com.falstad.Wave2dFrame'].auxBars[2].getValue() * 3 + 5;
var px2 = this.b$['com.falstad.Wave2dFrame'].auxBars[3].getValue() * 2 - 100;
var py2 = this.b$['com.falstad.Wave2dFrame'].auxBars[4].getValue() * 3 + 5;
var cx = (this.b$['com.falstad.Wave2dFrame'].wallWidth/2|0);
var pw = 300;
var maxf = 0;
var aradd = 0.75;
for (i = 0; i != this.b$['com.falstad.Wave2dFrame'].wallWidth; i++) {
if (i - cx < -pw || i - cx > pw ) continue;
var dx = px1 - (i - cx);
var dist = Math.sqrt(dx * dx + py1 * py1);
this.b$['com.falstad.Wave2dFrame'].computeBessel$D(dist * m);
var ar = this.b$['com.falstad.Wave2dFrame'].bessj0;
var ai = this.b$['com.falstad.Wave2dFrame'].bessy0;
dx = px2 - (i - cx);
dist = Math.sqrt(dx * dx + py2 * py2);
this.b$['com.falstad.Wave2dFrame'].computeBessel$D(dist * m);
ar += this.b$['com.falstad.Wave2dFrame'].bessj0;
ai += this.b$['com.falstad.Wave2dFrame'].bessy0;
ar += aradd;
var q = this.b$['com.falstad.Wave2dFrame'].apertureR[i] = Math.sqrt(ar * ar + ai * ai);
if (q > maxf ) maxf = q;
}
maxf = Math.sqrt(maxf);
for (i = 0; i != this.b$['com.falstad.Wave2dFrame'].wallWidth; i++) this.b$['com.falstad.Wave2dFrame'].apertureR[i] /= maxf;

});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[10]||(I$[10]=Clazz.load(Clazz.load('com.falstad.Wave2dFrame').Hologram2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Wave2dFrame, "Hologram2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Wave2dFrame','com.falstad.Wave2dFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Phase Hologram";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.Wave2dFrame'].auxLabels[0].setText$S("Intended Frequency");
this.b$['com.falstad.Wave2dFrame'].auxBars[0].setValue$I((this.b$['com.falstad.Wave2dFrame'].freqBar.getValue() * 100/236|0));
this.b$['com.falstad.Wave2dFrame'].auxLabels[1].setText$S("X 1");
this.b$['com.falstad.Wave2dFrame'].auxLabels[2].setText$S("Y 1");
this.b$['com.falstad.Wave2dFrame'].auxLabels[3].setText$S("X 2");
this.b$['com.falstad.Wave2dFrame'].auxLabels[4].setText$S("Y 2");
this.b$['com.falstad.Wave2dFrame'].auxBars[1].setValue$I(40);
this.b$['com.falstad.Wave2dFrame'].auxBars[2].setValue$I(15);
this.b$['com.falstad.Wave2dFrame'].auxBars[3].setValue$I(70);
this.b$['com.falstad.Wave2dFrame'].auxBars[4].setValue$I(40);
this.b$['com.falstad.Wave2dFrame'].brightnessBar.setValue$I(150);
this.b$['com.falstad.Wave2dFrame'].zoomBar.setValue$I(15);
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 5;
});

Clazz.newMeth(C$, 'doAperture', function () {
var i;
var m = this.b$['com.falstad.Wave2dFrame'].auxBars[0].getValue() * 0.0472;
var halfwave = 3.141592653589793 / m;
var px1 = this.b$['com.falstad.Wave2dFrame'].auxBars[1].getValue() * 2 - 100;
var py1 = this.b$['com.falstad.Wave2dFrame'].auxBars[2].getValue() * 3 + 5;
var px2 = this.b$['com.falstad.Wave2dFrame'].auxBars[3].getValue() * 2 - 100;
var py2 = this.b$['com.falstad.Wave2dFrame'].auxBars[4].getValue() * 3 + 5;
var cx = (this.b$['com.falstad.Wave2dFrame'].wallWidth/2|0);
var pw = 300;
var maxf = 0;
for (i = 0; i != this.b$['com.falstad.Wave2dFrame'].wallWidth; i++) {
if (i - cx < -pw || i - cx > pw ) continue;
var dx = px1 - (i - cx);
var dist = Math.sqrt(dx * dx + py1 * py1);
this.b$['com.falstad.Wave2dFrame'].computeBessel$D(dist * m);
this.b$['com.falstad.Wave2dFrame'].apertureR[i] = this.b$['com.falstad.Wave2dFrame'].bessj0;
this.b$['com.falstad.Wave2dFrame'].apertureI[i] = this.b$['com.falstad.Wave2dFrame'].bessy0;
dx = px2 - (i - cx);
dist = Math.sqrt(dx * dx + py2 * py2);
this.b$['com.falstad.Wave2dFrame'].computeBessel$D(dist * m);
this.b$['com.falstad.Wave2dFrame'].apertureR[i] += this.b$['com.falstad.Wave2dFrame'].bessj0;
this.b$['com.falstad.Wave2dFrame'].apertureI[i] += this.b$['com.falstad.Wave2dFrame'].bessy0;
var q = this.b$['com.falstad.Wave2dFrame'].apertureR[i] * this.b$['com.falstad.Wave2dFrame'].apertureR[i] + this.b$['com.falstad.Wave2dFrame'].apertureI[i] * this.b$['com.falstad.Wave2dFrame'].apertureI[i];
if (q > maxf ) maxf = q;
}
maxf = Math.sqrt(maxf);
for (i = 0; i != this.b$['com.falstad.Wave2dFrame'].wallWidth; i++) {
this.b$['com.falstad.Wave2dFrame'].apertureR[i] /= maxf;
this.b$['com.falstad.Wave2dFrame'].apertureI[i] /= maxf;
}
});

Clazz.newMeth(C$, 'createNext', function () {
return null;
});

Clazz.newMeth(C$);
})()

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:16
