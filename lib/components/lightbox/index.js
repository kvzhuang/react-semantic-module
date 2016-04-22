'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

var _overlay = require('../../utils/overlay');

var _overlay2 = _interopRequireDefault(_overlay);

var _windowScroll = require('../../utils/windowScroll');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Lightbox = function (_Component) {
    _inherits(Lightbox, _Component);

    function Lightbox() {
        _classCallCheck(this, Lightbox);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Lightbox).apply(this, arguments));
    }

    _createClass(Lightbox, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            (0, _windowScroll.disableDocScroll)();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            (0, _windowScroll.enableDocScroll)();
        }
    }, {
        key: 'render',
        value: function render() {

            var boxWidth = '380px',
                contentPadding = '30px',
                contentHeight = 'auto';
            if (this.props.option.title) {
                boxWidth = '800px';
                contentPadding = '30px 50px';
            }
            if (this.props.option.contentHeight) {
                contentHeight = this.props.option.contentHeight;
            }
            return _react2.default.createElement(
                'div',
                { styleName: 'container' },
                _react2.default.createElement(_overlay2.default, {
                    onRequestClose: this.props.onClose,
                    styleName: 'overlay' }),
                _react2.default.createElement(
                    'div',
                    { styleName: 'lightbox', style: { width: boxWidth } },
                    this.props.option.title && _react2.default.createElement(
                        'div',
                        { styleName: 'title' },
                        this.props.option.title
                    ),
                    _react2.default.createElement(
                        'div',
                        { styleName: 'content', style: { padding: contentPadding, maxHeight: contentHeight } },
                        this.props.children,
                        this.props.option.submit && _react2.default.createElement(
                            'button',
                            { onClick: this.props.option.submit.action, styleName: 'submit' },
                            this.props.option.submit.text
                        ),
                        this.props.option.cancel && _react2.default.createElement(
                            'button',
                            { onClick: this.props.onClose },
                            this.props.option.cancel.text
                        )
                    )
                )
            );
        }
    }]);

    return Lightbox;
}(_react.Component);

exports.default = (0, _reactCssModules2.default)(Lightbox, _style2.default, { allowMultiple: true });