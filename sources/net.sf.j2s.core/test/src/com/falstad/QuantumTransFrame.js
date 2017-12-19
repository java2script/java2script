(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "QuantumTransFrame", function(){
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
this.blankButton = null;
this.rescaleButton = null;
this.stopButton = null;
this.reverseButton = null;
this.stoppedCheck = null;
this.xCheckItem = null;
this.pCheckItem = null;
this.parityCheckItem = null;
this.currentCheckItem = null;
this.expectCheckItem = null;
this.uncertaintyCheckItem = null;
this.probCheckItem = null;
this.probPhaseCheckItem = null;
this.reImCheckItem = null;
this.magPhaseCheckItem = null;
this.waveFunctionMenu = null;
this.exitItem = null;
this.mouseChooser = null;
this.setupChooser = null;
this.setupList = null;
this.setup = null;
this.forceBar = null;
this.speedBar = null;
this.strengthBar = null;
this.stepBar = null;
this.resBar = null;
this.massBar = null;
this.aux1Bar = null;
this.aux2Bar = null;
this.freqBar = null;
this.aux1Label = null;
this.aux2Label = null;
this.viewPotential = null;
this.viewX = null;
this.viewP = null;
this.viewParity = null;
this.viewStates = null;
this.viewCurrent = null;
this.viewDestStates = null;
this.viewList = null;
this.viewCount = 0;
this.coefr = null;
this.coefi = null;
this.newcoefr = null;
this.newcoefi = null;
this.oldExpectX = 0;
this.current = 0;
this.dipoleOp = null;
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
this.freqMax = 0;
this.freq = 0;
this.freqPhase = 0;
this.selectedCoef = 0;
this.sourceState = 0;
this.destState = 0;
this.selectedPaneHandle = 0;
this.selectedPState = 0;
this.selection = 0;
this.dragX = 0;
this.dragY = 0;
this.xpoints = null;
this.ypoints = null;
this.dragging = false;
this.startup = false;
this.statesChanged = false;
this.adjustingStates = false;
this.adjustingWaveFunc = false;
this.setupModified = false;
this.pause = 0;
this.phaseColors = null;
this.purple = null;
this.fft = null;
this.cv = null;
this.applet = null;
this.finished = false;
this.radioGroup = null;
this.t2 = 0;
this.stateColSize = 0;
this.stateSize = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.engine = null;
this.maxStateCount = 300;
this.sampleCount = 64;
this.t2 = 0;
this.stateSize = 15;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "QuantumTrans by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'c$$com_falstad_QuantumTrans', function (a) {
C$.superclazz.c$$S.apply(this, ["1-d Quantum Transitions Applet v1.5a"]);
C$.$init$.apply(this);
this.applet = a;
}, 1);

