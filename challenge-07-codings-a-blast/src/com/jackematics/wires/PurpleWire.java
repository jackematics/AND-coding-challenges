package com.jackematics.wires;

import java.util.ArrayList;
import java.util.List;

public class PurpleWire extends Wire implements IWire {
    private boolean _isDetonator;
    private boolean _needsFollowUpWire;
    private WireColour _previousWireColour;
    private List<WireColour> _validPreviousWires;
    private WireColour _wireColour;

    public PurpleWire(WireColour previousWireColour) {
        setIsDetonator();
        setPreviousWireColour(previousWireColour);
        setValidPreviousWires(new ArrayList<>(){{
            add(WireColour.BEIGE);
            add(WireColour.WHITE);
            add(WireColour.BLACK);
        }});
        setWireColour(WireColour.PURPLE);
        setNeedsFollowUpWire(false);
    }
}
