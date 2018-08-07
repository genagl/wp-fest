import React, {Fragment} from 'react';
import {PieChart, LineChart, BarChart } from 'react-easy-chart';
import {
  event as lastEvent,
  select,
  axisBottom,
  axisLeft,
  axisRight,
  scaleTime,
  timeFormat,
  scaleOrdinal,
  schemeCategory20,
  range,
  line,
  max
} from 'd3';
import PropTypes from 'prop-types';

export default class _BarChart extends BarChart
{
	static get propTypes() {
    return {
      data: PropTypes.array.isRequired,
      lineData: PropTypes.array,
      width: PropTypes.number,
      height: PropTypes.number,
      margin: PropTypes.object,
      mouseOverHandler: PropTypes.func,
      mouseOutHandler: PropTypes.func,
      mouseMoveHandler: PropTypes.func,
      clickHandler: PropTypes.func,
      interpolate: PropTypes.string,
      style: PropTypes.object,
      colorBars: PropTypes.bool,
      axes: PropTypes.bool,
      grid: PropTypes.bool,
      axisLabels: PropTypes.shape({
        x: PropTypes.string,
        y: PropTypes.string,
		img:PropTypes.string,
      }),
      xType: PropTypes.string,
      yType: PropTypes.string,
      y2Type: PropTypes.string,
      xDomainRange: PropTypes.array,
      yDomainRange: PropTypes.array,
      datePattern: PropTypes.string,
      tickTimeDisplayFormat: PropTypes.string,
      yAxisOrientRight: PropTypes.bool,
      barWidth: PropTypes.number,
      xTickNumber: PropTypes.number,
      yTickNumber: PropTypes.number
    };
  }
	constructor(props) {
		super(props);
	}
	
	
	createXAxis({ root, m, w, h, x }) {
		const {
		  axisLabels: { x: label },
		  xType,
		  tickTimeDisplayFormat,
		  xTickNumber,
		  yAxisOrientRight
		} = this.props;

		const axis = axisBottom(x);

		if (xType === 'time' && tickTimeDisplayFormat) {
		  axis
			.tickFormat(timeFormat(tickTimeDisplayFormat));
		}

		axis
		  .tickSize(0)
		  .tickPadding(15);
		

		if (xTickNumber) {
		  axis
			.ticks(xTickNumber);
		}

		const group = root
		  .append('g')
		  .attr('class', 'x axis')
		  .attr('transform', `translate(0, ${h})`);

		//group.call(axis);
		
		if (label) {
		  group
			.append('text')
			.attr('class', 'label')
			.attr('x',
			  (yAxisOrientRight)
				? 0
				: w)
			.attr('y', m.bottom - 10)
			.style('text-anchor',
			  (yAxisOrientRight)
				? 'start'
				: 'end')
			.text(label);
		}
		const len = this.props.data.length;
		this.props.data.forEach((elem, num) =>
		{
			let ww = w/len;
			let cx = (ww * num + (ww-35)/2);
			let cx2 = ww * num;
			group				
				.append('image')
					.attr('href', elem.img)
					.attr('height', "35")
					.attr('width', "35")
					.attr("class", "noevent")
					.attr('x', cx)
					.attr('y', -45);
			group
				.append('g')
					.attr('width', ww)
					.style("width", ww)
					.attr('transform', `translate(${cx2}, ${15})`)
						.append('text')
							.attr("class", "panel_txt")
							.attr("class", "svgrot")
							.text(elem.name);
		})
		
	  }
	
	render() {
		const {
		  axes
		} = this.props;

		const hasLineData = this.hasLineData();
		const p = this.calculateChartParameters();


		this.createBarChart(p);

		if (hasLineData) {
		  this.createLinePath(p);
		}

		if (axes) {
			this.createXAxis(p);

			this.createYAxis(p); // const yAxis = this.createYAxis(p);

			if (hasLineData) {
				this.createYAxis2(p); // { ...p, yAxis });
			}
		}
		const uid = this.uid;
		const className = `bar-chart-${uid}`;
		const {
		  node
		} = p;

		return (
		  <div ref="barChart" className={className}>
			{this.createStyle()}
			{node.toReact()}
		  </div>
		);
	  }
}