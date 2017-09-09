package swingjs;

import javajs.util.JSThread;
import java.awt.event.InvocationEvent;

@SuppressWarnings("serial")
public class JSEvent extends InvocationEvent {
	
	JSEvent(JSThread t, Runnable r) {
		super(t, InvocationEvent.SWINGJS_INVOCATION_LOW, r, null, false);
	}

}
