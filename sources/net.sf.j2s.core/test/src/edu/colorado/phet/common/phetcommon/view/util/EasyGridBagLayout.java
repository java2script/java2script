// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view.util;

// JDK

import java.awt.Component;
import java.awt.Dimension;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;

import javax.swing.JPanel;


/**
 * EasyGridBagLayout provides an improved interface to GridBagLayout.
 *
 * @author Chris Malley
 * @deprecated use GridPanel
 */
@Deprecated
public class EasyGridBagLayout extends GridBagLayout {

    //----------------------------------------------------------------------------
    // Class<?> data
    //----------------------------------------------------------------------------

    /// Default constraint values
    public static final int DEFAULT_GRIDWIDTH = 1;
    public static final int DEFAULT_GRIDHEIGHT = 1;
    public static final int DEFAULT_ANCHOR = GridBagConstraints.WEST;
    public static final int DEFAULT_FILL = GridBagConstraints.NONE;
    public static final Insets DEFAULT_INSETS = new Insets( 2, 2, 2, 2 );
    public static final int DEFAULT_IPADX = 0;
    public static final int DEFAULT_IPADY = 0;

    //----------------------------------------------------------------------------
    // Instance data
    //----------------------------------------------------------------------------

    // Default constraints
    private int _width, _height, _anchor, _fill, _ipadx, _ipady;
    private Insets _insets;

    // Panel to be managed
    private JPanel _panel;

    //----------------------------------------------------------------------------
    // Constructors
    //----------------------------------------------------------------------------

    /**
     * Sole constructor.
     *
     * @param panel the panel to be managed
     * @throws NullPointerException if panel is null
     */
    public EasyGridBagLayout( JPanel panel ) throws NullPointerException {
        super();

        if ( panel == null ) {
            throw new NullPointerException();
        }

        // Default constraints
        _width = DEFAULT_GRIDWIDTH;
        _height = DEFAULT_GRIDHEIGHT;
        _anchor = DEFAULT_ANCHOR;
        _fill = DEFAULT_FILL;
        _ipadx = DEFAULT_IPADX;
        _ipady = DEFAULT_IPADY;
        _insets = new Insets( DEFAULT_INSETS.top, DEFAULT_INSETS.left, DEFAULT_INSETS.bottom, DEFAULT_INSETS.right );

        _panel = panel;
    }

    //----------------------------------------------------------------------------
    // Accessors
    //----------------------------------------------------------------------------

    /**
     * Sets the default grid size.
     *
     * @param size the size
     */
    public void setSize( Dimension size ) {
        setSize( size.width, size.height );
    }

    /**
     * Sets the default grid size
     *
     * @param width
     * @param height
     */
    public void setSize( int width, int height ) {
        _width = width;
        _height = height;
    }

    /**
     * Sets the default grid width.
     *
     * @param width
     */
    public void setWidth( int width ) {
        _width = width;
    }

    /**
     * Sets the default grid height.
     *
     * @param height
     */
    public void setHeight( int height ) {
        _height = height;
    }

    /**
     * Gets the default grid size.
     *
     * @return a copy of the grid size
     */
    public Dimension getSize() {
        return new Dimension( _width, _height );
    }

    /**
     * Gets the default grid width.
     *
     * @return the width
     */
    public int getWidth() {
        return _width;
    }

    /**
     * Gets the default grid height.
     *
     * @return the height
     */
    public int getHeight() {
        return _height;
    }

    /**
     * Sets the default anchor.
     *
     * @param anchor see GridBagConstraint for valid values
     */
    public void setAnchor( int anchor ) {
        _anchor = anchor;
    }

    /**
     * Gets the default anchor.
     *
     * @return the anchor, see GridBagConstraint for valid values
     */
    public int getAnchor() {
        return _anchor;
    }

    /**
     * Sets the default fill.
     *
     * @param fill see GridBagConstraint for valid values
     */
    public void setFill( int fill ) {
        _fill = fill;
    }

    /**
     * Gets the default fill.
     *
     * @return the fill, see GridBagConstraint for valid values
     */
    public int getFill() {
        return _fill;
    }

