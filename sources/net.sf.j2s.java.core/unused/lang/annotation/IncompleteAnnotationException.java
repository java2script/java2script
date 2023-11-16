/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

package java.lang.annotation;

import org.apache.harmony.luni.util.Msg;

/**
 * <p>
 * Indicates that an element of an annotation type was accessed that was added
 * after the type was compiled or serialized. This does not apply to new
 * elements that have default values.
 * </p>
 * 
 * @since 1.5
 */
public class IncompleteAnnotationException extends RuntimeException {

    private static final long serialVersionUID = 8445097402741811912L;

    private Class<? extends Annotation> annotationType;

    private String elementName;

    /**
     * <p>
     * Constructs an instance with the incomplete annotation type and the name
     * of the element that's missing.
     * </p>
     * 
     * @param annotationType The annotation type.
     * @param elementName The name of the incomplete element.
     */
    public IncompleteAnnotationException(
            Class<? extends Annotation> annotationType, String elementName) {
        super(Msg.getString("annotation.0", elementName, annotationType)); //$NON-NLS-1$
        this.annotationType = annotationType;
        this.elementName = elementName;
    }

    /**
     * <p>
     * The annotation type.
     * </p>
     * 
     * @return A Class instance.
     */
    public Class<? extends Annotation> annotationType() {
        return annotationType;
    }

    /**
     * <p>
     * The incomplete element's name.
     * </p>
     * 
     * @return The name of the element.
     */
    public String elementName() {
        return elementName;
    }
}
