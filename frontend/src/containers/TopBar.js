import React from 'react'
import Logo from '../presentationals/Logo'
import CurrentFolder from '../presentationals/CurrentFolder'
import SearchBar from '../presentationals/SearchBar'
import EmptyTrashButton from '../presentationals/EmptyTrashButton'

export default function TopBar(props) {
	function handleSearch () {
		props.onSearch()
		props.onSearchBarAction({isSearchVisible:true})
	}
	const searchButton = props.isSearchVisible
    ? <span  
        className='btn my-btn-primay-bordered search-btn' 
        onClick={(e) => handleSearch()}
        alt='search'>
        search
      </span>
    : null

  return (
    <div className={`py-2 topbar d-flex align-items-end`}>
      {/*<Logo />*/}
      <CurrentFolder 
      	screnType={props.screnType}
      	folder={props.folder} 
      	isVisible={!props.isSearchVisible} 
      	className='' />
      <SearchBar  
      	onSearchBarAction = {props.onSearchBarAction}
      	onSearch = {props.onSearch}
      	screnType={props.screnType} 
      	isVisible={props.isSearchVisible}/>
      {searchButton}
      <EmptyTrashButton folder={props.folder} onEmptyTrash={()=> props.onEmptyTrash()} />
    </div>
  )

}
