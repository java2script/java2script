/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
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

package javajs.util;

import javajs.api.JSONEncodable;



/**
 * 
 * a fast 32-bit BitSet optimized for Java2Script -- about 25 times faster than
 * java.util.BitSet
 * 
 * @author Bob Hanson hansonr@stolaf.edu
 * 
 *         Additions by Bob Hanson to allow for JavaScript mix of int/long Note
 *         that Firefox (Sept 2012) does not really treat "Int32Array" as such,
 *         because any element can be pushed into being a 64-bit number, which
 *         really isn't because the last 8 bits are not usable.
 * 
 *         This class implements a vector of bits that grows as needed. Each
 *         component of the bit set has a {@code boolean} value. The bits of a
 *         {@code BitSet} are indexed by nonnegative integers. Individual
 *         indexed bits can be examined, set, or cleared. One {@code BitSet} may
 *         be used to modify the contents of another {@code BitSet} through
 *         logical AND, logical inclusive OR, and logical exclusive OR
 *         operations.
 * 
 *         <p>
 *         By default, all bits in the set initially have the value {@code
 *         false}.
 * 
 *         <p>
 *         Every bit set has a current size, which is the number of bits of
 *         space currently in use by the bit set. Note that the size is related
 *         to the implementation of a bit set, so it may change with
 *         implementation. The length of a bit set relates to logical length of
 *         a bit set and is defined independently of implementation.
 * 
 *         <p>
 *         Unless otherwise noted, passing a null parameter to any of the
 *         methods in a {@code BitSet} will result in a {@code
 *         NullPointerException}.
 * 
 *         <p>
 *         A {@code BitSet} is not safe for multithreaded use without external
 *         synchronization.
 * 
 * @author Arthur van Hoff
 * @author Michael McCloskey
 * @author Martin Buchholz
 * @since JDK1.0
 */
public class BS implements Cloneable, JSONEncodable {
  /*
   * BitSets are packed into arrays of "words."
   * 
   * An int, which consists of 32 bits, requiring 5 address bits, is used for
   * the JavaScript port.
   */
  private final static int ADDRESS_BITS_PER_WORD = 5;
  private final static int BITS_PER_WORD = 1 << ADDRESS_BITS_PER_WORD;
  protected final static int BIT_INDEX_MASK = BITS_PER_WORD - 1;

  /* Used to shift left or right for a partial word mask */
  protected static final int WORD_MASK = 0xffffffff;


  /**
   * The internal field corresponding to the serialField "bits".
   */
  protected int[] words;

  /**
   * The number of words in the logical size of this BitSet.
   */
  protected transient int wordsInUse = 0;

  /**
   * Whether the size of "words" is user-specified. If so, we assume the user
   * knows what he's doing and try harder to preserve it.
   */
  private transient boolean sizeIsSticky = false;

  /* use serialVersionUID from JDK 1.0.2 for interoperability */
  //private static final long serialVersionUID = 7997698588986878753L;

  /**
   * Given a bit index, return word index containing it.
   * @param bitIndex 
   * @return b
   */
  protected static int wordIndex(int bitIndex) {
    return bitIndex >> ADDRESS_BITS_PER_WORD;
  }

  /**
   * Sets the field wordsInUse to the logical size in words of the bit set.
   * WARNING:This method assumes that the number of words actually in use is
   * less than or equal to the current value of wordsInUse!
   */
  protected void recalculateWordsInUse() {
    // Traverse the bitset until a used word is found
    int i;
    for (i = wordsInUse - 1; i >= 0; i--)
      if (words[i] != 0)
        break;

    wordsInUse = i + 1; // The new logical size
  }

  /**
   * Creates a new bit set. All bits are initially {@code false}.
   */
  public BS() {
    initWords(BITS_PER_WORD);
    sizeIsSticky = false;
  }

