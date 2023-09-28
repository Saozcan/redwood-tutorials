import { Link, routes } from '@redwoodjs/router'

const Article = ({ post }) => (
  <li key={post.id}>
    <Link to={routes.post({ id: post.id })}>{post.id}</Link>
  </li>
)

export default Article
