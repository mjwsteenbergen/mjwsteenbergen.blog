import Link from 'next/link'
import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import { BlogPosts, Result } from '../utils/laurentia'
import React from 'react'

type Props = {
  items: Result[]
}

export class IndexPage extends React.Component<Props, {}> {

  render() {
    return <Layout title="mjwsteenbergen-blog">
      <h1 className="article-header">Martijn Steenbergen</h1>
      <ul className="article-banner-holder">
        {
          this.props.items.map(i =>
            <Link href={i.slug}>
              <li className="article-banner">
                <h3>{i.name}</h3>
                <p>{i.shortDescription}</p>
                <img src={i.coverImage}></img>
              </li>
            </Link>
          )
        }
      </ul>
    </Layout>
  }
}
 
export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.

  let items = await BlogPosts.Get();
  return { props: { items } }
}

export default IndexPage
