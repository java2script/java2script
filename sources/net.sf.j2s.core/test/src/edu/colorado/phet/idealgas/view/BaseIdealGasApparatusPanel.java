// Copyright 2002-2011, University of Colorado

// BaseIdealGasApparatusPanel

/*
 * User: Ron LeMaster
 * Date: Oct 18, 2002
 * Time: 8:52:24 AM
 */
package edu.colorado.phet.idealgas.view;

import edu.colorado.phet.common.phetcommon.application.PhetApplication;
import edu.colorado.phet.common.phetcommon.model.clock.Clock;
import edu.colorado.phet.common.phetgraphics.view.ApparatusPanel3;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetImageGraphic;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetShapeGraphic;
import edu.colorado.phet.idealgas.GasPropertiesApplication;
import edu.colorado.phet.idealgas.IdealGasConfig;
import edu.colorado.phet.idealgas.IdealGasResources;
import edu.colorado.phet.idealgas.controller.IdealGasModule;
import edu.colorado.phet.idealgas.model.Box2D;
import edu.colorado.phet.idealgas.model.IdealGasModel;

import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.geom.Rectangle2D;
import java.awt.image.BufferedImage;

/**
 * Use ApparatusPanel3 to improve graphics scaling on low resolution screens, see #2860
 */
public class BaseIdealGasApparatusPanel extends ApparatusPanel3 {

//    private static boolean toolTipsSet = false;

    private PhetImageGraphic flamesGraphicImage;
    private PhetImageGraphic iceGraphicImage;
    protected PhetImageGraphic doorGraphicImage;
    private BufferedImage stoveImg;


    /**
     *
     */
    public BaseIdealGasApparatusPanel( IdealGasModule module, Clock clock, Box2D box ) {
        super( clock, 710, 540 );
        init( module, box );
        setUseOffscreenBuffer( true );
//        setUseOffscreenBuffer( false);

        // This listener is added so that any entries on the control panel will be finalized
        // if the user clicks on the apparatus panel. For example, typing into a spinner that
        // sets the temperature of new molecules will not cause a change event on the spinner in
        // and of itself, but if the user clicks on the pump handle, the focus change will cause
        // the spinner to produce an event.
        this.addMouseListener( new MouseAdapter() {
            @Override
						public void mousePressed( MouseEvent e ) {
                BaseIdealGasApparatusPanel.this.requestFocus();
            }
        } );
    }

    /**
     *
     */
    public void init( final IdealGasModule module, Box2D box ) {
        // Set the background color
        setBackground( IdealGasConfig.COLOR_SCHEME.background );

        // Set up the stove, flames, and ice
        stoveImg = IdealGasResources.getImage( IdealGasConfig.STOVE_IMAGE_FILE );
        Point stoveLocation = new Point( IdealGasConfig.X_BASE_OFFSET + IdealGasConfig.X_STOVE_OFFSET,
                                         IdealGasConfig.Y_BASE_OFFSET + IdealGasConfig.Y_STOVE_OFFSET );
        PhetImageGraphic stoveGraphic = new PhetImageGraphic( this, stoveImg );
        stoveGraphic.setLocation( stoveLocation );
        this.addGraphic( stoveGraphic, -4 );
        BufferedImage flamesImg = IdealGasResources.getImage( IdealGasConfig.FLAMES_IMAGE_FILE );
        flamesGraphicImage = new PhetImageGraphic( this, flamesImg, IdealGasConfig.X_BASE_OFFSET + 260, IdealGasConfig.Y_BASE_OFFSET + 545 );
        this.addGraphic( flamesGraphicImage, -6 );
        BufferedImage iceImg = IdealGasResources.getImage( IdealGasConfig.ICE_IMAGE_FILE );
        iceGraphicImage = new PhetImageGraphic( this, iceImg, IdealGasConfig.X_BASE_OFFSET + 260, IdealGasConfig.Y_BASE_OFFSET + 545 );
        this.addGraphic( iceGraphicImage, -6 );

        // Add a rectangle that will mask the ice and flames when they are behind the stove
        Rectangle2D mask = new Rectangle2D.Double( 0, 0, stoveImg.getRaster().getWidth(), stoveImg.getRaster().getHeight() );
        PhetShapeGraphic maskGraphic = new PhetShapeGraphic( this, mask, IdealGasConfig.COLOR_SCHEME.background );
        maskGraphic.setLocation( stoveLocation );
        this.addGraphic( maskGraphic, -5 );

        // Add a listener that will adjust the flames and ice graphics as the heat
        // source in the model changes
        ( (IdealGasModel)module.getModel() ).addHeatSourceChangeListener( new FlameIceAdjuster() );

    }

