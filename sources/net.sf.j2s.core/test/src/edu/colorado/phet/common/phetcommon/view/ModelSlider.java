// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author:samreid $
 * Revision : $Revision:14677 $
 * Date modified : $Date:2007-04-17 03:40:29 -0500 (Tue, 17 Apr 2007) $
 */
package edu.colorado.phet.common.phetcommon.view;

import java.awt.AWTException;
import java.awt.BorderLayout;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.RenderingHints;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.FocusAdapter;
import java.awt.event.FocusEvent;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.EventListener;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Set;

import javax.swing.BorderFactory;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JSlider;
import javax.swing.JTextField;
import javax.swing.SwingConstants;
import javax.swing.Timer;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

import edu.colorado.phet.common.phetcommon.math.ModelViewTransform1D;
import edu.colorado.phet.common.phetcommon.resources.PhetCommonResources;
import edu.colorado.phet.common.phetcommon.view.util.PhetFont;
import edu.colorado.phet.common.phetcommon.view.util.PhetOptionPane;
import edu.colorado.phet.common.phetcommon.view.util.SwingUtils;

/**
 * ModelSlider combines title, slider, and textfield, with units for normal usage.
 * It also encapsulates a transform between view and model coordinates.
 *
 * @author Ron LeMaster
 * @version $Revision:14677 $
 */
@SuppressWarnings("serial")
public class ModelSlider extends JPanel {
    private JTextField textField;
    private JSlider slider;
    private ModelViewTransform1D modelViewTransform;
    private String units;
    private Font titleFont = new PhetFont( Font.BOLD, 12 );
    private NumberFormat textFieldFormat;
    // Format for the numbers that appear below the JSlider
    private NumberFormat sliderLabelFormat;
    private static final int SLIDER_MAX = 100000000;
    private static final int SLIDER_MIN = 0;
    private double min;
    private double max;
    private double initialValue;
    private ArrayList<EventListener> listeners = new ArrayList<EventListener>();
    private double value = Double.NaN;  //to force an update at the end of the constructor.
    private int numMajorTicks;
    private int numMinorTicks;
    private JLabel titleLabel;
    private JTextField unitsReadout;
    private String title;
    private JPanel textPanel;
    private boolean settingSliderValue = false;

    //-----------------------------------------------------------------
    // Constructors and initialization
    //-----------------------------------------------------------------

    /**
     * Creates a ModelSlider with a default DecimalFormat
     *
     * @param title
     * @param units
     * @param min
     * @param max
     * @param initial
     */
    public ModelSlider( String title, String units, final double min, final double max, double initial ) {
        this( title, units, min, max, initial, new DecimalFormat( "0.0#" ), new DecimalFormat( "0.0#" ) );
    }

    public ModelSlider( String title, String units, final double min, final double max,
                        double initialValue, NumberFormat textFieldFormat ) {
        this( title, units, min, max, initialValue, textFieldFormat, textFieldFormat );
    }

    /**
     * Creates a ModelSlider with a specified DecimalFormat
     *
     * @param title
     * @param units
     * @param min
     * @param max
     * @param initialValue
     * @param textFieldFormat
     * @param sliderLabelFormat
     */
    public ModelSlider( String title, String units, final double min, final double max,
                        double initialValue, NumberFormat textFieldFormat, NumberFormat sliderLabelFormat ) {
        init( min, max, textFieldFormat, sliderLabelFormat, units, initialValue, title );
    }

