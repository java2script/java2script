package swingjs;

import javax.swing.event.DocumentEvent;
import javax.swing.text.Document;
import javax.swing.text.Element;

public class JSDocumentEvent implements DocumentEvent {

	private int off;
	private int len;
	private EventType type;
	private JSAbstractDocument doc;

	public JSDocumentEvent(JSAbstractDocument doc, int offs, int len, EventType eventType) {
		this.off = offs;
		this.len = len;
		this.type = eventType;
		this.doc = doc;
	}

	@Override
	public int getOffset() {
		return off;
	}

	@Override
	public int getLength() {
		return len;
	}

	@Override
	public Document getDocument() {
		return doc;
	}

	@Override
	public EventType getType() {
		return type;
	}

	@Override
	public ElementChange getChange(Element elem) {
		JSUtil.notImplemented("");
		return null;
	}

}
