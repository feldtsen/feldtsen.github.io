class App extends React.Component{
    constructor(props){
        super(props);
        //binding
        this.addOne = this.addOne.bind(this);
        //states
        this.state = {
            test: 0,
            message: "It is lower than 10"

        };
    }
    addOne(){
        this.setState({
            test: this.state.test +1
        });
    }
    render(){
        return(
          <section>
              <Test test={this.state.test} message={this.state.message}  addOne={this.addOne}/>
          </section>
        );
    }
}

class Test extends React.Component {
    render(){
        return(
            <div>
                <h1>Hello, stranger! Your number is: {this.props.test < 10  ? `It's lower than 10 (${this.props.test})`: `It's higher than 10 (${this.props.test})`}</h1>
                <button onClick={this.props.addOne}>Button</button>
            </div>
        );
    }


}


ReactDOM.render(<App/>, document.getElementById('root'));