    /**
     * @param min
     * @param max
     * @param textFieldFormat
     * @param units
     * @param initialValue
     * @param title
     */
    private void init( final double min, final double max,
                       NumberFormat textFieldFormat, NumberFormat sliderLabelFormat,
                       String units, double initialValue, String title ) {

        // In case this has been called in response to a change in some characteristic, remove all the items in the
        // control
        while ( getComponentCount() > 0 ) {
            this.remove( getComponent( 0 ) );
        }

        this.title = title;
        this.min = min;
        this.max = max;
        this.textFieldFormat = textFieldFormat;
        this.sliderLabelFormat = sliderLabelFormat;
        this.units = units;
        this.modelViewTransform = new ModelViewTransform1D( min, max, SLIDER_MIN, SLIDER_MAX );
        this.initialValue = initialValue;
        numMajorTicks = 5;
        int numMinorsPerMajor = 2;
        numMinorTicks = ( numMajorTicks - 1 ) * numMinorsPerMajor + 1;

        setLayout( new GridBagLayout() );
        setBorder( BorderFactory.createEtchedBorder() );
        createTextField();
        textField.setHorizontalAlignment( JTextField.RIGHT );

        createSlider();

        titleLabel = new JLabel( title ) {
            @Override
						protected void paintComponent( Graphics g ) {
                //added antialias for the ModelSlider title
                ( (Graphics2D) g ).setRenderingHint( RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON );
                super.paintComponent( g );
            }
        };
        titleLabel.setFont( titleFont );

        unitsReadout = new JTextField( " " + this.units );
        unitsReadout.setFocusable( false );
        unitsReadout.setEditable( false );
        unitsReadout.setBorder( null );

        textPanel = new JPanel();
        textPanel.setLayout( new BorderLayout() );
        textPanel.add( textField, BorderLayout.WEST );
        textPanel.add( unitsReadout, BorderLayout.EAST );
        try {
            SwingUtils.addGridBagComponent( this, titleLabel, 0, 0, 1, 1,
                                            GridBagConstraints.NONE, GridBagConstraints.CENTER );
            SwingUtils.addGridBagComponent( this, slider, 0, 1, 1, 1,
                                            GridBagConstraints.NONE, GridBagConstraints.CENTER );
            SwingUtils.addGridBagComponent( this, textPanel, 0, 2, 2, 1,
                                            GridBagConstraints.NONE, GridBagConstraints.CENTER );
        }
        catch ( AWTException e ) {
            throw new RuntimeException( e );
        }
        setValue( initialValue );
    }

    public double getMinimumModelValue() {
        return min;
    }

    public double getMaximumModelValue() {
        return max;
    }

    /**
     * Creates the JSlider for this object
     */
    private void createSlider() {
        int initSliderValue = modelViewTransform.modelToView( initialValue );
        if ( initSliderValue < SLIDER_MIN || initSliderValue > SLIDER_MAX ) {
            throw new RuntimeException( "Illegal slider value, min=" + SLIDER_MIN + ", max=" + SLIDER_MAX + ", value=" + initSliderValue );
        }
        final JSlider slider = new JSlider( SwingConstants.HORIZONTAL,
                                            SLIDER_MIN, SLIDER_MAX, initSliderValue );

        slider.setPaintTicks( true );
        slider.setPaintLabels( true );
        slider.addChangeListener( new ChangeListener() {
            @Override
						public void stateChanged( ChangeEvent e ) {
                int sliderValue = slider.getValue();
                double modelValue = modelViewTransform.viewToModel( sliderValue );
                if ( !settingSliderValue ) {
                    setValue( modelValue );
                }
            }
        } );
        int dMinor = SLIDER_MAX / ( numMinorTicks - 1 );
        double modelDX = Math.abs( modelViewTransform.viewToModel( dMinor / 4 ) );
        SliderKeyHandler skh = new SliderKeyHandler( modelDX );
        slider.addKeyListener( skh );
        this.slider = slider;
        relabelSlider();
    }

    /**
     * Creates the JTextField for this object
     */
    private void createTextField() {
        JTextField textField = new JTextField( 8 );
        textField.addFocusListener( new FocusAdapter() {
            @Override
						public void focusGained( FocusEvent e ) {
            }

            @Override
						public void focusLost( FocusEvent e ) {
                setValue( getValue() );
            }
        } );
        textField.addKeyListener( new KeyAdapter() {
            @Override
						public void keyReleased( KeyEvent e ) {
                if ( e.getKeyCode() == KeyEvent.VK_ENTER ) {
                    testCommit();
                }
                else if ( e.getKeyCode() == KeyEvent.VK_SPACE || e.getKeyCode() == KeyEvent.VK_ESCAPE ) {
                    setValue( initialValue );
                }
            }
        } );
        this.textField = textField;
    }

