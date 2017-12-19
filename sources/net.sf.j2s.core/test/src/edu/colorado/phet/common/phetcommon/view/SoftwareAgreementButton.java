// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.view;

import edu.colorado.phet.common.phetcommon.simsharing.components.SimSharingJButton;
import edu.colorado.phet.common.phetcommon.simsharing.messages.IUserComponent;

/**
 * Pressing this button displays the Software Agreement in a dialog.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class SoftwareAgreementButton extends SimSharingJButton {

	public SoftwareAgreementButton(IUserComponent userComponent) {
		super(userComponent);
		// TODO Auto-generated constructor stub
	}
//
//    private static final String LABEL = PhetCommonResources.getString( "Common.About.AgreementButton" );
//
//    public SoftwareAgreementButton( final Dialog parent ) {
//        super( aboutDialogSoftwareAgreementButton );
//        setText( LABEL );
//        addActionListener( new ActionListener() {
//            public void actionPerformed( ActionEvent e ) {
//                new SoftwareAgreementDialog( parent ).setVisible( true );
//            }
//        } );
//    }
}