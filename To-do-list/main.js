// Array que armazena as tarefas
let tasks = [];

/**
 * Função para adicionar uma nova tarefa.
 * Captura o valor do campo de input, valida se não está vazio, adiciona a tarefa ao array, e atualiza a tela.
 */
const addTask = () => {
    const taskText = document.getElementById('new-task').value.trim();  // Captura e remove espaços extras
    if (!taskText) return alert("Por favor, insira uma tarefa.");  // Se o texto estiver vazio, exibe alerta e interrompe a função
    tasks.push({ text: taskText, completed: false });  // Adiciona a tarefa ao array com estado 'não concluído'
    document.getElementById('new-task').value = '';  // Limpa o campo de input
    renderTasks();  // Atualiza a lista de tarefas na tela
};

/**
 * Função para alternar o estado de conclusão da tarefa.
 * @param {number} index - Índice da tarefa no array 'tasks'.
 */
const toggleTaskCompletion = index => {
    tasks[index].completed = !tasks[index].completed;  // Inverte o valor de 'completed' (de false para true ou vice-versa)
    renderTasks();  // Atualiza a tela com a tarefa modificada
};

/**
 * Função para filtrar as tarefas com base no estado de conclusão.
 * @param {string} filter - Tipo de filtro ('all', 'completed', 'notCompleted').
 */
const filterTasks = filter => {
    // Filtra as tarefas com base no valor de 'filter'. Se for 'completed', exibe as concluídas, 
    // se for 'notCompleted', as não concluídas, senão exibe todas.
    const filteredTasks = filter === 'completed' 
        ? tasks.filter(task => task.completed)  // Filtra apenas as concluídas
        : filter === 'notCompleted' 
        ? tasks.filter(task => !task.completed)  // Filtra apenas as não concluídas
        : tasks;  // Se o filtro for 'all', mostra todas
    renderTasks(filteredTasks);  // Atualiza a lista com as tarefas filtradas
};

/**
 * Função para renderizar as tarefas na tela.
 * @param {Array} filteredTasks - Array contendo as tarefas a serem exibidas (pode ser filtrado ou todas as tarefas).
 */
const renderTasks = (filteredTasks = tasks) => {
    const taskList = document.getElementById('task-list');  // Captura o elemento onde as tarefas serão exibidas
    // Converte cada tarefa em um item de lista HTML (<li>) e une todas em uma única string
    taskList.innerHTML = filteredTasks.map((task, index) => 
        `<li class="${task.completed ? 'completed' : ''}">
            <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTaskCompletion(${index})">
            ${task.text}
        </li>`).join('');  // Se a tarefa estiver concluída, o checkbox é marcado e a classe 'completed' aplicada
    updateTaskCount();  // Atualiza a contagem de tarefas concluídas
};

/**
 * Função para atualizar o contador de tarefas concluídas.
 * Exibe a quantidade de tarefas concluídas e o total de tarefas.
 */
const updateTaskCount = () => {
    const completedTasks = tasks.filter(task => task.completed).length;  // Conta quantas tarefas estão concluídas
    document.getElementById('task-count').innerText = `Total: ${completedTasks} de ${tasks.length} concluídas`;  // Exibe a contagem
};

