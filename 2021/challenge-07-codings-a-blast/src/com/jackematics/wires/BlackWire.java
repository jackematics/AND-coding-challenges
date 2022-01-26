package com.jackematics.wires;

import java.util.ArrayList;
import java.util.List;

public class BlackWire extends Wire implements IWire {
    private boolean _isDetonator;
    private boolean _needsFollowUpWire;
    private WireColour _previousWireColour;
    private List<WireColour> _validPreviousWires;
    private WireColour _wireColour;

    public BlackWire(WireColour previousWireColour) {
        setIsDetonator();
        setPreviousWireColour(previousWireColour);
        setValidPreviousWires(new ArrayList<>(){{
            add(WireColour.BEIGE);
            add(WireColour.BLACK);
            add(WireColour.PURPLE);
            add(WireColour.RED);
        }});
        setWireColour(WireColour.BLACK);
        setNeedsFollowUpWire(false);
    }
}
