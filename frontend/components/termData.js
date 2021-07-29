import { Col } from "antd";
import React, {useState, useEffect} from "react";

export default function TermData({termData}) {
    const [curCats, setCurCats] = useState([])


    return (
        <Col>
        {termData.length > 0 ? 
            termData.map(classData =>
            <div onClick={e => setCurCats(classData["categories"])}>{JSON.stringify(classData["className"]).replace(/['"]+/g, '')}</div>) :
            <div>No classes</div>
        }
        </Col>
    )
}
