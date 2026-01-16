import {useEffect} from "react"


function NewTour() {
    useEffect(()=>{
        document.title="NewTour-TinyTour"
    },[])

  return (
    <div>NewTour</div>
  )
}

export default NewTour