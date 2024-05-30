const { withContentlayer } = require("next-contentlayer"); // eslint-disable-line

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: false,
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            require("./scripts/generate-sitemap");
            require("./scripts/generate-rss");
        }

        return config;
    },
};

module.exports = withContentlayer(nextConfig);