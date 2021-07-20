package test.jaxb;

import java.util.Date;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

// adapted source: http://blog.bdoughan.com/2011/06/using-jaxbs-xmlaccessortype-to.html

// "Root" here would conflict with Root_FIELD 
@XmlRootElement(name = "RootPr", namespace = "www.jalview.org")
@XmlAccessorType(XmlAccessType.PROPERTY)
//@XmlType(propOrder = {
//	    "D",
//	    "a",
//	    "date",
//	    "propertyC",
//	    "b",
//	    "c",
//	    "publ"
//	})
public class Root_PROPERTY {

	static boolean isCopy = false;

	static final String x = "Date";
	// TODO: DOES NOT WORK @XmlElement(name=x)

	public void toC(String c) {
		this.c = c;
	}

	public String C() {
		return c;
	}

	public String PC() {
		return PropertyC;
	}

	public String pc() {
		return propertyc;
	}

	public String pC() {
		return propertyC;
	}

////////////////////////////////////////////////////

	public String s;
	// ignored -- not initialized

	@XmlTransient
	private String D;
	// ignored - XmlTransient

	private transient int t = 3;
	// ignored - transient

	private Root_FIELD r1;
	// ignored - private

	String Ang = "\u212B";
	// <Ang>[3 bytes here]</Ang>
	public String getPropertyAng() {
		// PROPERTY accessor only
		return Ang;
	}
	public void setPropertyAng(String a) {
		Ang = a;
	}

	private int x1;

	public int pi1, pi2, pi3 = 3;
	// ignored - not tagged

	@XmlAttribute
	public int pi1a, pi2a, pi3a = 3;
//<ns2:Root xmlns:ns2="www.jalview.org" pi1A="0" pi2A="0" pi3A="3">

	public boolean b1;
	// ignored - not tagged

	public String a;
	// ignored - not tagged - OK to be public for PROPERTY
	public String getA() {
		// PROPERTY accessor only
		return "getA";
	}
	public void setA(String a) {
		this.a = "getA";
	}
	public String getPropertyA() {
		// PROPERTY accessor only
		return "getPropertyA";
	}
	public void setPropertyA(String a) {
		this.a = "setPropertyA";
	}

	public String b = "b";
	// ignored - not tagged
	private String getPropertyB() {
		// PROPERTY accessor only
		return "getPropertyB";
	}
	public void setPropertyB(String b) {
		this.b = b;
	}

	private String c = "c0";
	// ignored - not tagged
	private String getC() {
		// PROPERTY accessor only
		return "getC";
	}
	private void setC(String c) {
		this.c = "setC";
	}

	private String d = "d_";
	// ignored - not tagged
	public String getD() {
		// PROPERTY accessor only
		return "getD";
	}
	public void setD(String d) {
		D = "setD";
	}

	public Date date = new Date();
	// ignored - not tagged

///// capitalization tests /////
	
	private String PropertyCpriv = "PropertyCpriv";
	// ignored - not tagged
	
	private String PropertyC = "PropertyC0";
	// ignored - not tagged
	
	@XmlTransient
	private String propertyC = "propertyC0";
	@XmlElement
	public String getproPERtyC() {
//	    <proPERtyC>...</proPERtyC>
// (at end)
		return "getproPERtyC:" + propertyC + "1";
	}
	public void setproPERtyC(String c) {
		propertyC = c;
		System.out.println("setProPERtyC:" + c);
	}
	public String getPropertyC() {
		// PROPERTY accessor only
		return "getPropertyC:" + propertyC + "1";
	}
	public void setPropertyC(String c) {
		propertyC = c;
		System.out.println("setPropertyC:" + c);
	}

	@XmlTransient
	private String propertyc = "propertyc0";
//	public String getpropertyc() {
//	// (at end)
//    // <propertyc>getpropertyc</propertyc>
//		return "getpropertyc:" + propertyc;
//	}
	public void setpropertyc(String c) {
		//    <propertyc>getPropertyc:propertyc01</propertyc>
		propertyc = c;
		System.out.println("setpropertyc:" + c);
	}
	@XmlElement
	public String getPropertyc() {
		// PROPERTY accessor only
		return "getPropertyc:" + propertyc + 1;
	}
	public void setPropertyc(String c) {
		propertyc = c;
		System.out.println("setPropertyc:" + c);
	}
	
	
///// no field, just get/is/Set
	// after fields, before properties
    // must be flagged with @XmlElement

	@XmlElement
	public boolean isB2() {
		//         <b2>true</b2>
		// after fields, before properties
		return true;
	}
	public void setB2(boolean b) {
	}

	@XmlElement
	public boolean getB3() {
		//         <b3>true</b3>
		// after fields, before properties
		return true;
	}
	public void setB3(boolean b) {
	}

	@XmlElement
	public String getAToBe() {
		//  <AToBe>getAtoBe</AToBe>
		return "getAtoBe";
	}
	public void setAToBe(String a) {
		this.a = a;
	}
	@XmlElement
	public String getPropertyAToBe() {
    //  <propertyAToBe>getPropertyAtoB</propertyAToBe>
		return "getPropertyAtoB";
	}
	public void setPropertyAToBe(String a) {
		this.a = a;
	}

}