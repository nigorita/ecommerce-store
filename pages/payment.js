import React, { useState } from 'react';
import Head from 'next/head';
import Nav from '../components/nav';
import cookie from 'js-cookie';
import nextCookie from 'next-cookies';
import cats from '../data.js';

export default function Payment(selection) {
  // const [item, setItem] = useState(0);
  // const [totalprice, setTotalprice] = useState(0);

  if (JSON.stringify(selection.cookies) === '{}') {
    console.log(selection);
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

    //List of IDs selected by customer
    const [inthebasket, setInthebasket] = useState(
      JSON.parse(selection.cookies.id),
    );

    // List of selected Bike Objects
    const sels = cats.filter(({ id }) => inthebasket.includes(id));

    // Total Price
    let totprice = 0;

    return (
      <div>
        <Head>
          <title>Payment</title>
        </Head>
        <Nav />
        {/* <div>{JSON.stringify(selection.cookies.id)}</div> */}
        <div>
          <p>Your selected Items:</p>
          {sels.map(catobj => {
            totprice = totprice + catobj.price;
            return (
              <li>
                | {catobj.category} |{' '}
                <a href={'./bikes/' + catobj.id}>{catobj.name}</a>| Price: €
                {catobj.price}|<br />
                <img src={catobj.img} alt={catobj.name} />
                <br />
                <button
                  value={catobj.id}
                  onClick={() => {
                    const newbasket = inthebasket.filter(value => {
                      return value !== catobj.id;
                    });
                    setInthebasket(newbasket);
                    cookie.set(
                      'id',

                      JSON.stringify(newbasket),

                      { expires: 1 },
                      { path: '/payment' },
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
        );
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

        p {
          margin-left: 60px;
          font-size: 28px;
          font-style = 'bold';
        }
      `}</style>
      </div>
    );
  }
}

Payment.getInitialProps = async ctx => {
  const cookies = nextCookie(ctx);
  console.log('cookie obj', cookies);

  return {
    cookies: cookies,
  };
};