  /**
   * Creates a bit set whose initial size is large enough to explicitly
   * represent bits with indices in the range {@code 0} through {@code nbits-1}.
   * All bits are initially {@code false}.
   * 
   * @param nbits
   *          the initial size of the bit set
   * @return bs
   * @throws NegativeArraySizeException
   *           if the specified initial size is negative
   */
  public static BS newN(int nbits) {
    BS bs = new BS();
    bs.init(nbits);
    return bs;
  }

  protected void init(int nbits) {
    // nbits can't be negative; size 0 is OK
    if (nbits < 0)
      throw new NegativeArraySizeException("nbits < 0: " + nbits);
    initWords(nbits);
    sizeIsSticky = true;
  }

  private void initWords(int nbits) {
    words = new int[wordIndex(nbits - 1) + 1];
  }

  /**
   * Ensures that the BitSet can hold enough words.
   * 
   * @param wordsRequired
   *          the minimum acceptable number of words.
   */
  private void ensureCapacity(int wordsRequired) {
    if (words.length < wordsRequired) {
      // Allocate larger of doubled size or required size
      int request = Math.max(2 * words.length, wordsRequired);
      setLength(request);
      sizeIsSticky = false;
    }
  }

  /**
   * Ensures that the BitSet can accommodate a given wordIndex, temporarily
   * violating the invariants. The caller must restore the invariants before
   * returning to the user, possibly using recalculateWordsInUse().
   * 
   * @param wordIndex
   *          the index to be accommodated.
   */
  protected void expandTo(int wordIndex) {
    int wordsRequired = wordIndex + 1;
    if (wordsInUse < wordsRequired) {
      ensureCapacity(wordsRequired);
      wordsInUse = wordsRequired;
    }
  }


  /**
   * Sets the bit at the specified index to {@code true}.
   * 
   * @param bitIndex
   *          a bit index
   * @throws IndexOutOfBoundsException
   *           if the specified index is negative
   * @since JDK1.0
   */
  public void set(int bitIndex) {
    if (bitIndex < 0)
      throw new IndexOutOfBoundsException("bitIndex < 0: " + bitIndex);

    int wordIndex = wordIndex(bitIndex);
    expandTo(wordIndex);

    words[wordIndex] |= (1 << bitIndex); // Restores invariants

  }

  /**
   * Sets the bit at the specified index to the specified value.
   * 
   * @param bitIndex
   *          a bit index
   * @param value
   *          a boolean value to set
   * @throws IndexOutOfBoundsException
   *           if the specified index is negative
   * @since 1.4
   */
  public void setBitTo(int bitIndex, boolean value) {
    if (value)
      set(bitIndex);
    else
      clear(bitIndex);
  }

  /**
   * Sets the bits from the specified {@code fromIndex} (inclusive) to the
   * specified {@code toIndex} (exclusive) to {@code true}.
   * 
   * @param fromIndex
   *          index of the first bit to be set
   * @param toIndex
   *          index after the last bit to be set
   * @throws IndexOutOfBoundsException
   *           if {@code fromIndex} is negative, or {@code toIndex} is negative,
   *           or {@code fromIndex} is larger than {@code toIndex}
   * @since 1.4
   */
  public void setBits(int fromIndex, int toIndex) {

    if (fromIndex == toIndex)
      return;

    // Increase capacity if necessary
    int startWordIndex = wordIndex(fromIndex);
    int endWordIndex = wordIndex(toIndex - 1);
    expandTo(endWordIndex);

    int firstWordMask = WORD_MASK << fromIndex;
    int lastWordMask = WORD_MASK >>> -toIndex;
    if (startWordIndex == endWordIndex) {
      // Case 1: One word
      words[startWordIndex] |= (firstWordMask & lastWordMask);
    } else {
      // Case 2: Multiple words
      // Handle first word
      words[startWordIndex] |= firstWordMask;

      // Handle intermediate words, if any
      for (int i = startWordIndex + 1; i < endWordIndex; i++)
        words[i] = WORD_MASK;

      // Handle last word (restores invariants)
      words[endWordIndex] |= lastWordMask;
    }
  }

