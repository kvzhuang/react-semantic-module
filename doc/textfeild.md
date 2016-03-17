#TextFeild
###Dependency

(optional)
 - util/validator
 - npm module: validator


###Example
```jsx
<TextField
	name="username" 
	value={this.state.data.username}
	onChange={this.onChange.bind(this)}
	onBlur={this.onBlur.bind(this)}
	placeHolder="請輸入"
	styleName="input1"
	validator={val}
	maxWords={10}/>
<TextField
	name="editor" 
	value={this.state.data.editor}
	onChange={this.onChange.bind(this)}
	onBlur={this.onBlur.bind(this)}
	placeHolder="請輸入"
	styleName="textarea"
	validator={val}
	allowMultiLine={true}
	maxWords={50}/>
```
###Properties
|Name|Type|default|Required|Description|
|-------|--------|------|---|
|name|string||true|當onblur跟onchange事件發生的時候會回傳這個key值|
|value|string||true|父層傳遞資料的接口|
|placeHolder|string||false|輸入框placeholder|
|styleName|string||false|傳入css module的class name來設定樣式|
|validator|class||false|使用validator驗證（使用方法看下面）|
|allowMultiLine|bool|false|false|若為true則超過寬度會自動換行|
|maxWords|bool||false|設定最大字數，若有設定則會出現目前字數顯示|

###Events

```javascript

onChange(key,e) {		
}

```
```javascript
onBlur(key,e){
	this.state.data[key] = e.target.value;
	this.setState({
		data: this.state.data
	})
}
```

###Validator

```javascript
var config = {
			'data': {
				'username' : [ 'notEmpty', {maxLength: 5}, 'isName'],
				'email':['notEmpty','isEmail'],
				'url':['notEmpty','isURL'],
				'editor':['notEmpty']
			},
			'customValidator' : {
				iwantvalidatesth: function(value){
				}
			}
		}
let val = new Validators(config);	
```