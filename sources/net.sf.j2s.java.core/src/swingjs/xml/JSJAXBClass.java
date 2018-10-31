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

//	C$.__ANN__ = [[[null,'test.jaxb.Root_ORDERED.SomewhatComplex'],['@XmlAccessorType(XmlAccessType.FIELD)','@XmlType(name="MoreComplex",namespace="st.Olaf")']],
//	              [['id','String'],['@XmlID','@XmlElement']],
//	              [['ca','String'],['@XmlElement']],
//	              [['cb','String'],['@XmlAttribute(namespace="www.jalview.org2")']],
//	              [['bytes','byte[]'],['@XmlAttribute']]];
//	            })()

	final static int TYPE_NONE = 0;
	final static int TYPE_FIELD = 1;
	final static int TYPE_PUBLIC_MEMBER = 2;
	final static int TYPE_PROPERTY = 3;

	/**
	 * this class's accessorType, which is not implemented yet. We need explicit
	 * propOrder or XmlAttribute or XmlElement.
	 */
	int accessorType = TYPE_PUBLIC_MEMBER;

	private boolean isMarshaller;

	QName qname = new QName("", "##default", "");
	QName qualifiedTypeName;

	/**
	 * for the root, null, but for fields that need unmarshalling, the field that
	 * is being filled by this unmarshalling 
	 */
	JSJAXBField tagField;

	/**
	 * from XmlType(name=""), but not used
	 */
	boolean isAnonymous; 
	
	/**
	 * XmlIDREF 
	 */
	boolean isXmlIDREF;
	JSJAXBField xmlIDField;
	
	boolean isEnum;
	
	List<String> propOrder = new ArrayList<String>();
	List<JSJAXBField> fields = new ArrayList<JSJAXBField>();
	
	private Map<String, JSJAXBField> fieldMap = new Hashtable<String, JSJAXBField>();

	/**
	 * holds the enum name/value pairs for marshaller and unmarshaller
	 */
	Map<Object, Object> enumMap;
	String enumClassType;

	JSJAXBField xmlValueField;
	String defaultNamespace;
	String[] seeAlso;
	final Map<String, JSJAXBField> unmarshallerFieldMap = new Hashtable<String, JSJAXBField>();
	private Class<?> javaClass;
	
	private final static Map<String, String> marshallerNamespacePrefixes = new Hashtable<String, String>();
	private final static Map<String, XmlAdapter> adapterMap = new HashMap<String, XmlAdapter>();

	static void clearStatics() {
		prefixIndex = 1;
		marshallerNamespacePrefixes.clear();
		adapterMap.clear();
	}

	JSJAXBClass(Class<?> javaClass, Object javaObject, boolean isXmlIDREF, boolean isMarshaller) {
		this.isMarshaller = isMarshaller;
		this.javaClass = javaClass;
		checkC$__ANN__(this, javaClass, javaObject, isXmlIDREF);
		this.isXmlIDREF = isXmlIDREF;
	}

	/**
	 * 
	 * @param jsjaxbClass null to just check
	 * @param javaClass
	 * @param javaObject
	 * @return
	 */
	@SuppressWarnings("unused")
	static boolean checkC$__ANN__(JSJAXBClass jsjaxbClass, Class<?> javaClass, Object javaObject, boolean isXmlIDREF) {
		boolean isTop = true;
		while (javaClass != null) {

//			C$.__ANN__ = [[null,'XmlAccessorType',['@XmlAccessorType(XmlAccessType.FIELD)','@XmlType(name="MoreComplex")']],
//			              ['ca','String',['@XmlValue']],
//			              ['cb','String',['@XmlAttribute(namespace="www.jalview.org2")']],
//			              ['bytes','[array]',['@XmlAttribute']]];

			Object clazz = (/** @j2sNative javaClass.$clazz$ || */ null);
			if (clazz == null)
				break;
			Object[][][] jsdata = (/** @j2sNative clazz.__ANN__ || */ null);
			String className = (/** @j2sNative clazz.__CLASS$NAME__ || clazz.__CLASS_NAME__ || */ null);
			
			if (!isTop) {
				className = null;
			}
			if (jsdata != null) {
				if (jsjaxbClass == null)
					return true;
				jsjaxbClass.addTypeData(jsdata, clazz, javaObject);
			}
			isTop = false;
			javaClass = javaClass.getSuperclass();
		}
		return false;
	}

	JSJAXBClass addTypeData(Object[][][] jsdata, Object clazz, Object javaObject) {
		int n = (javaObject == null ? 1 : jsdata.length);
		for (int i = fields.size() == 0 ? 0 : 1; i < n; i++) {
			JSJAXBField field = new JSJAXBField(this, jsdata[i], clazz, javaObject, fields.size(), propOrder);
				addField(field);
		}
//		if (isMarshaller)
//			processPropOrder(javaObject);
		return this;
	}

//	private void processPropOrder(Object javaObject) {
//		for (int i = propOrder.size(); --i >= 0;) {
//			String prop = propOrder.get(i);
//			JSJAXBField field = fieldMap.get(prop);
//			// annotations may only show up in @XmlType:propOrder
//			if (field == null) {
//				addField(new JSJAXBField(this,
//						new Object[][] { new Object[] { prop, null, null, null }, new Object[] { "@XmlElement" } },
//						null, javaObject, fields.size(), null));
//			}
//		}		
//	}

	private void addField(JSJAXBField field) {
		fields.add(field);
		if (isMarshaller && field.javaName != null)
			fieldMap.put(field.javaName, field);
	}

	JSJAXBField getFieldFromJavaNameForMarshaller(String javaName) {
		return fieldMap.get(javaName);
	}

	static String getXmlNameFromClassName(String className) {
		className = className.substring(className.lastIndexOf(".") + 1);
		if (className.indexOf("$") > 1) // inner static class
			className = className.substring(className.indexOf("$") + 1);
		return className;
	}

	public void setSeeAlso(String[] seeAlso) {
		this.seeAlso = seeAlso;
	}

	private static int prefixIndex = 1;

	/**
	 * Prepend @Xml......: to the tag name to avoid internal collision when
	 * combining all annotations into one.
	 * 
	 * @param tag
	 * @return
	 */
	static String getPrefixFor(String namespace) {
		String prefix = marshallerNamespacePrefixes.get(namespace);
		if (prefix == null)
			marshallerNamespacePrefixes.put(namespace, prefix = "ns" + (++prefixIndex));
		return prefix;
	}

	static XmlAdapter getAdapter(String adapterClass) {
		XmlAdapter adapter = adapterMap.get(adapterClass);
		if (adapter == null && !adapterMap.containsKey(adapterClass)) {
			adapterMap.put(adapterClass, adapter = (XmlAdapter) Interface.getInstance(adapterClass, false));
		}
		return adapter;
	}

}
