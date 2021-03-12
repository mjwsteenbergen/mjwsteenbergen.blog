import { GetStaticProps, GetStaticPaths } from 'next'
import React from 'react'
import Layout from '../components/Layout'
import TableOfContents from '../components/TableOfContents'
import { BlogPosts, BlogPost } from '../utils/laurentia'

type Props = {
  item?: BlogPost
  errors?: string
}

export default class PostPage extends React.Component<Props,{}> {
  render() {
    const item = this.props.item;
    let image = item?.coverImage ? <img src={item?.coverImage} className="coverimage"></img> : "";

    return (
      <Layout
        title={item?.name}
        description={item?.shortDescription}
      >
        {image}
        <div className="article">
          <p className="back-to-main">By Martijn Steenbergen</p>
          <h1 className="article-title">{item?.name}</h1>
          {process.browser && <TableOfContents />}
          <article dangerouslySetInnerHTML={{ __html: item?.html || "" }} ></article>
        </div>
        <a href="/">
          <div className="back-to-main-page">
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>Arrow Back</title><path fill='none' stroke='currentColor' stroke-linecap='square' stroke-miterlimit='10' stroke-width='48' d='M244 400L100 256l144-144M120 256h292' /></svg>
            <p>View all posts</p>
          </div>
        </a>
        <div className="about-box">
          <img src="https://avatars0.githubusercontent.com/u/5946409"></img>
          <div className="about-box-box">
            <p>Hi! I'm Martijn Steenbergen. I am a Software Engineer at BOL.com, helping you find what you need. I got my M.Sc. at the wonderful Technical University of Delft. I love automating anything and everything. I'm fascinated with design, how the world works and everything else</p>
            <div className="icon-container">
              <a target="blank" href="https://github.com/mjwsteenbergen/"><img src="/icons/logo-github.svg"></img></a>
              <a target="blank" href="https://www.linkedin.com/in/mjwsteenbergen/"><img src="/icons/logo-linkedin.svg"></img></a>
              <a target="blank" href="https://twitter.com/mjwsteenbergen/"><img src="/icons/logo-twitter.svg"></img></a>
            </div>
          </div>
        </div>
      </Layout>);
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on blogposts
  const paths = (await BlogPosts.Get()).map((post) => ({
    params: { id: post.slug.toString() },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id
    const item = (await BlogPosts.Get()).find((data) => data.slug === id)
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    return { props: { item } }
  } catch (err) {
    return { props: { errors: err.message } }
  }
}
