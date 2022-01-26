package com.jackematics.wires;

import java.util.List;

public abstract class Wire {
    private boolean _isDetonator;
    private boolean _needsFollowUpWire;
    private WireColour _previousWireColour;
    private List<WireColour> _validPreviousWires;
    private WireColour _wireColour;

    public List<WireColour> getValidPreviousWires() {
        return _validPreviousWires;
    }
    protected void setValidPreviousWires(List<WireColour> validPreviousWires) { _validPreviousWires = validPreviousWires; }

    public boolean isDetonator() {
        return _isDetonator;
    }

    protected void setIsDetonator() { _isDetonator = false; }

    public boolean needsFollowUpWire() { return _needsFollowUpWire; }

    protected void setNeedsFollowUpWire(boolean value) { _needsFollowUpWire = value; }

    public WireColour getWireColour() {
        return _wireColour;
    }
    protected void setWireColour(WireColour wireColour) { _wireColour = wireColour; }

    public WireColour getPreviousWireColour() { return _previousWireColour; }
    protected void setPreviousWireColour(WireColour colour) { _previousWireColour = colour; }

    public void cut() {
        if (!_validPreviousWires.contains(_previousWireColour)) {
            _isDetonator = true;
        }
    }
}
