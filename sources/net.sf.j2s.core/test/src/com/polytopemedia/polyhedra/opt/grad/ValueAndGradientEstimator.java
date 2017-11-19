package com.polytopemedia.polyhedra.opt.grad;

import com.polytopemedia.polyhedra.opt.Evaluator;

class ValueAndGradientEstimator extends ValueAndGradientSource { 
    private final Evaluator evaluator;

    ValueAndGradientEstimator(Evaluator evaluator) {
        this.evaluator = evaluator;
    }

     public int getArgumentCount() {
        return evaluator.getArgumentCount();
    }

     public ValueAndGradient getValueAndGradient(double[] vars) {
        if (evaluator instanceof ValueAndGradientSource) {
            return ((ValueAndGradientSource) evaluator).getValueAndGradient(vars);
        }
        double value = evaluator.evaluate(vars);
        if (evaluator instanceof EvaluatorWithGradient) {
            double[] gradient = ((EvaluatorWithGradient) evaluator).gradient(vars);
            return new ValueAndGradient(value, gradient);
        }
        double[] gradient = new double[vars.length];
        for (int i=0; i<vars.length; i++) {
            double h = Math.max(1e-5 * Math.abs(vars[i]), 1e-5);
            double[] newvars = vars.clone();
            newvars[i] += h;
            double ph = evaluator.evaluate(newvars);
            newvars[i] = vars[i] - h;
            double mh = evaluator.evaluate(newvars);
            gradient[i] = (ph - mh) / (2 * h);
        }
        return new ValueAndGradient(value, gradient);
    }

}
