import Head from 'next/head'
import Link from 'next/link'
import MyForm from './myform'
import React, {useState} from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import {Grid, Col} from "antd"
import 'antd/dist/antd.css';
import auth0 from './api/utils/auth0';
import Layout from '../components/layout';



export default function Profile({user}) {
    //get
    return (
        // <Grid>
            //{/* <Col span={1}> */}
                <div className="container">
                    <div>{user["name"]}</div>
                    <img src={user["picture"]} style={{borderRadius: "50%"}}></img>
                    <div>{JSON.stringify(user)}</div>
                </div>
            //{/* </Col> */
        // </Grid>
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