    /**
     * Computes the numbers that appear directly below the slider, formats them, and adds
     * them as labels to the slider. Also lays out the tick marks
     */
    private void relabelSlider() {
        int dMajor = SLIDER_MAX / ( numMajorTicks - 1 );
        int dMinor = SLIDER_MAX / ( numMinorTicks - 1 );
        Font labelFont = new PhetFont( 0, 10 );
        Hashtable<Number, JLabel> table = new Hashtable<Number, JLabel>();
        for ( int value = 0; value <= SLIDER_MAX; value += dMajor ) {
            double modelValue = modelViewTransform.viewToModel( value );
            JLabel label = new JLabel( sliderLabelFormat.format( modelValue ) );
            label.setFont( labelFont );
            table.put( new Integer( value ), label );
        }
        slider.setLabelTable( table );

        slider.setMajorTickSpacing( dMajor );
        slider.setMinorTickSpacing( dMinor );
    }

    public void requestSliderFocus() {
        slider.requestFocus();
    }

    //-----------------------------------------------------------------
    // Setters and getters
    //-----------------------------------------------------------------

    @Override
		public void setEnabled( boolean enabled ) {
        super.setEnabled( enabled );
        slider.setEnabled( enabled );
        textField.setEnabled( enabled );
        unitsReadout.setEnabled( enabled );
        titleLabel.setEnabled( enabled );
        @SuppressWarnings("unchecked")
				Enumeration<Number> keys = slider.getLabelTable().keys();
        while ( keys.hasMoreElements() ) {
            Object key = keys.nextElement();
            Object value = slider.getLabelTable().get( key );
            if ( value instanceof Component ) {
                Component component = (Component) value;
                component.setEnabled( enabled );
            }
        }
    }

    public void setTitleFont( Font titleFont ) {
        titleLabel.setFont( titleFont );
        relabelSlider();
    }

    public void setSliderLabelFormat( NumberFormat sliderLabelFormat ) {
        this.sliderLabelFormat = sliderLabelFormat;
        relabelSlider();
    }

    public void setTextFieldFormat( NumberFormat textFieldFormat ) {
        this.textFieldFormat = textFieldFormat;
    }

    public JLabel getTitleLabel() {
        return titleLabel;
    }

    public JTextField getTextField() {
        return textField;
    }

    public JTextField getUnitsReadout() {
        return unitsReadout;
    }

    public void setNumMajorTicks( int numMajorTicks ) {
        this.numMajorTicks = numMajorTicks;
        relabelSlider();
    }

    public void setMajorTickSpacing( double spacing ) {
        int numTicks = (int) ( ( this.max - this.min ) / spacing ) + 1;
        setNumMajorTicks( numTicks );
    }

    public void setNumMinorTicks( int numMinorTicks ) {
        this.numMinorTicks = numMinorTicks;
        relabelSlider();
    }

	public void setModelTicks(double[] ticks) {
		Hashtable<Number, JLabel> table = new Hashtable<Number, JLabel>();
		for (int i = 0; i < ticks.length; i++) {
			double tick = ticks[i];
			table.put(new Double(tick), new JLabel(sliderLabelFormat.format(tick)));
		}
		setModelLabels(table);
	}

    public void setModelLabels( Hashtable<Number, JLabel> modelLabels ) {
        Hashtable<Number, JLabel> viewLabels = new Hashtable<Number, JLabel>();
        Set<Number> keys = modelLabels.keySet();
        Iterator<Number> it = keys.iterator();
        while ( it.hasNext() ) {
        	Number modelValue = it.next();
           double v = modelValue.doubleValue();
            int viewValue = modelViewTransform.modelToView( v );
            viewLabels.put( new Integer( viewValue ), modelLabels.get( modelValue ) );
        }
        slider.setLabelTable( viewLabels );
    }

    public void setPaintTicks( boolean paintTicks ) {
        slider.setPaintTicks( paintTicks );
        relabelSlider();
    }

