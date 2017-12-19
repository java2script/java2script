// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.electrichockey;

//edu.colorado.phet.ehockey.Force on the positivePuckImage due to a charge;  not a general edu.colorado.phet.ehockey.Force


// BH 1 Point loc -> Point2D loc; 
import java.awt.*;
import java.awt.geom.Point2D;

import edu.colorado.phet.common.phetcommon.view.graphics.Arrow;

public class Force {
    private Charge charge;            //charge causing force on positivePuckImage
    private Color gridColor;
    private Point chargePt;            //position of charge producing force
    private Point2D.Double displacement;      //displacement vector from charge to positivePuckImage
    private double r;                //magnitude of displacement
    private double cutoff;            //value of r at which force divergence is cutoff
    private double rSq;                //magnitude of displacement-squared
    private double xComp, yComp;    //x- and y-component of the force
    private int xCompInt, yCompInt;    //x- and y-component of the force
    private double x0, y0;            //x- and y-components of the tail of the arrow, double-valued
    private int x0Int, y0Int;        //x- and y-components of the tail of the arrow, integer-valued
    private double forceFactor = 1000000.0;        //arbitrary factor
    private ElectricHockeyArrow forceArrow;                //arrow representing force

    public Force( Charge charge, Charge puck )  //force on positivePuckImage due to charge
    {
    	
    	forceArrow = new ElectricHockeyArrow();
    	displacement = new Point2D.Double();
    	this.set(charge, puck);
    }

    public Force( double xComp, double yComp ) {
        this.xComp = xComp;
        this.yComp = yComp;
    }

    //Constructor for net force on a grid charge, comes with own color, which depends on force magnitude
    public Force( double xComp, double yComp, Charge gridCharge, Color gridColor ) {
    	set4(xComp, yComp, gridCharge, gridColor);
    }

		public Force set4(double xComp, double yComp, Charge gridCharge, Color gridColor) {
      this.xComp = xComp;
      this.yComp = yComp;
      xCompInt = (int) xComp;
      yCompInt = (int) yComp;
      this.charge = gridCharge;
      this.gridColor = gridColor;
      x0 = gridCharge.getPosition2D().getX();
      y0 = gridCharge.getPosition2D().getY();
      x0Int = (int) x0;
      y0Int = (int) y0;
			return this;
		}
		
		public Force set(Charge charge1, Charge charge2) {
      this.charge = charge1;
      chargePt = charge.getPosition();
      x0 = charge2.getPosition2D().getX();
      y0 = charge2.getPosition2D().getY();

      displacement.x = x0 - (double) chargePt.x;
      displacement.y = y0 - (double) chargePt.y;

      r = charge2.getPosition2D().distance( chargePt );
      cutoff = 25.0;
      if ( r < cutoff ) {
          r = cutoff;        //short distance cutoff
      }
      rSq = r * r;
      //rSq = positivePuckImage.getPosition2D().distanceSq((Point2D)chargePt);
      xComp = forceFactor * charge.getSign() * charge2.getSign() * displacement.getX() / ( r * rSq );
      yComp = forceFactor * charge.getSign() * charge2.getSign() * displacement.getY() / ( r * rSq );

      
      forceArrow.setPosition( (int) x0, (int) y0, (int) x0 + (int) xComp, (int) y0 + (int) yComp );
      return this;

		}

    public double getXComp() {
        return xComp;
    }

    public double getYComp() {
        return yComp;
    }

    public void paint( Graphics g2D ) {
        if ( charge.getSign() == Charge.POSITIVE ) {
            g2D.setColor( Color.pink );
        }
        else if ( charge.getSign() == Charge.NEGATIVE ) {
            g2D.setColor( Color.cyan );
        }
        //else if (charge.getSign() == edu.colorado.phet.ehockey.Charge.GRID) g2D.setColor(Color.gray);
        forceArrow.paint( g2D );
    }

    public void paintGridArrow( Graphics2D g2D, Point2D.Double loc, Point2D.Double dst, Arrow arrow ) {
        loc.x = x0Int;
        loc.y = y0Int;
        dst.x = x0Int + xCompInt;
        dst.y = y0Int + yCompInt;
        arrow.set( loc, dst, 6, 6, 2, 3, true );
        g2D.setColor( gridColor );
        g2D.draw( arrow.getShape() );
    }





}

