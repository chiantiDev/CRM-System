const fetchDeleteTask = async (id) => {
  const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`);
  }
}

export default fetchDeleteTask;