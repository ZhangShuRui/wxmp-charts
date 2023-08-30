# @wxmp/charts

基于 [Antv F2](https://f2-v3.antv.vision/zh/docs/tutorial/getting-started/) 的微信小程序图标组件库

## 使用方法

1. 安装组件

```
npm install --save @wxmp/charts
```

2. 在页面的 json 配置文件中添加 charts 自定义组件的配置,以基础折线图为例子:

```json
{
  "usingComponents": {
    "basic-line-chart": "@wxmp/calendar/charts/line/basic-line-chart"
  }
}
```

3. WXML 文件中引用 calendar

```xml
<basic-line-chart
   width="{{width}}"
   tooltipBackground="{{tooltipBackground}}"
   tooltipMarkerStyle="{{tooltipMarkerStyle}}"
   bind:tooltipchange="tooltipChange"
   bind:tooltipshow="tooltipShow"
   defaultTooltip="{{defaultTooltip}}"
   chartData='{{chartData}}'
   area="{{true}}"
   areaConfig="{{areaConfig}}"
   lineConfig="{{lineConfig}}"
></basic-line-chart>
```

## BaseLineChart

| 属性名             | 描述                                                         | 类型    | 默认值 |
| ------------------ | ------------------------------------------------------------ | ------- | ------ |
| width              | 图标宽度,小于等于100，单位默认是%，大于100为rpx              | Number  | 100    |
| height             | 图标高度,小于等于100，单位默认是%，大于100为rpx              | Number  | 100    |
| chartData          | 图标数据源                                                   | Array   | []     |
| xTickCount         | x横轴点数                                                    | Number  | 3      |
| yTickCount         | y横轴点数                                                    | Number  | 3      |
| xMin               | x轴最小值                                                    | Number  | 0      |
| yMin               | y轴最小值                                                    | Number  | 0      |
| tooltip            | 是否显示tooltip                                              | Boolean | true   |
| tooltipBackground  | 内容框的背景样式配置，可配置圆角、填充色、内边距             | Object  | null   |
| tooltipMarkerStyle | 设置 tooltipMarker 的样式                                    | Object  | null   |
| showTitle          | 是否展示标题，默认不展示                                     | Boolean | false  |
| titleStyle         | tooltip 标题的文本样式配置，showTitle 为 false 时不生效      | Object  | null   |
| valueStyle         | tooltip value 项的文本样式配置                               | Object  | null   |
| showCrosshairs     | 是否显示辅助线，点图、路径图、线图、面积图默认展示           | Boolean | true   |
| showItemMarker     | 是否展示每条记录项前面的 marker                              | Boolean | false  |
| defaultTooltip     | 默认初始化显示的tooltip，该数据为数据源中某一项              | Object  | null   |
| legend             | 是否显示图例                                                 | Boolean | false  |
| legendPosition     | 设置图例的显示位置，可设置的值为：'top'、'right'、'bottom'、'left'，分别表示上、右、下、左。默认为 top。 | String  | 'top'  |
| area               | 是否显示区域图                                               | Boolean | false  |
| areaConfig         | 区域图配置                                                   | Arrary  | []     |
| lineConfig         | 线图配置                                                     | Arrary  | []     |

### tooltipBackground

```javascript
tooltipBackground: {
	radius: 2,
	fill: '#ffef00',
	padding: [3, 5],
},
```

### tooltipMarkerStyle

```javascript
tooltipMarkerStyle: {
	fill: '#1890FF',
	fillOpacity: 0.1,
},
```

### valueStyle

```javascript
valueStyle: {
  fontSize: 24,
  fill: '#fff',
	textAlign: 'start',
	textBaseline: 'middle'
},
```

### areaConfig

```javascript
areaConfig: [
  { type: 'line1', color: '#ffff00', shape: 'area' },
  { type: 'line2', color: '#1890FF', shape: 'area' },
],
```

### lineConfig

```javascript
lineConfig: [
	{ type: 'reference', color: '#ffff00', shape: 'line' },
	{ type: 'base', color: '#1890FF', shape: 'line' },
],
```

