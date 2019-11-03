/*******************************************************************************
 * Copyright (c) 2010 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.ajax;


/**
 * Providing geo location information for given Simple RPC or Simple Pipe.
 * For server side only.
 * 
 * @author zhou renjian
 *
 * 2010-04-18
 */
public interface ISimpleGeoLocationBinding {

	public void setLatitude(double latitude);
	
	public void setLongtitude(double longtitude);
	
	public void setAltitude(double altitude);
	
	public void setLocation(String location);
	
	public void setCity(String city);
	
	public void setCountryOrRegion(String region);
	
}
