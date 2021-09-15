import Button from './button'


const header = ({title , onAdd , showAdd}) => {
    const onClick = () =>{
      console.log("click");
    }

    return (
      <header className = "header">
        <h1>{title}</h1>
        <Button color = {showAdd ? "red" : "green"} text = {showAdd ? "close " : "Add"} onClick ={onAdd}/>
      </header>
    )
}

header.defaultProps = {
  title : "Task Tracker"
}




export default header
