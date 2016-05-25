import React from 'react';
import ToolbarIcon from './ToolbarIcon';
import CSSModules from 'react-css-modules';
import style from './style.css';

const INLINE_STYLES = [
	{ icon: 'fa fa-bold', style: 'BOLD' },
	{ icon: 'fa fa-italic', style: 'ITALIC' },
	{ icon: 'fa fa-link', style: 'LINK' }
];

export default CSSModules(({ editorState, onToggle, onLink, position }) => {
	const currentStyle = editorState.getCurrentInlineStyle();
	return (
		<div
			styleName="toolbar"
			id="inlineToolbar"
			style={position}
			>
			<ul styleName="toolbar-icons">
				{INLINE_STYLES.map(type =>
					<ToolbarIcon
						key={type.label || type.icon}
						active={currentStyle.has(type.style) }
						label={type.label}
						icon={type.icon}
						onToggle={onToggle}
						onLink={onLink}
						style={type.style}
						/>
				) }
			</ul>
		</div>
	)
}, style, { allowMultiple: true });