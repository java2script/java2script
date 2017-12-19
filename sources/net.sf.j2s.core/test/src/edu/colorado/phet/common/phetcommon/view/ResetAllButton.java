// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view;

import java.awt.Component;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JFrame;
import javax.swing.JPanel;

import edu.colorado.phet.common.phetcommon.model.Resettable;
import edu.colorado.phet.common.phetcommon.resources.PhetCommonResources;
import edu.colorado.phet.common.phetcommon.simsharing.components.SimSharingJButton;

import static edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponents.resetAllButton;

/**
 * Swing version of the "Reset All" button.
 * When it's pressed, requests confirmation.
 * If confirmation is affirmative, then all Resettables are reset.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class ResetAllButton extends SimSharingJButton {

    private final ResetAllDelegate delegate; // delegate that implements Reset All behavior

    /**
     * @param parent parent component for the confirmation dialog
     */
    public ResetAllButton( final Component parent ) {
        this( new Resettable[0], parent );
    }

    /**
     * @param resettable thing to reset
     * @param parent     parent component for the confirmation dialog
     */
    public ResetAllButton( final Resettable resettable, final Component parent ) {
        this( new Resettable[] { resettable }, parent );
    }

    /**
     * @param resettables things to reset
     * @param parent      parent component for the confirmation dialog
     */
    public ResetAllButton( final Resettable[] resettables, final Component parent ) {
        super( resetAllButton, PhetCommonResources.getInstance().getLocalizedString( PhetCommonResources.STRING_RESET_ALL ) );
        this.delegate = new ResetAllDelegate( resettables, parent );
        addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                delegate.resetAll();
            }
        } );
    }

    public void setConfirmationEnabled( boolean confirmationEnabled ) {
        delegate.setConfirmationEnabled( confirmationEnabled );
    }

    public boolean isConfirmationEnabled() {
        return delegate.isConfirmationEnabled();
    }

    public void addResettable( Resettable resettable ) {
        delegate.addResettable( resettable );
    }

    public void removeResettable( Resettable resettable ) {
        delegate.removeResettable( resettable );
    }

    public static void main( String[] args ) {

        Resettable resettable1 = new Resettable() {
            @Override
						public void reset() {
                System.out.println( "resettable1.reset" );
            }
        };
        Resettable resettable2 = new Resettable() {
            @Override
						public void reset() {
                System.out.println( "resettable2.reset" );
            }
        };

        ResetAllButton button1 = new ResetAllButton( resettable1, null );
        button1.addResettable( resettable2 );

        ResetAllButton button2 = new ResetAllButton( resettable1, null );
        button2.setConfirmationEnabled( false ); // disable confirmation
        button2.addResettable( resettable2 );

        JPanel panel = new JPanel();
        panel.add( button1 );
        panel.add( button2 );

        JFrame frame = new JFrame();
        frame.setContentPane( panel );
        frame.pack();
        frame.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE );
        frame.setVisible( true );
    }
}
