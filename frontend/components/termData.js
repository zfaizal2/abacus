import { Col, Row } from "antd";
import React, {useState, useEffect} from "react";

export default function TermData({termData}) {
    const [curCats, setCurCats] = useState([])

    useEffect(() => {
        setCurCats([])
    }, [termData])


    return (
        <>
        <Col>
        {termData.length > 0 ? 
            termData.map(classData =>
            <div onClick={e => setCurCats(classData["categories"])}>{JSON.stringify(classData["className"]).replace(/['"]+/g, '')}</div>) :
            <div>No classes</div>
        }
        </Col>
        <div>
            {curCats ?
            curCats.map(assignmentData =>
                <Row>
                    <Col>
                        {JSON.stringify(assignmentData["category"]).replace(/['"]+/g, '')}
                    </Col>
                    <Col style={{paddingLeft:"10px"}}>
                        {JSON.stringify(assignmentData["pctWeight"]).replace(/['"]+/g, '')}
                    </Col>
                </Row>
            ) :
            <div></div>}
        </div>
        </>
    )
}
