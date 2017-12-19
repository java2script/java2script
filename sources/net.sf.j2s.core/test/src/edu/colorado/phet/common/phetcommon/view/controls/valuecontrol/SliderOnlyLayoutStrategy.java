// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view.controls.valuecontrol;

/**
 * Layout strategy for a value control that displays only the slider.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class SliderOnlyLayoutStrategy implements ILayoutStrategy {

    public SliderOnlyLayoutStrategy() {
    }

    @Override
		public void doLayout( AbstractValueControl valueControl ) {
        valueControl.add( valueControl.getSlider() );
    }
}