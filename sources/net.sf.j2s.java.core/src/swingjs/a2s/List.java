package swingjs.a2s;

import java.awt.AWTEvent;
import java.awt.AWTEventMulticaster;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.ItemSelectable;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.awt.event.MouseEvent;
import java.awt.peer.ListPeer;
import java.util.EventListener;

import javax.swing.DefaultListModel;
import javax.swing.JList;
import javax.swing.JScrollPane;
import javax.swing.ListSelectionModel;
import javax.swing.border.LineBorder;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;

import java.awt.JSComponent;
public class List extends JList implements ItemSelectable, JSComponent.A2SWrappedComponent, ListSelectionListener  {

	public void isAWT() {} 
	
    int         visibleIndex = -1;

    transient ActionListener actionListener;
    transient ItemListener itemListener;

	private DefaultListModel<String> awtmodel;

    private static final String base = "list";
    private static int nameCounter = 0;

    final static int    DEFAULT_VISIBLE_ROWS = 4;

	@Override
	public Component 秘getWrap() {
		return new JScrollPane(this);
	}
        
	public List(int rows, boolean multipleMode) {
		this();
		setMultipleMode(multipleMode);
		super.setVisibleRowCount(rows == 0 ?  DEFAULT_VISIBLE_ROWS : rows);
	}

	public List() {
		super(new DefaultListModel<String>());
		awtmodel = (DefaultListModel<String>) getModel();
		super.setBorder(LineBorder.createBlackLineBorder());
	}

    @Override
	protected String constructComponentName() {
        //synchronized (List.class) {
            return base + nameCounter++;
        //}
    }

//    /**
//     * Creates the peer for the list.  The peer allows us to modify the
//     * list's appearance without changing its functionality.
//     */
//    public void addNotify() {
//        synchronized (getTreeLock()) {
////            if (peer == null)
////                peer = getToolkit().createList(this);
//            super.addNotify();
//        }
//    }

//    /**
//     * Removes the peer for this list.  The peer allows us to modify the
//     * list's appearance without changing its functionality.
//     */
//    public void removeNotify() {
//        synchronized (getTreeLock()) {
//            ListPeer peer = (ListPeer)this.peer;
//            if (peer != null) {
//                selected = peer.getSelectedIndexes();
//            }
//            super.removeNotify();
//        }
//    }

    /**
     * Gets the number of items in the list.
     * @return     the number of items in the list
     * @see        #getItem
     * @since      JDK1.1
     */
    public int getItemCount() {
        return countItems();
    }

    /**
     * @deprecated As of JDK version 1.1,
     * replaced by <code>getItemCount()</code>.
     */
    @Deprecated
    public int countItems() {
    	return super.getModel().getSize();
    }

    /**
     * Gets the item associated with the specified index.
     * @return       an item that is associated with
     *                    the specified index
     * @param        index the position of the item
     * @see          #getItemCount
     */
    public String getItem(int index) {
        return getItemImpl(index);
    }

    // NOTE: This method may be called by privileged threads.
    //       We implement this functionality in a package-private method
    //       to insure that it cannot be overridden by client subclasses.
    //       DO NOT INVOKE CLIENT CODE ON THIS THREAD!
    final String getItemImpl(int index) {
        return awtmodel.getElementAt(index);
    }

    /**
     * Gets the items in the list.
     * @return       a string array containing items of the list
     * @see          #select
     * @see          #deselect
     * @see          #isIndexSelected
     * @since        JDK1.1
     */
    public synchronized String[] getItems() {
        String itemCopies[] = new String[awtmodel.getSize()];
        awtmodel.copyInto(itemCopies);
        return itemCopies;
    }

    /**
     * Adds the specified item to the end of scrolling list.
     * @param item the item to be added
     * @since JDK1.1
     */
    public void add(String item) {
        addItem(item);
    }

