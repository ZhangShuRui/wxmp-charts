Component({
  properties: {
    polarParams: {
      type: Object,
      value: ({
        transposed: true,
        innerRadius: 0.8,
      }),
    },

    value: {
      type: Number,
      value: 0,
    },

    innerColor: {
      type: String,
      value: '#ccc',
    },

    outerColor: {
      type: String,
      value: '#1890FF',
    },

    textColor: {
      type: String,
      value: '#1890FF',
    },

    text: {
      type: String,
      value: '',
    },
    loopSize: {
      type: Number,
      value: 20,
    },
    max: {
      type: Number,
      value: 100,
    },
    textSlot: {
      type: Boolean,
      value: false,
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
    initChart() {
      this.data.chartComponent = this.selectComponent('#progress-bar');

      if (!this.data.chartComponent) {
        console.error('未找到图表组件！');
        return;
      }

      this.data.chartComponent.lazyInit((F2, config) => {
        const chart = new F2.Chart(config);
        this.chart = chart;
        const {
          polarParams, value, innerColor, outerColor,
          textColor, text, textSize, textSlot, loopSize, max
        } = this.properties;

        chart.coord('polar', polarParams);
        chart.source(
          [{
            x: '1',
            y: value,
          }],
          {
            y: {
              min: 0,
              max,
              nice: false
            }
          }
        );
        chart.interval().position('x*y').color(outerColor).size(loopSize);
        if (!textSlot) {
          chart.guide().text({
            position: ['50%', '50%'],
            content: text,
            style: {
              fill: textColor,
              fontSize: textSize,
            },
          });
        }
        chart.guide().arc({
          top: false,
          start: [0, 0],
          end: [1, max - 0.02],
          style: {
            stroke: innerColor,
            lineWidth: loopSize
          }
        });
        chart.axis(false);
        chart.render();
        return chart;
      });
    }
  },
});
