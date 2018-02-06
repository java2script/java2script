package a2s;

import java.awt.AWTEvent;
import java.awt.Component;
import java.awt.Event;
import java.awt.Point;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.AdjustmentEvent;
import java.awt.event.AdjustmentListener;
import java.awt.event.ComponentEvent;
import java.awt.event.FocusEvent;
import java.awt.event.InputEvent;
import java.awt.event.ItemEvent;
import java.awt.event.KeyEvent;
import java.awt.event.MouseEvent;
import java.awt.event.WindowEvent;
import java.util.EventListener;

import javax.swing.AbstractButton;
import javax.swing.JComboBox;
import javax.swing.JComponent;
import javax.swing.JScrollBar;


public class A2SEvent implements Runnable {

  private Event e;
  private Object target;

	public A2SEvent(AWTEvent e) {
		this.target = e.getSource();
		this.e = A2SEvent.convertToOld(e);
	}


	@SuppressWarnings("deprecation")
	@Override
	public void run() {
	  Event e = this.e;
	  Component target = (Component) this.target;
		
		/**
		 * Otherwise the states have not changed
		 * 
		 * @j2sNative
		 * 
		 * 			setTimeout(function() {
		 * 
		 */
		   target.postEvent(e);
		/**
		 * Otherwise the states have not changed
		 * 
		 * @j2sNative
		 * 
		 * 			});
		 */
	}


	static int getOldEventKey(KeyEvent e) {
    int keyCode = e.getKeyCode();
    for (int i = 0; i < actionKeyCodes.length; i++) {
        if (actionKeyCodes[i][0] == keyCode) {
            return actionKeyCodes[i][1];
        }
    }
    return (int)e.getKeyChar();
}
  /* table for mapping old Event action keys to KeyEvent virtual keys. */
  private static final int actionKeyCodes[][] = {
  /*    virtual key              action key   */
      { KeyEvent.VK_HOME,        Event.HOME         },
      { KeyEvent.VK_END,         Event.END          },
      { KeyEvent.VK_PAGE_UP,     Event.PGUP         },
      { KeyEvent.VK_PAGE_DOWN,   Event.PGDN         },
      { KeyEvent.VK_UP,          Event.UP           },
      { KeyEvent.VK_DOWN,        Event.DOWN         },
      { KeyEvent.VK_LEFT,        Event.LEFT         },
      { KeyEvent.VK_RIGHT,       Event.RIGHT        },
      { KeyEvent.VK_F1,          Event.F1           },
      { KeyEvent.VK_F2,          Event.F2           },
      { KeyEvent.VK_F3,          Event.F3           },
      { KeyEvent.VK_F4,          Event.F4           },
      { KeyEvent.VK_F5,          Event.F5           },
      { KeyEvent.VK_F6,          Event.F6           },
      { KeyEvent.VK_F7,          Event.F7           },
      { KeyEvent.VK_F8,          Event.F8           },
      { KeyEvent.VK_F9,          Event.F9           },
      { KeyEvent.VK_F10,         Event.F10          },
      { KeyEvent.VK_F11,         Event.F11          },
      { KeyEvent.VK_F12,         Event.F12          },
      { KeyEvent.VK_PRINTSCREEN, Event.PRINT_SCREEN },
      { KeyEvent.VK_SCROLL_LOCK, Event.SCROLL_LOCK  },
      { KeyEvent.VK_CAPS_LOCK,   Event.CAPS_LOCK    },
      { KeyEvent.VK_NUM_LOCK,    Event.NUM_LOCK     },
      { KeyEvent.VK_PAUSE,       Event.PAUSE        },
      { KeyEvent.VK_INSERT,      Event.INSERT       }
  };


