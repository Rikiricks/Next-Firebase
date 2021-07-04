import React, { ReactNode } from "react";
import Link from "next/link";
import { NavLink } from "./NavLink";
import Head from "next/head";
import  '../styles/Home.module.css'


type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Next with TS and Firebase" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="app-container bg-light">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav">
          <NavLink href="/"><a className="nav-item nav-link">Home</a></NavLink>
          <NavLink href="/User"><a className="nav-item nav-link">Users</a></NavLink>
        </div>
      </nav>
      <div className="container pt-4 pb-4">
        {children}
      </div>
    </div>
       
    <footer className="text-center mt-4">
      <hr />
      <span>I am here to stay (Footer)</span>
    </footer>
  </div>
);

export default Layout;