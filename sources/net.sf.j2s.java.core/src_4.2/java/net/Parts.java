/*
 * Copyright 1995-2007 Sun Microsystems, Inc.  All Rights Reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Sun designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Sun in the LICENSE file that accompanied this code.
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
 * Please contact Sun Microsystems, Inc., 4150 Network Circle, Santa Clara,
 * CA 95054 USA or visit www.sun.com if you need additional information or
 * have any questions.
 */

// source: http://grepcode.com/file_/repository.grepcode.com/java/root/jdk/openjdk/6-b14/java/net/URL.java/?v=source

package java.net;

class Parts {
  String path, query, ref;

  Parts(String file) {
      int ind = file.indexOf('#');
      ref = ind < 0 ? null: file.substring(ind + 1);
      file = ind < 0 ? file: file.substring(0, ind);
      int q = file.lastIndexOf('?');
      if (q != -1) {
          query = file.substring(q+1);
          path = file.substring(0, q);
      } else {
          path = file;
      }
  }

  String getPath() {
      return path;
  }

  String getQuery() {
      return query;
  }

  String getRef() {
      return ref;
  }
}


