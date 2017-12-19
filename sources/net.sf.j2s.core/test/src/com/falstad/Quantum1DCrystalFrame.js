(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "Quantum1DCrystalFrame", function(){
Clazz.newInstance(this, arguments,0,C$);
}, 'a2s.Frame', ['java.awt.event.ComponentListener', 'java.awt.event.ActionListener', 'java.awt.event.MouseMotionListener', 'java.awt.event.MouseListener', 'java.awt.event.ItemListener', 'com.falstad.DecentScrollbarListener']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.engine = null;
this.winSize = null;
this.dbimage = null;
this.random = null;
this.stateCount = 0;
this.elevelCount = 0;
this.maxStateCount = 0;
this.sampleCount = 0;
this.cellSampleCount = 0;
this.potSampleCount = 0;
this.pSampleCount = 0;
this.modes = null;
this.modesLeft = null;
this.dispersion = null;
this.expecte = 0;
this.selectedK = 0;
this.potTrans = null;
this.blochTrans = null;
this.selectedBand = 0;
this.groundButton = null;
this.stoppedCheck = null;
this.eCheckItem = null;
this.xCheckItem = null;
this.pCheckItem = null;
this.blochCheckItem = null;
this.dispersionCheckItem = null;
this.expectCheckItem = null;
this.probCheckItem = null;
this.probPhaseCheckItem = null;
this.reImCheckItem = null;
this.magPhaseCheckItem = null;
this.extendedZonesItem = null;
this.reducedZonesItem = null;
this.repeatedZonesItem = null;
this.waveFunctionMenu = null;
this.zoneMenu = null;
this.exitItem = null;
this.mouseChooser = null;
this.setupChooser = null;
this.setupList = null;
this.setup = null;
this.forceBar = null;
this.speedBar = null;
this.wellCountBar = null;
this.energyScaleBar = null;
this.massBar = null;
this.aux1Bar = null;
this.aux2Bar = null;
this.aux3Bar = null;
this.aux4Bar = null;
this.aux1Label = null;
this.aux2Label = null;
this.aux3Label = null;
this.aux4Label = null;
this.viewPotential = null;
this.viewX = null;
this.viewP = null;
this.viewDispersion = null;
this.viewBloch = null;
this.viewList = null;
this.viewCount = 0;
this.elevels = null;
this.dispmax = null;
this.step = 0;
this.func = null;
this.funci = null;
this.blochr = null;
this.blochi = null;
this.pdata = null;
this.pdatar = null;
this.pdatai = null;
this.pot = null;
this.mass = 0;
this.escale = 0;
this.selectedCoef = 0;
this.selectedPaneHandle = 0;
this.kUpdateState = 0;
this.kUpdateSkip = 0;
this.selection = 0;
this.dragX = 0;
this.dragY = 0;
this.xpoints = null;
this.ypoints = null;
this.dragging = false;
this.startup = false;
this.selectGround = false;
this.levelsChanged = false;
this.stateChanged = false;
this.setupModified = false;
this.t = 0;
this.pause = 0;
this.phaseColors = null;
this.fft = null;
this.cv = null;
this.applet = null;
this.showFormat = null;
this.radioGroup = null;
this.lastTime = 0;
this.stateColSize = 0;
this.stateSize = 0;
this.finished = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.engine = null;
this.maxStateCount = 500;
this.sampleCount = 320;
this.cellSampleCount = 32;
this.potSampleCount = 128;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "Quantum1DCrystal by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'c$$com_falstad_Quantum1DCrystal', function (a) {
C$.superclazz.c$$S.apply(this, ["1-d Quantum Crystal Applet v1.0c"]);
C$.$init$.apply(this);
this.applet = a;
}, 1);

