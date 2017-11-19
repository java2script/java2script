package com.polytopemedia.polyhedra.opt.grad;

import com.polytopemedia.polyhedra.opt.Optimiser;
import com.polytopemedia.polyhedra.vec.RealVector;

public class ConjugateGradient extends GradientBasedOptimiser {

    private final Optimiser linearSolver;
    private final DerivativeBasedOptimiser linearSolverWithDerivative;
    private final boolean usePolackRibiere;
    private final int maxIters;

    public ConjugateGradient() {
        //this(new ParabolicFittingOptimiser(r1, r2));
        this(new ModifiedBrent());
    }

    private ConjugateGradient(Optimiser linearSolver) {
        this(linearSolver, true, 100);
    }

    private ConjugateGradient(Optimiser linearSolver, boolean usePolackRibiere, int maxIterations) {
        this.usePolackRibiere = usePolackRibiere;
        this.maxIters = maxIterations;
        if (linearSolver instanceof DerivativeBasedOptimiser) {
            this.linearSolverWithDerivative = (DerivativeBasedOptimiser) linearSolver;
            this.linearSolver = null;
        } else {
            this.linearSolverWithDerivative = null;
            this.linearSolver = linearSolver;

        }
    }

    @Override public double[] optimiseUsingGradient(EvaluatorWithGradient evaluator, double tolerance) {
        ValueAndGradientSource source;
        if (evaluator instanceof ValueAndGradientSource) {
            source = (ValueAndGradientSource) evaluator;
        } else {
            source = new ValueAndGradientEstimator(evaluator);
        }
        double[] point = getInitialGuess(source.getArgumentCount());
        ValueAndGradient pointVAG = source.getValueAndGradient(point);
        double value = pointVAG.getValue();
        double[] xi = pointVAG.getGradient();
        double[] g = RealVector.multiplied(xi, -1);
        double[] h = g.clone();
        xi = g.clone();
        int ite = 0;
        while (ite < maxIters) {
            ite++;
            double travelAmount = linmin(point, xi, source, tolerance);
            point = RealVector.added(point, xi, 1, travelAmount);
            ValueAndGradient newPointVAG = source.getValueAndGradient(point);
            double newValue = newPointVAG.getValue();
            // System.out.println(newValue + " via " + travelAmount + " ConjugateGradient.optimiseUsingGradient()");
            if (Math.abs(newValue - value) <= tolerance * (Math.abs(newValue) + Math.abs(value) + 1e-16)) {
                return point;
            }
            value = newValue;
            xi = newPointVAG.getGradient();
            double gg = RealVector.dotProduct(g, g);
            double dgg = RealVector.dotProduct(xi, xi);
            if (usePolackRibiere) {
                dgg += RealVector.dotProduct(xi, g);
            }
            if (gg == 0) {
                return point;
            }
            double gamma = dgg / gg;
            g = RealVector.multiplied(xi, -1);
            h = RealVector.added(g, h, 1, gamma);
            xi = h.clone();
        }
        return point;
    }

    private double[] getInitialGuess(int argumentCount) {
        if (initialGuess == null || initialGuess.length != argumentCount) {
            return new double[argumentCount];
        }
        return initialGuess;
    }


    private double linmin(double[] point, double[] direction, ValueAndGradientSource evaluator, double tolerance) {
        double directionNorm = RealVector.norm(direction, 2);
        double pointNorm = RealVector.norm(point, 2);
        if (directionNorm == 0)
            return 0;
        if (pointNorm == 0)
            pointNorm = 1;
        double scale = directionNorm / pointNorm;
        if (scale < 1)
            scale = 1;
        double[] directionToUse = RealVector.multiplied(direction, 1 / scale);
        double result;
        if (linearSolver != null) {
            LineEvaluator lineEvaluator = new LineEvaluator(point, directionToUse, evaluator);
            result = linearSolver.optimise(lineEvaluator, tolerance)[0];
        } else {
            LineEvaluatorWithDerivative lineEvaluator = new LineEvaluatorWithDerivative(point, directionToUse, evaluator);
            result = linearSolverWithDerivative.optimiseUsingDerivative(lineEvaluator, tolerance);
        }
        return result / scale;
    }


}
