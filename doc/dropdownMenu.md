### Example
``` xml
<DropdownMenu
	toggleOpen={this.toggleOpen.bind(this)}>
	<DropdownTarget>
		/*使用者自定內容*/
		<i className={"fa "+this.state.ui.public.targetIcon} aria-hidden="true" style={this.state.ui.public.targetStyle}></i>
	</DropdownTarget>
	<DropdownList>
		/*使用者自定內容*/
		<ul styleName="list" >
			<li onClick={this.onSelected.bind(this,1,'公開','public','fa-globe')}>
				<i className="fa fa-globe" aria-hidden="true" ></i>
				公開
			</li>
			<li  onClick={this.onSelected.bind(this,2,'只限本人','public','fa-lock')}>
				<i className="fa fa-lock" aria-hidden="true"></i>
				只限本人
			</li>
		</ul>
	</DropdownList>
</DropdownMenu>
```
### Description

DropdownMenu的設計模式是藉由  DropdownTarge  跟  DropdownList  這兩個載體來實現自動化drop menu的模式
本身內建對碰觸邊框的偵測，使用者只需要專心處理 List 內 Item 的事件即可

### Events

``` js

toggleOpen() {
	//當list切換open狀態的時候會觸發事件	
}
```