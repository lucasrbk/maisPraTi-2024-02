import { createContext, useState } from "react" // Importa a função createContext, que é usada para criar um novo contexto, e useState, que permite gerenciar o estado local do componente

// Cria o contexto TodoContext, que será usado para compartilhar o estado da lista de tarefas (todos) e funções relacionadas entre os componentes
export const TodoContext = createContext()

// Define o componente TodoProvider, que encapsula o contexto e provê o estado e funções para seus componentes filhos
export const TodoProvider = ({children}) => {
    // Inicializa o estado 'todos' com um array contendo duas tarefas de exemplo
    // O estado será gerenciado com setTodos, que é a função para atualizar o estado
    const [todos, setTodos] = useState([
        { id: 1, task: 'Fazer as compras do mercado', completed: false }, // Tarefa 1, que ainda não foi concluída
        { id: 2, task: 'Passear com os cães', completed: true } // Tarefa 2, que já foi concluída
    ])

    // Função que adiciona uma nova tarefa à lista de 'todos'
    // Recebe a descrição da tarefa como parâmetro 'task' e atualiza o estado adicionando a nova tarefa ao array
    const addTodo = (task) => {
        setTodos([...todos, { id: Date.now(), task, completed:false }]) // Cria um novo objeto de tarefa com um id único usando Date.now(), a descrição 'task', e completed definido como false
    }

    // Função que remove uma tarefa da lista de 'todos' com base no id
    const removeTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id)) // Filtra a lista de tarefas, removendo a tarefa com o id correspondente
    }

    // Função que alterna o estado de conclusão de uma tarefa com base no id
    const toggleTodo = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo // Alterna o valor de 'completed' para a tarefa com o id correspondente
        ))
    }

    // Retorna o contexto Provider, que fornecerá o estado atual de 'todos' e as funções 'addTodo', 'removeTodo' e 'toggleTodo' para todos os componentes filhos
    return (
        // Renderiza os componentes filhos que estiverem dentro de TodoProvider, permitindo que eles acessem o contexto
        <TodoContext.Provider value={{ todos, addTodo, removeTodo, toggleTodo }}>
            {children} 
        </TodoContext.Provider>
    )
}