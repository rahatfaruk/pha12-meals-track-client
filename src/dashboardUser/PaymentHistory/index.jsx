import SectionHeader from "../../comps/SectionHeader";
import Table from "./Table";
const payments = [
  {
    "_id": "pid1",
    "amount": 10.50,
    "currency": "usd",
    "created_at": 1707408400000, 
    "trx_id": "trx_001",
    "email": "ali@mail.com"
  },
  {
    "_id": "pid2",
    "amount": 15.25,
    "currency": "usd",
    "created_at": 1707412000000, 
    "trx_id": "trx_002",
    "email": "ali@mail.com" 
  },
]
function PaymentHistory() {
  return (  
    <div className="px-4 py-10 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto">
      <SectionHeader title={'Payment History'} />
      <Table payments={payments} />
    </div>
  );
}

export default PaymentHistory;