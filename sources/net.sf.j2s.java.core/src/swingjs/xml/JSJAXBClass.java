package swingjs.xml;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import javax.xml.bind.annotation.adapters.XmlAdapter;
import javax.xml.namespace.QName;

import swingjs.api.Interface;

class JSJAXBClass {

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
	List<JSJAXBField> fields = new ArrayList<JSJAXBField>();
	QName qname = new QName("", "", "");
	private Map<String, JSJAXBField> fieldMap = new Hashtable<String, JSJAXBField>();

	boolean isAnonymous;
	JSJAXBField field;
	QName qualifiedTypeName;

	JSJAXBField valueField;

	JSJAXBClass(Class<?> javaClass, Object javaObject) {
		checkC$__ANN__(this, javaClass, javaObject);
	}

	/**
	 * 
	 * @param jsjaxbClass null to just check
	 * @param javaClass
	 * @param javaObject
	 * @return
	 */
	@SuppressWarnings("unused")
	private static boolean checkC$__ANN__(JSJAXBClass jsjaxbClass, Class<?> javaClass, Object javaObject) {
		boolean isTop = true;
		while (javaClass != null) {

//			C$.__ANN__ = [[null,'XmlAccessorType',['@XmlAccessorType(XmlAccessType.FIELD)','@XmlType(name="MoreComplex")']],
//			              ['ca','String',['@XmlValue']],
//			              ['cb','String',['@XmlAttribute(namespace="www.jalview.org2")']],
//			              ['bytes','[array]',['@XmlAttribute']]];

			Object clazz = (/** @j2sNative javaClass.$clazz$ || */
			null);
			if (clazz == null)
				break;
			Object[][][] jsdata = (/** @j2sNative clazz.__ANN__ || */
			null);
			String className = (/** @j2sNative clazz.__CLASS$NAME__ || clazz.__CLASS_NAME__ || */
			null);

			if (!isTop) {
				className = null;
			}
			isTop = false;
			if (jsdata != null) {
				if (jsjaxbClass == null)
					return true;
				jsjaxbClass.addTypeData(jsdata, className, javaObject);
			}
			javaClass = javaClass.getSuperclass();
		}
		return false;
	}

	JSJAXBClass addTypeData(Object[][][] jsdata, String className, Object javaObject) {
		for (int i = 0; i < jsdata.length; i++) {
			JSJAXBField field = new JSJAXBField(this, jsdata[i], javaObject, fields.size(), propOrder);
			addField(field);
		}

		for (int i = propOrder.size(); --i >= 0;) {
			String prop = propOrder.get(i);
			JSJAXBField field = fieldMap.get(prop);
			// annotations may only show up in @XmlType:propOrder
			if (field == null) {
				addField(new JSJAXBField(this,
						new Object[][] { new Object[] { prop, null, null, null }, new Object[] { "@XmlElement" } },
						javaObject, fields.size(), null));
			}
		}
		return this;
	}

	private void addField(JSJAXBField field) {
		fields.add(field);
		if (field.javaName != null)
			fieldMap.put(field.javaName, field);
	}

	JSJAXBField getFieldFromJavaName(String javaName) {
		return fieldMap.get(javaName);
	}

	static String getXmlNameFromClassName(String className) {
		className = className.substring(className.lastIndexOf(".") + 1);
		if (className.indexOf("$") > 1) // inner static class
			className = className.substring(className.indexOf("$") + 1);
		return className;
	}

	final static Map<String, JSJAXBField> bindingMap = new Hashtable<String, JSJAXBField>();
	// private static boolean hasNull(Object[] list) {
	// for (int i = list.length; --i >= 0;)
	// if (list[i] == null)
	// return true;
	// return false;
	// }
	//
	// private static boolean hasNull(List<?> list) {
	// for (int i = list.size(); --i >= 0;)
	// if (list.get(i) == null)
	// return true;
	// return false;
	// }
	//
	public String defaultNamespace;
	private String[] seeAlso;

	void prepareForUnmarshalling(String defaultNamespace) {
		this.defaultNamespace = defaultNamespace;
		if (seeAlso != null) {
			for (int i = 0; i < seeAlso.length; i++) {
				try {
					JSJAXBClass jaxbClass = new JSJAXBClass(Class.forName(seeAlso[i]), null);
					bindQNamesForField(jaxbClass.fields.get(0));
					System.out.println("JSJAXBClass seeAlso: " + seeAlso[i]);
				} catch (ClassNotFoundException e) {
					System.out.println("JSJAXBClass[" + i + "] not found: " + seeAlso[i]);
				}
			}
		}
		for (int i = 0; i < fields.size(); i++) {
			bindQNamesForField(fields.get(i));
		}
	}

