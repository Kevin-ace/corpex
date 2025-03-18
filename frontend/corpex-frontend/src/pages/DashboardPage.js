import React from 'react';
import '../css/DashboardPage.css';

function DashboardPage() {
  return (
    <div className="dashboard-page">
      <h2>Dashboard</h2>
      <div className="dashboard-cards">
        <div className="card total-expenses">
          <h3>Total Expenses</h3>
          <p>KSh 1,562,500.00</p>
          <span>This Month</span>
        </div>
        <div className="card pending-approvals">
          <h3>Pending Approvals</h3>
          <p>8</p>
          <span>Requires Action</span>
        </div>
        <div className="card approved">
          <h3>Approved</h3>
          <p>45</p>
          <span>This Month</span>
        </div>
        <div className="card rejected">
          <h3>Rejected</h3>
          <p>3</p>
          <span>This Month</span>
        </div>
      </div>
      <div className="dashboard-charts">
        <div className="expense-trends">
          <h3>Expense Trends</h3>
          {/* Insert chart component here */}
        </div>
        <div className="category-distribution">
          <h3>Category Distribution</h3>
          {/* Insert pie chart component here */}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
