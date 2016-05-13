### Example
``` xml
<DropdownMenu
	onSelected={this.onSelected.bind(this)}
	styleName="listStyle">
	<Target><button>OPEN</button></Target>
	<MenuItem value="關於" index={1}>關於</MenuItem>
	<MenuItem value="編輯" index={2}>編輯</MenuItem>
	<MenuItem value="其他" index={3}>其他</MenuItem>
</DropdownMenu>
```
### Properties

#### DropdownMenu
|Name|Type|default|Required|Description|
|-------|--------|------|------|---|
|onSelected|func|||取得所選擇的item的相關數值（等同item的props）|
|styleName|string|||控制dropdown選單的style|
|arrowStyle|object|||控制三角形的位置|

#### MenuItem

帶進去的props都可以在選擇的時候被回傳

### Events

``` js

onSelected(props) {
	//item的props		
}
```