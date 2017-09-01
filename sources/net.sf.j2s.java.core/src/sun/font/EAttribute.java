/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (c) 2005, Oracle and/or its affiliates. All rights reserved.
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

/*
 * (C) Copyright IBM Corp. 2005 - All Rights Reserved
 *
 * The original version of this source code and documentation is
 * copyrighted and owned by IBM. These materials are provided
 * under terms of a License Agreement between IBM and Sun.
 * This technology is protected by multiple US and International
 * patents. This notice and attribution to IBM may not be removed.
 */

package sun.font;

import static java.awt.font.TextAttribute.BACKGROUND;
import static java.awt.font.TextAttribute.BIDI_EMBEDDING;
import static java.awt.font.TextAttribute.CHAR_REPLACEMENT;
import static java.awt.font.TextAttribute.FAMILY;
import static java.awt.font.TextAttribute.FONT;
import static java.awt.font.TextAttribute.FOREGROUND;
import static java.awt.font.TextAttribute.INPUT_METHOD_HIGHLIGHT;
import static java.awt.font.TextAttribute.INPUT_METHOD_UNDERLINE;
import static java.awt.font.TextAttribute.JUSTIFICATION;
import static java.awt.font.TextAttribute.KERNING;
import static java.awt.font.TextAttribute.LIGATURES;
import static java.awt.font.TextAttribute.NUMERIC_SHAPING;
import static java.awt.font.TextAttribute.POSTURE;
import static java.awt.font.TextAttribute.RUN_DIRECTION;
import static java.awt.font.TextAttribute.SIZE;
import static java.awt.font.TextAttribute.STRIKETHROUGH;
import static java.awt.font.TextAttribute.SUPERSCRIPT;
import static java.awt.font.TextAttribute.SWAP_COLORS;
import static java.awt.font.TextAttribute.TRACKING;
import static java.awt.font.TextAttribute.TRANSFORM;
import static java.awt.font.TextAttribute.UNDERLINE;
import static java.awt.font.TextAttribute.WEIGHT;
import static java.awt.font.TextAttribute.WIDTH;

import java.text.AttributedCharacterIterator.Attribute;

import java.awt.font.TextAttribute;

public enum EAttribute {
    EFAMILY(FAMILY),
    EWEIGHT(WEIGHT),
    EWIDTH(WIDTH),
    EPOSTURE(POSTURE),
    ESIZE(SIZE),
    ETRANSFORM(TRANSFORM),
    ESUPERSCRIPT(SUPERSCRIPT),
    EFONT(FONT),
    ECHAR_REPLACEMENT(CHAR_REPLACEMENT),
    EFOREGROUND(FOREGROUND),
    EBACKGROUND(BACKGROUND),
    EUNDERLINE(UNDERLINE),
    ESTRIKETHROUGH(STRIKETHROUGH),
    ERUN_DIRECTION(RUN_DIRECTION),
    EBIDI_EMBEDDING(BIDI_EMBEDDING),
    EJUSTIFICATION(JUSTIFICATION),
    EINPUT_METHOD_HIGHLIGHT(INPUT_METHOD_HIGHLIGHT),
    EINPUT_METHOD_UNDERLINE(INPUT_METHOD_UNDERLINE),
    ESWAP_COLORS(SWAP_COLORS),
    ENUMERIC_SHAPING(NUMERIC_SHAPING),
    EKERNING(KERNING),
    ELIGATURES(LIGATURES),
    ETRACKING(TRACKING),
    EBASELINE_TRANSFORM(null);

    /* package */ final int mask;
    /* package */ final TextAttribute att;

    EAttribute(TextAttribute ta) {
        mask = 1 << ordinal();
        att = ta;
    }

    /* package */ static final EAttribute[] atts = EAttribute.class.getEnumConstants();

    public static EAttribute forAttribute(Attribute ta) {
        for (EAttribute ea: atts) {
            if (ea.att == ta) {
                return ea;
            }
        }
        return null;
    }

    @Override
		public String toString() {
        return name().substring(1).toLowerCase();
    }
}