    /**
     * Sets the default internal padding.
     *
     * @param ipadx horizontal padding
     * @param ipady vertical padding
     */
    public void setIPad( int ipadx, int ipady ) {
        _ipadx = ipadx;
        _ipady = ipady;
    }

    /**
     * Sets the default horizontal internal padding.
     *
     * @param ipadx the horizontal padding
     */
    public void setIPadX( int ipadx ) {
        _ipadx = ipadx;
    }

    /**
     * Sets the default vertical internal padding.
     *
     * @param ipady the vertical padding
     */
    public void setIPadY( int ipady ) {
        _ipady = ipady;
    }

    /**
     * Gets the default horizontal internal padding.
     *
     * @return the horizontal padding
     */
    public int getIPadX() {
        return _ipadx;
    }

    /**
     * Gets the default vertical internal padding.
     *
     * @return the vertical padding
     */
    public int getIPadY() {
        return _ipady;
    }

    /**
     * Sets the default insets. This method copies the insets provided.
     *
     * @param insets the insets
     */
    public void setInsets( Insets insets ) {
        _insets.top = insets.top;
        _insets.left = insets.left;
        _insets.bottom = insets.bottom;
        _insets.right = insets.right;
    }

    /**
     * Gets the default insets.
     *
     * @return a copy of the insets
     */
    public Insets getInsets() {
        return (Insets) _insets.clone();
    }

    //----------------------------------------------------------------------------
    // Adding components
    //----------------------------------------------------------------------------  

    /**
     * Adds a component to the managed panel.
     * This is a convenience function for setting GridBagConstraints.
     * Default values are used for all unspecified constraints.
     *
     * @param component the component to add
     * @param row       the row in the grid
     * @param column    the column in the grid
     */
    public void addComponent( Component component, int row, int column ) {
        addComponent( component, row, column, _width, _height, _anchor, _fill, _insets );
    }

    /**
     * Adds a component to the managed panel.
     * This is a convenience function for setting GridBagConstraints.
     * Default values are used for all unspecified constraints.
     *
     * @param component the component to add
     * @param row       the row in the grid
     * @param column    the column in the grid
     * @param width     the width
     * @param height    the height
     */
    public void addComponent( Component component, int row, int column, int width, int height ) {
        addComponent( component, row, column, width, height, _anchor, _fill, _insets );
    }

    /**
     * Adds a component to the managed panel.
     * This is a convenience function for setting GridBagConstraints.
     * Default values are used for all unspecified constraints.
     *
     * @param component the component to add
     * @param row       the row in the grid
     * @param column    the column in the grid
     * @param width     the width
     * @param height    the height
     * @param anchor    the anchor
     */
    public void addComponent( Component component, int row, int column, int width, int height, int anchor ) {
        addComponent( component, row, column, width, height, anchor, _fill, _insets );
    }

    /**
     * Adds a component to the managed panel.
     * This is a convenience function for setting GridBagConstraints.
     * Default values are used for all unspecified constraints.
     *
     * @param component the component to add
     * @param row       the row in the grid
     * @param column    the column in the grid
     * @param width     the width
     * @param height    the height
     * @param anchor    the anchor
     * @param fill      the fill
     */
    public void addComponent( Component component, int row, int column, int width, int height, int anchor, int fill ) {
        addComponent( component, row, column, width, height, _anchor, fill, _insets );
    }

    /**
     * Adds a component to the managed panel.
     * This is a convenience function for setting GridBagConstraints.
     * Default values are used for all unspecified constraints.
     *
     * @param component the component to add
     * @param row       the row in the grid
     * @param column    the column in the grid
     * @param width     the width
     * @param height    the height
     * @param anchor    the anchor
     * @param fill      the fill
     * @param insets    the insets
     */
    public void addComponent( Component component, int row, int column, int width, int height, int anchor, int fill, Insets insets ) {

        // Load the GridBagConstraints
        GridBagConstraints constraints = new GridBagConstraints();
        constraints.gridx = column;
        constraints.gridy = row;
        constraints.gridwidth = width;
        constraints.gridheight = height;
        constraints.anchor = anchor;
        constraints.fill = fill;
        constraints.insets = _insets;
        constraints.ipadx = _ipadx;
        constraints.ipady = _ipady;

        // Determine sensible weights
        {
            double weightx = 0.0;
            double weighty = 0.0;
            if ( width > 1 ) {
                weightx = 1.0;
            }
            if ( height > 1 ) {
                weighty = 1.0;
            }

            switch( fill ) {
                case GridBagConstraints.HORIZONTAL:
                    constraints.weightx = weightx;
                    constraints.weighty = 0.0;
                    break;
                case GridBagConstraints.VERTICAL:
                    constraints.weightx = 0.0;
                    constraints.weighty = weighty;
                    break;
                case GridBagConstraints.BOTH:
                    constraints.weightx = weightx;
                    constraints.weighty = weighty;
                    break;
                case GridBagConstraints.NONE:
                    constraints.weightx = 0.0;
                    constraints.weighty = 0.0;
                    break;
            }
        }

        // Add the component to the managed panel.
        _panel.add( component, constraints );
    }