Clazz.newMeth(C$, 'init', function () {
this.startup = true;
this.xpoints = Clazz.array(Integer.TYPE, [5]);
this.ypoints = Clazz.array(Integer.TYPE, [5]);
this.setupList = Clazz.new_((I$[9]||(I$[9]=Clazz.load('java.util.Vector'))));
var s = Clazz.new_((I$[10]||(I$[10]=Clazz.load(Clazz.load('com.falstad.Quantum1DCrystalFrame').FiniteWellSetup))), [this, null]);
while (s != null ){
this.setupList.addElement$TE(s);
s = s.createNext();
}
this.selectedCoef = -1;
this.setLayout$java_awt_LayoutManager(Clazz.new_((I$[11]||(I$[11]=Clazz.load('com.falstad.Quantum1DCrystalLayout')))));
this.cv = Clazz.new_((I$[12]||(I$[12]=Clazz.load('com.falstad.Quantum1DCrystalCanvas'))).c$$com_falstad_Quantum1DCrystalFrame,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
this.add$java_awt_Component(this.cv);
var mb = Clazz.new_((I$[13]||(I$[13]=Clazz.load('a2s.MenuBar'))));
var m = Clazz.new_((I$[14]||(I$[14]=Clazz.load('a2s.Menu'))).c$$S,["File"]);
mb.add$javax_swing_JMenu(m);
m.add$javax_swing_JMenuItem(this.exitItem = this.getMenuItem$S("Exit"));
m = Clazz.new_((I$[14]||(I$[14]=Clazz.load('a2s.Menu'))).c$$S,["View"]);
mb.add$javax_swing_JMenu(m);
m.add$javax_swing_JMenuItem(this.eCheckItem = this.getCheckItem$S("Energy"));
this.eCheckItem.setState$Z(true);
m.add$javax_swing_JMenuItem(this.xCheckItem = this.getCheckItem$S("Position"));
this.xCheckItem.setState$Z(true);
m.add$javax_swing_JMenuItem(this.pCheckItem = this.getCheckItem$S("Momentum"));
m.add$javax_swing_JMenuItem(this.blochCheckItem = this.getCheckItem$S("Bloch Function"));
m.add$javax_swing_JMenuItem(this.dispersionCheckItem = this.getCheckItem$S("Dispersion"));
this.dispersionCheckItem.setState$Z(true);
m.addSeparator();
var m2 = this.waveFunctionMenu = Clazz.new_((I$[14]||(I$[14]=Clazz.load('a2s.Menu'))).c$$S,["Wave Function"]);
m.add$javax_swing_JMenuItem(m2);
m2.add$javax_swing_JMenuItem(this.probCheckItem = this.getRadioItem$S("Probability"));
m2.add$javax_swing_JMenuItem(this.probPhaseCheckItem = this.getRadioItem$S("Probability + Phase"));
this.probPhaseCheckItem.setSelected$Z(true);
m2.add$javax_swing_JMenuItem(this.reImCheckItem = this.getRadioItem$S("Real + Imaginary Parts"));
m2.add$javax_swing_JMenuItem(this.magPhaseCheckItem = this.getRadioItem$S("Magnitude + Phase"));
this.radioGroup = null;
m = this.zoneMenu = Clazz.new_((I$[14]||(I$[14]=Clazz.load('a2s.Menu'))).c$$S,["Zones"]);
mb.add$javax_swing_JMenu(m);
m.add$javax_swing_JMenuItem(this.extendedZonesItem = this.getRadioItem$S("Extended Zone Scheme"));
m.add$javax_swing_JMenuItem(this.reducedZonesItem = this.getRadioItem$S("Reduced Zone Scheme"));
this.reducedZonesItem.setSelected$Z(true);
m.add$javax_swing_JMenuItem(this.repeatedZonesItem = this.getRadioItem$S("Repeated Zone Scheme"));
this.setMenuBar$a2s_MenuBar(mb);
this.setupChooser = Clazz.new_((I$[15]||(I$[15]=Clazz.load('a2s.Choice'))));
var i;
for (i = 0; i != this.setupList.size(); i++) this.setupChooser.add$S("Setup: " + (this.setupList.elementAt$I(i)).getName());

this.setup = this.setupList.elementAt$I(0);
this.setupChooser.addItemListener$java_awt_event_ItemListener(this);
this.add$java_awt_Component(this.setupChooser);
this.mouseChooser = Clazz.new_((I$[15]||(I$[15]=Clazz.load('a2s.Choice'))));
this.mouseChooser.add$S("Mouse = Set Eigenstate");
this.mouseChooser.add$S("Mouse = Edit Function");
this.mouseChooser.addItemListener$java_awt_event_ItemListener(this);
this.add$java_awt_Component(this.mouseChooser);
this.mouseChooser.select$I(0);
this.add$java_awt_Component(this.groundButton = Clazz.new_((I$[16]||(I$[16]=Clazz.load('a2s.Button'))).c$$S,["Ground State"]));
this.groundButton.addActionListener$java_awt_event_ActionListener(this);
this.stoppedCheck = Clazz.new_((I$[17]||(I$[17]=Clazz.load('a2s.Checkbox'))).c$$S,["Stopped"]);
this.stoppedCheck.addItemListener$java_awt_event_ItemListener(this);
this.add$java_awt_Component(this.stoppedCheck);
this.add$java_awt_Component(Clazz.new_((I$[18]||(I$[18]=Clazz.load('a2s.Label'))).c$$S$I,["Simulation Speed", 0]));
this.add$java_awt_Component(this.speedBar = Clazz.new_((I$[19]||(I$[19]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 50, 1, 150]));
this.add$java_awt_Component(Clazz.new_((I$[18]||(I$[18]=Clazz.load('a2s.Label'))).c$$S$I,["Particle Mass", 0]));
this.add$java_awt_Component(this.massBar = Clazz.new_((I$[19]||(I$[19]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 100, 10, 500]));
this.add$java_awt_Component(Clazz.new_((I$[18]||(I$[18]=Clazz.load('a2s.Label'))).c$$S$I,["# of Wells Shown", 0]));
this.add$java_awt_Component(this.wellCountBar = Clazz.new_((I$[19]||(I$[19]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 5, 1, 50]));
this.add$java_awt_Component(Clazz.new_((I$[18]||(I$[18]=Clazz.load('a2s.Label'))).c$$S$I,["Energy Scale", 0]));
this.add$java_awt_Component(this.energyScaleBar = Clazz.new_((I$[19]||(I$[19]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 99, 1, 100]));
this.add$java_awt_Component(this.aux1Label = Clazz.new_((I$[18]||(I$[18]=Clazz.load('a2s.Label'))).c$$S$I,["Aux 1", 0]));
this.add$java_awt_Component(this.aux1Bar = Clazz.new_((I$[19]||(I$[19]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 50, 1, 100]));
this.add$java_awt_Component(this.aux2Label = Clazz.new_((I$[18]||(I$[18]=Clazz.load('a2s.Label'))).c$$S$I,["Aux 2", 0]));
this.add$java_awt_Component(this.aux2Bar = Clazz.new_((I$[19]||(I$[19]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 50, 1, 100]));
this.add$java_awt_Component(this.aux3Label = Clazz.new_((I$[18]||(I$[18]=Clazz.load('a2s.Label'))).c$$S$I,["Aux 3", 0]));
this.add$java_awt_Component(this.aux3Bar = Clazz.new_((I$[19]||(I$[19]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 50, 1, 100]));
this.add$java_awt_Component(this.aux4Label = Clazz.new_((I$[18]||(I$[18]=Clazz.load('a2s.Label'))).c$$S$I,["Aux 4", 0]));
this.add$java_awt_Component(this.aux4Bar = Clazz.new_((I$[19]||(I$[19]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 50, 1, 100]));
try {
var param = this.applet.getParameter$S("PAUSE");
if (param != null ) this.pause = Integer.parseInt(param);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
this.dispmax = Clazz.array(Double.TYPE, [this.maxStateCount]);
this.setResolution();
this.phaseColors = Clazz.array((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))), [481]);
for (i = 0; i != 480; i++) {
var pm = 80;
var a1 = i % pm;
var a2 = (a1 * 255/pm|0);
var a3 = 255 - a2;
var c = null;
switch ((i/pm|0)) {
case 0:
c = Clazz.new_((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).c$$I$I$I,[255, a2, 0]);
break;
case 1:
c = Clazz.new_((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).c$$I$I$I,[a3, 255, 0]);
break;
case 2:
c = Clazz.new_((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).c$$I$I$I,[0, 255, a2]);
break;
case 3:
c = Clazz.new_((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).c$$I$I$I,[0, a3, 255]);
break;
case 4:
c = Clazz.new_((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).c$$I$I$I,[a2, 0, 255]);
break;
case 5:
c = Clazz.new_((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).c$$I$I$I,[255, 0, a3]);
break;
}
this.phaseColors[i] = c;
}
this.phaseColors[480] = this.phaseColors[0];
this.random = Clazz.new_((I$[20]||(I$[20]=Clazz.load('java.util.Random'))));
this.reinit();
this.cv.setBackground$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).lightGray);
this.showFormat = (I$[21]||(I$[21]=Clazz.load('java.text.NumberFormat'))).getInstance();
this.showFormat.setMaximumFractionDigits$I(2);
this.resize$I$I(750, 600);
this.handleResize();
var x = this.getSize();
var screen = this.getToolkit().getScreenSize();
this.setLocation$I$I(((screen.width - x.width)/2|0), ((screen.height - x.height)/2|0));
this.show();
this.finished = true;
});

Clazz.newMeth(C$, 'getMenuItem$S', function (s) {
var mi = Clazz.new_((I$[22]||(I$[22]=Clazz.load('a2s.MenuItem'))).c$$S,[s]);
mi.addActionListener$java_awt_event_ActionListener(this);
return mi;
});

Clazz.newMeth(C$, 'getCheckItem$S', function (s) {
var mi = Clazz.new_((I$[23]||(I$[23]=Clazz.load('a2s.CheckboxMenuItem'))).c$$S,[s]);
mi.addItemListener$java_awt_event_ItemListener(this);
return mi;
});

Clazz.newMeth(C$, 'getRadioItem$S', function (s) {
if (this.radioGroup == null ) this.radioGroup = Clazz.new_((I$[24]||(I$[24]=Clazz.load('javax.swing.ButtonGroup'))));
var mi = Clazz.new_((I$[25]||(I$[25]=Clazz.load('javax.swing.JRadioButtonMenuItem'))).c$$S,[s]);
mi.addItemListener$java_awt_event_ItemListener(this);
this.radioGroup.add$javax_swing_AbstractButton(mi);
return mi;
});

Clazz.newMeth(C$, 'reinit', function () {
this.doSetup();
});

Clazz.newMeth(C$, 'handleResize', function () {
var d = this.winSize = this.cv.getSize();
if (this.winSize.width == 0) return;
var tpad = 20;
var potsize = (this.viewPotential == null ) ? 0 : this.viewPotential.height + tpad;
var dispsize = (this.viewDispersion == null ) ? 0 : this.viewDispersion.height + tpad;
this.viewX = this.viewP = this.viewDispersion = this.viewPotential = this.viewBloch = null;
this.viewList = Clazz.array((I$[26]||(I$[26]=Clazz.load(Clazz.load('com.falstad.Quantum1DCrystalFrame').View))), [20]);
var i = 0;
if (this.eCheckItem.getState()) this.viewList[i++] = this.viewPotential = Clazz.new_((I$[26]||(I$[26]=Clazz.load(Clazz.load('com.falstad.Quantum1DCrystalFrame').View))), [this, null]);
if (this.xCheckItem.getState()) this.viewList[i++] = this.viewX = Clazz.new_((I$[26]||(I$[26]=Clazz.load(Clazz.load('com.falstad.Quantum1DCrystalFrame').View))), [this, null]);
if (this.blochCheckItem.getState()) this.viewList[i++] = this.viewBloch = Clazz.new_((I$[26]||(I$[26]=Clazz.load(Clazz.load('com.falstad.Quantum1DCrystalFrame').View))), [this, null]);
if (this.pCheckItem.getState()) this.viewList[i++] = this.viewP = Clazz.new_((I$[26]||(I$[26]=Clazz.load(Clazz.load('com.falstad.Quantum1DCrystalFrame').View))), [this, null]);
if (this.dispersionCheckItem.getState()) this.viewList[i++] = this.viewDispersion = Clazz.new_((I$[26]||(I$[26]=Clazz.load(Clazz.load('com.falstad.Quantum1DCrystalFrame').View))), [this, null]);
this.viewCount = i;
var sizenum = this.viewCount;
var toth = this.winSize.height;
if (potsize > 0 && this.viewPotential != null  ) {
sizenum--;
toth = toth-(potsize);
}if (dispsize > 0 && this.viewDispersion != null  ) {
sizenum--;
toth = toth-(dispsize);
}var cury = 0;
for (i = 0; i != this.viewCount; i++) {
var v = this.viewList[i];
var h = (toth/sizenum|0);
if (v === this.viewPotential  && potsize > 0 ) h = potsize;
 else if (v === this.viewDispersion  && dispsize > 0 ) h = dispsize;
v.x = 0;
v.width = this.winSize.width;
v.y = cury + tpad;
v.height = h - tpad;
v.handle = cury;
cury = cury+(h);
}
this.setGraphLines();
this.dbimage = this.createImage$I$I(d.width, d.height);
});

Clazz.newMeth(C$, 'setGraphLines', function () {
var i;
for (i = 0; i != this.viewCount; i++) {
var v = this.viewList[i];
v.mid_y = v.y + (v.height/2|0);
v.ymult = 0.9 * v.height / 2;
v.lower_y = ((v.mid_y + v.ymult)|0);
v.ymult2 = v.ymult * 2;
}
});

Clazz.newMeth(C$, 'doGround', function () {
this.select$D$I(0, 0);
});

Clazz.newMeth(C$, 'doBlank', function () {
this.t = 0;
if (this.winSize != null  && this.winSize.width > 0 ) this.dbimage = this.createImage$I$I(this.winSize.width, this.winSize.height);
});

Clazz.newMeth(C$, 'centerString$java_awt_Graphics$S$I', function (g, s, y) {
var fm = g.getFontMetrics();
g.drawString$S$I$I(s, ((this.winSize.width - fm.stringWidth$S(s))/2|0), y);
});

Clazz.newMeth(C$, 'updateQuantum1DCrystal$java_awt_Graphics', function (realg) {
if (this.winSize == null  || this.winSize.width == 0 ) return;
var g = this.dbimage.getGraphics();
var allQuiet = true;
var tadd = 0;
if (!this.stoppedCheck.getState() && !this.dragging ) {
var val = this.speedBar.getValue();
tadd = Math.exp(val / 20.0) * 0.02;
var sysTime = System.currentTimeMillis();
if (this.lastTime == 0) this.lastTime = sysTime;
tadd *= (sysTime - this.lastTime) * 0.058823529411764705;
this.lastTime = sysTime;
allQuiet = false;
} else this.lastTime = 0;
var gray1 = Clazz.new_((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).c$$I$I$I,[76, 76, 76]);
var gray2 = Clazz.new_((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).c$$I$I$I,[127, 127, 127]);
g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(0, 0, this.winSize.width, this.winSize.height);
g.setColor$java_awt_Color(this.cv.getForeground());
var i;
var ox = -1;
var oy = -1;
for (i = 1; i != this.viewCount; i++) {
g.setColor$java_awt_Color(i == this.selectedPaneHandle ? (I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).yellow : (I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).gray);
g.drawLine$I$I$I$I(0, this.viewList[i].handle, this.winSize.width, this.viewList[i].handle);
}
if (this.levelsChanged || this.stateChanged ) {
this.cv.setCursor$java_awt_Cursor((I$[27]||(I$[27]=Clazz.load('java.awt.Cursor'))).getPredefinedCursor$I(3));
if (this.levelsChanged) this.genStates();
 else this.getBands$Z$D$I(true, this.selectedK, this.selectedBand);
this.cv.setCursor$java_awt_Cursor(null);
this.levelsChanged = this.stateChanged = false;
} else {
var tm = System.currentTimeMillis();
while (this.updateK() && System.currentTimeMillis() < tm + 50 );
}ox = -1;
var j;
if (this.viewPotential != null ) {
var mid_y = this.viewPotential.mid_y;
var ymult = this.viewPotential.ymult;
g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).gray);
for (i = 0; i < this.elevelCount; i = i+(2)) {
g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).darkGray);
var dy2 = this.elevels[i];
var dy1 = this.elevels[i + 1];
var y1 = this.getEnergyY$D$com_falstad_Quantum1DCrystalFrame_View(dy1, this.viewPotential);
var y2 = this.getEnergyY$D$com_falstad_Quantum1DCrystalFrame_View(dy2, this.viewPotential);
y2 = y2-(y1);
if (y2 <= 0) y2 = 1;
g.fillRect$I$I$I$I(0, y1, this.winSize.width, y2);
}
g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).white);
var wc = this.wellCountBar.getValue();
var step = this.winSize.width / (this.potSampleCount * wc);
for (i = 0; i != this.potSampleCount * wc; i++) {
var x = ((step * i)|0);
var dy = this.pot[i & (this.potSampleCount - 1)];
var y = this.getEnergyY$D$com_falstad_Quantum1DCrystalFrame_View(dy, this.viewPotential);
if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
ox = x;
oy = y;
}
var y = this.getEnergyY$D$com_falstad_Quantum1DCrystalFrame_View(this.expecte, this.viewPotential);
g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).red);
g.drawLine$I$I$I$I(0, y, this.winSize.width, y);
}ox = -1;
g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).white);
var maxf = 0;
for (i = 0; i != this.sampleCount; i++) {
var x = (this.winSize.width * i/this.sampleCount|0);
var dr = this.func[i];
var di = this.funci[i];
var dy = dr * dr + di * di;
if (dy > maxf ) maxf = dy;
}
var speed = (this.expecte + 1) * tadd;
var efr = Math.cos(speed);
var efi = -Math.sin(speed);
for (i = 0; i != this.sampleCount; i++) {
var fr = this.func[i];
var fi = this.funci[i];
this.func[i] = fr * efr - fi * efi;
this.funci[i] = fr * efi + fi * efr;
fr = this.blochr[i];
fi = this.blochi[i];
this.blochr[i] = fr * efr - fi * efi;
this.blochi[i] = fr * efi + fi * efr;
}
if (this.viewX != null ) {
this.viewX.drawLabel$java_awt_Graphics$S(g, "Wave Function (Position)");
var mid_y = this.viewX.mid_y;
var ymult = this.viewX.ymult;
this.drawFunction$java_awt_Graphics$com_falstad_Quantum1DCrystalFrame_View$DA$DA$I$I(g, this.viewX, this.func, this.funci, this.sampleCount, 0);
if (this.selectedCoef != -1 && !this.dragging ) {
g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).yellow);
ox = -1;
for (i = 0; i != this.sampleCount; i++) {
var x = (this.winSize.width * i/this.sampleCount|0);
var dy = this.modes[this.selectedCoef][i] / this.dispmax[this.selectedCoef];
var y = mid_y - ((ymult * dy)|0);
if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
ox = x;
oy = y;
}
}}if (this.viewP != null ) {
this.viewP.drawLabel$java_awt_Graphics$S(g, "Momentum");
g.setColor$java_awt_Color(gray2);
g.drawLine$I$I$I$I((this.winSize.width/2|0), this.viewP.mid_y - (this.viewP.ymult|0), (this.winSize.width/2|0), this.viewP.mid_y + (this.viewP.ymult|0));
for (i = 0; i != this.pdatar.length; i++) this.pdatar[i] = this.pdatai[i] = 0;

var btlen = (this.blochTrans.length/4|0);
var btmask = this.blochTrans.length - 1;
var fudge = ((this.selectedBand & 1) == 1) ? 1 : -1;
var kstep = 8;
kstep = kstep*(-fudge);
var pc = (this.pdatar.length/2|0) + ((this.selectedK * kstep)|0);
btlen = 16;
for (i = 0; i != btlen; i++) {
this.pdatar[pc + kstep * i] = this.blochTrans[i * 2];
this.pdatar[pc - kstep * i] = this.blochTrans[btmask & (-i * 2)];
this.pdatai[pc + kstep * i] = this.blochTrans[i * 2 + 1];
this.pdatai[pc - kstep * i] = this.blochTrans[btmask & (-i * 2 + 1)];
}
for (i = this.pdatar.length - 1; i > 0; i--) {
if (this.pdatar[i] == 0  && this.pdatai[i] == 0  ) {
this.pdatar[i] = this.pdatar[i - 1] * 1.0E-16;
this.pdatai[i] = this.pdatai[i - 1] * 1.0E-16;
}}
var offset = (this.pSampleCount/4|0);
this.drawFunction$java_awt_Graphics$com_falstad_Quantum1DCrystalFrame_View$DA$DA$I$I(g, this.viewP, this.pdatar, this.pdatai, (this.pSampleCount/2|0), offset);
}if (this.viewDispersion != null ) {
this.viewDispersion.drawLabel$java_awt_Graphics$S(g, "Dispersion (E vs. k)");
g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).gray);
var mid_y = this.viewDispersion.mid_y;
var ymult = this.viewDispersion.ymult;
var e0 = this.elevels[0] + 1;
var top = this.viewDispersion.y + 5;
for (i = 0; i < this.elevelCount; i = i+(2)) {
g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).darkGray);
var dy2 = this.elevels[i] - e0;
var dy1 = this.elevels[i + 1] - e0;
var y1 = this.getEnergyY$D$com_falstad_Quantum1DCrystalFrame_View(dy1, this.viewDispersion);
var y2 = this.getEnergyY$D$com_falstad_Quantum1DCrystalFrame_View(dy2, this.viewDispersion);
if (y2 < top) continue;
if (y1 < top) y1 = top;
y2 = y2-(y1);
if (y2 <= 0) y2 = 1;
g.fillRect$I$I$I$I(0, y1, this.winSize.width, y2);
}
g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).white);
if (this.repeatedZonesItem.isSelected()) {
this.viewDispersion.cellw2 = (this.viewDispersion.width/10|0);
var cells = (((this.viewDispersion.width/2|0))/this.viewDispersion.cellw2|0) + 1;
for (i = 0; i != this.dispersion.length; i++) for (j = -cells; j <= cells; j++) this.drawDispersion$java_awt_Graphics$I$I$Z$Z(g, i, j, true, true);


}if (this.reducedZonesItem.isSelected()) {
this.viewDispersion.cellw2 = (this.viewDispersion.width/3|0);
for (i = 0; i != this.dispersion.length; i++) this.drawDispersion$java_awt_Graphics$I$I$Z$Z(g, i, 0, true, true);

}if (this.extendedZonesItem.isSelected()) {
this.viewDispersion.cellw2 = (this.viewDispersion.width/10|0);
var xp = true;
for (i = 0; i != this.dispersion.length; i++) {
this.drawDispersion$java_awt_Graphics$I$I$Z$Z(g, i, ((i + 1)/2|0), xp, !xp);
this.drawDispersion$java_awt_Graphics$I$I$Z$Z(g, i, (-(i + 1)/2|0), !xp, xp);
xp = !xp;
}
}var y = this.getEnergyY$D$com_falstad_Quantum1DCrystalFrame_View(this.expecte - e0, this.viewDispersion);
g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).red);
if (y >= this.viewDispersion.y) {
g.drawLine$I$I$I$I(0, y, this.winSize.width, y);
}var x = ((this.viewDispersion.cellw2 * this.selectedK * 2  + (this.viewDispersion.width/2|0))|0);
if (!this.extendedZonesItem.isSelected()) g.drawLine$I$I$I$I(x, top, x, this.viewDispersion.y + this.viewDispersion.height);
}if (this.viewBloch != null ) {
this.viewBloch.drawLabel$java_awt_Graphics$S(g, "Bloch Function");
this.drawFunction$java_awt_Graphics$com_falstad_Quantum1DCrystalFrame_View$DA$DA$I$I(g, this.viewBloch, this.blochr, this.blochi, this.blochr.length, 0);
}realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
if (!this.stoppedCheck.getState()) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'getEnergyY$D$com_falstad_Quantum1DCrystalFrame_View', function (e, v) {
this.escale = this.energyScaleBar.getValue() / 100.0;
e = (e + 1) * this.escale - 1;
return v.mid_y - ((v.ymult * e)|0);
});

