package test;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;
import java.util.Date;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;

import test.jaxb.Root_subclass;

@XmlRegistry
public class Test_JAXB_subclass extends Test_ {

    @XmlElementDecl(namespace = "www.jalview.org", name = "Root")
    public static JAXBElement<Root_subclass> createRootModel(Root_subclass value) {
        return new JAXBElement<Root_subclass>(new QName("www.jalview.org", "Root"), Root_subclass.class, null, value);
    }

	public static void main(String[] args) {
        JAXBContext jc;
		try {
			jc = JAXBContext.newInstance(Root_subclass.class);
			
			long x = 1234567899123456L;
			int y = (int) x;
			Date d = new Date(1373360175539L);
			System.out.println(d);
			
	        Root_subclass root = new Root_subclass();
			System.out.println("c is " + root.C());
			System.out.println("getPropertyC is " + root.getPropertyC());
			System.out.println("DEFVAL is " + root.DEFVAL);
	        Marshaller marshaller = jc.createMarshaller();
	        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
	        ByteArrayOutputStream bos = new ByteArrayOutputStream();	        
//	        marshaller.marshal(createRootModel(root), bos);
	        marshaller.marshal(root, bos);
	        String s = null;
			try {
				s = new String(bos.toByteArray(), "UTF-8");
//		        s = s.replace("</ns2:Root", "<DEFVAL></DEFVAL></ns2:Root");
		        System.out.println(s);
		        Unmarshaller unmarshaller = jc.createUnmarshaller();
		        ByteArrayInputStream is = new ByteArrayInputStream(s.getBytes("UTF-8"));
				Root_subclass r = (Root_subclass) unmarshaller.unmarshal(is);
				assert(r.getPropertyAng().equals("\u212B"));
				System.out.println("PropertyC is " + r.PC());
				System.out.println("propertyc is " + r.pc());
				System.out.println("propertyC is " + r.pC());
				System.out.println("getPropertyAng[].length is " + r.getPropertyAng().getBytes("utf-8").length);
				System.out.println("DEFVAL is " + r.DEFVAL);
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
	        System.out.println("Test_JAXB_subclass OK");
		} catch (JAXBException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
 
    }
}