    /**
     * @deprecated      replaced by <code>add(String)</code>.
     */
    @Deprecated
    public void addItem(String item) {
        addItem(item, -1);
    }

    /**
     * Adds the specified item to the the scrolling list
     * at the position indicated by the index.  The index is
     * zero-based.  If the value of the index is less than zero,
     * or if the value of the index is greater than or equal to
     * the number of items in the list, then the item is added
     * to the end of the list.
     * @param       item   the item to be added;
     *              if this parameter is <code>null</code> then the item is
     *              treated as an empty string, <code>""</code>
     * @param       index  the position at which to add the item
     * @since       JDK1.1
     */
    public void add(String item, int index) {
        addItem(item, index);
    }

    /**
     * @deprecated      replaced by <code>add(String, int)</code>.
     */
    @Deprecated
    public synchronized void addItem(String item, int index) {
    	if (index >= 0 && index < awtmodel.getSize())
    		awtmodel.add(index, item);
    	else
    		awtmodel.addElement(item);
     }

    /**
     * Replaces the item at the specified index in the scrolling list
     * with the new string.
     * @param       newValue   a new string to replace an existing item
     * @param       index      the position of the item to replace
     * @exception ArrayIndexOutOfBoundsException if <code>index</code>
     *          is out of range
     */
    public synchronized void replaceItem(String newValue, int index) {
        remove(index);
        add(newValue, index);
    }

    /**
     * Removes all items from this list.
     * @see #remove
     * @see #delItems
     * @since JDK1.1
     */
    public void removeAll() {
        clear();
    }

    /**
     * @deprecated As of JDK version 1.1,
     * replaced by <code>removeAll()</code>.
     */
    @Deprecated
    public synchronized void clear() {
    	awtmodel.clear();
    }

    /**
     * Removes the first occurrence of an item from the list.
     * If the specified item is selected, and is the only selected
     * item in the list, the list is set to have no selection.
     * @param        item  the item to remove from the list
     * @exception    IllegalArgumentException
     *                     if the item doesn't exist in the list
     * @since        JDK1.1
     */
    public synchronized void remove(String item) {
    	awtmodel.removeElement(item);
    }
    

    /**
     * Removes the item at the specified position
     * from this scrolling list.
     * If the item with the specified position is selected, and is the
     * only selected item in the list, the list is set to have no selection.
     * @param      position   the index of the item to delete
     * @see        #add(String, int)
     * @since      JDK1.1
     * @exception    ArrayIndexOutOfBoundsException
     *               if the <code>position</code> is less than 0 or
     *               greater than <code>getItemCount()-1</code>
     */
    public void remove(int position) {
        delItem(position);
    }

    /**
     * @deprecated     replaced by <code>remove(String)</code>
     *                         and <code>remove(int)</code>.
     */
    @Deprecated
    public void delItem(int position) {
        delItems(position, position);
    }
    
    /**
     * @deprecated As of JDK version 1.1,
     * Not for public use in the future.
     * This method is expected to be retained only as a package
     * private method.
     */
    @Deprecated
    public synchronized void delItems(int start, int end) {
    	awtmodel.removeRange(start, end);
    }



//    /**
//     * Gets the index of the selected item on the list,
//     *
//     * @return        the index of the selected item;
//     *                if no item is selected, or if multiple items are
//     *                selected, <code>-1</code> is returned.
//     * @see           #select
//     * @see           #deselect
//     * @see           #isIndexSelected
//     */f
//    public synchronized int getSelectedIndex() {
//        int sel[] = getSelectedIndexes();
//        return (sel.length == 1) ? sel[0] : -1;
//    }

	/**
     * Gets the selected indexes on the list.
     *
     * @return        an array of the selected indexes on this scrolling list;
     *                if no item is selected, a zero-length array is returned.
     * @see           #select
     * @see           #deselect
     * @see           #isIndexSelected
     */
    public synchronized int[] getSelectedIndexes() {
    	return super.getSelectedIndices();
    }

