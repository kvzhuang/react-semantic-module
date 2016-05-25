import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';


import {
	Editor,
	EditorState,
	Entity,
	RichUtils,
	ContentState,
	CompositeDecorator
} from 'draft-js';
import {
	getSelectionRange,
	getSelectedBlockElement,
	getSelectionCoords
} from '../../utils/selection.js';

import { insertImage } from './insertImage';
import SideToolbar from './SideToolbar';
import InlineToolbar from './InlineToolbar';
import ImageComponent from './ImageComponent';
import LinkInput from './urlInput';

class RichEditor extends Component {
	constructor(props) { 
		super(props);

		this.state = {
			editorState: EditorState.createEmpty(),
			inlineToolbar: { show: false },
			linkInput : { show: false }
		};

		this.onChange = (editorState) => {
			if (!editorState.getSelection().isCollapsed()) {
				const selectionRange = getSelectionRange();
				const selectionCoords = getSelectionCoords(selectionRange);
				this.setState({
					inlineToolbar: {
						show: true,
						position: {
							top: selectionCoords.offsetTop,
							left: selectionCoords.offsetLeft
						}
					},
					linkInput: {
						show: false
					}
				});
			} else {
				this.setState({ inlineToolbar: { show: false } });
			}

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
		this.insertImage = (file) => this._insertImage(file);
		this.blockRenderer = (block) => {
			if (block.getType() === 'media') {
				return {
					component: ImageComponent
				};
			}
			return null;
		}
		this.blockStyler = (block) => {
			if (block.getType() === 'unstyled') {
				return 'paragraph';
			}
			return null;
		}
	}

	_updateSelection() {
		const selectionRange = getSelectionRange();
		let selectedBlock;
		if (selectionRange) {
			selectedBlock = getSelectedBlockElement(selectionRange);
		}
		this.setState({
			selectedBlock,
			selectionRange
		});
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
	
	_toggleLink() {
		this.setState({
			linkInput: {
				show: true
			},
			InlineToolbar: {
				show: false
			}
		})
		/*this.onChange(
			RichUtils.toggleLink(
				editorState,
				editorState.getSelection(),
				entityKey
			)
		);*/
	}
	_onLinkKeyDown(e) {
		console.log(this.state.editorState.getSelection().getStartOffset());
		const entityKey = Entity.create('LINK', 'MUTABLE', {url: e.target.value});
		this.setState({
            editorState: RichUtils.toggleLink(
              this.state.editorState,
              this.state.editorState.getSelection(),
              entityKey
            ),
			linkInput: { show: false}
		})
	}
	_insertImage(file) {
		this.setState({
			editorState: insertImage(this.state.editorState, file)
		});
	}

	_handleFileInput(e) {
		const fileList = e.target.files;
		const file = fileList[0];
		this.insertImage(file);
	}

	_handleUploadImage() {
		this.refs.fileInput.click();
	}

	render() {
		const { editorState, selectedBlock, selectionRange } = this.state;
		let sideToolbarOffsetTop = 0;

		if (selectedBlock) {
			const editor = document.getElementById('richEditor');
			const editorBounds = editor.getBoundingClientRect();
			const blockBounds = selectedBlock.getBoundingClientRect();

			sideToolbarOffsetTop = (blockBounds.bottom - editorBounds.top)
				- 31; // height of side toolbar
		}

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
						onLink={this.toggleLink}
						position={this.state.inlineToolbar.position}
						/>
					: null
				}
				{ this.state.linkInput.show && 
						<LinkInput onKeyDown={this.onLinkKeyDown}/>
				}
					<Editor
						blockRendererFn={this.blockRenderer}
						blockStyleFn={this.blockStyler}
						editorState={editorState}
						handleKeyCommand={this.handleKeyCommand}
						onChange={this.onChange}
						placeholder="Write something..."
						spellCheck={true}
						readOnly={this.state.editingImage}
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