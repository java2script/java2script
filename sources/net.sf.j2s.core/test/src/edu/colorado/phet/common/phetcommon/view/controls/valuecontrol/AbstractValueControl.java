// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view.controls.valuecontrol;

import java.awt.Dimension;
import java.awt.Font;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.ParseException;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Set;

import javax.swing.Icon;
import javax.swing.JFormattedTextField;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import javax.swing.event.EventListenerList;
import javax.swing.text.DefaultFormatterFactory;
import javax.swing.text.NumberFormatter;

import edu.colorado.phet.common.phetcommon.simsharing.messages.IParameterValue;
import edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterValues;
import edu.colorado.phet.common.phetcommon.view.controls.HTMLLabel;
import edu.colorado.phet.common.phetcommon.view.util.PhetFont;


/**
 * AbstractValueControl combines a slider and a text field into a single control.
 * This class deals with the user's interaction with the slider and text field,
 * and the synchronization of the slider and text field.  The specifics of the
 * layout is handled by an ILayoutStrategy.
 * <p/>
 * The slider supports double precision numbers, whereas JSlider only support integers.
 * As the slider value is changed, the text field automatically updates to reflect the
 * new value.  The text field is editable by default, and user input is validated.
 * <p/>
 * The default "look" is to have numeric labels at the min and max tick marks,
 * and no minor tick marks.
 * <p/>
 * A note on the design philosophy for this class...
 * Rather than provide a constructor that permits lots of customization
 * (and therefore has an explosion of arguments),
 * I've provided a single constructor that provides the most common behavior
 * for this control, hopefully setting a standard for PhET.  If you need to
 * customize the behavior, there are many setters provided.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public abstract class AbstractValueControl extends JPanel {

    //----------------------------------------------------------------------------
    // Instance data
    //----------------------------------------------------------------------------

    // Model
    private double _value; // the current value
    private double _majorTickSpacing; // spacing of major tick marks
    private double _minorTickSpacing; // spacing of minor tick marks
    private double _upDownArrowDelta; // delta applied when you press the up/down arrow keys

    // View
    private AbstractSlider _slider; // slider that supports model coordinates
    private JFormattedTextField _textField;
    private HTMLLabel _valueLabel, _unitsLabel;
    private Font _font; // font used for all components
    private NumberFormat _textFieldFormat; // format for the text field
    private DecimalFormat _tickFormat; // format for the tick mark labels
    private boolean _majorTicksVisible; // are major ticks & labels visible?
    private boolean _minorTicksVisible; // are minor ticks & labels visible?
    private Hashtable<Number, JLabel> _labelTable; // label table, to hold labels added via addTickLabel

    // misc.
    private boolean _notifyWhileAdjusting; // if true, fire ChangeEvents while the slider is adjusting
    private boolean _isAdjusting; // is the slider being adjusted (dragged) ?
    private EventListenerList _listenerList; // notification of slider changes
    private TextFieldListener _textFieldListener; // handles events related to textfield
    private SliderListener _sliderListener; // handles events related to the slider
    private boolean _initialized; // true when the constructor has completed
    private boolean _paintTickLabels;
    private boolean _signifyOutOfBounds; //true if the system should beep and print a message when out-of-bounds value is requested

    //----------------------------------------------------------------------------
    // Constructors
    //----------------------------------------------------------------------------

    /**
     * Constructor.
     *
     * @param slider
     * @param label            label that appears to the left of the value
     * @param textFieldPattern pattern used to format the text field (see DecimalFormat)
     * @param units            units that appear to the right of the value
     * @param layoutStrategy
     * @throws IllegalArgumentException
     */
    public AbstractValueControl( AbstractSlider slider, String label, String textFieldPattern, String units, ILayoutStrategy layoutStrategy ) {
        super();

        _slider = slider;
        _slider.setPaintTicks( true ); // Needed to make the knob reasonably large, see #2979.

        _majorTickSpacing = _slider.getModelRange(); // default is major tick marks at min and max
        _minorTickSpacing = 0;
        _upDownArrowDelta = _slider.getModelRange() / 100;
        _slider.setUpDownArrowDelta( _upDownArrowDelta );

        _textFieldFormat = new DecimalFormat( textFieldPattern );
        _tickFormat = new DecimalFormat( textFieldPattern ); // use same format for ticks and textfield
        _majorTicksVisible = true; // major tick labels visible
        _minorTicksVisible = false; // minor tick labels are typically not visible
        _labelTable = null; // instantiated when addTickLabel is called
        _paintTickLabels = true;
        _signifyOutOfBounds = true;

        _notifyWhileAdjusting = true; // provide change notification while slider is dragging
        _isAdjusting = false;
        _font = new PhetFont();
        _listenerList = new EventListenerList();

        // Labels
        _valueLabel = new HTMLLabel( label );
        _unitsLabel = new HTMLLabel( units );

        // Textfield
        _textField = new JFormattedTextField( _textFieldFormat );
        _textField.setValue( new Double( _value ) );
        _textField.setHorizontalAlignment( JTextField.RIGHT );
        _textField.setColumns( textFieldPattern.length() );

        // Layout the components
        layoutStrategy.doLayout( this );

        // Listeners
        _sliderListener = new SliderListener();
        _slider.addChangeListener( _sliderListener );
        _slider.addMouseListener( _sliderListener );
        _textFieldListener = new TextFieldListener();
        _textField.addActionListener( _textFieldListener );
        _textField.addFocusListener( _textFieldListener );
        _textField.addKeyListener( _textFieldListener );

        updateTickLabels();

        _value = _slider.getModelMin() - 1; // force setValue to initalize the components
        setValue( slider.getModelValue() );

        _initialized = true;
    }

    //----------------------------------------------------------------------------
    // Access to components.
    //
    // NOTE !!
    // These methods are provided primarily for use by ILayoutStrategy subclasses.
    // But you can use these to customize the components in ways that are 
    // not supported by this class.  If you do so, proceed with caution.
    //----------------------------------------------------------------------------

    /**
     * Gets a reference to the slider component.
     *
     * @return the slider
     */
    public AbstractSlider getSlider() {
        return _slider;
    }

    /**
     * Gets a reference to the text field component.
     *
     * @return the text field
     */
    public JFormattedTextField getTextField() {
        return _textField;
    }

    /**
     * Gets a reference to the value label.
     *
     * @return JLabel
     */
    public JLabel getValueLabel() {
        return _valueLabel;
    }

    /**
     * Convenience method for adding an icon to the left of the textual value label.
     * If you need some other type of layout, use getValueLabel to access the JLabel directly.
     *
     * @param icon
     */
    public void setValueLabelIcon( Icon icon ) {
        _valueLabel.setIcon( icon );
        _valueLabel.setVerticalTextPosition( JLabel.CENTER );
        _valueLabel.setHorizontalTextPosition( JLabel.RIGHT );
    }

    /**
     * Gets a reference to the units label.
     *
     * @return JLabel
     */
    public JLabel getUnitsLabel() {
        return _unitsLabel;
    }

    //----------------------------------------------------------------------------
    // Accessors
    //----------------------------------------------------------------------------

    /**
     * Sets the value.
     *
     * @param value
     */
    public void setValue( double value ) {
        if ( value != _value ) {
            setValue( value, true );
        }
    }

    /*
     * Sets the value and optionally fires a ChangeEvent.
     * 
     * @param value
     * @param notify
     */
    private void setValue( double value, boolean notify ) {
        if ( isValueInRange( value ) ) {
            _value = value;
            updateView();
            if ( notify ) {
                fireChangeEvent( new ChangeEvent( this ) );
            }
        }
        else {
            if ( value < getMinimum() ) {
                _value = getMinimum();
            }
            else if ( value > getMaximum() ) {
                _value = getMaximum();
            }
            textFieldCorrected( ParameterValues.rangeError, String.valueOf( value ), _value );
            beep();
            updateView(); // revert
        }
    }

    /*
     * Returns true if the specified value is in the allowed range of this control.
     * This method can be overriden (e.g. to always return true) to allow all values 
     */
    protected boolean isValueInRange( double value ) {
        return value >= getMinimum() && value <= getMaximum();
    }

    /**
     * Gets the value.
     *
     * @return the value
     */
    public double getValue() {
        return _value;
    }

    /**
     * Changes the min/max range.
     *
     * @param min
     * @param max
     */
    public void setRange( double min, double max ) {
        _slider.setModelRange( min, max );
        if ( _value < min ) {
            setValue( min );
        }
        else if ( _value > max ) {
            setValue( max );
        }
        else {
            // use this form of setValue to reset the existing value
            setValue( _value, true );
        }
        updateTickLabels();
    }

    /**
     * Set a range and value simultaneously; this method should be used if the new range doesn't contain the old value.
     *
     * @param min   the new minimum
     * @param max   the new maximum
     * @param value the new value
     */
    public void setRangeAndValue( double min, double max, double value ) {
        _slider.setModelRange( min, max );
        setValue( value );
        updateTickLabels();
    }

    /**
     * Gets maximum value.
     *
     * @return max
     */
    public double getMaximum() {
        return _slider.getModelMax();
    }

    /**
     * Gets minimum value.
     *
     * @return min
     */
    public double getMinimum() {
        return _slider.getModelMin();
    }

    /**
     * Sets the delta used when pressing the up and down arrow keys.
     *
     * @param delta
     */
    public void setUpDownArrowDelta( double delta ) {
        _upDownArrowDelta = delta;
        _slider.setUpDownArrowDelta( delta );
    }

    /**
     * Enables/disables this control and all of its components.
     *
     * @param enabled true or false
     */
    @Override
		public void setEnabled( boolean enabled ) {
        super.setEnabled( enabled );
        _valueLabel.setEnabled( enabled );
        _textField.setEnabled( enabled );
        _unitsLabel.setEnabled( enabled );
        _slider.setEnabled( enabled );
    }

    /**
     * Sets the fonts for all components that are part of this control.
     *
     * @param font
     */
    @Override
		public void setFont( Font font ) {
        super.setFont( font );
        if ( _initialized ) {
            _font = font;
            _valueLabel.setFont( font );
            _textField.setFont( font );
            _unitsLabel.setFont( font );
            _slider.setFont( font );
            updateTickLabels();
        }
    }

    /**
     * Sets tooltip text for all subcomponents.
     * When the user puts the cursor over any part of this control,
     * they will see the tooltip.
     *
     * @param text
     */
    @Override
		public void setToolTipText( String text ) {
        super.setToolTipText( text );
        _valueLabel.setToolTipText( text );
        _textField.setToolTipText( text );
        _unitsLabel.setToolTipText( text );
        _slider.setToolTipText( text );
    }

    //----------------------------------------------------------------------------
    // TextField
    //----------------------------------------------------------------------------

    /**
     * Makes the text field editable.
     *
     * @param editable
     */
    public void setTextFieldEditable( boolean editable ) {
        _textField.setEditable( editable );
    }

    /**
     * Changes visibility of the text field.
     *
     * @param visible true or false
     */
    public void setTextFieldVisible( boolean visible ) {
        _textField.setVisible( visible );
    }

    /**
     * Sets the pattern used to format the text field.
     *
     * @param pattern see DecimalFormat
     */
    public void setTextFieldPattern( String pattern ) {
        _textFieldFormat = new DecimalFormat( pattern );
        _textField.setColumns( pattern.length() );
        updateView();
    }

    /**
     * Sets the NumberFormat to be used in the text field.
     * <p/>
     * This NumberFormat will replace any value set by setTextFieldPattern
     *
     * @param format the format to use
     */
    protected void setTextFieldFormat( NumberFormat format ) {
        _textFieldFormat = format;
        _textField.setFormatterFactory( new DefaultFormatterFactory( new NumberFormatter( format ) ) );
        updateView();
    }

    /**
     * Sets the columns width of the text field.
     * The default is determined by the width of the text field pattern.
     *
     * @param columns
     */
    public void setTextFieldColumns( int columns ) {
        _textField.setColumns( columns );
    }

    /*
     * Gets the double value from the text field.
     */
    private double getTextFieldValue() {
        String text = _textField.getText();
        double value;
        try {
            Number number = _textFieldFormat.parse( text );
            value = number.doubleValue();
        }
        catch ( ParseException e ) {
            beep();
            value = _value;
        }
        return value;
    }

    /**
     * Changes the text value of the units label.
     *
     * @param units the new units label string
     */
    public void setUnits( String units ) {
        _unitsLabel.setText( units );
    }

    //----------------------------------------------------------------------------
    // Slider
    //----------------------------------------------------------------------------

    /**
     * Sets the width of the slider.
     *
     * @param width
     */
    public void setSliderWidth( int width ) {
        Dimension currentSize = _slider.getPreferredSize();
        _slider.setPreferredSize( new Dimension( width, currentSize.height ) );
    }

    /**
     * Determines whether the slider value is being dragged.
     *
     * @return true or false
     */
    public boolean isAdjusting() {
        return _isAdjusting;
    }

    /**
     * Determines whether ChangeEvents are fired while the slider is dragged.
     * If this is set to false, then ChangeEvents are fired only when the slider is released.
     *
     * @param b true or false
     */
    public void setNotifyWhileAdjusting( boolean b ) {
        _notifyWhileAdjusting = b;
    }

    /**
     * Determines whether the slider fires ChangeEvents while it is being dragged.
     *
     * @return true or false
     */
    public boolean getNotifyWhileAdjusting() {
        return _notifyWhileAdjusting;
    }

    //----------------------------------------------------------------------------
    // Tick marks
    //----------------------------------------------------------------------------

    /**
     * Sets the pattern used to format tick labels.
     * The same format is used for both major and minor tick labels.
     *
     * @param pattern see DecimalFormat
     */
    public void setTickPattern( String pattern ) {
        _tickFormat = new DecimalFormat( pattern );
        updateTickLabels();
    }

    /**
     * Sets the spacing between major tick marks.
     *
     * @param tickSpacing in model coordinates
     */
    public void setMajorTickSpacing( double tickSpacing ) {
        if ( tickSpacing != _minorTickSpacing ) {
            _majorTickSpacing = tickSpacing;
            updateTickLabels();
        }
    }

    /**
     * Sets whether the tick labels should be painted.
     * This is also determined by whether _minorTicksVisible and _majorTicksVisible are true.
     *
     * @param paintTickLabels true if the labels should be visible.
     */
    public void setPaintTickLabels( boolean paintTickLabels ) {
        if ( paintTickLabels != _paintTickLabels ) {
            _paintTickLabels = paintTickLabels;
            updateTickLabels();
        }
    }

    /**
     * Sets the spacing between minor tick marks.
     *
     * @param tickSpacing in model coordinates
     */
    public void setMinorTickSpacing( double tickSpacing ) {
        if ( tickSpacing != _minorTickSpacing ) {
            _minorTickSpacing = tickSpacing;
            updateTickLabels();
        }
    }

    /**
     * Controls the visibility of major ticks and their associated labels.
     *
     * @param visible true or false
     */
    public void setMajorTicksVisible( boolean visible ) {
        if ( visible != _majorTicksVisible ) {
            _majorTicksVisible = visible;
            updateTickLabels();
        }
    }

    /**
     * Controls the visibility of minor ticks and their associated labels.
     *
     * @param visible true or false
     */
    public void setMinorTicksVisible( boolean visible ) {
        if ( visible != _minorTicksVisible ) {
            _minorTicksVisible = visible;
            updateTickLabels();
        }
    }

    /**
     * Sets the tick labels.
     * Any previously set labels are replaced.
     * The key values in the Hashtable must be of type Number.
     *
     * @param labelTable
     * @throws IllegalArgumentException if any key in labelTable is not of type Number
     */
    public void setTickLabels( Hashtable<Number, JLabel> labelTable ) {
        clearTickLabels();
        Set<Number> keys = labelTable.keySet();
        Iterator<Number> i = keys.iterator();
        while ( i.hasNext() ) {
            Object o = i.next();
                double modelValue = ( (Number) o ).doubleValue();
                JLabel label = labelTable.get( o );
                addTickLabel( modelValue, label );
        }
        updateTickLabels();
    }

    /**
     * Labels a specified value with a string.
     *
     * @param value
     * @param string
     */
    public void addTickLabel( double value, String string ) {
        JLabel label = new JLabel( string );
        label.setFont( _font );
        addTickLabel( value, label );
    }

    /**
     * Labels a specified tick value with an arbitrary object.
     *
     * @param value
     * @param label
     */
    public void addTickLabel( double value, JLabel label ) {
        if ( _labelTable == null ) {
            _labelTable = new Hashtable<Number, JLabel>();
        }
        int sliderValue = _slider.modelToSlider( value );
        _labelTable.put( new Integer( sliderValue ), label );
        updateTickLabels();
    }

    /**
     * Clears all tick labels that were specified via setTickLabels or addTickLabel.
     */
    public void clearTickLabels() {
        _labelTable = null;
        updateTickLabels();
    }

    /**
     * Determines whether the slider snaps to tick marks.
     *
     * @param b true or false
     */
    public void setSnapToTicks( boolean b ) {
        _slider.setSnapToTicks( b );
    }

    //----------------------------------------------------------------------------
    // Private methods
    //----------------------------------------------------------------------------

    /*
     * Updates the view to match the model.
     */

    private void updateView() {

        _slider.removeChangeListener( _sliderListener );
        _slider.setModelValue( _value );
        _slider.addChangeListener( _sliderListener );

        _textField.removeActionListener( _textFieldListener );
        String text = _textFieldFormat.format( _value );
        _textField.setText( text );
        _textField.addActionListener( _textFieldListener );
    }

    /*
     * Updates tick labels.
     * If labels were specified via addTickLabel, use them.
     * Otherwise, generate numberic labels for the major and minor tick marks.
     */
    protected void updateTickLabels() {

        final double min = getMinimum();
        final double max = getMaximum();

        // Slider properties related to ticks
        if ( _majorTicksVisible && _majorTickSpacing > 0 ) {
            _slider.setMajorTickSpacing( _slider.modelToSlider( min + _majorTickSpacing ) );
        }
        else {
            // The tick spacing is set to 0 to hide the ticks rather than
            // using setPaintTicks.  This is done in order to avoid the "tiny
            // knob problem" on Win 7, see #2979.
            _slider.setMajorTickSpacing( 0 );
        }
        if ( _minorTicksVisible && _minorTickSpacing > 0 ) {
            _slider.setMinorTickSpacing( _slider.modelToSlider( min + _minorTickSpacing ) );
        }
        else {
            // The tick spacing is set to 0 to hide the ticks rather than
            // using setPaintTicks.  This is done in order to avoid the "tiny
            // knob problem" on Win 7, see #2979.
            _slider.setMinorTickSpacing( 0 );
        }
        _slider.setPaintLabels( ( _minorTicksVisible || _majorTicksVisible ) && _paintTickLabels );

        if ( _labelTable != null ) {
            // Use the labels provided via addTickLabel.
            _slider.setLabelTable( _labelTable );
        }
        else {
            // Generate numeric labels for major and minor tick marks.
            Hashtable<Number, JLabel> labelTable = new Hashtable<Number, JLabel>();

            // Major ticks
            if ( _majorTicksVisible ) {
                double value = min;
                while ( value <= max ) {
                    JLabel label = new JLabel( _tickFormat.format( value ) );
                    label.setFont( _font );
                    labelTable.put( new Integer( _slider.modelToSlider( value ) ), label );
                    value += _majorTickSpacing;
                }
            }

            // Minor ticks
            if ( _minorTicksVisible && _minorTickSpacing > 0 ) {
                double value = min + _minorTickSpacing;
                while ( value < max ) {
                    JLabel label = new JLabel( _tickFormat.format( value ) );
                    label.setFont( _font );
                    labelTable.put( new Integer( _slider.modelToSlider( value ) ), label );
                    value += _minorTickSpacing;
                }
            }

            if ( labelTable.size() != 0 ) {
                _slider.setLabelTable( labelTable );
            }
        }
    }

    //----------------------------------------------------------------------------
    // Event handling
    //----------------------------------------------------------------------------

    /*
     * Handles events related to the slider.
     */
    private class SliderListener extends MouseAdapter implements ChangeListener {
        /*
         * Slider was changed.
         */
        @Override
				public void stateChanged( ChangeEvent e ) {
            if ( e.getSource() == _slider ) {
                _isAdjusting = _slider.getValueIsAdjusting();
                boolean notify = ( _notifyWhileAdjusting || !_isAdjusting );
                double modelValue = _slider.getModelValue();
                sliderDrag( modelValue );
                setValue( modelValue, notify );
            }
        }

        @Override public void mousePressed( MouseEvent event ) {
            sliderStartDrag( _slider.getModelValue() );
        }

        @Override public void mouseReleased( MouseEvent event ) {
            sliderEndDrag( _slider.getModelValue() );
        }
    }

    /*
    * Handles events related to the textfield.
    */
    private class TextFieldListener extends KeyAdapter implements ActionListener, FocusListener {

        /*
         * Use the up/down arrow keys to change the value.
         */
        @Override
				public void keyPressed( KeyEvent e ) {
            if ( e.getSource() == _textField ) {
                if ( e.getKeyCode() == KeyEvent.VK_UP ) {
                    final double value = getValue() + _upDownArrowDelta;
                    if ( value <= getMaximum() ) {
                        textFieldCommitted( ParameterValues.upKey, value );
                        setValue( value );
                    }
                }
                else if ( e.getKeyCode() == KeyEvent.VK_DOWN ) {
                    final double value = getValue() - _upDownArrowDelta;
                    if ( value >= getMinimum() ) {
                        textFieldCommitted( ParameterValues.downKey, value );
                        setValue( value );
                    }
                }
            }
        }

        /*
         * User pressed enter in text field.
         */
        @Override
				public void actionPerformed( ActionEvent e ) {
            if ( e.getSource() == _textField ) {
                double value = getTextFieldValue();
                if ( value != getValue() ) {
                    textFieldCommitted( ParameterValues.enterKey, value );
                    setValue( value );
                }
            }
        }

        /*
         * Selects the entire value text field when it gains focus.
         */
        @Override
				public void focusGained( FocusEvent e ) {
            if ( e.getSource() == _textField ) {
                _textField.selectAll();
            }
        }

        /*
         * Processes the contents of the value text field when it loses focus.
         */
        @Override
				public void focusLost( FocusEvent e ) {
            if ( e.getSource() == _textField ) {
                try {
                    _textField.commitEdit();
                    double value = getTextFieldValue();
                    if ( value != getValue() ) {
                        textFieldCommitted( ParameterValues.focusLost, value );
                        setValue( value );
                    }
                }
                catch ( ParseException pe ) {
                    textFieldCorrected( ParameterValues.parseError, _textField.getText(), getValue() );
                    beep();
                    updateView(); // revert
                }
            }
        }
    }

    //----------------------------------------------------------------------------
    // ChangeListener management
    //----------------------------------------------------------------------------

    /**
     * Adds a ChangeListener.
     *
     * @param listener the listener
     */
    public void addChangeListener( ChangeListener listener ) {
        _listenerList.add( ChangeListener.class, listener );
    }

    /**
     * Removes a ChangeListener.
     *
     * @param listener the listener
     */
    public void removeChangeListener( ChangeListener listener ) {
        _listenerList.remove( ChangeListener.class, listener );
    }

    /**
     * Fires a ChangeEvent.
     *
     * @param event the event
     */
    private void fireChangeEvent( ChangeEvent event ) {
        Object[] listeners = _listenerList.getListenerList();
        for ( int i = 0; i < listeners.length; i += 2 ) {
            if ( listeners[i] == ChangeListener.class ) {
                ( (ChangeListener) listeners[i + 1] ).stateChanged( event );
            }
        }
    }

    /**
     * Sets whether the system should beep when out of bounds value is requested
     *
     * @param signifyOutOfBounds true if the system should beep when out of bounds value is requested
     */
    public void setSignifyOutOfBounds( boolean signifyOutOfBounds ) {
        this._signifyOutOfBounds = signifyOutOfBounds;
    }

    private void beep() {
        if ( _signifyOutOfBounds ) {
            Toolkit.getDefaultToolkit().beep();
        }
    }

    //----------------------------------------------------------------------------
    // Sim-sharing hooks, override these in subclasses.
    //----------------------------------------------------------------------------

    // User starts slider drag sequence.
    protected void sliderStartDrag( double modelValue ) {
    }

    // User ends slider drag sequence.
    protected void sliderEndDrag( double modelValue ) {
    }

    // User is dragging the slider.
    protected void sliderDrag( double modelValue ) {
    }

    // User does something to commit the text field.
    protected void textFieldCommitted( IParameterValue commitAction, double value ) {
    }

    // Invalid input is encountered and corrected in the text field.
    protected void textFieldCorrected( IParameterValue errorType, String text, double correctedValue ) {
    }
}
