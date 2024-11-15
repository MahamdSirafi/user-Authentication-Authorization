console.log(document.getElementById('reset'));
document.getElementById('reset').addEventListener('click', () => {
  event.preventDefault();
  let password = document.getElementById('Password').value;
  let confirmPassword = document.getElementById('Confirm').value;
  if (password !== confirmPassword) {
    alert('Password and Confirm Password do not match.');
    return false;
  } else {
    let data = {
      password: password,
    };
    // console.log(window.location.pathname);
    try {
      fetch(`${window.location.pathname}`, {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status == 'success') {
            alert('success');
            // window.location.href = window.location.pathname
            //   .split('/', 3)
            //   .join('/')+"/";
          } else {
            alert(data.message);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }
});
