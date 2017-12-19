(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "EMWave1Frame", function(){
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
this.EBrightnessBar = null;
this.lineDensityBar = null;
this.auxBar = null;
this.auxLabel = null;
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
this.sourceType = 0;
this.auxFunction = 0;
this.sourcePacket = false;
this.cv = null;
this.applet = null;
this.main = null;
this.useFrame = false;
this.showControls = false;
this.useBufferedImage = false;
this.shown = false;
this.lastTime = 0;
this.linegrid = null;
this.filterCount = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.engine = null;
this.windowWidth = 50;
this.windowHeight = 50;
this.windowOffsetX = 0;
this.windowOffsetY = 0;
this.sourceCount = -1;
this.sourcePacket = false;
this.useBufferedImage = false;
this.shown = false;
this.lastTime = 0;
this.filterCount = 0;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "EMWave1 by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'c$$com_falstad_EMWave1', function (a) {
C$.superclazz.c$$S.apply(this, ["TE Electrodynamics Applet v1.4a"]);
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
this.setupList = Clazz.new_((I$[30]||(I$[30]=Clazz.load('java.util.Vector'))));
var s = Clazz.new_((I$[31]||(I$[31]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').PlaneWaveSetup))), [this, null]);
var i = 0;
while (s != null ){
this.setupList.addElement$TE(s);
s = s.createNext();
if (i++ > 300) {
System.out.print$S("setup loop?\u000a");
return;
}}
var os = System.getProperty("os.name");
var res = 40;
this.sources = Clazz.array((I$[32]||(I$[32]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').OscSource))), [4]);
this.main.setLayout$java_awt_LayoutManager(Clazz.new_((I$[33]||(I$[33]=Clazz.load('com.falstad.EMWave1Layout')))));
this.cv = Clazz.new_((I$[34]||(I$[34]=Clazz.load('com.falstad.EMWave1Canvas'))).c$$com_falstad_EMWave1Frame,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
this.main.add$java_awt_Component(this.cv);
this.setupChooser = Clazz.new_((I$[35]||(I$[35]=Clazz.load('a2s.Choice'))));
for (i = 0; i != this.setupList.size(); i++) this.setupChooser.add$S("Setup: " + (this.setupList.elementAt$I(i)).getName());

this.setupChooser.select$I(4);
this.setup = this.setupList.elementAt$I(4);
this.setupChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.setupChooser);
this.sourceChooser = Clazz.new_((I$[35]||(I$[35]=Clazz.load('a2s.Choice'))));
this.sourceChooser.add$S("No Sources");
this.sourceChooser.add$S("1 Plane Src");
this.sourceChooser.add$S("2 Plane Srcs");
this.sourceChooser.add$S("1 Plane Src (Packets)");
this.sourceChooser.add$S("1 Antenna Src");
this.sourceChooser.add$S("2 Antenna Srcs");
this.sourceChooser.add$S("1 Loop Src");
this.sourceChooser.add$S("1 Loop Src (Packets)");
this.sourceChooser.select$I(1);
this.sourceChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.sourceChooser);
this.modeChooser = Clazz.new_((I$[35]||(I$[35]=Clazz.load('a2s.Choice'))));
this.modeChooser.add$S("Mouse = Add Perf. Conductor");
this.modeChooser.add$S("Mouse = Clear");
this.modeChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.modeChooser);
this.viewChooser = Clazz.new_((I$[35]||(I$[35]=Clazz.load('a2s.Choice'))));
this.viewChooser.add$S("Show Electric Field (E)");
this.viewChooser.add$S("Show E lines");
this.viewChooser.add$S("Show Magnetic Field (B)");
this.viewChooser.add$S("Show Charge (rho)");
this.viewChooser.add$S("Show Current (j)");
this.viewChooser.add$S("Show E/B");
this.viewChooser.add$S("Show E lines/B");
this.viewChooser.add$S("Show E/B/rho/j");
this.viewChooser.add$S("Show E lines/B/rho/j");
this.viewChooser.add$S("Show E/rho");
this.viewChooser.add$S("Show E lines/rho");
this.viewChooser.add$S("Show E/B/j");
this.viewChooser.add$S("Show E lines/B/j");
this.viewChooser.add$S("Show Poynting Vector");
this.viewChooser.add$S("Show Energy Density");
this.viewChooser.add$S("Show Poynting/Energy");
this.viewChooser.add$S("Show Disp Current");
this.viewChooser.add$S("Show Disp + j");
this.viewChooser.add$S("Show Disp + j/B");
this.viewChooser.add$S("Show dB/dt");
this.viewChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.viewChooser);
this.viewChooser.select$I(7);
this.main.add$java_awt_Component(this.clearButton = Clazz.new_((I$[36]||(I$[36]=Clazz.load('a2s.Button'))).c$$S,["Clear Fields"]));
this.clearButton.addActionListener$java_awt_event_ActionListener(this);
this.main.add$java_awt_Component(this.ClearAllButton = Clazz.new_((I$[36]||(I$[36]=Clazz.load('a2s.Button'))).c$$S,["Clear All"]));
this.ClearAllButton.addActionListener$java_awt_event_ActionListener(this);
this.stoppedCheck = Clazz.new_((I$[37]||(I$[37]=Clazz.load('a2s.Checkbox'))).c$$S,["Stopped"]);
this.stoppedCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.stoppedCheck);
this.main.add$java_awt_Component(Clazz.new_((I$[38]||(I$[38]=Clazz.load('a2s.Label'))).c$$S$I,["Simulation Speed", 0]));
this.main.add$java_awt_Component(this.speedBar = Clazz.new_((I$[39]||(I$[39]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 180, 1, 1, 2000]));
this.speedBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[38]||(I$[38]=Clazz.load('a2s.Label'))).c$$S$I,["Resolution", 0]));
this.main.add$java_awt_Component(this.resBar = Clazz.new_((I$[39]||(I$[39]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, res, 5, 16, 140]));
this.resBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.setResolution();
this.main.add$java_awt_Component(Clazz.new_((I$[38]||(I$[38]=Clazz.load('a2s.Label'))).c$$S$I,["Source Frequency", 0]));
this.main.add$java_awt_Component(this.forceBar = Clazz.new_((I$[39]||(I$[39]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, this.forceBarValue = 10, 1, 1, 40]));
this.forceBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[38]||(I$[38]=Clazz.load('a2s.Label'))).c$$S$I,["Brightness", 0]));
this.main.add$java_awt_Component(this.brightnessBar = Clazz.new_((I$[39]||(I$[39]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 10, 1, 1, 2000]));
this.brightnessBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[38]||(I$[38]=Clazz.load('a2s.Label'))).c$$S$I,["E Field Brightness", 0]));
this.main.add$java_awt_Component(this.EBrightnessBar = Clazz.new_((I$[39]||(I$[39]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 100, 1, 1, 800]));
this.EBrightnessBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[38]||(I$[38]=Clazz.load('a2s.Label'))).c$$S$I,["Line Density", 0]));
this.main.add$java_awt_Component(this.lineDensityBar = Clazz.new_((I$[39]||(I$[39]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 50, 1, 10, 100]));
this.lineDensityBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(this.auxLabel = Clazz.new_((I$[38]||(I$[38]=Clazz.load('a2s.Label'))).c$$S$I,["", 0]));
this.main.add$java_awt_Component(this.auxBar = Clazz.new_((I$[39]||(I$[39]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 1, 1, 1, 40]));
this.auxBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[38]||(I$[38]=Clazz.load('a2s.Label'))).c$$S,["http://www.falstad.com"]));
try {
var param = this.applet.getParameter$S("PAUSE");
if (param != null ) this.pause = Integer.parseInt(param);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
this.random = Clazz.new_((I$[40]||(I$[40]=Clazz.load('java.util.Random'))));
this.reinit();
this.setup = this.setupList.elementAt$I(0);
this.cv.setBackground$java_awt_Color((I$[41]||(I$[41]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[41]||(I$[41]=Clazz.load('java.awt.Color'))).lightGray);
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
this.grid = Clazz.array((I$[42]||(I$[42]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').OscElement))), [this.gridSizeXY]);
var i;
var j;
for (i = 0; i != this.gridSizeXY; i++) this.grid[i] = Clazz.new_((I$[42]||(I$[42]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').OscElement))), [this, null]);

this.doSetup();
});

Clazz.newMeth(C$, 'setDamping', function () {
var i;
var j;
for (i = 0; i != this.gridSizeXY; i++) this.grid[i].damp = 1;

for (i = 0; i != this.windowOffsetX; i++) for (j = 0; j != this.gridSizeX; j++) {
var da = Math.exp(-(this.windowOffsetX - i) * 0.0022);
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

this.imageSource = Clazz.new_((I$[43]||(I$[43]=Clazz.load('java.awt.image.MemoryImageSource'))).c$$I$I$IA$I$I,[d.width, d.height, this.pixels, 0, d.width]);
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
for (x = 0; x != this.gridSizeXY; x++) this.grid[x].az = this.grid[x].dazdt = 0;

this.t = 0;
this.doFilter();
});

Clazz.newMeth(C$, 'doClearAll', function () {
var x;
var y;
for (x = 0; x != this.gridSizeXY; x++) {
this.grid[x].jx = this.grid[x].jy = 0;
this.grid[x].az = this.grid[x].dazdt = 0;
this.grid[x].boundary = false;
this.grid[x].gray = false;
this.grid[x].conductor = false;
this.grid[x].col = 0;
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
this.grid[x + y * this.gw].conductor = this.grid[x + this.windowOffsetY * this.gw].conductor;
this.grid[x + this.gw * (this.gridSizeY - y - 1 )].conductor = this.grid[x + this.gw * (this.gridSizeY - this.windowOffsetY - 1 )].conductor;
}

for (y = 0; y < this.gridSizeY; y++) for (x = 0; x < this.windowOffsetX; x++) {
this.grid[x + this.gw * y].conductor = this.grid[this.windowOffsetX + this.gw * y].conductor;
this.grid[this.gridSizeX - x - 1  + this.gw * y].conductor = this.grid[this.gridSizeX - this.windowOffsetX - 1  + this.gw * y].conductor;
}

for (x = 1; x < this.gridSizeX - 1; x++) for (y = 1; y < this.gridSizeY - 1; y++) {
var gi = x + this.gw * y;
var oe = this.grid[gi];
var cond = oe.conductor;
var e1 = this.grid[gi - 1];
var e2 = this.grid[gi + 1];
var e3 = this.grid[gi - this.gw];
var e4 = this.grid[gi + this.gw];
oe.gray = oe.conductor;
if (e1.conductor != cond  || e2.conductor != cond   || e3.conductor != cond   || e4.conductor != cond  ) {
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

Clazz.newMeth(C$, 'updateEMWave1$java_awt_Graphics', function (realg) {
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
var tadd2 = tadd * tadd;
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
var o;
for (j = 1; j != mxy; j++) {
var gi = j * this.gw + 1;
var giEnd = gi + mxx - 1;
oe = this.grid[gi - 1];
oee = this.grid[gi];
for (; gi != giEnd; gi++) {
oew = oe;
oe = oee;
oee = this.grid[gi + 1];
if (oe.conductor) continue;
oen = this.grid[gi - this.gw];
oes = this.grid[gi + this.gw];
if (oe.boundary) {
var az = oe.az;
previ = oew.az - az;
if (oew.conductor) previ = (oee.conductor) ? 0 : oee.az - az;
nexti = oee.az - az;
if (oee.conductor) nexti = (oew.conductor) ? 0 : oew.az - az;
prevj = oen.az - az;
if (oen.conductor) prevj = (oes.conductor) ? 0 : oes.az - az;
nextj = oes.az - az;
if (oes.conductor) nextj = (oen.conductor) ? 0 : oen.az - az;
basis = (nexti + previ + nextj + prevj ) * 0.25;
var jj = oes.jx - oen.jx + oew.jy - oee.jy;
a = basis + jj;
} else {
previ = oew.az;
nexti = oee.az;
prevj = oen.az;
nextj = oes.az;
basis = (nexti + previ + nextj + prevj ) * 0.25;
a = oes.jx - oen.jx + oew.jy - oee.jy - (oe.az - basis);
}o = oe.dazdt;
oe.dazdt = (oe.dazdt * oe.damp) + a * forcecoef;
oe.dazdt2 = oe.dazdt - o;
}
}
for (j = 1; j != mxy; j++) {
var gi = j * this.gw + 1;
var giEnd = gi - 1 + mxx;
for (; gi != giEnd; gi++) {
oe = this.grid[gi];
oe.az += oe.dazdt * tadd2;
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
var col = -1;
if (this.sourceType == 2 && (i % 2) == 0 ) col = -256;
this.plotSource$I$I$I$I(i, xx, yy, col);
}
if (this.imageSource != null ) this.imageSource.newPixels();
realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
if (!this.stoppedCheck.getState()) this.cv.repaint$J(this.pause);
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

Clazz.newMeth(C$, 'plotSource$I$I$I$I', function (n, xx, yy, col) {
var rad = 7;
var j;
if (n == this.selectedSource) col = col^(8421504);
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
var emult = this.EBrightnessBar.getValue() / 100.0;
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
var showLines = false;
viewScalar = viewScalarCond = viewVector = viewVectorCond = -1;
switch (v) {
case 3:
case 2:
case 19:
case 14:
viewScalar = viewScalarCond = v;
break;
case 0:
case 4:
case 13:
case 16:
case 17:
viewVector = viewVectorCond = v;
break;
case 18:
viewVector = viewVectorCond = 17;
viewScalar = 2;
break;
case 1:
showLines = true;
break;
case 5:
viewScalar = viewScalarCond = 2;
viewVector = viewVectorCond = 0;
break;
case 6:
viewScalar = viewScalarCond = 2;
showLines = true;
break;
case 9:
viewScalar = viewScalarCond = 3;
viewVector = viewVectorCond = 0;
break;
case 10:
viewScalar = viewScalarCond = 3;
showLines = true;
break;
case 11:
viewScalar = viewScalarCond = 2;
viewVector = 0;
viewVectorCond = 4;
break;
case 12:
viewScalar = viewScalarCond = 2;
viewVector = 0;
viewVectorCond = 4;
showLines = true;
break;
case 8:
viewScalar = 2;
viewScalarCond = 3;
viewVectorCond = 4;
showLines = true;
break;
case 7:
viewScalar = 2;
viewScalarCond = 3;
viewVector = 0;
viewVectorCond = 4;
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
if (oe.gray || oe.jx != 0   || oe.jy != 0  ) {
col_r = col_g = col_b = 64;
vv = viewVectorCond;
vs = viewScalarCond;
}if (vs != -1) {
var dy = 0;
switch (vs) {
case 2:
dy = oe.az * 0.2;
break;
case 19:
dy = oe.dazdt;
break;
case 3:
dy = 0;
if (oe.conductor) {
if (!this.grid[gi + this.gw].conductor) dy = this.getEField$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement(this.grid[gi + this.gw], this.grid[gi + this.gw - 1], this.grid[gi + this.gw + 1 ]);
if (!this.grid[gi - this.gw].conductor) dy += this.getEField$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement(this.grid[gi - this.gw], this.grid[gi - this.gw + 1], this.grid[gi - this.gw - 1 ]);
if (!this.grid[gi + 1].conductor) dy += this.getEField$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement(this.grid[gi + 1], this.grid[gi + this.gw + 1 ], this.grid[gi - this.gw + 1]);
if (!this.grid[gi - 1].conductor) dy += this.getEField$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement(this.grid[gi - 1], this.grid[gi - this.gw - 1 ], this.grid[gi + this.gw - 1]);
dy *= 0.6;
}break;
case 14:
{
var dx = this.getEField$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement(oe, this.grid[gi + this.gw], this.grid[gi - this.gw]);
dy = this.getEField$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement(oe, this.grid[gi - 1], this.grid[gi + 1]);
dy = 0.4 * (Math.sqrt(dx * dx + dy * dy) * 3 + oe.az * oe.az * 0.05 );
break;
}}
dy *= mult;
if (dy < -1 ) dy = -1;
if (dy > 1 ) dy = 1;
if (vs == 3) {
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
var mm;
var jmult = 0.2;
switch (vv) {
case 0:
dx = this.getEField$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement(oe, this.grid[gi + this.gw], this.grid[gi - this.gw]) * emult;
dy = this.getEField$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement(oe, this.grid[gi - 1], this.grid[gi + 1]) * emult;
break;
case 16:
case 17:
dx = this.getdEdt$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement(oe, this.grid[gi + this.gw], this.grid[gi - this.gw]) * 100;
dy = this.getdEdt$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement(oe, this.grid[gi - 1], this.grid[gi + 1]) * 100;
if (vv == 16) break;
case 4:
if (oe.conductor) {
if (!this.grid[gi + this.gw].conductor) dx += -this.grid[gi + this.gw].az * 0.2;
if (!this.grid[gi - this.gw].conductor) dx += this.grid[gi - this.gw].az * 0.2;
if (!this.grid[gi + 1].conductor) dy += this.grid[gi + 1].az * 0.2;
if (!this.grid[gi - 1].conductor) dy += -this.grid[gi - 1].az * 0.2;
} else {
dx += oe.jx * 0.2;
dy += oe.jy * 0.2;
}break;
case 13:
mm = 3.6 * oe.az;
dy = -mm * this.getEField$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement(oe, this.grid[gi - this.gw], this.grid[gi + this.gw]);
dx = mm * this.getEField$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement(oe, this.grid[gi + 1], this.grid[gi - 1]);
break;
}
var dn = Math.sqrt(dx * dx + dy * dy);
if (dn > 0 ) {
dx /= dn;
dy /= dn;
}dn *= mult;
if (vv == 4) {
if (dn > 1 ) {
if (dn > 2 ) dn = 2;
dn -= 1;
col_r = col_g = 255;
col_b = col_b + ((dn * (255 - col_b))|0);
} else {
col_r = col_r + ((dn * (255 - col_r))|0);
col_g = col_g + ((dn * (255 - col_g))|0);
}} else {
if (dn > 1 ) {
if (dn > 2 ) dn = 2;
dn -= 1;
col_g = 255;
col_r = col_r + ((dn * (255 - col_r))|0);
col_b = col_b + ((dn * (255 - col_b))|0);
} else col_g = col_g + ((dn * (255 - col_g))|0);
}col = -16777216 | (col_r << 16) | (col_g << 8) | col_b ;
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

Clazz.newMeth(C$, 'getEField$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement', function (ge, gp, gn) {
if (ge.conductor) return 0;
if (gp.conductor) return 0.66 * (ge.dazdt - gn.dazdt);
if (gn.conductor) return 0.66 * (gp.dazdt - ge.dazdt);
return 0.33 * (-gn.dazdt + gp.dazdt);
});

Clazz.newMeth(C$, 'getdEdt$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement', function (ge, gp, gn) {
if (ge.conductor) return 0;
if (gp.conductor) return 2 * (ge.dazdt2 - gn.dazdt2);
if (gn.conductor) return 2 * (gp.dazdt2 - ge.dazdt2);
return -gn.dazdt2 + gp.dazdt2;
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
var skip = false;
var au = this.auxBar.getValue() - 1;
if (au > 38) au = 38;
w2 = w + au * 0.08267349088394192;
var v = 0;
var v2 = 0;
if (!this.sourcePacket) {
v = Math.sin(w);
if (this.sourceCount >= 2) v2 = Math.sin(w2);
} else {
w %= 6.283185307179586;
var adjw = w / (0.01166665 * this.forceBar.getValue());
adjw -= 10;
v = Math.exp(-0.01 * adjw * adjw ) * Math.sin(adjw * 0.2);
if (adjw < 0 ) this.doFilter();
}if (clear) v = v2 = 0;
this.sources[0].v = this.sources[2].v = (2 * v * this.sourceMult );
this.sources[1].v = this.sources[3].v = (2 * v2 * this.sourceMult );
if (this.sourceType == 1) {
for (j = 0; j != (this.sourceCount/2|0); j++) {
var src1 = this.sources[j * 2];
var src2 = this.sources[j * 2 + 1];
var src3 = this.sources[j];
this.drawPlaneSource$I$I$I$I$D(src1.x, src1.y, src2.x, src2.y, src3.v * 0.1);
}
} else if (this.sourceType == 2) {
for (j = 0; j != (this.sourceCount/2|0); j++) {
var src1 = this.sources[j * 2];
var src2 = this.sources[j * 2 + 1];
var src3 = this.sources[j];
this.drawAntennaSource$I$I$I$I$D(src1.x, src1.y, src2.x, src2.y, src3.v * 0.1);
}
} else if (this.sourceType == 3) {
var x1 = this.min$I$I(this.sources[0].x, this.sources[1].x);
var x2 = this.max$I$I(this.sources[0].x, this.sources[1].x);
var y1 = this.min$I$I(this.sources[0].y, this.sources[1].y);
var y2 = this.max$I$I(this.sources[0].y, this.sources[1].y);
var ix;
var iy;
var vx;
var vy;
vx = vy = this.sources[0].v * 0.1;
if (x1 == x2) vx = 0;
if (y1 == y2) vy = 0;
for (ix = x1 + 1; ix < x2; ix++) {
this.grid[ix + this.gw * y1].jx = vx;
this.grid[ix + this.gw * y2].jx = -vx;
}
this.grid[x1 + this.gw * y1].jx = 0.5 * vx;
this.grid[x2 + this.gw * y1].jx = 0.5 * vx;
this.grid[x1 + this.gw * y2].jx = -0.5 * vx;
this.grid[x2 + this.gw * y2].jx = -0.5 * vx;
for (iy = y1 + 1; iy < y2; iy++) {
this.grid[x1 + this.gw * iy].jy = -vy;
this.grid[x2 + this.gw * iy].jy = vy;
}
this.grid[x1 + this.gw * y1].jy = -0.5 * vy;
this.grid[x1 + this.gw * y2].jy = -0.5 * vy;
this.grid[x2 + this.gw * y1].jy = 0.5 * vy;
this.grid[x2 + this.gw * y2].jy = 0.5 * vy;
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
}var len = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
var xmult = (x2 - x1) / len;
var ymult = (y2 - y1) / len;
if (x1 == x2 && y1 == y2 ) {
} else if (this.abs$I(y2 - y1) > this.abs$I(x2 - x1)) {
var sgn = this.sign$I(y2 - y1);
var x;
var y;
for (y = y1; y != y2 + sgn; y = y+(sgn)) {
x = x1 + ((x2 - x1) * (y - y1)/(y2 - y1)|0);
this.grid[x + y * this.gw].jx = v * xmult;
this.grid[x + y * this.gw].jy = v * ymult;
}
} else {
var sgn = this.sign$I(x2 - x1);
var x;
var y;
for (x = x1; x != x2 + sgn; x = x+(sgn)) {
y = y1 + ((y2 - y1) * (x - x1)/(x2 - x1)|0);
this.grid[x + y * this.gw].jx = v * xmult;
this.grid[x + y * this.gw].jy = v * ymult;
}
}});

Clazz.newMeth(C$, 'drawAntennaSource$I$I$I$I$D', function (x1, y1, x2, y2, v) {
var k = this.forceBar.getValue() * 0.0224;
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
}var len = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
var ph = 0;
var xmult = (x2 - x1) / len;
var ymult = (y2 - y1) / len;
if (x1 == x2 && y1 == y2 ) {
} else if (this.abs$I(y2 - y1) > this.abs$I(x2 - x1)) {
var sgn = this.sign$I(y2 - y1);
var x;
var y;
for (y = y1; y != y2 + sgn; y = y+(sgn)) {
x = x1 + ((x2 - x1) * (y - y1)/(y2 - y1)|0);
var q = Math.sin((ph + (y - y1) / ymult) * k) * v;
this.grid[x + y * this.gw].jx = q * xmult;
this.grid[x + y * this.gw].jy = q * ymult;
}
} else {
var sgn = this.sign$I(x2 - x1);
var x;
var y;
for (x = x1; x != x2 + sgn; x = x+(sgn)) {
y = y1 + ((y2 - y1) * (x - x1)/(x2 - x1)|0);
var q = Math.sin((ph + (x - x1) / xmult) * k) * v;
this.grid[x + y * this.gw].jx = q * xmult;
this.grid[x + y * this.gw].jy = q * ymult;
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
var mult = this.brightnessBar.getValue() * this.EBrightnessBar.getValue() / 5000.0;
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
if (oe.gray || oe.jx != 0   || oe.jy != 0  ) {
x = 0;
continue;
}var dx = this.getEField$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement(oe, this.grid[gi + this.gw], this.grid[gi - this.gw]);
var dy = this.getEField$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement$com_falstad_EMWave1Frame_OscElement(oe, this.grid[gi - 1], this.grid[gi + 1]);
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

Clazz.newMeth(C$, 'filterGrid', function () {
if ((this.filterCount++ & 3) != 0) return;
if (this.filterCount > 200) return;
var mult1 = (this.forceBar.getValue() > 7 && this.sourceCount > 0  && !this.sourcePacket ) ? 40 : 8;
var mult2 = 4 + mult1;
var x;
var y;
for (y = 1; y < this.gridSizeY - 1; y++) for (x = 1; x < this.gridSizeX - 1; x++) {
var gi = x + y * this.gw;
var oe = this.grid[gi];
if (oe.jx != 0  || oe.jy != 0   || oe.boundary  || oe.conductor ) continue;
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
this.dragClear = oe.conductor || oe.jx != 0   || oe.jy != 0  ;
this.dragSet = !this.dragClear;
}oe.conductor = false;
if (this.dragClear) return;
switch (this.modeChooser.getSelectedIndex()) {
case 0:
this.addConductor$I$I$D(xp, yp, 1);
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
if (this.resBar.getValue() == this.windowWidth) return;
this.setResolution();
this.reinit();
this.cv.repaint$J(this.pause);
}if (e.getSource() === this.brightnessBar  || e.getSource() === this.EBrightnessBar   || e.getSource() === this.lineDensityBar  ) this.cv.repaint$J(this.pause);
if (e.getSource() === this.lineDensityBar ) this.linegrid = null;
if (e.getSource() === this.forceBar ) this.setForce();
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
this.windowOffsetX = this.windowOffsetY = 30;
this.gridSizeX = this.windowWidth + this.windowOffsetX * 2;
this.gridSizeY = this.windowHeight + this.windowOffsetY * 2;
this.gridSizeXY = this.gridSizeX * this.gridSizeY;
this.gw = this.gridSizeX;
this.linegrid = null;
});

Clazz.newMeth(C$, 'setResolution$I', function (x) {
this.resBar.setValue$I(x);
this.setResolution();
this.reinit();
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
});

Clazz.newMeth(C$, 'doSetup', function () {
this.t = 0;
this.doClearAll();
this.sourceCount = -1;
this.filterCount = 0;
this.sourceChooser.select$I(0);
this.setForceBar$I(10);
this.brightnessBar.setValue$I(100);
this.EBrightnessBar.setValue$I(100);
this.auxBar.setValue$I(1);
this.setup = this.setupList.elementAt$I(this.setupChooser.getSelectedIndex());
this.setup.select();
this.setup.doSetupSources();
this.calcBoundaries();
this.setDamping();
});

Clazz.newMeth(C$, 'addMedium', function () {
});

Clazz.newMeth(C$, 'addCondMedium$D', function (cv) {
this.conductFillRect$I$I$I$I$D(0, (this.gridSizeY/2|0), this.gridSizeX - 1, this.gridSizeY - 1, cv);
});

Clazz.newMeth(C$, 'setSources', function () {
if (this.sourceCount > 0) this.doSources$D$Z(1, true);
this.sourceMult = 1;
var oldSCount = this.sourceCount;
this.sourceCount = 0;
this.sourceType = 1;
this.sourcePacket = false;
switch (this.sourceChooser.getSelectedIndex()) {
case 0:
this.sourceCount = 0;
break;
case 1:
this.sourceCount = 1;
break;
case 2:
this.sourceCount = 2;
break;
case 3:
this.sourceCount = 1;
this.sourcePacket = true;
break;
case 4:
this.sourceCount = 1;
this.sourceType = 2;
break;
case 5:
this.sourceCount = 2;
this.sourceType = 2;
break;
case 6:
this.sourceCount = 1;
this.sourceType = 3;
break;
case 7:
this.sourceCount = 1;
this.sourceType = 3;
this.sourcePacket = true;
}
if (this.sourceCount == 2) {
this.auxBar.setValue$I(1);
this.auxLabel.setText$S("Phase Difference");
this.auxBar.show();
this.auxLabel.show();
} else {
this.auxBar.hide();
this.auxLabel.hide();
}this.validate();
this.sourceCount = this.sourceCount*(2);
if (oldSCount != this.sourceCount) {
var x2 = this.windowOffsetX + this.windowWidth - 1;
var y2 = this.windowOffsetY + this.windowHeight - 1;
this.sources[0] = Clazz.new_((I$[32]||(I$[32]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').OscSource))).c$$I$I, [this, null, this.windowOffsetX, this.windowOffsetY]);
this.sources[1] = Clazz.new_((I$[32]||(I$[32]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').OscSource))).c$$I$I, [this, null, x2, this.windowOffsetY]);
this.sources[2] = Clazz.new_((I$[32]||(I$[32]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').OscSource))).c$$I$I, [this, null, this.windowOffsetX, y2]);
this.sources[3] = Clazz.new_((I$[32]||(I$[32]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').OscSource))).c$$I$I, [this, null, x2, y2]);
}});

Clazz.newMeth(C$, 'setupMode$I$I$I$I$I$I', function (x, y, sx, sy, nx, ny) {
var i;
var j;
for (i = 0; i < sx; i++) for (j = 0; j < sy; j++) {
this.grid[i + x + this.gw * (j + y) ].az = 2 * (Math.cos(3.141592653589793 * nx * i  / (sx - 1)) * Math.cos(3.141592653589793 * ny * j  / (sy - 1)));
this.grid[i + x + this.gw * (j + y) ].dazdt = 0;
}

this.noFilter();
});

Clazz.newMeth(C$, 'addMode$I$I$I$I$I$I', function (x, y, sx, sy, nx, ny) {
var i;
var j;
for (i = 0; i < sx; i++) for (j = 0; j < sy; j++) {
this.grid[i + x + this.gw * (j + y) ].az += 2 * (Math.cos(3.141592653589793 * nx * i  / (sx - 1)) * Math.cos(3.141592653589793 * ny * j  / (sy - 1)));
}

this.noFilter();
});

Clazz.newMeth(C$, 'addModeI$I$I$I$I$I$I', function (x, y, sx, sy, nx, ny) {
var i;
var j;
var mult = 3.141592653589793 * 4 * Math.sqrt(nx * nx / ((sx - 1) * (sx - 1)) + ny * ny / ((sy - 1) * (sy - 1))) ;
for (i = 0; i < sx; i++) for (j = 0; j < sy; j++) {
this.grid[i + x + this.gw * (j + y) ].dazdt += mult * (Math.cos(3.141592653589793 * nx * i  / (sx - 1)) * Math.cos(3.141592653589793 * ny * j  / (sy - 1)));
}

this.noFilter();
});

Clazz.newMeth(C$, 'findMode$I$I$I$I', function (x1, y1, x2, y2) {
var iter;
var delta = 0;
var iic = 1000;
for (iter = 0; iter != iic; iter++) {
var i;
var j;
var ct = 0;
for (i = x1; i <= x2; i++) for (j = y1; j <= y2; j++) {
var gi = i + j * this.gw;
var oew = this.grid[gi - 1];
var oee = this.grid[gi + 1];
var oen = this.grid[gi - this.gw];
var oes = this.grid[gi + this.gw];
var oe = this.grid[gi];
if (oe.conductor) continue;
if (oe.col != 0) {
oe.dazdt = oe.az;
continue;
}var az = oe.az;
var previ = oew.az;
if (oew.conductor) previ = (oee.conductor) ? az : oee.az;
var nexti = oee.az;
if (oee.conductor) nexti = (oew.conductor) ? az : oew.az;
var prevj = oen.az;
if (oen.conductor) prevj = (oes.conductor) ? az : oes.az;
var nextj = oes.az;
if (oes.conductor) nextj = (oen.conductor) ? az : oen.az;
oe.dazdt = 0.125 * (nexti + previ + nextj + prevj + 4 * az );
delta += Math.abs(oe.dazdt - az);
ct++;
}

delta /= ct;
for (i = x1; i <= x2; i++) for (j = y1; j <= y2; j++) {
var oe = this.grid[i + j * this.gw];
oe.az = oe.dazdt;
oe.dazdt = 0;
}

}
});

Clazz.newMeth(C$, 'addConductor$I$I$D', function (x, y, cv) {
var oe = this.grid[x + this.gw * y];
oe.conductor = (cv == 0 ) ? false : true;
if (cv == 1 ) oe.az = oe.dazdt = 0;
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
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "OscSource", function(){
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
return (((this.x - this.b$['com.falstad.EMWave1Frame'].windowOffsetX) * this.b$['com.falstad.EMWave1Frame'].winSize.width + (this.b$['com.falstad.EMWave1Frame'].winSize.width/2|0))/this.b$['com.falstad.EMWave1Frame'].windowWidth|0);
});

Clazz.newMeth(C$, 'getScreenY', function () {
return (((this.y - this.b$['com.falstad.EMWave1Frame'].windowOffsetY) * this.b$['com.falstad.EMWave1Frame'].winSize.height + (this.b$['com.falstad.EMWave1Frame'].winSize.height/2|0))/this.b$['com.falstad.EMWave1Frame'].windowHeight|0);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "OscElement", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.conductor = false;
this.jx = 0;
this.jy = 0;
this.damp = 0;
this.az = 0;
this.dazdt = 0;
this.dazdt2 = 0;
this.col = 0;
this.boundary = false;
this.gray = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getType', function () {
if (this.conductor) return 1;
 else if (this.jx != 0  || this.jy != 0  ) return 2;
return 0;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "Setup", function(){
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
this.b$['com.falstad.EMWave1Frame'].setSources();
});

Clazz.newMeth(C$, 'c$', function () {
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "PlaneWaveSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Plane Wave";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(1);
this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(225);
this.b$['com.falstad.EMWave1Frame'].setForceBar$I(30);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[2]||(I$[2]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').IntersectingPlaneWavesSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "IntersectingPlaneWavesSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Intersecting Planes";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(126);
this.b$['com.falstad.EMWave1Frame'].setForceBar$I(34);
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(2);
this.b$['com.falstad.EMWave1Frame'].setSources();
this.b$['com.falstad.EMWave1Frame'].sources[0].y = this.b$['com.falstad.EMWave1Frame'].sources[1].y = this.b$['com.falstad.EMWave1Frame'].windowOffsetY;
this.b$['com.falstad.EMWave1Frame'].sources[0].x = this.b$['com.falstad.EMWave1Frame'].windowOffsetX + 1;
this.b$['com.falstad.EMWave1Frame'].sources[2].x = this.b$['com.falstad.EMWave1Frame'].sources[3].x = this.b$['com.falstad.EMWave1Frame'].windowOffsetX;
this.b$['com.falstad.EMWave1Frame'].sources[2].y = this.b$['com.falstad.EMWave1Frame'].windowOffsetY + 1;
this.b$['com.falstad.EMWave1Frame'].sources[3].y = this.b$['com.falstad.EMWave1Frame'].windowOffsetY + this.b$['com.falstad.EMWave1Frame'].windowHeight - 1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[3]||(I$[3]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').ConductReflectSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "ConductReflectSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Reflection At Conductor";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(7);
this.b$['com.falstad.EMWave1Frame'].addCondMedium$D(1);
this.b$['com.falstad.EMWave1Frame'].setForceBar$I(4);
this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(1600);
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.EMWave1Frame'].setSources();
this.b$['com.falstad.EMWave1Frame'].sources[0].x = (this.b$['com.falstad.EMWave1Frame'].gridSizeX/2|0) - 1;
this.b$['com.falstad.EMWave1Frame'].sources[1].x = (this.b$['com.falstad.EMWave1Frame'].gridSizeX/2|0) + 1;
this.b$['com.falstad.EMWave1Frame'].sources[0].y = this.b$['com.falstad.EMWave1Frame'].windowOffsetY;
this.b$['com.falstad.EMWave1Frame'].sources[1].y = this.b$['com.falstad.EMWave1Frame'].windowOffsetY + 2;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[4]||(I$[4]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').OscDipoleSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "OscDipoleSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Oscillating Dipole";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].setForceBar$I(10);
this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(1066);
this.b$['com.falstad.EMWave1Frame'].EBrightnessBar.setValue$I(300);
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(1);
this.b$['com.falstad.EMWave1Frame'].setSources();
var cx = (this.b$['com.falstad.EMWave1Frame'].gridSizeX/2|0);
var cy = (this.b$['com.falstad.EMWave1Frame'].gridSizeY/2|0);
this.b$['com.falstad.EMWave1Frame'].sources[0].x = this.b$['com.falstad.EMWave1Frame'].sources[1].x = cx;
this.b$['com.falstad.EMWave1Frame'].sources[0].y = cy - 1;
this.b$['com.falstad.EMWave1Frame'].sources[1].y = cy + 1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[5]||(I$[5]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').HalfWaveAnt1Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "HalfWaveAnt1Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Half Wave Antenna";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].setForceBar$I(10);
this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(390);
this.b$['com.falstad.EMWave1Frame'].EBrightnessBar.setValue$I(350);
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(4);
this.b$['com.falstad.EMWave1Frame'].setSources();
var cx = (this.b$['com.falstad.EMWave1Frame'].gridSizeX/2|0);
var cy = (this.b$['com.falstad.EMWave1Frame'].gridSizeY/2|0);
this.b$['com.falstad.EMWave1Frame'].sources[0].x = this.b$['com.falstad.EMWave1Frame'].sources[1].x = cx;
this.b$['com.falstad.EMWave1Frame'].sources[0].y = cy + 7;
this.b$['com.falstad.EMWave1Frame'].sources[1].y = cy - 7;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[6]||(I$[6]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').FullWaveAnt1Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "FullWaveAnt1Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Full Wave Ant (End-Driven)";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].setForceBar$I(25);
this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(390);
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(4);
this.b$['com.falstad.EMWave1Frame'].setSources();
var cx = (this.b$['com.falstad.EMWave1Frame'].gridSizeX/2|0);
var cy = (this.b$['com.falstad.EMWave1Frame'].gridSizeY/2|0);
this.b$['com.falstad.EMWave1Frame'].sources[0].x = this.b$['com.falstad.EMWave1Frame'].sources[1].x = cx;
this.b$['com.falstad.EMWave1Frame'].sources[0].y = cy + 6;
this.b$['com.falstad.EMWave1Frame'].sources[1].y = cy - 5;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[7]||(I$[7]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').FullWaveAnt2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "FullWaveAnt2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Full Wave Ant (Center-Driven)";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].setForceBar$I(25);
this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(390);
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(5);
this.b$['com.falstad.EMWave1Frame'].setSources();
var cx = (this.b$['com.falstad.EMWave1Frame'].gridSizeX/2|0);
var cy = (this.b$['com.falstad.EMWave1Frame'].gridSizeY/2|0);
this.b$['com.falstad.EMWave1Frame'].sources[0].x = this.b$['com.falstad.EMWave1Frame'].sources[1].x = cx;
this.b$['com.falstad.EMWave1Frame'].sources[2].x = this.b$['com.falstad.EMWave1Frame'].sources[3].x = cx;
this.b$['com.falstad.EMWave1Frame'].sources[0].y = cy + 1;
this.b$['com.falstad.EMWave1Frame'].sources[1].y = cy + 6;
this.b$['com.falstad.EMWave1Frame'].sources[2].y = cy;
this.b$['com.falstad.EMWave1Frame'].sources[3].y = cy - 5;
this.b$['com.falstad.EMWave1Frame'].auxBar.setValue$I(40);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[8]||(I$[8]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').OscCurrentLoop))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "OscCurrentLoop", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Current Loop";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(6);
this.b$['com.falstad.EMWave1Frame'].setSources();
this.b$['com.falstad.EMWave1Frame'].sources[0].x = (this.b$['com.falstad.EMWave1Frame'].gridSizeX/2|0) - 1;
this.b$['com.falstad.EMWave1Frame'].sources[0].y = (this.b$['com.falstad.EMWave1Frame'].gridSizeY/2|0) - 1;
this.b$['com.falstad.EMWave1Frame'].sources[1].x = (this.b$['com.falstad.EMWave1Frame'].gridSizeX/2|0) + 1;
this.b$['com.falstad.EMWave1Frame'].sources[1].y = (this.b$['com.falstad.EMWave1Frame'].gridSizeY/2|0) + 1;
this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(270);
this.b$['com.falstad.EMWave1Frame'].setForceBar$I(34);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[9]||(I$[9]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').BigMode01Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "BigMode01Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Big TE01 Mode";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(0);
var i;
var n = (this.b$['com.falstad.EMWave1Frame'].windowWidth * 3/4|0);
var x = this.b$['com.falstad.EMWave1Frame'].windowOffsetX + (this.b$['com.falstad.EMWave1Frame'].windowWidth/2|0) - (n/2|0);
var y = this.b$['com.falstad.EMWave1Frame'].windowOffsetY + (this.b$['com.falstad.EMWave1Frame'].windowHeight/2|0) - (n/2|0);
for (i = 1; i != 4; i++) this.b$['com.falstad.EMWave1Frame'].conductDrawRect$I$I$I$I$D(x - i, y - i, x + n + i  - 1, y + n + i  - 1, 1);

this.b$['com.falstad.EMWave1Frame'].setupMode$I$I$I$I$I$I(x, y, n, n, 0, 1);
this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(200);
this.b$['com.falstad.EMWave1Frame'].EBrightnessBar.setValue$I(400);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[10]||(I$[10]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').BigMode10Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "BigMode10Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Big TE10 Mode";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(0);
var i;
var n = (this.b$['com.falstad.EMWave1Frame'].windowWidth * 3/4|0);
var x = this.b$['com.falstad.EMWave1Frame'].windowOffsetX + (this.b$['com.falstad.EMWave1Frame'].windowWidth/2|0) - (n/2|0);
var y = this.b$['com.falstad.EMWave1Frame'].windowOffsetY + (this.b$['com.falstad.EMWave1Frame'].windowHeight/2|0) - (n/2|0);
for (i = 1; i != 4; i++) this.b$['com.falstad.EMWave1Frame'].conductDrawRect$I$I$I$I$D(x - i, y - i, x + n + i  - 1, y + n + i  - 1, 1);

this.b$['com.falstad.EMWave1Frame'].setupMode$I$I$I$I$I$I(x, y, n, n, 1, 0);
this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(200);
this.b$['com.falstad.EMWave1Frame'].EBrightnessBar.setValue$I(400);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').BigMode1001Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "BigMode1001Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Big TE10+TE01 Mode";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(0);
var i;
var n = (this.b$['com.falstad.EMWave1Frame'].windowWidth * 3/4|0);
var x = this.b$['com.falstad.EMWave1Frame'].windowOffsetX + (this.b$['com.falstad.EMWave1Frame'].windowWidth/2|0) - (n/2|0);
var y = this.b$['com.falstad.EMWave1Frame'].windowOffsetY + (this.b$['com.falstad.EMWave1Frame'].windowHeight/2|0) - (n/2|0);
for (i = 1; i != 4; i++) this.b$['com.falstad.EMWave1Frame'].conductDrawRect$I$I$I$I$D(x - i, y - i, x + n + i  - 1, y + n + i  - 1, 1);

this.b$['com.falstad.EMWave1Frame'].setupMode$I$I$I$I$I$I(x, y, n, n, 1, 0);
this.b$['com.falstad.EMWave1Frame'].addMode$I$I$I$I$I$I(x, y, n, n, 0, 1);
this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(200);
this.b$['com.falstad.EMWave1Frame'].EBrightnessBar.setValue$I(250);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').BigMode1001iSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "BigMode1001iSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Big TE10+TE01i Mode";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(0);
var i;
var n = (this.b$['com.falstad.EMWave1Frame'].windowWidth * 3/4|0);
var x = this.b$['com.falstad.EMWave1Frame'].windowOffsetX + (this.b$['com.falstad.EMWave1Frame'].windowWidth/2|0) - (n/2|0);
var y = this.b$['com.falstad.EMWave1Frame'].windowOffsetY + (this.b$['com.falstad.EMWave1Frame'].windowHeight/2|0) - (n/2|0);
for (i = 1; i != 4; i++) this.b$['com.falstad.EMWave1Frame'].conductDrawRect$I$I$I$I$D(x - i, y - i, x + n + i  - 1, y + n + i  - 1, 1);

this.b$['com.falstad.EMWave1Frame'].setupMode$I$I$I$I$I$I(x, y, n, n, 1, 0);
this.b$['com.falstad.EMWave1Frame'].addModeI$I$I$I$I$I$I(x, y, n, n, 0, 1);
this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(200);
this.b$['com.falstad.EMWave1Frame'].EBrightnessBar.setValue$I(250);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[13]||(I$[13]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').BigMode2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "BigMode2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Big TE11 Mode";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(0);
var i;
var n = (this.b$['com.falstad.EMWave1Frame'].windowWidth * 3/4|0);
var x = this.b$['com.falstad.EMWave1Frame'].windowOffsetX + (this.b$['com.falstad.EMWave1Frame'].windowWidth/2|0) - (n/2|0);
var y = this.b$['com.falstad.EMWave1Frame'].windowOffsetY + (this.b$['com.falstad.EMWave1Frame'].windowHeight/2|0) - (n/2|0);
for (i = 1; i != 4; i++) this.b$['com.falstad.EMWave1Frame'].conductDrawRect$I$I$I$I$D(x - i, y - i, x + n + i  - 1, y + n + i  - 1, 1);

this.b$['com.falstad.EMWave1Frame'].setupMode$I$I$I$I$I$I(x, y, n, n, 1, 1);
this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(200);
this.b$['com.falstad.EMWave1Frame'].EBrightnessBar.setValue$I(300);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[14]||(I$[14]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').OneByOneModesSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "OneByOneModesSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "TE10 Modes";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(0);
var i;
var j;
var y = 1;
var ny = 5;
while (y + ny < this.b$['com.falstad.EMWave1Frame'].windowHeight){
var nx = (((y + ny) * (this.b$['com.falstad.EMWave1Frame'].windowWidth - 8)/this.b$['com.falstad.EMWave1Frame'].windowHeight|0)) + 6;
var y1 = y + this.b$['com.falstad.EMWave1Frame'].windowOffsetY;
var x1 = this.b$['com.falstad.EMWave1Frame'].windowOffsetX + 1;
this.b$['com.falstad.EMWave1Frame'].conductDrawRect$I$I$I$I$D(x1 - 1, y1 - 1, x1 + nx, y1 + ny, 1);
this.b$['com.falstad.EMWave1Frame'].setupMode$I$I$I$I$I$I(x1, y1, nx, ny, 1, 0);
y = y+(ny + 2);
}
this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(250);
this.b$['com.falstad.EMWave1Frame'].EBrightnessBar.setValue$I(300);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[15]||(I$[15]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').NByZeroModesSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "NByZeroModesSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "TEn0 Modes";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(0);
var i;
var j;
var y = 1;
var ny = 6;
var nx = this.b$['com.falstad.EMWave1Frame'].windowWidth - 2;
var mode = 1;
while (y + ny < this.b$['com.falstad.EMWave1Frame'].windowHeight){
var y1 = y + this.b$['com.falstad.EMWave1Frame'].windowOffsetY;
var x1 = this.b$['com.falstad.EMWave1Frame'].windowOffsetX + 1;
this.b$['com.falstad.EMWave1Frame'].conductDrawRect$I$I$I$I$D(x1 - 1, y1 - 1, x1 + nx, y1 + ny, 1);
this.b$['com.falstad.EMWave1Frame'].setupMode$I$I$I$I$I$I(x1, y1, nx, ny, mode, 0);
y = y+(ny + 2);
mode++;
}
this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(200);
this.b$['com.falstad.EMWave1Frame'].EBrightnessBar.setValue$I(128);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[16]||(I$[16]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').NByOneModesSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "NByOneModesSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "TEn1 Modes";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(0);
var i;
var j;
var y = 1;
var ny = 10;
var nx = this.b$['com.falstad.EMWave1Frame'].windowWidth - 2;
var mode = 1;
while (y + ny < this.b$['com.falstad.EMWave1Frame'].windowHeight){
var y1 = y + this.b$['com.falstad.EMWave1Frame'].windowOffsetY;
var x1 = this.b$['com.falstad.EMWave1Frame'].windowOffsetX + 1;
this.b$['com.falstad.EMWave1Frame'].conductDrawRect$I$I$I$I$D(x1 - 1, y1 - 1, x1 + nx, y1 + ny, 1);
this.b$['com.falstad.EMWave1Frame'].setupMode$I$I$I$I$I$I(x1, y1, nx, ny, mode, 1);
y = y+(ny + 2);
mode++;
}
this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(150);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[17]||(I$[17]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').NByNModesSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "NByNModesSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "TEnn Modes";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(0);
var i;
var j;
var y = 1;
var modex;
var modey;
var maxmode = 3;
if (this.b$['com.falstad.EMWave1Frame'].resBar.getValue() >= 70) maxmode++;
if (this.b$['com.falstad.EMWave1Frame'].resBar.getValue() >= 100) maxmode++;
var ny = (this.b$['com.falstad.EMWave1Frame'].windowHeight/maxmode|0) - 2;
var nx = (this.b$['com.falstad.EMWave1Frame'].windowWidth/maxmode|0) - 2;
for (modex = 1; modex <= maxmode; modex++) for (modey = 1; modey <= maxmode; modey++) {
if (modex == 1 && modey == 1 ) continue;
var x1 = this.b$['com.falstad.EMWave1Frame'].windowOffsetX + 1 + (ny + 2) * (modey - 1) ;
var y1 = this.b$['com.falstad.EMWave1Frame'].windowOffsetY + 1 + (nx + 2) * (modex - 1) ;
this.b$['com.falstad.EMWave1Frame'].conductDrawRect$I$I$I$I$D(x1 - 1, y1 - 1, x1 + nx, y1 + ny, 1);
this.b$['com.falstad.EMWave1Frame'].setupMode$I$I$I$I$I$I(x1, y1, nx, ny, modex - 1, modey - 1);
}

this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(300);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').ZeroByNModeCombosSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "ZeroByNModeCombosSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "TEn0 Mode Combos";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(0);
var i;
var j;
var y = 1;
var ny = 8;
var nx = this.b$['com.falstad.EMWave1Frame'].windowWidth - 2;
while (y + ny < this.b$['com.falstad.EMWave1Frame'].windowHeight){
var mode1 = this.b$['com.falstad.EMWave1Frame'].getrand$I(8) + 1;
var mode2;
do mode2 = this.b$['com.falstad.EMWave1Frame'].getrand$I(8) + 1;
 while (mode1 == mode2);
var y1 = y + this.b$['com.falstad.EMWave1Frame'].windowOffsetY;
var x1 = this.b$['com.falstad.EMWave1Frame'].windowOffsetX + 1;
this.b$['com.falstad.EMWave1Frame'].conductDrawRect$I$I$I$I$D(x1 - 1, y1 - 1, x1 + nx, y1 + ny, 1);
var my = (Clazz.instanceOf(this, "com.falstad.EMWave1Frame.ZeroByNModeCombosSetup")) ? 0 : 1;
for (i = 0; i != nx; i++) for (j = 0; j != ny; j++) {
this.b$['com.falstad.EMWave1Frame'].grid[i + x1 + this.b$['com.falstad.EMWave1Frame'].gw * (j + y1) ].az = 2.0 * (Math.cos(mode1 * 3.141592653589793 * i  / (nx - 1)) * Math.cos(3.141592653589793 * my * j  / (ny - 1)) * 0.5  + Math.cos(mode2 * 3.141592653589793 * i  / (nx - 1)) * Math.cos(3.141592653589793 * my * j  / (ny - 1)) * 0.5 );
this.b$['com.falstad.EMWave1Frame'].grid[i + x1 + this.b$['com.falstad.EMWave1Frame'].gw * (j + y1) ].dazdt = 0;
}

y = y+(ny + 2);
}
this.b$['com.falstad.EMWave1Frame'].noFilter();
this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(310);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[19]||(I$[19]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').OneByNModeCombosSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "OneByNModeCombosSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.ZeroByNModeCombosSetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "TEn1 Mode Combos";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[20]||(I$[20]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').NByNModeCombosSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "NByNModeCombosSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "TEnn Mode Combos";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(0);
var i;
var j;
var y = 1;
var maxmode = 2;
if (this.b$['com.falstad.EMWave1Frame'].resBar.getValue() >= 70) maxmode++;
if (this.b$['com.falstad.EMWave1Frame'].resBar.getValue() >= 100) maxmode++;
var ny = (this.b$['com.falstad.EMWave1Frame'].windowHeight/maxmode|0) - 2;
var nx = (this.b$['com.falstad.EMWave1Frame'].windowWidth/maxmode|0) - 2;
var gx;
var gy;
for (gx = 1; gx <= maxmode; gx++) for (gy = 1; gy <= maxmode; gy++) {
var mode1x = this.b$['com.falstad.EMWave1Frame'].getrand$I(4);
var mode1y = this.b$['com.falstad.EMWave1Frame'].getrand$I(4) + 1;
var mode2x;
var mode2y;
do {
mode2x = this.b$['com.falstad.EMWave1Frame'].getrand$I(4) + 1;
mode2y = this.b$['com.falstad.EMWave1Frame'].getrand$I(4);
} while (mode1x == mode2x && mode1y == mode2y );
var x1 = this.b$['com.falstad.EMWave1Frame'].windowOffsetX + 1 + (ny + 2) * (gx - 1) ;
var y1 = this.b$['com.falstad.EMWave1Frame'].windowOffsetY + 1 + (nx + 2) * (gy - 1) ;
this.b$['com.falstad.EMWave1Frame'].conductDrawRect$I$I$I$I$D(x1 - 1, y1 - 1, x1 + nx, y1 + ny, 1);
for (i = 0; i != nx; i++) for (j = 0; j != ny; j++) {
this.b$['com.falstad.EMWave1Frame'].grid[i + x1 + this.b$['com.falstad.EMWave1Frame'].gw * (j + y1) ].az = 2 * (Math.cos(mode1x * 3.141592653589793 * i  / (nx - 1)) * Math.cos(mode1y * 3.141592653589793 * j  / (ny - 1)) * 0.5  + Math.cos(mode2x * 3.141592653589793 * i  / (nx - 1)) * Math.cos(mode2y * 3.141592653589793 * j  / (ny - 1)) * 0.5 );
this.b$['com.falstad.EMWave1Frame'].grid[i + x1 + this.b$['com.falstad.EMWave1Frame'].gw * (j + y1) ].dazdt = 0;
}

}

this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(370);
this.b$['com.falstad.EMWave1Frame'].noFilter();
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[21]||(I$[21]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').Waveguides1Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "Waveguides1Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Waveguides";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(1);
var i;
var j;
var x = 1;
var nx = 5;
var y1 = this.b$['com.falstad.EMWave1Frame'].windowOffsetY + 1;
while (x + nx < this.b$['com.falstad.EMWave1Frame'].windowWidth){
var x1 = x + this.b$['com.falstad.EMWave1Frame'].windowOffsetX;
this.b$['com.falstad.EMWave1Frame'].conductDrawRect$I$I$I$I$D(x1 - 1, y1 - 1, x1 - 1, this.b$['com.falstad.EMWave1Frame'].gridSizeY - 1, 1);
this.b$['com.falstad.EMWave1Frame'].conductDrawRect$I$I$I$I$D(x1 + nx, y1 - 1, x1 + nx, this.b$['com.falstad.EMWave1Frame'].gridSizeY - 1, 1);
nx = nx+(2);
x = x+(nx);
}
this.b$['com.falstad.EMWave1Frame'].conductDrawRect$I$I$I$I$D(x - 1 + this.b$['com.falstad.EMWave1Frame'].windowOffsetX, y1, this.b$['com.falstad.EMWave1Frame'].gridSizeX - 1, y1, 1);
this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(215);
this.b$['com.falstad.EMWave1Frame'].setForceBar$I(28);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[22]||(I$[22]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').CapacitorSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "CapacitorSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Capacitor";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(0);
var i;
var sz = (this.b$['com.falstad.EMWave1Frame'].windowWidth > 45) ? 45 : this.b$['com.falstad.EMWave1Frame'].windowWidth;
var n = (sz * 3/4|0);
var cx = this.b$['com.falstad.EMWave1Frame'].windowOffsetX + (this.b$['com.falstad.EMWave1Frame'].windowWidth/2|0);
var cy = this.b$['com.falstad.EMWave1Frame'].windowOffsetY + (this.b$['com.falstad.EMWave1Frame'].windowHeight/2|0);
var x = cx - (n/2|0);
var y = cy - (n/2|0);
for (i = 1; i != 4; i++) this.b$['com.falstad.EMWave1Frame'].conductDrawRect$I$I$I$I$D(x - i, y - i, x + n + i  - 1, y + n + i  - 1, 1);

this.b$['com.falstad.EMWave1Frame'].setupMode$I$I$I$I$I$I(x, y, n, n, 1, 0);
this.b$['com.falstad.EMWave1Frame'].conductFillRect$I$I$I$I$D(x, y, x + n, y + 4, 1);
this.b$['com.falstad.EMWave1Frame'].conductFillRect$I$I$I$I$D(x, y + n - 4, x + n, y + n - 1, 1);
var sep = 4;
this.b$['com.falstad.EMWave1Frame'].conductFillRect$I$I$I$I$D(cx - 2, y, cx + 2, cy - sep, 1);
this.b$['com.falstad.EMWave1Frame'].conductFillRect$I$I$I$I$D(cx - 2, cy + sep, cx + 2, y + n, 1);
this.b$['com.falstad.EMWave1Frame'].conductFillRect$I$I$I$I$D(cx - 5, cy - (sep + 1), cx + 5, cy - (sep - 1), 1);
this.b$['com.falstad.EMWave1Frame'].conductFillRect$I$I$I$I$D(cx - 5, cy + (sep - 1), cx + 5, cy + (sep + 1), 1);
this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(700);
this.b$['com.falstad.EMWave1Frame'].EBrightnessBar.setValue$I(200);
this.b$['com.falstad.EMWave1Frame'].findMode$I$I$I$I(x, y, x + n, y + n);
this.b$['com.falstad.EMWave1Frame'].noFilter();
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').ResonantCavitiesSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "ResonantCavitiesSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Resonant Cavities";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(1);
var i;
var j;
var x = 1;
var nx = 3;
var y1 = this.b$['com.falstad.EMWave1Frame'].windowOffsetY + 11;
while (x + nx < this.b$['com.falstad.EMWave1Frame'].windowWidth){
var ny = (((x + nx) * (this.b$['com.falstad.EMWave1Frame'].windowHeight - 18)/this.b$['com.falstad.EMWave1Frame'].windowWidth|0)) + 6;
var x1 = x + this.b$['com.falstad.EMWave1Frame'].windowOffsetX;
for (i = 0; i != ny + 2; i++) this.b$['com.falstad.EMWave1Frame'].grid[x1 - 1 + this.b$['com.falstad.EMWave1Frame'].gw * (y1 + i - 1)].conductor = this.b$['com.falstad.EMWave1Frame'].grid[x1 + nx + this.b$['com.falstad.EMWave1Frame'].gw * (y1 + i - 1) ].conductor = true;

for (j = 0; j != nx + 2; j++) this.b$['com.falstad.EMWave1Frame'].grid[x1 + j - 1 + this.b$['com.falstad.EMWave1Frame'].gw * (y1 - 1)].conductor = this.b$['com.falstad.EMWave1Frame'].grid[x1 + j - 1 + this.b$['com.falstad.EMWave1Frame'].gw * (y1 + ny)].conductor = true;

this.b$['com.falstad.EMWave1Frame'].grid[x1 + (nx/2|0) + this.b$['com.falstad.EMWave1Frame'].gw * (y1 - 1)].conductor = false;
x = x+(nx + 2);
}
x--;
for (; x < this.b$['com.falstad.EMWave1Frame'].windowWidth; x++) this.b$['com.falstad.EMWave1Frame'].grid[x + this.b$['com.falstad.EMWave1Frame'].windowOffsetX + this.b$['com.falstad.EMWave1Frame'].gw * (y1 - 1) ].conductor = true;

this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(120);
this.b$['com.falstad.EMWave1Frame'].setForceBar$I(15);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[24]||(I$[24]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').SingleSlitSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "SingleSlitSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Single Slit";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(1);
var x = (this.b$['com.falstad.EMWave1Frame'].gridSizeX/2|0);
var y = this.b$['com.falstad.EMWave1Frame'].windowOffsetY + 4;
this.b$['com.falstad.EMWave1Frame'].conductFillRect$I$I$I$I$D(0, y, this.b$['com.falstad.EMWave1Frame'].gridSizeX - 1, y + 2, 1);
this.b$['com.falstad.EMWave1Frame'].conductFillRect$I$I$I$I$D(x - 7, y, x + 7, y + 2, 0);
this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(275);
this.b$['com.falstad.EMWave1Frame'].setForceBar$I(35);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[25]||(I$[25]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').DoubleSlitSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "DoubleSlitSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Double Slit";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(1);
var x = (this.b$['com.falstad.EMWave1Frame'].gridSizeX/2|0);
var y = this.b$['com.falstad.EMWave1Frame'].windowOffsetY + 4;
this.b$['com.falstad.EMWave1Frame'].conductFillRect$I$I$I$I$D(0, y, this.b$['com.falstad.EMWave1Frame'].gridSizeX - 1, y + 2, 1);
this.b$['com.falstad.EMWave1Frame'].conductFillRect$I$I$I$I$D(x - 7, y, x - 5, y + 2, 0);
this.b$['com.falstad.EMWave1Frame'].conductFillRect$I$I$I$I$D(x + 5, y, x + 7, y + 2, 0);
this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(366);
this.b$['com.falstad.EMWave1Frame'].setForceBar$I(35);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[26]||(I$[26]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').TripleSlitSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "TripleSlitSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Triple Slit";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(1);
var x = (this.b$['com.falstad.EMWave1Frame'].gridSizeX/2|0);
var y = this.b$['com.falstad.EMWave1Frame'].windowOffsetY + 4;
this.b$['com.falstad.EMWave1Frame'].conductFillRect$I$I$I$I$D(0, y, this.b$['com.falstad.EMWave1Frame'].gridSizeX - 1, y + 2, 1);
this.b$['com.falstad.EMWave1Frame'].conductFillRect$I$I$I$I$D(x - 13, y, x - 11, y + 2, 0);
this.b$['com.falstad.EMWave1Frame'].conductFillRect$I$I$I$I$D(x - 1, y, x + 1, y + 2, 0);
this.b$['com.falstad.EMWave1Frame'].conductFillRect$I$I$I$I$D(x + 11, y, x + 13, y + 2, 0);
this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(310);
this.b$['com.falstad.EMWave1Frame'].setForceBar$I(35);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[27]||(I$[27]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').ObstacleSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "ObstacleSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Obstacle";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(1);
var x = (this.b$['com.falstad.EMWave1Frame'].gridSizeX/2|0);
var y = this.b$['com.falstad.EMWave1Frame'].windowOffsetY + 6;
this.b$['com.falstad.EMWave1Frame'].conductFillRect$I$I$I$I$D(x - 7, y, x + 7, y + 2, 1);
this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(400);
this.b$['com.falstad.EMWave1Frame'].setForceBar$I(35);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[28]||(I$[28]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').HalfPlaneSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "HalfPlaneSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Half Plane";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(1);
var x = this.b$['com.falstad.EMWave1Frame'].windowOffsetX + (this.b$['com.falstad.EMWave1Frame'].windowWidth/2|0);
var i;
this.b$['com.falstad.EMWave1Frame'].conductFillRect$I$I$I$I$D(this.b$['com.falstad.EMWave1Frame'].windowOffsetX + (this.b$['com.falstad.EMWave1Frame'].windowWidth * 2/3|0), this.b$['com.falstad.EMWave1Frame'].windowOffsetY + 3, this.b$['com.falstad.EMWave1Frame'].windowOffsetY + this.b$['com.falstad.EMWave1Frame'].windowWidth - 1, this.b$['com.falstad.EMWave1Frame'].windowOffsetY + 5, 1);
this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(250);
this.b$['com.falstad.EMWave1Frame'].setForceBar$I(35);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[29]||(I$[29]=Clazz.load(Clazz.load('com.falstad.EMWave1Frame').LloydsMirrorSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMWave1Frame, "LloydsMirrorSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMWave1Frame','com.falstad.EMWave1Frame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Lloyd\'s Mirror";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMWave1Frame'].sourceChooser.select$I(6);
this.b$['com.falstad.EMWave1Frame'].setSources();
this.b$['com.falstad.EMWave1Frame'].sources[0].x = this.b$['com.falstad.EMWave1Frame'].windowOffsetX;
this.b$['com.falstad.EMWave1Frame'].sources[0].y = this.b$['com.falstad.EMWave1Frame'].windowOffsetY + (this.b$['com.falstad.EMWave1Frame'].windowHeight * 3/4|0) - 1;
this.b$['com.falstad.EMWave1Frame'].sources[1].x = this.b$['com.falstad.EMWave1Frame'].windowOffsetX + 2;
this.b$['com.falstad.EMWave1Frame'].sources[1].y = this.b$['com.falstad.EMWave1Frame'].windowOffsetY + (this.b$['com.falstad.EMWave1Frame'].windowHeight * 3/4|0) + 1;
this.b$['com.falstad.EMWave1Frame'].brightnessBar.setValue$I(250);
this.b$['com.falstad.EMWave1Frame'].setForceBar$I(40);
this.b$['com.falstad.EMWave1Frame'].conductDrawRect$I$I$I$I$D(0, this.b$['com.falstad.EMWave1Frame'].windowOffsetY + this.b$['com.falstad.EMWave1Frame'].windowHeight - 1, this.b$['com.falstad.EMWave1Frame'].gridSizeX - 1, this.b$['com.falstad.EMWave1Frame'].windowOffsetY + this.b$['com.falstad.EMWave1Frame'].windowHeight - 1, 1);
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
//Created 2017-12-17 19:28:04
