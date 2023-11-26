import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import EbayProfitCalculator from "../components/ebayProfitCalculator/ebayProfitCalculator"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { QueryClient, QueryClientProvider } from "react-query"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        onError: error => console.log(error.message),
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <Layout location={location} title={siteTitle}>
        {/*<Bio />*/}
        <EbayProfitCalculator />
      </Layout>
    </QueryClientProvider>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
