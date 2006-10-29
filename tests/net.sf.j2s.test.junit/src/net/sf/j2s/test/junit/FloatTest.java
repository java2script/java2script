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

import java.util.Vector;

public class FloatTest extends junit.framework.TestCase {

	private Vector compareResults;

	private static int rawBitsFor3_4eN38To38[] = { 0x1394470, 0x2e7958c,
			0x490bd77, 0x634ecd5, 0x7e2280b, 0x98d5907, 0xb30af48, 0xcdcdb1a,
			0xe8a08f0, 0x102c8b2d, 0x11d7adf8, 0x1386ccbb, 0x15287fe9,
			0x16d29fe4, 0x1883a3ee, 0x1a248cea, 0x1bcdb025, 0x1d808e17,
			0x1f20b19d, 0x20c8de04, 0x227b1585, 0x241ced73, 0x25c428d0,
			0x27753303, 0x29193fe2, 0x2abf8fdb, 0x2c6f73d1, 0x2e15a863,
			0x2fbb127c, 0x3169d71a, 0x33122671, 0x34b6b00d, 0x36645c10,
			0x380eb98a, 0x39b267ec, 0x3b5f01e8, 0x3d0b6131, 0x3eae397d,
			0x4059c7dc, 0x42081cea, 0x43aa2424, 0x4554ad2d, 0x4704ec3c,
			0x48a6274b, 0x4a4fb11e, 0x4c01ceb3, 0x4da2425f, 0x4f4ad2f7,
			0x50fd87b5, 0x529e74d1, 0x54461205, 0x55f79687, 0x579abe14,
			0x59416d99, 0x5af1c900, 0x5c971da0, 0x5e3ce508, 0x5fec1e4a,
			0x619392ee, 0x633877a9, 0x64e69594, 0x66901d7c, 0x683424dc,
			0x69e12e12, 0x6b8cbccb, 0x6d2febfe, 0x6edbe6fe, 0x7089705f,
			0x722bcc76, 0x73d6bf94, 0x758637bc, 0x7727c5ac, 0x78d1b717,
			0x7a83126e, 0x7c23d70a, 0x7dcccccc, 0x7f7fffff };

	private static String expectedStringFor3_4eN38To38[] = { "3.4028235E-38",
			"3.4028235E-37", "3.4028233E-36", "3.4028234E-35", "3.4028236E-34",
			"3.4028236E-33", "3.4028234E-32", "3.4028234E-31", "3.4028233E-30",
			"3.4028236E-29", "3.4028235E-28", "3.4028235E-27", "3.4028233E-26",
			"3.4028235E-25", "3.4028233E-24", "3.4028235E-23", "3.4028236E-22",
			"3.4028235E-21", "3.4028236E-20", "3.4028236E-19", "3.4028236E-18",
			"3.4028235E-17", "3.4028236E-16", "3.4028234E-15", "3.4028234E-14",
			"3.4028235E-13", "3.4028234E-12", "3.4028235E-11", "3.4028236E-10",
			"3.4028234E-9", "3.4028236E-8", "3.4028236E-7", "3.4028235E-6",
			"3.4028235E-5", "3.4028233E-4", "0.0034028236", "0.034028236",
			"0.34028235", "3.4028234", "34.028236", "340.28235", "3402.8235",
			"34028.234", "340282.34", "3402823.5", "3.4028236E7",
			"3.40282336E8", "3.40282342E9", "3.40282348E10", "3.40282343E11",
			"3.40282337E12", "3.40282353E13", "3.4028234E14", "3.4028234E15",
			"3.40282356E16", "3.40282356E17", "3.40282356E18", "3.4028236E19",
			"3.4028235E20", "3.4028233E21", "3.4028235E22", "3.4028233E23",
			"3.4028236E24", "3.4028234E25", "3.4028233E26", "3.4028234E27",
			"3.4028235E28", "3.4028236E29", "3.4028233E30", "3.4028235E31",
			"3.4028233E32", "3.4028236E33", "3.4028236E34", "3.4028234E35",
			"3.4028236E36", "3.4028235E37", "3.4028235E38" };

