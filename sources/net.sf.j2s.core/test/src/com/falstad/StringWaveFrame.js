(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "StringWaveFrame", function(){
Clazz.newInstance(this, arguments,0,C$);
}, 'a2s.Frame', ['java.awt.event.ComponentListener', 'java.awt.event.ActionListener', 'java.awt.event.AdjustmentListener', 'java.awt.event.MouseMotionListener', 'java.awt.event.MouseListener', 'java.awt.event.ItemListener', ['javajs.util.JSAudioThread','javajs.util.JSAudioThread.Owner']]);
var p$=C$.prototype;

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.isJava = false;
this.winSize = null;
this.dbimage = null;
this.random = null;
this.maxTerms = 0;
this.maxMaxTerms = 0;
this.sampleCount = 0;
this.sinTable = null;
this.fundamentalButton = null;
this.centerPluckButton = null;
this.clearButton = null;
this.resonanceButton = null;
this.stoppedCheck = null;
this.forceCheck = null;
this.soundCheck = null;
this.touchCheck = null;
this.backwardsCheck = null;
this.logCheck = null;
this.modeChooser = null;
this.displayChooser = null;
this.dampingBar = null;
this.speedBar = null;
this.forceBar = null;
this.loadBar = null;
this.tensionBar = null;
this.magcoef = null;
this.dampcoef = 0;
this.phasecoef = null;
this.phasecoefcos = null;
this.phasecoefadj = null;
this.forcebasiscoef = null;
this.omega = null;
this.step = 0;
this.func = null;
this.funci = null;
this.selectedCoef = 0;
this.magnitudesY = 0;
this.selection = 0;
this.dragX = 0;
this.dragY = 0;
this.dragging = false;
this.bowing = false;
this.bowCaught = false;
this.forceApplied = false;
this.t = 0;
this.forceMag = 0;
this.pause = 0;
this.forceBarValue = 0;
this.forceTimeZero = 0;
this.tensionBarValue = 0;
this.gray1 = null;
this.gray2 = null;
this.useFrame = false;
this.showControls = false;
this.cv = null;
this.applet = null;
this.java2 = false;
this.main = null;
this.shown = false;
this.lastTime = 0;
this.logep2 = 0;
this.lastAction = null;
this.playInitialized = false;
this.audioByteBuffer = null;
this.playSampleCount = 0;
this.rate = 0;
this.audioBufferByteLength = 0;
this.bitsPerSample = 0;
this.nChannels = 0;
this.audioThread = null;
this.soundChanged = false;
this.mx = 0;
this.offset = 0;
this.dampCount = 0;
this.fft = null;
this.playfunc = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.isJava = true;
this.maxTerms = 60;
this.maxMaxTerms = 160;
this.gray1 = Clazz.new_((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).c$$I$I$I,[76, 76, 76]);
this.gray2 = Clazz.new_((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).c$$I$I$I,[127, 127, 127]);
this.shown = false;
this.logep2 = 0;
this.playSampleCount = 16384;
this.rate = 22050;
this.audioBufferByteLength = 32768;
this.bitsPerSample = 16;
this.nChannels = 1;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "StringWave Series by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'c$$com_falstad_StringWave', function (a) {
C$.superclazz.c$$S.apply(this, ["Loaded String Applet v1.5a"]);
C$.$init$.apply(this);
this.applet = a;
this.useFrame = true;
this.showControls = true;
{
isJava = false;
}}, 1);

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
if (jvf >= 48 ) this.java2 = true;
this.selectedCoef = -1;
this.main.setLayout$java_awt_LayoutManager(Clazz.new_((I$[3]||(I$[3]=Clazz.load(Clazz.load('com.falstad.StringWaveFrame').StringWaveLayout))), [this, null]));
this.cv = Clazz.new_((I$[4]||(I$[4]=Clazz.load(Clazz.load('com.falstad.StringWaveFrame').StringWaveCanvas))).c$$com_falstad_StringWaveFrame, [this, null, this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
this.main.add$java_awt_Component(this.cv);
this.main.add$java_awt_Component(this.fundamentalButton = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Button'))).c$$S,["Fundamental"]));
this.fundamentalButton.addActionListener$java_awt_event_ActionListener(this);
this.main.add$java_awt_Component(this.centerPluckButton = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Button'))).c$$S,["Center Pluck"]));
this.centerPluckButton.addActionListener$java_awt_event_ActionListener(this);
this.main.add$java_awt_Component(this.clearButton = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Button'))).c$$S,["Clear"]));
this.clearButton.addActionListener$java_awt_event_ActionListener(this);
this.stoppedCheck = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Checkbox'))).c$$S,["Stopped"]);
this.stoppedCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.stoppedCheck);
this.forceCheck = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Driving Force", false]);
this.forceCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.forceCheck);
this.soundCheck = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Sound", false]);
this.soundCheck.addItemListener$java_awt_event_ItemListener(this);
if (this.java2) this.main.add$java_awt_Component(this.soundCheck);
this.touchCheck = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Touched in Center", false]);
this.touchCheck.addItemListener$java_awt_event_ItemListener(this);
this.backwardsCheck = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Run Backwards", false]);
this.backwardsCheck.addItemListener$java_awt_event_ItemListener(this);
this.logCheck = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Log View", false]);
this.logCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.logCheck);
this.modeChooser = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Choice'))));
this.modeChooser.add$S("Mouse = Pluck string");
this.modeChooser.add$S("Mouse = Shape string");
this.modeChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.modeChooser);
this.displayChooser = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Choice'))));
this.displayChooser.add$S("Display Phases");
this.displayChooser.add$S("Display Left+Right");
this.displayChooser.add$S("Display Phase Cosines");
this.displayChooser.add$S("Display Phasors");
this.displayChooser.add$S("Display Modes");
this.displayChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.displayChooser);
this.main.add$java_awt_Component(Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Label'))).c$$S$I,["Simulation Speed", 0]));
this.main.add$java_awt_Component(this.speedBar = Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 85, 1, 1, 200]));
this.speedBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Label'))).c$$S$I,["Damping", 0]));
this.main.add$java_awt_Component(this.dampingBar = Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 10, 1, 0, 400]));
this.dampingBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Label'))).c$$S$I,["Force Frequency", 0]));
this.forceBarValue = 5;
this.main.add$java_awt_Component(this.forceBar = Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, this.forceBarValue, 1, 1, 30]));
this.forceBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(this.resonanceButton = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Button'))).c$$S,["Resonance Freq"]));
this.resonanceButton.addActionListener$java_awt_event_ActionListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Label'))).c$$S$I,["Number of Loads", 0]));
this.main.add$java_awt_Component(this.loadBar = Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, this.maxTerms, 1, 2, this.maxMaxTerms]));
this.loadBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.setLoadCount();
this.tensionBarValue = 16;
this.main.add$java_awt_Component(Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Label'))).c$$S$I,["Tension", 0]));
this.main.add$java_awt_Component(this.tensionBar = Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, this.tensionBarValue, 1, 1, 100]));
this.tensionBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
try {
var param = this.applet.getParameter$S("PAUSE");
if (param != null ) this.pause = Integer.parseInt(param);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
this.magcoef = Clazz.array(Double.TYPE, [this.maxMaxTerms]);
this.phasecoef = Clazz.array(Double.TYPE, [this.maxMaxTerms]);
this.phasecoefcos = Clazz.array(Double.TYPE, [this.maxMaxTerms]);
this.phasecoefadj = Clazz.array(Double.TYPE, [this.maxMaxTerms]);
this.forcebasiscoef = Clazz.array(Double.TYPE, [this.maxMaxTerms]);
this.func = Clazz.array(Double.TYPE, [this.maxMaxTerms + 1]);
this.funci = Clazz.array(Double.TYPE, [this.maxMaxTerms + 1]);
this.random = Clazz.new_((I$[10]||(I$[10]=Clazz.load('java.util.Random'))));
this.setDamping();
this.reinit();
this.cv.setBackground$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).lightGray);
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
this.doSine();
});

