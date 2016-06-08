### Data Fetching

同 TextFeild的用法，使用onChange Event來取得即時的rawState

``` xml

onChange( rawState ){
	// rawState 為 EitorState的 contentState 經過轉譯的 json raw data
}

<Editor onChange={this.onChange}
		content={rawState}
		/>

```

### Styling

Editor Element 會延展寬高到100％，因此要控制寬高請在外面多包一層div

``` xml

<div styleName="yourStyle">
	<Editor />
</div>

```

### Properties

|Name|Description|
|----|--------------|
|content|傳入與rawstate相同結構的json object 即可產生有預設內容的Editor|