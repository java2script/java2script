package com.polytopemedia.polyhedra.opt;

import java.util.Random;

/** This is an abstract superclass for objects that are able to take an Evaluator, and return an array of doubles representing the optimum. The array should be at most a distance tolerance from the true optimum. */
public abstract class Optimiser {

   
    private static final long DEFAULT_RANDOM_SEED = 2001060920060613l;
    private static long randomSeed = DEFAULT_RANDOM_SEED;
    protected static final Random r = new Random(randomSeed);

    
    

    protected double[] initialGuess;

    public void setInitialGuess(double init[]) {
        initialGuess = init;
    }

    

    
    public abstract double[] optimise(Evaluator e, double tolerance);

}
