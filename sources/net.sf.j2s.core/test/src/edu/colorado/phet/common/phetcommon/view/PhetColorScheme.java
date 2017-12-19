// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.view;

import java.awt.Color;
import java.awt.GridLayout;
import java.lang.reflect.Field;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;

import edu.colorado.phet.common.phetcommon.view.util.SwingUtils;

/**
 * This class is meant to represent the recommended color schemes for PhET simulations,
 * so that sims are encouraged can use the same conventions, where possible.
 * This is based on the google doc here:
 * http://spreadsheets.google.com/ccc?key=0Ajw3oS4YmCBqdDZzYUhlMksxZ0lfUHZ3bXUzM0JNU3c&hl=en&pli=1#gid=0
 *
 * @author Sam Reid
 */
public class PhetColorScheme {
    public static final Color BLACK = new Color( 0, 0, 0 );
    public static final Color BLUE = new Color( 0, 0, 255 );
    public static final Color LIGHT_BLUE = new Color( 50, 130, 215 );
    public static final Color PALE_BLUE = new Color( 0, 204, 255 );
    public static final Color GREEN = new Color( 0, 255, 0 );
    public static final Color DARK_GREEN = new Color( 0, 200, 0 );
    public static final Color TURQUOISE = new Color( 0, 255, 255 );
    public static final Color OLIVE = new Color( 128, 128, 0 );
    public static final Color BRICK_RED_BROWN = new Color( 153, 51, 0 );
    public static final Color PURPLE = new Color( 153, 51, 102 );
    public static final Color RED = new Color( 255, 0, 0 );
    public static final Color ORANGE = new Color( 255, 153, 0 );
    public static final Color PINK = new Color( 255, 153, 204 );
    public static final Color GOLD = new Color( 255, 235, 0 );
    public static final Color TAN_ORANGE = new Color( 236, 153, 55 );
    public static final Color RED_COLORBLIND = new Color( 255, 85, 0 );//Reddish color that also looks good in colorblind tests, see #2753

    public static final Color TOTAL_ENERGY = TAN_ORANGE;
    public static final Color KINETIC_ENERGY = GREEN;
    public static final Color POTENTIAL_ENERGY = BLUE;
    public static final Color HEAT_THERMAL_ENERGY = RED_COLORBLIND;
    public static final Color ELASTIC_ENERGY = PALE_BLUE;
    public static final Color NET_WORK = DARK_GREEN;
    public static final Color TOTAL_FORCE = DARK_GREEN;
    public static final Color FRICTION_FORCE = RED_COLORBLIND;
    public static final Color NORMAL_FORCE = GOLD;
    public static final Color GRAVITATIONAL_FORCE = LIGHT_BLUE;
    public static final Color APPLIED_FORCE = TAN_ORANGE;
    public static final Color WALL_FORCE = BRICK_RED_BROWN;
    public static final Color POSITION = BLUE;
    public static final Color VELOCITY = RED_COLORBLIND;
    public static final Color ACCELERATION = GREEN;
    public static final Color REAL_PART = ORANGE;
    public static final Color IMAGINARY_PART = PURPLE;

    public static void main( String[] args ) throws IllegalAccessException {
        JFrame frame = new JFrame( "Phet Color Scheme" );
        VerticalLayoutPanel panel = new VerticalLayoutPanel();
        frame.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE );
        Field[] fields = PhetColorScheme.class.getFields();
        GridLayout gridLayout = new GridLayout( fields.length, 2, 4, 4 );
        panel.setLayout( gridLayout );
        for ( Field field : fields ) {
            if ( field.getType().isAssignableFrom( Color.class ) ) {
                panel.add( new JLabel( field.getName() ) );
                JPanel px = new JPanel();
                px.setBackground( (Color) field.get( null ) );
                panel.add( px );
            }
        }
        frame.setContentPane( new JScrollPane( panel, JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED, JScrollPane.HORIZONTAL_SCROLLBAR_NEVER ) );
        frame.pack();
        SwingUtils.centerWindowOnScreen( frame );
        frame.setVisible( true );
    }
}