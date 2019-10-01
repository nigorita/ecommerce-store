import React from 'react';
import Head from 'next/head';
import Nav from '../components/nav';
import { useRouter } from 'next/router';
import cats from '../data';

export default function BikeCats() {
  return (
    <div>
      <Head>
        <title>Categories</title>
      </Head>

      <Nav />

      <ul>
        {cats.map(catobj => (
          <li>
            | {catobj.category} |{' '}
            <a href={'./bikes/' + catobj.id}>{catobj.name}</a>| Price: €
            {catobj.price}|<br />
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
          width: 40%;
        }
        img {
          width: 200px;
        }
      `}</style>
    </div>
  );
}
