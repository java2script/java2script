// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view;

import java.awt.BorderLayout;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.Insets;
import java.awt.Rectangle;

import javax.swing.Box;
import javax.swing.BoxLayout;
import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JSeparator;
import javax.swing.Scrollable;

import edu.colorado.phet.common.phetcommon.application.Module;
import edu.colorado.phet.common.phetcommon.application.PhetApplication;
import edu.colorado.phet.common.phetcommon.model.Resettable;

/**
 * ControlPanel is the panel that contains the controls for the simulation.
 *
 * @author Ron LeMaster
 */
public class ControlPanel extends JPanel {

    private ContentPanel contentPanel; // holds the controls
    private JScrollPane scrollPane;
    private Scrollable scrollPolicy;
    private Component minimumWidthStrut;

    /**
     * Constructs a ControlPanel for the specified module.
     *
     * @param module
     * @deprecated
     */
    @Deprecated
		public ControlPanel( Module module ) {
        this();
    }

    /**
     * Constructor
     */
    public ControlPanel() {
        setLayout( new BorderLayout() );
        contentPanel = new ContentPanel();
        contentPanel.setFillNone();
        scrollPolicy = new DefaultScrollPolicy( contentPanel );
        scrollPane = new JScrollPane( contentPanel, JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED,
                                      JScrollPane.HORIZONTAL_SCROLLBAR_NEVER );
        //Sets the scroll pane border to null so that no borders are shown on the scroll pane in Windows UIManager 
        // (looked like they weren't shown on Mac).  
        // The scroll pane border looked awkward when combined with the titled border components in the control panel.  See #2471
        scrollPane.setBorder( null );
        add( scrollPane, BorderLayout.CENTER );

        // Macintosh fix, not sure exactly what this does (see #2471 for related comments)
        {
            scrollPane.setOpaque( false );
            scrollPane.getViewport().setOpaque( false );
        }
    }

    /**
     * Gets the content panel, which holds the controls.
     *
     * @return the content panel
     */
    public ContentPanel getContentPanel() {
        return contentPanel;
    }

    /**
     * Adds a component to the control area.
     *
     * @param component
     * @return the component argument
     */
    public Component addControl( Component component ) {
        return contentPanel.add( component );
    }

    /**
     * Adds a component to the content panel, to fill the width.
     *
     * @param component
     */
    public void addControlFullWidth( Component component ) {
        contentPanel.addFullWidth( component );
    }

    /**
     * For backward compatibility.
     *
     * @param component
     * @return the component argument
     * @deprecated
     */
    @Deprecated
		@Override
		public Component add( Component component ) {
        return addControl( component );
    }

    /**
     * For backward compatibility.
     *
     * @param component
     * @deprecated
     */
    @Deprecated
		public void addFullWidth( Component component ) {
        addControlFullWidth( component );
    }

    /**
     * Removes a component from the control area
     *
     * @param comp
     */
    public void removeControl( Component comp ) {
        contentPanel.remove( comp );
        contentPanel.invalidate();
        contentPanel.validate();
    }

    /**
     * Adds a full-width separator to the control panel.
     */
    public void addSeparator() {
        addControlFullWidth( new JSeparator() );
    }

    /**
     * Adds vertical space to the control panel using a vertical strut.
     *
     * @param space the amount of space, in pixels
     */
    public void addVerticalSpace( int space ) {
        if ( space > 0 ) {
            JPanel spacePanel = new JPanel();
            spacePanel.setLayout( new BoxLayout( spacePanel, BoxLayout.Y_AXIS ) );
            spacePanel.add( Box.createVerticalStrut( space ) );
            addControlFullWidth( spacePanel );
        }
    }

    /**
     * Sets the insets used in the content panel.
     *
     * @param insets
     */
    public void setInsets( Insets insets ) {
        contentPanel.setInsets( insets );
    }

