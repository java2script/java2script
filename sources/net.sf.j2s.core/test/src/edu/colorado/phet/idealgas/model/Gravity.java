// Copyright 2002-2012, University of Colorado

/**
 * Class: Gravity
 * Package: edu.colorado.phet.idealgas.model
 * Author: Another Guy
 * Date: Jul 19, 2004
 */
package edu.colorado.phet.idealgas.model;

import java.util.EventListener;
import java.util.EventObject;
import java.util.List;

import edu.colorado.phet.common.mechanics.Body;
import edu.colorado.phet.common.phetcommon.model.ModelElement;
import edu.colorado.phet.common.phetcommon.util.EventChannel;


public class Gravity implements ModelElement, ExternalForce {

	  //     private MutableVector2D acceleration = new MutableVector2D(); BH optimized out; unnecessary

	private IdealGasModel model;
    private double a;

    public Gravity( IdealGasModel model ) {
        this.model = model;
        this.setAmt( 0 );
    }

	@Override
	public void stepInTime(double dt) {
		if (a == 0) // BH optimization
			return;
		List<Body> bodies = model.getBodies();
		for (int i = bodies.size(); --i >= 0;) {
			bodies.get(i).getAcceleration().addXY(0, a);
			
		}
	}

    public double getAmt() {
        return a;
    }

	public void setAmt(double amt) {
		double change = amt - a;
		a = amt;
		listenerProxy.gravityChanged(new ChangeEvent(this, change));
	}


    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Inner classes
    private EventChannel channel = new EventChannel( ChangeListener.class );
    private ChangeListener listenerProxy = (ChangeListener) channel.getListenerProxy();

    public void addListener( ChangeListener listener ) {
    	// IdealGasModel and IdealGasControlPanel
    	//System.out.println("Gravity listener is " + listener);
        channel.addListener( listener );
    }

    public void removeListener( ChangeListener listener ) {
        channel.removeListener( listener );
    }

    public interface ChangeListener extends EventListener {
        void gravityChanged( Gravity.ChangeEvent event );
    }

    public class ChangeEvent extends EventObject {
        private double change;

        public ChangeEvent( Object source, double change ) {
            super( source );
            this.change = change;
        }

        public double getChange() {
            return change;
        }

        public Gravity getGravity() {
            return (Gravity) getSource();
        }
    }

		@Override
		public int getType() {
			return TYPE_GRAVITY;
		}

}
