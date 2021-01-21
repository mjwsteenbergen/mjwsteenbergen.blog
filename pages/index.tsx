import Layout from '../components/Layout'
import { BlogPost, BlogPosts } from '../utils/laurentia'
import React from 'react'
import { GetStaticProps } from 'next'

type Props = {
  items: BlogPost[]
}

export class IndexPage extends React.Component<Props, {}> {

  render() {
    return <Layout description="The fun ramblings of a person who sometimes knows what he is doing">
      <h1 className="article-header">Martijn Steenbergen</h1>
      <ul className="article-banner-holder">
        {
          this.props.items.map(i =>
            <li className="article-banner" key={i.name}>
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

export default IndexPage

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async () => {
  try {
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    const items = (await BlogPosts.Get()).filter(i => i.isPublished);
    return { props: { items } };
  } catch (err) {
    return { props: { errors: err.message } }
  }
}