/**
 * Created by feldtsen on 2017-04-21.
 */

class App extends React.Component {

    constructor(props){
        super(props);
        //binding
        this.addTodo = this.addTodo.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.handleUpdateTextChange = this.handleUpdateTextChange.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this.makeEditable = this.makeEditable.bind(this);
        //state
        this.state = {
            todos: [],
            newText: '',
            updatedText: ''
        }
    }

    handleAdd(){
        this.addTodo({edit: false, text:this.state.newText, date: new Date().toISOString().substring(0, 10)});
        this.setState({newText: ''});
    }

    addTodo(newObject){
        this.setState({todos: this.state.todos.concat([newObject])});
    }

    handleTextChange(e) {
        this.setState({newText: e.target.value});
    }
    handleUpdateTextChange(e){
        this.setState({updatedText: e.target.value});
    }
    deleteTodo(i) {
        this.state.todos.splice(i, 1);
        this.setState({todos: this.state.todos})
    }
    editTodo(i){
        this.state.todos[i].text = this.state.updatedText;
        this.state.todos[i].edit = false;
        this.setState(this.state);

    }
    makeEditable(i){
        this.state.todos.map(todo => todo.edit = false);
        this.state.todos[i].edit = true;
        let text = this.state.todos[i].text;
        this.setState({updatedText: text});
    }
    render (){
        return(
            <div>
                <h1>To do, or not to do</h1>
                <AddTodo handleAdd={this.handleAdd}  handleChange={this.handleTextChange}/>
                <Todos todos={this.state.todos} deleteTodo={this.deleteTodo} handleUpdateTextChange={this.handleUpdateTextChange} editTodo={this.editTodo} makeEditable={this.makeEditable}/>
            </div>
        );
    }
}
class AddTodo extends React.Component {
    constructor(){
        super();
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleKeyPress (e) {
        if (e.key === 'Enter') this.handleClick();
    }
    handleClick(){
        this.props.handleAdd();
        this.textInput.value = '';
        this.textInput.focus();
    }

    render(){
        return (
            <div className="addContainer">
                <input  type="text" placeholder="Add your to do"  ref={(input) => { this.textInput = input; }} onChange={this.props.handleChange} onKeyPress={this.handleKeyPress}/>
                <button onClick={this.handleClick}>Add</button>
            </div>
        )

    }
}
class Todos extends React.Component {
    render(){
        const todos = this.props.todos.map((todo, i)=> {return !todo.edit ? (<li key={i}>
            <span>{todo.date}: {todo.text}</span>
            <RemoveTodo deleteTodo={this.props.deleteTodo} index={i}/>
            <EditTodo makeEditable={this.props.makeEditable} index={i}/>
        </li>):
            <EditTodo key={i} editable={todo.edit} editTodoAction={this.props.editTodo} index={i} textContent={todo.text} handleUpdateTextChange={this.props.handleUpdateTextChange}/>});

        return <ul>{todos}</ul>
    }
}
class RemoveTodo extends React.Component {
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.deleteTodo(this.props.index);
    }
    render(){
        return <button onClick={this.handleClick}>Delete</button>
    }
}
class EditTodo extends React.Component {
    constructor(){
        super();
        this.handleChangeClick = this.handleChangeClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    handleChangeClick(){
        this.props.editTodoAction(this.props.index);
    }
    handleKeyPress (e) {
        if (e.key === 'Enter') this.handleChangeClick();
    }
    handleEditClick(){
        this.props.makeEditable(this.props.index);
    }
    render(){
        return this.props.editable ?
            <li><input type="text"  defaultValue={this.props.textContent}  placeholder="Edit to do" onChange={this.props.handleUpdateTextChange} onKeyPress={this.handleKeyPress}/>
                <button onClick={this.handleChangeClick}>Save</button></li>:
            <button onClick={this.handleEditClick}>Edit</button>
    }
}
ReactDOM.render(<App/>, document.getElementById('root'));