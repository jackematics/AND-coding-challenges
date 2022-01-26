import java.io.IOException;

public class Main {

    public static void main(String[] args) throws IOException {
        var chainCollection = new ChainCollection("src/chains-input.txt");

        System.out.println("Unbroken chains: " + chainCollection.getChainCount());
        System.out.println("Total chain length: " + chainCollection.getChainLength());
    }
}
