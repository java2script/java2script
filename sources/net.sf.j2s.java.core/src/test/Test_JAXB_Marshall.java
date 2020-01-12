package test;

import java.io.ByteArrayOutputStream;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;

public class Test_JAXB_Marshall extends Test_ {

	public static void main(String[] args) {
			test.jaxb.publicmember.PhoneNumber phoneNumber = new test.jaxb.publicmember.PhoneNumber();
	        phoneNumber.setType("work");
	        phoneNumber.number = "555-1234";	 
	        marshal(phoneNumber, true);
			test.jaxb.field.PhoneNumber pnf = new test.jaxb.field.PhoneNumber();
	        pnf.setType("work");
	        pnf.setNumber("555-1234");	 
	        marshal(pnf, false);
			test.jaxb.property.PhoneNumber pnp = new test.jaxb.property.PhoneNumber();
	        pnp.setType("work");
	        pnp.number = "555-1234";	 
	        marshal(pnp, true);
	        System.out.println("Test_JAXB2 OK");
 
    }

	private static void marshal(Object o, boolean isProperty) {
		try {
			JAXBContext jc = JAXBContext.newInstance(o.getClass());
			Marshaller marshaller = jc.createMarshaller();
			marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
			ByteArrayOutputStream os = new ByteArrayOutputStream();
			marshaller.marshal(o, os);
			String xml = new String(os.toString());
			System.out.println(xml);
			assert ((xml.indexOf("(property)") >= 0) == isProperty);
		} catch (JAXBException e) {
			e.printStackTrace();
			assert (false);
		}
	}
}