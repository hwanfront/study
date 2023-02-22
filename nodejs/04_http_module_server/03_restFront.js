const onEdit = (key) => async () => {
  const name = prompt('이름 입력');
  if (!name) {
    return alert('이름을 입력하세요');
  }

  try {
    await axios.put(`/user/${key}`, { name });
    getUser();
  } catch (error) {
    console.error(error);
  }
}

const onRemove = (key) => async () => {
  try {
    await axios.delete(`/user/${key}`);
    getUser();
  } catch (error) {
    console.error(error)
  }
}

async function getUser() {
  try {
    const res = await axios.get('/users');
    const users = res.data;
    const $list = document.getElementById('list');
    $list.innerHTML = '';

    Object.keys(users).map(function (key) {
      const $userDiv = document.createElement('div');
      const $span = document.createElement('span');
      const $edit = document.createElement('button');
      const $remove = document.createElement('button');

      $span.textContent = users[key];
      $edit.textContent = '수정';
      $edit.addEventListener('click', onEdit(key));
      $remove.textContent = '삭제';
      $remove.addEventListener('click', onRemove(key));
      $userDiv.appendChild($span);
      $userDiv.appendChild($edit);
      $userDiv.appendChild($remove);
      $list.appendChild($userDiv);
      console.log(res.data);
    })
  } catch (error) {
    console.error(error);
  }
}

window.onload = getUser; // 화면 로딩 시 getUser 호출

document.getElementById('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = e.target.username.value;
  if(!name) {
    return alert('이름을 입력하세요');
  }

  try {
    await axios.post('/user', { name });
    getUser();
  } catch (error) {
    console.error(error);
  }
  e.target.username.value = '';
})