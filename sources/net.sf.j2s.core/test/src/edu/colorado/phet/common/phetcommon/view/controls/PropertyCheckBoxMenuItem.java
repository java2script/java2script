// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view.controls;

import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

import edu.colorado.phet.common.phetcommon.model.property.SettableProperty;
import edu.colorado.phet.common.phetcommon.simsharing.components.SimSharingJCheckBoxMenuItem;
import edu.colorado.phet.common.phetcommon.simsharing.messages.IUserComponent;
import edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponent;
import edu.colorado.phet.common.phetcommon.util.SimpleObserver;

/**
 * JCheckBoxMenuItem that is wired to a Property<Boolean>, includes data-collection feature.
 *
 * @author Sam Reid
 */
public class PropertyCheckBoxMenuItem extends SimSharingJCheckBoxMenuItem {

    private final SettableProperty<Boolean> property;
    private final SimpleObserver propertyObserver;

    /**
     * @deprecated use sim-sharing version
     */
    @Deprecated
		public PropertyCheckBoxMenuItem( String text, final SettableProperty<Boolean> property ) {
        this( new UserComponent( PropertyCheckBoxMenuItem.class ), text, property );
    }

    public PropertyCheckBoxMenuItem( IUserComponent userComponent, String text, final SettableProperty<Boolean> property ) {
        super( userComponent, text );

        this.property = property;

        // update the model when the menu item changes
        this.addChangeListener( new ChangeListener() {
            @Override
						public void stateChanged( ChangeEvent e ) {
                property.set( isSelected() );
            }
        } );

        // update the menu item when the model changes
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
