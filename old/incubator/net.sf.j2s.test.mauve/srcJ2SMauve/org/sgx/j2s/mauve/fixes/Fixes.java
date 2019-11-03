package org.sgx.j2s.mauve.fixes;

import java.util.Comparator;
import java.util.Properties;

/**
 * fixes needed for basic mauve test to run in j2s.
 * @author sgurin
 *
 */
public class Fixes {
	boolean applyed = false;
	private static Fixes instance;
	private Fixes() {
	}
	public static Fixes getInstance() {
		if (null == instance) {
			instance = new Fixes();
		}
		return instance;
	}
	public void applyAllFixes() {
		if(!applyed) {
			fixBugSystemProperties();
//			fixBugIntegerGetInteger();
			fixBugDoubleCompare();
			fixBugFloatCompare();
			new FixesInInteger().applyAllFixes();
			fixBugStringCASE_INSENSITIVE_ORDER();
			
//			fixBugStringCharAt();
			
			new FixesInLong().applyAllFixes();
			
//			new FixesInCharacter().applyAllFixes();
		}
		applyed=true;
	}
	
	

//	public static char fixBugString_charAt(String s, int idx) {		
//		if(idx<0 || idx>=s.length())
//			throw new IndexOutOfBoundsException(idx+"");
//		/**
//		 * @j2sNative
//		 * return s.charAt_old(idx);
//		 */{ return 0;}		
//	}
//	private void fixBugStringCharAt() {
//		//sgurin : charAt should throw IndexOutOfBoundsException in the case of invalid index
////		String.prototype.$charAt = String.prototype.charAt;
////		String.prototype.charAt = function(idx) {
////			if(idx<0||idx>=this.length)
////				throw new java.lang.IndexOutOfBoundsException(idx+"");
////			return this.$charAt(idx);
////		}		
//		/**
//		 * @j2sNative
//		 //save old implementation
//		  java.lang.String.prototype.charAt_old = java.lang.String.prototype.charAt;
//		  //redefine charAt
//		  java.lang.String.prototype.charAt=function(idx) {
//		  	org.sgx.j2s.mauve.fixes.Fixes.fixBugString_charAt(this, idx);
//		  }
//		 */{}
//	}
	
	
	
	/* *** System.getproperties() returning null *** */
	
	/**
	 * bug fix that poblates system.props that is null
	 * this should be in java/lang/conasole.js 
	 */
	public void fixBugSystemProperties() {
		 Properties p = new Properties();
		/**
		 * @j2sNative
		  if(System.props==null)
		  	System.props=p;
		 */{}
		 
		 p.put("os.name", "web");
	}
	
	
	
	
	
	
	
	
	
	
	
	/* *** Double.compare *** */
	/**
     * Compares the two specified <code>double</code> values. The sign
     * of the integer value returned is the same as that of the
     * integer that would be returned by the call:
     * <pre>
     *    new Double(d1).compareTo(new Double(d2))
     * </pre>
     *
     * @param   d1        the first <code>double</code> to compare
     * @param   d2        the second <code>double</code> to compare
     * @return  the value <code>0</code> if <code>d1</code> is
     *		numerically equal to <code>d2</code>; a value less than
     *          <code>0</code> if <code>d1</code> is numerically less than
     *		<code>d2</code>; and a value greater than <code>0</code>
     *		if <code>d1</code> is numerically greater than
     *		<code>d2</code>.
     * @since 1.4
     */
    public static int fixBugDouble_compare_method_impl(double d1, double d2) {
        if (d1 < d2)
            return -1;		 // Neither val is NaN, thisVal is smaller
        if (d1 > d2)
            return 1;		 // Neither val is NaN, thisVal is larger
        return 0;   //sgurin: because doubleTolOngBits is not supported in java2script
    }
    public void fixBugDoubleCompare() {
		/**
		 * @j2sNative
		java.lang.Double.compare = org.sgx.j2s.mauve.fixes.Fixes.fixBugDouble_compare_method_impl;
		java.lang.Double.prototype.compareTo=function(otherDouble) {
			var otherValue = otherDouble;
			if(otherDouble.valueOf) 
				otherValue=otherDouble.valueOf();
			return java.lang.Double.compare(this.valueOf(), otherValue);
		};
		 */{}
	}
  
    
    
    
    /* *** float.compare *** */
    public static int fixBugFloat_compare_methodImpl(float f1, float f2) {
        if (f1 < f2)
             return -1;		 // Neither val is NaN, thisVal is smaller
         if (f1 > f2)
             return 1;		 // Neither val is NaN, thisVal is larger
         return 0;
     }
    
    public static void fixBugFloatCompare() {
    	/**@j2sNative
    	 * 
    	 java.lang.Float.compare=org.sgx.j2s.mauve.fixes.Fixes.fixBugFloat_compare_methodImpl;
    	 java.lang.Float.prototype.compareTo=function(anotherFloat) {
	    	 var otherValue = anotherFloat;
				if(anotherFloat.valueOf) 
					otherValue=anotherFloat.valueOf();
				return java.lang.Float.compare(this.valueOf(), otherValue);
    	 }
    	 */{}
    } 
   
    
   
    
    
    /* *** String.CASE_INSENSITIVE_ORDER undefined *** */ 
    /**
     * A Comparator that orders <code>String</code> objects as by
     * <code>compareToIgnoreCase</code>. This comparator is serializable.
     * <p>
     * Note that this Comparator does <em>not</em> take locale into account,
     * and will result in an unsatisfactory ordering for certain locales.
     * The java.text package provides <em>Collators</em> to allow
     * locale-sensitive ordering.
     *
     * @see     java.text.Collator#compare(String, String)
     * @since   1.2
     */
    public static final Comparator<String> CASE_INSENSITIVE_ORDER
                                         = new CaseInsensitiveComparator();
    private static class CaseInsensitiveComparator
                         implements Comparator<String>, java.io.Serializable {
        public int compare(String s1, String s2) {
            int n1=s1.length(), n2=s2.length();
            for (int i1=0, i2=0; i1<n1 && i2<n2; i1++, i2++) {
                char c1 = s1.charAt(i1);
                char c2 = s2.charAt(i2);
                if (c1 != c2) {
                    c1 = Character.toUpperCase(c1);
                    c2 = Character.toUpperCase(c2);
                    if (c1 != c2) {
                        c1 = Character.toLowerCase(c1);
                        c2 = Character.toLowerCase(c2);
                        if (c1 != c2) {
                            return c1 - c2;
                        }
                    }
                }
            }
            return n1 - n2;
        }
    }
    public void fixBugStringCASE_INSENSITIVE_ORDER() {
		/**
		 * @j2sNative
		 java.lang.String.CASE_INSENSITIVE_ORDER = org.sgx.j2s.mauve.fixes.Fixes.CASE_INSENSITIVE_ORDER;
		 */{}
	}
	
    
    
    
    
//    
//    
//	public static void main(String[] args) {
//		new Fixes().applyAllFixes();
//		testStrCharAt();
//	}
//	private static void testStrCharAt() {
//		String s = "123";
//		try {
////			s.charAt(-1);
//			throw new IndexOutOfBoundsException();
//			
//		} catch (IndexOutOfBoundsException e) {
////			e.printStackTrace();
//			System.out.println("Exception");
//		} catch (Exception e) {
////			e.printStackTrace();
//			System.out.println("Exception");
//		
//		} catch (Throwable e) {
//	//		e.printStackTrace();
//			System.out.println("Throwable");
//		}
//	}
	
	
	
	
}
