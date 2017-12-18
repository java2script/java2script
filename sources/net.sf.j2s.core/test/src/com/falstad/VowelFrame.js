(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "VowelFrame", function(){
Clazz.newInstance(this, arguments,0,C$);
}, 'a2s.Frame', ['java.awt.event.ComponentListener', 'java.awt.event.ActionListener', 'java.awt.event.AdjustmentListener', 'java.awt.event.MouseMotionListener', 'java.awt.event.MouseListener', 'java.awt.event.ItemListener']);
C$.WINDOW_KAISER = 0;
var p$=C$.prototype;

C$.$clinit$ = function() {Clazz.load(C$, 1);
C$.WINDOW_KAISER = 4;
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.winSize = null;
this.dbimage = null;
this.respView = null;
this.impulseView = null;
this.phaseView = null;
this.pipeView = null;
this.stepView = null;
this.spectrumView = null;
this.waveformView = null;
this.poleInfoView = null;
this.polesView = null;
this.random = null;
this.maxSampleCount = 0;
this.sampleCountR = 0;
this.sampleCountTh = 0;
this.modeCountR = 0;
this.modeCountTh = 0;
this.maxDispRModes = 0;
this.maxDispThModes = 0;
this.soundCheck = null;
this.displayCheck = null;
this.compressCheck = null;
this.attenuationCheck = null;
this.envelopeCheck = null;
this.exportButton = null;
this.impDialog = null;
this.freqCheckItem = null;
this.phaseCheckItem = null;
this.spectrumCheckItem = null;
this.impulseCheckItem = null;
this.stepCheckItem = null;
this.waveformCheckItem = null;
this.logFreqCheckItem = null;
this.linRespCheckItem = null;
this.allWaveformCheckItem = null;
this.ferrisCheckItem = null;
this.exitItem = null;
this.filterChooser = null;
this.selection = 0;
this.SELECT_RESPONSE = 0;
this.SELECT_SPECTRUM = 0;
this.SELECT_PIPE = 0;
this.filterSelection = 0;
this.inputChooser = null;
this.windowChooser = null;
this.rateChooser = null;
this.auxBars = null;
this.auxLabels = null;
this.inputLabel = null;
this.inputBar = null;
this.kaiserLabel = null;
this.kaiserBar = null;
this.editingFunc = false;
this.dragStop = false;
this.inputW = 0;
this.step = 0;
this.waveGain = 0;
this.outputGain = 0;
this.sampleRate = 0;
this.xpoints = null;
this.ypoints = null;
this.dragX = 0;
this.dragY = 0;
this.dragStartX = 0;
this.dragStartY = 0;
this.mouseX = 0;
this.mouseY = 0;
this.selectedPole = 0;
this.selectedZero = 0;
this.lastPoleCount = 0;
this.lastZeroCount = 0;
this.dragSet = false;
this.dragClear = false;
this.dragging = false;
this.unstable = false;
this.pipeRadius = null;
this.pipeLen = 0;
this.t = 0;
this.pause = 0;
this.curFilter = null;
this.filterType = null;
this.spectrumBuf = null;
this.spectrumFFT = null;
this.wformInfo = null;
this.phaseColors = null;
this.filterChanged = false;
this.main = null;
this.useFrame = false;
this.showControls = false;
this.cv = null;
this.applet = null;
this.showFormat = null;
this.java2 = false;
this.mp3List = null;
this.mp3Error = null;
this.shown = false;
this.lastTime = 0;
this.minlog = 0;
this.logrange = 0;
this.s0 = null;
this.s1 = null;
this.det = null;
this.rs0 = null;
this.rs1 = null;
this.cy = null;
this.uresp = null;
this.audioThread = null;
this.shutdownRequested = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.maxSampleCount = 70;
this.maxDispRModes = 5;
this.maxDispThModes = 5;
this.SELECT_RESPONSE = 1;
this.SELECT_SPECTRUM = 2;
this.SELECT_PIPE = 3;
this.waveGain = 1.52587890625E-5;
this.outputGain = 1;
this.xpoints = Clazz.array(Integer.TYPE, [4]);
this.ypoints = Clazz.array(Integer.TYPE, [4]);
this.lastPoleCount = 2;
this.lastZeroCount = 2;
this.java2 = false;
this.shown = false;
this.s0 = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))));
this.s1 = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))));
this.det = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))));
this.rs0 = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))));
this.rs1 = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))));
this.cy = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))));
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "Vowel Series by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'c$$com_falstad_Vowel', function (a) {
C$.superclazz.c$$S.apply(this, ["Vowel Applet v1.0"]);
C$.$init$.apply(this);
this.applet = a;
this.useFrame = true;
this.showControls = true;
}, 1);

Clazz.newMeth(C$, 'init', function () {
this.mp3List = Clazz.array(java.lang.String, [20]);
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
var j;
var pc8 = 50;
this.phaseColors = Clazz.array((I$[13]||(I$[13]=Clazz.load(Clazz.load('com.falstad.VowelFrame').PhaseColor))), [400]);
var i;
for (i = 0; i != 8; i++) for (j = 0; j != pc8; j++) {
var ang = Math.atan(j / pc8);
this.phaseColors[i * pc8 + j] = this.genPhaseColor$I$D(i, ang);
}

this.pipeRadius = Clazz.array(Double.TYPE, [200]);
for (i = 0; i != 10; i++) this.pipeRadius[i] = 2.828427;

for (; i != 20; i++) this.pipeRadius[i] = 1;

this.main.setLayout$java_awt_LayoutManager(Clazz.new_((I$[14]||(I$[14]=Clazz.load(Clazz.load('com.falstad.VowelFrame').VowelLayout))), [this, null]));
this.cv = Clazz.new_((I$[15]||(I$[15]=Clazz.load(Clazz.load('com.falstad.VowelFrame').VowelCanvas))).c$$com_falstad_VowelFrame, [this, null, this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
this.main.add$java_awt_Component(this.cv);
var mb = Clazz.new_((I$[16]||(I$[16]=Clazz.load('a2s.MenuBar'))));
var m = Clazz.new_((I$[17]||(I$[17]=Clazz.load('a2s.Menu'))).c$$S,["File"]);
mb.add$javax_swing_JMenu(m);
m.add$javax_swing_JMenuItem(this.exitItem = this.getMenuItem$S("Exit"));
m = Clazz.new_((I$[17]||(I$[17]=Clazz.load('a2s.Menu'))).c$$S,["View"]);
mb.add$javax_swing_JMenu(m);
m.add$javax_swing_JMenuItem(this.freqCheckItem = this.getCheckItem$S$Z("Frequency Response", true));
this.phaseCheckItem = this.getCheckItem$S$Z("Phase Response", false);
m.add$javax_swing_JMenuItem(this.spectrumCheckItem = this.getCheckItem$S$Z("Spectrum", true));
m.add$javax_swing_JMenuItem(this.waveformCheckItem = this.getCheckItem$S$Z("Waveform", false));
m.add$javax_swing_JMenuItem(this.impulseCheckItem = this.getCheckItem$S$Z("Impulse Response", false));
m.add$javax_swing_JMenuItem(this.stepCheckItem = this.getCheckItem$S$Z("Step Response", false));
m.addSeparator();
m.add$javax_swing_JMenuItem(this.logFreqCheckItem = this.getCheckItem$S$Z("Log Frequency Scale", false));
m.add$javax_swing_JMenuItem(this.allWaveformCheckItem = this.getCheckItem$S$Z("Show Entire Waveform", false));
m.add$javax_swing_JMenuItem(this.ferrisCheckItem = this.getCheckItem$S$Z("Ferris Plot", false));
m.add$javax_swing_JMenuItem(this.linRespCheckItem = this.getCheckItem$S$Z("Linear Response Scale", false));
this.setMenuBar$a2s_MenuBar(mb);
this.soundCheck = Clazz.new_((I$[18]||(I$[18]=Clazz.load('a2s.Checkbox'))).c$$S,["Sound On"]);
if (this.java2) this.soundCheck.setState$Z(false);
 else this.soundCheck.disable();
this.soundCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.soundCheck);
this.displayCheck = Clazz.new_((I$[18]||(I$[18]=Clazz.load('a2s.Checkbox'))).c$$S,["Stop Display"]);
this.displayCheck.addItemListener$java_awt_event_ItemListener(this);
this.compressCheck = Clazz.new_((I$[18]||(I$[18]=Clazz.load('a2s.Checkbox'))).c$$S,["Compress"]);
this.compressCheck.setState$Z(true);
this.compressCheck.addItemListener$java_awt_event_ItemListener(this);
this.attenuationCheck = Clazz.new_((I$[18]||(I$[18]=Clazz.load('a2s.Checkbox'))).c$$S,["Attenuation"]);
this.attenuationCheck.setState$Z(true);
this.attenuationCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.attenuationCheck);
this.envelopeCheck = Clazz.new_((I$[18]||(I$[18]=Clazz.load('a2s.Checkbox'))).c$$S,["Envelope"]);
this.envelopeCheck.setState$Z(true);
this.envelopeCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.envelopeCheck);
this.exportButton = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Button'))).c$$S,["Import/Export"]);
this.main.add$java_awt_Component(this.exportButton);
this.exportButton.addActionListener$java_awt_event_ActionListener(this);
this.main.add$java_awt_Component(this.inputChooser = Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Choice')))));
this.inputChooser.add$S("Input = Noise");
this.inputChooser.add$S("Input = Vocal");
this.inputChooser.add$S("Input = Sawtooth");
this.inputChooser.add$S("Input = Periodic Noise");
this.inputChooser.add$S("Input = Triangle Wave");
this.inputChooser.add$S("Input = Square Wave");
this.inputChooser.add$S("Input = Sine Wave");
this.inputChooser.add$S("Input = Sweep");
this.inputChooser.add$S("Input = Impulses");
for (i = 0; this.mp3List[i] != null ; i++) this.inputChooser.add$S("Input = " + this.mp3List[i]);

this.inputChooser.select$I(1);
this.inputChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.filterChooser = Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Choice')))));
this.filterChooser.add$S("Filter = ah");
this.filterChooser.add$S("Filter = oh");
this.filterChooser.add$S("Filter = oo");
this.filterChooser.add$S("Filter = ee");
this.filterChooser.add$S("Filter = eh");
this.filterChooser.add$S("Filter = barred-I (Russian vowel)");
this.filterChooser.add$S("Filter = ah (simple)");
this.filterChooser.add$S("Filter = ee (simple)");
this.filterChooser.add$S("Filter = a as in bad (simple)");
this.filterChooser.add$S("Filter = ih (simple)");
this.filterChooser.add$S("Filter = oo (simple)");
this.filterChooser.add$S("Filter = French u (simple)");
this.filterChooser.add$S("Filter = open tube");
this.filterChooser.add$S("Filter = custom");
this.filterChooser.add$S("Filter = none");
this.filterChooser.addItemListener$java_awt_event_ItemListener(this);
this.filterSelection = -1;
this.windowChooser = Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Choice'))));
this.windowChooser.add$S("Window = Rectangular");
this.windowChooser.add$S("Window = Hamming");
this.windowChooser.add$S("Window = Hann");
this.windowChooser.add$S("Window = Blackman");
this.windowChooser.add$S("Window = Kaiser");
this.windowChooser.add$S("Window = Bartlett");
this.windowChooser.add$S("Window = Welch");
this.windowChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.rateChooser = Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Choice')))));
this.rateChooser.add$S("Sampling Rate = 8000");
this.rateChooser.add$S("Sampling Rate = 11025");
this.rateChooser.add$S("Sampling Rate = 16000");
this.rateChooser.add$S("Sampling Rate = 22050");
this.rateChooser.select$I(1);
this.sampleRate = 11025;
this.rateChooser.addItemListener$java_awt_event_ItemListener(this);
this.auxLabels = Clazz.array((I$[20]||(I$[20]=Clazz.load('a2s.Label'))), [5]);
this.auxBars = Clazz.array((I$[21]||(I$[21]=Clazz.load('a2s.Scrollbar'))), [5]);
for (i = 0; i != 5; i++) {
this.main.add$java_awt_Component(this.auxLabels[i] = Clazz.new_((I$[20]||(I$[20]=Clazz.load('a2s.Label'))).c$$S$I,["", 0]));
this.main.add$java_awt_Component(this.auxBars[i] = Clazz.new_((I$[21]||(I$[21]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 25, 1, 1, 999]));
this.auxBars[i].addAdjustmentListener$java_awt_event_AdjustmentListener(this);
}
this.main.add$java_awt_Component(this.inputLabel = Clazz.new_((I$[20]||(I$[20]=Clazz.load('a2s.Label'))).c$$S$I,["Input Frequency", 0]));
this.main.add$java_awt_Component(this.inputBar = Clazz.new_((I$[21]||(I$[21]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 400, 1, 1, 999]));
this.inputBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(this.kaiserLabel = Clazz.new_((I$[20]||(I$[20]=Clazz.load('a2s.Label'))).c$$S$I,["Kaiser Parameter", 0]));
this.main.add$java_awt_Component(this.kaiserBar = Clazz.new_((I$[21]||(I$[21]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 500, 1, 1, 999]));
this.kaiserBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.random = Clazz.new_((I$[22]||(I$[22]=Clazz.load('java.util.Random'))));
this.setInputLabel();
this.reinit();
this.cv.setBackground$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).lightGray);
this.showFormat = (I$[23]||(I$[23]=Clazz.load('java.text.NumberFormat'))).getInstance();
this.showFormat.setMaximumFractionDigits$I(2);
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
this.setupFilter();
this.setInputW();
});

Clazz.newMeth(C$, 'getMenuItem$S', function (s) {
var mi = Clazz.new_((I$[24]||(I$[24]=Clazz.load('a2s.MenuItem'))).c$$S,[s]);
mi.addActionListener$java_awt_event_ActionListener(this);
return mi;
});

Clazz.newMeth(C$, 'getCheckItem$S$Z', function (s, b) {
var mi = Clazz.new_((I$[25]||(I$[25]=Clazz.load('a2s.CheckboxMenuItem'))).c$$S,[s]);
mi.setState$Z(b);
mi.addItemListener$java_awt_event_ItemListener(this);
return mi;
});

Clazz.newMeth(C$, 'getPower2$I', function (n) {
var o = 2;
while (o < n)o = o*(2);

return o;
});

Clazz.newMeth(C$, 'genPhaseColor$I$D', function (sec, ang) {
ang += sec * 3.141592653589793 / 4;
ang *= 0.954929658551372;
var hsec = (ang|0);
var a2 = ang % 1;
var a3 = 1.0 - a2;
var c = null;
switch (hsec) {
case 6:
case 0:
c = Clazz.new_((I$[13]||(I$[13]=Clazz.load(Clazz.load('com.falstad.VowelFrame').PhaseColor))).c$$D$D$D, [this, null, 1, a2, 0]);
break;
case 1:
c = Clazz.new_((I$[13]||(I$[13]=Clazz.load(Clazz.load('com.falstad.VowelFrame').PhaseColor))).c$$D$D$D, [this, null, a3, 1, 0]);
break;
case 2:
c = Clazz.new_((I$[13]||(I$[13]=Clazz.load(Clazz.load('com.falstad.VowelFrame').PhaseColor))).c$$D$D$D, [this, null, 0, 1, a2]);
break;
case 3:
c = Clazz.new_((I$[13]||(I$[13]=Clazz.load(Clazz.load('com.falstad.VowelFrame').PhaseColor))).c$$D$D$D, [this, null, 0, a3, 1]);
break;
case 4:
c = Clazz.new_((I$[13]||(I$[13]=Clazz.load(Clazz.load('com.falstad.VowelFrame').PhaseColor))).c$$D$D$D, [this, null, a2, 0, 1]);
break;
case 5:
c = Clazz.new_((I$[13]||(I$[13]=Clazz.load(Clazz.load('com.falstad.VowelFrame').PhaseColor))).c$$D$D$D, [this, null, 1, 0, a3]);
break;
}
return c;
});

Clazz.newMeth(C$, 'triggerShow', function () {
if (!this.shown) this.setVisible$Z(true);
this.shown = true;
});

Clazz.newMeth(C$, 'handleResize', function () {
var d = this.winSize = this.cv.getSize();
if (this.winSize.width == 0) return;
var ct = 1;
this.respView = this.spectrumView = this.impulseView = this.phaseView = this.stepView = this.waveformView = this.pipeView = null;
if (this.freqCheckItem.getState()) ct++;
if (this.phaseCheckItem.getState()) ct++;
if (this.spectrumCheckItem.getState()) ct++;
if (this.waveformCheckItem.getState()) ct++;
if (this.impulseCheckItem.getState()) ct++;
if (this.stepCheckItem.getState()) ct++;
ct++;
var dh3 = (d.height/ct|0);
this.dbimage = this.createImage$I$I(d.width, d.height);
var bd = 15;
var i = 0;
if (this.freqCheckItem.getState()) this.respView = this.getView$I$I(i++, ct);
if (this.phaseCheckItem.getState()) this.phaseView = this.getView$I$I(i++, ct);
if (this.spectrumCheckItem.getState()) this.spectrumView = this.getView$I$I(i++, ct);
if (this.waveformCheckItem.getState()) this.waveformView = this.getView$I$I(i++, ct);
if (this.impulseCheckItem.getState()) this.impulseView = this.getView$I$I(i++, ct);
if (this.stepCheckItem.getState()) this.stepView = this.getView$I$I(i++, ct);
this.pipeView = this.getView$I$I(i++, ct);
this.poleInfoView = this.getView$I$I(i++, ct);
if (this.poleInfoView.height > 200) this.poleInfoView.height = 200;
this.polesView = Clazz.new_((I$[26]||(I$[26]=Clazz.load(Clazz.load('com.falstad.VowelFrame').View))).c$$I$I$I$I, [this, null, this.poleInfoView.x, this.poleInfoView.y, this.poleInfoView.height, this.poleInfoView.height]);
});

Clazz.newMeth(C$, 'getView$I$I', function (i, ct) {
var dh3 = (this.winSize.height/ct|0);
var bd = 5;
var tpad = 15;
return Clazz.new_((I$[26]||(I$[26]=Clazz.load(Clazz.load('com.falstad.VowelFrame').View))).c$$I$I$I$I, [this, null, bd, bd + i * dh3 + tpad, this.winSize.width - bd * 2, dh3 - bd * 2 - tpad]);
});

Clazz.newMeth(C$, 'centerString$java_awt_Graphics$S$I', function (g, s, y) {
var fm = g.getFontMetrics();
g.drawString$S$I$I(s, ((this.winSize.width - fm.stringWidth$S(s))/2|0), y);
});

Clazz.newMeth(C$, 'updateVowel$java_awt_Graphics', function (realg) {
if (this.dbimage == null ) return;
var g = this.dbimage.getGraphics();
if (this.winSize == null  || this.winSize.width == 0  || this.dbimage == null  ) return;
var sysTime = System.currentTimeMillis();
if (this.lastTime == 0) this.lastTime = sysTime;
this.t += (sysTime - this.lastTime) * 0.008;
this.lastTime = sysTime;
if (this.curFilter == null ) {
var f = this.filterType.genFilter();
this.curFilter = f;
if (this.audioThread != null ) this.audioThread.setFilter$com_falstad_VowelFrame_Filter(f);
this.filterChanged = true;
this.unstable = false;
}if (this.audioThread == null  && !this.unstable  && this.soundCheck.getState() ) {
p$.createAudioThread.apply(this, []);
this.audioThread.start();
}if (this.displayCheck.getState()) return;
g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(0, 0, this.winSize.width, this.winSize.height);
g.setColor$java_awt_Color(this.cv.getForeground());
var minf = 40.0 / this.sampleRate;
this.minlog = Math.log(minf);
this.logrange = Math.log(0.5) - this.minlog;
var cc = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))));
var i;
if (this.respView != null ) {
this.respView.drawLabel$java_awt_Graphics$S(g, "Frequency Response");
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).darkGray);
g.fillRect$I$I$I$I(this.respView.x, this.respView.y, this.respView.width, this.respView.height);
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).black);
var ym = 0.069;
for (i = 0; ; i = i+(2)) {
var q = ym * i;
if (q > 1 ) break;
var y = this.respView.y + ((q * this.respView.height)|0);
g.drawLine$I$I$I$I(this.respView.x, y, this.respView.right, y);
}
for (i = 1; ; i++) {
var ll = this.logrange - i * Math.log(2);
var x = 0;
if (this.logFreqCheckItem.getState()) x = ((ll * this.respView.width / this.logrange)|0);
 else x = (this.respView.width/(1 << i)|0);
if (x <= 0) break;
x = x+(this.respView.x);
g.drawLine$I$I$I$I(x, this.respView.y, x, this.respView.bottom);
}
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).white);
var ox = -1;
var oy = -1;
var ox2 = -1;
var oy2 = -1;
for (i = 0; i != this.respView.width; i++) {
var w = 0;
if (!this.logFreqCheckItem.getState()) w = 3.141592653589793 * i / (this.respView.width);
 else {
var f = Math.exp(this.minlog + i * this.logrange / this.respView.width);
w = 2 * 3.141592653589793 * f ;
}this.filterType.getResponse$D$com_falstad_Complex(w, cc);
var bw = cc.magSquared();
var val = -ym * Math.log(bw * bw) / 2.302585092994046;
if (this.linRespCheckItem.getState()) val = 1 - cc.mag;
var x = i + this.respView.x;
if (val > 1 ) {
if (ox != -1) g.drawLine$I$I$I$I(ox, oy, ox, this.respView.bottom);
ox = -1;
} else {
var y = this.respView.y + ((this.respView.height * val)|0);
if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
 else if (x > this.respView.x) g.drawLine$I$I$I$I(x, this.respView.bottom, x, y);
ox = x;
oy = y;
}}
}g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).white);
if (this.phaseView != null ) {
this.phaseView.drawLabel$java_awt_Graphics$S(g, "Phase Response");
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).darkGray);
g.fillRect$I$I$I$I(this.phaseView.x, this.phaseView.y, this.phaseView.width, this.phaseView.height);
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).black);
for (i = 0; i < 5; i++) {
var q = i * 0.25;
var y = this.phaseView.y + ((q * this.phaseView.height)|0);
g.drawLine$I$I$I$I(this.phaseView.x, y, this.phaseView.right, y);
}
for (i = 1; ; i++) {
var ll = this.logrange - i * Math.log(2);
var x = 0;
if (this.logFreqCheckItem.getState()) x = ((ll * this.phaseView.width / this.logrange)|0);
 else x = (this.phaseView.width/(1 << i)|0);
if (x <= 0) break;
x = x+(this.phaseView.x);
g.drawLine$I$I$I$I(x, this.phaseView.y, x, this.phaseView.bottom);
}
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).white);
var ox = -1;
var oy = -1;
for (i = 0; i != this.phaseView.width; i++) {
var w = 0;
if (!this.logFreqCheckItem.getState()) w = 3.141592653589793 * i / (this.phaseView.width);
 else {
var f = Math.exp(this.minlog + i * this.logrange / this.phaseView.width);
w = 2 * 3.141592653589793 * f ;
}this.filterType.getResponse$D$com_falstad_Complex(w, cc);
var val = 0.5 - cc.phase / 6.283185307179586;
var y = this.phaseView.y + ((this.phaseView.height * val)|0);
var x = i + this.phaseView.x;
if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
 else if (x > this.phaseView.x) g.drawLine$I$I$I$I(x, this.phaseView.bottom, x, y);
ox = x;
oy = y;
}
}var pr = this.pipeRadius;
var prlen = pr.length;
var plen = this.pipeLen;
var pv = this.pipeView;
if (pv != null  && Clazz.instanceOf(this.filterType, "com.falstad.VowelFrame.PipeFIRFilter") ) {
pv.drawLabel$java_awt_Graphics$S(g, "Cross Section");
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).darkGray);
g.fillRect$I$I$I$I(pv.x, pv.y, pv.width, pv.height);
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).black);
pv.mult = 0.14285714285714285;
for (i = 0; i != 10; i++) {
var y1 = pv.y + pv.height * (0.5 - i * pv.mult);
if (y1 < pv.y ) break;
g.drawLine$I$I$I$I(0, (y1|0), this.winSize.width - 1, (y1|0));
var y2 = pv.y + pv.height * (0.5 + i * pv.mult);
g.drawLine$I$I$I$I(0, (y2|0), this.winSize.width - 1, (y2|0));
}
for (i = 0; i * 0.01 <= plen ; i++) {
var xi = pv.x + ((pv.width * i * 0.01  / plen)|0);
g.drawLine$I$I$I$I(xi, pv.y, xi, pv.y + pv.height);
}
var f = 0;
var k = 0;
var wave = null;
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).white);
if ((this.respView != null  && this.respView.contains$I$I(this.mouseX, this.mouseY) ) || (this.spectrumView != null  && this.spectrumView.contains$I$I(this.mouseX, this.mouseY) ) ) {
f = this.getFreqFromX$I$com_falstad_VowelFrame_View(this.mouseX, this.respView);
f *= this.sampleRate;
wave = Clazz.array((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))), [prlen + 1]);
this.calcWave$D$com_falstad_ComplexA(f, wave);
k = 2 * 3.141592653589793 * f  / 35396.0;
k *= plen * 100 / prlen;
}for (i = 0; i != prlen; i++) {
if (f > 0 ) {
wave[i].rotate$D(this.t);
var wv = wave[i].re / 2.0;
var c = ((128 + 127 * wv)|0);
if (c < 0) c = 0;
if (c > 255) c = 255;
g.setColor$java_awt_Color(Clazz.new_((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).c$$I$I$I,[c, c, c]));
}var x1 = (pv.width * i/prlen|0) + pv.x;
var x2 = (pv.width * (i + 1)/prlen|0) + pv.x;
var y1 = pv.y + ((pv.height * (0.5 - pr[i] * pv.mult))|0);
var y2 = pv.y + ((pv.height * (0.5 + pr[i] * pv.mult))|0);
g.fillRect$I$I$I$I(x1, y1, x2 - x1, y2 - y1);
}
}var polect = this.filterType.getPoleCount();
var zeroct = this.filterType.getZeroCount();
var infoX = 10;
var ph = 0;
var pw = 0;
var cx = 0;
var cy = 0;
if (this.poleInfoView != null  && (polect > 0 || zeroct > 0  || this.ferrisCheckItem.getState() ) ) {
ph = (this.polesView.height/2|0);
pw = ph;
cx = this.polesView.x + pw;
cy = this.polesView.y + ph;
infoX = cx + pw + 10 ;
if (!this.ferrisCheckItem.getState()) {
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).white);
var fm = g.getFontMetrics();
var s = "Poles/Zeros";
g.drawString$S$I$I(s, cx - (fm.stringWidth$S(s)/2|0), this.polesView.y - 5);
g.drawOval$I$I$I$I(cx - pw, cy - ph, pw * 2, ph * 2);
g.drawLine$I$I$I$I(cx, cy - ph, cx, cy + ph);
g.drawLine$I$I$I$I(cx - ph, cy, cx + ph, cy);
var c1 = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))));
for (i = 0; i != polect; i++) {
this.filterType.getPole$I$com_falstad_Complex(i, c1);
g.setColor$java_awt_Color(i == this.selectedPole ? (I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).yellow : (I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).white);
var c1x = cx + ((pw * c1.re)|0);
var c1y = cy - ((ph * c1.im)|0);
g.drawLine$I$I$I$I(c1x - 3, c1y - 3, c1x + 3, c1y + 3);
g.drawLine$I$I$I$I(c1x - 3, c1y + 3, c1x + 3, c1y - 3);
}
for (i = 0; i != zeroct; i++) {
this.filterType.getZero$I$com_falstad_Complex(i, c1);
g.setColor$java_awt_Color(i == this.selectedZero ? (I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).yellow : (I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).white);
var c1x = cx + ((pw * c1.re)|0);
var c1y = cy - ((ph * c1.im)|0);
g.drawOval$I$I$I$I(c1x - 3, c1y - 3, 6, 6);
}
}}if (this.poleInfoView != null ) {
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).white);
var info = Clazz.array(java.lang.String, [10]);
this.filterType.getInfo$SA(info);
for (i = 0; i != 10; i++) if (info[i] == null ) break;

