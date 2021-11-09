<template>
  <div>
    <h1>示波器demo</h1>
    <div
      id="customerChart"
      :style="{ width: '1500px', height: '550px', margin: '0 auto' }"
    ></div>
    <button @click="clearTimer()">暂停</button>
    <button @click="resetTimer()">重启</button>
  </div>
</template>

<script lang="ts">
import { onMounted, onUpdated } from "vue";
import * as echarts from "echarts";
import { reactive, toRefs } from "vue";

interface ChartProps {
  time: number[];
  value: number[];
  myChart: any;
  option: any;
  addData: (raw_data: any, time: any, value: any) => void;
  initEcharts: () => void;
}

interface TimerProps {
  timer: any;
  clearTimer: () => void;
  resetTimer: () => void;
}

export default {
  name: "HelloWorld",
  setup() {
    const chart: ChartProps = reactive({
      time: [],
      value: [],
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            axis: "y",
            snap: true,
          },
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: false,
            },
            saveAsImage: {},
            dataView: {
              readOnly: true,
            },
          },
        },
        xAxis: {
          data: [],
          show: false,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "数值",
            type: "line",
            data: [],
            symbol: "none",
            lineStyle: {
              width: 1, // 正常时的折线宽度
            },
            emphasis: {
              focus: "series",
              lineStyle: {
                width: 1, // hover时的折线宽度
              },
            },
          },
        ],
      },
      myChart: null,
      addData: (raw_data: any, time: any, value: any) => {
        chart.time = chart.time.concat(raw_data[0]);
        chart.value = chart.value.concat(raw_data[1]);
        if (chart.value.length >= 4000) {
          chart.time = chart.time.slice(-4001, -1);
          chart.value = chart.value.slice(-4001, -1);
        }
        chart.initEcharts();
      },
      initEcharts() {
        chart.option.xAxis.data = chart.time;
        chart.option.series[0].data = chart.value;
        const elem: HTMLElement = document.getElementById(
          "customerChart"
        ) as HTMLElement;
        if (!chart.myChart) {
          chart.myChart = echarts.init(elem);
        }
        chart.myChart.setOption(chart.option);
      },
    });
    const timer: TimerProps = reactive({
      timer: null,
      resetTimer: () => {
        chart.time = [];
        chart.value = [];
        timer.timer = setInterval(() => {
          let rawdata = [[0], [0]];
          for (var i = 0; i < 200; i++) {
            var v = Math.random();
            rawdata[1].push(v);
            rawdata[0].push(i);
          }
          chart.addData(rawdata, chart.time, chart.value);
        }, 100);
      },
      clearTimer: () => {
        clearTimeout(timer.timer);
      },
    });
    onMounted(() => {
      chart.initEcharts();
      timer.timer = setInterval(() => {
        let rawdata = [[0], [0]];
        for (var i = 0; i < 200; i++) {
          var v = Math.random();
          rawdata[1].push(v);
          rawdata[0].push(i);
        }
        chart.addData(rawdata, chart.time, chart.value);
      }, 100);
    });
    const refChart = toRefs(chart);
    const refTimer = toRefs(timer);
    return {
      ...refChart,
      ...refTimer,
    };
  },
};
</script>

<style>
#customerChart {
  margin: 0 auto;
}
</style>
