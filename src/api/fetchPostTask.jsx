const fetchPostTask = async (title) => {
  const response = await fetch('https://easydev.club/api/v1/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      isDone: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`);
  }
}

export default fetchPostTask;