package com.polytopemedia.polyhedra.opt.grad;

abstract class ValueAndDerivativeSource extends ValueAndGradientSource {

     public int getArgumentCount() {
        return 1;
    }

     public ValueAndGradient getValueAndGradient(double[] vars) {
        double[] valueAndDerivative = getValueAndDerivative(vars[0]);
        double value = valueAndDerivative[0];
        double[] gradient = {valueAndDerivative[1]};
        return new ValueAndGradient(value, gradient);
    }

    public abstract double[] getValueAndDerivative(double x);

}