Clazz.newMeth(C$, 'handleResize', function () {
var d = this.winSize = this.cv.getSize();
if (this.winSize.width == 0) return;
this.dbimage = this.createImage$I$I(d.width, d.height);
});

Clazz.newMeth(C$, 'triggerShow', function () {
if (!this.shown) this.setVisible$Z(true);
this.shown = true;
});

Clazz.newMeth(C$, 'doSine', function () {
var x;
for (x = 0; x != this.sampleCount; x++) {
this.func[x] = java.lang.Math.sin(x * this.step);
}
this.func[this.sampleCount] = this.func[0];
this.transform$Z(true);
});

Clazz.newMeth(C$, 'doTriangle', function () {
var x;
for (x = 0; x <= (this.sampleCount/2|0); x++) this.func[this.sampleCount - x] = this.func[x] = 2.0 * x / this.sampleCount;

this.func[this.sampleCount] = this.func[0];
this.transform$Z(true);
});

Clazz.newMeth(C$, 'doBlank', function () {
var x;
for (x = 0; x <= this.sampleCount; x++) this.func[x] = 0;

this.transform$Z(true);
});

Clazz.newMeth(C$, 'transform$Z', function (novel) {
var x;
var y;
this.t = 0;
for (y = 1; y != this.maxTerms; y++) {
var a = 0;
var b = 0;
for (x = 1; x != this.sampleCount; x++) {
a += this.sinTable[x][y] * this.func[x];
b -= this.sinTable[x][y] * this.funci[x];
}
a *= 2.0 / this.sampleCount;
b *= 2.0 / (this.sampleCount * this.omega[y]);
if (a < 1.0E-5  && a > -1.0E-5  ) a = 0;
if (b < 1.0E-5  && b > -1.0E-5  ) b = 0;
if (novel) b = 0;
var r = java.lang.Math.sqrt(a * a + b * b);
this.magcoef[y] = r;
var ph2 = java.lang.Math.atan2(b, a);
this.phasecoefadj[y] = ph2;
this.phasecoef[y] = ph2;
}
p$.updateSound.apply(this, []);
});

Clazz.newMeth(C$, 'getPanelHeight', function () {
return (this.winSize.height/3|0);
});

Clazz.newMeth(C$, 'centerString$java_awt_Graphics$S$I', function (g, s, y) {
var fm = g.getFontMetrics();
g.drawString$S$I$I(s, ((this.winSize.width - fm.stringWidth$S(s))/2|0), y);
});

