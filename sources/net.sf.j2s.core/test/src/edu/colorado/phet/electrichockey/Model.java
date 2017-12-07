// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.electrichockey;

import java.awt.Point;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.geom.GeneralPath;
import java.awt.geom.Point2D;
import java.util.ArrayList;

public class Model {
    private ElectricHockeySimulationPanel electricHockeySimulationPanel;
    private int fieldWidth, fieldHeight;
    private int barrierState;
    private boolean goalState;
    private boolean collisionState;
    private boolean pathStarted;
    private GeneralPath path;
    private ArrayList<Charge> chargeList;    //methods of Vector class: elementAt(int), size(), removeElementAt(int), addElement(Object)
    private ArrayList<Force> forceList;    //list of forces on positivePuckImage
    private final Point2D initialPuckPosition2D;
    private Point2D puckPosition2D;
    private Charge puck;
    private double mass = 25.0;            //mass of positivePuckImage
    private Force netForce;        //net force on positivePuckImage
    private double fFactor = 0.0020; //arbitrary multiplicative factor in acceleration, adjusted for correct speed of positivePuckImage
    private javax.swing.Timer timer;        //timer controlling motion of positivePuckImage
    private int dt = 3;                  //time step in milliseconds
    private int time;                      //total time in milliseconds
    private double x, y;                //instantaneous positivePuckImage position
    private double xBefore, yBefore;    //position in prior step
    private double xTemp, yTemp;        //temporary storage of x, y
    private boolean starting;

    public Model( int width, int height, ElectricHockeySimulationPanel electricHockeySimulationPanel ) {
        this.electricHockeySimulationPanel = electricHockeySimulationPanel;
        this.fieldWidth = width;
        this.fieldHeight = height;
        chargeList = new ArrayList<Charge>();
        forceList = new ArrayList<Force>();

        goalState = false;
        collisionState = false;
        initialPuckPosition2D = new Point2D.Double( (double) fieldWidth / 5, (double) fieldHeight / 2 );
        puckPosition2D = initialPuckPosition2D;

        pathStarted = false;
        path = new GeneralPath();

        puck = new Charge( puckPosition2D, Charge.POSITIVE );

        x = puckPosition2D.getX();
        y = puckPosition2D.getY();
        starting = true;

        timer = new javax.swing.Timer( dt, new timerHandler() );
    }//end of constructor

    public void updateForceList() {
        for ( int i = 0, n = forceList.size(); i < n; i++ ) {
            Charge chargeI = chargeList.get( i );
            Force forceI = forceList.get(i);
            if (forceI == null) {
            	forceI = new Force( chargeI, puck );
            forceList.set(i, forceI);
            } else {
            	forceI.set(chargeI,  puck);
            }
        }
    }

    public void addCharge( Charge charge ) {
        chargeList.add( charge );
        Force force = new Force( charge, puck );
        forceList.add( force );
        //updateForceList();
    }

    public void removeChargeAt( int i ) {
        chargeList.remove( i );
        forceList.remove( i );
        //updateForceList();
    }

    public int getChargeListSize() {
        //if(chargeList.isEmpty()) return 0;
        return chargeList.size();
    }

    public Charge getChargeAt( int i ) {
        Charge charge = chargeList.get( i );
        return charge;
    }

    public Force getForceAt( int i ) {
        Force force = forceList.get( i );
        return force;
    }

    public ArrayList<Charge> getChargeList() {
        return chargeList;
    }

    public ArrayList<Force> getForceList() {
        return forceList;
    }

    public Charge getPuck() {
        return puck;
    }

    public void setMass( double m ) {
        mass = m;
    }

    public Force getNetForce() {
        double netXComp = 0;
        double netYComp = 0;
        for ( int i = 0, n = forceList.size(); i < n; i++ ) {
            Force forceI = forceList.get( i );
            netXComp += forceI.getXComp();
            netYComp += forceI.getYComp();
        }
        netForce = new Force( netXComp, netYComp );
        return netForce;
    }

