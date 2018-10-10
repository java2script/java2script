package javax.xml.transform.stream;

import java.io.File;
import java.io.OutputStream;
import java.io.Writer;

import javax.xml.transform.Result;

import swingjs.JSXMLStreamResult;

public class StreamResult extends JSXMLStreamResult implements Result {
	
	public StreamResult() {
		super();
    }

	public StreamResult(OutputStream os) {
		super(os);
    }

    public StreamResult(Writer writer) {
		super(writer);
    }

    public StreamResult(String id) {
		super(id);
    }

    public StreamResult(File f) {
		super(f);
    }

}
