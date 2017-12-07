// Copyright 2002-2011, University of Colorado

/**
 * Class: HistogramModel
 * Class: edu.colorado.phet.graphics
 * User: Ron LeMaster
 * Date: Jan 18, 2004
 * Time: 1:16:17 PM
 */
package edu.colorado.phet.idealgas.instrumentation;

import java.util.ArrayList;
import java.util.Iterator;

public class HistogramModel {

    public static final int IN_RANGE = 1;
    public static final int BELOW_RANGE = 2;
    public static final int ABOVE_RANGE = 3;

    private double lowerBound;
    private double upperBound;
//    private TreeMap data = new TreeMap();
    private int numBuckets;
    private double interval;
    private ArrayList<Bucket> buckets = new ArrayList<Bucket>();
    private boolean dataOutOfRange;

    public void setBounds( double lowerBound, double upperBound ) {
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
    }

    public void setInterval( double interval ) {
        this.interval = interval;
        this.numBuckets = (int)( ( upperBound - lowerBound ) / interval );
        createBuckets();
    }

    public void setNumIntervals( int numBuckets ) {
        this.numBuckets = numBuckets;
        this.interval = ( upperBound - lowerBound ) / numBuckets;
        createBuckets();
    }

    private void createBuckets() {
        buckets.clear();
        for( double lb = lowerBound; lb < upperBound; lb += interval ) {
            buckets.add( new Bucket( lb, lb + interval ) );
        }
    }

    public void clear() {
        dataOutOfRange = false;
        for( int i = 0; i < buckets.size(); i++ ) {
            Bucket bucket = buckets.get( i );
            bucket.setCount( 0 );
        }
    }

    /**
     * Adds a datum to the histogram. If the datum is above or below the range
     * of the histogram, it is not added.
     *
     * @param value
     * @return One of the following values depending on where the value falls in
     *         relation to the range of the histogram:
     *         <ul>
     *         <li>IN_RANGE
     *         <li>BELOW_RANGE
     *         <li>ABOVE_RANGE
     *         </ul>
     */
    public int add( double value ) {
        int returnValue = IN_RANGE;
        Bucket bucket = findBucket( value );
        if( bucket != null ) {
            bucket.increment();
            returnValue = IN_RANGE;
        }
        else if( value < buckets.get( 0 ).lowerBound ) {
            returnValue = BELOW_RANGE;
        }
        else if( value >= buckets.get( buckets.size() - 1 ).upperBound ) {
            dataOutOfRange = true;
        }
        return returnValue;
    }

    private Bucket findBucket( double value ) {
        Bucket result = null;
        for( int i = 0; result == null && i < buckets.size(); i++ ) {
            Bucket bucket = buckets.get( i );
            if( value >= bucket.lowerBound && value < bucket.upperBound ) {
                result = bucket;
            }
        }
        return result;
    }

    public Iterator<Bucket> iterator() {
        return buckets.iterator();
    }

	public int valueAt(int i) {
		return buckets.get(i).getCount();
	}

    public int getNumIntervals() {
        return numBuckets;
    }

    public boolean isDataOutOfRange() {
        return dataOutOfRange;
    }

    //
    // Inner classes
    //
    private static class Bucket {
        private double lowerBound;
        private double upperBound;
        private int count;
        private static ArrayList<Bucket> s_instances = new ArrayList<Bucket>();

        Bucket( double lowerBound, double upperBound ) {
            this.lowerBound = lowerBound;
            this.upperBound = upperBound;
            s_instances.add( this );
        }

        void increment() {
            count++;
        }

        int getCount() {
            return count;
        }

        void setCount( int i ) {
            count = 0;
        }
    }


    //
    // CollisionGod code
    //
    public static void main( String[] args ) {
        HistogramModel hm = new HistogramModel();
        hm.setBounds( 0, 100 );
        hm.setNumIntervals( 20 );
        hm.add( -1 );
        hm.add( 50 );
        hm.add( 99 );

        for( int i = 0; i < hm.numBuckets; i++ ) {
            System.out.println( i + ": " + hm.buckets.get( i ).getCount() );
        }
    }
}
