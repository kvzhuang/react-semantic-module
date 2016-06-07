import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import {
	Editor,
	EditorState,
	Entity,
	RichUtils,
	ContentState,
	CompositeDecorator,
	convertToRaw,
	convertFromHTML,
	AtomicBlockUtils
} from 'draft-js';
import {
	getSelectionRange,
	getSelectedBlockElement,
	getSelectionCoords
} from '../../utils/selection.js';

import SideToolbar from './SideToolbar';
import InlineToolbar from './InlineToolbar';
import ImageComponent from './ImageComponent.js';


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

class RichEditor extends Component {
	constructor(props) { 
		super(props);
		/* LINK declartion*/ 
		const decorator = new CompositeDecorator([
			{
				strategy: findLinkEntities,
				component: Link,
			},
		]);
		
		let editorState = null;
		if (this.props.editorState) {
			editorState = this.props.editorState
		} else if (this.props.content) {
			const blocks = convertFromRaw(this.props.content);
			editorState = EditorState.createWithContent(
				ContentState.createFromBlockArray(blocks),
				decorator
			)
		} else {
			editorState = EditorState.createEmpty(decorator)
		}
		
		this.state = {
			editorState,
			inlineToolbar: { show: false },
		};

		this.onChange = (editorState) => {
			/*const selectionRange = getSelectionRange();
			if (!editorState.getSelection().isCollapsed()) {
				const selectionCoords = getSelectionCoords(selectionRange);
					this.setState({
						inlineToolbar: {
							show: true,
							position: {
								top: selectionCoords.offsetTop,
								left: selectionCoords.offsetLeft
							}
						}
					});
			}*/
			this.setState({ editorState });
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
	}
	
	/*
	componentDidMount() {
		const test = "<p>1231231231</p><p><img src='http://img.ltn.com.tw/Upload/ent/page/800/2015/12/12/php10lj6O.jpg'/></p><p><br></p>"
		const contentState = stateFromHTML(test);
		console.log(convertToRaw(contentState));
		const state = EditorState.createWithContent(contentState);
		console.log(state);
		this.onChange(state);
	}*/
	
	
	_blockRenderer(block) {
		let type = block.getType();
		if(type === 'atomic') {
			return {
				component: ImageComponent,
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
			console.log(selectionRange.startContainer.id);
			let rangeBounds = selectionRange.getBoundingClientRect()
			selectedBlock = getSelectedBlockElement(selectionRange);
			console.log(selectedBlock);
			console.log(!selectionRange.collapsed);
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
	
	_insertBlockComponent(type, data) {
    
		//let { editorState, entityKey } = insertMediaBlock(this.state.editorState, type, data)
		
		const entityKey = Entity.create(type, 'IMMUTABLE', {src: data.src});
		this.onChange(AtomicBlockUtils.insertAtomicBlock(
            this.state.editorState,
            entityKey,
			' '
          ));
		/*this.setState({
			editorState,
		})*/

		return entityKey
	};

	_handleFileInput(e) {
		let files = Array.prototype.slice.call(e.target.files, 0)
		files.forEach(f => 
			this.insertBlockComponent("IMAGE", {src: URL.createObjectURL(f)}))
	}

	_handleUploadImage() {
		this.refs.fileInput.click();
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
		
		console.log(this.state.inlineToolbar.position);
		return (
			<div styleName="editor" id="richEditor" >
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
						/>
					<input type="file" ref="fileInput" style={{ display: 'none' }}
						onChange={this.handleFileInput} />
			</div>
		);
	}
}
export default CSSModules(RichEditor, style, { allowMultiple: true });