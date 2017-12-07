// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetgraphics.view.phetcomponents;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Component;
import java.awt.Font;
import java.awt.Rectangle;
import java.awt.Stroke;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.util.ArrayList;
import java.util.EventListener;

import javax.swing.event.MouseInputAdapter;

import edu.colorado.phet.common.phetcommon.view.util.PhetFont;
import edu.colorado.phet.common.phetcommon.view.util.RectangleUtils;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.CompositePhetGraphic;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetShapeGraphic;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetTextGraphic;

/**
 * Created by IntelliJ IDEA.
 * User: Sam Reid
 * Date: Dec 24, 2004
 * Time: 12:28:11 AM
 * To change this template use File | Settings | File Templates.
 */
public class PhetButton extends CompositePhetGraphic {
    private String text;
    private PhetTextGraphic textGraphic;
    private PhetShapeGraphic backgroundGraphic;
    private ArrayList<EventListener> listeners = new ArrayList<EventListener>();
    private Color backgroundColor = Color.lightGray;
    private Color textColor = Color.black;
    private Color clickColor = Color.gray;
    private Color borderColor = Color.black;
    private Stroke borderStroke = new BasicStroke( 2.0f );
    private Font font = new PhetFont( Font.BOLD, 18 );

    public PhetButton( Component component, String text ) {
        super( component );
        this.text = text;
        this.textGraphic = new PhetTextGraphic( component, font, text, textColor, 0, 0 );
        this.backgroundGraphic = new PhetShapeGraphic( component, null, backgroundColor, borderStroke, borderColor );
        addMouseInputListener( new MouseInputAdapter() {
            @Override
						public void mousePressed( MouseEvent e ) {
                backgroundGraphic.setColor( clickColor );
            }

            @Override
						public void mouseReleased( MouseEvent e ) {
                fireEvent();
                backgroundGraphic.setColor( backgroundColor );
            }

            @Override
						public void mouseEntered( MouseEvent e ) {
                backgroundGraphic.setBorderColor( Color.white );
            }

            @Override
						public void mouseExited( MouseEvent e ) {
                backgroundGraphic.setBorderColor( borderColor );
            }
        } );
        addGraphic( backgroundGraphic );
        addGraphic( textGraphic );
        setCursorHand();
        update();
    }

    static int eventID = 0;

    private void fireEvent() {
        ActionEvent event = new ActionEvent( this, eventID++, "PhetButtonPress" );
        for ( int i = 0; i < listeners.size(); i++ ) {
            ActionListener actionListener = (ActionListener) listeners.get( i );
            actionListener.actionPerformed( event );
        }
    }

    public void setText( String text ) {
        this.text = text;
        update();
    }

    private void update() {
        textGraphic.setText( text );
        textGraphic.setFont( font );
        textGraphic.setColor( textColor );

        backgroundGraphic.setBorderPaint( borderColor );
        backgroundGraphic.setColor( backgroundColor );
        backgroundGraphic.setStroke( borderStroke );

        Rectangle bounds = textGraphic.getLocalBounds();
        bounds = RectangleUtils.expand( bounds, 5, 5 );

        backgroundGraphic.setShape( bounds );
        setBoundsDirty();
        autorepaint();
    }

    public void setBackgroundColor( Color backgroundColor ) {
        this.backgroundColor = backgroundColor;
        update();
    }

    public void setTextColor( Color textColor ) {
        this.textColor = textColor;
        update();
    }

    public void setClickColor( Color clickColor ) {
        this.clickColor = clickColor;
        update();
    }

    public void setBorderColor( Color borderColor ) {
        this.borderColor = borderColor;
        update();
    }

    public void setBorderStroke( Stroke borderStroke ) {
        this.borderStroke = borderStroke;
        update();
    }

    public void setFont( Font font ) {
        this.font = font;
        update();
    }

    public void addActionListener( ActionListener actionListener ) {
        listeners.add( actionListener );
    }
}