	private static int rawBitsFor1_17eN38To38[] = { 0x80800000, 0x82200000,
			0x83c80000, 0x857a0000, 0x871c4000, 0x88c35000, 0x8a742400,
			0x8c189680, 0x8dbebc20, 0x8f6e6b28, 0x911502f9, 0x92ba43b7,
			0x9468d4a5, 0x961184e7, 0x97b5e621, 0x99635fa9, 0x9b0e1bca,
			0x9cb1a2bc, 0x9e5e0b6b, 0xa00ac723, 0xa1ad78ec, 0xa358d727,
			0xa5078678, 0xa6a96816, 0xa853c21c, 0xaa045951, 0xaba56fa6,
			0xad4ecb8f, 0xaf013f39, 0xb0a18f08, 0xb249f2ca, 0xb3fc6f7c,
			0xb59dc5ae, 0xb7453719, 0xb8f684df, 0xba9a130c, 0xbc4097ce,
			0xbdf0bdc2, 0xbf967699, 0xc13c1440, 0xc2eb1950, 0xc492efd2,
			0xc637abc6, 0xc7e596b8, 0xc98f7e33, 0xcb335dc0, 0xcce0352f,
			0xce8c213e, 0xd02f298d, 0xd1daf3f0, 0xd388d876, 0xd52b0e94,
			0xd6d5d239, 0xd885a363, 0xda270c3c, 0xdbd0cf4b, 0xdd82818f,
			0xdf2321f3, 0xe0cbea70, 0xe27ee50b, 0xe41f4f27, 0xe5c722f1,
			0xe778ebad, 0xe91b934c, 0xeac2781f, 0xec731627, 0xee17edd8,
			0xefbde94f, 0xf16d63a2, 0xf3145e45, 0xf4b975d7, 0xf667d34c,
			0xf810e410, 0xf9b51d14, 0xfb626459, 0xfd0d7eb7, 0xfeb0de65 };

	private static String expectedStringFor1_17eN38To38[] = {
			"-1.17549435E-38", "-1.1754944E-37", "-1.17549435E-36",
			"-1.17549435E-35", "-1.1754944E-34", "-1.17549435E-33",
			"-1.17549435E-32", "-1.1754944E-31", "-1.17549435E-30",
			"-1.17549435E-29", "-1.1754944E-28", "-1.1754943E-27",
			"-1.17549435E-26", "-1.1754943E-25", "-1.1754944E-24",
			"-1.1754943E-23", "-1.1754944E-22", "-1.1754943E-21",
			"-1.1754943E-20", "-1.1754943E-19", "-1.1754944E-18",
			"-1.1754944E-17", "-1.1754943E-16", "-1.1754943E-15",
			"-1.1754944E-14", "-1.1754943E-13", "-1.1754944E-12",
			"-1.1754943E-11", "-1.1754943E-10", "-1.1754944E-9",
			"-1.1754944E-8", "-1.1754943E-7", "-1.1754944E-6", "-1.1754943E-5",
			"-1.1754943E-4", "-0.0011754944", "-0.011754943", "-0.117549434",
			"-1.1754943", "-11.754944", "-117.54944", "-1175.4944",
			"-11754.943", "-117549.44", "-1175494.4", "-1.1754944E7",
			"-1.17549432E8", "-1.1754944E9", "-1.17549435E10",
			"-1.17549433E11", "-1.17549433E12", "-1.17549438E13",
			"-1.17549438E14", "-1.1754943E15", "-1.17549432E16",
			"-1.17549432E17", "-1.17549434E18", "-1.1754944E19",
			"-1.1754944E20", "-1.1754943E21", "-1.1754943E22", "-1.1754944E23",
			"-1.17549434E24", "-1.1754943E25", "-1.1754943E26",
			"-1.17549434E27", "-1.1754943E28", "-1.1754944E29",
			"-1.1754943E30", "-1.1754943E31", "-1.1754944E32", "-1.1754943E33",
			"-1.1754944E34", "-1.1754944E35", "-1.1754944E36", "-1.1754943E37",
			"-1.1754943E38" };

	private static String toHex(int i) {
		return Integer.toHexString(i);
	}

	private void doTestCompareRawBits(String originalFloatString,
			int expectedRawBits, String expectedString) {
		int rawBits;
		String convertedString;
		float result = Float.parseFloat(originalFloatString);
		rawBits = Float.floatToIntBits(result);
		convertedString = Float.toString(result);
		if (expectedRawBits != rawBits) {
			if (compareResults == null)
				compareResults = new Vector();
			compareResults.addElement("Original float(" + originalFloatString
					+ ") Converted float(" + result + ") Expecting:"
					+ toHex(expectedRawBits) + " Got: " + toHex(rawBits));
		}
	}

