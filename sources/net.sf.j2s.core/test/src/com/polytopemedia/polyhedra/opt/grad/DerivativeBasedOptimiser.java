package com.polytopemedia.polyhedra.opt.grad;

import com.polytopemedia.polyhedra.opt.Evaluator;
import com.polytopemedia.polyhedra.opt.Optimiser;

abstract class DerivativeBasedOptimiser extends Optimiser { 

    @Override public double[] optimise(Evaluator e, double tolerance) {
        return new double[] {optimiseUsingDerivative(new ValueAndDerivativeEstimator(e), tolerance)};
    }

    public abstract double optimiseUsingDerivative(ValueAndDerivativeSource evaluator, double tolerance);
}
