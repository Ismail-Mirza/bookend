import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useToggleUser } from 'src/hooks/useToggleUser'
import { ALL_USERS } from 'src/users/graphql-queries'
import FollowItem from './FollowItem'
import * as icons from 'src/assets/icons/index'
import { signIn } from 'next-auth/react'
interface IUser {
  email: string;
  name: string;
  photo: string;
  username: string;
  user: string;
  verified: boolean;
}

const WhoToFollow = () => {
  const { data, loading } = useQuery(ALL_USERS)
  const [allUser, setAllUsers] = useState<IUser[]>([] as IUser[])
  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (data?.allUsers) {
        setAllUsers(data?.allUsers)
      }
    }
    return () => {
      cleanup = false
    }
  }, [data?.allUsers])


  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <ul className='flex w-full flex-col overflow-x-auto relative overflow-hidden'>
          {allUser.length !== 0 &&
            allUser.map((user: IUser) => (
              <FollowItem
                key={user.user}
                name={user.name}
                email={user.email}
                photo={user.photo}
                user={user.user}
                username={user.username}
                verified={user.verified}
              />
            ))}
        </ul>
      )}
    </>
  )
}

export default WhoToFollow
