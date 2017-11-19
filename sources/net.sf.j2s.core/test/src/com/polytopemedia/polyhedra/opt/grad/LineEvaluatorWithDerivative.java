package com.polytopemedia.polyhedra.opt.grad;

import com.polytopemedia.polyhedra.vec.RealVector;

class LineEvaluatorWithDerivative extends ValueAndDerivativeSource {

    private final ValueAndGradientSource source;
    private final double[] point;
    private final double[] direction;

    LineEvaluatorWithDerivative(double[] point, double[] direction, EvaluatorWithGradient evaluator) {
        this.point = point;
        this.direction = direction;
        if (evaluator instanceof ValueAndGradientSource) {
            this.source = (ValueAndGradientSource) evaluator;
        } else {
            this.source = new ValueAndGradientEstimator(evaluator);
        }
    }

    @Override public double[] getValueAndDerivative(double x) {
        double[] newPoint = RealVector.added(point, direction, 1, x);
        ValueAndGradient vag = source.getValueAndGradient(newPoint);
        double value = vag.getValue();
        double[] gradient = vag.getGradient();
        double derivative = RealVector.dotProduct(gradient, direction);
        return new double[] {value, derivative};
    }

}
