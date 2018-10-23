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

import test.jaxb.Root_ORDERED;

@XmlRegistry
public class Test_JAXB_ORDERED extends Test_ {

//    @XmlElementDecl(namespace = "www.jalview.org", name = "Root")
//    public static JAXBElement<Root_ORDERED> createRootModel(Root_ORDERED value) {
//        return new JAXBElement<Root_ORDERED>(new QName("www.jalview.org", "Root"), Root_ORDERED.class, null, value);
//    }

	public static void main(String[] args) {
        JAXBContext jc;
		try {
			jc = JAXBContext.newInstance(Root_ORDERED.class);			
	        Root_ORDERED root = new Root_ORDERED();
	        root.f5[0] = 1.25f;
	        root.f5[1] = new test.jaxb.Obj();
	        root.setCreationDate(now());
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
				
		        Root_ORDERED r = (Root_ORDERED) unmarshaller.unmarshal(is);
				
				System.out.println(r.getCreationDate());
				System.out.println(r.f5[0]);
				System.out.println(((test.jaxb.Obj) r.f5[1]).obj1);
 			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			
	        System.out.println("Test_JAXB_ORDERED OK");
		} catch (JAXBException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
 
    }

	private static XMLGregorianCalendar now() {
		try {
			return DatatypeFactory.newInstance().newXMLGregorianCalendar(new GregorianCalendar());
		} catch (DatatypeConfigurationException e) {
			return null;
		}
	}
}