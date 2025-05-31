import React from 'react'

type Props = {isConnected: boolean}

function ConnectionState({ isConnected }: Props) {
  console.log({isConnected})
  return (
    <div>ConnectionState: {isConnected}</div>
  )
}

export default ConnectionState