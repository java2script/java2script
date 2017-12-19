// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.util;

import java.util.ArrayList;
import java.util.Iterator;

/**
 * The option pattern is an alternative to using null return values.
 * See: http://www.codecommit.com/blog/scala/the-option-pattern
 * <p/>
 * Sample usage:
 * <pre>
 * {@code
 * setText(value.isNone() ? "?" : new DecimalFormat( "0.0" ).format(value.get()))
 * }
 * </pre>
 *
 * @author Sam Reid
 */
public abstract class Option<T> implements Iterable<T> {
    public abstract T get();

    public abstract boolean isSome();

    public boolean isNone() {
        return !isSome();
    }

    //if Some, gets the option value, otherwise gets the elseValue
    public T getOrElse( T elseValue ) {
        return isSome() ? get() : elseValue;
    }

    public static class None<T> extends Option<T> {
        @Override
				public T get() {
            throw new UnsupportedOperationException( "Cannot get value on none." );
        }

        @Override
				public boolean isSome() {
            return false;
        }

        @Override public String toString() {
            return "None";
        }

        @Override
				public Iterator<T> iterator() {
            return new ArrayList<T>().iterator();
        }

        @Override public boolean equals( Object obj ) {
            return obj instanceof None;
        }

    }

    public static class Some<T> extends Option<T> {
        private final T value;

        public Some( T value ) {
            this.value = value;
        }

        @Override
				public T get() {
            return value;
        }

        @Override
				public boolean isSome() {
            return true;
        }

        @Override public String toString() {
            return value.toString();
        }

        @Override
				@SuppressWarnings("serial")
				public Iterator<T> iterator() {
            return new ArrayList<T>() {{
                add( value );
            }}.iterator();
        }

        @SuppressWarnings("rawtypes")
				@Override
        public boolean equals( Object o ) {
            if ( this == o ) { return true; }
            if ( o == null || getClass() != o.getClass() ) { return false; }

            Some some = (Some) o;

            if ( value != null ? !value.equals( some.value ) : some.value != null ) { return false; }

            return true;
        }

        @Override
        public int hashCode() {
            return value != null ? value.hashCode() : 0;
        }
    }
}