    public void updatePuckPositionVerlet() {
        if ( starting ) {
            Force F = getNetForce();
            xBefore = x;
            yBefore = y;
            x += ( fFactor * F.getXComp() / ( 2.0 * mass ) ) * dt * dt;
            y += ( fFactor * F.getYComp() / ( 2.0 * mass ) ) * dt * dt;
            starting = false;
        }
        else {
            Force F = getNetForce();
            xTemp = x;
            yTemp = y;
            x = 2 * x - xBefore + ( fFactor * F.getXComp() / mass ) * dt * dt;
            y = 2 * y - yBefore + ( fFactor * F.getYComp() / mass ) * dt * dt;
            xBefore = xTemp;
            yBefore = yTemp;

            puck.setPosition2D( new Point2D.Double( x, y ) );
            puck.setPosition( new Point( (int) x, (int) y ) );
            updateForceList();

            if ( x > 3 * fieldWidth || x < -3 * fieldWidth || y > 3 * fieldHeight || y < -3 * fieldHeight ) {
                stopTimer();
            }
        }
    }

    public void updatePath() {
        if ( !pathStarted ) {
            path.moveTo( puck.getPosition().x, puck.getPosition().y );
            pathStarted = true;
        }
        else {
            path.lineTo( puck.getPosition().x, puck.getPosition().y );
        }
    }

    public void setPathStarted( boolean pathStarted ) {
        this.pathStarted = pathStarted;
    }

    public GeneralPath getPath() {
        return path;
    }

    public void setBarrierState( int barrierState ) {
        this.barrierState = barrierState;
        switch( this.barrierState ) {
            case 0:
                BarrierList.currentCollisionArray = BarrierList.collisionArray0;
                break;
            case 1:
                BarrierList.currentCollisionArray = BarrierList.collisionArray1;
                break;
            case 2:
                BarrierList.currentCollisionArray = BarrierList.collisionArray2;
                break;
            case 3:
                BarrierList.currentCollisionArray = BarrierList.collisionArray3;
                break;
        }
    }

    public void startTimer() {
        timer.start();
    }

    public void stopTimer() {
        timer.stop();
    }

    public void resetTimer() {
        timer.stop();
        time = 0;
        x = initialPuckPosition2D.getX();
        y = initialPuckPosition2D.getY();
        puck.setPosition2D( initialPuckPosition2D );
        puck.setPosition( new Point( (int) initialPuckPosition2D.getX(), (int) initialPuckPosition2D.getY() ) );
        updateForceList();
        path.reset();
        pathStarted = false;
        starting = true;
        goalState = false;
        collisionState = false;
        electricHockeySimulationPanel.getPlayingField().paintAgain();
    }

    class timerHandler implements ActionListener {
        public void actionPerformed( ActionEvent aevt ) {
            int x = puck.getPosition().x;
            int y = puck.getPosition().y;
            //prt("x=" + x);

            if ( electricHockeySimulationPanel.getPlayingField().goal.contains( puck.getPosition() ) ) {
                goalState = true;
                if ( electricHockeySimulationPanel.getTada() != null ) {
                    electricHockeySimulationPanel.getTada().play();
                }
                electricHockeySimulationPanel.getPlayingField().paintAgain();
                stopTimer();

                // do not allow the puck to be moved
                return;
            }
            else if ( x > 0 && x < fieldWidth && y > 0 && y < fieldHeight ) {
                if ( BarrierList.currentCollisionArray[x][y] == 1 ) {
                    collisionState = true;
                    if ( electricHockeySimulationPanel.getCork() != null ) {
                        try {
                            electricHockeySimulationPanel.getCork().play();
                        } catch ( Exception e) {
                            e.printStackTrace();
                        }
                    }
                    electricHockeySimulationPanel.getPlayingField().paintAgain();
                    stopTimer();

                    // do not allow the puck to be moved
                    return;
                }
            }


            // only if the puck did not hit anything do we allow it to move
            time++;
            updatePuckPositionVerlet();
            if ( electricHockeySimulationPanel.getControlPanel().getTraceState() ) {
                updatePath();
            }
            
            //if(time%4 == 0)		//use to paint at intervals
            electricHockeySimulationPanel.getPlayingField().paintAgain(); //

        }
    }//end of timerHandler()


    public boolean getCollisionState() {
        return collisionState;
    }

    public boolean getGoalState() {
        return goalState;
    }

}
