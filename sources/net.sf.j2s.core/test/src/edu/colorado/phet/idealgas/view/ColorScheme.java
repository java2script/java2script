// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source: 
 * Branch : $Name:  
 * Modified by : $Author: 
 * Revision : $Revision: 
 * Date modified : $Date: 
 */

package edu.colorado.phet.idealgas.view;

import java.awt.*;

public class ColorScheme {

    public Color background;
    public Color pressureGaugeNeckColor;
    public Color thermometerOutline;

    public ColorScheme( Color background, Color thermometerOutline, Color pressureGaugeNeckColor ) {
        this.background = background;
        this.pressureGaugeNeckColor = pressureGaugeNeckColor;
        this.thermometerOutline = thermometerOutline;
    }
}
