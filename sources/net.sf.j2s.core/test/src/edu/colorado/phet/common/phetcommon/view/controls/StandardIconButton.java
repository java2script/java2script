// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view.controls;

import java.awt.Image;
import java.awt.Insets;

import javax.swing.Icon;
import javax.swing.ImageIcon;
import javax.swing.JButton;

import edu.colorado.phet.common.phetcommon.resources.PhetCommonResources;

/**
 * StandardIconButton is the abstract base class for all buttons that display PhET's standard icons.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public abstract class StandardIconButton extends JButton {

    private StandardIconButton( String imageResourceName ) {
        super();
        Image image = PhetCommonResources.getInstance().getImage( imageResourceName );
        Icon icon = new ImageIcon( image );
        setIcon( icon );
        setOpaque( false );
        setMargin( new Insets( 0, 0, 0, 0 ) );
    }

    public static class CloseButton extends StandardIconButton {

        public CloseButton() {
            super( PhetCommonResources.IMAGE_CLOSE_BUTTON );
        }
    }

    public static class MinimizeButton extends StandardIconButton {

        public MinimizeButton() {
            super( PhetCommonResources.IMAGE_MINIMIZE_BUTTON );
        }
    }

    public static class MaximizeButton extends StandardIconButton {

        public MaximizeButton() {
            super( PhetCommonResources.IMAGE_MAXIMIZE_BUTTON );
        }
    }
}
