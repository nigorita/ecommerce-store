import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'

export default function About(){
  
  return (<div>

<Head>
      <title>About</title>
    </Head>

  <Nav />

  <div>
    <p>We are a bike sharing house</p>
    <p>we share bikes and tools and fun</p>
  </div>


  <style jsx>{`
      p {
        text-align: center;
      }
      
    `}</style>

  </div>)


}