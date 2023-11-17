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

/**
 * A minimal Pattern matcher, just for Jmol MathExt x.find("xxx","i")
 * Implements only Pattern.compile(s,flags[i only]); 
 * and Matcher.find(), start(), end(), and group()
 */
public final class Pattern {

	// BH internalized; only accessed by this class
	
	public static class Matcher /*implements MatchResult*/ {

	    @SuppressWarnings("unused")
		private Pattern pat;
	    String strString = null;
		private int leftBound = -1;
		private int rightBound = -1;	
		private String[] results;
		
	    Matcher(Pattern pat, String cs) {
	        this.pat = pat;
	        this.strString = cs;
	        this.leftBound = 0;
	        this.rightBound = strString.length();
	    }
	    
		public boolean find() { 
			@SuppressWarnings("unused")
			String s = (this.rightBound == this.strString.length() ? this.strString
					: this.strString.substring(0, this.rightBound));
			@SuppressWarnings("unused")
			int lb = this.leftBound;

			/**
			 * @j2sNative
			 * 
			 * 			  this.pat.regexp.lastIndex = this.leftBound; 
			 * 			  this.results = this.pat.regexp.exec(s); 
			 * 			  this.leftBound = this.pat.regexp.lastIndex;
			 */
			{
			}
			return (this.results != null);
		}

		public int start() {
	    	/** 
	    	 * @j2sNative
	    	 * 
	    	 * return this.pat.regexp.lastIndex - this.results[0].length;
	    	 * 
	    	 */
	    	{
	    		 return 0;
	    	}
	    }

		public int end() {
			/**
			 * @j2sNative
			 * return this.pat.regexp.lastIndex;
			 */ 
	    	{
			    	return -1;
			}
	    }

		public String group() {
	    	if (results == null || results.length == 0) {
	    		return null;
	    	}
			return this.results[0];
	    }

	}
	    
    public static final int CASE_INSENSITIVE = 1 << 1;
//    public static final int MULTILINE = 1 << 3;
    
    /**
     * Bit mask that includes all defined match flags
     */
    static final int flagsBitMask = Pattern.CASE_INSENSITIVE;


    /**
     * Dismiss public constructor.
     * 
     */
    private Pattern() {
    }

// BH SAEM
//    public static Pattern compile(String pattern) {
//        return compile(pattern, 0);
//    }
//
    public static Pattern compile(String regex, int flags) {
    	
    	if ((flags != 0) &&
    	   	((flags | flagsBitMask) != flagsBitMask)) {
    	        	
    	    throw new IllegalArgumentException("Illegal flags");
    	}
    	@SuppressWarnings("unused")
		String flagStr = "g";
    	if ((flags & Pattern.CASE_INSENSITIVE) != 0) {
    		flagStr += "i";
    	}
    	Pattern pattern = new Pattern();
		/**
		 * @j2sNative
		pattern.regexp = new RegExp(regex, flagStr);
		 */ 
    	{}
		return pattern;
    }

    public Matcher matcher(CharSequence cs) {
        return new Matcher(this, cs.toString());
    }

}
