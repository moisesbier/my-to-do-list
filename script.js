const input = document.querySelector(".input-task");
const button = document.querySelector(".button-add-task");
const listaCompleta = document.querySelector(".list-tasks");

let minhaListaDeTarefas = [];

function adicionarNovaTarefa() {
  const tarefa = input.value.trim();

  if (tarefa === "") {
    alert("Adicione uma tarefa!");
    return;
  }

  minhaListaDeTarefas.push({
    tarefa: tarefa,
    concluida: false,
  });

  input.value = "";

  mostrarTarefa();
}

function mostrarTarefa() {
  let novaLi = "";

  minhaListaDeTarefas.forEach((item, index) => {
    novaLi += `
      <li class="task ${item.concluida ? "done" : ""}">
        <img src="assets/checked.png" alt="Check na tarefa" onclick="concluirTarefa(${index})" />
        <p>${item.tarefa}</p>
        <img src="assets/trash.png" alt="Tarefa para o lixo" onclick="deletarItem(${index})" />
      </li>
    `;
  });

  listaCompleta.innerHTML = novaLi;

  localStorage.setItem("lista", JSON.stringify(minhaListaDeTarefas));
}

function concluirTarefa(index) {
  minhaListaDeTarefas[index].concluida = !minhaListaDeTarefas[index].concluida;

  mostrarTarefa();
}

function deletarItem(index) {
  minhaListaDeTarefas.splice(index, 1);

  mostrarTarefa();
}

function recarregarTarefas() {
  const tarefaDoLocalStorage = localStorage.getItem("lista");

  if (tarefaDoLocalStorage) {
    minhaListaDeTarefas = JSON.parse(tarefaDoLocalStorage);
  }

  mostrarTarefa();
}

recarregarTarefas();

button.addEventListener("click", adicionarNovaTarefa);

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    adicionarNovaTarefa();
  }
});
