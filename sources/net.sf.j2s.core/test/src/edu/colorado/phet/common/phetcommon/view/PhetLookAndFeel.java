// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view;


import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Frame;
import java.awt.Insets;
import java.awt.Toolkit;
import java.awt.Window;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.swing.JPanel;
import javax.swing.SwingUtilities;
import javax.swing.UIDefaults;
import javax.swing.UIManager;
import javax.swing.UnsupportedLookAndFeelException;
import javax.swing.plaf.ColorUIResource;
import javax.swing.plaf.FontUIResource;
import javax.swing.plaf.InsetsUIResource;

import com.sun.java.swing.plaf.windows.WindowsLookAndFeel;

import edu.colorado.phet.common.phetcommon.resources.PhetCommonResources;
import edu.colorado.phet.common.phetcommon.util.PhetUtilities;
import edu.colorado.phet.common.phetcommon.view.util.PhetFont;

/**
 * PhetLookAndFeel manages the Look and Feel for a PhetApplication.
 * It provides convenience methods for setting background color, fonts, etc.
 * <p/>
 * Sample subclass:
 * <code>
 * class SamplePhetLookAndFeel extends PhetLookAndFeel {
 * public TestPhetLookAndFeelExample() {
 * setBackgroundColor( Color.blue );
 * setForegroundColor( Color.white );
 * setFont( new PhetDefaultFont( Font.BOLD, 24 ) );
 * }
 * }
 * </code>
 * Sample usage:
 * <code>
 * phetApplication.setPhetLookAndFeel(new SamplePhetLookAndFeel());
 * </code>
 * * <p/>
 *
 * @author ?
 * @version $Revision: 54200 $
 */
@SuppressWarnings("restriction")
public class PhetLookAndFeel {

    //----------------------------------------------------------------------------
    // Class<?> data
    //----------------------------------------------------------------------------

    public static final String PHET_LOGO_120x50 = "logos/phet-logo-120x50.jpg";

    // These are the types (in alphabetical order) that will have their UIDefaults uniformly modified.
    private static final String[] types = new String[] {
            "Button", "CheckBox", "CheckBoxMenuItem", "ComboBox", "Dialog",
            "Label", "Menu", "MenuBar", "MenuItem",
            "OptionPane", "Panel",
            "RadioButton", "RadioButtonMenuItem",
            "Slider", "Spinner",
            "TabbedPane",
            "TextArea",
            "TextField",
            "TextPane",
            "FormattedTextField",
            "ScrollBar", "Viewport"
    };

    private ArrayList<String> ignoreBackgroundList = new ArrayList<String>( Arrays.asList( new String[] {
            "TextArea", "TextField", "TextPane", "FormattedTextField", "MenuBar", "Menu", "MenuItem", "CheckBoxMenuItem" } ) );

    //----------------------------------------------------------------------------
    // Instance data
    //----------------------------------------------------------------------------

    private Font font = new PhetFont();
    private Font titledBorderFont = new PhetFont();
    private Font tabFont = new PhetFont();
    private Color foregroundColor;
    private Color backgroundColor;
    private Color buttonBackgroundColor;
    private Color textFieldBackgroundColor = Color.white;//necessary to get white textfields on webstart under 1.5?
    private Insets insets;
    private Color titledBorderTitleColor;

    //----------------------------------------------------------------------------
    // Constructors
    //----------------------------------------------------------------------------

    /**
     * Sole constructor.
     */
    public PhetLookAndFeel() {
        // defaults go here...
    }

    //----------------------------------------------------------------------------
    // Accessors and mutators
    //----------------------------------------------------------------------------

    public Font getFont() {
        return font;
    }

    public void setFont( Font font ) {
        if ( font == null ) { font = new PhetFont(); }

        this.font = font;
    }

    public Font getTabFont() {
        return tabFont;
    }

    public void setTabFont( Font tabFont ) {
        if ( tabFont == null ) { tabFont = new PhetFont(); }

        this.tabFont = tabFont;
    }

    public Font getTitledBorderFont() {
        return titledBorderFont;
    }

    public void setTitledBorderFont( Font borderFont ) {
        if ( titledBorderFont == null ) { titledBorderFont = new PhetFont(); }

        this.titledBorderFont = borderFont;
    }

    public Color getForegroundColor() {
        return foregroundColor;
    }

    public void setForegroundColor( Color foregroundColor ) {
        this.foregroundColor = foregroundColor;
    }

    public Color getBackgroundColor() {
        return backgroundColor;
    }

    public void setBackgroundColor( Color backgroundColor ) {
        this.backgroundColor = backgroundColor;
    }

