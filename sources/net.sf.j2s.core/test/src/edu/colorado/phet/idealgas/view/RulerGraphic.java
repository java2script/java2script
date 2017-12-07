// Copyright 2002-2011, University of Colorado

/**
 * Class: RulerGraphic
 * Class: edu.colorado.phet.idealgas.view
 * User: Ron LeMaster
 * Date: Sep 16, 2004
 * Time: 9:24:51 PM
 */
package edu.colorado.phet.idealgas.view;

import edu.colorado.phet.common.phetgraphics.view.graphics.mousecontrols.translation.TranslationEvent;
import edu.colorado.phet.common.phetgraphics.view.graphics.mousecontrols.translation.TranslationListener;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetGraphic;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetImageGraphic;
import edu.colorado.phet.common.phetgraphics.view.util.GraphicsState;
import edu.colorado.phet.common.phetgraphics.view.util.GraphicsUtil;
import edu.colorado.phet.idealgas.IdealGasConfig;
import edu.colorado.phet.idealgas.IdealGasResources;

import java.awt.*;
import java.awt.image.BufferedImage;

public class RulerGraphic extends PhetGraphic {
    private PhetImageGraphic rulerGraphic;

    public RulerGraphic( Component component ) {
        super( component );
        BufferedImage rulerImage = null;
        rulerImage = IdealGasResources.getImage( IdealGasConfig.RULER_IMAGE_FILE );
        rulerGraphic = new PhetImageGraphic( component, rulerImage );

        setCursorHand();
        addTranslationListener( new TranslationListener() {
            @Override
						public void translationOccurred( TranslationEvent event ) {
                rulerGraphic.setLocation2( (int)( rulerGraphic.getBounds().getMinX() + event.getDx() ),
                                          (int)( rulerGraphic.getBounds().getMinY() + event.getDy() ) );
                RulerGraphic.this.setLocation( rulerGraphic.getLocationNoCopy() );
            }
        } );
    }

    @Override
		protected Rectangle determineBounds() {
        return rulerGraphic.getBounds();
    }

    @Override
		public void paint( Graphics2D g2 ) {
        GraphicsState gs = new GraphicsState( g2 );
        GraphicsUtil.setAlpha( g2, .9 );
        rulerGraphic.paint( g2 );
        gs.restoreGraphics();
    }
}
