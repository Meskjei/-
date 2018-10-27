import * as echarts from '../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: '#161627',
    title: {
      text: '历年综测评分',
      left: 'left',
      textStyle: {
        color: '#eee'
      }
    },
    legend: {
      bottom: 5,
      data: ['2016', '2017'],
      itemGap: 20,
      textStyle: {
        color: '#fff',
        fontSize: 14
      },
      selectedMode: 'single'
    },
    radar: {
      indicator: [{
          name: '智育',
          max: 10
        },
        {
          name: '德育',
          max: 10
        },
        {
          name: '体育',
          max: 5
        }
      ],
      shape: 'circle',
      splitNumber: 5,
      name: {
        textStyle: {
          color: 'rgb(238, 197, 102)'
        }
      },
      splitLine: {
        lineStyle: {
          color: [
            'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
            'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
            'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
          ].reverse()
        }
      },
      splitArea: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(238, 197, 102, 0.5)'
        }
      }
    },
    series: [{
        name: '2016',
        type: 'radar',
        data: [[7, 8, 4]],
        label: {
          show: true,
          position: 'inside'
        }
      },
      {
        name: '2017',
        type: 'radar',
        data: [[3, 4, 4]],
        label: {
          show: true,
          position: 'inside'
        }
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function(res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function() {},
      fail: function() {}
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {}
});