    public Color getTextFieldBackgroundColor() {
        return textFieldBackgroundColor;
    }

    public void setTextFieldBackgroundColor( Color textFieldBackgroundColor ) {
        this.textFieldBackgroundColor = textFieldBackgroundColor;
    }

    public Insets getInsets() {
        return insets;
    }

    public void setInsets( Insets insets ) {
        this.insets = insets;
    }

    public Color getTitledBorderTitleColor() {
        return titledBorderTitleColor;
    }

    public void setTitledBorderTitleColor( Color titledBorderTitleColor ) {
        this.titledBorderTitleColor = titledBorderTitleColor;
    }

    //----------------------------------------------------------------------------
    // UIDefaults modification
    //----------------------------------------------------------------------------

    /**
     * Applies this PhetLookAndFeel, effectively installing the resources it
     * describes in the UIDefaults database.
     *
     * @deprecated use updateDefaults()
     */
    @Deprecated
		public void apply() {
        updateDefaults();
    }

    /**
     * Adds the look and feel values specified in this look and feel into the UIManager's defaults.
     */
    public void updateDefaults() {
        UIDefaults defaults = UIManager.getDefaults();
        putDefaults( defaults );
    }

    /**
     * Constructs the UIDefaults that correspond to this PhetLookAndFeel,
     * and installs them in the UIDefaults database.
     */
    public void putDefaults( UIDefaults uiDefaults ) {
        Object[] keyValuePairs = constructDefaults();
        uiDefaults.putDefaults( keyValuePairs );
    }

    /**
     * Creates an array of key/value pairs that describes the desired UIDefaults
     * for this PhetLookAndFeel.
     *
     * @return an array of key/value pairs
     */
    private Object[] constructDefaults() {

        // UI resources
        ColorUIResource backgroundResource = null;
        ColorUIResource foregroundResource = null;
        ColorUIResource textFieldBackgroundResource = null;
        InsetsUIResource insetsResource = null;
        ColorUIResource titledBorderTitleColorResource = null;

        // Construct UI resources
        if ( backgroundColor != null ) {
            backgroundResource = new ColorUIResource( backgroundColor );
        }
        if ( foregroundColor != null ) {
            foregroundResource = new ColorUIResource( foregroundColor );
        }
        if ( textFieldBackgroundColor != null ) {
            textFieldBackgroundResource = new ColorUIResource( textFieldBackgroundColor );
        }
        if ( insets != null ) {
            insetsResource = new InsetsUIResource( insets.top, insets.left, insets.bottom, insets.right );
        }
        if ( titledBorderTitleColor != null ) {
            titledBorderTitleColorResource = new ColorUIResource( titledBorderTitleColor );
        }

        // Uniformly modify the resources for each of the types in the "types" list.
        PropertyList list = new PropertyList();
        for ( int i = 0; i < types.length; i++ ) {
            String type = types[i];

            list.add( type, "font", new FontUIResource( font ) );

            if ( foregroundResource != null ) {
                list.add( type, "foreground", foregroundResource );
            }
            if ( backgroundResource != null && !ignoreBackgroundList.contains( type ) ) {
                list.add( type, "background", backgroundResource );
            }
            if ( insetsResource != null ) {
                list.add( type, "margin", insetsResource );
            }
            if ( titledBorderTitleColorResource != null ) {
                list.add( "TitledBorder", "titleColor", titledBorderTitleColorResource );
            }
        }

        // These types require some special modifications.
        list.add( "TitledBorder", "font", new FontUIResource( titledBorderFont ) );
        list.add( "OptionPane", "messageFont", new FontUIResource( font ) );
        list.add( "OptionPane", "buttonFont", new FontUIResource( font ) );

        if ( buttonBackgroundColor != null ) {
            list.add( "Button", "background", new ColorUIResource( buttonBackgroundColor ) );
        }

        if ( textFieldBackgroundResource != null ) {
            list.add( "TextField", "background", textFieldBackgroundResource );
        }

        if ( tabFont != null ) {
            list.add( "TabbedPane", "font", new FontUIResource( tabFont ) );
        }

        list.addAll( getTextValues() );

        return list.toArray();
    }

    private PropertyList getTextValues() {
        PropertyList textValues = new PropertyList();
        textValues.addAll( getOptionPaneStrings() );
        textValues.addAll( getFileDialogStrings() );
        textValues.addAll( getColorChooserStrings() );
        return textValues;
    }

