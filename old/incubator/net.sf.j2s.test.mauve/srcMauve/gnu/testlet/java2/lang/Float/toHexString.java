/* toHexString.java -- test Float.toHexString
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

package gnu.testlet.java2.lang.Float;

import gnu.testlet.TestHarness;
import gnu.testlet.Testlet;

/**
 * @author Tom Tromey
 */
public class toHexString implements Testlet {
	public void test(TestHarness harness) {
		harness.check(Float.toHexString(Float.NaN), "NaN");
		harness.check(Float.toHexString(Float.POSITIVE_INFINITY), "Infinity");
		harness.check(Float.toHexString(Float.NEGATIVE_INFINITY), "-Infinity");
		harness.check(Float.toHexString(0.0f), "0x0.0p0");
		harness.check(Float.toHexString(-0.0f), "-0x0.0p0");
		harness.check(Float.toHexString(1.0f), "0x1.0p0");
		harness.check(Float.toHexString(Float.MAX_VALUE), "0x1.fffffep127");
		harness.check(Float.toHexString(Float.MIN_VALUE), "0x0.000002p-126");
	}
}
