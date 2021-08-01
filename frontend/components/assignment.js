import { Col, Row } from "antd";
import React, {useState, useEffect} from "react";
import { UserContext } from "../pages/profile.js"

export default function Assignment({assignmentsData, termID, categoryID,classID}) {
    const [assnForm, setAssnForm] = useState(false)
    var userID = React.useContext(UserContext)

    const handleAssignmentSubmit = (e) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var msg = {
            "userID":"google-oauth2|105237502290369756356",
            "termID":termID,
            "classID": classID,
            "categoryID":categoryID,
            "assignmentName":"yoo",
            "score":0,
            "total":100
        }
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(msg),
            redirect: 'follow'
          };
          console.log(requestOptions.body)
        fetch("http://localhost:5000/assignments", requestOptions)
        .then(response => response.text())
        .then(
            result => {
                 //setTerms((JSON.parse(result))["message"])
              //   
                console.log((JSON.parse(result)))
                //setTerms((JSON.parse(result)))
            }
          )
        .catch(error => console.log('error', error))      
        setAssnForm(false)
    }


    return (
        <div>
        {assignmentsData ?
            assignmentsData.map(assignment =>
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
                <input type="text" name="name" placeholder="assignment name"/>
                <input type="number" name="score" placeholder="score"/>
                <input type="number" name="total" placeholder="total"/>
                <input type="submit" value="Submit" onClick={e => handleAssignmentSubmit(e)} />
            </div>  :
            <Row onClick={e => setAssnForm(true)}>+ new assignment</Row>
        }        

        
        </div>
    )
}
