import React from 'react';
import Chart1 from '../Ui/statis/chart1';
import Chart2 from '../Ui/statis/chart2';
import Chart3 from '../Ui/statis/chart3';
import Chart4 from '../Ui/statis/chart4';
import Chart5 from '../Ui/statis/chart5';
import Chart6 from '../Ui/statis/chart6';

const Statistics = () => {
  return (
    <div >
      {/* Disposition des graphiques en responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* First chart takes 2 columns on lg screens */}
        <div className="w-full sm:h-full lg:col-span-2">
          <Chart1 />
        </div>
        {/* Other charts take 1 column each */}
        <div className="w-full sm:h-full">
          <Chart2 />
        </div>
        <div className="w-full sm:h-full">
          <Chart3 />
        </div>
        {/* These will wrap to the next row */}
        <div className="w-full sm:h-full">
          <Chart4 />
        </div>
        <div className="w-full sm:h-full">
          <Chart5 />
        </div>
        <div className="w-full sm:h-full lg:col-span-2">
          <Chart6 />
        </div>
      </div>
    </div>
  );
};

export default Statistics;