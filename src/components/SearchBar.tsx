"use client"

import React, { useState } from 'react'
import SearchManufacturer from './SearchManufacturer'

function SearchBar() {
    const hanleSearch = () =>{

    }

    const [manufacturer,setManufacturer] = useState("")

  return (
    <form className='searchbar' onSubmit={hanleSearch}>
        <div className='searchbar__item bg-slate-100 px-2 rounded-full'>
            <SearchManufacturer
            manufacturer = {manufacturer}
            setManufacturer = {setManufacturer}
            />
        </div>
    </form>
  )
}

export default SearchBar