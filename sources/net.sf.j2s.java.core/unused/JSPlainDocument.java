package swingjs;

import java.util.EventListener;

import javax.swing.event.DocumentEvent;
import javax.swing.event.DocumentListener;
import javax.swing.event.EventListenerList;
import javax.swing.event.UndoableEditListener;
import javax.swing.event.DocumentEvent.ElementChange;
import javax.swing.event.DocumentEvent.EventType;
import javax.swing.text.AttributeSet;
import javax.swing.text.BadLocationException;
import javax.swing.text.Document;
import javax.swing.text.Element;
import javax.swing.text.Position;
import javax.swing.text.Segment;

public class JSPlainDocument implements Document {

	public JSPlainDocument() {}
	
	public class DocEvent implements DocumentEvent {

		private EventType type;
		private int offset;
		private int length;

		public DocEvent(int offset, int length, EventType type) {
			this.type = type;
			this.offset = offset;
			this.length = length;
		}

		@Override
		public int getOffset() {return offset;}

		@Override
		public int getLength() {return length;}

		@Override
		public Document getDocument() {
			return JSPlainDocument.this;
		}

		@Override
		public EventType getType() {
			return type;
		}

		@Override
		public ElementChange getChange(Element elem) {
			return null;
		}

	}

	private StringBuffer myText = new StringBuffer();

	@Override
	public int getLength() {
		return myText.length();
	}

	@Override
	public void addDocumentListener(DocumentListener listener) {
		listenerList.add(DocumentListener.class, listener);
	}

	@Override
	public void removeDocumentListener(DocumentListener listener) {
		listenerList.remove(DocumentListener.class, listener);
	}

	@Override
	public void addUndoableEditListener(UndoableEditListener listener) {
		System.out.println(listener);
	}

	@Override
	public void removeUndoableEditListener(UndoableEditListener listener) {
		System.out.println(listener);
	}

	@Override
	public Object getProperty(Object key) {
		return null;
	}

	@Override
	public void putProperty(Object key, Object value) {
	}

	@Override
	public void remove(int offs, int len) throws BadLocationException {
		if (len <= 0)
			return;
		if (offs < 0 || (offs + len) > getLength()) {
			throw new BadLocationException("Invalid remove", getLength() + 1);
		}
		myText.replace(offs,  len,  "");
		
			DocEvent chng = new DocEvent(offs, len, DocumentEvent.EventType.REMOVE);

			fireRemoveUpdate(chng);
	}

	@Override
	public void insertString(int offset, String str, AttributeSet a) throws BadLocationException {
		if ((str == null) || (str.length() == 0)) {
			return;
		}
		myText.insert(offset, str);
		DocEvent e = new DocEvent(offset, str.length(), DocumentEvent.EventType.INSERT);
		fireInsertUpdate(e);
	}

	@Override
	public String getText(int offset, int length) throws BadLocationException {
		return myText.substring(offset, offset + length);
	}

	char[] achar = new char[0];
	@Override
	public void getText(int offset, int length, Segment txt) throws BadLocationException {
		return;
//		System.out.println("getText");
//		if (length > 0) {
//			if (achar.length < offset + length) 
//				achar = new char[offset + length * 2];
//			if (txt.array != achar)
//				txt.array = achar;
//			myText.getChars(offset, offset + length, achar, offset);
//		}
//		txt.offset = offset;
//		txt.count = length;
	}

	@Override
	public Position getStartPosition() {
		return null;
//		System.out.println("getstartpos");
//		return new Position() {
//
//			@Override
//			public int getOffset() {
//				return 0;
//			}
//			
//		};
	}

	@Override
	public Position getEndPosition() {
		return null;
//		return new Position() {
//
//			@Override
//			public int getOffset() {
//				return myText.length();
//			}
//			
//		};
	}

	@Override
	public Position createPosition(int offs) throws BadLocationException {
		return null;
//		return new Position() {
//
//			@Override
//			public int getOffset() {
//				return offs;
//			}
//			
//		};
	}

	@Override
	public Element[] getRootElements() {
		return null;
//		return new Element[] {root};
	}

	@Override
	public Element getDefaultRootElement() {
		return null;
//		return root;
	}



	@Override
	public void render(Runnable r) {
	}

	protected void fireInsertUpdate(DocumentEvent e) {
		try {
			Object[] listeners = listenerList.getListenerList();
			for (int i = listeners.length - 2; i >= 0; i -= 2) {
				if (listeners[i] == DocumentListener.class) {
					((DocumentListener) listeners[i + 1]).insertUpdate(e);
				}
			}
		} finally {
//            notifyingListeners = false;
		}
	}
	protected void fireRemoveUpdate(DocumentEvent e) {
		try {
			Object[] listeners = listenerList.getListenerList();
			for (int i = listeners.length - 2; i >= 0; i -= 2) {
				if (listeners[i] == DocumentListener.class) {
					((DocumentListener) listeners[i + 1]).removeUpdate(e);
				}
			}
		} finally {
//            notifyingListeners = false;
		}
	}
	protected EventListenerList listenerList = new EventListenerList();
	public <T extends EventListener> T[] getListeners(Class<T> listenerType) {
		return listenerList.getListeners(listenerType);
	}


}
