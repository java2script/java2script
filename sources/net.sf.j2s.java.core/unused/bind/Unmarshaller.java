package javax.xml.bind;

import java.io.File;
import java.net.URL;

public interface Unmarshaller {

	public Object unmarshal(java.io.InputStream is) throws JAXBException;

	public Object unmarshal(File input) throws JAXBException;

	public Object unmarshal(java.io.Reader reader) throws JAXBException;

	public Object unmarshal(URL url) throws JAXBException;
	
	public void setProperty(String name, Object value) throws PropertyException;

	public Object getProperty(String name) throws PropertyException;


}
