import DonationChart from '@/components/donationPage/donationChart';
import ExpenseChart from '@/components/donationPage/expenseChart';
import ChartContainer from '@/components/homePage/chartContainer'
import React from 'react'

const Donation = () => {
  //const context = React.createContext();
  //function access() 
  console.log()
  return (
    <section>
      <section>
        <div className="flex flex-col items-center justify-center">
          <div className="pt-5">
            <ChartContainer title="Bar Chart of donations">
              <DonationChart />
            </ChartContainer>
          </div>
          <div className="pt-10">
            <ChartContainer title="Bar Chart of expenses">
              <ExpenseChart />
            </ChartContainer>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Donation