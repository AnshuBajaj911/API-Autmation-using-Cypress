// Function to check if a user is from FanCode City based on lat/lng
export const isFanCodeCity = (user) => {
    return user.address.geo.lat >= -40 && user.address.geo.lat <= 5 && user.address.geo.lng >= 5 && user.address.geo.lng <= 100;
  };
  
  // Function to generate a summary table
  export const generateSummaryTable = (userCompletionData) => {
    const summary = userCompletionData.map(user => {
      return `<tr>
                <td style="border: 1px solid #000; padding: 8px;">${user.name}</td>
                <td style="border: 1px solid #000; padding: 8px;">${user.completedTasks}</td>
                <td style="border: 1px solid #000; padding: 8px;">${user.totalTasks}</td>
                <td style="border: 1px solid #000; padding: 8px;">${user.completedPercentage.toFixed(2)}%</td>
              </tr>`;
    }).join('');
  
    return {
      summaryTable: `
        <h3>FanCode Users Completion Summary</h3>
        <table style="width:100%; border-collapse: collapse; border: 1px solid #000;">
          <tr>
            <th style="border: 1px solid #000; padding: 8px;">User</th>
            <th style="border: 1px solid #000; padding: 8px;">Completed Tasks</th>
            <th style="border: 1px solid #000; padding: 8px;">Total Tasks</th>
            <th style="border: 1px solid #000; padding: 8px;">Completion Percentage</th>
          </tr>
          ${summary}
        </table>
      `
    };
  };
  