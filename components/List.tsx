import * as React from 'react'
import ListItem from './ListItem'
import { Result } from '../utils/laurentia'

type Props = {
  items: Result[]
}

const List = ({ items }: Props) => (
  <ul>
    {items.map((item) => (
      <li key={item.slug}>
        <ListItem data={item} />
      </li>
    ))}
  </ul>
)

export default List
