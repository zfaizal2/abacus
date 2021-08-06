import Head from 'next/head'
import Link from 'next/link'
import MyForm from './myform'
import React, {useState, useEffect, useContext} from "react";
import { Redirect } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import {Grid, Col, Button, Modal, Menu, Dropdown, Row, Card} from "antd"
import { DownOutlined } from '@ant-design/icons'; 
import 'antd/dist/antd.css';
import auth0 from './api/utils/auth0';
import Layout from '../components/layout';
import TermsList from '../components/termsList'
import { createMemoryHistory } from 'history';
import { useRouter } from 'next/router'
import Header from '../components/header'

const UserContext = React.createContext();
export {UserContext}

export default function Profile({user}) {
    const [userID, setUserID] = React.useState('')
  

    const router = useRouter()


    //useEffect for setup
    useEffect(() => {
        
        if (!user) {
            router.push("/")
        }
        else {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          }; 


        //get mongo ID
        var keyStatus = fetch(`http://localhost:5000/users/${user["sub"]}`, requestOptions)
            .then(response => response.text())
            .then(
                result => {
                    // console.log(result)
                    var res = JSON.parse(result)
                    setUserID(res["message"])

                }
            )
            }
          }, [])


    

        return (
            <>
            <Header/>
            {user ?
            <UserContext.Provider value={userID}>
                <Row>
                    <Col>
                        <Card style={{dropShadow:"30px 10px 4px #4444dd"}}>
                            {user['picture'] ?
                            <img src={user["picture"]} style={{borderRadius: "50%", width:"5rem"}}></img> : null}
                            <div>{user["name"]}</div>
                        </Card>
                    </Col>
                    <Col>
                        <TermsList userID={userID}></TermsList>
                    </Col>
                </Row> 
            </UserContext.Provider>
        : <></>  }
        </>             
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

