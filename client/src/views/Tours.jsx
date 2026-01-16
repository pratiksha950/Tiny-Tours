import {useEffect} from "react"

function Tours() {
    useEffect(()=>{
        document.title="Tours-TinyTour"
    },[])
    
  return (
    <div>Tours</div>
  )
}

export default Tours