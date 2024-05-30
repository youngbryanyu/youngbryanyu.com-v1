# Young Bryan Yu's Home Page
My personal website. 

## Setup
Clone the repository using:
```
git clone https://github.com/youngbryanyu/youngbryanyu.com.git
```

Ensure yarn is installed by running `npm install --global yarn`. If you don't have npm and node installed either [install it](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-nodejs-and-npm).

Download dependencies using:
```
yarn 
```

## Build
Build the source code using:
```
yarn run build
```

## Personal note to self (deployment)
Automatic deployment after pushing to GitHub isn't working right now (need to diagnose this). To deploy, run:
1. `vercel` to deploy to dev environment
2. `vercel --prod` or use the console to deploy to prod

Alternatively, run the script `yarn run deploy`.

## Stack
- Next.js
- Typescript
- Tailwind
- Contentlayer/MDX
- Fauna
- Vercel
