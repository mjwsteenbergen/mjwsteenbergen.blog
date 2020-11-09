import { GetStaticProps, GetStaticPaths } from 'next'

import Layout from '../components/Layout'
import { BlogPosts, Result } from '../utils/laurentia'

type Props = {
  item?: Result
  errors?: string
}

const StaticPropsDetail = ({ item, errors }: Props) => {
  if (errors) {
    return (
      <Layout title="Error | Next.js + TypeScript Example">
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    )
  }

  return (
    <Layout
      title={`${
        item ? item.name : 'User Detail'
      } | mjwsteenbergen-blog`}
    >
      <img src={item?.coverImage} className="coverimage"></img>
      <div className="article">
        <p className="back-to-main">By Martijn Steenbergen</p>
        <h1 className="article-title">{item?.name}</h1>
        <article dangerouslySetInnerHTML={{ __html: item?.html || "" }} ></article>
      </div>
      <div className="about-box">
        <img src="https://avatars0.githubusercontent.com/u/5946409"></img>
        <div className="about-box-box">
          <p>Hi! I'm Martijn Steenbergen. I am a 23 year old student living in Delft, where I have been studying Computer Science for 5 years. I have traveled the world, am fascinated with UI/UX and love TV-series. </p>
          <div className="icon-container">
            <a href="https://github.com/mjwsteenbergen/"><img src="/icons/logo-github.svg"></img></a>
            <a href="https://www.linkedin.com/in/mjwsteenbergen/"><img src="/icons/logo-linkedin.svg"></img></a>
            <a href="https://twitter.com/mjwsteenbergen/"><img src="/icons/logo-twitter.svg"></img></a>
          </div>
        </div>
      </div>
      
    </Layout>
  )
}

export default StaticPropsDetail

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on users
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