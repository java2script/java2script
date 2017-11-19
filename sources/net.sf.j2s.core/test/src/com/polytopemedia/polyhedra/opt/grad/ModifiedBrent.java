package com.polytopemedia.polyhedra.opt.grad;


class ModifiedBrent extends BoundingDerivativeBasedOptimiser { 

    private static final int MAX_ITER = 100;

    
 public double optimiseUsingDerivative(ValueAndDerivativeSource ev, double tolerance) {
        double[][] abc = getInitialGuesses(ev);
        double[] ax = abc[0];
        double[] bx = abc[1];
        double[] cx = abc[2];
        double[] a = (ax[0] < cx[0] ? ax : cx);
        double[] b = (ax[0] > cx[0] ? ax : cx);
        double[] x = bx;
        double[] w = bx;
        double[] v = bx;
        double e = 0;
        double d = Double.NaN; // java insists on initialising this variable bcs it can't see the logic of the program
        for (int iter = 1; iter <= MAX_ITER; iter++) {
            double xm = (a[0] + b[0]) / 2;
            double tol1 = tolerance * Math.abs(x[0]) + 1e-15;
            double tol2 = tol1 * 2;
            if (Math.abs(x[0] - xm) <= (tol2 - (b[0] - a[0]) / 2)) {
                return x[0];
            }
            if (Math.abs(e) > tol1) {
                double d1 = 2 * (b[0] - a[0]);
                double d2 = d1;
                if (w[2] != x[2])
                    d1 = (w[0] - x[0]) * x[2] / (x[2] - w[2]);
                if (v[2] != x[2])
                    d2 = (v[0] - x[0]) * x[2] / (x[2] - v[2]);
                double u1 = x[0] + d1;
                double u2 = x[0] + d2;
                boolean ok1 = (a[0] - u1) * (u1 - b[0]) > 0.0 && x[2] * d1 <= 0.0;
                boolean ok2 = (a[0] - u2) * (u2 - b[0]) > 0.0 && x[2] * d2 <= 0.0;
                double olde = e;
                e = d; // we never reach here before d is initialised properly
                if (ok1 || ok2) {
                    if (ok1 && ok2) {
                        d = (Math.abs(d1) < Math.abs(d2) ? d1 : d2);
                    } else if (ok1) {
                        d = d1;
                    } else {
                        d = d2;
                    }
                    if (Math.abs(d) <= Math.abs(olde / 2)) {
                        double u = x[0] + d;
                        if (u - a[0] < tol2 || b[0] - u < tol2)
                            d = sign(tol1, xm - x[0]);

                    } else {
                        e = (x[2] >= 0.0 ? a[0] - x[0] : b[0] - x[0]);
                        d = e / 2;
                    }
                } else {
                    // !ok1 && !ok2
                    e = x[2] >= 0 ? a[0]-x[0] : b[0] - x[0];
                    d = e / 2;
                }
            } else {
                e = x[2] >= 0 ? a[0] - x[0] : b[0] - x[0];
                d = e / 2;
            }
            double[] u;
            if (Math.abs(d) >= tol1) {
                double uu = x[0] + d;
                double[] uvag = ev.getValueAndDerivative(uu);
                double fu = uvag[0];
                double du = uvag[1];
                u = new double[] {uu, fu, du};
            } else {
                double uu = x[0] + sign(tol1, d);
                double[] uvag = ev.getValueAndDerivative(uu);
                double fu = uvag[0];
                if (fu > x[1]) {
                    return x[0];
                }
                double du = uvag[1];
                u = new double[] {uu, fu, du};
            }
            if (u[1] <= x[1]) {
                if (u[0] >= x[0]) 
                    a=x; 
                else
                    b = x;
                v = w;
                w = x;
                x = u;
            } else {
                if (u[0] < x[0]) 
                    a = u;
                else 
                    b = u;
                if (u[1] <= w[1] || w[0] == x[0]) {
                    v = w;
                    w = u;
                } else if (u[1] < v[1] || v[0] == x[0] || v[0] == w[0]) {
                    v = u;
                }
            }
        }
        return (a[0] + b[0]) / 2;
    }

    // #define SIGN(a,b) ((b) >= 0.0 ? fabs(a) : -fabs(a))
    private double sign(double a, double b) {
        return b >= 0 ? Math.abs(a) : -Math.abs(a);
    }



}
