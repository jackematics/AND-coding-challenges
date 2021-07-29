package com.jackematics.wires;

import java.util.List;

public interface IWire {
    List<WireColour> getValidPreviousWires();
    boolean isDetonator();
    boolean needsFollowUpWire();
    void cut();
}
