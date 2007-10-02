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
 * An enumeration for annotation retention policies.
 * </p>
 * 
 * @since 1.5
 */
public enum RetentionPolicy {
    /**
     * <p>
     * Annotation is only available in the source code.
     * </p>
     */
    SOURCE,
    /**
     * <p>
     * Annotation is available in the source code and in the class file, but not
     * at runtime. This is the default policy.
     * </p>
     */
    CLASS,
    /**
     * <p>
     * Annotation is available in the source code, the class file and is
     * available at runtime.
     * </p>
     */
    RUNTIME
}