  /**
   * Sets the bit specified by the index to {@code false}.
   * 
   * @param bitIndex
   *          the index of the bit to be cleared
   * @throws IndexOutOfBoundsException
   *           if the specified index is negative
   * @since JDK1.0
   */
  public void clear(int bitIndex) {
    if (bitIndex < 0)
      throw new IndexOutOfBoundsException("bitIndex < 0: " + bitIndex);

    int wordIndex = wordIndex(bitIndex);
    if (wordIndex >= wordsInUse)
      return;

    words[wordIndex] &= ~(1 << bitIndex);

    recalculateWordsInUse();
  }

  /**
   * Sets the bits from the specified {@code fromIndex} (inclusive) to the
   * specified {@code toIndex} (exclusive) to {@code false}.
   * 
   * @param fromIndex
   *          index of the first bit to be cleared
   * @param toIndex
   *          index after the last bit to be cleared
   * @throws IndexOutOfBoundsException
   *           if {@code fromIndex} is negative, or {@code toIndex} is negative,
   *           or {@code fromIndex} is larger than {@code toIndex}
   * @since 1.4
   */
  public void clearBits(int fromIndex, int toIndex) {
    if (fromIndex == toIndex)
      return;

    int startWordIndex = wordIndex(fromIndex);
    if (startWordIndex >= wordsInUse)
      return;

    int endWordIndex = wordIndex(toIndex - 1);
    if (endWordIndex >= wordsInUse) {
      toIndex = length();
      endWordIndex = wordsInUse - 1;
    }

    int firstWordMask = WORD_MASK << fromIndex;
    int lastWordMask = WORD_MASK >>> -toIndex;
    if (startWordIndex == endWordIndex) {
      // Case 1: One word
      words[startWordIndex] &= ~(firstWordMask & lastWordMask);
    } else {
      // Case 2: Multiple words
      // Handle first word
      words[startWordIndex] &= ~firstWordMask;

      // Handle intermediate words, if any
      for (int i = startWordIndex + 1; i < endWordIndex; i++)
        words[i] = 0;

      // Handle last word
      words[endWordIndex] &= ~lastWordMask;
    }

    recalculateWordsInUse();
  }

  /**
   * Sets all of the bits in this BitSet to {@code false}.
   * 
   * @since 1.4
   */
  public void clearAll() {
    while (wordsInUse > 0)
      words[--wordsInUse] = 0;
  }

  /**
   * Returns the value of the bit with the specified index. The value is {@code
   * true} if the bit with the index {@code bitIndex} is currently set in this
   * {@code BitSet}; otherwise, the result is {@code false}.
   * 
   * @param bitIndex
   *          the bit index
   * @return the value of the bit with the specified index
   * @throws IndexOutOfBoundsException
   *           if the specified index is negative
   */
  public boolean get(int bitIndex) {
    if (bitIndex < 0)
      throw new IndexOutOfBoundsException("bitIndex < 0: " + bitIndex);

    int wordIndex = wordIndex(bitIndex);
    return (wordIndex < wordsInUse)
        && ((words[wordIndex] & (1 << bitIndex)) != 0);
  }

  /**
   * Returns the index of the first bit that is set to {@code true} that occurs
   * on or after the specified starting index. If no such bit exists then
   * {@code -1} is returned.
   * 
   * <p>
   * To iterate over the {@code true} bits in a {@code BitSet}, use the
   * following loop:
   * 
   * <pre>
   * @code
   * for (int i = bs.nextSetBit(0); i >= 0; i = bs.nextSetBit(i+1)) {
   *     // operate on index i here
   * }}
   * </pre>
   * 
   * @param fromIndex
   *          the index to start checking from (inclusive)
   * @return the index of the next set bit, or {@code -1} if there is no such
   *         bit
   * @throws IndexOutOfBoundsException
   *           if the specified index is negative
   * @since 1.4
   */
  public int nextSetBit(int fromIndex) {
    if (fromIndex < 0)
      throw new IndexOutOfBoundsException("fromIndex < 0: " + fromIndex);

    int u = wordIndex(fromIndex);
    if (u >= wordsInUse)
      return -1;

    int word = words[u] & (WORD_MASK << fromIndex);

    while (true) {
      if (word != 0)
        return (u * BITS_PER_WORD) + Integer.numberOfTrailingZeros(word);
      if (++u == wordsInUse)
        return -1;
      word = words[u];
    }
  }

