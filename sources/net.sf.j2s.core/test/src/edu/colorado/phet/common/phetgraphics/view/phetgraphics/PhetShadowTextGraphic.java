// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author:samreid $
 * Revision : $Revision:14674 $
 * Date modified : $Date:2007-04-17 02:37:37 -0500 (Tue, 17 Apr 2007) $
 */
package edu.colorado.phet.common.phetgraphics.view.phetgraphics;

import java.awt.Color;
import java.awt.Component;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.Rectangle;

import edu.colorado.phet.common.phetcommon.view.util.RectangleUtils;

/**
 * PhetShadowTextGraphic
 *
 * @author ?
 * @version $Revision:14674 $
 */
public class PhetShadowTextGraphic extends PhetGraphic {
    private PhetTextGraphic foreground;
    private PhetTextGraphic background;

    public PhetShadowTextGraphic( Component component, Font font, String text, Color foregroundColor, int dx, int dy, Color backgroundColor ) {
        super( component );
        foreground = new PhetTextGraphic( component, font, text, foregroundColor );
        background = new PhetTextGraphic( component, font, text, backgroundColor, dx, dy );
    }

    /**
     * @deprecated
     */
    @Deprecated
		public PhetShadowTextGraphic( Component component, String text, Font font, int x, int y, Color foregroundColor, int dx, int dy, Color backgroundColor ) {
        super( component );
        foreground = new PhetTextGraphic( component, font, text, foregroundColor, 0, 0 );
        background = new PhetTextGraphic( component, font, text, backgroundColor, 0 + dx, 0 + dy );
        setLocation2( x, y );
    }

    @Override
		public void paint( Graphics2D g2 ) {
        if ( isVisible() ) {
            saveGraphicsState( g2 );
            updateGraphicsState( g2 );
            g2.transform( getNetTransform() );
            background.paint( g2 );
            foreground.paint( g2 );
            restoreGraphicsState();
        }
    }

	@Override
	protected Rectangle determineBounds() {
		Rectangle fore = foreground.getBounds();
		Rectangle back = background.getBounds();
		if (fore == null && back == null)
			return null;
		if (fore == null)
			return back;
		if (back == null)
			return fore;
		localRect.x = Integer.MAX_VALUE;
		RectangleUtils.unionAdd(fore, localRect);
		RectangleUtils.unionAdd(back, localRect);
		return determineShapeBounds();
	}

    public void setText( String text ) {
        foreground.setText( text );
        background.setText( text );
        setBoundsDirtyOpt();
        autorepaint();
    }

    public void setColor( Color color ) {
        this.foreground.setColor( color );
    }

    public void setShadowColor( Color color ) {
        this.background.setColor( color );
    }

    public void setFont( Font font ) {
        foreground.setFont( font );
        background.setFont( font );
        setBoundsDirtyOpt();
        autorepaint();
    }

    //-----------------------------------------------------------
    // Provided for Java Beans conformance
    //-----------------------------------------------------------

    public PhetShadowTextGraphic() {
    }

    public PhetTextGraphic getForeground() {
        return foreground;
    }

    public void setForeground( PhetTextGraphic foreground ) {
        this.foreground = foreground;
    }

    public PhetTextGraphic getBackground() {
        return background;
    }

    public void setBackground( PhetTextGraphic background ) {
        this.background = background;
    }

    public String getText() {
        return foreground.getText();
    }
}
