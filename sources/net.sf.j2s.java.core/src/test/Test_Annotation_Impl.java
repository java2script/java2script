package test;

import java.beans.Transient;
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.xml.bind.annotation.XmlElement;

@Test_Annotation(cl=Test_.class, btest = true, itype = 2, type = "im'pl", iitype = {4,5,6})
@Test_Annotation.Test_Annotation1
class Test_Annotation_Impl extends Test_ {
	
	static String stest1 = "stest1";
	static int itest1 = 3;
	static int itest2;
	static float f = Float.NaN;
	static double d = Double.NaN;
	
	@Test_Parameter
	public Test_Annotation_Impl() {
		
	}

	@Test_Parameter
	public Test_Annotation_Impl(String s) {
	
	}

	static int ok;
	static {
		/**
		 * @j2sNative
		 *   // alert("OK");
		 */
		{
			ok = 3;
		}
	}

	@Test_Parameter 
	String test1 = "test1";

	@Test_Parameter
	List<Map<String,Object>>[] test2;

	@Test_Item
	@Test_Parameter
	int test3 = 3;
	
	@Test_Annotation(itype=4)
	int itype = 5;

	{
		ok = 5;
		itype = 6;
	}

	Test_ test4 = null;
	Test_ test5;

	@Test_Parameter
	@Test_Annotation(itype=6)
	public String name() {
		Object a = new String[4][];
		Object x = String.class;
		Object y = String[].class;
	  return "class_impl";
	};
	
	  @Test_Annotation3(type = "1")
	  public void annotated() {}

	  public static void main(String[] args) {
		
//	    Method method;
//		try {
//			method = Test_Annotation_Impl.class.getMethod("annotated");
//		    System.out.println(method.getAnnotations());  // contains annotation in java but empty array in js
//		} catch (NoSuchMethodException | SecurityException e1) {
//			// TODO Auto-generated catch block
//			e1.printStackTrace();
//		}

		
		
		System.out.println(Test_Annotation_Impl.class.isAssignableFrom(Test_.class));//false
		System.out.println(Test_.class.isAssignableFrom(Test_Annotation_Impl.class));//true
		System.out.println(Test_.class.isAssignableFrom(Test_.class));//true
		Test_Annotation_Impl impl = new Test_Annotation_Impl();
		try {
			Test_Annotation a = impl.getClass().getAnnotation(Test_Annotation.class);
			System.out.println(a.annotationType().getName());
			processAnnotation(a, "class");

			Class<? extends Annotation> aclass = Test_Annotation.class;
			Field[] fields = impl.getClass().getDeclaredFields();
			for (int i = 0; i < fields.length; i++) {
				fields[i].setAccessible(true);
//				System.out.println(fields[i]);
				if (fields[i].isAnnotationPresent(aclass)) {
					assert(fields[i].getName().equals("itype"));
					processAnnotation(fields[i].getAnnotation(aclass), fields[i].getName());
				}
			}

			Method[] methods = impl.getClass().getDeclaredMethods();
			for (int i = 0; i < methods.length; i++) {
				methods[i].setAccessible(true);
				System.out.println("annotations:" + methods[i].getName() + " " + methods[i].getAnnotations());
				if (methods[i].isAnnotationPresent(aclass)) {
					//minor issue that Method.getName() returns the fully qualified 
					// JavaScript method name, not the unqualified Java method name. 
					// OK? Good? Preferred?
					
//					assert(fields[i].getName().equals("name"));
					processAnnotation(methods[i].getAnnotation(aclass), methods[i].getName() + "()");
				}
			}

			System.out.println("Test_Annotation OK");

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
 
	@SafeVarargs
	@Deprecated
    @Transient
	public final void test11(String... test) {}
	
	private static void processAnnotation(Annotation a, String name)
			throws IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		Method[] ma = a.getClass().getMethods();
		System.out.println("-------");
		for (int j = 0; j < ma.length; j++) {
			if (ma[j].getDeclaringClass() != a.getClass()) 
				continue;
			System.out.print(name + "." + ma[j].getName() + " ");
			if (ma[j].getParameterTypes().length == 0 && !(ma[j].getReturnType().getName().equals("void"))) {
				ma[j].setAccessible(true);
				Object val = ma[j].invoke(a, new Object[0]);
				if (val.getClass().isArray())
					val = Arrays.toString((int[]) val);
				System.out.println(
						"= " + val + " as " + ma[j].getReturnType().getName() + "(" + ma[j].getDefaultValue() + ")");
			} else {
				System.out.println("??");
			}
		}

	}
	

}