Clazz.newMeth(C$, 'updateStringWave$java_awt_Graphics', function (realg) {
if (this.winSize == null  || this.winSize.width == 0 ) return;
var g = this.dbimage.getGraphics();
var allQuiet = true;
var dampmult = 1;
if (!this.stoppedCheck.getState()) {
if (this.bowing) {
this.doBow();
allQuiet = false;
}var val = this.speedBar.getValue();
if (this.forceCheck.getState()) {
this.doForce();
allQuiet = false;
} else this.forceMag = 0;
var sysTime = System.currentTimeMillis();
var tadd = 0;
if (this.lastTime != 0) tadd = java.lang.Math.exp(val / 20.0) * 6.666666666666667E-5 * (sysTime - this.lastTime) ;
if (this.backwardsCheck.getState()) this.t -= tadd;
 else this.t += tadd;
this.lastTime = sysTime;
dampmult = Math.exp(this.dampcoef * tadd);
} else this.lastTime = 0;
g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(0, 0, this.winSize.width, this.winSize.height);
g.setColor$java_awt_Color(this.cv.getForeground());
var i;
var ox = -1;
var oy = -1;
var panelHeight = this.getPanelHeight();
var midy = (panelHeight/2|0);
var halfPanel = (panelHeight/2|0);
var ymult = 0.75 * halfPanel;
for (i = -1; i <= 1; i++) {
g.setColor$java_awt_Color((i == 0) ? this.gray2 : this.gray1);
g.drawLine$I$I$I$I(0, midy + (i * (ymult|0)), this.winSize.width, midy + (i * (ymult|0)));
}
g.setColor$java_awt_Color(this.gray2);
g.drawLine$I$I$I$I((this.winSize.width/2|0), midy - (ymult|0), (this.winSize.width/2|0), midy + (ymult|0));
if (this.dragging && this.selection == 1 ) {
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).cyan);
allQuiet = true;
for (i = 0; i != this.sampleCount + 1; i++) {
var x = (this.winSize.width * i/this.sampleCount|0);
var y = midy - ((ymult * this.func[i])|0);
if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
ox = x;
oy = y;
}
}if (!this.stoppedCheck.getState()) {
if (this.touchCheck.getState()) this.doTouch();
for (i = 1; i != this.maxTerms; i++) this.magcoef[i] *= dampmult;

}var magcoefdisp = this.magcoef;
var phasecoefdisp = this.phasecoef;
var phasecoefcosdisp = this.phasecoefcos;
if (this.dragging && this.selection == 1 ) {
this.lastTime = 0;
} else {
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).white);
ox = -1;
var j;
for (j = 1; j != this.maxTerms; j++) {
if (this.magcoef[j] < 1.0E-5  && this.magcoef[j] > -1.0E-5  ) {
this.magcoef[j] = this.phasecoef[j] = this.phasecoefadj[j] = 0;
continue;
}allQuiet = false;
this.phasecoef[j] = (this.omega[j] * this.t + this.phasecoefadj[j]) % 6.283185307179586;
if (this.phasecoef[j] > 3.141592653589793 ) this.phasecoef[j] -= 6.283185307179586;
 else if (this.phasecoef[j] < -3.141592653589793 ) this.phasecoef[j] += 6.283185307179586;
this.phasecoefcos[j] = java.lang.Math.cos(this.phasecoef[j]);
}
if (this.forceApplied) {
allQuiet = false;
magcoefdisp = Clazz.array(Double.TYPE, [this.maxTerms]);
phasecoefdisp = Clazz.array(Double.TYPE, [this.maxTerms]);
phasecoefcosdisp = Clazz.array(Double.TYPE, [this.maxTerms]);
for (i = 1; i < this.maxTerms; i++) {
var ph = this.phasecoef[i];
var a = this.magcoef[i] * this.phasecoefcos[i];
var b = this.magcoef[i] * java.lang.Math.sin(ph);
a += this.forcebasiscoef[i];
var r = java.lang.Math.sqrt(a * a + b * b);
magcoefdisp[i] = r;
var ph2 = java.lang.Math.atan2(b, a);
phasecoefdisp[i] += ph2;
phasecoefcosdisp[i] = (r > 0 ) ? a / r : 0;
}
}var dotSize = (this.sampleCount < 40) ? 5 : 0;
var funcDotSize = dotSize;
var forcePos = (this.forceMag == 0 ) ? -1 : (this.sampleCount/2|0);
for (i = 0; i != this.sampleCount + 1; i++) {
var x = (this.winSize.width * i/this.sampleCount|0);
var dy = 0;
for (j = 1; j != this.maxTerms; j++) dy += magcoefdisp[j] * this.sinTable[i][j] * phasecoefcosdisp[j] ;

this.func[i] = dy;
var y = midy - ((ymult * dy)|0);
if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
if (dotSize > 0 && i != 0  && i != this.sampleCount ) g.fillOval$I$I$I$I(x - (dotSize/2|0), y - (dotSize/2|0), dotSize, dotSize);
if (i == forcePos) {
var yl = ((ymult * this.forceMag * 8 )|0);
if (yl > 7 || yl < -7 ) {
var y2 = y - yl;
var forcedir = (this.forceMag < 0 ) ? -1 : 1;
g.drawLine$I$I$I$I(x, y, x, y2);
g.drawLine$I$I$I$I(x, y2, x + 5, y2 + 5 * forcedir);
g.drawLine$I$I$I$I(x, y2, x - 5, y2 + 5 * forcedir);
}}ox = x;
oy = y;
}
}if (this.selectedCoef != -1 && !this.dragging  && (magcoefdisp[this.selectedCoef] > 0.04  || magcoefdisp[this.selectedCoef] < -0.04  ) ) {
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).yellow);
ox = -1;
ymult *= magcoefdisp[this.selectedCoef];
for (i = 0; i != this.sampleCount + 1; i++) {
var x = (this.winSize.width * i/this.sampleCount|0);
var dy = this.sinTable[i][this.selectedCoef] * phasecoefcosdisp[this.selectedCoef];
var y = midy - ((ymult * dy)|0);
if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
ox = x;
oy = y;
}
}var termWidth = this.getTermWidth();
ymult = 0.6 * halfPanel;
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).white);
if (this.displayChooser.getSelectedIndex() == 0 || this.displayChooser.getSelectedIndex() == 2 ) this.magnitudesY = panelHeight;
 else this.magnitudesY = panelHeight * 2;