    //----------------------------------------------------------------------------
    // Adding anchored components
    //----------------------------------------------------------------------------


    /**
     * Adds an anchored component to the managed panel.
     * This is a convenience function for setting GridBagConstraints.
     * Default values are used for all unspecified constraints.
     *
     * @param component the component to add
     * @param row       the row in the grid
     * @param column    the column in the grid
     * @param anchor    the anchor
     */
    public void addAnchoredComponent( Component component, int row, int column, int anchor ) {
        addComponent( component, row, column, _width, _height, anchor, _fill, _insets );
    }

    /**
     * Adds an anchored component to the managed panel.
     * This is a convenience function for setting GridBagConstraints.
     * Default values are used for all unspecified constraints.
     *
     * @param component the component to add
     * @param row       the row in the grid
     * @param column    the column in the grid
     * @param width     the width
     * @param height    the height
     * @param anchor    the anchor
     */
    public void addAnchoredComponent( Component component, int row, int column, int width, int height, int anchor ) {
        addComponent( component, row, column, width, height, anchor, _fill, _insets );
    }

    //----------------------------------------------------------------------------
    // Adding filled components
    //----------------------------------------------------------------------------

    /**
     * Adds a filled component to the managed panel.
     * This is a convenience function for setting GridBagConstraints.
     * Default values are used for all unspecified constraints.
     *
     * @param component the component to add
     * @param row       the row in the grid
     * @param column    the column in the grid
     * @param fill      the fill
     */
    public void addFilledComponent( Component component, int row, int column, int fill ) {
        addComponent( component, row, column, _width, _height, _anchor, fill, _insets );
    }

    /**
     * Adds a filled component to the managed panel.
     * This is a convenience function for setting GridBagConstraints.
     * Default values are used for all unspecified constraints.
     *
     * @param component the component to add
     * @param row       the row in the grid
     * @param column    the column in the grid
     * @param width     the width
     * @param height    the height
     * @param fill      the fill
     */
    public void addFilledComponent( Component component, int row, int column, int width, int height, int fill ) {
        addComponent( component, row, column, width, height, _anchor, fill, _insets );
    }

    //----------------------------------------------------------------------------
    // Setting minumum dimensions.
    //----------------------------------------------------------------------------

    /**
     * Sets the minimum width for a column.
     *
     * @param column the column
     * @param width  minimum width, in pixels
     */
    public void setMinimumWidth( int column, int width ) {
        int[] widths = this.columnWidths;
        if ( widths == null ) {
            widths = new int[column + 1];
        }
        else if ( widths.length < column + 1 ) {
            widths = new int[column + 1];
            System.arraycopy( this.columnWidths, 0, widths, 0, this.columnWidths.length );
        }
        widths[column] = width;
        this.columnWidths = widths;
    }

    /**
     * Sets the minimum height for a row.
     *
     * @param row    the row
     * @param height minimum height, in pixels
     */
    public void setMinimumHeight( int row, int height ) {
        int[] heights = this.rowHeights;
        if ( heights == null ) {
            heights = new int[row + 1];
        }
        else if ( heights.length < row + 1 ) {
            heights = new int[row + 1];
            System.arraycopy( this.rowHeights, 0, heights, 0, this.rowHeights.length );
        }
        heights[row] = height;
        this.rowHeights = heights;
    }
}