(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "BarWavesFrame", function(){
Clazz.newInstance(this, arguments,0,C$);
}, 'a2s.Frame', ['java.awt.event.ComponentListener', 'java.awt.event.ActionListener', 'java.awt.event.AdjustmentListener', 'java.awt.event.MouseMotionListener', 'java.awt.event.MouseListener', 'java.awt.event.ItemListener']);
C$.to_ulaw = null;

C$.$clinit$ = function() {Clazz.load(C$, 1);
C$.to_ulaw = Clazz.array(Integer.TYPE, -1, [0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30, 30, 31, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 49, 51, 53, 55, 57, 59, 61, 63, 66, 70, 74, 78, 84, 92, 104, 254, 231, 219, 211, 205, 201, 197, 193, 190, 188, 186, 184, 182, 180, 178, 176, 175, 174, 173, 172, 171, 170, 169, 168, 167, 166, 165, 164, 163, 162, 161, 160, 159, 159, 158, 158, 157, 157, 156, 156, 155, 155, 154, 154, 153, 153, 152, 152, 151, 151, 150, 150, 149, 149, 148, 148, 147, 147, 146, 146, 145, 145, 144, 144, 143, 143, 143, 143, 142, 142, 142, 142, 141, 141, 141, 141, 140, 140, 140, 140, 139, 139, 139, 139, 138, 138, 138, 138, 137, 137, 137, 137, 136, 136, 136, 136, 135, 135, 135, 135, 134, 134, 134, 134, 133, 133, 133, 133, 132, 132, 132, 132, 131, 131, 131, 131, 130, 130, 130, 130, 129, 129, 129, 129, 128, 128, 128, 128]);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.winSize = null;
this.dbimage = null;
this.random = null;
this.maxTerms = 0;
this.modeCount = 0;
this.maxMaxTerms = 0;
this.sampleCount = 0;
this.modeTable = null;
this.modeNorms = null;
this.sineButton = null;
this.blankButton = null;
this.stoppedCheck = null;
this.soundCheck = null;
this.modeChooser = null;
this.setupChooser = null;
this.setupList = null;
this.setup = null;
this.displayChooser = null;
this.dampingBar = null;
this.speedBar = null;
this.loadBar = null;
this.baseFreqBar = null;
this.stiffnessBar = null;
this.magcoef = null;
this.dampcoef = null;
this.phasecoef = null;
this.phasecoefcos = null;
this.phasecoefadj = null;
this.omega = null;
this.step = 0;
this.func = null;
this.funci = null;
this.thickness = null;
this.xpoints = null;
this.ypoints = null;
this.selectedCoef = 0;
this.magnitudesY = 0;
this.selection = 0;
this.dragX = 0;
this.dragY = 0;
this.dragging = false;
this.t = 0;
this.pause = 0;
this.gray1 = null;
this.gray2 = null;
this.main = null;
this.useFrame = false;
this.showControls = false;
this.cv = null;
this.applet = null;
this.shown = false;
this.logep2 = 0;
this.sndmin = 0;
this.sndmax = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.maxTerms = 50;
this.maxMaxTerms = 90;
this.gray1 = Clazz.new_((I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).c$$I$I$I,[76, 76, 76]);
this.gray2 = Clazz.new_((I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).c$$I$I$I,[127, 127, 127]);
this.shown = false;
this.logep2 = 0;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "BarWaves by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'c$$com_falstad_BarWaves', function (a) {
C$.superclazz.c$$S.apply(this, ["Bar Waves Applet"]);
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
this.setupList = Clazz.new_((I$[12]||(I$[12]=Clazz.load('java.util.Vector'))));
var s = Clazz.new_((I$[13]||(I$[13]=Clazz.load(Clazz.load('com.falstad.BarWavesFrame').FreeBarSetup))), [this, null]);
while (s != null ){
this.setupList.addElement$TE(s);
s = s.createNext();
}
this.selectedCoef = -1;
this.main.setLayout$java_awt_LayoutManager(Clazz.new_((I$[14]||(I$[14]=Clazz.load(Clazz.load('com.falstad.BarWavesFrame').BarWavesLayout))), [this, null]));
this.cv = Clazz.new_((I$[15]||(I$[15]=Clazz.load(Clazz.load('com.falstad.BarWavesFrame').BarWavesCanvas))).c$$com_falstad_BarWavesFrame, [this, null, this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
this.main.add$java_awt_Component(this.cv);
this.setupChooser = Clazz.new_((I$[16]||(I$[16]=Clazz.load('a2s.Choice'))));
var i;
for (i = 0; i != this.setupList.size(); i++) this.setupChooser.add$S("Setup: " + (this.setupList.elementAt$I(i)).getName());

this.setup = this.setupList.elementAt$I(0);
this.setupChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.setupChooser);
this.main.add$java_awt_Component(this.sineButton = Clazz.new_((I$[17]||(I$[17]=Clazz.load('a2s.Button'))).c$$S,["Fundamental"]));
this.sineButton.addActionListener$java_awt_event_ActionListener(this);
this.main.add$java_awt_Component(this.blankButton = Clazz.new_((I$[17]||(I$[17]=Clazz.load('a2s.Button'))).c$$S,["Clear"]));
this.blankButton.addActionListener$java_awt_event_ActionListener(this);
this.stoppedCheck = Clazz.new_((I$[18]||(I$[18]=Clazz.load('a2s.Checkbox'))).c$$S,["Stopped"]);
this.stoppedCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.stoppedCheck);
this.soundCheck = Clazz.new_((I$[18]||(I$[18]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Sound", false]);
this.soundCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.soundCheck);
this.modeChooser = Clazz.new_((I$[16]||(I$[16]=Clazz.load('a2s.Choice'))));
this.modeChooser.add$S("Mouse = Shape bar");
this.modeChooser.add$S("Mouse = Apply static force");
this.modeChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.modeChooser);
this.displayChooser = Clazz.new_((I$[16]||(I$[16]=Clazz.load('a2s.Choice'))));
this.displayChooser.add$S("Display Phases");
this.displayChooser.add$S("Display Phase Cosines");
this.displayChooser.add$S("Display Modes");
this.displayChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.displayChooser);
this.main.add$java_awt_Component(Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Label'))).c$$S$I,["Simulation Speed", 0]));
this.main.add$java_awt_Component(this.speedBar = Clazz.new_((I$[20]||(I$[20]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 166, 1, 24, 300]));
this.speedBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Label'))).c$$S$I,["Damping", 0]));
this.main.add$java_awt_Component(this.dampingBar = Clazz.new_((I$[20]||(I$[20]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 10, 1, 0, 400]));
this.dampingBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Label'))).c$$S$I,["Resolution", 0]));
this.main.add$java_awt_Component(this.loadBar = Clazz.new_((I$[20]||(I$[20]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, this.maxTerms, 1, 40, this.maxMaxTerms]));
this.loadBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.setLoadCount();
this.main.add$java_awt_Component(Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Label'))).c$$S$I,["Base Frequency", 0]));
this.main.add$java_awt_Component(this.baseFreqBar = Clazz.new_((I$[20]||(I$[20]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 105, 12, 30, 168]));
this.baseFreqBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.baseFreqBar.disable();
this.main.add$java_awt_Component(Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Label'))).c$$S$I,["String Stiffness", 0]));
this.main.add$java_awt_Component(this.stiffnessBar = Clazz.new_((I$[20]||(I$[20]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 10, 1, 0, 100]));
this.stiffnessBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.stiffnessBar.disable();
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
this.func = Clazz.array(Double.TYPE, [this.maxMaxTerms + 1]);
this.funci = Clazz.array(Double.TYPE, [this.maxMaxTerms + 1]);
this.xpoints = Clazz.array(Integer.TYPE, [4]);
this.ypoints = Clazz.array(Integer.TYPE, [4]);
this.random = Clazz.new_((I$[21]||(I$[21]=Clazz.load('java.util.Random'))));
this.setDamping();
this.reinit();
this.cv.setBackground$java_awt_Color((I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).lightGray);
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
this.doFundamental();
});

Clazz.newMeth(C$, 'triggerShow', function () {
if (!this.shown) this.setVisible$Z(true);
this.shown = true;
});

Clazz.newMeth(C$, 'handleResize', function () {
var d = this.winSize = this.cv.getSize();
System.out.println$O(d);
if (this.winSize.width == 0) return;
this.dbimage = this.cv.createImage$I$I(d.width, d.height);
});

Clazz.newMeth(C$, 'doFundamental', function () {
this.doBlank();
this.magcoef[0] = 1;
if (this.soundCheck.getState()) this.doPlay();
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
for (y = 0; y != this.modeCount; y++) {
var a = 0;
var b = 0;
for (x = 1; x != this.sampleCount; x++) {
a += this.modeTable[x][y] * this.func[x];
b -= this.modeTable[x][y] * this.funci[x];
}
a /= this.modeNorms[y];
b /= this.omega[y] * this.modeNorms[y];
if (a < 1.0E-7  && a > -1.0E-7  ) a = 0;
if (b < 1.0E-7  && b > -1.0E-7  ) b = 0;
if (novel) b = 0;
var r = java.lang.Math.sqrt(a * a + b * b);
this.magcoef[y] = r;
var ph2 = java.lang.Math.atan2(b, a);
this.phasecoefadj[y] = ph2;
this.phasecoef[y] = ph2;
}
});

Clazz.newMeth(C$, 'getPanelHeight', function () {
return (this.winSize.height/3|0);
});

Clazz.newMeth(C$, 'centerString$java_awt_Graphics$S$I', function (g, s, y) {
var fm = g.getFontMetrics();
g.drawString$S$I$I(s, ((this.winSize.width - fm.stringWidth$S(s))/2|0), y);
});

Clazz.newMeth(C$, 'updateBarWaves$java_awt_Graphics', function (realg) {
if (this.winSize == null  || this.winSize.width == 0  || this.dbimage == null  ) return;
var g = this.dbimage.getGraphics();
var allQuiet = true;
if (!this.stoppedCheck.getState()) {
var val = this.speedBar.getValue() - 100;
var tadd = java.lang.Math.exp(val / 20.0) * 0.002;
tadd *= 1 + this.getrand$I(300) * 0.00191171;
this.t += tadd;
}g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(0, 0, this.winSize.width, this.winSize.height);
g.setColor$java_awt_Color(this.cv.getForeground());
var i;
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
var sampStart = (this.setup.leftBoundary() == 1) ? 1 : 0;
var sampEnd = this.sampleCount - ((this.setup.rightBoundary() == 1) ? 1 : 0);
if (this.dragging && this.selection == 1 ) {
g.setColor$java_awt_Color((I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).cyan);
allQuiet = true;
for (i = sampStart; i <= sampEnd; i++) {
var x = (this.winSize.width * i/this.sampleCount|0);
var y = midy - ((ymult * this.func[i])|0);
this.drawBarPiece$java_awt_Graphics$I$I$I$I(g, x, y, i, sampStart);
}
}if (!this.stoppedCheck.getState() && !this.dragging ) {
for (i = 0; i != this.modeCount; i++) this.magcoef[i] *= this.dampcoef[i];

}var magcoefdisp = this.magcoef;
var phasecoefdisp = this.phasecoef;
var phasecoefcosdisp = this.phasecoefcos;
if (!(this.dragging && this.selection == 1 )) {
g.setColor$java_awt_Color((I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).white);
var j;
for (j = 0; j != this.modeCount; j++) {
if (this.magcoef[j] < 1.0E-7  && this.magcoef[j] > -1.0E-7  ) {
this.magcoef[j] = this.phasecoef[j] = this.phasecoefadj[j] = 0;
continue;
}allQuiet = false;
this.phasecoef[j] = (this.omega[j] * this.t + this.phasecoefadj[j]) % 6.283185307179586;
if (this.phasecoef[j] > 3.141592653589793 ) this.phasecoef[j] -= 6.283185307179586;
 else if (this.phasecoef[j] < -3.141592653589793 ) this.phasecoef[j] += 6.283185307179586;
this.phasecoefcos[j] = java.lang.Math.cos(this.phasecoef[j]);
}
for (i = sampStart; i <= sampEnd; i++) {
var x = (this.winSize.width * i/this.sampleCount|0);
var dy = 0;
for (j = 0; j != this.modeCount; j++) dy += magcoefdisp[j] * this.modeTable[i][j] * phasecoefcosdisp[j] ;

this.func[i] = dy;
var y = midy - ((ymult * dy)|0);
this.drawBarPiece$java_awt_Graphics$I$I$I$I(g, x, y, i, sampStart);
}
if (this.setup.getThickness() == 0) {
if (this.setup.leftBoundary() == 1) this.drawPin$java_awt_Graphics$I$I$D(g, 1, midy, ymult);
if (this.setup.rightBoundary() == 1) this.drawPin$java_awt_Graphics$I$I$D(g, this.sampleCount - 1, midy, ymult);
}}if (this.selectedCoef != -1 && !this.dragging  && (magcoefdisp[this.selectedCoef] > 0.04  || magcoefdisp[this.selectedCoef] < -0.04  ) ) {
g.setColor$java_awt_Color((I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).yellow);
ymult *= magcoefdisp[this.selectedCoef];
for (i = sampStart; i <= sampEnd; i++) {
var x = (this.winSize.width * i/this.sampleCount|0);
var dy = this.modeTable[i][this.selectedCoef] * phasecoefcosdisp[this.selectedCoef];
var y = midy - ((ymult * dy)|0);
this.drawBarPiece$java_awt_Graphics$I$I$I$I(g, x, y, i, sampStart);
}
}if (this.selectedCoef != -1) {
var f = this.getFreq$I(this.selectedCoef);
g.setColor$java_awt_Color((I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).yellow);
this.centerString$java_awt_Graphics$S$I(g, f + " Hz", panelHeight);
} else if (this.soundCheck.getState()) {
var f = this.getFreq$I(0);
g.setColor$java_awt_Color((I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).white);
this.centerString$java_awt_Graphics$S$I(g, "Fundamental = " + f + " Hz" , panelHeight);
}var termWidth = this.getTermWidth();
ymult = 0.6 * halfPanel;
g.setColor$java_awt_Color((I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).white);
if (this.displayChooser.getSelectedIndex() == 0 || this.displayChooser.getSelectedIndex() == 1 ) this.magnitudesY = panelHeight;
 else this.magnitudesY = panelHeight * 2;
midy = this.magnitudesY + ((panelHeight/2|0)) + ((ymult|0)/2|0) ;
g.setColor$java_awt_Color(this.gray2);
g.drawLine$I$I$I$I(0, midy, this.winSize.width, midy);
g.setColor$java_awt_Color(this.gray1);
g.drawLine$I$I$I$I(0, midy - (ymult|0), this.winSize.width, midy - (ymult|0));
g.drawLine$I$I$I$I(0, midy + (ymult|0), this.winSize.width, midy + (ymult|0));
g.drawLine$I$I$I$I(0, midy - ((ymult|0)/4|0), this.winSize.width, midy - ((ymult|0)/4|0));
g.drawLine$I$I$I$I(0, midy + ((ymult|0)/4|0), this.winSize.width, midy + ((ymult|0)/4|0));
var dotSize = termWidth - 3;
if (dotSize < 3) dotSize = 3;
for (i = 0; i != this.modeCount; i++) {
var t = termWidth * i + (termWidth/2|0);
var y = midy - ((this.logcoef$D(magcoefdisp[i]) * ymult)|0);
g.setColor$java_awt_Color(i == this.selectedCoef ? (I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).yellow : (I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).white);
g.drawLine$I$I$I$I(t, midy, t, y);
g.fillOval$I$I$I$I(t - (dotSize/2|0), y - (dotSize/2|0), dotSize, dotSize);
}
if (this.displayChooser.getSelectedIndex() == 0 || this.displayChooser.getSelectedIndex() == 1 ) {
g.setColor$java_awt_Color((I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).white);
var cosines = this.displayChooser.getSelectedIndex() == 1;
ymult = 0.75 * halfPanel;
midy = (((panelHeight * 5)/2|0));
for (i = -2; i <= 2; i++) {
if (cosines && (i == 1 || i == -1 ) ) continue;
g.setColor$java_awt_Color((i == 0) ? this.gray2 : this.gray1);
g.drawLine$I$I$I$I(0, midy + ((i * (ymult|0))/2|0), this.winSize.width, midy + ((i * (ymult|0))/2|0));
}
if (!cosines) ymult /= 3.141592653589793;
for (i = 0; i != this.modeCount; i++) {
var t = termWidth * i + (termWidth/2|0);
var ph = (cosines) ? phasecoefcosdisp[i] : phasecoefdisp[i];
if (this.magcoef[i] > -7.5E-4  && magcoefdisp[i] < 7.5E-4  ) ph = 0;
var y = midy - ((ph * ymult)|0);
g.setColor$java_awt_Color(i == this.selectedCoef ? (I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).yellow : (I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).white);
g.drawLine$I$I$I$I(t, midy, t, y);
g.fillOval$I$I$I$I(t - (dotSize/2|0), y - (dotSize/2|0), dotSize, dotSize);
}
} else if (this.displayChooser.getSelectedIndex() == 2) {
var sqw = ((this.winSize.width - 25)/3|0);
var sqh = ((sqw / 3.141592653589793)|0);
var topY = panelHeight;
var leftX = 0;
var ox;
var oy = -1;
for (i = 0; i != this.modeCount; i++) {
if (!(magcoefdisp[i] > 0.06  || magcoefdisp[i] < -0.06  )) continue;
g.setColor$java_awt_Color(this.gray2);
var centerX = leftX + (sqw/2|0);
var centerY = topY + (sqh/2|0);
g.drawLine$I$I$I$I(leftX, centerY, leftX + sqw, centerY);
g.drawLine$I$I$I$I(centerX, topY, centerX, topY + sqh);
g.setColor$java_awt_Color(i == this.selectedCoef ? (I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).yellow : (I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).white);
g.drawRect$I$I$I$I(leftX, topY, sqw, sqh);
ox = -1;
ymult = sqh * 0.5 * magcoefdisp[i] ;
var j;
for (j = sampStart; j <= sampEnd; j++) {
var x = leftX + (sqw * j/this.sampleCount|0);
var dy = this.modeTable[j][i] * phasecoefcosdisp[i];
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

Clazz.newMeth(C$, 'drawPin$java_awt_Graphics$I$I$D', function (g, pos, midy, ymult) {
var x = (this.winSize.width * pos/this.sampleCount|0);
g.setColor$java_awt_Color(this.gray2);
g.drawLine$I$I$I$I(x, ((midy - ymult)|0), x, ((midy + ymult)|0));
g.setColor$java_awt_Color((I$[11]||(I$[11]=Clazz.load('java.awt.Color'))).white);
g.fillOval$I$I$I$I(x - 2, midy - ((this.func[pos] * ymult)|0) - 2 , 5, 5);
});

Clazz.newMeth(C$, 'getTermWidth', function () {
var termWidth = (this.winSize.width/this.modeCount|0);
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
for (k = 0; k != this.modeCount; k++) dy += this.magcoef[k] * this.modeTable[j][k] * java.lang.Math.sin(this.phasecoef[k]) * this.omega[k] ;

this.funci[j] = -dy;
}
});

Clazz.newMeth(C$, 'drawBarPiece$java_awt_Graphics$I$I$I$I', function (g, x, y, i, sampStart) {
var thick = this.setup.getThickness();
this.xpoints[0] = this.xpoints[3];
this.ypoints[0] = this.ypoints[3];
this.xpoints[1] = this.xpoints[2];
this.ypoints[1] = this.ypoints[2];
this.xpoints[2] = x;
this.ypoints[2] = y - thick;
this.xpoints[3] = x;
this.ypoints[3] = y + thick;
if (i != sampStart) {
if (thick == 0) g.drawLine$I$I$I$I(this.xpoints[0], this.ypoints[0], this.xpoints[2], this.ypoints[2]);
 else g.fillPolygon$IA$IA$I(this.xpoints, this.ypoints, 4);
}});

Clazz.newMeth(C$, 'edit$java_awt_event_MouseEvent', function (e) {
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
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'editFunc$I$I', function (x, y) {
if (this.modeChooser.getSelectedIndex() == 1) {
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

Clazz.newMeth(C$, 'logcoef$D', function (x) {
if (x >= 0.25  || x <= -0.25  ) return x;
x *= 4;
var ep2 = 0.003;
var sign = (x < 0 ) ? -1 : 1;
x *= sign;
if (x < ep2 ) return 0;
if (this.logep2 == 0 ) this.logep2 = -java.lang.Math.log(2 * ep2);
return 0.25 * sign * (java.lang.Math.log(x + ep2) + this.logep2)  / this.logep2;
});

Clazz.newMeth(C$, 'unlogcoef$D', function (x) {
if (x >= 0.25  || x <= -0.25  ) return x;
var ep2 = 0.003;
var sign = (x < 0 ) ? -1 : 1;
return 0.25 * sign * (java.lang.Math.exp(4 * x * sign * this.logep2  - this.logep2) - ep2) ;
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
if (this.modeChooser.getSelectedIndex() == 2) {
this.thickness[lox] = (midy < y) ? (y - midy) * 2 : (midy - y) * 2;
if (this.thickness[lox] == 0) this.thickness[lox] = 1;
} else {
this.func[lox] = val;
this.funci[lox] = 0;
}}
this.func[this.sampleCount] = this.func[0];
this.cv.repaint$J(this.pause);
if (this.soundCheck.getState() == false ) this.transform$Z(false);
});

Clazz.newMeth(C$, 'editFuncForce$I$I', function (x, y) {
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
var q = Clazz.array(Double.TYPE, [this.modeCount]);
var i;
var j;
for (i = 0; i != this.modeCount; i++) q[i] = this.modeTable[ax][i] / (this.omega[i] * this.omega[i] * this.modeNorms[i] );

for (i = 0; i != this.sampleCount; i++) {
var dy = 0;
for (j = 0; j != this.modeCount; j++) dy += q[j] * this.modeTable[i][j];

this.func[i] = dy;
}
var mult = val / this.func[ax];
for (i = 0; i <= this.sampleCount; i++) {
this.func[i] *= mult;
this.funci[i] = 0;
}
this.cv.repaint$J(this.pause);
if (this.soundCheck.getState() == false ) this.transform$Z(true);
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
if (e.getSource() === this.sineButton ) {
this.doFundamental();
this.cv.repaint();
}if (e.getSource() === this.blankButton ) {
this.doBlank();
this.cv.repaint();
}});

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
if (e.getSource() === this.dampingBar  || e.getSource() === this.speedBar  ) this.setDamping();
if (e.getSource() === this.loadBar ) this.setLoadCount();
if (e.getSource() === this.stiffnessBar ) this.genModes();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'handleEvent$java_awt_Event', function (ev) {
if (ev.id == 201) {
if (this.applet == null ) this.dispose();
 else this.applet.destroyFrame();
return true;
}return C$.superclazz.prototype.handleEvent$java_awt_Event.apply(this, [ev]);
});

Clazz.newMeth(C$, 'setLoadCount', function () {
this.setup = this.setupList.elementAt$I(this.setupChooser.getSelectedIndex());
this.sampleCount = this.maxTerms = this.loadBar.getValue();
this.step = 3.141592653589793 / this.sampleCount;
var x;
var y;
this.thickness = Clazz.array(Integer.TYPE, [this.sampleCount + 1]);
var i;
for (i = 0; i <= this.sampleCount; i++) this.thickness[i] = 5;

this.genModes();
this.setDamping();
});

Clazz.newMeth(C$, 'setDamping', function () {
var i;
this.dampcoef = Clazz.array(Double.TYPE, [this.modeCount]);
var tadd = java.lang.Math.exp((this.speedBar.getValue() - 100) / 20.0) * 0.002;
for (i = 0; i != this.modeCount; i++) {
var damper = java.lang.Math.exp((this.dampingBar.getValue()/40|0) - 3) * 30;
if (this.dampingBar.getValue() <= 2) damper = 0;
var damp2 = this.omega[i] * java.lang.Math.sqrt(java.lang.Math.sqrt(1 + damper * damper / (this.omega[i] * this.omega[i])) - 1);
this.dampcoef[i] = java.lang.Math.exp(-damp2 * tadd * 0.004 );
}
});

Clazz.newMeth(C$, 'mouseDragged$java_awt_event_MouseEvent', function (e) {
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseMoved$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) != 0) return;
this.handleMouseMotion$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'handleMouseMotion$java_awt_event_MouseEvent', function (e) {
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
this.selectedCoef = (x/termWidth|0);
if (this.selectedCoef >= this.modeCount) this.selectedCoef = -1;
if (this.selectedCoef != -1) this.selection = 2;
}if (this.selectedCoef != oldCoef) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'mouseClicked$java_awt_event_MouseEvent', function (e) {
if (e.getClickCount() == 2 && this.selectedCoef != -1 ) {
var i;
for (i = 0; i != this.modeCount; i++) if (this.selectedCoef != i) this.magcoef[i] = 0;

this.magcoef[this.selectedCoef] = 1;
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
this.handleMouseMotion$java_awt_event_MouseEvent(e);
if ((e.getModifiers() & 16) == 0) return;
if (this.selection == 1) this.getVelocities();
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
if (this.dragging && this.selection == 1 ) {
if (this.modeChooser.getSelectedIndex() == 2) this.genModes();
 else {
this.transform$Z(false);
if (this.soundCheck.getState()) this.doPlay();
}}if (this.dragging && this.selection == 2  && this.soundCheck.getState() ) this.doPlay();
this.dragging = false;
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
if (e.getItemSelectable() === this.stoppedCheck ) {
this.cv.repaint$J(this.pause);
return;
}if (e.getItemSelectable() === this.soundCheck ) {
if (this.soundCheck.getState()) {
this.speedBar.setValue$I(250);
this.dampingBar.setValue$I(170);
this.baseFreqBar.enable();
this.setDamping();
this.doPlay();
} else this.baseFreqBar.disable();
}if (e.getItemSelectable() === this.displayChooser ) this.cv.repaint$J(this.pause);
if (e.getItemSelectable() === this.setupChooser ) {
this.setLoadCount();
if (Clazz.instanceOf(this.setup, "com.falstad.BarWavesFrame.StiffStringSetup")) this.stiffnessBar.enable();
 else this.stiffnessBar.disable();
}});

Clazz.newMeth(C$, 'dodiff$DAA$I$I$I$D', function (matrix, r, i, n, mult) {
if (i < 1 && this.setup.leftBoundary() == 0 ) return;
if (i > this.sampleCount - 1 && this.setup.rightBoundary() == 0 ) return;
if (n == 2 && !(Clazz.instanceOf(this.setup, "com.falstad.BarWavesFrame.StringSetup")) ) {
if (i <= 1 && this.setup.leftBoundary() == 1 ) return;
if (i >= this.sampleCount - 1 && this.setup.rightBoundary() == 1 ) return;
}if (n > 0) {
this.dodiff$DAA$I$I$I$D(matrix, r, i - 1, n - 2, -mult);
this.dodiff$DAA$I$I$I$D(matrix, r, i + 1, n - 2, -mult);
this.dodiff$DAA$I$I$I$D(matrix, r, i, n - 2, mult * 2);
return;
}if (i >= 1 && i <= this.sampleCount - 1 ) matrix[r][i] += mult;
});

Clazz.newMeth(C$, 'genModes', function () {
var n = this.sampleCount - 1;
var matrix = Clazz.array(Double.TYPE, [n + 1, n + 1]);
var d = Clazz.array(Double.TYPE, [n + 1]);
var e = Clazz.array(Double.TYPE, [n + 1]);
var i;
var j;
for (i = 1; i <= n; i++) this.setup.doMatrixStep$DAA$I$I(matrix, i, n);

if (Clazz.instanceOf(this.setup, "com.falstad.BarWavesFrame.StringSetup")) {
if (this.setup.leftBoundary() == 1) matrix[1][1]--;
if (this.setup.rightBoundary() == 1) matrix[n][n]--;
}this.tred2$DAA$I$DA$DA(matrix, n, d, e);
this.tqli$DA$DA$I$DAA(d, e, n, matrix);
this.modeCount = this.sampleCount - 1;
this.omega = Clazz.array(Double.TYPE, [this.modeCount]);
var omegamap = Clazz.array(Integer.TYPE, [this.sampleCount]);
for (i = j = 0; i != n; i++) {
if (d[i + 1] < 1.0E-8 ) {
this.modeCount--;
continue;
}this.omega[j] = java.lang.Math.sqrt(d[i + 1]);
omegamap[j] = i;
j++;
}
var si;
var sj;
for (si = 1; si < this.modeCount; si++) {
var v = this.omega[si];
var vm = omegamap[si];
sj = si;
while (this.omega[sj - 1] > v ){
this.omega[sj] = this.omega[sj - 1];
omegamap[sj] = omegamap[sj - 1];
sj--;
if (sj <= 0) break;
}
this.omega[sj] = v;
omegamap[sj] = vm;
}
this.modeTable = Clazz.array(Double.TYPE, [this.sampleCount + 1, this.modeCount]);
this.modeNorms = Clazz.array(Double.TYPE, [this.modeCount]);
for (i = 0; i != this.modeCount; i++) {
var om = omegamap[i] + 1;
var maxf = 0;
for (j = 0; j != this.sampleCount; j++) {
this.modeTable[j][i] = matrix[j][om];
if (this.modeTable[j][i] > maxf ) maxf = this.modeTable[j][i];
if (-this.modeTable[j][i] > maxf ) maxf = -this.modeTable[j][i];
}
this.modeNorms[i] = 1 / (maxf * maxf);
for (j = 0; j != this.sampleCount; j++) this.modeTable[j][i] /= maxf;

}
var mult = 1 / this.omega[0];
for (i = 0; i != this.modeCount; i++) this.omega[i] *= mult;

});

Clazz.newMeth(C$, 'tred2$DAA$I$DA$DA', function (a, n, d, e) {
var l;
var k;
var j;
var i;
var scale;
var hh;
var h;
var g;
var f;
for (i = n; i >= 2; i--) {
l = i - 1;
h = scale = 0.0;
if (l > 1) {
for (k = 1; k <= l; k++) scale += java.lang.Math.abs(a[i][k]);

if (scale == 0.0 ) e[i] = a[i][l];
 else {
for (k = 1; k <= l; k++) {
a[i][k] /= scale;
h += a[i][k] * a[i][k];
}
f = a[i][l];
g = (f >= 0.0  ? -java.lang.Math.sqrt(h) : java.lang.Math.sqrt(h));
e[i] = scale * g;
h -= f * g;
a[i][l] = f - g;
f = 0.0;
for (j = 1; j <= l; j++) {
a[j][i] = a[i][j] / h;
g = 0.0;
for (k = 1; k <= j; k++) g += a[j][k] * a[i][k];

for (k = j + 1; k <= l; k++) g += a[k][j] * a[i][k];

e[j] = g / h;
f += e[j] * a[i][j];
}
hh = f / (h + h);
for (j = 1; j <= l; j++) {
f = a[i][j];
e[j] = g = e[j] - hh * f;
for (k = 1; k <= j; k++) a[j][k] -= (f * e[k] + g * a[i][k]);

}
}} else e[i] = a[i][l];
d[i] = h;
}
d[1] = 0.0;
e[1] = 0.0;
for (i = 1; i <= n; i++) {
l = i - 1;
if (d[i] != 0 ) {
for (j = 1; j <= l; j++) {
g = 0.0;
for (k = 1; k <= l; k++) g += a[i][k] * a[k][j];

for (k = 1; k <= l; k++) a[k][j] -= g * a[k][i];

}
}d[i] = a[i][i];
a[i][i] = 1.0;
for (j = 1; j <= l; j++) a[j][i] = a[i][j] = 0.0;

}
});

Clazz.newMeth(C$, 'tqli$DA$DA$I$DAA', function (d, e, n, z) {
var m;
var l;
var iter;
var i;
var k;
var s;
var r;
var p;
var g;
var f;
var dd;
var c;
var b;
for (i = 2; i <= n; i++) e[i - 1] = e[i];

e[n] = 0.0;
for (l = 1; l <= n; l++) {
iter = 0;
do {
for (m = l; m <= n - 1; m++) {
dd = java.lang.Math.abs(d[m]) + java.lang.Math.abs(d[m + 1]);
if ((java.lang.Math.abs(e[m]) + dd) == dd ) break;
}
if (m != l) {
if (iter++ == 30) System.out.print$S("Too many iterations in tqli\u000a");
g = (d[l + 1] - d[l]) / (2.0 * e[l]);
r = this.pythag$D$D(g, 1.0);
g = d[m] - d[l] + e[l] / (g + this.SIGN$D$D(r, g));
s = c = 1.0;
p = 0.0;
for (i = m - 1; i >= l; i--) {
f = s * e[i];
b = c * e[i];
e[i + 1] = (r = this.pythag$D$D(f, g));
if (r == 0.0 ) {
d[i + 1] -= p;
e[m] = 0.0;
break;
}s = f / r;
c = g / r;
g = d[i + 1] - p;
r = (d[i] - g) * s + 2.0 * c * b ;
d[i + 1] = g + (p = s * r);
g = c * r - b;
for (k = 1; k <= n; k++) {
f = z[k][i + 1];
z[k][i + 1] = s * z[k][i] + c * f;
z[k][i] = c * z[k][i] - s * f;
}
}
if (r == 0.0  && i >= l ) continue;
d[l] -= p;
e[l] = g;
e[m] = 0.0;
}} while (m != l);
}
});

Clazz.newMeth(C$, 'SIGN$D$D', function (a, b) {
return b >= 0  ? java.lang.Math.abs(a) : -java.lang.Math.abs(a);
});

Clazz.newMeth(C$, 'SQR$D', function (a) {
return a * a;
});

Clazz.newMeth(C$, 'pythag$D$D', function (a, b) {
var absa;
var absb;
absa = java.lang.Math.abs(a);
absb = java.lang.Math.abs(b);
if (absa > absb ) return absa * java.lang.Math.sqrt(1.0 + this.SQR$D(absb / absa));
 else return (absb == 0.0  ? 0.0 : absb * java.lang.Math.sqrt(1.0 + this.SQR$D(absa / absb)));
});

Clazz.newMeth(C$, 'getFreq$I', function (n) {
var stepsize = java.lang.Math.log(2) / 12;
var freq = java.lang.Math.exp(this.baseFreqBar.getValue() * stepsize);
return ((freq * this.omega[n])|0);
});

Clazz.newMeth(C$, 'doPlay', function () {
var rate = 8000;
var sampcount = 8000;
var b = Clazz.array(Byte.TYPE, [8000]);
var stepsize = java.lang.Math.log(2) / 12;
var freq = java.lang.Math.exp(this.baseFreqBar.getValue() * stepsize);
var n = 2 * 3.141592653589793 * freq  / 8000;
n /= this.omega[0];
var maxomega = 3.141592653589793 / n;
var m = this.modeCount;
while (m > 0 && this.omega[m - 1] > maxomega  )m--;

if (m == 0) return;
var m0 = 0;
var minomega = 125.66370614359172 / (8000 * n);
while (m0 < m && this.omega[m0] < minomega  )m0++;

if (m0 == m) return;
var failed;
var i;
var sampWindow = 200;
var offset = 0;
var lastscale = 1000;
var mag = Clazz.array(Double.TYPE, [this.modeCount]);
for (i = 0; i != this.modeCount; i++) mag[i] = this.magcoef[i];

do {
failed = false;
var mn = (-this.sndmin > this.sndmax ) ? -this.sndmin : this.sndmax;
if (mn < 0.02 ) mn = 0.02;
var scale = 126 / mn;
if (scale > lastscale ) scale = lastscale;
this.sndmin = this.sndmax = 0;
for (i = 0; i != sampWindow; i++) {
var dy = 0;
var j;
var ii = i + offset;
for (j = m0; j != m; j++) dy += mag[j] * java.lang.Math.sin(ii * n * this.omega[j] ) * scale ;

if (dy < this.sndmin ) this.sndmin = dy;
if (dy > this.sndmax ) this.sndmax = dy;
if (dy < -127  || dy > 127  ) failed = true;
 else {
b[ii] = ((C$.to_ulaw[128 + (dy|0)]|0)|0);
if (ii < 100) System.out.println$S(ii + " " + b[ii] );
}}
this.sndmin /= scale;
this.sndmax /= scale;
if (failed) continue;
offset = offset+(sampWindow);
for (i = 0; i != this.modeCount; i++) mag[i] *= this.dampcoef[i];

if (offset >= 8000) break;
} while (true);
Clazz.new_((I$[22]||(I$[22]=Clazz.load('javajs.util.JSAudioThread')))).playULawData$BA(b);
this.cv.repaint();
});
;
(function(){var C$=Clazz.newClass(P$.BarWavesFrame, "Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getThickness', function () {
return 3;
});

Clazz.newMeth(C$, 'doMatrixStep$DAA$I$I', function (matrix, i, n) {
this.b$['com.falstad.BarWavesFrame'].dodiff$DAA$I$I$I$D(matrix, i, i, 4, 1);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.BarWavesFrame, "FreeBarSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.BarWavesFrame','com.falstad.BarWavesFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "bar, free";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[1]||(I$[1]=Clazz.load(Clazz.load('com.falstad.BarWavesFrame').HingedBarSetup))), [this, null]);
});

Clazz.newMeth(C$, 'leftBoundary', function () {
return 1;
});

Clazz.newMeth(C$, 'rightBoundary', function () {
return 1;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.BarWavesFrame, "HingedBarSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.BarWavesFrame','com.falstad.BarWavesFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "bar, hinged";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[2]||(I$[2]=Clazz.load(Clazz.load('com.falstad.BarWavesFrame').ClampedBarSetup))), [this, null]);
});

Clazz.newMeth(C$, 'leftBoundary', function () {
return 0;
});

Clazz.newMeth(C$, 'rightBoundary', function () {
return 0;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.BarWavesFrame, "ClampedBarSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.BarWavesFrame','com.falstad.BarWavesFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "bar, clamped";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[3]||(I$[3]=Clazz.load(Clazz.load('com.falstad.BarWavesFrame').ClampedFreeBarSetup))), [this, null]);
});

Clazz.newMeth(C$, 'leftBoundary', function () {
return 2;
});

Clazz.newMeth(C$, 'rightBoundary', function () {
return 2;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.BarWavesFrame, "ClampedFreeBarSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.BarWavesFrame','com.falstad.BarWavesFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "bar, clamped/free";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[4]||(I$[4]=Clazz.load(Clazz.load('com.falstad.BarWavesFrame').HingedClampedBarSetup))), [this, null]);
});

Clazz.newMeth(C$, 'leftBoundary', function () {
return 2;
});

Clazz.newMeth(C$, 'rightBoundary', function () {
return 1;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.BarWavesFrame, "HingedClampedBarSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.BarWavesFrame','com.falstad.BarWavesFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "bar, hinged/clamped";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[5]||(I$[5]=Clazz.load(Clazz.load('com.falstad.BarWavesFrame').StringSetup))), [this, null]);
});

Clazz.newMeth(C$, 'leftBoundary', function () {
return 0;
});

Clazz.newMeth(C$, 'rightBoundary', function () {
return 2;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.BarWavesFrame, "StringSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.BarWavesFrame','com.falstad.BarWavesFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "string, pinned";
});

Clazz.newMeth(C$, 'doMatrixStep$DAA$I$I', function (matrix, i, n) {
this.b$['com.falstad.BarWavesFrame'].dodiff$DAA$I$I$I$D(matrix, i, i, 2, 1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[6]||(I$[6]=Clazz.load(Clazz.load('com.falstad.BarWavesFrame').String1FreeSetup))), [this, null]);
});

Clazz.newMeth(C$, 'leftBoundary', function () {
return 0;
});

Clazz.newMeth(C$, 'rightBoundary', function () {
return 0;
});

Clazz.newMeth(C$, 'getThickness', function () {
return 0;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.BarWavesFrame, "String1FreeSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.BarWavesFrame','com.falstad.BarWavesFrame.StringSetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "string, pinned/free";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[7]||(I$[7]=Clazz.load(Clazz.load('com.falstad.BarWavesFrame').String2FreeSetup))), [this, null]);
});

Clazz.newMeth(C$, 'rightBoundary', function () {
return 1;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.BarWavesFrame, "String2FreeSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.BarWavesFrame','com.falstad.BarWavesFrame.String1FreeSetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "string, free/free";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[8]||(I$[8]=Clazz.load(Clazz.load('com.falstad.BarWavesFrame').StiffStringSetup))), [this, null]);
});

Clazz.newMeth(C$, 'leftBoundary', function () {
return 1;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.BarWavesFrame, "StiffStringSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.BarWavesFrame','com.falstad.BarWavesFrame.StringSetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "stiff string, pinned";
});

Clazz.newMeth(C$, 'doMatrixStep$DAA$I$I', function (matrix, i, n) {
this.b$['com.falstad.BarWavesFrame'].dodiff$DAA$I$I$I$D(matrix, i, i, 2, 1);
var stiff = this.b$['com.falstad.BarWavesFrame'].stiffnessBar.getValue() * 0.1;
this.b$['com.falstad.BarWavesFrame'].dodiff$DAA$I$I$I$D(matrix, i, i, 4, stiff);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[9]||(I$[9]=Clazz.load(Clazz.load('com.falstad.BarWavesFrame').StiffStringClampedSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.BarWavesFrame, "StiffStringClampedSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.BarWavesFrame','com.falstad.BarWavesFrame.StiffStringSetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "stiff string, clamped";
});

Clazz.newMeth(C$, 'createNext', function () {
return null;
});

Clazz.newMeth(C$, 'leftBoundary', function () {
return 2;
});

Clazz.newMeth(C$, 'rightBoundary', function () {
return 2;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.BarWavesFrame, "BarWavesCanvas", function(){
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

Clazz.newMeth(C$, 'c$$com_falstad_BarWavesFrame', function (p) {
Clazz.super_(C$, this,1);
this.pg = p;
}, 1);

Clazz.newMeth(C$, 'getPreferredSize', function () {
return Clazz.new_((I$[10]||(I$[10]=Clazz.load('java.awt.Dimension'))).c$$I$I,[300, 400]);
});

Clazz.newMeth(C$, 'update$java_awt_Graphics', function (g) {
this.pg.updateBarWaves$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'paintComponent$java_awt_Graphics', function (g) {
this.pg.updateBarWaves$java_awt_Graphics(g);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.BarWavesFrame, "BarWavesLayout", function(){
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
return Clazz.new_((I$[10]||(I$[10]=Clazz.load('java.awt.Dimension'))).c$$I$I,[500, 500]);
});

Clazz.newMeth(C$, 'minimumLayoutSize$java_awt_Container', function (target) {
return Clazz.new_((I$[10]||(I$[10]=Clazz.load('java.awt.Dimension'))).c$$I$I,[100, 100]);
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
//Created 2017-12-17 19:28:00
