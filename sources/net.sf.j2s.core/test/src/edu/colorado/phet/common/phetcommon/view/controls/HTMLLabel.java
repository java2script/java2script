// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view.controls;

import java.awt.Color;

import javax.swing.JLabel;
import javax.swing.UIManager;

//import edu.colorado.phet.common.phetcommon.view.util.HTMLUtils;

/**
 * A label whose text is HTML.  Swing doesn't properly handle the "graying out"
 * of text for JComponents that use HTML strings. See Unfuddle #1704.  This is a
 * quick-and-dirty workaround for one type of JComponent. A more general solution
 * is needed - or better yet, a Java fix.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class HTMLLabel extends JLabel {

    private Color foreground;

    /**
     * Constructor
     *
     * @param text plain text, HTML fragment, or HTML document
     */
    public HTMLLabel( String text ) {
    	  super(text);
//        super( HTMLUtils.toHTMLString( text ) );
        this.foreground = getForeground();
    }

    @Override
    public void setForeground( Color foreground ) {
        this.foreground = foreground;
        update();
    }

    @Override
    public void setEnabled( boolean enabled ) {
        super.setEnabled( enabled );
        update();
    }
//
//    @Override
//    public void setText( String text ) {
//        super.setText( HTMLUtils.toHTMLString( text ) );
//    }

    private void update() {
        super.setForeground( isEnabled() ? foreground : getDisabledColor() );
    }

    private Color getDisabledColor() {
        Color color = UIManager.getColor( "Label.disabledText" );
        if ( color == null ) {
            color = Color.GRAY;
        }
        return color;
    }

//    // test
//    public static void main( String[] args ) {
//
//        HTMLLabel label1 = new HTMLLabel( "label<sub>1" );
//        HTMLLabel label2 = new HTMLLabel( "label<sub>2</sub>" );
//        label2.setText( "label<sub>two</sub>" ); // test setText
//        label2.setEnabled( false );
//
//        JPanel panel = new JPanel();
//        panel.add( label1 );
//        panel.add( label2 );
//
//        JFrame frame = new JFrame();
//        frame.setContentPane( panel );
//        frame.pack();
//        frame.setDefaultCloseOperation( WindowConstants.EXIT_ON_CLOSE );
//        frame.setVisible( true );
//    }
}