	/**
	 * @tests java.lang.Float#Float(float)
	 */
	public void test_ConstructorF() {
		// Test for method java.lang.Float(float)

		Float f = new Float(900.89f);
		assertTrue("Created incorrect float", f.floatValue() == 900.89f);
	}

	/**
	 * @tests java.lang.Float#Float(java.lang.String)
	 */
	public void test_ConstructorLjava_lang_String() {
		// Test for method java.lang.Float(java.lang.String)

		Float f = new Float("900.89");
		assertTrue("Created incorrect Float", f.floatValue() == 900.89f);
	}

	/**
	 * @tests java.lang.Float#byteValue()
	 */
	public void test_byteValue() {
		// Test for method byte java.lang.Float.byteValue()
		Float f = new Float(0.46874f);
		Float f2 = new Float(90.8f);
		assertTrue("Returned incorrect byte value", f.byteValue() == 0
				&& f2.byteValue() == 90);
	}

	/**
	 * @tests java.lang.Float#compareTo(java.lang.Float)
	 * @tests java.lang.Float#compare(float, float)
	 */
	public void test_compare() {
		float[] values = new float[] { Float.NEGATIVE_INFINITY,
				-Float.MAX_VALUE, -2f, -Float.MIN_VALUE, -0f, 0f,
				Float.MIN_VALUE, 2f, Float.MAX_VALUE, Float.POSITIVE_INFINITY,
				Float.NaN };
		for (int i = 0; i < values.length; i++) {
			float f1 = values[i];
			assertTrue("compare() should be equal: " + f1, Float
					.compare(f1, f1) == 0);
			Float F1 = new Float(f1);
			assertTrue("compareTo() should be equal: " + f1,
					F1.compareTo(F1) == 0);
			for (int j = i + 1; j < values.length; j++) {
				float f2 = values[j];
				assertTrue("compare() " + f1 + " should be less " + f2, Float
						.compare(f1, f2) == -1);
				assertTrue("compare() " + f2 + " should be greater " + f1,
						Float.compare(f2, f1) == 1);
				Float F2 = new Float(f2);
				assertTrue("compareTo() " + f1 + " should be less " + f2, F1
						.compareTo(F2) == -1);
				assertTrue("compareTo() " + f2 + " should be greater " + f1, F2
						.compareTo(F1) == 1);
			}
		}
        
        try {
            new Float(0.0F).compareTo(null);
            fail("No NPE");
        } catch (NullPointerException e) {
        }
	}

	/**
	 * @tests java.lang.Float#doubleValue()
	 */
	public void test_doubleValue() {
		// Test for method double java.lang.Float.doubleValue()
		assertTrue("Incorrect double value returned", Math.abs(new Float(
				999999.999f).doubleValue() - 999999.999d) < 1);
	}

	/**
	 * @tests java.lang.Float#equals(java.lang.Object)
	 */
	public void test_equalsLjava_lang_Object() {
		// Test for method boolean java.lang.Float.equals(java.lang.Object)

		Float f = new Float(1098.576f);
		Float f2 = new Float(1098.576f);
		Float f3 = new Float(1.0f);
		assertTrue("Equality test failed", f.equals(f2) && !(f.equals(f3)));

		assertTrue("NaN should not be == Nan", Float.NaN != Float.NaN);
		assertTrue("NaN should not be == Nan", new Float(Float.NaN)
				.equals(new Float(Float.NaN)));
		assertTrue("-0f should be == 0f", 0f == -0f);
		assertTrue("-0f should not be equals() 0f", !new Float(0f)
				.equals(new Float(-0f)));
	}

	/**
	 * @tests java.lang.Float#floatToIntBits(float)
	 */
	public void test_floatToIntBitsF() {
		// Test for method int java.lang.Float.floatToIntBits(float)
		// TODO : Enhance test ??
		float f = 9876.2345f;
		int bits = Float.floatToIntBits(f);
		float r = Float.intBitsToFloat(bits);
		assertTrue("Incorrect intBits returned", f == r);
	}

	/**
	 * @tests java.lang.Float#floatToRawIntBits(float)
	 */
	public void test_floatToRawIntBitsF() {
		int i = 0x7fc004d2;
		float f = Float.intBitsToFloat(i);
		assertTrue("Wrong raw bits", Float.floatToRawIntBits(f) == i);
	}

