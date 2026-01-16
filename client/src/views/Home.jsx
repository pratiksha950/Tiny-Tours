import {useEffect} from "react"

function Home() {
    useEffect(()=>{
        document.title="Home-TinyTour"
    },[])
   
  return (
    <div>Home</div>
  )
}

export default Home