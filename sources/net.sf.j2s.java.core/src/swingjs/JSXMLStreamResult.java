package swingjs;

import java.io.File;
import java.io.OutputStream;
import java.io.Writer;

public class JSXMLStreamResult {
    private String systemId;
    private OutputStream outputStream;
    private Writer writer;
    
	public JSXMLStreamResult() {
    }

	public JSXMLStreamResult(OutputStream os) {
        setOutputStream(os);
    }

    public JSXMLStreamResult(Writer writer) {
        setWriter(writer);
    }

    public JSXMLStreamResult(String id) {
        this.systemId = id;
    }

    public JSXMLStreamResult(File f) {
        setSystemId(f.toURI().toASCIIString());
    }

    public void setOutputStream(OutputStream outputStream) {
        this.outputStream = outputStream;
    }

    public OutputStream getOutputStream() {
        return outputStream;
    }

    public void setWriter(Writer writer) {
        this.writer = writer;
    }

    public Writer getWriter() {
        return writer;
    }

    public void setSystemId(String systemId) {
        this.systemId = systemId;
    }

    public void setSystemId(File f) {
        this.systemId = f.toURI().toASCIIString();
    }

    public String getSystemId() {
        return systemId;
    }

}
