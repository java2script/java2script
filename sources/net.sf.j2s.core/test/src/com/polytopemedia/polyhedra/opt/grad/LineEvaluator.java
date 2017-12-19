package com.polytopemedia.polyhedra.opt.grad;

import com.polytopemedia.polyhedra.opt.Evaluator;
import com.polytopemedia.polyhedra.vec.RealVector;

class LineEvaluator implements Evaluator {
    private final Evaluator evaluator;
    private final double[] point;
    private final double[] direction;

    LineEvaluator(double[] point, double[] direction, Evaluator evaluator) {
        this.point = point;
        this.direction = direction;
        this.evaluator = evaluator;
    }

     public double evaluate(double[] vars) {
        return evaluator.evaluate(RealVector.added(point, direction, 1, vars[0]));
    }

     public int getArgumentCount() {
        return 1;
    }

}
