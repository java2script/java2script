// Copyright 2002-2012, University of Colorado
package edu.colorado.phet.common.phetcommon.view.controls;

import java.awt.Image;

import javax.swing.Icon;
import javax.swing.ImageIcon;
import javax.swing.JComponent;
import javax.swing.JPanel;

import edu.colorado.phet.common.phetcommon.model.property.SettableProperty;
import edu.colorado.phet.common.phetcommon.simsharing.components.SimSharingIcon;
import edu.colorado.phet.common.phetcommon.simsharing.messages.IUserComponent;
import edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponentChain;
import edu.colorado.phet.common.phetcommon.util.function.VoidFunction0;
import edu.colorado.phet.common.phetcommon.view.util.PhetFont;

/**
 * Property check box with associated icon.
 * Clicking either the check box or icon toggles the property.
 * Data-collection message when clicking the icon identifies the component as userComponent.icon.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class PropertyCheckBoxWithIcon extends JPanel {

    private final JComponent checkBox, iconLabel;

    public PropertyCheckBoxWithIcon( IUserComponent userComponent, final String text, final PhetFont font, Image image, final SettableProperty<Boolean> property ) {
        this(userComponent, text, font, new ImageIcon( image ), property );
    }

    public PropertyCheckBoxWithIcon( IUserComponent userComponent, final String text, final PhetFont font, Icon icon, final SettableProperty<Boolean> property ) {
        checkBox = new PropertyCheckBox( userComponent, text, property ) {{
            setFont( font );
        }};
        iconLabel = new SimSharingIcon( UserComponentChain.chain( userComponent, "icon" ), icon, new VoidFunction0() {
            @Override
						public void apply() {
                if ( isEnabled() ) {
                    property.set( !property.get() );
                }
            }
        } );
        add( checkBox );
        add( iconLabel );
    }

    @Override public void setEnabled( boolean enabled ) {
        super.setEnabled( enabled );
        checkBox.setEnabled( enabled );
        iconLabel.setEnabled( enabled );
    }
}
