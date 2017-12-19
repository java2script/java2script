// Copyright 2002-2012, University of Colorado
package edu.colorado.phet.common.phetcommon.model;

import java.awt.Color;
import java.awt.geom.Dimension2D;
import java.awt.geom.Point2D;
import java.util.ArrayList;
import java.util.EventListener;
import java.util.List;

import edu.colorado.phet.common.phetcommon.math.vector.Vector2D;
import edu.colorado.phet.common.phetcommon.util.SimpleObserver;

/**
 * Class<?> that defines a model of a bucket that can hold particles.
 * <p/>
 * IMPORTANT NOTE: The shapes that are created and that comprise the
 * bucket are set up such that the point (0,0) is in the center of the
 * bucket's hole.
 *
 * @author John Blanco
 * @author Jonathan Olson
 */
public class SphereBucket<T extends IBucketSphere<?>> extends Bucket {

    // ------------------------------------------------------------------------
    // Class<?> Data
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    // Instance Data
    // ------------------------------------------------------------------------

    // Particles that are in this bucket.
    private final ArrayList<T> containedParticles = new ArrayList<T>();

    // Radius of particles that will be going into this bucket.  This is
    // used for placing particles.
    private final double particleRadius;

    // Proportion of the width of the bucket to use for particle placement.
    // A value of 1 means that the entire bucket should be used.
    private final double usableWidthProportion;

    // Offset, in picometers, of the particles in the y direction.  This helps
    // to avoid the appearance of particles floating in the bucket.
    private final double yOffset;

    // Listener for events where the user grabs the particle, which is interpreted as
    // removal from the bucket.
    private final IBucketSphere.Adapter<T> particleRemovalListener = new IBucketSphere.Adapter<T>() {
        @Override public void grabbedByUser( final T particle ) {
            // The user has picked up this particle, so we assume
            // that they want to remove it.
            assert containedParticles.contains( particle );
            containedParticles.remove( particle );
            particle.removeListener( (EventListener) this );

            final Vector2D initialPosition = particle.getDestination();
            
            double r = particle.getRadius();
            final double d2 = r * r * 2.25; // (r * 1.5)^2
            
            
            particle.addPositionListener( new SimpleObserver() {
                @Override
								public void update() {
                    if ( initialPosition.distance2( particle.getDestination() ) > d2) {
                        relayoutBucketParticles();
                        particle.removePositionListener( this );
                    }
                }
            } );
        }
    };

    // ------------------------------------------------------------------------
    // Constructor(s)
    // ------------------------------------------------------------------------

    /**
     * Constructor.
     */
    public SphereBucket( Point2D.Double position, Dimension2D size, Color baseColor, String caption, double particleRadius,
                         double usableWidthProportion, double yOffset ) {
        super( position, size, baseColor, caption );
        this.particleRadius = particleRadius;
        this.usableWidthProportion = usableWidthProportion;
        this.yOffset = yOffset;
    }

    /**
     * Constructor that assumes that the entire width of the bucket should be
     * used for particle placement.
     */
    public SphereBucket( Point2D.Double position, Dimension2D size, Color baseColor, String caption, double particleRadius ) {
        this( position, size, baseColor, caption, particleRadius, 1, 0 );
    }

    // ------------------------------------------------------------------------
    // Methods
    // ------------------------------------------------------------------------

    public void reset() {
        containedParticles.clear();
    }

    public void removeParticle( T particle ) {
        if ( !containedParticles.contains( particle ) ) {
            System.err.println( getClass().getName() + " - Error: Particle not here, can't remove." );
        }
        assert containedParticles.contains( particle );
        containedParticles.remove( particle );
        particle.removeListener( particleRemovalListener );
    }

    /**
     * Add a particle to the nearest open location in the bucket.
     *
     * @param particle
     * @param moveImmediately
     */
    public void addParticleNearestOpen( final T particle, boolean moveImmediately ) {
        // Determine the closest open location in the bucket.
        Point2D nearestOpenLocation = getNearestOpenLocation( particle.getPosition() );
        addParticle( particle, nearestOpenLocation, moveImmediately );
    }

    public void addParticleFirstOpen( final T particle, boolean moveImmediately ) {
        // Determine the first open location in the bucket.
        Point2D firstOpenLocation = getFirstOpenLocation();
        addParticle( particle, firstOpenLocation, moveImmediately );
    }