    //See: http://beradrian.wordpress.com/2007/07/30/internationalization-for-swing-standard-components/
    //though it has some known problems with item #13
    private PropertyList getFileDialogStrings() {
        PropertyList textValues = new PropertyList();
        textValues.add( "FileChooser", "cancelButtonText", getCommonString( "Common.choice.cancel" ) );
        textValues.add( "FileChooser", "openDialogTitleText", getCommonString( "FileChooser.openDialogTitleText" ) );
        textValues.add( "FileChooser", "saveDialogTitleText", getCommonString( "FileChooser.saveDialogTitleText" ) );
        textValues.add( "FileChooser", "lookInLabelText", getCommonString( "FileChooser.lookInLabelText" ) );
        textValues.add( "FileChooser", "saveInLabelText", getCommonString( "FileChooser.saveInLabelText" ) );
        textValues.add( "FileChooser", "fileNameLabelText", getCommonString( "FileChooser.fileNameLabelText" ) );
        textValues.add( "FileChooser", "filesOfTypeLabelText", getCommonString( "FileChooser.filesOfTypeLabelText" ) );
        textValues.add( "FileChooser", "saveButtonText", getCommonString( "FileChooser.saveButtonText" ) );
        textValues.add( "FileChooser", "openButtonText", getCommonString( "FileChooser.openButtonText" ) );
        textValues.add( "FileChooser", "newFolderErrorText", getCommonString( "FileChooser.newFolderErrorText" ) );
        textValues.add( "FileChooser", "newFolderErrorSeparator", getCommonString( "FileChooser.newFolderErrorSeparator" ) );

        return textValues;
    }

    private PropertyList getOptionPaneStrings() {
        PropertyList textValues = new PropertyList();
        textValues.add( "OptionPane", "cancelButtonText", getCommonString( "Common.choice.cancel" ) );
        textValues.add( "OptionPane", "noButtonText", getCommonString( "Common.choice.no" ) );
        textValues.add( "OptionPane", "yesButtonText", getCommonString( "Common.choice.yes" ) );
        textValues.add( "OptionPane", "okButtonText", getCommonString( "Common.choice.ok" ) );
        return textValues;
    }

    private PropertyList getColorChooserStrings() {
        PropertyList textValues = new PropertyList();
        textValues.add( "ColorChooser", "cancelText", getCommonString( "Common.choice.cancel" ) );
        textValues.add( "ColorChooser", "okText", getCommonString( "Common.choice.ok" ) );
        textValues.add( "ColorChooser", "resetText", getCommonString( "ColorChooser.resetText" ) );
        textValues.add( "ColorChooser", "swatchesNameText", getCommonString( "ColorChooser.swatchesNameText" ) );
        textValues.add( "ColorChooser", "previewText", getCommonString( "ColorChooser.previewText" ) );
        textValues.add( "ColorChooser", "swatchesRecentText", getCommonString( "ColorChooser.swatchesRecentText" ) );
        textValues.add( "ColorChooser", "hsbNameText", getCommonString( "ColorChooser.hsbNameText" ) );
        textValues.add( "ColorChooser", "hsbHueText", getCommonString( "ColorChooser.hsbHueText" ) );
        textValues.add( "ColorChooser", "hsbSaturationText", getCommonString( "ColorChooser.hsbSaturationText" ) );
        textValues.add( "ColorChooser", "hsbBrightnessText", getCommonString( "ColorChooser.hsbBrightnessText" ) );
        textValues.add( "ColorChooser", "hsbRedText", getCommonString( "ColorChooser.hsbRedText" ) );
        textValues.add( "ColorChooser", "hsbGreenText", getCommonString( "ColorChooser.hsbGreenText" ) );
        textValues.add( "ColorChooser", "hsbBlueText", getCommonString( "ColorChooser.hsbBlueText" ) );
        textValues.add( "ColorChooser", "rgbNameText", getCommonString( "ColorChooser.rgbNameText" ) );
        textValues.add( "ColorChooser", "rgbRedText", getCommonString( "ColorChooser.rgbRedText" ) );
        textValues.add( "ColorChooser", "rgbGreenText", getCommonString( "ColorChooser.rgbGreenText" ) );
        textValues.add( "ColorChooser", "rgbBlueText", getCommonString( "ColorChooser.rgbBlueText" ) );
        textValues.add( "ColorChooser", "sampleText", getCommonString( "ColorChooser.sampleText" ) );

        return textValues;
    }

    private Object getCommonString( String s ) {
        return PhetCommonResources.getInstance().getLocalizedString( s );
    }

