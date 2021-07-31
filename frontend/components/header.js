import React, {useState, useEffect} from "react";
import { Col, Row } from "antd";
import styles from './header.module.css'

export default function Header() {
    return (
    <>
         <link href='http://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'/>
        <Row>
            <Col>
                <img className={styles.logo} src="https://raw.githubusercontent.com/zfaizal2/abacus/main/frontend/public/abacus.png"></img>
            </Col>
            <Col>
                <div className={styles.title}> abacus </div>
            </Col>
            <Col className={styles.signout}>
                <div className={styles.signoutButton}>
                    <a
                        href="/api/logout"
                        className={styles.signoutText}
                    >
                        sign out
                    </a>
                </div>
            </Col>
        </Row>
    </>
    )
}
