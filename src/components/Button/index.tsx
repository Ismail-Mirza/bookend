import React from 'react'
import Link from 'next/link'
import BtnComment from './BtnComment'
import * as icons from 'src/assets/icons'
import BtnLike from './BtnLike'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

type Props = {
  comments: number | undefined
  id: string | undefined
  likes: number | undefined
  bookDownload?: string | undefined
}

const index = ({ comments, id, likes, bookDownload }: Props) => {
  const handleClick = async () => {
    const copyLink = `https://bookendd.vercel.app/books/${id}`
    toast.success('copied link!', {
      position: 'top-right',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      // bodyClassName: 'bg-secondary text-white',
    })
    return await navigator.clipboard.writeText(copyLink)
  }

  return (
    <div className='flex w-full justify-between text-slate-400'>
      <BtnComment
        bgColor={'bg-teal-500/10'}
        textColor={'hover:text-teal-500'}
        title={'Copy link'}
        onClick={handleClick}
      >
        {icons.share}
      </BtnComment>
      <BtnComment
        bgColor={'bg-thirdBlue/10'}
        textColor={'hover:text-thirdBlue'}
        comments={comments}
        title={'Comments'}
      >
        {icons.message}
      </BtnComment>
      <BtnLike id={id} likes={likes} />
      <Link href={bookDownload || '/'}>
        <a target='_blank'>
          <BtnComment
            bgColor={'bg-yellow-500/10'}
            textColor={'hover:text-yellow-500'}
            title={'Download PDF'}
          >
            {icons.download}
          </BtnComment>
        </a>
      </Link>
    </div>
  )
}

export default index