    private void addParticle( final T particle, Point2D locationInBucket, boolean moveImmediately ) {
        // Move the particle.
        if ( moveImmediately ) {
            // Move the particle instantaneously to the destination.
            particle.setPositionAndDestination( new Vector2D( locationInBucket ) );
        }
        else {
            // Set the destination and let the particle find its own way.
            particle.setDestination( new Vector2D( locationInBucket ) );
        }

        // Listen for when the user removes this particle from the bucket.
        particle.addListener( particleRemovalListener );

        containedParticles.add( particle );
    }

    public boolean containsParticle( T particle ) {
        return containedParticles.contains( particle );
    }

    public ArrayList<T> getParticleList() {
        return containedParticles;
    }

    /*
     * Returns the first location in a bucket that a particle could be placed
     * without overlapping another particle.  Locations may be above (+y)
     * other particles, in order to create a stacking effect.
     */
    private Point2D getFirstOpenLocation() {
        Point2D.Double openLocation = new Point2D.Double();
        double placeableWidth = holeShape.getBounds2D().getWidth() * usableWidthProportion - 2 * particleRadius;
        double offsetFromBucketEdge = ( holeShape.getBounds2D().getWidth() - placeableWidth ) / 2 + particleRadius;
        int numParticlesInLayer = (int) Math.floor( placeableWidth / ( particleRadius * 2 ) );
        int row = 0;
        int positionInLayer = 0;
        boolean found = false;
        while ( !found ) {
            double yPos = getYPositionForLayer( row );
            double xPos = getPosition().getX() - holeShape.getBounds2D().getWidth() / 2 + offsetFromBucketEdge + positionInLayer * 2 * particleRadius;
            if ( isPositionOpen( xPos, yPos ) ) {
                // We found a location that is open.
                openLocation.x = xPos;
                openLocation.y = yPos;
                found = true;
                continue;
            }
            else {
                positionInLayer++;
                if ( positionInLayer >= numParticlesInLayer ) {
                    // Move to the next layer.
                    row++;
                    positionInLayer = 0;
                    numParticlesInLayer--;
                    offsetFromBucketEdge += particleRadius;
                    if ( numParticlesInLayer == 0 ) {
                        // This algorithm doesn't handle the situation where
                        // more particles are added than can be stacked into
                        // a pyramid of the needed size, but so far it hasn't
                        // needed to.  If this requirement changes, the
                        // algorithm will need to change too.
                        numParticlesInLayer = 1;
                        offsetFromBucketEdge -= particleRadius;
                    }
                }
            }
        }
        return openLocation;
    }

    /*
     * Get the nearest open location to the provided current location.  This
     * is used for particle stacking.
     *
     * @param location
     * @return
     */
    private Point2D getNearestOpenLocation( Vector2D currentLocation ) {
        // Determine the highest occupied layer.  The bottom layer is 0.
        int highestOccupiedLayer = 0;
        for ( T particle : containedParticles ) {
            int layer = getLayerForYPosition( particle.getPosition().getY() );
            if ( layer > highestOccupiedLayer ) {
                highestOccupiedLayer = layer;
            }
        }
        // Make a list of all open locations in the occupied layers.
        List<Point2D> openLocationsInRow = new ArrayList<Point2D>();
        double placeableWidth = holeShape.getBounds2D().getWidth() * usableWidthProportion - 2 * particleRadius;
        double offsetFromBucketEdge = ( holeShape.getBounds2D().getWidth() - placeableWidth ) / 2 + particleRadius;
        int numParticlesInLayer = (int) Math.floor( placeableWidth / ( particleRadius * 2 ) );
        // Loop, searching for open positions in the particle stack.
        for ( int layer = 0; layer <= highestOccupiedLayer + 1; layer++ ) {
            // Make a list of all open locations in the current layer.
            for ( int positionInLayer = 0; positionInLayer < numParticlesInLayer; positionInLayer++ ) {
                double yPos = getYPositionForLayer( layer );
                double xPos = getPosition().getX() - holeShape.getBounds2D().getWidth() / 2 + offsetFromBucketEdge + positionInLayer * 2 * particleRadius;
                if ( isPositionOpen( xPos, yPos ) ) {
                    // We found a location that is unoccupied.
                    if ( layer == 0 || countSupportingParticles( new Point2D.Double( xPos, yPos ) ) == 2 ) {
                        // This is a valid open location.
                        openLocationsInRow.add( new Point2D.Double( xPos, yPos ) );
                    }
                }
            }
            // Adjust variables for the next layer.
            numParticlesInLayer--;
            offsetFromBucketEdge += particleRadius;
            if ( numParticlesInLayer == 0 ) {
                // If the stacking pyramid is full, meaning that there are
                // no locations that are open within it, this algorithm
                // classifies the locations directly above the top of the
                // pyramid as being open.  This would result in a stack
                // of particles with a pyramid base.  So far, this hasn't
                // been a problem, but this limitation may limit
                // reusability of this algorithm.
                numParticlesInLayer = 1;
                offsetFromBucketEdge -= particleRadius;
            }
        }
        // The algorithm above is intended to always provide at least one
        // open location.  Validate that it does.
        assert !openLocationsInRow.isEmpty();

        // Find the closest open location to the provided current location.
        // Only the X-component is used for this determination, because if
        // the Y-component is used the particles often appear to fall sideways
        // when released above the bucket, which just looks weird.
        Point2D closestOpenLocation = openLocationsInRow.get( 0 );
        for ( Point2D openLocation : openLocationsInRow ) {
            if ( Math.abs( openLocation.getX() - currentLocation.getX() ) < Math.abs( closestOpenLocation.getX() - currentLocation.getX() ) ) {
                // This location is closer.
                closestOpenLocation = openLocation;
            }
        }
        return closestOpenLocation;
    }

