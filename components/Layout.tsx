import React, { ReactNode } from 'react'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string,
  description?: string
}

const Layout = (props: Props) => {
  let title = props.title == undefined ? "mjwsteenbergen-blog" : props.title + " | mjwsteenbergen-blog";
  let description = null;
  if(props.description !== undefined)
  {
    description = [
      <meta name="twitter:description" content={props.description}/>,
      <meta name="og:description" content={props.description}/>,
      <meta name="twitter:description" content={props.description}/>
    ]
  }
  return <div>
    <Head>
      <title>{title}</title>

      <meta name="og:title" content={title}/>

      {description}

      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {/* <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{' '}
        |{' '}
        <Link href="/about">
          <a>About</a>
        </Link>{' '}
        |{' '}
        <Link href="/users">
          <a>Users List</a>
        </Link>{' '}
        | <a href="/api/users">Users API</a>
      </nav>
    </header> */}
    {props.children}
    {/* <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer> */}
  </div>
}

export default Layout
