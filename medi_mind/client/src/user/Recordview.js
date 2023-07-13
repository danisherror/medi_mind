import React, { useState, useEffect } from 'react'
// https://mui.com/material-ui/material-icons/?query=dele
//import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {  useParams } from 'react-router-dom'
import Navbbar from "./Navbbar"
import {Helmet} from 'react-helmet';


const Recordview = () => {


    const [getdiseasedata, setDiseasedata] = useState([]);
    console.log("----------------");
    console.log("Array Size " + getdiseasedata?.length)
    const urlarr = [];
    for (let i = 0; i < getdiseasedata?.length; i++) {
        console.log(getdiseasedata[i]?.url)
        urlarr.push(getdiseasedata[i]?.url)
    }
    // console.log("url aray "+getdiseasedata[0]?.url);

    console.log("----------------");
    const { token } = useParams("token");
    const getdata = async () => {

        const res = await fetch(`/api/record/recordview/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();


        if (res.status === 422 || !data) {
            alert("no record found");

        } else {
            setDiseasedata(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, [])


    // const Headings = () => {
    //     const headings = urlarr.map((hero, index)=>

    //       <img src={hero} style={{ width: 150 }} alt="profile" />

    //       )

    //     return <header>{headings}</header>
    //   }


    return (
        <>
            <Navbbar />
            <div>
            <Helmet>
                <style>{'body { background:  #243b55; }'}</style>
            </Helmet>
            
            {/* <Headings /> */}
            <table class="table table-bordered table-hover">
                {/* <thead class="thead-dark">
                    <tr>
                    <div class="text-center">
                        <th scope="col">image</th>
                        </div>
                        <th scope="col">url</th>
                    </tr>
                </thead> */}
                <tbody>
                    {
                        urlarr.map((element, id) => {
                            return (
                                <>
                                    <tr>
                                        
                                    {/* style={{ width: 150, height:150 }} */}
                                    
                                        <td >
                                        <div class="text-center"> <img src={element}   style={{ width: 150, height:150 }}alt="profile" />
                                        </div>
                                        </td>
                                        
                                        <td><a href={element}>full report</a></td>

                                    </tr>
                                </>
                            )
                        })
                    }
                </tbody>
            </table>
            </div>

        </>
    )
}

export default Recordview