	/**
	 * @tests java.lang.Float#floatValue()
	 */
	public void test_floatValue() {
		// Test for method float java.lang.Float.floatValue()
		Float f = new Float(87.657f);
		Float f2 = new Float(-0.876f);
		assertTrue("Returned incorrect floatValue", f.floatValue() == 87.657f
				&& (f2.floatValue() == -0.876f));

	}

	/**
	 * @tests java.lang.Float#hashCode()
	 */
	public void test_hashCode() {
		// Test for method int java.lang.Float.hashCode()
		Float f = new Float(1908.8786f);
		assertTrue("Returned invalid hash code for 1908.8786f",
				f.hashCode() == Float.floatToIntBits(1908.8786f));

		f = new Float(-1.112f);
		assertTrue("Returned invalid hash code for -1.112",
				f.hashCode() == Float.floatToIntBits(-1.112f));

		f = new Float(0f);
		assertTrue("Returned invalid hash code for 0", f.hashCode() == Float
				.floatToIntBits(0f));

	}

	/**
	 * @tests java.lang.Float#intBitsToFloat(int)
	 */
	public void test_intBitsToFloatI() {
		// Test for method float java.lang.Float.intBitsToFloat(int)
		// TODO : Enhance test ??
		float f = 9876.2345f;
		int bits = Float.floatToIntBits(f);
		float r = Float.intBitsToFloat(bits);
		assertTrue("Incorrect intBits returned", f == r);
	}

	/**
	 * @tests java.lang.Float#intValue()
	 */
	public void test_intValue() {
		// Test for method int java.lang.Float.intValue()
		Float f = new Float(0.46874f);
		Float f2 = new Float(90.8f);
		assertTrue("Returned incorrect int value", f.intValue() == 0
				&& f2.intValue() == 90);
	}

	/**
	 * @tests java.lang.Float#isInfinite()
	 */
	public void test_isInfinite() {
		// Test for method boolean java.lang.Float.isInfinite()
		assertTrue("Ininifty check failed", (new Float(Float.POSITIVE_INFINITY)
				.isInfinite() && new Float(Float.NEGATIVE_INFINITY)
				.isInfinite())
				&& !(new Float(0.13131414f).isInfinite()));
	}

	/**
	 * @tests java.lang.Float#isInfinite(float)
	 */
	public void test_isInfiniteF() {
		// Test for method boolean java.lang.Float.isInfinite(float)

		assertTrue("Infinity check failed", Float
				.isInfinite(Float.POSITIVE_INFINITY)
				&& (Float.isInfinite(Float.NEGATIVE_INFINITY))
				&& !(Float.isInfinite(1.0f)));
	}

	/**
	 * @tests java.lang.Float#isNaN()
	 */
	public void test_isNaN() {
		// Test for method boolean java.lang.Float.isNaN()
		assertTrue("NAN check failed", new Float(Float.NaN).isNaN()
				&& !(new Float(1.0f).isNaN()));
	}

	/**
	 * @tests java.lang.Float#isNaN(float)
	 */
	public void test_isNaNF() {
		// Test for method boolean java.lang.Float.isNaN(float)
		assertTrue("NaN check failed", Float.isNaN(Float.NaN)
				&& !(Float.isNaN(12.09f)));
	}

	/**
	 * @tests java.lang.Float#longValue()
	 */
	public void test_longValue() {
		// Test for method long java.lang.Float.longValue()
		Float f = new Float(0.46874f);
		Float f2 = new Float(90.8f);
		assertTrue("Returned incorrect long value", f.longValue() == 0
				&& f2.longValue() == 90);
	}

