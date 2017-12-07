// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view.controls;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import edu.colorado.phet.common.phetcommon.model.property.SettableProperty;
import edu.colorado.phet.common.phetcommon.simsharing.components.SimSharingJCheckBox;
import edu.colorado.phet.common.phetcommon.simsharing.messages.IUserComponent;
import edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponent;
import edu.colorado.phet.common.phetcommon.util.SimpleObserver;

/**
 * JCheckBox that is wired to a Property<Boolean>, includes data collection feature.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class PropertyCheckBox extends SimSharingJCheckBox {

    private final SettableProperty<Boolean> property;
    private final SimpleObserver propertyObserver;

    /**
     * @deprecated use sim-sharing constructor
     */
    @Deprecated
		public PropertyCheckBox( final String text, final SettableProperty<Boolean> property ) {
        this( new UserComponent( PropertyCheckBox.class ), text, property );
    }

    public PropertyCheckBox( IUserComponent userComponent, final String text, final SettableProperty<Boolean> property ) {
        super( userComponent, text );

        this.property = property;

        // update the model when the check box is toggled.  Use ActionListener instead of ChangeListener to suppress multiple events.
        this.addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                property.set( isSelected() );
            }
        } );

        // update the check box when the model changes
        propertyObserver = new SimpleObserver() {
            @Override
						public void update() {
                setSelected( property.get() );
            }
        };
        property.addObserver( propertyObserver );
    }

    public void cleanup() {
        property.removeObserver( propertyObserver );
    }
}