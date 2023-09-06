const url = "https://reqres.in/api/users";
let currentPage = 1;

const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");

prevPageBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchUsers();
  }
});

nextPageBtn.addEventListener("click", () => {
  currentPage++;
  fetchUsers();
});

function fetchUsers() {
  fetch(`${url}?page=${currentPage}`)
    .then((resp) => resp.json())
    .then(renderList);
}
const userList = document.getElementById('listUsers')
function renderList(users) {
  userList.innerHTML = ""
  users.data.forEach(function (user) {
    userList.innerHTML += `
    <div class="col-md-4">
      <div class="card mb-4">
        <img src="${user.avatar}" class="card-img-top" alt="Avatar">
        <div class="card-body">
          <h5 class="card-title">Email: ${user.email}</h5>
          <p class="card-text">First Name: ${user.first_name}</p>
          <p class="card-text">Last Name: ${user.last_name}</p>
          <div>
            <a type="button" class="btn btn-warning" href="./editFormP1.html">Editar</a>
            <button type="button" class="btn btn-danger" onclick="eliminar(${user.id})">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
    `;
  });

  if (currentPage === 1) {
    prevPageBtn.setAttribute("disabled", true);
  } else {
    prevPageBtn.removeAttribute("disabled");
  }

  if (currentPage === 2) {
    nextPageBtn.setAttribute("disabled", true);
  } else {
    nextPageBtn.removeAttribute("disabled");
  }
}

fetchUsers();

function registrar(){
    var name = document.getElementById("name");
    var job = document.getElementById("job");
  fetch("https://reqres.in/api/users", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: `${name.value}`,
      job: `${job.value}`
    })
  })
  .then(resp =>{ 
    if(resp.ok){
        name.value = ""
        job.value = ""
        alert(`Usuario registrado exitosamente, status: ${resp.status}`)
    }
  })
  .catch(err => alert(err)) 
}


function eliminar(userId){
    fetch(`https://reqres.in/api/users/${userId}`, {
        method: 'DELETE',
        headers: {'Content-type': 'application/json; charset=UTF-8' }
      })
    .then(response => {
      if(response.ok){
        alert(`Eliminado usuario con id ${userId} exitosamente: status ${response.status} \nNOTA: Los datos de la lista de la API no se eliminan realmente ya que no coinciden con los de eliminar (DELETE), por lo que solo se usa el id de la lista para utilizar el servicio...`)
      }
    } )
    .catch(err => alert(err)) 
}

function editar() {
  var nameEdit = document.getElementById("nameEdit").value;
  var jobEdit = document.getElementById("jobEdit").value;

  if (nameEdit.trim() === "" || jobEdit.trim() === "") {
    alert("Los campos Nombre y Trabajo no pueden estar vacíos.");
    return;
  }

  fetch("https://reqres.in/api/users", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: nameEdit,
      job: jobEdit
    })
  })
  .then(resp => {
    if (resp.ok) {
      alert(`Usuario actualizado exitosamente, status: ${resp.status}`);
    }
  })
  .catch(err => alert(err));
}