	/**
	 * @tests java.lang.Float#parseFloat(java.lang.String)
	 */
	public void test_parseFloatLjava_lang_String() {
		assertEquals("Incorrect float returned, expected zero.",
                             0.0, Float.parseFloat("7.0064923216240853546186479164495e-46"), 0.0);
		assertEquals("Incorrect float returned, expected minimum float.",
                             Float.MIN_VALUE, Float.parseFloat("7.0064923216240853546186479164496e-46"), 0.0);

		doTestCompareRawBits(
				"0.000000000000000000000000000000000000011754942807573642917278829910357665133228589927589904276829631184250030649651730385585324256680905818939208984375",
				0x800000, "1.17549435E-38");
		doTestCompareRawBits(
				"0.00000000000000000000000000000000000001175494280757364291727882991035766513322858992758990427682963118425003064965173038558532425668090581893920898437499999f",
				0x7fffff, "1.1754942E-38");

		/* Test a set of regular floats with exponents from -38 to +38 */
		for (int i = 38; i > 3; i--) {
			String testString, expectedString;
			testString = expectedString = "3.4028234663852886e-" + i;
			doTestCompareRawBits(testString, rawBitsFor3_4eN38To38[38 - i],
					expectedStringFor3_4eN38To38[38 - i]);
		}
		doTestCompareRawBits("3.4028234663852886e-3",
				rawBitsFor3_4eN38To38[38 - 3],
				expectedStringFor3_4eN38To38[38 - 3]);
		doTestCompareRawBits("3.4028234663852886e-2",
				rawBitsFor3_4eN38To38[38 - 2],
				expectedStringFor3_4eN38To38[38 - 2]);
		doTestCompareRawBits("3.4028234663852886e-1",
				rawBitsFor3_4eN38To38[38 - 1],
				expectedStringFor3_4eN38To38[38 - 1]);
		doTestCompareRawBits("3.4028234663852886e-0",
				rawBitsFor3_4eN38To38[38 - 0],
				expectedStringFor3_4eN38To38[38 - 0]);
		doTestCompareRawBits("3.4028234663852886e+1",
				rawBitsFor3_4eN38To38[38 + 1],
				expectedStringFor3_4eN38To38[38 + 1]);
		doTestCompareRawBits("3.4028234663852886e+2",
				rawBitsFor3_4eN38To38[38 + 2],
				expectedStringFor3_4eN38To38[38 + 2]);
		doTestCompareRawBits("3.4028234663852886e+3",
				rawBitsFor3_4eN38To38[38 + 3],
				expectedStringFor3_4eN38To38[38 + 3]);
		doTestCompareRawBits("3.4028234663852886e+4",
				rawBitsFor3_4eN38To38[38 + 4],
				expectedStringFor3_4eN38To38[38 + 4]);
		doTestCompareRawBits("3.4028234663852886e+5",
				rawBitsFor3_4eN38To38[38 + 5],
				expectedStringFor3_4eN38To38[38 + 5]);
		doTestCompareRawBits("3.4028234663852886e+6",
				rawBitsFor3_4eN38To38[38 + 6],
				expectedStringFor3_4eN38To38[38 + 6]);

		for (int i = 7; i < 39; i++) {
			String testString, expectedString;
			testString = expectedString = "3.4028234663852886e+" + i;
			doTestCompareRawBits(testString, rawBitsFor3_4eN38To38[38 + i],
					expectedStringFor3_4eN38To38[38 + i]);
		}

		/* Test another set of regular floats with exponents from -38 to +38 */
		for (int i = 38; i > 3; i--) {
			String testString, expectedString;
			testString = expectedString = "-1.1754943508222875e-" + i;
			doTestCompareRawBits(testString, rawBitsFor1_17eN38To38[38 - i],
					expectedStringFor1_17eN38To38[38 - i]);
		}
		doTestCompareRawBits("-1.1754943508222875e-3",
				rawBitsFor1_17eN38To38[38 - 3],
				expectedStringFor1_17eN38To38[38 - 3]);
		doTestCompareRawBits("-1.1754943508222875e-2",
				rawBitsFor1_17eN38To38[38 - 2],
				expectedStringFor1_17eN38To38[38 - 2]);
		doTestCompareRawBits("-1.1754943508222875e-1",
				rawBitsFor1_17eN38To38[38 - 1],
				expectedStringFor1_17eN38To38[38 - 1]);
		doTestCompareRawBits("-1.1754943508222875e-0",
				rawBitsFor1_17eN38To38[38 - 0],
				expectedStringFor1_17eN38To38[38 - 0]);
		doTestCompareRawBits("-1.1754943508222875e+1",
				rawBitsFor1_17eN38To38[38 + 1],
				expectedStringFor1_17eN38To38[38 + 1]);
		doTestCompareRawBits("-1.1754943508222875e+2",
				rawBitsFor1_17eN38To38[38 + 2],
				expectedStringFor1_17eN38To38[38 + 2]);
		doTestCompareRawBits("-1.1754943508222875e+3",
				rawBitsFor1_17eN38To38[38 + 3],
				expectedStringFor1_17eN38To38[38 + 3]);
		doTestCompareRawBits("-1.1754943508222875e+4",
				rawBitsFor1_17eN38To38[38 + 4],
				expectedStringFor1_17eN38To38[38 + 4]);
		doTestCompareRawBits("-1.1754943508222875e+5",
				rawBitsFor1_17eN38To38[38 + 5],
				expectedStringFor1_17eN38To38[38 + 5]);
		doTestCompareRawBits("-1.1754943508222875e+6",
				rawBitsFor1_17eN38To38[38 + 6],
				expectedStringFor1_17eN38To38[38 + 6]);

		for (int i = 7; i < 39; i++) {
			String testString, expectedString;
			testString = expectedString = "-1.1754943508222875e+" + i;
			doTestCompareRawBits(testString, rawBitsFor1_17eN38To38[38 + i],
					expectedStringFor1_17eN38To38[38 + i]);
		}

		/* Test denormalized floats (floats with exponents <= -38 */
		doTestCompareRawBits("1.1012984643248170E-45", 1, "1.4E-45");
		doTestCompareRawBits("-1.1012984643248170E-45", 0x80000001, "-1.4E-45");
		doTestCompareRawBits("1.0E-45", 1, "1.4E-45");
		doTestCompareRawBits("-1.0E-45", 0x80000001, "-1.4E-45");
		doTestCompareRawBits("0.9E-45", 1, "1.4E-45");
		doTestCompareRawBits("-0.9E-45", 0x80000001, "-1.4E-45");
		doTestCompareRawBits("4.203895392974451e-45", 3, "4.2E-45");
		doTestCompareRawBits("-4.203895392974451e-45", 0x80000003, "-4.2E-45");
		doTestCompareRawBits("0.004E-45", 0, "0.0");
		doTestCompareRawBits("-0.004E-45", 0x80000000, "-0.0");

		/*
		 * Test for large floats close to and greater than 3.4028235E38 and
		 * -3.4028235E38
		 */
		doTestCompareRawBits("1.2E+38", 0x7eb48e52, "1.2E38");
		doTestCompareRawBits("-1.2E+38", 0xfeb48e52, "-1.2E38");
		doTestCompareRawBits("3.2E+38", 0x7f70bdc2, "3.2E38");
		doTestCompareRawBits("-3.2E+38", 0xff70bdc2, "-3.2E38");
		doTestCompareRawBits("3.4E+38", 0x7f7fc99e, "3.4E38");
		doTestCompareRawBits("-3.4E+38", 0xff7fc99e, "-3.4E38");
		doTestCompareRawBits("3.4028234663852886E+38", 0x7f7fffff,
				"3.4028235E38");
		doTestCompareRawBits("-3.4028234663852886E+38", 0xff7fffff,
				"-3.4028235E38");
		doTestCompareRawBits("3.405E+38", 0x7f800000, "Infinity");
		doTestCompareRawBits("-3.405E+38", 0xff800000, "-Infinity");
		doTestCompareRawBits("3.41E+38", 0x7f800000, "Infinity");
		doTestCompareRawBits("-3.41E+38", 0xff800000, "-Infinity");
		doTestCompareRawBits("3.42E+38", 0x7f800000, "Infinity");
		doTestCompareRawBits("-3.42E+38", 0xff800000, "-Infinity");
		doTestCompareRawBits("1.0E+39", 0x7f800000, "Infinity");
		doTestCompareRawBits("-1.0E+39", 0xff800000, "-Infinity");

		if (compareResults != null) {
			StringBuffer failString = new StringBuffer();
			for (int i = 0; i < compareResults.size(); i++) {
				failString.append(compareResults.elementAt(i));
				failString.append("\n");
			}
			fail(failString.toString());
		}
		
		boolean exception = false;
		try {
			Float.parseFloat("a");
		} catch (NumberFormatException e) {
			// Correct
			exception = true;
		}
		assertTrue("Failed to throw exception for non float string", exception);		
	}

