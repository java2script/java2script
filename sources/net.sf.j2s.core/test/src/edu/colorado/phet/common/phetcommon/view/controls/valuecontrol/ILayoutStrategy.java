// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view.controls.valuecontrol;

/**
 * ILayoutStrategy is the interface implemented by all classes that
 * handle layout of an AbstractValueControl.  See DefaultLayoutStrategy
 * for an example of how to write a layout strategy.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public interface ILayoutStrategy {

    public void doLayout( AbstractValueControl valueControl );
}
