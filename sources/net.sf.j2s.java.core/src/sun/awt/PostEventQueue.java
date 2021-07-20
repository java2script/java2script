package sun.awt;

import java.awt.AWTEvent;
import java.awt.EventQueue;

/*
 * PostEventQueue is a Thread that runs in the same AppContext as the
 * Java EventQueue.  It is a queue of AWTEvents to be posted to the
 * Java EventQueue.  The toolkit Thread (AWT-Windows/AWT-Motif) posts
 * events to this queue, which then calls EventQueue.postEvent().
 *
 * We do this because EventQueue.postEvent() may be overridden by client
 * code, and we mustn't ever call client code from the toolkit thread.
 */
public class PostEventQueue {
    private EventQueueItem queueHead = null;
    private EventQueueItem queueTail = null;
    private final EventQueue eventQueue;

    public PostEventQueue(EventQueue eq) {
        eventQueue = eq;
    }

    public boolean noEvents() {
        return queueHead == null;
    }

    /*
     * Continually post pending AWTEvents to the Java EventQueue.
     */
    public void flush() {
        if (queueHead != null) {
            EventQueueItem tempQueue;
            /*
             * We have to execute the loop inside the synchronized block
             * to ensure that the flush is completed before a new event
             * can be posted to this queue.
             */
            synchronized (this) {
                tempQueue = queueHead;
                queueHead = queueTail = null;
                /*
                 * If this PostEventQueue is flushed in parallel on two
                 * different threads tempQueue will be null for one of them.
                 */
                while (tempQueue != null) {
//                	 System.out.println("PostEventQueue posting tempEvent " + tempQueue.event);
                    eventQueue.postEvent(tempQueue.event);
                    tempQueue = tempQueue.next;
                }
            }
        }
    }

    /*
     * Enqueue an AWTEvent to be posted to the Java EventQueue.
     */
    void postEvent(AWTEvent event) {
        EventQueueItem item = new EventQueueItem(event);

        synchronized (this) {
            if (queueHead == null) {
                queueHead = queueTail = item;
            } else {
                queueTail.next = item;
                queueTail = item;
            }
        }
      SunToolkit.wakeupEventQueue(eventQueue, false);//SwingJS was event.getSource() == AWTAutoShutdown.getInstance());
    }
} 
// SwingJS  -- hidden classes EventQueueItem and were removed from this file