import './Record.css';
import React, { useState } from 'react'
import {  useParams, useHistory } from 'react-router-dom'
import { Container } from 'reactstrap'
import Dropzone from 'react-dropzone'
import axios from 'axios';
import Navbbar from "./Navbbar"
import {Helmet} from 'react-helmet';


// const Record = () => {


//     const history = useHistory("");
//     const [image, setImage] = useState("");
//     const [url, setUrl] = useState("");
//     const { token } = useParams("token");
//     console.log(token);

//     const updatedisease = async(e)=>{
//         e.preventDefault();
//         const formdata = new FormData()
//         formdata.append("file", image)
//         formdata.append("upload_preset", "testing")
//         formdata.append("cloud_name", "dpywvy2za")
//         const res1=await fetch('https://api.cloudinary.com/v1_1/dpywvy2za/image/upload',{
//           method:"post",
//           body:formdata
//         })

//         const ImgData=await res1.json()
//         const url1=ImgData.url
//         setUrl(url1);

//         console.log(url1) 
//         const ans=[{report:{url1}}]
//         const res2 = await fetch(`/api/record/addRecord/${token}`,{
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 report:[
//                     {
//                         url:url1
//                     }
//                 ]
//             })
//         });

//         const data2 = await res2.json();
//         console.log("asdsd",data2.user,url1);

//         if(res2.status === 422 || !data2){
//             alert("fill the data");
//         }else{
//             alert("data updated");
//             history.push(`/uhome/${token}`);
//         }
//     }


//   return (
//     <div className="container">
//         <h1>uplaod the report i image form</h1>
//             <form className="mt-4">
//                 <div className="row">
//                     <div class="mb-3 col-lg-6 col-md-6 col-12">
//                         <label for="exampleInputEmail1" class="form-label">pic</label>
//                         <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>                   
//                     </div>
//                     <button type="submit" onClick={updatedisease} class="btn btn-primary">Submit</button>
//                 </div>
//             </form>
//         </div>
//   )
// }
const Record = () => {
    const history = useHistory("");
   
    const [image, setImage] = useState({ array: [] })
    const [loading, setLoading] = useState('');
    const { token } = useParams("token");
    console.log("array" + image);
    console.log(token);
    const handledrop = (files) => {
        const uploaders = files.map((file) => {
            const formdata = new FormData();
            formdata.append("file", file)
            formdata.append('tags', `codeinfuse,medius,gist`)
            formdata.append("upload_preset", "testing")
            formdata.append("cloud_name", "dpywvy2za")
            formdata.append('api_key', '0iGHslhWINStYvSpQHzUY6KtqYg');
            formdata.append("timestamp", (Date.now() / 1000) / 0);
            setLoading("true");
            // const res1=await fetch('https://api.cloudinary.com/v1_1/dpywvy2za/image/upload',{
            //   method:"post",
            //   body:formdata
            // })
            return axios
                .post('https://api.cloudinary.com/v1_1/dpywvy2za/image/upload', formdata, {
                    headers: { "X-requested-With": "XMLHttpRequest" },
                })
                .then((response) => {
                    const data = response.data
                    console.log(data)
                    
                    const imageurl = data.secure_url
                    console.log("img:"+imageurl)
                    let report = image.array;

                    report.push(imageurl);
                   
                    console.log("postimageurl:" + report);
                    const newObj = { ...image, report };
                    setImage(newObj);
                    console.log(image);
                })
        })
        axios.all(uploaders).then(() => {
            setLoading("false");
        })
    }
    function imagepreviw() {
        if (loading === 'true') {
            return <h2>...</h2>
        }
        if (loading === 'false') {
            return (<h2>
                {image.array.length <= 0
                    ? "no images"
                    : image.array.map((item) => (
                        <img
                            alt="uploading"
                            style={{ width: "150px", height: "90px", backgroundSize: "cover", paddingRight: "15px" }}
                            src={item}
                            
                        />
                    ))
                }
            </h2>)
        }
    }
    const updatedisease = async (e) => {

        e.preventDefault();
        
        const ans=image.array
        console.log("len--+"+ans.length)
        for(let i=0;i<ans?.length;i++)
        {
            console.log(ans[i]);
        const res2 = await fetch(`/api/record/addRecord/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    
                    report:[
                    {
                        url:ans[i]
                    }
                ]
                }
            )
        });

        const data2 = await res2.json();
        console.log("asdsd", data2.user);

        if (res2.status === 422 || !data2) {
            alert("fill the data");
        } else {
            alert("image "+(1+i)+" uploaded");
           
        }
    }
    history.push(`/uhome/${token}`);
    }




    return (
        <>
        <Navbbar />
        <div>
        <Helmet>
                <style>{'body { background: #155FB4; }'}</style>
            </Helmet>
            <Container>
            
                <h1>Upload your image</h1>
                <Dropzone
                    className='dropzone'
                    onDrop={handledrop}
                    onChange={(e) => setImage(e.target.valuse)}
                    value={image}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps({ className: "dropzone" })}>
                                <span>folder</span>
                                <p>Drag 'n' drop your images here, or select the images</p>
                            </div>
                        </section>
                    )}

                </Dropzone>
                <br></br>
                
                <div align="center">
                {imagepreviw()}
                </div>
            </Container>

            <br></br>
            <br></br>
            <br></br>
            <div align="center" style={{color:'white'}}>
            <button type="submit" onClick={updatedisease} class="btn btn-primary" >Submit</button>
            </div>
            </div>
        </>
    );
}


export default Record
