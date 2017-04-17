class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000); //tick each second
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }


    // Sets new system time
    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <section className="clock">
                <h1>System time {this.state.date.toLocaleTimeString()}</h1>
            </section>
        );

    }
}
class Duplication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            duplicate: ``
        };
        this.copyMe = this.copyMe.bind(this);
    }
    // Duplicates the input from user
    copyMe(e) {
        this.setState({
            duplicate: e.target.value
        })
    }
    render() {
        return (
            <section className="duplication">
                <input type="text" onKeyUp={this.copyMe} />
                <p>{this.state.duplicate}</p>
            </section>
        );

    }
}
class DoMath extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstInput: 0,
            secondInput: 0,
            operation: '+'
        };
        this.inputOne = this.inputOne.bind(this);
        this.inputTwo = this.inputTwo.bind(this);
        this.currentOperation = this.currentOperation.bind(this);
    }
    //Doing easy math
    inputOne(e){
        this.setState({
            firstInput: Number(e.target.value)
        })
    }
    inputTwo(e){
        this.setState({
            secondInput: Number(e.target.value)
        })
    }

    currentOperation(e){
        if(e.target.value === '+' || e.target.value === '-' || e.target.value === '/' || e.target.value === '*'){
            this.setState({
                operation: e.target.value
            })
        }
    }
    render() {
        let operators = {
                '+': (a, b)=> {return a + b},
                '-': (a, b)=> {return a - b},
                '*': (a, b)=> {return a * b},
                '/': (a, b)=> {return a / b},
                '': () => {return 0}
            },
            op = this.state.operation,
            result = Number(operators[op](this.state.firstInput, this.state.secondInput));

        return (
            <section className="doMath">
                <input type="number" onChange={this.inputOne}/>
                <select name="operations" onChange={this.currentOperation}>
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="*">*</option>
                    <option value="/">/</option>
                </select>
                <input type="number" onChange={this.inputTwo}/>
                <input type="number" value={result} disabled/>
            </section>
        );
    }

}
class SelectMe extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            valueOne: 0,
            valueTwo: 0,
            valueThree: 0,
            msg: ''
        };
        this.checkCount = this.checkCount.bind(this);
    }

    checkCount(buttons){
        let highest = 0,
        styleMe;
        buttons.map( button=>{
            if(button.count > highest) {
                highest = button.count;
                styleMe = button;
            }
        });
        return styleMe;
    }

    render(){
        const buttons = [
            {
                count: this.state.valueOne,
                action: () => this.setState({valueOne: this.state.valueOne + 1, msg: 'First button clicked'}),
                setStyle: {color: 'black'}
                },
            {
                count: this.state.valueTwo,
                action:  () => this.setState({valueTwo: this.state.valueTwo + 1, msg: 'Second button clicked'}),
                setStyle: {color: 'black'}
            },
            {
                count: this.state.valueThree,
                action:  () => this.setState({valueThree: this.state.valueThree + 1, msg: 'Third button clicked'}),
                setStyle:  {color: 'black'}
            }
        ],
        selectedButton = this.checkCount(buttons),
        renderedButtons =  buttons.map(b => {
            return <div><button onClick={b.action} style={b.setStyle}>Clicked {b.count} times</button></div>;
        });
        if(selectedButton)selectedButton.setStyle.color = 'red';

        return (
            <section className="selectMe">
                {renderedButtons}
                <p>{this.state.msg}</p>
            </section>
        );
    }
}
function Setup() {
    return(
    <div className="appContainer">
        <Clock/>
        <Duplication/>
        <DoMath/>
        <SelectMe/>
    </div>
    );
}
ReactDOM.render(<Setup />, document.getElementById('root'));

