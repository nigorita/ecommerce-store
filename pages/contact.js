import React from 'react';
import Head from 'next/head';
import Nav from '../components/nav';

export default function Contact() {
  return (
    <div>
      <Head>
        <title>Contact</title>
      </Head>

      <Nav />

      <div>
        <p>You can find us here</p>
      </div>

      <style jsx>{`
        p {
          text-align: center;
        }
      `}</style>
    </div>
  );
}
