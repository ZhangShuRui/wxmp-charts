Component({
  properties: {
    // 是否懒加载
    width: {
      type: Number,
      value: 100,
    },

    height: {
      type: Number,
      value: 100,
    },

    chartData: {
      type: Array,
      value: [],
    },

    xTickCount: {
      type: Number,
      value: 3,
    },

    yTickCount: {
      type: Number,
      value: 3,
    },

    // xMin: {
    //   type: Number,
    //   value: undefined,
    // },

    // yMin: {
    //   type: Number,
    //   value: undefined,
    // },

    // tooltip 配置
    tooltip: {
      type: Boolean,
      value: true,
    },
    alwaysShow: {
      type: Boolean,
      value: false,
    },
    tooltipBackground: {
      type: Object,
      value: null,
    },
    tooltipMarkerStyle: {
      type: Object,
      value: null,
    },
    showTitle: {
      type: Boolean,
      value: false,
    },
    titleStyle: {
      type: Object,
      value: null,
    },
    valueStyle: {
      type: Object,
      value: null,
    },

    showCrosshairs: {
      type: Boolean,
      value: true,
    },
    showItemMarker: {
      type: Boolean,
      value: false,
    },
    isShowDefaultTooltip: {
      type: Boolean,
      value: false,
    },
    defaultTooltip: {
      type: Object,
      value: null,
    },

    // 图例配置
    legend: {
      type: Boolean,
      value: true,
    },

    legendPosition: {
      type: String,
      value: 'top',
    },

    area: {
      type: Boolean,
      value: false,
    },

    areaConfig: {
      type: Array,
      value: [],
    },

    lineConfig: {
      type: Array,
      value: [],
    },
  },

  data: {
    opts: {
      lazyLoad: true, // 延迟加载组件
    },
    chartComponent: null,
  },

  observers: {
    '**': function () {
      if (this.chart) {
        this.chart.destroy();
      }
      this.initChart();
    },
  },

  lifetimes: {
    attached() {
      this.initChart();
    },
  },

  methods: {
    loadSource(chart, chartData) {
      const { xTickCount, yTickCount } = this.properties;

      chart.source(chartData, {
        x: {
          // type: 'cat',
          tickCount: xTickCount,
          range: [0, 1],
        },
        y: {
          tickCount: yTickCount,
        },
      });
    },

    renderLegend(chart) {
      const { legendPosition } = this.properties;
      chart.legend({
        position: legendPosition,
      });
    },

    renderTooltip(chart) {
      const {
        alwaysShow,
        showCrosshairs,
        showItemMarker,
        showTitle,
        titleStyle,
        valueStyle,
        tooltipBackground,
        tooltipMarkerStyle,
      } = this.properties;

      const tooltipConfig = {
        alwaysShow,
        showCrosshairs,
        crosshairsType: 'xy',
        crosshairsStyle: {
          lineDash: [2],
        },
        showItemMarker,
        showTitle,
        onShow: (ev) => {
          this.triggerEvent('tooltipshow', ev);
        },
        onChange: (ev) => {
          this.triggerEvent('tooltipchange', ev);
        },
        onHide: (ev) => {
          this.triggerEvent('tooltiphide', ev);
        },
      };

      if (valueStyle) {
        tooltipConfig.valueStyle = valueStyle;
      }

      if (tooltipBackground) {
        tooltipConfig.background = tooltipBackground;
      }

      if (titleStyle) {
        tooltipConfig.titleStyle = titleStyle;
      }

      if (tooltipMarkerStyle) {
        tooltipConfig.markerStyle = tooltipMarkerStyle;
      }

      chart.tooltip(tooltipConfig);
    },

    renderArea(chart) {
      const { area, areaConfig } = this.properties;
      if (area) {
        chart
          .area()
          .position('x*y')
          .color('type', function (type) {
            const cfg = areaConfig.find((item) => item.type === type);
            return cfg ? cfg.color : 'transparent';
          })
          .shape('type', function (type) {
            const cfg = areaConfig.find((item) => item.type === type);
            return cfg ? cfg.shape : 'area';
          });
      }
    },

    renderLine(chart) {
      const { lineConfig } = this.properties;
      chart
        .line()
        .position('x*y')
        .color('type', function (type) {
          const cfg = lineConfig.find((item) => item.type === type);
          return cfg ? cfg.color : 'l(90) 0:#1890FF 1:#ffff00';
        })
        .shape('type', function (type) {
          const cfg = lineConfig.find((item) => item.type === type);
          return cfg ? cfg.shape : 'line';
        });
    },

    // 显示tooltip初始值
    showDefaultTooltip(chart, defaultTooltip) {
      const point = chart.getPosition(defaultTooltip); // 获取该数据的画布坐标
      chart.showTooltip(point);
    },

    // 懒加载图标
    initChart() {
      this.data.chartComponent = this.selectComponent('#base-line');

      const { chartData, lineConfig, isShowDefaultTooltip, defaultTooltip, legend, tooltip } =
        this.properties;

      if (!this.data.chartComponent) {
        console.error('未找到图表组件');
        return;
      }
      if (!chartData.length) {
        console.error('图表数据为空');
        return;
      }
      if (lineConfig.length === 0) {
        console.error('属性 lineConfig 不能为空');
        return;
      }

      this.data.chartComponent.lazyInit((F2, config) => {
        const chart = new F2.Chart(config);

        this.loadSource(chart, chartData);

        if (legend) {
          this.renderLegend(chart);
        } else {
          chart.legend(false);
        }

        if (tooltip) {
          this.renderTooltip(chart);
        } else {
          chart.tooltip(this.tooltip);
        }

        this.renderArea(chart);
        this.renderLine(chart);

        chart.render();

        if (tooltip) {
          if (isShowDefaultTooltip && defaultTooltip && Object.keys(defaultTooltip).length > 0) {
            this.showDefaultTooltip(chart, defaultTooltip);
          }
        }

        this.chart = chart;
        return chart;
      });
    },
  },
});
