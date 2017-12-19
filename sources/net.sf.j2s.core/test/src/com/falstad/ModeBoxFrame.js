(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "ModeBoxFrame", function(){
Clazz.newInstance(this, arguments,0,C$);
}, 'a2s.Frame', ['java.awt.event.ComponentListener', 'java.awt.event.ActionListener', 'java.awt.event.AdjustmentListener', 'java.awt.event.MouseMotionListener', 'java.awt.event.MouseListener', 'java.awt.event.ItemListener']);
C$.maxModes = 0;
C$.maxDispCoefs = 0;
C$.viewDistance = 0;

C$.$clinit$ = function() {Clazz.load(C$, 1);
C$.maxModes = 10;
C$.maxDispCoefs = 8;
C$.viewDistance = 12;
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.engine = null;
this.winSize = null;
this.dbimage = null;
this.random = null;
this.gridSizeX = 0;
this.gridSizeY = 0;
this.useFrame = false;
this.clearButton = null;
this.stoppedCheck = null;
this.spectrumCheck = null;
this.modeChooser = null;
this.speedBar = null;
this.resolutionBar = null;
this.brightnessBar = null;
this.widthBar = null;
this.heightBar = null;
this.dragZoomStart = 0;
this.zoom = 0;
this.rotmatrix = null;
this.selectedMinOmega = 0;
this.selectedMaxOmega = 0;
this.view3d = null;
this.viewSpectrum = null;
this.viewFreq = null;
this.colorMult = 0;
this.xpoints = null;
this.ypoints = null;
this.spectrum = null;
this.func = null;
this.data = null;
this.boxwidth = 0;
this.boxheight = 0;
this.dragging = false;
this.imageSource = null;
this.pixels = null;
this.maxTerms = 0;
this.modes = null;
this.modeCount = 0;
this.pause = 0;
this.applet = null;
this.selection = 0;
this.selectedCoefX = 0;
this.selectedCoefY = 0;
this.selectedCoefZ = 0;
this.sampleMult = null;
this.magDragStart = 0;
this.dragX = 0;
this.dragY = 0;
this.oldDragX = 0;
this.oldDragY = 0;
this.dragStartX = 0;
this.dragStartY = 0;
this.t = 0;
this.cv = null;
this.main = null;
this.shown = false;
this.lastTime = 0;
this.logep2 = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.engine = null;
this.gridSizeX = 200;
this.gridSizeY = 200;
this.useFrame = true;
this.zoom = 6.5;
this.boxwidth = 2;
this.boxheight = 2;
this.dragging = false;
this.maxTerms = 16;
this.modeCount = 0;
this.selection = -1;
this.selectedCoefX = -1;
this.t = 0;
this.shown = false;
this.logep2 = 0;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "ModeBox by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'c$$com_falstad_ModeBox', function (a) {
C$.superclazz.c$$S.apply(this, ["Box Modes Applet"]);
C$.$init$.apply(this);
this.applet = a;
}, 1);

