/*
 * 
 * BH 2018 just a very minimal implementation. Java2Script does not include annotations in JavaScript
 * 
 * Copyright (c) 2003, 2013, Oracle and/or its affiliates. All rights reserved.
 * ORACLE PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

package java.lang.reflect;

import java.lang.annotation.Annotation;

public interface AnnotatedElement {
    default boolean isAnnotationPresent(Class<? extends Annotation> annotationClass) {
        return getAnnotation(annotationClass) != null;
    }
    <T extends Annotation> T getAnnotation(Class<T> annotationClass);
    Annotation[] getAnnotations();
    default <T extends Annotation> T[] getAnnotationsByType(Class<T> annotationClass) {
    	return null;
     }
    default <T extends Annotation> T getDeclaredAnnotation(Class<T> annotationClass) {
         return null;
     }
    default <T extends Annotation> T[] getDeclaredAnnotationsByType(Class<T> annotationClass) {
    	return null; // should be empty array
    }
    Annotation[] getDeclaredAnnotations();
}
