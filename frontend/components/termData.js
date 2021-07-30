import { Col, Row } from "antd";
import React, {useState, useEffect} from "react";
import { Class } from "../../backend/models/user.model";
import styles from "./classes.module.css"

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
            <div className={styles.classCard} onClick={e => setCurCats(classData["categories"])}>
                <div className={styles.className}>{JSON.stringify(classData["className"]).replace(/['"]+/g, '')}</div>
            </div>) :
            <div>No classes</div>
        }
        </Col>
        <div>
            {curCats ?
            curCats.map(assignmentData =>
                <Row>
                    <div className={styles.classCard}>
                    <Col>
                        {JSON.stringify(assignmentData["category"]).replace(/['"]+/g, '')}
                    </Col>
                    <Col style={{paddingLeft:"10px"}}>
                        {JSON.stringify(assignmentData["pctWeight"]).replace(/['"]+/g, '')}
                    </Col>
                    </div>
                </Row>
            ) :
            <div></div>}
        </div>
        </>
    )
}
