/* Copyright 1998, 2005 The Apache Software Foundation or its licensors, as applicable
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package net.sf.j2s.test.junit;

public class NumberTest extends junit.framework.TestCase {

	/**
	 * @tests java.lang.Number#Number()
	 */
	public void test_Constructor() {
		assertTrue("Nothing to test", true);
	}

	/**
	 * @tests java.lang.Number#byteValue()
	 */
	public void test_byteValue() {
		int number = 1231243;
		assertTrue("Incorrect byte returned for: " + number,
				((byte) new Integer(number).intValue()) == new Integer(number)
						.byteValue());
		number = 0;
		assertTrue("Incorrect byte returned for: " + number,
				((byte) new Integer(number).intValue()) == new Integer(number)
						.byteValue());
		number = -1;
		assertTrue("Incorrect byte returned for: " + number,
				((byte) new Integer(number).intValue()) == new Integer(number)
						.byteValue());
		number = -84109328;
		assertTrue("Incorrect byte returned for: " + number,
				((byte) new Integer(number).intValue()) == new Integer(number)
						.byteValue());
	}

	/**
	 * @tests java.lang.Number#shortValue()
	 */
	public void test_shortValue() {
		int number = 1231243;
		assertTrue("Incorrect byte returned for: " + number,
				((short) new Integer(number).intValue()) == new Integer(number)
						.shortValue());
		number = 0;
		assertTrue("Incorrect byte returned for: " + number,
				((short) new Integer(number).intValue()) == new Integer(number)
						.shortValue());
		number = -1;
		assertTrue("Incorrect byte returned for: " + number,
				((short) new Integer(number).intValue()) == new Integer(number)
						.shortValue());
		number = -84109328;
		assertTrue("Incorrect byte returned for: " + number,
				((short) new Integer(number).intValue()) == new Integer(number)
						.shortValue());

	}

	protected void setUp() {
	}

	protected void tearDown() {
	}
}
