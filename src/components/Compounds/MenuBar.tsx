import React from 'react'
import CountryComponent from '../Atoms/CountryComponent';
import SearchComponent from '../Atoms/SearchComponent';
type Props = {}

const MenuBar = (props: Props) => {
    return (
        <div className="flex justify-between items-center">
            <SearchComponent placeholder="Name" />
            <CountryComponent />

            <div className="flex items-center space-x-2">

                <label htmlFor="agree" className="">
                    Highest oldest per city
                </label>
                <input
                    type="checkbox"
                    id="agree"
                    className="h-5 w-5 bg-white rounded-sm border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
            </div>

        </div>
    )
}

export default MenuBar