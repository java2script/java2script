// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view.controls.valuecontrol;

import java.awt.AWTException;
import java.awt.BorderLayout;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;

import javax.swing.JComponent;
import javax.swing.JPanel;

import edu.colorado.phet.common.phetcommon.view.util.SwingUtils;

/**
 * ModelSliderLayoutStrategy provides a layout that is identical to
 * edu.colorado.phet.common.phetcommon.view.ModelSlider.
 * This demonstrates the flexibility of the layout facilities.
 * <p/>
 * This layout looks like this:
 * <code>
 * Label
 * -----------v----------
 * TextField Units
 * <code>
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class ModelSliderLayoutStrategy implements ILayoutStrategy {

    /**
     * Constructor.
     */
    public ModelSliderLayoutStrategy() {
    }


    /**
     * Performs layout of a specified control.
     *
     * @param valueControl
     */
    @Override
		public void doLayout( AbstractValueControl valueControl ) {

        // Get the components that will be part of the layout
        JComponent slider = valueControl.getSlider();
        JComponent textField = valueControl.getTextField();
        JComponent valueLabel = valueControl.getValueLabel();
        JComponent unitsLabel = valueControl.getUnitsLabel();

        // Layout code below was copied verbatim from ModelSlider
        JPanel textPanel = new JPanel();
        textPanel.setLayout( new BorderLayout() );
        textPanel.add( textField, BorderLayout.WEST );
        textPanel.add( unitsLabel, BorderLayout.EAST );
        valueControl.setLayout( new GridBagLayout() );
        try {
            SwingUtils.addGridBagComponent( valueControl, valueLabel, 0, 0, 1, 1,
                                            GridBagConstraints.NONE, GridBagConstraints.CENTER );
            SwingUtils.addGridBagComponent( valueControl, slider, 0, 1, 1, 1,
                                            GridBagConstraints.NONE, GridBagConstraints.CENTER );
            SwingUtils.addGridBagComponent( valueControl, textPanel, 0, 2, 2, 1,
                                            GridBagConstraints.NONE, GridBagConstraints.CENTER );
        }
        catch ( AWTException e ) {
            throw new RuntimeException( e );
        }
    }
}
