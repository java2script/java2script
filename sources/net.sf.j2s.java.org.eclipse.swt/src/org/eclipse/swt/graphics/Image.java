/*******************************************************************************
 * Copyright (c) 2000, 2005 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.swt.graphics;

import org.eclipse.swt.SWT;
import org.eclipse.swt.SWTError;
import org.eclipse.swt.SWTException;
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.document;

public class Image extends Resource implements Drawable {
	public String url;
	public int width;
	public int height;
	public Element handle;
	
	public int type;
	private Element imgHandle;

	public Image(Device device, int width, int height) {
//		if (device == null) device = Device.getDevice();
		if (device == null) SWT.error(SWT.ERROR_NULL_ARGUMENT);
		init(device, width, height);
//		if (device.tracking) device.new_Object(this);	
	}
	public Image (Device device, String filename) {
		//if (device == null) device = Device.getDevice();
		if (device == null) SWT.error(SWT.ERROR_NULL_ARGUMENT);
		//init(device, new ImageData(filename));
		//if (device.tracking) device.new_Object(this);
		url = filename;
	}
	
	public Image(Device device, ImageData data) {
		//if (device == null) device = Device.getDevice();
		if (device == null) SWT.error(SWT.ERROR_NULL_ARGUMENT);
		//init(device, data);
		//if (device.tracking) device.new_Object(this);
		url = data.url;
	}

	public Image(Device device, Rectangle bounds) {
//		if (device == null) device = Device.getDevice();
		if (device == null) SWT.error(SWT.ERROR_NULL_ARGUMENT);
		if (bounds == null) SWT.error(SWT.ERROR_NULL_ARGUMENT);
		init(device, bounds.width, bounds.height);
//		if (device.tracking) device.new_Object(this);	
	}
	/**
	 * Constructs a new instance of this class based on the
	 * provided image, with an appearance that varies depending
	 * on the value of the flag. The possible flag values are:
	 * <dl>
	 * <dt><b>IMAGE_COPY</b></dt>
	 * <dd>the result is an identical copy of srcImage</dd>
	 * <dt><b>IMAGE_DISABLE</b></dt>
	 * <dd>the result is a copy of srcImage which has a <em>disabled</em> look</dd>
	 * <dt><b>IMAGE_GRAY</b></dt>
	 * <dd>the result is a copy of srcImage which has a <em>gray scale</em> look</dd>
	 * </dl>
	 *
	 * @param device the device on which to create the image
	 * @param srcImage the image to use as the source
	 * @param flag the style, either <code>IMAGE_COPY</code>, <code>IMAGE_DISABLE</code> or <code>IMAGE_GRAY</code>
	 *
	 * @exception IllegalArgumentException <ul>
	 *    <li>ERROR_NULL_ARGUMENT - if device is null and there is no current device</li>
	 *    <li>ERROR_NULL_ARGUMENT - if srcImage is null</li>
	 *    <li>ERROR_INVALID_ARGUMENT - if the flag is not one of <code>IMAGE_COPY</code>, <code>IMAGE_DISABLE</code> or <code>IMAGE_GRAY</code></li>
	 *    <li>ERROR_INVALID_ARGUMENT - if the image has been disposed</li>
	 * </ul>
	 * @exception SWTException <ul>
	 *    <li>ERROR_INVALID_IMAGE - if the image is not a bitmap or an icon, or
	 *          is otherwise in an invalid state</li>
	 *    <li>ERROR_UNSUPPORTED_DEPTH - if the depth of the Image is not supported</li>
	 * </ul>
	 * @exception SWTError <ul>
	 *    <li>ERROR_NO_HANDLES if a handle could not be obtained for image creation</li>
	 * </ul>
	 */
	public Image(Device device, Image srcImage, int flag) {
//		if (device == null) device = Device.getDevice();
		if (device == null) SWT.error(SWT.ERROR_NULL_ARGUMENT);
//		this.device = device;
		if (srcImage == null) SWT.error(SWT.ERROR_NULL_ARGUMENT);
		if (srcImage.isDisposed()) SWT.error(SWT.ERROR_INVALID_ARGUMENT);
		switch (flag) {
			case SWT.IMAGE_COPY: {
				// TODO
			}
			case SWT.IMAGE_DISABLE: {
				// TODO
			}
			case SWT.IMAGE_GRAY: {
				// TODO
			}
		}
		this.url = srcImage.url;
	}
	void init(Device device, int width, int height) {
		if (width <= 0 || height <= 0) {
			SWT.error (SWT.ERROR_INVALID_ARGUMENT);
		}
//		this.device = device;
		type = SWT.BITMAP;
		this.width = width;
		this.height = height;
		handle = document.createElement("DIV");
		handle.style.width = width + "px"; 
		handle.style.height = height + "px"; 
//		imgHandle = document.createElement("IMG");
//		handle.appendChild(imgHandle);
		imgHandle = handle;
//		imgHandle.width = width;
//		imgHandle.height = height;
//		imgHandle.src = url;
//		imgHandle.alt = "Inner Image";
	}
	public boolean isDisposed() {
		return false;
	}
	public void dispose() {
		
	}
	public Rectangle getBounds() {
		if (isDisposed()) SWT.error(SWT.ERROR_GRAPHIC_DISPOSED);
		switch (type) {
			case SWT.BITMAP:
				return new Rectangle(0, 0, width, height);
		}
		return new Rectangle(0, 0, width, height);
	}
	public ImageData getImageData() {
		if (isDisposed()) SWT.error(SWT.ERROR_GRAPHIC_DISPOSED);
		return new ImageData(url);
	}
}
