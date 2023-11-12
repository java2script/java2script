/*
 * Copyright (c) 1996, 2006, Oracle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Oracle designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Oracle in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Oracle, 500 Oracle Parkway, Redwood Shores, CA 94065 USA
 * or visit www.oracle.com if you need additional information or have any
 * questions.
 */

package java.util.zip;

import java.io.InputStream;

class InflaterInputStream extends com.jcraft.jzlib.InflaterInputStream {

  protected Inflater inf;
  InflaterInputStream(InputStream in, Inflater inflater, int size) {
    super(in, inflater, size, true);
      this.inf = inflater;
    }
//  
//  /**
//   * Returns the total number of bytes remaining in the input buffer.
//   * This can be used to find out what bytes still remain in the input
//   * buffer after decompression has finished.
//   * @return the total number of bytes remaining in the input buffer
//   */
//  public int getRemaining() {
//          return inf.getRemaining();
//  }
//
//  /**
//   * Returns true if no data remains in the input buffer. This can
//   * be used to determine if #setInput should be called in order
//   * to provide more input.
//   * @return true if no data remains in the input buffer
//   */
//  public boolean needsInput() {
//          return len <= 0;
//  }

}
