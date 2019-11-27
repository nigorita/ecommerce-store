import React from 'react';
import Head from 'next/head';
import Nav from '../components/nav';
import fetch from 'cross-fetch';
// import { useRouter } from 'next/router';

export default function BikeCats({ data }) {
  const cat = data.rows;
  return (
    <div>
      <Head>
        <title>Categories</title>
      </Head>

      <Nav />

      <ul>
        {cat.map(catobj => (
          <li>
            | {catobj.category} |{' '}
            <a href={'./bikes/' + catobj.id}>{catobj.name}</a>| Price: €
            {catobj.price} |<br />
            <br />
            <img src={catobj.img} alt={catobj.name} />
          </li>
        ))}
      </ul>

      <style jsx>{`
        p {
          text-align: center;
        }

        ul {
          padding-left: 20%;
          display: grid;
          grid-template-columns: auto auto;
          list-style-type: none;
        }

        li {
          margin: 25px;
          width: 50%;
        }
        img {
          width: 220px;
        }
      `}</style>
    </div>
  );
}

BikeCats.getInitialProps = async () => {
  const response = await fetch(`http://localhost:3000/api`);

  const data = await response.json();

  return { data };
};