    /**
     * Gets the selected item on this scrolling list.
     *
     * @return        the selected item on the list;
     *                if no item is selected, or if multiple items are
     *                selected, <code>null</code> is returned.
     * @see           #select
     * @see           #deselect
     * @see           #isIndexSelected
     */
    public synchronized String getSelectedItem() {
    	return (String) super.getSelectedValue();
    }

    /**
     * Gets the selected items on this scrolling list.
     *
     * @return        an array of the selected items on this scrolling list;
     *                if no item is selected, a zero-length array is returned.
     * @see           #select
     * @see           #deselect
     * @see           #isIndexSelected
     */
    public synchronized String[] getSelectedItems() {
    	return (String[]) super.getSelectedValues();
    }

    /**
     * Gets the selected items on this scrolling list in an array of Objects.
     * @return        an array of <code>Object</code>s representing the
     *                selected items on this scrolling list;
     *                if no item is selected, a zero-length array is returned.
     * @see #getSelectedItems
     * @see ItemSelectable
     */
    @Override
	public Object[] getSelectedObjects() {
    	return super.getSelectedValues();
    }

	/**
	 * Selects the item at the specified index in the scrolling list.
	 * <p>
	 * Note that passing out of range parameters is invalid, and will result in
	 * unspecified behavior.
	 *
	 * <p>
	 * Note that this method should be primarily used to initially select an item in
	 * this component. Programmatically calling this method will <i>not</i> trigger
	 * an <code>ItemEvent</code>. The only way to trigger an <code>ItemEvent</code>
	 * is by user interaction.
	 *
	 * @param index the position of the item to select
	 * @see #getSelectedItem
	 * @see #deselect
	 * @see #isIndexSelected
	 */
	public void select(int index) {
		// do not trigger ItemEvent here
		boolean alreadySelected = super.isSelectedIndex(index);
		if (!alreadySelected) {
			super.getSelectionModel().addSelectionInterval(index, index);
		}
	}

    /**
     * Deselects the item at the specified index.
     * <p>
     * Note that passing out of range parameters is invalid,
     * and will result in unspecified behavior.
     * <p>
     * If the item at the specified index is not selected,
     * then the operation is ignored.
     * @param        index the position of the item to deselect
     * @see          #select
     * @see          #getSelectedItem
     * @see          #isIndexSelected
     */
    public synchronized void deselect(int index) {
		// do not trigger ItemEvent here
		boolean alreadySelected = super.isSelectedIndex(index);
		if (alreadySelected) {
			super.removeSelectionInterval(index, index);
		}
    }

    /**
     * Determines if the specified item in this scrolling list is
     * selected.
     * @param      index   the item to be checked
     * @return     <code>true</code> if the specified item has been
     *                       selected; <code>false</code> otherwise
     * @see        #select
     * @see        #deselect
     * @since      JDK1.1
     */
    public boolean isIndexSelected(int index) {
        return isSelected(index);
    }

    /**
     * @deprecated As of JDK version 1.1,
     * replaced by <code>isIndexSelected(int)</code>.
     */
    @Deprecated
    public boolean isSelected(int index) {
    	return super.isSelectedIndex(index);
    }

    /**
     * Gets the number of visible lines in this list.  Note that
     * once the <code>List</code> has been created, this number
     * will never change.
     * @return     the number of visible lines in this scrolling list
     */
    public int getRows() {
    	return super.getVisibleRowCount();
    }

    /**
     * Determines whether this list allows multiple selections.
     * @return     <code>true</code> if this list allows multiple
     *                 selections; otherwise, <code>false</code>
     * @see        #setMultipleMode
     * @since      JDK1.1
     */
    public boolean isMultipleMode() {
        return allowsMultipleSelections();
    }

    /**
     * @deprecated As of JDK version 1.1,
     * replaced by <code>isMultipleMode()</code>.
     */
    @Deprecated
    public boolean allowsMultipleSelections() {
        return super.getSelectionMode() == ListSelectionModel.MULTIPLE_INTERVAL_SELECTION;
    }

