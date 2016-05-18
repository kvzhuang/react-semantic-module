
### Example
``` xml
<DropList 
	listContent={listContent}
	onSelected={this.onSelected.bind(this)}
	defaultIndex={1}
	disabled={true}/>
	
let listContent = [
	{ label: '公開', value: '111', iconFont: 'fa-globe'},
	{ label: '朋友', value: '222', iconFont: 'fa-user'},
	{ label: '只限本人', value: '333', iconFont: 'fa-lock'}
]
let listContent2 = [
	{ label: '大學', value: '111'},
	{ label: '高中以下', value: '222'},
	{ label: '高中職', value: '333'},
	{ label: '專科', value: '333'},
	{ label: '碩士', value: '333'},
	{ label: '博士', value: '333'},
]
```
### Properties

#### DropdownMenu
|Name|Type|default|Required|Description|
|-------|--------|------|------|---|
|listContent|json||true|list內的值|
|defaultIndex|index|||預設選擇項目|
|disabled|bool|false||無法被點選|
|width|number|150px|false|客製寬度|

#### MenuItem

帶進去的props都可以在選擇的時候被回傳

### Events

``` js

onSelected(object) {
	//傳進去的object		
}
```