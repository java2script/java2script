package sun.awt;

import java.awt.AWTEvent;

class EventQueueItem {
    AWTEvent event;
    EventQueueItem next;

    EventQueueItem(AWTEvent evt) {
        event = evt;
    }
} // class EventQueueItem