    public void setPaintLabels( boolean paintLabels ) {
        slider.setPaintLabels( paintLabels );
        relabelSlider();
    }

    public void setRange( double min, double max ) {
        double val = getValue();
        this.min = min;
        this.max = max;
        if ( val < min ) {
            val = min;
        }
        if ( val > max ) {
            val = max;
        }
        modelViewTransform = new ModelViewTransform1D( min, max, SLIDER_MIN, SLIDER_MAX );
        setValue( val );
    }

    public void setMaximum( double max ) {
        init( min, max, textFieldFormat, sliderLabelFormat, units, initialValue, title );
    }

    private void fireStateChanged() {
        for ( int i = 0; i < listeners.size(); i++ ) {
            ChangeListener changeListener = (ChangeListener) listeners.get( i );
            ChangeEvent ce = new ChangeEvent( this );
            changeListener.stateChanged( ce );
        }
    }

    public boolean testCommit() {
        try {
            commitEdit();
            return true;
        }
        catch ( IllegalValueException ive ) {
            String outofrange = PhetCommonResources.getInstance().getLocalizedString( "Common.ModelSlider.OutOfRange" );
            String minimum = PhetCommonResources.getInstance().getLocalizedString( "Common.ModelSlider.Minimum" );
            String maximum = PhetCommonResources.getInstance().getLocalizedString( "Common.ModelSlider.Maximum" );
            String youentered = PhetCommonResources.getInstance().getLocalizedString( "Common.ModelSlider.YouEntered" );
            String description = PhetCommonResources.getInstance().getLocalizedString( "Common.ModelSlider.Description" );
            PhetOptionPane.showMessageDialog( this, outofrange + ".\n" + minimum + "= " + ive.getMin()
                                                    + ", " + maximum + "=" + ive.getMax() + "\n" + youentered + ": "
                                                    + ive.getValue(), description, JOptionPane.ERROR_MESSAGE );
            double value = getValue();
            textField.setText( textFieldFormat.format( value ) );
            return false;
        }
    }

    public void setTextFieldVisible( boolean visible ) {
        textPanel.setVisible( visible );
    }

    public static class IllegalValueException extends Exception {
        private double min;
        private double max;
        private double value;

        public IllegalValueException( double min, double max, double value ) {
            super( IllegalValueException.class.getName() + " min=" + min + ", max=" + max + " value=" + value );
            this.min = min;
            this.max = max;
            this.value = value;
        }

        public double getMin() {
            return min;
        }

        public double getMax() {
            return max;
        }

        public double getValue() {
            return value;
        }

    }

//    TODO: Fix this number parsing:
//    TODO: deprecate usage of ModelSlider, in favor of LinearValueControl
//    TODO: consolidate usages of ModelSlider
//    An English string like "12,345.6" will be incorrectly changed to "12.345.6", since the European decimal char happens to be the same as the English separator char.  (Localization typically handles separator and decimal chars separately.)
//
//    A more robust method for parsing a number from a localized string is to use NumberFormat.parse, which handles all locales.
//
//    For example:
//
//        String text = ... /* some text string, possibly European number format */
//        DecimalFormat format = new DecimalFormat(...);
//        Number number = null;
//        try {
//           number = format.parse( text );
//        }
//        catch ( ParseException pe ) {
//           //...
//        }
//        double value = number.doubleValue();
//

    //    I haven't made any changes to these classes because I don't use them and don't have the time to test adequately.  Up to you whether you think it's worth changing, or at least noting the pitfalls with a comment.

    public void commitEdit() throws IllegalValueException {
        String text = ModelSlider.this.textField.getText();
        try {
            double value = DecimalFormat.getNumberInstance().parse( text ).doubleValue();
            if ( value >= min && value <= max ) {
                //still legal.
                setValue( value );
            }
            else {
                //we could display a message that reminds the user to stay between the min and max values.
                throw new IllegalValueException( min, max, value );
            }
        }
        catch ( NumberFormatException nfe ) {
        }
        catch ( ParseException e ) {
            e.printStackTrace();
        }
    }

