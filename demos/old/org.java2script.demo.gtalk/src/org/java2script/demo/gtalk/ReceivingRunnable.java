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
import org.jivesoftware.smack.packet.Message;

/**
 * @author zhou renjian
 *
 * 2007-3-11
 */
public class ReceivingRunnable extends GTalkRunnable {
	public String replied;
	public String friend;
	public String user;
	public String hash;
	
	/* (non-Javadoc)
	 * @see net.sf.j2s.ajax.SimpleRPCRunnable#ajaxRun()
	 */
	public void ajaxRun() {
		Chat chat = JabberPool.openChat(user, hash, friend);
		Message msg = chat.nextMessage(25000);
		if (msg != null) {
			replied = msg.getBody();
//		} else {
//			GoogleTalkConnection conn = JabberPool.getAuthorizedConnection(user, hash);
//			OfflineMessageManager offlineManager = new OfflineMessageManager(conn);
//			try {
//				Iterator messages = offlineManager.getMessages();
//				while (messages.hasNext()) {
//				    Message message = (Message) messages.next();
//				    replied = message.getBody();
//				}
//			} catch (XMPPException e) {
//				e.printStackTrace();
//			}
		}
	}
}