midy = this.magnitudesY + ((panelHeight/2|0)) + ((ymult|0)/2|0) ;
this.centerString$java_awt_Graphics$S$I(g, "Harmonics: Magnitudes", this.magnitudesY + ((panelHeight * 0.16)|0));
g.setColor$java_awt_Color(this.gray2);
g.drawLine$I$I$I$I(0, midy, this.winSize.width, midy);
g.setColor$java_awt_Color(this.gray1);
g.drawLine$I$I$I$I(0, midy - (ymult|0), this.winSize.width, midy - (ymult|0));
g.drawLine$I$I$I$I(0, midy + (ymult|0), this.winSize.width, midy + (ymult|0));
var dotSize = termWidth - 3;
if (dotSize < 3) dotSize = 3;
if (dotSize > 9) dotSize = 9;
for (i = 1; i != this.maxTerms; i++) {
var t = termWidth * (i - 1) + (termWidth/2|0);
var y = midy - ((this.logcoef$D(magcoefdisp[i]) * ymult)|0);
g.setColor$java_awt_Color(i == this.selectedCoef ? (I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).yellow : (I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).white);
g.drawLine$I$I$I$I(t, midy, t, y);
g.fillOval$I$I$I$I(t - (dotSize/2|0), y - (dotSize/2|0), dotSize, dotSize);
}
if (this.displayChooser.getSelectedIndex() == 0 || this.displayChooser.getSelectedIndex() == 2 ) {
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).white);
var cosines = this.displayChooser.getSelectedIndex() == 2;
this.centerString$java_awt_Graphics$S$I(g, cosines ? "Harmonics: Phase Cosines" : "Harmonics: Phases", ((panelHeight * 2.1)|0));
ymult = 0.75 * halfPanel;
midy = (((panelHeight * 5)/2|0));
for (i = -2; i <= 2; i++) {
if (cosines && (i == 1 || i == -1 ) ) continue;
g.setColor$java_awt_Color((i == 0) ? this.gray2 : this.gray1);
g.drawLine$I$I$I$I(0, midy + ((i * (ymult|0))/2|0), this.winSize.width, midy + ((i * (ymult|0))/2|0));
}
if (!cosines) ymult /= 3.141592653589793;
for (i = 1; i != this.maxTerms; i++) {
var t = termWidth * (i - 1) + (termWidth/2|0);
var ph = (cosines) ? phasecoefcosdisp[i] : phasecoefdisp[i];
if (this.magcoef[i] > -7.5E-4  && magcoefdisp[i] < 7.5E-4  ) ph = 0;
var y = midy - ((ph * ymult)|0);
g.setColor$java_awt_Color(i == this.selectedCoef ? (I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).yellow : (I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).white);
g.drawLine$I$I$I$I(t, midy, t, y);
g.fillOval$I$I$I$I(t - (dotSize/2|0), y - (dotSize/2|0), dotSize, dotSize);
}
} else if (this.displayChooser.getSelectedIndex() == 1) {
midy = panelHeight + (panelHeight/2|0);
halfPanel = (panelHeight/2|0);
ymult = 0.75 * halfPanel;
for (i = -1; i <= 1; i++) {
g.setColor$java_awt_Color((i == 0) ? this.gray2 : this.gray1);
g.drawLine$I$I$I$I(0, midy + (i * (ymult|0)), this.winSize.width, midy + (i * (ymult|0)));
}
g.setColor$java_awt_Color(this.gray2);
g.drawLine$I$I$I$I((this.winSize.width/2|0), midy - (ymult|0), (this.winSize.width/2|0), midy + (ymult|0));
ox = -1;
var oy2 = -1;
var subsamples = 4;
for (i = 0; i != this.sampleCount * subsamples + 1; i++) {
var x = (this.winSize.width * i/(subsamples * this.sampleCount)|0);
var dy1 = 0;
var dy2 = 0;
var j;
var stepi = this.step * i / subsamples;
for (j = 1; j != this.maxTerms; j++) {
if (magcoefdisp[j] == 0 ) continue;
var stepij = stepi * j;
var dp = magcoefdisp[j] * 0.5;
var phase = phasecoefdisp[j];
dy1 += dp * java.lang.Math.sin(stepij + phase);
dy2 += dp * java.lang.Math.sin(stepij - phase);
}
var y1 = midy - ((ymult * dy1)|0);
var y2 = midy - ((ymult * dy2)|0);
if (ox != -1) {
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).cyan);
g.drawLine$I$I$I$I(ox, oy, x, y1);
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).green);
g.drawLine$I$I$I$I(ox, oy2, x, y2);
}ox = x;
oy = y1;
oy2 = y2;
}
} else if (this.displayChooser.getSelectedIndex() == 3) {
var sqw = ((this.winSize.width - 25)/3|0);
var sqh = sqw;
var y = panelHeight + ((panelHeight - sqh)/2|0);
dotSize = 5;
for (i = 1; i <= 3; i++) {
g.setColor$java_awt_Color(this.gray2);
var leftX = (sqw + 10) * (i - 1);
var centerX = leftX + (sqw/2|0);
var centerY = y + (sqh/2|0);
g.drawLine$I$I$I$I(leftX, centerY, leftX + sqw, centerY);
g.drawLine$I$I$I$I(centerX, y, centerX, y + sqh);
g.setColor$java_awt_Color(this.gray1);
g.drawOval$I$I$I$I(centerX - (sqw/2|0), centerY - (sqh/2|0), sqw, sqh);
g.setColor$java_awt_Color(i == this.selectedCoef ? (I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).yellow : (I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).white);
g.drawRect$I$I$I$I(leftX, y, sqw, sqh);
var getFx = (this.forceApplied || this.forceCheck.getState() );
var ax = ((phasecoefcosdisp[i] * magcoefdisp[i] * sqw * 0.5 )|0);
var ay = ((java.lang.Math.sin(phasecoefdisp[i]) * magcoefdisp[i] * sqh * 0.5 )|0);
var fx = (getFx) ? (((this.forcebasiscoef[i] * sqw * 0.5 )|0)) : 0;
g.drawLine$I$I$I$I(centerX + fx, centerY, centerX + ax, centerY - ay);
g.fillOval$I$I$I$I(centerX + ax - (dotSize/2|0), centerY - ay - (dotSize/2|0) , dotSize, dotSize);
}
} else if (this.displayChooser.getSelectedIndex() == 4) {
var sqw = ((this.winSize.width - 25)/3|0);
var sqh = ((sqw / 3.141592653589793)|0);
var topY = panelHeight;
var leftX = 0;
for (i = 1; i < this.sampleCount; i++) {
if (!(magcoefdisp[i] > 0.06  || magcoefdisp[i] < -0.06  )) continue;
g.setColor$java_awt_Color(this.gray2);
var centerX = leftX + (sqw/2|0);
var centerY = topY + (sqh/2|0);
g.drawLine$I$I$I$I(leftX, centerY, leftX + sqw, centerY);
g.drawLine$I$I$I$I(centerX, topY, centerX, topY + sqh);
g.setColor$java_awt_Color(i == this.selectedCoef ? (I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).yellow : (I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).white);
g.drawRect$I$I$I$I(leftX, topY, sqw, sqh);
ox = -1;
ymult = sqh * 0.5 * magcoefdisp[i] ;
var j;
for (j = 0; j != this.sampleCount + 1; j++) {
var x = leftX + (sqw * j/this.sampleCount|0);
var dy = this.sinTable[j][i] * phasecoefcosdisp[i];
var y = centerY - ((ymult * dy)|0);
if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
ox = x;
oy = y;
}
leftX = leftX+(sqw + 10);
if (leftX + sqw > this.winSize.width) {
leftX = 0;
topY = topY+(sqh + 10);
if (topY + sqh > panelHeight * 2) break;
}}
}realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
if (!this.stoppedCheck.getState() && !allQuiet ) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'getTermWidth', function () {
var termWidth = (this.winSize.width/this.maxTerms|0);
if (termWidth < 2) termWidth = 2;
var maxTermWidth = (this.winSize.width/30|0);
if (termWidth > maxTermWidth) termWidth = maxTermWidth;
termWidth = termWidth&(-2);
return termWidth;
});

