package javax.xml.bind;

import java.io.File;

public interface Marshaller {

    public static final String JAXB_ENCODING =
        "jaxb.encoding";
    public static final String JAXB_FORMATTED_OUTPUT =
        "jaxb.formatted.output";
    public static final String JAXB_SCHEMA_LOCATION =
        "jaxb.schemaLocation";
    public static final String JAXB_NO_NAMESPACE_SCHEMA_LOCATION =
        "jaxb.noNamespaceSchemaLocation";
    public static final String JAXB_FRAGMENT =
        "jaxb.fragment";

    public void marshal( Object jaxbElement, java.io.OutputStream os )
        throws JAXBException;

    public void marshal( Object jaxbElement, File output )
        throws JAXBException;

    public void marshal( Object jaxbElement, java.io.Writer writer )
        throws JAXBException;

    
    public void setProperty( String name, Object value )
            throws PropertyException;

        public Object getProperty( String name ) throws PropertyException;


}
