import { useEffect, useRef } from 'preact/compat'
import * as d3 from 'd3'

export default function App () {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    svg.selectAll('*')
      .remove()

    const text = svg.append('text')
      .attr('font-size', 20)
      .attr('x', 20)
      .attr('y', 10)

    svg.on('mouseover', function (d) {
      d3.select(this)
        .style('cursor', 'crosshair')
    })

    svg.on('mouseout', function (d) {
      // d3.select(this)
      //   .style('cursor', 'default')
    })

    svg.on('mousemove', function (event) {
      const [x, y] = d3.pointer(event)

      text.attr('x', x)
        .attr('y', y)
        .attr('fill', 'blue')
        .text(`x: ${x}, y: ${y}`)

      const n = text.node()

      if (n) {
        const {
          width: textWidth,
          height: textHeight,
        } = n.getBBox()

        // manage horizontal position
        if ((x + textWidth) >= 600) {
          text.attr('text-anchor', 'end')
        } else {
          text.attr('text-anchor', 'start')
        }

        if ((y - textHeight) <= 0) {
          text.attr('dominant-baseline', 'hanging')
        } else {
          text.attr('dominant-baseline', 'middle')
        }
      }
    })

  }, [])

  return (
    <div>
      <svg
        ref={svgRef}
        width={600}
        height={300}
        className="bg-gray-100"
      ></svg>
    </div>
  )
}
