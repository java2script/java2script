// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: olsonj $
 * Revision : $Revision: 66117 $
 * Date modified : $Date: 2012-07-21 20:36:43 -0500 (Sat, 21 Jul 2012) $
 */
package edu.colorado.phet.idealgas.model;

import java.awt.Rectangle;
import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;
import java.util.ArrayList;
import java.util.Collections;
import java.util.EventListener;
import java.util.EventObject;
import java.util.List;

import javax.swing.JRadioButton;

import edu.colorado.phet.common.mechanics.Body;
import edu.colorado.phet.common.phetcommon.model.BaseModel;
import edu.colorado.phet.common.phetcommon.model.Command;
import edu.colorado.phet.common.phetcommon.model.ModelElement;
import edu.colorado.phet.common.phetcommon.util.EventChannel;
import edu.colorado.phet.common.phetcommon.util.SimpleObservable;
import edu.colorado.phet.common.phetcommon.util.SimpleObserver;
import edu.colorado.phet.common.phetcommon.view.util.RectangleUtils;
import edu.colorado.phet.idealgas.IdealGasConfig;
import edu.colorado.phet.idealgas.collision.CollidableBody;
import edu.colorado.phet.idealgas.collision.CollisionExpert;
import edu.colorado.phet.idealgas.collision.CollisionGod;
import edu.colorado.phet.idealgas.collision.SphereSphereExpert;

/**
 *
 */
@SuppressWarnings("deprecation")
public class IdealGasModel extends BaseModel implements Gravity.ChangeListener {
    // The default energy given to a molecule
    public static final float DEFAULT_ENERGY = 15000;
    private static final float s_pressureAdjustmentFactor = 0.05f;

    public static final int CONSTANT_NONE = 0, CONSTANT_VOLUME = 1, CONSTANT_PRESSURE = 2, CONSTANT_TEMPERATURE = 3;

    private Gravity gravity;
    private double heatSource;
    private PressureSensingBox box;
    private int constantProperty = CONSTANT_NONE;
    private double targetPressure = 0;
    private double averageMoleculeEnergy;
    // Accumulates kinetic energy deliberately added to the system in a single time step.
    private double deltaKE = 0;
    private ArrayList<ExternalForce> externalForces = new ArrayList<ExternalForce>();
    private List<Command> prepCommands = Collections.synchronizedList( new ArrayList<Command>() );
    // A utility list used in stepInTime
    private ArrayList<GasMolecule> removeList = new ArrayList<GasMolecule>();
    private ArrayList<Body> bodies = new ArrayList<Body>();
    private List<GasMolecule> gasMolecules = new ArrayList<GasMolecule>();
    
    private CollisionGod collisionGod;
    // Flag used to tell if energy being added to the system should be tracked. If energy
    // is added while within the scope of doYourThing(), it must be tracked
    private boolean currentlyInStepInTimeMethod;

    private List<CollisionExpert> collisionExperts = new ArrayList<CollisionExpert>();
    private double averageHeavySpeciesSpeed;
    private double averageLightSpeciesSpeed;
    private int heavySpeciesCnt;
    private int lightSpeciesCnt;
//    private Shape modelBounds; // BH see boundBoxes
    private double targetTemperature;
    
    public double getTargetTemperature() {
    	return (isConstantTemperature() ? targetTemperature : -1); 
    }
    private SimpleObservable simpleObservable = new SimpleObservable();

    private boolean isWorkDoneByMovingWall = true;

		public JRadioButton constantTempRB; // BH new feature: clickable thermometer
		protected boolean isChemical;
		
		public void setConstantTemp(int t) {
			if (t >= 0) {
				if (constantTempRB != null)
				constantTempRB.setSelected(true);
				setConstantProperty(CONSTANT_TEMPERATURE);
				targetTemperature = t;
			}
		}


    /**
     * @param dt
     */
    public IdealGasModel( double dt ) {
        // Add a collisionGod
        collisionGod = new CollisionGod( this, dt,
                                         new Rectangle2D.Double( 0, 0,
                                                                 600,
                                                                 600 ),
                                         10, 10 );
    }

