// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.util;

import java.util.ArrayList;

/**
 * Simple implementation of the Observer pattern.
 *
 * @author Sam Reid
 * @author John De Goes
 * @author Ron LeMaster
 */
public class SimpleObservable implements Cloneable {
	
    private ArrayList<SimpleObserver> observers = new ArrayList<SimpleObserver>();

    public void addObserver( SimpleObserver observer ) {
      observers.add( observer );
    	//System.out.println("SimpleObs " + this);
    }

    private SimpleObserver[] tempList = new SimpleObserver[10];

    public void notifyObservers() {
      int n = observers.size();
      if (n == 0)
      	return;
      if (n >= tempList.length)
      	tempList = new SimpleObserver[n * 2];
    	for (int i = n; --i >= 0;)
    		tempList[i] = observers.get(i);
    	for (int i = n; --i >= 0;) {
    		tempList[i].update();
    		tempList[i] = null;
    	}
    		
//    	
//        //Iterate on a copy of the observer list to avoid ConcurrentModificationException, see #2741
//        for ( SimpleObserver observer : new ArrayList<SimpleObserver>( observers ) ) {
//            observer.update();
//        }
    }

    public void removeObserver( SimpleObserver observer ) {
        observers.remove( observer );
    }

    public void removeAllObservers() {
        observers.clear();
    }

    public int numObservers() {
        return observers.size();
    }

    @Override
		public String toString() {
        return super.toString() + ", observers=" + observers;
    }

    //////////////////////////////////////////////////
    // Persistence support
    //

    /**
     * No-arg contructor for Java Bean conformance
     */
    public SimpleObservable() {
    }


    @Override
		public Object clone() {
        try {
            SimpleObservable clone = (SimpleObservable) super.clone();
            clone.observers = new ArrayList<SimpleObserver>( observers );
            clone.tempList = new SimpleObserver[observers.size()];
            return clone;
        }
        catch ( CloneNotSupportedException e ) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Setter for Java Bean conformance
     *
     * @param observers
     */
    public void setObserverList( ArrayList<SimpleObserver> observers ) {
        this.observers = observers;
    }

    /**
     * Getter for Java Bean conformance
     *
     * @return a reference to the list of observers.
     */
    public ArrayList<SimpleObserver> getObserverList() {
        return observers;
    }
}