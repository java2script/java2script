package sun.awt.image;

import java.awt.image.DataBuffer;
import java.awt.image.DataBufferByte;
import java.awt.image.DataBufferInt;
import sun.java2d.StateTrackableDelegate;

public interface DataStealer {
        public byte[] getData(DataBufferByte dbb, int bank);
//        public short[] getData(DataBufferUShort dbus, int bank);
        public int[] getData(DataBufferInt dbi, int bank);
        public StateTrackableDelegate getTrackable(DataBuffer db);
        public void setTrackable(DataBuffer db, StateTrackableDelegate trackable);
    }