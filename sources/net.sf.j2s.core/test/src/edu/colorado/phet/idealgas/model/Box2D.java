// Copyright 2002-2011, University of Colorado

/*
 * User: Ron LeMaster
 * Date: Oct 18, 2002
 * Time: 10:55:17 AM
 */
package edu.colorado.phet.idealgas.model;

import java.awt.geom.Line2D;
import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;
import java.util.EventListener;
import java.util.EventObject;
import java.util.List;

import edu.colorado.phet.common.mechanics.Body;
import edu.colorado.phet.common.phetcommon.math.MathUtil;
import edu.colorado.phet.common.phetcommon.util.EventChannel;
import edu.colorado.phet.idealgas.collision.CollidableBody;
import edu.colorado.phet.idealgas.collision.SphericalBody;


/**
 * A 2 dimensional box with an opening at the top
 */
@SuppressWarnings("deprecation")
public class Box2D extends CollidableBody {

    private Point2D center;
    private double minX;
    private double minY;
    private double maxX;
    private double maxY;
    private double width, height;
    private double leftWallVx = 0;
    private boolean autoNotify = true;
    private boolean volumeFixed = false;
    private double opening0x, opening1x, corner1x, corner1y, corner2x, corner2y;

	public boolean containsPt(Point2D position) {
		double x = position.getX();
		double y = position.getY();
		return (x >= corner1x && y >= corner1y && x < corner2x && y < corner2y);
	}

	/**
	 * reports to PumpControlPanel.MoleculeRemover and IdealGasModel 
	 * in order to fix a bug that molecules could be tunneling through the walls given enough energy.
	 * 
	 * @return whether the box is ajar or blown off
	 * @author Bob Hanson
	 * 
	 */
	public boolean isOpen() { // BH Java fix #5 - no tunneling!
		return opening0x != opening1x;
	}


    

    // TODO: put the opening characteristics in a specialization of this class.
    private Point2D.Double[] opening = new Point2D.Double[]{
            new Point2D.Double(),
            new Point2D.Double()};
    

    IdealGasModel model;
    private double oldMinX;
    private double minimumWidth = 100;
    private Line2D.Double openingLine;

    public Box2D( IdealGasModel model ) {
        super();
        type = TYPE_BOX2D; // BH not PARTICLE
        this.model = model;
        setMass( Double.POSITIVE_INFINITY );
        attachModelListener();
    }

    public Box2D( Point2D corner1, Point2D corner2, IdealGasModel model ) {
        super();
        type = TYPE_BOX2D;
        this.model = model;
        this.setState( corner1, corner2 );
        oldMinX = Math.min( corner1x, corner2x );
        setMass( Double.POSITIVE_INFINITY );
        attachModelListener();
    }

    /**
     * Attach a listener to the model that will decide if the box's volume should be fixed based
     * on the model's constant property
     */
    private void attachModelListener() {
        model.addChangeListener( new IdealGasModel.ChangeListener() {
            @Override
						public void stateChanged( IdealGasModel.ChangeEvent event ) {
                switch( event.getModel().getConstantProperty() ) {
                    case IdealGasModel.CONSTANT_NONE:
                    case IdealGasModel.CONSTANT_PRESSURE:
                    case IdealGasModel.CONSTANT_TEMPERATURE:
                        setVolumeFixed( false );
                        break;
                    case IdealGasModel.CONSTANT_VOLUME:
                        setVolumeFixed( true );
                        break;
                    default:
                        throw new RuntimeException( "Invalid constantProperty" );
                }
            }
        } );
    }


    /**
     * Since the box is infinitely massive, it can't move, and so
     * we say its kinetic energy is 0
     */
    @Override
		public double getKineticEnergy() {
        return 0;
    }

    @Override
		public Point2D getCM() {
        return center;
    }

    @Override
		public double getMomentOfInertia() {
        return Double.MAX_VALUE;
    }

