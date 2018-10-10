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
