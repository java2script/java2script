(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "EMWave2Frame", function(){
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
this.gridSizeX = 0;
this.gridSizeY = 0;
this.gridSizeXY = 0;
this.windowWidth = 0;
this.windowHeight = 0;
this.windowOffsetX = 0;
this.windowOffsetY = 0;
this.clearButton = null;
this.ClearAllButton = null;
this.stoppedCheck = null;
this.modeChooser = null;
this.viewChooser = null;
this.sourceChooser = null;
this.setupChooser = null;
this.setupList = null;
this.setup = null;
this.speedBar = null;
this.forceBar = null;
this.resBar = null;
this.brightnessBar = null;
this.lineDensityBar = null;
this.auxBar = null;
this.adjustBar = null;
this.auxLabel = null;
this.adjustLabel = null;
this.forceTimeZero = 0;
this.sourceMult = 0;
this.grid = null;
this.gw = 0;
this.sources = null;
this.dragX = 0;
this.dragY = 0;
this.selectedSource = 0;
this.forceBarValue = 0;
this.dragging = false;
this.dragClear = false;
this.dragSet = false;
this.t = 0;
this.pause = 0;
this.imageSource = null;
this.pixels = null;
this.sourceCount = 0;
this.sourcePlane = false;
this.sourceFreqCount = 0;
this.sourceWaveform = 0;
this.auxFunction = 0;
this.adjustSelectX1 = 0;
this.adjustSelectY1 = 0;
this.adjustSelectX2 = 0;
this.adjustSelectY2 = 0;
this.showControls = false;
this.useFrame = false;
this.cv = null;
this.applet = null;
this.useBufferedImage = false;
this.main = null;
this.shown = false;
this.lastTime = 0;
this.linegrid = null;
this.forceMap = null;
this.forceVecs = null;
this.filterCount = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.engine = null;
this.windowWidth = 50;
this.windowHeight = 50;
this.windowOffsetX = 0;
this.windowOffsetY = 0;
this.sourceCount = -1;
this.sourcePlane = false;
this.sourceFreqCount = -1;
this.sourceWaveform = 0;
this.useBufferedImage = false;
this.shown = false;
this.lastTime = 0;
this.filterCount = 0;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "EMWave2 by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'c$$com_falstad_EMWave2', function (a) {
C$.superclazz.c$$S.apply(this, ["TM Electrodynamics Applet v1.4b"]);
C$.$init$.apply(this);
this.applet = a;
this.useFrame = true;
this.showControls = true;
}, 1);

Clazz.newMeth(C$, 'init', function () {
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
var jv = System.getProperty("java.class.version");
var jvf =  new Double(jv).doubleValue();
if (jvf >= 48 ) this.useBufferedImage = true;
this.setupList = Clazz.new_((I$[89]||(I$[89]=Clazz.load('java.util.Vector'))));
var s = Clazz.new_((I$[90]||(I$[90]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').SingleSourceSetup))), [this, null]);
var i = 0;
while (s != null ){
this.setupList.addElement$TE(s);
s = s.createNext();
if (i++ > 300) {
System.out.print$S("setup loop?\u000a");
return;
}}
var os = System.getProperty("os.name");
this.sources = Clazz.array((I$[91]||(I$[91]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').OscSource))), [4]);
this.main.setLayout$java_awt_LayoutManager(Clazz.new_((I$[92]||(I$[92]=Clazz.load('com.falstad.EMWave2Layout')))));
this.cv = Clazz.new_((I$[93]||(I$[93]=Clazz.load('com.falstad.EMWave2Canvas'))).c$$com_falstad_EMWave2Frame,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
this.main.add$java_awt_Component(this.cv);
this.setupChooser = Clazz.new_((I$[94]||(I$[94]=Clazz.load('a2s.Choice'))));
for (i = 0; i != this.setupList.size(); i++) this.setupChooser.add$S("Setup: " + (this.setupList.elementAt$I(i)).getName());

this.setup = this.setupList.elementAt$I(0);
this.setupChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.setupChooser);
this.sourceChooser = Clazz.new_((I$[94]||(I$[94]=Clazz.load('a2s.Choice'))));
this.sourceChooser.add$S("No Sources");
this.sourceChooser.add$S("1 Src, 1 Freq");
this.sourceChooser.add$S("1 Src, 2 Freq");
this.sourceChooser.add$S("2 Src, 1 Freq");
this.sourceChooser.add$S("2 Src, 2 Freq");
this.sourceChooser.add$S("3 Src, 1 Freq");
this.sourceChooser.add$S("4 Src, 1 Freq");
this.sourceChooser.add$S("1 Src, 1 Freq (Packet)");
this.sourceChooser.add$S("1 Plane Src, 1 Freq");
this.sourceChooser.add$S("1 Plane Src, 2 Freq");
this.sourceChooser.add$S("2 Plane Src, 1 Freq");
this.sourceChooser.add$S("2 Plane Src, 2 Freq");
this.sourceChooser.add$S("1 Plane 1 Freq (Packet)");
this.sourceChooser.select$I(1);
this.sourceChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.sourceChooser);
this.modeChooser = Clazz.new_((I$[94]||(I$[94]=Clazz.load('a2s.Choice'))));
this.modeChooser.add$S("Mouse = Add Perf. Conductor");
this.modeChooser.add$S("Mouse = Add Good Conductor");
this.modeChooser.add$S("Mouse = Add Fair Conductor");
this.modeChooser.add$S("Mouse = Add Current (+)");
this.modeChooser.add$S("Mouse = Add Current (-)");
this.modeChooser.add$S("Mouse = Add Ferromagnet");
this.modeChooser.add$S("Mouse = Add Diamagnet");
this.modeChooser.add$S("Mouse = Add Dielectric");
this.modeChooser.add$S("Mouse = Add Magnet (Down)");
this.modeChooser.add$S("Mouse = Add Magnet (Up)");
this.modeChooser.add$S("Mouse = Add Magnet (Left)");
this.modeChooser.add$S("Mouse = Add Magnet (Right)");
this.modeChooser.add$S("Mouse = Add Resonant Medium");
this.modeChooser.add$S("Mouse = Clear");
this.modeChooser.add$S("Mouse = Adjust Conductivity");
this.modeChooser.add$S("Mouse = Adjust Permeability");
this.modeChooser.add$S("Mouse = Adjust Current");
this.modeChooser.add$S("Mouse = Adjust Dielectric");
this.modeChooser.add$S("Mouse = Adjust Mag Dir");
this.modeChooser.add$S("Mouse = Adjust Mag Strength");
this.modeChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.modeChooser);
this.viewChooser = Clazz.new_((I$[94]||(I$[94]=Clazz.load('a2s.Choice'))));
this.viewChooser.add$S("Show Electric Field (E)");
this.viewChooser.add$S("Show Magnetic Field (B)");
this.viewChooser.add$S("Show B Lines");
this.viewChooser.add$S("Show B Strength");
this.viewChooser.add$S("Show Current (j)");
this.viewChooser.add$S("Show E/B");
this.viewChooser.add$S("Show E/B lines");
this.viewChooser.add$S("Show E/B/j");
this.viewChooser.add$S("Show E/B lines/j");
this.viewChooser.add$S("Show Mag. Intensity (H)");
this.viewChooser.add$S("Show Magnetization (M)");
this.viewChooser.add$S("Show Material Type");
this.viewChooser.add$S("Show Vec. Potential");
this.viewChooser.add$S("Show Poynting Vector");
this.viewChooser.add$S("Show Energy Density");
this.viewChooser.add$S("Show Poynting/Energy");
this.viewChooser.add$S("Show Force");
this.viewChooser.add$S("Show Effective Current");
this.viewChooser.add$S("Show Magnetic Charge");
this.viewChooser.add$S("Show Curl E");
this.viewChooser.add$S("Show Bx");
this.viewChooser.add$S("Show By");
this.viewChooser.add$S("Show Hx");
this.viewChooser.add$S("Show Hy");
this.viewChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.viewChooser);
this.viewChooser.select$I(7);
this.main.add$java_awt_Component(this.clearButton = Clazz.new_((I$[95]||(I$[95]=Clazz.load('a2s.Button'))).c$$S,["Clear Fields"]));
this.clearButton.addActionListener$java_awt_event_ActionListener(this);
this.main.add$java_awt_Component(this.ClearAllButton = Clazz.new_((I$[95]||(I$[95]=Clazz.load('a2s.Button'))).c$$S,["Clear All"]));
this.ClearAllButton.addActionListener$java_awt_event_ActionListener(this);
this.stoppedCheck = Clazz.new_((I$[96]||(I$[96]=Clazz.load('a2s.Checkbox'))).c$$S,["Stopped"]);
this.stoppedCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.stoppedCheck);
this.main.add$java_awt_Component(Clazz.new_((I$[97]||(I$[97]=Clazz.load('a2s.Label'))).c$$S$I,["Simulation Speed", 0]));
this.main.add$java_awt_Component(this.speedBar = Clazz.new_((I$[98]||(I$[98]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 180, 1, 1, 2000]));
this.speedBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[97]||(I$[97]=Clazz.load('a2s.Label'))).c$$S$I,["Resolution", 0]));
this.main.add$java_awt_Component(this.resBar = Clazz.new_((I$[98]||(I$[98]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 40, 5, 16, 140]));
this.resBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.setResolution();
this.main.add$java_awt_Component(Clazz.new_((I$[97]||(I$[97]=Clazz.load('a2s.Label'))).c$$S$I,["Source Frequency", 0]));
this.main.add$java_awt_Component(this.forceBar = Clazz.new_((I$[98]||(I$[98]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, this.forceBarValue = 10, 1, 1, 40]));
this.forceBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[97]||(I$[97]=Clazz.load('a2s.Label'))).c$$S$I,["Brightness", 0]));
this.main.add$java_awt_Component(this.brightnessBar = Clazz.new_((I$[98]||(I$[98]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 10, 1, 1, 2000]));
this.brightnessBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[97]||(I$[97]=Clazz.load('a2s.Label'))).c$$S$I,["Line Density", 0]));
this.main.add$java_awt_Component(this.lineDensityBar = Clazz.new_((I$[98]||(I$[98]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 50, 1, 10, 100]));
this.lineDensityBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(this.auxLabel = Clazz.new_((I$[97]||(I$[97]=Clazz.load('a2s.Label'))).c$$S$I,["", 0]));
this.main.add$java_awt_Component(this.auxBar = Clazz.new_((I$[98]||(I$[98]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 1, 1, 1, 40]));
this.auxBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(this.adjustLabel = Clazz.new_((I$[97]||(I$[97]=Clazz.load('a2s.Label'))).c$$S$I,["", 0]));
this.main.add$java_awt_Component(this.adjustBar = Clazz.new_((I$[98]||(I$[98]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 50, 1, 0, 102]));
this.adjustBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[97]||(I$[97]=Clazz.load('a2s.Label'))).c$$S,["http://www.falstad.com"]));
try {
var param = this.applet.getParameter$S("PAUSE");
if (param != null ) this.pause = Integer.parseInt(param);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
this.random = Clazz.new_((I$[99]||(I$[99]=Clazz.load('java.util.Random'))));
this.reinit();
this.setup = this.setupList.elementAt$I(0);
this.cv.setBackground$java_awt_Color((I$[100]||(I$[100]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[100]||(I$[100]=Clazz.load('java.awt.Color'))).lightGray);
this.setModeChooser();
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
}});

