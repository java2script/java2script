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

package java.util;

import javajs.util.BS;

public class BitSet extends BS {
	public BitSet() {
		super();
	}
	
	public BitSet(int nbits) {
		super();
	    init(nbits);
	}
	
    public void flip(int bitIndex) {
        if (bitIndex < 0)
            throw new IndexOutOfBoundsException("bitIndex < 0: " + bitIndex);
          int wordIndex = wordIndex(bitIndex);
          expandTo(wordIndex);
          words[wordIndex] ^= (1 << bitIndex); // Restores invariants
       }
       public void flip(int fromIndex, int toIndex) {
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
    	        words[startWordIndex] ^= (firstWordMask & lastWordMask);
    	      } else {
    	        // Case 2: Multiple words
    	        // Handle first word
    	        words[startWordIndex] ^= firstWordMask;

    	        // Handle intermediate words, if any
    	        for (int i = startWordIndex + 1; i < endWordIndex; i++)
    	          words[i] ^= WORD_MASK;

    	        // Handle last word (restores invariants)
    	        words[endWordIndex] ^= lastWordMask;
    	      }
       }
       public void set(int bitIndex, boolean value) {
         setBitTo(bitIndex, value);
       }
       public void set(int fromIndex, int toIndex) {
         setBits(fromIndex, toIndex);
       }
       public void set(int fromIndex, int toIndex, boolean value) {
           if (value)
               set(fromIndex, toIndex);
           else
               clear(fromIndex, toIndex);
       }
       public void clear(int fromIndex, int toIndex) {
         clearBits(fromIndex, toIndex);
       }
       public void clear() { 
         clearAll();
       }
       public BitSet get(int fromIndex, int toIndex) {
           //checkRange(fromIndex, toIndex);

           //checkInvariants();

           int len = length();

           // If no set bits in range return empty bitset
           if (len <= fromIndex || fromIndex == toIndex)
               return new BitSet(0);

           // An optimization
           if (toIndex > len)
               toIndex = len;

           BitSet result = new BitSet(toIndex - fromIndex);
           int targetWords = wordIndex(toIndex - fromIndex - 1) + 1;
           int sourceIndex = wordIndex(fromIndex);
           boolean wordAligned = ((fromIndex & BIT_INDEX_MASK) == 0);

           // Process all words but the last word
           for (int i = 0; i < targetWords - 1; i++, sourceIndex++)
               result.words[i] = wordAligned ? words[sourceIndex] :
                   (words[sourceIndex] >>> fromIndex) |
                   (words[sourceIndex+1] << -fromIndex);

           // Process the last word
           int lastWordMask = WORD_MASK >>> -toIndex;
           result.words[targetWords - 1] =
               ((toIndex-1) & BIT_INDEX_MASK) < (fromIndex & BIT_INDEX_MASK)
               ? /* straddles source words */
               ((words[sourceIndex] >>> fromIndex) |
                (words[sourceIndex+1] & lastWordMask) << -fromIndex)
               :
               ((words[sourceIndex] & lastWordMask) >>> fromIndex);

           // Set wordsInUse correctly
           result.wordsInUse = targetWords;
           result.recalculateWordsInUse();
           //result.checkInvariants();

           return result;
       }


}
