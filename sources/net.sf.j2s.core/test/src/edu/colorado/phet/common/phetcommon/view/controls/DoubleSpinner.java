// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view.controls;

import java.awt.Dimension;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;

import javax.swing.JFormattedTextField;
import javax.swing.JSpinner;
import javax.swing.SpinnerNumberModel;
import javax.swing.SwingUtilities;


/*
 * DoubleSpinner is a spinner that contains a double precision value.
 * 
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class DoubleSpinner extends JSpinner implements FocusListener {

    private JFormattedTextField textField;

    public DoubleSpinner( double value, double min, double max, double step, String format, Dimension size ) {
        super();

        // model
        SpinnerNumberModel model = new SpinnerNumberModel( value, min, max, step );
        setModel( model );
        // editor
        NumberEditor numberEditor = new NumberEditor( this, format );
        setEditor( numberEditor );
        textField = numberEditor.getTextField();
        textField.addFocusListener( this );
        // size
        setPreferredSize( size );
        setMinimumSize( size );
    }

    public double getDoubleValue() {
        return ( (Double) getValue() ).doubleValue();
    }

    public void setDoubleValue( double value ) {
        setValue( new Double( value ) );
    }

    public JFormattedTextField getFormattedTextField() {
        return textField;
    }

    /*
     * When the spinner gains focus, select its contents.
     * <p>
     * NOTE: 
     * This currently does not work; see Bug ID 4699955 at bugs.sun.com
     * A workaround is to call selectAll in invokeLater.
     */
    @Override
		public void focusGained( FocusEvent e ) {
        SwingUtilities.invokeLater( new Runnable() {
            @Override
						public void run() {
                textField.selectAll();
            }
        } );
    }

    @Override
		public void focusLost( FocusEvent e ) {
    }
}
