"use strict";function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function _inherits(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),App=function(a){function b(a){_classCallCheck(this,b);var c=_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).call(this,a));return c.addTodo=c.addTodo.bind(c),c.handleAdd=c.handleAdd.bind(c),c.handleTextChange=c.handleTextChange.bind(c),c.deleteTodo=c.deleteTodo.bind(c),c.handleUpdateTextChange=c.handleUpdateTextChange.bind(c),c.editTodo=c.editTodo.bind(c),c.makeEditable=c.makeEditable.bind(c),c.state={todos:[],newText:"",updatedText:""},c}return _inherits(b,a),_createClass(b,[{key:"handleAdd",value:function(){this.addTodo({edit:!1,text:this.state.newText,date:(new Date).toISOString().substring(0,10)}),this.setState({newText:""})}},{key:"addTodo",value:function(b){this.setState({todos:this.state.todos.concat([b])})}},{key:"handleTextChange",value:function(b){this.setState({newText:b.target.value})}},{key:"handleUpdateTextChange",value:function(b){this.setState({updatedText:b.target.value})}},{key:"deleteTodo",value:function(b){this.state.todos.splice(b,1),this.setState({todos:this.state.todos})}},{key:"editTodo",value:function(b){this.state.todos[b].text=this.state.updatedText,this.state.todos[b].edit=!1,this.setState(this.state)}},{key:"makeEditable",value:function(b){this.state.todos.map(function(a){return a.edit=!1}),this.state.todos[b].edit=!0;var c=this.state.todos[b].text;this.setState({updatedText:c})}},{key:"render",value:function(){return React.createElement("div",null,React.createElement("h1",null,"To do, or not to do"),React.createElement(AddTodo,{handleAdd:this.handleAdd,handleChange:this.handleTextChange}),React.createElement(Todos,{todos:this.state.todos,deleteTodo:this.deleteTodo,handleUpdateTextChange:this.handleUpdateTextChange,editTodo:this.editTodo,makeEditable:this.makeEditable}))}}]),b}(React.Component),AddTodo=function(a){function b(){_classCallCheck(this,b);var a=_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).call(this));return a.handleKeyPress=a.handleKeyPress.bind(a),a.handleClick=a.handleClick.bind(a),a}return _inherits(b,a),_createClass(b,[{key:"handleKeyPress",value:function(b){"Enter"===b.key&&this.handleClick()}},{key:"handleClick",value:function(){this.props.handleAdd(),this.textInput.value="",this.textInput.focus()}},{key:"render",value:function(){var b=this;return React.createElement("div",{className:"addContainer"},React.createElement("input",{type:"text",placeholder:"Add your to do",ref:function(c){b.textInput=c},onChange:this.props.handleChange,onKeyPress:this.handleKeyPress}),React.createElement("button",{onClick:this.handleClick},"Add"))}}]),b}(React.Component),Todos=function(a){function b(){return _classCallCheck(this,b),_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).apply(this,arguments))}return _inherits(b,a),_createClass(b,[{key:"render",value:function(){var b=this,c=this.props.todos.map(function(a,c){return a.edit?React.createElement(EditTodo,{key:c,editable:a.edit,editTodoAction:b.props.editTodo,index:c,textContent:a.text,handleUpdateTextChange:b.props.handleUpdateTextChange}):React.createElement("li",{key:c},React.createElement("span",null,a.date,": ",a.text),React.createElement(RemoveTodo,{deleteTodo:b.props.deleteTodo,index:c}),React.createElement(EditTodo,{makeEditable:b.props.makeEditable,index:c}))});return React.createElement("ul",null,c)}}]),b}(React.Component),RemoveTodo=function(a){function b(){_classCallCheck(this,b);var a=_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).call(this));return a.handleClick=a.handleClick.bind(a),a}return _inherits(b,a),_createClass(b,[{key:"handleClick",value:function(){this.props.deleteTodo(this.props.index)}},{key:"render",value:function(){return React.createElement("button",{onClick:this.handleClick},"Delete")}}]),b}(React.Component),EditTodo=function(a){function b(){_classCallCheck(this,b);var a=_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).call(this));return a.handleChangeClick=a.handleChangeClick.bind(a),a.handleEditClick=a.handleEditClick.bind(a),a.handleKeyPress=a.handleKeyPress.bind(a),a}return _inherits(b,a),_createClass(b,[{key:"handleChangeClick",value:function(){this.props.editTodoAction(this.props.index)}},{key:"handleKeyPress",value:function(b){"Enter"===b.key&&this.handleChangeClick()}},{key:"handleEditClick",value:function(){this.props.makeEditable(this.props.index)}},{key:"render",value:function(){return this.props.editable?React.createElement("li",null,React.createElement("input",{type:"text",defaultValue:this.props.textContent,placeholder:"Edit to do",onChange:this.props.handleUpdateTextChange,onKeyPress:this.handleKeyPress}),React.createElement("button",{onClick:this.handleChangeClick},"Save")):React.createElement("button",{onClick:this.handleEditClick},"Edit")}}]),b}(React.Component);ReactDOM.render(React.createElement(App,null),document.getElementById("root"));
/* NOT COMPILED
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
*/