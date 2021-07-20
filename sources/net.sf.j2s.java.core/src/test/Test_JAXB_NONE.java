package test;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlRegistry;
import test.jaxb.Root_NONE;

/**
 * see notes in jaxb/Root_NONE.java
 * 
 * @author hansonr
 *
 */
@XmlRegistry
public class Test_JAXB_NONE extends Test_ {

	static {
		System.out.println("te\n\r".split("\\s").length);
	}
	
	public static void main(String[] args) {
		JAXBContext jc;
		try {
			jc = JAXBContext.newInstance(Root_NONE.class);

			Root_NONE root = new Root_NONE("test");
			root.setPropertyAng("?");
			System.out.println("ang=" + root.getPropertyAng());
			System.out.println("getPropertyC is " + root.getproPERtyC());
			Marshaller marshaller = jc.createMarshaller();
			marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			marshaller.marshal(root, bos);
			String s = null;
			System.out.println("marshalled:");
			try {
				s = new String(bos.toByteArray(), "UTF-8");
				System.out.println(s);

				Unmarshaller unmarshaller = jc.createUnmarshaller();

				// Class<?> c = Test_JAXB_NONE.class;
//				InputStream ris = c.getResourceAsStream("jaxb/Root_NONE.xml");
				// s = Rdr.streamToUTF8String(new BufferedInputStream(ris));
				// ByteArrayInputStream ris = new ByteArrayInputStream(s.getBytes("UTF-8"));

				ByteArrayInputStream is = new ByteArrayInputStream(s.getBytes("UTF-8"));
				Root_NONE r = (Root_NONE) unmarshaller.unmarshal(is);
				

				System.out.println("unmarshalled:");
				System.out.println("ang=" + r.getPropertyAng());
				bos = new ByteArrayOutputStream();
				marshaller.marshal(r, bos);
				System.out.println("remarshalled:");
				s = new String(bos.toByteArray(), "UTF-8");
				System.out.println(s);

				System.out.println("ang=" + r.getPropertyAng());

				assert (r.getPropertyAng().equals("?"));
				System.out.println("getPropertyAng[].length is " + r.getPropertyAng().getBytes("utf-8").length);
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			System.out.println("Test_JAXB_NONE OK");
		} catch (JAXBException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
}