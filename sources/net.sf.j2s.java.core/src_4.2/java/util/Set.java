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


/**
 * Set is a collection which does not allow duplicate elements.
 * @since 1.2
 */
public interface Set<E> extends Collection<E> {
	
	/**
	 * Adds the specified object to this Set. The Set is not modified if it
	 * already contains the object.
	 * 
	 * @param object
	 *            the object to add
	 * @return true if this Set is modified, false otherwise
	 * 
	 * @exception UnsupportedOperationException
	 *                when adding to this Set is not supported
	 * @exception ClassCastException
	 *                when the class of the object is inappropriate for this Set
	 * @exception IllegalArgumentException
	 *                when the object cannot be added to this Set
	 */
	@Override
	public boolean add(E object);

	/**
	 * Adds the objects in the specified Collection which do not exist in this
	 * Set.
	 * 
	 * @param collection
	 *            the Collection of objects
	 * @return true if this Set is modified, false otherwise
	 * 
	 * @exception UnsupportedOperationException
	 *                when adding to this Set is not supported
	 * @exception ClassCastException
	 *                when the class of an object is inappropriate for this Set
	 * @exception IllegalArgumentException
	 *                when an object cannot be added to this Set
	 */
	@Override
	public boolean addAll(Collection<? extends E> collection);

	/**
	 * Removes all elements from this Set, leaving it empty.
	 * 
	 * @exception UnsupportedOperationException
	 *                when removing from this Set is not supported
	 * 
	 * @see #isEmpty
	 * @see #size
	 */
	@Override
	public void clear();

	/**
	 * Searches this Set for the specified object.
	 * 
	 * @param object
	 *            the object to search for
	 * @return true if object is an element of this Set, false otherwise
	 */
	@Override
	public boolean contains(Object object);

	/**
	 * Searches this Set for all objects in the specified Collection.
	 * 
	 * @param collection
	 *            the Collection of objects
	 * @return true if all objects in the specified Collection are elements of
	 *         this Set, false otherwise
	 */
	@Override
	public boolean containsAll(Collection<?> collection);

	/**
	 * Compares the argument to the receiver, and answers true if they represent
	 * the <em>same</em> object using a class specific comparison.
	 * 
	 * @param object
	 *            Object the object to compare with this object.
	 * @return boolean <code>true</code> if the object is the same as this
	 *         object <code>false</code> if it is different from this object.
	 * @see #hashCode
	 */
	@Override
	public boolean equals(Object object);

	/**
	 * Answers an integer hash code for the receiver. Objects which are equal
	 * answer the same value for this method.
	 * 
	 * @return the receiver's hash
	 * 
	 * @see #equals
	 */
	@Override
	public int hashCode();

	/**
	 * Answers if this Set has no elements, a size of zero.
	 * 
	 * @return true if this Set has no elements, false otherwise
	 * 
	 * @see #size
	 */
	@Override
	public boolean isEmpty();

	/**
	 * Answers an Iterator on the elements of this Set.
	 * 
	 * @return an Iterator on the elements of this Set
	 * 
	 * @see Iterator
	 */
	@Override
	public Iterator<E> iterator();

	/**
	 * Removes any occurrence of the specified object from this Set.
	 * 
	 * @param object
	 *            the object to remove
	 * @return true if this Set is modified, false otherwise
	 * 
	 * @exception UnsupportedOperationException
	 *                when removing from this Set is not supported
	 */
	@Override
	public boolean remove(Object object);

	/**
	 * Removes all objects in the specified Collection from this Set.
	 * 
	 * @param collection
	 *            the Collection of objects to remove
	 * @return true if this Set is modified, false otherwise
	 * 
	 * @exception UnsupportedOperationException
	 *                when removing from this Set is not supported
	 */
	@Override
	public boolean removeAll(Collection<?> collection);

	/**
	 * Removes all objects from this Set that are not contained in the specified
	 * Collection.
	 * 
	 * @param collection
	 *            the Collection of objects to retain
	 * @return true if this Set is modified, false otherwise
	 * 
	 * @exception UnsupportedOperationException
	 *                when removing from this Set is not supported
	 */
	@Override
	public boolean retainAll(Collection<?> collection);

	/**
	 * Answers the number of elements in this Set.
	 * 
	 * @return the number of elements in this Set
	 */
	@Override
	public int size();

	/**
	 * Answers an array containing all elements contained in this Set.
	 * 
	 * @return an array of the elements from this Set
	 */
	@Override
	public Object[] toArray();

	/**
	 * Answers an array containing all elements contained in this Set. If the
	 * specified array is large enough to hold the elements, the specified array
	 * is used, otherwise an array of the same type is created. If the specified
	 * array is used and is larger than this Set, the array element following
	 * the collection elements is set to null.
	 * 
	 * @param array
	 *            the array
	 * @return an array of the elements from this Set
	 * 
	 * @exception ArrayStoreException
	 *                when the type of an element in this Set cannot be stored
	 *                in the type of the specified array
	 */
	@Override
	public <T> T[] toArray(T[] array);
}
