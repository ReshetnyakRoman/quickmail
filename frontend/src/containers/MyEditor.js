import React, { Component } from 'react'
import Editor, { composeDecorators } from 'draft-js-plugins-editor'
import { EditorState, ContentState, convertFromHTML, convertFromRaw } from 'draft-js'
import createHashtagPlugin from 'draft-js-hashtag-plugin'
import createLinkifyPlugin from 'draft-js-linkify-plugin'
import createImagePlugin from 'draft-js-image-plugin'
import createEmojiPlugin from 'draft-js-emoji-plugin'
import createToolbarPlugin, { Separator }  from 'draft-js-static-toolbar-plugin'
import createUndoPlugin from 'draft-js-undo-plugin'
import createSideToolbarPlugin  from 'draft-js-side-toolbar-plugin'
import BlockTypeSelect from 'draft-js-side-toolbar-plugin/lib/components/BlockTypeSelect'
import createLinkPlugin from 'draft-js-anchor-plugin'
import createAlignmentPlugin from 'draft-js-alignment-plugin'
import createFocusPlugin from 'draft-js-focus-plugin'
import createResizeablePlugin from 'draft-js-resizeable-plugin'
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin'
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor'
import {stateToHTML} from 'draft-js-export-html'
import {throttle,debounce} from 'throttle-debounce'

import 'draft-js-side-toolbar-plugin/lib/plugin.css'
import 'draft-js-image-plugin/lib/plugin.css'
import 'draft-js-static-toolbar-plugin/lib/plugin.css'
import 'draft-js-emoji-plugin/lib/plugin.css'
import 'draft-js-undo-plugin/lib/plugin.css'
import 'draft-js-anchor-plugin/lib/plugin.css'
import 'draft-js-focus-plugin/lib/plugin.css'
import 'draft-js-alignment-plugin/lib/plugin.css'

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';



const blockDndPlugin = createBlockDndPlugin()
const focusPlugin = createFocusPlugin()
const alignmentPlugin = createAlignmentPlugin()
const resizeablePlugin = createResizeablePlugin()
const { AlignmentTool } = alignmentPlugin
const linkPlugin = createLinkPlugin({placeholder: 'http://…'})
const linkifyPlugin = createLinkifyPlugin()
const hashtagPlugin = createHashtagPlugin()
const emojiPlugin = createEmojiPlugin({ useNativeArt: true,})
const { EmojiSuggestions, EmojiSelect, emojiSelectPopover } = emojiPlugin
const undoPlugin = createUndoPlugin()
const { UndoButton, RedoButton } = undoPlugin

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
)
const imagePlugin = createImagePlugin({decorator})

const toolbarPlugin = createToolbarPlugin({
  structure: [
    EmojiSelect,
    BoldButton,
    ItalicButton,
    UnderlineButton,
    Separator,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    Separator,
    UnorderedListButton,
    OrderedListButton,
    linkPlugin.LinkButton,
    BlockquoteButton,
    CodeButton,
    CodeBlockButton,
  ]
});
const { Toolbar } = toolbarPlugin;

const plugins = [
  hashtagPlugin,
  imagePlugin,
  emojiPlugin,
  toolbarPlugin,
  undoPlugin,
  linkPlugin,
  alignmentPlugin,
  focusPlugin,
  resizeablePlugin,
  blockDndPlugin
];


export default class MyEditor extends Component {

  createInitialState() {
    let editorState = EditorState.createEmpty()
    
    var title 
    if(this.props.emailInfo != undefined) {
      if (this.props.replyType === 'forward') {
        title = `</br><p><i>----- Forward ----- 
          <br />From: ${this.props.emailInfo.from.email} &nbsp;&nbsp;To: ${this.props.emailInfo.to[0].email} &nbsp;&nbsp;Received: ${this.props.emailInfo.receivingDate.toLocaleString('ru-RU', { year: 'numeric', month: 'short', day: 'numeric' })}</i></br></p>`
      } else if (this.props.replyType === 'reply' || this.props.replyType === 'replyAll') {
        title = `</br><p><i>----- Reply ----- 
        <br />From: ${this.props.emailInfo.from.email} &nbsp;&nbsp;To: ${this.props.emailInfo.to[0].email} &nbsp;&nbsp;Received: ${this.props.emailInfo.receivingDate.toLocaleString('ru-RU', { year: 'numeric', month: 'short', day: 'numeric' })}</i></br></p>`
      } else {
        title = ''
      }
      try {
        //const processedHTML = DraftPasteProcessor.processHTML(title+this.props.emailInfo.body)
        const processedHTML = convertFromHTML(title + this.props.emailInfo.body)
        const contentState = ContentState.createFromBlockArray(processedHTML)

        editorState = EditorState.createWithContent(contentState)
      } catch(err){
        return editorState
      }
      
    }

    return editorState
  }  



  state = {
    editorState: this.createInitialState(),
  }

  onChange = (editorState) => {

    this.setState({
      editorState,
    })
     
    //this.onChangeThrottled( stateToHTML( editorState.getCurrentContent() ) ) 
    this.props.onContentChange(stateToHTML(editorState.getCurrentContent())) 
  }

  focus = () => {
    this.editor.focus()
  }

  componentDidMount() {
    if(this.props.inFocus){
      this.editor.focus()
    }
  }
  
  onChangeThrottled = debounce(5000, this.props.onContentChange)

  render() {
    //let html = stateToHTML(this.state.editorState.getCurrentContent())
    return (
      <div className={` ${this.props.className}`} >
        <div onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
          />
          <div className='editor-toolbar'>
          <Toolbar />
          </div>
          <EmojiSuggestions />
          <AlignmentTool />

        </div>
      </div>
    )
  }
}