import React from 'react'

type Props = {
    chatlists: string[];
}

function ChatList({chatlists}: Props) {

  console.log(chatlists)

  return (
    <div className="flex flex-col gap-2">
      <h2 className='font-bold uppercase text-xs'>Chat List:</h2>
      <ul>
        {chatlists?.map((chatlist, index) => (
          <li key={index}>{`* ${chatlist}`}</li>
        ))}
      </ul>
    </div>
  )
}

export default ChatList