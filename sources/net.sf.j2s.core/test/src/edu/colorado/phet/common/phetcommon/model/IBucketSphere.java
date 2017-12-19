// Copyright 2002-2012, University of Colorado
package edu.colorado.phet.common.phetcommon.model;

import java.util.EventListener;

import edu.colorado.phet.common.phetcommon.math.vector.Vector2D;
import edu.colorado.phet.common.phetcommon.util.SimpleObserver;

/**
 * This is a spherical object that can be put in a SphereBucket
 *
 * @param <U> U is the concrete class of the particle
 */
public interface IBucketSphere<U extends IBucketSphere<?>> {

    double getRadius();

    /*---------------------------------------------------------------------------*
    * current position
    *----------------------------------------------------------------------------*/

    Vector2D getPosition();

    void setPosition( Vector2D position );

    /*---------------------------------------------------------------------------*
    * destination (where the IBucketSphere will end up)
    *----------------------------------------------------------------------------*/

    Vector2D getDestination();

    void setDestination( Vector2D destination );

    void setPositionAndDestination( Vector2D position );

    /*---------------------------------------------------------------------------*
    * position events. should fire if the IBucketSphere moves
    *----------------------------------------------------------------------------*/

    void addPositionListener( SimpleObserver observer );

    void removePositionListener( SimpleObserver observer );

    /*---------------------------------------------------------------------------*
    * general events (grabbed, dropped, removed) that the bucket needs to know
    *----------------------------------------------------------------------------*/

    void addListener( EventListener listener );

    void removeListener( EventListener listener );

    public static interface Listener<T extends IBucketSphere<?>> extends EventListener {
        void grabbedByUser( T particle );

        void droppedByUser( T particle );

        void removedFromModel( T particle );
    }

    public static class Adapter<T extends IBucketSphere<?>> implements Listener<T> {
        @Override
				public void grabbedByUser( T particle ) {
        }

        @Override
				public void droppedByUser( T particle ) {
        }

        @Override
				public void removedFromModel( T particle ) {
        }
    }

}
