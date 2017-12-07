// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: cmalley $
 * Revision : $Revision: 56751 $
 * Date modified : $Date: 2011-09-20 13:18:38 -0500 (Tue, 20 Sep 2011) $
 */

package edu.colorado.phet.common.phetcommon.view.util;

import java.awt.AWTException;
import java.awt.Color;
import java.awt.Component;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.LayoutManager;
import java.awt.Rectangle;
import java.awt.Toolkit;
import java.awt.Window;
import java.util.ArrayList;
import java.util.Enumeration;

import javax.swing.ButtonGroup;
import javax.swing.Icon;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JRadioButton;
import javax.swing.text.JTextComponent;
//import javax.swing.plaf.metal.MetalLookAndFeel;


/**
 * SwingUtils is a collection of utilities related to Java Swing.
 *
 * @author various
 * @version $Revision: 56751 $
 */
public class SwingUtils {

    /**
     * Not intended for instantiation.
     */
    private SwingUtils() {
    }

    public static void addMenuAt( JFrame frame, JMenu newMenu, int index ) {
        frame.setJMenuBar( addMenuAt( newMenu, frame.getJMenuBar(), index ) );
    }

    /**
     * @param newMenu
     * @param menuBar
     * @param index
     * @return The same JMenuBar, for cascading.
     *         TODO See if the same thing can be done with Container.add( component, index )
     */
    public static JMenuBar addMenuAt( JMenu newMenu, JMenuBar menuBar, int index ) {

        ArrayList<JMenu> menuList = new ArrayList<JMenu>();
        for ( int i = 0; i < menuBar.getMenuCount(); i++ ) {
            if ( i == index ) {
                menuList.add( newMenu );
            }
            menuList.add( menuBar.getMenu( i ) );
        }
        menuBar.removeAll();
        //        menuBar = new JMenuBar();
        for ( int i = 0; i < menuList.size(); i++ ) {
            JMenu menu = menuList.get( i );
            menuBar.add( menu );
        }
        return menuBar;
    }

    public static GridBagConstraints getGridBagConstraints( int gridX, int gridY,
                                                            int gridWidth, int gridHeight,
                                                            int fill, int anchor ) {
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.gridx = gridX;
        gbc.gridy = gridY;
        gbc.gridwidth = gridWidth;
        gbc.gridheight = gridHeight;
        gbc.fill = fill;
        gbc.anchor = anchor;

        return gbc;
    }

    /**
     * Add a component to a container with a GridBagLayout, creating
     * GridBagConstraints for it.
     *
     * @param container
     * @param component
     * @param gridX
     * @param gridY
     * @param gridWidth
     * @param gridHeight
     * @param fill
     * @param anchor
     * @throws java.awt.AWTException
     */
    public static void addGridBagComponent( Container container,
                                            Component component,
                                            int gridX, int gridY,
                                            int gridWidth, int gridHeight,
                                            int fill, int anchor )

            throws AWTException {
        addGridBagComponent( container, component, gridX, gridY,
                             gridWidth, gridHeight, fill, anchor, new Insets( 0, 0, 0, 0 ) );
    }

    public static void addGridBagComponent( Container container,
                                            Component component,
                                            int gridX, int gridY,
                                            int gridWidth, int gridHeight,
                                            int fill, int anchor, Insets insets )
            throws AWTException {
        LayoutManager lm = container.getLayout();
        if ( !( lm instanceof GridBagLayout ) ) {
            throw new AWTException( "Invalid layout: " + lm );
        }
        else {
            GridBagConstraints gbc = getGridBagConstraints( gridX, gridY,
                                                            gridWidth, gridHeight, fill, anchor );
            gbc.insets = insets;
            ( (GridBagLayout) lm ).setConstraints( component, gbc );
            container.add( component );
        }
    }

    public static void centerWindowOnScreen( Window window ) {
        Toolkit tk = Toolkit.getDefaultToolkit();
        Dimension screenSize = tk.getScreenSize();
        window.setLocation( (int) ( screenSize.getWidth() / 2 - window.getWidth() / 2 ),
                            (int) ( screenSize.getHeight() / 2 - window.getHeight() / 2 ) );
    }

    /**
     * Sets the bounds for a dialog so it is centered over its parent.
     *
     * @param dialog
     * @deprecated use centerOnParent
     */
    @Deprecated
		public static void centerDialogInParent( JDialog dialog ) {
        centerInParent( dialog );
    }

