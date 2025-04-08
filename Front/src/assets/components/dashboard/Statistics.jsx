import React from 'react';
import Chart1 from '../Ui/statis/chart1';
import Chart2 from '../Ui/statis/chart2';


const Statistics = () => {
  return (
    <div >
      {/* Disposition des graphiques en responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* First chart takes 2 columns on lg screens */}
        <div className="w-full sm:h-full lg:col-span-3">
          <Chart1 />
        </div>
        {/* Other charts take 1 column each */}
        <div className="w-full sm:h-full">
          <Chart2 />
        </div>
        
      </div>
    </div>
  );
};

export default Statistics;