  /**
   * Returns the index of the first bit that is set to {@code false} that occurs
   * on or after the specified starting index.
   * 
   * @param fromIndex
   *          the index to start checking from (inclusive)
   * @return the index of the next clear bit
   * @throws IndexOutOfBoundsException
   *           if the specified index is negative
   * @since 1.4
   */
  public int nextClearBit(int fromIndex) {
    // Neither spec nor implementation handle bitsets of maximal length.
    // See 4816253.
    if (fromIndex < 0)
      throw new IndexOutOfBoundsException("fromIndex < 0: " + fromIndex);

    int u = wordIndex(fromIndex);
    if (u >= wordsInUse)
      return fromIndex;

    int word = ~words[u] & (WORD_MASK << fromIndex);

    while (true) {
      if (word != 0)
        return (u * BITS_PER_WORD) + Integer.numberOfTrailingZeros(word);
      if (++u == wordsInUse)
        return wordsInUse * BITS_PER_WORD;
      word = ~words[u];
    }
  }

  /**
   * Returns the "logical size" of this {@code BitSet}: the index of the highest
   * set bit in the {@code BitSet} plus one. Returns zero if the {@code BitSet}
   * contains no set bits.
   * 
   * @return the logical size of this {@code BitSet}
   * @since 1.2
   */
  public int length() {
    if (wordsInUse == 0)
      return 0;

    return BITS_PER_WORD * (wordsInUse - 1)
        + (BITS_PER_WORD - Integer.numberOfLeadingZeros(words[wordsInUse - 1]));
  }

  /**
   * Returns true if this {@code BitSet} contains no bits that are set to
   * {@code true}.
   * 
   * @return boolean indicating whether this {@code BitSet} is empty
   * @since 1.4
   */
  public boolean isEmpty() {
    return wordsInUse == 0;
  }

  /**
   * Returns true if the specified {@code BitSet} has any bits set to {@code
   * true} that are also set to {@code true} in this {@code BitSet}.
   * 
   * @param set
   *          {@code BitSet} to intersect with
   * @return boolean indicating whether this {@code BitSet} intersects the
   *         specified {@code BitSet}
   * @since 1.4
   */
  public boolean intersects(BS set) {
    for (int i = Math.min(wordsInUse, set.wordsInUse) - 1; i >= 0; i--)
      if ((words[i] & set.words[i]) != 0)
        return true;
    return false;
  }

  /**
   * Returns the number of bits set to {@code true} in this {@code BitSet}.
   * 
   * @return the number of bits set to {@code true} in this {@code BitSet}
   * @since 1.4
   */
  public int cardinality() {
    int sum = 0;
    for (int i = 0; i < wordsInUse; i++)
      sum += Integer.bitCount(words[i]);
    return sum;
  }

  /**
   * Performs a logical <b>AND</b> of this target bit set with the argument bit
   * set. This bit set is modified so that each bit in it has the value {@code
   * true} if and only if it both initially had the value {@code true} and the
   * corresponding bit in the bit set argument also had the value {@code true}.
   * 
   * @param set
   *          a bit set
   */
  public void and(BS set) {
    if (this == set)
      return;

    while (wordsInUse > set.wordsInUse)
      words[--wordsInUse] = 0;

    // Perform logical AND on words in common
    for (int i = 0; i < wordsInUse; i++)
      words[i] &= set.words[i];

    recalculateWordsInUse();
  }

