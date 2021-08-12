import { Col, Row } from "antd";
import React, {useState, useEffect, useContext} from "react";
// import { Assignment, Class } from "../../backend/models/user.model";
import styles from "./classes.module.css"
import Assignment from "./assignment.js"
import { UserProvider } from "../pages/api/utils/user";

export default function TermData({userID, termID, termData}) {
    const [curCats, setCurCats] = useState([])
    const [catName, setCatName] = useState("")
    const [catWeight, setCatWeight] = useState(0)
    const [classID, setClassID] = useState("")
    const [catForm, setCatForm] = useState(false)
    const [classClick, setClassClick] = useState(false)
    const [totalGrade, setTotalGrade] = useState(0)

    useEffect(() => {
        setCurCats([])
        setClassClick(false)
    }, [termData])

    useEffect(() => {
        setTotalGrade(0)
        var grade = 0
        for (let i = 0; i < curCats.length; i++) {
            if (curCats[i]["assignments"]) {
                var cat = curCats[i]
                var assns = curCats[i]["assignments"]
                var sumScore = 0
                var totalScore = 0
                for (let j = 0; j < assns.length; j++) {
                    sumScore += assns[j]["givenScore"]
                    totalScore += assns[j]["totalScore"]
                }
                var total = (sumScore/totalScore)*100
                if (total >= 0 ) {
                    grade += (total*(cat["pctWeight"]/100) )
                }
            }
        }
        setTotalGrade(grade) 
    }, [curCats])

    const handleCategorySubmit = (e) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var msg = {
            "userID":userID,
            "termID":termID,
            "classID": classID,
            "category":catName,
            "weight":catWeight,
        }

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(msg),
            redirect: 'follow'
          };

          fetch("http://localhost:5000/categories", requestOptions)
          .then(response => response.text())
          .then(
              result => {
                  setCurCats(JSON.parse(result)["categories"])
              }
            )
          .catch(error => console.log('error', error))      
        setCatForm(false)
    }

    



    return (
        <>
            <Col>
                {termData.classes  ? 
                    termData.classes.map(classData =>
                    <div className={styles.classCard} key={classData._id} onClick={e => {setCurCats(classData["categories"]); setClassID(classData._id); setClassClick(true)}}>
                        <div className={styles.className}>{JSON.stringify(classData["className"]).replace(/['"]+/g, '')}</div>
                    </div>) :
                    <div>No classes</div>
                }

            </Col>

            {classClick ?
                <Col>
                <Row>current grade {totalGrade}</Row>
                <div>
                    {curCats.length > 0 ?
                    curCats.map(categoryData =>
                        
                            <div className={styles.categoryCard} key={categoryData._id}>
                                
                                <Row>
                                    <Col>
                                        <div className={styles.categoryText} >{JSON.stringify(categoryData["category"]).replace(/['"]+/g, '')}</div>
                                    </Col>
                                    <Col>
                                        <div className={styles.pctText}>{JSON.stringify(categoryData["pctWeight"]).replace(/['"]+/g, '')}</div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Assignment assignmentsData={categoryData["assignments"]} termID={termData.termID} categoryID={categoryData._id} classID={classID} ></Assignment>

                                </Row>
                            </div>
                        
                    ) :
                    <div>add categories to get started</div>}
                    {catForm ?
                        <div>  
                            <input type="text" name="name" placeholder="category name" onChange={data => {setCatName(data.target.value)}}/>
                            <input type="number" name="weight" placeholder="percent" onChange={data => setCatWeight(data.target.value)}/>
                            <input type="submit" value="Submit" onClick={e => handleCategorySubmit(e)} />
                        </div>
                        : <button onClick={e => setCatForm(true)}> + new category </button>
                    }
                </div> </Col>: <></> }
                
        </>
    )
}