Clazz.newMeth(C$, 'drawDispersion$java_awt_Graphics$I$I$Z$Z', function (g, level, off, pos, neg) {
var ox = -1;
var oy = -1;
var j;
var e0 = this.elevels[0] + 1;
var cellw2 = this.viewDispersion.cellw2;
var cellw = cellw2 * 2;
var top = this.viewDispersion.y + 5;
for (j = 0; j != this.dispersion[0].length; j++) {
var cx = off * cellw + (this.viewDispersion.width/2|0);
var x = (j * cellw2/(this.dispersion[0].length - 1)|0);
var y = this.getEnergyY$D$com_falstad_Quantum1DCrystalFrame_View(this.dispersion[level][j] - e0, this.viewDispersion);
if (ox != -1 && y > top  && oy > top ) {
if (pos) g.drawLine$I$I$I$I(cx + ox, oy, cx + x, y);
if (neg) g.drawLine$I$I$I$I(cx - ox, oy, cx - x, y);
}ox = x;
oy = y;
}
});

Clazz.newMeth(C$, 'getUnitText$D$S', function (v, u) {
var va = Math.abs(v);
if (va < 1.0E-17 ) return "0 " + u;
if (va < 1.0E-12 ) return this.showFormat.format$D(v * 1.0E15) + " f" + u ;
if (va < 1.0E-9 ) return this.showFormat.format$D(v * 1.0E12) + " p" + u ;
if (va < 1.0E-6 ) return this.showFormat.format$D(v * 1.0E9) + " n" + u ;
if (va < 0.001 ) return this.showFormat.format$D(v * 1000000.0) + " u" + u ;
if (va < 1 ) return this.showFormat.format$D(v * 1000.0) + " m" + u ;
if (va < 1000.0 ) return this.showFormat.format$D(v) + " " + u ;
if (va < 1000000.0 ) return this.showFormat.format$D(v * 0.001) + " k" + u ;
if (va < 1.0E9 ) return this.showFormat.format$D(v * 1.0E-6) + " M" + u ;
if (va < 1.0E12 ) return this.showFormat.format$D(v * 1.0E-9) + " G" + u ;
if (va < 1.0E15 ) return this.showFormat.format$D(v * 1.0E-12) + " T" + u ;
return new Double(v).toString() + " " + u ;
});

