// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.util;

/**
 * IntegerRange is used to describe the range of an integer quantity.
 * This class is immutable.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class IntegerRange {

    //----------------------------------------------------------------------------
    // Instance data
    //----------------------------------------------------------------------------

    private final int _min;
    private final int _max;
    private final int _default;

    //----------------------------------------------------------------------------
    // Constructors
    //----------------------------------------------------------------------------

    /**
     * Constructs an Integer range where the default is min.
     *
     * @param min
     * @param max
     */
    public IntegerRange( int min, int max ) {
        this( min, max, min );
    }

    /**
     * Constructor.
     *
     * @param min
     * @param max
     * @param defaultValue
     */
    public IntegerRange( int min, int max, int defaultValue ) {
        if ( !( min <= max ) ) {
            throw new IllegalArgumentException( "min must be <= max: min = " + min + ", max = " + max );
        }
        if ( defaultValue < min || defaultValue > max ) {
            throw new IllegalArgumentException( "defaultValue out of range: min = " + min + ", max = " + max + ", defaultValue = " + defaultValue );
        }
        _min = min;
        _max = max;
        _default = defaultValue;
    }

    /**
     * Copy constructor.
     *
     * @param range
     */
    public IntegerRange( IntegerRange range ) {
        this( range.getMin(), range.getMax(), range.getDefault() );
    }

    //----------------------------------------------------------------------------
    // Getters
    //----------------------------------------------------------------------------

    /**
     * Gets the lower bound (minimum) of the range.
     *
     * @return min
     */
    public int getMin() {
        return _min;
    }

    /**
     * Gets the upper bound (maximum) of the range.
     *
     * @return max
     */
    public int getMax() {
        return _max;
    }

    /**
     * Gets the default value.
     *
     * @return default
     */
    public int getDefault() {
        return _default;
    }

    //----------------------------------------------------------------------------
    // Convenience methods
    //----------------------------------------------------------------------------

    /**
     * Determines whether the range contains a value.
     *
     * @param value
     * @return true or false
     */
    public boolean contains( int value ) {
        return ( value >= _min && value <= _max );
    }

    /**
     * Determines whether the range contains a double value.
     *
     * @param value
     * @return true or false
     */
    public boolean contains( double value ) {
        return ( value >= _min && value <= _max );
    }

    /**
     * Gets the length of the range.
     *
     * @return length of the range
     */
    public int getLength() {
        return _max - _min;
    }

    /**
     * Is the length of the range zero?
     *
     * @return true or false
     */
    public boolean isZero() {
        return ( _max - _min == 0 );
    }

    /**
     * Do the two ranges overlap with one another?
     * reference: http://eli.thegreenplace.net/2008/08/15/intersection-of-1d-segments/
     *
     * @param xRange
     * @return
     */
    public boolean intersects( DoubleRange xRange ) {
        return ( _max >= xRange.getMin() && xRange.getMax() >= _min );
    }

    @Override public String toString() {
        return "min=" + _min + ", max=" + _max + ", default=" + _default;
    }
}
