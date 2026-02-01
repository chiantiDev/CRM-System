const fetchGetTask = async (taskFilter) => {
  const response = await fetch(`https://easydev.club/api/v1/todos?filter=${taskFilter}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`);
  }

  const result = await response.json();

  return {
    tasks: result.data,
    count: result.info
  };
}

export default fetchGetTask;