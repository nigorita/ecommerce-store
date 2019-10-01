import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
    </Head>

    <Nav />

    <div className='hero'>
      <h1 className='title'>Welcome to Bike Sharing House!</h1>
    

      <div className='row'>
        <a href='https://nextjs.org/docs' className='card'>
          <h3>How it works &rarr;</h3>
          <p>How can you borrow Bikes</p>
        </a>
        <a href='https://nextjs.org/learn' className='card'>
          <h3>What you should take care of &rarr;</h3>
          <p>Learn about conditions and requirements</p>
        </a>
        <a
          href='/bikecat'
          className='card'
        >
          <h3>Bike Categories &rarr;</h3>
          <p>Find the suitable Bike for you!</p>
        </a>
      </div>
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
        color: #445991;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
        border-radius: 20px;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </div>
)

export default Home
