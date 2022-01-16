import { gql } from '@apollo/client'

export const ALL_POSTS = gql`
  query allPostsByPagination($pageSize: Int!, $skipValue: Int!) {
    allPosts(pageSize: $pageSize, skipValue: $skipValue) {
      bookUrl
      comments
      description
      id
      image
      tags
      title
      user
      likes
    }
  }
`

export const ALL_POST_BY_USER = gql`
  query allPostsByUserPagination($pageSize: Int!, $skipValue: Int!, $username: String!) {
    allPostsByUsername(pageSize: $pageSize, skipValue: $skipValue, username: $username) {
      bookUrl
      comments
      description
      id
      image
      tags
      title
      user
      likes
    }
  }
`

export const ALL_POST_BY_USER_COUNT = gql`
  query allPostUserCount($username: String!) {
    allPostUserCount(username: $username)
  }
`

export const POSTS_COUNT = gql`
  query {
    postCount
  }
`

export const FINDONE_POST = gql`
  query findPostById($id: String!) {
    findPost(id: $id) {
      bookUrl
      comments
      description
      id
      image
      tags
      title
      user
      likes
    }
  }
`
export const SEARCH_POSTS = gql`
  query searchPostByWords($words: String!) {
    searchBooks(words: $words) {
      image
      comments
      description
      id
      likes
      title
      user
    }
  }
`