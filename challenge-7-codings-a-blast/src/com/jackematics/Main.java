package com.jackematics;

import com.jackematics.wires.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        List<List<Wire>> wireSequences = getWireSequences("./src/com/jackematics/wire-sequences.txt");

        System.out.println("Coding's a blast!");
        System.out.println();

        for (List<Wire> wireSequence : wireSequences) {
            String displayMessage = setDisplayMessage(wireSequence);
            String bombOutcomeMessage = bombDisarmed(wireSequence)
                ? "Yay! The bomb was successfully defused!"
                : "KABOOM!";
            System.out.println(displayMessage);
            System.out.println(bombOutcomeMessage);
            System.out.println();
        }
    }

    private static String setDisplayMessage(List<Wire> wireSequence) {
        String message = "OUTCOME FOR ";
        String symbol = " -> ";
        for (int i = 0; i < wireSequence.size(); i++) {
            if (i == wireSequence.size() - 1) {
                symbol = ".";
            }

            message += String.format("%s%s", wireSequence.get(i).getWireColour(), symbol);
        }

        return message;
    }

    private static boolean bombDisarmed(List<Wire> wireSequence) {
        boolean bombDisarmed = true;
        for (int i = 0; i < wireSequence.size(); i++) {
            Wire wire = wireSequence.get(i);
            wire.cut();

            if (
                wire.isDetonator() ||
                (i == wireSequence.size() - 1 && wire.needsFollowUpWire())
            ) {
                bombDisarmed = false;
                break;
            }
        }

        return bombDisarmed;
    }

    private static List<List<Wire>> getWireSequences(String path) throws IOException {
        List<List<Wire>> wireSequences = new ArrayList<>();
        List<String> lines = Files.readAllLines(Paths.get(path));

        for (String line : lines) {
            String[] wires = line.split(",");
            List<Wire> wireSequence = new ArrayList<>();
            WireColour previousColour = WireColour.BEIGE;

            for (String wire : wires) {
                switch (wire) {
                    case "black" -> {
                        wireSequence.add(new BlackWire(previousColour));
                        previousColour = WireColour.BLACK;
                    }
                    case "green" -> {
                        wireSequence.add(new GreenWire(previousColour));
                        previousColour = WireColour.GREEN;
                    }
                    case "orange" -> {
                        wireSequence.add(new OrangeWire(previousColour));
                        previousColour = WireColour.ORANGE;
                    }
                    case "purple" -> {
                        wireSequence.add(new PurpleWire(previousColour));
                        previousColour = WireColour.PURPLE;
                    }
                    case "red" -> {
                        wireSequence.add(new RedWire(previousColour));
                        previousColour = WireColour.RED;
                    }
                    case "white" -> {
                        wireSequence.add(new WhiteWire(previousColour));
                        previousColour = WireColour.WHITE;
                    }
                }
            }

            wireSequences.add(wireSequence);
        }

        return wireSequences;
    }
}