	private void bindQNamesForField(JSJAXBField field) {
		bindQName(field.qualifiedName, field);
		bindQName(field.qualifiedWrapName, field);
		bindQName(field.qualifiedTypeName, field);
	}
	
	private void bindQName(QName q, JSJAXBField field) {
		if (q == null)
			return;
		bindingMap.put(q.getLocalPart(), field);
		String namespace = q.getNamespaceURI();
		if (namespace.length() == 0)
			namespace = defaultNamespace;
		if (namespace != null)
			bindingMap.put(namespace + ":" + q.getLocalPart(), field);
		//System.out.println("JSJAXBClass#binding " + namespace + ":" + q.getLocalPart() + "->" + field.javaName);
	}

	JSJAXBField getFieldFromQName(QName qName) {
		String key = qName.getNamespaceURI() + ":" + qName.getLocalPart();
		JSJAXBField f = bindingMap.get(key);
		return f; 
	}

	boolean hasElements() {
		for (int i = 0, n = fields.size(); i < n; i++)
			if (!fields.get(i).isAttribute)
				return true;
		return false;
	}

	public void setSeeAlso(String[] seeAlso) {
		this.seeAlso = seeAlso;
	}

	public boolean mustUnmarshal(JSJAXBField field) {
		if (field.isSimpleType())
			return false;
		return isMarshallable(field);
	}

	final static Map<String, Boolean> classMap = new Hashtable<String, Boolean>();

	static boolean isMarshallable(JSJAXBField field) {
		boolean isMarshallable = false;
		String javaClassName = field.javaClassName;
		try {
			if (classMap.containsKey(javaClassName))
				return classMap.get(javaClassName).booleanValue();
			isMarshallable = (checkC$__ANN__(null, Class.forName(javaClassName), null));
		} catch (ClassNotFoundException e) {
			System.out.println("JSJAXBClass: class was not found: " + javaClassName);
			e.printStackTrace();
		} finally {
		classMap.put(javaClassName, Boolean.valueOf(isMarshallable));
		}
		return isMarshallable;
	}

	static Map<String, JSJAXBClass> knownClasses = new Hashtable<>();

	static JSJAXBClass newInstance(Class<?> javaClass, Object javaObject) {
		String name = javaClass.getCanonicalName();
		JSJAXBClass jjc = knownClasses.get(name);
		if (jjc == null) {
			jjc = new JSJAXBClass(javaClass, javaObject);
			knownClasses.put(name, jjc);
			return jjc;
		}
		jjc.clearUnmarshalling(javaObject);
		return jjc;
	}

	private void clearUnmarshalling(Object javaObject) {
		for (int i = fields.size(); --i >= 0;) {
			fields.get(i).clear(javaObject);
		}
	}

	static boolean needsMarshalling(Object value) {
		if (value == null)
			return false;
		Class<?> cl = value.getClass();
		return (/** @j2sNative (cl.$clazz$ ? !!cl.$clazz$.__ANN__ : 0) || */
		false);
	}

	private static final Map<String, String> marshallerNamespacePrefixes = new Hashtable<String, String>();
	private static int prefixIndex = 1;

	/**
	 * Prepend @Xml......: to the tag name to avoid internal collision when
	 * combining all annotations into one.
	 * 
	 * @param tag
	 * @return
	 */
	static String getNamespacePrefix(String namespace) {
		String prefix = marshallerNamespacePrefixes.get(namespace);
		if (prefix == null)
			marshallerNamespacePrefixes.put(namespace, prefix = "ns" + (++prefixIndex));
		return prefix;
	}

	private final static Map<String, XmlAdapter> adapterMap = new HashMap<String, XmlAdapter>();

	static XmlAdapter getAdapter(String adapterClass) {
		XmlAdapter adapter = adapterMap.get(adapterClass);
		if (adapter == null && !adapterMap.containsKey(adapterClass)) {
			adapterMap.put(adapterClass, adapter = (XmlAdapter) Interface.getInstance(adapterClass, false));
		}
		return adapter;
	}

}
