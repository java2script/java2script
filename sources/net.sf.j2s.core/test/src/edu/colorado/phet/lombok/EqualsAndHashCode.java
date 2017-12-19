package edu.colorado.phet.lombok;

public @interface EqualsAndHashCode {

	boolean callSuper();

	String exclude() default "";

}