    public void initLookAndFeel() {
        try {
            UIManager.setLookAndFeel( getLookAndFeelClassName() );
        }
        catch ( ClassNotFoundException e ) {
            e.printStackTrace();
        }
        catch ( InstantiationException e ) {
            e.printStackTrace();
        }
        catch ( IllegalAccessException e ) {
            e.printStackTrace();
        }
        catch ( UnsupportedLookAndFeelException e ) {
            e.printStackTrace();
        }
        updateDefaults();

        //On 9-17-2008, Wendy Adams reported that tooltips have too long of an initial delay (was 750)
        //ToolTipManager.sharedInstance().setInitialDelay( 375 );
        refreshApp();
    }

    /**
     * Makes sure the component tree UI of all frames are updated.
     * Taken from http://mindprod.com/jgloss/laf.html
     */
    private void refreshApp() {
// refreshing the Look and Feel of the entire app
        Frame frames[] = Frame.getFrames();

// refresh all Frames in the app
        for ( int i = 0; i < frames.length; i++ ) {
            SwingUtilities.updateComponentTreeUI( frames[i] );
            Window windows[] = frames[i].getOwnedWindows();

            // refresh all windows and dialogs of the frame
            for ( int j = 0; j < windows.length; j++ ) {
                SwingUtilities.updateComponentTreeUI( windows[j] );
            }
        }
// It should not be necessary to revalidate or repaint on top of that.
    }

    /**
     * Determines the look and feel class name that will be used by this PhetLookAndFeel.
     * The default behavior is to use the native look and feel for the platform.
     *
     * @return the class name for the look and feel.
     */
    protected String getLookAndFeelClassName() {
    	String s = UIManager.getSystemLookAndFeelClassName(); 
        return s;
    }

    /**
     * This method can be called in an override of getLookAndFeelClassName in case the simulation needs Ocean instead of Windows L&F
     * <p/>
     * The behavior is:
     * >> - Aqua on Mac
     * >> - Windows LAF for Window JDK 1.4.2
     * >> - default LAF (Ocean) for Windows with JDK 1.5
     * >> - default LAF for all other cases (eg, Linux)
     *
     * @return the class name for the look and feel.
     */
    protected String getLookAndFeelClassNamePreferOceanToWindows() {
        String javaVersion = System.getProperty( "java.version" );
        boolean oldJava = javaVersion.toLowerCase().startsWith( "1.4" ) || javaVersion.startsWith( "1.3" );
        String lafClassName = null;
        if ( PhetUtilities.getOperatingSystem() == PhetUtilities.OS_WINDOWS ) {
            if ( oldJava ) {
                lafClassName = WindowsLookAndFeel.class.getName();
            }
            else {
                lafClassName = UIManager.getCrossPlatformLookAndFeelClassName();
            }
        }
        else {
            lafClassName = UIManager.getSystemLookAndFeelClassName();
        }
        return lafClassName;
    }

    /**
     * Gets the font size that corresponds to the screen size.
     * Our minimum supported resolution for PhET simulations is 1024x768.
     * For that resolution and higher, we simply use the default font size.
     * For resolutions of 800x600 or lower, we scale the default font size by 800/1024.
     *
     * @return the font size
     * @deprecated use the instance based methods
     */
    @Deprecated
		public static int getFontSizeForScreen() {
        Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
        JPanel panel = new JPanel();
        int fontSize = panel.getFont().getSize();
        if ( screenSize.width <= 800 ) {
            fontSize = (int) ( fontSize * ( 800.0 / 1024 ) );
        }
        return fontSize;
    }

    /**
     * Debugging routine that prints the UIDefault database key/value pairs.
     * The output is sorted lexigraphically by key.
     */
    public static void printUIDefaults() {

        // Get the currently installed look and feel
        UIDefaults uidefs = UIManager.getLookAndFeelDefaults();

        // Retrieve the keys. We can't use an iterator since the map
        // may be modified during the iteration. So retrieve all keys at once. 
        String[] keySet = uidefs.keySet().toArray( new String[0] );

        // Sort the keys.
        List<String> keys = Arrays.asList( keySet );
        Collections.sort( keys );

        // Print out each key/value pair.
        for ( int i = 0; i < keys.size(); i++ ) {
            Object key = keys.get( i );
            Object value = uidefs.get( key );
            System.out.println( key + ": " + value );
        }
    }

    public void setButtonBackgroundColor( Color buttonBackgroundColor ) {
        this.buttonBackgroundColor = buttonBackgroundColor;
    }

    private static class PropertyList {
        private ArrayList<Object> list = new ArrayList<Object>();

        public void add( String object, String key, Object value ) {
            list.add( object + "." + key );
            list.add( value );
        }

        public Object[] toArray() {
            return list.toArray();
        }

        public void addAll( PropertyList collection ) {
            list.addAll( collection.list );
        }
    }
}