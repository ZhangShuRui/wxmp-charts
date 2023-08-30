const base = [
  {
    x: '出身',
    y: 10,
    type: 'base',
  },
  {
    x: '一月',
    y: 22,
    type: 'base',
  },
  {
    x: '二月',
    y: 36,
    type: 'base',
  },
  {
    x: '三月',
    y: 46,
    type: 'base',
  },
  {
    x: '四月',
    y: 52,
    type: 'base',
  },
  {
    x: '五月',
    y: 66,
    type: 'base',
  },
  {
    x: '六月',
    y: 78,
    type: 'base',
  },
  {
    x: '七月',
    y: 79,
    type: 'base',
  },
  {
    x: '八月',
    y: 82,
    type: 'base',
  },
  {
    x: '九月',
    y: 92,
    type: 'base',
  },
  {
    x: '十月',
    y: 98,
    type: 'base',
  },
  {
    x: '十一月',
    y: 100,
    type: 'base',
  },
  {
    x: '十二月',
    y: 120,
    type: 'base',
  },
];

const reference = [
  {
    x: '出身',
    y: 20,
    type: 'reference',
  },
  {
    x: '一月',
    y: 44,
    type: 'reference',
  },
  {
    x: '二月',
    y: 58,
    type: 'reference',
  },
  {
    x: '三月',
    y: 68,
    type: 'reference',
  },
  {
    x: '四月',
    y: 74,
    type: 'reference',
  },
  {
    x: '五月',
    y: 88,
    type: 'reference',
  },
  {
    x: '六月',
    y: 100,
    type: 'reference',
  },
  {
    x: '七月',
    y: 101,
    type: 'reference',
  },
  {
    x: '八月',
    y: 104,
    type: 'reference',
  },
  {
    x: '九月',
    y: 114,
    type: 'reference',
  },
  {
    x: '十月',
    y: 120,
    type: 'reference',
  },
  {
    x: '十一月',
    y: 122,
    type: 'reference',
  },
  {
    x: '十二月',
    y: 142,
    type: 'reference',
  },
];

Page({
  /**
   * 页面的初始数据
   */
  data: {
    width: 100,
    tooltipBackground: {
      radius: 2,
      fill: '#ffef00',
      padding: [3, 5],
    },
    tooltipMarkerStyle: {
      fill: '#1890FF',
      fillOpacity: 0.1,
    },
    defaultTooltip: {
      x: '六月',
      y: 100,
      type: 'reference',
    },
    chartData: [...base, ...reference],
    areaConfig: [
      { type: 'reference', color: '#ffff00', shape: 'area' },
      { type: 'base', color: '#1890FF', shape: 'area' },
    ],
    lineConfig: [
      { type: 'reference', color: '#ffff00', shape: 'line' },
      { type: 'base', color: '#1890FF', shape: 'line' },
    ],
    chartComponent: null,
  },

  tooltipShow(e) {
    // console.log("tooltipShow", e);
  },
  tooltipChange(e) {
    const detail = e.detail;
    detail.items.splice(1, detail.items.length);
    const target = detail.items[0];
    target.name = null;
    target.value += 'cm';
    console.log('tooltipChange', detail);
  },
});
