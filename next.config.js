const { withContentlayer } = require("next-contentlayer"); // eslint-disable-line

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        // remotePatterns: [
        //     {
        //         protocol: "https",
        //         hostname: "dgtzuqphqg23d.cloudfront.net", // TODO: remove?
        //     },
        //     { protocol: "https", hostname: "image.mux.com" },
        // ],
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            require("./scripts/generate-sitemap");
            require("./scripts/generate-rss");
        }

        // const fileLoaderRule = config.module.rules.find((rule) =>
        //   rule.test?.test?.('.svg'),
        // )

        // config.module.rules.push(
        //   // Reapply the existing rule, but only for svg imports ending in ?url
        //   {
        //     ...fileLoaderRule,
        //     test: /\.svg$/i,
        //     resourceQuery: /url/, // *.svg?url
        //   },
        //   // Convert all other *.svg imports to React components
        //   {
        //     test: /\.svg$/i,
        //     issuer: /\.[jt]sx?$/,
        //     resourceQuery: { not: /url/ }, // exclude if *.svg?url
        //     use: ['@svgr/webpack'],
        //   },
        // )

        return config;
    },
};

module.exports = withContentlayer(nextConfig);

// module.exports = {
//     images: {
//         unoptimized: true,
//     },
//     output: 'export',
//     distDir: 'out',
// };
