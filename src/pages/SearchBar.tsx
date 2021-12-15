import { IonPage,IonItem, IonContent,useIonLoading,IonList } from '@ionic/react';
import React,{ useState } from 'react';
import { withRouter  } from 'react-router';
import { useHistory } from 'react-router-dom';
import { RootStateOrAny,useSelector ,useDispatch} from 'react-redux';
import './Page.css';
import { getCurrentProduct } from '../Actions';

interface searchText {
  [x: string]: any;
}
const SearchBar: React.FC = (props:searchText) => {
  console.log(props.searchText)
  const History = useHistory();
  const dispatch=useDispatch();
  const [present, dismiss] = useIonLoading();
  const SearchedData=useSelector((state:RootStateOrAny)=>state.ProductReducer.FilterData)
  return (
    <IonPage>
      <IonContent>
        <div>
          <IonList>
          {SearchedData?.map((d:any)=>(
              <IonItem onClick={()=>{
                present({
                      message: 'Loading...',
                      duration:1000
                    })
                  dispatch(getCurrentProduct(d._id))
                  History.push("/page/ViewPage")}}
                  key={d?._id}>{d.name}</IonItem>
            ))}
            {(SearchedData.length===0)?"No Results Found":null}
            </IonList>
          </div>
              <div>
                <h1 style={{color:'black'}}>
                  Recent views
               </h1>
               <div>
                 <IonList>
                   <IonItem>
                     <h1>xs</h1>
                   </IonItem>
                   <IonItem>
                     <h1>xs</h1>
                   </IonItem>
                   <IonItem>
                     <h1>xs</h1>
                   </IonItem>
                 </IonList>
               </div>
              </div>
             <div>
                <h1 style={{color:'black'}}>
                  Popular Searches
               </h1>
               <div>
                 <IonList>
                   <IonItem>
                     <h1>xs</h1>
                   </IonItem>
                   <IonItem>
                     <h1>xs</h1>
                   </IonItem>
                   <IonItem>
                     <h1>xs</h1>
                   </IonItem>
                 </IonList>
               </div>
              </div>
      </IonContent>
    </IonPage>
  );
};

export default withRouter(SearchBar);