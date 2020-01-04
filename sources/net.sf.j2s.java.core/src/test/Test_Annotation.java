package test;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@interface Test_Annotation {
	
	@interface Test_Annotation1 { 
		String inner() default "inner";
 
		@interface Test_Annotation2 {
			String inner() default "inner2";
		}

	}
	
	Class<?> cl() default Test_Annotation.class;
	String name() default "test_annotate";
	String type() default "type";

	@Test_Parameter
	int itype() default -1;
	
	int[] iitype() default {1, 2, 3};
	boolean btest() default false;
	boolean btest2() default true;
	int itype2() default 1;
	Test_Annotation1 ref() default @Test_Annotation1;
}