    /**
     * Adds a CollisionExpert to those that are consulted when the model steps
     *
     * @param expert
     */
    public void addCollisionExpert( CollisionExpert expert ) {
        collisionExperts.add( expert );
    }

    //----------------------------------------------------------------
    // Methods related to the constant gas property
    //----------------------------------------------------------------

    public boolean isConstantVolume() {
        return constantProperty == CONSTANT_VOLUME;
    }

    public boolean isConstantPressure() {
        return constantProperty == CONSTANT_PRESSURE;
    }

    public boolean isConstantTemperature() {
        return constantProperty == CONSTANT_TEMPERATURE;
    }

    public boolean isConstantNone() {
        return !( isConstantPressure()
                  || isConstantTemperature()
                  || isConstantVolume() );
    }

    public void setConstantProperty( int constantProperty ) {
        this.constantProperty = constantProperty;
        switch( constantProperty ) {
            case CONSTANT_NONE:
                setWorkDoneByMovingWall( true );
                break;
            case CONSTANT_VOLUME:
                setWorkDoneByMovingWall( true );
                break;
            case CONSTANT_PRESSURE:
                setWorkDoneByMovingWall( false );
                this.targetPressure = box.getPressure();
                break;
            case CONSTANT_TEMPERATURE:
                setWorkDoneByMovingWall( true );
                double t = getTemperature();
                this.targetTemperature = !Double.isNaN( t ) ? t : IdealGasModel.DEFAULT_ENERGY;
                break;
            default:
                throw new RuntimeException( "Invalid constantProperty" );
        }
        changeListenerProxy.stateChanged( new ChangeEvent( this ) );
    }

    public int getConstantProperty() {
        return constantProperty;
    }

    /**
     * Adjusts the model to keep the specified constant parameter constant
     */
    private void updateFreeParameter() {
        switch( constantProperty ) {
            case CONSTANT_PRESSURE:
                double currPressure = box.getPressure();
                double diffPressure = ( currPressure - targetPressure ) / targetPressure;
                if( currPressure > 0 && diffPressure > s_pressureAdjustmentFactor ) {
                    box.setBounds( box.getMinX() - 1,
                                   box.getMinY(),
                                   box.getMaxX(),
                                   box.getMaxY() );
                }
                else if( currPressure > 0 && diffPressure < -s_pressureAdjustmentFactor ) {
                    box.setBounds( box.getMinX() + 1,
                                   box.getMinY(),
                                   box.getMaxX(),
                                   box.getMaxY() );
                }
                break;
            case CONSTANT_TEMPERATURE:
                double currTemp = getTemperature();
                // Factor of 100 here is just a convenient number to get this working right. The variable set
                // here is used to control how much the system should react to changes in temperature.
                double diffTemp = 0;
                // Check for currTemp not being a good number. This happens when there are currently no molecules
                // in the model
                if( !Double.isNaN( currTemp ) ) {
                    diffTemp = 100 * ( targetTemperature - currTemp ) / targetTemperature;
                }
                setHeatSource( diffTemp );
                break;
        }
    }

    /**
     *
     */
    public Gravity getGravity() {
        return gravity;
    }

    /**
     *
     */
    public void setHeatSource( double value ) {
        heatSource = value;
        heatSourceChangeListenerProxy.heatSourceChanged( new HeatSourceChangeEvent( this ) );
    }

    /**
     * Returns the amount of heat added to or removed from the model in each time step
     *
     * @return
     */
    public double getHeatSource() {
        return heatSource;
    }

    /**
     *
     */
    public void addBox( PressureSensingBox box ) {
        this.box = box;
        this.addModelElement( box );
    }

    /**
     *
     */
    public PressureSensingBox getBox() {
        return box;
    }

