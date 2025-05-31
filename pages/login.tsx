import React from 'react'

type Props = {}

function login({}: Props) {
  return (
    <div>
      <form>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <br />
        <input type="submit" value="Login" />
      </form>

    </div>
  )
}

export default login