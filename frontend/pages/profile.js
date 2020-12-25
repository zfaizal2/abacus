import Head from 'next/head'
import Link from 'next/link'
import MyForm from './myform'
import React, {useState} from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Grid from "antd"
import auth0 from './api/utils/auth0';
import Layout from '../components/layout';



export default function Profile({user}) {
    return (
        <div className="container">
            <div>{user["given_name"]}</div>
            <div>{JSON.stringify(user)}</div>
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

// Profile(); 
