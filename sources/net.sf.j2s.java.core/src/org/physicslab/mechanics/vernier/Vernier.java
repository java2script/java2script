package org.physicslab.mechanics.vernier;

import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.BorderFactory;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

//web_Ready
//web_AppletName= Vernier Callipers
//web_Description= Learn how to read a Vernier scale
//web_Date= $Date: 2016-12-30 11:17:11 -0600 (Fri, 30 Dec 2016) $
//web_AppletImage= vernier.png
//web_UseMain= true
//web_JavaVersion= "?"
//web_Category= Physics - Instrumentation
//web_Features= canvas, slider 

//BH no adjustments to this code were necessary

//BH I added a space before and after numbers and adjusted the color of the measurement

public class Vernier extends JFrame implements ActionListener,ChangeListener{

	  // Variables declaration - do not modify
    private javax.swing.JCheckBox chkDisplayInfo;
    private javax.swing.JButton btngetAnswer;
    private javax.swing.JLabel lblQuestion;
    private javax.swing.JFormattedTextField txtAnswer;
    private javax.swing.JSlider zeroErrorSlider;
    private javax.swing.JCheckBox chkZerroError;
    private VernierPanel vernierPanel;
    private JPanel settingsPanel;
    private int zeroerror;
    // End of variables declaration
    public Vernier() {
    	vernierPanel=new VernierPanel();
    	settingsPanel=new JPanel();
    	add(vernierPanel);
    	initComponents();
    	add(settingsPanel,BorderLayout.SOUTH);
    	setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        
        setSize(360, 310);
        setLocationRelativeTo(null);
        setTitle("Vernier Callipers");
        this.pack();
        setVisible(true);
    }
    
    private void initComponents() {

        lblQuestion = new javax.swing.JLabel();
        chkDisplayInfo = new javax.swing.JCheckBox();
        btngetAnswer = new javax.swing.JButton();
        txtAnswer = new javax.swing.JFormattedTextField();
        zeroErrorSlider = new javax.swing.JSlider();
        chkZerroError = new javax.swing.JCheckBox();

        lblQuestion.setText("What is the reading of scale in current position (in mm)?");

        chkDisplayInfo.setText("Display Readings");
        zeroErrorSlider.setMajorTickSpacing(5);
        zeroErrorSlider.setMaximum(5);
        zeroErrorSlider.setMinimum(-5);
        zeroErrorSlider.setMinorTickSpacing(1);
        zeroErrorSlider.setPaintTicks(true);
        zeroErrorSlider.setToolTipText("");
        zeroErrorSlider.setValue(0);
        zeroErrorSlider.addChangeListener(this);
      
        chkZerroError.setText("Zero Error= 0.00 mm");
        chkZerroError.addActionListener(this);
        btngetAnswer.setText("Check Answer");
        btngetAnswer.addActionListener(this);
        chkDisplayInfo.addActionListener(this);
        txtAnswer.setFormatterFactory(new javax.swing.text.DefaultFormatterFactory(new javax.swing.text.NumberFormatter(new java.text.DecimalFormat("#0.0"))));
        settingsPanel.setBorder(BorderFactory.createEtchedBorder());
        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(settingsPanel);
        settingsPanel.setLayout(layout);
        layout.setHorizontalGroup(
                layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                .addGroup(layout.createSequentialGroup()
                    .addContainerGap()
                    .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                        .addGroup(layout.createSequentialGroup()
                            .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                .addGroup(layout.createSequentialGroup()
                                    .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                        .addComponent(lblQuestion)
                                        .addComponent(txtAnswer, javax.swing.GroupLayout.DEFAULT_SIZE, 393, Short.MAX_VALUE))
                                    .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                    .addComponent(btngetAnswer))
                                .addGroup(layout.createSequentialGroup()
                                    .addComponent(chkZerroError)
                                    .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                    .addComponent(zeroErrorSlider, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addGap(0, 0, Short.MAX_VALUE)))
                            .addContainerGap())
                        .addGroup(layout.createSequentialGroup()
                            .addComponent(chkDisplayInfo)
                            .addGap(0, 0, Short.MAX_VALUE))))
            );
            layout.setVerticalGroup(
                layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                .addGroup(layout.createSequentialGroup()
                    .addContainerGap()
                    .addComponent(lblQuestion)
                    .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                    .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                        .addComponent(btngetAnswer)
                        .addComponent(txtAnswer, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                    .addComponent(chkDisplayInfo)
                    .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                    .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                        .addComponent(zeroErrorSlider, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addComponent(chkZerroError))
                    .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
            );
    }

    public static void main(String[] args) {
    	 try {
             javax.swing.UIManager.LookAndFeelInfo[] installedLookAndFeels=javax.swing.UIManager.getInstalledLookAndFeels();
             for (int idx=0; idx<installedLookAndFeels.length; idx++)
                 if ("Nimbus".equals(installedLookAndFeels[idx].getName())) {
                     javax.swing.UIManager.setLookAndFeel(installedLookAndFeels[idx].getClassName());
                     break;
                 }
         } catch (ClassNotFoundException ex) {
             java.util.logging.Logger.getLogger(Vernier.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
         } catch (InstantiationException ex) {
             java.util.logging.Logger.getLogger(Vernier.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
         } catch (IllegalAccessException ex) {
             java.util.logging.Logger.getLogger(Vernier.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
         } catch (javax.swing.UnsupportedLookAndFeelException ex) {
             java.util.logging.Logger.getLogger(Vernier.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
         }
    	new Vernier();
    }

	@Override
	public void actionPerformed(ActionEvent e) {
		if (e.getSource()==btngetAnswer){
			if (txtAnswer.getValue()==null){
				JOptionPane.showMessageDialog(this, "You are supposed to write answer first in the Text Box", "Vernier Calliper Simulator", JOptionPane.ERROR_MESSAGE); 
			    return;
			}
		   Number n= (Number) txtAnswer.getValue();
		   if(n.doubleValue()==vernierPanel.getCorrectedReading()){
				JOptionPane.showMessageDialog(this, "Congratulation! your answer is correct", "Vernier Calliper Simulator", JOptionPane.INFORMATION_MESSAGE);
		   }else{
			    JOptionPane.showMessageDialog(this, "OOPS! your answer is wrong, try again or see hint", "Vernier Calliper Simulator", JOptionPane.INFORMATION_MESSAGE);
		   }
			   
		}else if(e.getSource()==chkDisplayInfo){
			vernierPanel.displayInfo=!vernierPanel.displayInfo;//chkDisplayInfo.isSelected();
			System.out.println(vernierPanel.displayInfo);
			vernierPanel.repaint();
		}else if(e.getSource()==chkZerroError){
			System.out.println("ZeroError Enabled="+chkZerroError.isSelected());
			if(chkZerroError.isSelected()){
				zeroerror=zeroErrorSlider.getValue();
				vernierPanel.setZeroerror(zeroerror);
			}else	
				vernierPanel.setZeroerror(0);
		}
	
	}

	@Override
	public void stateChanged(ChangeEvent e) {
		if(e.getSource()==zeroErrorSlider){
			chkZerroError.setText("ZeroError = "+String.format("%.1f",Double.valueOf(zeroErrorSlider.getValue()/10.0))+" mm");
			zeroerror=zeroErrorSlider.getValue();
			if(chkZerroError.isSelected())vernierPanel.setZeroerror(zeroerror);
		}
		
	}
    
    
}