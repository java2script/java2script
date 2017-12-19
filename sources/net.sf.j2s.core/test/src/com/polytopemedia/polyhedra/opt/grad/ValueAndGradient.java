package com.polytopemedia.polyhedra.opt.grad;

public class ValueAndGradient {
    private final double[] gradient;

    public double[] getGradient() {
        return gradient;
    }

    public double getValue() {
        return value;
    }

    private final double value;

    public ValueAndGradient(double value, double[] gradient) {
        this.value = value;
        this.gradient = gradient;
    }
}
