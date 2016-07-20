import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import editorStyles from 'draft-js-mention-plugin/lib/plugin.css';

import {
	EditorState,
	Entity,
	RichUtils,
	ContentState,
	CompositeDecorator,
	convertToRaw,
	convertFromRaw,
	convertFromHTML,
	AtomicBlockUtils,
	getDefaultKeyBinding,
	KeyBindingUtil,
	SelectionState,
	Modifier
} from 'draft-js';
import {
	getSelectionRange,
	getSelectedBlockElement,
	getSelectionCoords
} from '../../utils/selection.js';


import SideToolbar from './SideToolbar';
import InlineToolbar from './InlineToolbar';
import CustomComponent from './customComponent/component.js';
import { getSignature,uploadToS3,getFileUrl,getURLData } from '../../utils/fileUpload.js';
/*
const {hasCommandModifier} = KeyBindingUtil;

function myKeyBindingFn(e: SyntheticKeyboardEvent): string {
	console.log(e);
	if (e.keyCode === 86 && hasCommandModifier(e)) {
		return 'editor-paste';
	}
	return getDefaultKeyBinding(e);
}
*/

const mentionPlugin = createMentionPlugin({
  theme: style,
});
const { MentionSuggestions } = mentionPlugin;
const plugins = [mentionPlugin];

function findLinkEntities(contentBlock, callback) {
	contentBlock.findEntityRanges(
		(character) => {
			const entityKey = character.getEntity();
			return (
				entityKey !== null &&
				Entity.get(entityKey).getType() === 'LINK'
			);
		},
		callback
	);
}

const Link = (props) => {
	const {url} = Entity.get(props.entityKey).getData();
	const styleLink = {
		color: '#3b5998',
		textDecoration: 'underline',
	}
	return (
		<a href={url} style={styleLink}>
			{props.children}
		</a>
	);
};

const decorator = new CompositeDecorator([
			{
				strategy: findLinkEntities,
				component: Link,
			},
		]);

class RichEditor extends Component {
	constructor(props) { 
		super(props);
		/* LINK declartion*/ 
		
		
		let editorState = null;
		if (props.editorState) {
			editorState = props.editorState
		} else if (props.content) {
			const blocks = convertFromRaw(props.content);
			this.propsContent = props.content;
			editorState = EditorState.createWithContent(
				blocks,
				decorator
			)
		} else {
			editorState = EditorState.createEmpty(decorator)
		}
		
		this.state = {
			editorState,
			inlineToolbar: { show: false },
			suggestions: this.props.mentions
		};

		this.onChange = (editorState) => {
			this.setState({ editorState });
			if( props.onChange ) props.onChange(editorState.getCurrentContent());
			setTimeout(this.updateSelection, 0);
		}

		this.focus = () => this.refs.editor.focus();
		this.updateSelection = () => this._updateSelection();
		this.handleKeyCommand = (command) => this._handleKeyCommand(command);
		this.handleFileInput = (e) => this._handleFileInput(e);
		this.handleUploadImage = () => this._handleUploadImage();
		this.toggleBlockType = (type) => this._toggleBlockType(type);
		this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
		this.toggleLink = () => this._toggleLink();
		this.onLinkKeyDown = (e) => this._onLinkKeyDown(e);
		this.insertBlockComponent = (type, data) => this._insertBlockComponent(type,data);
		this.insertImage = (file) => this._insertImage(file);
		this.blockRenderer = (block) => this._blockRenderer(block);
		this.blockStyler = (block) => {
			if (block.getType() === 'unstyled') {
				return 'paragraph';
			}
			return null;
		}
		this.cleanInput = () => { this.refs.fileInput.value = null; }
		this.handlePaste = (text) => this._handlePaste(text);
		this.onSearchChange = ({value}) => this._onSearchChange({value});
	}
	
	
	_blockRenderer(block) {
		let type = block.getType();
		let that = this;
		if(type === 'atomic') {
			return {
				component: CustomComponent,
				editable: false,
				props:{
					onRequestRemove: function(blockKey){
						 that._removeBlock(blockKey);
					}
				}
			}
		}else if(type === 'HYPERLINK') {
			return {
				component: CustomComponent,
				editable: false
			}
		}
	}
	
