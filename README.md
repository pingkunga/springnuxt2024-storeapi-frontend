
# Getting Started
this project is a simple store application that allows users to upload and download files. which has a simple JWT authentication mechanism.
there are 3 related projects for this application:

* [springnuxt2024-storeapi-backend](https://github.com/pingkunga/springnuxt2024-storeapi-backend) 
* [springnuxt2024-storeapi-frontend](https://github.com/pingkunga/springnuxt2024-storeapi-frontend) >>> this project
* [springnuxt2024-storeapi-infra](https://github.com/pingkunga/springnuxt2024-storeapi-infra)

# Features

* Nuxt3 with BackEnd Spring Boot CRUD (Category / Product Data)
* JWT Support 
* Export PDF / CSV with jspdf
* For more about Nuxt3 Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

# Use Lib

```
npm i -D vuetify vite-plugin-vuetify sass

npm i -D @nuxt/icon

npm i -D @nuxtjs/google-fonts

npm i -D @nuxtjs/robots

npm i -D @mdi/font

npm i -D apexcharts vue3-apexcharts

plugin colorhight

npm install sweetalert2 -D

//add middleware มันจะสร้าง folder miiddleware + default script มาให้
npx nuxi add middleware auth

npm i jspdf jspdf-autotable -D
```

# How to Build & Run 

* Build 

```
docker build -t store-front:1.0.0 . 
```

* Run 

```
docker run -d -p 3000:3000 --name store-app-front store-front:1.0.0

docker run -d -p 3000:3000 --env-file .\.env.production --name store-app-front store-front:1.0.0
```
