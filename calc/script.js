// Login básico
const loginForm = document.getElementById('loginForm');
const loginContainer = document.getElementById('loginContainer');
const diarioContainer = document.getElementById('diarioContainer');

const usuarioCorreto = "anajulia";
const senhaCorreta = "sonhos123";

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === usuarioCorreto && password === senhaCorreta) {
    loginContainer.style.display = 'none';
    diarioContainer.style.display = 'block';
    renderizarSonhos();
  } else {
    alert('Usuário ou senha incorretos!');
  }
});

// Funções do diário
const form = document.getElementById('dreamForm');
const dreamTitle = document.getElementById('dreamTitle');
const dreamText = document.getElementById('dreamText');
const dreamType = document.getElementById('dreamType');
const bonsSonhosList = document.querySelector('#bonsSonhos ul');
const ruinsSonhosList = document.querySelector('#ruinsSonhos ul');

let sonhos = JSON.parse(localStorage.getItem('sonhos')) || [];

function renderizarSonhos() {
  bonsSonhosList.innerHTML = '';
  ruinsSonhosList.innerHTML = '';

  sonhos.forEach((sonho, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${sonho.titulo}</strong>: ${sonho.texto}
      <button onclick="deletarSonho(${index})">🗑️</button>
    `;

    if (sonho.tipo === 'bom') {
      bonsSonhosList.appendChild(listItem);
    } else {
      ruinsSonhosList.appendChild(listItem);
    }
  });
}

function deletarSonho(index) {
  sonhos.splice(index, 1);
  localStorage.setItem('sonhos', JSON.stringify(sonhos));
  renderizarSonhos();
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const titulo = dreamTitle.value.trim();
  const texto = dreamText.value.trim();
  const tipo = dreamType.value;

  if (titulo && texto) {
    const novoSonho = { titulo, texto, tipo };
    sonhos.push(novoSonho);

    localStorage.setItem('sonhos', JSON.stringify(sonhos));
    renderizarSonhos();

    dreamTitle.value = '';
    dreamText.value = '';
  }
});
