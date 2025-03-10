import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import Layout from "../../components/Layout"


export default function Home () {

    const user = useSelector(state => state.auth)

    console.log(user)

    return (
        <Layout>
            <div className="homeContainer">
                <h1>Home</h1>
                <p>Welcome to the Home page!</p>
            </div>
        </Layout>
    )
}