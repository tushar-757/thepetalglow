import './CustomerRating.css'
import { AiFillStar } from 'react-icons/ai'
import { useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import LoadingBox from './LoadingComponent'

export function CustomerRating(){
  const fivestar =useSelector((state)=>state?.ProductReducer?.fivestar)
  const fourstar =useSelector((state)=>state?.ProductReducer?.fourstar)
  const threestar =useSelector((state)=>state?.ProductReducer?.threestar)
  const twostar =useSelector((state)=>state?.ProductReducer?.twostar)
  const onestar =useSelector((state)=>state?.ProductReducer?.onestar)
    const [loading,setLoading]=useState(false)
    const [averagevalue,setAverage]=useState(0)
    const review=useSelector((state)=>state.ProductReducer.review)
    const [Review,setReview]=useState([])
    const [values,setValue]=useState([]);

    const calculateAverage=()=>{
      //  const average = (...args) => args.reduce((a, b) => a + b) / args.length;
      //  const anser=average(values)
      //  console.log(anser)
      const average1=(fivestar*5+fourstar*4+threestar*3+twostar*2+onestar*1)/(review?.length)
      const finalaverage=parseFloat(average1).toFixed(1)
      setAverage(finalaverage)
    }


  useEffect(()=>{
      setLoading(true)
      calculateAverage()
      setLoading(false)
  },[fivestar,fourstar,threestar,twostar,onestar])


   return (
        <div>
<span className="heading">User Rating</span>
{
  (Math.floor(averagevalue)===5)?
  <>
<AiFillStar className="fa fa-star checked"/>
<AiFillStar className="fa fa-star checked"/>
<AiFillStar className="fa fa-star checked"/>
<AiFillStar className="fa fa-star checked"/>
<AiFillStar className="fa fa-star checked"/>
</>:(Math.floor(averagevalue)===4)?<>
<AiFillStar className="fa fa-star checked"/>
<AiFillStar className="fa fa-star checked"/>
<AiFillStar className="fa fa-star checked"/>
<AiFillStar className="fa fa-star checked"/>
<AiFillStar className="fa fa-star"/>
</>:(Math.floor(averagevalue)===3)?<>
<AiFillStar className="fa fa-star checked"/>
<AiFillStar className="fa fa-star checked"/>
<AiFillStar className="fa fa-star checked"/>
<AiFillStar className="fa fa-star"/>
<AiFillStar className="fa fa-star"/>
</>:(Math.floor(averagevalue)===2)?<>
<AiFillStar className="fa fa-star checked"/>
<AiFillStar className="fa fa-star checked"/>
<AiFillStar className="fa fa-star"/>
<AiFillStar className="fa fa-star"/>
<AiFillStar className="fa fa-star "/>
</>:(Math.floor(averagevalue)===1)?<>
<AiFillStar className="fa fa-star checked"/>
<AiFillStar className="fa fa-star"/>
<AiFillStar className="fa fa-star"/>
<AiFillStar className="fa fa-star"/>
<AiFillStar className="fa fa-star"/>
</>:<><AiFillStar className="fa fa-star"/>
<AiFillStar className="fa fa-star"/>
<AiFillStar className="fa fa-star"/>
<AiFillStar className="fa fa-star"/>
<AiFillStar className="fa fa-star"/>
</>
}
<span>{(loading)?<LoadingBox/>:null}</span>
<p>{averagevalue} average based on {review?.length} reviews.</p>
{/* <hr style="border:3px solid #f1f1f1"> */}
<div className="row">
  <div className="side">
    <div>5 star</div>
  </div>
  <div className="middle">
    <div className="bar-container">
      <div className="bar-5" style={{width:`${fivestar*20/10}%`}}></div>
    </div>
  </div>
  <div className="side right">
    <div>{fivestar}</div>
  </div>
  <div className="side">
    <div>4 star</div>
  </div>
  <div className="middle">
    <div className="bar-container">
      <div className="bar-4" style={{width:`${fourstar*20/10}%`}}></div>
    </div>
  </div>
  <div className="side right">
    <div>{fourstar}</div>
  </div>
  <div className="side">
    <div>3 star</div>
  </div>
  <div className="middle">
    <div className="bar-container">
      <div className="bar-3" style={{width:`${threestar*20/10}%`}}></div>
    </div>
  </div>
  <div className="side right">
    <div>{threestar}</div>
  </div>
  <div className="side">
    <div>2 star</div>
  </div>
  <div className="middle">
    <div className="bar-container">
      <div className="bar-2" style={{width:`${twostar*20/10}%`}}></div>
    </div>
  </div>
  <div className="side right">
    <div>{twostar}</div>
  </div>
  <div className="side">
    <div>1 star</div>
  </div>
  <div className="middle">
    <div className="bar-container">
      <div className="bar-1" style={{width:`${onestar*20/10}%`}}></div>
    </div>
  </div>
  <div className="side right">
    <div>{onestar}</div>
  </div>
</div>
   </div> )
}