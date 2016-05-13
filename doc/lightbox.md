### Dependency

 - util/overlay

### Example
``` jsx
<LightBox open={this.state.lightbox}
		  option={lightboxObtion}
		  onClose={this.lightboxClose.bind(this)}> 
			  <h3>刪除背景照片</h3>
			  <p>移除照片後，會顯示系統預設的照片</p>
			  //自定義的內容
</LightBox>
```
### Properties
|Name|Type|Required|Description|
|-------|--------|------|---|
|open|bool|true|由父層state控制開關|
|option|object|true|lightbox細節設定|
|onClose|func|true|父層接收要求關閉lightbox的callback|

### Options

``` javascript
{
    submit: {
       text: '確定', //button text
       action: this.submit //buttun action
    },
    cancel: {
       text: 'Cancel', 
       // cancel 預設關閉lightbox
    },
    closeIcon: true,  //有無close ICON,
    contentHeight: '300px', //決定content區塊有無最小高度，有設定的話會出現scroll bar
    title: '野豬騎士來囉'	 //標題
}
```

