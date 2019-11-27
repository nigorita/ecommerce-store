import React, { useState } from 'react';
import Head from 'next/head';
import Nav from '../../components/nav';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import fetch from 'cross-fetch';
// import { useRouter } from 'next/router';

// console.log(cats);

export default function Bike({ chiz }) {
  // const [stritem, setStritem] = useState('');
  // const [items, setItems] = useState(['a', 'b']);
  // const [count, setCount] = useState(0);
  // const [name, setName] = useState('');
  // const cats = data.rows;
  const cats = chiz.data.rows;
  const sims = chiz.other.rows;

  console.log(77777);
  console.log(typeof sims);
  console.log(sims);
  console.log(typeof sims);
  const sims2 = sims.filter(x => {
    return x.id !== cats[0].id;
  });
  console.log(sims2);

  const tooshe = (listak, item) => {
    return listak.includes(item);
  };

  // const router = useRouter();
  // const { bike } = router.query;

  const bikeObj = cats[0];
  // name = setName(bikeObj.name);

  if (!bikeObj) {
    return 'Loading';
  }

  const [dis, setDis] = useState(false);
  const [amount, setAmount] = useState(0);

  return (
    <div>
      <Head>
        <title>Bike</title>
      </Head>

      <Nav />

      <div className="Info">
        <b>
          {bikeObj.name} || Price: €{bikeObj.price}
        </b>
        <br />
        <img src={bikeObj.img} alt={bikeObj.category} />
        {/* {cats.find(obj => obj.id === Number(bike)).name}
        {cats.find(obj => obj.id === Number(bike)).price} */}{' '}
        <br />
        amount: {amount} <br /> <br />
        <button onClick={() => setAmount(amount + 1)}>+</button>
        <button onClick={() => setAmount(amount - 1)}>-</button>
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
                JSON.stringify([{ id: bikeObj.id, number: amount }]),

                // bikeObj.id.toString() + bikeObj.name,
                { expires: 1 },
                { path: '/payment' },
              );
            }

            if (id !== undefined) {
              const listo = JSON.parse(id);
              if (tooshe(listo)) {
              }
              console.log('my listo is....' + listo);
              cookie.set(
                'id',
                JSON.stringify([...listo, { id: bikeObj.id, number: amount }]),
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

      <div>
        {sims2.map(catobj => {
          // const [newbasket, setNewbasket] = useState([...inthebasket]);

          return (
            <li key={catobj.id}>
              | {catobj.category} | <a href={'./' + catobj.id}>{catobj.name}</a>
              | Price: €{catobj.price}|<br />
              <img src={catobj.img} alt={catobj.name} />
            </li>
          );
        })}
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

Bike.getInitialProps = async ctx => {
  const id = await ctx.query.bike;
  const response1 = await fetch(`http://localhost:3000/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      id: id,
    }),
  });

  const data = await response1.json();
  const category = data.rows[0].category;
  const response2 = await fetch(`http://localhost:3000/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      category: category,
    }),
  });

  const data2 = await response2.json();
  console.log(category);

  const chiz = { data: data, other: data2 };
  return { chiz };
};
