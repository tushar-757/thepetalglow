import './CustomerRating.css'
import { AiOutlineStar,AiFillStar } from 'react-icons/ai'
import { useEffect, useState ,useMemo} from 'react'
import { useSelector } from 'react-redux'
export function CustomerRating(){
    let [fivestar,setFiveStar]=useState(0)
    let [fourstar,setFourStar]=useState(0)
    let [threestar,setthreeStar]=useState(0)
    let [twostar,setTwoStar]=useState(0)
    let [onestar,setOneStar]=useState(0)
     const [averagevalue,setAverage]=useState(0)
     const review=useSelector((state)=>state.ProductReducer.review)

     const happen=async()=>{
     review?.map((data)=>{
           if(data?.stars===5){
             setFiveStar((state)=>state+1)
           }
           if(data?.stars===4){
             setFourStar((state)=>state+1)
           }
           if(data?.stars===3){
             setthreeStar((state)=>state+1)
           }
           if(data?.stars===2){
             setTwoStar((state)=>state+1)
           }
           if(data?.stars===1){
             setOneStar((state)=>state+1)
           }
      })
    }

      const calculateAverage=()=>{
        const average=(fivestar*5+fourstar*4+threestar*3+twostar*2+onestar*1)/(review?.length)
        const finalaverage=parseFloat(average).toFixed(1)
        setAverage(finalaverage)
      }
  useEffect(() =>{
    happen()
  },[])
  useEffect(()=>{
      calculateAverage()
  },[fivestar])


   return (
        <div>
<span class="heading">User Rating</span>
{
  (Math.floor(averagevalue)===5)?
  <>
<AiFillStar class="fa fa-star checked"/>
<AiFillStar class="fa fa-star checked"/>
<AiFillStar class="fa fa-star checked"/>
<AiFillStar class="fa fa-star checked"/>
<AiFillStar class="fa fa-star checked"/>
</>:(Math.floor(averagevalue)===4)?<>
<AiFillStar class="fa fa-star checked"/>
<AiFillStar class="fa fa-star checked"/>
<AiFillStar class="fa fa-star checked"/>
<AiFillStar class="fa fa-star checked"/>
<AiFillStar class="fa fa-star"/>
</>:(Math.floor(averagevalue)===3)?<>
<AiFillStar class="fa fa-star checked"/>
<AiFillStar class="fa fa-star checked"/>
<AiFillStar class="fa fa-star checked"/>
<AiFillStar class="fa fa-star"/>
<AiFillStar class="fa fa-star"/>
</>:(Math.floor(averagevalue)===2)?<>
<AiFillStar class="fa fa-star checked"/>
<AiFillStar class="fa fa-star checked"/>
<AiFillStar class="fa fa-star"/>
<AiFillStar class="fa fa-star"/>
<AiFillStar class="fa fa-star "/>
</>:(Math.floor(averagevalue)===1)?<>
<AiFillStar class="fa fa-star checked"/>
<AiFillStar class="fa fa-star"/>
<AiFillStar class="fa fa-star"/>
<AiFillStar class="fa fa-star"/>
<AiFillStar class="fa fa-star"/>
</>:<><AiFillStar class="fa fa-star"/>
<AiFillStar class="fa fa-star"/>
<AiFillStar class="fa fa-star"/>
<AiFillStar class="fa fa-star"/>
<AiFillStar class="fa fa-star"/>
</>
}
<p>{averagevalue} average based on {review?.length} reviews.</p>
{/* <hr style="border:3px solid #f1f1f1"> */}
<div class="row">
  <div class="side">
    <div>5 star</div>
  </div>
  <div class="middle">
    <div class="bar-container">
      <div class="bar-5" style={{width:`${fivestar*20/10}%`}}></div>
    </div>
  </div>
  <div class="side right">
    <div>{fivestar}</div>
  </div>
  <div class="side">
    <div>4 star</div>
  </div>
  <div class="middle">
    <div class="bar-container">
      <div class="bar-4" style={{width:`${fourstar*20/10}%`}}></div>
    </div>
  </div>
  <div class="side right">
    <div>{fourstar}</div>
  </div>
  <div class="side">
    <div>3 star</div>
  </div>
  <div class="middle">
    <div class="bar-container">
      <div class="bar-3" style={{width:`${threestar*20/10}%`}}></div>
    </div>
  </div>
  <div class="side right">
    <div>{threestar}</div>
  </div>
  <div class="side">
    <div>2 star</div>
  </div>
  <div class="middle">
    <div class="bar-container">
      <div class="bar-2" style={{width:`${twostar*20/10}%`}}></div>
    </div>
  </div>
  <div class="side right">
    <div>{twostar}</div>
  </div>
  <div class="side">
    <div>1 star</div>
  </div>
  <div class="middle">
    <div class="bar-container">
      <div class="bar-1" style={{width:`${onestar*20/10}%`}}></div>
    </div>
  </div>
  <div class="side right">
    <div>{onestar}</div>
  </div>
</div>
   </div> )
}