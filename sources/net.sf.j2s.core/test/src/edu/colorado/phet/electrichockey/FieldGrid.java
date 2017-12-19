// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.electrichockey;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.Point;
import java.awt.RenderingHints;
import java.awt.geom.Point2D;
import java.util.ArrayList;

import edu.colorado.phet.common.phetcommon.view.graphics.Arrow;

public class FieldGrid //extends JLabel
{
    private ElectricHockeySimulationPanel electricHockeySimulationPanel;
    private int width, height;
    private int gridNbrWidth;            //number of grid points across width of field
    private int gridSpacing;            //grid spacing
    private int gridNbrHeight;            //number of grid points across height of field
    private Charge[][] gridChargeArray;    //+1 test charge on every grid point
    private Force[][] gridForceArray;    //net force on test charge at every grid point
    private double gridForceFactor;        //arbitrary scale factor controlling force arrow length
    private boolean antialias = false;
		private Force[] forces;

    public FieldGrid( int width, int height, ElectricHockeySimulationPanel electricHockeySimulationPanel ) {
        this.width = width;
        this.height = height;
        this.electricHockeySimulationPanel = electricHockeySimulationPanel;
        gridForceFactor = 25;
        gridNbrWidth = 25;
        gridSpacing = width / gridNbrWidth;
        gridNbrHeight = height / gridSpacing;
        gridChargeArray = new Charge[gridNbrWidth][gridNbrHeight];
        gridForceArray = new Force[gridNbrWidth][gridNbrHeight];
        initializeGridChargesAndForces();
    }

    public void initializeGridChargesAndForces() {

        for ( int i = 0; i < gridNbrWidth; i++ ) {
            for ( int j = 0; j < gridNbrHeight; j++ ) {
                Point pt = new Point( i * gridSpacing + gridSpacing / 2, j * gridSpacing + gridSpacing / 2 );
                gridChargeArray[i][j] = new Charge( pt, Charge.GRID );
                Force nullForceIJ = new Force( 0.0, 0.0, gridChargeArray[i][j], new Color( 250, 250, 250 ) );
                gridForceArray[i][j] = nullForceIJ;
            }
        }
    }

	public void updateGridForceArray() {

		ArrayList<Charge> chargeList = electricHockeySimulationPanel.getModel()
				.getChargeList();
		int nCharge = chargeList.size();
		int ngrid = gridNbrWidth * gridNbrHeight;
		int nForces = ngrid * nCharge;
		if (forces == null || nForces > forces.length)
			forces = new Force[nForces + ngrid * 2];
		for (int i = 0, pt = 0; i < gridNbrWidth; i++) {
			for (int j = 0; j < gridNbrHeight; j++) {
				double gridIJNetX = 0.0;
				double gridIJNetY = 0.0;
				Charge chargeIJ = gridChargeArray[i][j];
				for (int k = 0; k < nCharge; k++, pt++) {
					Charge chargeK = chargeList.get(k);
					Force forceIJK = (forces[pt] == null ? forces[pt] = new Force(
							chargeK, chargeIJ) : forces[pt].set(chargeK, chargeIJ));
					gridIJNetX += forceIJK.getXComp();
					gridIJNetY += forceIJK.getYComp();
				}
				// int grayscaleOffset=1;//Dubson's preference
				int grayscaleOffset = 0;
				// double power= 0.5;
				double power = 1.0;
				double forceMag = grayscaleOffset
						+ Math.pow((Math.pow(gridIJNetX, 2.0) + Math.pow(gridIJNetY, 2.0)),
								0.5); // magnitude of net force
				// gridForceArray[i][j] = new
				// edu.colorado.phet.ehockey.Force(Math.pow(gridIJNetX, 0.5),
				// Math.pow(gridIJNetY, 0.5), gridChargeArray[i][j]);
				// gridForceArray[i][j] = new
				// edu.colorado.phet.ehockey.Force(gridForceFactor*gridIJNetX,
				// gridForceFactor*gridIJNetY, gridChargeArray[i][j]);
				int colorFactor = 100;
				double potential = Math.pow(forceMag, power); // white
				colorFactor = (int) (-255.0 * potential / 300.0 + 255.0); // gray
				if (colorFactor < 1) {
					colorFactor = 1; // black
				} else if (colorFactor > 255) {
					colorFactor = 255; // white
				}
				Color gridColor = new Color(colorFactor, colorFactor, colorFactor);
				Force fIJ = gridForceArray[i][j];
				double x = gridForceFactor * gridIJNetX
						/ forceMag;
				double y = gridForceFactor * gridIJNetY / forceMag;
				gridForceArray[i][j] = (fIJ == null ? new Force(x, y,
						chargeIJ, gridColor) : fIJ.set4(x, y, chargeIJ, gridColor));
			}
		}
	}


  private final Point2D.Double pt1 = new Point2D.Double(), pt2 = new Point2D.Double();
	private final Arrow arrow = new Arrow();
  
    public void paint( Graphics2D g2D ) {
        g2D.setColor( Color.white );
        g2D.setBackground( Color.white );
        g2D.fillRect( 0, 0, width, height );
        if ( antialias ) {
            g2D.setRenderingHint( RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON );
        }
        for ( int i = 0; i < gridNbrWidth; i++ ) {
            for ( int j = 0; j < gridNbrHeight; j++ ) {
                //draw arrows
                gridForceArray[i][j].paintGridArrow( g2D, pt1, pt2, arrow  );
            }
        }
    }//end of paint

    public boolean isAntialias() {
        return antialias;
    }

    public void setAntialias( boolean antialias ) {
        this.antialias = antialias;
        electricHockeySimulationPanel.getPlayingField().updateBufferedImage();
        electricHockeySimulationPanel.getPlayingField().repaint();
    }
}//end of public class