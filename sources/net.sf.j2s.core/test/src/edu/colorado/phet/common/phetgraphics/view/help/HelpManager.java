// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 54200 $
 * Date modified : $Date: 2011-07-18 19:45:40 -0500 (Mon, 18 Jul 2011) $
 */
package edu.colorado.phet.common.phetgraphics.view.help;

import java.awt.Component;

import edu.colorado.phet.common.phetgraphics.view.ApparatusPanel;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.GraphicLayerSet;

/**
 * HelpManager
 *
 * @author ?
 * @version $Revision: 54200 $
 */
public class HelpManager extends GraphicLayerSet {
    private static double HELP_LAYER = Double.POSITIVE_INFINITY;

    //private int helpx = 30;
    //private int[] helpy = {3,3};

    public HelpManager() {
        super( null );
    }

    public HelpManager( Component component ) {
        super( component );
    }

    @Override
		public void setComponent( Component component ) {
        super.setComponent( component );
    }

    /**
     * @param helpItem
     * @deprecated use removeGraphic
     */
    @Deprecated
		public void removeHelpItem( HelpItem helpItem ) {
        super.removeGraphic( helpItem );
    }

    /**
     * @param item
     * @deprecated use addGraphic
     */
    @Deprecated
		public void addHelpItem( HelpItem item ) {
        super.addGraphic( item, HELP_LAYER );
    }

    public void setHelpEnabled( ApparatusPanel apparatusPanel, boolean h ) {
        if ( h ) {
            apparatusPanel.addGraphic( this, HELP_LAYER );
        }
        else {
            apparatusPanel.removeGraphic( this );
        }
        apparatusPanel.repaint();
    }

    public int getNumHelpItems() {
        return super.getNumGraphics();
    }

}
