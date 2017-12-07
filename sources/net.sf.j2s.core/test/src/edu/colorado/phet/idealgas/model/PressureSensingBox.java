// Copyright 2002-2011, University of Colorado

/*
 * Class: PressureSensingBox
 * Package: edu.colorado.phet.physicaldomain.idealgas
 *
 * Created by: Ron LeMaster
 * Date: Oct 29, 2002
 */
package edu.colorado.phet.idealgas.model;

import java.awt.geom.Point2D;
import java.util.ArrayList;
import java.util.EventListener;
import java.util.EventObject;
import java.util.List;

import edu.colorado.phet.common.phetcommon.util.EventChannel;
import edu.colorado.phet.idealgas.IdealGasConfig;

/**
 * A Box2D that reports pressure.
 * <p/>
 * The pressure is reported by PressureSlice instances, the number of which is configurable.
 * It is set in the constructor. The default value is f.
 */
public class PressureSensingBox extends Box2D {

    private List<PressureSlice> averagingSlices = new ArrayList<PressureSlice>();
    private PressureSlice gaugeSlice;
    private boolean multipleSlicesEnabled;
    private double lastPressure = 0;

    /**
     * Constructor
     */
    public PressureSensingBox( Point2D corner1, Point2D corner2, IdealGasModel model, IdealGasClock clock ) {
        super( corner1, corner2, model );

        // Create the pressure slices used to record pressure
        // Multiple slices are used to average across entire box
        int numSlices = 5;
        for ( int i = 0; i < numSlices; i++ ) {
            PressureSlice ps = new PressureSlice( this, model, clock );
            ps.setY( this.getMinY() + ( this.getHeight() / ( numSlices + 1 ) * ( i + 1 ) ) );
            ps.setTimeAveragingWindow( 2500 * ( clock.getDt() / clock.getDelay() ) );
            ps.setUpdateContinuously( true );
            model.addModelElement( ps );
            averagingSlices.add( ps );
        }

        // Set the averaging time for pressure readings
        setTimeAveragingWindow( clock.getDt() * 100 );
    }

    /**
     * Sets the time over which each pressure reading is averaged
     *
     * @param simTime
     */
    public void setTimeAveragingWindow( double simTime ) {
    	for ( int i = 0, n = averagingSlices.size(); i < n; i++ ) {
            PressureSlice pressureSlice = averagingSlices.get( i );
            pressureSlice.setTimeAveragingWindow( simTime );
        }
        if ( gaugeSlice != null ) {
            gaugeSlice.setTimeAveragingWindow( simTime );
        }
    }

    /**
     * @param areEnabled
     */
    public void setMultipleSlicesEnabled( boolean areEnabled ) {
        this.multipleSlicesEnabled = areEnabled;
        changeListenerProxy.stateChanged( new ChangeEvent( this ) );
    }

    /**
     * @return true if multiple pressure slices are enabled, false if not
     */
    public boolean getMultipleSlicesEnabled() {
        return multipleSlicesEnabled;
    }

    /**
     *
     */
    public double getPressure() {
        if ( multipleSlicesEnabled ) {
            double sum = 0;
            int n = averagingSlices.size();
            for ( int i = 0; i < n; i++ ) {            	
                PressureSlice slice = averagingSlices.get( i );
                sum += slice.getPressure();
            }
            return sum / n;
        }
        else {
            return gaugeSlice.getPressure();
        }
    }

    public boolean isPressureSafe() {
    	//System.out.println("Pressuresens" +  getPressure());
        return getPressure() <= IdealGasConfig.MAX_SAFE_PRESSURE;
    }

    /**
     * Sets the PressureSlice that the box is to use to report pressure when pressure
     * is to be read from a single slice.
     *
     * @param gaugeSlice
     */
    public void setGaugeSlice( PressureSlice gaugeSlice ) {
        this.gaugeSlice = gaugeSlice;
    }

    /**
     * Time dependent behavior. Notifies change listeners if the pressure changes
     *
     * @param dt
     */
    @Override
		public void stepInTime( double dt ) {
        stepInTimeB2D(dt);
        double pressure = getPressure();
        if ( lastPressure != pressure ) {
            lastPressure = pressure;
            changeListenerProxy.stateChanged( new ChangeEvent( this ) );
            notifyObservers();
        }
    }

    /**
     * Clears all the data that the box has recorded. Used for reseting.
     */
    public void clearData() {
        gaugeSlice.clear();
        for ( int i = 0, n = averagingSlices.size(); i < n; i++ ) {
            averagingSlices.get( i ).clear();
        }
    }

    //----------------------------------------------------------------
    // Event and listener definitions
    //----------------------------------------------------------------
    private EventChannel changeEventChannel = new EventChannel( ChangeListener.class );
    private ChangeListener changeListenerProxy = (ChangeListener) changeEventChannel.getListenerProxy();

    public void addChangeListenerPSB( ChangeListener listener ) { // BH renamed
        changeEventChannel.addListener( listener );
    }

    public void removeChangeListenerPSB( ChangeListener listener ) { // BH renamed
        changeEventChannel.removeListener( listener );
    }

    public class ChangeEvent extends EventObject {
        public ChangeEvent( Object source ) {
            super( source );
        }

        public PressureSensingBox getPressureSensingBox() {
            return (PressureSensingBox) getSource();
        }
    }

    public interface ChangeListener extends EventListener {
        void stateChanged( ChangeEvent event );
    }

}
