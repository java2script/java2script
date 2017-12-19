package edu.colorado.phet.common.phetcommon.math;

import edu.colorado.phet.common.phetcommon.util.Pair;

/**
 * Solves 1-dimensional damped mass-spring systems (general harmonic oscillators)
 * <p/>
 * Notably, it solves the differential equation x'' + (c/m)x' + (k/m)x = 0.
 * <p/>
 * More can be learned about how this works from http://en.wikipedia.org/wiki/Damping
 *
 * @author Jonathan Olson
 */
public class DampedMassSpringSystem {

    // system constants
//    private final double mass;
//    private final double k;
//    private final double c;

    // initial conditions
    private final double x0;
    private final double v0;

    // computed properties
    private final double omega0;
    private final double zeta;

    // roots of the characteristic equations
    private final Pair<Complex, Complex> characteristicEquationRoots;
    private final Complex smallRoot;
    private final Complex largeRoot;

    // constants in the general case, solved by using the initial conditions
    private final Complex smallConstant;
    private final Complex largeConstant;

    /**
     * Initialize the system
     *
     * @param mass Mass of the oscillator
     * @param k    Spring constant
     * @param c    Damping constant
     * @param x0   Initial position
     * @param v0   Initial velocity
     */
    public DampedMassSpringSystem( double mass, double k, double c, double x0, double v0 ) {
//        this.mass = mass;
//        this.k = k;
//        this.c = c;
        this.x0 = x0;
        this.v0 = v0;
        omega0 = Math.sqrt( k / mass );
        zeta = c / ( 2 * Math.sqrt( mass * k ) );
        characteristicEquationRoots = solveQuadratic( 1, c / mass, k / mass );
        smallRoot = characteristicEquationRoots._1;
        largeRoot = characteristicEquationRoots._2;

        Complex initialPosition = new Complex( x0, 0 );
        Complex initialVelocity = new Complex( v0, 0 );

        Complex frac = ( largeRoot.getMultiply( initialPosition ).getSubtract( initialVelocity ) )
                .getDivide( smallRoot.getSubtract( largeRoot ) );

        if ( isCriticallyDamped() ) {
            // we are critically damped. for speed (since everything is rational), we actually ignore these constants later
            largeConstant = initialPosition;
            smallConstant = initialVelocity.getAdd( initialPosition.getMultiply( omega0 ) );
        }
        else {
            // general case
            largeConstant = initialPosition.getAdd( frac );
            smallConstant = frac.getOpposite();
        }
    }

    /**
     * Solve the second-order linear differential equation based on the formula ax''+bx'+cx = 0
     *
     * @param a  See above formula
     * @param b  See above formula
     * @param c  See above formula
     * @param x0 Result of x( 0 ) i.e. initial position
     * @param v0 Result of x'( 0 ) i.e. initial velocity
     * @return System that can be queried
     */
    public static DampedMassSpringSystem getSystemFromDifferentialEquation( double a, double b, double c, double x0, double v0 ) {
        // basically just remap the constants
        return new DampedMassSpringSystem( a, c, b, x0, v0 );
    }

    // the position of the mass at time t
    public double evaluatePosition( double t ) {
        Complex result;
        if ( isCriticallyDamped() ) {
            // real root, simplifies things

            // solution is of the form (A + B*t)*e^(root*t)
            double root = -omega0;
            double a = x0;
            double b = v0 + omega0 * x0;
            result = new Complex( ( a + b * t ) * Math.exp( root * t ), 0 );
        }
        else {
            // solution is of the form A * exp( rootA * t ) + B * exp( rootB * t )
            Complex left = largeConstant.getMultiply( Complex.getExp( largeRoot.getMultiply( t ) ) );
            Complex right = smallConstant.getMultiply( Complex.getExp( smallRoot.getMultiply( t ) ) );
            result = left.getAdd( right );
        }
        return result._real;
    }

    // the velocity of the mass at time t
    public double evaluateVelocity( double t ) {
        Complex result;
        if ( isCriticallyDamped() ) {
            // real root, simplifies things
            double root = -omega0;
            double a = x0;
            double b = v0 + omega0 * x0;
            result = new Complex( Math.exp( root * t ) * ( a * root + b * root * t + b ), 0 );
        }
        else {
            Complex left = largeConstant.getMultiply( Complex.getExp( largeRoot.getMultiply( t ) ) ).getMultiply( largeRoot );
            Complex right = smallConstant.getMultiply( Complex.getExp( smallRoot.getMultiply( t ) ) ).getMultiply( smallRoot );
            result = left.getAdd( right );
        }
        return result._real;
    }

    public boolean isCriticallyDamped() {
        return zeta == 1;
    }

    public boolean isOverDamped() {
        return zeta > 1;
    }

    public boolean isUnderDamped() {
        return zeta < 1;
    }

    public static double getCriticallyDampedDamping( double mass, double k ) {
        return 2 * Math.sqrt( mass * k );
    }

    // solves for the two roots (smallest root given first)
    public static Pair<Complex, Complex> solveQuadratic( double a, double b, double c ) {
        return solveQuadratic( new Complex( a, 0 ), new Complex( b, 0 ), new Complex( c, 0 ) );
    }

    public static Pair<Complex, Complex> solveQuadratic( Complex a, Complex b, Complex c ) {
        Complex discriminant = b.getMultiply( b ).getSubtract( a.getMultiply( c ).getMultiply( 4 ) );
        Complex sqrted = discriminant.getCanonicalSquareRoot();
        return new Pair<Complex, Complex>( new Complex( b.getOpposite().getSubtract( sqrted ).getDivide( a.getMultiply( 2 ) ) ),
                                           new Complex( b.getOpposite().getAdd( sqrted ).getDivide( a.getMultiply( 2 ) ) ) );
    }
}
