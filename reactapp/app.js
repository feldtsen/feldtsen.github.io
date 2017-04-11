

class Place extends React.Component {
    constructor(props) {
        super(props);
        this.state = {myProperty: 2};
    }

    myMethod(e){
        this.setState({myProperty: 5});
    }

    render() {
        return <span onClick={myMethod}>Värdet är {this.state.myProperty}</span>;
    }
}


ReactDOM.render( <Place />, document.getElementById('root'));