Clazz.newMeth(C$, 'reinit', function () {
this.sourceCount = -1;
this.adjustSelectX1 = -1;
this.grid = Clazz.array((I$[101]||(I$[101]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').OscElement))), [this.gridSizeXY]);
var i;
for (i = 0; i != this.gridSizeXY; i++) this.grid[i] = Clazz.new_((I$[101]||(I$[101]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').OscElement))), [this, null]);

this.doSetup();
});

Clazz.newMeth(C$, 'setDamping', function () {
var i;
var j;
for (i = 0; i != this.gridSizeXY; i++) {
this.grid[i].damp = 1;
if (this.grid[i].medium > 0) this.grid[i].damp = 0.99;
}
for (i = 0; i != this.windowOffsetX; i++) for (j = 0; j != this.gridSizeX; j++) {
var da = Math.exp(-(this.windowOffsetX - i) * 0.002);
this.grid[i + j * this.gw].damp = this.grid[this.gridSizeX - 1 - i  + this.gw * j].damp = this.grid[j + i * this.gw].damp = this.grid[j + this.gw * (this.gridSizeY - 1 - i )].damp = da;
}

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
this.pixels = Clazz.array(Integer.TYPE, [d.width * d.height]);
var i;
for (i = 0; i != d.width * d.height; i++) this.pixels[i] = -16777216;

this.imageSource = Clazz.new_((I$[102]||(I$[102]=Clazz.load('java.awt.image.MemoryImageSource'))).c$$I$I$IA$I$I,[d.width, d.height, this.pixels, 0, d.width]);
this.imageSource.setAnimated$Z(true);
this.imageSource.setFullBufferUpdates$Z(true);
this.dbimage = this.cv.createImage$java_awt_image_ImageProducer(this.imageSource);
}});

Clazz.newMeth(C$, 'handleEvent$java_awt_Event', function (ev) {
if (ev.id == 201) {
this.applet.destroyFrame();
return true;
}return C$.superclazz.prototype.handleEvent$java_awt_Event.apply(this, [ev]);
});

Clazz.newMeth(C$, 'doClear', function () {
var x;
var y;
for (x = 0; x < this.gridSizeXY; x++) {
this.grid[x].az = this.grid[x].dazdt = 1.0E-10;
this.grid[x].epos = 0;
if (this.grid[x].resonant) this.grid[x].jz = 0;
}
this.t = 0;
this.doFilter();
});

Clazz.newMeth(C$, 'doClearAll', function () {
var x;
var y;
for (x = 0; x < this.gridSizeXY; x++) {
var oe = this.grid[x];
oe.jz = 0;
oe.az = oe.dazdt = 1.0E-10;
oe.boundary = false;
oe.gray = false;
oe.resonant = false;
oe.conductivity = 0;
oe.perm = 1;
oe.medium = 0;
oe.mx = oe.my = 0;
oe.epos = 0;
}
this.setDamping();
this.sourceChooser.select$I(0);
this.setSources();
});

Clazz.newMeth(C$, 'calcBoundaries', function () {
var x;
var y;
var bound = 0;
for (x = 0; x < this.gridSizeX; x++) for (y = 0; y < this.windowOffsetY; y++) {
this.grid[x + this.gw * y].conductivity = this.grid[x + this.gw * this.windowOffsetY].conductivity;
this.grid[x + this.gw * (this.gridSizeY - y - 1 )].conductivity = this.grid[x + this.gw * (this.gridSizeY - this.windowOffsetY - 1 )].conductivity;
}

for (y = 0; y < this.gridSizeY; y++) for (x = 0; x < this.windowOffsetX; x++) {
this.grid[x + this.gw * y].conductivity = this.grid[this.windowOffsetX + this.gw * y].conductivity;
this.grid[this.gridSizeX - x - 1  + this.gw * y].conductivity = this.grid[this.gridSizeX - this.windowOffsetX - 1  + this.gw * y].conductivity;
}

for (x = 1; x < this.gridSizeX - 1; x++) for (y = 1; y < this.gridSizeY - 1; y++) {
var gi = x + this.gw * y;
var oe = this.grid[gi];
var perm = oe.perm;
var medium = oe.medium;
var mx = oe.mx;
var my = oe.my;
var e1 = this.grid[gi - 1];
var e2 = this.grid[gi + 1];
var e3 = this.grid[gi - this.gw];
var e4 = this.grid[gi + this.gw];
oe.gray = (oe.conductivity > 0  || oe.medium != 0  || oe.perm != 1   || oe.mx != 0   || oe.my != 0   || oe.resonant );
if (e1.perm != perm  || e2.perm != perm   || e3.perm != perm   || e4.perm != perm   || e1.medium != medium  || e2.medium != medium  || e3.medium != medium  || e4.medium != medium  || e1.mx != mx   || e2.mx != mx   || e3.mx != mx   || e4.mx != mx   || e1.my != my   || e2.my != my   || e3.my != my   || e4.my != my   || oe.resonant ) {
oe.boundary = true;
bound++;
} else oe.boundary = false;
}

});

Clazz.newMeth(C$, 'getPanelHeight', function () {
return (this.winSize.height/3|0);
});

Clazz.newMeth(C$, 'centerString$java_awt_Graphics$S$I', function (g, s, y) {
var fm = g.getFontMetrics();
g.drawString$S$I$I(s, ((this.winSize.width - fm.stringWidth$S(s))/2|0), y);
});

Clazz.newMeth(C$, 'updateEMWave2$java_awt_Graphics', function (realg) {
if (this.winSize == null  || this.winSize.width == 0 ) {
this.handleResize();
return;
}var tadd = 0;
if (!this.stoppedCheck.getState()) {
var val = 5;
tadd = val * 0.05;
}var i;
var j;
var stopFunc = this.dragging;
if (this.stoppedCheck.getState()) stopFunc = true;
var speedValue = this.speedBar.getValue() / 2.0;
if (stopFunc) this.lastTime = 0;
 else {
if (this.lastTime == 0) this.lastTime = System.currentTimeMillis();
if (speedValue * (System.currentTimeMillis() - this.lastTime) < 1000 ) stopFunc = true;
}if (!stopFunc) {
var iter;
var mxx = this.gridSizeX - 1;
var mxy = this.gridSizeY - 1;
for (iter = 1; ; iter++) {
this.doSources$D$Z(tadd, false);
this.setup.doStep();
var sinhalfth = 0;
var sinth = 0;
var scaleo = 0;
var tadd2 = tadd;
var forcecoef = 1;
var curMedium = 0;
var oew;
var oee;
var oen;
var oes;
var oe;
var previ;
var nexti;
var prevj;
var nextj;
var basis;
var a;
var b;
for (j = 1; j != mxy; j++) {
var gi = j * this.gw + 1;
var giEnd = gi + mxx - 1;
oe = this.grid[gi - 1];
oee = this.grid[gi];
for (; gi != giEnd; gi++) {
oew = oe;
oe = oee;
oee = this.grid[gi + 1];
oen = this.grid[gi - this.gw];
oes = this.grid[gi + this.gw];
if (oe.conductivity > 0 ) oe.jz = 0;
if (oe.boundary) {
if (oe.resonant) {
oe.jz = oe.jz * 0.999 + -oe.dazdt * 0.001 - oe.epos * 0.02;
oe.epos += oe.jz * 0.2;
}if (curMedium != oe.medium) {
curMedium = oe.medium;
forcecoef = (1 - 0.002617801047120419 * curMedium);
forcecoef *= forcecoef;
}var az = oe.az;
previ = (oew.az - az) / oew.perm;
nexti = (oee.az - az) / oee.perm;
prevj = (oen.az - az) / oen.perm;
nextj = (oes.az - az) / oes.perm;
basis = (nexti + previ + nextj + prevj ) * 0.25;
var jz = oew.my - oee.my + oes.mx - oen.mx + oe.jz;
a = oe.perm * basis + jz;
} else {
previ = oew.az;
nexti = oee.az;
prevj = oen.az;
nextj = oes.az;
basis = (nexti + previ + nextj + prevj ) * 0.25;
a = oe.jz - (oe.az - basis);
}oe.dazdt = (oe.dazdt * oe.damp) + a * forcecoef;
}
}
tadd2 = tadd * tadd;
for (j = 1; j != mxy; j++) {
var gi = j * this.gw + 1;
var giEnd = gi - 1 + mxx;
for (; gi != giEnd; gi++) {
oe = this.grid[gi];
if (oe.conductivity > 0 ) {
a = -oe.dazdt * oe.conductivity;
oe.jz = a;
oe.dazdt += a;
}oe.az += oe.dazdt * tadd2;
}
}
this.t += tadd;
this.filterGrid();
var tm = System.currentTimeMillis();
if (tm - this.lastTime > 200 || iter * 1000 >= speedValue * (tm - this.lastTime)  ) {
this.lastTime = tm;
break;
}}
}this.renderGrid();
var intf = (((this.gridSizeY/2|0) - this.windowOffsetY) * this.winSize.height/this.windowHeight|0);
for (i = 0; i < this.sourceCount; i++) {
var src = this.sources[i];
var xx = src.getScreenX();
var yy = src.getScreenY();
this.plotSource$I$I$I(i, xx, yy);
}
if (this.adjustSelectX1 != -1) {
var c = this.getrand$I(255);
var col = 65792 * c + -16777216;
var lx1 = ((this.adjustSelectX1 * this.winSize.width/this.windowWidth|0));
var ly1 = ((this.adjustSelectY1 * this.winSize.height/this.windowHeight|0));
var lx2 = (((this.adjustSelectX2 + 1) * this.winSize.width/this.windowWidth|0));
var ly2 = (((this.adjustSelectY2 + 1) * this.winSize.height/this.windowHeight|0));
this.plotRect$I$I$I$I$I(lx1, ly1, lx2 - 1, ly2 - 1, col);
}if (this.imageSource != null ) this.imageSource.newPixels();
realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
if (!this.stoppedCheck.getState()) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'plotRect$I$I$I$I$I', function (x1, y1, x2, y2, col) {
var i;
for (i = x1; i <= x2; i++) {
this.plotPixel$I$I$I(i, y1, col);
this.plotPixel$I$I$I(i, y2, col);
}
for (i = y1; i <= y2; i++) {
this.plotPixel$I$I$I(x1, i, col);
this.plotPixel$I$I$I(x2, i, col);
}
});

Clazz.newMeth(C$, 'plotPixel$I$I$I', function (x, y, pix) {
if (x < 0 || x >= this.winSize.width ) return;
try {
this.pixels[x + y * this.winSize.width] = pix;
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
});

Clazz.newMeth(C$, 'plotSource$I$I$I', function (n, xx, yy) {
var rad = 7;
var j;
var col = (n == this.selectedSource) ? -16711681 : -1;
for (j = 0; j <= rad; j++) {
var k = ((Math.sqrt(rad * rad - j * j) + 0.5)|0);
this.plotPixel$I$I$I(xx + j, yy + k, col);
this.plotPixel$I$I$I(xx + k, yy + j, col);
this.plotPixel$I$I$I(xx + j, yy - k, col);
this.plotPixel$I$I$I(xx - k, yy + j, col);
this.plotPixel$I$I$I(xx - j, yy + k, col);
this.plotPixel$I$I$I(xx + k, yy - j, col);
this.plotPixel$I$I$I(xx - j, yy - k, col);
this.plotPixel$I$I$I(xx - k, yy - j, col);
this.plotPixel$I$I$I(xx, yy + j, col);
this.plotPixel$I$I$I(xx, yy - j, col);
this.plotPixel$I$I$I(xx + j, yy, col);
this.plotPixel$I$I$I(xx - j, yy, col);
}
});

Clazz.newMeth(C$, 'renderGrid', function () {
var mult = this.brightnessBar.getValue() / 50.0;
var emult = 1;
var ix = 0;
var i;
var j;
var k;
var l;
var viewScalar;
var viewVector;
var viewScalarCond;
var viewVectorCond;
var v = this.viewChooser.getSelectedIndex();
if (v == 16) this.calcForce();
var showLines = false;
viewScalar = viewScalarCond = viewVector = viewVectorCond = -1;
switch (v) {
case 0:
case 12:
case 4:
case 20:
case 21:
case 22:
case 23:
case 17:
case 18:
case 11:
case 3:
case 14:
viewScalar = viewScalarCond = v;
break;
case 1:
case 13:
case 9:
case 10:
case 19:
viewVector = viewVectorCond = v;
break;
case 2:
showLines = true;
break;
case 16:
viewScalar = viewScalarCond = 0;
viewVector = viewVectorCond = 16;
break;
case 5:
viewScalar = viewScalarCond = 0;
viewVector = viewVectorCond = 1;
emult = 0.3;
break;
case 7:
viewScalar = 0;
viewScalarCond = 4;
viewVector = viewVectorCond = 1;
emult = 0.3;
break;
case 6:
viewScalar = viewScalarCond = 0;
showLines = true;
emult = 0.3;
break;
case 8:
viewScalar = 0;
viewScalarCond = 4;
showLines = true;
emult = 0.3;
break;
case 15:
viewScalar = viewScalarCond = 14;
viewVector = viewVectorCond = 13;
break;
}
for (j = 0; j != this.windowHeight; j++) {
ix = this.winSize.width * ((j * this.winSize.height/this.windowHeight|0));
var gi = (j + this.windowOffsetY) * this.gw + this.windowOffsetX;
for (i = 0; i != this.windowWidth; i++, gi++) {
var x = (i * this.winSize.width/this.windowWidth|0);
var y = (j * this.winSize.height/this.windowHeight|0);
var x2 = ((i + 1) * this.winSize.width/this.windowWidth|0);
var y2 = ((j + 1) * this.winSize.height/this.windowHeight|0);
var i2 = i + this.windowOffsetX;
var j2 = j + this.windowOffsetY;
var vs = viewScalar;
var vv = viewVector;
var col_r = 0;
var col_g = 0;
var col_b = 0;
var oe = this.grid[gi];
if (oe.gray || oe.jz != 0  ) {
col_r = col_g = col_b = 64;
if (oe.conductivity > 0  || (oe.jz != 0  && !oe.resonant ) ) {
vv = viewVectorCond;
vs = viewScalarCond;
}}if (vs != -1) {
var dy = 0;
switch (vs) {
case 0:
dy = -oe.dazdt * emult;
break;
case 12:
dy = oe.az * 0.2;
break;
case 4:
dy = oe.jz;
break;
case 20:
dy = this.grid[gi - this.gw].az - this.grid[gi + this.gw].az;
break;
case 21:
dy = -(this.grid[gi + 1].az - this.grid[gi - 1].az);
break;
case 22:
dy = ((this.grid[gi - this.gw].az - this.grid[gi + this.gw].az) / oe.perm - oe.mx * 12.0);
break;
case 23:
dy = -((this.grid[gi + 1].az - this.grid[gi - 1].az) / oe.perm - oe.my * 12.0);
break;
case 17:
dy = this.getMagY$I(gi - 1) - this.getMagY$I(gi + 1) + this.getMagX$I(gi + this.gw) - this.getMagX$I(gi - this.gw);
break;
case 18:
dy = this.grid[gi - 1].mx - this.grid[gi + 1].mx + this.grid[gi - this.gw].my - this.grid[gi + this.gw].my;
break;
case 3:
{
var dx = this.grid[gi - this.gw].az - this.grid[gi + this.gw].az;
dy = this.grid[gi + 1].az - this.grid[gi - 1].az;
dy = Math.sqrt(dx * dx + dy * dy);
break;
}case 14:
{
var n = 1 / (1 - oe.medium * 0.5 / 191);
var dielec = n * n;
var dx = this.grid[gi - this.gw].az - this.grid[gi + this.gw].az;
dy = this.grid[gi + 1].az - this.grid[gi - 1].az;
dy = 0.4 * ((dx * dx + dy * dy) / oe.perm + oe.dazdt * oe.dazdt * dielec );
break;
}}
dy *= mult;
if (dy < -1 ) dy = -1;
if (dy > 1 ) dy = 1;
if (vs == 11) {
var dr = 0;
var dg = 0;
var db = 0;
if (oe.resonant) {
dr = 1;
dg = 0.75;
db = 0.5;
} else if (oe.perm < 1 ) {
dr = 1 - oe.perm;
} else if (oe.perm > 1 ) {
dg = (oe.perm - 1) / 30;
} else if (oe.mx != 0  || oe.my != 0  ) {
dr = 0.53;
dg = 0.27;
db = 0.63;
} else if (oe.medium > 0) {
dr = oe.medium / 191.0;
dg = dr * 0.5;
} else if (oe.conductivity > 0 ) {
dg = db = oe.conductivity;
if (oe.conductivity == 1 ) dr = 1;
} else if (oe.jz > 0 ) {
dr = dg = oe.jz * mult;
} else if (oe.jz < 0 ) {
db = -oe.jz * mult;
}dr = this.clamp$D(dr);
dg = this.clamp$D(dg);
db = this.clamp$D(db);
col_r = col_r + ((dr * (255 - col_r))|0);
col_g = col_g + ((dg * (255 - col_g))|0);
col_b = col_b + ((db * (255 - col_b))|0);
} else if (vs == 4 || vs == 17  || vs == 14 ) {
if (dy < 0 ) col_b = col_b + ((-dy * (255 - col_b))|0);
 else {
col_r = col_r + ((dy * (255 - col_r))|0);
col_g = col_g + ((dy * (255 - col_g))|0);
}} else {
if (dy < 0 ) col_r = col_r + ((-dy * (255 - col_r))|0);
 else col_g = col_g + ((dy * (255 - col_g))|0);
}}var col = -16777216 | (col_r << 16) | (col_g << 8) | col_b ;
for (k = 0; k != x2 - x; k++, ix++) for (l = 0; l != y2 - y; l++) this.pixels[ix + l * this.winSize.width] = col;


oe.col = col;
if (vv != -1) {
var dx = 0;
var dy = 0;
switch (vv) {
case 1:
dx = this.grid[gi - this.gw].az - this.grid[gi + this.gw].az;
dy = this.grid[gi + 1].az - this.grid[gi - 1].az;
break;
case 9:
dx = (this.grid[gi - this.gw].az - this.grid[gi + this.gw].az) / oe.perm - 12.0 * oe.mx;
dy = (this.grid[gi + 1].az - this.grid[gi - 1].az) / oe.perm - 12.0 * oe.my;
break;
case 10:
{
var mm = 1 - 1 / oe.perm;
dx = (this.grid[gi - this.gw].az - this.grid[gi + this.gw].az) * mm + oe.mx;
dy = (this.grid[gi + 1].az - this.grid[gi - 1].az) * mm + oe.my;
}break;
case 13:
dy = 5 * oe.dazdt * (this.grid[gi - this.gw].az - this.grid[gi + this.gw].az)  / oe.perm;
dx = -5 * oe.dazdt * (this.grid[gi + 1].az - this.grid[gi - 1].az)  / oe.perm;
break;
case 16:
dx = this.forceVecs[this.forceMap[i2][j2]][0];
dy = this.forceVecs[this.forceMap[i2][j2]][1];
break;
case 19:
dx = -5 * (this.grid[gi - this.gw].dazdt - this.grid[gi + this.gw].dazdt);
dy = -5 * (this.grid[gi + 1].dazdt - this.grid[gi - 1].dazdt);
break;
}
var dn = Math.sqrt(dx * dx + dy * dy);
if (dn > 0 ) {
dx /= dn;
dy /= dn;
}dn *= mult;
if (dn > 1 ) {
if (dn > 2 ) dn = 2;
dn -= 1;
col_g = 255;
col_r = col_r + ((dn * (255 - col_r))|0);
col_b = col_b + ((dn * (255 - col_b))|0);
} else col_g = col_g + ((dn * (255 - col_g))|0);
col = -16777216 | (col_r << 16) | (col_g << 8) | col_b ;
var sw2 = ((x2 - x)/2|0);
var sh2 = ((y2 - y)/2|0);
var x1 = x + sw2 - ((sw2 * dx)|0);
var y1 = y + sh2 - ((sh2 * dy)|0);
x2 = x + sw2 + ((sw2 * dx)|0) ;
y2 = y + sh2 + ((sh2 * dy)|0) ;
this.drawLine$I$I$I$I$I(x1, y1, x2, y2, col);
var as = 3;
this.drawLine$I$I$I$I$I(x2, y2, ((dy * as - dx * as + x2)|0), ((-dx * as - dy * as + y2)|0), col);
this.drawLine$I$I$I$I$I(x2, y2, ((-dy * as - dx * as + x2)|0), ((dx * as - dy * as + y2)|0), col);
}}
}
if (showLines) {
this.renderLines();
this.lineDensityBar.enable();
} else {
this.lineDensityBar.disable();
}});

Clazz.newMeth(C$, 'drawLine$I$I$I$I$I', function (x1, y1, x2, y2, col) {
if (x1 < 0) x1 = 0;
if (y1 < 0) y1 = 0;
if (x2 < 0) x2 = 0;
if (y2 < 0) y2 = 0;
if (x1 >= this.winSize.width - 1) x1 = this.winSize.width - 1;
if (y1 >= this.winSize.height - 1) y1 = this.winSize.height - 1;
if (x2 >= this.winSize.width - 1) x2 = this.winSize.width - 1;
if (y2 >= this.winSize.height - 1) y2 = this.winSize.height - 1;
var dx = this.abs$I(x2 - x1);
var dy = this.abs$I(y2 - y1);
if (dx > dy) {
if (x1 > x2) {
var q;
q = x1;
x1 = x2;
x2 = q;
q = y1;
y1 = y2;
y2 = q;
}var x;
for (x = x1; x <= x2; x++) this.pixels[x + (y1 + ((y2 - y1) * (x - x1)/dx|0)) * this.winSize.width] = col;

} else if (dy > 0) {
if (y1 > y2) {
var q;
q = x1;
x1 = x2;
x2 = q;
q = y1;
y1 = y2;
y2 = q;
}var y;
for (y = y1; y <= y2; y++) this.pixels[x1 + ((x2 - x1) * (y - y1)/dy|0) + y * this.winSize.width] = col;

}});

Clazz.newMeth(C$, 'getMagX$I', function (gi) {
var oe = this.grid[gi];
var mm = 1 - 1 / oe.perm;
return (this.grid[gi - this.gw].az - this.grid[gi + this.gw].az) * mm + oe.mx;
});

Clazz.newMeth(C$, 'getMagY$I', function (gi) {
var oe = this.grid[gi];
var mm = 1 - 1 / oe.perm;
return (this.grid[gi + 1].az - this.grid[gi - 1].az) * mm + oe.my;
});

Clazz.newMeth(C$, 'clamp$D', function (x) {
return (x < 0 ) ? 0 : (x > 1 ) ? 1 : x;
});

Clazz.newMeth(C$, 'doSources$D$Z', function (tadd, clear) {
var i;
var j;
if (this.sourceCount == 0) return;
var w = this.forceBar.getValue() * (this.t - this.forceTimeZero) * 0.01166665 ;
var w2 = w;
switch (this.auxFunction) {
case 2:
w2 = this.auxBar.getValue() * this.t * 0.01166665 ;
break;
case 1:
{
var au = this.auxBar.getValue() - 1;
if (au > 38) au = 38;
w2 = w + au * 0.08267349088394192;
break;
}}
var v = 0;
var v2 = 0;
switch (this.sourceWaveform) {
case 0:
v = Math.sin(w);
if (this.sourceCount >= 2) v2 = Math.sin(w2);
 else if (this.sourceFreqCount == 2) v = (v + Math.sin(w2)) * 0.5;
break;
case 1:
{
w %= 6.283185307179586;
var adjw = w / (0.01166665 * this.forceBar.getValue());
adjw -= 10;
v = Math.exp(-0.01 * adjw * adjw ) * Math.sin(adjw * 0.2);
if (adjw < 0 ) this.doFilter();
}break;
}
if (clear) v = v2 = 0;
this.sources[0].v = this.sources[2].v = (2 * v * this.sourceMult );
this.sources[1].v = this.sources[3].v = (2 * v2 * this.sourceMult );
if (this.sourcePlane) {
for (j = 0; j != (this.sourceCount/2|0); j++) {
var src1 = this.sources[j * 2];
var src2 = this.sources[j * 2 + 1];
var src3 = this.sources[j];
this.drawPlaneSource$I$I$I$I$D(src1.x, src1.y, src2.x, src2.y, src3.v * 0.1);
}
} else {
for (i = 0; i != this.sourceCount; i++) {
var src = this.sources[i];
var oe = this.grid[src.x + this.gw * src.y];
oe.jz = src.v;
}
}});

Clazz.newMeth(C$, 'abs$I', function (x) {
return x < 0 ? -x : x;
});

Clazz.newMeth(C$, 'drawPlaneSource$I$I$I$I$D', function (x1, y1, x2, y2, v) {
if (y1 == y2) {
if (x1 == this.windowOffsetX) x1 = 0;
if (x2 == this.windowOffsetX) x2 = 0;
if (x1 == this.windowOffsetX + this.windowWidth - 1) x1 = this.gridSizeX - 1;
if (x2 == this.windowOffsetX + this.windowWidth - 1) x2 = this.gridSizeX - 1;
}if (x1 == x2) {
if (y1 == this.windowOffsetY) y1 = 0;
if (y2 == this.windowOffsetY) y2 = 0;
if (y1 == this.windowOffsetY + this.windowHeight - 1) y1 = this.gridSizeY - 1;
if (y2 == this.windowOffsetY + this.windowHeight - 1) y2 = this.gridSizeY - 1;
}if (x1 == x2 && y1 == y2 ) {
this.grid[x1 + this.gw * y1].jz = v;
} else if (this.abs$I(y2 - y1) > this.abs$I(x2 - x1)) {
var sgn = this.sign$I(y2 - y1);
var x;
var y;
for (y = y1; y != y2 + sgn; y = y+(sgn)) {
x = x1 + ((x2 - x1) * (y - y1)/(y2 - y1)|0);
this.grid[x + this.gw * y].jz = v;
}
} else {
var sgn = this.sign$I(x2 - x1);
var x;
var y;
for (x = x1; x != x2 + sgn; x = x+(sgn)) {
y = y1 + ((y2 - y1) * (x - x1)/(x2 - x1)|0);
this.grid[x + this.gw * y].jz = v;
}
}});

Clazz.newMeth(C$, 'sign$I', function (x) {
return (x < 0) ? -1 : (x == 0) ? 0 : 1;
});

Clazz.newMeth(C$, 'renderLines', function () {
var x = 0;
var y = 0;
var lineGridSize = this.lineDensityBar.getValue();
var lineGridSize2 = lineGridSize * lineGridSize;
if (this.linegrid == null ) this.linegrid = Clazz.array(Byte.TYPE, [lineGridSize2]);
var lspacing = lineGridSize / this.windowWidth;
var startx = -1;
var starty = 0;
var linemax = 0;
var mult = this.brightnessBar.getValue() / 50.0;
var doArrow = false;
var dir = 1;
var olddn = -1;
var oldcol = -1;
var gridsearchx = 0;
var gridsearchy = 0;
var i;
var j;
for (i = 0; i != lineGridSize2; i++) this.linegrid[i] = (0|0);

var oldcgx = -1;
var oldcgy = -1;
while (true){
if (linemax-- == 0 || x == 0  ) {
if (dir == 1) {
var gi = gridsearchx + lineGridSize * gridsearchy;
while (true){
if (this.linegrid[gi] == 0) break;
if (++gridsearchx == lineGridSize) {
if (++gridsearchy == lineGridSize) break;
gridsearchx = 0;
}gi++;
}
if (gridsearchx == lineGridSize && gridsearchy == lineGridSize ) break;
startx = gridsearchx / lspacing;
starty = gridsearchy / lspacing;
}x = startx + 0.48 / lspacing;
y = starty + 0.48 / lspacing;
linemax = 40;
dir = -dir;
oldcgx = oldcgy = -1;
}if (x < 0  || y < 0   || x >= this.windowWidth   || y >= this.windowHeight  ) {
x = 0;
continue;
}var cgx = ((x * lspacing)|0);
var cgy = ((y * lspacing)|0);
doArrow = true;
if (cgx != oldcgx || cgy != oldcgy ) {
var lg = ++this.linegrid[cgx + lineGridSize * cgy];
if (lg > 2) {
x = 0;
continue;
}oldcgx = cgx;
oldcgy = cgy;
} else doArrow = false;
var xi = this.windowOffsetX + (x|0);
var yi = this.windowOffsetY + (y|0);
var gi = xi + this.gw * yi;
var oe = this.grid[gi];
var dx = this.grid[gi - this.gw].az - this.grid[gi + this.gw].az;
var dy = this.grid[gi + 1].az - this.grid[gi - 1].az;
var dn = Math.sqrt(dx * dx + dy * dy);
if (dn == 0 ) {
x = 0;
continue;
}dx /= dn;
dy /= dn;
var oldx = x;
var oldy = y;
x += 0.5 * dx * dir ;
y += 0.5 * dy * dir ;
dn *= mult;
var col = this.grid[gi].col;
if (dn != olddn  || col != oldcol ) {
var col_r = (col >> 16) & 255;
var col_g = (col >> 8) & 255;
var col_b = col & 255;
if (dn > 1 ) {
if (dn > 2 ) dn = 2;
dn -= 1;
col_g = 255;
col_r = col_r + ((dn * (255 - col_r))|0);
col_b = col_b + ((dn * (255 - col_b))|0);
} else col_g = col_g + ((dn * (255 - col_g))|0);
col = -16777216 | (col_r << 16) | (col_g << 8) | col_b ;
olddn = dn;
oldcol = col;
}var lx1 = ((oldx * this.winSize.width / this.windowWidth)|0);
var ly1 = ((oldy * this.winSize.height / this.windowHeight)|0);
var lx2 = ((x * this.winSize.width / this.windowWidth)|0);
var ly2 = ((y * this.winSize.height / this.windowHeight)|0);
this.drawLine$I$I$I$I$I(lx1, ly1, lx2, ly2, col);
if (doArrow && this.linegrid[cgx + lineGridSize * cgy] == 1 ) {
if ((cgx & 3) == 0 && (cgy & 3) == 0 ) {
var as = 5;
this.drawLine$I$I$I$I$I(lx2, ly2, ((dy * as - dx * as + lx2)|0), ((-dx * as - dy * as + ly2)|0), col);
this.drawLine$I$I$I$I$I(lx2, ly2, ((-dy * as - dx * as + lx2)|0), ((dx * as - dy * as + ly2)|0), col);
}}}
});

Clazz.newMeth(C$, 'calcForce', function () {
var x;
var y;
this.forceMap = Clazz.array(Byte.TYPE, [this.gridSizeX, this.gridSizeY]);
this.forceVecs = Clazz.array(Double.TYPE, [256, 2]);
var magno = ($b$[0] = 1, $b$[0]);
for (x = this.windowOffsetX; x != this.windowWidth + this.windowOffsetX; x++) for (y = this.windowOffsetY; y != this.windowHeight + this.windowOffsetY; y++) {
if (this.forceMap[x][y] != 0 || !this.grid[x + this.gw * y].feelsForce() ) continue;
this.forceVecs[magno][0] = this.forceVecs[magno][1] = 0;
this.forceSearch$I$I$B(x, y, ($b$[0] = magno++, $b$[0]));
}

});

Clazz.newMeth(C$, 'forceSearch$I$I$B', function (x, y, magno) {
if (this.forceMap[x][y] != 0) return;
if (x < this.windowOffsetX || y < this.windowOffsetY  || x >= this.windowOffsetX + this.windowWidth  || y >= this.windowOffsetY + this.windowHeight ) return;
var gi = x + y * this.gw;
var mc = this.getMagX$I(gi - 1) - this.getMagX$I(gi + 1) + this.getMagY$I(gi - this.gw) - this.getMagY$I(gi + this.gw);
var bx = this.grid[gi - this.gw].az - this.grid[gi + this.gw].az;
var by = this.grid[gi + 1].az - this.grid[gi - 1].az;
this.forceVecs[magno][0] += mc * bx + this.grid[gi].jz * by;
this.forceVecs[magno][1] += mc * by - this.grid[gi].jz * bx;
if (this.grid[gi].feelsForce()) {
this.forceMap[x][y] = (magno|0);
this.forceSearch$I$I$B(x - 1, y, ($b$[0] = magno, $b$[0]));
this.forceSearch$I$I$B(x + 1, y, ($b$[0] = magno, $b$[0]));
this.forceSearch$I$I$B(x, y - 1, ($b$[0] = magno, $b$[0]));
this.forceSearch$I$I$B(x, y + 1, ($b$[0] = magno, $b$[0]));
}});

Clazz.newMeth(C$, 'filterGrid', function () {
if ((this.filterCount++ & 3) != 0) return;
if (this.filterCount > 200) return;
var mult1 = (this.forceBar.getValue() > 7 && this.sourceCount > 0  && this.sourceWaveform == 0 ) ? 40 : 8;
var mult2 = 4 + mult1;
var x;
var y;
for (y = 1; y < this.gridSizeY - 1; y++) for (x = 1; x < this.gridSizeX - 1; x++) {
var gi = x + y * this.gw;
var oe = this.grid[gi];
if (oe.jz != 0  || oe.conductivity > 0  ) continue;
if (oe.perm != this.grid[gi - 1].perm  || oe.perm != this.grid[gi + 1].perm   || oe.perm != this.grid[gi - this.gw].perm   || oe.perm != this.grid[gi + this.gw].perm  ) continue;
var jz = this.grid[gi - 1].my - this.grid[gi + 1].my + this.grid[gi + this.gw].mx - this.grid[gi - this.gw].mx;
if (jz != 0 ) continue;
oe.az = (oe.az * mult1 + this.grid[gi - 1].az + this.grid[gi + 1].az + this.grid[gi - this.gw].az + this.grid[gi + this.gw].az) / mult2;
}

});

Clazz.newMeth(C$, 'noFilter', function () {
this.filterCount = 200;
});

Clazz.newMeth(C$, 'doFilter', function () {
this.filterCount = this.filterCount%(4);
});

Clazz.newMeth(C$, 'edit$java_awt_event_MouseEvent', function (e) {
var x = e.getX();
var y = e.getY();
if (this.selectedSource != -1) {
this.doSources$D$Z(1, true);
x = (x * this.windowWidth/this.winSize.width|0);
y = (y * this.windowHeight/this.winSize.height|0);
var s = this.sources[this.selectedSource];
if (x >= 0 && y >= 0  && x < this.windowWidth  && y < this.windowHeight ) {
var ox = s.x;
var oy = s.y;
s.x = x + this.windowOffsetX;
s.y = y + this.windowOffsetY;
this.cv.repaint$J(this.pause);
}return;
}if (this.modeChooser.getSelectedIndex() >= 14) {
var xp = (x * this.windowWidth/this.winSize.width|0);
var yp = (y * this.windowHeight/this.winSize.height|0);
if (this.adjustSelectX1 == -1) {
this.adjustSelectX1 = this.adjustSelectX2 = xp;
this.adjustSelectY1 = this.adjustSelectY2 = yp;
this.adjustBar.enable();
return;
}this.adjustSelectX1 = this.max$I$I(0, this.min$I$I(xp, this.adjustSelectX1));
this.adjustSelectX2 = this.min$I$I(this.windowWidth - 1, this.max$I$I(xp, this.adjustSelectX2));
this.adjustSelectY1 = this.max$I$I(0, this.min$I$I(yp, this.adjustSelectY1));
this.adjustSelectY2 = this.min$I$I(this.windowHeight - 1, this.max$I$I(yp, this.adjustSelectY2));
this.adjustBar.enable();
return;
}if (this.dragX == x && this.dragY == y ) this.editFuncPoint$I$I(x, y);
 else {
if (this.abs$I(y - this.dragY) > this.abs$I(x - this.dragX)) {
var x1 = (y < this.dragY) ? x : this.dragX;
var y1 = (y < this.dragY) ? y : this.dragY;
var x2 = (y > this.dragY) ? x : this.dragX;
var y2 = (y > this.dragY) ? y : this.dragY;
this.dragX = x;
this.dragY = y;
for (y = y1; y <= y2; y++) {
x = x1 + ((x2 - x1) * (y - y1)/(y2 - y1)|0);
this.editFuncPoint$I$I(x, y);
}
} else {
var x1 = (x < this.dragX) ? x : this.dragX;
var y1 = (x < this.dragX) ? y : this.dragY;
var x2 = (x > this.dragX) ? x : this.dragX;
var y2 = (x > this.dragX) ? y : this.dragY;
this.dragX = x;
this.dragY = y;
for (x = x1; x <= x2; x++) {
y = y1 + ((y2 - y1) * (x - x1)/(x2 - x1)|0);
this.editFuncPoint$I$I(x, y);
}
}}this.calcBoundaries();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'min$I$I', function (a, b) {
return (a < b) ? a : b;
});

Clazz.newMeth(C$, 'max$I$I', function (a, b) {
return (a > b) ? a : b;
});

Clazz.newMeth(C$, 'editFuncPoint$I$I', function (x, y) {
var xp = (x * this.windowWidth/this.winSize.width|0);
var yp = (y * this.windowHeight/this.winSize.height|0);
if (xp < 0 || xp >= this.windowWidth  || yp < 0  || yp >= this.windowHeight ) return;
xp = xp+(this.windowOffsetX);
yp = yp+(this.windowOffsetY);
var oe = this.grid[xp + this.gw * yp];
this.doFilter();
if (!this.dragSet && !this.dragClear ) {
this.dragClear = oe.conductivity != 0  || oe.medium != 0  || oe.mx != 0   || oe.my != 0   || oe.perm != 1   || oe.jz != 0   || oe.resonant ;
this.dragSet = !this.dragClear;
}oe.conductivity = 0;
oe.medium = 0;
oe.mx = oe.my = 0;
oe.perm = 1;
oe.jz = 0;
oe.resonant = false;
if (this.dragClear) return;
switch (this.modeChooser.getSelectedIndex()) {
case 3:
oe.jz = 1;
break;
case 4:
oe.jz = -1;
break;
case 5:
this.addPerm$I$I$D(xp, yp, 5);
break;
case 6:
this.addPerm$I$I$D(xp, yp, 0.5);
break;
case 7:
oe.medium = 191;
break;
case 8:
oe.my = 1;
break;
case 9:
oe.my = -1;
break;
case 10:
oe.mx = -1;
break;
case 11:
oe.mx = 1;
break;
case 0:
this.addConductor$I$I$D(xp, yp, 1);
break;
case 1:
this.addConductor$I$I$D(xp, yp, 0.9);
break;
case 2:
this.addConductor$I$I$D(xp, yp, 0.5);
break;
case 12:
oe.resonant = true;
break;
}
});

Clazz.newMeth(C$, 'selectSource$java_awt_event_MouseEvent', function (me) {
var x = me.getX();
var y = me.getY();
var i;
this.selectedSource = -1;
var best = 14;
best = best*(best);
for (i = 0; i != this.sourceCount; i++) {
var src = this.sources[i];
var sx = src.getScreenX();
var sy = src.getScreenY();
var r2 = (sx - x) * (sx - x) + (sy - y) * (sy - y);
if (r2 < best) {
this.selectedSource = i;
best = r2;
}}
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
if (e.getSource() === this.clearButton ) {
this.doClear();
this.cv.repaint();
}if (e.getSource() === this.ClearAllButton ) {
this.doClearAll();
this.cv.repaint();
}});

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
System.out.print$S((e.getSource()).getValue() + "\n");
if (e.getSource() === this.resBar ) {
this.setResolution();
this.reinit();
this.cv.repaint$J(this.pause);
}if (e.getSource() === this.brightnessBar ) this.cv.repaint$J(this.pause);
if (e.getSource() === this.lineDensityBar ) {
this.cv.repaint$J(this.pause);
this.linegrid = null;
}if (e.getSource() === this.forceBar ) this.setForce();
if (e.getSource() === this.adjustBar ) this.doAdjust();
});

Clazz.newMeth(C$, 'setForceBar$I', function (x) {
this.forceBar.setValue$I(x);
this.forceBarValue = x;
this.forceTimeZero = 0;
});

Clazz.newMeth(C$, 'setForce', function () {
var oldfreq = this.forceBarValue * 0.01166665;
this.forceBarValue = this.forceBar.getValue();
var newfreq = this.forceBarValue * 0.01166665;
var adj = newfreq - oldfreq;
this.forceTimeZero = this.t - oldfreq * (this.t - this.forceTimeZero) / newfreq;
});

Clazz.newMeth(C$, 'setResolution', function () {
this.windowWidth = this.windowHeight = this.resBar.getValue();
this.windowOffsetX = this.windowOffsetY = 20;
this.gridSizeX = this.windowWidth + this.windowOffsetX * 2;
this.gridSizeY = this.windowHeight + this.windowOffsetY * 2;
this.gridSizeXY = this.gridSizeX * this.gridSizeY;
this.gw = this.gridSizeX;
System.out.println$S("gridsize " + this.gridSizeX + " window " + this.windowWidth );
this.linegrid = null;
});

Clazz.newMeth(C$, 'setResolution$I', function (x) {
this.resBar.setValue$I(x);
this.setResolution();
this.reinit();
});

Clazz.newMeth(C$, 'doAdjust', function () {
if (this.adjustSelectX1 == -1) return;
var vali = this.adjustBar.getValue();
if (vali < 1) vali = 1;
if (vali > 99) vali = 100;
if (this.modeChooser.getSelectedIndex() == 15 && vali < 3 ) vali = 3;
var val = vali / 100.0;
var x;
var y;
for (y = this.adjustSelectY1; y <= this.adjustSelectY2; y++) for (x = this.adjustSelectX1; x <= this.adjustSelectX2; x++) {
var oe = this.grid[x + this.windowOffsetX + this.gw * (y + this.windowOffsetY) ];
switch (this.modeChooser.getSelectedIndex()) {
case 14:
if (oe.getType() == 1) oe.conductivity = val;
break;
case 15:
if (oe.getType() == 3) oe.perm = vali / 2.0;
break;
case 16:
if (oe.getType() == 5) oe.jz = (oe.jz < 0 ) ? -val : val;
break;
case 17:
if (oe.getType() == 6) oe.medium = ((val * 191)|0);
break;
case 18:
if (oe.getType() == 4) {
var m = Math.sqrt(oe.mx * oe.mx + oe.my * oe.my);
oe.mx = (Math.cos(val * 2 * 3.141592653589793 ) * m);
oe.my = -(Math.sin(val * 2 * 3.141592653589793 ) * m);
}break;
case 19:
if (oe.getType() == 4) {
var mult = (val / Math.sqrt(oe.mx * oe.mx + oe.my * oe.my));
oe.mx *= mult;
oe.my *= mult;
}break;
}
}

this.calcBoundaries();
});

Clazz.newMeth(C$, 'mouseDragged$java_awt_event_MouseEvent', function (e) {
if (!this.dragging) this.selectSource$java_awt_event_MouseEvent(e);
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseMoved$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) != 0) return;
var x = e.getX();
var y = e.getY();
this.dragX = x;
this.dragY = y;
this.selectSource$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseClicked$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseEntered$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseExited$java_awt_event_MouseEvent', function (e) {
this.selectedSource = -1;
this.cv.repaint();
});

Clazz.newMeth(C$, 'mousePressed$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
this.adjustSelectX1 = -1;
this.adjustBar.disable();
var x = e.getX();
var y = e.getY();
this.dragX = x;
this.dragY = y;
if (!this.dragging) this.selectSource$java_awt_event_MouseEvent(e);
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
this.dragging = false;
this.dragSet = this.dragClear = false;
this.cv.repaint();
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
this.cv.repaint$J(this.pause);
if (e.getItemSelectable() === this.stoppedCheck ) return;
if (e.getItemSelectable() === this.sourceChooser ) {
this.setSources();
this.doFilter();
}if (e.getItemSelectable() === this.setupChooser ) this.doSetup();
if (e.getItemSelectable() === this.modeChooser ) this.setModeChooser();
});

Clazz.newMeth(C$, 'setModeChooser', function () {
if (this.modeChooser.getSelectedIndex() < 14) {
this.adjustLabel.hide();
this.adjustBar.hide();
this.validate();
this.adjustSelectX1 = -1;
return;
}switch (this.modeChooser.getSelectedIndex()) {
case 14:
this.adjustLabel.setText$S("Conductivity");
break;
case 15:
this.adjustLabel.setText$S("Permeability");
break;
case 16:
this.adjustLabel.setText$S("Current");
break;
case 17:
this.adjustLabel.setText$S("Dielectric Constant");
break;
case 18:
this.adjustLabel.setText$S("Direction");
break;
case 19:
this.adjustLabel.setText$S("Strength");
break;
}
this.adjustLabel.show();
this.adjustBar.show();
if (this.adjustSelectX1 == -1) this.adjustBar.disable();
 else this.adjustBar.enable();
this.validate();
});

Clazz.newMeth(C$, 'doSetup', function () {
this.t = 0;
this.doClearAll();
this.sourceCount = -1;
this.filterCount = 0;
this.sourceChooser.select$I(1);
this.setForceBar$I(10);
this.brightnessBar.setValue$I(100);
this.auxBar.setValue$I(1);
this.setup = this.setupList.elementAt$I(this.setupChooser.getSelectedIndex());
this.setup.select();
this.setup.doSetupSources();
this.calcBoundaries();
this.setDamping();
});

Clazz.newMeth(C$, 'addMedium', function () {
var i;
var j;
for (i = 0; i != this.gridSizeX; i++) for (j = (this.gridSizeY/2|0); j != this.gridSizeY; j++) this.grid[i + this.gw * j].medium = 191;


});

Clazz.newMeth(C$, 'addCondMedium$D', function (cv) {
this.conductFillRect$I$I$I$I$D(0, (this.gridSizeY/2|0), this.gridSizeX - 1, this.gridSizeY - 1, cv);
});

Clazz.newMeth(C$, 'addResMedium', function () {
var i;
var j;
for (i = 0; i != this.gridSizeX; i++) for (j = (this.gridSizeY/2|0); j != this.gridSizeY; j++) this.grid[i + this.gw * j].resonant = true;


});

Clazz.newMeth(C$, 'addUniformField', function () {
var v = 2.0 / this.windowHeight;
var y;
for (y = 0; y != this.gridSizeY; y++) {
this.grid[this.windowOffsetX + this.gw * y].jz = v;
this.grid[this.windowOffsetX + this.windowWidth - 1 + this.gw * y].jz = -v;
}
});

Clazz.newMeth(C$, 'addSolenoid$I$I$I$I$D', function (x1, y1, x2, y2, v) {
var i;
for (i = y1; i <= y2; i++) {
this.grid[x1 + this.gw * i].jz = v;
this.grid[x2 + this.gw * i].jz = -v;
}
});

Clazz.newMeth(C$, 'addMagnet$I$I$I$I$D', function (x1, y1, x2, y2, v) {
var i;
var j;
for (i = y1; i <= y2; i++) for (j = x1; j <= x2; j++) this.grid[j + this.gw * i].my = v;


});

Clazz.newMeth(C$, 'addMagnet$I$I$I$I$D$D', function (x1, y1, x2, y2, vx, vy) {
var i;
var j;
for (i = y1; i <= y2; i++) for (j = x1; j <= x2; j++) {
this.grid[j + this.gw * i].mx = vx;
this.grid[j + this.gw * i].my = vy;
}

});

Clazz.newMeth(C$, 'setSources', function () {
if (this.sourceCount > 0) this.doSources$D$Z(1, true);
this.sourceMult = 1;
var oldSCount = this.sourceCount;
var oldPlane = this.sourcePlane;
this.sourceFreqCount = 1;
this.sourcePlane = (this.sourceChooser.getSelectedIndex() >= 8);
this.sourceWaveform = 0;
this.sourceCount = 1;
switch (this.sourceChooser.getSelectedIndex()) {
case 0:
this.sourceCount = 0;
break;
case 2:
this.sourceFreqCount = 2;
break;
case 3:
this.sourceCount = 2;
break;
case 4:
this.sourceCount = 2;
this.sourceFreqCount = 2;
break;
case 5:
this.sourceCount = 3;
break;
case 6:
this.sourceCount = 4;
break;
case 7:
this.sourceWaveform = 1;
break;
case 9:
this.sourceFreqCount = 2;
break;
case 10:
this.sourceCount = 2;
break;
case 11:
this.sourceCount = this.sourceFreqCount = 2;
break;
case 12:
this.sourceWaveform = 1;
break;
}
if (this.sourceFreqCount >= 2) {
this.auxFunction = 2;
this.auxBar.setValue$I(this.forceBar.getValue());
if (this.sourceCount == 2) this.auxLabel.setText$S("Source 2 Frequency");
 else this.auxLabel.setText$S("2nd Frequency");
} else if (this.sourceCount == 2 || this.sourceCount == 4 ) {
this.auxFunction = 1;
this.auxBar.setValue$I(1);
this.auxLabel.setText$S("Phase Difference");
} else {
this.auxFunction = 0;
this.auxBar.hide();
this.auxLabel.hide();
}if (this.auxFunction != 0) {
this.auxBar.show();
this.auxLabel.show();
}this.validate();
if (this.sourcePlane) {
this.sourceCount = this.sourceCount*(2);
if (!(oldPlane && oldSCount == this.sourceCount )) {
var x2 = this.windowOffsetX + this.windowWidth - 1;
var y2 = this.windowOffsetY + this.windowHeight - 1;
this.sources[0] = Clazz.new_((I$[91]||(I$[91]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').OscSource))).c$$I$I, [this, null, this.windowOffsetX, this.windowOffsetY]);
this.sources[1] = Clazz.new_((I$[91]||(I$[91]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').OscSource))).c$$I$I, [this, null, x2, this.windowOffsetY]);
this.sources[2] = Clazz.new_((I$[91]||(I$[91]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').OscSource))).c$$I$I, [this, null, this.windowOffsetX, y2]);
this.sources[3] = Clazz.new_((I$[91]||(I$[91]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').OscSource))).c$$I$I, [this, null, x2, y2]);
}} else if (!(oldSCount == this.sourceCount && !oldPlane )) {
this.sources[0] = Clazz.new_((I$[91]||(I$[91]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').OscSource))).c$$I$I, [this, null, (this.gridSizeX/2|0), this.windowOffsetY + 1]);
this.sources[1] = Clazz.new_((I$[91]||(I$[91]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').OscSource))).c$$I$I, [this, null, (this.gridSizeX/2|0), this.gridSizeY - this.windowOffsetY - 2 ]);
this.sources[2] = Clazz.new_((I$[91]||(I$[91]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').OscSource))).c$$I$I, [this, null, this.windowOffsetX + 1, (this.gridSizeY/2|0)]);
this.sources[3] = Clazz.new_((I$[91]||(I$[91]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').OscSource))).c$$I$I, [this, null, this.gridSizeX - this.windowOffsetX - 2 , (this.gridSizeY/2|0)]);
}});

Clazz.newMeth(C$, 'setupMode$I$I$I$I$I$I', function (x, y, sx, sy, nx, ny) {
var i;
var j;
for (i = 0; i != sx; i++) for (j = 0; j != sy; j++) {
this.grid[i + x + this.gw * (j + y) ].az = 2 * (Math.sin(3.141592653589793 * nx * (i + 1)  / (sx + 1)) * Math.sin(3.141592653589793 * ny * (j + 1)  / (sy + 1)));
this.grid[i + x + this.gw * (j + y) ].dazdt = 0;
}

this.noFilter();
});

Clazz.newMeth(C$, 'zeroj$I$I', function (m_order, n_zero) {
var beta = (n_zero + 0.5 * m_order - 0.25) * 3.141592654;
var mu = 4 * m_order * m_order ;
var beta8 = 8 * beta;
var z = beta - (mu - 1) / beta8 - 4 * (mu - 1) * (7 * mu - 31)  / (3 * beta8 * beta8 * beta8 );
var jj = Clazz.array(Double.TYPE, [m_order + 3]);
var i;
var deriv;
for (i = 1; i <= 5; i++) {
this.bess$I$D$DA(m_order + 1, z, jj);
deriv = -jj[m_order + 2] + m_order / z * jj[m_order + 1];
z -= jj[m_order + 1] / deriv;
}
return (z);
});

Clazz.newMeth(C$, 'bess$I$D$DA', function (m_max, x, jj) {
var maxmx = (m_max > x ) ? m_max : ((x|0));
var m_top = 2 * ((((maxmx + 15)/2|0) + 1));
var j = Clazz.array(Double.TYPE, [m_top + 2]);
j[m_top + 1] = 0.0;
j[m_top] = 1.0;
var tinyNumber = 1.0E-16;
var m;
for (m = m_top - 2; m >= 0; m--) j[m + 1] = 2 * (m + 1) / (x + tinyNumber) * j[m + 2] - j[m + 3];

var norm = j[1];
for (m = 2; m <= m_top; m = m+(2)) norm += 2 * j[m + 1];

for (m = 0; m <= m_max; m++) jj[m + 1] = j[m + 1] / norm;

});

Clazz.newMeth(C$, 'addThickWire$I$I$I$D', function (cx, cy, r, j) {
var res = 4;
cx = cx*(res);
cy = cy*(res);
r = r*(res);
j /= (res * res);
var x;
var y;
for (x = -r; x <= r; x++) {
var yd = (Math.sqrt(r * r - x * x)|0);
for (y = -yd; y <= yd; y++) this.grid[((x + cx)/res|0) + this.gw * (((y + cy)/res|0))].jz += j;

}
});

Clazz.newMeth(C$, 'addWireCircle$I$I$I$D$I$I', function (cx, cy, r, j, deg1, deg2) {
var res = 4;
r = r*(res);
j /= (res * res);
var th;
for (th = deg1; th != deg2; th++) {
var x = cx + ((Math.cos(th * 3.141592653589793 / 180) * r / res)|0);
var y = cy - ((Math.sin(th * 3.141592653589793 / 180) * r / res)|0);
this.grid[x + this.gw * y].jz += j;
}
});

Clazz.newMeth(C$, 'addConductor$I$I$D', function (x, y, cv) {
var oe = this.grid[x + this.gw * y];
oe.conductivity = cv;
if (cv == 1 ) oe.az = oe.dazdt = 0;
});

Clazz.newMeth(C$, 'addPerm$I$I$D', function (x, y, pm) {
var oe = this.grid[x + this.gw * y];
oe.perm = pm;
oe.conductivity = (pm == 1 ) ? 0 : 0.5;
});

Clazz.newMeth(C$, 'conductFillRect$I$I$I$I$D', function (x, y, x2, y2, cv) {
var i;
var j;
for (i = x; i <= x2; i++) for (j = y; j <= y2; j++) this.addConductor$I$I$D(i, j, cv);


});

Clazz.newMeth(C$, 'conductDrawRect$I$I$I$I$D', function (x, y, x2, y2, cvd) {
var i;
var cv = cvd;
for (i = x; i <= x2; i++) {
this.addConductor$I$I$D(i, y, cv);
this.addConductor$I$I$D(i, y2, cv);
}
for (i = y; i <= y2; i++) {
this.addConductor$I$I$D(x, i, cv);
this.addConductor$I$I$D(x2, i, cv);
}
});

Clazz.newMeth(C$, 'permDrawRect$I$I$I$I$D', function (x, y, x2, y2, pm) {
var i;
for (i = x; i <= x2; i++) {
this.addPerm$I$I$D(i, y, pm);
this.addPerm$I$I$D(i, y2, pm);
}
for (i = y; i <= y2; i++) {
this.addPerm$I$I$D(x, i, pm);
this.addPerm$I$I$D(x2, i, pm);
}
});

Clazz.newMeth(C$, 'permFillRect$I$I$I$I$D', function (x, y, x2, y2, pm) {
var i;
var j;
for (i = x; i <= x2; i++) for (j = y; j <= y2; j++) this.addPerm$I$I$D(i, j, pm);


});
var $b$ = new Int8Array(1);
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "OscSource", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.x = 0;
this.y = 0;
this.v = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.$init$.apply(this);
this.x = xx;
this.y = yy;
}, 1);

Clazz.newMeth(C$, 'getScreenX', function () {
return (((this.x - this.b$['com.falstad.EMWave2Frame'].windowOffsetX) * this.b$['com.falstad.EMWave2Frame'].winSize.width + (this.b$['com.falstad.EMWave2Frame'].winSize.width/2|0))/this.b$['com.falstad.EMWave2Frame'].windowWidth|0);
});

Clazz.newMeth(C$, 'getScreenY', function () {
return (((this.y - this.b$['com.falstad.EMWave2Frame'].windowOffsetY) * this.b$['com.falstad.EMWave2Frame'].winSize.height + (this.b$['com.falstad.EMWave2Frame'].winSize.height/2|0))/this.b$['com.falstad.EMWave2Frame'].windowHeight|0);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "OscElement", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.perm = 0;
this.conductivity = 0;
this.mx = 0;
this.my = 0;
this.jz = 0;
this.epos = 0;
this.damp = 0;
this.az = 0;
this.dazdt = 0;
this.medium = 0;
this.col = 0;
this.boundary = false;
this.gray = false;
this.resonant = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getType', function () {
if (this.perm < 1 ) return 2;
 else if (this.perm > 1 ) return 3;
 else if (this.mx != 0  || this.my != 0  ) return 4;
 else if (this.medium > 0) return 6;
 else if (this.conductivity > 0 ) return 1;
 else if (this.jz != 0 ) return 5;
return 0;
});

Clazz.newMeth(C$, 'feelsForce', function () {
var t = this.getType();
return (t != 0 && t != 6 );
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'select', function () {
});

Clazz.newMeth(C$, 'deselect', function () {
});

Clazz.newMeth(C$, 'valueChanged$a2s_Scrollbar', function (s) {
});

Clazz.newMeth(C$, 'doStep', function () {
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.EMWave2Frame'].setSources();
});

Clazz.newMeth(C$, 'c$', function () {
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "SingleSourceSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Single Source";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(30);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[2]||(I$[2]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').DoubleSourceSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "DoubleSourceSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Two Sources";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(30);
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(3);
this.b$['com.falstad.EMWave2Frame'].setSources();
this.b$['com.falstad.EMWave2Frame'].sources[0].y = (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 8;
this.b$['com.falstad.EMWave2Frame'].sources[1].y = (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 8;
this.b$['com.falstad.EMWave2Frame'].sources[0].x = this.b$['com.falstad.EMWave2Frame'].sources[1].x = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[3]||(I$[3]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').PlaneWaveSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "PlaneWaveSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Plane Wave";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(8);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(225);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(30);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[4]||(I$[4]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').IntersectingPlaneWavesSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "IntersectingPlaneWavesSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Intersecting Planes";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(70);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(34);
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(10);
this.b$['com.falstad.EMWave2Frame'].setSources();
this.b$['com.falstad.EMWave2Frame'].sources[0].y = this.b$['com.falstad.EMWave2Frame'].sources[1].y = this.b$['com.falstad.EMWave2Frame'].windowOffsetY;
this.b$['com.falstad.EMWave2Frame'].sources[0].x = this.b$['com.falstad.EMWave2Frame'].windowOffsetX + 1;
this.b$['com.falstad.EMWave2Frame'].sources[2].x = this.b$['com.falstad.EMWave2Frame'].sources[3].x = this.b$['com.falstad.EMWave2Frame'].windowOffsetX;
this.b$['com.falstad.EMWave2Frame'].sources[2].y = this.b$['com.falstad.EMWave2Frame'].windowOffsetY + 1;
this.b$['com.falstad.EMWave2Frame'].sources[3].y = this.b$['com.falstad.EMWave2Frame'].windowOffsetY + this.b$['com.falstad.EMWave2Frame'].windowHeight - 1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[5]||(I$[5]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').SingleWireSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "SingleWireSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Single Wire";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
this.b$['com.falstad.EMWave2Frame'].grid[(this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + this.b$['com.falstad.EMWave2Frame'].gw * ((this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0))].jz = 1;
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(200);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[6]||(I$[6]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').DoubleWireSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "DoubleWireSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Wire Pair";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
this.b$['com.falstad.EMWave2Frame'].grid[(this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + this.b$['com.falstad.EMWave2Frame'].gw * ((this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 3)].jz = 1;
this.b$['com.falstad.EMWave2Frame'].grid[(this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + this.b$['com.falstad.EMWave2Frame'].gw * ((this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 3)].jz = 1;
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(200);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[7]||(I$[7]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').DipoleWireSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "DipoleWireSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Dipole Wire Pair";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
this.b$['com.falstad.EMWave2Frame'].grid[(this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + this.b$['com.falstad.EMWave2Frame'].gw * ((this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 3)].jz = 1;
this.b$['com.falstad.EMWave2Frame'].grid[(this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + this.b$['com.falstad.EMWave2Frame'].gw * ((this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 3)].jz = -1;
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(200);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[8]||(I$[8]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').MagnetPairSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "MagnetPairSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Magnet Pair";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
this.b$['com.falstad.EMWave2Frame'].addMagnet$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - (this.b$['com.falstad.EMWave2Frame'].windowWidth/4|0) - 3, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 2, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - (this.b$['com.falstad.EMWave2Frame'].windowWidth/4|0) + 3, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 2, -0.2);
this.b$['com.falstad.EMWave2Frame'].addMagnet$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + (this.b$['com.falstad.EMWave2Frame'].windowWidth/4|0) - 3, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 2, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + (this.b$['com.falstad.EMWave2Frame'].windowWidth/4|0) + 3, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 2, -0.2);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[9]||(I$[9]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').MagnetPairOppSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "MagnetPairOppSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Magnet Pair, Opp";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
this.b$['com.falstad.EMWave2Frame'].addMagnet$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - (this.b$['com.falstad.EMWave2Frame'].windowWidth/4|0) - 3, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 2, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - (this.b$['com.falstad.EMWave2Frame'].windowWidth/4|0) + 3, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 2, -0.2);
this.b$['com.falstad.EMWave2Frame'].addMagnet$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + (this.b$['com.falstad.EMWave2Frame'].windowWidth/4|0) - 3, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 2, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + (this.b$['com.falstad.EMWave2Frame'].windowWidth/4|0) + 3, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 2, 0.2);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[10]||(I$[10]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').MagnetPairStackedSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "MagnetPairStackedSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Magnet Pair Stacked";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
this.b$['com.falstad.EMWave2Frame'].addMagnet$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - 3, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 10, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + 3, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 5, -0.2);
this.b$['com.falstad.EMWave2Frame'].addMagnet$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - 3, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 5, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + 3, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 10, -0.2);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').MagnetPairStackedOppSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "MagnetPairStackedOppSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Magnet Pair Stacked Opp";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
this.b$['com.falstad.EMWave2Frame'].addMagnet$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - 3, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 10, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + 3, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 5, 0.2);
this.b$['com.falstad.EMWave2Frame'].addMagnet$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - 3, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 5, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + 3, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 10, -0.2);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').UniformFieldSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "UniformFieldSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Uniform Field";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
this.b$['com.falstad.EMWave2Frame'].addUniformField();
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(225);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[13]||(I$[13]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').ApertureFieldSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "ApertureFieldSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Field Near Aperture";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
var v = 2.0 / this.b$['com.falstad.EMWave2Frame'].windowHeight;
var y;
for (y = 0; y != this.b$['com.falstad.EMWave2Frame'].gridSizeY; y++) this.b$['com.falstad.EMWave2Frame'].grid[this.b$['com.falstad.EMWave2Frame'].windowOffsetX + this.b$['com.falstad.EMWave2Frame'].gw * y].jz = v;

var r1 = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - (this.b$['com.falstad.EMWave2Frame'].windowWidth/6|0);
var r2 = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + (this.b$['com.falstad.EMWave2Frame'].windowWidth/6|0);
this.b$['com.falstad.EMWave2Frame'].conductDrawRect$I$I$I$I$D(r1, this.b$['com.falstad.EMWave2Frame'].windowOffsetY, r1, this.b$['com.falstad.EMWave2Frame'].windowOffsetY + this.b$['com.falstad.EMWave2Frame'].windowHeight - 1, 1);
this.b$['com.falstad.EMWave2Frame'].conductDrawRect$I$I$I$I$D(r1, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 6, r1, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 6, 0);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(740);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[14]||(I$[14]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').SolenoidSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "SolenoidSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Solenoid";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
var h = (this.b$['com.falstad.EMWave2Frame'].windowHeight/3|0);
var v = 2.0 / h;
var cy = (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0);
this.b$['com.falstad.EMWave2Frame'].addSolenoid$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - 3, cy - h, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + 3, cy + h, v);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[15]||(I$[15]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').ToroidalSolenoidSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "ToroidalSolenoidSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Toroidal Solenoid";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
this.b$['com.falstad.EMWave2Frame'].addWireCircle$I$I$I$D$I$I((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0), (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0), (this.b$['com.falstad.EMWave2Frame'].windowHeight/3|0), -0.08333333333333333, 0, 360);
this.b$['com.falstad.EMWave2Frame'].addWireCircle$I$I$I$D$I$I((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0), (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0), (this.b$['com.falstad.EMWave2Frame'].windowHeight/6|0), 0.08333333333333333, 0, 360);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(400);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[16]||(I$[16]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').CylinderSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "CylinderSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Sphere";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
var res = 4;
var cx = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) * res;
var cy = (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) * res;
var r = (this.b$['com.falstad.EMWave2Frame'].windowHeight/5|0) * res;
var my = -1.0 / (r * r);
var x;
var y;
for (x = -r; x <= r; x++) {
var yd = (Math.sqrt(r * r - x * x)|0);
for (y = -yd; y <= yd; y++) this.b$['com.falstad.EMWave2Frame'].grid[((x + cx)/res|0) + this.b$['com.falstad.EMWave2Frame'].gw * (((y + cy)/res|0))].my += my;

}
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(450);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[17]||(I$[17]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').ThickWireSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "ThickWireSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Thick Wire";
});

Clazz.newMeth(C$, 'select', function () {
var r = (this.b$['com.falstad.EMWave2Frame'].windowWidth/4|0);
this.b$['com.falstad.EMWave2Frame'].addThickWire$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0), (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0), r, 1.0 / (r * r));
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').HoleInWire1Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "HoleInWire1Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Hole In Wire 1";
});

Clazz.newMeth(C$, 'select', function () {
var r = (this.b$['com.falstad.EMWave2Frame'].windowWidth/3|0);
var j = 1.0 / (r * r);
j = (((j * 1024)|0)) / 1024.0;
if (j == 0 ) j = 9.765625E-4;
this.b$['com.falstad.EMWave2Frame'].addThickWire$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0), (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0), r, j);
this.b$['com.falstad.EMWave2Frame'].addThickWire$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0), (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0), (r * 2/3|0), -j);
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(450);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[19]||(I$[19]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').HoleInWire2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "HoleInWire2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Hole In Wire 2";
});

Clazz.newMeth(C$, 'select', function () {
var r = (this.b$['com.falstad.EMWave2Frame'].windowWidth/3|0);
var j = 1.0 / (r * r);
j = (((j * 1024)|0)) / 1024.0;
if (j == 0 ) j = 9.765625E-4;
this.b$['com.falstad.EMWave2Frame'].addThickWire$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0), (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0), r, j);
this.b$['com.falstad.EMWave2Frame'].addThickWire$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + (r/4|0), (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0), (r/2|0), -j);
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(450);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[20]||(I$[20]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').FerromagnetSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "FerromagnetSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Ferromagnet";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
this.b$['com.falstad.EMWave2Frame'].addSolenoid$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - 2, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 2, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + 2, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 2, 0.4);
var x1 = this.b$['com.falstad.EMWave2Frame'].windowOffsetX + 3;
var x2 = this.b$['com.falstad.EMWave2Frame'].windowOffsetX + this.b$['com.falstad.EMWave2Frame'].windowWidth - 4;
this.b$['com.falstad.EMWave2Frame'].permFillRect$I$I$I$I$D(x1, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 4, x2, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 8, 5);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(200);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[21]||(I$[21]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').DiamagnetSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "DiamagnetSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Diamagnet";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
this.b$['com.falstad.EMWave2Frame'].addSolenoid$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - 2, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 2, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + 2, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 2, 0.4);
var x1 = this.b$['com.falstad.EMWave2Frame'].windowOffsetX + 3;
var x2 = this.b$['com.falstad.EMWave2Frame'].windowOffsetX + this.b$['com.falstad.EMWave2Frame'].windowWidth - 4;
this.b$['com.falstad.EMWave2Frame'].permFillRect$I$I$I$I$D(x1, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 4, x2, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 8, 0.5);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(200);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[22]||(I$[22]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').MeissnerEffectSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "MeissnerEffectSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Meissner Effect";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
this.b$['com.falstad.EMWave2Frame'].addSolenoid$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - 2, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 2, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + 2, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 2, 0.4);
var x1 = this.b$['com.falstad.EMWave2Frame'].windowOffsetX + 3;
var x2 = this.b$['com.falstad.EMWave2Frame'].windowOffsetX + this.b$['com.falstad.EMWave2Frame'].windowWidth - 4;
this.b$['com.falstad.EMWave2Frame'].conductFillRect$I$I$I$I$D(x1, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 4, x2, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 8, 1);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(200);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').HorseshoeSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "HorseshoeSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Horseshoe Magnet";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
var r1 = (this.b$['com.falstad.EMWave2Frame'].windowHeight/3|0);
var r2 = (this.b$['com.falstad.EMWave2Frame'].windowHeight/6|0);
this.b$['com.falstad.EMWave2Frame'].addWireCircle$I$I$I$D$I$I((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0), (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0), r1, -0.08333333333333333, 0, 180);
this.b$['com.falstad.EMWave2Frame'].addWireCircle$I$I$I$D$I$I((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0), (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0), r2, 0.08333333333333333, 0, 180);
var y;
for (y = 0; y != r2; y++) {
var x;
for (x = -r1; x <= r1; x++) this.b$['com.falstad.EMWave2Frame'].grid[(this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + x + this.b$['com.falstad.EMWave2Frame'].gw * ((this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + y)].jz = this.b$['com.falstad.EMWave2Frame'].grid[(this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + x + this.b$['com.falstad.EMWave2Frame'].gw * ((this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + y - 1)].jz;

}
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(400);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[24]||(I$[24]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').Horseshoe2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "Horseshoe2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.HorseshoeSetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Horseshoe + Load";
});

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
var r1 = (this.b$['com.falstad.EMWave2Frame'].windowHeight/3|0);
var r2 = (this.b$['com.falstad.EMWave2Frame'].windowHeight/6|0);
this.b$['com.falstad.EMWave2Frame'].permFillRect$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - r1 - 3, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + r2, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + r1 + 3, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + r2 * 2, 5);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(225);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[25]||(I$[25]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').MagneticShielding1Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "MagneticShielding1Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Magnetic Shielding 1";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
var i;
var j;
this.b$['com.falstad.EMWave2Frame'].addSolenoid$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - 2, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 2, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + 2, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 2, 0.4);
var x1 = this.b$['com.falstad.EMWave2Frame'].windowOffsetX + 3;
var x2 = this.b$['com.falstad.EMWave2Frame'].windowOffsetX + this.b$['com.falstad.EMWave2Frame'].windowWidth - 4;
this.b$['com.falstad.EMWave2Frame'].permDrawRect$I$I$I$I$D(x1, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 4, x2, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 5, 10);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[26]||(I$[26]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').MagneticShielding2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "MagneticShielding2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Magnetic Shielding 2";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
var i;
var j;
this.b$['com.falstad.EMWave2Frame'].addSolenoid$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - 2, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 2, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + 2, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 2, 0.4);
for (i = 6; i <= 8; i++) this.b$['com.falstad.EMWave2Frame'].permDrawRect$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - i, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - i, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + i, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + i, 10);

});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[27]||(I$[27]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').MagneticShielding3Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "MagneticShielding3Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Magnetic Shielding 3";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
var cx = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0);
var cy = (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0);
this.b$['com.falstad.EMWave2Frame'].addSolenoid$I$I$I$I$D(cx - 1, cy - 1, cx + 1, cy + 1, 4);
var th;
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(340);
for (th = 0; th != 360; th = th+(3)) {
var r1 = 4.9;
var x = cx + ((Math.cos(th * 3.141592653589793 / 180) * r1)|0);
var y = cy - ((Math.sin(th * 3.141592653589793 / 180) * r1)|0);
this.b$['com.falstad.EMWave2Frame'].addPerm$I$I$D(x, y, 5);
var r2 = 5.9;
x = cx + ((Math.cos(th * 3.141592653589793 / 180) * r2)|0);
y = cy - ((Math.sin(th * 3.141592653589793 / 180) * r2)|0);
this.b$['com.falstad.EMWave2Frame'].addPerm$I$I$D(x, y, 5);
}
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[28]||(I$[28]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').MagneticShielding4Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "MagneticShielding4Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Magnetic Shielding 4";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
var i;
for (i = 6; i <= 8; i++) this.b$['com.falstad.EMWave2Frame'].permDrawRect$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - i, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - i, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + i, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + i, 10);

this.b$['com.falstad.EMWave2Frame'].addUniformField();
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(250);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[29]||(I$[29]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').MagneticCircuit1Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "MagneticCircuit1Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Magnetic Circuit 1";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
var i;
for (i = 6; i <= 9; i++) {
this.b$['com.falstad.EMWave2Frame'].permDrawRect$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - i, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - i, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + i, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + i, 10);
}
this.b$['com.falstad.EMWave2Frame'].addSolenoid$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + 5, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 1, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + 10, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 1, 0.2);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[30]||(I$[30]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').MagneticCircuit2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "MagneticCircuit2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.MagneticCircuit1Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Magnetic Circuit 2";
});

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
this.b$['com.falstad.EMWave2Frame'].permFillRect$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - 9, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 1, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - 6, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 1, 1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[31]||(I$[31]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').MonopoleAttemptSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "MonopoleAttemptSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Monopole Attempt";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
var w = (this.b$['com.falstad.EMWave2Frame'].windowWidth/5|0);
var i;
var cx = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0);
var cy = (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0);
var j;
for (j = 0; j != 3; j++) {
for (i = -w + 1; i < w; i++) {
this.b$['com.falstad.EMWave2Frame'].grid[cx - w + this.b$['com.falstad.EMWave2Frame'].gw * (cy + i)].mx = -1;
this.b$['com.falstad.EMWave2Frame'].grid[cx + w + this.b$['com.falstad.EMWave2Frame'].gw * (cy + i) ].mx = 1;
this.b$['com.falstad.EMWave2Frame'].grid[cx + i + this.b$['com.falstad.EMWave2Frame'].gw * (cy - w) ].my = -1;
this.b$['com.falstad.EMWave2Frame'].grid[cx + i + this.b$['com.falstad.EMWave2Frame'].gw * (cy + w) ].my = 1;
}
w++;
}
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[32]||(I$[32]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').QuadrupoleLensSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "QuadrupoleLensSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Quadrupole Lens";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
var x;
var w = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - 1;
var h = (this.b$['com.falstad.EMWave2Frame'].windowWidth/4|0);
var cx = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0);
var cy = (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0);
var str = 1 / h;
for (x = -w; x <= w; x++) {
var yd = (Math.sqrt(x * x + h * h)|0);
var y;
for (y = yd; y <= w; y++) {
this.b$['com.falstad.EMWave2Frame'].grid[cx + x + this.b$['com.falstad.EMWave2Frame'].gw * (cy + y) ].my = -str;
this.b$['com.falstad.EMWave2Frame'].grid[cx + x + this.b$['com.falstad.EMWave2Frame'].gw * (cy - y) ].my = str;
this.b$['com.falstad.EMWave2Frame'].grid[cx + y + this.b$['com.falstad.EMWave2Frame'].gw * (cy + x) ].mx = str;
this.b$['com.falstad.EMWave2Frame'].grid[cx - y + this.b$['com.falstad.EMWave2Frame'].gw * (cy + x)].mx = -str;
}
}
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[33]||(I$[33]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').HalbachArraySetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "HalbachArraySetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Halbach Array";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(80);
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
var sz = 5;
var y1 = (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - (sz/2|0);
var y2 = (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + (sz/2|0);
var fx = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - (sz/2|0) - 2 * sz;
var s1 = sz - 1;
this.b$['com.falstad.EMWave2Frame'].addMagnet$I$I$I$I$D$D(fx, y1, fx + s1, y2, -0.2, 0);
fx = fx+(sz);
this.b$['com.falstad.EMWave2Frame'].addMagnet$I$I$I$I$D$D(fx, y1, fx + s1, y2, 0, -0.2);
fx = fx+(sz);
this.b$['com.falstad.EMWave2Frame'].addMagnet$I$I$I$I$D$D(fx, y1, fx + s1, y2, 0.2, 0);
fx = fx+(sz);
this.b$['com.falstad.EMWave2Frame'].addMagnet$I$I$I$I$D$D(fx, y1, fx + s1, y2, 0, 0.2);
fx = fx+(sz);
this.b$['com.falstad.EMWave2Frame'].addMagnet$I$I$I$I$D$D(fx, y1, fx + s1, y2, -0.2, 0);
fx = fx+(sz);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[34]||(I$[34]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').HalbachArray2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "HalbachArray2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Halbach Array (long)";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(80);
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
var sz = 3;
var y1 = (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 1;
var y2 = (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 1;
var fx = this.b$['com.falstad.EMWave2Frame'].windowOffsetX + ((this.b$['com.falstad.EMWave2Frame'].windowWidth - (this.b$['com.falstad.EMWave2Frame'].windowWidth/sz|0) * sz)/2|0);
var s1 = sz - 1;
var i;
var dx = -0.2;
var dy = 0;
for (i = 0; i != (this.b$['com.falstad.EMWave2Frame'].windowWidth/sz|0); i++) {
this.b$['com.falstad.EMWave2Frame'].addMagnet$I$I$I$I$D$D(fx, y1, fx + s1, y2, dx, dy);
fx = fx+(sz);
var dq = dx;
dx = -dy;
dy = dq;
}
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[35]||(I$[35]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').HalbachArray3Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "HalbachArray3Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Halbach Array (dipole)";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(47);
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
var i;
var r2 = (this.b$['com.falstad.EMWave2Frame'].windowWidth/3|0);
var r1 = (r2/2|0);
var x;
var y;
for (x = -r2; x <= r2; x++) for (y = -r2; y <= r2; y++) {
var r = Math.sqrt(x * x + y * y);
if (r > r2 + 0.9  || r < r1  ) continue;
var a = Math.atan2(y, x) * 180 / 3.141592653589793 + 22.5 + 45;
if (a < 0 ) a += 360;
var ai = ((a / 45)|0);
var dq = ((ai & 2) == 0) ? 0.2 : -0.2;
var dx = 0;
var dy = 0;
if ((ai & 1) == 0) dx = dq;
 else dy = dq;
this.b$['com.falstad.EMWave2Frame'].grid[(this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + x + this.b$['com.falstad.EMWave2Frame'].gw * ((this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + y)].mx = dx;
this.b$['com.falstad.EMWave2Frame'].grid[(this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + x + this.b$['com.falstad.EMWave2Frame'].gw * ((this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + y)].my = dy;
}

});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[36]||(I$[36]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').HalbachArray4Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "HalbachArray4Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Halbach Array (quadrupole)";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(255);
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
var i;
var r2 = (this.b$['com.falstad.EMWave2Frame'].windowWidth/3|0);
var r1 = (r2 * 2/3|0);
var x;
var y;
for (x = -r2; x <= r2; x++) for (y = -r2; y <= r2; y++) {
var r = Math.sqrt(x * x + y * y);
if (r > r2 + 0.9  || r < r1  ) continue;
var a = Math.atan2(y, x) * 180 / 3.141592653589793 + 11.25;
if (a < 0 ) a += 360;
var ai = ((a / 22.5)|0);
var da = -1.5707963267948966 + 4.71238898038469 * ai / 4.0;
var dx = Math.cos(da);
var dy = Math.sin(da);
var d0 = -0.06;
this.b$['com.falstad.EMWave2Frame'].grid[(this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + x + this.b$['com.falstad.EMWave2Frame'].gw * ((this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + y)].mx = dx * d0;
this.b$['com.falstad.EMWave2Frame'].grid[(this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + x + this.b$['com.falstad.EMWave2Frame'].gw * ((this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + y)].my = dy * d0;
}

});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[37]||(I$[37]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').DielectricSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "DielectricSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Dielectric";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(7);
this.b$['com.falstad.EMWave2Frame'].addMedium();
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(4);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(1000);
this.b$['com.falstad.EMWave2Frame'].noFilter();
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[38]||(I$[38]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').ConductReflectSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "ConductReflectSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Fair Conductor Reflection";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(7);
this.b$['com.falstad.EMWave2Frame'].addCondMedium$D(0.5);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(4);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(800);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[39]||(I$[39]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').Conduct2ReflectSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "Conduct2ReflectSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Poor Conductor Reflection";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(7);
this.b$['com.falstad.EMWave2Frame'].addCondMedium$D(0.1);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(4);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(800);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[40]||(I$[40]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').SkinEffect1Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "SkinEffect1Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Skin Effect 1";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(1);
this.b$['com.falstad.EMWave2Frame'].addCondMedium$D(0.33);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(6);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(800);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[41]||(I$[41]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').SkinEffect2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "SkinEffect2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Skin Effect 2";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(1);
this.b$['com.falstad.EMWave2Frame'].addCondMedium$D(0.33);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(40);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(800);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[42]||(I$[42]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').ResonantAbsSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "ResonantAbsSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Resonant Absorption";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].addResMedium();
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(23);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(200);
this.b$['com.falstad.EMWave2Frame'].noFilter();
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[43]||(I$[43]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').Dispersion1Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "Dispersion1Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.ResonantAbsSetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Dispersion 1";
});

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(14);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[44]||(I$[44]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').Dispersion2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "Dispersion2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.ResonantAbsSetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Dispersion 2";
});

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(21);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[45]||(I$[45]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').Dispersion3Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "Dispersion3Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.ResonantAbsSetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Dispersion 3";
});

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(25);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[46]||(I$[46]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').Dispersion4Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "Dispersion4Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.ResonantAbsSetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Dispersion 4";
});

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(39);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[47]||(I$[47]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').DiffusionSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "DiffusionSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Magnetic Diffusion";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
this.b$['com.falstad.EMWave2Frame'].conductFillRect$I$I$I$I$D(1, 1, this.b$['com.falstad.EMWave2Frame'].gridSizeX - 2, this.b$['com.falstad.EMWave2Frame'].gridSizeY - 2, 0.2);
this.b$['com.falstad.EMWave2Frame'].addConductor$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0), (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0), 0);
this.b$['com.falstad.EMWave2Frame'].grid[(this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + this.b$['com.falstad.EMWave2Frame'].gw * ((this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0))].jz = 1;
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(800);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[48]||(I$[48]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').OscRingSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "OscRingSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Oscillating Ring";
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(3);
this.b$['com.falstad.EMWave2Frame'].setSources();
this.b$['com.falstad.EMWave2Frame'].sources[0].y = this.b$['com.falstad.EMWave2Frame'].sources[1].y = (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0);
this.b$['com.falstad.EMWave2Frame'].sources[0].x = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - 4;
this.b$['com.falstad.EMWave2Frame'].sources[1].x = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + 4;
this.b$['com.falstad.EMWave2Frame'].auxBar.setValue$I(40);
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(26);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(86);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[49]||(I$[49]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').OscRingPairSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "OscRingPairSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Oscillating Ring Pair";
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(6);
this.b$['com.falstad.EMWave2Frame'].setSources();
this.b$['com.falstad.EMWave2Frame'].sources[0].y = this.b$['com.falstad.EMWave2Frame'].sources[1].y = (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 2;
this.b$['com.falstad.EMWave2Frame'].sources[2].y = this.b$['com.falstad.EMWave2Frame'].sources[3].y = (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 2;
this.b$['com.falstad.EMWave2Frame'].sources[0].x = this.b$['com.falstad.EMWave2Frame'].sources[3].x = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - 2;
this.b$['com.falstad.EMWave2Frame'].sources[1].x = this.b$['com.falstad.EMWave2Frame'].sources[2].x = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + 2;
this.b$['com.falstad.EMWave2Frame'].auxBar.setValue$I(40);
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(26);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(86);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[50]||(I$[50]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').OscRingInductionSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "OscRingInductionSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Ring Induction";
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(3);
this.b$['com.falstad.EMWave2Frame'].setSources();
this.b$['com.falstad.EMWave2Frame'].sources[0].y = this.b$['com.falstad.EMWave2Frame'].sources[1].y = (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 2;
this.b$['com.falstad.EMWave2Frame'].sources[0].x = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - 4;
this.b$['com.falstad.EMWave2Frame'].sources[1].x = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + 4;
this.b$['com.falstad.EMWave2Frame'].auxBar.setValue$I(40);
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(12);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(140);
this.b$['com.falstad.EMWave2Frame'].addConductor$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - 4, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 2, 0.5);
this.b$['com.falstad.EMWave2Frame'].addConductor$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + 4, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 2, 0.5);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[51]||(I$[51]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').WireInductionSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "WireInductionSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Wire Induction";
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(12);
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(1);
this.b$['com.falstad.EMWave2Frame'].setSources();
this.b$['com.falstad.EMWave2Frame'].sources[0].y = (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 2;
this.b$['com.falstad.EMWave2Frame'].sources[0].x = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0);
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(140);
this.b$['com.falstad.EMWave2Frame'].addConductor$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0), (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 2, 0.5);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[52]||(I$[52]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').OscRingEddy1Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "OscRingEddy1Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.OscRingSetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Ring + Fair Conductor";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(280);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(3);
this.b$['com.falstad.EMWave2Frame'].conductFillRect$I$I$I$I$D(0, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 3, this.b$['com.falstad.EMWave2Frame'].gridSizeX - 1, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 5, 0.5);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[53]||(I$[53]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').OscRingEddy2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "OscRingEddy2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.OscRingSetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Ring + Poor Conductor";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(280);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(3);
this.b$['com.falstad.EMWave2Frame'].conductFillRect$I$I$I$I$D(0, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 3, this.b$['com.falstad.EMWave2Frame'].gridSizeX - 1, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 5, 0.1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[54]||(I$[54]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').WireEddy1Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "WireEddy1Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Wire + Fair Conductor";
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(3);
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(1);
this.b$['com.falstad.EMWave2Frame'].setSources();
this.b$['com.falstad.EMWave2Frame'].sources[0].y = (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0);
this.b$['com.falstad.EMWave2Frame'].sources[0].x = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0);
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(280);
this.b$['com.falstad.EMWave2Frame'].conductFillRect$I$I$I$I$D(0, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 3, this.b$['com.falstad.EMWave2Frame'].gridSizeX - 1, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 5, 0.5);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[55]||(I$[55]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').WireEddy2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "WireEddy2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.WireEddy1Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Wire + Poor Conductor";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(280);
this.b$['com.falstad.EMWave2Frame'].conductFillRect$I$I$I$I$D(0, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 3, this.b$['com.falstad.EMWave2Frame'].gridSizeX - 1, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 5, 0.1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[56]||(I$[56]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').OscRingPermSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "OscRingPermSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Rings + Ferromagnet";
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(3);
this.b$['com.falstad.EMWave2Frame'].setSources();
this.b$['com.falstad.EMWave2Frame'].sources[0].y = this.b$['com.falstad.EMWave2Frame'].sources[1].y = (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0);
this.b$['com.falstad.EMWave2Frame'].sources[0].x = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - 4;
this.b$['com.falstad.EMWave2Frame'].sources[1].x = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + 4;
this.b$['com.falstad.EMWave2Frame'].auxBar.setValue$I(40);
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(6);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(94);
this.b$['com.falstad.EMWave2Frame'].addConductor$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - 4, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 10, 0.5);
this.b$['com.falstad.EMWave2Frame'].addConductor$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + 4, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 10, 0.5);
this.b$['com.falstad.EMWave2Frame'].addConductor$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - 4, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 10, 0.5);
this.b$['com.falstad.EMWave2Frame'].addConductor$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + 4, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 10, 0.5);
this.b$['com.falstad.EMWave2Frame'].permFillRect$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - 2, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 1, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + 2, this.b$['com.falstad.EMWave2Frame'].windowOffsetY + this.b$['com.falstad.EMWave2Frame'].windowHeight - 1, 50);
this.b$['com.falstad.EMWave2Frame'].conductFillRect$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - 2, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 1, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + 2, this.b$['com.falstad.EMWave2Frame'].windowOffsetY + this.b$['com.falstad.EMWave2Frame'].windowHeight - 1, 0.05);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[57]||(I$[57]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').SolenoidOscSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "SolenoidOscSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Osc. Solenoid";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(10);
this.b$['com.falstad.EMWave2Frame'].setSources();
var h = (this.b$['com.falstad.EMWave2Frame'].windowHeight/3|0);
var cy = (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0);
this.b$['com.falstad.EMWave2Frame'].sources[0].x = this.b$['com.falstad.EMWave2Frame'].sources[1].x = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - 3;
this.b$['com.falstad.EMWave2Frame'].sources[2].x = this.b$['com.falstad.EMWave2Frame'].sources[3].x = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + 3;
this.b$['com.falstad.EMWave2Frame'].sources[0].y = this.b$['com.falstad.EMWave2Frame'].sources[2].y = cy - h;
this.b$['com.falstad.EMWave2Frame'].sources[1].y = this.b$['com.falstad.EMWave2Frame'].sources[3].y = cy + h;
this.b$['com.falstad.EMWave2Frame'].auxBar.setValue$I(40);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(9);
});

Clazz.newMeth(C$, 'doSetupSources', function () {
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[58]||(I$[58]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').TransformerSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "TransformerSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.SolenoidOscSetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Transformer";
});

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
var h = (this.b$['com.falstad.EMWave2Frame'].windowHeight/3|0);
var cy = (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0);
this.b$['com.falstad.EMWave2Frame'].conductDrawRect$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - 5, cy - h, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - 5, cy + h, 0.9);
this.b$['com.falstad.EMWave2Frame'].conductDrawRect$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + 5, cy - h, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + 5, cy + h, 0.9);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(340);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[59]||(I$[59]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').ToroidalSolenoidOscSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "ToroidalSolenoidOscSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Osc Toroidal Solenoid";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].setSources();
this.b$['com.falstad.EMWave2Frame'].sources[0].x = this.b$['com.falstad.EMWave2Frame'].windowOffsetX;
this.b$['com.falstad.EMWave2Frame'].sources[0].y = this.b$['com.falstad.EMWave2Frame'].windowOffsetY;
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(300);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(8);
});

Clazz.newMeth(C$, 'doSetupSources', function () {
});

Clazz.newMeth(C$, 'doStep', function () {
var val = this.b$['com.falstad.EMWave2Frame'].grid[this.b$['com.falstad.EMWave2Frame'].windowOffsetX + this.b$['com.falstad.EMWave2Frame'].gw * this.b$['com.falstad.EMWave2Frame'].windowOffsetY].jz * 30;
var i;
var j;
for (i = 0; i != this.b$['com.falstad.EMWave2Frame'].windowWidth; i++) for (j = 0; j != this.b$['com.falstad.EMWave2Frame'].windowHeight; j++) this.b$['com.falstad.EMWave2Frame'].grid[i + this.b$['com.falstad.EMWave2Frame'].windowOffsetX + this.b$['com.falstad.EMWave2Frame'].gw * (j + this.b$['com.falstad.EMWave2Frame'].windowOffsetY) ].jz = 0;


this.b$['com.falstad.EMWave2Frame'].addWireCircle$I$I$I$D$I$I((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0), (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0), (this.b$['com.falstad.EMWave2Frame'].windowHeight/3|0), -val / 360.0, 0, 360);
this.b$['com.falstad.EMWave2Frame'].addWireCircle$I$I$I$D$I$I((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0), (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0), (this.b$['com.falstad.EMWave2Frame'].windowHeight/6|0), val / 360.0, 0, 360);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[60]||(I$[60]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').CoaxCableSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "CoaxCableSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Coaxial Cable";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].setSources();
this.b$['com.falstad.EMWave2Frame'].sources[0].x = this.b$['com.falstad.EMWave2Frame'].windowOffsetX;
this.b$['com.falstad.EMWave2Frame'].sources[0].y = this.b$['com.falstad.EMWave2Frame'].windowOffsetY;
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(300);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(8);
});

Clazz.newMeth(C$, 'doSetupSources', function () {
});

Clazz.newMeth(C$, 'doStep', function () {
var val = this.b$['com.falstad.EMWave2Frame'].grid[this.b$['com.falstad.EMWave2Frame'].windowOffsetX + this.b$['com.falstad.EMWave2Frame'].gw * this.b$['com.falstad.EMWave2Frame'].windowOffsetY].jz * 30;
var i;
var j;
for (i = 0; i != this.b$['com.falstad.EMWave2Frame'].windowWidth; i++) for (j = 0; j != this.b$['com.falstad.EMWave2Frame'].windowHeight; j++) this.b$['com.falstad.EMWave2Frame'].grid[i + this.b$['com.falstad.EMWave2Frame'].windowOffsetX + this.b$['com.falstad.EMWave2Frame'].gw * (j + this.b$['com.falstad.EMWave2Frame'].windowOffsetY) ].jz = 0;


var sz = 3;
this.b$['com.falstad.EMWave2Frame'].addWireCircle$I$I$I$D$I$I((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0), (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0), sz, -val / 360.0, 0, 360);
this.b$['com.falstad.EMWave2Frame'].grid[(this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + this.b$['com.falstad.EMWave2Frame'].gw * ((this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0))].jz = val / 16;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[61]||(I$[61]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').CondInOscFieldSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "CondInOscFieldSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Cond. in Osc. Field";
});

Clazz.newMeth(C$, 'doSetupSources', function () {
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(10);
this.b$['com.falstad.EMWave2Frame'].setSources();
var h = (this.b$['com.falstad.EMWave2Frame'].windowHeight/3|0);
var cy = (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0);
this.b$['com.falstad.EMWave2Frame'].sources[0].x = this.b$['com.falstad.EMWave2Frame'].sources[1].x = this.b$['com.falstad.EMWave2Frame'].windowOffsetX;
this.b$['com.falstad.EMWave2Frame'].sources[2].x = this.b$['com.falstad.EMWave2Frame'].sources[3].x = this.b$['com.falstad.EMWave2Frame'].windowOffsetX + this.b$['com.falstad.EMWave2Frame'].windowWidth - 1;
this.b$['com.falstad.EMWave2Frame'].sources[0].y = this.b$['com.falstad.EMWave2Frame'].sources[2].y = 0;
this.b$['com.falstad.EMWave2Frame'].sources[1].y = this.b$['com.falstad.EMWave2Frame'].sources[3].y = this.b$['com.falstad.EMWave2Frame'].gridSizeY - 1;
this.b$['com.falstad.EMWave2Frame'].conductFillRect$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - 4, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 4, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + 4, (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 4, 0.4);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(2);
this.b$['com.falstad.EMWave2Frame'].auxBar.setValue$I(40);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[62]||(I$[62]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').MovingWireSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "MovingWireSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.y = 0;
this.dir = 0;
this.delay = 0;
this.stopDelay = 0;
this.filtstep = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.filtstep = 0;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Moving Wire";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
this.y = this.b$['com.falstad.EMWave2Frame'].windowOffsetY;
this.dir = 1;
this.delay = 0;
this.stopDelay = 200;
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(200);
});

Clazz.newMeth(C$, 'doStep', function () {
if (this.delay > 0) {
this.delay--;
this.filt();
return;
}var yi = (this.y|0);
var i;
for (i = 0; i != 2; i++) {
var gi = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + i + this.b$['com.falstad.EMWave2Frame'].gw * yi;
this.b$['com.falstad.EMWave2Frame'].grid[gi].jz = 0;
this.b$['com.falstad.EMWave2Frame'].grid[gi + this.b$['com.falstad.EMWave2Frame'].gw].jz = 0;
this.b$['com.falstad.EMWave2Frame'].grid[gi + this.b$['com.falstad.EMWave2Frame'].gw + this.b$['com.falstad.EMWave2Frame'].gw ].jz = 0;
}
this.y += this.dir * 0.06;
var yi2 = (this.y|0);
if (yi != yi2) {
if (yi2 == (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0)) this.delay = this.stopDelay;
if (yi2 == this.b$['com.falstad.EMWave2Frame'].windowOffsetY || yi2 == this.b$['com.falstad.EMWave2Frame'].windowOffsetY + this.b$['com.falstad.EMWave2Frame'].windowHeight - 3 ) {
this.dir = -this.dir;
this.delay = this.stopDelay;
}}yi = yi2;
var yfrac = (this.y - yi);
for (i = 0; i != 2; i++) {
var gi = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + i + this.b$['com.falstad.EMWave2Frame'].gw * yi;
this.b$['com.falstad.EMWave2Frame'].grid[gi].jz = (1 - yfrac) * 0.25;
this.b$['com.falstad.EMWave2Frame'].grid[gi + this.b$['com.falstad.EMWave2Frame'].gw].jz = 0.25;
this.b$['com.falstad.EMWave2Frame'].grid[gi + this.b$['com.falstad.EMWave2Frame'].gw + this.b$['com.falstad.EMWave2Frame'].gw ].jz = yfrac * 0.25;
}
this.filt();
this.b$['com.falstad.EMWave2Frame'].calcBoundaries();
});

Clazz.newMeth(C$, 'filt', function () {
var xi = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0);
var yi = (this.y|0);
var x;
var y;
var r = 10;
for (y = yi - r; y <= yi + r; y++) for (x = xi - r; x <= xi + r; x++) {
var gi = x + y * this.b$['com.falstad.EMWave2Frame'].gw;
var oe = this.b$['com.falstad.EMWave2Frame'].grid[gi];
if (oe.jz != 0  || oe.conductivity > 0  ) continue;
var rr = Math.sqrt((y - yi) * (y - yi) + (x - xi) * (x - xi));
var mult1 = 8 + rr;
var mult2 = 4 + mult1;
oe.az = (oe.az * mult1 + this.b$['com.falstad.EMWave2Frame'].grid[gi - 1].az + this.b$['com.falstad.EMWave2Frame'].grid[gi + 1].az + this.b$['com.falstad.EMWave2Frame'].grid[gi - this.b$['com.falstad.EMWave2Frame'].gw].az + this.b$['com.falstad.EMWave2Frame'].grid[gi + this.b$['com.falstad.EMWave2Frame'].gw].az) / mult2;
}

});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[63]||(I$[63]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').MovingWireTubeSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "MovingWireTubeSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.MovingWireSetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Moving Wire in Tube";
});

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
var w = 4;
this.b$['com.falstad.EMWave2Frame'].conductFillRect$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - w, this.b$['com.falstad.EMWave2Frame'].windowOffsetY, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - w, this.b$['com.falstad.EMWave2Frame'].windowOffsetY + this.b$['com.falstad.EMWave2Frame'].windowHeight, 0.6);
w++;
this.b$['com.falstad.EMWave2Frame'].conductFillRect$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + w, this.b$['com.falstad.EMWave2Frame'].windowOffsetY, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + w, this.b$['com.falstad.EMWave2Frame'].windowOffsetY + this.b$['com.falstad.EMWave2Frame'].windowHeight, 0.6);
this.stopDelay = 500;
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(500);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[64]||(I$[64]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').MovingMagnetSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "MovingMagnetSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.y = 0;
this.dir = 0;
this.delay = 0;
this.filtstep = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.filtstep = 0;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Moving Magnet in Tube";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
var w = 5;
this.b$['com.falstad.EMWave2Frame'].conductFillRect$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - w, this.b$['com.falstad.EMWave2Frame'].windowOffsetY, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - w, this.b$['com.falstad.EMWave2Frame'].windowOffsetY + this.b$['com.falstad.EMWave2Frame'].windowHeight, 0.6);
this.b$['com.falstad.EMWave2Frame'].conductFillRect$I$I$I$I$D((this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + w, this.b$['com.falstad.EMWave2Frame'].windowOffsetY, (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + w, this.b$['com.falstad.EMWave2Frame'].windowOffsetY + this.b$['com.falstad.EMWave2Frame'].windowHeight, 0.6);
this.y = this.b$['com.falstad.EMWave2Frame'].windowOffsetY;
this.dir = 1;
this.delay = 0;
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(250);
});

Clazz.newMeth(C$, 'doStep', function () {
if (this.delay > 0) {
this.delay--;
this.filt();
return;
}var yi = (this.y|0);
var x;
var i;
for (x = -3; x <= 3; x++) {
for (i = 0; i <= 2; i++) this.b$['com.falstad.EMWave2Frame'].grid[(this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + x + this.b$['com.falstad.EMWave2Frame'].gw * (yi + i)].my = 0;

}
this.y += this.dir * 0.06;
var yi2 = (this.y|0);
if (yi != yi2) {
if (yi2 == (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0)) this.delay = 500;
if (yi2 == this.b$['com.falstad.EMWave2Frame'].windowOffsetY || yi2 == this.b$['com.falstad.EMWave2Frame'].windowOffsetY + this.b$['com.falstad.EMWave2Frame'].windowHeight - 3 ) {
this.dir = -this.dir;
this.delay = 500;
}}yi = yi2;
var yfrac = (this.y - yi);
for (x = -3; x <= 3; x++) {
var gi = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + x + this.b$['com.falstad.EMWave2Frame'].gw * yi;
this.b$['com.falstad.EMWave2Frame'].grid[gi].my = -(1 - yfrac);
this.b$['com.falstad.EMWave2Frame'].grid[gi + this.b$['com.falstad.EMWave2Frame'].gw].my = -1;
this.b$['com.falstad.EMWave2Frame'].grid[gi + this.b$['com.falstad.EMWave2Frame'].gw + this.b$['com.falstad.EMWave2Frame'].gw ].my = -yfrac;
}
this.b$['com.falstad.EMWave2Frame'].calcBoundaries();
this.filt();
});

Clazz.newMeth(C$, 'filt', function () {
var xi = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0);
var yi = (this.y|0);
var x;
var y;
var r = 12;
var mult1 = 8;
var mult2 = 4 + mult1;
for (y = yi - r; y <= yi + r; y++) for (x = xi - r; x <= xi + r; x++) {
var gi = x + this.b$['com.falstad.EMWave2Frame'].gw * y;
var oe = this.b$['com.falstad.EMWave2Frame'].grid[gi];
if (oe.jz != 0  || oe.conductivity > 0  ) continue;
var jz = this.b$['com.falstad.EMWave2Frame'].grid[gi - 1].my - this.b$['com.falstad.EMWave2Frame'].grid[gi + 1].my + this.b$['com.falstad.EMWave2Frame'].grid[gi + this.b$['com.falstad.EMWave2Frame'].gw].mx - this.b$['com.falstad.EMWave2Frame'].grid[gi - this.b$['com.falstad.EMWave2Frame'].gw].mx;
if (jz != 0 ) continue;
oe.az = (oe.az * mult1 + this.b$['com.falstad.EMWave2Frame'].grid[gi - 1].az + this.b$['com.falstad.EMWave2Frame'].grid[gi + 1].az + this.b$['com.falstad.EMWave2Frame'].grid[gi - this.b$['com.falstad.EMWave2Frame'].gw].az + this.b$['com.falstad.EMWave2Frame'].grid[gi + this.b$['com.falstad.EMWave2Frame'].gw].az) / mult2;
}

});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[65]||(I$[65]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').RotatingMagnet1Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "RotatingMagnet1Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.mt = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Rotating Magnet 1";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
this.b$['com.falstad.EMWave2Frame'].grid[(this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + this.b$['com.falstad.EMWave2Frame'].gw * ((this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0))].mx = 1;
this.b$['com.falstad.EMWave2Frame'].calcBoundaries();
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(10);
this.mt = 0;
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(500);
});

Clazz.newMeth(C$, 'doStep', function () {
this.mt += this.b$['com.falstad.EMWave2Frame'].forceBar.getValue() * 0.003;
this.b$['com.falstad.EMWave2Frame'].grid[(this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + this.b$['com.falstad.EMWave2Frame'].gw * ((this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0))].mx = Math.cos(this.mt);
this.b$['com.falstad.EMWave2Frame'].grid[(this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + this.b$['com.falstad.EMWave2Frame'].gw * ((this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0))].my = -Math.sin(this.mt);
this.b$['com.falstad.EMWave2Frame'].doFilter();
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[66]||(I$[66]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').RotatingMagnet2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "RotatingMagnet2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.RotatingMagnet1Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Rotating Magnet 2";
});

Clazz.newMeth(C$, 'doStep', function () {
this.mt += this.b$['com.falstad.EMWave2Frame'].forceBar.getValue() * 0.003;
this.b$['com.falstad.EMWave2Frame'].grid[(this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + this.b$['com.falstad.EMWave2Frame'].gw * ((this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0))].mx = Math.cos(this.mt);
this.b$['com.falstad.EMWave2Frame'].grid[(this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + this.b$['com.falstad.EMWave2Frame'].gw * ((this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0))].my = -Math.abs(Math.sin(this.mt));
this.b$['com.falstad.EMWave2Frame'].doFilter();
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(500);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[67]||(I$[67]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').Scattering1Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "Scattering1Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.ctr = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Scattering 1";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(8);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(100);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(23);
var i;
var j;
for (i = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) - 1; i <= (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0) + 1; i++) for (j = (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) - 1; j <= (this.b$['com.falstad.EMWave2Frame'].gridSizeY/2|0) + 1; j++) this.b$['com.falstad.EMWave2Frame'].grid[i + this.b$['com.falstad.EMWave2Frame'].gw * j].resonant = true;


});

Clazz.newMeth(C$, 'doStep', function () {
this.ctr++;
if (this.ctr >= 600 && this.ctr <= 700 ) {
var c = (this.ctr - 600) * 0.01;
this.b$['com.falstad.EMWave2Frame'].sourceMult = 1 - c;
} else if (this.ctr >= 1100) {
var c = (this.ctr - 1100) * 0.01;
this.b$['com.falstad.EMWave2Frame'].sourceMult = c;
if (this.ctr == 1200) this.ctr = 0;
}});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[68]||(I$[68]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').Scattering2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "Scattering2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Scattering1Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.$ctr = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Scattering 2";
});

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(16);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[69]||(I$[69]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').BigModeSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "BigModeSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Big TM11 Mode";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
var i;
var n = (this.b$['com.falstad.EMWave2Frame'].windowWidth * 3/4|0);
var x = this.b$['com.falstad.EMWave2Frame'].windowOffsetX + (this.b$['com.falstad.EMWave2Frame'].windowWidth/2|0) - (n/2|0);
var y = this.b$['com.falstad.EMWave2Frame'].windowOffsetY + (this.b$['com.falstad.EMWave2Frame'].windowHeight/2|0) - (n/2|0);
for (i = 1; i != 4; i++) this.b$['com.falstad.EMWave2Frame'].conductDrawRect$I$I$I$I$D(x - i, y - i, x + n + i  - 1, y + n + i  - 1, 1);

this.b$['com.falstad.EMWave2Frame'].setupMode$I$I$I$I$I$I(x, y, n, n, 1, 1);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(200);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[70]||(I$[70]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').OneByOneModesSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "OneByOneModesSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "TM11 Modes";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
var i;
var j;
var y = 1;
var ny = 5;
while (y + ny < this.b$['com.falstad.EMWave2Frame'].windowHeight){
var nx = (((y + ny) * (this.b$['com.falstad.EMWave2Frame'].windowWidth - 8)/this.b$['com.falstad.EMWave2Frame'].windowHeight|0)) + 6;
var y1 = y + this.b$['com.falstad.EMWave2Frame'].windowOffsetY;
var x1 = this.b$['com.falstad.EMWave2Frame'].windowOffsetX + 1;
this.b$['com.falstad.EMWave2Frame'].conductDrawRect$I$I$I$I$D(x1 - 1, y1 - 1, x1 + nx, y1 + ny, 1);
this.b$['com.falstad.EMWave2Frame'].setupMode$I$I$I$I$I$I(x1, y1, nx, ny, 1, 1);
y = y+(ny + 2);
}
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[71]||(I$[71]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').OneByNModesSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "OneByNModesSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "TMn1 Modes";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
var i;
var j;
var y = 1;
var ny = 8;
var nx = this.b$['com.falstad.EMWave2Frame'].windowWidth - 2;
var mode = 1;
while (y + ny < this.b$['com.falstad.EMWave2Frame'].windowHeight){
var y1 = y + this.b$['com.falstad.EMWave2Frame'].windowOffsetY;
var x1 = this.b$['com.falstad.EMWave2Frame'].windowOffsetX + 1;
this.b$['com.falstad.EMWave2Frame'].conductDrawRect$I$I$I$I$D(x1 - 1, y1 - 1, x1 + nx, y1 + ny, 1);
this.b$['com.falstad.EMWave2Frame'].setupMode$I$I$I$I$I$I(x1, y1, nx, ny, mode, 1);
y = y+(ny + 2);
mode++;
}
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[72]||(I$[72]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').NByNModesSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "NByNModesSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "TMnn Modes";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
var i;
var j;
var y = 1;
var modex;
var modey;
var maxmode = 3;
if (this.b$['com.falstad.EMWave2Frame'].resBar.getValue() >= 70) maxmode++;
if (this.b$['com.falstad.EMWave2Frame'].resBar.getValue() >= 100) maxmode++;
var ny = (this.b$['com.falstad.EMWave2Frame'].windowHeight/maxmode|0) - 2;
var nx = (this.b$['com.falstad.EMWave2Frame'].windowWidth/maxmode|0) - 2;
for (modex = 1; modex <= maxmode; modex++) for (modey = 1; modey <= maxmode; modey++) {
var x1 = this.b$['com.falstad.EMWave2Frame'].windowOffsetX + 1 + (ny + 2) * (modey - 1) ;
var y1 = this.b$['com.falstad.EMWave2Frame'].windowOffsetY + 1 + (nx + 2) * (modex - 1) ;
this.b$['com.falstad.EMWave2Frame'].conductDrawRect$I$I$I$I$D(x1 - 1, y1 - 1, x1 + nx, y1 + ny, 1);
this.b$['com.falstad.EMWave2Frame'].setupMode$I$I$I$I$I$I(x1, y1, nx, ny, modex, modey);
}

});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[73]||(I$[73]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').OneByNModeCombosSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "OneByNModeCombosSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "TMn1 Mode Combos";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
var i;
var j;
var y = 1;
var ny = 8;
var nx = this.b$['com.falstad.EMWave2Frame'].windowWidth - 2;
while (y + ny < this.b$['com.falstad.EMWave2Frame'].windowHeight){
var mode1 = this.b$['com.falstad.EMWave2Frame'].getrand$I(8) + 1;
var mode2;
do mode2 = this.b$['com.falstad.EMWave2Frame'].getrand$I(8) + 1;
 while (mode1 == mode2);
var y1 = y + this.b$['com.falstad.EMWave2Frame'].windowOffsetY;
var x1 = this.b$['com.falstad.EMWave2Frame'].windowOffsetX + 1;
this.b$['com.falstad.EMWave2Frame'].conductDrawRect$I$I$I$I$D(x1 - 1, y1 - 1, x1 + nx, y1 + ny, 1);
for (i = 0; i != nx; i++) for (j = 0; j != ny; j++) {
this.b$['com.falstad.EMWave2Frame'].grid[i + x1 + this.b$['com.falstad.EMWave2Frame'].gw * (j + y1) ].az = 2.0 * (Math.sin(mode1 * 3.141592653589793 * (i + 1)  / (nx + 1)) * Math.sin(3.141592653589793 * (j + 1) / (ny + 1)) * 0.5  + Math.sin(mode2 * 3.141592653589793 * (i + 1)  / (nx + 1)) * Math.sin(3.141592653589793 * (j + 1) / (ny + 1)) * 0.5 );
this.b$['com.falstad.EMWave2Frame'].grid[i + x1 + this.b$['com.falstad.EMWave2Frame'].gw * (j + y1) ].dazdt = 0;
}

y = y+(ny + 2);
}
this.b$['com.falstad.EMWave2Frame'].noFilter();
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[74]||(I$[74]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').NByNModeCombosSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "NByNModeCombosSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "TMnn Mode Combos";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
var i;
var j;
var y = 1;
var maxmode = 2;
if (this.b$['com.falstad.EMWave2Frame'].resBar.getValue() >= 70) maxmode++;
if (this.b$['com.falstad.EMWave2Frame'].resBar.getValue() >= 100) maxmode++;
var ny = (this.b$['com.falstad.EMWave2Frame'].windowHeight/maxmode|0) - 2;
var nx = (this.b$['com.falstad.EMWave2Frame'].windowWidth/maxmode|0) - 2;
var gx;
var gy;
for (gx = 1; gx <= maxmode; gx++) for (gy = 1; gy <= maxmode; gy++) {
var mode1x = this.b$['com.falstad.EMWave2Frame'].getrand$I(4) + 1;
var mode1y = this.b$['com.falstad.EMWave2Frame'].getrand$I(4) + 1;
var mode2x;
var mode2y;
do {
mode2x = this.b$['com.falstad.EMWave2Frame'].getrand$I(4) + 1;
mode2y = this.b$['com.falstad.EMWave2Frame'].getrand$I(4) + 1;
} while (mode1x == mode2x && mode1y == mode2y );
var x1 = this.b$['com.falstad.EMWave2Frame'].windowOffsetX + 1 + (ny + 2) * (gx - 1) ;
var y1 = this.b$['com.falstad.EMWave2Frame'].windowOffsetY + 1 + (nx + 2) * (gy - 1) ;
this.b$['com.falstad.EMWave2Frame'].conductDrawRect$I$I$I$I$D(x1 - 1, y1 - 1, x1 + nx, y1 + ny, 1);
for (i = 0; i != nx; i++) for (j = 0; j != ny; j++) {
this.b$['com.falstad.EMWave2Frame'].grid[i + x1 + this.b$['com.falstad.EMWave2Frame'].gw * (j + y1) ].az = 2 * (Math.sin(mode1x * 3.141592653589793 * (i + 1)  / (nx + 1)) * Math.sin(mode1y * 3.141592653589793 * (j + 1)  / (ny + 1)) * 0.5  + Math.sin(mode2x * 3.141592653589793 * (i + 1)  / (nx + 1)) * Math.sin(mode2y * 3.141592653589793 * (j + 1)  / (ny + 1)) * 0.5 );
this.b$['com.falstad.EMWave2Frame'].grid[i + x1 + this.b$['com.falstad.EMWave2Frame'].gw * (j + y1) ].dazdt = 0;
}

}

this.b$['com.falstad.EMWave2Frame'].noFilter();
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[75]||(I$[75]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').TriangleModesSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "TriangleModesSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Triangle Modes";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
var i;
var j;
for (i = 0; i != 2; i++) for (j = 0; j != 2; j++) {
var x = this.b$['com.falstad.EMWave2Frame'].windowOffsetX + (this.b$['com.falstad.EMWave2Frame'].windowWidth * i/2|0) + 1;
var y = this.b$['com.falstad.EMWave2Frame'].windowOffsetY + (this.b$['com.falstad.EMWave2Frame'].windowHeight * j/2|0) + 1;
var w = (this.b$['com.falstad.EMWave2Frame'].windowWidth/2|0) - 2;
var h = (this.b$['com.falstad.EMWave2Frame'].windowHeight/2|0) - 2;
var k;
for (k = 0; k != w; k++) this.b$['com.falstad.EMWave2Frame'].conductDrawRect$I$I$I$I$D(x + k + 1 , y + k, x + w, y + k, 1);

this.b$['com.falstad.EMWave2Frame'].conductDrawRect$I$I$I$I$D(x - 1, y - 1, x + w, y + h, 1);
var mx = 0;
var my = 0;
switch (j * 2 + i) {
case 0:
mx = 1;
my = 2;
break;
case 1:
mx = 1;
my = 3;
break;
case 2:
mx = 2;
my = 3;
break;
case 3:
mx = 1;
my = 4;
break;
}
var xi;
var yi;
for (yi = 0; yi != h; yi++) {
for (xi = 0; xi <= yi; xi++) this.b$['com.falstad.EMWave2Frame'].grid[x + xi + this.b$['com.falstad.EMWave2Frame'].gw * (y + yi) ].az = (Math.sin(mx * 3.141592653589793 * (xi + 1)  / (w + 2)) * Math.sin(my * 3.141592653589793 * (yi + 2)  / (h + 2)) - Math.sin(my * 3.141592653589793 * (xi + 1)  / (w + 2)) * Math.sin(mx * 3.141592653589793 * (yi + 2)  / (h + 2)));

this.b$['com.falstad.EMWave2Frame'].grid[x + xi + this.b$['com.falstad.EMWave2Frame'].gw * (y + yi) ].dazdt = 0;
}
}

this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(114);
this.b$['com.falstad.EMWave2Frame'].noFilter();
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[76]||(I$[76]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').CircleModes1Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "CircleModes1Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Circular Modes 1";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
var i;
var j;
for (i = 0; i != 2; i++) for (j = 0; j != 2; j++) {
var x = this.b$['com.falstad.EMWave2Frame'].windowOffsetX + (this.b$['com.falstad.EMWave2Frame'].windowWidth * i/2|0) + 1;
var y = this.b$['com.falstad.EMWave2Frame'].windowOffsetY + (this.b$['com.falstad.EMWave2Frame'].windowHeight * j/2|0);
var w = (this.b$['com.falstad.EMWave2Frame'].windowWidth/2|0) - 2;
var h = (this.b$['com.falstad.EMWave2Frame'].windowHeight/2|0) - 2;
this.b$['com.falstad.EMWave2Frame'].conductFillRect$I$I$I$I$D(x - 1, y - 1, x + w + 1 , y + h + 1 , 1);
var k;
var r = (w/2|0);
var jj = Clazz.array(Double.TYPE, [3]);
var omega = this.b$['com.falstad.EMWave2Frame'].zeroj$I$I(i, j + 1) / r;
var mult = 1;
switch (j * 2 + i) {
case 1:
mult = 1.6666666666666667;
break;
case 2:
mult = 2;
break;
case 3:
mult = 8.333333333333334;
break;
}
for (k = -r; k <= r; k++) {
var yy = (Math.sqrt(r * r - k * k - 1.0E-5)|0);
this.b$['com.falstad.EMWave2Frame'].conductFillRect$I$I$I$I$D(x + r + k , y + r - yy, x + r + k , y + r + yy , 0);
var l;
for (l = -yy; l <= yy; l++) {
var rr = Math.sqrt(k * k + l * l);
var r0 = rr * omega;
var angfunc = (i == 0) ? 1 : l / rr;
if (rr == 0 ) angfunc = (i == 0) ? 1 : 0;
this.b$['com.falstad.EMWave2Frame'].bess$I$D$DA(i, r0, jj);
this.b$['com.falstad.EMWave2Frame'].grid[x + r + k + this.b$['com.falstad.EMWave2Frame'].gw * (y + r + l ) ].az = jj[i + 1] * angfunc * mult ;
}
}
}

this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(200);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[77]||(I$[77]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').CircleModes2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "CircleModes2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Circular Modes 2";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(0);
var x = this.b$['com.falstad.EMWave2Frame'].windowOffsetX + 1;
var y = this.b$['com.falstad.EMWave2Frame'].windowOffsetY + 1;
var w = this.b$['com.falstad.EMWave2Frame'].windowWidth - 2;
var h = this.b$['com.falstad.EMWave2Frame'].windowHeight - 2;
this.b$['com.falstad.EMWave2Frame'].conductFillRect$I$I$I$I$D(x - 1, y - 1, x + w + 1 , y + h + 1 , 1);
var k;
var r = (w/2|0);
var jj = Clazz.array(Double.TYPE, [3]);
var omega = this.b$['com.falstad.EMWave2Frame'].zeroj$I$I(1, 1) / r;
var tmult = 2 * r / 16.0;
for (k = -r; k <= r; k++) {
var yy = (Math.sqrt(r * r - k * k - 1.0E-5)|0);
this.b$['com.falstad.EMWave2Frame'].conductFillRect$I$I$I$I$D(x + r + k , y + r - yy, x + r + k , y + r + yy , 0);
var l;
for (l = -yy; l <= yy; l++) {
var rr = Math.sqrt(k * k + l * l);
var r0 = rr * omega;
var angfunc1 = l / rr;
var angfunc2 = k / rr;
if (rr == 0 ) angfunc1 = angfunc2 = 0;
this.b$['com.falstad.EMWave2Frame'].bess$I$D$DA(1, r0, jj);
this.b$['com.falstad.EMWave2Frame'].grid[x + r + k + this.b$['com.falstad.EMWave2Frame'].gw * (y + r + l ) ].az = jj[2] * angfunc1 * tmult ;
this.b$['com.falstad.EMWave2Frame'].grid[x + r + k + this.b$['com.falstad.EMWave2Frame'].gw * (y + r + l ) ].dazdt = jj[2] * angfunc2;
}
}
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(200);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[78]||(I$[78]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').Waveguides1Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "Waveguides1Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Waveguides 1";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(8);
var i;
var j;
var x = 1;
var nx = 5;
var y1 = this.b$['com.falstad.EMWave2Frame'].windowOffsetY + 2;
while (x + nx < this.b$['com.falstad.EMWave2Frame'].windowWidth){
var x1 = x + this.b$['com.falstad.EMWave2Frame'].windowOffsetX;
this.b$['com.falstad.EMWave2Frame'].conductDrawRect$I$I$I$I$D(x1 - 1, y1 - 1, x1 - 1, this.b$['com.falstad.EMWave2Frame'].gridSizeY - 1, 1);
this.b$['com.falstad.EMWave2Frame'].conductDrawRect$I$I$I$I$D(x1 + nx, y1 - 1, x1 + nx, this.b$['com.falstad.EMWave2Frame'].gridSizeY - 1, 1);
nx = nx+(2);
x = x+(nx);
}
this.b$['com.falstad.EMWave2Frame'].conductDrawRect$I$I$I$I$D(x - 1 + this.b$['com.falstad.EMWave2Frame'].windowOffsetX, y1 - 1, this.b$['com.falstad.EMWave2Frame'].gridSizeX - 1, y1 - 1, 1);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(140);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(28);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[79]||(I$[79]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').Waveguides2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "Waveguides2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Waveguides1Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Waveguides 2";
});

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(17);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[80]||(I$[80]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').Waveguides3Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "Waveguides3Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Waveguides 3";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(8);
var i;
var j;
var x = 1;
var nx = 8;
var y1 = this.b$['com.falstad.EMWave2Frame'].windowOffsetY + 2;
this.b$['com.falstad.EMWave2Frame'].conductDrawRect$I$I$I$I$D(this.b$['com.falstad.EMWave2Frame'].windowOffsetX + 1, y1 - 1, this.b$['com.falstad.EMWave2Frame'].windowOffsetX + this.b$['com.falstad.EMWave2Frame'].windowWidth - 1, y1 - 1, 1);
x = 1;
j = 0;
while (x + nx < this.b$['com.falstad.EMWave2Frame'].windowWidth && j < nx ){
var x1 = x + this.b$['com.falstad.EMWave2Frame'].windowOffsetX;
this.b$['com.falstad.EMWave2Frame'].conductDrawRect$I$I$I$I$D(x1 - 1, y1 - 1, x1 - 1, this.b$['com.falstad.EMWave2Frame'].gridSizeY - 1, 1);
this.b$['com.falstad.EMWave2Frame'].conductDrawRect$I$I$I$I$D(x1 + nx, y1 - 1, x1 + nx, this.b$['com.falstad.EMWave2Frame'].gridSizeY - 1, 1);
this.b$['com.falstad.EMWave2Frame'].addConductor$I$I$D(x1 + j++, y1 - 1, 0);
x = x+(nx + 2);
if (this.b$['com.falstad.EMWave2Frame'].resBar.getValue() == 32 && j == 2 ) j++;
}
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(1000);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(32);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[81]||(I$[81]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').Waveguides4Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "Waveguides4Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Waveguides3Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Waveguides 4";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(8);
var i;
var x = 1;
var nx = 9;
var y1 = this.b$['com.falstad.EMWave2Frame'].windowOffsetY + 2;
var ny = this.b$['com.falstad.EMWave2Frame'].windowHeight - 1;
x = 1;
while (x + nx < this.b$['com.falstad.EMWave2Frame'].windowWidth){
var x1 = x + this.b$['com.falstad.EMWave2Frame'].windowOffsetX;
this.b$['com.falstad.EMWave2Frame'].conductDrawRect$I$I$I$I$D(x1 - 1, y1 - 1, x1 - 1, y1 + ny - 2, 1);
this.b$['com.falstad.EMWave2Frame'].conductDrawRect$I$I$I$I$D(x1 + nx, y1 - 1, x1 + nx, y1 + ny - 2, 1);
x = x+(nx + 2);
}
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(480);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(40);
});

Clazz.newMeth(C$, 'doStep', function () {
var y = this.b$['com.falstad.EMWave2Frame'].windowOffsetY;
var nx = 9;
var x = 1;
var g = 1;
while (x + nx < this.b$['com.falstad.EMWave2Frame'].windowWidth){
var x1 = x + this.b$['com.falstad.EMWave2Frame'].windowOffsetX;
var j;
var n1 = 1;
var n2 = 1;
switch (g) {
case 1:
n1 = n2 = 1;
break;
case 2:
n1 = n2 = 2;
break;
case 3:
n1 = n2 = 3;
break;
case 4:
n1 = 1;
n2 = 2;
break;
case 5:
n1 = 1;
n2 = 3;
break;
case 6:
n1 = 2;
n2 = 3;
break;
default:
n1 = n2 = 0;
break;
}
for (j = 0; j != nx; j++) {
this.b$['com.falstad.EMWave2Frame'].grid[x1 + j + this.b$['com.falstad.EMWave2Frame'].gw * y ].az = this.b$['com.falstad.EMWave2Frame'].grid[x1 + j + this.b$['com.falstad.EMWave2Frame'].gw * y ].jz * (Math.sin(3.141592653589793 * n1 * (j + 1)  / (nx + 1)) + Math.sin(3.141592653589793 * n2 * (j + 1)  / (nx + 1)));
this.b$['com.falstad.EMWave2Frame'].grid[x1 + j + this.b$['com.falstad.EMWave2Frame'].gw * y ].jz = 0;
}
x = x+(nx + 2);
g++;
}
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[82]||(I$[82]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').ResonantCavitiesSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "ResonantCavitiesSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Resonant Cavities";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(8);
var i;
var j;
var x = 1;
var nx = 5;
var y1 = this.b$['com.falstad.EMWave2Frame'].windowOffsetY + 11;
while (x + nx < this.b$['com.falstad.EMWave2Frame'].windowWidth){
var ny = (((x + nx) * (this.b$['com.falstad.EMWave2Frame'].windowHeight - 18)/this.b$['com.falstad.EMWave2Frame'].windowWidth|0)) + 6;
var x1 = x + this.b$['com.falstad.EMWave2Frame'].windowOffsetX;
for (i = 0; i != ny + 2; i++) {
this.b$['com.falstad.EMWave2Frame'].addConductor$I$I$D(x1 - 1, y1 + i - 1, 1);
this.b$['com.falstad.EMWave2Frame'].addConductor$I$I$D(x1 + nx, y1 + i - 1, 1);
}
for (j = 0; j != nx + 2; j++) {
this.b$['com.falstad.EMWave2Frame'].addConductor$I$I$D(x1 + j - 1, y1 - 1, 1);
this.b$['com.falstad.EMWave2Frame'].addConductor$I$I$D(x1 + j - 1, y1 + ny, 1);
}
this.b$['com.falstad.EMWave2Frame'].addConductor$I$I$D(x1 + (nx/2|0), y1 - 1, 0);
x = x+(nx + 2);
}
x--;
for (; x < this.b$['com.falstad.EMWave2Frame'].windowWidth; x++) this.b$['com.falstad.EMWave2Frame'].addConductor$I$I$D(x + this.b$['com.falstad.EMWave2Frame'].windowOffsetX, y1 - 1, 1);

this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(300);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(38);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[83]||(I$[83]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').SingleSlitSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "SingleSlitSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Single Slit";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(8);
var x = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0);
var y = this.b$['com.falstad.EMWave2Frame'].windowOffsetY + 4;
this.b$['com.falstad.EMWave2Frame'].conductFillRect$I$I$I$I$D(0, y, this.b$['com.falstad.EMWave2Frame'].gridSizeX - 1, y + 2, 1);
this.b$['com.falstad.EMWave2Frame'].conductFillRect$I$I$I$I$D(x - 7, y, x + 7, y + 2, 0);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(275);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(35);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[84]||(I$[84]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').DoubleSlitSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "DoubleSlitSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Double Slit";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(8);
var x = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0);
var y = this.b$['com.falstad.EMWave2Frame'].windowOffsetY + 4;
this.b$['com.falstad.EMWave2Frame'].conductFillRect$I$I$I$I$D(0, y, this.b$['com.falstad.EMWave2Frame'].gridSizeX - 1, y + 2, 1);
this.b$['com.falstad.EMWave2Frame'].conductFillRect$I$I$I$I$D(x - 7, y, x - 5, y + 2, 0);
this.b$['com.falstad.EMWave2Frame'].conductFillRect$I$I$I$I$D(x + 5, y, x + 7, y + 2, 0);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(366);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(35);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[85]||(I$[85]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').TripleSlitSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "TripleSlitSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Triple Slit";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(8);
var x = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0);
var y = this.b$['com.falstad.EMWave2Frame'].windowOffsetY + 4;
this.b$['com.falstad.EMWave2Frame'].conductFillRect$I$I$I$I$D(0, y, this.b$['com.falstad.EMWave2Frame'].gridSizeX - 1, y + 2, 1);
this.b$['com.falstad.EMWave2Frame'].conductFillRect$I$I$I$I$D(x - 13, y, x - 11, y + 2, 0);
this.b$['com.falstad.EMWave2Frame'].conductFillRect$I$I$I$I$D(x - 1, y, x + 1, y + 2, 0);
this.b$['com.falstad.EMWave2Frame'].conductFillRect$I$I$I$I$D(x + 11, y, x + 13, y + 2, 0);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(310);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(35);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[86]||(I$[86]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').ObstacleSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "ObstacleSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Obstacle";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(8);
var x = (this.b$['com.falstad.EMWave2Frame'].gridSizeX/2|0);
var y = this.b$['com.falstad.EMWave2Frame'].windowOffsetY + 6;
this.b$['com.falstad.EMWave2Frame'].conductFillRect$I$I$I$I$D(x - 7, y, x + 7, y + 2, 1);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(400);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(35);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[87]||(I$[87]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').HalfPlaneSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "HalfPlaneSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Half Plane";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].sourceChooser.select$I(8);
var x = this.b$['com.falstad.EMWave2Frame'].windowOffsetX + (this.b$['com.falstad.EMWave2Frame'].windowWidth/2|0);
var i;
this.b$['com.falstad.EMWave2Frame'].conductFillRect$I$I$I$I$D(this.b$['com.falstad.EMWave2Frame'].windowOffsetX + (this.b$['com.falstad.EMWave2Frame'].windowWidth * 2/3|0), this.b$['com.falstad.EMWave2Frame'].windowOffsetY + 3, this.b$['com.falstad.EMWave2Frame'].windowOffsetY + this.b$['com.falstad.EMWave2Frame'].windowWidth - 1, this.b$['com.falstad.EMWave2Frame'].windowOffsetY + 5, 1);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(150);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(35);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[88]||(I$[88]=Clazz.load(Clazz.load('com.falstad.EMWave2Frame').LloydsMirrorSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave2Frame, "LloydsMirrorSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave2Frame','com.falstad.EMWave2Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Lloyd\'s Mirror";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave2Frame'].setSources();
this.b$['com.falstad.EMWave2Frame'].sources[0].x = this.b$['com.falstad.EMWave2Frame'].windowOffsetX;
this.b$['com.falstad.EMWave2Frame'].sources[0].y = this.b$['com.falstad.EMWave2Frame'].windowOffsetY + (this.b$['com.falstad.EMWave2Frame'].windowHeight * 3/4|0);
this.b$['com.falstad.EMWave2Frame'].brightnessBar.setValue$I(120);
this.b$['com.falstad.EMWave2Frame'].setForceBar$I(40);
this.b$['com.falstad.EMWave2Frame'].conductDrawRect$I$I$I$I$D(0, this.b$['com.falstad.EMWave2Frame'].windowOffsetY + this.b$['com.falstad.EMWave2Frame'].windowHeight - 1, this.b$['com.falstad.EMWave2Frame'].gridSizeX - 1, this.b$['com.falstad.EMWave2Frame'].windowOffsetY + this.b$['com.falstad.EMWave2Frame'].windowHeight - 1, 1);
});

Clazz.newMeth(C$, 'doSetupSources', function () {
});

Clazz.newMeth(C$, 'createNext', function () {
return null;
});

Clazz.newMeth(C$);
})()

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:05