    /**
     * Sets the flag that determines whether this list
     * allows multiple selections.
     * When the selection mode is changed from multiple-selection to
     * single-selection, the selected items change as follows:
     * If a selected item has the location cursor, only that
     * item will remain selected.  If no selected item has the
     * location cursor, all items will be deselected.
     * @param       b   if <code>true</code> then multiple selections
     *                      are allowed; otherwise, only one item from
     *                      the list can be selected at once
     * @see         #isMultipleMode
     * @since       JDK1.1
     */
    public void setMultipleMode(boolean b) {
        setMultipleSelections(b);
    }

    /**
     * @deprecated As of JDK version 1.1,
     * replaced by <code>setMultipleMode(boolean)</code>.
     */
    @Deprecated
    public synchronized void setMultipleSelections(boolean b) {
    	super.setSelectionMode(b ? ListSelectionModel.MULTIPLE_INTERVAL_SELECTION : ListSelectionModel.SINGLE_SELECTION);
    }

    /**
     * Gets the index of the item that was last made visible by
     * the method <code>makeVisible</code>.
     * @return      the index of the item that was last made visible
     * @see         #makeVisible
     */
    public int getVisibleIndex() {
        return visibleIndex;
    }

    /**
     * Makes the item at the specified index visible.
     * @param       index    the position of the item
     * @see         #getVisibleIndex
     */
    public synchronized void makeVisible(int index) {    	
        visibleIndex = index;
        ensureIndexIsVisible(index);
    }

    /**
     * Gets the preferred dimensions for a list with the specified
     * number of rows.
     * @param      rows    number of rows in the list
     * @return     the preferred dimensions for displaying this scrolling list
     *             given that the specified number of rows must be visible
     * @see        java.awt.Component#getPreferredSize
     * @since      JDK1.1
     */
    public Dimension getPreferredSize(int rows) {
        return preferredSize(rows);
    }

    /**
     * @deprecated As of JDK version 1.1,
     * replaced by <code>getPreferredSize(int)</code>.
     */
    @Deprecated
    public Dimension preferredSize(int rows) {
//        synchronized (getTreeLock()) {
            ListPeer peer = (ListPeer)this.peer;
            if (peer != null)
            	return peer.getPreferredSize(rows);
            return preferredSize();
//        }
    }

    /**
     * Gets the preferred size of this scrolling list.
     * @return     the preferred dimensions for displaying this scrolling list
     * @see        java.awt.Component#getPreferredSize
     * @since      JDK1.1
     */
    public Dimension getPreferredSize() {
        return preferredSize();
    }

	/**
	 * @deprecated As of JDK version 1.1, replaced by
	 *             <code>getPreferredSize()</code>.
	 */
	@Deprecated
	public Dimension preferredSize() {
		// synchronized (getTreeLock()) {
		int rows = awtmodel.getSize();
		if (rows > 0) {
			ListPeer peer = (ListPeer) this.peer;
			if (peer != null)
				return peer.getPreferredSize(rows);
		}
		return super.preferredSize();
	}
   // }

    /**
     * Gets the minimum dimensions for a list with the specified
     * number of rows.
     * @param      rows    number of rows in the list
     * @return     the minimum dimensions for displaying this scrolling list
     *             given that the specified number of rows must be visible
     * @see        java.awt.Component#getMinimumSize
     * @since      JDK1.1
     */
    public Dimension getMinimumSize(int rows) {
        return minimumSize(rows);
    }

    /**
     * @deprecated As of JDK version 1.1,
     * replaced by <code>getMinimumSize(int)</code>.
     */
    @Deprecated
    public Dimension minimumSize(int rows) {
 //       synchronized (getTreeLock()) {
            ListPeer peer = (ListPeer)this.peer;
            return (peer != null) ?
                       peer.getMinimumSize(rows) :
                       super.minimumSize();
 //       }
    }

