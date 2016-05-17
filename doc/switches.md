
### Example
``` xml
<RadioGroup
	group={group}
	name="radio"
	checkedIndex={[2]}
	onSelected={this.radioSelect.bind(this)}
	custom={true}
	styleName="radioGroup"
	customValue={this.state.customValue}>
</RadioGroup>
```
``` js
let group = [
	{label:'項目1',value: '111'},
	{label:'項目2',value: '222'},
	{label:'項目3',value: '333'},
	{label:'項目4',value: '444'},
	{label:'項目5',value: '555'},
];
```
### Properties

#### Basic
|Name|Type|default|Required|Description|
|-------|--------|------|------|---|
|group|json||true|顯示選項|
|name|string||true|給予group個別的名字|
|checkedIndex|array|||預設選擇項目|
|custom|bool|||決定是否有使用者自訂選項|
|customValue|string|||連接使用者自訂的值，可以在這邊傳入預設值|

#### Checkbox

|Name|Type|default|Required|Description|
|-------|--------|------|------|---|
|checkbox|bool|||若為true則顯示成checkbox|
|maxChoose|number|||最大選擇數目|
### Events

``` js

onSelected(object) {
	//傳進去的object		
}
```