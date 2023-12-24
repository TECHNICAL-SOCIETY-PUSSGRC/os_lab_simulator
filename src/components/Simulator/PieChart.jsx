import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  AccumulationLegend,
  AccumulationTooltip,
  AccumulationDataLabel,
} from "@syncfusion/ej2-react-charts";
import { useEffect, useState } from "react";

const PieChart = ({ data, y, colorSchemes }) => {
  const [pieChartData, setPieChartData] = useState();

  useEffect(() => {
    let pieChartData = [];
    data.forEach((process) => {
      pieChartData.push({
        x: process.Pid,
        y: process[y],
      });
    });
    setPieChartData(pieChartData);
  }, [])

  return (
      <AccumulationChartComponent
        id={`chart-${y}`}
        height="400px"
        enableSmartLabels='true'
        tooltip={{ enable: true }}
        colors={colorSchemes}
        background="transparent"
        textRender = {(args) => {
          // args.text = args.point.percentage + "%";
          args.font.color = 'white';
          args.font.size = '16px';
        }}
        legendSettings={{ textStyle: { color: 'white', size: '16px' }}}
      >
        <Inject
          services={[
            AccumulationLegend,
            AccumulationTooltip,
            AccumulationDataLabel,
          ]}
        />
        <AccumulationSeriesCollectionDirective>
          <AccumulationSeriesDirective
            dataSource={pieChartData}
            xName="x"
            yName="y"
            type="Pie"
            explode={true}
            explodeOffset="17"
            explodeIndex={0}
            dataLabel={{ visible: true }}
            palettes={colorSchemes}
          />
        </AccumulationSeriesCollectionDirective>
      </AccumulationChartComponent>
  );
};

export default PieChart;
