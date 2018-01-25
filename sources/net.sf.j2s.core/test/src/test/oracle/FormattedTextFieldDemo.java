/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (c) 1995, 2008, Oracle and/or its affiliates. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *   - Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *
 *   - Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *
 *   - Neither the name of Oracle or the names of its
 *     contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */ 

package test.oracle;
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.text.NumberFormat;
import java.text.ParseException;

import javax.swing.JApplet;
import javax.swing.JFormattedTextField;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingUtilities;
import javax.swing.UIManager;


// SwingJS[1] JPanel --> JApplet
// Swingjs[2] super(...) to setLayout(...)
// SwingJS[3] removing setBorder
// SwingJS[4] action listener added for better performance
// SwingJS[5] a J2S bug requires that @ J2SRequireImport(NumberFormat.class) be used.


/**
 * 
 * FormattedTextFieldDemo.java requires no other files.
 *
 * It implements a mortgage calculator that uses four
 * JFormattedTextFields.
 */


public class FormattedTextFieldDemo extends JApplet
implements ActionListener, PropertyChangeListener, FocusListener {
    //Values for the fields
    private double amount = 100000;
    private double rate = 7.5;  //7.5%
    private int numPeriods = 30;

    //Labels to identify the fields
    private JLabel amountLabel;
    private JLabel rateLabel;
    private JLabel numPeriodsLabel;
    private JLabel paymentLabel;

    //Strings for the labels
    private static String amountString = "Loan Amount: ";
    private static String rateString = "APR (%): ";
    private static String numPeriodsString = "Years: ";
    private static String paymentString = "Monthly Payment: ";

    //Fields for data entry
    private JFormattedTextField amountField;
    private JFormattedTextField rateField;
    private JFormattedTextField numPeriodsField;
    private JFormattedTextField paymentField;

    //Formats to format and parse numbers
    private NumberFormat amountFormat;
    private NumberFormat percentFormat;
    private NumberFormat paymentFormat;

    // SwingJS was: public FormattedTextFieldDemo() {...}
    
    @Override
		public void init() {
    	// Swingjs[2] super(...) to setLayout(...)
        setLayout(new BorderLayout());
        setUpFormats();
        double payment = computePayment(amount,
                                        rate,
                                        numPeriods);

        //Create the labels.
        amountLabel = new JLabel(amountString);
        rateLabel = new JLabel(rateString);
        numPeriodsLabel = new JLabel(numPeriodsString);
        paymentLabel = new JLabel(paymentString);

        //Create the text fields and set them up.
        amountField = new SwingJSValidatedNumberField(amountFormat);
        amountField.setValue(new Double(amount));
        amountField.setColumns(10);
        amountField.addPropertyChangeListener("value", this);
        amountField.addActionListener(this); // SwingJS[4] added for a better performance

        rateField = new SwingJSValidatedNumberField(percentFormat);
        rateField.setValue(new Double(rate));
        rateField.setColumns(10);
        rateField.addPropertyChangeListener("value", this);
        rateField.addActionListener(this);
        rateField.addActionListener(this); // SwingJS[4] added for a better performance

        numPeriodsField = new SwingJSValidatedNumberField();
        numPeriodsField.setValue(new Integer(numPeriods));
        numPeriodsField.setColumns(10);
        numPeriodsField.addPropertyChangeListener("value", this);
        numPeriodsField.addActionListener(this); // SwingJS[4] added for a better performance

        paymentField = new JFormattedTextField(paymentFormat);
        paymentField.setValue(new Double(payment));
        paymentField.setColumns(10);
        paymentField.setEditable(false);
        paymentField.setForeground(Color.red);

        //Tell accessibility tools about label/textfield pairs.
        amountLabel.setLabelFor(amountField);
        rateLabel.setLabelFor(rateField);
        numPeriodsLabel.setLabelFor(numPeriodsField);
        paymentLabel.setLabelFor(paymentField);

        //Lay out the labels in a panel.
        JPanel labelPane = new JPanel(new GridLayout(0,1));
        labelPane.add(amountLabel);
        labelPane.add(rateLabel);
        labelPane.add(numPeriodsLabel);
        labelPane.add(paymentLabel);

        //Layout the text fields in a panel.
        JPanel fieldPane = new JPanel(new GridLayout(0,1));
        fieldPane.add(amountField);
        fieldPane.add(rateField);
        fieldPane.add(numPeriodsField);
        fieldPane.add(paymentField);
        
// just testing        fieldPane.add(new JPasswordField());

        //Put the panels in this panel, labels on left,
        //text fields on right.
        // SwingJS[3] removing setBorder
        //setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
        add(labelPane, BorderLayout.CENTER);
        add(fieldPane, BorderLayout.LINE_END);
        resize(270,100);
    }

    /** Called when a field's "value" property changes. */
    @Override
		public void propertyChange(PropertyChangeEvent e) {
        Object source = e.getSource();
        System.out.println("propertyChange " + e);
        if (source == amountField) {
            amount = ((Number)amountField.getValue()).doubleValue();
        } else if (source == rateField) {
            rate = ((Number)rateField.getValue()).doubleValue();
        } else if (source == numPeriodsField) {
            numPeriods = ((Number)numPeriodsField.getValue()).intValue();
        }

        double payment = computePayment(amount, rate, numPeriods);
        paymentField.setValue(new Double(payment));
        System.out.println(paymentField.getValue());
    }

    /**
     * Create the GUI and show it.  For thread safety,
     * this method should be invoked from the
     * event dispatch thread.
     */
    private static void createAndShowGUI() {
        //Create and set up the window.
        JFrame frame = new JFrame("FormattedTextFieldDemo");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        //Add contents to the window.
        frame.add(new FormattedTextFieldDemo());

        //Display the window.
        frame.pack();
        frame.setVisible(true);
    }

    public static void main(String[] args) {
        //Schedule a job for the event dispatch thread:
        //creating and showing this application's GUI.
        SwingUtilities.invokeLater(new Runnable() {
            @Override
						public void run() {
                //Turn off metal's use of bold fonts
	        UIManager.put("swing.boldMetal", Boolean.FALSE);
                createAndShowGUI();
            }
        });
    }

    //Compute the monthly payment based on the loan amount,
    //APR, and length of loan.
    double computePayment(double loanAmt, double rate, int numPeriods) {
        double I, partial1, denominator, answer;

        numPeriods *= 12;        //get number of months
        if (rate > 0.01) {
            I = rate / 100.0 / 12.0;         //get monthly rate from annual
            partial1 = Math.pow((1 + I), (0.0 - numPeriods));
            denominator = (1 - partial1) / I;
        } else { //rate ~= 0
            denominator = numPeriods;
        }

        answer = (-1 * loanAmt) / denominator;
        return answer;
    }

    //Create and set up number formats. These objects also
    //parse numbers input by user.
    private void setUpFormats() {
        amountFormat = NumberFormat.getNumberInstance();

        percentFormat = NumberFormat.getNumberInstance();
        percentFormat.setMinimumFractionDigits(3);

        paymentFormat = NumberFormat.getCurrencyInstance();
    }

		@Override
		public void focusGained(FocusEvent e) {
			// SwingJS added for testing
			System.out.println("focusGained " + ((JFormattedTextField) e.getSource()).getText() + " " + ((JFormattedTextField) e.getSource()).getValue());
		}

		@Override
		public void focusLost(FocusEvent e) {
			// SwingJS added for testing
			System.out.println("focusLost " + ((JFormattedTextField) e.getSource()).getText() + " " + ((JFormattedTextField) e.getSource()).getValue());
			
		}

		@Override
		public void actionPerformed(ActionEvent e) {
			// SwingJS[4] added for a better performance
			System.out.println("actionEvent " + e);
			((SwingJSValidatedNumberField) e.getSource()).validateNumber();
		}

		/**
		 * The original demo does not properly validate the numbers upon pressing ENTER. 
		 * We have to override invalidEdit() to do that.
		 *  
		 * @author Bob Hanson
		 *
		 */
		private class SwingJSValidatedNumberField extends JFormattedTextField {

			// SwingJS[4] added for a better performance

			public SwingJSValidatedNumberField() {
				super();
			}
			
			public SwingJSValidatedNumberField(NumberFormat amountFormat) {
				super(amountFormat);
			}
			
			/**
			 * By overriding invalidEdit we can trap entries such as "xx334" that do not
			 * trigger an ActionEvent. 
			 * 
			 */
			@Override
			public void invalidEdit() {
				validateNumber();
			}

			protected void validateNumber() {
					try {
						setText(getFormatter().valueToString(getValue()));
					} catch (ParseException e1) {
						// not possible
					}
			}
			
		}
}
