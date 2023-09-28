import type { ArticlesQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Article from '../Article/Article'

export const QUERY = gql`
  query ArticlesQuery {
    posts {
      id
      title
      body
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ posts }: CellSuccessProps<ArticlesQuery>) => {
  return (
    <ul>
      {posts.map((post) => (
        <Article key={post.id} post={post} />
      ))}
    </ul>
  )
}