if (this.wformInfo.needsFrequency()) info[i++] = "Input Freq = " + ((this.inputW * this.sampleRate / 6.283185307179586)|0) + " Hz" ;
for (i = 0; i != 10; i++) {
if (info[i] == null ) break;
g.drawString$S$I$I(info[i], infoX, this.poleInfoView.y + 5 + 20 * i );
}
if ((this.respView != null  && this.respView.contains$I$I(this.mouseX, this.mouseY) ) || (this.spectrumView != null  && this.spectrumView.contains$I$I(this.mouseX, this.mouseY) ) ) {
var f = this.getFreqFromX$I$com_falstad_VowelFrame_View(this.mouseX, this.respView);
if (f >= 0 ) {
var fw = 2 * 3.141592653589793 * f ;
f *= this.sampleRate;
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).yellow);
var s = "f = " + (f|0);
if (this.respView.contains$I$I(this.mouseX, this.mouseY)) {
this.filterType.getResponse$D$com_falstad_Complex(fw, cc);
var bw = cc.magSquared();
bw = Math.log(bw * bw) / 4.605170185988092;
s += " Hz, " + this.showFormat.format$D(10 * bw) + " dB, \u03bb = " ;
s += this.showFormat.format$D(35396.0 / f) + " cm";
}g.drawString$S$I$I(s, infoX, this.poleInfoView.y + 5 + 20 * i );
if (ph > 0) {
var x = cx + ((pw * Math.cos(fw))|0);
var y = cy - ((pw * Math.sin(fw))|0);
if (this.ferrisCheckItem.getState()) {
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).black);
g.fillOval$I$I$I$I(x - 3, y - 3, 7, 7);
}g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).yellow);
g.fillOval$I$I$I$I(x - 2, y - 2, 5, 5);
}}}}if (this.impulseView != null ) {
this.impulseView.drawLabel$java_awt_Graphics$S(g, "Impulse Response");
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).darkGray);
g.fillRect$I$I$I$I(this.impulseView.x, this.impulseView.y, this.impulseView.width, this.impulseView.height);
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).black);
g.drawLine$I$I$I$I(this.impulseView.x, this.impulseView.y + (this.impulseView.height/2|0), this.impulseView.x + this.impulseView.width - 1, this.impulseView.y + (this.impulseView.height/2|0));
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).white);
var offset = this.curFilter.getImpulseOffset();
var impBuf = this.curFilter.getImpulseResponse$I(offset);
var len = this.curFilter.getImpulseLen$I$DA(offset, impBuf);
var ox = -1;
var oy = -1;
var mult = 0.5 / this.max$DA(impBuf);
var flen = (len < 50) ? 50 : len;
if (len < flen && flen < impBuf.length - offset ) len = flen;
for (i = 0; i != len; i++) {
var k = offset + i;
var q = impBuf[k] * mult;
var y = this.impulseView.y + ((this.impulseView.height * (0.5 - q))|0);
var x = this.impulseView.x + (this.impulseView.width * i/flen|0);
if (len < 100) {
g.drawLine$I$I$I$I(x, this.impulseView.y + (this.impulseView.height/2|0), x, y);
g.fillOval$I$I$I$I(x - 2, y - 2, 5, 5);
} else {
if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
ox = x;
oy = y;
}}
}if (this.stepView != null ) {
this.stepView.drawLabel$java_awt_Graphics$S(g, "Step Response");
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).darkGray);
g.fillRect$I$I$I$I(this.stepView.x, this.stepView.y, this.stepView.width, this.stepView.height);
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).black);
g.drawLine$I$I$I$I(this.stepView.x, this.stepView.y + (this.stepView.height/2|0), this.stepView.x + this.stepView.width - 1, this.stepView.y + (this.stepView.height/2|0));
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).white);
var offset = this.curFilter.getStepOffset();
var impBuf = this.curFilter.getStepResponse$I(offset);
var len = this.curFilter.getStepLen$I$DA(offset, impBuf);
var ox = -1;
var oy = -1;
var mult = 0.5 / this.max$DA(impBuf);
var flen = (len < 50) ? 50 : len;
if (len < flen && flen < impBuf.length - offset ) len = flen;
for (i = 0; i != len; i++) {
var k = offset + i;
var q = impBuf[k] * mult;
var y = this.stepView.y + ((this.stepView.height * (0.5 - q))|0);
var x = this.stepView.x + (this.stepView.width * i/flen|0);
if (len < 100) {
g.drawLine$I$I$I$I(x, this.stepView.y + (this.stepView.height/2|0), x, y);
g.fillOval$I$I$I$I(x - 2, y - 2, 5, 5);
} else {
if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
ox = x;
oy = y;
}}
}if (this.audioThread != null ) {
var splen = this.audioThread.spectrumLen;
if (this.spectrumBuf == null  || this.spectrumBuf.length != splen * 2 ) this.spectrumBuf = Clazz.array(Double.TYPE, [splen * 2]);
var off = this.audioThread.spectrumOffset;
var i2;
var mask = this.audioThread.fbufmask;
for (i = i2 = 0; i != splen; i++, i2 = i2+(2)) {
var o = mask & (off + i);
this.spectrumBuf[i2] = this.audioThread.fbufLo[o] + this.audioThread.fbufRo[o];
this.spectrumBuf[i2 + 1] = 0;
}
} else this.spectrumBuf = null;
if (this.waveformView != null  && this.spectrumBuf != null  ) {
this.waveformView.drawLabel$java_awt_Graphics$S(g, "Waveform");
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).darkGray);
g.fillRect$I$I$I$I(this.waveformView.x, this.waveformView.y, this.waveformView.width, this.waveformView.height);
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).black);
g.drawLine$I$I$I$I(this.waveformView.x, this.waveformView.y + (this.waveformView.height/2|0), this.waveformView.x + this.waveformView.width - 1, this.waveformView.y + (this.waveformView.height/2|0));
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).white);
var ox = -1;
var oy = -1;
if (this.waveGain < 0.1 ) this.waveGain = 0.1;
var max = 0;
for (i = 0; i != this.spectrumBuf.length; i = i+(2)) {
if (this.spectrumBuf[i] > max ) max = this.spectrumBuf[i];
if (this.spectrumBuf[i] < -max ) max = -this.spectrumBuf[i];
}
if (this.waveGain > 1 / max ) this.waveGain = 1 / max;
 else if (this.waveGain * 1.05 < 1 / max ) this.waveGain *= 1.05;
