// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.view.menu;

import edu.colorado.phet.common.phetcommon.model.property.SettableProperty;
import edu.colorado.phet.common.phetcommon.resources.PhetCommonResources;
import edu.colorado.phet.common.phetcommon.simsharing.components.SimSharingJMenu;
import edu.colorado.phet.common.phetcommon.view.controls.PropertyCheckBoxMenuItem;

import static edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponents.teacherMenu;

/**
 * TeacherMenu is the "Teacher" menu that appears in the menu bar.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class TeacherMenu extends SimSharingJMenu {

    public TeacherMenu() {
        super( teacherMenu, PhetCommonResources.getString( "Common.TeacherMenu" ) );
        setMnemonic( PhetCommonResources.getChar( "Common.TeacherMenu.mnemonic", 'T' ) );
    }

    /**
     * Adds a JCheckBoxMenu item that allows the user to select whether the sim should be shown for a projector.
     *
     * @param whiteBackground the Property<Boolean> with which to synchronize.
     */
    public void addWhiteBackgroundMenuItem( SettableProperty<Boolean> whiteBackground ) {
        add( new PropertyCheckBoxMenuItem( PhetCommonResources.getString( "Common.WhiteBackground" ), whiteBackground ) {{
            setMnemonic( PhetCommonResources.getChar( "Common.WhiteBackground.mnemonic", 'W' ) );
        }} );
    }
}