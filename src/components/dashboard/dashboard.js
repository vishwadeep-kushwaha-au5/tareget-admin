import React, { useEffect, useState} from 'react'
import Helmet from "react-helmet";
import UploapImage from '../misc/cloudinaryImageUpload/imageUpload'
import GooglePlannerMap from '../googleMaps/map';
import axios from 'axios';

const Dashboard = () => {
    const [mm, setMM] = useState({})

    // useEffect(()=>{
    //     console.log('fu')
    //     axios.post("http://localhost:3080/api/driver/getDriverCurr", {driverId: '62acba7b0944bafd82796366'}).then(locs=>{
    //         let x = {}
    //         console.log("ll",locs)
    //         x = Object.assign({}, locs?.data?.result);
    //         setMM(x)
    //     }).then(x=>{
    //         console.log(x)
    //     }).catch(e=>{
    //         console.log("ERROR",e)
    //     })
    // },[])

    return <>
        Dashboard
        {/* <GooglePlannerMap markers={mm} dimensions={{ width: "100%", height: "800px" }}/> */}

        {/* <UploapImage ok={'ok'}/> */}
    </>
}

export default Dashboard