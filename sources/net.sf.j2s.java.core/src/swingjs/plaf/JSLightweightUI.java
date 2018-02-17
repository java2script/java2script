package swingjs.plaf;

import java.awt.peer.LightweightPeer;

/**
 * Just a way of determining whether this component is not a Frame, Window, or Dialog.
 * 
 * It's use is in checking LightweightPeer, as for example:
 * 
 * if (component.peer instanceof LightweightPeer) ...
 * 
 * 
 * @author Bob Hanson
 *
 */
public abstract class JSLightweightUI extends JSComponentUI implements LightweightPeer {

}