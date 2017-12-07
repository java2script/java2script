// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 54154 $
 * Date modified : $Date: 2011-07-17 09:07:30 -0500 (Sun, 17 Jul 2011) $
 */
package edu.colorado.phet.common.phetcommon.util;

import java.util.ArrayList;
import java.util.ConcurrentModificationException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

/**
 * 
 * 
 * Map implementation that maintains a list of values for each key.
 *
 * @author Ron LeMaster
 * @version $Revision: 54154 $
 */
public class MultiMap implements Map<Object, Object> {
    private long lastModified = 0;
    private TreeMap<Object, ArrayList<Object>> map = new TreeMap<Object, ArrayList<Object>>();
    
    // BH GraphicLayerSet optimized to avoid unnecessary calls to iterator

    /**
     * Adds an object to the map at the key specified. Note that the name for this method cannot
     * be "put", or it will override that method in the Map interface, which must be preserved for
     * XMLEncoder and XMLDecoder to work properly.
     *
     * @param key
     * @param value
     * @return The list at the key, prior to the addition of the specified value
     */
    @Override
		public Object put( Object key, Object value ) {
    		ArrayList<Object> returnValue = map.get( key );
        ArrayList<Object> list = returnValue;
        lastModified = System.currentTimeMillis();
        if ( returnValue == null ) {
            list = new ArrayList<Object>();
            map.put( key, list );
            returnValue = list;
        }
        list.add( value );
        return returnValue;
    }

    public Object lastKey() {
        return map.lastKey();
    }

    @Override
		@SuppressWarnings("unchecked")
		public void putAll( Map<?,?> map ) {
        lastModified++;
        this.map.putAll( (Map<? extends Object, ? extends ArrayList<Object>>) map );
    }

    @Override
		public boolean containsValue( Object value ) {
        boolean result = false;
        Iterator<ArrayList<Object>> it = map.values().iterator();
        while ( it.hasNext() && !result ) {
            result = ( it.next() ).contains( value );
        }
        return result;
    }

    @Override
		public void clear() {
        lastModified++;
        map.clear();
    }

    @Override
		public Object remove( Object key ) {
        lastModified++;
        return map.remove( key );
    }

    public void removeValue( Object value ) {
        while ( this.containsValue( value ) ) {
            Iterator<?> i = this.iterator();
            while ( i.hasNext() ) {
                if ( i.next().equals( value ) ) {
                    i.remove();
                    break;
                }
            }
            lastModified++;
        }
    }

    public MultiMapIterator iterator() {
        return new ForwardIterator();
    }

    public MultiMapIterator reverseIterator() {
        return new ReverseIterator();
    }

    /**
     * Returns the number of values in the MultiMap. Note that this is not
     * neccessarilly the same as the number of entries.
     *
     * @return the number of values.
     */
    @Override
		public int size() {
        int n = 0;
        Iterator<?> it = map.entrySet().iterator();
        while ( it.hasNext() ) {
            Entry<?, ?> entry = (Entry<?, ?>) it.next();
            List<?> list = (List<?>) entry.getValue();
            n += list.size();
        }
        return n;
    }

    @Override
		public boolean isEmpty() {
        return map.isEmpty();
    }

    @Override
		public boolean containsKey( Object key ) {
        return map.containsKey( key );
    }

    /**
     * Returns all the values in the map. The list returned will have an entry for
     * every value in the map, rather than one for every key.
     *
     * @return all values
     */
    @Override
		public ArrayList<Object> values() {
        ArrayList<Object> values = new ArrayList<Object>();
        Iterator<Entry<Object, ArrayList<Object>>> it = map.entrySet().iterator();
        while ( it.hasNext() ) {
            Entry<?, ArrayList<Object>> entry = it.next();
            ArrayList<Object> list = entry.getValue();
            values.addAll( list );
        }
        return values;
    }

    @Override
		@SuppressWarnings({ "unchecked", "rawtypes" })
		public Set entrySet() {
        throw new RuntimeException( "not implemented" );
    }

    @Override
		@SuppressWarnings({ "unchecked", "rawtypes" })
		public Set keySet() {
        return map.keySet();
    }

    @Override
		public Object get( Object key ) {
        return map.get( key );
    }

    ///////////////////////////////////////////////////////
    // Persistence support
    public TreeMap<?, ?> getMap() {
        return map;
    }

