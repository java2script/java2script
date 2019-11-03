// Tags: not-a-test

package gnu.testlet.java2.util.AbstractMap;

import java.util.*;

class ESet extends AbstractSet {

	private AcuniaAbstractMapTest map;

	ESet(AcuniaAbstractMapTest map) {
		this.map = map;
	}
   
        public Iterator iterator() {
            return new EIterator(map);
        }

        public int size() {
            return map.keys.size();
        }
}

