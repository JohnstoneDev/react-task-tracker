import {useState , useEffect} from 'react'
import Header from './components/Header.js'
import Tasks  from './components/Tasks.js'
import AddTask from './components/addTask.js'


function App() {
    const [showAddTask ,setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])

    useEffect( () =>{
     const getTasks = async () => {
         const tasksFromServer = await fetchTasks()
         setTasks(tasksFromServer)
     }
        
        getTasks()
    } , [])

    //Fetch Tasks 

    const fetchTasks = async ()=> {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()

        return data 
    }
  // Add Task 
   const addTask = async (task) =>{
       const res = await fetch('http://localhost:5000/tasks' , {
           method : 'POST',
           headers : {
               'Content-type' : "application/json"
           },
           body : JSON.stringify(task)
       })

       const data = await res.json()
       setTasks([...tasks, data])
      // const id = Math.floor(Math.random() * 10000) + 1
       //const newTask = {id,...task}
       //setTasks([...tasks,newTask])

   }

    //Delete task

    const deleteTask = async (id) =>{
        await fetch(`http://localhost:5000/tasks/${id}`,{
            method : 'DELETE',
        })


      setTasks(tasks.filter((task) => task.id !== id))
      console.log("deleted task")
    }

 // Toggle Reminder 

    const toggleReminder = (id) =>{
        setTasks(tasks.map( (task) => task.id === id ? {...task, reminder :!task.reminder} : task))
    }

  return (
    <div className="container">
        <Header onAdd ={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        {showAddTask && <AddTask onAdd = {addTask}/>}
        {tasks.length > 0 ? <Tasks tasks = {tasks} 
        onDelete = {deleteTask} onToggle ={toggleReminder}/> : "You Have No Tasks"}
    </div>
  );
}

export default App;