    public void setMap( TreeMap<Object, ArrayList<Object>> map ) {
        this.map = map;
    }

    ///////////////////////////////////////////////////////
    // Inner classes
    //

    /**
     * Abstract iterator for MultiMaps
     */
    private abstract class MultiMapIterator implements Iterator<Object> {
        protected long timeCreated;

        public MultiMapIterator() {
            timeCreated = MultiMap.this.lastModified;
        }

        protected void concurrentModificationCheck() {
            if ( timeCreated < MultiMap.this.lastModified ) {
                throw new ConcurrentModificationException();
            }
        }
    }


    public int[] x = {3,5};
    
    private class ForwardIterator extends MultiMapIterator {
        private Iterator<Map.Entry<Object, ArrayList<Object>>> mapIterator;
        private Iterator<Object> listIterator;
        private ArrayList<Object> currentList;
//        private long xx = timeCreated;
        ForwardIterator() {
//        	 int[] y = x;
            mapIterator = map.entrySet().iterator();
//            mapIterator = MultiMap.this.entrySet().iterator();
            if ( mapIterator.hasNext() ) {
                nextListIterator();
            }
        }

        @Override
				public boolean hasNext() {
            concurrentModificationCheck();
            if ( mapIterator.hasNext() ) {
                return true;
            }
            else if ( listIterator != null ) {
                return listIterator.hasNext();
            }
            return false;
        }

        @Override
				public Object next() {
            concurrentModificationCheck();
            if ( listIterator.hasNext() ) {
                return listIterator.next();
            }
            else if ( mapIterator.hasNext() ) {
                nextListIterator();
                return this.next();
            }
            return null;
        }

        @Override
				public void remove() {
            concurrentModificationCheck();
            listIterator.remove();
            if ( currentList.size() == 0 ) {
                mapIterator.remove();
            }
            MultiMap.this.lastModified++;
        }

        @SuppressWarnings({ "unchecked", "rawtypes" })
				private void nextListIterator() {
            currentList = (ArrayList<Object>) ( (Map.Entry) mapIterator.next() ).getValue();
            listIterator = currentList.iterator();
        }
    }
    // end of ForwardIterator

    /**
     * ReverseIterator
     */
    private class ReverseIterator extends MultiMapIterator {
        private ArrayList<Object> currentList;
        private int currentListIdx = 0;

        public ReverseIterator() {
            if ( !map.isEmpty() ) {
                Object currentLastKey = map.lastKey();
                if ( currentLastKey != null ) {
                    currentList = map.get( currentLastKey );
                    currentListIdx = currentList.size();
                }
            }
        }

        @Override
				public boolean hasNext() {
            concurrentModificationCheck();
            if ( currentList != null && currentListIdx > 0 ) {
                return true;
            }
            else {
                nextList();
                if ( currentList != null ) {
                    currentListIdx = currentList.size();
                    return hasNext();
                }
            }
            return false;
        }

        @Override
				public Object next() {
            concurrentModificationCheck();
            if ( currentList != null && currentListIdx > 0 ) {
                currentListIdx--;
                return currentList.get( currentListIdx );
            }
            else {
                nextList();
                if ( currentList != null ) {
                    currentListIdx = currentList.size();
                    return next();
                }
            }
            return null;
        }

        @Override
				public void remove() {
            concurrentModificationCheck();
            if ( currentList != null ) {
                currentList.remove( currentListIdx );
                if ( currentList.isEmpty() ) {
                    Iterator<?> it = map.keySet().iterator();
                    boolean found = false;
                    while ( it.hasNext() && !found ) {
                        Object o = it.next();
                        if ( o == currentList ) {
                            MultiMap.this.remove( o );
                            found = true;
                        }
                    }
                }
                MultiMap.this.lastModified++;
            }
        }

		private void nextList() {
			Iterator<ArrayList<Object>> it = map.values().iterator();
			ArrayList<Object> nextList = null;
			boolean found = false;
			while (it.hasNext() && !found) {
				ArrayList<Object> o = it.next();
				if (o == currentList) {
					currentList = nextList;
					if (currentList != null) {
						currentListIdx = currentList.size();
					}
					found = true;
				} else {
					nextList = o;
				}
			}
		}
    }
    // end of ReverseIterator

    @Override
		public String toString() {
        return map.toString();
    }

}
