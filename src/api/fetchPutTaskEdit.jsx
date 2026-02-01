const fetchPutTaskEdit = async (title, id) => {
  const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({title: title}),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`);
  }
}

export default fetchPutTaskEdit