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
  const code = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-GTLDZDRMZH');
`;

  return <div>
    <Head>
      <title>{title}</title>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-GTLDZDRMZH"></script>
      <script dangerouslySetInnerHTML={{ __html: code}}>
      </script>

      <meta name="og:title" content={title}/>

      {description}

      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {props.children}
  </div>
}


export default Layout
