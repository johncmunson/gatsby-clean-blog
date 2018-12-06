import React from 'react'
import Layout from '../components/layout'
import './404.css'

const NotFoundPage = () => (
  <Layout>
    <div className="glitch">
      <h1>404</h1>
      <p>
        You just hit a route that doesn&#39;t exist... you should probably go
        home now.
      </p>
    </div>
  </Layout>
)

export default NotFoundPage

// As you can see, pages are not restricted to markdown files. If absolutely
// necessary, you can use a javascript file and a page will be created at
// a path matching the name of the file. However... this page WILL NOT show
// up as a blog post! Support for this could be added if need be. Pages like
// this one would continue functioning the same way. Javascript pages that
// are in a folder and contain frontmatter would get created as a blog post.
