package com.polytopemedia.polyhedra.opt.grad;

import com.polytopemedia.polyhedra.opt.Evaluator;

public interface EvaluatorWithGradient extends Evaluator {
    public double[] gradient(double[] vars);
}
