// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 50434 $
 * Date modified : $Date: 2011-04-08 12:13:27 -0500 (Fri, 08 Apr 2011) $
 */
package edu.colorado.phet.common.phetcommon.math;

import java.util.Random;

/**
 * ProbabilisticChooser
 * <p/>
 * An object that selects from a collection of objects based on probabilities.
 * <p/>
 * The object is constructed with an array of ProbabilisticChooser.Entry objects, each
 * of which contains a reference to an arbitrary object and the likelihood that it should
 * be chosen. The likelihoods can be expressed as any sort of number. The chooser
 * normalizes the likelihoods. The likelihoods could, for example, be expressed as the
 * count of a particular object in a population.
 * <p/>
 * When the chooser is asked to get() an object, an object from the collection of
 * entries will be returned with the likelihood expressed in its particular entry.
 * <p/>
 * Example:
 * <pre>
 *
 *      public static void main( String[] args ) {
 *
 *           class TestClass {
 *               public String toString() {
 *                   return getClass().getName();
 *               }
 *           }
 *           class Cat extends TestClass{};
 *           class Dog extends TestClass{};
 *           class Hamster extends TestClass{};
 *
 *           // A chooser based on floating point probabilities
 *           ProbabilisticChooser.Entry[] entriesA = new ProbabilisticChooser.Entry[]{
 *                   new ProbabilisticChooser.Entry( new Cat(), .3 ),
 *                   new ProbabilisticChooser.Entry( new Dog(), .5 ),
 *                   new ProbabilisticChooser.Entry( new Hamster(), .2 )
 *           };
 *
 *           ProbabilisticChooser pcA = new ProbabilisticChooser( entriesA );
 *           for( int i = 0; i < 100; i++ ) {
 *               System.out.println( "pcA.get() = " + pcA.get() );
 *           }
 *
 *           // A chooser based on numbers of elements in a population
 *           ProbabilisticChooser.Entry[] entriesB = new ProbabilisticChooser.Entry[]{
 *                   new ProbabilisticChooser.Entry( new Cat(), 6 ),
 *                   new ProbabilisticChooser.Entry( new Dog(), 4 ),
 *                   new ProbabilisticChooser.Entry( new Hamster(), 3 )
 *           };
 *
 *           ProbabilisticChooser pcB = new ProbabilisticChooser( entries );
 *           for( int i = 0; i < 100; i++ ) {
 *               System.out.println( "pcB.get() = " + pcB.get() );
 *           }
 *      }
 *
 * @author Ron LeMaster
 * @version $Revision: 50434 $
 */
public class ProbabilisticChooser {

    private static final Random RANDOM = new Random();

    private Entry[] _entries;

    /**
     * Takes an array of ProbabilisticChooser.Entry instances. Each contains an object
     * and a number that defines the likelihood that it will be selected.
     * <p/>
     * The order of the entries can be in the array is immaterial.
     *
     * @param entries An array of ProbabilisticChooser.Entry objects
     */
    public ProbabilisticChooser( ProbabilisticChooser.Entry[] entries ) {
        _entries = new Entry[entries.length];

        // Get the normalization factor for the probabilities
        double pTotal = 0;
        for ( int i = 0; i < entries.length; i++ ) {
            pTotal += entries[i].getWeight();
        }
        double fNorm = 1 / pTotal;

        // Build the internal list that is used for choosing. Each choose-able object
        // is put in an array, with an associated probability that is the sum of
        // its own probability plus the cummulative probability of all objects before
        // it in the list. This makes the choosing process work properly in get( double p );
        double p = 0;
        for ( int i = 0; i < entries.length; i++ ) {
            p += entries[i].getWeight() * fNorm;
            _entries[i] = new Entry( entries[i].getObject(), p );
        }
    }

    /**
     * Choose an object from the entries
     *
     * @return An object from the entries
     */
    public Object get() {
        return get( RANDOM.nextDouble() );
    }

    /**
     * Get an object from the collection of entries, given a specified selector
     * probability. This method is provided mostly for testing
     *
     * @param p
     * @return An object from the entries
     */
    public Object get( double p ) {
        Object result = null;
        for ( int i = 0; i < _entries.length && result == null; i++ ) {
            Entry entry = _entries[i];
            if ( p <= entry.getWeight() ) {
                result = entry.getObject();
            }
        }
        return result;
    }

    /**
     * Gets the internal entries, which are normalized version of
     * the entries that were provided in the constructor.
     * This method is useful primarily for testing and debugging.
     *
     * @return Entry[]
     */
    public Entry[] getEntries() {
        return _entries;
    }

    /**
     * An entry for a ProbabilisticChooser
     */
    public static class Entry {
        private Object object;
        private double weight;

        /**
         * @param object An object to be put in the chooser
         * @param weight The likelihood that the object should be chosen, or count of the object
         *               instances in the total population
         */
        public Entry( Object object, double weight ) {
            this.object = object;
            this.weight = weight;
        }

        public Object getObject() {
            return object;
        }

        public double getWeight() {
            return weight;
        }
    }
}