var mult = 0.5 * this.waveGain;
var nb = this.waveformView.width;
if (nb > this.spectrumBuf.length || this.allWaveformCheckItem.getState() ) nb = this.spectrumBuf.length;
for (i = 0; i < nb; i = i+(2)) {
var bf = 0.5 - this.spectrumBuf[i] * mult;
var ya = ((this.waveformView.height * bf)|0);
if (ya > this.waveformView.height) {
ox = -1;
continue;
}var y = this.waveformView.y + ya;
var x = this.waveformView.x + (i * this.waveformView.width/nb|0);
if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
ox = x;
oy = y;
}
}if (this.spectrumView != null  && this.spectrumBuf != null  ) {
this.spectrumView.drawLabel$java_awt_Graphics$S(g, "Spectrum");
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).darkGray);
g.fillRect$I$I$I$I(this.spectrumView.x, this.spectrumView.y, this.spectrumView.width, this.spectrumView.height);
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).black);
var ym = 0.138;
for (i = 0; ; i++) {
var q = ym * i;
if (q > 1 ) break;
var y = this.spectrumView.y + ((q * this.spectrumView.height)|0);
g.drawLine$I$I$I$I(this.spectrumView.x, y, this.spectrumView.x + this.spectrumView.width, y);
}
for (i = 1; ; i++) {
var ll = this.logrange - i * Math.log(2);
var x = 0;
if (this.logFreqCheckItem.getState()) x = ((ll * this.spectrumView.width / this.logrange)|0);
 else x = (this.spectrumView.width/(1 << i)|0);
if (x <= 0) break;
x = x+(this.spectrumView.x);
g.drawLine$I$I$I$I(x, this.spectrumView.y, x, this.spectrumView.bottom);
}
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).white);
var isub = (this.spectrumBuf.length/2|0);
var cosmult = 6.283185307179586 / (this.spectrumBuf.length - 2);
for (i = 0; i != this.spectrumBuf.length; i = i+(2)) {
var ht = 0.54 - 0.46 * Math.cos(i * cosmult);
this.spectrumBuf[i] *= ht;
}
if (this.spectrumFFT == null  || this.spectrumFFT.getSize() != isub ) this.spectrumFFT = Clazz.new_((I$[3]||(I$[3]=Clazz.load('com.falstad.FFT'))).c$$I,[isub]);
this.spectrumFFT.transform$DA$Z(this.spectrumBuf, false);
var bufmult = 1.0 / isub;
bufmult /= 65536;
bufmult *= bufmult;
var specArray = Clazz.array(Double.TYPE, [this.spectrumView.width]);
if (this.logFreqCheckItem.getState()) {
for (i = 0; i != isub; i = i+(2)) {
var f = i / this.spectrumBuf.length;
var ix = ((specArray.length * (Math.log(f) - this.minlog) / this.logrange)|0);
if (ix < 0) continue;
specArray[ix] += this.spectrumBuf[i] * this.spectrumBuf[i] + this.spectrumBuf[i + 1] * this.spectrumBuf[i + 1];
}
} else {
for (i = 0; i != isub; i = i+(2)) {
var ix = (specArray.length * i/isub|0);
specArray[ix] += this.spectrumBuf[i] * this.spectrumBuf[i] + this.spectrumBuf[i + 1] * this.spectrumBuf[i + 1];
}
}var maxi = specArray.length;
for (i = 0; i != this.spectrumView.width; i++) {
var bf = specArray[i] * bufmult;
bf = -ym * Math.log(bf) / 2.302585092994046;
var ya = ((this.spectrumView.height * bf)|0);
if (ya > this.spectrumView.height) continue;
var y = this.spectrumView.y + ya;
var x = this.spectrumView.x + (i * this.spectrumView.width/maxi|0);
g.drawLine$I$I$I$I(x, y, x, this.spectrumView.y + this.spectrumView.height - 1);
}
}if (this.spectrumView != null  && !this.java2 ) {
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).white);
this.centerString$java_awt_Graphics$S$I(g, "Need java 2 for sound", this.spectrumView.y + (this.spectrumView.height/2|0));
}if (this.unstable) {
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).red);
this.centerString$java_awt_Graphics$S$I(g, "Filter is unstable", (this.winSize.height/2|0));
}if (this.mp3Error != null ) {
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).red);
this.centerString$java_awt_Graphics$S$I(g, this.mp3Error, (this.winSize.height/2|0) + 20);
}if (this.respView != null  && this.respView.contains$I$I(this.mouseX, this.mouseY) ) {
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).yellow);
g.drawLine$I$I$I$I(this.mouseX, this.respView.y, this.mouseX, this.respView.y + this.respView.height - 1);
}if (this.spectrumView != null  && this.spectrumView.contains$I$I(this.mouseX, this.mouseY) ) {
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).yellow);
g.drawLine$I$I$I$I(this.mouseX, this.spectrumView.y, this.mouseX, this.spectrumView.y + this.spectrumView.height - 1);
}this.filterChanged = false;
realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
});

Clazz.newMeth(C$, 'calcWave$D$com_falstad_ComplexA', function (f, wave) {
var ll = Clazz.array(Integer.TYPE, [this.pipeRadius.length + 1]);
for (var i = 0; i != ll.length; i++) ll[i] = i;

var resp = Clazz.array(Double.TYPE, [2]);
this.genPipeResponse$DA$D$IA$DA$com_falstad_ComplexA(this.pipeRadius, f * 2, ll, resp, wave);
var m = 1 / wave[0].mag;
for (var i = wave.length; --i >= 0; ) wave[i].multRe$D(m);

});

Clazz.newMeth(C$, 'setCutoff$D', function (f) {
});

Clazz.newMeth(C$, 'countPoints$DA$I', function (buf, offset) {
var len = buf.length;
var max = 0;
var i;
var result = 0;
var last = 123;
for (i = offset; i < len; i++) {
var qa = Math.abs(buf[i]);
if (qa > max ) max = qa;
if (Math.abs(qa - last) > max * 0.003 ) {
result = i - offset + 1;
}last = qa;
}
return result;
});

Clazz.newMeth(C$, 'max$DA', function (buf) {
var i;
var max = 0;
for (i = 0; i != buf.length; i++) {
var qa = Math.abs(buf[i]);
if (qa > max ) max = qa;
}
return max;
});

Clazz.newMeth(C$, 'getFreqFromX$I$com_falstad_VowelFrame_View', function (x, v) {
var f = 0.5 * (x - v.x) / v.width;
if (f <= 0  || f >= 0.5  ) return -1;
if (this.logFreqCheckItem.getState()) return Math.exp(this.minlog + 2 * f * this.logrange );
return f;
});

Clazz.newMeth(C$, 'setupFilter', function () {
var filt = this.filterChooser.getSelectedIndex();
switch (filt) {
case 0:
this.filterType = Clazz.new_((I$[27]||(I$[27]=Clazz.load(Clazz.load('com.falstad.VowelFrame').AVowelFilter))), [this, null]);
break;
case 1:
this.filterType = Clazz.new_((I$[28]||(I$[28]=Clazz.load(Clazz.load('com.falstad.VowelFrame').OVowelFilter))), [this, null]);
break;
case 2:
this.filterType = Clazz.new_((I$[29]||(I$[29]=Clazz.load(Clazz.load('com.falstad.VowelFrame').UVowelFilter))), [this, null]);
break;
case 3:
this.filterType = Clazz.new_((I$[30]||(I$[30]=Clazz.load(Clazz.load('com.falstad.VowelFrame').IVowelFilter))), [this, null]);
break;
case 4:
this.filterType = Clazz.new_((I$[31]||(I$[31]=Clazz.load(Clazz.load('com.falstad.VowelFrame').EVowelFilter))), [this, null]);
break;
case 5:
this.filterType = Clazz.new_((I$[32]||(I$[32]=Clazz.load(Clazz.load('com.falstad.VowelFrame').IBarVowelFilter))), [this, null]);
break;
case 6:
this.filterType = Clazz.new_((I$[33]||(I$[33]=Clazz.load(Clazz.load('com.falstad.VowelFrame').AVowelFilterSimple))), [this, null]);
break;
case 7:
this.filterType = Clazz.new_((I$[34]||(I$[34]=Clazz.load(Clazz.load('com.falstad.VowelFrame').IVowelFilterSimple))), [this, null]);
break;
case 8:
this.filterType = Clazz.new_((I$[35]||(I$[35]=Clazz.load(Clazz.load('com.falstad.VowelFrame').AEVowelFilterSimple))), [this, null]);
break;
case 9:
this.filterType = Clazz.new_((I$[36]||(I$[36]=Clazz.load(Clazz.load('com.falstad.VowelFrame').IhVowelFilterSimple))), [this, null]);
break;
case 10:
this.filterType = Clazz.new_((I$[37]||(I$[37]=Clazz.load(Clazz.load('com.falstad.VowelFrame').OoVowelFilterSimple))), [this, null]);
break;
case 11:
this.filterType = Clazz.new_((I$[38]||(I$[38]=Clazz.load(Clazz.load('com.falstad.VowelFrame').YVowelFilterSimple))), [this, null]);
break;
case 12:
this.filterType = Clazz.new_((I$[39]||(I$[39]=Clazz.load(Clazz.load('com.falstad.VowelFrame').OpenTubeFilter))), [this, null]);
break;
case 13:
this.filterType = Clazz.new_((I$[40]||(I$[40]=Clazz.load(Clazz.load('com.falstad.VowelFrame').CustomFilter))), [this, null]);
break;
case 14:
this.filterType = Clazz.new_((I$[41]||(I$[41]=Clazz.load(Clazz.load('com.falstad.VowelFrame').NoFilter))), [this, null]);
break;
}
if (this.filterSelection != filt) {
this.filterSelection = filt;
var i;
for (i = 0; i != this.auxBars.length; i++) this.auxBars[i].setMaximum$I(999);

var ax = this.filterType.select();
for (i = 0; i != ax; i++) {
this.auxLabels[i].show();
this.auxBars[i].show();
}
for (i = ax; i != this.auxBars.length; i++) {
this.auxLabels[i].hide();
this.auxBars[i].hide();
}
if (this.filterType.needsWindow()) {
this.windowChooser.show();
this.setWindow();
} else {
this.windowChooser.hide();
this.setWindow();
}this.validate();
}this.filterType.setup();
this.curFilter = null;
});

Clazz.newMeth(C$, 'setInputLabel', function () {
this.wformInfo = this.getWaveformObject();
var inText = this.wformInfo.getInputText();
if (inText == null ) {
this.inputLabel.hide();
this.inputBar.hide();
} else {
this.inputLabel.setText$S(inText);
this.inputLabel.show();
this.inputBar.show();
}this.validate();
});

Clazz.newMeth(C$, 'getWaveformObject', function () {
var wform;
var ic = this.inputChooser.getSelectedIndex();
switch (ic) {
case 0:
wform = Clazz.new_((I$[42]||(I$[42]=Clazz.load(Clazz.load('com.falstad.VowelFrame').NoiseWaveform))), [this, null]);
break;
case 1:
wform = Clazz.new_((I$[43]||(I$[43]=Clazz.load(Clazz.load('com.falstad.VowelFrame').VocalWaveform))), [this, null]);
break;
case 2:
wform = Clazz.new_((I$[44]||(I$[44]=Clazz.load(Clazz.load('com.falstad.VowelFrame').SawtoothWaveform))), [this, null]);
break;
case 3:
wform = Clazz.new_((I$[45]||(I$[45]=Clazz.load(Clazz.load('com.falstad.VowelFrame').PeriodicNoiseWaveform))), [this, null]);
break;
case 4:
wform = Clazz.new_((I$[46]||(I$[46]=Clazz.load(Clazz.load('com.falstad.VowelFrame').TriangleWaveform))), [this, null]);
break;
case 5:
wform = Clazz.new_((I$[47]||(I$[47]=Clazz.load(Clazz.load('com.falstad.VowelFrame').SquareWaveform))), [this, null]);
break;
case 6:
wform = Clazz.new_((I$[48]||(I$[48]=Clazz.load(Clazz.load('com.falstad.VowelFrame').SineWaveform))), [this, null]);
break;
case 7:
wform = Clazz.new_((I$[49]||(I$[49]=Clazz.load(Clazz.load('com.falstad.VowelFrame').SweepWaveform))), [this, null]);
break;
case 8:
wform = Clazz.new_((I$[50]||(I$[50]=Clazz.load(Clazz.load('com.falstad.VowelFrame').ImpulseWaveform))), [this, null]);
break;
default:
wform = Clazz.new_((I$[42]||(I$[42]=Clazz.load(Clazz.load('com.falstad.VowelFrame').NoiseWaveform))), [this, null]);
break;
}
return wform;
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
this.destroyFrame();
return;
}if (e.getSource() === this.exportButton ) this.doImport();
});

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
if ((e.getSource()) !== this.inputBar ) this.setupFilter();
System.out.print$S((e.getSource()).getValue() + "\n");
if ((e.getSource()) === this.inputBar ) this.setInputW();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'setInputW', function () {
this.inputW = 3.141592653589793 * this.inputBar.getValue() / 1000.0;
this.inputW /= 20;
});

Clazz.newMeth(C$, 'processEvent$java_awt_AWTEvent', function (ev) {
if (ev.getID() == 201) {
this.destroyFrame();
return;
}C$.superclazz.prototype.processEvent$java_awt_AWTEvent.apply(this, [ev]);
});

Clazz.newMeth(C$, 'destroyFrame', function () {
this.requestAudioShutdown();
if (this.applet == null ) this.dispose();
 else this.applet.destroyFrame();
});

Clazz.newMeth(C$, 'mouseDragged$java_awt_event_MouseEvent', function (e) {
this.mouseX = e.getX();
this.mouseY = e.getY();
this.edit$java_awt_event_MouseEvent(e);
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'mouseMoved$java_awt_event_MouseEvent', function (e) {
this.dragX = this.mouseX = e.getX();
this.dragY = this.mouseY = e.getY();
this.cv.repaint$J(this.pause);
if (this.respView != null  && this.respView.contains$I$I(e.getX(), e.getY()) ) this.selection = 1;
 else if (this.spectrumView != null  && this.spectrumView.contains$I$I(e.getX(), e.getY()) ) this.selection = 2;
 else if (this.pipeView != null  && this.pipeView.contains$I$I(e.getX(), e.getY()) ) this.selection = 3;
});

Clazz.newMeth(C$, 'selectPoleZero$I$I', function (x, y) {
this.selectedPole = this.selectedZero = -1;
var i;
var ph = (this.polesView.height/2|0);
var pw = ph;
var cx = this.polesView.x + pw;
var cy = this.polesView.y + ph;
var c1 = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))));
var polect = this.filterType.getPoleCount();
var zeroct = this.filterType.getZeroCount();
var bestdist = 10000;
for (i = 0; i != polect; i++) {
this.filterType.getPole$I$com_falstad_Complex(i, c1);
var c1x = cx + ((pw * c1.re)|0);
var c1y = cy - ((ph * c1.im)|0);
var dist = this.distanceSq$I$I$I$I(c1x, c1y, x, y);
if (dist <= bestdist) {
bestdist = dist;
this.selectedPole = i;
this.selectedZero = -1;
}}
for (i = 0; i != zeroct; i++) {
this.filterType.getZero$I$com_falstad_Complex(i, c1);
var c1x = cx + ((pw * c1.re)|0);
var c1y = cy - ((ph * c1.im)|0);
var dist = this.distanceSq$I$I$I$I(c1x, c1y, x, y);
if (dist < bestdist) {
bestdist = dist;
this.selectedPole = -1;
this.selectedZero = i;
}}
});

Clazz.newMeth(C$, 'distanceSq$I$I$I$I', function (x1, y1, x2, y2) {
return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
});

