package com.polytopemedia.polyhedra.opt.grad;


public abstract class ValueAndGradientSource implements EvaluatorWithGradient {

     public double evaluate(double[] vars) {
        ValueAndGradient vag = getValueAndGradient(vars);
        return vag.getValue();
    }

     public double[] gradient(double[] vars) {
        ValueAndGradient vag = getValueAndGradient(vars);
        return vag.getGradient();
    }

    public abstract ValueAndGradient getValueAndGradient(double[] vars);

}
