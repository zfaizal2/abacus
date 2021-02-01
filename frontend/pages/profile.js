import Head from 'next/head'
import Link from 'next/link'
import MyForm from './myform'
import React, {useState, useEffect} from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import {Grid, Col, Result, message, Menu, Dropdown} from "antd"
import { DownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import auth0 from './api/utils/auth0';
import Layout from '../components/layout';
// import { get } from 'mongoose';



export default function Profile({user}) {
    const [terms, setTerms] = useState([]);
    const [menu, setMenu] = useState();
      useEffect(() => {
        console.log('trigger')
        console.log(user)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify(user)  //JSON.stringify({"created_at":"2020-12-24T02:31:07.374Z","email":"zayyanf@gmail.com","email_verified":true,"family_name":"Faizal","given_name":"Zayyan","identities":[{"provider":"google-oauth2","user_id":"105237502290369756356","connection":"google-oauth2","isSocial":true}],"locale":"en","name":"Zayyan Faizal","nickname":"zayyanf","picture":"https://lh3.googleusercontent.com/a-/AOh14GiOBUHKh-Qc6nhhxnsxX4iJkNtl9J22NUqfwm4PraA=s96-c","updated_at":"2020-12-25T05:14:05.205Z","user_id":"google-oauth2|105237502290369756356","last_ip":"73.210.132.168","last_login":"2020-12-25T05:14:05.204Z","logins_count":7,"blocked_for":[],"guardian_authenticators":[]});
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://localhost:5000/user", requestOptions)
          .then(response => response.text())
          .then(
              result => {
                  //console.log(result)
                  setTerms((JSON.parse(result))["message"])
                //   setMenu(

                    
                //   )
              }
            )
          .catch(error => console.log('error', error));


          console.log(menu)
      }, [])

        return (

            <div className="container">
                <div>{user["name"]}</div>
                <img src={user["picture"]} style={{borderRadius: "50%"}}></img>
                <div>{JSON.stringify(user)}</div>
                <select name="terms" id="term-select">
                    {terms.map(term =>
                        // <div>term</div>
                        <option value={JSON.stringify(term["termName"])}>{JSON.stringify(term["termName"]).toLowerCase().replace(/['"]+/g, '')}</option>
                        )}
                </select>
            </div>

        )
}

export async function getServerSideProps(context) {
    const session = await auth0.getSession(context.req);
    
    return {
        props: {
            user: session?.user || null,
        },
    };
}