Clazz.newMeth(C$, 'mouseClicked$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseEntered$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseExited$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mousePressed$java_awt_event_MouseEvent', function (e) {
this.mouseMoved$java_awt_event_MouseEvent(e);
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'edit$java_awt_event_MouseEvent', function (e) {
if (this.selection == 2) {
if (!this.wformInfo.needsFrequency()) return;
var f = this.getFreqFromX$I$com_falstad_VowelFrame_View(e.getX(), this.spectrumView);
if (f < 0 ) return;
this.inputW = 2 * 3.141592653589793 * f ;
this.inputBar.setValue$I(((2000 * f)|0));
}if (this.selection == 3) {
this.filterChooser.select$I(13);
this.editPipe$java_awt_event_MouseEvent(e);
}});

Clazz.newMeth(C$, 'editPipe$java_awt_event_MouseEvent', function (e) {
var x = e.getX();
var y = e.getY();
if (this.dragX == x) {
this.editPipePoint$I$I(x, y);
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
this.editPipePoint$I$I(x, y);
}
}this.setupFilter();
});

Clazz.newMeth(C$, 'editPipePoint$I$I', function (x, y) {
var xx = ((x - this.pipeView.x) * this.pipeRadius.length/this.pipeView.width|0);
if (xx < 0 || xx >= this.pipeRadius.length ) return;
var yy = (y - this.pipeView.y) / this.pipeView.height;
yy = (0.5 - yy) / this.pipeView.mult;
this.pipeRadius[xx] = Math.abs(yy);
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
this.filterChanged = true;
if (e.getSource() === this.displayCheck ) {
this.cv.repaint$J(this.pause);
return;
}if (e.getSource() === this.inputChooser ) {
this.requestAudioShutdown();
this.setInputLabel();
}if ((e.getSource()) === this.rateChooser ) {
this.requestAudioShutdown();
this.inputW *= this.sampleRate;
switch (this.rateChooser.getSelectedIndex()) {
case 0:
this.sampleRate = 8000;
break;
case 1:
this.sampleRate = 11025;
break;
case 2:
this.sampleRate = 16000;
break;
case 3:
this.sampleRate = 22050;
break;
case 4:
this.sampleRate = 32000;
break;
case 5:
this.sampleRate = 44100;
break;
}
this.inputW /= this.sampleRate;
}if ((e.getSource()) === this.windowChooser ) this.setWindow();
if (Clazz.instanceOf(e.getSource(), "a2s.CheckboxMenuItem")) this.handleResize();
 else this.setupFilter();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'setWindow', function () {
if (this.windowChooser.getSelectedIndex() == C$.WINDOW_KAISER && this.filterType.needsWindow() ) {
this.kaiserLabel.show();
this.kaiserBar.show();
} else {
this.kaiserLabel.hide();
this.kaiserBar.hide();
}this.validate();
});

Clazz.newMeth(C$, 'setSampleRate$I', function (r) {
var x = 0;
switch (r) {
case 8000:
x = 0;
break;
case 11025:
x = 1;
break;
case 16000:
x = 2;
break;
case 22050:
x = 3;
break;
case 32000:
x = 4;
break;
case 44100:
x = 5;
break;
}
this.rateChooser.select$I(x);
this.sampleRate = r;
});

Clazz.newMeth(C$, 'getOmegaText$D', function (wc) {
return (((wc * this.sampleRate / 6.283185307179586)|0)) + " Hz";
});

Clazz.newMeth(C$, 'bessi0$D', function (x) {
var ax;
var ans;
var y;
if ((ax = Math.abs(x)) < 3.75 ) {
y = x / 3.75;
y *= y;
ans = 1.0 + y * (3.5156229 + y * (3.0899424 + y * (1.2067492 + y * (0.2659732 + y * (0.0360768 + y * 0.0045813)))));
} else {
y = 3.75 / ax;
ans = (Math.exp(ax) / Math.sqrt(ax)) * (0.39894228 + y * (0.01328592 + y * (0.00225319 + y * (-0.00157565 + y * (0.00916281 + y * (-0.02057706 + y * (0.02635537 + y * (-0.01647633 + y * 0.00392377))))))));
}return ans;
});

Clazz.newMeth(C$, 'genPipeResponse$DA$D$IA$DA$com_falstad_ComplexA', function (rad, maxf, lens, resp, wave) {
var n = 1 + rad.length;
var zair = 40.3;
var dim = this.pipeLen;
dim /= lens[lens.length - 1];
dim *= 100;
var z = Clazz.array(Double.TYPE, [n + 1]);
z[0] = 200;
for (var i = 1; i != n; i++) z[i] = zair / (3.141592653589793 * rad[i - 1] * rad[i - 1] );

var cond = Clazz.array((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))), [n * 2, 4]);
var rs = Clazz.array((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))), [n * 2]);
var ss = 35396.0;
var attCheck = this.attenuationCheck.getState();
var envCheck = this.envelopeCheck.getState();
for (var wi = 1, len = resp.length; wi < len; wi++) {
var wav = (wi == len - 1 ? wave : null);
var f = maxf * wi / len;
var w = f * 2 * 3.141592653589793 ;
var k = w / ss;
z[n] = z[n - 1] / 4;
for (var i = 0; i != n; i++) {
var ii = i * 2;
var i2 = ii + 1;
var x = lens[i] * dim;
var alpha = (i == n - 1) ? 0 : 0.007 / rad[i] * (0.5 + f / 4000.0);
if (!attCheck) alpha = 0;
cond[ii][0] = this.iexp$D$D$D(-k * x, -alpha * x, 1);
cond[ii][1] = this.iexp$D$D$D(k * x, alpha * x, 1);
cond[ii][2] = this.iexp$D$D$D(-k * x, -alpha * x, -1);
cond[ii][3] = this.iexp$D$D$D(k * x, alpha * x, -1);
cond[i2][0] = this.iexp$D$D$D(-k * x, -alpha * x, 1 / z[i]);
cond[i2][1] = this.iexp$D$D$D(k * x, alpha * x, -1 / z[i]);
cond[i2][2] = this.iexp$D$D$D(-k * x, -alpha * x, -1 / z[i + 1]);
cond[i2][3] = this.iexp$D$D$D(k * x, alpha * x, 1 / z[i + 1]);
}
var f100 = f / 100;
var envelope = envCheck ? f100 / (1 + f100 * f100) : 1;
resp[wi] = this.solve$com_falstad_ComplexAA$I$com_falstad_ComplexA(cond, n * 2, wav) * envelope;
}
resp[0] = resp[1];
});

Clazz.newMeth(C$, 'solve$com_falstad_ComplexAA$I$com_falstad_ComplexA', function (m, n, wave) {
var i;
this.s0.setReIm$D$D(1, 0);
this.s1.setReIm$D$D(0, 0);
this.det.setReIm$D$D(0, 0);
this.rs0.setReIm$D$D(0, 0);
this.rs1.setReIm$D$D(0, 0);
for (i = n - 2; i >= 0; i = i-(2)) {
this.rs0.setRe$D(0);
this.rs0.scaleAdd2$D$com_falstad_Complex$com_falstad_Complex(-1, m[i][2], this.s0);
this.rs0.scaleAdd2$D$com_falstad_Complex$com_falstad_Complex(-1, m[i][3], this.s1);
this.rs1.setRe$D(0);
this.rs1.scaleAdd2$D$com_falstad_Complex$com_falstad_Complex(-1, m[i + 1][2], this.s0);
this.rs1.scaleAdd2$D$com_falstad_Complex$com_falstad_Complex(-1, m[i + 1][3], this.s1);
this.det.setRe$D(0);
this.det.scaleAdd2$D$com_falstad_Complex$com_falstad_Complex(1, m[i][0], m[i + 1][1]);
this.det.scaleAdd2$D$com_falstad_Complex$com_falstad_Complex(-1, m[i][1], m[i + 1][0]);
this.s0.setRe$D(0);
this.s0.scaleAdd2$D$com_falstad_Complex$com_falstad_Complex(-1, m[i][1], this.rs1);
this.s0.scaleAdd2$D$com_falstad_Complex$com_falstad_Complex(1, m[i + 1][1], this.rs0);
this.s0.divide$com_falstad_Complex(this.det);
this.s1.setRe$D(0);
this.s1.scaleAdd2$D$com_falstad_Complex$com_falstad_Complex(1, m[i][0], this.rs1);
this.s1.scaleAdd2$D$com_falstad_Complex$com_falstad_Complex(-1, m[i + 1][0], this.rs0);
this.s1.divide$com_falstad_Complex(this.det);
if (wave != null ) {
var cx = wave[(i/2|0)] = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex')))).setReIm$D$D(this.s0.re, this.s0.im);
cx.mult$com_falstad_Complex(m[i][0]);
this.cy.setReIm$D$D(this.s1.re, this.s1.im);
this.cy.mult$com_falstad_Complex(m[i][1]);
cx.add$com_falstad_Complex(this.cy);
}}
return 1 / this.s1.mag;
});

Clazz.newMeth(C$, 'iexp$D$D$D', function (x, alpha, mul) {
var a = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))));
a.setMagPhase$D$D(Math.exp(alpha), x);
a.multRe$D(mul);
return a;
});

Clazz.newMeth(C$, 'doImport', function () {
if (this.impDialog != null ) {
this.requestFocus();
this.impDialog.setVisible$Z(false);
this.impDialog = null;
}var dump = "";
var i;
dump = "$ 0 " + new Double(this.pipeLen).toString() + " " + this.pipeRadius.length + "\n" ;
for (i = 0; i != this.pipeRadius.length; i++) dump += "p " + new Double(this.pipeRadius[i]).toString() + "\n" ;

this.impDialog = Clazz.new_((I$[51]||(I$[51]=Clazz.load(Clazz.load('com.falstad.VowelFrame').ImportDialog))).c$$com_falstad_VowelFrame$S, [this, null, this, dump]);
this.impDialog.show();
});

Clazz.newMeth(C$, 'readImport$S', function (s) {
var b = s.getBytes();
var len = s.length$();
var p;
var x = 0;
var srci = 0;
var pi = 0;
this.filterChooser.select$I(13);
for (p = 0; p < len; ) {
var l;
var linelen = 0;
for (l = 0; l != len - p; l++) if (b[l + p] == 10  || b[l + p] == 13  ) {
linelen = l++;
if (l + p < b.length && b[l + p] == 10  ) l++;
break;
}
var line =  String.instantialize(b, p, linelen);
var st = Clazz.new_((I$[52]||(I$[52]=Clazz.load('java.util.StringTokenizer'))).c$$S,[line]);
while (st.hasMoreTokens()){
var type = st.nextToken();
var tint = type.charAt(0).$c();
try {
if (tint == 36 ) {
var flags =  new Integer(st.nextToken()).intValue();
this.pipeLen =  new Double(st.nextToken()).doubleValue();
var radlen =  new Integer(st.nextToken()).intValue();
break;
}if (tint == 112 ) {
this.pipeRadius[pi++] =  new Double(st.nextToken()).doubleValue();
break;
}System.out.println$S("unknown type!");
} catch (ee) {
if (Clazz.exceptionOf(ee, Exception)){
ee.printStackTrace();
break;
} else {
throw ee;
}
}
break;
}
p = p+(l);
}
this.setupFilter();
});

Clazz.newMeth(C$, 'createAudioThread', function () {
this.audioThread = Clazz.new_((I$[53]||(I$[53]=Clazz.load(Clazz.load('com.falstad.VowelFrame').PlayThread))), [this, null]);
});

Clazz.newMeth(C$, 'requestAudioShutdown', function () {
this.shutdownRequested = true;
});
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "View", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, 'java.awt.Rectangle');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.mult = 0;
this.right = 0;
this.bottom = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$java_awt_Dimension', function (r) {
C$.superclazz.c$$java_awt_Dimension.apply(this, [r]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I', function (a, b, c, d) {
C$.superclazz.c$$I$I$I$I.apply(this, [a, b, c, d]);
C$.$init$.apply(this);
this.right = a + c - 1;
this.bottom = b + d - 1;
}, 1);

Clazz.newMeth(C$, 'drawLabel$java_awt_Graphics$S', function (g, str) {
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).white);
this.b$['com.falstad.VowelFrame'].centerString$java_awt_Graphics$S$I(g, str, this.y - 5);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "PhaseColor", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.r = 0;
this.g = 0;
this.b = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$D$D$D', function (rr, gg, bb) {
C$.$init$.apply(this);
this.r = rr;
this.g = gg;
this.b = bb;
}, 1);

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "Waveform", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.buffer = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'start', function () {
return true;
});

Clazz.newMeth(C$, 'getChannels', function () {
return 2;
});

Clazz.newMeth(C$, 'getBuffer', function () {
this.buffer = Clazz.array(Short.TYPE, [this.b$['com.falstad.VowelFrame'].getPower2$I((this.b$['com.falstad.VowelFrame'].sampleRate/12|0)) * this.getChannels()]);
});

Clazz.newMeth(C$, 'getInputText', function () {
return "Input Frequency";
});

Clazz.newMeth(C$, 'needsFrequency', function () {
return true;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "NoiseWaveform", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.Waveform']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'start', function () {
this.getBuffer();
return true;
});

Clazz.newMeth(C$, 'getData', function () {
var i;
for (i = 0; i != this.buffer.length; i++) this.buffer[i] = ((this.b$['com.falstad.VowelFrame'].random.nextInt()|0)|0);

return this.buffer.length;
});

Clazz.newMeth(C$, 'getInputText', function () {
return null;
});

Clazz.newMeth(C$, 'needsFrequency', function () {
return false;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "PeriodicNoiseWaveform", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.Waveform']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.smbuf = null;
this.ix = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getChannels', function () {
return 1;
});

Clazz.newMeth(C$, 'start', function () {
this.getBuffer();
this.smbuf = Clazz.array(Short.TYPE, [1]);
this.ix = 0;
return true;
});