    public void setBounds( double minX, double minY, double maxX, double maxY ) {
        this.setState( new Point2D.Double( minX, minY ), new Point2D.Double( maxX, maxY ) );
        changeListenerProxy.boundsChanged( new ChangeEvent( this ) );
    }

    @Override
		public void notifyObservers() {
        if( autoNotify ) {
            super.notifyObservers();
        }
    }

    private void setState( Point2D corner1, Point2D corner2 ) {
        setAutoNotify( false );
        
        width = Math.abs( (corner2x = corner2.getX()) - (corner1x = corner1.getX()));
        height = Math.abs( (corner2y = corner2.getY()) - (corner1y = corner1.getY()));
        maxX = Math.max( corner1x, corner2x );
        maxY = Math.max( corner1y, corner2y );
        minX = Math.max( Math.min( Math.min( corner1x, corner2x ), maxX - minimumWidth ), 40 );
        minY = Math.min( corner1y, corner2y );
        center = new Point2D.Double( ( this.maxX + this.minX ) / 2,
                                     ( this.maxY + this.minY ) / 2 );
        setPosition( new Point2D.Double( minX, minY ) );

        // Update the position of the door
        Point2D.Double[] opening = getOpening();
        opening[0].y = opening[1].y = minY;
        this.setOpening( opening );
        setAutoNotify( true );
        this.notifyObservers();
    }

    private void setAutoNotify( boolean b ) {
        this.autoNotify = b;
    }

    public void setMinimumWidth( double minimumWidth ) {
        this.minimumWidth = minimumWidth;
    }

    public double getMinimumWidth() {
        return minimumWidth;
    }

    public void setOpening( Point2D.Double[] opening ) {
        this.opening[0] = opening[0];
        this.opening[1] = opening[1];
        opening0x = opening[0].x;
        opening1x = opening[1].x;
        openingLine = new Line2D.Double( opening[0], opening[1] );
        notifyObservers();

        changeListenerProxy.boundsChanged( new ChangeEvent( this ) );
    }

    public Point2D.Double[] getOpening() {
        return this.opening;
    }

	public boolean isInOpening(SphericalBody particle) { // BH body must be
																												// SphericalBody

		// BH inline return; minimum of checks and calls; fixes problem
		// BH escaped particle returned to box because it is not in the opening

		// boolean result = false;
		// if( body instanceof SphericalBody ) {
		// SphericalBody particle = (SphericalBody)body;
		double x = particle.getPosition().getX();
		return (x >= opening0x && x <= opening1x
				&& particle.getPosition().getY() - particle.getRadius() <= minY);
		// else {
		// result = false;
		// }
		// }
		// return result;
	}

    public boolean passedThroughOpening( GasMolecule gasMolecule ) {
        Point2D.Double p1 = gasMolecule.getPosition();
        Point2D.Double p2 = gasMolecule.getPositionPrev();
        return MathUtil.segmentsIntersectLP2(openingLine, p1, p2);
    }

    /**
     * End of the line for PressureSensingBox.stepInTime
     */
    @Override
		public void stepInTime( double dt ) {
    	stepInTimeB2D(dt); // BH
    }

    /**
     * 
     * SwingJS optimization -- call only from PressureSensingBox
     * @param dt
     */
    protected void stepInTimeB2D(double dt) {
      // Compute the speed of the left wall
      leftWallVx = ( minX - oldMinX ) / dt;
      oldMinX = minX;
		}

		/**
     *
     */
    public boolean isOutsideBox( SphericalBody particle ) {
        Point2D p = particle.getPosition();
        double rad = particle.getRadius();
        boolean isInBox = p.getX() - rad >= this.getMinX()
                          && p.getX() + rad <= this.getMaxX()
                          && p.getY() - rad >= this.getMinY()
                          && p.getY() + rad <= this.getMaxY();
        return !isInBox;
    }

    /**
     *
     */
    public boolean isOutsideBoxPt( Point2D p ) {
        boolean isInBox = p.getX() >= this.getMinX()
                          && p.getX() <= this.getMaxX()
                          && p.getY() >= this.getMinY()
                          && p.getY() <= this.getMaxY();
        return !isInBox;
    }

