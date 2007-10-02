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
 * @version $Revision: 1.36.2.2 $
 */
package java.util.regex;

import java.io.Serializable;

//import java.util.ArrayList;

//import org.apache.harmony.regex.internal.nls.Messages;


/**
 * Pattern implements a compiler for regular expressions as defined by the J2SE
 * specification. The regular expression syntax is largely similar to the syntax
 * defined by Perl 5 but has both omissions and extensions. A formal and
 * complete definition of the regular expression syntax is not provided by the
 * J2SE speTBD (TODO)
 * 
 */
public final class Pattern implements Serializable {
    
    private static final long serialVersionUID = 5073258162644648461L;
    
//    static final boolean _DEBUG_ = false;

    /**
     * @com.intel.drl.spec_ref
     */
    public static final int UNIX_LINES = 1 << 0;

    /**
     * @com.intel.drl.spec_ref
     */
    public static final int CASE_INSENSITIVE = 1 << 1;

    /**
     * @com.intel.drl.spec_ref
     */
    public static final int COMMENTS = 1 << 2;

    /**
     * @com.intel.drl.spec_ref
     */
    public static final int MULTILINE = 1 << 3;

    /**
     * @com.intel.drl.spec_ref
     */
    public static final int LITERAL = 1 << 4;

    /**
     * @com.intel.drl.spec_ref
     */
    public static final int DOTALL = 1 << 5;

    /**
     * @com.intel.drl.spec_ref
     */
    public static final int UNICODE_CASE = 1 << 6;

    /**
     * @com.intel.drl.spec_ref
     */
    public static final int CANON_EQ = 1 << 7;
    
//    static final int BACK_REF_NUMBER = 10;
    
    /**
     * Bit mask that includes all defined match flags
     */
    static final int flagsBitMask = Pattern.UNIX_LINES | 
                                    Pattern.CASE_INSENSITIVE | 
                                    Pattern.COMMENTS | 
                                    Pattern.MULTILINE |  
                                    Pattern.DOTALL | 
                                    Pattern.UNICODE_CASE | 
                                    Pattern.CANON_EQ;

    /**
     * Pattern compile flags;
     */
    private int flags = 0;

//    private String pattern = null;
    
//    /*
//     * Is true if backreferenced sets replacement is needed
//     */
//    transient private boolean needsBackRefReplacement = false;
//
//    transient private int groupIndex = -1;
//
//    transient private int globalGroupIndex = -1;
//
//    transient private int compCount = -1;
//
//    transient private int consCount = -1;

	private Object regexp;

    /**
	 * Create a matcher for this pattern and a given input character sequence
	 * 
	 * @param cs
	 *            The input character sequence
	 * @return A new matcher
	 */
    public Matcher matcher(CharSequence cs) {
        return new Matcher(this, cs);
    }

	/**
	 * Split an input string using the pattern as a token separator.
	 * 
	 * @param input
	 *            Input sequence to tokenize
	 * @param limit
	 *            If positive, the maximum number of tokens to return. If
	 *            negative, an indefinite number of tokens are returned. If
	 *            zero, an indefinite number of tokens are returned but trailing
	 *            empty tokens are excluded.
	 * @return A sequence of tokens split out of the input string.
	 */
    public String[] split(CharSequence input, int limit) {
//        ArrayList res = new ArrayList();
        Object[] res = new Object[0];
        Matcher mat = matcher(input);
        int index = 0;
        int curPos = 0;       
        
        if (input.length() == 0) {
            return new String [] {""}; //$NON-NLS-1$
        } else {
            while (mat.find() && (index + 1 < limit || limit <= 0)) {
                  //res.add(input.subSequence(curPos, mat.start()).toString());
                  res[res.length] = input.subSequence(curPos, mat.start()).toString();
                  curPos = mat.end();
                  index++;
            }
                
//            res.add(input.subSequence(curPos, input.length()).toString());
            res[res.length] = input.subSequence(curPos, input.length()).toString();
            index++;
                             
            /*
             * discard trailing empty strings
             */
            if (limit == 0) {
//                while (--index >= 0 && res.get(index).toString().length() == 0) {
//                       res.remove(index);
//                }
                while (--index >= 0 && res[index].toString().length() == 0) 
            	/**
            	 * @j2sNative
            	 * res.length--;
            	 */ { }
            }
        }
//        return (String[]) res.toArray(new String[index >= 0 ? index : 0]);
        return (String[]) res;
    }

    /**
     * @com.intel.drl.spec_ref
     */
    public String[] split(CharSequence input) {
        return split(input, 0);
    }

	/**
	 * Returns the pattern string passed to the compile method
	 * 
	 * @return A string representation of the pattern
	 */
    public String pattern() {
//        return lexemes.toString();
    	/**
    	 * @j2sNative
    	 * return this.regexp.source;
    	 */ {}
    	return null;
    }

	/**
	 * Return a textual representation of the pattern.
	 * 
	 * @return The regular expression string
	 */
    public String toString() {
        return this.pattern();
    }

	/**
	 * Return the mask of flags used to compile the pattern
	 * 
	 * @return A mask of flags used to compile the pattern.
	 */
    public int flags() {
        return this.flags;
    }