Clazz.newMeth(C$, 'getEnergyText$D$Z', function (e, abs) {
return this.getUnitText$D$S(this.convertEnergy$D$Z(e, abs), "eV");
});

Clazz.newMeth(C$, 'getLengthText$D', function (x) {
return this.getUnitText$D$S(this.pointsToLength$D(x), "m");
});

Clazz.newMeth(C$, 'pointsToLength$D', function (x) {
return 4.0E-9 * x / (this.sampleCount - 2.0);
});

Clazz.newMeth(C$, 'convertEnergy$D$Z', function (e, abs) {
var base = 0.023502;
if (abs) e += this.setup.getBaseEnergy();
return e * base / 0.0018801;
});

Clazz.newMeth(C$, 'drawFunction$java_awt_Graphics$com_falstad_Quantum1DCrystalFrame_View$DA$DA$I$I', function (g, view, fr, fi, count, offset) {
var i;
var expectx = 0;
var expectx2 = 0;
var maxsq = 0;
var tot = 0;
var zero = (this.winSize.width/2|0);
for (i = 0; i != count; i++) {
var x = (this.winSize.width * i/(count - 1)|0);
var ii = i + offset;
var dr = fr[ii];
var di = (fi == null ) ? 0 : fi[ii];
var dy = dr * dr + di * di;
if (dy > maxsq ) maxsq = dy;
var dev = x - zero;
expectx += dy * dev;
expectx2 += dy * dev * dev ;
tot += dy;
}
expectx /= tot;
expectx2 /= tot;
var maxnm = Math.sqrt(maxsq);
var uncert = Math.sqrt(expectx2 - expectx * expectx);
var ox = -1;
var oy = 0;
var bestscale = 0;
if (fi != null  && (this.probCheckItem.isSelected() || this.probPhaseCheckItem.isSelected() ) ) bestscale = 1 / maxsq;
 else bestscale = 1 / maxnm;
view.scale = bestscale;
g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).gray);
if ((this.probCheckItem.isSelected() || this.probPhaseCheckItem.isSelected() || this.magPhaseCheckItem.isSelected()  ) && fi != null  ) {
g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).white);
var mult = view.ymult2 * view.scale;
for (i = 0; i != count; i++) {
var x = (this.winSize.width * i/(count - 1)|0);
var dy = 0;
var ii = i + offset;
if (!this.magPhaseCheckItem.isSelected()) dy = (fr[ii] * fr[ii] + fi[ii] * fi[ii]);
 else dy = Math.sqrt(fr[ii] * fr[ii] + fi[ii] * fi[ii]);
if (!this.probCheckItem.isSelected()) {
var ang = Math.atan2(fi[ii], fr[ii]);
g.setColor$java_awt_Color(this.phaseColors[(((ang + 3.141592653589793) * 480 / 6.483185307179586)|0)]);
}var y = view.lower_y - ((mult * dy)|0);
if (y < view.y) y = view.y;
if (ox != -1) {
this.xpoints[0] = ox;
this.ypoints[0] = view.lower_y + 1;
this.xpoints[1] = ox;
this.ypoints[1] = oy;
this.xpoints[2] = x;
this.ypoints[2] = y;
this.xpoints[3] = x;
this.ypoints[3] = view.lower_y + 1;
g.fillPolygon$IA$IA$I(this.xpoints, this.ypoints, 4);
}ox = x;
oy = y;
}
} else {
g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).darkGray);
var mid_y = view.mid_y;
g.drawLine$I$I$I$I(0, mid_y, this.winSize.width, mid_y);
var mult = view.ymult * view.scale;
if (fi != null ) {
g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).blue);
for (i = 0; i != count; i++) {
var x = (this.winSize.width * i/(count - 1)|0);
var ii = i + offset;
var y = mid_y - ((mult * fi[ii])|0);
if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
ox = x;
oy = y;
}
}g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).white);
ox = -1;
for (i = 0; i != count; i++) {
var x = (this.winSize.width * i/(count - 1)|0);
var ii = i + offset;
var y = mid_y - ((mult * fr[ii])|0);
if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
ox = x;
oy = y;
}
}if (maxsq > 0  && fi != null  ) {
expectx += zero;
}});