	/**
	 * @param modelElement
	 */
	@Override
	public void addModelElement(ModelElement modelElement) {
		collisionGod.modelElementsChanged();
		int type = modelElement.getType();
		if ((type & ModelElement.TYPE_BODY) == ModelElement.TYPE_BODY) {
			addBody((Body) modelElement, type);
			return;
		}
		if (type == ModelElement.TYPE_GRAVITY) {
			addExternalForce((Gravity) modelElement);
			gravity = (Gravity) modelElement;
			// BH unused adjustEnergyForGravity( gravity.getAmt() );
			gravity.addListener(this);
			return;
		}
		addModelElementBM(modelElement);
	}

	protected void addBody(Body body, int type) {
		// Since model elements are added outside the doYourThing() loop, their
		// energy
		// is accounted for already, and doesn't need to be added here
		if (currentlyInStepInTimeMethod) {
			addKineticEnergyToSystem(body.getKineticEnergy());
		}
		bodies.add(body);

		if ((type & CollidableBody.TYPE_GAS_MOLECULE) == CollidableBody.TYPE_GAS_MOLECULE) {
			gasMolecules.add((GasMolecule) body);
			incrementGasCount((GasMolecule) body, 1);
		} else if ((type & CollidableBody.TYPE_BOX2D) == CollidableBody.TYPE_BOX2D) {
			((Box2D) body)
					.addChangeListener(new Box2D.ChangeListenerAdapter() {
						@Override
						public void boundsChanged(Box2D.ChangeEvent event) {
							setModelBounds();
						}
					});
		}
		addModelElementBM(body);
	}

	private void incrementGasCount(GasMolecule m, int i) {
		if ((m.type & CollidableBody.TYPE_HEAVY_SPECIES) == CollidableBody.TYPE_HEAVY_SPECIES) {
			heavySpeciesCnt += i;
		}
		if ((m.type & CollidableBody.TYPE_LIGHT_SPECIES) == CollidableBody.TYPE_LIGHT_SPECIES) {
			lightSpeciesCnt += i;
		}

	}

	/**
	 * @param modelElement
	 */
	@Override
	public void removeModelElement(ModelElement modelElement) {
		// Account for change in the energy of the system
		collisionGod.modelElementsChanged();
		int type = modelElement.getType();
		if ((type & ModelElement.TYPE_BODY) == ModelElement.TYPE_BODY) {
			removeBody((Body) modelElement, type);
			return;
		}
		if (type == ModelElement.TYPE_GRAVITY) {
			// Handle the special case where the model element is gravity
			removeExternalForce((ExternalForce) modelElement);
			gravity = null;
		}
		removeModelElementBM(modelElement);
	}

  protected void removeBody(Body body, int type) {
  		collisionGod.modelElementsChanged();
			bodies.remove(body);			
			if (currentlyInStepInTimeMethod)
				addKineticEnergyToSystem(-body.getKineticEnergy());
			if ((type & CollidableBody.TYPE_GAS_MOLECULE) == CollidableBody.TYPE_GAS_MOLECULE) {
				GasMolecule m = (GasMolecule) body;
				gasMolecules.remove(m);
				incrementGasCount(m, -1);
				m.removeYourselfFromSystem();
			}
			removeModelElementBM(body);
	 }

//		/**
//     * It seems that things work right when this doesn't do anything
//     * (unknown author)
//     * 
//     * @param change
//     */
//    private void adjustEnergyForGravity( double change ) {
////        double deltaPE = 0;
//
//        // DO NOTHING!!!
////        if( true ) {
//            return;
////        }
////
////        for( int i = 0; i < this.numModelElements(); i++ ) {
////            ModelElement element = this.modelElementAt( i );
////            if( element instanceof Body ) {
////                Body body = (Body)element;
////                // Don't consider bodies that have infinite mass. That indicates that
////                // they are imobile
////                if( body.getMass() != Double.POSITIVE_INFINITY ) {
////                    deltaPE = body.getPosition().getY() * change * body.getMass();
////                }
////            }
////        }
////        deltaKE += deltaPE;
//    }

