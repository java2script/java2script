package test;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;
import java.util.Date;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlRegistry;
import test.jaxb.Root_FIELD;

@XmlRegistry
public class Test_JAXB_Obj extends Test_ {

//    @XmlElementDecl(namespace = "www.jalview.org", name = "Root")
//    public static JAXBElement<Root_FIELD> createRootModel(Root_FIELD value) {
//        return new JAXBElement<Root_FIELD>(new QName("www.jalview.org", "Root"), Root_FIELD.class, null, value);
//    }

	public static void main(String[] args) {
        JAXBContext jc;
		try {
			jc = JAXBContext.newInstance(Root_FIELD.class);
			
			long x = 1234567899123456L;
			int y = (int) x;
			Date d = new Date(1373360175539L);
			System.out.println(d);
			
	        Root_FIELD root = new Root_FIELD(true);
			System.out.println("c is " + root.C());
			System.out.println("getPropertyC is " + root.getPropertyC());
			System.out.println("DEFVAL is " + root.DEFVAL);
			System.out.println("Sym is " + root.Ang);
	        Marshaller marshaller = jc.createMarshaller();
	        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
	        ByteArrayOutputStream bos = new ByteArrayOutputStream();	        
//	        marshaller.marshal(createRootModel(root), bos);
	        marshaller.marshal(root, bos);
	        String s = null;
			try {
				s = new String(bos.toByteArray(), "UTF-8");
		        System.out.println(s);
//		        s = s.replace("</ns2:Root", "<DEFVAL></DEFVAL></ns2:Root");
//		        System.out.println(s);
		        Unmarshaller unmarshaller = jc.createUnmarshaller();
		        ByteArrayInputStream is = new ByteArrayInputStream(s.getBytes("UTF-8"));
				Root_FIELD r = (Root_FIELD) unmarshaller.unmarshal(is);
				assert(r.getPropertyAng().equals("\u212B"));
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
	        System.out.println("Test_JAXB_Obj OK");
		} catch (JAXBException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
 
    }
}