    private class SliderKeyHandler implements KeyListener {
        int keyCode = -1;
        private Timer timer;
        private double delta;

        public SliderKeyHandler( double delta ) {
            this.delta = delta;
            timer = new Timer( 30, new ActionListener() {
                @Override
								public void actionPerformed( ActionEvent e ) {
                    fire();
                }
            } );
            timer.setInitialDelay( 300 );
        }

        private void fire() {
            if ( keyCode == -1 ) {
                return;
            }
            else if ( keyCode == KeyEvent.VK_LEFT || keyCode == KeyEvent.VK_DOWN ) {
                double request = getValue() - delta;
                if ( request < min ) {
                    request = min;
                }
                setValue( request );
            }
            else if ( keyCode == KeyEvent.VK_RIGHT || keyCode == KeyEvent.VK_UP ) {
                double request = getValue() + delta;
                if ( request > max ) {
                    request = max;
                }
                setValue( request );
            }
            else if ( keyCode == KeyEvent.VK_ESCAPE || keyCode == KeyEvent.VK_SPACE ) {
                setValue( initialValue );
            }
        }

        @Override
				public void keyPressed( KeyEvent e ) {
            keyCode = e.getKeyCode();
            fire();
            timer.setInitialDelay( 200 );
            timer.start();
        }

        @Override
				public void keyReleased( KeyEvent e ) {
            keyCode = -1;
            timer.stop();
        }

        @Override
				public void keyTyped( KeyEvent e ) {
            keyCode = e.getKeyCode();
            fire();
        }
    }

    public void setValue( final double value ) {
        //bugfix: test for change of state was incomplete: comparing the new 'value' against the old 'value' missed valid changes in the transform.
        if ( slider.getValue() == modelViewTransform.modelToView( value ) && this.value == value ) {
            return;
        }
        if ( value >= min && value <= max ) {
            String string = textFieldFormat.format( value );
            double newValue = value;
            try {

                newValue = textFieldFormat.parse( string ).doubleValue();
//                System.out.println( "value="+value+", string = " + string +", newValue="+newValue);
            }
            catch ( ParseException e ) {
                e.printStackTrace();
            }
//            string = string.replace( ',', '.' );
//            double newValue = Double.parseDouble( string );
            if ( slider.getValue() == modelViewTransform.modelToView( value ) && this.value == newValue ) {
                return;
            }

            this.value = newValue;
            textField.setText( string );
            int sliderValue = modelViewTransform.modelToView( value );
            if ( sliderValue != slider.getValue() ) {
                settingSliderValue = true;//disable recursive calls to this method
                slider.setValue( sliderValue ); //this recursively changes values
                settingSliderValue = false;
                slider.revalidate();
                slider.repaint();
            }
            fireStateChanged();
        }
    }

    public double getValue() {
        return this.value;
    }

    public void addChangeListener( ChangeListener changeListener ) {
        listeners.add( changeListener );
    }

    public void removeChangeListener( ChangeListener changeListener ) {
        listeners.remove( changeListener );
    }

    public ChangeListener getChangeListener( int i ) {
        return (ChangeListener) listeners.get( i );
    }

    public int numChangeListeners() {
        return listeners.size();
    }

    public void setNumMinorTicksPerMajorTick( int numMinorsPerMajor ) {
        int testValue = ( numMajorTicks - 1 ) * numMinorsPerMajor + 1;
        setNumMinorTicks( testValue );
    }

    public void setExtremumLabels( JLabel low, JLabel high ) {
        Hashtable<Number, JLabel> labelTable = new Hashtable<Number, JLabel>();
        labelTable.put( new Integer( slider.getMinimum() ), low );
        labelTable.put( new Integer( slider.getMaximum() ), high );
        slider.setLabelTable( labelTable );
    }

    public JSlider getSlider() {
        return slider;
    }

    public void setPreferredSliderWidth( int width ) {
        slider.setPreferredSize( new Dimension( width, (int) slider.getPreferredSize().getHeight() ) );
    }

}
