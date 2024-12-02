import React from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
type Props = {}

const MenuBar = (props: Props) => {
    return (
        <div className="flex justify-between items-center">
            <Input className='w-1/4 cursor-text' type="search" placeholder="Name" />
            <Button variant="default">Highlight Oldest</Button>
            <Button variant="outline">Clear Selection</Button>
        </div>
    )
}

export default MenuBar