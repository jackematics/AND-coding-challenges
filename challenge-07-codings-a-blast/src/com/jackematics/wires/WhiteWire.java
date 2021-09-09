package com.jackematics.wires;

import java.util.ArrayList;
import java.util.List;

public class WhiteWire extends Wire implements IWire {
    private boolean _isDetonator = false;
    private boolean _needsFollowUpWire;
    private WireColour _previousWireColour;
    private List<WireColour> _validPreviousWires = new ArrayList<>(){{
        add(WireColour.BLACK);
        add(WireColour.PURPLE);
        add(WireColour.RED);
    }};
    private WireColour _wireColour = WireColour.BLACK;

    public WhiteWire(WireColour previousWireColour) {
        setIsDetonator();
        setPreviousWireColour(previousWireColour);
        setValidPreviousWires(new ArrayList<>(){{
            add(WireColour.BEIGE);
            add(WireColour.GREEN);
        }});
        setWireColour(WireColour.WHITE);
        setNeedsFollowUpWire(false);
    }
}
