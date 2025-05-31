import { useRouter } from 'next/router'
import React from 'react'

type Props = {}

//! NOT IN USE TRY KO LANG KUNG HOW TO USE [...ID]

function NewId({}: Props) {
  const router = useRouter()

  const arrurl = router.query.newid

  const upper = Array.isArray(arrurl) &&  arrurl?.map((item: string) => item.toUpperCase())

console.log(upper)


  return (
    <div>{upper}

    </div>
  )
}

export default NewId