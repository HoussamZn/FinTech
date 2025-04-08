
import Cards from '../Ui/Cards';
import Transaction from '../Ui/Transaction';
import Report from '../Ui/Report';
const DashHome = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="w-full sm:h-full ">
          <Cards />
        </div>
        
        <div className="w-full sm:h-full ">
          <Transaction />
        </div>
        <div className="w-full sm:h-full ">
          <Report />
        </div>
      </div>
    </div>
  )
}

export default DashHome;