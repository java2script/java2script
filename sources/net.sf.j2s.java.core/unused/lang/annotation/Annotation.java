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

/**
 * <p>
 * The interface implemented by all annotations. This interface is NOT an
 * annotation itself and any interface that extends this one is NOT an
 * annotation either.
 * </p>
 * 
 * @since 1.5
 */
public interface Annotation {

    /**
     * <p>
     * Returns the type of this annotation.
     * </p>
     * 
     * @return A Class instance.
     */
    Class<? extends Annotation> annotationType();

    /**
     * <p>
     * Determines whether or not this annotation is equivalent to the annotation
     * passed.
     * </p>
     * 
     * @param obj The object to compare to.
     * @return <code>true</code> if <code>obj</code> is equal to this,
     *         otherwise <code>false</code>.
     */
    boolean equals(Object obj);

    /**
     * <p>
     * Returns the hash value of this annotation.
     * </p>
     * 
     * @return The hash value.
     */
    int hashCode();

    /**
     * <p>
     * Returns a String representation of this annotation.
     * </p>
     * 
     * @return The String that represents this annotation.
     */
    String toString();
}