Clazz.newMeth(C$, 'getData', function () {
var period = ((6.283185307179586 / this.b$['com.falstad.VowelFrame'].inputW)|0);
if (period != this.smbuf.length) {
this.smbuf = Clazz.array(Short.TYPE, [period]);
var i;
for (i = 0; i != period; i++) this.smbuf[i] = ((this.b$['com.falstad.VowelFrame'].random.nextInt()|0)|0);

}var i;
for (i = 0; i != this.buffer.length; i++, this.ix++) {
if (this.ix >= period) this.ix = 0;
this.buffer[i] = (this.smbuf[this.ix]|0);
}
return this.buffer.length;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "SineWaveform", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.Waveform']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.ix = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getChannels', function () {
return 1;
});

Clazz.newMeth(C$, 'start', function () {
this.getBuffer();
this.ix = 0;
return true;
});

Clazz.newMeth(C$, 'getData', function () {
var i;
for (i = 0; i != this.buffer.length; i++) {
this.ix++;
this.buffer[i] = (((Math.sin(this.ix * this.b$['com.falstad.VowelFrame'].inputW) * 32000)|0)|0);
}
return this.buffer.length;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "TriangleWaveform", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.Waveform']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.ix = 0;
this.smbuf = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getChannels', function () {
return 1;
});

Clazz.newMeth(C$, 'start', function () {
this.getBuffer();
this.ix = 0;
this.smbuf = Clazz.array(Short.TYPE, [1]);
return true;
});

Clazz.newMeth(C$, 'getData', function () {
var i;
var period = ((6.283185307179586 / this.b$['com.falstad.VowelFrame'].inputW)|0);
if (period != this.smbuf.length) {
this.smbuf = Clazz.array(Short.TYPE, [period]);
var p2 = period / 2.0;
for (i = 0; i < p2 ; i++) this.smbuf[i] = (((i / p2 * 64000 - 32000)|0)|0);

for (; i != period; i++) this.smbuf[i] = ((((2 - i / p2) * 64000 - 32000)|0)|0);

}for (i = 0; i != this.buffer.length; i++, this.ix++) {
if (this.ix >= period) this.ix = 0;
this.buffer[i] = (this.smbuf[this.ix]|0);
}
return this.buffer.length;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "SawtoothWaveform", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.Waveform']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.ix = 0;
this.smbuf = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getChannels', function () {
return 1;
});

Clazz.newMeth(C$, 'start', function () {
this.getBuffer();
this.ix = 0;
this.smbuf = Clazz.array(Short.TYPE, [1]);
return true;
});

Clazz.newMeth(C$, 'getData', function () {
var i;
var period = ((6.283185307179586 / this.b$['com.falstad.VowelFrame'].inputW)|0);
if (period != this.smbuf.length) {
this.smbuf = Clazz.array(Short.TYPE, [period]);
var p2 = period / 2.0;
for (i = 0; i != period; i++) this.smbuf[i] = ((((i / p2 - 1) * 32000)|0)|0);

}for (i = 0; i != this.buffer.length; i++, this.ix++) {
if (this.ix >= period) this.ix = 0;
this.buffer[i] = (this.smbuf[this.ix]|0);
}
return this.buffer.length;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "VocalWaveform", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.Waveform']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.ix = 0;
this.period = 0;
this.p2 = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.period = 0;
this.p2 = 0;
}, 1);

Clazz.newMeth(C$, 'getChannels', function () {
return 1;
});

Clazz.newMeth(C$, 'start', function () {
this.getBuffer();
this.ix = 0;
return true;
});

Clazz.newMeth(C$, 'getData', function () {
var i;
for (i = 0; i != this.buffer.length; i++, this.ix++) {
if (this.ix >= this.period) {
this.ix = 0;
this.period = ((6.283185307179586 / this.b$['com.falstad.VowelFrame'].inputW)|0);
this.period = this.period+(this.b$['com.falstad.VowelFrame'].getrand$I(3) - 1);
this.p2 = (this.period/2|0);
}this.buffer[i] = ((((this.ix / this.p2 - 1) * 32000)|0)|0);
}
return this.buffer.length;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "SquareWaveform", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.Waveform']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.ix = 0;
this.omega = 0;
this.smbuf = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getChannels', function () {
return 1;
});

Clazz.newMeth(C$, 'start', function () {
this.getBuffer();
this.ix = 0;
this.smbuf = Clazz.array(Short.TYPE, [1]);
return true;
});

Clazz.newMeth(C$, 'getData', function () {
var i;
var period = ((6.283185307179586 / this.b$['com.falstad.VowelFrame'].inputW)|0);
if (period != this.smbuf.length) {
this.smbuf = Clazz.array(Short.TYPE, [period]);
for (i = 0; i != (period/2|0); i++) this.smbuf[i] = (32000|0);

if ((period & 1) > 0) this.smbuf[i++] = (0|0);
for (; i != period; i++) this.smbuf[i] = (-32000|0);

}for (i = 0; i != this.buffer.length; i++, this.ix++) {
if (this.ix >= period) this.ix = 0;
this.buffer[i] = (this.smbuf[this.ix]|0);
}
return this.buffer.length;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "SweepWaveform", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.Waveform']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.ix = 0;
this.omega = 0;
this.nextOmega = 0;
this.t = 0;
this.startOmega = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getChannels', function () {
return 1;
});

Clazz.newMeth(C$, 'start', function () {
this.getBuffer();
this.ix = 0;
this.startOmega = this.nextOmega = this.omega = 251.32741228718345 / this.b$['com.falstad.VowelFrame'].sampleRate;
this.t = 0;
return true;
});

Clazz.newMeth(C$, 'getData', function () {
var i;
var nmul = 1;
var nadd = 0;
var maxspeed = 1 / (0.66 * this.b$['com.falstad.VowelFrame'].sampleRate);
var minspeed = (1/(this.b$['com.falstad.VowelFrame'].sampleRate * 16)|0);
if (this.b$['com.falstad.VowelFrame'].logFreqCheckItem.getState()) nmul = Math.pow(6.283185307179586 / this.startOmega, 2 * (minspeed + (maxspeed - minspeed) * this.b$['com.falstad.VowelFrame'].inputBar.getValue() / 1000.0));
 else nadd = (6.283185307179586 - this.startOmega) * (minspeed + (maxspeed - minspeed) * this.b$['com.falstad.VowelFrame'].inputBar.getValue() / 1000.0);
for (i = 0; i != this.buffer.length; i++) {
this.ix++;
this.t += this.omega;
if (this.t > 6.283185307179586 ) {
this.t -= 6.283185307179586;
this.omega = this.nextOmega;
if (this.nextOmega > 3.141592653589793 ) this.omega = this.nextOmega = this.startOmega;
}this.buffer[i] = (((Math.sin(this.t) * 32000)|0)|0);
this.nextOmega = this.nextOmega * nmul + nadd;
}
return this.buffer.length;
});

Clazz.newMeth(C$, 'getInputText', function () {
return "Sweep Speed";
});

Clazz.newMeth(C$, 'needsFrequency', function () {
return false;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "ImpulseWaveform", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.Waveform']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.ix = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getChannels', function () {
return 1;
});

Clazz.newMeth(C$, 'start', function () {
this.getBuffer();
this.ix = 0;
return true;
});

Clazz.newMeth(C$, 'getData', function () {
var i;
var ww = (this.b$['com.falstad.VowelFrame'].inputBar.getValue()/51|0) + 1;
var period = (10000/ww|0);
for (i = 0; i != this.buffer.length; i++) {
var q = ($s$[0] = 0, $s$[0]);
if (this.ix % period == 0) q = ($s$[0] = 32767, $s$[0]);
this.ix++;
this.buffer[i] = (q|0);
}
return this.buffer.length;
});

Clazz.newMeth(C$, 'getInputText', function () {
return "Impulse Frequency";
});

Clazz.newMeth(C$, 'needsFrequency', function () {
return false;
});
var $s$ = new Int16Array(1);

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "Filter", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'useConvolve', function () {
return false;
});

Clazz.newMeth(C$, 'getImpulseResponse$I', function (offset) {
var pts = 1000;
var inbuf = Clazz.array(Double.TYPE, [offset + pts]);
var outbuf = Clazz.array(Double.TYPE, [offset + pts]);
inbuf[offset] = 1;
var state = this.createState();
this.run$DA$DA$I$I$I$DA(inbuf, outbuf, offset, -1, pts, state);
return outbuf;
});

Clazz.newMeth(C$, 'getStepResponse$I', function (offset) {
var pts = 1000;
var inbuf = Clazz.array(Double.TYPE, [offset + pts]);
var outbuf = Clazz.array(Double.TYPE, [offset + pts]);
var i;
for (i = offset; i != inbuf.length; i++) inbuf[i] = 1;

var state = this.createState();
this.run$DA$DA$I$I$I$DA(inbuf, outbuf, offset, -1, pts, state);
return outbuf;
});

Clazz.newMeth(C$, 'getImpulseLen$I$DA', function (offset, buf) {
return this.b$['com.falstad.VowelFrame'].countPoints$DA$I(buf, offset);
});

Clazz.newMeth(C$, 'getStepLen$I$DA', function (offset, buf) {
return this.b$['com.falstad.VowelFrame'].countPoints$DA$I(buf, offset);
});

Clazz.newMeth(C$, 'createState', function () {
return null;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "DirectFilter", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.Filter']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.aList = null;
this.bList = null;
this.nList = null;
this.czn = null;
this.top = null;
this.bottom = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.aList = Clazz.array(Double.TYPE, -1, [1]);
this.bList = null;
this.nList = Clazz.array(Integer.TYPE, -1, [0]);
}, 1);

Clazz.newMeth(C$, 'getLength', function () {
return this.aList.length;
});

Clazz.newMeth(C$, 'useConvolve', function () {
return this.bList == null  && this.aList.length > 25 ;
});

Clazz.newMeth(C$, 'dump', function () {
System.out.print$S("a ");
this.dump$DA(this.aList);
if (this.bList != null ) {
System.out.print$S("b ");
this.dump$DA(this.bList);
}});

Clazz.newMeth(C$, 'dump$DA', function (x) {
var i;
for (i = 0; i != x.length; i++) System.out.print$S(new Double(x[i]).toString() + " ");

System.out.println$S("");
});

Clazz.newMeth(C$, 'evalTransfer$com_falstad_Complex', function (c) {
if (this.czn == null ) {
this.czn = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))));
this.top = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))));
this.bottom = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))));
}var i;
var j;
this.czn.setRe$D(1);
this.top.setRe$D(0);
this.bottom.setRe$D(0);
var n = 0;
for (i = 0; i != this.aList.length; i++) {
var n1 = this.nList[i];
while (n < n1){
if (n + 3 < n1) {
this.czn.set$com_falstad_Complex(c);
this.czn.pow$D(-n1);
n = n1;
break;
}this.czn.divide$com_falstad_Complex(c);
n++;
}
this.top.scaleAdd$D$com_falstad_Complex(this.aList[i], this.czn);
if (this.bList != null ) this.bottom.scaleAdd$D$com_falstad_Complex(this.bList[i], this.czn);
}
if (this.bList != null ) this.top.divide$com_falstad_Complex(this.bottom);
c.set$com_falstad_Complex(this.top);
});

Clazz.newMeth(C$, 'run$DA$DA$I$I$I$DA', function (inBuf, outBuf, bp, mask, count, state) {
var j;
var fi2 = bp;
var i20;
var q = 0;
var i2;
for (i2 = 0; i2 != count; i2++) {
fi2 = bp + i2;
i20 = fi2 & mask;
q = inBuf[i20] * this.aList[0];
if (this.bList == null ) {
for (j = 1; j < this.aList.length; j++) {
var ji = (fi2 - this.nList[j]) & mask;
q += inBuf[ji] * this.aList[j];
}
} else {
for (j = 1; j < this.aList.length; j++) {
var ji = (fi2 - this.nList[j]) & mask;
q += inBuf[ji] * this.aList[j] - outBuf[ji] * this.bList[j];
}
}outBuf[i20] = q;
}
});

Clazz.newMeth(C$, 'isSimpleAList', function () {
if (this.bList != null ) return false;
return this.nList[this.nList.length - 1] == this.nList.length - 1;
});

Clazz.newMeth(C$, 'getImpulseOffset', function () {
if (this.isSimpleAList()) return 0;
return this.getStepOffset();
});

Clazz.newMeth(C$, 'getStepOffset', function () {
var i;
var offset = 0;
for (i = 0; i != this.aList.length; i++) if (this.nList[i] > offset) offset = this.nList[i];

return offset;
});

Clazz.newMeth(C$, 'getImpulseResponse$I', function (offset) {
if (this.isSimpleAList()) return this.aList;
return C$.superclazz.prototype.getImpulseResponse$I.apply(this, [offset]);
});

Clazz.newMeth(C$, 'getImpulseLen$I$DA', function (offset, buf) {
if (this.isSimpleAList()) return this.aList.length;
return this.b$['com.falstad.VowelFrame'].countPoints$DA$I(buf, offset);
});
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "CascadeFilter", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.Filter']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.a1 = null;
this.a2 = null;
this.b0 = null;
this.b1 = null;
this.b2 = null;
this.size = 0;
this.cm2 = null;
this.cm1 = null;
this.top = null;
this.bottom = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I', function (s) {
Clazz.super_(C$, this,1);
this.size = s;
this.a1 = Clazz.array(Double.TYPE, [s]);
this.a2 = Clazz.array(Double.TYPE, [s]);
this.b0 = Clazz.array(Double.TYPE, [s]);
this.b1 = Clazz.array(Double.TYPE, [s]);
this.b2 = Clazz.array(Double.TYPE, [s]);
var i;
for (i = 0; i != s; i++) this.b0[i] = 1;

}, 1);

Clazz.newMeth(C$, 'createState', function () {
return Clazz.array(Double.TYPE, [this.size * 3]);
});

Clazz.newMeth(C$, 'setAStage$D$D', function (x1, x2) {
var i;
for (i = 0; i != this.size; i++) {
if (this.a1[i] == 0  && this.a2[i] == 0  ) {
this.a1[i] = x1;
this.a2[i] = x2;
return;
}if (this.a2[i] == 0  && x2 == 0  ) {
this.a2[i] = -this.a1[i] * x1;
this.a1[i] += x1;
return;
}}
System.out.println$S("setAStage failed");
});

Clazz.newMeth(C$, 'setBStage$D$D$D', function (x0, x1, x2) {
var i;
for (i = 0; i != this.size; i++) {
if (this.b1[i] == 0  && this.b2[i] == 0  ) {
this.b0[i] = x0;
this.b1[i] = x1;
this.b2[i] = x2;
return;
}if (this.b2[i] == 0  && x2 == 0  ) {
this.b2[i] = this.b1[i] * x1;
this.b1[i] = this.b1[i] * x0 + this.b0[i] * x1;
this.b0[i] *= x0;
return;
}}
System.out.println$S("setBStage failed");
});

Clazz.newMeth(C$, 'run$DA$DA$I$I$I$DA', function (inBuf, outBuf, bp, mask, count, state) {
var fi2;
var i20;
var i2;
var j;
var $in = 0;
var d2;
var d1;
var d0;
for (i2 = 0; i2 != count; i2++) {
fi2 = bp + i2;
i20 = fi2 & mask;
$in = inBuf[i20];
for (j = 0; j != this.size; j++) {
var j3 = j * 3;
d2 = state[j3 + 2] = state[j3 + 1];
d1 = state[j3 + 1] = state[j3];
d0 = state[j3] = $in + this.a1[j] * d1 + this.a2[j] * d2;
$in = this.b0[j] * d0 + this.b1[j] * d1 + this.b2[j] * d2;
}
outBuf[i20] = $in;
}
});

Clazz.newMeth(C$, 'evalTransfer$com_falstad_Complex', function (c) {
if (this.cm1 == null ) {
this.cm1 = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))));
this.cm2 = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))));
this.top = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))));
this.bottom = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))));
}var i;
this.cm1.set$com_falstad_Complex(c);
this.cm1.recip();
this.cm2.set$com_falstad_Complex(this.cm1);
this.cm2.square();
c.setRe$D(1);
for (i = 0; i != this.size; i++) {
this.top.setRe$D(this.b0[i]);
this.top.scaleAdd$D$com_falstad_Complex(this.b1[i], this.cm1);
this.top.scaleAdd$D$com_falstad_Complex(this.b2[i], this.cm2);
this.bottom.setRe$D(1);
this.bottom.scaleAdd$D$com_falstad_Complex(-this.a1[i], this.cm1);
this.bottom.scaleAdd$D$com_falstad_Complex(-this.a2[i], this.cm2);
c.mult$com_falstad_Complex(this.top);
c.divide$com_falstad_Complex(this.bottom);
}
});

Clazz.newMeth(C$, 'getImpulseOffset', function () {
return 0;
});

Clazz.newMeth(C$, 'getStepOffset', function () {
return 0;
});

Clazz.newMeth(C$, 'getLength', function () {
return 1;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "FilterType", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'select', function () {
return 0;
});

Clazz.newMeth(C$, 'setup', function () {
});

Clazz.newMeth(C$, 'getPoleCount', function () {
return 0;
});

Clazz.newMeth(C$, 'getZeroCount', function () {
return 0;
});

Clazz.newMeth(C$, 'getPole$I$com_falstad_Complex', function (i, c) {
c.setRe$D(0);
});

Clazz.newMeth(C$, 'getZero$I$com_falstad_Complex', function (i, c) {
c.setRe$D(0);
});

Clazz.newMeth(C$, 'getInfo$SA', function (x) {
});

Clazz.newMeth(C$, 'needsWindow', function () {
return false;
});

Clazz.newMeth(C$, 'setCutoff$D', function (f) {
this.b$['com.falstad.VowelFrame'].auxBars[0].setValue$I(((2000 * f)|0));
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "FIRFilterType", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.FilterType']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.response = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getResponse$D$com_falstad_Complex', function (w, c) {
if (this.response == null ) {
c.setRe$D(0);
return;
}var off = ((this.response.length * w / 6.283185307179586)|0);
off = off&(-2);
if (off < 0) off = 0;
if (off >= this.response.length) off = this.response.length - 2;
c.setReIm$D$D(this.response[off], this.response[off + 1]);
});

Clazz.newMeth(C$, 'getWindow$I$I', function (i, n) {
if (n == 1) return 1;
var x = 2 * 3.141592653589793 * i  / (n - 1);
var n2 = (n/2|0);
switch (this.b$['com.falstad.VowelFrame'].windowChooser.getSelectedIndex()) {
case 0:
return 1;
case 1:
return 0.54 - 0.46 * Math.cos(x);
case 2:
return 0.5 - 0.5 * Math.cos(x);
case 3:
return 0.42 - 0.5 * Math.cos(x) + 0.08 * Math.cos(2 * x);
case 4:
{
var kaiserAlphaPi = this.b$['com.falstad.VowelFrame'].kaiserBar.getValue() * 3.141592653589793 / 120.0;
var q = (2 * i / n) - 1;
return this.b$['com.falstad.VowelFrame'].bessi0$D(kaiserAlphaPi * Math.sqrt(1 - q * q));
}case 5:
return (i < n2 ) ? i / n2 : 2 - i / n2;
case 6:
{
var xt = (i - n2) / n2;
return 1 - xt * xt;
}}
return 0;
});

Clazz.newMeth(C$, 'setResponse$com_falstad_VowelFrame_DirectFilter', function (f) {
this.setResponse$com_falstad_VowelFrame_DirectFilter$D(f, 0);
});

Clazz.newMeth(C$, 'setResponse$com_falstad_VowelFrame_DirectFilter$D', function (f, offset) {
this.response = Clazz.array(Double.TYPE, [8192]);
var i;
if (f.nList.length != f.aList.length) {
f.nList = Clazz.array(Integer.TYPE, [f.aList.length]);
for (i = 0; i != f.aList.length; i++) f.nList[i] = i;

}for (i = 0; i != f.aList.length; i++) this.response[f.nList[i] * 2] = f.aList[i];

Clazz.new_((I$[3]||(I$[3]=Clazz.load('com.falstad.FFT'))).c$$I,[(this.response.length/2|0)]).transform$DA$Z(this.response, false);
var maxresp = 0;
var j;
var c1 = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))));
for (j = 0; j != this.response.length; j = j+(2)) {
c1.setReIm$D$D(this.response[j], this.response[j + 1]);
c1.rotate$D(-offset * 2 * 3.141592653589793 * j  / this.response.length);
var ms = c1.magSquared();
if (maxresp < ms ) maxresp = ms;
this.response[j] = c1.re;
this.response[j + 1] = c1.im;
}
maxresp = Math.sqrt(maxresp);
for (j = 0; j != this.response.length; j++) this.response[j] /= maxresp;

