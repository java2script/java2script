/*******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *******************************************************************************/

package org.java2script.demo.gtalk;

import org.jivesoftware.smack.Chat;
import org.jivesoftware.smack.XMPPException;
import org.jivesoftware.smack.packet.Message;

/**
 * @author zhou renjian
 *
 * 2007-3-11
 */
public class SendingRunnable extends GTalkRunnable {
	public String sending;
	public String replied;
	
	public String user;
	public String hash;
	public String friend;

	/* (non-Javadoc)
	 * @see net.sf.j2s.ajax.SimpleRPCRunnable#ajaxRun()
	 */
	public void ajaxRun() {
		try {
			Chat chat = JabberPool.openChat(user, hash, friend);
			if (sending != null && sending.length() != 0) { 
				chat.sendMessage(sending);
			}
			Message msg = chat.nextMessage(500 + Math.round(Math.random() * 500));
			if (msg != null) {
				replied = msg.getBody();
			}
		} catch (XMPPException e) {
			e.printStackTrace();
		}
		sending = null;
	}
}
