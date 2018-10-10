# Gatsby MDX Starter

This Gatsby starter intends to be a full featured boilerplate for getting started with an MDX powered blog.

![gatsby-mdx](./gatsby-mdx-rectangle.jpg)

### Getting Started

1. If you haven't already, install `gatsby-cli`... `npm install --global gatsby-cli`
2. `gatsby new my-mdx-blog https://github.com/gatsby-mdx-starter/gatsby-mdx-starter`
3. Create new blog posts as `.mdx` files inside of `src/pages`
4. New posts should have the following frontmatter

```
export const frontmatter = {
  title: 'Title goes here',
  author: 'John Munson',
  draft: false,
  date: '2018-09-25T23:46:37.121Z',
  tags: ['gatsby', 'mdx', 'blog']
}
```

5. `gatsby develop`

### Todo

- local mdx images (see [issue](https://github.com/ChristopherBiscardi/gatsby-mdx/issues/152) @ gatsby-mdx)
- index page pagination
- keyword search
- tag filtering
- posts template (next, previous, title, date, etc)
- google analytics
- page for popular posts (powered by analytics)
- about page
- commenting system
- better encapsulation of react-live css. alternatively, submit PR back to react-live so they can better support "bring your own styles"
- update prettier to support mdx
- make sure I'm using /static correctly
- Setup storybook (or similar)
- Add test suite
  - Jest
  - react-testing-library
  - cypress
  - add to the precommit routine
    - [pre-commit](https://github.com/observing/pre-commit) or [husky](https://github.com/typicode/husky) might help
