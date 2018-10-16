import React from 'react'
import {Motion, spring} from 'react-motion'


export default class SearchBar extends React.Component {
  constructor (props) {
    super (props)

    this.searchInput = React.createRef()
    this.focusSearchInput = this.focusSearchInput.bind(this)
  }

  handleClick (e) {
    this.props.onSearchBarAction({isSearchVisible:true})
    this.focusSearchInput()
  } 

  focusSearchInput () {
    this.searchInput.current.focus()
  }

  handleBlur (input) {
    const timer = setTimeout( ()=>this.props.onSearchBarAction({isSearchVisible: false}), 300)
    input.target.value = ''
  }

  handleInput (input) { 
    if (input.key === 'Enter'){
      this.props.onSearch()      
    } else {
      this.props.onSearchBarAction({searhText: input.target.value})
    }
  }

  render () {
    
    return (
      <React.Fragment>
        <Motion  style={{ x: spring(this.props.isVisible ? 100 : 0), y: spring(this.props.isVisible ? 100 : 20) }}>
          { ({x,y}) =>
              <div className={`d-flex mt-1`} style={{minWidth: `50px`, width: `${x}%` }}>
                <i className='material-icons my-text-gray200 my-cursor-pointer' onClick={(e)=>this.handleClick(e)}>search</i>
                <div className={``} style={{width: `${x}%`}}>
                    <input 
                      
                      ref={this.searchInput}
                      type='text' 
                      aria-label='Search Email' 
                      placeholder='Search Email' 
                      className='search' 
                      onKeyUp = {(e) => this.handleInput(e)}
                      onBlur={(e) => this.handleBlur(e)}/>
                </div>
              </div>
          }
        </Motion>
      </React.Fragment>
    )
  }
}
