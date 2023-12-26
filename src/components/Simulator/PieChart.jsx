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
  const [explodeIndex, setExplodeIndex] = useState(0);

  useEffect(() => {
    let newPieChartData = [], newColorSchemes = [];
    let newExplodeIndex = 0;

    data.forEach((process, curIndex) => {
      newPieChartData.push({
        x: process.Pid,
        y: process[y],
      });
      newColorSchemes.push(process.color);

      // Choose the first non-zero value
      if(!data[explodeIndex][y] && process[y] > 0) newExplodeIndex = curIndex;
    });
    if(newExplodeIndex === -1) newExplodeIndex = 0;

    setPieChartData(newPieChartData);
    setColorSchmemes(newColorSchemes);
    setExplodeIndex(newExplodeIndex);
  }, [])

  return (
      <AccumulationChartComponent
        id={`chart-${y}`}
        height="400px"
        enableSmartLabels='true'
        tooltip={{ enable: true }}
        background="transparent"
        textRender = {(args) => {
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
            explodeIndex={explodeIndex}
            dataLabel={{ visible: true }}
            palettes={colorSchemes}
          />
        </AccumulationSeriesCollectionDirective>
      </AccumulationChartComponent>
  );
};

export default PieChart;
