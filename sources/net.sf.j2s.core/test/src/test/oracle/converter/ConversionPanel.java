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

package test.oracle.converter;

/*
 * A 1.4 class used by the Converter example.
 */

import java.awt.Color;
import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.text.NumberFormat;

import javax.swing.BorderFactory;
import javax.swing.Box;
import javax.swing.BoxLayout;
import javax.swing.JComboBox;
import javax.swing.JFormattedTextField;
import javax.swing.JPanel;
import javax.swing.JSlider;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import javax.swing.text.NumberFormatter;

public class ConversionPanel extends JPanel
                             implements ActionListener,
                                        ChangeListener,
                                        PropertyChangeListener {
    JFormattedTextField textField;
    JComboBox unitChooser;
    JSlider slider;
    ConverterRangeModel sliderModel;
    Converter controller;
    Unit[] units;
    String title;
    NumberFormat numberFormat;
		private NumberFormatter formatter;

    final static boolean MULTICOLORED = false;
    final static int MAX = 10000;

    ConversionPanel(Converter myController, String myTitle,
                    Unit[] myUnits,
                    ConverterRangeModel myModel) {
        if (MULTICOLORED) {
            setOpaque(true);
            setBackground(new Color(0, 255, 255));
        }
        setBorder(BorderFactory.createCompoundBorder(
                        BorderFactory.createTitledBorder(myTitle),
                        BorderFactory.createEmptyBorder(5,5,5,5)));

        //Save arguments in instance variables.
        controller = myController;
        units = myUnits;
        title = myTitle;
        sliderModel = myModel;

        //Create the text field format, and then the text field.
        numberFormat = NumberFormat.getNumberInstance();
        numberFormat.setMaximumFractionDigits(2);
        //NumberFormatter 
        formatter = new NumberFormatter(numberFormat);
        formatter.setAllowsInvalid(true);
        formatter.setCommitsOnValidEdit(false);
        //if this is set TRUE, then you can't type past a period.        //
        textField = new JFormattedTextField(formatter);
        textField.setColumns(10);
        textField.setValue(new Double(sliderModel.getDoubleValue()));
        textField.addPropertyChangeListener(this);

        //Add the combo box.
        unitChooser = new JComboBox();
        for (int i = 0; i < units.length; i++) { //Populate it.
            unitChooser.addItem(units[i].description);
        }
        unitChooser.setSelectedIndex(0);
        sliderModel.setMultiplier(units[0].multiplier);
        unitChooser.addActionListener(this);

        //Add the slider.
        slider = new JSlider(sliderModel);
        sliderModel.addChangeListener(this);

        //Make the text field/slider group a fixed size
        //to make stacked ConversionPanels nicely aligned.
        JPanel unitGroup = new JPanel() {
            @Override
						public Dimension getMinimumSize() {
                return getPreferredSize();
            }
            @Override
						public Dimension getPreferredSize() {
                return new Dimension(150,
                                     super.getPreferredSize().height);
            }
            @Override
						public Dimension getMaximumSize() {
                return getPreferredSize();
            }
        };
        unitGroup.setLayout(new BoxLayout(unitGroup,
                                          BoxLayout.PAGE_AXIS));
        if (MULTICOLORED) {
            unitGroup.setOpaque(true);
            unitGroup.setBackground(new Color(0, 0, 255));
        }
        unitGroup.setBorder(BorderFactory.createEmptyBorder(
                                                0,0,0,5));
        unitGroup.add(textField);
        unitGroup.add(slider);

        //Create a subpanel so the combo box isn't too tall
        //and is sufficiently wide.
        JPanel chooserPanel = new JPanel();
        chooserPanel.setLayout(new BoxLayout(chooserPanel,
                                             BoxLayout.PAGE_AXIS));
        if (MULTICOLORED) {
            chooserPanel.setOpaque(true);
            chooserPanel.setBackground(new Color(255, 0, 255));
        }
        chooserPanel.add(unitChooser);
        chooserPanel.add(Box.createHorizontalStrut(100));

        //Put everything together.
        setLayout(new BoxLayout(this, BoxLayout.LINE_AXIS));
        add(unitGroup);
        add(chooserPanel);
        unitGroup.setAlignmentY(TOP_ALIGNMENT);
        chooserPanel.setAlignmentY(TOP_ALIGNMENT);
    }

    //Don't allow this panel to get taller than its preferred size.
    //BoxLayout pays attention to maximum size, though most layout
    //managers don't.
    @Override
		public Dimension getMaximumSize() {
        return new Dimension(Integer.MAX_VALUE,
                             getPreferredSize().height);
    }

    /**
     * Returns the multiplier (units/meter) for the currently
     * selected unit of measurement.
     */
    public double getMultiplier() {
        return sliderModel.getMultiplier();
    }

    public double getValue() {
        return sliderModel.getDoubleValue();
    }

    /** Updates the text field when the main data model is updated. */
    @Override
		public void stateChanged(ChangeEvent e) {
        int min = sliderModel.getMinimum();
        int max = sliderModel.getMaximum();
        double value = sliderModel.getDoubleValue();
        NumberFormatter formatter = (NumberFormatter)textField.getFormatter();

        formatter.setMinimum(new Double(min));
        formatter.setMaximum(new Double(max));
        textField.setValue(new Double(value));
    }

    /**
     * Responds to the user choosing a new unit from the combo box.
     */
    @Override
		public void actionPerformed(ActionEvent e) {
        //Combo box event. Set new maximums for the sliders.
        int i = unitChooser.getSelectedIndex();
        sliderModel.setMultiplier(units[i].multiplier);
        controller.resetMaxValues(false);
    }

    /**
     * Detects when the value of the text field (not necessarily the same
     * number as you'd get from getText) changes.
     */
    @Override
		public void propertyChange(PropertyChangeEvent e) {
        if ("value".equals(e.getPropertyName())) {
            Number value = (Number)e.getNewValue();
            sliderModel.setDoubleValue(value.doubleValue());
            if (textField.getCaretPosition() == 0)
                textField.selectAll();
        }
    }
}
