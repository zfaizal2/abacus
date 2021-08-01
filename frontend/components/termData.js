import { Col, Row } from "antd";
import React, {useState, useEffect, useContext} from "react";
// import { Assignment, Class } from "../../backend/models/user.model";
import styles from "./classes.module.css"
import Assignment from "./assignment.js"
import { UserProvider } from "../pages/api/utils/user";

export default function TermData({termData}) {
    const [curCats, setCurCats] = useState([])
    // const [assnForm, setAssnForm] = useState(false)
    const [curCat, setCurCat] = useState("")
    const [assnName, setAssnName] = useState("")
    const [assnScore, setAssnScore] = useState(0)
    const [assnTotal, setAssnTotal] = useState(0)
    const [classID, setClassID] = useState("")
    


    useEffect(() => {
        setCurCats([])
    }, [termData])




    return (
        <>

        <Col>
        {termData.classes ? 
            termData.classes.map(classData =>
            <div className={styles.classCard} onClick={e => {setCurCats(classData["categories"]); setClassID(classData._id); console.log(classData._id)}}>
                <div className={styles.className}>{JSON.stringify(classData["className"]).replace(/['"]+/g, '')}</div>
            </div>) :
            <div>No classes</div>
        }
        </Col>
        <div>
            {curCats ?
            curCats.map(categoryData =>
                <Col>
                    <div className={styles.categoryCard}>
                        <Row>
                            <Col>
                                <div className={styles.categoryText} >{JSON.stringify(categoryData["category"]).replace(/['"]+/g, '')}</div>
                            </Col>
                            <Col>
                                <div className={styles.pctText}>{JSON.stringify(categoryData["pctWeight"]).replace(/['"]+/g, '')}</div>
                            </Col>
                        </Row>
                        <Row>
                            <Assignment assignmentsData={categoryData["assignments"]} termID={termData.termID} categoryID={categoryData._id} classID={classID}></Assignment>

                        </Row>
                    </div>
                </Col>
            ) :
            <div></div>}
        </div>
        </>
    )
}
