import React from 'react'
import {$} from '../containers/Context'
class AjaxTester extends React.Component {
  constructor(props){
    super(props)
    this.makeAJAX = this.makeAJAX.bind(this)
    this.handleFile = this.handleFile.bind(this)
    this.state = {status:false, text:'Initial Text', img:new Blob(), imgSrc:''}
    this.fileInput = React.createRef()
  }

  makeAJAX(url){
  	if(this.state.status){
  		this.setState({status:false})
  	}else {
	    fetch(url)
	      .then((res)=>res.blob())
	      .then(myBlob => this.setState({status:true, imgSrc:URL.createObjectURL(myBlob), img:myBlob}))
      }
  }

  handleFile(files){
  	var src = URL.createObjectURL(files[0])
  	this.setState({status:true, imgSrc:src, img:files[0]})
  }

  render() {
    return (
    	<div>
    		<span onClick={(e)=>this.makeAJAX('https://pp.userapi.com/c837435/v837435014/b53/kBHVuapaMBo.jpg',e)} className='my-cursor-pointer badge badge-info'>Click me to load page </span>
    		<img src={this.state.imgSrc} style={{display:this.state.status ? 'block' : 'none'}}/>
    		<br/>
    		<input type='file' onChange={(e)=>this.handleFile(e.target.files)}/>
    	</div>
    	)
  } 
}

export default AjaxTester