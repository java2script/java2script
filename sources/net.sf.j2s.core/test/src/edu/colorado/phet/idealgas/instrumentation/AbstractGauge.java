// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.idealgas.instrumentation;


public abstract class AbstractGauge {
//public abstract class AbstractGauge implements Graphic {

    protected double min;
    protected double max;
    double value;
    protected double numMaj;
    protected double numMin;

    public void setMin( double min ) {
        this.min = min;
    }

    public void setMax( double max ) {
        this.max = max;
    }

    public void setValue( double value ) {
        this.value = value;
    }

    public void setNumMaj( double numMaj ) {
        this.numMaj = numMaj;
    }

    public void setNumMin( double numMin ) {
        this.numMin = numMin;
    }
}
