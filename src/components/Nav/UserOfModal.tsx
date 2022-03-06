import React, { useEffect } from 'react'
import { useToggleUser } from 'src/hooks/useToggleUser'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useLazyQuery } from '@apollo/client'
import { FIND_USER } from 'src/users/graphql-queries'
import { LoadingIcon } from 'src/assets/icons/LoadingIcon'
import * as icons from 'src/assets/icons'
import { useTranslate } from 'src/hooks/useTranslate'

const UserOfModal = () => {
  const { data: session, status } = useSession()
  const { handleToggleModal } = useToggleUser()
  const [getUserByEmail, { data, loading }] = useLazyQuery(FIND_USER)
  const translate = useTranslate()

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (status === 'authenticated') {
        getUserByEmail({ variables: { email: session?.user?.email } })
      }
    }
    return () => {
      cleanup = false
    }
  }, [status === 'authenticated'])

  const handleModalOut = () => {
    handleToggleModal()
  }
  return loading ? (
    <LoadingIcon />
  ) : (
    <Link href={`/${data?.findUser?.me.username}`}>
      <a
        onClick={handleModalOut}
        className='w-full dark:hover:bg-secondaryLigth hover:bg-sky-200/70 transition-all rounded-md py-1 px-4 flex items-center justify-center'
      >
        <img
          src={
            session?.user?.image ? session?.user?.image : '/default-user.webp'
          }
          className='w-8 rounded-full md:w-12 mr-4'
          alt={data?.findUser?.me.name}
        />
        <div className='flex flex-col'>
          <h2 className='flex items-center whitespace-nowrap'>
            {data?.findUser?.me.name}
            {data?.findUser?.verified && (
              <span title='Verified account' className='scale-90'>
                {icons.checkVeriFied}
              </span>
            )}
          </h2>
          <span translate='no' className='text-sm text-gray-400'>
            @{data?.findUser?.me.username}
          </span>
          <span className='text-sm text-textGray'>
            {translate.nav.showProfile}
          </span>
        </div>
      </a>
    </Link>
  )
}

export default UserOfModal