	/**
	 * Return a compiled pattern corresponding to the input regular expression
	 * string.
	 * 
	 * The input <code>flags</code> is a mask of the following flags:
	 * <dl>
	 * <dt><code>UNIX_LINES</code> (0x0001)
	 * <dd>Enables UNIX lines mode where only \n is recognized as a line
	 * terminator. The default setting of this flag is <em>off</em> indicating
	 * that all of the following character sequences are recognized as line
	 * terminators: \n, \r, \r\n, NEL (\u0085), \u2028 and \u2029.
	 * <dt><code>CASE_INSENSITIVE</code> (0x0002)
	 * <dd>Directs matching to be done in a way that ignores differences in
	 * case. If input character sequences are encoded in character sets other
	 * than ASCII, then the UNICODE_CASE must also be set to enable Unicode case
	 * detection.
	 * <dt><code>UNICODE_CASE</code> (0x0040)
	 * <dd>Enables Unicode case folding if used in conjunction with the
	 * <code>CASE_INSENSITIVE</code> flag. If <code>CASE_INSENSITIVE</code>
	 * is not set, then this flag has no effect.
	 * <dt><code>COMMENTS</code> (0x0004)
	 * <dd>Directs the pattern compiler to ignore whitespace and comments in
	 * the pattern. Whitespace consists of sequences including only these
	 * characters: SP (\u0020), HT (\t or \u0009), LF (\n or ), VT (\u000b), FF
	 * (\f or \u000c), and CR (\r or ). A comment is any sequence of characters
	 * beginning with the "#" (\u0023) character and ending in a LF character.
	 * <dt><code>MULTILINE</code> (0x0008)
	 * <dd>Turns on multiple line mode for matching of character sequences. By
	 * default, this mode is off so that the character "^" (\u005e) matches the
	 * beginning of the entire input sequence and the character "$" (\u0024)
	 * matches the end of the input character sequence. In multiple line mode,
	 * the character "^" matches any character in the input sequence which
	 * immediately follows a line terminator and the character "$" matches any
	 * character in the input sequence which immediately precedes a line
	 * terminator.
	 * <dt><code>DOTALL</code> (0x0020)
	 * <dd>Enables the DOT (".") character in regular expressions to match line
	 * terminators. By default, line terminators are not matched by DOT.
	 * <dt><code>CANON_EQ</code> (0x0080)
	 * <dd>Enables matching of character sequences which are canonically
	 * equivalent according to the Unicode standard. Canonical equivalence is
	 * described here: http://www.unicode.org/reports/tr15/. By default,
	 * canonical equivalence is not detected while matching.
	 * </dl>
	 * 
	 * @param regex
	 *            A regular expression string.
	 * @param flags
	 *            A set of flags to control the compilation of the pattern.
	 * @return A compiled pattern
	 * @throws PatternSyntaxException
	 *             If the input regular expression does not match the required
	 *             grammar.
	 */
    public static Pattern compile(String regex, int flags)
            throws PatternSyntaxException {
    	
    	if ((flags != 0) &&
    	   	((flags | flagsBitMask) != flagsBitMask)) {
    	        	
//    	    throw new IllegalArgumentException(Messages.getString("regex.1C"));
    	    throw new IllegalArgumentException("Illegal flags");
    	}
    	
//        AbstractSet.counter = 1;

//        return new Pattern().compileImpl(regex, flags);
    	String flagStr = "g";
    	if ((flags & Pattern.MULTILINE) != 0) {
    		flagStr += "m";
    	}
    	if ((flags & Pattern.CASE_INSENSITIVE) != 0) {
    		flagStr += "i";
    	}
    	Pattern pattern = new Pattern();
		/**
		 * @j2sNative
		pattern.regexp = new RegExp(regex, flagStr);
		 */ {}
		return pattern;
    }

    /**
     * @com.intel.drl.spec_ref
     */
    public static Pattern compile(String pattern) {
        return compile(pattern, 0);
    }

    /**
     * @com.intel.drl.spec_ref
     */
    public static boolean matches(String regex, CharSequence input) {
        return Pattern.compile(regex).matcher(input).matches();
    }

    public static String quote(String s) {
        StringBuffer sb = new StringBuffer().append("\\Q"); //$NON-NLS-1$
        int apos = 0;
        int k;
        while ((k = s.indexOf("\\E", apos)) >= 0) { //$NON-NLS-1$
            sb.append(s.substring(apos, k + 2)).append("\\\\E\\Q"); //$NON-NLS-1$
            apos = k + 2;
        }

        return sb.append(s.substring(apos)).append("\\E").toString(); //$NON-NLS-1$
    }

//    /**
//     * return number of groups found at compile time
//     */
//    int groupCount() {
////        return globalGroupIndex;
//    	return -1;
//    }
//
//    int compCount() {
////        return this.compCount + 1;
//    	return -1;
//    }
//
//    int consCount() {
////        return this.consCount + 1;
//    	return -1;
//    }
//
//    /**
//     * Returns supplementary character. At this time only for ASCII chars.
//     */
//    static char getSupplement(char ch) {
//        char res = ch;
//        if (ch >= 'a' && ch <= 'z') {
//            res -= 32;
//        } else if (ch >= 'A' && ch <= 'Z') {
//            res += 32;
//        }
//
//        return res;
//    }

    /**
     * Dismiss public constructor.
     * 
     */
    private Pattern() {
    }

//    /**
//     * Serialization support
//     */
//    private void readObject(java.io.ObjectInputStream s)
//            throws java.io.IOException, ClassNotFoundException {
//        s.defaultReadObject();
//        AbstractSet.counter = 1;
//        groupIndex = -1;
//        globalGroupIndex = -1;
//        compCount = -1;
//        consCount = -1;
//        backRefs = new FSet [BACK_REF_NUMBER];
//
//        compileImpl(pattern, flags);
//
//    }
}
