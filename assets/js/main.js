function createTask() {



const inputTarefa = document.querySelector('.input-tarefa'); 
const btnTarefa = document.querySelector('.btn-tarefa'); 
const tarefas = document.querySelector('.tarefas'); 

function criaLi() { 
    const liElement = document.createElement('li'); 
    return liElement; 
}


function limpaInput () { 
    inputTarefa.value = ''; 
    inputTarefa.focus();  
}

function criaBotaoApagar(li) {
    li.innerText += ' '; 
    const botaoApagar = document.createElement('button'); 
    botaoApagar.innerText = 'X'; 
    botaoApagar.setAttribute('class', 'apagar') 
    botaoApagar.setAttribute('title', 'apagar Essa Tarefa') 
    li.appendChild(botaoApagar); 
}

function criaTarefa(textoInput) { 
    const liElement = criaLi(); 
    liElement.innerText = textoInput 
    tarefas.appendChild(liElement); 
    limpaInput(); 
    criaBotaoApagar(liElement) 
    salvarTarefas(); 
}

function salvarTarefas() { 
    const tarefasLi = tarefas.querySelectorAll('li'); 
    const listaDeTarefas = []; 

    for(let tarefa of tarefasLi) { 
        let tarefaTexto = tarefa.innerText; 
        tarefaTexto = tarefaTexto.replace('X', '').trim();  
        listaDeTarefas.push(tarefaTexto); 
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

inputTarefa.addEventListener('keypress', function (e) { 
    if (e.keyCode === 13) { 
        if (!inputTarefa.value) return alert('Digite uma tarefa'); 
        criaTarefa(inputTarefa.value) 
    }
})

btnTarefa.addEventListener('click', function (e) { 
    e.preventDefault(); 

    if (!inputTarefa.value) return alert('Digite uma tarefa'); 

    criaTarefa(inputTarefa.value) 
}); 

document.addEventListener('click', function(e) { 
    const element = e.target; 
    
    if(element.classList.contains('apagar')) { 
        element.parentElement.remove(); 
        salvarTarefas(); 
    }
})


function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    
    for(let tarefa of listaDeTarefas) {
        criaTarefa(tarefa)
    }
}
    adicionaTarefasSalvas();
}

createTask();