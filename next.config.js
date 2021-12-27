/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/feed',
                destination: '/rss/atom.xml'
            },
        ]
    },
}

module.exports = nextConfig