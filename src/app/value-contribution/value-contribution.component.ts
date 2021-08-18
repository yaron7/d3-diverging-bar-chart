import { Component, OnInit } from '@angular/core'
import { ApiService } from '../api.service'
import * as d3 from 'd3'

@Component({
  selector: 'app-value-contribution',
  templateUrl: './value-contribution.component.html',
  styleUrls: ['./value-contribution.component.scss']
})
export class ValueContributionComponent implements OnInit {

  private margin = { top: 20, right: 20, bottom: 30, left: 100 }
  private height = 0
  private width = window.innerWidth
  private barHeight = 25

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.get('value_contribution').subscribe(
      (data: any) => {
        if (data) {
          this.height = Math.ceil((data.length + 0.1) * this.barHeight) + this.margin.top + this.margin.bottom
          data.sort((a, b) => (a.value - b.value))
          this.createChart(data)
        }
      },
      err => {
        console.error(err)
      }
    )
  }

  private createChart(data: any[]) {

    const svg = d3.select('svg')
    const format = d3.format('.0%')

    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.value))
      .rangeRound([this.margin.left, this.width - this.margin.right])

    const yScale = d3.scaleBand()
      .domain(d3.range(data.length) as any)
      .rangeRound([this.margin.top, this.height - this.margin.bottom])
      .padding(0.1)

    const xAxis = g => g
      .attr('transform', `translate(0,${this.height - this.margin.top})`)
      .call(d3.axisBottom(xScale).ticks(this.width / 80).ticks(null, '%'))
      .call(g => g.select('.domain').remove())

    const yAxis = g => g
      .attr('transform', `translate(${xScale(0)},0)`)
      .call(d3.axisLeft(yScale).tickFormat((i: any) => data[i].attribute).tickSize(0).tickPadding(6))
      .call(g => g.selectAll('.tick text').filter(i => data[i].value < 0)
        .attr('text-anchor', 'start')
        .attr('x', 6))

    const xGrid = (g) => g
      .attr('class', 'grid-lines')
      .selectAll('line')
      .data(xScale.ticks())
      .join('line')
      .attr('x1', d => xScale(d))
      .attr('x2', d => xScale(d))
      .attr('y1', this.margin.top)
      .attr('y2', this.height - this.margin.bottom)

    svg.append('g').call(xAxis)
    svg.append('g').call(yAxis)
    svg.append('g').call(xGrid)

    svg.append('g')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('fill', d => d.value > 0 ? '#09d27b' : '#ff575f')
      .attr('x', d => xScale(Math.min(d.value, 0)))
      .attr('y', (d, i) => yScale(String(i)))
      .attr('width', d => Math.abs(xScale(d.value) - xScale(0)))
      .attr('height', 15)

    svg.append('g')
      .attr('font-size', 14)
      .selectAll('text')
      .data(data)
      .join('text')
      .attr('text-anchor', d => d.value < 0 ? 'end' : 'start')
      .attr('x', d => xScale(d.value) + Math.sign(d.value - 0) * 4)
      .attr('y', (d, i) => yScale(String(i)) + yScale.bandwidth() / 2)
      .attr('dy', '0.35em')
      .text(d => format(d.value))

  }

}