    /**
     * Determines the minimum size of this scrolling list.
     * @return       the minimum dimensions needed
     *                        to display this scrolling list
     * @see          java.awt.Component#getMinimumSize()
     * @since        JDK1.1
     */
    public Dimension getMinimumSize() {
        return minimumSize();
    }

    /**
     * @deprecated As of JDK version 1.1,
     * replaced by <code>getMinimumSize()</code>.
     */
    @Deprecated
    public Dimension minimumSize() {
   //     synchronized (getTreeLock()) {
       	int rows = awtmodel.getSize();
                   return (rows > 0) ? minimumSize(rows) : super.minimumSize();
    //    }
    }

    /**
     * Adds the specified item listener to receive item events from
     * this list.  Item events are sent in response to user input, but not
     * in response to calls to <code>select</code> or <code>deselect</code>.
     * If listener <code>l</code> is <code>null</code>,
     * no exception is thrown and no action is performed.
     * <p>Refer to <a href="doc-files/AWTThreadIssues.html#ListenersThreads"
     * >AWT Threading Issues</a> for details on AWT's threading model.
     *
     * @param         l the item listener
     * @see           #removeItemListener
     * @see           #getItemListeners
     * @see           #select
     * @see           #deselect
     * @see           java.awt.event.ItemEvent
     * @see           java.awt.event.ItemListener
     * @since         JDK1.1
     */
    @Override
	public synchronized void addItemListener(ItemListener l) {
        if (l == null) {
            return;
        }
        itemListener = AWTEventMulticaster.add(itemListener, l);
        newEventsOnly = true;
        super.removeListSelectionListener(this);
        super.addListSelectionListener(this);
    }

    /**
     * Removes the specified item listener so that it no longer
     * receives item events from this list.
     * If listener <code>l</code> is <code>null</code>,
     * no exception is thrown and no action is performed.
     * <p>Refer to <a href="doc-files/AWTThreadIssues.html#ListenersThreads"
     * >AWT Threading Issues</a> for details on AWT's threading model.
     *
     * @param           l the item listener
     * @see             #addItemListener
     * @see             #getItemListeners
     * @see             java.awt.event.ItemEvent
     * @see             java.awt.event.ItemListener
     * @since           JDK1.1
     */
    @Override
	public synchronized void removeItemListener(ItemListener l) {
        if (l == null) {
            return;
        }
        itemListener = AWTEventMulticaster.remove(itemListener, l);
        if (itemListener == null)
        	super.removeListSelectionListener(this);
    }

    /**
     * Returns an array of all the item listeners
     * registered on this list.
     *
     * @return all of this list's <code>ItemListener</code>s
     *         or an empty array if no item
     *         listeners are currently registered
     *
     * @see             #addItemListener
     * @see             #removeItemListener
     * @see             java.awt.event.ItemEvent
     * @see             java.awt.event.ItemListener
     * @since 1.4
     */
    public synchronized ItemListener[] getItemListeners() {
        return getListeners(ItemListener.class);
    }

    /**
     * Adds the specified action listener to receive action events from
     * this list. Action events occur when a user double-clicks
     * on a list item or types Enter when the list has the keyboard
     * focus.
     * <p>
     * If listener <code>l</code> is <code>null</code>,
     * no exception is thrown and no action is performed.
     * <p>Refer to <a href="doc-files/AWTThreadIssues.html#ListenersThreads"
     * >AWT Threading Issues</a> for details on AWT's threading model.
     *
     * @param         l the action listener
     * @see           #removeActionListener
     * @see           #getActionListeners
     * @see           java.awt.event.ActionEvent
     * @see           java.awt.event.ActionListener
     * @since         JDK1.1
     */
    public synchronized void addActionListener(ActionListener l) {
        if (l == null) {
            return;
        }
        actionListener = AWTEventMulticaster.add(actionListener, l);
        newEventsOnly = true;
    }