    /**
     * @return
     */
    protected GasPropertiesApplication getIdealGasApplication() {
        return (GasPropertiesApplication)PhetApplication.getInstance();
    }

    /**
     *
     */
    @Override
		protected void paintComponent( Graphics graphics ) {
        super.paintComponent( graphics );
    }

    //
    // Stove-related methods
    //
    public void setStove( int value ) {
        int baseFlameHeight = IdealGasConfig.Y_BASE_OFFSET + 545;
        int flameHeight = baseFlameHeight - value;
        int iceHeight = baseFlameHeight + value;
        flamesGraphicImage.setLocation2( (int)flamesGraphicImage.getLocationNoCopy().getX(),
                                        (int)Math.max( Math.min( (float)flameHeight, baseFlameHeight ),
                                                       baseFlameHeight - stoveImg.getRaster().getHeight() ) );
        iceGraphicImage.setLocation2( (int)iceGraphicImage.getLocationNoCopy().getX(),
                                     (int)Math.max( Math.min( (float)iceHeight, baseFlameHeight ),
                                                    baseFlameHeight - stoveImg.getRaster().getHeight() ) );
        this.repaint();
    }

    //----------------------------------------------------------------
    // Inner classes
    //----------------------------------------------------------------

    /**
     * Implementation of IdealGasModel.HeatSourceChangeListener
     */
    private class FlameIceAdjuster implements IdealGasModel.HeatSourceChangeListener {
        @Override
				public void heatSourceChanged( IdealGasModel.HeatSourceChangeEvent event ) {
            setStove( (int)event.getHeatSource() );
        }
    }

    /**
     *
     */
    //    public void setToolTips() {
    //
    //        if( !toolTipsSet ) {
    //
    //            toolTipsSet = true;
    //            int x = 0;
    //            int y = 0;
    //            int yOffset = 225 + IdealGasConfig.Y_BASE_OFFSET;
    //            x = (int)handleGraphicImage.getLocationPoint2D().getX() + this.getX() + 110;
    //            y = (int)handleGraphicImage.getLocationPoint2D().getY() + this.getY() + 0;
    //            Point2D.Float p = new Point2D.Float( x - 15, y + yOffset );
    //            HelpItem helpText1 = new HelpItem( "You can pump gas into the box by" +
    //                                               "\nmoving the handle up and down", p );
    //            new AddHelpItemCmd( helpText1 ).doIt();
    //
    //            x = (int)doorGraphicImage.getLocationPoint2D().getX() + this.getX() + 30;
    //            y = (int)doorGraphicImage.getLocationPoint2D().getY() + this.getY() - 40;
    //            p = new Point2D.Float( x, y + yOffset );
    //            HelpItem helpText4 = new HelpItem( "You can let gas out of the box" +
    //                                               "\nby sliding the door to the left", p );
    //            new AddHelpItemCmd( helpText4 ).doIt();
    //
    //            x = (int)flamesGraphicImage.getLocationPoint2D().getX() + this.getX() + 100;
    //            y = (int)flamesGraphicImage.getLocationPoint2D().getY() + this.getY() + 15;
    //            p = new Point2D.Float( x, y + yOffset );
    //            HelpItem helpText3 = new HelpItem( "Heats or cools gas in the box. You can" +
    //                                               "\ncontrol it from the panel on the right.", p );
    //            new AddHelpItemCmd( helpText3 ).doIt();
    //        }
    //    }

}
