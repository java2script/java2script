
package org.sgx.j2s.javatest.inheritancebug2;


/**
 * An Iterator is used to sequence over a collection of objects.
 */
public interface Iterator<E> {
	/**
	 * Answers if there are more elements to iterate.
	 * 
	 * @return true if there are more elements, false otherwise
	 * 
	 * @see #next
	 */
	public boolean hasNext();

	/**
	 * Answers the next object in the iteration.
	 * 
	 * @return the next object
	 * 
	 * @exception NoSuchElementException
	 *                when there are no more elements
	 * 
	 * @see #hasNext
	 */
	public E next();

	/**
	 * Removes the last object returned by <code>next</code> from the
	 * collection.
	 * 
	 * @exception UnsupportedOperationException
	 *                when removing is not supported by the collection being
	 *                iterated
	 * @exception IllegalStateException
	 *                when <code>next</code> has not been called, or
	 *                <code>remove</code> has already been called after the
	 *                last call to <code>next</code>
	 */
	public void remove();
}
