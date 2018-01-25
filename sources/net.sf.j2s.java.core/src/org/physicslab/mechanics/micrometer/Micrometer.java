package org.physicslab.mechanics.micrometer;

import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseWheelEvent;
import java.awt.event.MouseWheelListener;

import javax.swing.BorderFactory;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.LayoutStyle.ComponentPlacement;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

//web_Ready
//web_AppletName= Vernier Micrometer
//web_Description= Learn how to read a Vernier scale
//web_Date= $Date: 2016-12-30 11:17:11 -0600 (Fri, 30 Dec 2016) $
//web_AppletImage= micrometer.png
//web_UseMain= true
//web_JavaVersion= "?"
//web_Category= Physics - Instrumentation
//web_Features= canvas, slider 

// BH no adjustments to this code were necessary

// BH titles were "Calliper" but that is the other applet; this one is "Micrometer"
// BH I added a space before and after numbers and adjusted the color of the measurement




public class Micrometer extends JFrame implements ActionListener,ChangeListener,FocusListener, MouseListener{

	  // Variables declaration - do not modify
    private javax.swing.JCheckBox chkDisplayInfo;
    private javax.swing.JButton btngetAnswer;
    private javax.swing.JLabel lblQuestion;
    private javax.swing.JFormattedTextField txtAnswer;
    private javax.swing.JSlider zeroErrorSlider;
    private javax.swing.JCheckBox chkZerroError;
    private ScrewGaugePanel vernierPanel;
    private JPanel settingsPanel;
    // End of variables declaration
    public Micrometer() {
    	vernierPanel=new ScrewGaugePanel();
    	settingsPanel=new JPanel();
    	add(vernierPanel);
    	initComponents();
    	add(settingsPanel,BorderLayout.SOUTH);
    	setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(360, 310);
        setLocationRelativeTo(null);
        setTitle("Vernier Micrometer"); //BH
        this.pack();
        setVisible(true);
        vernierPanel.setRequestFocusEnabled(false);
        vernierPanel.setFocusable(true);
        vernierPanel.requestFocus();
		
    }
    
    private void initComponents() {

        lblQuestion = new javax.swing.JLabel();
        chkDisplayInfo = new javax.swing.JCheckBox();
        btngetAnswer = new javax.swing.JButton();
        btngetAnswer.addFocusListener(this);
        btngetAnswer.addMouseListener(this);
        txtAnswer = new javax.swing.JFormattedTextField();
        txtAnswer.addFocusListener(this);
        txtAnswer.addMouseListener(this);
        zeroErrorSlider = new javax.swing.JSlider();
        chkZerroError = new javax.swing.JCheckBox();

        lblQuestion.setText("What is the reading of scale in current position (in mm)?");

        chkDisplayInfo.setText("Display Readings");

        zeroErrorSlider.setMajorTickSpacing(5);
        zeroErrorSlider.setMaximum(20);
        zeroErrorSlider.setMinimum(-20);
        zeroErrorSlider.setMinorTickSpacing(1);
        zeroErrorSlider.setPaintTicks(true);
        zeroErrorSlider.setToolTipText("");
        zeroErrorSlider.setValue(0);
        zeroErrorSlider.addChangeListener(this);
      
        chkZerroError.setText("Zero Error = 0.00 mm"); //BH
        chkZerroError.addActionListener(this);
        btngetAnswer.setText("Check Answer");
        btngetAnswer.addActionListener(this);
        chkDisplayInfo.addActionListener(this);
        txtAnswer.setFormatterFactory(new javax.swing.text.DefaultFormatterFactory(new javax.swing.text.NumberFormatter(new java.text.DecimalFormat("#0.00"))));
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
                                .addComponent(lblQuestion)
                                .addComponent(txtAnswer, javax.swing.GroupLayout.DEFAULT_SIZE, 393, Short.MAX_VALUE))
                            .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                            .addComponent(btngetAnswer))
                        .addGroup(layout.createSequentialGroup()
                            .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                .addComponent(chkZerroError)
                                .addComponent(chkDisplayInfo)
                                .addComponent(zeroErrorSlider, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addGap(0, 0, Short.MAX_VALUE)))
                    .addContainerGap())
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
                    .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                    .addComponent(chkZerroError)
                    .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                    .addComponent(zeroErrorSlider, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
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
             java.util.logging.Logger.getLogger(Micrometer.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
         } catch (InstantiationException ex) {
             java.util.logging.Logger.getLogger(Micrometer.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
         } catch (IllegalAccessException ex) {
             java.util.logging.Logger.getLogger(Micrometer.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
         } catch (javax.swing.UnsupportedLookAndFeelException ex) {
             java.util.logging.Logger.getLogger(Micrometer.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
         }
    	new Micrometer();
    }

	@Override
	public void actionPerformed(ActionEvent e) {
		//System.out.println(e);
		if (e.getSource()==btngetAnswer){
			if (txtAnswer.getValue()==null){
				JOptionPane.showMessageDialog(this, "You are supposed to write answer first in the Text Box", "Vernier Micrometer Simulator", JOptionPane.ERROR_MESSAGE); //BH 
			    return;
			}
		   Number n= (Number) txtAnswer.getValue();
		   if(n.doubleValue()==vernierPanel.getCorrectedReading()){
				JOptionPane.showMessageDialog(this, "Congratulation! your answer is correct", "Vernier Micrometer Simulator", JOptionPane.INFORMATION_MESSAGE); //BH
		   }else{
			    JOptionPane.showMessageDialog(this, "OOPS! your answer is wrong, try again or see hint", "Vernier Micrometer Simulator", JOptionPane.INFORMATION_MESSAGE); //BH
		   }
			   
		}else if(e.getSource()==chkDisplayInfo){
			vernierPanel.displayInfo=!vernierPanel.displayInfo;//chkDisplayInfo.isSelected();
			//System.out.println(vernierPanel.displayInfo);
			vernierPanel.repaint();
		}else if(e.getSource()==chkZerroError){
			//System.out.println("ZeroError Enabled="+chkZerroError.isSelected());
			if(chkZerroError.isSelected()){
				int zeroerror=zeroErrorSlider.getValue();
				vernierPanel.setZeroerror(zeroerror);
			}else	
				vernierPanel.setZeroerror(0);
		}
	
	}

	@Override
	public void stateChanged(ChangeEvent e) {
		if(e.getSource()==zeroErrorSlider){
			chkZerroError.setText("ZeroError = "+String.format("%.2f", Double.valueOf(zeroErrorSlider.getValue()/100.0))+" mm"); // BH fix
			int zeroerror=zeroErrorSlider.getValue();
			if(chkZerroError.isSelected())vernierPanel.setZeroerror(zeroerror);
		}
		
	}

	@Override
	public void focusGained(FocusEvent e) {
		System.out.println(e);
		// TODO Auto-generated method stub
		
	}

	@Override
	public void focusLost(FocusEvent e) {
		System.out.println(e);
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseClicked(MouseEvent e) {
		System.out.println(e);
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mousePressed(MouseEvent e) {
		System.out.println(e);
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseReleased(MouseEvent e) {
		System.out.println(e);
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseEntered(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseExited(MouseEvent e) {
		
		// TODO Auto-generated method stub
		
	}


        
}