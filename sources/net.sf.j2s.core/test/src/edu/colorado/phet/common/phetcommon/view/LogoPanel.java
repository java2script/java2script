// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author$
 * Revision : $Revision$
 * Date modified : $Date$
 */

package edu.colorado.phet.common.phetcommon.view;


import java.awt.Color;

import javax.swing.BorderFactory;
import javax.swing.ImageIcon;
import javax.swing.JLabel;
import javax.swing.JPanel;

import edu.colorado.phet.common.phetcommon.resources.PhetCommonResources;


/**
 * LogoPanel is the panel used to show the PhET logo.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 * @version $Revision$
 */
public class LogoPanel extends JPanel {

    public static final String IMAGE_PHET_LOGO = PhetLookAndFeel.PHET_LOGO_120x50;

    private ImageIcon imageIcon;
    private JLabel titleLabel;

    public LogoPanel() {
        imageIcon = new ImageIcon( PhetCommonResources.getInstance().getImage( IMAGE_PHET_LOGO ) );
        titleLabel = new JLabel( imageIcon );
        titleLabel.setBorder( BorderFactory.createLineBorder( Color.black, 1 ) );
        add( titleLabel );
    }
}
