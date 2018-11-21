package test;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;
import java.util.GregorianCalendar;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;
import javax.xml.stream.FactoryConfigurationError;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamReader;

import test.jaxb.Root_ORDERED;
import test.jaxb.Root_ORDERED.SomewhatComplex;

/**
 * tests:
 * 
 *  propOrder
 *  
 *  JAXBContext.newInstance(packageName);
 *  
 *  subclasses
 *  
 *  name={expression}
 *  
 *  arrays
 *  
 *  dates
 *  
 *  
 *  
 *  
 * @author hansonr
 *
 */
public class Test_JAXB_ORDERED extends Test_ {

	public static void main(String[] args) {
		JAXBContext jc;
		try {
			jc = JAXBContext.newInstance("test.jaxb");
			Root_ORDERED root = new Root_ORDERED("test");
			Marshaller marshaller = jc.createMarshaller();
			marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			marshaller.marshal(root, bos);
			String s = null;
			try {
				s = new String(bos.toByteArray(), "UTF-8");
				System.out.println(s);
				Unmarshaller unmarshaller = jc.createUnmarshaller();
				ByteArrayInputStream is = new ByteArrayInputStream(s.getBytes("UTF-8"));
				XMLStreamReader streamReader;
				Root_ORDERED r = null;

				try {
					streamReader = XMLInputFactory.newInstance().createXMLStreamReader(is);
					r = (Root_ORDERED) unmarshaller.unmarshal(streamReader, Root_ORDERED.class).getValue();
				} catch (XMLStreamException | FactoryConfigurationError e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

				r.validate();
				
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}

			System.out.println("Test_JAXB_ORDERED OK");
		} catch (JAXBException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}