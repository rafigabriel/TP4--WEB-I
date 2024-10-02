let notes = [];

// Função para adicionar uma nova nota
function addNote() {
    const title = document.getElementById('note-title').value.trim();
    const content = document.getElementById('note-content').value.trim();
    const errorMessage = document.getElementById('error-message');
    
    // Verifica se os campos estão preenchidos
    if (title === "" || content === "") {
        errorMessage.innerText = "Preencha o título e o conteúdo da nota.";
        return;
    } else {
        errorMessage.innerText = "";  // Limpa a mensagem de erro se os campos estiverem preenchidos
    }

    // Adiciona a nota ao array
    notes.push({ title, content });
    
    // Limpa os campos de entrada
    document.getElementById('note-title').value = '';
    document.getElementById('note-content').value = '';
    document.getElementById('note-title').focus();  // Foca de volta no campo de título

    // Renderiza as notas na tela
    renderNotes();
}

// Função para renderizar as notas na tela
function renderNotes(filteredNotes = notes) {
    const noteContainer = document.getElementById('note-container');
    noteContainer.innerHTML = '';

    filteredNotes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        noteDiv.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <button onclick="removeNote(${index})">&times;</button>
        `;
        noteContainer.appendChild(noteDiv);
    });
}

// Função para remover uma nota
function removeNote(index) {
    notes.splice(index, 1);  // Remove a nota do array pelo índice
    renderNotes();  // Re-renderiza as notas
}

// Função de pesquisa para filtrar as notas
function searchNotes() {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredNotes = notes.filter(note => 
        note.title.toLowerCase().includes(query) || 
        note.content.toLowerCase().includes(query)
    );
    renderNotes(filteredNotes);
}