    public synchronized /* 3/11/04 */ void addExternalForce( ExternalForce force ) {
        externalForces.add( force );
    }

    public synchronized /* 3/11/04 */ void removeExternalForce( ExternalForce force ) {
        externalForces.remove( force );
    }

    /**
     * To be called by objects that deliberately add energy to the system within the doYourThing() method
     *
     * @param dKE
     */
    public void addKineticEnergyToSystem( double dKE ) {
        deltaKE += dKE;
    }

	// public void addPotentialEnergyToSystem( double dPE ) {
	// deltaPE += dPE;
	// }

	/**
	 * Returns the total energy OF THE GAS PARTICLES in the model. Note that this
	 * does not include the energy of any balloons, etc.
	 * 
	 * @return
	 */
	public double getTotalGasEnergy() {
		double eTotal = 0;
		for (int i = gasMolecules.size(); --i >= 0;)
			eTotal += getBodyEnergy(gasMolecules.get(i));
		return eTotal;
	}

	/**
	 * Returns the total energy in the model.
	 * 
	 * @return
	 */
	public double getTotalEnergy() {
		double eTotal = 0;
		for (int i = bodies.size(); --i >= 0;)
			eTotal += getBodyEnergy(bodies.get(i));
		return eTotal;
	}

	/**
	 * Gets the temperature of the gas in the model
	 * 
	 * @return
	 */
	public double getTemperature() {
		double totalKE = 0;
		int numBodies = gasMolecules.size();
		for (int i = numBodies; --i >= 0;) {
			GasMolecule molecule = gasMolecules.get(i);
			double ke = (isChemical ?
					getBodyEnergy(molecule) :
					molecule.getKineticEnergy());
			if (Double.isNaN(ke)) {
				System.out.println("Total kinetic energy in system NaN: "
						+ gasMolecules.get(i).getClass());
			} else {
				totalKE += ke;
			}
		}
		//System.out.println("IGmodel getTemp" + totalKE + " n=" + numBodies + " t=" + (totalKE/numBodies));
		return totalKE / numBodies;
	}

    /**
     * @return
     */
    public double getTotalKineticEnergy() {
        double totalKE = 0;
        for( int i = 0; i < this.numModelElements(); i++ ) {
            ModelElement element = this.modelElementAt( i );
            if( element instanceof Body ) {
                Body body = (Body)element;
                double ke = body.getKineticEnergy();
                if( Double.isNaN( ke ) ) {
                    System.out.println( "Total kinetic energy in system NaN: " + body.getClass() );
                }
                else {
                    totalKE += ke;
                }
            }
        }
        return totalKE;
    }

	/**
	 * Step the model through a tick of the clock
	 * 
	 * @param dt
	 */
	@Override
	public void stepInTime(double dt) {
		stepInTimeIGM(dt);
	}
	
	protected void stepInTimeIGM(double dt) {

		// Managing energy step 1: Get the total energy in the system
		// before anything happens
		currentlyInStepInTimeMethod = true;
		double totalEnergyPre = this.getTotalEnergy();

		// Clear the accelerations on the bodies in the model
		for (int i = bodies.size(); --i >= 0;) {
			bodies.get(i).setAccelerationNoObs(0, 0);
		}

		// Apply external forces (e.g., gravity )
		for (int i = 0; i < externalForces.size(); i++) {
			externalForces.get(i).stepInTime(dt);
		}

		// Add or remove heat depending on the state of the stove
		addHeatFromStove();

		for (int i = nElements; --i >= 0;)
			modelElements.get(i).stepInTime(dt);

		// Detect and handle collisions
		collisionGod.doYourThing(dt, collisionExperts);

		// Remove any molecules from the system that have escaped the box
		removeEscapedMolecules();

		// note that particles will update observers first

		for (int i = bodies.size(); --i >= 0;)
			bodies.get(i).notifyObservers();

		// Managing energy, step 2: Get the total energy in the system,
		// and adjust it if neccessary
		double totalEnergyPost = getTotalEnergy();
		double totalKEPost = getTotalKineticEnergy();
		double dE = totalEnergyPost - (totalEnergyPre + deltaKE);
		double r0 = dE / totalKEPost;
		double ratio = Math.sqrt(1 - r0);

		// Clear the added-energy accumulator
		deltaKE = 0;

		// Adjust the energy of every Body in the system
		if (totalEnergyPre != 0 && ratio != 1) {
			for (int i = bodies.size(); --i >= 0;) {
				Body body = bodies.get(i);
				double vx = body.getVelocity().getX();
				double vy = body.getVelocity().getY();
				vx *= ratio;
				vy *= ratio;
				if (!Double.isNaN(ratio) && body.getKineticEnergy() > 0)
					body.setVelocityNoObs(vx, vy);
			}
		}

		// Compute some useful statistics
		computeStatistics();

		// Clear flag
		currentlyInStepInTimeMethod = false;

		// Update either pressure or volume
		updateFreeParameter();

		notifyObservers();
	}

