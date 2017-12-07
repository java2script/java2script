// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 47760 $
 * Date modified : $Date: 2011-01-07 11:42:54 -0600 (Fri, 07 Jan 2011) $
 */
package edu.colorado.phet.common.phetcommon.math;

import java.util.ArrayList;

/**
 * Performs a linear transform between model and view coordinates.
 */
public class ModelViewTransform1D {
    private Function.LinearFunction modelToView;
    private ArrayList<Observer> transformListeners = new ArrayList<Observer>();

    public interface Observer {
        void transformChanged( ModelViewTransform1D transform );
    }

    public ModelViewTransform1D( double minModel, double maxModel, int minView, int maxView ) {
        this.modelToView = new Function.LinearFunction( minModel, maxModel, minView, maxView );
    }

    @Override
		public String toString() {
        return modelToView.toString();
    }

    public ModelViewTransform1D( ModelViewTransform1D m ) {
        this( m.getMinModel(), m.getMaxModel(), m.getMinView(), m.getMaxView() );
    }

    public void setTransform( ModelViewTransform1D m ) {
        modelToView.setInput( m.getMinModel(), m.getMaxModel() );
        modelToView.setOutput( m.getMinView(), m.getMaxView() );
    }

    public double getMinModel() {
        return modelToView.getMinInput();
    }

    public double getMaxModel() {
        return modelToView.getMaxInput();
    }

    public int getMinView() {
        return (int) modelToView.getMinOutput();
    }

    public int getMaxView() {
        return (int) modelToView.getMaxOutput();
    }

    public int modelToView( double x ) {
        return (int) modelToView.evaluate( x );
    }

    public int modelToViewDifferential( double dModel ) {
        return modelToView( dModel ) - modelToView( 0 );
    }

    public double viewToModelDifferential( int dView ) {
        return viewToModel( dView ) - viewToModel( 0 );
    }

    public double viewToModel( int x ) {
        return modelToView.createInverse().evaluate( x );
    }

    public void addListener( Observer observer ) {
        transformListeners.add( observer );
    }

    public void update() {
        for ( int i = 0; i < transformListeners.size(); i++ ) {
            Observer observer = transformListeners.get( i );
            observer.transformChanged( this );
        }
    }

    public void setModelRange( double minModel, double maxModel ) {
        if ( modelToView.getMinInput() != minModel || modelToView.getMinInput() != maxModel ) {
            modelToView.setInput( minModel, maxModel );
            update();
        }
    }

    public void setViewRange( int minView, int maxView ) {
        if ( modelToView.getMinOutput() != minView && modelToView.getMaxOutput() != maxView ) {
            modelToView.setOutput( minView, maxView );
            update();
        }
    }
}