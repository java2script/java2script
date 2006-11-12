/*
 * Copyright 2006 The Apache Software Foundation or its licensors, as applicable
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

package java.lang.reflect;

/**
 * <p>
 * Indicates that a malformed signature has been encountered via a reflective
 * method.
 * </p>
 * 
 * @since 1.5
 */
public class GenericSignatureFormatError extends ClassFormatError {
    private static final long serialVersionUID = 6709919147137911034L;

    public GenericSignatureFormatError() {
        super();
    }
}
