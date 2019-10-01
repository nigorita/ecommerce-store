import React, { useState } from 'react';
import Head from 'next/head';
import Nav from '../../components/nav';
import { useRouter } from 'next/router';
import cats from '../../data';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';

// console.log(cats);
export default function Bike() {
  // const [stritem, setStritem] = useState('');
  // const [items, setItems] = useState(['a', 'b']);
  // const [count, setCount] = useState(0);
  const router = useRouter();
  const { bike } = router.query;

  const bikeObj = cats.find(obj => obj.id === Number(bike));

  if (!bikeObj) {
    return 'Loading';
  }

  const [dis, setDis] = useState(false);

  return (
    <div>
      <Head>
        <title>Laufrad</title>
      </Head>

      <Nav />

      <div className="Info">
        <b>
          {bikeObj.name} || Price: €{bikeObj.price}
        </b>
        <br />
        <img src={bikeObj.img} alt={bikeObj.category} />
        {/* {cats.find(obj => obj.id === Number(bike)).name}
        {cats.find(obj => obj.id === Number(bike)).price} */}
        <button
          disabled={dis}
          onClick={() => {
            // const [but]
            // var newitems = [...items];
            // newitems = [...newitems, bikeObj.id];
            // setItems(newitems);
            // // setCount(count + 1);

            setDis(true);
            const { id } = nextCookie();

            if (id === undefined) {
              cookie.set(
                'id',
                // [bikeObj.id],
                JSON.stringify([bikeObj.id]),

                // bikeObj.id.toString() + bikeObj.name,
                { expires: 1 },
                { path: '/payment' },
              );
            }

            if (id !== undefined) {
              const listo = JSON.parse(id);
              cookie.set(
                'id',
                JSON.stringify([...listo, bikeObj.id]),
                // id + JSON.stringify([bikeObj.id]),
                // id + bikeObj.id.toString() + bikeObj.name,
                { expires: 1 },
                { path: './payment' },
              );
            }
          }}
        >
          Add to Cart
        </button>
      </div>

      <style jsx>{`
        .Info {
          display: flex;
          flex-direction: column;
          padding-top: 5%;
          padding-left: 5%;
          padding-bottom: 5%;
          width: 20%;
          justify-content: center;

          background-color: #fce5e3;
          margin: 5%;
        }

        img {
          width: 200px;
        }
      `}</style>
    </div>
  );
}

Bike.getInitialProps = async () => {
  return {};
};
