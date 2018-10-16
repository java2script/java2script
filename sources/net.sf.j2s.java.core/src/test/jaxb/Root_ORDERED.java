package test.jaxb;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlID;
import javax.xml.bind.annotation.XmlList;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.XmlValue;
import javax.xml.bind.annotation.adapters.HexBinaryAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import javax.xml.datatype.XMLGregorianCalendar;

// adapted source: http://blog.bdoughan.com/2011/06/using-jaxbs-xmlaccessortype-to.html


@XmlRootElement(name="RootOrdered",namespace="www.jalview.org")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {
	    "c",
	    "b",
	    "a",
	    "id",
	    "creationDate",
	    "cx",
	    "slist",
	    "bytes64",
	    "byteshex",
	    "ilist",
	    "Ilist",
	    "hm",
	    "list"
	})
public class Root_ORDERED {
	
	
	@XmlAccessorType(XmlAccessType.FIELD)
	@XmlType(namespace="st.Olaf")
	private static class SomewhatComplex {

		@XmlValue
		String ca = "c\"<>b& \u212B";
				
		@XmlAttribute(namespace="www.jalview.org2")
		String cb = "c\"<>b& \u212B";

		@XmlAttribute
		byte[] bytes = new byte[] {(byte) 100, (byte) 101};


	}

	@XmlElementWrapper(name="list1")
	public List<Object> list = new ArrayList<>();

	{
		list.add("TESTING");
		list.add("null"); 
		list.add(new SomewhatComplex());
		list.add(Boolean.TRUE);
		list.add(Byte.valueOf((byte)1));
		list.add(Short.valueOf((short)2));
		list.add(Integer.valueOf(3));
		list.add(Long.valueOf(4));
		list.add(Float.valueOf(6.6f));
		list.add(Double.valueOf(8.8));
		list.add(new BigInteger("12345678910111213141516"));
		// fails in JAXB-Java: list.add(new int[] {3, 5, 7, 9});
	}

	@XmlElementWrapper(name="hm1")
	public HashMap<String, Object> hm = new HashMap<>();

	{
		hm.put("testing", "TESTING");
		hm.put("null", null); 
		hm.put("map",  new SomewhatComplex());
		
	}
	
	// does not work in JAXB: @XmlSchemaType(name="hexBinary")
	@XmlJavaTypeAdapter(HexBinaryAdapter.class)
	@XmlAttribute
	byte[] byteshex = new byte[] {(byte) 100, (byte) 101};

	@XmlAttribute
	@XmlSchemaType(name="base64Binary")
	byte[] bytes64 = new byte[] {(byte) 100, (byte) 101};

	
	@XmlElement(namespace="www.jalview.org3")
	private SomewhatComplex cx = new SomewhatComplex();


	@XmlAttribute(name="extra")
	private String extra = "extra";

	@XmlAttribute(name="nil")
	private String nil = null;
	
	private String a = "a", b = "b", c = "c";
	
	@XmlAttribute
	private String ok = "ok";

	@XmlID
	@XmlAttribute
	private String id = "id";
	
//	@XmlElementWrapper(name="slists")
	@XmlElement(name="s",nillable=true)
	Object[] slist = new String[] {"a", "b" , null};
	
	@XmlList
	@XmlElement(name="i")
	int[] ilist = new int[] {1,2,3};
	
	@XmlList
	@XmlElement(name="I",nillable=true)
	Integer[] Ilist = new Integer[] {null, Integer.valueOf(2), null};
	
	
    @XmlElement
    @XmlSchemaType(name = "date")
    protected XMLGregorianCalendar creationDate;

    /**
     * Gets the value of the creationDate property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getCreationDate() {
        return creationDate;
    }

    /**
     * Sets the value of the creationDate property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setCreationDate(XMLGregorianCalendar value) {
        this.creationDate = value;
    }

	
}