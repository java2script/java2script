// Copyright 2002-2011, University of Colorado

/**
 * Class: PhetMonitorPanel
 * Package: edu.colorado.phet.graphics
 * Author: Another Guy
 * Date: Mar 31, 2003
 */
package edu.colorado.phet.idealgas.view.monitors;

import javax.swing.*;

abstract public class PhetMonitorPanel extends JPanel {
    // These attributes are used to regulate how often the readouts
    // are updated. See update(). We do it this way, rather than run
    // this panel in a separate thread, to avoid the use of synchronized
    // blocks on the list of bodies
    private long updateInterval = 1000;
    //    private long updateInterval = 500;
    private long lastUpdateTime;

    public long getUpdateInterval() {
        return updateInterval;
    }

    public void setUpdateInterval( long updateInterval ) {
        this.updateInterval = updateInterval;
    }

    public long getLastUpdateTime() {
        return lastUpdateTime;
    }

    public void setLastUpdateTime( long lastUpdateTime ) {
        this.lastUpdateTime = lastUpdateTime;
    }

    //    abstract public void clear();
}
