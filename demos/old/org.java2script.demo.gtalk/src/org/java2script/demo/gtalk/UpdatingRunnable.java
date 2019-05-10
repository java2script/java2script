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

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import org.jivesoftware.smack.GoogleTalkConnection;
import org.jivesoftware.smack.Roster;
import org.jivesoftware.smack.RosterEntry;
import org.jivesoftware.smack.packet.Presence;

/**
 * @author zhou renjian
 *
 * 2007-3-11
 */
public class UpdatingRunnable extends GTalkRunnable {
	public String [] friends;
	public String [] aliases;
	public String [] presences;
	
	public String user;
	public String hash;
	
	/* (non-Javadoc)
	 * @see net.sf.j2s.ajax.SimpleRPCRunnable#ajaxRun()
	 */
	public void ajaxRun() {
		GoogleTalkConnection gt = JabberPool.getAuthorizedConnection(user, hash);
		if (gt != null) {
			Roster roster = gt.getRoster();
			List nameList = new ArrayList();
			List userList = new ArrayList();
			Iterator it = roster.getEntries();
	        while (it.hasNext()) {
	            RosterEntry entry = (RosterEntry) it.next();
	            nameList.add(entry.getName());
	            userList.add(entry.getUser());
	        }
	        aliases = (String []) nameList.toArray(new String[0]);
	        friends = (String []) userList.toArray(new String[0]);
	        presences = new String[friends.length];
	        for (int i = 0; i < friends.length; i++) {
	        	Presence p = roster.getPresence(friends[i]);
				if (p != null) {
					presences[i] = p.getMode().toString();
				} else {
					presences[i] = null;
				}
			}
		}
	}
}
