// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author:samreid $
 * Revision : $Revision:14677 $
 * Date modified : $Date:2007-04-17 03:40:29 -0500 (Tue, 17 Apr 2007) $
 */
package edu.colorado.phet.common.phetcommon.util;

/**
 * Utility class for timing activity.
 */

public class QuickProfiler {
    private long startTime;
    private String name;

    public QuickProfiler() {
        this( null );
    }

    public QuickProfiler( String name ) {
        this.name = name;
        this.startTime = System.currentTimeMillis();
    }

    public long getTime() {
        long now = System.currentTimeMillis();
        return now - startTime;
    }

    public void println() {
        System.out.println( toString() );
    }

    @Override
		public String toString() {
        return ( name != null ? ( name + ": " ) : "" ) + getTime() + " (ms)";
    }
}