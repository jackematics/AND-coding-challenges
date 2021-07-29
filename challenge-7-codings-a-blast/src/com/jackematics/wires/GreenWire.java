package com.jackematics.wires;

import java.util.ArrayList;
import java.util.List;

public class GreenWire extends Wire implements IWire {
    private boolean _isDetonator;
    private boolean _needsFollowUpWire;
    private WireColour _previousWireColour;
    private List<WireColour> _validPreviousWires;
    private WireColour _wireColour;

    public GreenWire(WireColour previousWireColour) {
        setIsDetonator();
        setPreviousWireColour(previousWireColour);
        setValidPreviousWires(new ArrayList<>(){{
            add(WireColour.BEIGE);
            add(WireColour.WHITE);
            add(WireColour.GREEN);
            add(WireColour.ORANGE);
        }});
        setWireColour(WireColour.GREEN);
        setNeedsFollowUpWire(true);
    }
}
