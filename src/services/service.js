export function postField(body) {
  fetch('http://www.mocky.io/v2/566061f21200008e3aabd919', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}
