// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.simsharing.messages;

/**
 * User component types.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public enum UserComponentTypes implements IUserComponentType {
    unknown, // TODO look for these occurrences and replace with something sensible
    button, checkBox, menuItem, radioButton, spinner, checkBoxMenuItem, icon, menu, tab, sprite, popupMenuItem,

    //Looks like a button, but stays in or out and acts like a radio button
    toggleButton,
    slider, jmolViewer, comboBox, popup, dialog, popupCheckBoxMenuItem, textField
}
