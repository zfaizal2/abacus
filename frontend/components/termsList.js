import React, {useState, useEffect} from "react";
import {Row} from "antd"
import TermData from "./termData";
import styles from './termsList.module.css'


export default function TermsList({userID}) {
    const [terms, setTerms] = useState([]);
    const [curTerm, setCurTerm] = useState("");
    const [termData, setTermData] = useState({})
    const [termID, setTermID] = React.useState('')
    const [term, setTerm] = React.useState({})
    const [className, setClassName] = React.useState("")
    const [hours, setHours] = React.useState(0)
    const [classButton, setClassButton] = React.useState(false)
    const [termsButton, setTermsButton] = useState(false)
    const [termName, setTermName] = useState("")

    const termURI = `http://localhost:5000/terms/${userID}`
    var myHeaders = new Headers();
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      }; 

    //for terms list
    useEffect(() =>{
        // get Terms Data
        console.log(termURI)
        fetch(termURI, requestOptions)
        .then(response => response.text())
        .then(
            result => {

                var res = JSON.parse(result)
                setTerms(res["message"])
            }
            )
        .catch(error => console.log('error', error));
    },[userID])

    useEffect(() =>{

        var thisTerm = curTerm.slice(1, -1)
        for (var i = 0; i < terms.length; i++) {
            if (terms[i]["termName"] == thisTerm) {
                setTermData(terms[i]["classes"]);
                setTermID(terms[i]._id)
                setTerm({
                    termID: terms[i]._id,
                    classes: terms[i]["classes"]
                })
                break;
            }
        }
    }, [curTerm])

    const handleClassSubmit = (e) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");     

        var msg = {
            "userID":userID,
            "termID": termID,
            "course": className, 
            "hours": hours
        }

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(msg),
            redirect: 'follow'
        };
        
        fetch("http://localhost:5000/courses", requestOptions)
        .then(response => response.text())
        .then(
            result => {
                // setCurCats(JSON.parse(result))
                setTerm({
                    termID: JSON.parse(result)["_id"],
                    classes: JSON.parse(result)["classes"]
                })
            }
          )
        .catch(error => console.log('error', error))      

        setClassButton(false)
    }
    
    
    const handleTermSubmit = e => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json"); 
        
        for (var i = 0; i < terms.length; i++) {
            if (termName == terms[i].termName) {
                setTermsButton(false)
                return;
            }
        }
        var msg = {
            "term": termName
        }
        var opt = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(msg),
            redirect: 'follow'
          };


        fetch(`http://localhost:5000/terms/${userID}`, opt)
        .then(response => response.text())
        .then(
            result => {
                setTerms(JSON.parse(result))
            }
        )
        .catch(error => console.log('error', error))  

        setTermsButton(false)

    }



    return (
        <>
            <Row>
            {terms.length >= 1 ?
                <select className={styles.customSelect} name="terms" id="term-select" onChange={e => {setCurTerm(e.currentTarget.value)}}>
                    <option>select term</option>
                    {terms.map(term =>
                        <option key={term._id} value={JSON.stringify(term["termName"])}  >
                            {JSON.stringify(term["termName"]).toLowerCase().replace(/['"]+/g, '')}
                        </option>)}
                </select>: 
            <div> Add a term to get started!  </div>}
            {termsButton ? 
                <div>
                    <input type="text" name="term name" placeholder="term name" onChange={data => {setTermName(data.target.value)}}/>
                    <input type="submit" value="Submit" onClick={e => handleTermSubmit(e)} />
                </div>
                : <button onClick={e => setTermsButton(true)}>add term</button>
            }
            </Row>
            {termID != '' ?
                <>
                    <Row>
                        {classButton ? 
                            <div>
                                <input type="text" name="class name" placeholder="class name" onChange={data => {setClassName(data.target.value)}}/>
                                <input type="number" name="credit hours" placeholder="credit hours" onChange={data => {setHours(data.target.value)}}/>
                                <input type="submit" value="Submit" onClick={e => handleClassSubmit(e)} />
                            </div>
                            : <button onClick={e => setClassButton(true)}>add class</button>
                        }
                    </Row>
                    <Row>
                        <TermData userID={userID} termID={termID} termData={term}></TermData>
                    </Row> 
                </> : <></>
            }
        </>
    )
}