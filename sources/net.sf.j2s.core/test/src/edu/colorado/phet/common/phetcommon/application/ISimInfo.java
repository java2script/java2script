// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.application;

import java.util.Locale;

import edu.colorado.phet.common.phetcommon.resources.PhetVersion;

public interface ISimInfo {

    String getName();

    PhetVersion getVersion();

    /**
     * Should the updates feature be included at runtime?
     *
     * @return
     */
    boolean isUpdatesFeatureIncluded();

    /**
     * Should the statistics feature be included at runtime?
     *
     * @return
     */
    boolean isStatisticsFeatureIncluded();

    /**
     * Is automatic checking for updates enabled?
     * This is based on the users preferences and whether the feature is included at runtime.
     *
     * @return
     */
    boolean isUpdatesEnabled();

    /**
     * Is statistics enabled?
     * This is based on the users preferences and whether the feature is included at runtime.
     *
     * @return
     */
    boolean isStatisticsEnabled();

    /**
     * Should the user have access to the Preferences dialog?
     * This is true if at least one of the features in the preferences dialog is included at runtime.
     *
     * @return
     */
    boolean isPreferencesEnabled();

    String getProjectName();

    String getFlavor();

    String[] getCommandLineArgs();

    boolean hasCommandLineArg( String s );

    /**
     * Was this sim run in developer mode (-dev program arg)?
     *
     * @return
     */
    boolean isDev();

    /**
     * Gets the locale that we're using to decide which string translations to load.
     *
     * @return
     */
    Locale getLocale();

    public String getDistributionTag();
}