	/**
	 * Identifies molecules that have escaped from the box and removes them from
	 * the model
	 */
	private void removeEscapedMolecules() {
		removeList.clear();
		boolean isOpen = box.isOpen();
		for (int i = gasMolecules.size(); --i >= 0;) {
			GasMolecule gasMolecule = gasMolecules.get(i);
			// If the molecule has just passed through the opening of the box, let it
			// know
			if (isOpen && box.passedThroughOpening(gasMolecule)) {
				if (box.containsBody(gasMolecule)) {
					box.removeContainedBody(gasMolecule);
				} else {
					box.addContainedBody(gasMolecule);
				}
			}
			if (!modelBoundsContains(gasMolecule.getPosition(), isOpen)) {
				if (isOpen) // BH Java fix #5: No tunneling!
					removeList.add(gasMolecule);
				else
					gasMolecule.center(box.getBoundsInternalNoCopy());
			}
		}
		for (int i = removeList.size(); --i >= 0;)
			removeModelElement(removeList.get(i));
		removeList.clear();
	}

    /**
     * Does a simplified rectangle check instead of an elaborate Area check.
     * 
     * @param p
     * @return
     * @author Bob Hanson
     */
    private boolean modelBoundsContains(Point2D.Double p, boolean isOpen) { // BH
    	return RectangleUtils.isInside(p, boundBoxes[0])
    			|| isOpen && RectangleUtils.isInside(p, boundBoxes[1]);
		}

	/**
	 * Computes statistics on the model
	 */
	private void computeStatistics() {
		int numGasMolecules = 0;
		int totalEnergy = 0;
		double totalLightSpeed = 0;
		double totalHeavySpeed = 0;
		for (int i = gasMolecules.size(); --i >= 0;) {
			GasMolecule gasMolecule = gasMolecules.get(i);
			totalEnergy += this.getBodyEnergy(gasMolecule);
			if ((gasMolecule.type & CollidableBody.TYPE_HEAVY_SPECIES) == CollidableBody.TYPE_HEAVY_SPECIES) {
				totalHeavySpeed += gasMolecule.getSpeed();
			} else {
				totalLightSpeed += gasMolecule.getSpeed();
			}
			numGasMolecules++;
		}
		averageMoleculeEnergy = numGasMolecules != 0 ? totalEnergy
				/ numGasMolecules : 0;
		averageHeavySpeciesSpeed = getHeavySpeciesCnt() > 0 ? totalHeavySpeed
				/ getHeavySpeciesCnt() : 0;
		averageLightSpeciesSpeed = getLightSpeciesCnt() > 0 ? totalLightSpeed
				/ getLightSpeciesCnt() : 0;
	}

	/**
	 * Adds or removes heat from the model if the heat or cooling source is on
	 */
	private void addHeatFromStove() {
		if (heatSource != 0 && !IdealGasConfig.HEAT_ONLY_FROM_FLOOR) {
			for (int i = bodies.size(); --i >= 0;) {
				CollidableBody body = (CollidableBody) bodies.get(i);
				double preKE = body.getKineticEnergy();
				body.getVelocity().scale(1 + heatSource / 10000);
				double incrKE = body.getKineticEnergy() - preKE;
				if (currentlyInStepInTimeMethod) {
					this.addKineticEnergyToSystem(incrKE);
				}
			}
		}
	}

