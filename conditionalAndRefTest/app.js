class App extends React.Component{
    constructor(props){
        super(props);
        //binding
        this.addOne = this.addOne.bind(this);
        this.removeOne = this.removeOne.bind(this);
        //states
        this.state = {
            test: 0
        };
    }
    addOne(){
        if (this.state.test < 20)this.setState({test: this.state.test +1});
    }
    removeOne(){
        if (this.state.test > 0) this.setState({test: this.state.test - 1});
    }
    render(){
        return(
          <section>
              <Test test={this.state.test} addOne={this.addOne} removeOne={this.removeOne}/>
          </section>
        );
    }
}

class Test extends React.Component {
    constructor(props){
        super(props);
        this.focusInput = this.focusInput.bind(this);
    }

    componentDidMount(){
        this.inputinput.value = 'mounted';
    }

    focusInput() {
        this.inputinput.focus();
        this.inputinput.select();
    }

    render(){
        let status;
        if (this.props.test === 10) status = `${this.props.test} = 10`;
        else status = this.props.test < 10  ? `${this.props.test} < 10`: `${this.props.test} > 10`;
        return(
            <div>
                <p>{status}</p>
                <button onClick={this.props.addOne}>+1</button>
                <button onClick={this.props.removeOne}>-1</button>
                <input type="text" ref={ input => {this.inputinput = input;} } />
                <button onClick={this.focusInput}>Focus input</button>
            </div>
        );
    }
}


ReactDOM.render(<App/>, document.getElementById('root'));
