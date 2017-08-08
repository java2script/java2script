Clazz.declarePackage ("org.physicslab.mechanics.micrometer");
Clazz.load (["java.awt.event.ActionListener", "$.FocusListener", "$.MouseListener", "javax.swing.JFrame", "javax.swing.event.ChangeListener"], "org.physicslab.mechanics.micrometer.Micrometer", ["java.lang.Double", "java.text.DecimalFormat", "java.util.logging.Level", "$.Logger", "javax.swing.BorderFactory", "$.GroupLayout", "$.JButton", "$.JCheckBox", "$.JFormattedTextField", "$.JLabel", "$.JOptionPane", "$.JPanel", "$.JSlider", "$.LayoutStyle", "$.UIManager", "javax.swing.text.DefaultFormatterFactory", "$.NumberFormatter", "org.physicslab.mechanics.micrometer.ScrewGaugePanel"], function () {
c$ = Clazz.decorateAsClass (function () {
this.chkDisplayInfo = null;
this.btngetAnswer = null;
this.lblQuestion = null;
this.txtAnswer = null;
this.zeroErrorSlider = null;
this.chkZerroError = null;
this.vernierPanel = null;
this.settingsPanel = null;
Clazz.instantialize (this, arguments);
}, org.physicslab.mechanics.micrometer, "Micrometer", javax.swing.JFrame, [java.awt.event.ActionListener, javax.swing.event.ChangeListener, java.awt.event.FocusListener, java.awt.event.MouseListener]);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.physicslab.mechanics.micrometer.Micrometer, []);
this.vernierPanel =  new org.physicslab.mechanics.micrometer.ScrewGaugePanel ();
this.settingsPanel =  new javax.swing.JPanel ();
this.add (this.vernierPanel);
this.initComponents ();
this.add (this.settingsPanel, "South");
this.setDefaultCloseOperation (3);
this.setSize (360, 310);
this.setLocationRelativeTo (null);
this.setTitle ("Vernier Micrometer");
this.pack ();
this.setVisible (true);
this.vernierPanel.setRequestFocusEnabled (false);
this.vernierPanel.setFocusable (true);
this.vernierPanel.requestFocus ();
});
Clazz.defineMethod (c$, "initComponents", 
 function () {
this.lblQuestion =  new javax.swing.JLabel ();
this.chkDisplayInfo =  new javax.swing.JCheckBox ();
this.btngetAnswer =  new javax.swing.JButton ();
this.btngetAnswer.addFocusListener (this);
this.btngetAnswer.addMouseListener (this);
this.txtAnswer =  new javax.swing.JFormattedTextField ();
this.txtAnswer.addFocusListener (this);
this.txtAnswer.addMouseListener (this);
this.zeroErrorSlider =  new javax.swing.JSlider ();
this.chkZerroError =  new javax.swing.JCheckBox ();
this.lblQuestion.setText ("What is the reading of scale in current position (in mm)?");
this.chkDisplayInfo.setText ("Display Readings");
this.zeroErrorSlider.setMajorTickSpacing (5);
this.zeroErrorSlider.setMaximum (20);
this.zeroErrorSlider.setMinimum (-20);
this.zeroErrorSlider.setMinorTickSpacing (1);
this.zeroErrorSlider.setPaintTicks (true);
this.zeroErrorSlider.setToolTipText ("");
this.zeroErrorSlider.setValue (0);
this.zeroErrorSlider.addChangeListener (this);
this.chkZerroError.setText ("Zero Error = 0.00 mm");
this.chkZerroError.addActionListener (this);
this.btngetAnswer.setText ("Check Answer");
this.btngetAnswer.addActionListener (this);
this.chkDisplayInfo.addActionListener (this);
this.txtAnswer.setFormatterFactory ( new javax.swing.text.DefaultFormatterFactory ( new javax.swing.text.NumberFormatter ( new java.text.DecimalFormat ("#0.00"))));
this.settingsPanel.setBorder (javax.swing.BorderFactory.createEtchedBorder ());
var layout =  new javax.swing.GroupLayout (this.settingsPanel);
this.settingsPanel.setLayout (layout);
layout.setHorizontalGroup (layout.createParallelGroup (javax.swing.GroupLayout.Alignment.LEADING).addGroup (layout.createSequentialGroup ().addContainerGap ().addGroup (layout.createParallelGroup (javax.swing.GroupLayout.Alignment.LEADING).addGroup (layout.createSequentialGroup ().addGroup (layout.createParallelGroup (javax.swing.GroupLayout.Alignment.LEADING).addComponent (this.lblQuestion).addComponent (this.txtAnswer, -1, 393, 32767)).addPreferredGap (javax.swing.LayoutStyle.ComponentPlacement.RELATED).addComponent (this.btngetAnswer)).addGroup (layout.createSequentialGroup ().addGroup (layout.createParallelGroup (javax.swing.GroupLayout.Alignment.LEADING).addComponent (this.chkZerroError).addComponent (this.chkDisplayInfo).addComponent (this.zeroErrorSlider, -2, -1, -2)).addGap (0, 0, 32767))).addContainerGap ()));
layout.setVerticalGroup (layout.createParallelGroup (javax.swing.GroupLayout.Alignment.LEADING).addGroup (layout.createSequentialGroup ().addContainerGap ().addComponent (this.lblQuestion).addPreferredGap (javax.swing.LayoutStyle.ComponentPlacement.RELATED).addGroup (layout.createParallelGroup (javax.swing.GroupLayout.Alignment.BASELINE).addComponent (this.btngetAnswer).addComponent (this.txtAnswer, -2, -1, -2)).addPreferredGap (javax.swing.LayoutStyle.ComponentPlacement.RELATED).addComponent (this.chkDisplayInfo).addPreferredGap (javax.swing.LayoutStyle.ComponentPlacement.RELATED).addComponent (this.chkZerroError).addPreferredGap (javax.swing.LayoutStyle.ComponentPlacement.RELATED).addComponent (this.zeroErrorSlider, -2, -1, -2).addContainerGap (-1, 32767)));
});
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
try {
var installedLookAndFeels = javax.swing.UIManager.getInstalledLookAndFeels ();
for (var idx = 0; idx < installedLookAndFeels.length; idx++) if ("Nimbus".equals (installedLookAndFeels[idx].getName ())) {
javax.swing.UIManager.setLookAndFeel (installedLookAndFeels[idx].getClassName ());
break;
}
} catch (e$$) {
if (Clazz.exceptionOf (e$$, ClassNotFoundException)) {
var ex = e$$;
{
java.util.logging.Logger.getLogger (org.physicslab.mechanics.micrometer.Micrometer.getName ()).log (java.util.logging.Level.SEVERE, null, ex);
}
} else if (Clazz.exceptionOf (e$$, InstantiationException)) {
var ex = e$$;
{
java.util.logging.Logger.getLogger (org.physicslab.mechanics.micrometer.Micrometer.getName ()).log (java.util.logging.Level.SEVERE, null, ex);
}
} else if (Clazz.exceptionOf (e$$, IllegalAccessException)) {
var ex = e$$;
{
java.util.logging.Logger.getLogger (org.physicslab.mechanics.micrometer.Micrometer.getName ()).log (java.util.logging.Level.SEVERE, null, ex);
}
} else if (Clazz.exceptionOf (e$$, javax.swing.UnsupportedLookAndFeelException)) {
var ex = e$$;
{
java.util.logging.Logger.getLogger (org.physicslab.mechanics.micrometer.Micrometer.getName ()).log (java.util.logging.Level.SEVERE, null, ex);
}
} else {
throw e$$;
}
}
 new org.physicslab.mechanics.micrometer.Micrometer ();
}, "~A");
Clazz.overrideMethod (c$, "actionPerformed", 
function (e) {
if (e.getSource () === this.btngetAnswer) {
if (this.txtAnswer.getValue () == null) {
javax.swing.JOptionPane.showMessageDialog (this, "You are supposed to write answer first in the Text Box", "Vernier Micrometer Simulator", 0);
return;
}var n = this.txtAnswer.getValue ();
if (n.doubleValue () == this.vernierPanel.getCorrectedReading ()) {
javax.swing.JOptionPane.showMessageDialog (this, "Congratulation! your answer is correct", "Vernier Micrometer Simulator", 1);
} else {
javax.swing.JOptionPane.showMessageDialog (this, "OOPS! your answer is wrong, try again or see hint", "Vernier Micrometer Simulator", 1);
}} else if (e.getSource () === this.chkDisplayInfo) {
this.vernierPanel.displayInfo = !this.vernierPanel.displayInfo;
this.vernierPanel.repaint ();
} else if (e.getSource () === this.chkZerroError) {
if (this.chkZerroError.isSelected ()) {
var zeroerror = this.zeroErrorSlider.getValue ();
this.vernierPanel.setZeroerror (zeroerror);
} else this.vernierPanel.setZeroerror (0);
}}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "stateChanged", 
function (e) {
if (e.getSource () === this.zeroErrorSlider) {
this.chkZerroError.setText ("ZeroError = " + String.format ("%.2f", [Double.$valueOf (this.zeroErrorSlider.getValue () / 100.0)]) + " mm");
var zeroerror = this.zeroErrorSlider.getValue ();
if (this.chkZerroError.isSelected ()) this.vernierPanel.setZeroerror (zeroerror);
}}, "javax.swing.event.ChangeEvent");
Clazz.overrideMethod (c$, "focusGained", 
function (e) {
System.out.println (e);
}, "java.awt.event.FocusEvent");
Clazz.overrideMethod (c$, "focusLost", 
function (e) {
System.out.println (e);
}, "java.awt.event.FocusEvent");
Clazz.overrideMethod (c$, "mouseClicked", 
function (e) {
System.out.println (e);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mousePressed", 
function (e) {
System.out.println (e);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseReleased", 
function (e) {
System.out.println (e);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseEntered", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseExited", 
function (e) {
}, "java.awt.event.MouseEvent");
});