    /**
     * Removes the specified action listener so that it no longer
     * receives action events from this list. Action events
     * occur when a user double-clicks on a list item.
     * If listener <code>l</code> is <code>null</code>,
     * no exception is thrown and no action is performed.
     * <p>Refer to <a href="doc-files/AWTThreadIssues.html#ListenersThreads"
     * >AWT Threading Issues</a> for details on AWT's threading model.
     *
     * @param           l     the action listener
     * @see             #addActionListener
     * @see             #getActionListeners
     * @see             java.awt.event.ActionEvent
     * @see             java.awt.event.ActionListener
     * @since           JDK1.1
     */
    public synchronized void removeActionListener(ActionListener l) {
        if (l == null) {
            return;
        }
        actionListener = AWTEventMulticaster.remove(actionListener, l);
    }

    /**
     * Returns an array of all the action listeners
     * registered on this list.
     *
     * @return all of this list's <code>ActionListener</code>s
     *         or an empty array if no action
     *         listeners are currently registered
     *
     * @see             #addActionListener
     * @see             #removeActionListener
     * @see             java.awt.event.ActionEvent
     * @see             java.awt.event.ActionListener
     * @since 1.4
     */
    public synchronized ActionListener[] getActionListeners() {
        return getListeners(ActionListener.class);
    }

    /**
     * Returns an array of all the objects currently registered
     * as <code><em>Foo</em>Listener</code>s
     * upon this <code>List</code>.
     * <code><em>Foo</em>Listener</code>s are registered using the
     * <code>add<em>Foo</em>Listener</code> method.
     *
     * <p>
     * You can specify the <code>listenerType</code> argument
     * with a class literal, such as
     * <code><em>Foo</em>Listener.class</code>.
     * For example, you can query a
     * <code>List</code> <code>l</code>
     * for its item listeners with the following code:
     *
     * <pre>ItemListener[] ils = (ItemListener[])(l.getListeners(ItemListener.class));</pre>
     *
     * If no such listeners exist, this method returns an empty array.
     *
     * @param listenerType the type of listeners requested; this parameter
     *          should specify an interface that descends from
     *          <code>java.util.EventListener</code>
     * @return an array of all objects registered as
     *          <code><em>Foo</em>Listener</code>s on this list,
     *          or an empty array if no such
     *          listeners have been added
     * @exception ClassCastException if <code>listenerType</code>
     *          doesn't specify a class or interface that implements
     *          <code>java.util.EventListener</code>
     *
     * @see #getItemListeners
     * @since 1.3
     */
    public <T extends EventListener> T[] getListeners(Class<T> listenerType) {
        EventListener l = null;
        if  (listenerType == ActionListener.class) {
            l = actionListener;
        } else if  (listenerType == ItemListener.class) {
            l = itemListener;
        } else {
            return super.getListeners(listenerType);
        }
        return AWTEventMulticaster.getListeners(l, listenerType);
    }

    // REMIND: remove when filtering is done at lower level
    @Override
	public boolean eventEnabled(AWTEvent e) {
        switch(e.getID()) {
          case ActionEvent.ACTION_PERFORMED:
            if ((eventMask & AWTEvent.ACTION_EVENT_MASK) != 0 ||
                actionListener != null) {
                return true;
            }
            return false;
          case ItemEvent.ITEM_STATE_CHANGED:
            if ((eventMask & AWTEvent.ITEM_EVENT_MASK) != 0 ||
                itemListener != null) {
                return true;
            }
            return false;
          default:
            break;
        }
        return super.eventEnabled(e);
    }

