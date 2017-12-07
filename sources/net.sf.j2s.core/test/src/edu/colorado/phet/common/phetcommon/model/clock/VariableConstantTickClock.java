// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.model.clock;

import edu.colorado.phet.common.phetcommon.util.EventChannel;

/**
 * VariableConstantTickClock
 * <p/>
 * A Clock that reports a constant amount of simulation time passed for
 * each wrappedClock tick, but that time can be changed explicitly
 * while the clock is running. This allows for the execution rate of the
 * simulation to be easily changed. This is useful, for example, to put
 * a simulation into slow motion.
 * <p/>
 * This class is implemented as a decorator on an IClock, adding a method
 * that allows clients to change the time reported each time the wrappedClock
 * ticks.
 *
 * @author Ron LeMaster
 * @version $Revision: 68620 $
 */
public class VariableConstantTickClock implements IClock, ClockListener {
    private IClock wrappedClock;
    private double dt;
    private EventChannel clockEventChannel = new EventChannel( ClockListener.class );
    private ClockListener clockListenerProxy = (ClockListener) clockEventChannel.getListenerProxy();

    /**
     * @param clock The IClock that is to be decorated
     * @param dt    The dt that the clock is to start with
     */
    public VariableConstantTickClock( IClock clock, double dt ) {
        this.wrappedClock = clock;
        wrappedClock.addClockListener( this );
        this.dt = dt;
    }

    /**
     * Sets the amount of simulation time that elapses for each wrappedClock tick.
     *
     * @param dt
     */
    public void setDt( double dt ) {
        this.dt = dt;
    }

    //--------------------------------------------------------------------------------------------------
    // Implementation of ClockListener
    //--------------------------------------------------------------------------------------------------

    @Override
		public void clockTicked( ClockEvent clockEvent ) {
        ClockEvent proxyEvent = new ClockEvent( this );
        clockListenerProxy.clockTicked( proxyEvent );
    }

    @Override
		public void clockStarted( ClockEvent clockEvent ) {
        ClockEvent proxyEvent = new ClockEvent( this );
        clockListenerProxy.clockStarted( proxyEvent );
    }

    @Override
		public void clockPaused( ClockEvent clockEvent ) {
        ClockEvent proxyEvent = new ClockEvent( this );
        clockListenerProxy.clockPaused( proxyEvent );
    }

    @Override
		public void simulationTimeChanged( ClockEvent clockEvent ) {
        ClockEvent proxyEvent = new ClockEvent( this );
        clockListenerProxy.simulationTimeChanged( proxyEvent );
    }

    @Override
		public void simulationTimeReset( ClockEvent clockEvent ) {
        ClockEvent proxyEvent = new ClockEvent( this );
        clockListenerProxy.simulationTimeReset( proxyEvent );
    }

    //--------------------------------------------------------------------------------------------------
    // Implementation of IClock
    //--------------------------------------------------------------------------------------------------

    /**
     * Overrides
     */
    @Override
		public double getSimulationTimeChange() {
        return dt;
    }

    @Override
		public void addClockListener( ClockListener clockListener ) {
        clockEventChannel.addListener( clockListener );
    }

    @Override
		public void removeClockListener( ClockListener clockListener ) {
        clockEventChannel.removeListener( clockListener );
    }

    /**
     * Forwards
     */
    @Override
		public void start() {
        wrappedClock.start();
    }

    @Override
		public void pause() {
        wrappedClock.pause();
    }

    @Override
		public boolean isPaused() {
        return wrappedClock.isPaused();
    }

    @Override
		public boolean isRunning() {
        return wrappedClock.isRunning();
    }

    @Override
		public void resetSimulationTime() {
        wrappedClock.resetSimulationTime();
    }

    @Override
		public long getWallTime() {
        return wrappedClock.getWallTime();
    }

    @Override
		public long getWallTimeChange() {
        return wrappedClock.getWallTimeChange();
    }

    @Override
		public double getSimulationTime() {
        return wrappedClock.getSimulationTime();
    }

    @Override
		public void setSimulationTime( double simulationTime ) {
        wrappedClock.setSimulationTime( simulationTime );
    }

    @Override
		public void stepClockWhilePaused() {
        wrappedClock.stepClockWhilePaused();
    }

    @Override
		public void stepClockBackWhilePaused() {
        wrappedClock.stepClockBackWhilePaused();
    }

    @Override
		public boolean containsClockListener( ClockListener clockListener ) {
        return wrappedClock.containsClockListener( clockListener );
    }

    @Override
		public void removeAllClockListeners() {
        clockEventChannel.removeAllListeners();
    }
}
