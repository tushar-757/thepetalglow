import { IonContent,IonPage } from "@ionic/react"
import Header from "./Header"

export default function AboutUs(){
    return(
        <>
        <IonPage>
          <Header/>
          <IonContent>
        <div style={{margin:"1rem"}}>
            <h2>AboutUs</h2>
            <p>ThePetalGlow is rooted in 2021 from a promise to make cities ‘green and healthy’</p>
           <p>
            thepetalglow is an online platform for plant lovers and gardeners who loves to do plantation a lot,we would help you in providing happy and healthy plants to your doorstep at a very resonable and affordable price
           </p>
           <p>Currently thepetalglow is at very initial stage of startup we are trying our best to
               reach our goals to fulfill customer needs and our main motive
               is to make pollution free cities
           </p>
           <p>
           Having plants in our homes or in our offices doesn’t just look good, it also boosts our mood, makes us more productive, and cleans the air around us by absorbing toxins
           </p>
           <p>
             Ordering items online is easy but ever heard of ordering a plant to your doorstep?
             Are you afraid of your plant health because
             of shipping delays?
              This is where ThePetalGlow comes in.
              with our same day delivery policy and lots of customization options we offer a
              complete secure and healthy package for you.
           </p>
           <p>
               As we are in the very inital stage our main motive is to be a
             one-stop-shop for all gardening related requirements,
             currently ThePetalGlow has more than 250+ products available online for delivery
              saving your numerous messy trips to various nurseries.
           </p>
        </div>
        </IonContent>
        </IonPage>
        </>
    )
}