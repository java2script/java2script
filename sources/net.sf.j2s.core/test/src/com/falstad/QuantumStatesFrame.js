(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "QuantumStatesFrame", function(){
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
this.pSampleCount = 0;
this.modes = null;
this.modesLeft = null;
this.blankButton = null;
this.groundButton = null;
this.normalizeButton = null;
this.maximizeButton = null;
this.rescaleButton = null;
this.stoppedCheck = null;
this.eCheckItem = null;
this.xCheckItem = null;
this.pCheckItem = null;
this.densityCheckItem = null;
this.sumAllCheckItem = null;
this.parityCheckItem = null;
this.currentCheckItem = null;
this.leftRightCheckItem = null;
this.infoCheckItem = null;
this.statesCheckItem = null;
this.expectCheckItem = null;
this.uncertaintyCheckItem = null;
this.probCheckItem = null;
this.probPhaseCheckItem = null;
this.reImCheckItem = null;
this.magPhaseCheckItem = null;
this.alwaysNormItem = null;
this.alwaysMaxItem = null;
this.adiabaticItem = null;
this.waveFunctionMenu = null;
this.measureEItem = null;
this.measureXItem = null;
this.exitItem = null;
this.mouseChooser = null;
this.setupChooser = null;
this.setupList = null;
this.setup = null;
this.forceBar = null;
this.speedBar = null;
this.resBar = null;
this.massBar = null;
this.aux1Bar = null;
this.aux2Bar = null;
this.aux3Bar = null;
this.aux1Label = null;
this.aux2Label = null;
this.aux3Label = null;
this.viewPotential = null;
this.viewX = null;
this.viewP = null;
this.viewParity = null;
this.viewStates = null;
this.viewSumAll = null;
this.viewDensity = null;
this.viewCurrent = null;
this.viewLeft = null;
this.viewRight = null;
this.viewInfo = null;
this.viewList = null;
this.viewCount = 0;
this.magcoef = null;
this.phasecoef = null;
this.phasecoefcos = null;
this.phasecoefsin = null;
this.phasecoefadj = null;
this.elevels = null;
this.dispmax = null;
this.step = 0;
this.func = null;
this.funci = null;
this.pdata = null;
this.pdatar = null;
this.pdatai = null;
this.currentData = null;
this.parityData = null;
this.pot = null;
this.mass = 0;
this.selectedCoef = 0;
this.selectedPaneHandle = 0;
this.selectedPState = 0;
this.selection = 0;
this.dragX = 0;
this.dragY = 0;
this.xpoints = null;
this.ypoints = null;
this.dragging = false;
this.startup = false;
this.selectGround = false;
this.statesChanged = false;
this.adjustingStates = false;
this.adjustingWaveFunc = false;
this.setupModified = false;
this.t = 0;
this.pause = 0;
this.phaseColors = null;
this.fft = null;
this.cv = null;
this.applet = null;
this.showFormat = null;
this.finished = false;
this.radioGroup = null;
this.lastTime = 0;
this.stateColSize = 0;
this.stateSize = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.engine = null;
this.maxStateCount = 1000;
this.sampleCount = 80;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "QuantumStates by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'c$$com_falstad_QuantumStates', function (a) {
C$.superclazz.c$$S.apply(this, ["1-d Quantum States Applet v1.6d"]);
C$.$init$.apply(this);
this.applet = a;
}, 1);

