// Função para adicionar uma nova tarefa
function adicionartarefa() {
    let input = document.getElementById("taskInput");
    let task = input.value;
    if (task.trim() !== "") {
        let ul = document.getElementById("taskList");
        let li = document.createElement("li");
        li.innerHTML = "<input type='checkbox' onchange='toggleTask(this)'>&nbsp;<span ondblclick='editartarefa(this)'>" + task + "</span>&nbsp;";
        ul.appendChild(li);
        input.value = "";

        // Salvando tarefa no local storage
        salvartarefa();
    }
}

// Função para salvar tarefas no local storage
function salvartarefa() {
    let tasks = [];
    let lis = document.querySelectorAll("#taskList li");
    lis.forEach(function(li) {
        tasks.push({
            content: li.querySelector('span').textContent,
            completed: li.querySelector('input[type="checkbox"]').checked
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Função para carregar tarefas do local storage
function carregarTarefa() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        let ul = document.getElementById("taskList");
        tasks.forEach(function(task) {
            let li = document.createElement("li");
            li.innerHTML = "<input type='checkbox' onchange='toggleTask(this)'>&nbsp;<span ondblclick='editartarefa(this)'></span>&nbsp;";
            li.querySelector('span').textContent = task.content;
            li.querySelector('input[type="checkbox"]').checked = task.completed;
            if (task.completed) {
                li.classList.add("completed");
            }
            ul.appendChild(li);
        });
    }
}

// Carregar tarefas quando a página é carregada
    window.onload = function() {
        carregarTarefa();
// Verificar se as tarefas estavam ocultas antes de recarregar a página
        let tarefasOcultas = JSON.parse(localStorage.getItem("tarefasOcultas"));
        if (tarefasOcultas && tarefasOcultas.length > 0){
            ocultartarefa();
        }
    };

// Função para marcar/desmarcar uma tarefa como concluída
function toggleTask(checkbox) {
    let li = checkbox.parentNode;
    if (checkbox.checked) {
        li.classList.add("completed");
    } else {
        li.classList.remove("completed");
    }
    salvartarefa(); // Salvar tarefas após mudança
}

// Função para ocultar tarefas concluídas
function ocultartarefa() {
        let lis = document.querySelectorAll("#taskList li.completed");
        lis.forEach(function(li, index) {
            li.style.display = "none";
            // Armazenar o índice da tarefa oculta no localStorage
            let tarefasOcultas = JSON.parse(localStorage.getItem("tarefasOcultas")) || [];
            if (!tarefasOcultas.includes(index)) {
                tarefasOcultas.push(index);
                localStorage.setItem("tarefasOcultas", JSON.stringify(tarefasOcultas));
            }
        });
    }

// Função para editar uma tarefa
function editartarefa(span) {
    let taskText = span.textContent.trim();
    let novotexto = prompt("Editar tarefa:", taskText);
    if (novotexto !== null) {
        span.textContent = novotexto;
        salvartarefa(); // Salvar tarefas após edição
    }
}
// Função para mostrar todas as tarefas
function mostrarTodasTarefas() {
    let lis = document.querySelectorAll("#taskList li");
    lis.forEach(function(li) {
        li.style.display = "block";
    });

    localStorage.removeItem("tarefasOcultas");
}