    /**
     * Centers a component on its parent.
     *
     * @param component
     */
    public static void centerInParent( Component component ) {
        Container parent = component.getParent();
        if ( parent != null ) {
            Rectangle parentBounds = parent.getBounds();
            Rectangle dialogBounds = new Rectangle( (int) ( parentBounds.getMinX() + parentBounds.getWidth() / 2 - component.getWidth() / 2 ),
                                                    (int) ( parentBounds.getMinY() + parentBounds.getHeight() / 2 - component.getHeight() / 2 ),
                                                    component.getWidth(), component.getHeight() );
            //dialog.setBounds( dialogBounds );
            component.setLocation( dialogBounds.x, dialogBounds.y );
        }
    }

    /**
     * If the dialog has a parent, center the dialog on the parent.
     * Otherwise center it on the screen.
     *
     * @param dialog
     */
    public static void centerDialog( JDialog dialog, Component owner ) {
        // note: can't rely on dialog.getParent, it will always return non-null!
        if ( owner == null ) {
            centerWindowOnScreen( dialog );
        }
        else {
            centerDialogInParent( dialog );
        }
    }

    // This method returns the selected radio button in a button group
    // Taken from The Java Developer's Almanac, 1.4
    public static JRadioButton getSelection( ButtonGroup group ) {
        for ( Enumeration<?> e = group.getElements(); e.hasMoreElements(); ) {
            JRadioButton b = (JRadioButton) e.nextElement();
            if ( b.getModel() == group.getSelection() ) {
                return b;
            }
        }
        return null;
    }

    /**
     * Fixes button opacity issues.
     * This is particularly a problem with JButton on Macintosh;
     * when the background color of its container is changed,
     * a button will appear to be sitting on a gray rectangle.
     *
     * @param button
     */
    public static void fixButtonOpacity( JButton button ) {
        // If the LAF isn't Metal or a derivative, setOpaque( false ) for the button
        //if ( !( UIManager.getLookAndFeel() instanceof MetalLookAndFeel ) ) {
            button.setOpaque( false );
        //}
    }

    /**
     * Forces an immediate repaint of a component and all of its children.
     *
     * @param component
     */
    public static void paintImmediately( Component component ) {

        // Paint the component
        if ( component instanceof JComponent ) {
            JComponent jcomponent = (JComponent) component;
            jcomponent.paintImmediately( jcomponent.getBounds() );
        }

        // Recursively paint children
        if ( component instanceof Container ) {
            Container container = (Container) component;
            int numberOfChildren = container.getComponentCount();
            for ( int i = 0; i < numberOfChildren; i++ ) {
                Component child = container.getComponent( i );
                paintImmediately( child );
            }
        }
    }


    /**
     * Determine the maximum size for a 2-state button with the specified text and icons.
     * This can be used to make sure that a button doesn't resize during state change.
     *
     * @param button  the UI of this JButton is used for size determination
     * @param string1 text for 1st mode
     * @param icon1   icon for 1st mode
     * @param string2 text for 2nd mode
     * @param icon2   icon for 2nd mode
     * @return the Dimension that contains both modes for the button.
     */
    public static Dimension getMaxDimension( JButton button, String string1, ImageIcon icon1, String string2, ImageIcon icon2 ) {

        String originalText = button.getText();
        Icon originalIcon = button.getIcon();

        // Get dimensions for "Play" state
        button.setText( string1 );
        button.setIcon( icon1 );
        Dimension playSize = button.getUI().getPreferredSize( button );

        // Get dimensions for "Pause" state
        button.setText( string2 );
        button.setIcon( icon2 );
        Dimension pauseSize = button.getUI().getPreferredSize( button );

        // Restore original text and icon
        button.setText( originalText );
        button.setIcon( originalIcon );

        // Return max dimensions
        int maxWidth = (int) Math.max( playSize.getWidth(), pauseSize.getWidth() );
        int maxHeight = (int) Math.max( playSize.getHeight(), pauseSize.getHeight() );
        return new Dimension( maxWidth, maxHeight );
    }

    /**
     * Sets the background of all components in a container hierachy.
     * See setForegroundOrBackgroundDeep.
     *
     * @param component
     * @param color
     */
    public static void setBackgroundDeep( Component component, Color color ) {
        setBackgroundDeep( component, color, null, true );
    }

    /**
     * Sets the background of all components in a container hierachy, with exclusions.
     * See setForegroundOrBackgroundDeep.
     *
     * @param component
     * @param color
     * @param excludedClasses
     * @param processContentsOfExcludedContainers
     *
     */
    public static void setBackgroundDeep( Component component, Color color, Class<?>[] excludedClasses, boolean processContentsOfExcludedContainers ) {
        setForegroundOrBackgroundDeep( false /* doForeground */, component, color, excludedClasses, processContentsOfExcludedContainers );
    }

