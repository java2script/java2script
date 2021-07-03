package test;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import test.jaxb.ObjectFactory;
import test.jaxb.Root_FIELD;
import test.jaxb.Root_ORDERED;

public class Test_JAXB_FIELD extends Test_ {

	public static void main(String[] args) {
        JAXBContext jc;
		try {
			jc = JAXBContext.newInstance(Root_ORDERED.class, Root_FIELD.class);
			
	        Root_FIELD root = new Root_FIELD(false);
			System.out.println("c is " + root.C());
			System.out.println("getPropertyC is " + root.getPropertyC());
			System.out.println("DEFVAL is " + root.DEFVAL);
	        Marshaller marshaller = jc.createMarshaller();
	        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
	        ByteArrayOutputStream bos = new ByteArrayOutputStream();	        
//	        marshaller.marshal(createRootModel(root), bos);
	        marshaller.marshal(new ObjectFactory().createRootField(root), bos);
	        String s = null;
			try {
				s = new String(bos.toByteArray(), "UTF-8");
				
				s = s.replace(">defval</ns8:DEFVAL>","/>");
				s = s.replace(">defval</ns2:DEFVAL>","/>"); // JavaScript
				
		        System.out.println(s);
		        Unmarshaller unmarshaller = jc.createUnmarshaller();
		        ByteArrayInputStream is = new ByteArrayInputStream(s.getBytes("UTF-8"));
				Root_FIELD r = (Root_FIELD) unmarshaller.unmarshal(is);
				r.validate();
//
//				Class<?> c = Test_JAXB_FIELD.class;
//				InputStream ris = c.getResourceAsStream("jaxb/Root_FIELD.xml");
//		        ByteArrayInputStream ris = new ByteArrayInputStream(s.getBytes("UTF-8"));

 			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			
	        System.out.println("Test_JAXB_FIELD OK");
		} catch (JAXBException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
 
    }
}