    /**
     * @param body
     * @return
     */
    public double getBodyEnergy( Body body ) {
        double energy = body.getKineticEnergy() + getPotentialEnergy( body );
        return energy;
    }

	/**
	 * @param body
	 * @return
	 */
	public double getPotentialEnergy(Body body) {
		double gravity;
		return (this.gravity == null || (gravity = this.getGravity().getAmt()) == 0
				|| body.getMass() == Double.POSITIVE_INFINITY 
				? 0 : (getPotentialEnergyReference(body) - body.getPosition().getY()) * gravity * body.getMass());
	}

	protected double getPotentialEnergyReference(Body body) {
		return this.getBox().getMaxY();
	}


		/**
     * Moves a body to a y coordinate while preserving its total energy
     */
    public void relocateBodyY( Body body, double newY ) {

        double currY = body.getPosition().getY();

        // This was commented out, 9/14/04
        //        relocateBodyY( body, newY );

        // Adjust the body's kinetic energy to compensate for any change we may have
        // made in its potential ential
        if( this.gravity != null ) {
            double gravity = this.getGravity().getAmt();
            if( gravity != 0 ) {

                // Note that the inverted y axis that we use requires this
                // subtraction to be performed in the order shown.
                double dY = currY - newY;

                // What is the change in energy represented by moving the body?
                double dE = -( gravity * dY * body.getMass() );
                double currSpeed = body.getVelocity().magnitude();
                double newSpeed = (float)Math.sqrt( ( 2 * dE ) / body.getMass()
                                                    + currSpeed * currSpeed );

                // Flip the sign because our y axis is positive downward
                if( Double.isNaN( newSpeed ) ) {
                    newSpeed = currSpeed;
                }
                body.getVelocity().scale( newSpeed / currSpeed );
            }
        }
    }

    public double getAverageMoleculeEnergy() {
        return averageMoleculeEnergy;
    }

    public void addPrepCmd( Command command ) {
        prepCommands.add( command );
    }

    public List<Body> getBodies() {
        return bodies;
    }

    public List<GasMolecule> getGasMolecules() {
      return gasMolecules;
  }

    /**
     * Returns the average energy of the gas molecules in the model
     *
     * @return
     */
    public double getAverageGasEnergy() {
        return getTotalGasEnergy() / getNumMolecules();
    }

    public int getNumMolecules() {
        return ( getHeavySpeciesCnt() + getLightSpeciesCnt() );
    }

    public int getHeavySpeciesCnt() {
        return heavySpeciesCnt;
    }

    public int getLightSpeciesCnt() {
        return lightSpeciesCnt;
    }

    public double getHeavySpeciesAveSpeed() {
        return averageHeavySpeciesSpeed;
    }

    public double getLightSpeciesAveSpeed() {
        return averageLightSpeciesSpeed;
    }

    public void setWorkDoneByMovingWall( boolean workDoneByMovingWall ) {
        isWorkDoneByMovingWall = workDoneByMovingWall;
    }

    public boolean isWorkDoneByMovingWall() {
        return isWorkDoneByMovingWall;
    }

	public void removeAllMolecules() {
		GasMolecule[] a = new GasMolecule[gasMolecules.size()];
		gasMolecules.toArray(a);
		for (int i = a.length; --i >= 0;)
			removeModelElement(a[i]);
	}

    private Rectangle boundBoxes[] = { new Rectangle(),  new Rectangle() }; // BH Area optimized out
    

