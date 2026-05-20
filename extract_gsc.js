(async () => {
  const getMetrics = () => {
    const metrics = document.querySelectorAll('.O8vO6b');
    return Array.from(metrics).map(m => m.innerText.trim());
  };

  const getTableData = () => {
    const rows = document.querySelectorAll('tbody tr');
    return Array.from(rows).slice(0, 10).map(row => {
      const cells = row.querySelectorAll('td');
      return Array.from(cells).map(c => c.innerText.trim());
    });
  };

  return {
    metrics: getMetrics(),
    table: getTableData()
  };
})()