class Test extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            test: 0
        };
    }

    render(){
        return(
            <div>
                <h1>Hello, World! {this.state.test}</h1>
            </div>
        );
    }
}

class Page extends React.Component{
    render(){
        return(
          <section>
              <Test/>
          </section>
        );
    }
}

ReactDOM.render(<Page/>, document.getElementById('root'));