  /**
   * Performs a logical <b>OR</b> of this bit set with the bit set argument.
   * This bit set is modified so that a bit in it has the value {@code true} if
   * and only if it either already had the value {@code true} or the
   * corresponding bit in the bit set argument has the value {@code true}.
   * 
   * @param set
   *          a bit set
   */
  public void or(BS set) {
    if (this == set)
      return;

    int wordsInCommon = Math.min(wordsInUse, set.wordsInUse);

    if (wordsInUse < set.wordsInUse) {
      ensureCapacity(set.wordsInUse);
      wordsInUse = set.wordsInUse;
    }

    // Perform logical OR on words in common
    for (int i = 0; i < wordsInCommon; i++)
      words[i] |= set.words[i];

    // Copy any remaining words
    if (wordsInCommon < set.wordsInUse)
      System.arraycopy(set.words, wordsInCommon, words, wordsInCommon,
          wordsInUse - wordsInCommon);

  }

  /**
   * Performs a logical <b>XOR</b> of this bit set with the bit set argument.
   * This bit set is modified so that a bit in it has the value {@code true} if
   * and only if one of the following statements holds:
   * <ul>
   * <li>The bit initially has the value {@code true}, and the corresponding bit
   * in the argument has the value {@code false}.
   * <li>The bit initially has the value {@code false}, and the corresponding
   * bit in the argument has the value {@code true}.
   * </ul>
   * 
   * @param set
   *          a bit set
   */
  public void xor(BS set) {
    int wordsInCommon = Math.min(wordsInUse, set.wordsInUse);

    if (wordsInUse < set.wordsInUse) {
      ensureCapacity(set.wordsInUse);
      wordsInUse = set.wordsInUse;
    }

    // Perform logical XOR on words in common
    for (int i = 0; i < wordsInCommon; i++)
      words[i] ^= set.words[i];

    // Copy any remaining words
    if (wordsInCommon < set.wordsInUse)
      System.arraycopy(set.words, wordsInCommon, words, wordsInCommon,
          set.wordsInUse - wordsInCommon);

    recalculateWordsInUse();
  }

  /**
   * Clears all of the bits in this {@code BitSet} whose corresponding bit is
   * set in the specified {@code BitSet}.
   * 
   * @param set
   *          the {@code BitSet} with which to mask this {@code BitSet}
   * @since 1.2
   */
  public void andNot(BS set) {
    // Perform logical (a & !b) on words in common
    for (int i = Math.min(wordsInUse, set.wordsInUse) - 1; i >= 0; i--)
      words[i] &= ~set.words[i];

    recalculateWordsInUse();
  }

  /**
   * Returns a hash code value for this bit set. The hash code depends only on
   * which bits have been set within this <code>BitSet</code>. The algorithm
   * used to compute it may be described as follows.
   * <p>
   * Suppose the bits in the <code>BitSet</code> were to be stored in an array
   * of <code>long</code> integers called, say, <code>words</code>, in such a
   * manner that bit <code>k</code> is set in the <code>BitSet</code> (for
   * nonnegative values of <code>k</code>) if and only if the expression
   * 
   * <pre>
   * ((k &gt;&gt; 6) &lt; words.length) &amp;&amp; ((words[k &gt;&gt; 6] &amp; (1 &lt;&lt; (bit &amp; 0x3F))) != 0)
   * </pre>
   * 
   * is true. Then the following definition of the <code>hashCode</code> method
   * would be a correct implementation of the actual algorithm:
   * 
   * <pre>
   * public int hashCode() {
   *  long h = 1234;
   *  for (int i = words.length; --i &gt;= 0;) {
   *    h &circ;= words[i] * (i + 1);
   *  }
   *  return (int) ((h &gt;&gt; 32) &circ; h);
   * }
   * </pre>
   * 
   * Note that the hash code values change if the set of bits is altered.
   * <p>
   * Overrides the <code>hashCode</code> method of <code>Object</code>.
   * 
   * @return a hash code value for this bit set.
   */
  @Override
  public int hashCode() {
    long h = 1234;
    for (int i = wordsInUse; --i >= 0;)
      h ^= words[i] * (i + 1);

    return (int) ((h >> 32) ^ h);
  }

