
import React, { } from 'react'
import Homebody from '../admincomp/Homebody';
//import {  useParams } from 'react-router-dom'
import Navbbar from "./Navbbar"
const Uhome = () => {

    


    // const [getuserdata, setDiseasedata] = useState([]);
    // console.log(getuserdata);

    // const { id } = useParams("");
    // console.log(id);


    // const getdata = async () => {

    //     const res = await fetch(`/api/user/profile/${id}`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     });

    //     const data = await res.json();
    //     console.log(data);

    //     if (res.status === 422 || !data) {
    //         console.log("error ");

    //     } else {
    //         setDiseasedata(data)
    //         console.log("get data");
    //     }
    // }

    // useEffect(() => {
    //     getdata();
    // }, [])
 


  return (
    <>
    <Navbbar />
    <Homebody />
        </>
  )
}

export default Uhome