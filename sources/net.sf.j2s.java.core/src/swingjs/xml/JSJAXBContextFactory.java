package swingjs.xml;

import java.util.Map;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBContextFactory;
import javax.xml.bind.JAXBException;

public class JSJAXBContextFactory implements JAXBContextFactory {

	@Override
	public JAXBContext createContext(Class<?>[] classes, Map<String, ?> properties) throws JAXBException {
		return new JSJAXBContext(classes, properties);
	}

	@Override
	public JAXBContext createContext(String contextPath, ClassLoader classLoader, Map<String, ?> properties)
			throws JAXBException {
		return new JSJAXBContext(contextPath, classLoader, properties);
	}

}