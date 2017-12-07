// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.resources;

import java.text.MessageFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * PhetVersionInfo encapsulates a simulation's version information.
 */
public class PhetVersion {

    // title bar format for public releases, major.minor
    private static final String FORMAT_MAJOR_MINOR = "{0}.{1}";
    // title bar format for development releases, major.minor.dev
    private static final String FORMAT_MAJOR_MINOR_DEV = "{0}.{1}.{2}";
    // About dialog format, major.minor.dev (revision)
    private static final String FORMAT_ABOUT = "{0}.{1}.{2} ({3})";
    // Timestamp format
    private static final SimpleDateFormat FORMAT_TIMESTAMP = new SimpleDateFormat( "MMM d, yyyy" ); // eg, Feb 2, 2009

    private final String major, minor, dev, revision, timestamp;

    public PhetVersion( String major, String minor, String dev, String revision, String timestamp ) {
        this.major = cleanup( major );
        this.minor = cleanup( minor );
        this.dev = cleanup( dev );
        this.revision = cleanup( revision );
        this.timestamp = cleanup( timestamp );
    }

    public String getMajor() {
        return major;
    }

    public int getMajorAsInt() {
        return getAsInt( getMajor() );
    }

    public String getMinor() {
        return minor;
    }

    public int getMinorAsInt() {
        return getAsInt( getMinor() );
    }

    public String getDev() {
        return dev;
    }

    public int getDevAsInt() {
        return getAsInt( getDev() );
    }

    public String getRevision() {
        return revision;
    }

    public int getRevisionAsInt() {
        return getAsInt( getRevision() );
    }

    /*
    * A development version has a non-zero dev number.
    */
    private boolean isDevVersion() {
        return getDevAsInt() != 0;
    }

    /**
     * Formats the version information for use in the application's title bar.
     * A public release will have a dev number that is all zeros; anything else is a development release.
     * For public releases, we should only the major and minor version numbers.
     * Development release show major, minor and dev version numbers.
     *
     * @return String
     */
    public String formatForTitleBar() {
        return isDevVersion() ? formatMajorMinorDev() : formatMajorMinor();
    }

    public String formatForAboutDialog() {
        Object[] args = { major, minor, dev, revision, formatTimestamp() };
        return MessageFormat.format( FORMAT_ABOUT, args );
    }

    public String formatTimestamp() {
        String s = "?";
        if ( timestamp != null && timestamp.length() > 0 ) {
            long seconds = getTimestampSeconds();
            if ( seconds > 0 ) {
                Date date = new Date( seconds * 1000L ); // seconds to milliseconds 
                s = FORMAT_TIMESTAMP.format( date );
            }
        }
        return s;
    }

    public String formatMajorMinorDev() {
        Object[] args = { major, minor, dev };
        return MessageFormat.format( FORMAT_MAJOR_MINOR_DEV, args );
    }

    public String formatMajorMinor() {
        Object[] args = { major, minor };
        return MessageFormat.format( FORMAT_MAJOR_MINOR, args );
    }

    @Override
		public String toString() {
        return formatForAboutDialog();
    }

    @Override
		public boolean equals( Object o ) {
        if ( this == o ) {
            return true;
        }
        if ( o == null || getClass() != o.getClass() ) {
            return false;
        }

        PhetVersion that = (PhetVersion) o;

        return dev.equals( that.dev ) && major.equals( that.major ) &&
               minor.equals( that.minor ) && revision.equals( that.revision );
    }

    @Override
		public int hashCode() {
        int result;
        result = major.hashCode();
        result = 31 * result + minor.hashCode();
        result = 31 * result + dev.hashCode();
        result = 31 * result + revision.hashCode();
        return result;
    }

    private static String cleanup( String input ) {
        String output = input;
        if ( input == null ) {
            output = "?";
        }
        return output;
    }

    private static int getAsInt( String number ) {
        int i = 0;
        try {
            i = Integer.parseInt( number );
        }
        catch ( NumberFormatException e ) {
            e.printStackTrace();
            i = -1;
        }
        return i;
    }

    public boolean isGreaterThan( PhetVersion version ) {
        //TODO: should this use major/minor/dev to determine ordering?
        return getRevisionAsInt() > version.getRevisionAsInt();
    }

    public long getTimestampSeconds() {
        long seconds = 0;
        try {
            seconds = Long.parseLong( timestamp );
        }
        catch ( NumberFormatException e ) {
            System.err.println( "PhetVersion.getTimestampSeconds: timestamp is invalid, ignoring: " + timestamp );
            seconds = 0;
        }
        return seconds;
    }
}
