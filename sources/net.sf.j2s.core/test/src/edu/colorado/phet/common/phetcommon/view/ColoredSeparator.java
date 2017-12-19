// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view;

import java.awt.Color;

import javax.swing.JSeparator;

/**
 * Convenience class for creating colored separators, useful in control panels
 * when you need to separate components.
 * <p/>
 * For example:
 * <code>
 * EasyGridBagLayout layout = ....
 * int row = 0;
 * int column = 0;
 * layout.addComponent( component1, row++, column );
 * layout.addComponent( new BlackSeparator(), row++, column );
 * layout.addComponent( component2, row++, column );
 * </code>
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class ColoredSeparator extends JSeparator {

    /**
     * Convenience class for creating black separators.
     */
    public static class BlackSeparator extends ColoredSeparator {

        public BlackSeparator() {
            super( Color.BLACK );
        }

        public BlackSeparator( int orientation ) {
            super( Color.BLACK, orientation );
        }
    }

    public ColoredSeparator( Color color ) {
        this( color, JSeparator.HORIZONTAL );
    }

    public ColoredSeparator( Color color, int orientation ) {
        super( orientation );
        setForeground( color );
    }
}
