const axios = require('axios');

async function test() {
  try {
    const loginRes = await axios.post('http://localhost:3000/api/auth/login', {
      email: 'admin@paint.com',
      password: '123456'
    });
    const token = loginRes.data.data.accessToken;
    console.log('Login OK');

    const usersRes = await axios.get('http://localhost:3000/api/users', {
      headers: { Authorization: 'Bearer ' + token }
    });
    console.log('GET /users:', usersRes.status, usersRes.data.message);

    const createRes = await axios.post('http://localhost:3000/api/users', {
        email: 'testuser123@paint.com',
        fullName: 'New Test User',
        password: '123',
        role: 'USER'
    }, {
      headers: { Authorization: 'Bearer ' + token }
    });
    console.log('POST /users:', createRes.status, createRes.data.message);

  } catch (err) {
    if (err.response) {
      console.error('Error:', err.response.status, err.response.data);
    } else {
      console.error(err);
    }
  }
}
test();
