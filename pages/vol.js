import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'

export default function Vol(){
  
  return (<div>

<Head>
      <title>Volunteering</title>
    </Head>

  <Nav />

  <div>
    <p>Are you a volunteer</p>
    
  </div>


  <style jsx>{`
      p {
        text-align: center;
      }
      
    `}</style>

  </div>)


}