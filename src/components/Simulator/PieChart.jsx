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

const PieChart = ({ data, y }) => {
  const [pieChartData, setPieChartData] = useState();
  const [colorSchemes, setColorSchmemes] = useState([]);

  useEffect(() => {
    let newPieChartData = [], newColorSchemes = [];
    data.forEach((process) => {
      newPieChartData.push({
        x: process.Pid,
        y: process[y],
      });
      newColorSchemes.push(process.color);
    });
    setPieChartData(newPieChartData);
    setColorSchmemes(newColorSchemes);
  }, [])

  return (
      <AccumulationChartComponent
        id={`chart-${y}`}
        height="400px"
        enableSmartLabels='true'
        tooltip={{ enable: true }}
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