for (j = 0; j != f.aList.length; j++) f.aList[j] /= maxresp;

});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "PipeFIRFilter", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.FIRFilterType']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.VowelFrame'].auxLabels[0].setText$S("Total Length");
this.b$['com.falstad.VowelFrame'].auxBars[0].setValue$I(176);
this.b$['com.falstad.VowelFrame'].auxBars[0].setMaximum$I(1000);
return 1;
});

Clazz.newMeth(C$, 'compressedPipeResponse$DA$DA', function (arr, resp) {
var i;
var n;
var last = -1;
for (i = n = 0; i != arr.length; i++) {
if (arr[i] != last ) n++;
last = arr[i];
}
var x = Clazz.array(Double.TYPE, [n]);
var count = Clazz.array(Integer.TYPE, [n + 1]);
last = -1;
count[0] = 0;
for (i = n = 0; i != arr.length; i++) {
if (arr[i] != last ) last = x[n++] = arr[i];
count[n] = i;
}
this.b$['com.falstad.VowelFrame'].genPipeResponse$DA$D$IA$DA$com_falstad_ComplexA(x, (this.b$['com.falstad.VowelFrame'].sampleRate/2|0), count, resp, null);
});

Clazz.newMeth(C$, 'genFilter', function () {
var rlen = 16;
var n = 256;
while (rlen < n)rlen = rlen*(2);

var resp = Clazz.array(Double.TYPE, [rlen]);
this.b$['com.falstad.VowelFrame'].pipeLen = this.b$['com.falstad.VowelFrame'].auxBars[0].getValue() / 1000.0;
if (this.b$['com.falstad.VowelFrame'].compressCheck.getState()) this.compressedPipeResponse$DA$DA(this.b$['com.falstad.VowelFrame'].pipeRadius, resp);
 else {
var ll = Clazz.array(Integer.TYPE, [this.b$['com.falstad.VowelFrame'].pipeRadius.length + 1]);
var i;
for (i = 0; i != ll.length; i++) ll[i] = i;

this.b$['com.falstad.VowelFrame'].genPipeResponse$DA$D$IA$DA$com_falstad_ComplexA(this.b$['com.falstad.VowelFrame'].pipeRadius, (this.b$['com.falstad.VowelFrame'].sampleRate/2|0), ll, resp, null);
}var nsz = resp.length * 4;
var fbuf = Clazz.array(Double.TYPE, [nsz]);
var i;
var nsz2 = (nsz/2|0);
var nsz4 = (nsz2/2|0);
for (i = 0; i != nsz4; i++) {
var ur = resp[i] / nsz2;
fbuf[i * 2] = ur;
if (i > 0) fbuf[nsz - i * 2] = ur;
}
Clazz.new_((I$[3]||(I$[3]=Clazz.load('com.falstad.FFT'))).c$$I,[nsz2]).transform$DA$Z(fbuf, true);
var f = Clazz.new_((I$[4]||(I$[4]=Clazz.load(Clazz.load('com.falstad.VowelFrame').DirectFilter))), [this, null]);
f.aList = Clazz.array(Double.TYPE, [n]);
f.nList = Clazz.array(Integer.TYPE, [n]);
for (i = 0; i != n; i++) {
var i2 = (i - (n/2|0)) * 2;
f.aList[i] = fbuf[i2 & (nsz - 1)] * this.getWindow$I$I(i, n);
f.nList[i] = i;
}
this.setResponse$com_falstad_VowelFrame_DirectFilter$D(f, (n/2|0));
return f;
});

Clazz.newMeth(C$, 'getInfo$SA', function (x) {
x[0] = "Length: " + this.b$['com.falstad.VowelFrame'].auxBars[0].getValue() + " mm" ;
});

Clazz.newMeth(C$, 'areaToRadius$D', function (x) {
return Math.sqrt(x / 3.141592653589793);
});

Clazz.newMeth(C$, 'needsWindow', function () {
return true;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "IBarVowelFilter", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.PipeFIRFilter']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.data = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.data = Clazz.array(Double.TYPE, -1, [6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.42857, 2.83929, 2.73214, 3.13393, 3.29464, 3.45536, 3.45536, 4.58036, 5.49107, 6.45536, 6.96429, 7.33929, 7.66071, 7.84821, 8.03571, 8.19643, 8.30357, 8.38393, 8.41071, 8.38393, 8.35714, 8.25, 8.14286, 8.14286, 7.98214, 7.82143, 7.58036, 7.3125, 6.75, 6.02679, 5.22321, 4.6875, 4.28571, 3.96429, 3.66964, 3.40179, 3.13393, 2.91964, 2.75893, 2.625, 2.625, 2.51786, 2.4375, 2.35714, 2.27679, 2.19643, 2.11607, 2.0625, 2.00893, 1.95536, 1.875, 1.79464, 1.71429, 1.66071, 1.60714, 1.52679, 1.52679, 1.47321, 1.41964, 1.36607, 1.3125, 1.25893, 1.20536, 1.15179, 1.125, 1.09821, 1.07143, 1.04464, 1.04464, 1.01786, 1.01786, 1.01786, 1.01786, 1.01786, 1.04464, 1.09821, 1.15179, 1.17857, 1.23214, 1.28571, 1.39286, 1.47321, 1.60714, 1.76786, 1.95536, 2.16964, 2.35714, 2.46429, 2.51786, 2.35714, 2.35714, 2.0625, 1.79464, 1.71429, 1.79464, 2.86607, 3.375, 3.85714, 4.125, 4.33929, 4.55357, 4.76786, 4.92857, 5.11607, 5.30357, 5.46429, 5.46429, 5.59821, 5.75893, 5.89286, 6.10714, 6.26786, 6.42857, 6.61607, 6.75, 6.96429, 7.125, 7.25893, 7.47321, 7.6875, 7.875, 8.08929, 8.33036, 8.33036, 8.625, 8.83929, 9.13393, 9.375, 9.58929, 9.80357, 10.0179, 10.1786, 10.3125, 10.4196, 10.5, 10.6071, 10.6607, 10.7143, 10.7679, 10.8482, 10.8482, 10.875, 10.9018, 10.9286, 10.9821, 10.9821, 11.0089, 11.0089, 11.0357, 11.0357, 11.0625, 11.0357, 11.0625, 11.0625, 11.0625, 11.0625, 11.0625, 11.0625, 11.0893, 11.0893, 11.0893, 11.0893, 11.0625, 11.0625, 11.1161, 11.0893, 11.0625, 11.0625, 11.0625, 10.9018, 3.58929, 3.375, 3.21429, 3.21429, 3.13393, 3.08036, 3.05357, 3.02679, 3.02679, 3.02679, 3, 3.02679, 3.02679, 3, 3, 3, 2.97321, 2.94643, 2.97321]);
}, 1);

Clazz.newMeth(C$, 'select', function () {
var r = C$.superclazz.prototype.select.apply(this, []);
var i;
for (i = 0; i != this.b$['com.falstad.VowelFrame'].pipeRadius.length; i++) this.b$['com.falstad.VowelFrame'].pipeRadius[this.b$['com.falstad.VowelFrame'].pipeRadius.length - 1 - i ] = this.areaToRadius$D(this.data[i]);

this.b$['com.falstad.VowelFrame'].auxBars[r - 1].setValue$I(190);
return r;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "IVowelFilter", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.PipeFIRFilter']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.data = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.data = Clazz.array(Double.TYPE, -1, [8.74254, 8.74254, 7.71642, 7.18284, 6.64925, 5.99254, 4.96642, 4.63806, 4.55597, 4.43284, 4.02239, 2.95522, 2.87313, 2.83209, 2.83209, 2.83209, 2.83209, 2.79104, 2.25746, 1.76493, 1.76493, 1.76493, 1.68284, 1.64179, 1.60075, 1.5597, 1.47761, 1.35448, 1.31343, 1.1903, 1.10821, 1.10821, 1.02612, 0.985075, 0.94403, 0.86194, 0.779851, 0.738806, 0.656716, 0.656716, 0.656716, 0.656716, 0.574627, 0.574627, 0.574627, 0.574627, 0.574627, 0.574627, 0.574627, 0.574627, 0.574627, 0.574627, 0.615672, 0.615672, 0.615672, 0.615672, 0.574627, 0.574627, 0.574627, 0.574627, 0.615672, 0.656716, 0.615672, 0.615672, 0.656716, 0.697761, 0.697761, 0.697761, 0.697761, 0.738806, 0.779851, 0.779851, 0.820896, 0.779851, 0.779851, 0.902985, 0.902985, 0.985075, 1.10821, 1.23134, 1.39552, 1.51866, 1.72388, 1.84701, 2.05224, 2.17537, 2.42164, 2.66791, 2.87313, 3.20149, 3.5709, 3.65299, 4.06343, 4.39179, 4.72015, 5.37687, 5.66418, 6.15672, 6.85448, 7.01866, 7.34701, 7.4291, 7.55224, 7.71642, 7.79851, 7.79851, 7.75746, 7.71642, 7.59328, 7.47015, 7.30597, 7.22388, 7.34701, 7.79851, 9.11194, 10.0149, 10.2612, 10.5075, 10.8358, 10.8769, 10.9179, 10.959, 11, 11.041, 11, 11.041, 11.041, 11.041, 11.041, 11.041, 11.041, 11.041, 11.041, 11.041, 11.041, 11, 10.959, 10.9179, 10.8358, 10.7948, 10.7127, 10.6306, 10.5075, 10.4664, 10.3433, 10.2612, 10.1381, 10.056, 10.056, 9.85075, 9.72761, 9.64552, 9.52239, 9.39925, 9.35821, 9.27612, 9.19403, 9.11194, 9.02985, 8.94776, 8.86567, 8.78358, 8.74254, 8.66045, 8.66045, 8.53731, 8.45522, 8.37313, 8.33209, 8.29104, 8.25, 8.20896, 8.20896, 8.20896, 8.16791, 8.16791, 8.12687, 8.08582, 8.04478, 7.83955, 2.87313, 2.62687, 2.54478, 2.54478, 2.46269, 2.42164, 2.46269, 2.46269, 2.46269, 2.54478, 2.58582, 2.66791, 2.66791, 2.75, 2.79104, 2.83209, 2.87313, 2.91418, 2.99627, 3.03731]);
}, 1);

Clazz.newMeth(C$, 'select', function () {
var bars = C$.superclazz.prototype.select.apply(this, []);
var i;
for (i = 0; i != this.b$['com.falstad.VowelFrame'].pipeRadius.length; i++) this.b$['com.falstad.VowelFrame'].pipeRadius[this.b$['com.falstad.VowelFrame'].pipeRadius.length - 1 - i ] = this.areaToRadius$D(this.data[i]);

this.b$['com.falstad.VowelFrame'].auxBars[bars - 1].setValue$I(170);
return bars;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "EVowelFilter", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.PipeFIRFilter']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.data = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.data = Clazz.array(Double.TYPE, -1, [10.2, 10.2, 10.2, 9.31174, 8.98785, 8.70445, 8.54251, 8.34008, 7.85425, 5.91093, 5.34413, 5.26316, 5.18219, 5.06073, 4.97976, 4.93927, 4.93927, 4.97976, 5.06073, 5.10121, 5.10121, 5.06073, 5.06073, 4.89879, 4.69636, 4.49393, 4.21053, 4.0081, 3.80567, 3.64372, 3.48178, 3.15789, 2.99595, 2.67206, 2.46964, 2.38866, 2.26721, 2.14575, 2.14575, 2.10526, 2.10526, 2.18623, 2.18623, 2.30769, 2.34818, 2.42915, 2.46964, 2.55061, 2.63158, 2.67206, 2.75304, 2.83401, 2.95547, 2.99595, 3.07692, 3.19838, 3.23887, 3.23887, 3.36032, 3.4413, 3.56275, 3.56275, 3.64372, 3.64372, 3.7247, 3.80567, 3.84615, 3.92713, 4.0081, 4.04858, 4.12955, 4.17004, 4.21053, 4.33198, 4.41296, 4.49393, 4.49393, 4.5749, 4.65587, 4.69636, 4.77733, 4.8583, 4.89879, 5.06073, 5.26316, 5.30364, 5.4251, 5.66802, 5.78947, 6.03239, 6.11336, 6.31579, 6.51822, 6.63968, 6.80162, 6.92308, 7.12551, 7.24696, 7.36842, 7.40891, 7.40891, 7.40891, 7.32794, 7.20648, 7.04453, 6.80162, 6.72065, 6.80162, 6.92308, 7.32794, 7.85425, 8.25911, 8.8664, 9.06883, 9.4332, 9.55466, 9.67611, 9.79757, 9.79757, 9.87854, 9.91903, 9.95951, 9.95951, 10, 9.95951, 9.95951, 9.95951, 9.95951, 9.91903, 9.87854, 9.83806, 9.79757, 9.75709, 9.67611, 9.63563, 9.55466, 9.47368, 9.39271, 9.35223, 9.23077, 9.19028, 9.1498, 8.98785, 8.82591, 8.70445, 8.66397, 8.54251, 8.34008, 8.13765, 7.93522, 7.85425, 7.69231, 7.65182, 7.53036, 7.36842, 7.16599, 7.08502, 6.96356, 6.84211, 6.72065, 6.43725, 6.35628, 6.23482, 6.19433, 6.07287, 6.03239, 5.9919, 5.9919, 5.95142, 5.91093, 5.95142, 5.91093, 5.91093, 5.95142, 5.95142, 5.95142, 5.54656, 1.53846, 1.417, 1.417, 1.417, 1.417, 1.417, 1.45749, 1.53846, 1.61943, 1.61943, 1.65992, 1.78138, 1.78138, 1.94332, 2.06478, 2.14575, 2.22672, 2.30769, 2.38866, 2.51012, 2.59109, 2.63158, 2.75304]);
}, 1);

Clazz.newMeth(C$, 'select', function () {
var bars = C$.superclazz.prototype.select.apply(this, []);
var i;
for (i = 0; i != this.b$['com.falstad.VowelFrame'].pipeRadius.length; i++) this.b$['com.falstad.VowelFrame'].pipeRadius[this.b$['com.falstad.VowelFrame'].pipeRadius.length - 1 - i ] = this.areaToRadius$D(this.data[i]);

this.b$['com.falstad.VowelFrame'].auxBars[bars - 1].setValue$I(170);
return bars;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "OpenTubeFilter", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.PipeFIRFilter']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'select', function () {
var bars = C$.superclazz.prototype.select.apply(this, []);
var i;
for (i = 0; i != this.b$['com.falstad.VowelFrame'].pipeRadius.length; i++) this.b$['com.falstad.VowelFrame'].pipeRadius[i] = this.areaToRadius$D(6.5);

return bars;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "CustomFilter", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.PipeFIRFilter']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'select', function () {
var bars = C$.superclazz.prototype.select.apply(this, []);
this.b$['com.falstad.VowelFrame'].auxBars[0].setValue$I(((this.b$['com.falstad.VowelFrame'].pipeLen * 1000)|0));
return bars;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "AVowelFilter", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.PipeFIRFilter']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.data = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.data = Clazz.array(Double.TYPE, -1, [6.08276, 6.08276, 6.08276, 6.08276, 6.08276, 6.05379, 5.93793, 5.59034, 5.18483, 5.01103, 4.92414, 4.89517, 4.86621, 4.86621, 4.86621, 4.86621, 4.86621, 4.89517, 4.9531, 5.04, 5.18483, 5.38759, 5.67724, 5.93793, 6.14069, 6.31448, 6.48828, 6.6331, 6.74897, 6.89379, 7.00966, 7.09655, 7.24138, 7.35724, 7.44414, 7.53103, 7.6469, 7.73379, 7.79172, 7.87862, 7.93655, 7.96552, 8.02345, 8.05241, 8.11034, 8.13931, 8.19724, 8.19724, 8.25517, 8.28414, 8.34207, 8.37103, 8.37103, 8.4, 8.42897, 8.4, 8.4, 8.4, 8.34207, 8.3131, 8.28414, 8.22621, 8.16828, 8.13931, 8.05241, 7.99448, 7.93655, 7.84966, 7.79172, 7.70483, 7.6469, 7.50207, 7.38621, 7.27034, 7.12552, 6.98069, 6.89379, 6.77793, 6.60414, 6.43034, 6.25655, 6.08276, 5.93793, 5.73517, 5.56138, 5.38759, 5.21379, 5.09793, 4.89517, 4.69241, 4.54759, 4.31586, 4.02621, 3.82345, 3.64966, 3.36, 3.09931, 2.86759, 2.54897, 2.17241, 1.85379, 1.73793, 1.68, 1.73793, 1.96966, 2.11448, 2.57793, 2.75172, 2.95448, 3.07034, 3.04138, 3.04138, 2.98345, 2.89655, 2.78069, 2.66483, 2.52, 2.37517, 2.28828, 2.17241, 2.02759, 1.96966, 1.88276, 1.79586, 1.68, 1.65103, 1.53517, 1.47724, 1.39034, 1.30345, 1.21655, 1.12966, 1.04276, 1.04276, 0.984828, 0.955862, 0.926897, 0.926897, 0.868966, 0.868966, 0.811034, 0.811034, 0.724138, 0.782069, 0.811034, 0.84, 0.811034, 0.868966, 0.868966, 0.84, 0.897931, 0.926897, 0.926897, 0.984828, 1.04276, 1.07172, 1.15862, 1.24552, 1.30345, 1.36138, 1.50621, 1.5931, 1.7669, 1.82483, 2.02759, 2.17241, 2.4331, 2.54897, 2.80966, 3.04138, 3.36, 3.50483, 3.67862, 3.85241, 4.02621, 4.08414, 4.05517, 3.99724, 3.09931, 1.44828, 1.36138, 1.33241, 1.36138, 1.36138, 1.44828, 1.47724, 1.53517, 1.56414, 1.65103, 1.73793, 1.82483, 1.91172, 1.99862, 2.11448, 2.17241, 2.25931, 2.37517, 2.46207, 2.54897, 2.63586]);
}, 1);

