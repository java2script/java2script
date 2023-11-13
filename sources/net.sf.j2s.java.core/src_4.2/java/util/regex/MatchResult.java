/*
 *  Licensed to the Apache Software Foundation (ASF) under one or more
 *  contributor license agreements.  See the NOTICE file distributed with
 *  this work for additional information regarding copyright ownership.
 *  The ASF licenses this file to You under the Apache License, Version 2.0
 *  (the "License"); you may not use this file except in compliance with
 *  the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

/**
 * @author Nikolay A. Kuznetsov
 * @version $Revision: 1.6.2.2 $
 */
package java.util.regex;

/**
 * @com.intel.drl.spec_ref
 * 
 * @author Nikolay A. Kuznetsov
 * @version $Revision: 1.6.2.2 $
 */
public interface MatchResult {

    /**
     * @com.intel.drl.spec_ref
     */
    int end();

    /**
     * @com.intel.drl.spec_ref
     */
    int end(int group);

    /**
     * @com.intel.drl.spec_ref
     */
    String group();

    /**
     * @com.intel.drl.spec_ref
     */
    String group(int group);

    /**
     * @com.intel.drl.spec_ref
     */
    int groupCount();

    /**
     * @com.intel.drl.spec_ref
     */
    int start();

    /**
     * @com.intel.drl.spec_ref
     */
    int start(int group);
}
