package com.jackematics.wires;

import java.util.ArrayList;
import java.util.List;

public class RedWire extends Wire implements IWire {
    private boolean _isDetonator;
    private boolean _needsFollowUpWire;
    private WireColour _previousWireColour;
    private List<WireColour> _validPreviousWires;
    private WireColour _wireColour;

    public RedWire(WireColour previousWireColour) {
        setIsDetonator();
        setPreviousWireColour(previousWireColour);
        setValidPreviousWires(new ArrayList<>(){{
            add(WireColour.BEIGE);
            add(WireColour.WHITE);
            add(WireColour.BLACK);
            add(WireColour.PURPLE);
        }});
        setWireColour(WireColour.RED);
        setNeedsFollowUpWire(true);
    }
}