	/**
	 * @tests java.lang.Float#shortValue()
	 */
	public void test_shortValue() {
		// Test for method short java.lang.Float.shortValue()
		Float f = new Float(0.46874f);
		Float f2 = new Float(90.8f);
		assertTrue("Returned incorrect short value", f.shortValue() == 0
				&& f2.shortValue() == 90);
	}

	/**
	 * @tests java.lang.Float#toString()
	 */
	public void test_toString() {
		// Test for method java.lang.String java.lang.Float.toString()

		test_toString(12.90898f, "12.90898");

		test_toString(1.7014118346046924e+38F, "1.7014118E38");
	}

	/**
	 * @tests java.lang.Float#toString(float)
	 */
	public void test_toStringF() {
		// Test for method java.lang.String java.lang.Float.toString(float)

		float ff;
		String answer;

		ff = 12.90898f;
		answer = "12.90898";
		assertTrue("Incorrect String representation want " + answer + ", got "
				+ Float.toString(ff), Float.toString(ff).equals(answer));

		ff = Float.MAX_VALUE;
		answer = "3.4028235E38";
		assertTrue("Incorrect String representation want " + answer + ", got "
				+ Float.toString(ff), Float.toString(ff).equals(answer));
		// TODO : There is a known problem with floating point printing. So
		// this is not included
	}

