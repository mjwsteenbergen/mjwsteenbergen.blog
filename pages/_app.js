import './index.scss'
import './post.scss';

export const config = {
    unstable_runtimeJS: false
}

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default MyApp