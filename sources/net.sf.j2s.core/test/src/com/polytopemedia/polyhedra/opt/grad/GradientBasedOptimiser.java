package com.polytopemedia.polyhedra.opt.grad;

import com.polytopemedia.polyhedra.opt.Evaluator;
import com.polytopemedia.polyhedra.opt.Optimiser;

abstract class GradientBasedOptimiser extends Optimiser {
    @Override public double[] optimise(Evaluator e, double tolerance) {
        return optimiseUsingGradient(new ValueAndGradientEstimator(e), tolerance);
    }

    public abstract double[] optimiseUsingGradient(EvaluatorWithGradient evaluator, double tolerance);
}
