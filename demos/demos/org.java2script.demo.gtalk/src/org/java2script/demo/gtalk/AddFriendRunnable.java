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

import org.jivesoftware.smack.GoogleTalkConnection;
import org.jivesoftware.smack.Roster;
import org.jivesoftware.smack.XMPPException;

/**
 * @author zhou renjian
 *
 * 2007-3-11
 */
public class AddFriendRunnable extends GTalkRunnable {
	public String user;
	public String hash;
	public String friend;
	public boolean status;

	/* (non-Javadoc)
	 * @see net.sf.j2s.ajax.SimpleRPCRunnable#ajaxRun()
	 */
	public void ajaxRun() {
		GoogleTalkConnection gt = JabberPool.getAuthorizedConnection(user, hash);
		if (gt != null) {
			Roster roster = gt.getRoster();
			try {
				roster.createEntry(friend, null, null);
				status = true;
			} catch (XMPPException e) {
				e.printStackTrace();
				status = false;
			}
		}
	}
}
