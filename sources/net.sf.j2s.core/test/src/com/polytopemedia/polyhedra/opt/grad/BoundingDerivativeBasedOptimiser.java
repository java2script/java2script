package com.polytopemedia.polyhedra.opt.grad;


abstract class BoundingDerivativeBasedOptimiser extends DerivativeBasedOptimiser { 
    /**
     * @param evaluator
     * @return
     */
    protected double[][] getInitialGuesses(ValueAndDerivativeSource evaluator) {
        double a = 0;
        double b = 0.1;
        double c = 0.2;
        double[] vaga = evaluator.getValueAndDerivative(a);
        double[] vagb = evaluator.getValueAndDerivative(b);
        double[] vagc = evaluator.getValueAndDerivative(c);
        double fa = vaga[0];
        double fb = vagb[0];
        double fc = vagc[0];
        double dfa = vaga[1];
        double dfb = vagb[1];
        double dfc = vagc[1];
        while (fb > fa) {
            double newa = 2.618 * a - 1.618 * b;
            double[] newvag = evaluator.getValueAndDerivative(newa);
            double newfa = newvag[0];
            double newdfa = newvag[1];
            b = a;
            fb = fa;
            dfb = dfa;
            a = newa;
            fa = newfa;
            dfa = newdfa;
        }
        while (fb > fc) {
            double newc = 2.618 * c - 1.618 * b;
            double[] newvag = evaluator.getValueAndDerivative(newc);
            double newfc = newvag[0];
            double newdfc = newvag[1];
            b = c;
            fb = fc;
            dfb = dfc;
            c = newc;
            fc = newfc;
            dfc = newdfc;
        }
        return new double[][] { {a, fa, dfa}, {b, fb, dfb}, {c, fc, dfc}};
    }

}
