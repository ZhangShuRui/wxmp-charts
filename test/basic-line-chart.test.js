const _ = require('./utils');
const mockData = require('./mock/basic-line-chart');

describe('harts/line/basic-line-chart', () => {
  test('render', async () => {
    const componentId = _.load('charts/line/basic-line-chart/index', 'comp');
    const component = _.render(componentId, {
      width: 100,
      chartData: mockData.chartData,
      style: 'width:100%',
    });

    // const parent = document.createElement('parent-wrapper');
    // component.attach(parent);
    expect(window.getComputedStyle(component.dom).width).toBe('100%');
  });
});
