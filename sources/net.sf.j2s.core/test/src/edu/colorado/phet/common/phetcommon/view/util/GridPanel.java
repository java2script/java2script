// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view.util;

import java.awt.Component;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.LayoutManager;
import java.util.HashMap;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.WindowConstants;
import javax.swing.border.TitledBorder;

/**
 * GridPanel is a JPanel that arranges Components in a grid.
 * It uses GridBagLayout and GridBagConstraints internally, but hides their interfaces.
 * <p/>
 * If you hate GridBagLayout, this is an alternative.
 * And it's less awkward and more object-oriented than EasyGridBagLayout, which was another phetcommon alternative.
 * <p/>
 * How this interface differs from GridBagConstraints:
 * <ul>
 * <li>GridBagConstraints uses ints to specify anchors and fill, GridPanel uses enums
 * <li>GridBagConstraints has public members like gridwidth, GridPanel uses setters/getters with "camel case" names like setGridWidth
 * </ul>
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class GridPanel extends JPanel {

    /**
     * @see setAnchor
     */
    public static enum Anchor {
        /* absolute anchors */ CENTER, NORTH, NORTHEAST, EAST, SOUTHEAST, SOUTH, SOUTHWEST, WEST, NORTHWEST,
        /* relative anchors */ PAGE_START, PAGE_END, LINE_START, LINE_END, FIRST_LINE_START, FIRST_LINE_END, LAST_LINE_START, LAST_LINE_END,
        /* TODO: add Java 1.6 baseline anchors here. See GridBagConstraints.*BASELINE* */
    }

    ;

    /**
     * @see setFill
     */
    public static enum Fill {
        HORIZONTAL, VERTICAL, BOTH, NONE
    }

    ;

    // Define these gridX and gridY constants to fully hide GridBagConstraints.
    public static final int RELATIVE = GridBagConstraints.RELATIVE;
    public static final int REMAINDER = GridBagConstraints.REMAINDER;

    // maps between Anchor enums and GridBagConstraint anchor constants
    private static final TwoWayMap<Anchor, Integer> ANCHOR_MAP = new TwoWayMap<Anchor, Integer>() {{
        /* absolute anchors */
        put( Anchor.CENTER, new Integer( GridBagConstraints.CENTER ) );
        put( Anchor.NORTH, new Integer( GridBagConstraints.NORTH ) );
        put( Anchor.NORTHEAST, new Integer( GridBagConstraints.NORTHEAST ) );
        put( Anchor.EAST, new Integer( GridBagConstraints.EAST ) );
        put( Anchor.SOUTHEAST, new Integer( GridBagConstraints.SOUTHEAST ) );
        put( Anchor.SOUTH, new Integer( GridBagConstraints.SOUTH ) );
        put( Anchor.SOUTHWEST, new Integer( GridBagConstraints.SOUTHWEST ) );
        put( Anchor.WEST, new Integer( GridBagConstraints.WEST ) );
        put( Anchor.NORTHWEST, new Integer( GridBagConstraints.NORTHWEST ) );
        /* relative anchors */
        put( Anchor.PAGE_START, new Integer( GridBagConstraints.PAGE_START ) );
        put( Anchor.PAGE_END, new Integer( GridBagConstraints.PAGE_END ) );
        put( Anchor.LINE_START, new Integer( GridBagConstraints.LINE_START ) );
        put( Anchor.LINE_END, new Integer( GridBagConstraints.LINE_END ) );
        put( Anchor.FIRST_LINE_START, new Integer( GridBagConstraints.FIRST_LINE_START ) );
        put( Anchor.FIRST_LINE_END, new Integer( GridBagConstraints.FIRST_LINE_END ) );
        put( Anchor.LAST_LINE_START, new Integer( GridBagConstraints.LAST_LINE_START ) );
        put( Anchor.LAST_LINE_END, new Integer( GridBagConstraints.LAST_LINE_END ) );
        /* TODO: add Java 1.6 baseline anchors here. See GridBagConstraints.*BASELINE* */
        assert ( size() == Anchor.values().length ); // is this map complete?
    }};

    // maps between Fill enums and GridBagConstraint fill constants
    private static final TwoWayMap<Fill, Integer> FILL_MAP = new TwoWayMap<GridPanel.Fill, Integer>() {{
        put( Fill.HORIZONTAL, new Integer( GridBagConstraints.HORIZONTAL ) );
        put( Fill.VERTICAL, new Integer( GridBagConstraints.VERTICAL ) );
        put( Fill.BOTH, new Integer( GridBagConstraints.BOTH ) );
        put( Fill.NONE, new Integer( GridBagConstraints.NONE ) );
        assert ( size() == Fill.values().length ); // is this map complete?
    }};

    private final GridBagConstraints constraints;

    /**
     * Constructor that specifies no layout properties, you get default settings.
     * You can use setters to change the defaults, or specify properties when a component is added.
     */
    public GridPanel() {
        this( new GridBagConstraints() ); // defaults are identical to GridBagConstraints
    }

    /**
     * Constructor that lets you specify default values for all layout properties.
     * See setters for description of properties.
     */
    public GridPanel( int gridX, int gridY, int gridWidth, int gridHeight, double weightX, double weightY, Anchor anchor, Fill fill, Insets insets, int internalPaddingX, int internalPaddingY ) {
        this( new GridBagConstraints( gridX, gridY, gridWidth, gridHeight, weightX, weightY, ANCHOR_MAP.getForward( anchor ), FILL_MAP.getForward( fill ), insets, internalPaddingX, internalPaddingY ) );
    }

    /*
     * This constructor should remain private, so we don't expose GridBagConstraints.
     */
    private GridPanel( GridBagConstraints constraints ) {
        super( new GridBagLayout() );
        this.constraints = constraints;
    }

    /**
     * A GridPanel must have a GridLayout layout manager, or what's the point?
     */
    @Override
    public void setLayout( LayoutManager manager ) {
        if ( !( manager instanceof GridBagLayout ) ) {
            throw new UnsupportedOperationException( "layout manager must be a GridBagLayout" );
        }
        else {
            super.setLayout( manager );
        }
    }

    /**
     * Add a component using the default layout properties.
     */
    @Override
    public Component add( Component component ) {
        super.add( component, constraints );
        return component;
    }

    /**
     * Puts a component in a specific grid cell, and specifies a complete set of layout properties.
     * See setters for description of properties.
     */
    public void add( Component component, int gridX, int gridY, int gridWidth, int gridHeight, double weightX, double weightY,
                     Anchor anchor, Fill fill, Insets insets, int internalPaddingX, int internalPaddingY ) {

        // save constraints
        GridBagConstraints savedConstraints = copy( constraints );

        // set temporary constraints
        constraints.gridx = gridX;
        constraints.gridy = gridY;
        constraints.gridwidth = gridWidth;
        constraints.gridheight = gridHeight;
        constraints.anchor = ANCHOR_MAP.getForward( anchor );
        constraints.fill = FILL_MAP.getForward( fill );
        constraints.insets = insets;
        constraints.ipadx = internalPaddingX;
        constraints.ipady = internalPaddingY;
        constraints.weightx = weightX;
        constraints.weighty = weightY;

        // put the component in a grid cell
        super.add( component, constraints );

        // restore constraints
        setConstraints( savedConstraints, constraints );
    }

    // convenience method
    public void add( Component component, int row, int column ) {
        add( component, column, row, getGridWidth(), getGridHeight(), getWeightX(), getWeightY(), getAnchor(), getFill(), getInsetsReference(), getInternalPaddingX(), getInternalPaddingY() );
    }

    // convenience method
    public void add( Component component, int row, int column, int widthInColumns, int heightInRows ) {
        add( component, column, row, widthInColumns, heightInRows, getWeightX(), getWeightY(), getAnchor(), getFill(), getInsetsReference(), getInternalPaddingX(), getInternalPaddingY() );
    }

    // convenience method
    public void add( Component component, int row, int column, Anchor anchor ) {
        add( component, column, row, getGridWidth(), getGridHeight(), getWeightX(), getWeightY(), anchor, getFill(), getInsetsReference(), getInternalPaddingX(), getInternalPaddingY() );
    }

    // convenience method
    public void add( Component component, int row, int column, Fill fill ) {
        add( component, column, row, getGridWidth(), getGridHeight(), getWeightX(), getWeightY(), getAnchor(), fill, getInsetsReference(), getInternalPaddingX(), getInternalPaddingY() );
    }

    /*
     * GridBagConstraints lacks a copy constructor, this method fills that void.
     * Used for saving state.
     */
    private static GridBagConstraints copy( GridBagConstraints c ) {
        return new GridBagConstraints( c.gridx, c.gridy, c.gridwidth, c.gridheight, c.weightx, c.weighty, c.anchor, c.fill, c.insets, c.ipadx, c.ipady );
    }

    /*
     * Copies constraints from one object to another.
     * Used to restore state.
     */
    private static void setConstraints( GridBagConstraints source, GridBagConstraints destination ) {
        destination.gridx = source.gridx;
        destination.gridy = source.gridy;
        destination.gridwidth = source.gridwidth;
        destination.gridheight = source.gridheight;
        destination.weightx = source.weightx;
        destination.weighty = source.weighty;
        destination.anchor = source.anchor;
        destination.fill = source.fill;
        destination.insets = source.insets;
        destination.ipadx = source.ipadx;
        destination.ipady = source.ipady;
    }

    /**
     * Specifies the column in which to place an added component.
     * Use RELATIVE to specifies that the component is to be placed
     * immediately following the previously-added component.
     *
     * @param gridX
     */
    public void setGridX( int gridX ) {
        constraints.gridx = gridX;
    }

    public int getGridX() {
        return constraints.gridx;
    }

    /**
     * Specifies the row in which to place an added component.
     * Use RELATIVE to specifies that the component is to be placed
     * immediately following the previously-added component.
     *
     * @param gridY
     */
    public void setGridY( int gridY ) {
        constraints.gridy = gridY;
    }

    public int getGridY() {
        return constraints.gridy;
    }

    /**
     * Convenience method for setting both gridX and gridY.
     *
     * @param gridX
     * @param gridY
     */
    public void setGridXY( int gridX, int gridY ) {
        setGridX( gridX );
        setGridY( gridY );
    }

    /**
     * Specifies how many columns a component will fill horizontally.
     * Use REMAINDER to fill to the end of the row.
     * Use RELATIVE to fill to the next occupied cell in the row.
     *
     * @param width
     */
    public void setGridWidth( int width ) {
        constraints.gridwidth = width;
    }

    public int getGridWidth() {
        return constraints.gridwidth;
    }

    /**
     * Specifies how many rows a component will fill vertically.
     * Use REMAINDER to fill to the end of the column.
     * Use RELATIVE to fill to the next occupied cell in the column.
     *
     * @param width
     */
    public void setGridHeight( int height ) {
        constraints.gridheight = height;
    }

    public int getGridHeight() {
        return constraints.gridheight;
    }

    /**
     * Specifies how to distribute extra horizontal space.
     * Extra space is distributed to each column in proportion to its weight,
     * as compared to the weight of other columns.
     * A column that has a weight of zero receives no extra space.
     *
     * @param weightX
     */
    public void setWeightX( double weightX ) {
        constraints.weightx = weightX;
    }

    public double getWeightX() {
        return constraints.weightx;
    }

    /**
     * Specifies how to distribute extra vertical space.
     * Extra space is distributed to each row in proportion to its weight,
     * as compared to the weight of other rows.
     * A row that has a weight of zero receives no extra space.
     *
     * @param weightY
     */
    public void setWeightY( double weightY ) {
        constraints.weighty = weightY;
    }

    public double getWeightY() {
        return constraints.weighty;
    }

    /**
     * If a component is smaller than its grid cell, this property determines where
     * to place the component within the cell. In the language of GridBagConstraint,
     * these values specify "orientation relative" positions that interpreted relative
     * to the container's component orientation.
     *
     * @param anchor
     */
    public void setAnchor( Anchor anchor ) {
        constraints.anchor = ANCHOR_MAP.getForward( anchor );
    }

    public Anchor getAnchor() {
        return ANCHOR_MAP.getReverse( constraints.anchor );
    }

    /**
     * If a component is smaller than its grid cell, this property determines whether to resize the component,
     * and if so, which dimensions of the grid cell should be considered when doing the resizing.
     *
     * @param fill
     */
    public void setFill( Fill fill ) {
        constraints.fill = FILL_MAP.getForward( fill );
    }

    public Fill getFill() {
        return FILL_MAP.getReverse( constraints.fill );
    }

    /**
     * Specifies the external padding of the component, the  minimum amount of space between
     * the component and the edges of the cells that it occupies.
     * Because Insets are mutable, the specified Insets are copies.
     */
    public void setInsets( Insets insets ) {
        constraints.insets = new Insets( insets.top, insets.left, insets.bottom, insets.right );
    }

    /**
     * Gets the insets.
     * Because Insets are mutable, a copy is returned.
     * This is named getInsetsCopy because JPanel has a getInsets method that does something different,
     * and overriding it causes layout problems (see #2770).
     */
    public Insets getInsetsCopy() {
        return new Insets( constraints.insets.top, constraints.insets.left, constraints.insets.bottom, constraints.insets.right );
    }

    private Insets getInsetsReference() {
        return constraints.insets;
    }

    /**
     * Specifies how much space to add to the minimum width of the component.
     * The width of the component is at least its minimum width plus ipadx pixels.
     *
     * @param ipadx
     */
    public void setInternalPaddingX( int ipadx ) {
        constraints.ipadx = ipadx;
    }

    public int getInternalPaddingX() {
        return constraints.ipadx;
    }

    /**
     * Specifies how much space to add to the minimum height of the component.
     * The height of the component is at least its minimum height plus ipady pixels.
     *
     * @param ipady
     */
    public void setInternalPaddingY( int ipady ) {
        constraints.ipady = ipady;
    }

    public int getInternalPaddingY() {
        return constraints.ipady;
    }

    /**
     * Sets the minimum width for a column.
     *
     * @param column the column
     * @param width  minimum width, in pixels
     */
    public void setMinimumWidth( int column, int width ) {
        GridBagLayout layout = (GridBagLayout) getLayout();
        int[] widths = layout.columnWidths;
        if ( widths == null ) {
            widths = new int[column + 1];
        }
        else if ( widths.length < column + 1 ) {
            widths = new int[column + 1];
            System.arraycopy( layout.columnWidths, 0, widths, 0, layout.columnWidths.length );
        }
        widths[column] = width;
        layout.columnWidths = widths;
    }

    /**
     * Sets the minimum height for a row.
     *
     * @param row    the row
     * @param height minimum height, in pixels
     */
    public void setMinimumHeight( int row, int height ) {
        GridBagLayout layout = (GridBagLayout) getLayout();
        int[] heights = layout.rowHeights;
        if ( heights == null ) {
            heights = new int[row + 1];
        }
        else if ( heights.length < row + 1 ) {
            heights = new int[row + 1];
            System.arraycopy( layout.rowHeights, 0, heights, 0, layout.rowHeights.length );
        }
        heights[row] = height;
        layout.rowHeights = heights;
    }

    /*
     * Two-way map.
     */
    private static class TwoWayMap<T, U> {

        private HashMap<T, U> forward = new HashMap<T, U>();
        private HashMap<U, T> reverse = new HashMap<U, T>();

        public void put( T t, U u ) {
            forward.put( t, u );
            reverse.put( u, t );
        }

        public int size() {
            assert ( forward.size() == reverse.size() );
            return forward.size();
        }

        public U getForward( T t ) {
            return forward.get( t );
        }

        public T getReverse( U u ) {
            return reverse.get( u );
        }
    }

    // incomplete test harness
    public static void main( String[] args ) {

        // GridPanel
        GridPanel panel1 = new GridPanel() {{
            setBorder( new TitledBorder( "GridPanel" ) );
            setGridX( 0 ); // one column
            add( new JLabel( "------------------------" ) );
            setAnchor( Anchor.WEST );
            add( new JLabel( "WEST" ) );
            setAnchor( Anchor.CENTER );
            add( new JLabel( "CENTER" ) );
            setAnchor( Anchor.EAST );
            add( new JLabel( "EAST" ) );
        }};

        // compare to JPanel with GridLayout
        JPanel panel2 = new JPanel( new GridBagLayout() ) {{
            setBorder( new TitledBorder( "JPanel with GridLayout" ) );
            GridBagConstraints c = new GridBagConstraints();
            c.gridx = 0; // one column
            add( new JLabel( "------------------------" ), c );
            c.anchor = GridBagConstraints.WEST;
            add( new JLabel( "WEST" ), c );
            c.anchor = GridBagConstraints.CENTER;
            add( new JLabel( "CENTER" ), c );
            c.anchor = GridBagConstraints.EAST;
            add( new JLabel( "EAST" ), c );
        }};

        JPanel mainPanel = new JPanel();
        mainPanel.add( panel1 );
        mainPanel.add( panel2 );

        JFrame frame = new JFrame( "GridPanel.main" );
        frame.setContentPane( mainPanel );
        frame.pack();
        frame.setDefaultCloseOperation( WindowConstants.EXIT_ON_CLOSE );
        frame.setVisible( true );
    }
}
