//  Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.model;

import java.awt.Color;
import java.awt.Shape;
import java.awt.geom.Area;
import java.awt.geom.Dimension2D;
import java.awt.geom.Ellipse2D;
import java.awt.geom.Point2D;

import edu.colorado.phet.common.phetcommon.view.util.DoubleGeneralPath;

/**
 * Class<?> that defines the shape and common functionality for a "bucket", which
 * is container into which some sort of model objects may be placed.  This is
 * a model object in the Model-View-Controller paradigm, and requires a
 * counterpart in the view in order to be presented to the user.
 * <p/>
 * In general, this is intended to be a base class, and subclasses should be
 * used to add specific functionality, such as how other model objects are
 * added to and removed from the bucket.
 * <p/>
 * One other important note: The position of the bucket in model space is
 * based on the center of the bucket's opening.
 *
 * @author John Blanco
 */
public class Bucket {

    // ------------------------------------------------------------------------
    // Class<?> Data
    // ------------------------------------------------------------------------

    // Proportion of the total height which the ellipse that represents
    // the hole occupies.  It is assumed that the width of the hole
    // is the same as the width specified at construction.
    private static final double HOLE_ELLIPSE_HEIGHT_PROPORTION = 0.25;

    // ------------------------------------------------------------------------
    // Instance Data
    // ------------------------------------------------------------------------

    // The position is defined to be where the center of the hole is.
    private Point2D.Double position = new Point2D.Double();

    // The two shapes that define the overall shape of the bucket.
    protected final Shape holeShape;
    private final Shape containerShape;

    // Base color of the bucket.
    private final Color baseColor;

    // Caption to be shown on the bucket.
    private final String captionText;

    // ------------------------------------------------------------------------
    // Constructor(s)
    // ------------------------------------------------------------------------

    /**
     * Convenience constructor that accepts x and y position values as double
     */
    public Bucket( double x, double y, Dimension2D size, Color baseColor, String caption ) {
        this( new Point2D.Double( x, y ), size, baseColor, caption );
    }

    /**
     * Constructor.  The dimensions used are just numbers, i.e. they are not
     * meant to be any specific size (such as meters).  This enabled
     * reusability in any 2D model.
     */
    public Bucket( Point2D.Double position, Dimension2D size, Color baseColor, String caption ) {
        this.position.x = position.x;
        this.position.y = position.y;
        this.baseColor = baseColor;
        this.captionText = caption;

        // Create the shape of the bucket's hole.
        holeShape = new Ellipse2D.Double( -size.getWidth() / 2,
                                          -size.getHeight() * HOLE_ELLIPSE_HEIGHT_PROPORTION / 2,
                                          size.getWidth(),
                                          size.getHeight() * HOLE_ELLIPSE_HEIGHT_PROPORTION );

        // Create the shape of the container.  This code is a bit "tweaky",
        // meaning that there are a lot of fractional multipliers in here
        // to try to achieve the desired pseudo-3D look.  The intent is
        // that the "tilt" of the bucket can be changed without needing to
        // rework this code.
        double containerHeight = size.getHeight() * ( 1 - ( HOLE_ELLIPSE_HEIGHT_PROPORTION / 2 ) );
        DoubleGeneralPath containerPath = new DoubleGeneralPath();
        containerPath.moveTo( -size.getWidth() * 0.5, 0 );
        containerPath.lineTo( -size.getWidth() * 0.4, -containerHeight * 0.8 );
        containerPath.curveTo(
                -size.getWidth() * 0.3,
                -containerHeight * 0.8 - size.getHeight() * HOLE_ELLIPSE_HEIGHT_PROPORTION * 0.6,
                size.getWidth() * 0.3,
                -containerHeight * 0.8 - size.getHeight() * HOLE_ELLIPSE_HEIGHT_PROPORTION * 0.6,
                size.getWidth() * 0.4,
                -containerHeight * 0.8 );
        containerPath.lineTo( size.getWidth() * 0.5, 0 );
        containerPath.closePath();
        Area containerArea = new Area( containerPath.getGeneralPath() );
        containerArea.subtract( new Area( holeShape ) );
        containerShape = containerArea;
    }

    // ------------------------------------------------------------------------
    // Methods
    // ------------------------------------------------------------------------

    public Point2D getPosition() {
        return position;
    }

    public void setPosition( Point2D.Double position ) {
        // TODO: change to property
        this.position = position;
    }

    public Shape getHoleShape() {
        return holeShape;
    }

    public Shape getContainerShape() {
        return containerShape;
    }

    public Color getBaseColor() {
        return baseColor;
    }

    public String getCaptionText() {
        return captionText;
    }
}