  /**
   * Converts a new event to an old one (used for compatibility).
   * If the new event cannot be converted (because no old equivalent
   * exists) then this returns null.
   *
   * Note: this method is here instead of in each individual new
   * event class in java.awt.event because we don't want to make
   * it public and it needs to be called from java.awt.
   */
  static Event convertToOld(AWTEvent e) {
      Object src = e.getSource();
      int id = e.getID();
      int newid = id;

      switch(id) {
        case KeyEvent.KEY_PRESSED:
        case KeyEvent.KEY_RELEASED:
            KeyEvent ke = (KeyEvent)e;
            if (ke.isActionKey()) {
                newid = (id == KeyEvent.KEY_PRESSED?
                         Event.KEY_ACTION : Event.KEY_ACTION_RELEASE);
            }
            int keyCode = ke.getKeyCode();
            if (keyCode == KeyEvent.VK_SHIFT ||
                keyCode == KeyEvent.VK_CONTROL ||
                keyCode == KeyEvent.VK_ALT) {
                return null;  // suppress modifier keys in old event model.
            }
            // no mask for button1 existed in old Event - strip it out
            return new Event(src, ke.getWhen(), newid, 0, 0,
                             getOldEventKey(ke),
                             (ke.getModifiers() & ~InputEvent.BUTTON1_MASK));

        case MouseEvent.MOUSE_CLICKED:
        case MouseEvent.MOUSE_PRESSED:
        case MouseEvent.MOUSE_RELEASED:
        case MouseEvent.MOUSE_MOVED:
        case MouseEvent.MOUSE_DRAGGED:
        case MouseEvent.MOUSE_ENTERED:
        case MouseEvent.MOUSE_EXITED:
            MouseEvent me = (MouseEvent)e;
            // no mask for button1 existed in old Event - strip it out
            Event olde = new Event(src, me.getWhen(), newid,
                             me.getX(), me.getY(), 0,
                             (me.getModifiers() & ~InputEvent.BUTTON1_MASK));
            olde.clickCount = me.getClickCount();
            return olde;

        case FocusEvent.FOCUS_GAINED:
            return new Event(src, Event.GOT_FOCUS, null);

        case FocusEvent.FOCUS_LOST:
            return new Event(src, Event.LOST_FOCUS, null);

        case WindowEvent.WINDOW_CLOSING:
        case WindowEvent.WINDOW_ICONIFIED:
        case WindowEvent.WINDOW_DEICONIFIED:
            return new Event(src, newid, null);

        case ComponentEvent.COMPONENT_MOVED:
            if (src instanceof Frame || src instanceof Dialog) {
                Point p = ((Component)src).getLocation();
                return new Event(src, 0, Event.WINDOW_MOVED, p.x, p.y, 0, 0);
            }
            break;

        case ActionEvent.ACTION_PERFORMED:
            ActionEvent ae = (ActionEvent)e;
            String cmd;
            if (src instanceof AbstractButton) {
                cmd = ((AbstractButton)src).getText();
            } else if (src instanceof MenuItem) {
                cmd = ((MenuItem)src).getText();
            } else {
                cmd = ae.getActionCommand();
            }
            return new Event(src, 0, newid, 0, 0, 0, ae.getModifiers(), cmd);

        case ItemEvent.ITEM_STATE_CHANGED:
            ItemEvent ie = (ItemEvent)e;
            Object arg;
            if (src instanceof List) {
                newid = (ie.getStateChange() == ItemEvent.SELECTED?
                         Event.LIST_SELECT : Event.LIST_DESELECT);
                arg = ie.getItem();
            } else {
                newid = Event.ACTION_EVENT;
                if (src instanceof Choice) {
                    arg = ie.getItem();

                } else { // Checkbox
                    arg = Boolean.valueOf(ie.getStateChange() == ItemEvent.SELECTED);
                }
            }
            return new Event(src, newid, arg);

        case AdjustmentEvent.ADJUSTMENT_VALUE_CHANGED:
            AdjustmentEvent aje = (AdjustmentEvent)e;
            switch(aje.getAdjustmentType()) {
              case AdjustmentEvent.UNIT_INCREMENT:
                newid = Event.SCROLL_LINE_DOWN;
                break;
              case AdjustmentEvent.UNIT_DECREMENT:
                newid = Event.SCROLL_LINE_UP;
                break;
              case AdjustmentEvent.BLOCK_INCREMENT:
                newid = Event.SCROLL_PAGE_DOWN;
                break;
              case AdjustmentEvent.BLOCK_DECREMENT:
                newid = Event.SCROLL_PAGE_UP;
                break;
              case AdjustmentEvent.TRACK:
                if (aje.getValueIsAdjusting()) {
                    newid = Event.SCROLL_ABSOLUTE;
                }
                else {
                    newid = Event.SCROLL_END;
                }
                break;
              default:
                return null;
            }
            return new Event(src, newid, Integer.valueOf(aje.getValue()));

        default:
      }
      return null;
  }
  
	public static Component addListener(JComponent container, Component comp) {
		A2SContainer top = (container == null ? null : ((A2SContainer) container.getTopLevelAncestor()));
		if (top == null)
			top = ((A2SContainer) ((JComponent) comp).getTopLevelAncestor());
		if (top == null)
			if (comp instanceof A2SContainer)
				top = (A2SContainer) comp;
			else
				return comp;
		A2SListener listener = top.getA2SListener();
		if (comp instanceof AbstractButton) {
			if (!isListener(((AbstractButton) comp).getActionListeners(), listener))
				((AbstractButton) comp).addActionListener((ActionListener) listener);
		} else if (comp instanceof TextField) {
			if (!isListener(((TextField) comp).getActionListeners(), listener))
				((TextField) comp).addActionListener((ActionListener) listener);
		} else if (comp instanceof JComboBox) {
			if (!isListener(((JComboBox) comp).getActionListeners(), listener))
				((JComboBox) comp).addActionListener((ActionListener) listener);
		} else if (comp instanceof JScrollBar) {
			if (!isListener(((JScrollBar) comp).getAdjustmentListeners(), listener))
				((JScrollBar) comp).addAdjustmentListener((AdjustmentListener) listener);
		}
		return comp;
	}


	private static boolean isListener(EventListener[] listeners, EventListener listener) {
		if (listener == null)
			return true;
		for (int i = listeners.length; --i >= 0;)
			if (listeners[i] == listener)
				return true;
		return false;
	}
  
}