    /**
     * Sets the foreground of all components in a container hierachy.
     * See setForegroundOrBackgroundDeep.
     *
     * @param component
     * @param color
     */
    public static void setForegroundDeep( Component component, Color color ) {
        setForegroundDeep( component, color, null, true );
    }

    /**
     * Sets the foreground of all components in a container hierachy, with exclusions.
     * See setForegroundOrBackgroundDeep.
     *
     * @param component
     * @param color
     * @param excludedClasses
     * @param processContentsOfExcludedContainers
     *
     */
    public static void setForegroundDeep( Component component, Color color, Class<?>[] excludedClasses, boolean processContentsOfExcludedContainers ) {
        setForegroundOrBackgroundDeep( true /* doForeground */, component, color, excludedClasses, processContentsOfExcludedContainers );
    }

    /*
     * Sets the foreground or background of all components in a container hierachy.
     * The contents of containers are processed recursively.
     * Any component that is an instance of one of the classes in excludedClasses will not have its foregroung or background color set.
     * The contents of excluded containers will be processed based on the value of processContentsOfExcludedContainers.
     * <p/>
     * Sample use:
     * <code>
     * JPanel controlPanel = new JPanel();
     * // then add a bunch of controls and subpanels ...
     * Class<?>[] excludedClasses = { JTextComponent.class };
     * SwingUtils.setBackgroundDeep( controlPanel, Color.RED, excludedClasses, false );
     * </code>
     *
     * @param doForeground true to set foreground, false to set background
     * @param component
     * @param color
     * @param excludedClasses
     * @param processContentsOfExcludedContainers
     */
    private static void setForegroundOrBackgroundDeep( final boolean doForeground, Component component, Color color, Class<?>[] excludedClasses, boolean processContentsOfExcludedContainers ) {

        // If this component one that should be excluded?
        boolean excluded = false;
        if ( excludedClasses != null ) {
            for ( int i = 0; i < excludedClasses.length && !excluded; i++ ) {
                if ( excludedClasses[i].isInstance( component ) ) {
                    excluded = true;
                }
            }
        }

        // If not exluded, set the component's foreground or background.
        if ( !excluded ) {
            if ( doForeground ) {
                component.setForeground( color );
            }
            else {
                component.setBackground( color );
            }
        }

        // Recursively process the contents of containers.
        if ( ( !excluded || processContentsOfExcludedContainers ) && ( component instanceof Container ) ) {
            Container container = (Container) component;
            Component[] children = container.getComponents();
            if ( children != null ) {
                for ( int i = 0; i < children.length; i++ ) {
                    setForegroundOrBackgroundDeep( doForeground, children[i], color, excludedClasses, processContentsOfExcludedContainers );
                }
            }
        }
    }

    /**
     * Sets opacity of a component and all of its children.
     * Excludes JTextComponent.
     */
    public static void setOpaqueDeep( JComponent component, boolean opaque ) {
        if ( !( component instanceof JTextComponent ) ) {
            component.setOpaque( opaque );
            for ( int i = 0; i < component.getComponentCount(); i++ ) {
                Component c = component.getComponent( i );
                if ( c instanceof JComponent ) {
                    setOpaqueDeep( (JComponent) c, opaque );
                }
            }
        }
    }

    /**
     * Sets a components preferred width, without changing its preferred height.
     *
     * @param component
     * @param width
     */
    public static void setPreferredWidth( JComponent component, int width ) {
        component.setPreferredSize( new Dimension( width, (int) component.getPreferredSize().getHeight() ) );
    }

    /**
     * Sets a components preferred height, without changing its preferred width.
     *
     * @param component
     * @param height
     */
    public static void setPreferredHeight( JComponent component, int height ) {
        component.setPreferredSize( new Dimension( (int) component.getPreferredSize().getWidth(), height ) );
    }

    // Adds horizontal padding to all components in a containment hierarchy.
    public static void padPreferredWidthDeep( Component component, int padding ) {
        if ( component instanceof Container ) {
            for ( Component child : ( (Container) component ).getComponents() ) {
                padPreferredWidthDeep( child, padding );
            }
        }
        component.setPreferredSize( new Dimension( (int) component.getPreferredSize().getWidth() + padding, (int) component.getPreferredSize().getHeight() ) );
    }
}
