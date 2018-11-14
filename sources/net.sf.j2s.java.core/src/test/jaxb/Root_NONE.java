package test.jaxb;

import java.util.Date;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

/**
 * Status: marshalling/unmarshalling working perfectly
 * 
 * The NONE accessor type indicates that all attributes and elements must be
 * explicitly indicated.
 * 
 * XmlTransient is the default for fields and methods and so is not necessary.
 * 
 * The transient modifier is irrelevant, because it cannot also be tagged as
 * xmlAttribute or xmlElement.
 * 
 * Private/public is irrelevant.
 * 
 * The actual connection between get/is/set methods and fields is irrelevant, as
 * always.
 * 
 * Capitalization of get/is/set methods must match internally, but as long as
 * they are different -- for example, setC/getC, setc/getc -- they are allowed,
 * but obviously this is a bad idea. Different unmarshallers may take these in
 * different order and mess up. Key is that the XML tag must be different.
 * 
 * @author hansonr
 *
 */
@XmlRootElement(name = "RootNone",namespace="root.element")
@XmlAccessorType(XmlAccessType.NONE)
public class Root_NONE {

	@XmlType(name="")
	static class Inner {
		@XmlElement(namespace="")
		public String innerString = "innerString";
	}
	
	@XmlElement(name="inner_1")
	private Inner inner = new Inner();
	
	public Root_NONE() { 
	
	}
	
	public Root_NONE(String id) {
		Ang = "\u212B";
		toC("c-new");
	}

	public void toC(String c) {
		this.c = c;
	}

	private transient int t = 3;
	// ignored - transient

	private Root_FIELD r1;
	// ignored - not tagged

	@XmlAttribute
	private String Ang = null; 
	// <Ang>[3 bytes here]</Ang>
	public String getPropertyAng() {
		// ignored - not tagged
		return Ang;
	}
	public void setPropertyAng(String a) {
		Ang = a;
	}

	@XmlAttribute(name="pi1a")
	public int pi1a;
	@XmlAttribute(name="pi2a")
	public int pi2a;
	@XmlAttribute(name="pi3a")
	public int pi3a;
//<ns2:Root xmlns:ns2="www.jalview.org" pi1A="0" pi2A="0" pi3A="3">

	// ignored - not tagged
	private String a;
	public String getA() {
		return "getA";
	}
	public void setA(String a) {
		this.a = "setA";
	}

	private String c = "c0";
	@XmlElement
	private String getC() {
		System.out.println("private!getC");
		// ignored - not tagged
		return "getC";
	}
	private void setC(String c) {
		System.out.println("private!setC");
		this.c = "setC";
	}

	public Date date = new Date();
	// ignored - not tagged

///// capitalization tests /////
	
	@XmlElement
	private String propertyC = "propertyC0";
	@XmlElement(name="propc")
	public String getproPERtyC() {
//	    <proPERtyC>...</proPERtyC>
// (at end)
		return "=getproPERtyC:" + propertyC + "1";
	}
	public void setproPERtyC(String c) {
		propertyC = c;
		System.out.println("setProPERtyC:" + c);
	}
	@XmlElement
	public String getpropertyc() {
//	    <proPERtyC>...</proPERtyC>
// (at end)
		return "=getpropertyc:" + propertyC;
	}
	public void setpropertyc(String c) {
		propertyC = c;
		System.out.println("setpropertyc:" + c);
	}

	
///// no field, just get/is/Set
	// after fields, before properties
    // must be flagged with @XmlElement

	@XmlElement
	public boolean isB2() {
		//         <b2>true</b2>
		// after fields, before properties
		System.out.println("isB2()");
		return true;
	}
	public void setB2(boolean b) {
		System.out.println("setB2()");
	}

	public boolean getB3() {
		//         <b2>true</b2>
		// after fields, before properties
		System.out.println("getB3()");
		return true;
	}
	@XmlElement
	public void setB3(boolean b) {
		System.out.println("setB3()");
	}

	@XmlElement
	public String getAToBe() {
		System.out.println("getAToBe");
		//  <AToBe>getAtoBe</AToBe>
		return "getAtoBe";
	}
	public void setAToBe(String a) {
		System.out.println("setAToBe:" + a);
		this.a = a;
	}
	@XmlElement
	public String getPropertyAToBe() {
    //  <propertyAToBe>getPropertyAtoB</propertyAToBe>
		System.out.println("getPropertyAToBe");
		return "=getPropertyAtoB";
	}
	public void setPropertyAToBe(String a) {
		System.out.println("setPropertyAToBe:" + a);
		this.a = a;
	}

}