    /**
     * Processes events on this scrolling list. If an event is
     * an instance of <code>ItemEvent</code>, it invokes the
     * <code>processItemEvent</code> method. Else, if the
     * event is an instance of <code>ActionEvent</code>,
     * it invokes <code>processActionEvent</code>.
     * If the event is not an item event or an action event,
     * it invokes <code>processEvent</code> on the superclass.
     * <p>Note that if the event parameter is <code>null</code>
     * the behavior is unspecified and may result in an
     * exception.
     *
     * @param        e the event
     * @see          java.awt.event.ActionEvent
     * @see          java.awt.event.ItemEvent
     * @see          #processActionEvent
     * @see          #processItemEvent
     * @since        JDK1.1
     */
    protected void processEvent(AWTEvent e) {
        if (e instanceof ItemEvent) {
            processItemEvent((ItemEvent)e);
            return;
        } else if (e instanceof ActionEvent) {
            processActionEvent((ActionEvent)e);
            return;
        }
        super.processEvent(e);
    }

    /**
     * Processes item events occurring on this list by
     * dispatching them to any registered
     * <code>ItemListener</code> objects.
     * <p>
     * This method is not called unless item events are
     * enabled for this component. Item events are enabled
     * when one of the following occurs:
     * <ul>
     * <li>An <code>ItemListener</code> object is registered
     * via <code>addItemListener</code>.
     * <li>Item events are enabled via <code>enableEvents</code>.
     * </ul>
     * <p>Note that if the event parameter is <code>null</code>
     * the behavior is unspecified and may result in an
     * exception.
     *
     * @param       e the item event
     * @see         java.awt.event.ItemEvent
     * @see         java.awt.event.ItemListener
     * @see         #addItemListener
     * @see         java.awt.Component#enableEvents
     * @since       JDK1.1
     */
    protected void processItemEvent(ItemEvent e) {
        ItemListener listener = itemListener;
        if (listener != null) {
            listener.itemStateChanged(e);
        }
    }

	@Override
	public void valueChanged(ListSelectionEvent e) {
		if (itemListener != null && !super.getSelectionModel().getValueIsAdjusting()) {
			processItemEvent(new ItemEvent(this, ItemEvent.ITEM_STATE_CHANGED, getSelectedItem(), ItemEvent.SELECTED));
		}
	}

	

    /**
     * Processes action events occurring on this component
     * by dispatching them to any registered
     * <code>ActionListener</code> objects.
     * <p>
     * This method is not called unless action events are
     * enabled for this component. Action events are enabled
     * when one of the following occurs:
     * <ul>
     * <li>An <code>ActionListener</code> object is registered
     * via <code>addActionListener</code>.
     * <li>Action events are enabled via <code>enableEvents</code>.
     * </ul>
     * <p>Note that if the event parameter is <code>null</code>
     * the behavior is unspecified and may result in an
     * exception.
     *
     * @param       e the action event
     * @see         java.awt.event.ActionEvent
     * @see         java.awt.event.ActionListener
     * @see         #addActionListener
     * @see         java.awt.Component#enableEvents
     * @since       JDK1.1
     */
    protected void processActionEvent(ActionEvent e) {
        ActionListener listener = actionListener;
        if (listener != null) {
            listener.actionPerformed(e);
        }
    }

    /**
     * Returns the parameter string representing the state of this
     * scrolling list. This string is useful for debugging.
     * @return    the parameter string of this scrolling list
     */
    protected String paramString() {
        return super.paramString() + ",selected=" + getSelectedItem();
    }

	@Override
	public boolean 秘processUIEvent(MouseEvent e) {
		super.秘processUIEvent(e);
		if (e.getID() == MouseEvent.MOUSE_CLICKED) {
			if (e.getClickCount() == 2) {
				processActionEvent(new ActionEvent(this, ActionEvent.ACTION_PERFORMED, this.getSelectedItem()));
				if (itemListener != null)
					processItemEvent(new ItemEvent(this, ItemEvent.ITEM_STATE_CHANGED, getSelectedItem(), ItemEvent.SELECTED));
				// indicate handled
				return true;
			}
		}
		return false;
	}

}
