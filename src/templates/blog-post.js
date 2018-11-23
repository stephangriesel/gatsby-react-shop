import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import { rhythm, scale } from '../utils/typography'
import BuyButton from '../components/BuyButton'

class BlogPostTemplate extends React.Component {
  render() {
    const images = post.frontmatter.image
    .map(x => ({
      name: x.name,
      src: require(`./../pages${post.frontmatter.path}${x.src}.jpg`)
    }))       
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const siteDescription = post.excerpt
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
          link={[
            {
              href: 'https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css',
              rel: 'stylesheet',
              type: 'text/css',
            },
          ]}
          script={[
            {
              type: 'text/javascript',
              url: '',
              id: 'snipcart',
              'data-api-key':
                'YmM1M2I3ZmUtZWEzOC00OTYyLWJlM2YtOTE0ZTZhZWEwYzhjNjM2NTE3Mjg3MzQ2ODA0MTI5',
              src: 'https://cdn.snipcart.com/scripts/2.0/snipcart.js',
            },
            {
              type: 'text/javascript',
              src:
                'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js',
            },
          ]}
        />
        <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
        </p>
        <a 
      href='#' 
      className='snipcart-add-item'
      data-item-id={post.id}
      data-item-price={post.price}
      data-item-image={post.image}
      data-item-name={post.title}
      data-item-description={post.description}
      data-item-url={"http://snipcart-gatsby.netlify.com" + post.path}>
      Buy
    </a>
    
    <img src={imgSrc}></img>
    
    <div dangerouslySetInnerHTML={{ __html: post.html }} /> 
    
     <a
       href='#' 
       className='snipcart-add-item buyBtn'
       data-item-id={post.frontmatter.id}
       data-item-price={post.frontmatter.price}
       data-item-image={post.frontmatter.image}
       data-item-name={post.frontmatter.title}
       data-item-description={post.frontmatter.description}
       data-item-url={"http://snipcart-gatsby.netlify.com" + post.frontmatter.path}>
       Buy
     </a>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />

        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
        <BuyButton post={post.frontmatter} images={images}>
    </BuyButton>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
      query BlogPostBySlug($slug: String!) {
        site {
          siteMetadata {
            title
            author
          }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
          id
          excerpt
          html
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            price
            id
            path
            description
            image {
              name
              src
            }
            customFields { 
              name
              values 
            }
          }
        }
      }
    `
