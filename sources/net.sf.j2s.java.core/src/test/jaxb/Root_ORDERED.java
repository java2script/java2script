package test.jaxb;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;
import javax.xml.bind.annotation.XmlID;
import javax.xml.bind.annotation.XmlIDREF;
import javax.xml.bind.annotation.XmlList;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.XmlValue;
import javax.xml.bind.annotation.adapters.HexBinaryAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import javax.xml.datatype.XMLGregorianCalendar;

// adapted source: http://blog.bdoughan.com/2011/06/using-jaxbs-xmlaccessortype-to.html

@XmlSeeAlso({test.jaxb2.Obj.class, test.jaxb.Obj.class})
@XmlRootElement(namespace="root.ordered", name="RootO")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {
		"type",
		"cx",
		"list0",
		"creationDate",
	    "c",
	    "b",
	    "a",
	    "id",
//	    "cxa",
	    "slist",
	    "bytes64",
	    "byteshex",
	    "ilist",
	    "Ilist",
	    "list",
	    "bi","bd",
	    "f","f2","f3","f4","f6","Ilist2","f5",
	    "hm","hm2"
	})
public class Root_ORDERED {

	
	public Root_ORDERED() {
		
	}
	
	public Root_ORDERED(String name) {
		id = name;
		type = CustomerType.NEW_CUSTOMER;	
		list0 = new ArrayList<Object>();
		list0.add(new SomewhatComplex("List"));
		bi = new BigInteger("1234567890123456789012345");
		f = new float[] {1.2f};
		list.add("TESTING");
		list.add("null"); 
		list.add(new SomewhatComplex("idList#1"));
		list.add(Boolean.TRUE);
		list.add(Byte.valueOf((byte)1));
		list.add(Short.valueOf((short)2));
		list.add(Integer.valueOf(3));
		list.add(Long.valueOf(4));
		list.add(Float.valueOf(6.6f));
		list.add(Double.valueOf(8.9));
		list.add(new BigInteger("12345678910111213141516")); 
		// fails in JAXB-Java: list.add(new int[] {3, 5, 7, 9});
		
		hm2 = new HashMap<>();
		hm2.put(Integer.valueOf(-1), "V1");
		hm2.put(Integer.valueOf(-2), null); 
		hm2.put(Integer.valueOf(-3), "V3");

	}

    List<Object> list0; 
	
	BigInteger bi;
	
	BigDecimal bd = new BigDecimal("123.456");
	
	float[] f; 

	float f2 = 1.3f;

	Float[] f3 = new Float[] {1.2f};

	Float f4 = 1.3f;

	Object f6 = new Integer(3);
	
	
	@XmlAccessorType(XmlAccessType.FIELD)
	@XmlType(name="MoreComplex",namespace="st.Olaf")
		public static class SomewhatComplex {
	

		public SomewhatComplex() {
			System.out.println("new somewhatcomplex");
		}
		
		public SomewhatComplex(String id) {
			this.id = "id#" + id;
		}
	
		@XmlID
		@XmlElement
		public String id = "id#SC1";
		
		//@XmlValue
		@XmlElement
		String ca = "c\"<>b& \u212B"; 
	
		@XmlAttribute(namespace="www.jalview.org2")
		String cb = "c\"<>b& \u212B";

		@XmlAttribute
		public byte[] bytes = new byte[] {(byte) 100, (byte) 101};


	}

	
    @XmlElement(namespace="")
    @XmlSchemaType(name = "date")
    protected XMLGregorianCalendar creationDate;


    @XmlElementWrapper(name="list1")
	public List<Object> list = new ArrayList<>();

	// does not work in JAXB: @XmlSchemaType(name="hexBinary")
	@XmlJavaTypeAdapter(HexBinaryAdapter.class)
	@XmlAttribute
	byte[] byteshex = new byte[] {(byte) 100, (byte) 101};

	@XmlAttribute
	@XmlSchemaType(name="base64Binary")
	byte[] bytes64 = new byte[] {(byte) 100, (byte) 101};

	//@XmlIDREF
	//@XmlElement(namespace="www.jalview.org3")
	public SomewhatComplex cx;
	
//
//	@XmlElement(namespace="www.jalview.org3")
//	public SomewhatComplex[] cxa = new SomewhatComplex[] { new SomewhatComplex("1"),  new SomewhatComplex("2")};


	@XmlAttribute(name="extra")
	private String extra = "extra";
	
	@XmlAttribute(name="nil")
	private String nil = null;
	
	@XmlElement
	private String a = "a", b = "b", c = "c";
	
	@XmlAttribute
	private String ok = "ok";

	@XmlID
	@XmlAttribute
	public String id = "id#1";
	
//	@XmlElementWrapper(name="slists")
	@XmlElement(name="s",nillable=true)
	Object[] slist = new String[] {"a", "b" , null};
	
	@XmlList
	@XmlElement(name="i")
	int[] ilist = new int[] {1,2,3};
	
	@XmlList
	@XmlElement(name="I",nillable=true)
	Integer[] Ilist = new Integer[] {null, Integer.valueOf(2), null};
	
	@XmlElement(name="I2",nillable=true)
	Integer[] Ilist2 = new Integer[] {null, Integer.valueOf(2), null};
	
	@XmlElement
	public
	Object[] f5 = new Object[] {null, null };

	@XmlElementWrapper(name="hm1")
	public HashMap<String, Object> hm = new HashMap<>();

	@XmlElementWrapper(name="hm2")
	public HashMap<Object, String> hm2;

	{
		hm.put("testing", "TESTING");
		hm.put("null", null); 
		hm.put("map",  new SomewhatComplex("map"));

	}
	
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

    @XmlAttribute
	public CustomerType type; 
    
    @XmlType(name = "st")
    static class St {
    	
    }
    
    @XmlEnum(String.class)
    private enum CustomerType { 
    	@XmlEnumValue("promo")
    	PROMO_CUSTOMER, 
    	@XmlEnumValue("cust")
    	NEW_CUSTOMER, 
    	@XmlEnumValue("vip")
    	VIP, 
    	@XmlEnumValue("norm")
    	NORMAL
    	}

	
}