    private Rectangle2D.Double rTemp = new Rectangle2D.Double();
    
    public Rectangle2D.Double getBoundsInternalNoCopy() {
    	rTemp.x = corner1x;
    	rTemp.y = corner1y;
    	rTemp.width = width;
    	rTemp.height = height;
      return  rTemp;
    }

    public Rectangle2D.Double getBoundsInternal() {
        java.awt.geom.Rectangle2D.Double r = new Rectangle2D.Double( getCorner1X(), getCorner1Y(), getWidth(), getHeight() );
        
        return  r;
    }

    // TODO: change references so these methods don't have to be public.
    public double getCorner1X() {
        return corner1x;
    }

    public double getCorner1Y() {
        return corner1y;
    }

    public double getCorner2X() {
        return corner2x;
    }

    public double getCorner2Y() {
        return corner2y;
    }

    public Point2D getCenter() {
        return center;
    }

    public double getMinX() {
        return minX;
    }

    public double getMinY() {
        return minY;
    }

    public double getMaxX() {
        return maxX;
    }

    public double getMaxY() {
        return maxY;
    }

    public double getWidth() {
        return width;
    }

    public double getHeight() {
        return height;
    }

    public double getContactOffset( Body body ) {
        return 0;
    }

    public float getContactOffset( CollidableBody body ) {
        return 0;
    }

    public double getLeftWallVx() {
        return leftWallVx;
    }

    public boolean isVolumeFixed() {
        return volumeFixed;
    }

    public void setVolumeFixed( boolean volumeFixed ) {
        boolean notifyListeners = false;
        if( this.volumeFixed != volumeFixed ) {
            notifyListeners = true;
        }
        this.volumeFixed = volumeFixed;
        if( notifyListeners ) {
            changeListenerProxy.isVolumeFixedChanged( new ChangeEvent( this ) );
        }
    }

    //-----------------------------------------------------------------
    // Events and event handling
    //-----------------------------------------------------------------
    @SuppressWarnings("serial")
		public class ChangeEvent extends EventObject {
        public ChangeEvent( Object source ) {
            super( source );
        }

        public Box2D getBox2D() {
            return (Box2D)getSource();
        }
    }

    public interface ChangeListener extends EventListener {
        void boundsChanged( ChangeEvent event );

        void isVolumeFixedChanged( ChangeEvent event );
    }

    static public class ChangeListenerAdapter implements ChangeListener {

        @Override
				public void boundsChanged( ChangeEvent event ) {
        }

        @Override
				public void isVolumeFixedChanged( ChangeEvent event ) {
        }
    }

    private EventChannel changeEventChannel = new EventChannel( ChangeListener.class );
    private ChangeListener changeListenerProxy = (ChangeListener)changeEventChannel.getListenerProxy();

    public void addChangeListener( ChangeListener listener ) {
        changeEventChannel.addListener( listener );
    }

    public void removeChangeListenerPSB( ChangeListener listener ) {
        changeEventChannel.removeListener( listener );
    }

		public void checkContainment(List<GasMolecule> molecules) {
      // TOTAL HACK!! This code is here simply to keep molecules in the box
  	int nBodies = molecules.size();
      for (int i = nBodies; --i >= 0;) {
          GasMolecule body = molecules.get( i );
//          if( (body.type & CollidableBody.TYPE_GAS_MOLECULE) == CollidableBody.TYPE_GAS_MOLECULE) {
              GasMolecule gm = body;
              if( gm.getPosition().getX() + gm.getRadius() > getMaxX() ) {
                  gm.setPositionNoObs( getMaxX() - gm.getRadius(), gm.getPosition().getY() );
              }
              if( gm.getPosition().getY() + gm.getRadius() > getMaxY() ) {
                  gm.setPositionNoObs( gm.getPosition().getX(), getMaxY() - gm.getRadius() );
              }
          }
//      }
		}
}
