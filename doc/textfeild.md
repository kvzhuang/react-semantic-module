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
<TextField
	name="job" 
	value={this.state.data.job}
	onChange={this.onChange.bind(this)}
	onBlur={this.onBlur.bind(this)}
	placeHolder="AC測試"
	styleName="input1"
	maxWords={10}
	ACData={this.state.ACData}>
</TextField>
```
###Properties
|Name|Type|default|Required|Description|
|-------|--------|------|------|---|
|name|string||true|當onblur跟onchange事件發生的時候會回傳這個key值|
|value|string||true|父層傳遞資料的接口|
|placeHolder|string||false|輸入框placeholder|
|styleName|string||false|傳入css module的class name來設定樣式|
|validator|class||false|使用validator驗證（使用方法看下面）|
|allowMultiLine|bool|false|false|若為true則超過寬度會自動換行|
|maxWords|bool||false|設定最大字數，若有設定則會出現目前字數顯示|
|ACData|array||false|auto complete|
|disabled|bool||false|true則disabled|

###Styling

ex: styleName="input"
```css
/* 這邊定義的是input的寬高位址*/
.input {
	width:200px;
	margin:20px;
}
/*input 主體style*/
.input input, .input textarea {
	background: #fff;
	border: 1px solid #333;
}
```
###Events

```javascript

onChange(key,e) {
	//如果有需要auto complete請在這邊call api method （or action）
	//ex: this.setState({ ACdata: getACService(e.target.value)})
	//REX建議：減少loading請使用者自行加上setTimeout & promice		
}

```
```javascript
onBlur(key,e){
	//在Blur的時候取得input value
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