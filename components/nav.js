import React from 'react';
import Link from 'next/link';

const links = [
  { href: '/about', label: 'About' },
  { href: '/payment', label: 'Shopping Basket' },
  { href: '/contact', label: 'contact' },
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      {links.map(({ key, href, label }) => (
        <li key={key}>
          <Link href={href}>
            <a>{label}</a>
          </Link>
        </li>
      ))}
    </ul>
    <img
      src="https://i.ibb.co/zxxQNLg/imageedit-1-7628063946.png"
      alt="imageedit-1-7628063946"
    />

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        text-align: center;
        background-color: #cddefa;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 8px 16px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 18px;
      }
      img {
        width: 100px;
        margin-top: 0;
        background-color: #cddefa;
      }
    `}</style>
  </nav>
);

export default Nav;
