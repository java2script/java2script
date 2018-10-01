package test;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;

import test.jaxb.PhoneNumber;

public class Test_JAXB2 extends Test_ {

	public static void main(String[] args) {
        JAXBContext jc;
		try {
			jc = JAXBContext.newInstance(PhoneNumber.class);
	        PhoneNumber phoneNumber = new PhoneNumber();
	        phoneNumber.setType("work");
	        phoneNumber.setNumber("555-1234");
	 
	        Marshaller marshaller = jc.createMarshaller();
	        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
	        marshaller.marshal(phoneNumber, System.out);
	        System.out.println("Test_JAXB2 OK");
		} catch (JAXBException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
 
    }
}