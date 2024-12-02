import React from 'react'
import { Input } from "@/components/ui/input"

type Props = {
    placeholder: string;
}

const SearchComponent = (props: Props) => {
    return (
        <Input className='w-1/4 cursor-text' type="search" placeholder={props.placeholder} />
    )
}

export default SearchComponent