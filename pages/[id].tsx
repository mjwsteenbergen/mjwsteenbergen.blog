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
        <h1 className="article-title">{item?.name}</h1>
        <article dangerouslySetInnerHTML={{ __html: item?.html || "" }} >

        </article>
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