Clazz.newMeth(C$, 'getVelocities', function () {
var k;
var j;
for (j = 0; j != this.sampleCount; j++) {
var dy = 0;
for (k = 0; k != this.sampleCount; k++) dy += this.magcoef[k] * this.sinTable[j][k] * java.lang.Math.sin(this.phasecoef[k]) * this.omega[k] ;

this.funci[j] = -dy;
}
});

Clazz.newMeth(C$, 'setForce', function () {
var oldfreq = this.forceBarValue * this.omega[1] / 20.0;
this.forceBarValue = this.forceBar.getValue();
var newfreq = this.forceBarValue * this.omega[1] / 20.0;
var adj = newfreq - oldfreq;
this.forceTimeZero = this.t - oldfreq * (this.t - this.forceTimeZero) / newfreq;
});

Clazz.newMeth(C$, 'doForce', function () {
var freq = this.forceBar.getValue() * this.omega[1] / 20.0;
this.forceMag = java.lang.Math.cos((this.t - this.forceTimeZero) * freq) * 0.06;
if (this.forceBar.getValue() == 1) this.forceMag *= 2;
this.applyForce$I$D((this.maxTerms/2|0), this.forceMag);
});

Clazz.newMeth(C$, 'doTouch', function () {
var x = (this.sampleCount/2|0);
var lim = 0.1;
var val = this.func[x];
var force = 0;
if (val > lim ) force = -(val - lim);
 else if (val < -lim ) force = -(val + lim);
 else return;
var y;
for (y = 1; y != this.maxTerms; y++) {
var coef = 0;
for (var j = 1; j != this.sampleCount; j++) {
var f = (j <= x) ? force * j / x : force * (this.sampleCount - j) / (this.sampleCount - x);
coef += this.sinTable[j][y] * f;
}
coef *= 2.0 / this.sampleCount;
var ph = this.phasecoefadj[y] + this.omega[y] * this.t;
var a = this.magcoef[y] * java.lang.Math.cos(ph);
var b = this.magcoef[y] * java.lang.Math.sin(ph);
a += coef;
var r = java.lang.Math.sqrt(a * a + b * b);
this.magcoef[y] = r;
var ph2 = java.lang.Math.atan2(b, a);
this.phasecoefadj[y] += ph2 - ph;
}
});

Clazz.newMeth(C$, 'edit$java_awt_event_MouseEvent', function (e) {
p$.resetAudio.apply(this, []);
if (this.selection == 0) return;
var x = e.getX();
var y = e.getY();
switch (this.selection) {
case 2:
this.editMag$I$I(x, y);
break;
case 1:
this.editFunc$I$I(x, y);
break;
}
});

