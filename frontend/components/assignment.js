import { Col, Row } from "antd";
import React, {useState, useEffect} from "react";
import { UserContext } from "../pages/profile.js"

export default function Assignment({userID, assignmentsData, termID, categoryID, classID}) {
    const [assnForm, setAssnForm] = useState(false)
    const [assnScore, setAssnScore] = useState(0)
    const [assnTotal, setAssnTotal] = useState(100)
    const [assnName, setAssnName] = useState("")
    const [data, setData] = useState(assignmentsData)
    const [totalScore, setTotalScore] = useState(0)
    
    var userID = React.useContext(UserContext)


    useEffect(() => {
        // console.log(grade)
        var sumScore = 0
        var totalScore = 0
        for (let i = 0; i < data.length; i++) {
            sumScore += data[i]["givenScore"]
            totalScore += data[i]["totalScore"]
        }
        var total = (sumScore/totalScore)*100
        if (total >= 0) {
            setTotalScore([total])
        }
    }, [data])
      

    const handleAssignmentSubmit = (e) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var msg = {
            "userID":userID,
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
            <Row style={{paddingLeft:"10px"}}>
                {totalScore}
            </Row>
        {data.length > 0 ?
            data.map(assignment =>
                <Row style={{width:"100%"}} key={assignment._id}>
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