    /**
     * Convenience method used by the algorithm that looks for open positions
     * in the stack of particles in the bucket.  This method determines the Y
     * offset for a given layer in the stacking pyramid.
     *
     * @return
     */
    private int getLayerForYPosition( double yPosition ) {
        return (int) Math.round( ( yPosition - getPosition().getY() - yOffset ) / ( particleRadius * 2 * 0.866 ) );
    }

    /**
     * Convenience method used by the algorithm that looks for open positions
     * in the stack of particles in the bucket.  This method determines the Y
     * position in model space for a given layer of particles in the stacking
     * pyramid.
     *
     * @param row 0 for the bottom (y=0) row, 1 for the next row, etc.
     * @return
     */
    private double getYPositionForLayer( int row ) {
        return getPosition().getY() + row * particleRadius * 2 * 0.866 + yOffset;
    }

    private void relayoutBucketParticles() {
        ArrayList<T> copyOfContainedParticles = new ArrayList<T>( containedParticles );
        for ( T containedParticle : copyOfContainedParticles ) {
            if ( isDangling( containedParticle ) ) {
                removeParticle( containedParticle );
                addParticleNearestOpen( containedParticle, false );
                relayoutBucketParticles();
            }
        }
    }

    /**
     * Determine whether a particle is 'dangling', i.e. hanging above an open
     * space in the stack of particles.  Dangling particles should fall.
     */
    private boolean isDangling( T particle ) {
        boolean onBottomRow = particle.getDestination().getY() == getYPositionForLayer( 0 );
        return !onBottomRow && countSupportingParticles( particle ) < 2;
    }

    private int countSupportingParticles( T p ) {
        int count = 0;
        double d2 = p.getRadius() * 3;
        d2 *= d2;
        Vector2D pt = p.getDestination();
        double y =  pt.getY();
        for ( int i = containedParticles.size(); --i >= 0;) {
        	T particle = containedParticles.get(i); 
        	Vector2D pdest;
            if ( particle != p &&//not ourself
                 (pdest = particle.getDestination()).getY() < y && //must be in a lower layer
                 pdest.distance2( pt ) < d2 ) {
                count++;
            }
        }
        return count;
    }

    private int countSupportingParticles( Point2D particleLocation ) {
        int count = 0;
        double r;
        double y = particleLocation.getY();
        Vector2D dest;
        for ( int i = containedParticles.size(); --i >= 0;) {
        	T particle = containedParticles.get(i); 
            if ( !particle.getPosition().equals( particle ) && //not ourself
                 (dest = particle.getDestination()).getY() < y && //must be in a lower layer
                 dest.distance2p( particleLocation ) < (r = particle.getRadius()) * r  * 9 ) {
                count++;
            }
        }
        return count;
    }

    /**
     * Determine whether the given particle position is open (i.e.
     * unoccupied) in the bucket.
     *
     * @param x
     * @param y
     * @return
     */
    private boolean isPositionOpen( double x, double y ) {
        boolean positionOpen = true;
        for ( T particle : containedParticles ) {
            Vector2D position = particle.getDestination();
            if ( position.getX() == x && position.getY() == y ) {
                positionOpen = false;
                break;
            }
        }
        return positionOpen;
    }
}
