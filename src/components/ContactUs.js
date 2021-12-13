import { IonContent,IonPage } from "@ionic/react"
import Header from "./Header"

export default function ContactUs(){
    return(
        <>
        <IonPage>
          <Header/>
          <IonContent>
        <div style={{margin:"1rem"}}>
            <h2>ContactUs</h2>
              <div>
                 Billing address:-<br></br>757/31,Faridabad,Haryana,121003<br></br>
                 Operational address:-<br></br>
                 we are associated with Heaven's green nursery
                 opp. vipul plaza sec-80,81 dividing road,Faridabad,Haryana,121004<br></br>
                 email:services@thepetalglow.com<br></br>
                 Phone:+17278771267 (`whatsapp chat available only`)
              </div>
        </div>
        </IonContent>
        </IonPage>
        </>
    )
}