Clazz.newMeth(C$, 'init', function () {
this.startup = true;
this.xpoints = Clazz.array(Integer.TYPE, [5]);
this.ypoints = Clazz.array(Integer.TYPE, [5]);
this.setupList = Clazz.new_((I$[21]||(I$[21]=Clazz.load('java.util.Vector'))));
var s = Clazz.new_((I$[22]||(I$[22]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').InfiniteWellSetup))), [this, null]);
while (s != null ){
this.setupList.addElement$TE(s);
s = s.createNext();
}
this.selectedCoef = -1;
this.setLayout$java_awt_LayoutManager(Clazz.new_((I$[23]||(I$[23]=Clazz.load('com.falstad.QuantumStatesLayout')))));
this.cv = Clazz.new_((I$[24]||(I$[24]=Clazz.load('com.falstad.QuantumStatesCanvas'))).c$$com_falstad_QuantumStatesFrame,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
this.add$java_awt_Component(this.cv);
var mb = Clazz.new_((I$[25]||(I$[25]=Clazz.load('a2s.MenuBar'))));
var m = Clazz.new_((I$[26]||(I$[26]=Clazz.load('a2s.Menu'))).c$$S,["File"]);
mb.add$javax_swing_JMenu(m);
m.add$javax_swing_JMenuItem(this.exitItem = this.getMenuItem$S("Exit"));
m = Clazz.new_((I$[26]||(I$[26]=Clazz.load('a2s.Menu'))).c$$S,["View"]);
mb.add$javax_swing_JMenu(m);
m.add$javax_swing_JMenuItem(this.eCheckItem = this.getCheckItem$S("Energy"));
this.eCheckItem.setState$Z(true);
m.add$javax_swing_JMenuItem(this.xCheckItem = this.getCheckItem$S("Position"));
this.xCheckItem.setState$Z(true);
m.add$javax_swing_JMenuItem(this.pCheckItem = this.getCheckItem$S("Momentum"));
this.pCheckItem.setState$Z(true);
m.add$javax_swing_JMenuItem(this.sumAllCheckItem = this.getCheckItem$S("Sum All States"));
m.add$javax_swing_JMenuItem(this.parityCheckItem = this.getCheckItem$S("Parity"));
m.add$javax_swing_JMenuItem(this.currentCheckItem = this.getCheckItem$S("Probability Current"));
m.add$javax_swing_JMenuItem(this.leftRightCheckItem = this.getCheckItem$S("Left/Right Waves"));
m.add$javax_swing_JMenuItem(this.infoCheckItem = this.getCheckItem$S("Values/Dimensions"));
m.add$javax_swing_JMenuItem(this.statesCheckItem = this.getCheckItem$S("State Phasors"));
this.statesCheckItem.setState$Z(true);
m.addSeparator();
m.add$javax_swing_JMenuItem(this.expectCheckItem = this.getCheckItem$S("Expectation Values"));
this.expectCheckItem.setState$Z(true);
m.add$javax_swing_JMenuItem(this.uncertaintyCheckItem = this.getCheckItem$S("Uncertainties"));
var m2 = this.waveFunctionMenu = Clazz.new_((I$[26]||(I$[26]=Clazz.load('a2s.Menu'))).c$$S,["Wave Function"]);
m.add$javax_swing_JMenuItem(m2);
m2.add$javax_swing_JMenuItem(this.probCheckItem = this.getRadioItem$S("Probability"));
m2.add$javax_swing_JMenuItem(this.probPhaseCheckItem = this.getRadioItem$S("Probability + Phase"));
this.probPhaseCheckItem.setSelected$Z(true);
m2.add$javax_swing_JMenuItem(this.reImCheckItem = this.getRadioItem$S("Real + Imaginary Parts"));
m2.add$javax_swing_JMenuItem(this.magPhaseCheckItem = this.getRadioItem$S("Magnitude + Phase"));
m = Clazz.new_((I$[26]||(I$[26]=Clazz.load('a2s.Menu'))).c$$S,["Measure"]);
mb.add$javax_swing_JMenu(m);
m.add$javax_swing_JMenuItem(this.measureEItem = this.getMenuItem$S("Measure Energy"));
m.add$javax_swing_JMenuItem(this.measureXItem = this.getMenuItem$S("Measure Position"));
m = Clazz.new_((I$[26]||(I$[26]=Clazz.load('a2s.Menu'))).c$$S,["Options"]);
mb.add$javax_swing_JMenu(m);
m.add$javax_swing_JMenuItem(this.alwaysNormItem = this.getCheckItem$S("Always Normalize"));
m.add$javax_swing_JMenuItem(this.alwaysMaxItem = this.getCheckItem$S("Always Maximize"));
m.add$javax_swing_JMenuItem(this.adiabaticItem = this.getCheckItem$S("Adiabatic Changes"));
this.adiabaticItem.setState$Z(true);
this.setMenuBar$a2s_MenuBar(mb);
this.setupChooser = Clazz.new_((I$[27]||(I$[27]=Clazz.load('a2s.Choice'))));
var i;
for (i = 0; i != this.setupList.size(); i++) this.setupChooser.add$S("Setup: " + (this.setupList.elementAt$I(i)).getName());

this.setup = this.setupList.elementAt$I(0);
this.setupChooser.addItemListener$java_awt_event_ItemListener(this);
this.add$java_awt_Component(this.setupChooser);
this.mouseChooser = Clazz.new_((I$[27]||(I$[27]=Clazz.load('a2s.Choice'))));
this.mouseChooser.add$S("Mouse = Set Eigenstate");
this.mouseChooser.add$S("Mouse = Edit Function");
this.mouseChooser.add$S("Mouse = Create Gaussian");
this.mouseChooser.add$S("Mouse = Translate Function");
this.mouseChooser.addItemListener$java_awt_event_ItemListener(this);
this.add$java_awt_Component(this.mouseChooser);
this.mouseChooser.select$I(2);
this.add$java_awt_Component(this.blankButton = Clazz.new_((I$[28]||(I$[28]=Clazz.load('a2s.Button'))).c$$S,["Clear"]));
this.blankButton.addActionListener$java_awt_event_ActionListener(this);
this.add$java_awt_Component(this.normalizeButton = Clazz.new_((I$[28]||(I$[28]=Clazz.load('a2s.Button'))).c$$S,["Normalize"]));
this.normalizeButton.addActionListener$java_awt_event_ActionListener(this);
this.add$java_awt_Component(this.maximizeButton = Clazz.new_((I$[28]||(I$[28]=Clazz.load('a2s.Button'))).c$$S,["Maximize"]));
this.maximizeButton.addActionListener$java_awt_event_ActionListener(this);
this.add$java_awt_Component(this.groundButton = Clazz.new_((I$[28]||(I$[28]=Clazz.load('a2s.Button'))).c$$S,["Ground State"]));
this.groundButton.addActionListener$java_awt_event_ActionListener(this);
this.add$java_awt_Component(this.rescaleButton = Clazz.new_((I$[28]||(I$[28]=Clazz.load('a2s.Button'))).c$$S,["Rescale Graphs"]));
this.rescaleButton.addActionListener$java_awt_event_ActionListener(this);
this.stoppedCheck = Clazz.new_((I$[29]||(I$[29]=Clazz.load('a2s.Checkbox'))).c$$S,["Stopped"]);
this.stoppedCheck.addItemListener$java_awt_event_ItemListener(this);
this.add$java_awt_Component(this.stoppedCheck);
this.add$java_awt_Component(Clazz.new_((I$[30]||(I$[30]=Clazz.load('a2s.Label'))).c$$S$I,["Simulation Speed", 0]));
this.add$java_awt_Component(this.speedBar = Clazz.new_((I$[31]||(I$[31]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 80, 1, 300]));
this.add$java_awt_Component(Clazz.new_((I$[30]||(I$[30]=Clazz.load('a2s.Label'))).c$$S$I,["Resolution", 0]));
this.add$java_awt_Component(this.resBar = Clazz.new_((I$[31]||(I$[31]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 260, 180, this.maxStateCount]));
this.add$java_awt_Component(Clazz.new_((I$[30]||(I$[30]=Clazz.load('a2s.Label'))).c$$S$I,["Particle Mass", 0]));
this.add$java_awt_Component(this.massBar = Clazz.new_((I$[31]||(I$[31]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 80, 5, 500]));
this.add$java_awt_Component(this.aux1Label = Clazz.new_((I$[30]||(I$[30]=Clazz.load('a2s.Label'))).c$$S$I,["Aux 1", 0]));
this.add$java_awt_Component(this.aux1Bar = Clazz.new_((I$[31]||(I$[31]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 50, 1, 100]));
this.add$java_awt_Component(this.aux2Label = Clazz.new_((I$[30]||(I$[30]=Clazz.load('a2s.Label'))).c$$S$I,["Aux 2", 0]));
this.add$java_awt_Component(this.aux2Bar = Clazz.new_((I$[31]||(I$[31]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 50, 1, 100]));
this.add$java_awt_Component(this.aux3Label = Clazz.new_((I$[30]||(I$[30]=Clazz.load('a2s.Label'))).c$$S$I,["Aux 3", 0]));
this.add$java_awt_Component(this.aux3Bar = Clazz.new_((I$[31]||(I$[31]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 50, 1, 100]));
try {
var param = this.applet.getParameter$S("PAUSE");
if (param != null ) this.pause = Integer.parseInt(param);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
this.magcoef = Clazz.array(Double.TYPE, [this.maxStateCount]);
this.phasecoef = Clazz.array(Double.TYPE, [this.maxStateCount]);
this.phasecoefcos = Clazz.array(Double.TYPE, [this.maxStateCount]);
this.phasecoefsin = Clazz.array(Double.TYPE, [this.maxStateCount]);
this.phasecoefadj = Clazz.array(Double.TYPE, [this.maxStateCount]);
this.dispmax = Clazz.array(Double.TYPE, [this.maxStateCount]);
this.setResolution();
this.phaseColors = Clazz.array((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))), [481]);
for (i = 0; i != 480; i++) {
var pm = 80;
var a1 = i % pm;
var a2 = (a1 * 255/pm|0);
var a3 = 255 - a2;
var c = null;
switch ((i/pm|0)) {
case 0:
c = Clazz.new_((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).c$$I$I$I,[255, a2, 0]);
break;
case 1:
c = Clazz.new_((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).c$$I$I$I,[a3, 255, 0]);
break;
case 2:
c = Clazz.new_((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).c$$I$I$I,[0, 255, a2]);
break;
case 3:
c = Clazz.new_((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).c$$I$I$I,[0, a3, 255]);
break;
case 4:
c = Clazz.new_((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).c$$I$I$I,[a2, 0, 255]);
break;
case 5:
c = Clazz.new_((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).c$$I$I$I,[255, 0, a3]);
break;
}
this.phaseColors[i] = c;
}
this.phaseColors[480] = this.phaseColors[0];
this.random = Clazz.new_((I$[33]||(I$[33]=Clazz.load('java.util.Random'))));
this.reinit();
this.cv.setBackground$java_awt_Color((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).lightGray);
this.showFormat = (I$[34]||(I$[34]=Clazz.load('java.text.NumberFormat'))).getInstance();
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
var mi = Clazz.new_((I$[35]||(I$[35]=Clazz.load('a2s.MenuItem'))).c$$S,[s]);
mi.addActionListener$java_awt_event_ActionListener(this);
return mi;
});

Clazz.newMeth(C$, 'getCheckItem$S', function (s) {
var mi = Clazz.new_((I$[36]||(I$[36]=Clazz.load('a2s.CheckboxMenuItem'))).c$$S,[s]);
mi.addItemListener$java_awt_event_ItemListener(this);
return mi;
});

Clazz.newMeth(C$, 'getRadioItem$S', function (s) {
if (this.radioGroup == null ) this.radioGroup = Clazz.new_((I$[37]||(I$[37]=Clazz.load('javax.swing.ButtonGroup'))));
var mi = Clazz.new_((I$[38]||(I$[38]=Clazz.load('javax.swing.JRadioButtonMenuItem'))).c$$S,[s]);
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
var potsize = (this.viewPotential == null ) ? 0 : this.viewPotential.height;
var statesize = (this.viewStates == null ) ? 50 : this.viewStates.height;
this.viewX = this.viewP = this.viewParity = this.viewCurrent = this.viewLeft = this.viewRight = this.viewStates = this.viewPotential = this.viewInfo = this.viewSumAll = this.viewDensity = null;
this.viewList = Clazz.array((I$[39]||(I$[39]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').View))), [20]);
var i = 0;
if (this.eCheckItem.getState()) this.viewList[i++] = this.viewPotential = Clazz.new_((I$[39]||(I$[39]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').View))), [this, null]);
if (this.xCheckItem.getState()) this.viewList[i++] = this.viewX = Clazz.new_((I$[39]||(I$[39]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').View))), [this, null]);
if (this.sumAllCheckItem.getState()) this.viewList[i++] = this.viewSumAll = Clazz.new_((I$[39]||(I$[39]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').View))), [this, null]);
if (this.pCheckItem.getState()) this.viewList[i++] = this.viewP = Clazz.new_((I$[39]||(I$[39]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').View))), [this, null]);
if (this.parityCheckItem.getState()) this.viewList[i++] = this.viewParity = Clazz.new_((I$[39]||(I$[39]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').View))), [this, null]);
if (this.currentCheckItem.getState()) this.viewList[i++] = this.viewCurrent = Clazz.new_((I$[39]||(I$[39]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').View))), [this, null]);
if (this.leftRightCheckItem.getState() && this.setup.allowLeftRight() ) {
this.viewList[i++] = this.viewLeft = Clazz.new_((I$[39]||(I$[39]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').View))), [this, null]);
this.viewList[i++] = this.viewRight = Clazz.new_((I$[39]||(I$[39]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').View))), [this, null]);
}if (this.infoCheckItem.getState()) this.viewList[i++] = this.viewInfo = Clazz.new_((I$[39]||(I$[39]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').View))), [this, null]);
if (this.statesCheckItem.getState()) this.viewList[i++] = this.viewStates = Clazz.new_((I$[39]||(I$[39]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').View))), [this, null]);
this.viewCount = i;
var sizenum = this.viewCount;
var toth = this.winSize.height;
if (potsize > 0 && this.viewPotential != null  ) {
sizenum--;
toth = toth-(potsize);
}if (statesize > 0 && this.viewStates != null  ) {
sizenum--;
toth = toth-(statesize);
}var infosize = 65;
if (this.viewInfo != null ) {
sizenum--;
toth = toth-(infosize);
}var cury = 0;
for (i = 0; i != this.viewCount; i++) {
var v = this.viewList[i];
var h = (toth/sizenum|0);
if (v === this.viewPotential  && potsize > 0 ) h = potsize;
 else if (v === this.viewStates  && statesize > 0 ) h = statesize;
 else if (v === this.viewInfo ) h = infosize;
v.x = 0;
v.width = this.winSize.width;
v.y = cury;
v.height = h;
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
var x;
for (x = 0; x != this.stateCount; x++) this.magcoef[x] = 0;

this.magcoef[0] = 1;
this.t = 0;
this.rescaleGraphs();
});

Clazz.newMeth(C$, 'doBlank', function () {
this.t = 0;
if (this.winSize != null  && this.winSize.width > 0 ) this.dbimage = this.createImage$I$I(this.winSize.width, this.winSize.height);
var x;
for (x = 0; x != this.sampleCount; x++) this.func[x] = this.funci[x] = 0;

for (x = 0; x != this.stateCount; x++) this.magcoef[x] = 0;

});

Clazz.newMeth(C$, 'normalize', function () {
var norm = 0;
var i;
for (i = 0; i != this.stateCount; i++) norm += this.magcoef[i] * this.magcoef[i];

if (norm == 0 ) return;
var normmult = 1 / Math.sqrt(norm);
for (i = 0; i != this.stateCount; i++) this.magcoef[i] *= normmult;

this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'maximize', function () {
var i;
var maxm = 0;
for (i = 0; i != this.stateCount; i++) if (this.magcoef[i] > maxm ) maxm = this.magcoef[i];

if (maxm == 0 ) return;
for (i = 0; i != this.stateCount; i++) this.magcoef[i] *= 1 / maxm;

this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'rescaleGraphs', function () {
var i;
for (i = 0; i != this.viewCount; i++) this.viewList[i].scale = 0;

});

Clazz.newMeth(C$, 'transform', function () {
var x;
var y;
this.t = 0;
for (y = 0; y != this.stateCount; y++) {
var a = 0;
var b = 0;
for (x = 1; x != this.sampleCount; x++) {
a += this.modes[y][x] * this.func[x];
b += this.modes[y][x] * this.funci[x];
}
if (a < 1.0E-5  && a > -1.0E-5  ) a = 0;
if (b < 1.0E-5  && b > -1.0E-5  ) b = 0;
var r = Math.sqrt(a * a + b * b);
this.magcoef[y] = r;
var ph2 = Math.atan2(b, a);
this.phasecoefadj[y] = ph2;
this.phasecoef[y] = ph2;
}
if (this.alwaysNormItem.getState()) this.normalize();
if (this.alwaysMaxItem.getState()) this.maximize();
});

Clazz.newMeth(C$, 'centerString$java_awt_Graphics$S$I', function (g, s, y) {
var fm = g.getFontMetrics();
g.drawString$S$I$I(s, ((this.winSize.width - fm.stringWidth$S(s))/2|0), y);
});

Clazz.newMeth(C$, 'updateQuantumStates$java_awt_Graphics', function (realg) {
if (this.winSize == null  || this.winSize.width == 0 ) return;
var g = this.dbimage.getGraphics();
var allQuiet = true;
if (!this.stoppedCheck.getState() && !this.dragging && !this.adjustingStates  ) {
var val = this.speedBar.getValue();
var tadd = Math.exp(val / 20.0) * 0.02;
var sysTime = System.currentTimeMillis();
if (this.lastTime == 0) this.lastTime = sysTime;
this.t += tadd * (sysTime - this.lastTime) * 0.058823529411764705 ;
this.lastTime = sysTime;
allQuiet = false;
} else this.lastTime = 0;
var gray1 = Clazz.new_((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).c$$I$I$I,[76, 76, 76]);
var gray2 = Clazz.new_((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).c$$I$I$I,[127, 127, 127]);
g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(0, 0, this.winSize.width, this.winSize.height);
g.setColor$java_awt_Color(this.cv.getForeground());
var i;
var ox = -1;
var oy = -1;
for (i = 1; i != this.viewCount; i++) {
g.setColor$java_awt_Color(i == this.selectedPaneHandle ? (I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).yellow : (I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).gray);
g.drawLine$I$I$I$I(0, this.viewList[i].y, this.winSize.width, this.viewList[i].y);
}
if (this.statesChanged) {
this.cv.setCursor$java_awt_Cursor((I$[40]||(I$[40]=Clazz.load('java.awt.Cursor'))).getPredefinedCursor$I(3));
if (this.adjustingStates) this.genStates$Z(false);
 else {
realg.setColor$java_awt_Color(this.cv.getBackground());
var fm = realg.getFontMetrics();
var cs = "Calculating...";
realg.fillRect$I$I$I$I(0, this.winSize.height - 30, 20 + fm.stringWidth$S(cs), 30);
realg.setColor$java_awt_Color((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).white);
realg.drawString$S$I$I(cs, 10, this.winSize.height - 10);
this.genStates$Z(true);
if (!this.adiabaticItem.getState()) this.transform();
 else this.rescaleGraphs();
}this.cv.setCursor$java_awt_Cursor(null);
this.statesChanged = false;
if (this.startup) {
this.magcoef[0] = this.magcoef[1] = 1;
this.startup = false;
} else if (this.selectGround) {
this.magcoef[0] = 1;
this.selectGround = false;
}}ox = -1;
var j;
var norm = 0;
if (!this.adjustingStates) {
for (j = 0; j != this.stateCount; j++) {
if (this.magcoef[j] < 1.0E-5  && this.magcoef[j] > -1.0E-5  ) {
this.magcoef[j] = this.phasecoef[j] = this.phasecoefadj[j] = 0;
continue;
}this.phasecoef[j] = (-(this.elevels[j] + 1.0) * this.t + this.phasecoefadj[j]) % 6.283185307179586;
if (this.phasecoef[j] > 3.141592653589793 ) this.phasecoef[j] -= 6.283185307179586;
 else if (this.phasecoef[j] < -3.141592653589793 ) this.phasecoef[j] += 6.283185307179586;
this.phasecoefcos[j] = Math.cos(this.phasecoef[j]);
this.phasecoefsin[j] = Math.sin(this.phasecoef[j]);
norm += this.magcoef[j] * this.magcoef[j];
}
}var normmult2 = 1 / norm;
var normmult = Math.sqrt(normmult2);
if (norm == 0 ) normmult = normmult2 = 0;
if (this.viewPotential != null ) {
var mid_y = this.viewPotential.mid_y;
var ymult = this.viewPotential.ymult;
this.viewPotential.scale = 1;
g.setColor$java_awt_Color(gray2);
g.drawLine$I$I$I$I((this.winSize.width/2|0), mid_y - (ymult|0), (this.winSize.width/2|0), mid_y + (ymult|0));
g.setColor$java_awt_Color((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).gray);
for (i = 0; i != this.elevelCount; i++) {
if (i == this.stateCount) g.setColor$java_awt_Color((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).darkGray);
var dy = this.elevels[i];
var y = mid_y - ((ymult * dy)|0);
g.drawLine$I$I$I$I(0, y, this.winSize.width, y);
}
g.setColor$java_awt_Color((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).white);
for (i = 0; i != this.sampleCount; i++) {
var x = (this.winSize.width * i/this.sampleCount|0);
var dy = this.pot[i];
var y = mid_y - ((ymult * dy)|0);
if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
ox = x;
oy = y;
}
if (!this.adjustingStates && norm != 0   && (this.expectCheckItem.getState() || this.uncertaintyCheckItem.getState() ) ) {
var expecte = 0;
var expecte2 = 0;
for (i = 0; i != this.stateCount; i++) {
var prob = this.magcoef[i] * this.magcoef[i] * normmult2 ;
expecte += prob * this.elevels[i];
expecte2 += prob * this.elevels[i] * this.elevels[i] ;
}
var uncert = Math.sqrt(expecte2 - expecte * expecte);
if (this.uncertaintyCheckItem.getState()) {
if (!(uncert >= 0 )) uncert = 0;
g.setColor$java_awt_Color((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).blue);
var y = mid_y - ((ymult * (expecte + uncert))|0);
g.drawLine$I$I$I$I(0, y, this.winSize.width, y);
y = mid_y - ((ymult * (expecte - uncert))|0);
if (expecte - uncert >= -1 ) g.drawLine$I$I$I$I(0, y, this.winSize.width, y);
}if (this.expectCheckItem.getState()) {
var y = mid_y - ((ymult * expecte)|0);
g.setColor$java_awt_Color((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).red);
g.drawLine$I$I$I$I(0, y, this.winSize.width, y);
}}if (this.selectedCoef != -1 && !this.dragging ) {
g.setColor$java_awt_Color((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).yellow);
var y = mid_y - ((ymult * this.elevels[this.selectedCoef])|0);
g.drawLine$I$I$I$I(0, y, this.winSize.width, y);
}}ox = -1;
g.setColor$java_awt_Color((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).white);
var maxf = 0;
var expectx = 0;
if (!this.adjustingStates && !this.adjustingWaveFunc ) {
for (i = 0; i != this.sampleCount; i++) {
var x = (this.winSize.width * i/this.sampleCount|0);
var dr = 0;
var di = 0;
for (j = 0; j != this.stateCount; j++) {
dr += this.magcoef[j] * this.modes[j][i] * this.phasecoefcos[j] ;
di += this.magcoef[j] * this.modes[j][i] * this.phasecoefsin[j] ;
}
dr *= normmult;
di *= normmult;
this.func[i] = dr;
this.funci[i] = di;
var dy = dr * dr + di * di;
expectx += dy * x;
if (dy > maxf ) maxf = dy;
}
} else {
for (i = 0; i != this.sampleCount; i++) {
var x = (this.winSize.width * i/this.sampleCount|0);
var dr = this.func[i];
var di = this.funci[i];
var dy = dr * dr + di * di;
expectx += dy * x;
if (dy > maxf ) maxf = dy;
}
}if (this.viewX != null ) {
var mid_y = this.viewX.mid_y;
var ymult = this.viewX.ymult;
this.drawFunction$java_awt_Graphics$com_falstad_QuantumStatesFrame_View$DA$DA$I$I(g, this.viewX, this.func, this.funci, this.sampleCount, 0);
if (this.selectedCoef != -1 && !this.dragging ) {
g.setColor$java_awt_Color((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).yellow);
ox = -1;
for (i = 0; i != this.sampleCount; i++) {
var x = (this.winSize.width * i/this.sampleCount|0);
var dy = this.modes[this.selectedCoef][i] / this.dispmax[this.selectedCoef];
var y = mid_y - ((ymult * dy)|0);
if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
ox = x;
oy = y;
}
}if (this.selectedPState != 0 ) {
g.setColor$java_awt_Color((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).yellow);
ox = -1;
var s2 = this.sampleCount * 2;
for (i = 0; i != s2; i++) {
var x = (this.winSize.width * i/s2|0);
var dy = Math.cos(this.selectedPState * (i - this.sampleCount) * 0.5 );
var y = mid_y - ((ymult * dy)|0);
if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
ox = x;
oy = y;
}
}}if (this.viewP != null ) {
for (i = 0; i != this.pSampleCount * 2; i++) this.pdata[i] = 0;

for (i = 0; i != this.sampleCount; i++) {
var ii = (i <= (this.sampleCount/2|0)) ? ((this.sampleCount/2|0) - i) * 2 : (this.pSampleCount - (i - (this.sampleCount/2|0))) * 2;
this.pdata[ii] = this.func[this.sampleCount - 1 - i ];
this.pdata[ii + 1] = this.funci[this.sampleCount - 1 - i ];
}
this.fft.transform$DA$Z(this.pdata, false);
var pnorm = 1 / Math.sqrt(this.pSampleCount);
for (i = 0; i != this.pSampleCount; i++) {
var ii = (i <= (this.pSampleCount/2|0)) ? ((this.pSampleCount/2|0) - i) * 2 : (this.pSampleCount - (i - (this.pSampleCount/2|0))) * 2;
this.pdatar[i] = this.pdata[ii] * pnorm;
this.pdatai[i] = this.pdata[ii + 1] * pnorm;
}
var offset = (this.pSampleCount/4|0);
this.drawFunction$java_awt_Graphics$com_falstad_QuantumStatesFrame_View$DA$DA$I$I(g, this.viewP, this.pdatar, this.pdatai, (this.pSampleCount/2|0), offset);
}if (this.viewParity != null ) {
var pplus = 0;
var pminus = 0;
for (i = 0; i != this.sampleCount; i++) {
var a1 = this.func[i];
var a2 = this.funci[i];
var b1 = this.func[this.sampleCount - 1 - i ];
var b2 = this.funci[this.sampleCount - 1 - i ];
var c1 = (a1 + b1) * (a1 + b1) + (a2 + b2) * (a2 + b2);
var c2 = (a1 - b1) * (a1 - b1) + (a2 - b2) * (a2 - b2);
pplus += c1;
pminus += c2;
}
this.parityData[90] = Math.sqrt(pplus) / 2;
this.parityData[10] = Math.sqrt(pminus) / 2;
this.drawFunction$java_awt_Graphics$com_falstad_QuantumStatesFrame_View$DA$DA$I$I(g, this.viewParity, this.parityData, null, 100, 0);
}if (this.viewCurrent != null ) {
for (i = 0; i != this.sampleCount - 1; i++) {
var a1 = this.func[i + 1] - this.func[i];
var a2 = this.funci[i + 1] - this.funci[i];
this.currentData[i] = this.func[i] * a2 - this.funci[i] * a1;
}
this.drawFunction$java_awt_Graphics$com_falstad_QuantumStatesFrame_View$DA$DA$I$I(g, this.viewCurrent, this.currentData, null, this.sampleCount, 0);
}if (this.viewLeft != null  && this.viewRight != null   && !this.setupModified ) {
if (this.viewX != null ) this.viewLeft.scale = this.viewRight.scale = this.viewX.scale;
if (Clazz.instanceOf(this.setup, "com.falstad.QuantumStatesFrame.HarmonicOscillatorSetup")) this.doOscLeftRight$java_awt_Graphics(g);
 else if (Clazz.instanceOf(this.setup, "com.falstad.QuantumStatesFrame.InfiniteWellSetup")) this.doBoxLeftRight$java_awt_Graphics$D(g, normmult);
}if (this.viewSumAll != null  && !this.adjustingStates ) {
var sumx = Clazz.array(Double.TYPE, [this.sampleCount]);
for (j = 0; j != this.stateCount; j++) for (i = 0; i != this.sampleCount; i++) sumx[i] += this.modes[j][i] * this.modes[j][i];


this.drawFunction$java_awt_Graphics$com_falstad_QuantumStatesFrame_View$DA$DA$I$I(g, this.viewSumAll, sumx, null, this.sampleCount, 0);
}if (this.viewInfo != null ) {
var s = Clazz.array(java.lang.String, [5]);
this.setup.getInfo$SA$I(s, 2);
var expecte = 0;
for (i = 0; i != this.stateCount; i++) {
var prob = this.magcoef[i] * this.magcoef[i] * normmult2 ;
expecte += prob * this.elevels[i];
}
g.setColor$java_awt_Color((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).white);
s[0] = "<E> = " + this.getEnergyText$D$Z(expecte, true);
var realt = this.t * 6.58212E-16 / this.convertEnergy$D$Z(1, false);
s[1] = "t = " + this.getUnitText$D$S(realt, "s");
var massStr = ", m = " + this.getUnitText$D$S(this.mass, "eV") + "/c^2" ;
if (this.mass == 511000.0 ) massStr += " (electron)";
s[0] += massStr;
for (i = 0; s[i] != null ; i++) {
var y = (i + 1) * 15;
if (y + 4 < this.viewInfo.height) this.centerString$java_awt_Graphics$S$I(g, s[i], y + this.viewInfo.y);
}
}if (this.viewStates != null  && !this.adjustingStates ) {
this.stateColSize = (this.winSize.width/10|0);
if (this.stateColSize < 20) this.stateColSize = 20;
for (i = this.stateColSize - 1; i >= 8; i--) {
var ss = (this.winSize.width/i|0);
var h = ss * (((this.stateCount + i - 1)/i|0));
if (h <= this.viewStates.height - 5) this.stateColSize = i;
}
this.stateSize = (this.winSize.width/this.stateColSize|0);
var ss2 = (this.stateSize/2|0);
for (i = 0; i != this.stateCount; i++) {
var x = this.stateSize * (i % this.stateColSize) + ss2;
var y = this.stateSize * ((i/this.stateColSize|0)) + ss2 + this.viewStates.y + 5;
g.setColor$java_awt_Color(i == this.selectedCoef ? (I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).yellow : (this.magcoef[i] == 0 ) ? gray2 : (I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).white);
g.drawOval$I$I$I$I(x - ss2, y - ss2, this.stateSize, this.stateSize);
var xa = ((this.magcoef[i] * this.phasecoefcos[i] * ss2 )|0);
var ya = ((-this.magcoef[i] * this.phasecoefsin[i] * ss2 )|0);
g.drawLine$I$I$I$I(x, y, x + xa, y + ya);
g.drawLine$I$I$I$I(x + xa - 1, y + ya, x + xa + 1 , y + ya);
g.drawLine$I$I$I$I(x + xa, y + ya - 1, x + xa, y + ya + 1 );
}
}realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
if (!this.stoppedCheck.getState() && !allQuiet ) this.cv.repaint$J(this.pause);
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

Clazz.newMeth(C$, 'drawFunction$java_awt_Graphics$com_falstad_QuantumStatesFrame_View$DA$DA$I$I', function (g, view, fr, fi, count, offset) {
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
if (!this.adjustingWaveFunc) {
view.scale *= 1.001;
if (view.scale > bestscale  || view.scale == 0  ) view.scale = bestscale;
if (view.scale > 1.0E8 ) view.scale = 1.0E8;
}g.setColor$java_awt_Color((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).gray);
if ((this.probCheckItem.isSelected() || this.probPhaseCheckItem.isSelected() || this.magPhaseCheckItem.isSelected()  ) && fi != null  ) {
g.setColor$java_awt_Color((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).white);
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
var mid_y = view.mid_y;
var mult = view.ymult * view.scale;
if (fi != null ) {
g.setColor$java_awt_Color((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).blue);
for (i = 0; i != count; i++) {
var x = (this.winSize.width * i/(count - 1)|0);
var ii = i + offset;
var y = mid_y - ((mult * fi[ii])|0);
if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
ox = x;
oy = y;
}
}g.setColor$java_awt_Color((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).white);
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
if (this.uncertaintyCheckItem.getState()) {
g.setColor$java_awt_Color((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).blue);
g.drawLine$I$I$I$I(((expectx - uncert)|0), view.y, ((expectx - uncert)|0), view.y + view.height);
g.drawLine$I$I$I$I(((expectx + uncert)|0), view.y, ((expectx + uncert)|0), view.y + view.height);
}if (this.expectCheckItem.getState()) {
g.setColor$java_awt_Color((I$[32]||(I$[32]=Clazz.load('java.awt.Color'))).red);
g.drawLine$I$I$I$I((expectx|0), view.y, (expectx|0), view.y + view.height);
}}});

Clazz.newMeth(C$, 'doOscLeftRight$java_awt_Graphics', function (g) {
var i;
for (i = 0; i != this.pSampleCount * 2; i++) this.pdata[i] = 0;

for (i = 0; i != this.sampleCount; i++) {
var ii = (i <= (this.sampleCount/2|0)) ? ((this.sampleCount/2|0) - i) * 2 : (this.pSampleCount - (i - (this.sampleCount/2|0))) * 2;
this.pdata[ii] = this.func[i];
this.pdata[ii + 1] = this.funci[i];
}
this.fft.transform$DA$Z(this.pdata, false);
for (i = 2; i != this.pSampleCount; i++) this.pdata[i] = 0;

this.fft.transform$DA$Z(this.pdata, true);
var pnorm = 1.0 / this.pSampleCount;
for (i = 0; i != this.sampleCount; i++) {
var ii = (i <= (this.sampleCount/2|0)) ? ((this.sampleCount/2|0) - i) * 2 : (this.pSampleCount - (i - (this.sampleCount/2|0))) * 2;
this.pdatar[i] = this.pdata[ii] * pnorm;
this.pdatai[i] = this.pdata[ii + 1] * pnorm;
}
this.drawFunction$java_awt_Graphics$com_falstad_QuantumStatesFrame_View$DA$DA$I$I(g, this.viewLeft, this.pdatar, this.pdatai, this.sampleCount, 0);
for (i = 0; i != this.sampleCount; i++) {
this.pdatar[i] = this.func[i] - this.pdatar[i];
this.pdatai[i] = this.funci[i] - this.pdatai[i];
}
this.drawFunction$java_awt_Graphics$com_falstad_QuantumStatesFrame_View$DA$DA$I$I(g, this.viewRight, this.pdatar, this.pdatai, this.sampleCount, 0);
});

Clazz.newMeth(C$, 'doBoxLeftRight$java_awt_Graphics$D', function (g, normmult) {
if (this.adjustingStates) return;
if (this.modesLeft == null ) {
var width = (this.setup).getOffset() - 1;
this.modesLeft = Clazz.array(Double.TYPE, [this.stateCount, this.sampleCount]);
var i;
var j;
for (i = 0; i != this.stateCount; i++) {
var ni = i + 1;
var sgn = (this.modes[i][width] > 0 ) ? 1 : -1;
var mult = sgn * this.dispmax[i];
var xmult = 3.141592653589793 / (this.sampleCount - width * 2 - 1);
for (j = width; j != this.sampleCount - width; j++) {
var xx = (j - width) * xmult;
this.modesLeft[i][j] = Math.cos(xx * ni) * mult;
}
}
}var i;
var j;
normmult *= 0.5;
for (i = 0; i != this.sampleCount; i++) {
var dr = 0;
var di = 0;
for (j = 0; j != this.stateCount; j++) {
var a = this.magcoef[j] * this.phasecoefcos[j];
var b = this.magcoef[j] * this.phasecoefsin[j];
dr += this.modes[j][i] * a - this.modesLeft[j][i] * b;
di += this.modes[j][i] * b + this.modesLeft[j][i] * a;
}
this.pdatar[i] = dr * normmult;
this.pdatai[i] = di * normmult;
}
this.drawFunction$java_awt_Graphics$com_falstad_QuantumStatesFrame_View$DA$DA$I$I(g, this.viewLeft, this.pdatar, this.pdatai, this.sampleCount, 0);
for (i = 0; i != this.sampleCount; i++) {
this.pdatar[i] = this.func[i] - this.pdatar[i];
this.pdatai[i] = this.funci[i] - this.pdatai[i];
}
this.drawFunction$java_awt_Graphics$com_falstad_QuantumStatesFrame_View$DA$DA$I$I(g, this.viewRight, this.pdatar, this.pdatai, this.sampleCount, 0);
});

Clazz.newMeth(C$, 'edit$java_awt_event_MouseEvent', function (e) {
if (this.selection == 0) return;
var x = e.getX();
var y = e.getY();
switch (this.selection) {
case 5:
this.editHandle$I(y);
break;
case 4:
this.editMag$I$I(x, y);
break;
default:
this.editFunc$I$I(x, y);
break;
}
});

Clazz.newMeth(C$, 'editHandle$I', function (y) {
var dy = y - this.viewList[this.selectedPaneHandle].y;
var upper = this.viewList[this.selectedPaneHandle - 1];
var lower = this.viewList[this.selectedPaneHandle];
var minheight = 10;
if (upper.height + dy < minheight || lower.height - dy < minheight ) return;
upper.height = upper.height+(dy);
lower.height = lower.height-(dy);
lower.y = lower.y+(dy);
this.setGraphLines();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'editMag$I$I', function (x, y) {
if (this.selectedCoef == -1) return;
var ss2 = (this.stateSize/2|0);
var x0 = this.stateSize * (this.selectedCoef % this.stateColSize) + ss2;
var y0 = this.stateSize * ((this.selectedCoef/this.stateColSize|0)) + ss2 + this.viewStates.y + 5;
x = x-(x0);
y = y-(y0);
var mag = Math.sqrt(x * x + y * y) / ss2;
var ang = Math.atan2(-y, x);
var ang0 = (-(this.elevels[this.selectedCoef] + 1.0) * this.t) % 6.283185307179586;
if (mag > 10 ) mag = 0;
if (mag > 1 ) mag = 1;
this.magcoef[this.selectedCoef] = mag;
this.phasecoefadj[this.selectedCoef] = (ang - ang0) % 6.283185307179586;
if (this.phasecoefadj[this.selectedCoef] > 3.141592653589793 ) this.phasecoefadj[this.selectedCoef] -= 6.283185307179586;
if (this.alwaysNormItem.getState()) this.normalize();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'editFunc$I$I', function (x, y) {
if (this.mouseChooser.getSelectedIndex() == 0) {
if (this.selection == 2) {
this.editXState$I$I(x, y);
return;
}if (this.selection == 3) {
this.editPState$I$I(x, y);
return;
}if (this.selection == 1) {
this.findStateByEnergy$I(y);
this.enterSelectedState();
}return;
}if (this.mouseChooser.getSelectedIndex() == 2) {
if (this.selection == 2) this.editXGauss$I$I(x, y);
if (this.selection == 3) this.editPGauss$I$I(x, y);
if (this.selection == 1) {
this.findStateByEnergy$I(y);
this.enterSelectedState();
}return;
}if (this.mouseChooser.getSelectedIndex() == 3) {
if (this.selection == 2) this.translateXGauss$I(x);
if (this.selection == 3) this.translatePGauss$I(x);
return;
}if (this.selection == 3) return;
if (this.dragX == x) {
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
}if (this.adjustingWaveFunc) {
this.transform();
if (this.alwaysNormItem.getState()) this.normalize();
 else this.maximize();
}});

Clazz.newMeth(C$, 'editXGauss$I$I', function (x, y) {
var i;
var xi = (x * this.sampleCount/this.winSize.width|0);
var mult = Math.exp(-(y - this.viewX.mid_y) * 0.03 - 4);
for (i = 0; i != this.sampleCount; i++) {
var ii = i - xi;
this.func[i] = Math.exp(-ii * ii * mult );
this.funci[i] = 0;
}
this.transform();
if (this.alwaysNormItem.getState()) this.normalize();
 else this.maximize();
this.rescaleGraphs();
});

Clazz.newMeth(C$, 'editPGauss$I$I', function (x, y) {
var i;
var xi = (x * this.sampleCount/this.winSize.width|0);
var mult = Math.exp((y - this.viewP.mid_y) * 0.03 - 4);
var p = this.getPState$I(x);
var s2 = (this.sampleCount/2|0);
for (i = 0; i != this.sampleCount; i++) {
var ii = i - s2;
var n = Math.exp(-ii * ii * mult );
this.func[i] = Math.cos(p * ii) * n;
this.funci[i] = Math.sin(p * ii) * n;
}
this.selectedPState = 0;
this.transform();
if (this.alwaysNormItem.getState()) this.normalize();
 else this.maximize();
this.rescaleGraphs();
});

Clazz.newMeth(C$, 'translateXGauss$I', function (x) {
var dx = x - this.dragX;
if (dx == 0) return;
this.dragX = x;
var i;
dx = (dx * this.sampleCount/this.winSize.width|0);
if (dx > 0) {
for (i = this.sampleCount - dx - 1 ; i >= 0; i--) {
this.func[i + dx] = this.func[i];
this.funci[i + dx] = this.funci[i];
}
} else {
for (i = -dx; i != this.sampleCount; i++) {
this.func[i + dx] = this.func[i];
this.funci[i + dx] = this.funci[i];
}
}this.transform();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'translatePGauss$I', function (x) {
var px = this.getPState$I(x) - this.getPState$I(this.dragX);
this.dragX = x;
var i;
for (i = 0; i != this.sampleCount; i++) {
var dr = Math.cos(px * i) * this.func[i] - Math.sin(px * i) * this.funci[i];
var di = Math.cos(px * i) * this.funci[i] + Math.sin(px * i) * this.func[i];
this.func[i] = dr;
this.funci[i] = di;
}
this.transform();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'editFuncPoint$I$I', function (x, y) {
var v = (this.selection == 2) ? this.viewX : this.viewPotential;
var lox = (x * this.sampleCount/this.winSize.width|0);
var hix = (((x + 1) * this.sampleCount - 1)/this.winSize.width|0);
var val = (v.mid_y - y) / v.ymult;
var val2 = (v.lower_y - y) / v.ymult2;
if (val > 1 ) val = 1;
if (val < -1 ) val = -1;
if (val2 > 1 ) val2 = 1;
if (val2 < 0 ) val2 = 0;
val /= v.scale;
val2 /= v.scale;
if (lox < 1) lox = 1;
if (hix >= this.sampleCount - 1) hix = this.sampleCount - 2;
for (; lox <= hix; lox++) {
if (this.selection == 1) {
this.pot[lox] = val;
this.setupModified = true;
this.adjustingStates = this.statesChanged = true;
} else {
if (this.probCheckItem.isSelected() || this.probPhaseCheckItem.isSelected() ) {
var valnew = Math.sqrt(val2);
var n = Math.sqrt(this.func[lox] * this.func[lox] + this.funci[lox] * this.funci[lox]);
if (n == 0 ) {
this.func[lox] = 1;
n = 1;
}this.func[lox] = valnew * this.func[lox] / n;
this.funci[lox] = valnew * this.funci[lox] / n;
} else if (this.magPhaseCheckItem.isSelected()) {
var n = Math.sqrt(this.func[lox] * this.func[lox] + this.funci[lox] * this.funci[lox]);
if (n == 0 ) {
this.func[lox] = 1;
n = 1;
}this.func[lox] = val2 * this.func[lox] / n;
this.funci[lox] = val2 * this.funci[lox] / n;
} else {
this.func[lox] = val;
}this.adjustingWaveFunc = true;
}}
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'editXState$I$I', function (x, y) {
var ax = (x * this.sampleCount/this.winSize.width|0);
if (ax < 1 || ax >= this.sampleCount ) return;
var i;
for (i = 0; i != this.sampleCount; i++) this.func[i] = this.funci[i] = 0;

this.func[ax] = 1;
this.transform();
this.rescaleGraphs();
if (!this.alwaysNormItem.getState()) this.maximize();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'getPState$I', function (x) {
var p = (((x * this.pSampleCount/2|0)/this.winSize.width|0)) - (this.pSampleCount/4|0);
return p * 3.141592653589793 / ((this.pSampleCount/2|0));
});

Clazz.newMeth(C$, 'editPState$I$I', function (x, y) {
var p = this.getPState$I(x);
var i;
var s2 = (this.sampleCount/2|0);
for (i = 0; i != this.sampleCount; i++) {
this.func[i] = Math.cos(p * (i - s2));
this.funci[i] = Math.sin(p * (i - s2));
}
this.transform();
this.rescaleGraphs();
if (!this.alwaysNormItem.getState()) this.maximize();
this.selectedPState = 0;
this.cv.repaint$J(this.pause);
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
if (e.getSource() === this.measureEItem ) this.measureE();
if (e.getSource() === this.measureXItem ) this.measureX();
if (e.getSource() === this.groundButton ) this.doGround();
if (e.getSource() === this.blankButton ) this.doBlank();
if (e.getSource() === this.normalizeButton ) this.normalize();
if (e.getSource() === this.maximizeButton ) this.maximize();
if (e.getSource() === this.rescaleButton ) this.rescaleGraphs();
});

Clazz.newMeth(C$, 'scrollbarValueChanged$com_falstad_DecentScrollbar', function (ds) {
System.out.print$S(ds.getValue() + "\n");
if (ds === this.massBar ) {
this.statesChanged = this.adjustingStates = true;
this.cv.repaint$J(this.pause);
}if (ds === this.aux1Bar  || ds === this.aux2Bar   || ds === this.aux3Bar  ) {
this.adjustingStates = true;
this.setup.drawPotential();
this.statesChanged = true;
this.cv.repaint$J(this.pause);
}if (ds === this.resBar ) this.adjustingStates = true;
});

Clazz.newMeth(C$, 'scrollbarFinished$com_falstad_DecentScrollbar', function (ds) {
if (ds === this.resBar ) {
this.adjustingStates = false;
this.setResolution();
this.reinit();
this.cv.repaint$J(this.pause);
}if (ds === this.massBar  || ds === this.aux1Bar   || ds === this.aux2Bar   || ds === this.aux3Bar  ) {
this.adjustingStates = false;
this.statesChanged = true;
this.cv.repaint$J(this.pause);
}});

Clazz.newMeth(C$, 'handleEvent$java_awt_Event', function (ev) {
if (ev.id == 201) {
if (this.applet == null ) this.dispose();
 else this.applet.destroyFrame();
return true;
}return C$.superclazz.prototype.handleEvent$java_awt_Event.apply(this, [ev]);
});

Clazz.newMeth(C$, 'setResolution', function () {
this.sampleCount = this.resBar.getValue();
this.sampleCount++;
this.func = Clazz.array(Double.TYPE, [this.sampleCount]);
this.funci = Clazz.array(Double.TYPE, [this.sampleCount]);
this.pot = Clazz.array(Double.TYPE, [this.sampleCount]);
this.statesChanged = true;
var ps = 8 * this.sampleCount;
this.pSampleCount = 1;
while (this.pSampleCount < ps)this.pSampleCount = this.pSampleCount*(2);

this.pdata = Clazz.array(Double.TYPE, [this.pSampleCount * 2]);
this.pdatar = Clazz.array(Double.TYPE, [this.pSampleCount]);
this.pdatai = Clazz.array(Double.TYPE, [this.pSampleCount]);
this.parityData = Clazz.array(Double.TYPE, [100]);
this.currentData = Clazz.array(Double.TYPE, [this.sampleCount]);
this.fft = Clazz.new_((I$[41]||(I$[41]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').FFT))).c$$I, [this, null, this.pSampleCount]);
});

Clazz.newMeth(C$, 'logInterpolate$D$D$D$D', function (x, maxx, loval, hival) {
return Math.exp((x / maxx) * Math.log(hival / loval)) * loval;
});

Clazz.newMeth(C$, 'genStates$Z', function (getStates) {
System.out.println$S("genstates");
this.statesChanged = false;
var n = this.sampleCount;
var d = Clazz.array(Double.TYPE, [n + 1]);
var e = Clazz.array(Double.TYPE, [n + 1]);
var z = Clazz.array(Double.TYPE, [n + 1, n + 1]);
var i;
var j;
if (this.massBar.getValue() <= 80) this.mass = this.massBar.getValue() / 5.0 * 0.02;
 else this.mass = this.logInterpolate$D$D$D$D(this.massBar.getValue() - 80, 420, 0.32, 20.0);
var m1 = 1 / (this.mass * 1.006);
this.mass *= 1596875.0;
var maxpot = -20;
var rescorr = this.sampleCount / 128.0;
m1 *= rescorr * rescorr;
for (i = 1; i <= n; i++) {
if (i < n) e[i] = -m1;
d[i] = 2 * m1 + this.pot[i - 1];
if (this.pot[i - 1] > maxpot ) maxpot = this.pot[i - 1];
for (j = 1; j <= n; j++) z[i][j] = 0;

z[i][i] = 1;
}
C$.imtql2$I$DA$DA$DAA(n, d, e, getStates ? z : null);
this.elevels = Clazz.array(Double.TYPE, [n]);
this.elevelCount = n;
for (i = 0; i != n; i++) {
this.elevels[i] = d[i + 1];
}
var si;
var sj;
for (si = 1; si < n; si++) {
var v = this.elevels[si];
sj = si;
while (this.elevels[sj - 1] > v ){
this.elevels[sj] = this.elevels[sj - 1];
sj--;
if (sj <= 0) break;
}
this.elevels[sj] = v;
}
while (maxpot > 0  && this.elevels[this.elevelCount - 1] > maxpot  )this.elevelCount--;

this.stateCount = this.elevelCount;
var maxs = (this.sampleCount * 3/8|0);
if (this.stateCount > maxs && getStates ) this.stateCount = maxs;
if (!getStates) return;
this.modes = Clazz.array(Double.TYPE, [this.stateCount, this.sampleCount]);
for (i = 0; i != this.stateCount; i++) {
for (j = 0; j != n; j++) if (this.elevels[i] == d[j + 1] ) break;

if (j == n) {
System.out.print$S("can't find elevels! " + i + " " + new Double(this.elevels[i]).toString() + "\n" );
continue;
}d[j + 1] = -1;
var k;
this.dispmax[i] = 0;
for (k = 0; k != n; k++) {
this.modes[i][k] = z[k + 1][j + 1];
if (this.modes[i][k] > this.dispmax[i] ) this.dispmax[i] = this.modes[i][k];
 else if (-this.modes[i][k] > this.dispmax[i] ) this.dispmax[i] = -this.modes[i][k];
}
}
this.modesLeft = null;
if (!this.setupModified) this.setup.fudgeLevels();
System.out.println$S("done");
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
this.selectedPState = 0;
this.selectedPaneHandle = -1;
this.selection = 0;
var i;
for (i = 1; i != this.viewCount; i++) {
var dy = y - this.viewList[i].y;
if (dy >= -3 && dy <= 3 ) {
this.selectedPaneHandle = i;
this.selection = 5;
}}
var cs = null;
if (this.selection == 5) cs = (I$[40]||(I$[40]=Clazz.load('java.awt.Cursor'))).getPredefinedCursor$I(8);
 else if (this.viewX != null  && this.viewX.contains$I$I(x, y) ) this.selection = 2;
 else if (this.viewP != null  && this.viewP.contains$I$I(x, y) ) {
this.selection = 3;
this.selectedPState = this.getPState$I(x);
this.cv.repaint$J(this.pause);
} else if (this.viewPotential != null  && this.viewPotential.contains$I$I(x, y) ) {
this.selection = 1;
if (this.mouseChooser.getSelectedIndex() != 1) this.findStateByEnergy$I(y);
} else if (this.viewStates != null  && this.viewStates.contains$I$I(x, y) ) {
var xi = (x/this.stateSize|0);
var yi = ((y - (this.viewStates.y + 5))/this.stateSize|0);
this.selectedCoef = xi + yi * this.stateColSize;
if (this.selectedCoef >= this.stateCount) this.selectedCoef = -1;
if (this.selectedCoef != -1) this.selection = 4;
}this.cv.setCursor$java_awt_Cursor(cs);
if (this.selection != oldSelection || this.selectedCoef != oldCoef ) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'findStateByEnergy$I', function (y) {
if (this.adjustingStates || this.statesChanged ) return;
var i;
var dy = (this.viewPotential.mid_y - y) / this.viewPotential.ymult;
var dist = 100;
for (i = 0; i != this.stateCount; i++) {
var d = Math.abs(this.elevels[i] - dy);
if (d < dist ) {
dist = d;
this.selectedCoef = i;
}}
});

Clazz.newMeth(C$, 'mouseClicked$java_awt_event_MouseEvent', function (e) {
if (e.getClickCount() == 2 && this.selectedCoef != -1 ) this.enterSelectedState();
});

Clazz.newMeth(C$, 'enterSelectedState', function () {
var i;
for (i = 0; i != this.stateCount; i++) if (this.selectedCoef != i) this.magcoef[i] = 0;

this.magcoef[this.selectedCoef] = 1;
this.cv.repaint$J(this.pause);
this.rescaleGraphs();
});

Clazz.newMeth(C$, 'mouseEntered$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseExited$java_awt_event_MouseEvent', function (e) {
if (!this.dragging) {
if (this.selectedCoef != -1) {
this.selectedCoef = -1;
this.cv.repaint$J(this.pause);
}if (this.selectedPState != 0 ) {
this.selectedPState = 0;
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
if (this.mouseChooser.getSelectedIndex() == 1 && this.selection == 1 ) {
this.adjustingStates = false;
this.statesChanged = true;
}if (this.selection == 4 && this.alwaysMaxItem.getState() ) this.maximize();
this.dragging = this.adjustingWaveFunc = false;
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
if (!this.finished) return;
if (e.getItemSelectable() === this.stoppedCheck ) {
this.cv.repaint$J(this.pause);
return;
}if (e.getItemSelectable() === this.setupChooser ) this.doSetup();
if (Clazz.instanceOf(e.getItemSelectable(), "a2s.CheckboxMenuItem")) {
this.handleResize();
this.cv.repaint$J(this.pause);
}if (e.getItemSelectable() === this.alwaysNormItem  && this.alwaysNormItem.getState() ) {
this.normalize();
this.alwaysMaxItem.setState$Z(false);
this.cv.repaint$J(this.pause);
}if (e.getItemSelectable() === this.alwaysMaxItem  && this.alwaysMaxItem.getState() ) {
this.maximize();
this.alwaysNormItem.setState$Z(false);
this.cv.repaint$J(this.pause);
}var i;
for (i = 0; i != this.waveFunctionMenu.countItems(); i++) if (e.getItemSelectable() === this.waveFunctionMenu.getItem$I(i) ) {
var j;
(this.waveFunctionMenu.getItem$I(i)).setState$Z(true);
for (j = 0; j != this.waveFunctionMenu.countItems(); j++) if (i != j) (this.waveFunctionMenu.getItem$I(j)).setState$Z(false);

this.rescaleGraphs();
}
});

Clazz.newMeth(C$, 'doSetup', function () {
this.doBlank();
var i;
for (i = 0; i != this.sampleCount; i++) this.func[i] = this.funci[i] = this.pot[i] = 0;

this.setup = this.setupList.elementAt$I(this.setupChooser.getSelectedIndex());
this.aux1Bar.setValue$I(100);
this.aux2Bar.setValue$I(100);
this.aux3Bar.setValue$I(100);
this.selectGround = true;
this.setup.select();
this.setup.drawPotential();
this.setupModified = false;
this.statesChanged = true;
if (this.setup.getAuxBarCount() >= 2) {
this.aux2Label.show();
this.aux2Bar.show();
} else {
this.aux2Label.hide();
this.aux2Bar.hide();
}if (this.setup.getAuxBarCount() == 3) {
this.aux3Label.show();
this.aux3Bar.show();
} else {
this.aux3Label.hide();
this.aux3Bar.hide();
}if (this.setup.allowLeftRight()) this.leftRightCheckItem.enable();
 else {
this.leftRightCheckItem.disable();
this.leftRightCheckItem.setState$Z(false);
}this.handleResize();
this.validate();
this.selectedCoef = -1;
});

Clazz.newMeth(C$, 'measureE', function () {
this.normalize();
var n = this.random.nextDouble();
var i;
for (i = 0; i != this.stateCount; i++) {
var m = this.magcoef[i] * this.magcoef[i];
n -= m;
if (n < 0 ) break;
}
if (i == this.stateCount) return;
var pick = i;
for (i = 0; i != this.stateCount; i++) this.magcoef[i] = 0;

this.magcoef[pick] = 1;
this.rescaleGraphs();
});

Clazz.newMeth(C$, 'measureX', function () {
var i;
var n = this.random.nextDouble();
for (i = 0; i != this.sampleCount; i++) {
var m = this.func[i] * this.func[i] + this.funci[i] * this.funci[i];
n -= m;
if (n < 0 ) break;
}
if (i == this.sampleCount) return;
var pick = i;
for (i = 0; i != this.sampleCount; i++) this.func[i] = this.funci[i] = 0;

this.func[pick] = 1;
this.transform();
this.rescaleGraphs();
this.normalize();
});

Clazz.newMeth(C$, 'imtql2$I$DA$DA$DAA', function (n, d, e, z) {
var i;
var j;
var k;
var L;
var m;
var ii;
var nm;
var mml;
var n2 = n * n;
var b;
var c;
var f;
var g;
var p;
var r;
var s;
var s1;
var s2;
if (n == 1) return;
for (L = 0; L != n; L++) {
j = 0;
while (true){
for (m = L; m < n - 1; m++) {
s1 = Math.abs(d[m]) + Math.abs(d[m + 1]);
s2 = s1 + Math.abs(e[m]);
if (s2 == s1 ) break;
}
if (m == L) break;
p = d[L];
if (j++ == 30) {
System.out.println$S("Too many iterations in imtql2");
break;
}g = (d[L + 1] - p) / (2 * e[L]);
r = Math.sqrt(g * g + 1);
g = d[m] - p + e[L] / (g + ((g > 0 ) ? Math.abs(r) : -Math.abs(r)));
s = 1;
c = 1;
p = 0;
for (i = m - 1; i >= L; i--) {
f = s * e[i];
b = c * e[i];
if (Math.abs(f) >= Math.abs(g) ) {
c = g / f;
r = Math.sqrt(c * c + 1);
e[i + 1] = f * r;
s = 1 / r;
c *= s;
} else {
s = f / g;
r = Math.sqrt(s * s + 1);
e[i + 1] = g * r;
c = 1 / r;
s *= c;
}g = d[i + 1] - p;
r = (d[i] - g) * s + 2 * c * b ;
p = s * r;
d[i + 1] = g + p;
g = c * r - b;
if (z != null ) {
for (k = 0; k < n; k++) {
f = z[k][i + 1];
z[k][i + 1] = s * z[k][i] + c * f;
z[k][i] = c * z[k][i] - s * f;
}
}}
d[L] -= p;
e[L] = g;
e[m] = 0;
}
}
}, 1);
;
(function(){var C$=Clazz.newClass(P$.QuantumStatesFrame, "FFT", function(){
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
(function(){var C$=Clazz.newClass(P$.QuantumStatesFrame, "Setup", function(){
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
(function(){var C$=Clazz.newClass(P$.QuantumStatesFrame, "InfiniteWellSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.QuantumStatesFrame','com.falstad.QuantumStatesFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Infinite Well";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.QuantumStatesFrame'].aux1Label.setText$S("Well Width");
});

Clazz.newMeth(C$, 'getBaseEnergy', function () {
return 1;
});

Clazz.newMeth(C$, 'allowLeftRight', function () {
return !this.b$['com.falstad.QuantumStatesFrame'].setupModified;
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
var width = this.getOffset();
for (i = 0; i != this.b$['com.falstad.QuantumStatesFrame'].sampleCount; i++) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = 1000.0;

for (i = width; i <= this.b$['com.falstad.QuantumStatesFrame'].sampleCount - 1 - width ; i++) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = -1;

});

Clazz.newMeth(C$, 'getOffset', function () {
return ((100 - this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.getValue()) * ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount/2|0))/110|0) + 1;
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 1;
});

Clazz.newMeth(C$, 'fudgeLevels', function () {
var i;
for (i = 1; i != this.b$['com.falstad.QuantumStatesFrame'].stateCount; i++) this.b$['com.falstad.QuantumStatesFrame'].elevels[i] = (this.b$['com.falstad.QuantumStatesFrame'].elevels[0] + 1) * (i + 1) * (i + 1)  - 1;

});

Clazz.newMeth(C$, 'getInfo$SA$I', function (s, o) {
s[o] = "Well width = " + this.b$['com.falstad.QuantumStatesFrame'].getLengthText$D(this.b$['com.falstad.QuantumStatesFrame'].sampleCount - this.getOffset() * 2);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[2]||(I$[2]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').FiniteWellSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumStatesFrame, "FiniteWellSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.QuantumStatesFrame','com.falstad.QuantumStatesFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Finite Well";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.QuantumStatesFrame'].aux1Label.setText$S("Well Width");
this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.setValue$I(100);
this.b$['com.falstad.QuantumStatesFrame'].aux2Label.setText$S("Well Depth");
});

Clazz.newMeth(C$, 'getOffset', function () {
return ((100 - (this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.getValue() * 6/10|0)) * ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount/2|0))/110|0);
});

Clazz.newMeth(C$, 'getFloor', function () {
return 1 - (this.b$['com.falstad.QuantumStatesFrame'].aux2Bar.getValue()) / 50.0;
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
var width = this.getOffset();
var floor = this.getFloor();
for (i = 0; i != this.b$['com.falstad.QuantumStatesFrame'].sampleCount; i++) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = 1;

for (i = width; i <= this.b$['com.falstad.QuantumStatesFrame'].sampleCount - 1 - width ; i++) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = floor;

});

Clazz.newMeth(C$, 'getInfo$SA$I', function (s, o) {
s[o] = "Well width = " + this.b$['com.falstad.QuantumStatesFrame'].getLengthText$D(this.b$['com.falstad.QuantumStatesFrame'].sampleCount - this.getOffset() * 2);
s[o] += ", Well depth = " + this.b$['com.falstad.QuantumStatesFrame'].getEnergyText$D$Z(1 - this.getFloor(), false);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[3]||(I$[3]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').HarmonicOscillatorSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumStatesFrame, "HarmonicOscillatorSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.QuantumStatesFrame','com.falstad.QuantumStatesFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.a = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Harmonic Oscillator";
});

Clazz.newMeth(C$, 'allowLeftRight', function () {
return !this.b$['com.falstad.QuantumStatesFrame'].setupModified;
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.QuantumStatesFrame'].aux1Label.setText$S("Spring Constant");
this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.setValue$I(0);
this.b$['com.falstad.QuantumStatesFrame'].aux2Label.setText$S("Offset");
this.b$['com.falstad.QuantumStatesFrame'].aux2Bar.setValue$I(50);
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
var width = ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount/2|0)) / (0.062333 * this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.getValue() + 1.1);
var offset = ((50 - this.b$['com.falstad.QuantumStatesFrame'].aux2Bar.getValue()) * ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount/2|0))/100|0);
this.a = 2 / (width * width);
for (i = 0; i != this.b$['com.falstad.QuantumStatesFrame'].sampleCount; i++) {
var ii = offset + i - (this.b$['com.falstad.QuantumStatesFrame'].sampleCount/2|0);
this.b$['com.falstad.QuantumStatesFrame'].pot[i] = this.a * ii * ii  - 1;
}
this.b$['com.falstad.QuantumStatesFrame'].pot[0] = this.b$['com.falstad.QuantumStatesFrame'].pot[this.b$['com.falstad.QuantumStatesFrame'].sampleCount - 1] = 1000.0;
});

Clazz.newMeth(C$, 'getBaseEnergy', function () {
return 1;
});

Clazz.newMeth(C$, 'getInfo$SA$I', function (s, o) {
var p1 = 1 / this.b$['com.falstad.QuantumStatesFrame'].pointsToLength$D(1);
var k = this.a * 2 * this.b$['com.falstad.QuantumStatesFrame'].convertEnergy$D$Z(1, false) * p1 * p1 ;
s[o] = "k = " + this.b$['com.falstad.QuantumStatesFrame'].getUnitText$D$S(k * 1.0E-18, "eV") + "/nm^2" ;
var f = Math.sqrt(k / (this.b$['com.falstad.QuantumStatesFrame'].mass / 8.988E16)) / 6.283185307179586;
s[o] += ", period = " + this.b$['com.falstad.QuantumStatesFrame'].getUnitText$D$S(1 / f, "s");
});

Clazz.newMeth(C$, 'fudgeLevels', function () {
var i;
if (this.b$['com.falstad.QuantumStatesFrame'].stateCount < 10) return;
var avg = 0;
for (i = 0; i != 10; i++) avg += this.b$['com.falstad.QuantumStatesFrame'].elevels[i + 1] - this.b$['com.falstad.QuantumStatesFrame'].elevels[i];

avg /= 10;
for (i = 1; i != this.b$['com.falstad.QuantumStatesFrame'].stateCount; i++) {
if ((this.b$['com.falstad.QuantumStatesFrame'].elevels[i] - this.b$['com.falstad.QuantumStatesFrame'].elevels[i - 1]) / avg > 2 ) break;
this.b$['com.falstad.QuantumStatesFrame'].elevels[i] = this.b$['com.falstad.QuantumStatesFrame'].elevels[i - 1] + avg;
}
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[4]||(I$[4]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').FiniteWellPairSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumStatesFrame, "FiniteWellPairSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.QuantumStatesFrame','com.falstad.QuantumStatesFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Well Pair";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.QuantumStatesFrame'].aux1Label.setText$S("Well Width");
this.b$['com.falstad.QuantumStatesFrame'].aux2Bar.setValue$I(10);
this.b$['com.falstad.QuantumStatesFrame'].aux2Label.setText$S("Well Separation");
this.b$['com.falstad.QuantumStatesFrame'].aux3Label.setText$S("Well Depth");
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 3;
});

Clazz.newMeth(C$, 'getFloor', function () {
return 1 - (this.b$['com.falstad.QuantumStatesFrame'].aux3Bar.getValue()) / 50.0;
});

Clazz.newMeth(C$, 'getWidth', function () {
return (((this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.getValue() * 3/4|0)) * ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount/2|0))/110|0) + 1;
});

Clazz.newMeth(C$, 'getSep', function () {
return (((this.b$['com.falstad.QuantumStatesFrame'].sampleCount/2|0) - this.getWidth()) * this.b$['com.falstad.QuantumStatesFrame'].aux2Bar.getValue()/150|0) + 1;
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
var width = this.getWidth();
var sep = this.getSep();
var floor = this.getFloor();
for (i = 0; i != this.b$['com.falstad.QuantumStatesFrame'].sampleCount; i++) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = 1;

for (i = 0; i != width; i++) this.b$['com.falstad.QuantumStatesFrame'].pot[(this.b$['com.falstad.QuantumStatesFrame'].sampleCount/2|0) - i - sep] = this.b$['com.falstad.QuantumStatesFrame'].pot[(this.b$['com.falstad.QuantumStatesFrame'].sampleCount/2|0) + i + sep] = floor;

});

Clazz.newMeth(C$, 'getInfo$SA$I', function (s, o) {
s[o] = "Well width = " + this.b$['com.falstad.QuantumStatesFrame'].getLengthText$D(this.getWidth());
s[o] += ", Well depth = " + this.b$['com.falstad.QuantumStatesFrame'].getEnergyText$D$Z(1 - this.getFloor(), false);
s[o + 1] = "Well separation = " + this.b$['com.falstad.QuantumStatesFrame'].getLengthText$D(this.getSep() * 2);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[5]||(I$[5]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').FiniteWellPairCoupledSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumStatesFrame, "FiniteWellPairCoupledSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.QuantumStatesFrame','com.falstad.QuantumStatesFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Coupled Well Pair";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.QuantumStatesFrame'].aux1Label.setText$S("Well Separation");
this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.setValue$I(1);
this.b$['com.falstad.QuantumStatesFrame'].aux2Label.setText$S("Wall Potential");
this.b$['com.falstad.QuantumStatesFrame'].aux2Bar.setValue$I(50);
});

Clazz.newMeth(C$, 'getWidth', function () {
return (this.b$['com.falstad.QuantumStatesFrame'].sampleCount/4|0);
});

Clazz.newMeth(C$, 'getSep', function () {
return (this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.getValue() * (this.getWidth() - 1)/150|0) + 1;
});

Clazz.newMeth(C$, 'getWallEnergy', function () {
return -1 + (this.b$['com.falstad.QuantumStatesFrame'].aux2Bar.getValue() - 1) / 50.0;
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
var width = this.getWidth();
var sep = this.getSep();
var floor = -1;
var infloor = -1 + (this.b$['com.falstad.QuantumStatesFrame'].aux2Bar.getValue() - 1) / 50.0;
for (i = 0; i != this.b$['com.falstad.QuantumStatesFrame'].sampleCount; i++) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = 1;

for (i = 0; i != width; i++) this.b$['com.falstad.QuantumStatesFrame'].pot[(this.b$['com.falstad.QuantumStatesFrame'].sampleCount/2|0) - i - sep] = this.b$['com.falstad.QuantumStatesFrame'].pot[(this.b$['com.falstad.QuantumStatesFrame'].sampleCount/2|0) + i + sep] = floor;

for (i = 0; i < sep; i++) this.b$['com.falstad.QuantumStatesFrame'].pot[(this.b$['com.falstad.QuantumStatesFrame'].sampleCount/2|0) - i] = this.b$['com.falstad.QuantumStatesFrame'].pot[(this.b$['com.falstad.QuantumStatesFrame'].sampleCount/2|0) + i] = infloor;

});

Clazz.newMeth(C$, 'getInfo$SA$I', function (s, o) {
s[o] = "Well width = " + this.b$['com.falstad.QuantumStatesFrame'].getLengthText$D(this.getWidth());
s[o] += ", Well depth = " + this.b$['com.falstad.QuantumStatesFrame'].getEnergyText$D$Z(2, false);
s[o + 1] = "Well separation = " + this.b$['com.falstad.QuantumStatesFrame'].getLengthText$D(this.getSep() * 2);
s[o + 1] += ", Wall potential = " + this.b$['com.falstad.QuantumStatesFrame'].getEnergyText$D$Z(this.getWallEnergy(), true);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[6]||(I$[6]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').AsymmetricWellSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumStatesFrame, "AsymmetricWellSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.QuantumStatesFrame','com.falstad.QuantumStatesFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.w1 = 0;
this.floor2 = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Asymmetric Well";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.QuantumStatesFrame'].aux1Label.setText$S("Width Difference");
this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.setValue$I(60);
this.b$['com.falstad.QuantumStatesFrame'].aux2Label.setText$S("Depth Difference");
this.b$['com.falstad.QuantumStatesFrame'].aux2Bar.setValue$I(12);
});

Clazz.newMeth(C$, 'getInfo$SA$I', function (s, o) {
s[o] = "Left well width = " + this.b$['com.falstad.QuantumStatesFrame'].getLengthText$D(this.w1);
s[o] += ", energy = " + this.b$['com.falstad.QuantumStatesFrame'].getEnergyText$D$Z(-1, true);
s[o + 1] = "Right well width = " + this.b$['com.falstad.QuantumStatesFrame'].getLengthText$D(this.b$['com.falstad.QuantumStatesFrame'].sampleCount - 2 - this.w1 );
s[o + 1] += ", energy = " + this.b$['com.falstad.QuantumStatesFrame'].getEnergyText$D$Z(this.floor2, true);
});

Clazz.newMeth(C$, 'drawPotential', function () {
this.b$['com.falstad.QuantumStatesFrame'].pot[0] = this.b$['com.falstad.QuantumStatesFrame'].pot[this.b$['com.falstad.QuantumStatesFrame'].sampleCount - 1] = 1000.0;
this.w1 = (this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.getValue() * (this.b$['com.falstad.QuantumStatesFrame'].sampleCount - 2)/100|0);
this.floor2 = this.b$['com.falstad.QuantumStatesFrame'].aux2Bar.getValue() * 2 / 100.0 - 1;
var i;
for (i = 1; i != this.w1; i++) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = -1;

for (i = this.w1; i < this.b$['com.falstad.QuantumStatesFrame'].sampleCount - 1; i++) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = this.floor2;

});

Clazz.newMeth(C$, 'getBaseEnergy', function () {
return 1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[7]||(I$[7]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').InfiniteWellFieldSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumStatesFrame, "InfiniteWellFieldSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.QuantumStatesFrame','com.falstad.QuantumStatesFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.width = 0;
this.field = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Infinite Well + Field";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.QuantumStatesFrame'].aux1Label.setText$S("Well Width");
this.b$['com.falstad.QuantumStatesFrame'].aux2Label.setText$S("Field Strength");
});

Clazz.newMeth(C$, 'getInfo$SA$I', function (s, o) {
var realwidth = this.b$['com.falstad.QuantumStatesFrame'].sampleCount - this.width * 2;
s[o] = "Well width = " + this.b$['com.falstad.QuantumStatesFrame'].getLengthText$D(realwidth);
var w = this.b$['com.falstad.QuantumStatesFrame'].pointsToLength$D(realwidth);
var ed = this.b$['com.falstad.QuantumStatesFrame'].pot[this.width] - this.b$['com.falstad.QuantumStatesFrame'].pot[this.b$['com.falstad.QuantumStatesFrame'].sampleCount - 1 - this.width ];
var vd = this.b$['com.falstad.QuantumStatesFrame'].convertEnergy$D$Z(ed, false);
s[o] += ", voltage difference = " + this.b$['com.falstad.QuantumStatesFrame'].getUnitText$D$S(vd, "V");
s[o + 1] = "(Particle charge = electron charge)";
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
this.width = ((100 - this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.getValue()) * ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount/2|0))/110|0) + 1;
for (i = 0; i != this.b$['com.falstad.QuantumStatesFrame'].sampleCount; i++) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = 1000.0;

this.field = -(this.b$['com.falstad.QuantumStatesFrame'].aux2Bar.getValue() - 50) / (50.0 * this.b$['com.falstad.QuantumStatesFrame'].sampleCount / 2);
for (i = this.width; i <= this.b$['com.falstad.QuantumStatesFrame'].sampleCount - 1 - this.width ; i++) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = (i - (this.b$['com.falstad.QuantumStatesFrame'].sampleCount/2|0)) * this.field;

});

Clazz.newMeth(C$, 'getBaseEnergy', function () {
return 0;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[8]||(I$[8]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').WellPairCoupledFieldSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumStatesFrame, "WellPairCoupledFieldSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.QuantumStatesFrame','com.falstad.QuantumStatesFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Coupled Wells + Field";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.QuantumStatesFrame'].aux1Label.setText$S("Well Separation");
this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.setValue$I(1);
this.b$['com.falstad.QuantumStatesFrame'].aux2Label.setText$S("Field Strength");
});

Clazz.newMeth(C$, 'getBaseEnergy', function () {
return 0.25;
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
var width = (this.b$['com.falstad.QuantumStatesFrame'].sampleCount/8|0);
var sep = (this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.getValue() * (width - 1)/101|0) + 1;
var floor = -1 + this.getBaseEnergy();
var infloor = 1;
for (i = 0; i != this.b$['com.falstad.QuantumStatesFrame'].sampleCount; i++) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = 1000.0;

var field = -(this.b$['com.falstad.QuantumStatesFrame'].aux2Bar.getValue() - 50) / (100.0 * this.b$['com.falstad.QuantumStatesFrame'].sampleCount / 2);
for (i = 0; i != width; i++) {
var q = (i + sep) * field;
this.b$['com.falstad.QuantumStatesFrame'].pot[(this.b$['com.falstad.QuantumStatesFrame'].sampleCount/2|0) - i - sep] = floor + q;
this.b$['com.falstad.QuantumStatesFrame'].pot[(this.b$['com.falstad.QuantumStatesFrame'].sampleCount/2|0) + i + sep] = floor - q;
}
for (i = 0; i < sep; i++) this.b$['com.falstad.QuantumStatesFrame'].pot[(this.b$['com.falstad.QuantumStatesFrame'].sampleCount/2|0) - i] = this.b$['com.falstad.QuantumStatesFrame'].pot[(this.b$['com.falstad.QuantumStatesFrame'].sampleCount/2|0) + i] = infloor;

});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[9]||(I$[9]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').CoulombSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumStatesFrame, "CoulombSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.QuantumStatesFrame','com.falstad.QuantumStatesFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Coulomb";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.QuantumStatesFrame'].aux1Label.setText$S("Charge");
this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.setValue$I(8);
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
var width = (this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.getValue()) * ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount/2|0)) / 110.0;
for (i = 0; i != this.b$['com.falstad.QuantumStatesFrame'].sampleCount; i++) {
var ii = i - (this.b$['com.falstad.QuantumStatesFrame'].sampleCount/2|0);
if (ii < 0) ii = -ii;
var v = 1 - width / ii;
if (v < -1 ) v = -1;
this.b$['com.falstad.QuantumStatesFrame'].pot[i] = v;
}
this.b$['com.falstad.QuantumStatesFrame'].pot[0] = this.b$['com.falstad.QuantumStatesFrame'].pot[this.b$['com.falstad.QuantumStatesFrame'].sampleCount - 1] = 1000.0;
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[10]||(I$[10]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').QuarticOscillatorSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumStatesFrame, "QuarticOscillatorSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.QuantumStatesFrame','com.falstad.QuantumStatesFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.a = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Quartic Oscillator";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.QuantumStatesFrame'].aux1Label.setText$S("Spring Constant");
this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.setValue$I(0);
this.b$['com.falstad.QuantumStatesFrame'].aux2Label.setText$S("Offset");
this.b$['com.falstad.QuantumStatesFrame'].aux2Bar.setValue$I(50);
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
var width = ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount/2|0)) / (0.062333 * this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.getValue() + 1.1);
var offset = ((50 - this.b$['com.falstad.QuantumStatesFrame'].aux2Bar.getValue()) * ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount/2|0))/100|0);
this.a = 2 / (width * width * width * width );
for (i = 0; i != this.b$['com.falstad.QuantumStatesFrame'].sampleCount; i++) {
var ii = offset + i - (this.b$['com.falstad.QuantumStatesFrame'].sampleCount/2|0);
this.b$['com.falstad.QuantumStatesFrame'].pot[i] = this.a * ii * ii * ii * ii  - 1;
}
this.b$['com.falstad.QuantumStatesFrame'].pot[0] = this.b$['com.falstad.QuantumStatesFrame'].pot[this.b$['com.falstad.QuantumStatesFrame'].sampleCount - 1] = 1000.0;
});

Clazz.newMeth(C$, 'getBaseEnergy', function () {
return 1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').FiniteWellArraySetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumStatesFrame, "FiniteWellArraySetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.QuantumStatesFrame','com.falstad.QuantumStatesFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.width = 0;
this.wellCount = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Well Array (Square)";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.QuantumStatesFrame'].aux1Label.setText$S("Well Count");
this.b$['com.falstad.QuantumStatesFrame'].aux2Label.setText$S("Well Depth");
this.b$['com.falstad.QuantumStatesFrame'].aux3Label.setText$S("Well Width");
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 3;
});

Clazz.newMeth(C$, 'getFloor', function () {
return 1 - (this.b$['com.falstad.QuantumStatesFrame'].aux2Bar.getValue()) / 50.0;
});

Clazz.newMeth(C$, 'getInfo$SA$I', function (s, o) {
s[o] = "Well width = " + this.b$['com.falstad.QuantumStatesFrame'].getLengthText$D(this.width);
s[o] += ", Well count = " + this.wellCount;
s[o + 1] = "Well depth = " + this.b$['com.falstad.QuantumStatesFrame'].getEnergyText$D$Z(1 - this.getFloor(), false);
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
var maxWells = 10;
if (this.b$['com.falstad.QuantumStatesFrame'].sampleCount > 260) maxWells = (this.b$['com.falstad.QuantumStatesFrame'].sampleCount/26|0);
var period = (((this.b$['com.falstad.QuantumStatesFrame'].sampleCount * 7/(maxWells * 8)|0)) * (this.b$['com.falstad.QuantumStatesFrame'].aux3Bar.getValue() + 60)/160|0);
var sep = ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount/(maxWells * 8)|0));
if (sep == 0) {
sep++;
period--;
}this.wellCount = (this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.getValue() * (maxWells)/101|0) + 1;
var floor = this.getFloor();
var offset = ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount - this.wellCount * period)/2|0);
this.width = period - sep;
for (i = 0; i != this.b$['com.falstad.QuantumStatesFrame'].sampleCount; i++) {
if (i < offset) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = 1;
 else {
var ii = i - offset;
var j = (ii % period);
this.b$['com.falstad.QuantumStatesFrame'].pot[i] = (j < sep || (ii/period|0) >= this.wellCount ) ? 1 : floor;
}}
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').HarmonicWellArraySetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumStatesFrame, "HarmonicWellArraySetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.QuantumStatesFrame','com.falstad.QuantumStatesFrame.FiniteWellArraySetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Well Array (Harmonic)";
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
var maxWells = 5;
if (this.b$['com.falstad.QuantumStatesFrame'].sampleCount > 260) maxWells = (this.b$['com.falstad.QuantumStatesFrame'].sampleCount/52|0);
var period = (((this.b$['com.falstad.QuantumStatesFrame'].sampleCount * 7/(maxWells * 8)|0)) * (this.b$['com.falstad.QuantumStatesFrame'].aux3Bar.getValue() + 60)/160|0);
var sep = ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount/(maxWells * 8)|0));
if (sep == 0) {
sep++;
period--;
}this.wellCount = (this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.getValue() * (maxWells)/101|0) + 1;
var floor = this.getFloor();
var offset = ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount - this.wellCount * period)/2|0);
this.width = period - sep;
var a = (1 - floor) / (((this.width/2|0)) * (this.width / 2.0));
for (i = 0; i != this.b$['com.falstad.QuantumStatesFrame'].sampleCount; i++) {
if (i < offset) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = 1;
 else {
var ii = i - offset;
var j = (ii % period);
if (j < sep || (ii/period|0) >= this.wellCount ) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = 1;
 else {
var xx = (j - sep - this.width / 2.0 );
this.b$['com.falstad.QuantumStatesFrame'].pot[i] = floor + xx * xx * a ;
if (this.b$['com.falstad.QuantumStatesFrame'].pot[i] > 1 ) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = 1;
}}}
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[13]||(I$[13]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').CoulombWellArraySetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumStatesFrame, "CoulombWellArraySetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.QuantumStatesFrame','com.falstad.QuantumStatesFrame.FiniteWellArraySetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Well Array (Coulomb)";
});

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
this.b$['com.falstad.QuantumStatesFrame'].aux2Bar.setValue$I(48);
});

Clazz.newMeth(C$, 'getInfo$SA$I', function (s, o) {
s[o] = "Well width = " + this.b$['com.falstad.QuantumStatesFrame'].getLengthText$D(this.width);
s[o] += ", Well count = " + this.wellCount;
s[o + 1] = "Well depth = " + this.b$['com.falstad.QuantumStatesFrame'].getEnergyText$D$Z(2, false);
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
var maxWells = 5;
if (this.b$['com.falstad.QuantumStatesFrame'].sampleCount > 260) maxWells = (this.b$['com.falstad.QuantumStatesFrame'].sampleCount/52|0);
var period = (((this.b$['com.falstad.QuantumStatesFrame'].sampleCount * 7/(maxWells * 8)|0)) * (this.b$['com.falstad.QuantumStatesFrame'].aux3Bar.getValue() + 60)/160|0);
var sep = ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount/(maxWells * 8)|0));
if (sep == 0) {
sep++;
period--;
}this.wellCount = (this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.getValue() * (maxWells)/101|0) + 1;
var s = (this.b$['com.falstad.QuantumStatesFrame'].aux2Bar.getValue()) / 400.0;
var offset = ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount - this.wellCount * period)/2|0);
this.width = period - sep;
s *= (this.width/2|0);
var a = -2 * this.width * s  / (2 * s - this.width);
var b = 1 + 2 * a / this.width;
for (i = 0; i != this.b$['com.falstad.QuantumStatesFrame'].sampleCount; i++) {
if (i < offset) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = 1;
 else {
var ii = i - offset;
var j = (ii % period);
if (j < sep || (ii/period|0) >= this.wellCount ) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = 1;
 else {
var xx = (j - sep - this.width / 2.0 );
this.b$['com.falstad.QuantumStatesFrame'].pot[i] = b - a / Math.abs(xx);
if (this.b$['com.falstad.QuantumStatesFrame'].pot[i] < -1 ) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = -1;
}}}
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[14]||(I$[14]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').FiniteWellArrayFieldSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumStatesFrame, "FiniteWellArrayFieldSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.QuantumStatesFrame','com.falstad.QuantumStatesFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.width = 0;
this.wellCount = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Well Array + Field";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.QuantumStatesFrame'].aux1Label.setText$S("Well Count");
this.b$['com.falstad.QuantumStatesFrame'].aux2Label.setText$S("Well Width");
this.b$['com.falstad.QuantumStatesFrame'].aux3Label.setText$S("Field Strength");
this.b$['com.falstad.QuantumStatesFrame'].aux3Bar.setValue$I(90);
if (this.b$['com.falstad.QuantumStatesFrame'].massBar.getValue() == 80 && this.b$['com.falstad.QuantumStatesFrame'].resBar.getValue() <= 260 ) {
this.b$['com.falstad.QuantumStatesFrame'].selectGround = false;
this.b$['com.falstad.QuantumStatesFrame'].magcoef[3] = 0.067;
this.b$['com.falstad.QuantumStatesFrame'].magcoef[4] = 0.2629;
this.b$['com.falstad.QuantumStatesFrame'].magcoef[5] = 0.6771;
this.b$['com.falstad.QuantumStatesFrame'].magcoef[6] = 1;
this.b$['com.falstad.QuantumStatesFrame'].magcoef[7] = 0.586156;
this.b$['com.falstad.QuantumStatesFrame'].magcoef[8] = 0.1058;
this.b$['com.falstad.QuantumStatesFrame'].magcoef[9] = 0.078;
var i;
for (i = 0; i != this.b$['com.falstad.QuantumStatesFrame'].stateCount; i++) this.b$['com.falstad.QuantumStatesFrame'].phasecoefadj[i] = (i == 6) ? 0 : 3.141592653589793;

}});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 3;
});

Clazz.newMeth(C$, 'getInfo$SA$I', function (s, o) {
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
var maxWells = 10;
if (this.b$['com.falstad.QuantumStatesFrame'].sampleCount > 260) maxWells = (this.b$['com.falstad.QuantumStatesFrame'].sampleCount/26|0);
var period = (((this.b$['com.falstad.QuantumStatesFrame'].sampleCount * 7/(maxWells * 8)|0)) * (this.b$['com.falstad.QuantumStatesFrame'].aux2Bar.getValue() + 60)/160|0);
var sep = ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount/(maxWells * 8)|0));
if (sep == 0) {
sep++;
period--;
}var field = -(this.b$['com.falstad.QuantumStatesFrame'].aux3Bar.getValue() - 50) / (200.0 * this.b$['com.falstad.QuantumStatesFrame'].sampleCount / 2);
this.wellCount = (this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.getValue() * (maxWells)/101|0) + 1;
var floor = -0.75;
var offset = ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount - this.wellCount * period)/2|0);
this.width = period - sep;
for (i = 0; i != this.b$['com.falstad.QuantumStatesFrame'].sampleCount; i++) {
if (i < offset) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = 0.75;
 else {
var ii = i - offset;
var j = (ii % period);
this.b$['com.falstad.QuantumStatesFrame'].pot[i] = (j < sep || (ii/period|0) >= this.wellCount ) ? 0.75 : floor;
}this.b$['com.falstad.QuantumStatesFrame'].pot[i] += (i - (this.b$['com.falstad.QuantumStatesFrame'].sampleCount/2|0)) * field;
}
this.b$['com.falstad.QuantumStatesFrame'].pot[0] = this.b$['com.falstad.QuantumStatesFrame'].pot[this.b$['com.falstad.QuantumStatesFrame'].sampleCount - 1] = 1000.0;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[15]||(I$[15]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').FiniteWellArrayImpureSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumStatesFrame, "FiniteWellArrayImpureSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.QuantumStatesFrame','com.falstad.QuantumStatesFrame.FiniteWellArraySetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Well Array w/ Impurity";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.QuantumStatesFrame'].aux1Label.setText$S("Impurity Position");
this.b$['com.falstad.QuantumStatesFrame'].aux2Label.setText$S("Well Depth");
this.b$['com.falstad.QuantumStatesFrame'].aux3Label.setText$S("Impurity Depth");
this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.setValue$I(75);
this.b$['com.falstad.QuantumStatesFrame'].aux3Bar.setValue$I(85);
});

Clazz.newMeth(C$, 'getInfo$SA$I', function (s, o) {
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
var maxWells = 10;
if (this.b$['com.falstad.QuantumStatesFrame'].sampleCount > 260) maxWells = (this.b$['com.falstad.QuantumStatesFrame'].sampleCount/26|0);
var period = ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount * 7/(maxWells * 8)|0));
var sep = ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount/(maxWells * 8)|0));
if (sep == 0) {
sep++;
period--;
}this.wellCount = maxWells;
var floor = 1 - (this.b$['com.falstad.QuantumStatesFrame'].aux2Bar.getValue()) / 50.0;
var impfloor = 1 - (this.b$['com.falstad.QuantumStatesFrame'].aux3Bar.getValue()) / 50.0;
var pos = (this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.getValue() * maxWells/101|0);
var offset = ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount - this.wellCount * period)/2|0);
this.width = period - sep;
for (i = 0; i != this.b$['com.falstad.QuantumStatesFrame'].sampleCount; i++) {
if (i < offset) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = 1;
 else {
var ii = i - offset;
var j = (ii % period);
var f = ((ii/period|0) == pos) ? impfloor : floor;
this.b$['com.falstad.QuantumStatesFrame'].pot[i] = (j < sep || (ii/period|0) >= this.wellCount ) ? 1 : f;
}}
});

Clazz.newMeth(C$, 'getFloor', function () {
return -1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[16]||(I$[16]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').FiniteWellArrayDislocSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumStatesFrame, "FiniteWellArrayDislocSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.QuantumStatesFrame','com.falstad.QuantumStatesFrame.FiniteWellArraySetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Well Array w/ Dislocation";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.QuantumStatesFrame'].aux1Label.setText$S("Impurity Position");
this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.setValue$I(75);
this.b$['com.falstad.QuantumStatesFrame'].aux2Label.setText$S("Well Depth");
this.b$['com.falstad.QuantumStatesFrame'].aux3Label.setText$S("Impurity Offset");
this.b$['com.falstad.QuantumStatesFrame'].aux3Bar.setValue$I(80);
});

Clazz.newMeth(C$, 'getInfo$SA$I', function (s, o) {
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
var maxWells = 8;
var period = ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount * 7/(maxWells * 8)|0));
var sep = ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount/(maxWells * 4)|0));
if (sep == 0) {
sep++;
period--;
}this.wellCount = maxWells;
var floor = 1 - (this.b$['com.falstad.QuantumStatesFrame'].aux2Bar.getValue()) / 50.0;
var pos = (this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.getValue() * maxWells/101|0);
var offset = ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount - this.wellCount * period)/2|0);
var ioffset = ((50 - this.b$['com.falstad.QuantumStatesFrame'].aux3Bar.getValue()) * (sep - 1)/50|0);
this.width = period - sep;
for (i = 0; i != this.b$['com.falstad.QuantumStatesFrame'].sampleCount; i++) {
if (i < offset) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = 1;
 else {
var ii = i - offset;
var j = (ii % period);
this.b$['com.falstad.QuantumStatesFrame'].pot[i] = (j < sep || (ii/period|0) == pos  || (ii/period|0) >= this.wellCount ) ? 1 : floor;
ii = ii+(ioffset);
j = (ii % period);
if ((ii/period|0) == pos && j >= sep ) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = floor;
}}
});

Clazz.newMeth(C$, 'getFloor', function () {
return -1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[17]||(I$[17]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').RandomWellArraySetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumStatesFrame, "RandomWellArraySetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.QuantumStatesFrame','com.falstad.QuantumStatesFrame.FiniteWellArraySetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Random Well Array";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.QuantumStatesFrame'].aux1Label.setText$S("Randomness");
});

Clazz.newMeth(C$, 'getInfo$SA$I', function (s, o) {
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 1;
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
for (i = 0; i != 10; i++) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = 1;

var ww = 8;
while (i < this.b$['com.falstad.QuantumStatesFrame'].sampleCount - (15 + ww)){
var j;
for (j = 0; j != ww; j++) this.b$['com.falstad.QuantumStatesFrame'].pot[i++] = -1;

var sep = 8 + (((this.b$['com.falstad.QuantumStatesFrame'].getrand$I(15) - 7) * this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.getValue()/100|0));
for (j = 0; j != sep; j++) this.b$['com.falstad.QuantumStatesFrame'].pot[i++] = 1;

}
for (; i != this.b$['com.falstad.QuantumStatesFrame'].sampleCount; i++) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = 1;

});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').FiniteWell2ArraySetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumStatesFrame, "FiniteWell2ArraySetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.QuantumStatesFrame','com.falstad.QuantumStatesFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.width = 0;
this.wellCount = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "2 Well Array";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.QuantumStatesFrame'].aux1Label.setText$S("Well Count");
this.b$['com.falstad.QuantumStatesFrame'].aux2Label.setText$S("Well Depth");
this.b$['com.falstad.QuantumStatesFrame'].aux3Label.setText$S("Well Width");
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 3;
});

Clazz.newMeth(C$, 'getFloor', function () {
return 1 - (this.b$['com.falstad.QuantumStatesFrame'].aux2Bar.getValue()) / 50.0;
});

Clazz.newMeth(C$, 'getInfo$SA$I', function (s, o) {
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
var maxWells = 10;
if (this.b$['com.falstad.QuantumStatesFrame'].sampleCount > 260) maxWells = (this.b$['com.falstad.QuantumStatesFrame'].sampleCount/26|0);
maxWells = maxWells|(1);
var period = (((this.b$['com.falstad.QuantumStatesFrame'].sampleCount * 7/(maxWells * 8)|0)) * (this.b$['com.falstad.QuantumStatesFrame'].aux3Bar.getValue() + 60)/160|0);
var sep = ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount/(maxWells * 8)|0));
if (sep == 0) {
sep++;
period--;
}this.wellCount = (this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.getValue() * (maxWells)/101|0) + 1;
var floor = this.getFloor();
var offset = ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount - this.wellCount * period)/2|0);
this.width = period - sep;
for (i = 0; i != this.b$['com.falstad.QuantumStatesFrame'].sampleCount; i++) {
if (i < offset) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = 1;
 else {
var ii = i - offset;
var j = (ii % period);
var f = ((ii/period|0) % 2 == 0) ? floor : -0.5;
this.b$['com.falstad.QuantumStatesFrame'].pot[i] = (j < sep || (ii/period|0) >= this.wellCount ) ? 1 : f;
}}
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[19]||(I$[19]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').FiniteWellCoupledArraySetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumStatesFrame, "FiniteWellCoupledArraySetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.QuantumStatesFrame','com.falstad.QuantumStatesFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.width = 0;
this.wellCount = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Coupled Well Array";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.QuantumStatesFrame'].aux1Label.setText$S("Well Count");
this.b$['com.falstad.QuantumStatesFrame'].aux2Label.setText$S("Wall Potential");
this.b$['com.falstad.QuantumStatesFrame'].aux2Bar.setValue$I(50);
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 2;
});

Clazz.newMeth(C$, 'getWallPot', function () {
return 1 - (this.b$['com.falstad.QuantumStatesFrame'].aux2Bar.getValue()) / 50.0;
});

Clazz.newMeth(C$, 'getInfo$SA$I', function (s, o) {
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
var maxWells = 10;
if (this.b$['com.falstad.QuantumStatesFrame'].sampleCount > 260) maxWells = (this.b$['com.falstad.QuantumStatesFrame'].sampleCount/26|0);
maxWells = maxWells|(1);
var period = ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount * 7/(maxWells * 8)|0));
var sep = ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount/(maxWells * 8)|0));
if (sep == 0) {
sep++;
period--;
}this.wellCount = (this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.getValue() * (maxWells)/102|0) + 2;
this.wellCount = this.wellCount&(-2);
var offset = ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount - this.wellCount * period)/2|0);
this.width = period - sep;
for (i = 0; i != this.b$['com.falstad.QuantumStatesFrame'].sampleCount; i++) {
if (i < offset || i > this.b$['com.falstad.QuantumStatesFrame'].sampleCount - offset ) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = 1;
 else {
var ii = i - offset;
var j = (ii % period);
var wall = ((ii/period|0) % 2 == 0) ? 1 : this.getWallPot();
this.b$['com.falstad.QuantumStatesFrame'].pot[i] = (j < sep || (ii/period|0) >= this.wellCount ) ? wall : -1;
}}
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[20]||(I$[20]=Clazz.load(Clazz.load('com.falstad.QuantumStatesFrame').DeltaArraySetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumStatesFrame, "DeltaArraySetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.QuantumStatesFrame','com.falstad.QuantumStatesFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Delta Fn Array";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.QuantumStatesFrame'].aux1Label.setText$S("Well Count");
this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.setValue$I(32);
this.b$['com.falstad.QuantumStatesFrame'].aux2Label.setText$S("Well Separation");
this.b$['com.falstad.QuantumStatesFrame'].aux2Bar.setValue$I(30);
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
var maxWells = 30;
var width = (this.b$['com.falstad.QuantumStatesFrame'].aux2Bar.getValue()/5|0) + 2;
var count = (this.b$['com.falstad.QuantumStatesFrame'].aux1Bar.getValue() * (maxWells)/101|0) + 1;
var offset = ((this.b$['com.falstad.QuantumStatesFrame'].sampleCount - (count - 1) * width + 1)/2|0);
for (i = 1; i != this.b$['com.falstad.QuantumStatesFrame'].sampleCount; i++) {
if (i < offset) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = 1;
 else {
var ii = i - offset;
var j = (ii % width);
this.b$['com.falstad.QuantumStatesFrame'].pot[i] = 1;
if (j == 0 && count-- > 0 ) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = -1;
}}
for (i = 0; i != width; i++) this.b$['com.falstad.QuantumStatesFrame'].pot[i] = this.b$['com.falstad.QuantumStatesFrame'].pot[this.b$['com.falstad.QuantumStatesFrame'].sampleCount - 1 - i ] = 1;

});

Clazz.newMeth(C$, 'createNext', function () {
return null;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumStatesFrame, "View", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, 'java.awt.Rectangle');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.mid_y = 0;
this.lower_y = 0;
this.ymult = 0;
this.ymult2 = 0;
this.scale = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$);
})()

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:11