Clazz.newMeth(C$, 'select', function () {
var bars = C$.superclazz.prototype.select.apply(this, []);
this.b$['com.falstad.VowelFrame'].auxBars[bars - 1].setValue$I(190);
this.b$['com.falstad.VowelFrame'].auxLabels[bars].setText$S("Pharynx Width");
this.b$['com.falstad.VowelFrame'].auxBars[bars].setValue$I(100);
this.b$['com.falstad.VowelFrame'].auxBars[bars].setMaximum$I(200);
this.b$['com.falstad.VowelFrame'].auxLabels[bars + 1].setText$S("Mouth Width");
this.b$['com.falstad.VowelFrame'].auxBars[bars + 1].setValue$I(100);
this.b$['com.falstad.VowelFrame'].auxBars[bars + 1].setMaximum$I(200);
return bars + 2;
});

Clazz.newMeth(C$, 'genFilter', function () {
var i;
var pw = this.b$['com.falstad.VowelFrame'].auxBars[1].getValue() / 100.0;
var mw = this.b$['com.falstad.VowelFrame'].auxBars[2].getValue() / 100.0;
for (i = 0; i != 100; i++) this.b$['com.falstad.VowelFrame'].pipeRadius[this.b$['com.falstad.VowelFrame'].pipeRadius.length - 1 - i ] = this.areaToRadius$D(this.data[i]) * mw;

for (; i != this.b$['com.falstad.VowelFrame'].pipeRadius.length; i++) this.b$['com.falstad.VowelFrame'].pipeRadius[this.b$['com.falstad.VowelFrame'].pipeRadius.length - 1 - i ] = this.areaToRadius$D(this.data[i]) * pw;

return C$.superclazz.prototype.genFilter.apply(this, []);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "AVowelFilterSimple", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.PipeFIRFilter']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
this.b$['com.falstad.VowelFrame'].auxLabels[1].setText$S("1st Section Length");
this.b$['com.falstad.VowelFrame'].auxBars[1].setValue$I(109);
this.b$['com.falstad.VowelFrame'].auxBars[1].setMaximum$I(200);
return 2;
});

Clazz.newMeth(C$, 'genFilter', function () {
var i;
for (i = 0; i < this.b$['com.falstad.VowelFrame'].auxBars[1].getValue(); i++) this.b$['com.falstad.VowelFrame'].pipeRadius[i] = this.areaToRadius$D(1);

for (; i != this.b$['com.falstad.VowelFrame'].pipeRadius.length; i++) this.b$['com.falstad.VowelFrame'].pipeRadius[i] = this.areaToRadius$D(8);

return C$.superclazz.prototype.genFilter.apply(this, []);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "AEVowelFilterSimple", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.AVowelFilterSimple']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
this.b$['com.falstad.VowelFrame'].auxBars[1].setValue$I(66);
return 2;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "OVowelFilter", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.PipeFIRFilter']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.data = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.data = Clazz.array(Double.TYPE, -1, [3.8, 3.8, 3.8, 3.86077, 3.53659, 3.4187, 3.35976, 3.30081, 3.30081, 3.24187, 3.33028, 3.38923, 3.59553, 3.89024, 4.15549, 4.30285, 4.56809, 4.8628, 5.03963, 6.07114, 7.39736, 8.4878, 9.75508, 10.6687, 11.1402, 11.8476, 12.6138, 13.3506, 13.4685, 13.7632, 13.9695, 14.1169, 14.2053, 14.3526, 14.4116, 14.5, 14.5, 14.5, 14.5, 14.4411, 14.3526, 14.2348, 13.999, 13.2033, 12.4959, 11.9949, 11.5528, 11.1697, 10.9929, 10.6982, 10.4329, 10.2856, 10.0793, 9.93191, 9.78455, 9.60772, 9.46037, 9.25407, 9.13618, 8.98882, 8.87093, 8.72358, 8.57622, 8.42886, 8.2815, 8.10467, 7.92785, 7.78049, 7.63313, 7.54472, 7.33841, 7.22053, 7.10264, 6.98476, 6.80793, 6.6311, 6.4248, 6.30691, 6.18902, 6.04167, 5.89431, 5.77642, 5.59959, 5.42276, 5.33435, 5.18699, 5.06911, 4.95122, 4.83333, 4.68598, 4.56809, 4.4502, 4.33232, 4.21443, 4.06707, 3.89024, 3.74289, 3.50711, 3.38923, 3.15346, 3.03557, 2.77033, 2.44614, 2.21037, 1.91565, 1.76829, 1.73882, 1.79776, 2.18089, 2.74085, 2.88821, 2.91768, 2.91768, 2.82927, 2.74085, 2.41667, 2.18089, 1.85671, 1.70935, 1.47358, 1.35569, 1.26728, 1.2378, 1.20833, 1.17886, 1.17886, 1.14939, 1.17886, 1.14939, 1.14939, 1.17886, 1.14939, 1.17886, 1.17886, 1.17886, 1.17886, 1.17886, 1.17886, 1.20833, 1.20833, 1.2378, 1.26728, 1.29675, 1.35569, 1.38516, 1.47358, 1.50305, 1.56199, 1.62093, 1.70935, 1.79776, 1.85671, 1.94512, 2.06301, 2.06301, 2.18089, 2.26931, 2.3872, 2.50508, 2.5935, 2.74085, 2.88821, 3.06504, 3.24187, 3.38923, 3.56606, 3.74289, 3.97866, 4.09654, 4.21443, 4.36179, 4.59756, 4.74492, 4.89228, 5.06911, 5.18699, 5.27541, 5.48171, 5.54065, 5.57012, 5.54065, 5.09858, 2.56402, 1.88618, 1.70935, 1.73882, 1.70935, 1.73882, 1.76829, 1.79776, 1.82724, 1.85671, 1.94512, 2.00407, 2.06301, 2.15142, 2.23984, 2.29878, 2.35772, 2.53455]);
}, 1);

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
var i;
for (i = 0; i != this.b$['com.falstad.VowelFrame'].pipeRadius.length; i++) this.b$['com.falstad.VowelFrame'].pipeRadius[this.b$['com.falstad.VowelFrame'].pipeRadius.length - 1 - i ] = this.areaToRadius$D(this.data[i]);

this.b$['com.falstad.VowelFrame'].auxBars[1].setValue$I(190);
return 2;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "UVowelFilter", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.PipeFIRFilter']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.data = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.data = Clazz.array(Double.TYPE, -1, [0.975787, 1.57385, 0.94431, 0.661017, 0.535109, 0.440678, 0.440678, 0.377724, 0.346247, 0.31477, 0.346247, 0.409201, 0.472155, 0.62954, 0.849879, 1.07022, 1.32203, 1.66828, 2.14044, 2.48668, 2.83293, 3.1477, 3.52542, 3.93462, 4.31235, 5.50847, 7.77482, 9.8523, 10.6392, 11.1429, 11.4262, 11.7409, 12.0872, 12.276, 12.4649, 12.5908, 12.6852, 12.7797, 12.8426, 12.8741, 12.9685, 13.0315, 13.063, 13.063, 13.063, 13.063, 13, 12.937, 12.8741, 12.6538, 12.3705, 12.0872, 11.4576, 10.6077, 9.75787, 9.19128, 8.78208, 8.49879, 8.05811, 7.77482, 7.49153, 7.23971, 6.95642, 6.67312, 6.42131, 6.23245, 5.94915, 5.69734, 5.50847, 5.31961, 5.13075, 4.75303, 4.62712, 4.40678, 4.12349, 3.93462, 3.80872, 3.65133, 3.36804, 3.21065, 3.08475, 2.92736, 2.83293, 2.70702, 2.61259, 2.54964, 2.45521, 2.42373, 2.39225, 2.3293, 2.3293, 2.29782, 2.29782, 2.3293, 2.3293, 2.3293, 2.3293, 2.29782, 2.26634, 2.20339, 2.10896, 1.95157, 1.79419, 1.47942, 1.29056, 1.29056, 1.44794, 2.046, 2.42373, 2.58111, 2.64407, 2.64407, 2.54964, 2.42373, 2.29782, 2.14044, 1.95157, 1.85714, 1.76271, 1.66828, 1.57385, 1.47942, 1.41646, 1.35351, 1.29056, 1.29056, 1.25908, 1.2276, 1.2276, 1.2276, 1.25908, 1.32203, 1.32203, 1.35351, 1.38499, 1.47942, 1.5109, 1.57385, 1.66828, 1.79419, 1.88862, 2.01453, 2.17191, 2.39225, 2.58111, 2.86441, 3.1477, 3.52542, 3.99758, 4.46973, 4.97337, 5.50847, 5.98063, 6.32688, 6.76755, 7.08232, 7.36562, 7.64891, 7.90073, 8.15254, 8.3414, 8.43584, 8.56174, 8.65617, 8.75061, 8.81356, 8.87651, 8.97094, 9.00242, 9.0339, 9.06538, 9.09685, 9.12833, 9.12833, 9.15981, 9.15981, 9.15981, 9.15981, 9.15981, 9.12833, 7.49153, 3.1477, 2.76998, 2.61259, 2.54964, 2.51816, 2.51816, 2.54964, 2.58111, 2.61259, 2.67554, 2.70702, 2.7385, 2.80145, 2.86441, 2.92736, 2.95884, 2.99031, 3.05327, 3.08475]);
}, 1);

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
var i;
for (i = 0; i != this.b$['com.falstad.VowelFrame'].pipeRadius.length; i++) this.b$['com.falstad.VowelFrame'].pipeRadius[this.b$['com.falstad.VowelFrame'].pipeRadius.length - 1 - i ] = this.areaToRadius$D(this.data[i]);

this.b$['com.falstad.VowelFrame'].auxBars[1].setValue$I(190);
return 2;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "YVowelFilterSimple", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.PipeFIRFilter']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
this.b$['com.falstad.VowelFrame'].auxLabels[1].setText$S("1st Section Length");
this.b$['com.falstad.VowelFrame'].auxBars[1].setValue$I(100);
this.b$['com.falstad.VowelFrame'].auxBars[1].setMaximum$I(200);
return 2;
});

Clazz.newMeth(C$, 'genFilter', function () {
var i;
for (i = 0; i < this.b$['com.falstad.VowelFrame'].auxBars[1].getValue(); i++) this.b$['com.falstad.VowelFrame'].pipeRadius[i] = this.areaToRadius$D(8);

for (; i != this.b$['com.falstad.VowelFrame'].pipeRadius.length; i++) this.b$['com.falstad.VowelFrame'].pipeRadius[i] = this.areaToRadius$D(1);

return C$.superclazz.prototype.genFilter.apply(this, []);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "IVowelFilterSimple", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.YVowelFilterSimple']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
this.b$['com.falstad.VowelFrame'].auxBars[0].setValue$I(145);
this.b$['com.falstad.VowelFrame'].auxBars[1].setValue$I(120);
return 2;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "UrVowelFilterSimple", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.YVowelFilterSimple']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
this.b$['com.falstad.VowelFrame'].auxBars[1].setValue$I(177);
return 2;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "IhVowelFilterSimple", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.PipeFIRFilter']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
this.b$['com.falstad.VowelFrame'].auxBars[0].setValue$I(160);
return 1;
});

Clazz.newMeth(C$, 'genFilter', function () {
var i;
for (i = 0; i < 37; i++) this.b$['com.falstad.VowelFrame'].pipeRadius[i] = this.areaToRadius$D(1);

for (; i < 112; i++) this.b$['com.falstad.VowelFrame'].pipeRadius[i] = this.areaToRadius$D(7);

for (; i != this.b$['com.falstad.VowelFrame'].pipeRadius.length; i++) this.b$['com.falstad.VowelFrame'].pipeRadius[i] = this.areaToRadius$D(1);

return C$.superclazz.prototype.genFilter.apply(this, []);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "OoVowelFilterSimple", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.PipeFIRFilter']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
this.b$['com.falstad.VowelFrame'].auxBars[0].setValue$I(180);
return 1;
});