    /**
     * Sets a new scroll policy for the JComponent in this ControlPanel.
     *
     * @param scrollPolicy
     */
    public void setScrollPolicy( Scrollable scrollPolicy ) {
        this.scrollPolicy = scrollPolicy;
    }

    private int getVisibleScrollBarWidth() {
        return isScrollBarVisible() ? getScrollBarWidth() : 0;
    }

    private int getScrollBarWidth() {
        return scrollPane.getVerticalScrollBar().getPreferredSize().width;
    }

    private boolean isScrollBarVisible() {
        return scrollPane.getVerticalScrollBar().isVisible();
    }

    /**
     * The DefaultScrollPolicy uses the preferred size of the component, adding on the width of the visible scroll bars
     * in the ControlPanel.
     */
    public class DefaultScrollPolicy implements Scrollable {
        JComponent component;

        public DefaultScrollPolicy( JComponent component ) {
            this.component = component;
        }

        @Override
				public boolean getScrollableTracksViewportHeight() {
            return false;
        }

        @Override
				public boolean getScrollableTracksViewportWidth() {
            return false;
        }

        @Override
				public Dimension getPreferredScrollableViewportSize() {
            return new Dimension( component.getPreferredSize().width + getVisibleScrollBarWidth(), component.getPreferredSize().height );
        }

        @Override
				public int getScrollableBlockIncrement( Rectangle visibleRect, int orientation, int direction ) {
            return 10;
        }

        @Override
				public int getScrollableUnitIncrement( Rectangle visibleRect, int orientation, int direction ) {
            return 10;
        }
    }

    /**
     * This is where the controls go in the ControlPanel.  It delegates its Scrollable interface to
     */
    public class ContentPanel extends VerticalLayoutPanel implements Scrollable {

        @Override
				public boolean getScrollableTracksViewportHeight() {
            return scrollPolicy.getScrollableTracksViewportHeight();
        }

        @Override
				public boolean getScrollableTracksViewportWidth() {
            return scrollPolicy.getScrollableTracksViewportWidth();
        }

        @Override
				public Dimension getPreferredScrollableViewportSize() {
            return scrollPolicy.getPreferredScrollableViewportSize();
        }

        @Override
				public int getScrollableBlockIncrement( Rectangle visibleRect, int orientation, int direction ) {
            return scrollPolicy.getScrollableBlockIncrement( visibleRect, orientation, direction );
        }

        @Override
				public int getScrollableUnitIncrement( Rectangle visibleRect, int orientation, int direction ) {
            return scrollPolicy.getScrollableUnitIncrement( visibleRect, orientation, direction );
        }
    }

    /**
     * @see ControlPanel#resetAllButton(Resettable[])
     */
    public JButton addResetAllButton( Resettable resettable ) {
        return addResetAllButton( new Resettable[] { resettable } );
    }

    /**
     * Adds a "Reset All" button that will reset a collection of objects when pressed.
     * This is a convenience method that calls addControl, so (like addControl) it is order dependent.
     * It does not enforce the PhET convention that the "Reset All" button is at the bottom
     * of the control panel. If you want your "Reset All" button to be at the bottom, call this last.
     *
     * @param resettables
     * @return the reset all button
     */
    public JButton addResetAllButton( final Resettable[] resettables ) {
        JButton resetAllButton = new ResetAllButton( resettables, PhetApplication.getInstance().getPhetFrame() );
        addControl( resetAllButton );
        return resetAllButton;
    }

    /**
     * Sets the minimum width of the control panel.
     * This is accomplished by inserting a horizontal strut into the control panel.
     *
     * @param minimumWidth
     */
    public void setMinimumWidth( int minimumWidth ) {
        if ( minimumWidthStrut != null ) {
            removeControl( minimumWidthStrut );
        }
        minimumWidthStrut = Box.createHorizontalStrut( minimumWidth );
        addControlFullWidth( minimumWidthStrut );
    }
}