Clazz.newMeth(C$, 'edit$java_awt_event_MouseEvent', function (e) {
if (this.selection == 0) return;
var x = e.getX();
var y = e.getY();
switch (this.selection) {
case 5:
this.editHandle$I(y);
break;
case 6:
this.editDispersion$I$I(x, y);
break;
default:
this.editFunc$I$I(x, y);
break;
}
});

Clazz.newMeth(C$, 'editHandle$I', function (y) {
var dy = y - this.viewList[this.selectedPaneHandle].handle;
var upper = this.viewList[this.selectedPaneHandle - 1];
var lower = this.viewList[this.selectedPaneHandle];
var minheight = 10;
if (upper.height + dy < minheight || lower.height - dy < minheight ) return;
upper.height = upper.height+(dy);
lower.height = lower.height-(dy);
lower.y = lower.y+(dy);
lower.handle = lower.handle+(dy);
this.setGraphLines();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'editFunc$I$I', function (x, y) {
if (this.mouseChooser.getSelectedIndex() == 0) {
if (this.selection == 1) this.selectStateByEnergy$I(y);
return;
}if (this.dragX == x) {
this.editFuncPoint$I$I(x, y);
this.dragY = y;
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
}});

Clazz.newMeth(C$, 'editFuncPoint$I$I', function (x, y) {
if (this.selection != 1) return;
var v = (this.selection == 2) ? this.viewX : this.viewPotential;
var wc = this.wellCountBar.getValue();
var fullx = this.potSampleCount * wc;
var lox = (x * fullx/this.winSize.width|0);
var hix = (((x + 1) * fullx - 1)/this.winSize.width|0);
var val = (v.mid_y - y) / v.ymult;
var val2 = (v.lower_y - y) / v.ymult2;
if (val > 1 ) val = 1;
if (val < -1 ) val = -1;
if (val2 > 1 ) val2 = 1;
if (val2 < 0 ) val2 = 0;
val = (val + 1) / this.escale - 1;
val2 = (val2 + 1) / this.escale - 1;
if (val > 1 ) val = 1;
if (val2 > 1 ) val2 = 1;
if (lox < 1) lox = 1;
if (hix >= this.sampleCount - 1) hix = this.sampleCount - 2;
for (; lox <= hix; lox++) {
this.pot[lox % this.potSampleCount] = val;
this.setupModified = true;
this.getPotTrans();
this.levelsChanged = true;
}
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'editDispersion$I$I', function (x, y) {
x = x-((this.viewDispersion.width/2|0));
var k = x * 0.5 / this.viewDispersion.cellw2;
if (this.extendedZonesItem.isSelected()) {
var band = 0;
while (k > 0.5 ){
k -= 0.5;
band++;
}
while (k < -0.5 ){
k += 0.5;
band++;
}
if ((band & 1) != 0) k = (k >= 0 ) ? 0.5 - k : -0.5 - k;
this.select$D$I(k, band);
return;
}if (this.repeatedZonesItem.isSelected()) {
while (k > 0.5 )k -= 1;

while (k < -0.5 )k += 1;

}if (k > 0.5 ) k = 0.5;
if (k < -0.5 ) k = -0.5;
var i;
var besty = 1000;
var band = 0;
var e0 = this.elevels[0] + 1;
for (i = 0; i != this.dispersion.length; i++) {
var ya = this.getEnergyY$D$com_falstad_Quantum1DCrystalFrame_View(this.elevels[i * 2] - e0, this.viewDispersion);
var yb = this.getEnergyY$D$com_falstad_Quantum1DCrystalFrame_View(this.elevels[i * 2 + 1] - e0, this.viewDispersion);
if (y < ya && y > yb ) {
besty = -1;
band = i;
break;
}var yd = Math.abs(y - ya);
if (yd < besty) {
besty = yd;
band = i;
}yd = Math.abs(y - yb);
if (yd < besty) {
besty = yd;
band = i;
}}
this.select$D$I(k, band);
});

Clazz.newMeth(C$, 'select$D$I', function (k, band) {
this.selectedK = k;
this.selectedBand = band;
this.stateChanged = true;
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'getPotTrans', function () {
this.potTrans = Clazz.array(Double.TYPE, [this.potSampleCount * 2]);
var i;
for (i = 0; i != this.potSampleCount; i++) this.potTrans[i * 2] = this.pot[i];

var fft = Clazz.new_((I$[28]||(I$[28]=Clazz.load(Clazz.load('com.falstad.Quantum1DCrystalFrame').FFT))).c$$I, [this, null, this.potSampleCount]);
fft.transform$DA$Z(this.potTrans, false);
});

Clazz.newMeth(C$, 'getPState$I', function (x) {
var p = (((x * this.pSampleCount/2|0)/this.winSize.width|0)) - (this.pSampleCount/4|0);
return p * 3.141592653589793 / ((this.pSampleCount/2|0));
});

Clazz.newMeth(C$, 'componentHidden$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentMoved$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentShown$java_awt_event_ComponentEvent', function (e) {
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'componentResized$java_awt_event_ComponentEvent', function (e) {
this.handleResize();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'actionPerformed$java_awt_event_ActionEvent', function (e) {
if (e.getSource() === this.exitItem ) {
this.applet.destroyFrame();
return;
}this.cv.repaint();
if (e.getSource() === this.groundButton ) this.doGround();
});

Clazz.newMeth(C$, 'scrollbarValueChanged$com_falstad_DecentScrollbar', function (ds) {
System.out.print$S(ds.getValue() + "\n");
if (ds === this.massBar ) this.levelsChanged = true;
if (ds === this.aux1Bar  || ds === this.aux2Bar   || ds === this.aux3Bar   || ds === this.aux4Bar  ) {
this.setup.drawPotential();
this.getPotTrans();
this.levelsChanged = true;
}if (ds === this.wellCountBar ) {
this.setResolution();
this.setup.drawPotential();
this.stateChanged = true;
}this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'scrollbarFinished$com_falstad_DecentScrollbar', function (ds) {
});

Clazz.newMeth(C$, 'handleEvent$java_awt_Event', function (ev) {
if (ev.id == 201) {
this.destroyFrame();
return true;
}return C$.superclazz.prototype.handleEvent$java_awt_Event.apply(this, [ev]);
});

Clazz.newMeth(C$, 'destroyFrame', function () {
if (this.applet == null ) this.dispose();
 else this.applet.destroyFrame();
});

Clazz.newMeth(C$, 'setResolution', function () {
var wc = this.wellCountBar.getValue();
this.cellSampleCount = 8;
while (this.cellSampleCount < (700/wc|0))this.cellSampleCount = this.cellSampleCount*(2);

this.sampleCount = this.cellSampleCount * wc;
this.func = Clazz.array(Double.TYPE, [this.sampleCount]);
this.funci = Clazz.array(Double.TYPE, [this.sampleCount]);
this.blochr = Clazz.array(Double.TYPE, [this.sampleCount]);
this.blochi = Clazz.array(Double.TYPE, [this.sampleCount]);
this.pot = Clazz.array(Double.TYPE, [this.potSampleCount]);
this.stateChanged = true;
this.pSampleCount = 512;
this.pdatar = Clazz.array(Double.TYPE, [this.pSampleCount]);
this.pdatai = Clazz.array(Double.TYPE, [this.pSampleCount]);
this.fft = Clazz.new_((I$[28]||(I$[28]=Clazz.load(Clazz.load('com.falstad.Quantum1DCrystalFrame').FFT))).c$$I, [this, null, this.pSampleCount]);
});

Clazz.newMeth(C$, 'genStates', function () {
this.levelsChanged = false;
if (this.potTrans == null ) this.getPotTrans();
var lev1 = this.getBands$Z$D$I(false, 0, 0);
var lev2 = this.getBands$Z$D$I(false, 0.5, 0);
this.elevelCount = lev1.length * 2;
this.elevels = Clazz.array(Double.TYPE, [this.elevelCount]);
this.stateCount = this.elevelCount;
var i;
for (i = 0; i != lev1.length; i++) {
var a = (i & 1);
this.elevels[i * 2 + a] = lev1[i];
this.elevels[i * 2 + 1 - a] = lev2[i];
}
var dispx = 65;
var ll = lev1.length;
this.dispersion = Clazz.array(Double.TYPE, [ll, dispx]);
for (i = 0; i != ll; i++) {
this.dispersion[i][0] = lev1[i];
this.dispersion[i][dispx - 1] = lev2[i];
var j;
for (j = 1; j < dispx - 1; j++) {
var q = j / (dispx - 1.0);
this.dispersion[i][j] = lev1[i] * (1 - q) + lev2[i] * q;
}
}
this.kUpdateState = (dispx/2|0);
this.kUpdateSkip = this.kUpdateState * 2;
this.getBands$Z$D$I(true, this.selectedK, this.selectedBand);
});

Clazz.newMeth(C$, 'updateK', function () {
if (this.kUpdateSkip <= 1) return false;
var dispx = this.dispersion[0].length;
var k = this.kUpdateState / (2.0 * (dispx - 1));
var lev3 = this.getBands$Z$D$I(false, k, 0);
var j;
for (j = 0; j != lev3.length; j++) {
this.dispersion[j][this.kUpdateState] = lev3[j];
var hskip = (this.kUpdateSkip/2|0);
var m;
for (m = 1; m < hskip; m++) {
var q = m / hskip;
this.dispersion[j][this.kUpdateState - m] = (1 - q) * this.dispersion[j][this.kUpdateState] + q * this.dispersion[j][this.kUpdateState - hskip];
this.dispersion[j][this.kUpdateState + m] = (1 - q) * this.dispersion[j][this.kUpdateState] + q * this.dispersion[j][this.kUpdateState + hskip];
}
}
this.kUpdateState = this.kUpdateState+(this.kUpdateSkip);
if (this.kUpdateState >= dispx) {
this.kUpdateSkip = (this.kUpdateSkip/(2)|0);
if (this.kUpdateSkip == 1) return false;
this.kUpdateState = (this.kUpdateSkip/2|0);
}return true;
});

Clazz.newMeth(C$, 'getFourierIndex$I$I', function (i, n) {
return (i > (n/2|0)) ? (n/2|0) - i : i;
});

Clazz.newMeth(C$, 'getBands$Z$D$I', function (getStates, k, band) {
var n = 48;
var n2 = n * 2;
var h = Clazz.array(Double.TYPE, [n2, n2]);
var i;
var j;
this.mass = this.massBar.getValue() * 2.0E-4;
var m1 = 1.0 / this.mass;
this.mass *= 1596875.0;
for (i = 0; i != n; i++) {
var ii = this.getFourierIndex$I$I(i, n);
var iik = ii + k;
h[i + n][i + n] = h[i][i] = m1 * iik * iik * 0.01 ;
for (j = 0; j != n; j++) {
var jj = this.getFourierIndex$I$I(j, n);
var ij = jj - ii;
if (ij < 0) ij = ij+((this.potTrans.length/2|0));
var re = this.potTrans[ij * 2] / this.potSampleCount;
var im = this.potTrans[ij * 2 + 1] / this.potSampleCount;
h[i][j] += re;
h[i + n][j + n] += re;
h[i + n][j] -= im;
h[i][j + n] += im;
}
}
var mx = Clazz.new_((I$[29]||(I$[29]=Clazz.load('gov.nist.jama.Matrix'))).c$$DAA,[h]);
var ed = mx.eig$Z(getStates);
var w = ed.getRealEigenvalues();
var levels = Clazz.array(Double.TYPE, [n2]);
for (i = 0; i != n2; i++) levels[i] = w[i];

var si;
var sj;
for (si = 1; si < n2; si++) {
var v = levels[si];
sj = si;
while (levels[sj - 1] > v ){
levels[sj] = levels[sj - 1];
sj--;
if (sj <= 0) break;
}
levels[sj] = v;
}
var levels2 = Clazz.array(Double.TYPE, [20]);
for (i = 0; i != 20; i++) levels2[i] = levels[i * 2];

if (!getStates) return levels2;
var picker = 0;
var vecs = ed.getV().getArray();
for (i = 0; i != this.stateCount; i++) {
for (j = 0; j != n2; j++) if (levels[i] == w[j] ) break;

if (j == n) {
System.out.print$S("can't find elevels! " + i + " " + new Double(levels[i]).toString() + "\n" );
continue;
}w[j] = -1;
if (picker++ < band * 2) continue;
var q = Clazz.array(Double.TYPE, [this.cellSampleCount * 2]);
this.blochTrans = Clazz.array(Double.TYPE, [this.cellSampleCount * 2]);
var row = j;
var norm = (vecs[1][row] < 0 ) ? -1 : 1;
for (j = 0; j != n; j++) {
var qo = this.getFourierIndex$I$I(j, n);
if (Math.abs(qo) >= (this.cellSampleCount/2|0)) continue;
if (qo < 0) qo = qo+((q.length/2|0));
this.blochTrans[qo * 2] = q[qo * 2] = norm * vecs[j][row];
this.blochTrans[qo * 2 + 1] = q[qo * 2 + 1] = norm * vecs[j + n][row];
}
var fft = Clazz.new_((I$[28]||(I$[28]=Clazz.load(Clazz.load('com.falstad.Quantum1DCrystalFrame').FFT))).c$$I, [this, null, this.cellSampleCount]);
fft.transform$DA$Z(q, true);
var km = 2 * 3.141592653589793 * k  / this.cellSampleCount;
var fudge = ((band & 1) == 1) ? 1 : -1;
for (j = 0; j != this.sampleCount; j++) {
var ji = j % this.cellSampleCount;
var re = q[ji * 2];
var im = q[ji * 2 + 1];
var kr = Math.cos(j * km);
var ki = -Math.sin(j * km);
this.func[j] = re * kr - im * ki;
this.funci[j] = fudge * (re * ki + im * kr);
this.blochr[j] = re;
this.blochi[j] = fudge * im;
}
this.expecte = levels[band * 2];
break;
}
return null;
});

Clazz.newMeth(C$, 'mouseDragged$java_awt_event_MouseEvent', function (e) {
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseMoved$java_awt_event_MouseEvent', function (e) {
var x = e.getX();
var y = e.getY();
this.dragX = x;
this.dragY = y;
var oldCoef = this.selectedCoef;
var oldSelection = this.selection;
this.selectedCoef = -1;
this.selectedPaneHandle = -1;
this.selection = 0;
var i;
for (i = 1; i != this.viewCount; i++) {
var dy = y - this.viewList[i].handle;
if (dy >= -3 && dy <= 3 ) {
this.selectedPaneHandle = i;
this.selection = 5;
}}
var cs = null;
if (this.selection == 5) cs = (I$[27]||(I$[27]=Clazz.load('java.awt.Cursor'))).getPredefinedCursor$I(8);
 else if (this.viewX != null  && this.viewX.contains$I$I(x, y) ) this.selection = 2;
 else if (this.viewP != null  && this.viewP.contains$I$I(x, y) ) {
this.selection = 3;
this.cv.repaint$J(this.pause);
} else if (this.viewPotential != null  && this.viewPotential.contains$I$I(x, y) ) {
this.selection = 1;
} else if (this.viewDispersion != null  && this.viewDispersion.contains$I$I(x, y) ) {
this.selection = 6;
}this.cv.setCursor$java_awt_Cursor(cs);
if (this.selection != oldSelection || this.selectedCoef != oldCoef ) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'selectStateByEnergy$I', function (y) {
var band = 0;
var besty = 1000;
var i;
var j;
var k = 0;
for (i = 0; i != this.dispersion.length; i++) for (j = 0; j != this.dispersion[0].length; j++) {
var ye = this.getEnergyY$D$com_falstad_Quantum1DCrystalFrame_View(this.dispersion[i][j], this.viewPotential);
ye -= this.dispersion[i][j] * 1.0E-8;
var yd = Math.abs(y - ye);
if (yd < besty ) {
besty = yd;
band = i;
k = j * 0.5 / (this.dispersion[0].length - 1);
}}

this.select$D$I(k, band);
});

Clazz.newMeth(C$, 'mouseClicked$java_awt_event_MouseEvent', function (e) {
if (e.getClickCount() == 2 && this.selectedCoef != -1 ) this.enterSelectedState();
});

Clazz.newMeth(C$, 'enterSelectedState', function () {
});

Clazz.newMeth(C$, 'mouseEntered$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseExited$java_awt_event_MouseEvent', function (e) {
if (!this.dragging) {
if (this.selectedCoef != -1) {
this.selectedCoef = -1;
this.cv.repaint$J(this.pause);
}if (this.selectedPaneHandle != -1) {
this.selectedPaneHandle = -1;
this.cv.repaint$J(this.pause);
}}});

Clazz.newMeth(C$, 'mousePressed$java_awt_event_MouseEvent', function (e) {
this.mouseMoved$java_awt_event_MouseEvent(e);
if ((e.getModifiers() & 16) == 0) return;
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
this.dragging = false;
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
if (!this.finished) return;
if (e.getItemSelectable() === this.stoppedCheck ) {
this.cv.repaint$J(this.pause);
return;
}if (e.getItemSelectable() === this.setupChooser ) this.doSetup();
if (Clazz.instanceOf(e.getItemSelectable(), "javax.swing.JRadioButtonMenuItem")) {
var cmi = e.getItemSelectable();
if (!(cmi === this.extendedZonesItem  || cmi === this.reducedZonesItem   || cmi === this.repeatedZonesItem  )) this.handleResize();
this.cv.repaint$J(this.pause);
}var i;
});

Clazz.newMeth(C$, 'doRadio$a2s_Menu$java_awt_event_ItemEvent', function (menu, e) {
var i;
var j;
for (i = 0; i != menu.countItems(); i++) if (e.getItemSelectable() === menu.getItem$I(i) ) {
(menu.getItem$I(i)).setState$Z(true);
for (j = 0; j != menu.countItems(); j++) if (i != j) (menu.getItem$I(j)).setState$Z(false);

}
});

Clazz.newMeth(C$, 'doSetup', function () {
this.doBlank();
var i;
for (i = 0; i != this.potSampleCount; i++) this.pot[i] = 0;

this.setup = this.setupList.elementAt$I(this.setupChooser.getSelectedIndex());
this.aux1Bar.setValue$I(100);
this.aux2Bar.setValue$I(100);
this.aux3Bar.setValue$I(100);
this.aux4Bar.setValue$I(100);
this.selectGround = true;
this.setup.select();
this.setup.drawPotential();
this.getPotTrans();
this.setupModified = false;
this.levelsChanged = true;
if (this.setup.getAuxBarCount() >= 2) {
this.aux2Label.show();
this.aux2Bar.show();
} else {
this.aux2Label.hide();
this.aux2Bar.hide();
}if (this.setup.getAuxBarCount() >= 3) {
this.aux3Label.show();
this.aux3Bar.show();
} else {
this.aux3Label.hide();
this.aux3Bar.hide();
}if (this.setup.getAuxBarCount() >= 4) {
this.aux4Label.show();
this.aux4Bar.show();
} else {
this.aux4Label.hide();
this.aux4Bar.hide();
}this.validate();
this.selectedCoef = -1;
});
;
(function(){var C$=Clazz.newClass(P$.Quantum1DCrystalFrame, "FFT", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.wtabf = null;
this.wtabi = null;
this.size = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I', function (sz) {
C$.$init$.apply(this);
this.size = sz;
if ((this.size & (this.size - 1)) != 0) System.out.println$S("size must be power of two!");
this.calcWTable();
}, 1);

Clazz.newMeth(C$, 'calcWTable', function () {
this.wtabf = Clazz.array(Double.TYPE, [this.size]);
this.wtabi = Clazz.array(Double.TYPE, [this.size]);
var i;
for (i = 0; i != this.size; i = i+(2)) {
var pi = 3.1415926535;
var th = pi * i / this.size;
this.wtabf[i] = Math.cos(th);
this.wtabf[i + 1] = Math.sin(th);
this.wtabi[i] = this.wtabf[i];
this.wtabi[i + 1] = -this.wtabf[i + 1];
}
});

Clazz.newMeth(C$, 'transform$DA$Z', function (data, inv) {
var i;
var j = 0;
var size2 = this.size * 2;
if ((this.size & (this.size - 1)) != 0) System.out.println$S("size must be power of two!");
var q;
var bit;
for (i = 0; i != size2; i = i+(2)) {
if (i > j) {
q = data[i];
data[i] = data[j];
data[j] = q;
q = data[i + 1];
data[i + 1] = data[j + 1];
data[j + 1] = q;
}bit = this.size;
while ((bit & j) != 0){
j = j&(~bit);
bit = bit>>(1);
}
j = j|(bit);
}
var tabskip = this.size << 1;
var wtab = (inv) ? this.wtabi : this.wtabf;
var skip1;
var skip2;
var ix;
var j2;
var wr;
var wi;
var d1r;
var d1i;
var d2r;
var d2i;
var d2wr;
var d2wi;
for (i = 0; i != size2; i = i+(4)) {
d1r = data[i];
d1i = data[i + 1];
d2r = data[i + 2];
d2i = data[i + 3];
data[i] = d1r + d2r;
data[i + 1] = d1i + d2i;
data[i + 2] = d1r - d2r;
data[i + 3] = d1i - d2i;
}
tabskip = tabskip>>(1);
var imult = (inv) ? -1 : 1;
for (i = 0; i != size2; i = i+(8)) {
d1r = data[i];
d1i = data[i + 1];
d2r = data[i + 4];
d2i = data[i + 5];
data[i] = d1r + d2r;
data[i + 1] = d1i + d2i;
data[i + 4] = d1r - d2r;
data[i + 5] = d1i - d2i;
d1r = data[i + 2];
d1i = data[i + 3];
d2r = data[i + 6] * imult;
d2i = data[i + 7] * imult;
data[i + 2] = d1r - d2i;
data[i + 3] = d1i + d2r;
data[i + 6] = d1r + d2i;
data[i + 7] = d1i - d2r;
}
tabskip = tabskip>>(1);
for (skip1 = 16; skip1 <= size2; skip1 = skip1<<(1)) {
skip2 = skip1 >> 1;
tabskip = tabskip>>(1);
for (i = 0; i != 1000; i++) ;
for (i = 0; i < size2; i = i+(skip1)) {
ix = 0;
for (j = i; j != i + skip2; j = j+(2), ix = ix+(tabskip)) {
wr = wtab[ix];
wi = wtab[ix + 1];
d1r = data[j];
d1i = data[j + 1];
j2 = j + skip2;
d2r = data[j2];
d2i = data[j2 + 1];
d2wr = d2r * wr - d2i * wi;
d2wi = d2r * wi + d2i * wr;
data[j] = d1r + d2wr;
data[j + 1] = d1i + d2wi;
data[j2] = d1r - d2wr;
data[j2 + 1] = d1i - d2wi;
}
}
}
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Quantum1DCrystalFrame, "Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'fudgeLevels', function () {
});

Clazz.newMeth(C$, 'allowLeftRight', function () {
return false;
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 2;
});

Clazz.newMeth(C$, 'getInfo$SA$I', function (s, offset) {
});

Clazz.newMeth(C$, 'getBaseEnergy', function () {
return -1;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Quantum1DCrystalFrame, "FiniteWellSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Quantum1DCrystalFrame','com.falstad.Quantum1DCrystalFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Finite Wells";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.Quantum1DCrystalFrame'].aux1Label.setText$S("Well Width");
this.b$['com.falstad.Quantum1DCrystalFrame'].aux1Bar.setValue$I(98);
this.b$['com.falstad.Quantum1DCrystalFrame'].aux2Label.setText$S("Well Depth");
});

Clazz.newMeth(C$, 'getWidth', function () {
return ((this.b$['com.falstad.Quantum1DCrystalFrame'].potSampleCount - 1) * this.b$['com.falstad.Quantum1DCrystalFrame'].aux1Bar.getValue()/100|0);
});

Clazz.newMeth(C$, 'getTop', function () {
return -1 + (this.b$['com.falstad.Quantum1DCrystalFrame'].aux2Bar.getValue() - 1) / 49.5;
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
var width = this.getWidth();
var top = this.getTop();
for (i = 0; i != width; i++) this.b$['com.falstad.Quantum1DCrystalFrame'].pot[i] = -1;

for (; i < this.b$['com.falstad.Quantum1DCrystalFrame'].potSampleCount; i++) this.b$['com.falstad.Quantum1DCrystalFrame'].pot[i] = top;

});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[2]||(I$[2]=Clazz.load(Clazz.load('com.falstad.Quantum1DCrystalFrame').FiniteWellPairSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Quantum1DCrystalFrame, "FiniteWellPairSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Quantum1DCrystalFrame','com.falstad.Quantum1DCrystalFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Well Pairs";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.Quantum1DCrystalFrame'].aux1Label.setText$S("Well Width");
this.b$['com.falstad.Quantum1DCrystalFrame'].aux2Bar.setValue$I(80);
this.b$['com.falstad.Quantum1DCrystalFrame'].aux2Label.setText$S("Well Separation");
this.b$['com.falstad.Quantum1DCrystalFrame'].aux2Bar.setValue$I(100);
this.b$['com.falstad.Quantum1DCrystalFrame'].aux3Label.setText$S("Well Depth 1");
this.b$['com.falstad.Quantum1DCrystalFrame'].aux3Bar.setValue$I(100);
this.b$['com.falstad.Quantum1DCrystalFrame'].aux4Label.setText$S("Well Depth 2");
this.b$['com.falstad.Quantum1DCrystalFrame'].aux4Bar.setValue$I(90);
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 4;
});

Clazz.newMeth(C$, 'getWidth', function () {
return (((this.b$['com.falstad.Quantum1DCrystalFrame'].aux1Bar.getValue() * 3/4|0)) * ((this.b$['com.falstad.Quantum1DCrystalFrame'].potSampleCount/2|0))/110|0) + 1;
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
var width = this.getWidth();
var sepFrac = this.b$['com.falstad.Quantum1DCrystalFrame'].aux2Bar.getValue() / 100.0;
var sep = (((1 + width) * (1 - sepFrac) + ((this.b$['com.falstad.Quantum1DCrystalFrame'].potSampleCount/2|0)) * sepFrac)|0);
var level1 = 1 - this.b$['com.falstad.Quantum1DCrystalFrame'].aux3Bar.getValue() / 50.0;
var level2 = 1 - this.b$['com.falstad.Quantum1DCrystalFrame'].aux4Bar.getValue() / 50.0;
var top = 1;
var space = level1 < level2  ? (level1 + 1) : (level2 + 1);
top -= space;
level1 -= space;
level2 -= space;
for (i = 0; i != this.b$['com.falstad.Quantum1DCrystalFrame'].potSampleCount; i++) this.b$['com.falstad.Quantum1DCrystalFrame'].pot[i] = top;

for (i = 0; i != width; i++) {
this.b$['com.falstad.Quantum1DCrystalFrame'].pot[i] = level1;
this.b$['com.falstad.Quantum1DCrystalFrame'].pot[i + sep] = level2;
}
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[3]||(I$[3]=Clazz.load(Clazz.load('com.falstad.Quantum1DCrystalFrame').FiniteWellPairCoupledSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Quantum1DCrystalFrame, "FiniteWellPairCoupledSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Quantum1DCrystalFrame','com.falstad.Quantum1DCrystalFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Coupled Well Pairs";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.Quantum1DCrystalFrame'].aux1Label.setText$S("Well Separation");
this.b$['com.falstad.Quantum1DCrystalFrame'].aux1Bar.setValue$I(1);
this.b$['com.falstad.Quantum1DCrystalFrame'].aux2Label.setText$S("Wall Potential");
this.b$['com.falstad.Quantum1DCrystalFrame'].aux2Bar.setValue$I(50);
});

Clazz.newMeth(C$, 'getWidth', function () {
return (this.b$['com.falstad.Quantum1DCrystalFrame'].potSampleCount/4|0);
});

Clazz.newMeth(C$, 'getWallEnergy', function () {
return -1 + (this.b$['com.falstad.Quantum1DCrystalFrame'].aux2Bar.getValue() - 1) / 50.0;
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
var width = this.getWidth();
var sepFrac = this.b$['com.falstad.Quantum1DCrystalFrame'].aux1Bar.getValue() / 100.0;
var sep = (((1 + width) * (1 - sepFrac) + ((this.b$['com.falstad.Quantum1DCrystalFrame'].potSampleCount/2|0)) * sepFrac)|0);
var floor = -1;
var infloor = -1 + (this.b$['com.falstad.Quantum1DCrystalFrame'].aux2Bar.getValue() - 1) / 49.0;
if (infloor > 1 ) infloor = 1;
for (i = 0; i != this.b$['com.falstad.Quantum1DCrystalFrame'].potSampleCount; i++) this.b$['com.falstad.Quantum1DCrystalFrame'].pot[i] = 1;

for (i = 0; i != width; i++) this.b$['com.falstad.Quantum1DCrystalFrame'].pot[i] = this.b$['com.falstad.Quantum1DCrystalFrame'].pot[i + sep] = -1;

for (i = width; i != sep; i++) this.b$['com.falstad.Quantum1DCrystalFrame'].pot[i] = infloor;

});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[4]||(I$[4]=Clazz.load(Clazz.load('com.falstad.Quantum1DCrystalFrame').HarmonicWellSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Quantum1DCrystalFrame, "HarmonicWellSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Quantum1DCrystalFrame','com.falstad.Quantum1DCrystalFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Harmonic";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.Quantum1DCrystalFrame'].aux1Label.setText$S("Well Width");
this.b$['com.falstad.Quantum1DCrystalFrame'].aux2Label.setText$S("Well Depth");
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 2;
});

Clazz.newMeth(C$, 'getFloor', function () {
return 1 - (this.b$['com.falstad.Quantum1DCrystalFrame'].aux2Bar.getValue()) / 50.0;
});

Clazz.newMeth(C$, 'getTop', function () {
return -1 + (this.b$['com.falstad.Quantum1DCrystalFrame'].aux2Bar.getValue()) / 50.0;
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
var top = this.getTop();
var width = (this.b$['com.falstad.Quantum1DCrystalFrame'].aux1Bar.getValue() * (this.b$['com.falstad.Quantum1DCrystalFrame'].potSampleCount - 1)/100|0);
var a = (top + 1) / (((width/2|0)) * (width / 2.0));
for (i = 0; i != width; i++) {
var xx = (i - width / 2.0);
this.b$['com.falstad.Quantum1DCrystalFrame'].pot[i] = -1 + xx * xx * a ;
if (this.b$['com.falstad.Quantum1DCrystalFrame'].pot[i] > top ) this.b$['com.falstad.Quantum1DCrystalFrame'].pot[i] = top;
}
for (; i < this.b$['com.falstad.Quantum1DCrystalFrame'].potSampleCount; i++) this.b$['com.falstad.Quantum1DCrystalFrame'].pot[i] = top;

});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[5]||(I$[5]=Clazz.load(Clazz.load('com.falstad.Quantum1DCrystalFrame').CoulombWellArraySetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Quantum1DCrystalFrame, "CoulombWellArraySetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Quantum1DCrystalFrame','com.falstad.Quantum1DCrystalFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Coulomb-Like";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.Quantum1DCrystalFrame'].aux1Label.setText$S("Well Width");
this.b$['com.falstad.Quantum1DCrystalFrame'].aux1Bar.setValue$I(40);
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 1;
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
var s = (this.b$['com.falstad.Quantum1DCrystalFrame'].aux1Bar.getValue()) / 200.0;
var width = this.b$['com.falstad.Quantum1DCrystalFrame'].potSampleCount;
s *= (width/2|0);
var a = -2 * width * s  / (2 * s - width);
var b = 1 + 2 * a / width;
var add = 1 - (b - 2 * a / (width / 2.0));
b += add;
for (i = 0; i != this.b$['com.falstad.Quantum1DCrystalFrame'].potSampleCount; i++) {
var xx = (i - width / 2.0);
var xx2 = width - Math.abs(xx);
this.b$['com.falstad.Quantum1DCrystalFrame'].pot[i] = b - a / Math.abs(xx) - a / xx2;
if (this.b$['com.falstad.Quantum1DCrystalFrame'].pot[i] < -1 ) this.b$['com.falstad.Quantum1DCrystalFrame'].pot[i] = -1;
}
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[6]||(I$[6]=Clazz.load(Clazz.load('com.falstad.Quantum1DCrystalFrame').FreeParticleSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Quantum1DCrystalFrame, "FreeParticleSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Quantum1DCrystalFrame','com.falstad.Quantum1DCrystalFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Free Particle";
});

Clazz.newMeth(C$, 'select', function () {
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 0;
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
for (i = 0; i != this.b$['com.falstad.Quantum1DCrystalFrame'].potSampleCount; i++) this.b$['com.falstad.Quantum1DCrystalFrame'].pot[i] = -1;

});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[7]||(I$[7]=Clazz.load(Clazz.load('com.falstad.Quantum1DCrystalFrame').SinusoidalLatticeSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Quantum1DCrystalFrame, "SinusoidalLatticeSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Quantum1DCrystalFrame','com.falstad.Quantum1DCrystalFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Sinusoidal";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.Quantum1DCrystalFrame'].aux1Label.setText$S("Well Depth");
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 1;
});

Clazz.newMeth(C$, 'drawPotential', function () {
var amp = this.b$['com.falstad.Quantum1DCrystalFrame'].aux1Bar.getValue() / 100.0;
var buf = (this.b$['com.falstad.Quantum1DCrystalFrame'].potSampleCount/10|0);
var i;
for (i = 0; i != this.b$['com.falstad.Quantum1DCrystalFrame'].potSampleCount; i++) {
var xx = i * 2 * 3.141592653589793  / this.b$['com.falstad.Quantum1DCrystalFrame'].potSampleCount;
this.b$['com.falstad.Quantum1DCrystalFrame'].pot[i] = -1 + amp * (1 - Math.cos(xx));
}
});

Clazz.newMeth(C$, 'createNext', function () {
return null;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Quantum1DCrystalFrame, "View", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, 'java.awt.Rectangle');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.mid_y = 0;
this.lower_y = 0;
this.handle = 0;
this.ymult = 0;
this.ymult2 = 0;
this.scale = 0;
this.cellw2 = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'drawLabel$java_awt_Graphics$S', function (g, str) {
g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).white);
this.b$['com.falstad.Quantum1DCrystalFrame'].centerString$java_awt_Graphics$S$I(g, str, this.y - 5);
});

Clazz.newMeth(C$);
})()

Clazz.newMeth(C$);
})();
//Created 2017-12-17 22:25:36