  /**
   * Returns the number of bits of space actually in use by this {@code BitSet}
   * to represent bit values. The maximum element in the set is the size - 1st
   * element.
   * 
   * @return the number of bits currently in this bit set
   */
  public int size() {
    return words.length * BITS_PER_WORD;
  }

  /**
   * Compares this object against the specified object. The result is {@code
   * true} if and only if the argument is not {@code null} and is a {@code
   * Bitset} object that has exactly the same set of bits set to {@code true} as
   * this bit set. That is, for every nonnegative {@code int} index {@code k},
   * 
   * <pre>
   * ((BitSet) obj).get(k) == this.get(k)
   * </pre>
   * 
   * must be true. The current sizes of the two bit sets are not compared.
   * 
   * @param obj
   *          the object to compare with
   * @return {@code true} if the objects are the same; {@code false} otherwise
   * @see #size()
   */
  @Override
  public boolean equals(Object obj) {
    if (!(obj instanceof BS))
      return false;
    if (this == obj)
      return true;

    BS set = (BS) obj;

    if (wordsInUse != set.wordsInUse)
      return false;

    // Check words in use by both BitSets
    for (int i = 0; i < wordsInUse; i++)
      if (words[i] != set.words[i])
        return false;

    return true;
  }

  /**
   * Cloning this {@code BitSet} produces a new {@code BitSet} that is equal to
   * it. The clone of the bit set is another bit set that has exactly the same
   * bits set to {@code true} as this bit set.
   * 
   * @return a clone of this bit set
   * @see #size()
   */
  @Override
  public Object clone() {
    if (!sizeIsSticky && wordsInUse != words.length)
      setLength(wordsInUse);
    return copy(this);
  }

  /**
   * Attempts to reduce internal storage used for the bits in this bit set.
   * Calling this method may, but is not required to, affect the value returned
   * by a subsequent call to the {@link #size()} method.
   * @param n 
   */
  private void setLength(int n) {
    /**
     * @j2sNative
     *     if (n == this.words.length) return;
     *     if (n == this.wordsInUse) {
     *      this.words = Clazz.array(-1, this.words, 0, n);
     *      return;
     *     }
     */
    {}
    int[] a = new int[n];
    System.arraycopy(words, 0, a, 0, wordsInUse);
    words = a;    
  }

  /**
   * Returns a string representation of this bit set. For every index for which
   * this {@code BitSet} contains a bit in the set state, the decimal
   * representation of that index is included in the result. Such indices are
   * listed in order from lowest to highest, separated by ",&nbsp;" (a comma and
   * a space) and surrounded by braces, resulting in the usual mathematical
   * notation for a set of integers.
   * 
   * <p>
   * Example:
   * 
   * <pre>
   * BitSet drPepper = new BitSet();
   * </pre>
   * 
   * Now {@code drPepper.toString()} returns "{}".
   * <p>
   * 
   * <pre>
   * drPepper.set(2);
   * </pre>
   * 
   * Now {@code drPepper.toString()} returns "{2}".
   * <p>
   * 
   * <pre>
   * drPepper.set(4);
   * drPepper.set(10);
   * </pre>
   * 
   * Now {@code drPepper.toString()} returns "{2, 4, 10}".
   * 
   * @return a string representation of this bit set
   */
  @Override
  public String toString() {
    return escape(this, '(', ')');
  }
  
  private final static int[] emptyBitmap = new int[0];

  /**
   * fast copy
   * 
   * @param bitsetToCopy
   * @return bs
   */
  public static BS copy(BS bitsetToCopy) {
    BS bs;
    /**
     * Clazz.clone will copy wordsInUse and sizeIsSticky, 
     * but just a pointer to the words array.
     * 
     * @j2sNative
     * 
     *            bs = Clazz.clone(bitsetToCopy);
     * 
     */
    {
      bs = new BS();
    }
    int wordCount = bitsetToCopy.wordsInUse;
    if (wordCount == 0) {
      bs.words = emptyBitmap;
    } else {
      
      /**
       * Clazz.clone will copy wordsInUse and sizeIsSticky, 
       * but just a pointer to the words array.
       * 
       * @j2sNative
       * 
       *   bs.words = Clazz.array(-1, bitsetToCopy.words, 0, bs.wordsInUse = wordCount);
       * 
       */
      {
        bs.words = new int[bs.wordsInUse = wordCount];
        System.arraycopy(bitsetToCopy.words, 0, bs.words, 0, wordCount);
      }

    }
    return bs;
  }

