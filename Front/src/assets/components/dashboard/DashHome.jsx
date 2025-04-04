
import Cards from '../Ui/Cards';
import Subscriptions from '../Ui/Subscriptions';
import Transaction from '../Ui/Transaction';
import Report from '../Ui/Report';
const DashHome = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <div className="w-full sm:h-full ">
          <Cards />
        </div>
        <div className="w-full sm:h-full ">
          <Subscriptions />
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