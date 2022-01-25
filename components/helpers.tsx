export const getData = async function(resource: string) {
  return fetch(process.env.DB_URL + resource).then(response => response.json());
}

export const postData = async function(resource: string, data: object) {
  return fetch(process.env.DB_URL + resource, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}