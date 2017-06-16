import React, { Component } from 'react';

import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            pages: [
                {title: 'Title One', description: '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, ' +
                'totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt ' +
                'explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur' +
                ' magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit ' +
                'amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat ' +
                'voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi ' +
                'consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem ' +
                'eum fugiat quo voluptas nulla pariatur?"'},
                {title: 'Title Two', description: '"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum ' +
                'deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui' +
                ' officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero ' +
                'tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda ' +
                'est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates' +
                ' repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores ' +
                'alias consequatur aut perferendis doloribus asperiores repellat."'}
                ],
            pageIndex: 0
        }
    }
    handlePageChange = (buttonStatus) => {
        console.log(this.state.pageIndex);
        buttonStatus ? this.setState({pageIndex: this.state.pageIndex + 1}) : this.setState({pageIndex: this.state.pageIndex - 1});
    };
  render() {
    return (
      <div className="app">
        <PageDisplayer data={this.state} handlePageChange={this.handlePageChange}/>
      </div>
    );
  }
}

class PageDisplayer extends React.Component {
    render(){
        return(
            <div>
                <PageContent content={this.props.data.pages[this.props.data.pageIndex]} action/>
                <ChangePage handlePageChange={this.props.handlePageChange}/>
            </div>
        );
    }
}


//page functionality
function PageContent (props) {
    return (
        <div>
            <h1>{props.content.title}</h1>
            <p>{props.content.description}</p>
        </div>
    );
}
function ChangePage (props) {
    const buttons = [
            {text: 'previous', action:()=> props.handlePageChange(false)},
            {text: 'next', action:()=> props.handlePageChange(true)}
        ],
    displayButtons = buttons.map((button, i)=> {return <button key={'buttonKey' + i} onClick={button.action}>{button.text}</button>});
    return(
        <div className="changePageButtons">
            {displayButtons}
        </div>
    );
}



export default App;
