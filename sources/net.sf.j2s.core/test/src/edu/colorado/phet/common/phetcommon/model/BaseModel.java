// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 47760 $
 * Date modified : $Date: 2011-01-07 11:42:54 -0600 (Fri, 07 Jan 2011) $
 */
package edu.colorado.phet.common.phetcommon.model;

import java.util.ArrayList;
import java.util.List;

import edu.colorado.phet.common.phetcommon.model.clock.ClockEvent;

/**
 * This class encompasses model elements in a physical system.
 * It also executes commands in the model thread.
 * <p/>
 * Typically, each Module in a PhetApplication will have its own instance of this type.
 *
 * @author Sam and Ron
 * @version $Revision: 47760 $
 */
public class BaseModel {

    private CommandQueue commandList = new CommandQueue();
    protected ArrayList<ModelElement> modelElements = new ArrayList<ModelElement>();
    public int nElements; 

    /**
     * Add a ModelElement to this BaseModel
     *
     * @param aps
     */
    public void addModelElement( ModelElement aps ) {
    	addModelElementBM(aps); // BH optimizing overloading
    }

    protected void addModelElementBM(ModelElement aps) {
    	 // BH optimizing overloading
      modelElements.add( aps );
      nElements++;
		}

		/**
     * Get the ModelElement at the specified index.
     *
     * @param i
     * @return the ModelElement at the specified index.
     */
    public ModelElement modelElementAt( int i ) {
        return modelElements.get( i );
    }

    /**
     * Determine whether this BaseModel contains the specified ModelElement.
     *
     * @param modelElement
     * @return true if this BaseModel contains the specified ModelElement.
     */
    public boolean containsModelElement( ModelElement modelElement ) {
        return modelElements.contains( modelElement );
    }

    /**
     * Gets the number of ModelElements in this BaseModel.
     *
     * @return the number of ModelElements in this BaseModel.
     */
    public int numModelElements() {
        return nElements;
    }

    /**
     * Remove the specified ModelElement from this BaseModel
     *
     * @param m
     */
    public void removeModelElement( ModelElement m ) {
    	removeModelElementBM(m);
    }

    protected void removeModelElementBM(ModelElement m) {
      modelElements.remove( m );
      nElements--;
		}

		/**
     * Clears all ModelElements from this BaseModel.
     */
    public void removeAllModelElements() {
        modelElements.clear();
        nElements = 0;
    }

    /**
     * Enqueue a command which will be executed on the next update.
     *
     * @param cmd
     */
    public synchronized void execute( Command cmd ) {
        commandList.addCommand( cmd );
    }

    /**
     * Update this BaseModel, running any commands on the queue, and stepping all the ModelElements.
     *
     * @param event the source event for this update.
     */
    public void update( ClockEvent event ) {
        commandList.doIt();
        stepInTime( event.getSimulationTimeChange() );
    }

    /**
     * Steps all the model elements. This needs to be provided as a protected method for backward compatibility
     * for older simulations
     *
     * @param dt
     */
    protected void stepInTime( double dt ) {
        for ( int i = 0; i < nElements; i++ ) {
        	modelElements.get( i ).stepInTime( dt );
        }
    }

    /**
     * Selects for elements assignable from ANY of the specified classes.
     *
     * @param modelElementClasses The classes or interfaces to select for.
     * @return All elements assignable from any of the specified classes.
     */
    public List<ModelElement> selectForAny( Class<?>[] modelElementClasses ) {
        List<ModelElement> elements = new ArrayList<ModelElement>();
        for ( int i = 0, nClasses = modelElementClasses.length; i < nElements; i++ ) {
            for ( int j = 0; j < nClasses; j++ ) {
                Class<?> c = modelElementClasses[j];
                ModelElement element = modelElements.get( i );
                if ( c.isAssignableFrom( element.getClass() ) ) {
                    elements.add( element );
                }
            }
        }
        return elements;
    }

	/**
	 * Selects for all elements assignable from the specified class.
	 * 
	 * @param modelElementClass
	 *          The class of the element to select for.
	 * @return All elements assignable from the specified class.
	 */
	public List<ModelElement> selectFor(Class<?> modelElementClass) {
		List<ModelElement> elements = new ArrayList<ModelElement>(
				modelElements.size()); // BH Java fix #2: List needs to be passed to
																// selectFor()
		selectFor(modelElements, modelElementClass, elements);
		return elements;
	}

	/**
	 * Selects for classes assignable from ALL of the specified interfaces.
	 * 
	 * @param classes
	 *          The classes.
	 * @return All elements assignable from ALL of the specified classes.
	 */
	public List<ModelElement> selectFor(Class<?>[] classes) {
		List<ModelElement> elements = new ArrayList<ModelElement>(
				modelElements.size()); // BH Java fix #2
		for (int i = 0; i < classes.length; i++) {
			Class<?> c = classes[i];
			selectFor(modelElements, c, elements);
		}
		return elements;
	}

	public static void selectFor(List<ModelElement> modelElements,
			Class<?> modelElementClass, List<ModelElement> elements) { // BH Java fix #2
		for (int i = modelElements.size(); --i >= 0;) {
			ModelElement element = modelElements.get(i);
			if (modelElementClass.isAssignableFrom(element.getClass())) {
				elements.add(element);
			}
		}
	}

}