    /**
     * The model bounds are used to determine when a molecule should be removed from the model. The bounds
     * extend from the left edge of the screen to the right, so that molecules aren't removed when the
     * left wall gets moved. The upper and lower bounds are the top and bottom of the box, plus the
     * column that extends above the opening in the box when the door is open.
     * <p/>
     * The whole screen can't be used for the bounds because we need to remove molecules when they get out
     * of the box and out of the column above the opening. Otherwise, we would have to handle collisions between
     * molecules and the outside of the box when gravity is turned on.
     */
    public void setModelBounds() {

        int padding = 2;
//        this.modelBounds = new Rectangle( s.getBounds().getX() - padding,
//                                                   s.getBounds().getY() - padding,
//                                                   s.getBounds().getWidth() + 2 * padding,
//                                                   s.getBounds().getHeight() + 2 * padding );
        Rectangle2D.Double bounds = box.getBoundsInternalNoCopy();
        Rectangle mainBox = boundBoxes[0];
        Rectangle aboveBox = boundBoxes[1];
        mainBox.y = (int) (bounds.y - padding);
        mainBox.width = 1000;
        mainBox.height =  (int) (bounds.height + 2 * padding);
        Point2D.Double p1 = box.getOpening()[0];
        Point2D.Double p2 = box.getOpening()[1];
        aboveBox.x = (int) p1.x;
        aboveBox.y  = 40;
        aboveBox.width = (int) (p2.x - p1.x);
        aboveBox.height = (int) p1.y;
//        Area a = new Area( mainBox );
//        a.add( new Area( aboveBox ) );
//        this.modelBounds = a;
    }

    //----------------------------------------------------------------
    // Event Handling
    //----------------------------------------------------------------

    public void addObserver( SimpleObserver observer ) {
        simpleObservable.addObserver( observer );
    }

    public void notifyObservers() {
        simpleObservable.notifyObservers();
    }

    @Override
		public void gravityChanged( Gravity.ChangeEvent event ) {
      // BH unused  adjustEnergyForGravity( event.getChange() ); 
    }

    public void enableParticleParticleInteractions( boolean enableInteraction ) {
        for( int i = 0; i < collisionExperts.size(); i++ ) {
            CollisionExpert collisionExpert = collisionExperts.get( i );
            if( collisionExpert.getType() == CollidableBody.TYPE_SPHERICAL_BODY) {
            	((SphereSphereExpert) collisionExpert).setEnabled( enableInteraction );
            }
        }
    }

    //----------------------------------------------------------------
    // Event and Listener definitions
    //----------------------------------------------------------------

    private EventChannel changeEventChannel = new EventChannel( ChangeListener.class );
    private ChangeListener changeListenerProxy = (ChangeListener)changeEventChannel.getListenerProxy();

    public void addChangeListener( ChangeListener listener ) {
        changeEventChannel.addListener( listener );
    }

    public void removeChangeListener( ChangeListener listener ) {
        changeEventChannel.removeListener( listener );
    }

    @SuppressWarnings("serial")
		public class ChangeEvent extends EventObject {
        public ChangeEvent( Object source ) {
            super( source );
        }

        public IdealGasModel getModel() {
            return (IdealGasModel)getSource();
        }
    }

    public interface ChangeListener extends EventListener {
        void stateChanged( ChangeEvent event );
    }


    private EventChannel heatSourceChangeChannel = new EventChannel( HeatSourceChangeListener.class );
    private HeatSourceChangeListener heatSourceChangeListenerProxy = (HeatSourceChangeListener)heatSourceChangeChannel.getListenerProxy();
		
    public void addHeatSourceChangeListener( HeatSourceChangeListener listener ) {
        heatSourceChangeChannel.addListener( listener );
    }

    public void removeHeatSourceChangeListener( HeatSourceChangeListener listener ) {
        heatSourceChangeChannel.removeListener( listener );
    }

    @SuppressWarnings("serial")
		public class HeatSourceChangeEvent extends EventObject {
        public HeatSourceChangeEvent( Object source ) {
            super( source );
        }

        public double getHeatSource() {
            return heatSource;
        }
    }

    public interface HeatSourceChangeListener extends EventListener {
        void heatSourceChanged( HeatSourceChangeEvent event );
    }
}

