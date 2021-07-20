package test;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;

import test.jaxb.Root_PUBLIC_MEMBER;

@XmlRegistry
public class Test_JAXB_PUBLIC_MEMBER extends Test_ {

    @XmlElementDecl(namespace = "www.jalview.org", name = "Root")
    public static JAXBElement<Root_PUBLIC_MEMBER> createRootModel(Root_PUBLIC_MEMBER value) {
        return new JAXBElement<Root_PUBLIC_MEMBER>(new QName("www.jalview.org", "Root"), Root_PUBLIC_MEMBER.class, null, value);
    }

	public static void main(String[] args) {
        JAXBContext jc;
		try {
			jc = JAXBContext.newInstance(Root_PUBLIC_MEMBER.class);
			 
	        Root_PUBLIC_MEMBER root = new Root_PUBLIC_MEMBER();
			System.out.println("c is " + root.C());
			System.out.println("getPropertyC is " + root.getPropertyC());
	        Marshaller marshaller = jc.createMarshaller();
	        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
	        ByteArrayOutputStream bos = new ByteArrayOutputStream();	        
//	        marshaller.marshal(createRootModel(root), bos);
	        marshaller.marshal(root, bos);
	        String s = null;
			try {
				s = new String(bos.toByteArray(), "UTF-8");
		        System.out.println(s);
		        Unmarshaller unmarshaller = jc.createUnmarshaller();
		        ByteArrayInputStream is = new ByteArrayInputStream(s.getBytes("UTF-8"));
				Root_PUBLIC_MEMBER r = (Root_PUBLIC_MEMBER) unmarshaller.unmarshal(is);
				assert(r.getPropertyAng().equals("\u212B"));
				System.out.println("PropertyC is " + r.PC());
				System.out.println("propertyc is " + r.pc());
				System.out.println("propertyC is " + r.pC());
				System.out.println("getPropertyAng[].length is " + r.getPropertyAng().getBytes("utf-8").length);
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
	        System.out.println("Test_JAXB_PUBLIC_MEMBER OK");
		} catch (JAXBException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
 
    }
}