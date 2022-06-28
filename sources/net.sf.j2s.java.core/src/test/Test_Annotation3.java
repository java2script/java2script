package test;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@interface Test_Annotation3 {

	String name() default "test_annotate";
	String type();
}