Clazz.newMeth(C$, 'init', function () {
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
var altRender = true;
var res = 32;
if (os.indexOf("Windows") == 0) {
res = 48;
if (jv.indexOf("1.1") == 0) altRender = true;
}res = 120;
this.main.setLayout$java_awt_LayoutManager(Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.ModeBoxLayout')))));
this.cv = Clazz.new_((I$[3]||(I$[3]=Clazz.load('com.falstad.ModeBoxCanvas'))).c$$com_falstad_ModeBoxFrame,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
this.main.add$java_awt_Component(this.cv);
this.main.add$java_awt_Component(this.clearButton = Clazz.new_((I$[4]||(I$[4]=Clazz.load('a2s.Button'))).c$$S,["Clear"]));
this.clearButton.addActionListener$java_awt_event_ActionListener(this);
this.stoppedCheck = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Checkbox'))).c$$S,["Stopped"]);
this.stoppedCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.stoppedCheck);
this.spectrumCheck = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Checkbox'))).c$$S,["Show Spectrum"]);
this.spectrumCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.spectrumCheck);
this.modeChooser = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Choice'))));
this.modeChooser.add$S("Mouse = Adjust Angle");
this.modeChooser.add$S("Mouse = Adjust Zoom");
this.modeChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.modeChooser);
this.main.add$java_awt_Component(Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Label'))).c$$S$I,["Simulation Speed", 0]));
this.main.add$java_awt_Component(this.speedBar = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 40, 1, 1, 200]));
this.speedBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Label'))).c$$S$I,["Brightness", 0]));
this.main.add$java_awt_Component(this.brightnessBar = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 28, 1, 1, 200]));
this.brightnessBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Label'))).c$$S$I,["Image Resolution", 0]));
this.main.add$java_awt_Component(this.resolutionBar = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, res, 2, 20, 300]));
this.resolutionBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Label'))).c$$S$I,["Width", 0]));
this.main.add$java_awt_Component(this.widthBar = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 10, 1, 5, 31]));
this.widthBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Label'))).c$$S$I,["Height", 0]));
this.main.add$java_awt_Component(this.heightBar = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 10, 1, 5, 31]));
this.heightBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Label'))).c$$S$I,["http://www.falstad.com", 0]));
try {
var param = this.applet.getParameter$S("PAUSE");
if (param != null ) this.pause = Integer.parseInt(param);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
this.modes = Clazz.array((I$[9]||(I$[9]=Clazz.load(Clazz.load('com.falstad.ModeBoxFrame').Mode))), [C$.maxModes]);
this.addMode$I$I$I(1, 0, 0).magcoef = 1;
this.rotmatrix = Clazz.array(Double.TYPE, [9]);
this.rotmatrix[0] = this.rotmatrix[4] = this.rotmatrix[8] = 1;
this.xpoints = Clazz.array(Integer.TYPE, [2]);
this.ypoints = Clazz.array(Integer.TYPE, [2]);
var i;
this.sampleMult = Clazz.array(Integer.TYPE, [15]);
for (i = 1; i < 15; i = i+(2)) {
this.sampleMult[i] = 4;
this.sampleMult[i + 1] = 2;
}
this.sampleMult[0] = this.sampleMult[14] = 1;
this.random = Clazz.new_((I$[10]||(I$[10]=Clazz.load('java.util.Random'))));
this.reinit();
this.cv.setBackground$java_awt_Color((I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).white);
if (this.useFrame) {
this.resize$I$I(800, 640);
this.handleResize();
var x = this.getSize();
var screen = this.getToolkit().getScreenSize();
this.setLocation$I$I(((screen.width - x.width)/2|0), ((screen.height - x.height)/2|0));
this.show();
} else {
this.hide();
this.handleResize();
this.applet.validate();
}this.requestFocus();
});

Clazz.newMeth(C$, 'handleResize', function () {
this.reinit();
});

Clazz.newMeth(C$, 'triggerShow', function () {
if (!this.shown) this.setVisible$Z(true);
this.shown = true;
});

Clazz.newMeth(C$, 'reinit', function () {
this.setMaxTerms();
var d = this.winSize = this.cv.getSize();
if (d.width == 0 || d.height == 0 ) return;
this.calcSpectrum();
this.dbimage = this.cv.createImage$I$I(d.width, d.height);
this.setupDisplay();
this.pixels = Clazz.array(Integer.TYPE, [this.view3d.width * this.view3d.height]);
var i;
for (i = 0; i != this.view3d.width * this.view3d.height; i++) this.pixels[i] = -16777216;

this.imageSource = Clazz.new_((I$[12]||(I$[12]=Clazz.load('java.awt.image.MemoryImageSource'))).c$$I$I$IA$I$I,[this.view3d.width, this.view3d.height, this.pixels, 0, this.view3d.width]);
});

Clazz.newMeth(C$, 'getTermWidth', function () {
return 8;
});

Clazz.newMeth(C$, 'rotate$D$D', function (angle1, angle2) {
var r1cos = java.lang.Math.cos(angle1);
var r1sin = java.lang.Math.sin(angle1);
var r2cos = java.lang.Math.cos(angle2);
var r2sin = java.lang.Math.sin(angle2);
var rotm2 = Clazz.array(Double.TYPE, [9]);
rotm2[0] = r1cos;
rotm2[1] = -r1sin * r2sin;
rotm2[2] = r2cos * r1sin;
rotm2[3] = 0;
rotm2[4] = r2cos;
rotm2[5] = r2sin;
rotm2[6] = -r1sin;
rotm2[7] = -r1cos * r2sin;
rotm2[8] = r1cos * r2cos;
var rotm1 = this.rotmatrix;
this.rotmatrix = Clazz.array(Double.TYPE, [9]);
var i;
var j;
var k;
for (j = 0; j != 3; j++) for (i = 0; i != 3; i++) {
var v = 0;
for (k = 0; k != 3; k++) v += rotm1[k + j * 3] * rotm2[i + k * 3];

this.rotmatrix[i + j * 3] = v;
}

});

Clazz.newMeth(C$, 'max$D$D', function (a, b) {
return a > b  ? a : b;
});

