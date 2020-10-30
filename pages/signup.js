import firebase from "firebase/app";
import firebaseui from "firebase/app";
import "firebase/auth";
import {firebaseConfig} from "../secrets"
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'


export default function SignUp() {

    

    // var uiConfig = {
    //     callbacks: {
    //       signInSuccessWithAuthResult: function(authResult, redirectUrl) {
    //         // User successfully signed in.
    //         // Return type determines whether we continue the redirect automatically
    //         // or whether we leave that to developer to handle.
    //         return true;
    //       },
    //       uiShown: function() {
    //         // The widget is rendered.
    //         // Hide the loader.
    //         document.getElementById('loader').style.display = 'none';
    //       }
    //     },
    //     // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    //     signInFlow: 'popup',
    //     //signInSuccessUrl: 'https://',
    //     signInOptions: [
    //       // Leave the lines as is for the providers you want to offer your users.
    //       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //       firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //       firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //       firebase.auth.GithubAuthProvider.PROVIDER_ID,
    //       firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //       firebase.auth.PhoneAuthProvider.PROVIDER_ID
    //     ],
    //     // Terms of service url.
    //     //tosUrl: '<your-tos-url>',
    //     // Privacy policy url.
    //     //privacyPolicyUrl: '<your-privacy-policy-url>'
    //   };
    var ui =  firebase.auth().AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', {
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // Other config options...
      });
    return (
        <Layout>
            <div>This is the sign up page</div>
            <h1>Welcome to My Awesome App</h1>
            <div id="firebaseui-auth-container"></div>
            <div id="loader">Loading...</div>
        </Layout>
    )
}