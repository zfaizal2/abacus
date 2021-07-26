import React, {useState, useEffect} from "react";
import {Grid, Col, Button, Modal, Menu, Dropdown, Row, Card} from "antd"


export default function TermsList({userID}) {
    const [terms, setTerms] = useState([]);
    const [curTerm, setCurTerm] = useState("");
    const [curCats, setCurCats] = useState([])
    const [termData, setTermData] = useState({})
    const [termID, setTermID] = React.useState('')

    var myHeaders = new Headers();
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      }; 

    // get Terms Data

    

    

    //for terms list
    useEffect(() =>{

        fetch(`http://localhost:5000/terms/5fe81c875d2445229c78cd3d`, requestOptions)
        .then(response => response.text())
        .then(
            result => {
                // console.log(userID)
                // console.log(result)
                var res = JSON.parse(result)
                // console.log(res)
                setTerms(res["message"])
            }
            )
        .catch(error => console.log('error', error));
    },[])

    useEffect(() =>{

        var thisTerm = curTerm.slice(1, -1)
        for (var i = 0; i < terms.length; i++) {
            if (terms[i]["termName"] == thisTerm) {
                setTermData(terms[i]["classes"]);
                console.log(terms[i]._id)
                setTermID(terms[i]._id)
                break;
            }
        }
    }, [curTerm])


    return (
        <Row>
        {terms.length >= 1 ?
            <select name="terms" id="term-select" onChange={e => {setCurTerm(e.currentTarget.value); setCurCats()}}>
               
                {terms.map(term =>
                    // <div>term</div>
                    <option key={term._id} value={JSON.stringify(term["termName"])}  >
                        {JSON.stringify(term["termName"]).toLowerCase().replace(/['"]+/g, '')}
                    </option>)}
            </select>: 
        <div> Add a term to get started!  </div>}
        </Row>
    )
}