Clazz.newMeth(C$, 'min$D$D', function (a, b) {
return a < b  ? a : b;
});

Clazz.newMeth(C$, 'setMaxTerms', function () {
this.gridSizeX = this.gridSizeY = (this.resolutionBar.getValue() & -2);
this.maxTerms = this.gridSizeX;
if (this.maxTerms > 100) this.maxTerms = 100;
this.data = Clazz.array(Double.TYPE, [this.maxTerms, this.maxTerms, this.maxTerms]);
this.func = Clazz.array(Double.TYPE, [this.gridSizeX, this.gridSizeY, 2]);
});

Clazz.newMeth(C$, 'setupDisplay', function () {
var perColumn = 2;
var perRow = 4;
var freqHeight = this.getTermWidth() * (C$.maxDispCoefs + 1) * perColumn ;
var spectrumHeight = (this.spectrumCheck.getState()) ? this.getTermWidth() * 6 : 0;
this.view3d = Clazz.new_((I$[13]||(I$[13]=Clazz.load('java.awt.Rectangle'))).c$$I$I$I$I,[0, 0, this.winSize.width, this.winSize.height - freqHeight - spectrumHeight ]);
if (this.spectrumCheck.getState()) this.viewSpectrum = Clazz.new_((I$[13]||(I$[13]=Clazz.load('java.awt.Rectangle'))).c$$I$I$I$I,[0, this.view3d.height, this.winSize.width, spectrumHeight]);
 else this.viewSpectrum = null;
this.viewFreq = Clazz.array((I$[13]||(I$[13]=Clazz.load('java.awt.Rectangle'))), [C$.maxDispCoefs]);
var i;
var winw = this.getTermWidth() * C$.maxDispCoefs;
var winh = winw;
var pad = this.getTermWidth();
var x = ((this.winSize.width - (winw * 4 + pad * 3))/2|0);
for (i = 0; i != C$.maxDispCoefs; i++) this.viewFreq[i] = Clazz.new_((I$[13]||(I$[13]=Clazz.load('java.awt.Rectangle'))).c$$I$I$I$I,[x + (i % perRow) * (winw + pad), this.view3d.height + spectrumHeight + ((i/perRow|0)) * (winh + pad) , winw, winh]);

});

Clazz.newMeth(C$, 'computeFunction', function () {
var i;
var j;
this.genData$Z(false);
var q = 3.14159265 / this.maxTerms;
var cost = java.lang.Math.cos(this.t);
var izoom = 1 / this.zoom;
var rotm = this.rotmatrix;
var boxhalfwidth = this.boxwidth / 2;
var boxhalfheight = this.boxheight / 2;
var aratio = this.view3d.width / this.view3d.height;
var camx0 = 0;
var camz0 = C$.viewDistance;
var camx = rotm[0] * camx0 + rotm[2] * camz0;
var camy = rotm[5] * camz0;
var camz = rotm[6] * camx0 + rotm[8] * camz0;
var camvz0 = -1;
var r2 = rotm[2] * camvz0;
var r5 = rotm[5] * camvz0;
var r8 = rotm[8] * camvz0;
for (i = 0; i != this.gridSizeX; i++) {
var camvx0 = (2.0 * i / this.gridSizeX - 1) * izoom;
if (aratio > 1 ) camvx0 *= aratio;
var r35 = rotm[3] * camvx0 + r5;
var r02 = rotm[0] * camvx0 + r2;
var r68 = rotm[6] * camvx0 + r8;
var fi = this.func[i];
for (j = 0; j != this.gridSizeY; j++) {
var fij = fi[j];
var camvy0 = (2 * j / this.gridSizeY - 1) * izoom;
if (aratio < 1 ) camvy0 /= aratio;
var camvx = rotm[1] * camvy0 + r02;
var camvy = rotm[4] * camvy0 + r35;
var camvz = rotm[7] * camvy0 + r68;
var camnorm = java.lang.Math.sqrt(camvx * camvx + camvy * camvy + camvz * camvz);
var nmax = 14;
var tx1 = (-boxhalfwidth - camx) / camvx;
var tx2 = (boxhalfwidth - camx) / camvx;
var ty1 = (-boxhalfheight - camy) / camvy;
var ty2 = (boxhalfheight - camy) / camvy;
var tz1 = (-1 - camz) / camvz;
var tz2 = (1 - camz) / camvz;
var mint = this.max$D$D(this.min$D$D(tx1, tx2), this.max$D$D(this.min$D$D(ty1, ty2), this.min$D$D(tz1, tz2))) + 0.001;
var maxt = this.min$D$D(this.max$D$D(tx1, tx2), this.min$D$D(this.max$D$D(ty1, ty2), this.max$D$D(tz1, tz2))) - 0.001;
if (maxt < mint ) {
this.func[i][j][0] = this.func[i][j][1] = 0;
continue;
}var tstep = (maxt - mint) / 14;
var pathlen = (maxt - mint) * camnorm;
var m = pathlen / 15;
var xmult = this.maxTerms / this.boxwidth;
var ymult = this.maxTerms / this.boxheight;
var zmult = this.maxTerms / 2.0;
var xx = camx + camvx * mint;
var yy = camy + camvy * mint;
var zz = camz + camvz * mint;
var dx = camvx * tstep;
var dy = camvy * tstep;
var dz = camvz * tstep;
var simpr = 0;
var simpg = 0;
for (var n = 0; n < 15; n++, xx += dx, yy += dy, zz += dz) {
var xxi = (((xx + boxhalfwidth) * xmult)|0);
var yyi = (((yy + boxhalfheight) * ymult)|0);
var zzi = (((zz + 1) * zmult)|0);
var f = this.data[xxi][yyi][zzi];
if (f < 0 ) {
simpr += this.sampleMult[n] * -f;
} else simpg += this.sampleMult[n] * f;
}
fij[0] = simpr * m;
fij[1] = simpg * m;
}
}
});

