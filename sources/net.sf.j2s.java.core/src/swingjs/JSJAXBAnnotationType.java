package swingjs;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import javax.xml.namespace.QName;

import javajs.util.PT;

class JSJAXBAnnotationType {

//		C$.__ANN__ = [
//		              [null,'XmlRootElement','@XmlRootElement(name="RootOrdered",namespace="www.jalview.org")']
//		             ,[null,'XmlAccessorType','@XmlAccessorType(XmlAccessType.FIELD)']
//		             ,[null,'XmlType','@XmlType(propOrder={"c","b","a"})']
//		            ];

	final static int TYPE_PUBLIC_MEMBER = 0;
	final static int TYPE_FIELD = 1;
	final static int TYPE_PROPERTY = 2;

	int accessorType = TYPE_PUBLIC_MEMBER;

	List<String> propOrder = new ArrayList<String>();
	List<JSJAXBAnnotation> annotations = new ArrayList<JSJAXBAnnotation>();
	QName qname;
	private Map<String, JSJAXBAnnotation> annotationMap = new Hashtable<String, JSJAXBAnnotation>();

	private boolean isAnonymous;
	public JSJAXBAnnotation annotation;

	public JSJAXBAnnotationType addTypeData(String[][] jsdata, String className, Object javaObject) {
		for (int i = 0; i < jsdata.length; i++) {
			JSJAXBAnnotation a = new JSJAXBAnnotation(jsdata[i], javaObject, annotations.size());
			if (a.javaName == null) {
				switch (a.tagName) {
				case "@XmlRootElement":
					qname = a.qualifiedName;
					if (qname.getLocalPart().length() == 0)
						qname = new QName(qname.getNamespaceURI(), getXmlNameFromClassName(className),
								qname.getPrefix());
					break;
				case "@XmlAccessorType":
					if (a.data.indexOf("FIELD") >= 0)
						accessorType = TYPE_FIELD;
					else if (a.data.indexOf("MEMBER") >= 0)
						accessorType = TYPE_PUBLIC_MEMBER;
					else if (a.data.indexOf("PROPERTY") >= 0)
						accessorType = TYPE_PROPERTY;
					break;
				case "@XmlType":
					String name = a.attr.get("name");
					if (name != null) {
						if (name.length() == 0)
							isAnonymous = true;
						else
							qname = a.qualifiedName;
					}
					String order = a.attr.get("propOrder");
					if (order != null) {
						int[] pt = new int[1];
						while (pt[0] >= 0) {
							String prop = PT.getQuotedStringNext(order, pt).trim();
							if (prop.length() == 0)
								break;
							propOrder.add(prop);
						}
					}
					break;
				case "@XmlSeeAlso":
//					 @XmlSeeAlso({Dog.class,Cat.class})
//					 class Animal {}
//					 class Dog extends Animal {}
//					 class Cat extends Animal {}
					break;
				default:
					System.out.println("JSJAXBMarshaller root annotation ignored:" + a.text);
					break;
				}
			} else {
				if (qname == null)
					qname = new QName("", getXmlNameFromClassName(className),"");
				addAnnotation(a);
			}
		}

		if (propOrder.size() > 0) {
			for (int i = propOrder.size(); --i >= 0;) {
				String prop = propOrder.get(i);
				JSJAXBAnnotation a = annotationMap.get(prop);
				if (a == null) {
					addAnnotation(
							new JSJAXBAnnotation(new String[] { prop, null, "@XmlElement" }, javaObject, annotations.size()));
				} else if (!a.tagName.equals("@XmlAttribute")) {
					a.tagName = "@XmlElement";
					annotationMap.put(a.javaName + a.tagName, a);
				}
			}
		}
		return this;
	}

	private void addAnnotation(JSJAXBAnnotation a) {
		annotations.add(a);
		annotationMap.put(a.javaName + a.tagName, a);
		JSJAXBAnnotation a0 = getAnnotationFromJavaName(a.javaName);
		if (a0 == null)
			annotationMap.put(a.javaName, a);
		else
			a0.addAnnotation(a);
	}

	JSJAXBAnnotation getAnnotationFromJavaName(String name) {
		return annotationMap.get(name);
	}

	static String getXmlNameFromClassName(String className) {
		className = className.substring(className.lastIndexOf(".") + 1);
		if (className.indexOf("$") > 1) // inner static class
			className = className.substring(className.indexOf("$") +  1);
		return className;
	}

}