Clazz.newMeth(C$, 'genFilter', function () {
var i;
for (i = 0; i < 33; i++) this.b$['com.falstad.VowelFrame'].pipeRadius[i] = this.areaToRadius$D(1);

for (; i < 88; i++) this.b$['com.falstad.VowelFrame'].pipeRadius[i] = this.areaToRadius$D(7);

for (; i < 122; i++) this.b$['com.falstad.VowelFrame'].pipeRadius[i] = this.areaToRadius$D(1);

for (; i < 177; i++) this.b$['com.falstad.VowelFrame'].pipeRadius[i] = this.areaToRadius$D(7);

for (; i != this.b$['com.falstad.VowelFrame'].pipeRadius.length; i++) this.b$['com.falstad.VowelFrame'].pipeRadius[i] = this.areaToRadius$D(1);

return C$.superclazz.prototype.genFilter.apply(this, []);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "NoFilter", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VowelFrame','com.falstad.VowelFrame.FilterType']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getResponse$D$com_falstad_Complex', function (w, c) {
c.setRe$D(1);
});

Clazz.newMeth(C$, 'genFilter', function () {
var f = Clazz.new_((I$[4]||(I$[4]=Clazz.load(Clazz.load('com.falstad.VowelFrame').DirectFilter))), [this, null]);
f.aList = Clazz.array(Double.TYPE, [1]);
f.aList[0] = 1;
return f;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "ImportDialogLayout", function(){
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
return Clazz.new_((I$[5]||(I$[5]=Clazz.load('java.awt.Dimension'))).c$$I$I,[500, 500]);
});

Clazz.newMeth(C$, 'minimumLayoutSize$java_awt_Container', function (target) {
return Clazz.new_((I$[5]||(I$[5]=Clazz.load('java.awt.Dimension'))).c$$I$I,[100, 100]);
});

Clazz.newMeth(C$, 'layoutContainer$java_awt_Container', function (target) {
var insets = target.insets();
var targetw = target.size().width - insets.left - insets.right ;
var targeth = target.size().height - (insets.top + insets.bottom);
var i;
var pw = 300;
if (target.getComponentCount() == 0) return;
var cl = target.getComponent$I(target.getComponentCount() - 1);
var dl = cl.getPreferredSize();
target.getComponent$I(0).move$I$I(insets.left, insets.top);
var cw = target.size().width - insets.left - insets.right ;
var ch = target.size().height - insets.top - insets.bottom - dl.height ;
target.getComponent$I(0).resize$I$I(cw, ch);
var h = ch + insets.top;
var x = 0;
for (i = 1; i < target.getComponentCount(); i++) {
var m = target.getComponent$I(i);
if (m.isVisible()) {
var d = m.getPreferredSize();
m.move$I$I(insets.left + x, h);
m.resize$I$I(d.width, d.height);
x = x+(d.width);
}}
});
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "ImportDialog", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, 'a2s.Dialog', 'java.awt.event.ActionListener');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.rframe = null;
this.importButton = null;
this.clearButton = null;
this.closeButton = null;
this.text = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$com_falstad_VowelFrame$S', function (f, str) {
C$.superclazz.c$$a2s_Frame$S$Z.apply(this, [f, (str.length$() > 0) ? "Export" : "Import", false]);
C$.$init$.apply(this);
this.rframe = f;
this.setLayout$java_awt_LayoutManager(Clazz.new_((I$[6]||(I$[6]=Clazz.load(Clazz.load('com.falstad.VowelFrame').ImportDialogLayout))), [this, null]));
this.add$java_awt_Component(this.text = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.TextArea'))).c$$S$I$I,[str, 10, 60]));
this.add$java_awt_Component(this.importButton = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Button'))).c$$S,["Import"]));
this.importButton.addActionListener$java_awt_event_ActionListener(this);
this.add$java_awt_Component(this.clearButton = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Button'))).c$$S,["Clear"]));
this.clearButton.addActionListener$java_awt_event_ActionListener(this);
this.add$java_awt_Component(this.closeButton = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Button'))).c$$S,["Close"]));
this.closeButton.addActionListener$java_awt_event_ActionListener(this);
var x = this.rframe.getLocationOnScreen();
this.resize$I$I(400, 300);
var d = this.getSize();
this.setLocation$I$I(x.x + ((this.b$['com.falstad.VowelFrame'].winSize.width - d.width)/2|0), x.y + ((this.b$['com.falstad.VowelFrame'].winSize.height - d.height)/2|0));
this.show();
if (str.length$() > 0) this.text.selectAll();
}, 1);

Clazz.newMeth(C$, 'actionPerformed$java_awt_event_ActionEvent', function (e) {
var i;
var src = e.getSource();
if (src === this.importButton ) {
this.rframe.readImport$S(this.text.getText());
this.setVisible$Z(false);
}if (src === this.closeButton ) this.setVisible$Z(false);
if (src === this.clearButton ) this.text.setText$S("");
});

Clazz.newMeth(C$, 'handleEvent$java_awt_Event', function (ev) {
if (ev.id == 201) {
this.rframe.requestFocus();
this.setVisible$Z(false);
return true;
}return C$.superclazz.prototype.handleEvent$java_awt_Event.apply(this, [ev]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "PlayThread", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, 'javajs.util.JSAudioThread', [['javajs.util.JSAudioThread','javajs.util.JSAudioThread.Owner']]);
var p$=C$.prototype;

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.wform = null;
this.stereo = false;
this.filt = null;
this.newFilter = null;
this.fbufLi = null;
this.fbufRi = null;
this.fbufLo = null;
this.fbufRo = null;
this.stateL = null;
this.stateR = null;
this.fbufmask = 0;
this.fbufsize = 0;
this.spectrumOffset = 0;
this.spectrumLen = 0;
this.inbp = 0;
this.outbp = 0;
this.spectCt = 0;
this.gainCounter = 0;
this.maxGain = false;
this.useConvolve = false;
this.ss = 0;
this.impulseBuf = null;
this.convolveBuf = null;
this.convBufPtr = 0;
this.convFFT = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.gainCounter = 0;
this.maxGain = true;
this.useConvolve = false;
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.b$['com.falstad.VowelFrame'].shutdownRequested = false;
}, 1);

Clazz.newMeth(C$, 'myInit', function () {
try {
this.owner = this;
this.b$['com.falstad.VowelFrame'].rateChooser.enable();
this.wform = this.b$['com.falstad.VowelFrame'].getWaveformObject();
this.b$['com.falstad.VowelFrame'].mp3Error = null;
this.b$['com.falstad.VowelFrame'].unstable = false;
if (!this.wform.start()) {
this.b$['com.falstad.VowelFrame'].cv.repaint();
return false;
}this.fbufsize = 32768;
this.fbufmask = this.fbufsize - 1;
this.fbufLi = Clazz.array(Double.TYPE, [this.fbufsize]);
this.fbufRi = Clazz.array(Double.TYPE, [this.fbufsize]);
this.fbufLo = Clazz.array(Double.TYPE, [this.fbufsize]);
this.fbufRo = Clazz.array(Double.TYPE, [this.fbufsize]);
p$.openLine.apply(this, []);
this.inbp = this.outbp = this.spectCt = 0;
this.b$['com.falstad.VowelFrame'].outputGain = 1;
this.newFilter = this.filt = this.b$['com.falstad.VowelFrame'].curFilter;
this.spectrumLen = this.b$['com.falstad.VowelFrame'].getPower2$I((this.b$['com.falstad.VowelFrame'].sampleRate/12|0));
this.audioBufferByteLength = 16384;
this.audioByteBuffer = Clazz.array(Byte.TYPE, [this.audioBufferByteLength]);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
e.printStackTrace();
return false;
} else {
throw e;
}
}
return true;
});

Clazz.newMeth(C$, 'checkSoundStatus', function () {
return !this.b$['com.falstad.VowelFrame'].shutdownRequested && this.b$['com.falstad.VowelFrame'].soundCheck.getState() && (this.b$['com.falstad.VowelFrame'].applet == null  || P$.Vowel.ogf != null  )  ;
});

Clazz.newMeth(C$, 'myLoop', function () {
if (this.newFilter != null ) {
this.line.flush();
this.gainCounter = 0;
this.maxGain = true;
if (Clazz.instanceOf(this.wform, "com.falstad.VowelFrame.SweepWaveform") || Clazz.instanceOf(this.wform, "com.falstad.VowelFrame.SineWaveform") ) this.maxGain = false;
this.b$['com.falstad.VowelFrame'].outputGain = 1;
if (this.filt == null  || this.filt.getLength() != this.newFilter.getLength() ) this.convBufPtr = this.inbp = this.outbp = this.spectCt = 0;
this.filt = this.newFilter;
this.newFilter = null;
this.impulseBuf = null;
this.useConvolve = this.filt.useConvolve();
this.stateL = this.filt.createState();
this.stateR = this.filt.createState();
}var length = this.wform.getData();
if (length == 0) return true;
var ib = this.wform.buffer;
var i2;
var i = this.inbp;
for (i2 = 0; i2 < length; i2 = i2+(this.ss)) {
this.fbufLi[i] = ib[i2];
i = (i + 1) & this.fbufmask;
}
i = this.inbp;
if (this.stereo) {
for (i2 = 0; i2 < length; i2 = i2+(2)) {
this.fbufRi[i] = ib[i2 + 1];
i = (i + 1) & this.fbufmask;
}
} else {
for (i2 = 0; i2 < length; i2++) {
this.fbufRi[i] = this.fbufLi[i];
i = (i + 1) & this.fbufmask;
}
}var sampleCount = (length/this.ss|0);
if (this.useConvolve) {
p$.doConvolveFilter$I.apply(this, [sampleCount]);
} else {
p$.doFilter$I.apply(this, [sampleCount]);
if (!this.b$['com.falstad.VowelFrame'].unstable) p$.doOutput$I.apply(this, [sampleCount * 4]);
}if (this.b$['com.falstad.VowelFrame'].unstable) return false;
if (this.spectCt >= this.spectrumLen) {
this.spectrumOffset = (this.outbp - this.spectrumLen) & this.fbufmask;
this.spectCt = this.spectCt-(this.spectrumLen);
this.b$['com.falstad.VowelFrame'].cv.repaint();
}this.gainCounter = this.gainCounter+(sampleCount);
if (this.maxGain && this.gainCounter >= this.b$['com.falstad.VowelFrame'].sampleRate ) {
this.gainCounter = 0;
this.maxGain = false;
}return true;
});

Clazz.newMeth(C$, 'whenDone', function () {
if (this.b$['com.falstad.VowelFrame'].shutdownRequested || this.b$['com.falstad.VowelFrame'].unstable || !this.b$['com.falstad.VowelFrame'].soundCheck.getState()  ) this.line.flush();
 else this.line.drain();
this.b$['com.falstad.VowelFrame'].cv.repaint();
});

Clazz.newMeth(C$, 'audioThreadExiting', function () {
this.line.close();
this.b$['com.falstad.VowelFrame'].audioThread = null;
this.b$['com.falstad.VowelFrame'].cv.repaint();
});

Clazz.newMeth(C$, 'fillAudioBuffer', function () {
var qi;
var i;
var i2;
var outlen = this.myBufferLength;
while (true){
var max = 0;
i = this.outbp;
for (i2 = 0; i2 < outlen; i2 = i2+(4)) {
qi = ((this.fbufLo[i] * this.b$['com.falstad.VowelFrame'].outputGain)|0);
if (qi > max) max = qi;
if (qi < -max) max = -qi;
this.audioByteBuffer[i2] = ((qi|0)|0);
this.audioByteBuffer[i2 + 1] = (((qi >> 8)|0)|0);
i = (i + 1) & this.fbufmask;
}
i = this.outbp;
for (i2 = 2; i2 < outlen; i2 = i2+(4)) {
qi = ((this.fbufRo[i] * this.b$['com.falstad.VowelFrame'].outputGain)|0);
if (qi > max) max = qi;
if (qi < -max) max = -qi;
this.audioByteBuffer[i2 + 1] = (((qi >> 8)|0)|0);
this.audioByteBuffer[i2] = ((qi|0)|0);
i = (i + 1) & this.fbufmask;
}
if (max > 32767) {
this.b$['com.falstad.VowelFrame'].outputGain *= 30000.0 / max;
if (this.b$['com.falstad.VowelFrame'].outputGain < 1.0E-8  || Double.isInfinite(this.b$['com.falstad.VowelFrame'].outputGain) ) {
this.b$['com.falstad.VowelFrame'].unstable = true;
break;
}continue;
} else if (this.maxGain && max < 24000 ) {
if (max == 0) {
if (this.b$['com.falstad.VowelFrame'].outputGain == 1 ) break;
this.b$['com.falstad.VowelFrame'].outputGain = 1;
} else this.b$['com.falstad.VowelFrame'].outputGain *= 30000.0 / max;
continue;
}break;
}
if (this.b$['com.falstad.VowelFrame'].unstable) return 0;
this.outbp = i;
return outlen;
});

Clazz.newMeth(C$, 'setFilter$com_falstad_VowelFrame_Filter', function (f) {
this.newFilter = f;
});

Clazz.newMeth(C$, 'openLine', function () {
try {
this.stereo = (this.wform.getChannels() == 2);
this.ss = (this.stereo ? 2 : 1);
this.bitsPerSample = 16;
this.nChannels = 2;
this.rate = this.b$['com.falstad.VowelFrame'].sampleRate;
var playFormat = Clazz.new_((I$[9]||(I$[9]=Clazz.load('javax.sound.sampled.AudioFormat'))).c$$F$I$I$Z$Z,[this.rate, this.bitsPerSample, this.nChannels, true, false]);
var info = Clazz.new_((I$[10]||(I$[10]=Clazz.load(Clazz.load('javax.sound.sampled.DataLine').Info))).c$$Class$javax_sound_sampled_AudioFormat,[Clazz.getClass((I$[11]||(I$[11]=Clazz.load('javax.sound.sampled.SourceDataLine'))),['open$javax_sound_sampled_AudioFormat','open$javax_sound_sampled_AudioFormat$I','write$BA$I$I']), playFormat]);
this.line = (I$[12]||(I$[12]=Clazz.load('javax.sound.sampled.AudioSystem'))).getLine$javax_sound_sampled_Line_Info(info);
var n = this.b$['com.falstad.VowelFrame'].getPower2$I((this.b$['com.falstad.VowelFrame'].sampleRate/4|0));
this.line.open$javax_sound_sampled_AudioFormat$I(playFormat, n);
this.line.start();
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
e.printStackTrace();
} else {
throw e;
}
}
});

Clazz.newMeth(C$, 'doFilter$I', function (sampleCount) {
this.filt.run$DA$DA$I$I$I$DA(this.fbufLi, this.fbufLo, this.inbp, this.fbufmask, sampleCount, this.stateL);
this.filt.run$DA$DA$I$I$I$DA(this.fbufRi, this.fbufRo, this.inbp, this.fbufmask, sampleCount, this.stateR);
this.inbp = (this.inbp + sampleCount) & this.fbufmask;
var q = this.fbufLo[(this.inbp - 1) & this.fbufmask];
if (Double.isNaN(q) || Double.isInfinite(q) ) this.b$['com.falstad.VowelFrame'].unstable = true;
});

Clazz.newMeth(C$, 'doConvolveFilter$I', function (sampleCount) {
var i;
var fi2 = this.inbp;
var i20;
var filtA = (this.filt).aList;
var cblen = this.b$['com.falstad.VowelFrame'].getPower2$I(512 + filtA.length * 2);
if (this.convolveBuf == null  || this.convolveBuf.length != cblen ) this.convolveBuf = Clazz.array(Double.TYPE, [cblen]);
if (this.impulseBuf == null ) {
this.impulseBuf = Clazz.array(Double.TYPE, [cblen]);
for (i = 0; i != filtA.length; i++) this.impulseBuf[i * 2] = filtA[i];

this.convFFT = Clazz.new_((I$[3]||(I$[3]=Clazz.load('com.falstad.FFT'))).c$$I,[(this.convolveBuf.length/2|0)]);
this.convFFT.transform$DA$Z(this.impulseBuf, false);
}var cbptr = this.convBufPtr;
var cbptrmax = this.convolveBuf.length + 2 - 2 * filtA.length;
for (i = 0; i != sampleCount; i++, fi2++) {
i20 = fi2 & this.fbufmask;
this.convolveBuf[cbptr] = this.fbufLi[i20];
this.convolveBuf[cbptr + 1] = this.fbufRi[i20];
cbptr = cbptr+(2);
if (cbptr == cbptrmax) {
this.convFFT.transform$DA$Z(this.convolveBuf, false);
var mult = 2.0 / cblen;
var j;
for (j = 0; j != cblen; j = j+(2)) {
var a = this.convolveBuf[j] * this.impulseBuf[j] - this.convolveBuf[j + 1] * this.impulseBuf[j + 1];
var b = this.convolveBuf[j] * this.impulseBuf[j + 1] + this.convolveBuf[j + 1] * this.impulseBuf[j];
this.convolveBuf[j] = a * mult;
this.convolveBuf[j + 1] = b * mult;
}
this.convFFT.transform$DA$Z(this.convolveBuf, true);
var fj2 = this.outbp;
var j20;
var overlap = cblen - cbptrmax;
for (j = 0; j != overlap; j = j+(2), fj2++) {
j20 = fj2 & this.fbufmask;
this.fbufLo[j20] += this.convolveBuf[j];
this.fbufRo[j20] += this.convolveBuf[j + 1];
}
for (; j != cblen; j = j+(2), fj2++) {
j20 = fj2 & this.fbufmask;
this.fbufLo[j20] = this.convolveBuf[j];
this.fbufRo[j20] = this.convolveBuf[j + 1];
}
cbptr = 0;
p$.doOutput$I.apply(this, [cbptrmax * 2]);
for (j = 0; j != cblen; j++) this.convolveBuf[j] = 0;

}}
this.inbp = fi2 & this.fbufmask;
this.convBufPtr = cbptr;
});

Clazz.newMeth(C$, 'doOutput$I', function (outlen) {
if (this.audioByteBuffer.length < outlen) this.audioByteBuffer = Clazz.array(Byte.TYPE, [outlen]);
this.myBufferLength = outlen;
if (this.fillAudioBuffer() <= 0) return;
this.line.write$BA$I$I(this.audioByteBuffer, 0, this.myBufferLength);
this.spectCt = this.spectCt+((outlen/4|0));
});
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "VowelCanvas", function(){
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

Clazz.newMeth(C$, 'c$$com_falstad_VowelFrame', function (p) {
Clazz.super_(C$, this,1);
this.pg = p;
}, 1);

Clazz.newMeth(C$, 'getPreferredSize', function () {
return Clazz.new_((I$[5]||(I$[5]=Clazz.load('java.awt.Dimension'))).c$$I$I,[300, 400]);
});

Clazz.newMeth(C$, 'update$java_awt_Graphics', function (g) {
this.pg.updateVowel$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'paintComponent$java_awt_Graphics', function (g) {
this.pg.updateVowel$java_awt_Graphics(g);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VowelFrame, "VowelLayout", function(){
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
return Clazz.new_((I$[5]||(I$[5]=Clazz.load('java.awt.Dimension'))).c$$I$I,[500, 500]);
});

Clazz.newMeth(C$, 'minimumLayoutSize$java_awt_Container', function (target) {
return Clazz.new_((I$[5]||(I$[5]=Clazz.load('java.awt.Dimension'))).c$$I$I,[100, 100]);
});

Clazz.newMeth(C$, 'layoutContainer$java_awt_Container', function (target) {
var insets = target.insets();
var targetw = target.size().width - insets.left - insets.right ;
var cw = (targetw * 7/10|0);
var targeth = target.size().height - (insets.top + insets.bottom);
target.getComponent$I(0).move$I$I(insets.left, insets.top);
target.getComponent$I(0).resize$I$I(cw, targeth);
var barwidth = targetw - cw;
cw = cw+(insets.left);
var i;
var h = insets.top;
for (i = 1; i < target.getComponentCount(); i++) {
var m = target.getComponent$I(i);
if (m.isVisible()) {
var d = m.getPreferredSize();
if (Clazz.instanceOf(m, "a2s.Scrollbar")) d.width = barwidth;
if (Clazz.instanceOf(m, "a2s.Choice")) d.width = barwidth;
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
//Created 2017-12-17 19:28:16