Clazz.newMeth(C$, 'sign$D', function (x) {
return x < 0  ? -1 : 1;
});

Clazz.newMeth(C$, 'updateModeBox$java_awt_Graphics', function (realg) {
{
document.title = System.currentTimeMillis() - (this.lastTime || 0);
this.lastTime = System.currentTimeMillis();
}var g = null;
if (this.winSize == null  || this.winSize.width == 0  || this.winSize.height == 0 ) return;
var mis = true;
g = this.dbimage.getGraphics();
g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(0, 0, this.winSize.width, this.winSize.height);
g.setColor$java_awt_Color(this.cv.getForeground());
var allQuiet = true;
if (!this.stoppedCheck.getState()) {
var val = this.speedBar.getValue();
var tadd = val * 0.00625;
this.t += tadd;
if (this.modeCount > 0) allQuiet = false;
}var i;
var j;
var k;
for (i = 0; i != this.modeCount; i++) {
var m = this.modes[i];
m.phasecoef = (m.omega * this.t + m.phasecoefadj) % 6.283185307179586;
m.phasecoefcos = java.lang.Math.cos(m.phasecoef);
m.phasemult = m.phasecoefcos * m.magcoef;
}
if (this.modeCount != 0) this.computeFunction();
this.colorMult = this.brightnessBar.getValue() * 3;
var winw = this.view3d.width;
var winh = this.view3d.height;
if (this.modeCount > 0) {
for (i = 0; i != this.gridSizeX; i++) {
var x = (i * winw/this.gridSizeX|0);
var x2 = ((i + 1) * winw/this.gridSizeX|0);
for (j = 0; j != this.gridSizeY; j++) {
var y = (j * winh/this.gridSizeY|0);
var y2 = ((j + 1) * winh/this.gridSizeY|0);
var colval = -16777216 + (this.getColorValue$I$I$I(i, j, 0) << 16) | (this.getColorValue$I$I$I(i, j, 1) << 8);
if (mis) {
var l;
for (k = x; k < x2; k++) for (l = y; l < y2; l++) this.pixels[k + l * this.view3d.width] = colval;


} else {
g.setColor$java_awt_Color(Clazz.new_((I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).c$$I,[colval]));
g.fillRect$I$I$I$I(x, y, x2 - x, y2 - y);
}}
}
if (mis) {
var dbimage2 = this.cv.createImage$java_awt_image_ImageProducer(this.imageSource);
g.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(dbimage2, 0, 0, null);
}}g.setColor$java_awt_Color((I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).white);
for (i = 0; i != 8; i++) {
var sign1 = ((i & 1) == 0) ? -1 : 1;
var sign2 = ((i & 2) == 0) ? -1 : 1;
var sign3 = ((i & 4) == 0) ? -1 : 1;
if (sign1 == -1 && (this.visibleFace$I$I$I(0, sign2, 0) || this.visibleFace$I$I$I(0, 0, sign3) ) ) {
this.map3d$D$D$D$IA$IA$I(-1, sign2, sign3, this.xpoints, this.ypoints, 0);
this.map3d$D$D$D$IA$IA$I(1, sign2, sign3, this.xpoints, this.ypoints, 1);
g.drawLine$I$I$I$I(this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
}if (sign2 == -1 && (this.visibleFace$I$I$I(sign1, 0, 0) || this.visibleFace$I$I$I(0, 0, sign3) ) ) {
this.map3d$D$D$D$IA$IA$I(sign1, -1, sign3, this.xpoints, this.ypoints, 0);
this.map3d$D$D$D$IA$IA$I(sign1, 1, sign3, this.xpoints, this.ypoints, 1);
g.drawLine$I$I$I$I(this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
}if (sign3 == -1 && (this.visibleFace$I$I$I(sign1, 0, 0) || this.visibleFace$I$I$I(0, sign2, 0) ) ) {
this.map3d$D$D$D$IA$IA$I(sign1, sign2, -1, this.xpoints, this.ypoints, 0);
this.map3d$D$D$D$IA$IA$I(sign1, sign2, 1, this.xpoints, this.ypoints, 1);
g.drawLine$I$I$I$I(this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
}}
g.setColor$java_awt_Color((I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).black);
g.fillRect$I$I$I$I(0, this.view3d.height, this.winSize.width, this.winSize.height - this.view3d.height);
for (i = 0; i != C$.maxDispCoefs; i++) this.drawFrequencies$java_awt_Graphics$I(g, i);

if (this.viewSpectrum != null ) {
var selw = (this.selectedCoefX == -1) ? 0 : this.getOmega$I$I$I(this.selectedCoefX, this.selectedCoefY, this.selectedCoefZ);
var selx = ((selw * 50)|0);
var selmin = ((this.selectedMinOmega * 50)|0);
var selmax = ((this.selectedMaxOmega * 50)|0);
var ym = this.viewSpectrum.height - 10;
var y = this.viewSpectrum.y + this.viewSpectrum.height - 5;
for (i = 1; i != this.winSize.width; i++) {
if (this.spectrum[i] == 0) continue;
var h = ((ym * (0.2 + java.lang.Math.log(this.spectrum[i]) / 4))|0);
if (h > ym) h = ym;
g.setColor$java_awt_Color((i == selx || (i >= selmin && i < selmax ) ) ? (I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).yellow : (I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).gray);
g.drawLine$I$I$I$I(i, y, i, y - h);
}
}if (this.selectedCoefX != -1) {
var s = "Selected mode = (" + this.selectedCoefX + "," + this.selectedCoefY + "," + this.selectedCoefZ + ")" ;
var fm = g.getFontMetrics();
g.setColor$java_awt_Color((I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).yellow);
var y = this.view3d.y + this.view3d.height - fm.getDescent() - 2;
g.drawString$S$I$I(s, ((this.winSize.width - fm.stringWidth$S(s))/2|0), y);
}realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
if (!allQuiet) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'visibleFace$I$I$I', function (nx, ny, nz) {
var viewx = C$.viewDistance * this.rotmatrix[2];
var viewy = C$.viewDistance * this.rotmatrix[5];
var viewz = C$.viewDistance * this.rotmatrix[8];
return (nx - viewx) * nx + (ny - viewy) * ny + (nz - viewz) * nz < 0 ;
});

Clazz.newMeth(C$, 'map3d$D$D$D$IA$IA$I', function (x, y, z, xpoints, ypoints, pt) {
x *= this.boxwidth / 2;
y *= this.boxheight / 2;
var rotm = this.rotmatrix;
var realx = x * rotm[0] + y * rotm[3] + z * rotm[6];
var realy = x * rotm[1] + y * rotm[4] + z * rotm[7];
var realz = C$.viewDistance - (x * rotm[2] + y * rotm[5] + z * rotm[8]);
var scalex = this.view3d.width * this.zoom / 2;
var scaley = this.view3d.height * this.zoom / 2;
var aratio = this.view3d.width / this.view3d.height;
if (aratio < 1 ) scaley *= aratio;
 else scalex /= aratio;
xpoints[pt] = (this.view3d.width/2|0) + ((scalex * realx / realz)|0);
ypoints[pt] = (this.view3d.height/2|0) + ((scaley * realy / realz)|0);
});

Clazz.newMeth(C$, 'drawFrequencies$java_awt_Graphics$I', function (g, z) {
var view = this.viewFreq[z];
var termWidth = this.getTermWidth();
g.setColor$java_awt_Color((I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).white);
var starti = 0;
var i;
var j;
var x;
var y;
for (i = starti; i <= C$.maxDispCoefs; i++) {
x = i * termWidth;
g.drawLine$I$I$I$I(view.x + starti * termWidth, x + view.y, view.x + termWidth * C$.maxDispCoefs, x + view.y);
g.drawLine$I$I$I$I(view.x + x, view.y + starti * termWidth, view.x + x, view.y + termWidth * C$.maxDispCoefs);
}
var rcol = 65536;
var gcol = 256;
for (i = 0; i != this.modeCount; i++) {
var m = this.modes[i];
if (m.z != z) continue;
x = view.x + m.x * termWidth;
y = view.y + m.y * termWidth;
var val = this.logcoef$D(m.magcoef);
if (val < -255) val = -255;
if (val > 255) val = 255;
if (val < 0) g.setColor$java_awt_Color(Clazz.new_((I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).c$$I,[-16777216 + rcol * -val]));
 else g.setColor$java_awt_Color(Clazz.new_((I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).c$$I,[-16777216 + gcol * val]));
g.fillRect$I$I$I$I(x + 1, y + 1, termWidth - 1, termWidth - 1);
var phx = ((m.phasecoefadj * termWidth * 0.15915494309189535 )|0);
if (phx > 0) {
g.setColor$java_awt_Color((I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).blue);
g.drawLine$I$I$I$I(x + phx, y + 1, x + phx, y + termWidth);
}}
if (this.selectedCoefX != -1) {
var selOmega = this.getOmega$I$I$I(this.selectedCoefX, this.selectedCoefY, this.selectedCoefZ);
g.setColor$java_awt_Color((I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).yellow);
for (i = starti; i != C$.maxDispCoefs; i++) for (j = starti; j != C$.maxDispCoefs; j++) {
x = view.x + i * termWidth;
y = view.y + j * termWidth;
if (this.getOmega$I$I$I(i, j, z) == selOmega ) g.drawRect$I$I$I$I(x, y, termWidth, termWidth);
}

}if (this.selectedMinOmega > 0  && this.selectedMaxOmega > 0  ) {
g.setColor$java_awt_Color((I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).yellow);
for (i = starti; i != C$.maxDispCoefs; i++) for (j = starti; j != C$.maxDispCoefs; j++) {
x = view.x + i * termWidth;
y = view.y + j * termWidth;
var w = this.getOmega$I$I$I(i, j, z);
if (w >= this.selectedMinOmega  && w < this.selectedMaxOmega  ) g.drawRect$I$I$I$I(x, y, termWidth, termWidth);
}

}});

Clazz.newMeth(C$, 'logcoef$D', function (x) {
var ep2 = 0.003;
var sign = (x < 0 ) ? -1 : 1;
x *= sign;
if (x < ep2 ) return 0;
if (this.logep2 == 0 ) this.logep2 = -java.lang.Math.log(2 * ep2);
return ((255 * sign * (java.lang.Math.log(x + ep2) + this.logep2)  / this.logep2)|0);
});

Clazz.newMeth(C$, 'getColorValue$I$I$I', function (i, j, k) {
var val = ((this.func[i][j][k] * this.colorMult)|0);
if (val > 255) val = 255;
return val;
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
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'actionPerformed$java_awt_event_ActionEvent', function (e) {
if (e.getSource() === this.clearButton ) {
while (this.modeCount > 0)this.deleteMode$I(0);

this.cv.repaint();
}});

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
if (e.getSource() === this.widthBar  || e.getSource() === this.heightBar  ) this.setWidthHeight();
if (e.getSource() === this.resolutionBar ) this.setMaxTerms();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'setWidthHeight', function () {
this.boxwidth = this.widthBar.getValue() / 5.0;
this.boxheight = this.heightBar.getValue() / 5.0;
var i;
for (i = 0; i != this.modeCount; i++) {
var m = this.modes[i];
m.omega = this.getOmega$I$I$I(m.x, m.y, m.z);
}
this.calcSpectrum();
});

Clazz.newMeth(C$, 'calcSpectrum', function () {
var i;
var j;
var k;
if (this.winSize == null ) return;
this.spectrum = Clazz.array(Integer.TYPE, [this.winSize.width]);
for (i = 0; i != C$.maxDispCoefs; i++) for (j = 0; j != C$.maxDispCoefs; j++) for (k = 0; k != C$.maxDispCoefs; k++) {
var w = this.getOmega$I$I$I(i, j, k);
var x = ((w * 50)|0);
if (x >= this.winSize.width) continue;
this.spectrum[x]++;
}


});

Clazz.newMeth(C$, 'mouseDragged$java_awt_event_MouseEvent', function (e) {
this.dragging = true;
this.oldDragX = this.dragX;
this.oldDragY = this.dragY;
this.dragX = e.getX();
this.dragY = e.getY();
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseMoved$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) != 0) {
if (this.selection != -1) {
this.dragging = true;
}return;
}this.processMouseMotion$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'processMouseMotion$java_awt_event_MouseEvent', function (e) {
var x = e.getX();
var y = e.getY();
this.oldDragX = this.dragX;
this.oldDragY = this.dragY;
this.dragX = x;
this.dragY = y;
var oldCoefX = this.selectedCoefX;
var oldCoefY = this.selectedCoefY;
var oldCoefZ = this.selectedCoefZ;
this.selectedCoefX = -1;
this.selectedCoefY = -1;
this.selectedCoefZ = -1;
this.selection = 0;
this.selectedMinOmega = this.selectedMaxOmega = 0;
var i;
if (this.view3d.inside$I$I(x, y)) this.selection = 1;
if (this.viewSpectrum != null  && this.viewSpectrum.inside$I$I(x, y) ) {
this.selection = 3;
this.selectedMinOmega = (x - 2) / 50.0;
this.selectedMaxOmega = (x + 2) / 50.0;
}for (i = 0; i != C$.maxDispCoefs; i++) {
var vf = this.viewFreq[i];
if (vf.inside$I$I(x, y)) {
var termWidth = this.getTermWidth();
this.selectedCoefX = ((x - vf.x)/termWidth|0);
this.selectedCoefY = ((y - vf.y)/termWidth|0);
this.selectedCoefZ = i;
if (this.selectedCoefX >= C$.maxDispCoefs) this.selectedCoefX = -1;
if (this.selectedCoefY >= C$.maxDispCoefs) this.selectedCoefX = -1;
if (this.selectedCoefX != -1) this.selection = 2;
}}
if (this.selectedCoefX != oldCoefX || this.selectedCoefY != oldCoefY  || this.selectedCoefZ != oldCoefZ ) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'mouseClicked$java_awt_event_MouseEvent', function (e) {
if (this.selection == 2) this.editMagClick();
});

Clazz.newMeth(C$, 'mouseEntered$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseExited$java_awt_event_MouseEvent', function (e) {
if (!this.dragging && this.selection != -1 ) {
this.selectedCoefX = this.selectedCoefY = this.selectedCoefZ = -1;
this.cv.repaint$J(this.pause);
}});

Clazz.newMeth(C$, 'mousePressed$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
this.processMouseMotion$java_awt_event_MouseEvent(e);
this.oldDragX = this.dragStartX = e.getX();
this.oldDragY = this.dragStartY = e.getY();
this.dragZoomStart = this.zoom;
if (this.selectedCoefX != -1) {
var m = this.findSelectedMode();
this.magDragStart = m.magcoef;
}this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
if (this.dragging) this.cv.repaint();
this.dragging = false;
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
if (e.getItemSelectable() === this.spectrumCheck ) this.setupDisplay();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'handleEvent$java_awt_Event', function (ev) {
if (ev.id == 201) {
if (this.applet == null ) this.dispose();
 else this.applet.destroyFrame();
return true;
}return C$.superclazz.prototype.handleEvent$java_awt_Event.apply(this, [ev]);
});

Clazz.newMeth(C$, 'edit$java_awt_event_MouseEvent', function (e) {
if (this.selection == 0) return;
var x = e.getX();
var y = e.getY();
switch (this.selection) {
case 2:
this.editMag$I$I(x, y);
break;
case 1:
this.edit3d$I$I(x, y);
break;
}
});

Clazz.newMeth(C$, 'edit3d$I$I', function (x, y) {
if (this.modeChooser.getSelectedIndex() == 0) {
var xo = this.oldDragX - x;
var yo = this.oldDragY - y;
this.rotate$D$D(xo / 40.0, yo / 40.0);
this.cv.repaint$J(this.pause);
} else if (this.modeChooser.getSelectedIndex() == 1) {
var xo = x - this.dragStartX;
this.zoom = this.dragZoomStart + xo / 20.0;
if (this.zoom < 0.1 ) this.zoom = 0.1;
this.cv.repaint$J(this.pause);
}});

Clazz.newMeth(C$, 'editMag$I$I', function (x, y) {
if (this.selectedCoefX == -1) return;
var coef = (this.dragStartY - y) / 20.0 + this.magDragStart;
if (coef < -1 ) coef = -1;
if (coef > 1 ) coef = 1;
var pcoef = (x - this.dragStartX) / 10.0;
if (pcoef < 0 ) pcoef = 0;
if (pcoef > 6.283185307179586 ) pcoef = 6.283185307179586;
var m = this.findSelectedMode();
if (m.magcoef == coef  && m.phasecoefadj == pcoef  ) return;
m.magcoef = coef;
m.phasecoefadj = pcoef;
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'editMagClick', function () {
if (this.selectedCoefX == -1) return;
var m = this.findSelectedMode();
if (this.magDragStart < 0.5 ) m.magcoef = 1;
 else m.magcoef = 0;
m.phasecoefadj = 0;
if (m.magcoef == 0 ) this.deleteMode$com_falstad_ModeBoxFrame_Mode(m);
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'genData$Z', function (fixed) {
var q = 3.14159265 / this.maxTerms;
var x;
var y;
var z;
var mi;
for (mi = 0; mi != this.modeCount; mi++) {
var m = this.modes[mi];
if (m.tableSize != this.maxTerms) {
m.xtable = Clazz.array(Double.TYPE, [this.maxTerms]);
m.ytable = Clazz.array(Double.TYPE, [this.maxTerms]);
m.ztable = Clazz.array(Double.TYPE, [this.maxTerms]);
m.tableSize = this.maxTerms;
}for (x = 0; x != this.maxTerms; x++) {
m.xtable[x] = java.lang.Math.cos(x * m.x * q ) * m.phasemult;
m.ytable[x] = java.lang.Math.cos(x * m.y * q );
m.ztable[x] = java.lang.Math.cos(x * m.z * q );
}
if (mi == 0) for (x = 0; x != this.maxTerms; x++) for (y = 0; y != this.maxTerms; y++) for (z = 0; z != this.maxTerms; z++) this.data[x][y][z] = m.xtable[x] * m.ytable[y] * m.ztable[z] ;



 else for (x = 0; x != this.maxTerms; x++) for (y = 0; y != this.maxTerms; y++) for (z = 0; z != this.maxTerms; z++) this.data[x][y][z] += m.xtable[x] * m.ytable[y] * m.ztable[z] ;



}
});

Clazz.newMeth(C$, 'deleteMode$I', function (i) {
for (; i < this.modeCount - 1; i++) {
this.modes[i] = this.modes[i + 1];
}
this.modeCount--;
});

Clazz.newMeth(C$, 'deleteMode$com_falstad_ModeBoxFrame_Mode', function (m) {
var i;
for (i = 0; i != this.modeCount; i++) if (this.modes[i] === m ) {
this.deleteMode$I(i);
return;
}
});

Clazz.newMeth(C$, 'addMode$I$I$I', function (x, y, z) {
if (this.modeCount == C$.maxModes) {
var i;
var minmag = 1;
var minmagi = 0;
for (i = 0; i != this.modeCount; i++) {
var m = this.modes[i];
if (m.magcoef < minmag ) {
minmag = m.magcoef;
minmagi = i;
}}
this.deleteMode$I(minmagi);
}var m = Clazz.new_((I$[9]||(I$[9]=Clazz.load(Clazz.load('com.falstad.ModeBoxFrame').Mode))), [this, null]);
m.x = x;
m.y = y;
m.z = z;
m.magcoef = 0;
m.phasecoef = 0;
m.phasecoefcos = 1;
m.phasecoefadj = 0;
m.omega = this.getOmega$I$I$I(x, y, z);
this.modes[this.modeCount++] = m;
return m;
});

Clazz.newMeth(C$, 'getOmega$I$I$I', function (x, y, z) {
return java.lang.Math.sqrt(x * x / (this.boxwidth * this.boxwidth) + y * y / (this.boxheight * this.boxheight) + z * z / 4.0);
});

Clazz.newMeth(C$, 'findSelectedMode', function () {
var i;
for (i = 0; i != this.modeCount; i++) {
var m = this.modes[i];
if (this.selectedCoefX == m.x && this.selectedCoefY == m.y  && this.selectedCoefZ == m.z ) return m;
}
return this.addMode$I$I$I(this.selectedCoefX, this.selectedCoefY, this.selectedCoefZ);
});
;
(function(){var C$=Clazz.newClass(P$.ModeBoxFrame, "Mode", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.x = 0;
this.y = 0;
this.z = 0;
this.magcoef = 0;
this.phasecoef = 0;
this.phasecoefcos = 0;
this.phasemult = 0;
this.phasecoefadj = 0;
this.omega = 0;
this.tableSize = 0;
this.xtable = null;
this.ytable = null;
this.ztable = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$);
})()

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:07
