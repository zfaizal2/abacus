import { Col, Row } from "antd";
import React, {useState, useEffect, useContext} from "react";
// import { Assignment, Class } from "../../backend/models/user.model";
import styles from "./classes.module.css"
import Assignment from "./assignment.js"
import { UserProvider } from "../pages/api/utils/user";

export default function TermData({userID, termID, termData}) {
    const [curCats, setCurCats] = useState([])
    // const [assnForm, setAssnForm] = useState(false)
    const [catName, setCatName] = useState("")
    const [catWeight, setCatWeight] = useState(0)
    const [classID, setClassID] = useState("")
    const [catForm, setCatForm] = useState(false)
    const [classClick, setClassClick] = useState(false)
    // const [data, setData] = useState(termData)
    


    useEffect(() => {
        setCurCats([])
        setClassClick(false)
    }, [termData])

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
            {termData.classes ? 
                termData.classes.map(classData =>
                <div className={styles.classCard} key={classData._id} onClick={e => {setCurCats(classData["categories"]); setClassID(classData._id); setClassClick(true)}}>
                    <div className={styles.className}>{JSON.stringify(classData["className"]).replace(/['"]+/g, '')}</div>
                </div>) :
                <div>No classes</div>
            }
            </Col>
            {classClick ?
                <div>
                    {curCats.length > 0 ?
                    curCats.map(categoryData =>
                        <Col>
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
                                    <Assignment assignmentsData={categoryData["assignments"]} termID={termData.termID} categoryID={categoryData._id} classID={classID}></Assignment>

                                </Row>
                            </div>
                        </Col>
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
                </div> : <></> }
        </>
    )
}
