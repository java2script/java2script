// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view;

import java.awt.Component;
import java.util.Vector;

import javax.swing.JOptionPane;

import edu.colorado.phet.common.phetcommon.model.Resettable;
import edu.colorado.phet.common.phetcommon.simsharing.SimSharingManager;
import edu.colorado.phet.common.phetcommon.simsharing.messages.SystemActions;
import edu.colorado.phet.common.phetcommon.simsharing.messages.SystemComponentTypes;
import edu.colorado.phet.common.phetcommon.simsharing.messages.SystemComponents;
import edu.colorado.phet.common.phetcommon.simsharing.messages.UserActions;
import edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponentTypes;
import edu.colorado.phet.common.phetcommon.view.util.PhetOptionPane;

import static edu.colorado.phet.common.phetcommon.resources.PhetCommonResources.getInstance;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponents.resetAllConfirmationDialogNoButton;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponents.resetAllConfirmationDialogYesButton;

/**
 * Delegate for "Reset All" behavior.
 * Calling resetAll opens a confirmation dialog.
 * If the user confirms, then all Resettables are reset.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class ResetAllDelegate {

    private final Vector<Resettable> resettables;
    private final Component parent;
    private boolean confirmationEnabled;

    /**
     * @param resettables things to reset
     * @param parent      parent component for the confirmation dialog
     */
    public ResetAllDelegate( final Resettable[] resettables, final Component parent ) {
        this.resettables = new Vector<Resettable>();
        for ( Resettable resettable : resettables ) {
            this.resettables.add( resettable );
        }
        this.parent = parent;
        this.confirmationEnabled = true;
    }

    public void setConfirmationEnabled( boolean confirmationEnabled ) {
        this.confirmationEnabled = confirmationEnabled;
    }

    public boolean isConfirmationEnabled() {
        return confirmationEnabled;
    }

    public void addResettable( Resettable resettable ) {
        resettables.add( resettable );
    }

    public void removeResettable( Resettable resettable ) {
        resettables.remove( resettable );
    }

    /**
     * Resets all Resettables, with optional confirmation.
     */
    public void resetAll() {
        if ( !confirmationEnabled || confirmReset() ) {
            for ( Resettable resettable : resettables ) {
                resettable.reset();
            }
        }
    }

    /*
    * Opens a confirmation dialog, returns true if the user selects "Yes".
    */
    private boolean confirmReset() {
        //Show a message that reset confirmation was requested--this allows us to keep track of how many times the user pressed cancel vs ok,
        //And helps correlate the window activated/deactivated with this feature (otherwise you wouldn't be able to tell that the user wasn't going to another application)
        //SimSharingManager.sendSystemMessage( SystemComponents.resetAllConfirmationDialog, SystemComponentTypes.dialog, SystemActions.windowOpened );

        String message = getInstance().getLocalizedString( "ControlPanel.message.confirmResetAll" );
        String title = getInstance().getLocalizedString( "Common.title.confirm" );
        int option = PhetOptionPane.showYesNoDialog( parent, message, title );
        final boolean shouldReset = option == JOptionPane.YES_OPTION;
        //SimSharingManager.sendUserMessage( shouldReset ? resetAllConfirmationDialogYesButton : resetAllConfirmationDialogNoButton, UserComponentTypes.button, UserActions.pressed );

        return shouldReset;
    }
}