	/**
	 * @tests java.lang.Float#valueOf(java.lang.String)
	 */
	public void test_valueOfLjava_lang_String() {
		// Test for method java.lang.Float
		// java.lang.Float.valueOf(java.lang.String)

		Float wanted = new Float(432.1235f);
		Float got = Float.valueOf("432.1235");
		assertTrue("Incorrect float returned--wanted: " + wanted + " but got: "
				+ got, got.equals(wanted));

		wanted = new Float(0f);
		got = Float.valueOf("0");
		assertTrue("Incorrect float returned--wanted: " + wanted + " but got: "
				+ got, got.equals(wanted));

		wanted = new Float(-1212.3232f);
		got = Float.valueOf("-1212.3232");
		assertTrue("Incorrect float returned--wanted: " + wanted + " but got: "
				+ got, got.equals(wanted));

		try {
			Float.valueOf(null);
			fail("Expected Float.valueOf(null) to throw NPE.");
		} catch (NullPointerException ex) {
			// expected
		} catch (Exception ex) {
			fail("Expected Float.valueOf(null) to throw NPE not "
					+ ex.getClass().getName());
		}

		try {
			Float.valueOf("");
			fail("Expected Float.valueOf(\"\") to throw NFE");
		} catch (NumberFormatException e) {
			// expected
		}

		Float posZero = Float.valueOf("+0.0");
		Float negZero = Float.valueOf("-0.0");
		assertFalse("Floattest0", posZero.equals(negZero));
		assertTrue("Floattest1", 0.0f == -0.0f);

		// Tests for float values by name.
		Float expectedNaN = new Float(Float.NaN);

		Float posNaN = Float.valueOf("NaN");
		assertTrue("Floattest2", posNaN.equals(expectedNaN));

		Float posNaNSigned = Float.valueOf("+NaN");
		assertTrue("Floattest3", posNaNSigned.equals(expectedNaN));

		Float negNaNSigned = Float.valueOf("-NaN");
		assertTrue("Floattest4", negNaNSigned.equals(expectedNaN));

		Float posInfinite = Float.valueOf("Infinity");
		assertTrue("Floattest5", posInfinite.equals(new Float(
				Float.POSITIVE_INFINITY)));

		Float posInfiniteSigned = Float.valueOf("+Infinity");
		assertTrue("Floattest6", posInfiniteSigned.equals(new Float(
				Float.POSITIVE_INFINITY)));

		Float negInfiniteSigned = Float.valueOf("-Infinity");
		assertTrue("Floattest7", negInfiniteSigned.equals(new Float(
				Float.NEGATIVE_INFINITY)));
	}

	/**
	 * Sets up the fixture, for example, open a network connection. This method
	 * is called before a test is executed.
	 */
	protected void setUp() {
	}

	/**
	 * Tears down the fixture, for example, close a network connection. This
	 * method is called after a test is executed.
	 */
	protected void tearDown() {
	}

	private void test_toString(float ff, String answer) {
		// Test for method java.lang.String java.lang.Double.toString(double)
		assertTrue("Incorrect String representation want " + answer + ", got ("
				+ Float.toString(ff) + ")", Float.toString(ff).equals(answer));
		Float f = new Float(ff);
		assertTrue("Incorrect String representation want " + answer + ", got ("
				+ Float.toString(f.floatValue()) + ")", Float.toString(
				f.floatValue()).equals(answer));
		assertTrue("Incorrect String representation want " + answer + ", got ("
				+ f.toString() + ")", f.toString().equals(answer));
	}
}
