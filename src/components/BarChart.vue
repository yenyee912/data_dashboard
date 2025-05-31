<template>
  <div ref="barChart" class="chart-container">
    <!-- <p style="color:red">from child</p> -->
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'BarChart',
  props: {
    inputData: {
      type: Array,
      required: true
    }
  },

  watch: {
    inputData: {
      handler() {
        if (this.inputData.length > 0) {
          if (!this.svg) {
            this.drawChart();
          }

          else {
            this.updateChart();
          }
        }
      },
      immediate: true,
      deep: true
    }
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
      // console.log('inputData from drawchart:', this.inputData)

      const { margin, width, height } = this;

      // Remove previous chart if any, better keep this line alive 
      // (WILL ALSO CLEAN UP THE CANVAS, REMOVE ALL HTML TAG)
      d3.select(this.$refs.barChart).selectAll('*').remove();

      // Selects all < svg > elements inside the barChart container(even though there may be none at first).
      this.svg = d3.select(this.$refs.barChart).selectAll('svg')
        .data([0]) // Binds a dummy array [0] to the selection. This is a trick to force exactly one SVG to be created if none exists.
        .enter()
        .append('svg')
        .attr('width', width + margin.left + margin.right) // if padding, then have to add padding
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

      this.x = d3.scaleBand().range([0, width]).padding(0.4)
      this.y = d3.scaleLinear().range([height, 0])

      this.svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height})`)

      this.svg.append('g')
        .attr('class', 'y-axis')

      this.tooltip = d3.select('body')  // Use this.$refs.barChart instead of this.$refs.chart
        .append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('background', '#fff')
        .style('border', '1px solid #ccc')
        .style('padding', '6px 10px')
        .style('font-size', '14px')
        .style('pointer-events', 'none')
        .style('opacity', 0)

      this.updateChart();  // <- This line is essential to render the bars

    },

    updateChart() {
      // Responsible for updating the content inside the existing SVG structure:
      // - Rebinding data to bars
      // - Updating bar heights, positions, or colours
      // - Updating scales and axes
      // - Transitioning between states if needed
      // -This method is triggered whenever inputData changes:

      if (!this.x || !this.y || !this.svg || !this.inputData.length) return;  // Check data length

      const data = this.inputData;
      const { height, x, y, svg } = this;

      x.domain(data.map(d => d.label))
      y.domain([0, d3.max(data, d => d.value)]).nice()

      // Update axes
      svg.select('.x-axis')
        .transition().duration(300)
        .call(d3.axisBottom(this.x).tickFormat(d => typeof d === 'string' && d.length >= 5 ? d.slice(5) : d));

      svg.select('.y-axis')
        .transition().duration(300)
        .call(d3.axisLeft(this.y))

      // Data join
      const bars = svg.selectAll('.bar')
        .data(data, d => d.label)

      // Exit
      bars.exit()
        .transition().duration(300)
        .attr('y', y(0))
        .attr('height', 0)
        .remove()

      // Update
      bars.transition().duration(300)
        .attr('x', d => x(d.label))
        .attr('y', d => y(d.value ?? 0))
        .attr('width', x.bandwidth())
        .attr('height', d => {
          const val = typeof d.value === 'number' ? d.value : 0;
          return height - y(val);
        })

      // Enter
      bars.enter()
        .append('rect')
        .attr('class', 'bar') // can bind with scss
        .attr('x', d => x(d.label))
        .attr('y', y(0))
        .attr('width', x.bandwidth())
        .attr('height', 0)
        .on('mouseover', (event, d) => {
          d3.select(event.currentTarget).attr('fill', '#199d5d');
          this.tooltip.transition().duration(100).style('opacity', 0.9);
          this.tooltip.html(`<strong>${d.label}</strong><br/>Production: ${d.value}`);
        })
        .on('mousemove', (event) => {
          this.tooltip.style('left', `${event.pageX + 10}px`)
            .style('top', `${event.pageY - 28}px`);
        })
        .on('mouseleave', (event) => {
          d3.select(event.currentTarget).attr('fill', '#2bb573');
          this.tooltip.transition().duration(200).style('opacity', 0);
        })
        .on('click', (event, d) => {
          console.log("rawraw ", d.raw)
          this.$emit('bar-click', d.raw)
        })
        .transition().duration(300)
        .attr('y', d => y(d.value ?? 0))
        .attr('height', d => height - y(d.value))
    }
  }
}
</script>

<style lang="scss" scoped>
/* easiet way is  */
.chart-container {
  margin: 30vh auto;
  max-width: 600vh;
}

.tooltip {
  background: white;
  border: 1px solid #ccc;
  padding: 6px 10px;
  font-size: 14px;
  pointer-events: none;
  position: absolute;
  opacity: 0;
  z-index: 1000;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
</style>
