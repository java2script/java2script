// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.audio;

import edu.colorado.phet.common.phetcommon.resources.PhetCommonResources;
import edu.colorado.phet.common.phetcommon.resources.PhetResources;

/**
 * Player for JAR audio resources.
 * Can play sim-specific or phetcommon sounds, can be enabled and disabled.
 * The downside of this implementation is that the resources can't be loaded statically,
 * so we can't verify at startup time that the resources exists.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class AudioResourcePlayer {

    protected final PhetResources simResourceLoader;
    private boolean enabled;

    public AudioResourcePlayer( PhetResources simResourceLoader, boolean enabled ) {
        this.simResourceLoader = simResourceLoader;
        this.enabled = enabled;
    }

    /**
     * Is sound enabled?
     *
     * @return
     */
    public boolean isEnabled() {
        return enabled;
    }

    /**
     * Enables or disables sound.
     *
     * @param isEnabled
     */
    public void setEnabled( boolean isEnabled ) {
        this.enabled = isEnabled;
    }

    /**
     * Plays an audio resource using the sim-specific resource loader.
     *
     * @param resourceName
     */
    public void playSimAudio( String resourceName ) {
        if ( isEnabled() ) {
            simResourceLoader.getAudioClip( resourceName ).play();
        }
    }

    /**
     * Plays an audio resource using phetcommon's resource loader.
     *
     * @param resourceName
     */
    public void playCommonAudio( String resourceName ) {
        if ( isEnabled() ) {
            PhetCommonResources.getInstance().getAudioClip( resourceName ).play();
        }
    }
}
