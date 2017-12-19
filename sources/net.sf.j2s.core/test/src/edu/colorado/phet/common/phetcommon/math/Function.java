// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.math;

import java.awt.geom.Point2D;

/**
 * A Function maps from double values to double values, and supports an inverse Function.
 */
public interface Function {
    public double evaluate( double x );

    public Function createInverse();

    public static class IdentityFunction implements Function {
        @Override
				public double evaluate( double x ) {
            return x;
        }

        @Override
				public Function createInverse() {
            return this;
        }
    }

    public static class PowerFunction implements Function {
        private final double power;

        public PowerFunction( double power ) {
            this.power = power;
        }

        @Override
				public double evaluate( double x ) {
            return Math.pow( x, power );
        }

        @Override
				public Function createInverse() {
            throw new RuntimeException( "Not yet implemented" );
        }
    }

    public static class ExponentialGrowthFunction implements Function {
        private final double base;
        private final double multiplier;

        public ExponentialGrowthFunction( double base, double multiplier ) {
            this.base = base;
            this.multiplier = multiplier;
        }

        @Override
				public double evaluate( double x ) {
            return multiplier * Math.pow( base, x );
        }

        @Override
				public Function createInverse() {
            throw new RuntimeException( "Not yet implemented" );
        }
    }

    public static class LinearFunction implements Function {
        private double minInput;
        private double maxInput;
        private double minOutput;
        private double maxOutput;

        private double t1;
        private double scale;
        private double t2;

        public LinearFunction( double offset, double scale ) {
            this( 0, 1, offset, offset + scale * 1 );
        }

        /**
         * Constructs a LinearFunction that passes through the 2 specified points.
         *
         * @param p1 one point to pass through
         * @param p2 another point this function should pass through
         */
        public LinearFunction( Point2D p1, Point2D p2 ) {
            this( p1.getX(), p2.getX(), p1.getY(), p2.getY() );
        }

        public LinearFunction( double minInput, double maxInput, double minOutput, double maxOutput ) {
            this.minInput = minInput;
            this.maxInput = maxInput;
            this.minOutput = minOutput;
            this.maxOutput = maxOutput;
            update();
        }

        protected void update() {
            t1 = ( -minInput );
            scale = ( maxOutput - minOutput ) / ( maxInput - minInput );
            t2 = minOutput;
        }

        @Override
				public double evaluate( double x ) {
            double output = t1 + x;
            output = scale * output;
            output = t2 + output;
            return output;
        }

        @Override
				public Function createInverse() {
            return new LinearFunction( minOutput, maxOutput, minInput, maxInput );
        }

        public double getMinInput() {
            return minInput;
        }

        public double getMaxInput() {
            return maxInput;
        }

        public double getMinOutput() {
            return minOutput;
        }

        public double getMaxOutput() {
            return maxOutput;
        }

        public double getInputRange() {
            return maxInput - minInput;
        }

        public double getOutputRange() {
            return maxOutput - minOutput;
        }

        public void setInput( double minInput, double maxInput ) {
            this.minInput = minInput;
            this.maxInput = maxInput;
            update();
        }

        public void setOutput( double minOutput, double maxOutput ) {
            this.minOutput = minOutput;
            this.maxOutput = maxOutput;
            update();
        }

        @Override
        public String toString() {
            return "Linear Function, [" + minInput + "," + maxInput + "]->[" + minOutput + "," + maxOutput + "]";
        }

        /**
         * Machine generated deep equals implementation.
         *
         * @param o
         * @return
         */
        @Override
        public boolean equals( Object o ) {
            if ( this == o ) { return true; }
            if ( o == null || getClass() != o.getClass() ) { return false; }

            LinearFunction that = (LinearFunction) o;

            if ( Double.compare( that.maxInput, maxInput ) != 0 ) { return false; }
            if ( Double.compare( that.maxOutput, maxOutput ) != 0 ) { return false; }
            if ( Double.compare( that.minInput, minInput ) != 0 ) { return false; }
            if ( Double.compare( that.minOutput, minOutput ) != 0 ) { return false; }
            if ( Double.compare( that.scale, scale ) != 0 ) { return false; }
            if ( Double.compare( that.t1, t1 ) != 0 ) { return false; }
            if ( Double.compare( that.t2, t2 ) != 0 ) { return false; }

            return true;
        }

        /**
         * Machine generated deep hashcode implementation.
         *
         * @return
         */
        @Override
        public int hashCode() {
            int result;
            long temp;
            temp = minInput != +0.0d ? Double.doubleToLongBits( minInput ) : 0L;
            result = (int) ( temp ^ ( temp >>> 32 ) );
            temp = maxInput != +0.0d ? Double.doubleToLongBits( maxInput ) : 0L;
            result = 31 * result + (int) ( temp ^ ( temp >>> 32 ) );
            temp = minOutput != +0.0d ? Double.doubleToLongBits( minOutput ) : 0L;
            result = 31 * result + (int) ( temp ^ ( temp >>> 32 ) );
            temp = maxOutput != +0.0d ? Double.doubleToLongBits( maxOutput ) : 0L;
            result = 31 * result + (int) ( temp ^ ( temp >>> 32 ) );
            temp = t1 != +0.0d ? Double.doubleToLongBits( t1 ) : 0L;
            result = 31 * result + (int) ( temp ^ ( temp >>> 32 ) );
            temp = scale != +0.0d ? Double.doubleToLongBits( scale ) : 0L;
            result = 31 * result + (int) ( temp ^ ( temp >>> 32 ) );
            temp = t2 != +0.0d ? Double.doubleToLongBits( t2 ) : 0L;
            result = 31 * result + (int) ( temp ^ ( temp >>> 32 ) );
            return result;
        }
    }
}
