import { NextPage } from 'next';
import Link from 'next/link';
import fetch from 'cross-fetch';

type Props = {
  data: Object;
};

const WithInitialProps: NextPage<Props> = ({ data }) => (
  <div title="List Example (as Functional Component) | Next.js + TypeScript Example">
    <h1>List Example (as Function Component)</h1>

    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
    <div style={{ wordBreak: 'break-all' }}>{JSON.stringify(data)}</div>
  </div>
);

WithInitialProps.getInitialProps = async ({ query }) => {
  console.log(query);
  const response = await fetch(`http://localhost:3000/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      name: query.name,
      price: query.price,
      category: query.category,
      img: query.img,
    }),
  });

  const data = await response.json();
  console.log(data.rows);

  return { data };
};

export default WithInitialProps;
