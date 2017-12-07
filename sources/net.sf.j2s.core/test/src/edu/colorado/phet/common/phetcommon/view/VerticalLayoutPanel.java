// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 54200 $
 * Date modified : $Date: 2011-07-18 19:45:40 -0500 (Mon, 18 Jul 2011) $
 */
package edu.colorado.phet.common.phetcommon.view;

import java.awt.Component;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;

import javax.swing.JPanel;

/**
 * VerticalLayoutPanel
 *
 * @author ?
 * @version $Revision: 54200 $
 */
public class VerticalLayoutPanel extends JPanel {
    private GridBagConstraints gridBagConstraints;

    public VerticalLayoutPanel() {
        setLayout( new GridBagLayout() );
        gridBagConstraints = new GridBagConstraints( 0, 0, 1, 1, 1, 1, GridBagConstraints.CENTER, GridBagConstraints.HORIZONTAL, new Insets( 0, 0, 0, 0 ), 0, 0 );
    }

    public GridBagConstraints getGridBagConstraints() {
        return gridBagConstraints;
    }

    @Override
		public Component add( Component comp ) {
        super.add( comp, gridBagConstraints );
        gridBagConstraints.gridy++;
        return null;
    }

    public void setGridY( int gridy ) {
        this.gridBagConstraints.gridy = gridy;
    }

    public void setFill( int fill ) {
        gridBagConstraints.fill = fill;
    }

    public void setFillHorizontal() {
        setFill( GridBagConstraints.HORIZONTAL );
    }

    public void setFillNone() {
        setFill( GridBagConstraints.NONE );
    }

    public void setAnchor( int anchor ) {
        gridBagConstraints.anchor = anchor;
    }

    public void setInsets( Insets insets ) {
        gridBagConstraints.insets = insets;
    }

    public int getFill() {
        return gridBagConstraints.fill;
    }

    public Component addFullWidth( Component component ) {
        int fill = getFill();
        setFill( GridBagConstraints.HORIZONTAL );
        Component c = add( component );
        setFill( fill );
        return c;
    }
}
