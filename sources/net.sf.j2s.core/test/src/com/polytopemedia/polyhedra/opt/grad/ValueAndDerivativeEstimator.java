package com.polytopemedia.polyhedra.opt.grad;

import com.polytopemedia.polyhedra.opt.Evaluator;

class ValueAndDerivativeEstimator extends ValueAndDerivativeSource { 

    private ValueAndGradientSource delegate;
    ValueAndDerivativeEstimator(Evaluator e) {
        if (e.getArgumentCount() != 1) {
            throw new IllegalArgumentException("The evaluator passed here must have one argument");
        }
        delegate = new ValueAndGradientEstimator(e);
    }

    @Override public double[] getValueAndDerivative(double x) {
        ValueAndGradient vag = delegate.getValueAndGradient(new double[] {x});
        return new double[] {vag.getValue(), vag.getGradient()[0]};
    }

}