Clazz.newMeth(C$, 'editMag$I$I', function (x, y) {
if (this.selectedCoef == -1) return;
var panelHeight = this.getPanelHeight();
var ymult = 0.6 * panelHeight / 2;
var midy = this.magnitudesY + ((panelHeight/2|0)) + ((ymult|0)/2|0) ;
var coef = -(y - midy) / ymult;
coef = this.unlogcoef$D(coef);
if (coef < -1 ) coef = -1;
if (coef > 1 ) coef = 1;
if (this.magcoef[this.selectedCoef] == coef ) return;
this.magcoef[this.selectedCoef] = coef;
p$.updateSound.apply(this, []);
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'editFunc$I$I', function (x, y) {
if (this.modeChooser.getSelectedIndex() == 0) {
this.editFuncPluck$I$I(x, y);
return;
}if (this.modeChooser.getSelectedIndex() == 997) {
this.editFuncTouch$I$I(x, y);
return;
}if (this.modeChooser.getSelectedIndex() == 999) {
this.editFuncBow$I$I(x, y);
return;
}if (this.modeChooser.getSelectedIndex() == 998) {
this.forceCheck.setState$Z(false);
this.editFuncForce$I$I(x, y);
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

Clazz.newMeth(C$, 'editFuncTouch$I$I', function (xx, yy) {
this.dragging = false;
var panelHeight = this.getPanelHeight();
var midy = (panelHeight/2|0);
var halfPanel = (panelHeight/2|0);
var periodWidth = this.winSize.width;
var ymult = 0.75 * halfPanel;
var x = (xx * this.sampleCount/periodWidth|0);
var val = (midy - yy) / ymult;
if (val > 1 ) val = 1;
if (val < -1 ) val = -1;
if (x < 1 || x >= this.sampleCount ) return;
var y;
for (y = 1; y != this.maxTerms; y++) {
var coef1 = this.sinTable[x][y];
if (coef1 < 0 ) coef1 = -coef1;
var coef = this.magcoef[y] * coef1;
if (coef < 0 ) coef = -coef;
var f = 0.02;
if (coef < f ) continue;
var sign = (this.magcoef[y] < 0 ) ? -1 : 1;
this.magcoef[y] = sign * f / coef1;
}
});

Clazz.newMeth(C$, 'editFuncForce$I$I', function (xx, yy) {
this.dragging = false;
var panelHeight = this.getPanelHeight();
var midy = (panelHeight/2|0);
var halfPanel = (panelHeight/2|0);
var periodWidth = this.winSize.width;
var ymult = 0.75 * halfPanel;
var x = (xx * this.sampleCount/periodWidth|0);
if (x < 1 || x >= this.sampleCount ) return;
var val = (midy - yy) / ymult;
if (val > 1 ) val = 1;
if (val < -1 ) val = -1;
this.soundCheck.setState$Z(false);
this.applyForce$I$D(x, val);
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'applyForce$I$D', function (x, val) {
var y;
for (y = 1; y != this.maxTerms; y++) {
var coef = 0;
for (var j = 1; j != this.sampleCount; j++) {
var f = (j <= x) ? val * j / x : val * (this.sampleCount - j) / (this.sampleCount - x);
coef += this.sinTable[j][y] * f;
}
coef *= 2.0 / this.sampleCount;
var ph = this.phasecoefadj[y] + this.omega[y] * this.t;
var a = this.magcoef[y] * this.phasecoefcos[y];
var b = this.magcoef[y] * java.lang.Math.sin(ph);
if (this.forceApplied) a += this.forcebasiscoef[y];
a -= coef;
var r = java.lang.Math.sqrt(a * a + b * b);
if (r > 2 ) r = 2;
this.magcoef[y] = r;
var ph2 = java.lang.Math.atan2(b, a);
this.phasecoefadj[y] += ph2 - ph;
this.forcebasiscoef[y] = coef;
}
this.forceApplied = true;
});

Clazz.newMeth(C$, 'forceAppliedOff', function () {
if (!this.forceApplied) return;
this.forceApplied = false;
for (var i = 1; i < this.maxTerms; i++) {
var ph = this.phasecoefadj[i] + this.omega[i] * this.t;
var a = this.magcoef[i] * java.lang.Math.cos(ph);
var b = this.magcoef[i] * java.lang.Math.sin(ph);
a += this.forcebasiscoef[i];
var r = java.lang.Math.sqrt(a * a + b * b);
this.magcoef[i] = r;
var ph2 = java.lang.Math.atan2(b, a);
this.phasecoefadj[i] += ph2 - ph;
}
});

Clazz.newMeth(C$, 'editFuncBow$I$I', function (xx, yy) {
this.dragging = false;
this.bowing = true;
this.dragX = xx;
this.dragY = yy;
this.bowCaught = true;
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'doBow', function () {
if (!this.bowCaught) return;
var panelHeight = this.getPanelHeight();
var midy = (panelHeight/2|0);
var halfPanel = (panelHeight/2|0);
var periodWidth = this.winSize.width;
var ymult = 0.75 * halfPanel;
var x = (this.dragX * this.sampleCount/periodWidth|0);
var val = (midy - this.dragY) / ymult;
if (val < 0 ) val = -val;
var bowvel = 0.4;
if (this.bowCaught && this.func[x] > val  ) {
this.bowCaught = false;
this.forceAppliedOff();
return;
}var p = this.func[x] + bowvel;
this.applyForce$I$D(x, p);
});

Clazz.newMeth(C$, 'logcoef$D', function (x) {
if (!this.logCheck.getState()) return x;
if (x == 0 ) return x;
var sign = (x < 0 ) ? -1 : 1;
var lg = Math.log(x * sign);
lg = 1 + lg * 0.1;
if (lg < 0 ) return 0;
return sign * lg;
});

Clazz.newMeth(C$, 'unlogcoef$D', function (x) {
if (!this.logCheck.getState()) return x;
if (x == 0 ) return x;
var sign = (x < 0 ) ? -1 : 1;
var ex = Math.exp((x * sign - 1) * 10);
return ex * sign;
});

Clazz.newMeth(C$, 'editFuncPoint$I$I', function (x, y) {
var panelHeight = this.getPanelHeight();
var midy = (panelHeight/2|0);
var halfPanel = (panelHeight/2|0);
var periodWidth = this.winSize.width;
var ymult = 0.75 * halfPanel;
var lox = (x * this.sampleCount/periodWidth|0);
var hix = (((x + 1) * this.sampleCount - 1)/periodWidth|0);
var val = (midy - y) / ymult;
if (val > 1 ) val = 1;
if (val < -1 ) val = -1;
if (lox < 1) lox = 1;
if (hix >= this.sampleCount) hix = this.sampleCount - 1;
for (; lox <= hix; lox++) {
this.func[lox] = val;
this.funci[lox] = 0;
}
this.func[this.sampleCount] = this.func[0];
this.cv.repaint$J(this.pause);
if (this.soundCheck.getState() == false ) this.transform$Z(false);
});

Clazz.newMeth(C$, 'editFuncPluck$I$I', function (x, y) {
var panelHeight = this.getPanelHeight();
var midy = (panelHeight/2|0);
var halfPanel = (panelHeight/2|0);
var periodWidth = this.winSize.width;
var ymult = 0.75 * halfPanel;
var ax = (x * this.sampleCount/periodWidth|0);
var val = (midy - y) / ymult;
if (val > 1 ) val = 1;
if (val < -1 ) val = -1;
if (ax < 1 || ax >= this.sampleCount ) return;
var i;
for (i = 0; i <= ax; i++) this.func[i] = val * i / ax;

var bx = this.sampleCount - ax;
for (i = ax + 1; i < this.sampleCount; i++) this.func[i] = val * (this.sampleCount - i) / bx;

for (i = 0; i <= this.sampleCount; i++) this.funci[i] = 0;

this.func[this.sampleCount] = this.func[0];
this.cv.repaint$J(this.pause);
if (this.soundCheck.getState() == false ) this.transform$Z(false);
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
if (e.getSource() === this.centerPluckButton ) {
p$.resetAudio.apply(this, []);
this.lastAction = e;
this.doTriangle();
this.cv.repaint();
}if (e.getSource() === this.fundamentalButton ) {
p$.resetAudio.apply(this, []);
this.lastAction = e;
this.doSine();
this.cv.repaint();
}if (e.getSource() === this.clearButton ) {
p$.resetAudio.apply(this, []);
this.lastAction = e;
this.doBlank();
this.cv.repaint();
}if (e.getSource() === this.resonanceButton ) {
this.forceBar.setValue$I(20);
this.setForce();
}});

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
p$.resetAudio.apply(this, []);
System.out.print$S((e.getSource()).getValue() + "\n");
if (e.getSource() === this.dampingBar  || e.getSource() === this.speedBar  ) this.setDamping();
if (e.getSource() === this.loadBar ) {
this.setLoadCount();
p$.updateSound.apply(this, []);
}if (e.getSource() === this.forceBar ) this.setForce();
if (e.getSource() === this.tensionBar ) {
this.setTension();
p$.updateSound.apply(this, []);
}this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'handleEvent$java_awt_Event', function (ev) {
if (ev.id == 201) {
this.applet.destroyFrame();
return true;
}return C$.superclazz.prototype.handleEvent$java_awt_Event.apply(this, [ev]);
});

Clazz.newMeth(C$, 'setTension', function () {
var oldTension = this.tensionBarValue;
this.tensionBarValue = this.tensionBar.getValue();
var mult = java.lang.Math.sqrt(oldTension / this.tensionBarValue);
var roottens = java.lang.Math.sqrt(this.tensionBarValue);
for (var i = 1; i != this.maxTerms; i++) {
this.magcoef[i] *= mult;
var oldomegat = this.omega[i] * this.t;
this.omega[i] = 5 * roottens * java.lang.Math.sin(i * (3.14159265 / (2 * (this.maxTerms + 1)))) ;
var newomegat = this.omega[i] * this.t;
this.phasecoefadj[i] = (this.phasecoefadj[i] + oldomegat - newomegat) % 6.283185307179586;
}
});

Clazz.newMeth(C$, 'setLoadCount', function () {
this.sampleCount = this.maxTerms = this.loadBar.getValue();
this.step = 3.141592653589793 / this.sampleCount;
var x;
var y;
this.sinTable = Clazz.array(Double.TYPE, [this.sampleCount + 1, this.maxTerms]);
for (y = 1; y != this.maxTerms; y++) for (x = 0; x != this.sampleCount + 1; x++) this.sinTable[x][y] = java.lang.Math.sin(this.step * x * y );


this.omega = Clazz.array(Double.TYPE, [this.maxTerms]);
var i;
for (i = 1; i != this.maxTerms; i++) this.omega[i] = java.lang.Math.sin(i * (3.14159265 / (2 * (this.maxTerms + 1))));

var mult = 1 / this.omega[1];
for (i = 1; i != this.maxTerms; i++) this.omega[i] *= mult;

this.setDamping();
});

Clazz.newMeth(C$, 'setDamping', function () {
var damper = java.lang.Math.exp((this.dampingBar.getValue()/40|0) - 8);
if (this.dampingBar.getValue() <= 2) damper = 0;
this.dampcoef = -damper;
});

Clazz.newMeth(C$, 'mouseDragged$java_awt_event_MouseEvent', function (e) {
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseMoved$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) != 0) return;
this.processMouseMotion$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'processMouseMotion$java_awt_event_MouseEvent', function (e) {
var x = e.getX();
var y = e.getY();
this.dragX = x;
this.dragY = y;
var panelHeight = this.getPanelHeight();
var oldCoef = this.selectedCoef;
this.selectedCoef = -1;
this.selection = 0;
if (y < panelHeight) this.selection = 1;
if (y >= this.magnitudesY && y < this.magnitudesY + panelHeight ) {
var termWidth = this.getTermWidth();
this.selectedCoef = (x/termWidth|0) + 1;
if (this.selectedCoef >= this.maxTerms) this.selectedCoef = -1;
if (this.selectedCoef != -1) this.selection = 2;
}if (this.selectedCoef != oldCoef) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'mouseClicked$java_awt_event_MouseEvent', function (e) {
if (e.getClickCount() == 2 && this.selectedCoef != -1 ) {
var i;
for (i = 1; i != this.maxTerms; i++) if (this.selectedCoef != i) this.magcoef[i] = 0;

this.magcoef[this.selectedCoef] = 1;
p$.updateSound.apply(this, []);
this.cv.repaint$J(this.pause);
}});

Clazz.newMeth(C$, 'mouseEntered$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseExited$java_awt_event_MouseEvent', function (e) {
if (!this.dragging && this.selectedCoef != -1 ) {
this.selectedCoef = -1;
this.cv.repaint$J(this.pause);
}});

Clazz.newMeth(C$, 'mousePressed$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
this.processMouseMotion$java_awt_event_MouseEvent(e);
if (this.selection == 1) this.getVelocities();
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
if (this.forceApplied || this.bowing ) {
this.bowing = this.bowCaught = false;
this.forceAppliedOff();
} else if (this.dragging && this.selection == 1 ) this.transform$Z(false);
this.dragging = false;
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
var c = e.getItemSelectable();
if (c === this.soundCheck ) {
if (!this.soundCheck.getState()) {
if (this.audioThread != null ) {
p$.resetAudio.apply(this, []);
this.audioThread = null;
return;
}}if (this.audioThread == null ) {
p$.createAudioThread.apply(this, []);
if (!this.playInitialized) {
this.playInitialized = true;
this.speedBar.setValue$I(150);
this.dampingBar.setValue$I(100);
this.setDamping();
}this.audioThread.start();
if (this.lastAction != null ) this.actionPerformed$java_awt_event_ActionEvent(this.lastAction);
}} else if (c === this.stoppedCheck ) {
this.cv.repaint$J(this.pause);
} else if (c === this.forceCheck ) {
this.forceTimeZero = this.t;
this.cv.repaint$J(this.pause);
this.forceAppliedOff();
this.soundCheck.setState$Z(false);
} else if (c === this.displayChooser ) {
this.cv.repaint$J(this.pause);
}});

Clazz.newMeth(C$, 'createAudioThread', function () {
this.audioByteBuffer = Clazz.array(Byte.TYPE, [32768]);
this.audioThread = Clazz.new_((I$[11]||(I$[11]=Clazz.load('javajs.util.JSAudioThread'))).c$$javajs_util_JSAudioThread_Owner$javax_sound_sampled_AudioFormat$BA,[this, Clazz.new_((I$[12]||(I$[12]=Clazz.load('javax.sound.sampled.AudioFormat'))).c$$F$I$I$Z$Z,[22050, 16, 1, true, true]), this.audioByteBuffer]);
});

Clazz.newMeth(C$, 'updateSound', function () {
this.soundChanged = true;
});

Clazz.newMeth(C$, 'resetAudio', function () {
});

Clazz.newMeth(C$, 'checkSoundStatus', function () {
return (this.soundCheck.getState() && P$.StringWave.ogf != null  );
});

Clazz.newMeth(C$, 'fillAudioBuffer', function () {
var val = this.speedBar.getValue();
var timeadj = Math.exp(val / 20.0) * 6.666666666666667E-5;
var damper = this.dampcoef * timeadj * 1000.0  / 22050;
if (this.playfunc == null  || this.soundChanged ) {
this.soundChanged = false;
if (this.fft == null ) this.fft = Clazz.new_((I$[13]||(I$[13]=Clazz.load('com.falstad.FFT'))).c$$I,[16384]);
this.offset = 0;
this.dampCount = 0;
this.audioThread.getLine().flush();
this.playfunc = Clazz.array(Double.TYPE, [32768]);
var i;
var n = 2 * 3.141592653589793 * 20.0 * Math.sqrt(this.tensionBarValue) ;
n /= this.omega[1];
this.mx = 0.2;
for (i = 1; i != this.maxTerms; i++) {
var dfreq = ((n * this.omega[i])|0);
if (dfreq >= 16384) break;
this.playfunc[dfreq] = this.magcoef[i];
}
this.fft.transform$DA$Z(this.playfunc, true);
for (i = 0; i != 16384; i++) this.mx = Math.max(this.mx, Math.abs(this.playfunc[i * 2]) * Math.exp(damper * i));

this.dampCount = this.offset = 0;
}var mult = 32767 / this.mx;
var bl = 16384;
var i;
for (i = 0; i != bl; i++) {
var v = this.playfunc[(i + this.offset) * 2] * mult * Math.exp(damper * this.dampCount++) ;
var x = ($s$[0] = ((v)|0), $s$[0]);
this.audioByteBuffer[i * 2] = ((((x/256|0))|0)|0);
this.audioByteBuffer[i * 2 + 1] = (((x & 255)|0)|0);
}
this.offset = this.offset+(bl);
if (this.offset == (this.playfunc.length/2|0)) this.offset = 0;
return 32768;
});

Clazz.newMeth(C$, 'audioThreadExiting', function () {
this.audioThread = null;
});
var $s$ = new Int16Array(1);
;
(function(){var C$=Clazz.newClass(P$.StringWaveFrame, "StringWaveCanvas", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, 'a2s.Canvas');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.pg = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$com_falstad_StringWaveFrame', function (p) {
Clazz.super_(C$, this,1);
this.pg = p;
}, 1);

Clazz.newMeth(C$, 'getPreferredSize', function () {
return Clazz.new_((I$[1]||(I$[1]=Clazz.load('java.awt.Dimension'))).c$$I$I,[300, 400]);
});

Clazz.newMeth(C$, 'update$java_awt_Graphics', function (g) {
this.pg.updateStringWave$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'paintComponent$java_awt_Graphics', function (g) {
this.pg.updateStringWave$java_awt_Graphics(g);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.StringWaveFrame, "StringWaveLayout", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, null, 'java.awt.LayoutManager');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'addLayoutComponent$S$java_awt_Component', function (name, c) {
});

Clazz.newMeth(C$, 'removeLayoutComponent$java_awt_Component', function (c) {
});

Clazz.newMeth(C$, 'preferredLayoutSize$java_awt_Container', function (target) {
return Clazz.new_((I$[1]||(I$[1]=Clazz.load('java.awt.Dimension'))).c$$I$I,[500, 500]);
});

Clazz.newMeth(C$, 'minimumLayoutSize$java_awt_Container', function (target) {
return Clazz.new_((I$[1]||(I$[1]=Clazz.load('java.awt.Dimension'))).c$$I$I,[100, 100]);
});

Clazz.newMeth(C$, 'layoutContainer$java_awt_Container', function (target) {
var barwidth = 0;
var i;
for (i = 1; i < target.getComponentCount(); i++) {
var m = target.getComponent$I(i);
if (m.isVisible()) {
var d = m.getPreferredSize();
if (d.width > barwidth) barwidth = d.width;
}}
var insets = target.insets();
var targetw = target.size().width - insets.left - insets.right ;
var cw = targetw - barwidth;
var targeth = target.size().height - (insets.top + insets.bottom);
target.getComponent$I(0).move$I$I(insets.left, insets.top);
target.getComponent$I(0).resize$I$I(cw, targeth);
cw = cw+(insets.left);
var h = insets.top;
for (i = 1; i < target.getComponentCount(); i++) {
var m = target.getComponent$I(i);
if (m.isVisible()) {
var d = m.getPreferredSize();
if (Clazz.instanceOf(m, "a2s.Scrollbar")) d.width = barwidth;
if (Clazz.instanceOf(m, "a2s.Label")) {
h = h+((d.height/5|0));
d.width = barwidth;
}m.move$I$I(cw, h);
m.resize$I$I(d.width, d.height);
h = h+(d.height);
}}
});
})()

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:13
