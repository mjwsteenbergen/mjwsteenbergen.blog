import React from 'react'
import Link from 'next/link'

import { Result } from '../utils/laurentia'

type Props = {
  data: Result
}

const ListItem = ({ data }: Props) => (
  <Link href="/[id]" as={`/${data.slug}`}>
    <a>
      {data.name}: {data.name}
    </a>
  </Link>
)

export default ListItem
