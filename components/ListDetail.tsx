import * as React from 'react'

import { Result } from '../utils/laurentia'

type ListDetailProps = {
  item: Result
}

const ListDetail = ({ item: user }: ListDetailProps) => (
  <div>
    <h1>Detail for {user.name}</h1>
    <p>ID: {user.name}</p>
  </div>
)

export default ListDetail
