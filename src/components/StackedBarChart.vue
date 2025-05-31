<template>
  <div ref="stackedBarChart" class="chart-container">
  </div>


</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'StackedBarChart',
  props: {
    inputData: {
      type: Array,
      required: true,
    }
  },
  mounted() {
    this.drawChart();
  },
  watch: {
    inputData: {
      // If you're setting this.inputData dynamically from props or fetching it, ensure it's:
      // 1. Not cleared on refresh.
      // 2. Initialised correctly in data() or props.
      handler(newData) {
        if (newData && newData.length) {
          this.drawChart()
        }

      }
    },
    immediate: true,
    deep: true

  },

  data() {
    return {
      svg: null,
      x: null,
      y: null,
      width: 500,
      height: 300,
      margin: { top: 20, right: 30, bottom: 40, left: 40 },
      tooltip: null,
    }

  },
  methods: {
    drawChart() {
      const keys = Array.from(
        new Set(
          this.inputData.flatMap(d =>
            Object.keys(d)
              .filter(k => k !== 'label' && k != 'production') // this might need to avoid, do data cleaning
              .map(k => k.trim()) // 🧼 remove leading/trailing spaces
          )
        )
      )

      const container = d3.select(this.$refs.stackedBarChart)
      container.selectAll('*').remove()

      const { width, height, margin } = this;


      // the width of svg need to consider the legend, +100 for it

      this.svg = container.append('svg')
        .attr('width', width + margin.left + margin.right + 100) // if padding exist, then have to add padding
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

      this.tooltip = d3.select('body')
        .append('div')
        .attr('class', 'd3-tooltip')
        .style('position', 'absolute')
        .style('text-align', 'left')
        .style('padding', '6px')
        .style('background', 'rgba(0, 0, 0, 0.7)')
        .style('color', '#fff')
        .style('border-radius', '4px')
        .style('pointer-events', 'none')
        .style('font-size', '12px')
        .style('opacity', 0)

      const x = d3.scaleBand()
        .domain(this.inputData.map(d => d.label))
        .range([0, width])
        .padding(0.2)

      this.svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))

      const y = d3.scaleLinear()
        .domain([0, d3.max(this.inputData, d => d3.sum(keys, k => d[k] || 0))])
        .nice()
        .range([height, 0])

      this.svg.append('g')
        .call(d3.axisLeft(y))

      // Colour scale
      const colour = d3.scaleOrdinal()
        .domain(keys)
        .range(d3.schemeSet2)

      // Stack generator
      const stackedData = d3.stack()
        .keys(keys)(this.inputData)

      console.log(stackedData)

      // Draw bars
      this.svg.selectAll('g.layer')
        .data(stackedData)
        .enter()
        .append('g')
        .attr('class', 'layer')
        .attr('fill', d => colour(d.key))
        .selectAll('rect')
        .data(d => d.map(v => Object.assign({}, v, { key: d.key }))) // inject key
        .enter()
        .append('rect')
        .attr('x', d => x(d.data.label))
        .attr('y', d => y(d[1]))
        .attr('height', d => y(d[0]) - y(d[1]))
        .attr('width', x.bandwidth())
        .on('mouseover', (event, d) => {
          const label = d.data.label
          const key = d.key
          const value = d.data[key]

          this.tooltip
            .style('opacity', 1)
            .html(`<strong>${label}</strong><br/>${key}: ${value}`)
            .style('left', `${event.pageX + 10}px`)
            .style('top', `${event.pageY - 28}px`)
        })
        .on('mousemove', (event) => {
          this.tooltip
            .style('left', `${event.pageX + 10}px`)
            .style('top', `${event.pageY - 28}px`)
        })
        .on('mouseleave', () => {
          this.tooltip.style('opacity', 0)
        })

      // Legend
      const legend = this.svg.append('g')
        .attr('transform', `translate(${width + 10}, 0)`)

      keys.forEach((key, i) => {
        const g = legend.append('g')
          .attr('transform', `translate(0, ${i * 20})`)

        g.append('rect')
          .attr('width', 12)
          .attr('height', 12)
          .attr('fill', colour(key))

        g.append('text')
          .attr('x', 18)
          .attr('y', 10)
          .text(key)
          .style('font-size', '12px')
      })

      this.svg.selectAll('.total-label')
        .data(this.inputData)
        .enter()
        .append('text')
        .attr('class', 'total-label')
        .attr('x', d => x(d.label) + x.bandwidth() / 2)
        .attr('y', d => y(d3.sum(keys, k => d[k] || 0)) - 5) // position slightly above top
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .text(d => d3.sum(keys, k => d[k] || 0))

    }

  }


}
</script>

<style scoped>
/* .tooltip {
  position: absolute;
  text-align: center;
  padding: 6px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 4px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
} */
</style>