  /**
   * 
   * @param max
   * @return n bits below max
   */
  public int cardinalityN(int max) {
    int n = cardinality();
    for (int i = length(); --i >= max;)
      if (get(i))
        n--;
    return n;
  }

  @Override
  public String toJSON() {

    int numBits = (wordsInUse > 128 ? cardinality() : wordsInUse
        * BITS_PER_WORD);
    SB b = SB.newN(6 * numBits + 2);
    b.appendC('[');

    int i = nextSetBit(0);
    if (i != -1) {
      b.appendI(i);
      for (i = nextSetBit(i + 1); i >= 0; i = nextSetBit(i + 1)) {
        int endOfRun = nextClearBit(i);
        do {
          b.append(", ").appendI(i);
        } while (++i < endOfRun);
      }
    }

    b.appendC(']');
    return b.toString();
  }

  public static String escape(BS bs, char chOpen, char chClose) {
    if (bs == null)
      return chOpen + "{}" + chClose;
    SB s = new SB();
    s.append(chOpen + "{");
    int imax = bs.length();
    int iLast = -1;
    int iFirst = -2;
    int i = -1;
    while (++i <= imax) {
      boolean isSet = bs.get(i);
      if (i == imax || iLast >= 0 && !isSet) {
        if (iLast >= 0 && iFirst != iLast)
          s.append((iFirst == iLast - 1 ? " " : ":") + iLast);
        if (i == imax)
          break;
        iLast = -1;
      }
      if (bs.get(i)) {
        if (iLast < 0) {
          s.append((iFirst == -2 ? "" : " ") + i);
          iFirst = i;
        }
        iLast = i;
      }
    }
    s.append("}").appendC(chClose);
    return s.toString();
  }

  public static BS unescape(String str) {
    char ch;
    int len;
    if (str == null || (len = (str = str.trim()).length()) < 4
        || str.equalsIgnoreCase("({null})") 
        || (ch = str.charAt(0)) != '(' && ch != '[' 
        || str.charAt(len - 1) != (ch == '(' ? ')' : ']')
        || str.charAt(1) != '{' || str.indexOf('}') != len - 2)
      return null;
    len -= 2;
    for (int i = len; --i >= 2;)
      if (((ch = str.charAt(i)) < 48 || ch > 57) && ch != ' ' && ch != '\t'
          && ch != ':')
        return null;
    int lastN = len;
    while (48 <= (ch = str.charAt(--lastN)) && ch <= 57) {
      // loop
    }
    if (++lastN == len)
      lastN = 0;
    else
      try {
        lastN = Integer.parseInt(str.substring(lastN, len));
      } catch (NumberFormatException e) {
        return null;
      }
    BS bs = BS.newN(lastN);
    lastN = -1;
    int iPrev = -1;
    int iThis = -2;
    for (int i = 2; i <= len; i++) {
      switch (ch = str.charAt(i)) {
      case '\t':
      case ' ':
      case '}':
        if (iThis < 0)
          break;
        if (iThis < lastN)
          return null;
        lastN = iThis;
        if (iPrev < 0)
          iPrev = iThis;
        bs.setBits(iPrev, iThis + 1);
        iPrev = -1;
        iThis = -2;
        break;
      case ':':
        iPrev = lastN = iThis;
        iThis = -2;
        break;
      default:
        if (48 <= ch && ch <= 57) {
          if (iThis < 0)
            iThis = 0;
          iThis = (iThis * 10) + (ch - 48);
        }
      }
    }
    return (iPrev >= 0 ? null : bs);
  }

}