	_updateSelection() {
		const selectionRange = getSelectionRange();
		let popoverControlVisible = false,
			popoverControlTop = null,
			popoverControlLeft = null,
			selectedBlock;
		
		if (selectionRange) {
			let rangeBounds = selectionRange.getBoundingClientRect();
			selectedBlock = getSelectedBlockElement(selectionRange);
			if (selectedBlock && !selectionRange.collapsed) {
				popoverControlVisible = true;
				popoverControlTop = getSelectionCoords(selectionRange).offsetTop;
				popoverControlLeft = getSelectionCoords(selectionRange).offsetLeft;
				this.tempTop = popoverControlTop;
				this.tempLeft = popoverControlLeft;
			}else if( selectionRange.startContainer.id === 'toolbar-icon') {
				popoverControlVisible = true;
				popoverControlTop = this.tempTop;
				popoverControlLeft = this.tempLeft;
			}
		}
		
		this.setState({
			selectedBlock,
			inlineToolbar: {
				show: popoverControlVisible,
				position: {
					top: popoverControlTop,
					left: popoverControlLeft
				}
			}
		})
	}

	_handleKeyCommand(command) {
		const { editorState } = this.state;
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			this.onChange(newState);
			return true;
		}
		return false;
	}

	_toggleBlockType(blockType) {
		this.onChange(
			RichUtils.toggleBlockType(
				this.state.editorState,
				blockType
			)
		);
	}

	_toggleInlineStyle(inlineStyle) {
		this.onChange(
			RichUtils.toggleInlineStyle(
				this.state.editorState,
				inlineStyle
			)
		);
	}
	
	/*_toggleLink() {
		const { editorState } = this.state;
		this.setState({
			linkInput: {
				show: true
			},
			InlineToolbar: {
				show: false
			}
		})
	}*/
	_onLinkKeyDown(value) {
		
		const entityKey = Entity.create('LINK', 'MUTABLE', {url: value});
		
		this.setState({
			editorState: RichUtils.toggleLink(
              this.state.editorState,
              this.state.editorState.getSelection(),
              entityKey
            ),
			inlineToolbar: { show: false }
		});
	}
	_insertBlockComponent(type, props) {
		const entityKey = Entity.create(type, 'IMMUTABLE', props);
		this.onChange(AtomicBlockUtils.insertAtomicBlock(
            this.state.editorState,
            entityKey,
			' '
          ));
	};

	_insertAsyncBlockComponent(type, file, props){
		
		if( this.props.onUploadStatusChange ) this.props.onUploadStatusChange({ uploading: true });
		const currentSelection = this.state.editorState.getSelection();
		const entityKey = Entity.create(
			type,
			'IMMUTABLE',
			props
		);
		this.onChange(AtomicBlockUtils.insertAtomicBlock(
			this.state.editorState,
			entityKey,
			' '
		));
		let that = this;
		getSignature(file).done(function(jsonDataForUpload){
			uploadToS3(jsonDataForUpload, file).done(function(){
				getFileUrl(jsonDataForUpload.fileId).done(function(res){

					props.loading = false;
					props.src = res[0].url[0];
					props.fileId = jsonDataForUpload.fileId;
					
					let selection = currentSelection.set('hasFocus', false);
					console.log(selection);
					Entity.replaceData(entityKey, props);
					that.onChange(EditorState.forceSelection(that.state.editorState,selection));
					if( that.props.onUploadStatusChange ) that.props.onUploadStatusChange({ uploading: false });
				})
			})
		})
	}

	_removeBlock(blockKey) {
		const editorState = this.state.editorState;
		const content = editorState.getCurrentContent();

		let block = content.getBlockForKey(blockKey);
		let blockAfter = content.getKeyAfter(blockKey);

		let targetRange = new SelectionState({
			anchorKey: blockKey,
			anchorOffset: 0,
			focusKey: blockAfter,
			focusOffset: block.getLength(),
		});

		let withoutBlock = Modifier.removeRange(content, targetRange, 'backward');
		let resetBlock = Modifier.setBlockType(
			withoutBlock,
			withoutBlock.getSelectionAfter(),
			'unstyled'
		);

		let newState = EditorState.push(editorState, resetBlock, 'remove-range');

		this.onChange(newState);
	}
	_handleFileInput(e) {
		let files = Array.prototype.slice.call(e.target.files, 0);
		
		files.forEach(f => {
			let props = {
				loading: true,
				fakeSrc: URL.createObjectURL(f)
			}
			if( f.type.indexOf('image') > -1 ){
				this._insertAsyncBlockComponent("IMAGE", f, props);
			}
			else if ( f.type.indexOf('video') > -1 ){
				this._insertAsyncBlockComponent("VIDEO", f, props);
			}
			else if ( f.type.indexOf('document') > -1 ){
				this._insertAsyncBlockComponent("DOCUMENT", f, props);
			}
			else if ( f.type.indexOf('audio') > -1 ){
				props.name = f.name;
				this._insertAsyncBlockComponent("AUDIO", f, props);	
			}
		});
	}

	_handleUploadImage() {
		this.refs.fileInput.click();
	}

	_handlePaste(text){
		const youtubeReg = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
		const URLReg = /^(http|https):\/\//i;

		let that = this;

		let youtubeTest = text.match(youtubeReg);
		let URLTest = text.match(URLReg);

		if( youtubeTest ){			
			setTimeout(function(){
			that._insertBlockComponent("YOUTUBE", {src: youtubeTest[0], file: youtubeTest[1], text: text})
			}, 500);
			return true;
		}
		else if( URLTest ) {
			
			getURLData(text).done(function(res){
				getFileUrl(res[0]).done(function(res){
					console.log(res);
				})
			})
			setTimeout(function(){
				that._insertBlockComponent("HYPERLINK", {src: text});
			}, 500);
			return true;
		}
	}

	_onSearchChange({value}) {
		//this.props.onRequestSearch(value);
		this.setState({
			suggestions: defaultSuggestionsFilter(value, this.props.mentions),
		});
	}

	componentWillReceiveProps(nextProps) {
		if( nextProps.content !== this.propsContent ) {
			const blocks = convertFromRaw(nextProps.content);
			const editorState = EditorState.createWithContent(
				blocks,
				decorator
			)
			this.setState({ editorState });
			this.propsContent = nextProps.content;
		}
	}
	
	
	render() {
		const { editorState, selectedBlock, selectionRange } = this.state;
		let sideToolbarOffsetTop = 0;

		if (selectedBlock) {
			//console.log(selectedBlock);
			const editor = document.getElementById('richEditor');
			const editorBounds = editor.getBoundingClientRect();
			const blockBounds = selectedBlock.getBoundingClientRect();

			sideToolbarOffsetTop = (blockBounds.bottom - editorBounds.top)
				- 31; // height of side toolbar
		}
		
		let contentState = editorState.getCurrentContent();
		/*let html = stateToHTML(contentState);
		
		console.log(html);*/
		return (
			<div styleName="editor" className={ editorStyles.editor } id="richEditor" >
				{selectedBlock
					? <SideToolbar
						editorState={editorState}
						style={{ top: sideToolbarOffsetTop }}
						onToggle={this.toggleBlockType}
						onUploadImage={this.handleUploadImage}
						/>
					: null
				}
				{this.state.inlineToolbar.show
					? <InlineToolbar
						editorState={editorState}
						onToggle={this.toggleInlineStyle}
						onLink={this.onLinkKeyDown}
						position={this.state.inlineToolbar.position}
						/>
					: null
				}
					<Editor
						blockRendererFn={this.blockRenderer}
						blockStyleFn={this.blockStyler}
						editorState={editorState}
						handleKeyCommand={this.handleKeyCommand}
						onChange={this.onChange}
						placeholder="Write something..."
						spellCheck={true}
						readOnly={this.props.readOnly}
						ref="editor"
						onClick={this.focus}
						handlePastedText={this.handlePaste}
						plugins={plugins}
						/>
					<MentionSuggestions
						onSearchChange={ this.onSearchChange }
						suggestions={ this.state.suggestions }
						/>
					<input type="file" ref="fileInput" style={{ display: 'none' }}
						 onChange={this.handleFileInput}/>
						 
			</div>
		);
	}
}
export default CSSModules(RichEditor, style, { allowMultiple: true }); 