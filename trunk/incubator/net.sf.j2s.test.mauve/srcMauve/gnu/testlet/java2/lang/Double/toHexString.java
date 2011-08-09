/* toHexString.java -- test Double.toHexString
   Copyright (C) 2005 Red Hat, Inc.
This file is part of Mauve.

Mauve is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2, or (at your option)
any later version.

Mauve is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
General Public License for more details.

You should have received a copy of the GNU General Public License
along with Mauve; see the file COPYING.  If not, write to the
Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
02110-1301 USA.

*/

// Tags: JDK1.5

package gnu.testlet.java2.lang.Double;

import org.sgx.j2s.mauve.report.Tester;

import gnu.testlet.TestHarness;
import gnu.testlet.Testlet;

/**
 * @author Tom Tromey
 */
public class toHexString implements Testlet {

	public void test(TestHarness harness) {
		try {
		harness.check(Double.toHexString(Double.NaN), "NaN");
		harness.check(Double.toHexString(Double.NEGATIVE_INFINITY), "-Infinity");
		harness.check(Double.toHexString(Double.POSITIVE_INFINITY), "Infinity");
		harness.check(Double.toHexString(0.0), "0x0.0p0");
		harness.check(Double.toHexString(-0.0), "-0x0.0p0");
		harness.check(Double.toHexString(1.0), "0x1.0p0");
		System.out.println("Double.toHexString(Double.MAX_VALUE: "+Double.toHexString(Double.MAX_VALUE));
		harness.check(Double.toHexString(Double.MAX_VALUE), "0x1.fffffffffffffp1023");
		harness.check(Double.toHexString(Double.MIN_VALUE), "0x0.0000000000001p-1022");
		}catch (Throwable e) {
			harness.fail(Tester.getMethodUnsuportedHTMLString("Double.toHexString"));
		}
	}
}
