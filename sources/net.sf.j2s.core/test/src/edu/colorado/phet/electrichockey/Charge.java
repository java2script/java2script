// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.electrichockey;

import java.awt.*;
import java.awt.geom.Point2D;

import javax.swing.*;


public class Charge extends JComponent {
    Point position;            //integer position
    Point2D position2D;        //Double position
    private Color color;

    int sign;                  //O = plus, 1 = minus
    int radius;
    public static final int NEGATIVE = -1;
    public static final int POSITIVE = 1;
    public static final int GRID = 3;        //field grid test charges are +1 positive and are colored gray

    public Charge( Point2D position2D, int sign ) {
        this( position2D, sign, getColor( sign ) );
    }

    private static Color getColor( int sign ) {
        if ( sign == NEGATIVE ) {
            return Color.blue;
        }
        else if ( sign == POSITIVE ) {
            return Color.red;
        }
        else {
            return Color.black;
        }
    }

    public Charge( Point2D position2D, int sign, Color color ) {
        this.position2D = position2D;
        this.color = color;
        this.position = new Point( (int) position2D.getX(), (int) position2D.getY() );
        this.sign = sign;
        radius = 8;
    }

    public void paint( Graphics2D g2D ) {
        g2D.setColor( color );
        int x = position.x;
        int y = position.y;
        g2D.fillOval( x - radius, y - radius, 2 * radius, 2 * radius );
    }

    public int getSign() {
        return sign;
    }

    public Point getPosition() {
        return position;
    }

    public Point2D getPosition2D() {
        return position2D;
    }

    public void setPosition( Point position ) {
        this.position = position;
    }

    public void setPosition2D( Point2D position2D ) {
        this.position2D = position2D;
    }

    public boolean contains( Point p ) {
        if ( p.x < ( position.x + radius ) && p.x > ( position.x - radius ) &&
             p.y < ( position.y + radius ) && p.y > ( position.y - radius ) ) {
            return true;
        }
        else {
            return false;
        }
    }

    public void setSign( int sign ) {
        this.sign = sign;
    }

}