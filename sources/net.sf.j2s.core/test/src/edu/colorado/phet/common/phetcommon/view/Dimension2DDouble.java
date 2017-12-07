// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.view;

import java.awt.geom.Dimension2D;

/**
 * Inner implementation of Dimension2D since one is not provided by awt.
 * This Dimension2D implementation is used in ModelViewTransform for transforming delta instances.
 *
 * @author Sam Reid
 */
public class Dimension2DDouble extends Dimension2D {
    public double width;
    public double height;

    public Dimension2DDouble( double width, double height ) {
        this.width = width;
        this.height = height;
    }

    public Dimension2DDouble( Dimension2D size ) {
        this( size.getWidth(), size.getHeight() );
    }

    @Override
    public double getWidth() {
        return width;
    }

    @Override
    public double getHeight() {
        return height;
    }

    @Override
    public void setSize( double width, double height ) {
        this.width = width;
        this.height = height;
    }

    @Override
    public String toString() {
        final StringBuffer result = new StringBuffer();
        result.append( super.toString().replaceAll( ".*\\.", "" ) ); // abbreviate the class name
        result.append( '[' );
        result.append( "width=" );
        result.append( width );
        result.append( ",height=" );
        result.append( height );
        result.append( ']' );
        return result.toString();
    }
}