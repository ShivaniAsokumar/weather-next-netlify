import Footer from './footer';

export default function Layout({children}) {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="public/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="A weather app built on react and Next.js, deployed on Netlify"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" integrity="sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ=" crossOrigin="anonymous" />

        <title>A weather app on react and next.js</title>
      </head>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      { children  }
      <Footer />
  </>
  )
}
