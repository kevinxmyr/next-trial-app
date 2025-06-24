import { toast } from "sonner"
import React from 'react'

type Props = {
   message: string;
}

function SuccessToast({message}: Props) {
  return (
   toast(message)
  )
}

export default SuccessToast