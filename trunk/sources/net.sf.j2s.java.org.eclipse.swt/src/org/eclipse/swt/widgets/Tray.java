/*******************************************************************************
 * Copyright (c) 2000, 2004 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.swt.widgets;


import org.eclipse.swt.SWT;
import org.eclipse.swt.SWTException;
import org.eclipse.swt.internal.browser.OS;
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.document;

/**
 * Instances of this class represent the system tray that is part
 * of the task bar status area on some operating systems.
 * 
 * <dl>
 * <dt><b>Styles:</b></dt>
 * <dd>(none)</dd>
 * <dt><b>Events:</b></dt>
 * <dd>(none)</dd>
 * </dl>
 * <p>
 * IMPORTANT: This class is <em>not</em> intended to be subclassed.
 * </p>
 * 
 * @see Display#getSystemTray
 * 
 * @since 3.0
 * 
 * @j2sRequireImport org.eclipse.swt.widgets.TrayItem
 * 
 * @j2sPrefix
 * $WTC$$.registerCSS ("$wt.widgets.Tray");
 * $WTC$$.registerCSS ("$wt.widgets.Tray.IE");
 */
public class Tray extends Widget {
	int itemCount;
	TrayItem [] items = new TrayItem [4];
	
	int cellLines;
	Element[] allCells;
	Element[] allItems;
	Element[] allFloats;
	Element[] outerShadows;
	boolean supportShadow;

/**
 * 
 * @param display
 * @param style
 * 
 * @j2sIgnoreSuperConstructor
 */
Tray (Display display, int style) {
	if (display == null) display = Display.getCurrent ();
	if (display == null) display = Display.getDefault ();
	if (!display.isValidThread ()) {
		error (SWT.ERROR_THREAD_INVALID_ACCESS);
	}
	this.display = display;
	
	items = new TrayItem [4];
	cellLines = 0;
	allCells = new Element[0];
	allItems = new Element[0];
	allFloats = new Element[0];
	initialize();
}

static String trayLineColor(int line) {
	if (line <= 2) {
		return "white";
	} else {
		int gray = line * 32;
		if (gray > 288) {
			gray = 288; // gray - 35 should never exceed 255
		}
		return "rgb(" + (gray - 39) + "," + (gray - 35) + ",254)";
	}
}

private void addTrayLine () {
	cellLines++;
	String lineColor = trayLineColor (cellLines);
	boolean needFixing = cellLines == 1 && OS.isFirefox;
	/**
	 * @j2sNative
	 * needFixing &= (navigator.userAgent.indexOf ("Firefox/2.0") != -1);
	 */ {}
	for (int i = 0; i < cellLines; i++) {
		Element cell = document.createElement ("DIV");
		cell.className = "tray-cell";
		cell.style.left = ((cellLines - 1 - i) * 36) + "px";
		cell.style.top = (i * 36) + "px";
		if (i == 0 && needFixing) {
			cell.style.visibility = "hidden";
		}
		cell.style.borderColor = lineColor + " transparent transparent transparent";
		if (OS.isIENeedPNGFix) { // IE < 6.0
			cell.style.borderRightColor = "rgb(0,255,0)";
			cell.style.filter = "Chroma(Color=#00ff00);";
		}
		cell.title = "Doubleclick to set notification area auto-hide";
		allCells[cellLines * (cellLines - 1) / 2 + i] = cell;
		if (display.trayCorner != null) {
			display.trayCorner.bindEvents(cell);
		}
		document.body.appendChild (cell);
	}
	for (int i = 0; i < cellLines - 1; i++) {
		Element cell = allCells[(cellLines - 1) * (cellLines - 2) / 2 + i];
		cell.style.borderRightColor = lineColor;
	}
	if (supportShadow) {
		if (cellLines % 2 == 0 && outerShadows.length < cellLines + 1) {
			Element cell = document.createElement ("DIV");
			cell.className = "tray-cell-outer-shadow";
			cell.style.top = (cellLines - 1) * 36 + "px";
			outerShadows[outerShadows.length] = cell;
			document.body.appendChild (cell);
			cell = document.createElement ("DIV");
			cell.className = "tray-cell-outer-wide-shadow";
			cell.style.top = (cellLines * 36) + "px";
			outerShadows[outerShadows.length] = cell;
			document.body.appendChild (cell);
		}
		for (int i = 0; i < outerShadows.length; i++) {
			Element cell = outerShadows[i];
			cell.style.left = ((cellLines - i - 1) * 36 - 1) + "px";
		}
	}
	boolean supportNotificationCornerFloat = false;
	/**
	 * @j2sNative
	 * supportNotificationCornerFloat = window["swt.notification.corner.float"];
	 */ {}
	if (!supportNotificationCornerFloat) {
		return;
	}
	Element floatDiv1 = document.createElement ("DIV");
	floatDiv1.className = "tray-float-block";
	Element floatDiv2 = document.createElement ("DIV");
	floatDiv2.className = "tray-float-block";
	floatDiv1.style.width = (cellLines * 36 + 18) + "px";
	floatDiv2.style.width = cellLines * 36 + "px";
	Element floatDiv3 = null;
	if (cellLines == 1) {
		floatDiv3 = document.createElement ("DIV");
		floatDiv3.className = "tray-float-block";
		floatDiv3.style.width = (cellLines * 36 - 18) + "px";
		allFloats[0] = floatDiv3;
	}
	allFloats[cellLines * 2 - 1] = floatDiv2;
	allFloats[cellLines * 2] = floatDiv1;
	Element panel = document.getElementById("swt-desktop-panel");
	if (panel != null) {
		if (floatDiv3 != null) {
			if (panel.childNodes.length > 0) {
				panel.insertBefore (floatDiv3, panel.childNodes[0]);
			} else {
				panel.appendChild(floatDiv3);
			}
		}
		if (panel.childNodes.length > 0) {
			panel.insertBefore (floatDiv2, panel.childNodes[0]);
		} else {
			panel.appendChild(floatDiv2);
		}
		panel.insertBefore (floatDiv1, panel.childNodes[0]);
	} else {
		if (floatDiv3 != null) {
			document.body.insertBefore (floatDiv3, document.body.childNodes[0]);
		}
		document.body.insertBefore (floatDiv2, document.body.childNodes[0]);
		document.body.insertBefore (floatDiv1, document.body.childNodes[0]);
	}
}

private void removeTrayLine () {
	if (cellLines <= 3) {
		return;
	}
	for (int i = cellLines - 1; i >= 0 ; i--) {
		int index = cellLines * (cellLines - 1) / 2 + i;
		Element cell = allCells[index];
		if (display != null && display.trayCorner != null) {
			display.trayCorner.unbindEvents(cell);
		}
		allCells[index] = null;
		OS.destroyHandle(cell);
	}
	cellLines--;
	for (int i = 0; i < cellLines; i++) {
		Element cell = allCells[cellLines * (cellLines - 1) / 2 + i];
		cell.style.borderRightColor = "transparent";
		if (OS.isIENeedPNGFix) { // IE < 6.0
			cell.style.borderRightColor = "rgb(0,255,0)";
			cell.style.filter = "Chroma(Color=#00ff00);";
		}
	}
	if (supportShadow) {
		for (int i = 0; i < outerShadows.length; i++) {
			Element cell = outerShadows[i];
			cell.style.left = ((cellLines - i - 1) * 36 - 1) + "px";
		}
	}
	boolean supportNotificationCornerFloat = false;
	/**
	 * @j2sNative
	 * supportNotificationCornerFloat = window["swt.notification.corner.float"];
	 */ {}
	if (!supportNotificationCornerFloat) {
		return;
	}
	OS.destroyHandle(allFloats[cellLines * 2 + 2]);
	allFloats[cellLines * 2 + 2] = null;
	OS.destroyHandle(allFloats[cellLines * 2 + 1]);
	allFloats[cellLines * 2 + 1] = null;
	if (cellLines == 0) {
		OS.destroyHandle(allFloats[0]);
		allFloats[0] = null;
	}
}

void initialize () {
	/**
	 * @j2sNative
	 * this.supportShadow = window["swt.disable.shadow"] != true;
	 */ {}
	if (supportShadow) {
		outerShadows = new Element[0];
		Element cell = document.createElement ("DIV");
		cell.className = "tray-cell-outer-wide-shadow";
		cell.style.top = 0 + "px";
		outerShadows[outerShadows.length] = cell;
		document.body.appendChild (cell);
	}
	addTrayLine ();
	addTrayLine ();
	addTrayLine ();
}

Element addTrayItem () {
	if (allItems.length + 6 - cellLines * (cellLines + 1) / 2 > cellLines) {
		addTrayLine ();
	}
	
	/*
	if (allItems.length == 0) {
		for (int i = 0; i < 3; i++) {
			allCells[i].style.display = "";
			Element div = allFloats[i + i];
			if (div != null) {
				div.style.display = "";
			}
			div = allFloats[i + i + 1];
			if (div != null) {
				div.style.display = "";
			}
		}
		logoEl.style.display = "";
	}
	*/

	Element item = document.createElement ("DIV");
	item.className = "tray-item";
	allItems[allItems.length] = item;
	orderTrayItem (item, allItems.length - 1);
	Element el = allCells[0];
	if ((OS.isIE && el.style.zIndex != 0)
			|| (!OS.isIE && "" + el.style.zIndex != "")) {
		item.style.zIndex = el.style.zIndex;
	}

	document.body.appendChild (item);
	if (display.trayCorner != null) {
		display.trayCorner.setMinimized(false);
		display.trayCorner.updateLastModified();
	}
	return item;
}

void orderTrayItem (Element item, int order) {
	int index = -1;
	int currentLine = -1;
	for (int i = cellLines; i >= 2; i--) {
		if (order + 6 >= i * (i + 1) / 2) {
			index = order + 6 - i * (i + 1) / 2;
			currentLine = i;
			break;
		}
	}
	int offset = 0;
	if (currentLine % 2 == 0) {
		offset = -12;
	}
	if (index % 2 == 0) {
		offset += (index + 1) * (10 + currentLine - 3);
	} else {
		offset += - index * (10 + currentLine - 3);
	}
	if (currentLine % 2 == 0) {
		offset *= -1;
	}
	item.style.left = ((currentLine - 3) * 18 + 37 + offset) + "px";
	item.style.top = ((currentLine - 3) * 18 + 37 - offset) + "px";

}

void removeTrayItem (Element item) {
	for (int i = allItems.length - 1; i >= 0; i--) {
		if (allItems[i] == item) {
			OS.destroyHandle(item);
			for (int j = i; j < allItems.length - 1; j++) {
				allItems[j] = allItems[j + 1];
				orderTrayItem (allItems[j], j);
			}
			allItems[allItems.length - 1] = null;
			/**
			 * @j2sNative
			 * this.allItems.length--;
			 */ {
				 Element el = allItems[0];
				 el.checked = false;
			 }
			if (allItems.length + 6 <= cellLines * (cellLines + 1) / 2) {
				removeTrayLine ();
			}
			break;
		}
	}
	/*
	if (allItems.length == 0) {
		for (int i = 0; i < 3; i++) {
			allCells[i].style.display = "none";
			Element div = allFloats[i + i];
			if (div != null) {
				div.style.display = "none";
			}
			div = allFloats[i + i + 1];
			if (div != null) {
				div.style.display = "none";
			}
		}
		logoEl.style.display = "none";
	}
	*/
	if (display.trayCorner != null) {
		display.trayCorner.setMinimized(false);
		display.trayCorner.updateLastModified();
	}
}

void createItem (TrayItem item, int index) {
	if (!(0 <= index && index <= itemCount)) error (SWT.ERROR_INVALID_RANGE);
	if (itemCount == items.length) {
		TrayItem [] newItems = new TrayItem [items.length + 4];
		System.arraycopy (items, 0, newItems, 0, items.length);
		items = newItems;
	}
	System.arraycopy (items, index, items, index + 1, itemCount++ - index);
	items [index] = item;
}

void destroyItem (TrayItem item) {
	int index = 0;
	while (index < itemCount) {
		if (items [index] == item) break;
		index++;
	}
	if (index == itemCount) return;
	System.arraycopy (items, index + 1, items, index, --itemCount - index);
	items [itemCount] = null;
}

/**
 * Returns the item at the given, zero-relative index in the
 * receiver. Throws an exception if the index is out of range.
 *
 * @param index the index of the item to return
 * @return the item at the given index
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_INVALID_RANGE - if the index is not between 0 and the number of elements in the list minus 1 (inclusive)</li>
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public TrayItem getItem (int index) {
	checkWidget ();
	if (!(0 <= index && index < itemCount)) error (SWT.ERROR_INVALID_RANGE);
	return items [index];
}

/**
 * Returns the number of items contained in the receiver.
 *
 * @return the number of items
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public int getItemCount () {
	checkWidget ();
	return itemCount;
}

/**
 * Returns an array of <code>TrayItem</code>s which are the items
 * in the receiver. 
 * <p>
 * Note: This is not the actual structure used by the receiver
 * to maintain its list of items, so modifying the array will
 * not affect the receiver. 
 * </p>
 *
 * @return the items in the receiver
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public TrayItem [] getItems () {
	checkWidget ();
	TrayItem [] result = new TrayItem [itemCount];
	System.arraycopy (items, 0, result, 0, result.length);
	return result;
}

protected void releaseChild () {
	super.releaseChild ();
	if (display.tray == this) display.tray = null;
}

void releaseWidget () {
	for (int i=0; i<items.length; i++) {
		TrayItem item = items [i];
		if (item != null && !item.isDisposed ()) {
			item.releaseResources ();
		}
		items[i] = null;
	}
	items = null;
	
	destroyItems(allCells);
	allCells = null;
	
	destroyItems(allItems);
	allItems = null;

	destroyItems(allFloats);
	allFloats = null;

	destroyItems(outerShadows);
	outerShadows = null;

	super.releaseWidget ();
}

private void destroyItems(Element[] els) {
	if (els == null) return;
	for (int i = 0; i < els.length; i++) {
		Element item = els[i];
		if (item != null) {
			OS.destroyHandle(item);
			els[i] = null;
		}
	}
}

}