Clazz.newMeth(C$, 'init', function () {
this.xpoints = Clazz.array(Integer.TYPE, [5]);
this.ypoints = Clazz.array(Integer.TYPE, [5]);
this.setupList = Clazz.new_((I$[4]||(I$[4]=Clazz.load('java.util.Vector'))));
var s = Clazz.new_((I$[5]||(I$[5]=Clazz.load(Clazz.load('com.falstad.QuantumTransFrame').InfiniteWellSetup))), [this, null]);
while (s != null ){
this.setupList.addElement$TE(s);
s = s.createNext();
}
this.selectedCoef = -1;
this.setLayout$java_awt_LayoutManager(Clazz.new_((I$[6]||(I$[6]=Clazz.load('com.falstad.QuantumTransLayout')))));
this.cv = Clazz.new_((I$[7]||(I$[7]=Clazz.load('com.falstad.QuantumTransCanvas'))).c$$com_falstad_QuantumTransFrame,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
this.add$java_awt_Component(this.cv);
var mb = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.MenuBar'))));
var m = Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Menu'))).c$$S,["File"]);
mb.add$javax_swing_JMenu(m);
m.add$javax_swing_JMenuItem(this.exitItem = this.getMenuItem$S("Exit"));
m = Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Menu'))).c$$S,["View"]);
mb.add$javax_swing_JMenu(m);
m.add$javax_swing_JMenuItem(this.xCheckItem = this.getCheckItem$S("Position"));
this.xCheckItem.setState$Z(true);
m.add$javax_swing_JMenuItem(this.pCheckItem = this.getCheckItem$S("Momentum"));
m.add$javax_swing_JMenuItem(this.parityCheckItem = this.getCheckItem$S("Parity"));
m.add$javax_swing_JMenuItem(this.currentCheckItem = this.getCheckItem$S("Probability Current"));
m.addSeparator();
m.add$javax_swing_JMenuItem(this.expectCheckItem = this.getCheckItem$S("Expectation Values"));
this.expectCheckItem.setState$Z(true);
m.add$javax_swing_JMenuItem(this.uncertaintyCheckItem = this.getCheckItem$S("Uncertainties"));
var m2 = this.waveFunctionMenu = Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Menu'))).c$$S,["Wave Function"]);
m.add$javax_swing_JMenuItem(m2);
m2.add$javax_swing_JMenuItem(this.probCheckItem = this.getRadioItem$S("Probability"));
m2.add$javax_swing_JMenuItem(this.probPhaseCheckItem = this.getRadioItem$S("Probability + Phase"));
this.probPhaseCheckItem.setSelected$Z(true);
m2.add$javax_swing_JMenuItem(this.reImCheckItem = this.getRadioItem$S("Real + Imaginary Parts"));
m2.add$javax_swing_JMenuItem(this.magPhaseCheckItem = this.getRadioItem$S("Magnitude + Phase"));
this.setMenuBar$a2s_MenuBar(mb);
this.setupChooser = Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Choice'))));
var i;
for (i = 0; i != this.setupList.size(); i++) this.setupChooser.add$S("Setup: " + (this.setupList.elementAt$I(i)).getName());

this.setup = this.setupList.elementAt$I(0);
this.setupChooser.addItemListener$java_awt_event_ItemListener(this);
this.add$java_awt_Component(this.setupChooser);
this.add$java_awt_Component(this.blankButton = Clazz.new_((I$[11]||(I$[11]=Clazz.load('a2s.Button'))).c$$S,["Clear"]));
this.blankButton.addActionListener$java_awt_event_ActionListener(this);
this.add$java_awt_Component(this.rescaleButton = Clazz.new_((I$[11]||(I$[11]=Clazz.load('a2s.Button'))).c$$S,["Rescale Graphs"]));
this.rescaleButton.addActionListener$java_awt_event_ActionListener(this);
this.add$java_awt_Component(this.stopButton = Clazz.new_((I$[11]||(I$[11]=Clazz.load('a2s.Button'))).c$$S,["Stop Radiation"]));
this.stopButton.addActionListener$java_awt_event_ActionListener(this);
this.add$java_awt_Component(this.reverseButton = Clazz.new_((I$[11]||(I$[11]=Clazz.load('a2s.Button'))).c$$S,["Reverse Phase"]));
this.reverseButton.addActionListener$java_awt_event_ActionListener(this);
this.stoppedCheck = Clazz.new_((I$[12]||(I$[12]=Clazz.load('a2s.Checkbox'))).c$$S,["Stopped"]);
this.stoppedCheck.addItemListener$java_awt_event_ItemListener(this);
this.add$java_awt_Component(this.stoppedCheck);
this.add$java_awt_Component(Clazz.new_((I$[13]||(I$[13]=Clazz.load('a2s.Label'))).c$$S$I,["Simulation Speed", 0]));
this.add$java_awt_Component(this.speedBar = Clazz.new_((I$[14]||(I$[14]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 57, 1, 300]));
this.stepBar = Clazz.new_((I$[14]||(I$[14]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 40, 1, 300]);
this.add$java_awt_Component(Clazz.new_((I$[13]||(I$[13]=Clazz.load('a2s.Label'))).c$$S$I,["Radiation Intensity", 0]));
this.add$java_awt_Component(this.strengthBar = Clazz.new_((I$[14]||(I$[14]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 130, 85, 200]));
this.add$java_awt_Component(Clazz.new_((I$[13]||(I$[13]=Clazz.load('a2s.Label'))).c$$S$I,["Radiation Frequency", 0]));
this.add$java_awt_Component(this.freqBar = Clazz.new_((I$[14]||(I$[14]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 1, 1, 400]));
this.add$java_awt_Component(Clazz.new_((I$[13]||(I$[13]=Clazz.load('a2s.Label'))).c$$S$I,["Resolution", 0]));
this.add$java_awt_Component(this.resBar = Clazz.new_((I$[14]||(I$[14]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 128, this.sampleCount, this.maxStateCount]));
this.massBar = Clazz.new_((I$[14]||(I$[14]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 16, 1, 100]);
this.add$java_awt_Component(this.aux1Label = Clazz.new_((I$[13]||(I$[13]=Clazz.load('a2s.Label'))).c$$S$I,["Aux 1", 0]));
this.add$java_awt_Component(this.aux1Bar = Clazz.new_((I$[14]||(I$[14]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 50, 1, 100]));
this.add$java_awt_Component(this.aux2Label = Clazz.new_((I$[13]||(I$[13]=Clazz.load('a2s.Label'))).c$$S$I,["Aux 2", 0]));
this.add$java_awt_Component(this.aux2Bar = Clazz.new_((I$[14]||(I$[14]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 50, 1, 100]));
try {
var param = this.applet.getParameter$S("PAUSE");
if (param != null ) this.pause = Integer.parseInt(param);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
this.coefr = Clazz.array(Double.TYPE, [this.maxStateCount]);
this.coefi = Clazz.array(Double.TYPE, [this.maxStateCount]);
this.newcoefr = Clazz.array(Double.TYPE, [this.maxStateCount]);
this.newcoefi = Clazz.array(Double.TYPE, [this.maxStateCount]);
this.dispmax = Clazz.array(Double.TYPE, [this.maxStateCount]);
this.setResolution();
this.phaseColors = Clazz.array((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))), [481]);
for (i = 0; i != 480; i++) {
var pm = 80;
var a1 = i % pm;
var a2 = (a1 * 255/pm|0);
var a3 = 255 - a2;
var c = null;
switch ((i/pm|0)) {
case 0:
c = Clazz.new_((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).c$$I$I$I,[255, a2, 0]);
break;
case 1:
c = Clazz.new_((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).c$$I$I$I,[a3, 255, 0]);
break;
case 2:
c = Clazz.new_((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).c$$I$I$I,[0, 255, a2]);
break;
case 3:
c = Clazz.new_((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).c$$I$I$I,[0, a3, 255]);
break;
case 4:
c = Clazz.new_((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).c$$I$I$I,[a2, 0, 255]);
break;
case 5:
c = Clazz.new_((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).c$$I$I$I,[255, 0, a3]);
break;
}
this.phaseColors[i] = c;
}
this.phaseColors[480] = this.phaseColors[0];
this.purple = Clazz.new_((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).c$$I$I$I,[192, 60, 206]);
this.random = Clazz.new_((I$[16]||(I$[16]=Clazz.load('java.util.Random'))));
this.reinit();
this.cv.setBackground$java_awt_Color((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).lightGray);
this.resize$I$I(750, 600);
this.handleResize();
var x = this.getSize();
var screen = this.getToolkit().getScreenSize();
this.setLocation$I$I(((screen.width - x.width)/2|0), ((screen.height - x.height)/2|0));
this.show();
this.finished = true;
});

Clazz.newMeth(C$, 'getMenuItem$S', function (s) {
var mi = Clazz.new_((I$[17]||(I$[17]=Clazz.load('a2s.MenuItem'))).c$$S,[s]);
mi.addActionListener$java_awt_event_ActionListener(this);
return mi;
});

Clazz.newMeth(C$, 'getCheckItem$S', function (s) {
var mi = Clazz.new_((I$[18]||(I$[18]=Clazz.load('a2s.CheckboxMenuItem'))).c$$S,[s]);
mi.addItemListener$java_awt_event_ItemListener(this);
return mi;
});

Clazz.newMeth(C$, 'getRadioItem$S', function (s) {
if (this.radioGroup == null ) this.radioGroup = Clazz.new_((I$[19]||(I$[19]=Clazz.load('javax.swing.ButtonGroup'))));
var mi = Clazz.new_((I$[20]||(I$[20]=Clazz.load('javax.swing.JRadioButtonMenuItem'))).c$$S,[s]);
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
var statesize = (this.viewStates == null ) ? 25 : this.viewStates.height;
this.viewX = this.viewP = this.viewParity = this.viewCurrent = null;
this.viewList = Clazz.array((I$[21]||(I$[21]=Clazz.load(Clazz.load('com.falstad.QuantumTransFrame').View))), [10]);
this.viewList[0] = this.viewPotential = Clazz.new_((I$[21]||(I$[21]=Clazz.load(Clazz.load('com.falstad.QuantumTransFrame').View))), [this, null]);
var i = 1;
if (this.xCheckItem.getState()) this.viewList[i++] = this.viewX = Clazz.new_((I$[21]||(I$[21]=Clazz.load(Clazz.load('com.falstad.QuantumTransFrame').View))), [this, null]);
if (this.pCheckItem.getState()) this.viewList[i++] = this.viewP = Clazz.new_((I$[21]||(I$[21]=Clazz.load(Clazz.load('com.falstad.QuantumTransFrame').View))), [this, null]);
if (this.parityCheckItem.getState()) this.viewList[i++] = this.viewParity = Clazz.new_((I$[21]||(I$[21]=Clazz.load(Clazz.load('com.falstad.QuantumTransFrame').View))), [this, null]);
if (this.currentCheckItem.getState()) this.viewList[i++] = this.viewCurrent = Clazz.new_((I$[21]||(I$[21]=Clazz.load(Clazz.load('com.falstad.QuantumTransFrame').View))), [this, null]);
this.viewList[i++] = this.viewStates = Clazz.new_((I$[21]||(I$[21]=Clazz.load(Clazz.load('com.falstad.QuantumTransFrame').View))), [this, null]);
this.viewCount = i;
var sizenum = this.viewCount;
var toth = this.winSize.height;
if (potsize > 0) {
sizenum--;
toth = toth-(potsize);
}if (statesize > 0) {
sizenum--;
toth = toth-(statesize * 2 + 5);
}toth = toth-(4 * 2 * (this.viewCount - 1) );
var cury = 0;
for (i = 0; i != this.viewCount; i++) {
var v = this.viewList[i];
var h = (toth/sizenum|0);
if (v === this.viewPotential  && potsize > 0 ) h = potsize;
 else if (v === this.viewStates  && statesize > 0 ) h = statesize;
v.paneY = cury;
if (cury > 0) cury = cury+(4);
v.x = 0;
v.width = this.winSize.width;
v.y = cury;
v.height = h;
cury = cury+(h + 4);
}
this.setGraphLines();
this.dbimage = this.createImage$I$I(d.width, d.height);
});

Clazz.newMeth(C$, 'setGraphLines', function () {
var i;
for (i = 0; i != this.viewCount; i++) {
var v = this.viewList[i];
var h = v.height;
if (v === this.viewPotential ) h = h-(20);
v.mid_y = v.y + (h/2|0);
v.ymult = 0.9 * h / 2;
if (v === this.viewPotential ) v.ymult *= 0.9;
v.lower_y = ((v.mid_y + v.ymult)|0);
v.ymult2 = v.ymult * 2;
}
var h = this.winSize.height - this.viewStates.y;
this.stateSize = ((h - 5)/2|0);
if (this.stateSize > (this.winSize.width/8|0)) this.stateSize = (this.winSize.width/8|0);
this.viewDestStates = Clazz.new_((I$[21]||(I$[21]=Clazz.load(Clazz.load('com.falstad.QuantumTransFrame').View))), [this, null]);
this.viewDestStates.x = 0;
this.viewDestStates.width = this.winSize.width;
this.viewDestStates.y = this.viewStates.y + this.stateSize + 5 ;
this.viewDestStates.height = this.stateSize;
this.viewStates.height = this.stateSize;
});

Clazz.newMeth(C$, 'doBlank', function () {
var x;
for (x = 0; x != this.sampleCount; x++) this.func[x] = this.funci[x] = 0;

for (x = 0; x != this.stateCount; x++) this.coefr[x] = this.coefi[x] = 0;

});

Clazz.newMeth(C$, 'normalize', function () {
var norm = 0;
var i;
for (i = 0; i != this.stateCount; i++) norm += this.coefr[i] * this.coefr[i] + this.coefi[i] * this.coefi[i];

if (norm == 0 ) return;
var normmult = 1 / java.lang.Math.sqrt(norm);
for (i = 0; i != this.stateCount; i++) {
this.coefr[i] *= normmult;
this.coefi[i] *= normmult;
}
});

Clazz.newMeth(C$, 'rescaleGraphs', function () {
var i;
for (i = 0; i != this.viewCount; i++) this.viewList[i].scale = 0;

});

Clazz.newMeth(C$, 'transform', function () {
var x;
var y;
for (y = 0; y != this.stateCount; y++) {
var a = 0;
var b = 0;
for (x = 1; x != this.sampleCount; x++) {
a += this.modes[y][x] * this.func[x];
b += this.modes[y][x] * this.funci[x];
}
if (a < 1.0E-8  && a > -1.0E-8  ) a = 0;
if (b < 1.0E-8  && b > -1.0E-8  ) b = 0;
this.coefr[y] = a;
this.coefi[y] = b;
}
});

Clazz.newMeth(C$, 'centerString$java_awt_Graphics$S$I', function (g, s, y) {
var fm = g.getFontMetrics();
g.drawString$S$I$I(s, ((this.winSize.width - fm.stringWidth$S(s))/2|0), y);
});

Clazz.newMeth(C$, 'writeString$java_awt_Graphics$S$I$I', function (g, s, x, y) {
g.drawString$S$I$I(s, x, y);
var fm = g.getFontMetrics();
return fm.stringWidth$S(s);
});

Clazz.newMeth(C$, 'writeArrow$java_awt_Graphics$I$I$D', function (g, x, y, v) {
var h = 12;
var vn = java.lang.Math.abs(v);
if (vn > 1 ) {
if (vn > 2 ) vn = 2;
var c = vn - 1;
g.setColor$java_awt_Color(Clazz.new_((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).c$$F$F$F,[c, 1.0, c]));
} else {
var c = ((255 * vn)|0);
g.setColor$java_awt_Color(Clazz.new_((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).c$$F$F$F,[0.0, c / 255.0, 0.0]));
}if (v > 0 ) this.drawArrow$java_awt_Graphics$I$I$I$I(g, x, y - (h/2|0), x + h, y - (h/2|0));
 else this.drawArrow$java_awt_Graphics$I$I$I$I(g, x + h, y - (h/2|0), x, y - (h/2|0));
return h;
});

Clazz.newMeth(C$, 'drawArrow$java_awt_Graphics$I$I$I$I', function (g, x1, y1, x2, y2) {
g.drawLine$I$I$I$I(x1, y1, x2, y2);
var l = java.lang.Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
var as = 5;
if (l > (as/2|0) ) {
var hatx = (x2 - x1) / l;
var haty = (y2 - y1) / l;
g.drawLine$I$I$I$I(x2, y2, ((haty * as - hatx * as + x2)|0), ((-hatx * as - haty * as + y2)|0));
g.drawLine$I$I$I$I(x2, y2, ((-haty * as - hatx * as + x2)|0), ((hatx * as - haty * as + y2)|0));
}});

Clazz.newMeth(C$, 'updateQuantumTrans$java_awt_Graphics', function (realg) {
if (this.winSize == null  || this.winSize.width == 0 ) return;
var g = this.dbimage.getGraphics();
var allQuiet = true;
var tval = this.stepBar.getValue();
var tadd = java.lang.Math.exp(tval / 20.0) * 0.02;
var sval = this.strengthBar.getValue();
var strengthMul = java.lang.Math.exp(sval / 20.0) / 409500.0;
var gray1 = Clazz.new_((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).c$$I$I$I,[76, 76, 76]);
var gray2 = Clazz.new_((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).c$$I$I$I,[127, 127, 127]);
g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(0, 0, this.winSize.width, this.winSize.height);
g.setColor$java_awt_Color(this.cv.getForeground());
var i;
var ox = -1;
var oy = -1;
for (i = 1; i != this.viewCount; i++) {
g.setColor$java_awt_Color(i == this.selectedPaneHandle ? (I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).yellow : (I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).gray);
g.drawLine$I$I$I$I(0, this.viewList[i].paneY, this.winSize.width, this.viewList[i].paneY);
}
if (this.statesChanged) {
this.cv.setCursor$java_awt_Cursor((I$[22]||(I$[22]=Clazz.load('java.awt.Cursor'))).getPredefinedCursor$I(3));
if (this.adjustingStates) this.genModes$Z(false);
 else {
realg.setColor$java_awt_Color(this.cv.getBackground());
var fm = realg.getFontMetrics();
var cs = "Calculating...";
realg.fillRect$I$I$I$I(0, this.winSize.height - 30, 20 + fm.stringWidth$S(cs), 30);
realg.setColor$java_awt_Color((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).white);
realg.drawString$S$I$I(cs, 10, this.winSize.height - 10);
this.genModes$Z(true);
this.transform();
}this.cv.setCursor$java_awt_Cursor(null);
this.statesChanged = false;
if (this.startup) {
this.coefr[0] = 1;
this.startup = false;
this.rescaleGraphs();
}}this.viewPotential.scale = 2 / (this.elevels[12] + 1);
var ymult = this.viewPotential.ymult;
var mid_y = (((this.viewPotential.mid_y + ymult) - ymult * this.viewPotential.scale)|0);
this.viewPotential.midy_adj = mid_y;
g.setColor$java_awt_Color(gray2);
ymult *= this.viewPotential.scale;
g.drawLine$I$I$I$I((this.winSize.width/2|0), mid_y - (ymult|0), (this.winSize.width/2|0), mid_y + (ymult|0));
ox = -1;
var j;
var norm = 0;
if (!this.adjustingStates) for (j = 0; j != this.stateCount; j++) norm += this.coefr[j] * this.coefr[j] + this.coefi[j] * this.coefi[j];

var normmult2 = 1 / norm;
var normmult = java.lang.Math.sqrt(normmult2);
if (norm == 0 ) normmult = normmult2 = 0;
g.setColor$java_awt_Color((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).gray);
for (i = 0; i != this.elevelCount; i++) {
if (i == this.stateCount) g.setColor$java_awt_Color((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).darkGray);
var dy = this.elevels[i];
var y = mid_y - ((ymult * dy)|0);
g.drawLine$I$I$I$I(0, y, this.winSize.width, y);
}
var fsin = java.lang.Math.sin(this.t2 * this.freq);
var mula = -strengthMul * fsin;
g.setColor$java_awt_Color((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).white);
for (i = 0; i != this.sampleCount; i++) {
var x = (this.winSize.width * i/this.sampleCount|0);
var dy = this.pot[i] + mula * (i / this.sampleCount - 0.5);
var y = mid_y - ((ymult * dy)|0);
if (y < 0) y = 0;
if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
ox = x;
oy = y;
}
if (!this.adjustingStates && norm != 0   && (this.expectCheckItem.getState() || this.uncertaintyCheckItem.getState() ) ) {
var expecte = 0;
var expecte2 = 0;
for (i = 0; i != this.stateCount; i++) {
var prob = (this.coefr[i] * this.coefr[i] + this.coefi[i] * this.coefi[i]) * normmult2;
expecte += prob * this.elevels[i];
expecte2 += prob * this.elevels[i] * this.elevels[i] ;
}
var uncert = java.lang.Math.sqrt(expecte2 - expecte * expecte);
if (this.uncertaintyCheckItem.getState()) {
g.setColor$java_awt_Color((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).blue);
var y = mid_y - ((ymult * (expecte + uncert))|0);
g.drawLine$I$I$I$I(0, y, this.winSize.width, y);
y = mid_y - ((ymult * (expecte - uncert))|0);
if (expecte - uncert >= -1 ) g.drawLine$I$I$I$I(0, y, this.winSize.width, y);
}if (this.expectCheckItem.getState()) {
var y = mid_y - ((ymult * expecte)|0);
g.setColor$java_awt_Color((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).red);
g.drawLine$I$I$I$I(0, y, this.winSize.width, y);
}}if (this.selectedCoef != -1 && !this.dragging ) {
g.setColor$java_awt_Color((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).yellow);
var y = mid_y - ((ymult * this.elevels[this.selectedCoef])|0);
g.drawLine$I$I$I$I(0, y, this.winSize.width, y);
}ox = -1;
var ty = this.viewPotential.y + this.viewPotential.height - 5;
var tx = 10;
g.setColor$java_awt_Color((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).white);
tx = tx+(this.writeString$java_awt_Graphics$S$I$I(g, "Electric Field: ", tx, ty));
tx = tx+(this.writeArrow$java_awt_Graphics$I$I$D(g, tx, ty, fsin * 2));
g.setColor$java_awt_Color((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).white);
tx = tx+(this.writeString$java_awt_Graphics$S$I$I(g, "    Current: ", tx, ty));
tx = tx+(this.writeArrow$java_awt_Graphics$I$I$D(g, tx, ty, 1000 * this.current / tadd));
g.setColor$java_awt_Color((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).white);
g.setColor$java_awt_Color((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).white);
var maxf = 0;
var expectx = 0;
if (!this.adjustingStates && !this.adjustingWaveFunc ) {
for (i = 0; i != this.sampleCount; i++) {
var x = (this.winSize.width * i/this.sampleCount|0);
var dr = 0;
var di = 0;
for (j = 0; j != this.stateCount; j++) {
dr += this.coefr[j] * this.modes[j][i];
di += this.coefi[j] * this.modes[j][i];
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
mid_y = this.viewX.mid_y;
ymult = this.viewX.ymult;
this.drawFunction$java_awt_Graphics$com_falstad_QuantumTransFrame_View$DA$DA$I$I(g, this.viewX, this.func, this.funci, this.sampleCount, 0);
if (this.selectedCoef != -1 && !this.dragging ) {
g.setColor$java_awt_Color((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).yellow);
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
g.setColor$java_awt_Color((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).yellow);
ox = -1;
var s2 = this.sampleCount * 2;
for (i = 0; i != s2; i++) {
var x = (this.winSize.width * i/s2|0);
var dy = java.lang.Math.cos(this.selectedPState * (i - this.sampleCount) * 0.5 );
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
var pnorm = 1 / java.lang.Math.sqrt(this.pSampleCount);
for (i = 0; i != this.pSampleCount; i++) {
var ii = (i <= (this.pSampleCount/2|0)) ? ((this.pSampleCount/2|0) - i) * 2 : (this.pSampleCount - (i - (this.pSampleCount/2|0))) * 2;
this.pdatar[i] = this.pdata[ii] * pnorm;
this.pdatai[i] = this.pdata[ii + 1] * pnorm;
}
var offset = (this.pSampleCount/4|0);
this.drawFunction$java_awt_Graphics$com_falstad_QuantumTransFrame_View$DA$DA$I$I(g, this.viewP, this.pdatar, this.pdatai, (this.pSampleCount/2|0), offset);
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
this.parityData[90] = java.lang.Math.sqrt(pplus) / 2;
this.parityData[10] = java.lang.Math.sqrt(pminus) / 2;
this.drawFunction$java_awt_Graphics$com_falstad_QuantumTransFrame_View$DA$DA$I$I(g, this.viewParity, this.parityData, null, 100, 0);
}if (this.viewCurrent != null ) {
for (i = 0; i != this.sampleCount - 1; i++) {
var a1 = this.func[i + 1] - this.func[i];
var a2 = this.funci[i + 1] - this.funci[i];
this.currentData[i] = this.func[i] * a2 - this.funci[i] * a1;
}
this.drawFunction$java_awt_Graphics$com_falstad_QuantumTransFrame_View$DA$DA$I$I(g, this.viewCurrent, this.currentData, null, this.sampleCount, 0);
}if (!this.adjustingStates) {
var ss2 = (this.stateSize/2|0);
this.stateColSize = 100;
var yel = (this.selectedCoef >= 0 && this.selection == 4 ) ? this.selectedCoef : -1;
for (i = 0; i != this.stateCount; i++) {
var x = this.stateSize * (i % this.stateColSize) + ss2;
var y = this.stateSize * ((i/this.stateColSize|0)) + ss2 + this.viewStates.y;
g.setColor$java_awt_Color(i == yel ? (I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).yellow : i == this.sourceState ? this.purple : (this.coefr[i] == 0  && this.coefi[i] == 0  ) ? gray2 : (I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).white);
g.drawOval$I$I$I$I(x - ss2, y - ss2, this.stateSize, this.stateSize);
var xa = ((this.coefr[i] * ss2)|0);
var ya = ((-this.coefi[i] * ss2)|0);
g.drawLine$I$I$I$I(x, y, x + xa, y + ya);
g.drawLine$I$I$I$I(x + xa - 1, y + ya, x + xa + 1 , y + ya);
g.drawLine$I$I$I$I(x + xa, y + ya - 1, x + xa, y + ya + 1 );
}
for (i = 0; i != 8; i++) {
var x = this.stateSize * (i % this.stateColSize) + ss2;
var y = this.stateSize * ((i/this.stateColSize|0)) + ss2 + this.viewDestStates.y;
var c = (this.sourceState < 0) ? 0 : ((6 + java.lang.Math.log(java.lang.Math.abs(this.dipoleOp[this.sourceState][i])))|0) * 64;
if (c > 255) c = 255;
if (c < 0) c = 0;
g.setColor$java_awt_Color(Clazz.new_((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).c$$I$I$I,[0, 0, c]));
g.fillOval$I$I$I$I(x - ss2, y - ss2, this.stateSize, this.stateSize);
g.setColor$java_awt_Color(i == this.destState ? this.purple : gray2);
g.drawOval$I$I$I$I(x - ss2, y - ss2, this.stateSize, this.stateSize);
}
if (this.selection == 5 && this.selectedCoef >= 0  && this.sourceState >= 0 ) {
var x1 = this.stateSize * (this.sourceState % this.stateColSize) + ss2;
var y1 = this.stateSize * ((this.sourceState/this.stateColSize|0)) + ss2 + this.viewStates.y;
var x2 = this.stateSize * (this.selectedCoef % this.stateColSize) + ss2;
var y2 = this.stateSize * ((this.selectedCoef/this.stateColSize|0)) + ss2 + this.viewDestStates.y;
g.setColor$java_awt_Color((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).yellow);
this.drawArrow$java_awt_Graphics$I$I$I$I(g, x1, y1, x2, y2);
}}var iters = this.speedBar.getValue();
if (this.stoppedCheck.getState() || this.dragging || this.adjustingStates  ) iters = 0;
 else allQuiet = false;
while (iters-- > 0){
var mul = strengthMul * java.lang.Math.sin(this.t2 * this.freq) * tadd ;
this.freqPhase = (this.t2 * this.freq) % 6.283185307179586;
for (j = 0; j != this.stateCount; j++) {
var a = this.coefr[j];
var b = this.coefi[j];
var k;
for (k = 0; k != this.stateCount; k++) {
a -= mul * this.dipoleOp[j][k] * this.coefi[k] ;
b += mul * this.dipoleOp[j][k] * this.coefr[k] ;
}
var ang = -(this.elevels[j] + 1.01) * tadd;
var angr = java.lang.Math.cos(ang);
var angi = java.lang.Math.sin(ang);
this.newcoefr[j] = a * angr - b * angi;
this.newcoefi[j] = b * angr + a * angi;
if (a * a + b * b < 1.0E-12 ) this.newcoefr[j] = this.newcoefi[j] = 0;
}
for (j = 0; j != this.stateCount; j++) {
this.coefr[j] = this.newcoefr[j];
this.coefi[j] = this.newcoefi[j];
}
this.t2 += tadd;
if (iters < 2) {
expectx = 0;
for (i = 0; i != this.sampleCount; i++) {
var x = i / (this.sampleCount - 1.0) - 0.5;
var dr = 0;
var di = 0;
for (j = 0; j != this.stateCount; j++) {
dr += this.coefr[j] * this.modes[j][i];
di += this.coefi[j] * this.modes[j][i];
}
this.func[i] = dr;
this.funci[i] = di;
var dy = dr * dr + di * di;
expectx += dy * x;
}
this.current = expectx - this.oldExpectX;
this.oldExpectX = expectx;
}}
this.normalize();
if (this.sourceState >= 0 && this.destState >= 0 ) {
var a1 = this.coefr[this.sourceState] * this.coefr[this.sourceState] + this.coefi[this.sourceState] * this.coefi[this.sourceState];
var a2 = this.coefr[this.destState] * this.coefr[this.destState] + this.coefi[this.destState] * this.coefi[this.destState];
if (a2 > a1 ) {
var s = this.sourceState;
this.sourceState = this.destState;
this.destState = s;
}}realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
if (!this.stoppedCheck.getState() && !allQuiet ) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'drawFunction$java_awt_Graphics$com_falstad_QuantumTransFrame_View$DA$DA$I$I', function (g, view, fr, fi, count, offset) {
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
var maxnm = java.lang.Math.sqrt(maxsq);
var uncert = java.lang.Math.sqrt(expectx2 - expectx * expectx);
var ox = -1;
var oy = 0;
var bestscale = 0;
if (fi != null  && (this.probCheckItem.isSelected() || this.probPhaseCheckItem.isSelected() ) ) bestscale = 1 / maxsq;
 else bestscale = 1 / maxnm;
if (!this.adjustingWaveFunc) {
view.scale *= 1.001;
if (view.scale > bestscale  || view.scale == 0  ) view.scale = bestscale;
if (view.scale > 1.0E8 ) view.scale = 1.0E8;
}g.setColor$java_awt_Color((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).gray);
if ((this.probCheckItem.isSelected() || this.probPhaseCheckItem.isSelected() || this.magPhaseCheckItem.isSelected()  ) && fi != null  ) {
g.setColor$java_awt_Color((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).white);
var mult = view.ymult2 * view.scale;
for (i = 0; i != count; i++) {
var x = (this.winSize.width * i/(count - 1)|0);
var dy = 0;
var ii = i + offset;
if (!this.magPhaseCheckItem.isSelected()) dy = (fr[ii] * fr[ii] + fi[ii] * fi[ii]);
 else dy = java.lang.Math.sqrt(fr[ii] * fr[ii] + fi[ii] * fi[ii]);
if (!this.probCheckItem.isSelected()) {
var ang = java.lang.Math.atan2(fi[ii], fr[ii]);
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
g.setColor$java_awt_Color((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).blue);
for (i = 0; i != count; i++) {
var x = (this.winSize.width * i/(count - 1)|0);
var ii = i + offset;
var y = mid_y - ((mult * fi[ii])|0);
if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
ox = x;
oy = y;
}
}g.setColor$java_awt_Color((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).white);
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
g.setColor$java_awt_Color((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).blue);
g.drawLine$I$I$I$I(((expectx - uncert)|0), view.y, ((expectx - uncert)|0), view.y + view.height);
g.drawLine$I$I$I$I(((expectx + uncert)|0), view.y, ((expectx + uncert)|0), view.y + view.height);
}if (this.expectCheckItem.getState()) {
g.setColor$java_awt_Color((I$[15]||(I$[15]=Clazz.load('java.awt.Color'))).red);
g.drawLine$I$I$I$I((expectx|0), view.y, (expectx|0), view.y + view.height);
}}});

Clazz.newMeth(C$, 'edit$java_awt_event_MouseEvent', function (e) {
if (this.selection == 0) return;
var x = e.getX();
var y = e.getY();
switch (this.selection) {
case 6:
this.editHandle$I(y);
break;
case 4:
this.editMag$I$I(x, y);
break;
case 5:
this.editDest$I$I(x, y);
break;
default:
this.editFunc$I$I(x, y);
break;
}
});

Clazz.newMeth(C$, 'editHandle$I', function (y) {
var dy = y - this.viewList[this.selectedPaneHandle].paneY;
var upper = this.viewList[this.selectedPaneHandle - 1];
var lower = this.viewList[this.selectedPaneHandle];
var minheight = 10;
if (upper.height + dy < minheight || lower.height - dy < minheight ) return;
upper.height = upper.height+(dy);
lower.height = lower.height-(dy);
lower.y = lower.y+(dy);
lower.paneY = lower.paneY+(dy);
this.setGraphLines();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'editDest$I$I', function (x, y) {
if (this.selectedCoef == -1) return;
var j;
var mx = 0;
for (j = 0; j != this.stateCount; j++) {
var xx = this.coefr[j] * this.coefr[j] + this.coefi[j] * this.coefi[j];
if (xx > mx ) {
mx = xx;
this.sourceState = j;
}}
this.destState = this.selectedCoef;
this.setSourceDest();
});

Clazz.newMeth(C$, 'setSourceDest', function () {
if (this.destState >= 0 && this.sourceState < 0 ) this.sourceState = 0;
this.freq = this.elevels[this.destState] - this.elevels[this.sourceState];
this.freqBar.setValue$I(((this.freq * 400 / this.freqMax)|0));
});

Clazz.newMeth(C$, 'editMag$I$I', function (x, y) {
if (this.selectedCoef == -1) return;
var ss2 = (this.stateSize/2|0);
var x0 = this.stateSize * (this.selectedCoef % this.stateColSize) + ss2;
var y0 = this.stateSize * ((this.selectedCoef/this.stateColSize|0)) + ss2 + this.viewStates.y;
x = x-(x0);
y = y-(y0);
var mag = java.lang.Math.sqrt(x * x + y * y) / ss2;
if (mag > 10 ) x = y = 0;
this.coefr[this.selectedCoef] = x / ss2;
this.coefi[this.selectedCoef] = -y / ss2;
if (mag > 1 ) {
this.coefr[this.selectedCoef] /= mag;
this.coefi[this.selectedCoef] /= mag;
}this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'editFunc$I$I', function (x, y) {
if (this.selection == 1) {
this.findStateByEnergy$I(y);
this.enterSelectedState();
}});

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

Clazz.newMeth(C$, 'destroyFrame', function () {
if (this.applet == null ) this.dispose();
 else this.applet.destroyFrame();
});

Clazz.newMeth(C$, 'actionPerformed$java_awt_event_ActionEvent', function (e) {
if (e.getSource() === this.exitItem ) {
this.destroyFrame();
return;
}if (e.getSource() === this.blankButton ) {
this.doBlank();
this.cv.repaint();
}if (e.getSource() === this.stopButton ) {
this.freq = 0;
this.sourceState = this.destState = -1;
}if (e.getSource() === this.reverseButton  && this.freq != 0  ) {
this.freqPhase += 3.141592653589793;
this.t2 = this.freqPhase / this.freq;
}});

Clazz.newMeth(C$, 'scrollbarValueChanged$com_falstad_DecentScrollbar', function (ds) {
System.out.print$S(ds.getValue() + "\n");
if (ds === this.massBar ) {
this.statesChanged = this.adjustingStates = true;
this.cv.repaint$J(this.pause);
}if (ds === this.aux1Bar  || ds === this.aux2Bar  ) {
this.adjustingStates = true;
this.setup.drawPotential();
this.statesChanged = true;
this.cv.repaint$J(this.pause);
}if (ds === this.resBar ) this.adjustingStates = true;
if (ds === this.freqBar ) {
this.freq = ds.getValue() * this.freqMax / 400.0;
this.sourceState = this.destState = -1;
this.t2 = this.freqPhase / this.freq;
}});

Clazz.newMeth(C$, 'scrollbarFinished$com_falstad_DecentScrollbar', function (ds) {
if (ds === this.resBar ) {
this.adjustingStates = false;
this.setResolution();
this.reinit();
this.cv.repaint$J(this.pause);
}if (ds === this.massBar  || ds === this.aux1Bar   || ds === this.aux2Bar  ) {
this.adjustingStates = false;
this.statesChanged = true;
this.cv.repaint$J(this.pause);
}});

Clazz.newMeth(C$, 'handleEvent$java_awt_Event', function (ev) {
if (ev.id == 201) {
this.applet.destroyFrame();
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
this.fft = Clazz.new_((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.QuantumTransFrame').FFT))).c$$I, [this, null, this.pSampleCount]);
});

Clazz.newMeth(C$, 'genModes$Z', function (getStates) {
this.statesChanged = false;
var n = this.sampleCount;
var d = Clazz.array(Double.TYPE, [n + 1]);
var e = Clazz.array(Double.TYPE, [n + 1]);
var z = Clazz.array(Double.TYPE, [n + 1, n + 1]);
var i;
var j;
var m1 = 1 / (this.massBar.getValue() * 0.02);
var maxpot = -20;
for (i = 1; i <= n; i++) {
if (i < n) e[i] = -m1;
d[i] = 2 * m1 + this.pot[i - 1];
if (this.pot[i - 1] > maxpot ) maxpot = this.pot[i - 1];
for (j = 1; j <= n; j++) z[i][j] = 0;

z[i][i] = 1;
}
this.imtql2$I$DA$DA$DAA(n, d, e, getStates ? z : null);
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
var maxs = 20;
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
this.dipoleOp = Clazz.array(Double.TYPE, [this.stateCount, this.stateCount]);
var k;
for (i = 0; i != this.stateCount; i++) for (j = 0; j != this.stateCount; j++) {
var dd = 0;
var mk = 0;
var mkx = 0;
for (k = 0; k != this.sampleCount; k++) {
var x = k / (this.sampleCount - 1.0) - 0.5;
dd += this.modes[i][k] * this.modes[j][k] * x ;
if (-this.modes[i][k] > mkx ) {
mkx = -this.modes[i][k];
mk = k;
}}
this.dipoleOp[i][j] = dd;
}

this.freqMax = this.elevels[7] - this.elevels[0];
if (!this.setupModified) this.setup.fudgeLevels();
this.sourceState = 0;
this.destState = 1;
this.setSourceDest();
});

Clazz.newMeth(C$, 'mouseDragged$java_awt_event_MouseEvent', function (e) {
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseMoved$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) != 0) return;
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
var dy = y - this.viewList[i].paneY;
if (dy >= -3 && dy <= 3 ) {
this.selectedPaneHandle = i;
this.selection = 6;
}}
var cs = null;
if (this.selection == 6) cs = (I$[22]||(I$[22]=Clazz.load('java.awt.Cursor'))).getPredefinedCursor$I(8);
 else if (this.viewPotential.contains$I$I(x, y)) {
this.selection = 1;
this.findStateByEnergy$I(y);
} else if (this.viewStates.contains$I$I(x, y)) {
var xi = (x/this.stateSize|0);
var yi = ((y - this.viewStates.y)/this.stateSize|0);
this.selectedCoef = xi + yi * this.stateColSize;
if (this.selectedCoef >= 8) this.selectedCoef = -1;
if (this.selectedCoef != -1) this.selection = 4;
} else if (this.viewDestStates.contains$I$I(x, y)) {
var xi = (x/this.stateSize|0);
var yi = ((y - this.viewDestStates.y)/this.stateSize|0);
this.selectedCoef = xi + yi * this.stateColSize;
if (this.selectedCoef >= 8) this.selectedCoef = -1;
if (this.selectedCoef != -1) this.selection = 5;
}this.cv.setCursor$java_awt_Cursor(cs);
if (this.selection != oldSelection || this.selectedCoef != oldCoef ) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'findStateByEnergy$I', function (y) {
var i;
var dy = (this.viewPotential.midy_adj - y) / (this.viewPotential.ymult * this.viewPotential.scale);
var dist = 100;
for (i = 0; i != this.stateCount; i++) {
var d = java.lang.Math.abs(this.elevels[i] - dy);
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
for (i = 0; i != this.stateCount; i++) if (this.selectedCoef != i) this.coefr[i] = this.coefi[i] = 0;

this.coefr[this.selectedCoef] = 1;
this.coefi[this.selectedCoef] = 0;
this.cv.repaint$J(this.pause);
this.rescaleGraphs();
this.destState = -1;
this.sourceState = this.selectedCoef;
this.freq = 0;
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
this.dragging = this.adjustingWaveFunc = false;
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
if (!this.finished) return;
if (e.getItemSelectable() === this.stoppedCheck ) {
this.cv.repaint$J(this.pause);
return;
}if (e.getItemSelectable() === this.setupChooser ) this.doSetup();
if (e.getItemSelectable() === this.xCheckItem  || e.getItemSelectable() === this.pCheckItem   || e.getItemSelectable() === this.parityCheckItem   || e.getItemSelectable() === this.currentCheckItem  ) {
this.handleResize();
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
this.setup.select();
this.setup.drawPotential();
this.setupModified = false;
this.statesChanged = true;
this.aux2Label.hide();
this.aux2Bar.hide();
this.aux1Label.hide();
this.aux1Bar.hide();
this.validate();
this.startup = true;
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
});
;
(function(){var C$=Clazz.newClass(P$.QuantumTransFrame, "FFT", function(){
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
(function(){var C$=Clazz.newClass(P$.QuantumTransFrame, "Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'fudgeLevels', function () {
});

Clazz.newMeth(C$, 'getAuxBarCount', function () {
return 0;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumTransFrame, "InfiniteWellSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.QuantumTransFrame','com.falstad.QuantumTransFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Infinite Well";
});

Clazz.newMeth(C$, 'select', function () {
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
var width = 1;
for (i = 0; i != this.b$['com.falstad.QuantumTransFrame'].sampleCount; i++) this.b$['com.falstad.QuantumTransFrame'].pot[i] = 50;

for (i = width; i <= this.b$['com.falstad.QuantumTransFrame'].sampleCount - 1 - width ; i++) this.b$['com.falstad.QuantumTransFrame'].pot[i] = -1;

});

Clazz.newMeth(C$, 'fudgeLevels', function () {
var i;
for (i = 1; i != this.b$['com.falstad.QuantumTransFrame'].stateCount; i++) this.b$['com.falstad.QuantumTransFrame'].elevels[i] = (this.b$['com.falstad.QuantumTransFrame'].elevels[0] + 1) * (i + 1) * (i + 1)  - 1;

});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[2]||(I$[2]=Clazz.load(Clazz.load('com.falstad.QuantumTransFrame').FiniteWellPairCoupledSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumTransFrame, "FiniteWellPairCoupledSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.QuantumTransFrame','com.falstad.QuantumTransFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Coupled Well Pair";
});

Clazz.newMeth(C$, 'select', function () {
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
var width = (this.b$['com.falstad.QuantumTransFrame'].sampleCount/4|0);
var sep = (1 * (width - 1)/101|0) + 1;
var floor = -1;
var infloor = 0;
for (i = 0; i != this.b$['com.falstad.QuantumTransFrame'].sampleCount; i++) this.b$['com.falstad.QuantumTransFrame'].pot[i] = 50;

for (i = 0; i != width; i++) this.b$['com.falstad.QuantumTransFrame'].pot[(this.b$['com.falstad.QuantumTransFrame'].sampleCount/2|0) - i - sep] = this.b$['com.falstad.QuantumTransFrame'].pot[(this.b$['com.falstad.QuantumTransFrame'].sampleCount/2|0) + i + sep] = floor;

for (i = 0; i < sep; i++) this.b$['com.falstad.QuantumTransFrame'].pot[(this.b$['com.falstad.QuantumTransFrame'].sampleCount/2|0) - i] = this.b$['com.falstad.QuantumTransFrame'].pot[(this.b$['com.falstad.QuantumTransFrame'].sampleCount/2|0) + i] = infloor;

});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[3]||(I$[3]=Clazz.load(Clazz.load('com.falstad.QuantumTransFrame').HarmonicOscillatorSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumTransFrame, "HarmonicOscillatorSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.QuantumTransFrame','com.falstad.QuantumTransFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Harmonic Oscillator";
});

Clazz.newMeth(C$, 'select', function () {
});

Clazz.newMeth(C$, 'drawPotential', function () {
var i;
var width = 75 * ((this.b$['com.falstad.QuantumTransFrame'].sampleCount/2|0)) / 110.0;
var offset = 0;
width *= 2;
var a = 2 / (width * width);
for (i = 0; i != this.b$['com.falstad.QuantumTransFrame'].sampleCount; i++) {
var ii = offset + i - (this.b$['com.falstad.QuantumTransFrame'].sampleCount/2|0);
this.b$['com.falstad.QuantumTransFrame'].pot[i] = a * ii * ii  - 1;
}
this.b$['com.falstad.QuantumTransFrame'].pot[0] = this.b$['com.falstad.QuantumTransFrame'].pot[this.b$['com.falstad.QuantumTransFrame'].sampleCount - 1] = 50;
});

Clazz.newMeth(C$, 'fudgeLevels', function () {
var i;
if (this.b$['com.falstad.QuantumTransFrame'].stateCount < 10) return;
var avg = 0;
for (i = 0; i != 10; i++) avg += this.b$['com.falstad.QuantumTransFrame'].elevels[i + 1] - this.b$['com.falstad.QuantumTransFrame'].elevels[i];

avg /= 10;
for (i = 1; i != this.b$['com.falstad.QuantumTransFrame'].stateCount; i++) {
if ((this.b$['com.falstad.QuantumTransFrame'].elevels[i] - this.b$['com.falstad.QuantumTransFrame'].elevels[i - 1]) / avg > 2 ) break;
this.b$['com.falstad.QuantumTransFrame'].elevels[i] = this.b$['com.falstad.QuantumTransFrame'].elevels[i - 1] + avg;
}
});

Clazz.newMeth(C$, 'createNext', function () {
return null;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumTransFrame, "View", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, 'java.awt.Rectangle');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.mid_y = 0;
this.lower_y = 0;
this.midy_adj = 0;
this.paneY = 0;
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
