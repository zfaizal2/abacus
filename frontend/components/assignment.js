import { Col, Row } from "antd";
import React, {useState, useEffect} from "react";
import { UserContext } from "../pages/profile.js"

export default function Assignment({assignmentsData, termID, categoryID,classID}) {
    const [assnForm, setAssnForm] = useState(false)
    const [assnScore, setAssnScore] = useState(0)
    const [assnTotal, setAssnTotal] = useState(100)
    const [assnName, setAssnName] = useState("")
    const [data, setData] = useState(assignmentsData)
    var userID = React.useContext(UserContext)

    const handleAssignmentSubmit = (e) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var msg = {
            "userID":"google-oauth2|105237502290369756356",
            "termID":termID,
            "classID": classID,
            "categoryID":categoryID,
            "assignmentName":assnName,
            "score":assnScore,
            "total":assnTotal
        }
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(msg),
            redirect: 'follow'
          };
        fetch("http://localhost:5000/assignments", requestOptions)
        .then(response => response.text())
        .then(
            result => {
                setData(JSON.parse(result)["assignments"])
            }
          )
        .catch(error => console.log('error', error))      
        setAssnForm(false)
    }


    return (
        <div>
        {data.length > 0 ?
            data.map(assignment =>
                <Row style={{width:"100%"}}>
                    <Col>
                        {assignment["assignment"]}
                    </Col>
                    <Col style={{paddingLeft:"10px"}}>
                        {(assignment["givenScore"] / assignment["totalScore"])*100}%
                    </Col>
                </Row> 
                ) :
                <div>add assignments to get started </div>
        }
        {assnForm ?
            <div>  
                <input type="text" name="name" placeholder="assignment name" onChange={data => {setAssnName(data.target.value)}}/>
                <input type="number" name="score" placeholder="score" onChange={data => setAssnScore(data.target.value)}/>
                <input type="number" name="total" placeholder="total" onChange={data => setAssnTotal(data.target.value)}/>
                <input type="submit" value="Submit" onClick={e => handleAssignmentSubmit(e)} />
            </div>  :
            <Row onClick={e => setAssnForm(true)}>+ new assignment</Row>
        }        

        
        </div>
    )
}
