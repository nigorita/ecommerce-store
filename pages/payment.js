import React, { useState } from 'react';
import Head from 'next/head';
import Nav from '../components/nav';
import cookie from 'js-cookie';
import nextCookie from 'next-cookies';
import fetch from 'cross-fetch';

export default function Payment(props) {
  // const [item, setItem] = useState(0);
  // const [totalprice, setTotalprice] = useState(0);

  if (!props.cookies) {
    return (
      <div>
        <Head>
          <title>Payment</title>
        </Head>
        <Nav />

        <p>There is no Bike in your basket</p>
        {/* <div>{JSON.stringify(selection.cookies)}</div> */}
      </div>
    );
  } else {
    // console.log(typeof JSON.parse(selection.cookies.id));
    const cats = props.da.rows;
    //List of IDs selected by customer
    const [inthebasket, setInthebasket] = useState(
      JSON.parse(props.cookies.id),
    );
    console.log(inthebasket);
    const x = JSON.stringify(inthebasket);
    // List of selected Bike Objects
    const [lid, setLid] = useState([]);

    const lista = inthebasket.map(x => x.id);

    const sels = cats.filter(({ id }) => lista.includes(id));

    // Total Price
    let totprice = 0;

    function getBikeById(id) {
      return inthebasket.find(bike => bike.id === id);
    }

    return (
      <div>
        <Head>
          <title>Payment</title>
        </Head>
        <Nav />
        {/* <div>{JSON.stringify(selection.cookies.id)}</div> */}
        <div>
          <p>{JSON.stringify(lista)}</p>
          <p>{x}</p>
          <p>{props.cookies.id}</p>
          <p>Your selected Items:</p>
          {sels.map(catobj => {
            const myBike = getBikeById(catobj.id);
            // const [newbasket, setNewbasket] = useState([...inthebasket]);
            totprice = totprice + catobj.price * myBike.number;
            return (
              <li key={catobj.id}>
                | {catobj.category} |{' '}
                <a href={'./bikes/' + catobj.id}>{catobj.name}</a>| Price: €
                {catobj.price}|<br />
                <img src={catobj.img} alt={catobj.name} />
                <br />
                <div id="am">
                  amount: {myBike.number}
                  <button
                    onClick={() => {
                      var index = inthebasket.indexOf(myBike);
                      // let myBike2 = { id: catobj.id, number: myBike.number + 1 };
                      // let myBike3 = Object.assign(myBike, myBike2);
                      inthebasket[index].number += 1;

                      // setNewbasket(
                      //   newbasket.filter(obj => {
                      //     return obj.id !== myBike.id;
                      //   }),
                      // );
                      setInthebasket([...inthebasket]);

                      // setInthebasket([
                      //   ...inthebasket.filter(obj => {
                      //     return obj.id !== myBike.id;
                      //   }),
                      //   myBike3,
                      // ]);

                      cookie.set(
                        'id',

                        JSON.stringify(inthebasket),

                        { expires: 1 },
                        { path: '/payment' },
                      );
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      if (myBike.number > 1) {
                        var index = inthebasket.indexOf(myBike);

                        inthebasket[index].number -= 1;

                        // setNewbasket(
                        //   newbasket.filter(obj => {
                        //     return obj.id !== myBike.id;
                        //   }),
                        // );

                        setInthebasket([...inthebasket]);

                        cookie.set(
                          'id',

                          JSON.stringify(inthebasket),

                          { expires: 1 },
                          { path: '/payment' },
                        );
                      }
                    }}
                  >
                    -
                  </button>
                </div>
                <br />
                <button
                  value={myBike.id}
                  onClick={() => {
                    // setNewbasket(
                    //   newbasket.filter(obj => {
                    //     return obj.id !== myBike.id;
                    //   }),
                    // );

                    setInthebasket([
                      ...inthebasket.filter(obj => {
                        return obj.id !== myBike.id;
                      }),
                    ]);
                    cookie.set(
                      'id',

                      JSON.stringify([
                        ...inthebasket.filter(obj => {
                          return obj.id !== myBike.id;
                        }),
                      ]),

                      { expires: 1 },
                    );
                  }}
                >
                  remove item from Basket
                </button>
              </li>
            );
          })}
          <p> total price = € {totprice}</p>
        </div>

        <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          width: 20%;
          padding-left: 10%;
          padding-top: 10%;
        }

        input {
          margin: 10px;
        }

        ul {
          padding-left: 20%;
          display: grid;
          grid-template-columns: auto auto;
          list-style-type: none;
        }

        li {
          margin: 60px;
          width: 40%;
        }
        img {
          width: 200px;
        }

        #am {
          margin-left: 60px;
          font-size: 28px;
          font-style = 'bold';
          display: flex;
         
         
        }

        p {
          margin-left: 60px;
          font-size: 28px;
          font-style = 'bold';}

      `}</style>
      </div>
    );
  }
}

Payment.getInitialProps = async ctx => {
  const cookies = nextCookie(ctx);
  if (cookies.id === undefined) {
    return {};
  }

  console.log('miow miow miow');
  console.log(cookies);
  console.log('miow miow miow');

  const miow = JSON.parse(cookies.id);
  const hop = miow.map(x => x.id);

  const response = await fetch(`http://localhost:3000/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      ids: hop,
    }),
  });

  const data = await response.json();

  return { da: data, cookies: cookies };
};
