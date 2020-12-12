import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import { BlogPosts, BlogPost } from '../utils/laurentia'
import React from 'react'

type Props = {
  items: BlogPost[]
}

export const config = {
  unstable_runtimeJS: false
}

export class IndexPage extends React.Component<Props, {}> {

  render() {
    return <Layout description="The fun ramblings of a person who sometimes knows what he is doing">
      <h1 className="article-header">Martijn Steenbergen</h1>
      <ul className="article-banner-holder">
        {
          this.props.items.map(i =>
            <li className="article-banner">
              <a href={i.slug}>
                <h3>{i.name}</h3>
                <p>{i.shortDescription}</p>
                <img src={i.coverImage}></img>
              </a>
            </li>
          )
        }
      </ul>
    </Layout>
  }
}
 
export const getStaticProps: GetStaticProps = async () => {
  let items = (await BlogPosts.Get()).filter(i => i.isPublished);
  return { props: { items } }
}

export default IndexPage
