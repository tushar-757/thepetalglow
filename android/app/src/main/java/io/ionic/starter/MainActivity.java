package io.ionic.starter;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.ionicframework.capacitor.Checkout;
public class MainActivity extends BridgeActivity {
    /**
     * @param savedInstanceState
     */
//    @Override
//    public void onCreate(Bundle savedInstanceState) {
//      super.onCreate(savedInstanceState);
//
//      // Initializes the Bridge
//      this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
//        // Additional plugins you've installed go here
//        // Ex: add(TotallyAwesomePlugin.class);
//        add(Checkout.class);
//      }});
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

              registerPlugin(Checkout.class);
    }
    }

