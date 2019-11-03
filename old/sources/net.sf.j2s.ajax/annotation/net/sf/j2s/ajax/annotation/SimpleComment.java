package net.sf.j2s.ajax.annotation;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.TYPE;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({FIELD, TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface SimpleComment {
	String[] value();
}
