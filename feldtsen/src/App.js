import React, { Component } from 'react';
import './App.css';

const wheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "wheel";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: 0,
            chapterOneHeight: 0,
            pageWidth: window.innerWidth,
            pageHeight: window.innerHeight,
            oneWidth: 70,
            oneHeight: 40,
            twoWidth: 30,
            twoHeight: 40,
            threeWidth: 50,
            threeHeight: 30,
            fourWidth: 50,
            fourHeight: 30,
            fiveWidth: 30,
            fiveHeight: 30,
            sixWidth: 70,
            sixHeight: 30,
        };
    }

    componentDidMount(){
        window.addEventListener(wheelevt, this.handleScroll, {passive: true});
        window.addEventListener("keydown", this.handleKeydown, {passive:true});
        window.addEventListener("resize", this.responsiveChecker);
    }

    componentWillUnmount(){
        window.removeEventListener(wheelevt, this.handleScroll);
        window.removeEventListener("keydown", this.handleKeydown);
        window.removeEventListener("resize", this.responsiveChecker);
    }

    handleScroll=(e)=>{
        const direction = (e.detail<0 || e.wheelDelta>0) ? 1 : -1,
            current = this.state;
        direction > 0 ? current.location-- : current.location++;
        if(current.location < 0) current.location = 0;
        else if (current.location > 300) current.location = 300;
        this.pageTracker(current.location);
    };

    handleKeydown = (e) =>{
        const key = e.keyCode;
        if (key === 40  && this.state.location < 300){
            const current = this.state;
            current.location++;
            this.pageTracker(current.location);
        } else if (key === 38  && this.state.location > 0){
            const current = this.state;
            current.location--;
            this.pageTracker(current.location);
        }
    };

    pageTracker = (currentLocation) =>{
        let current = this.state;
        current.location = currentLocation;
        if(currentLocation <= 70) {
            current.oneWidth = 70 - currentLocation;
            current.twoWidth =  30 + currentLocation;
        }
        if(currentLocation <= 50) {
            current.threeWidth = 50 + currentLocation;
            current.fourWidth = 50 - currentLocation;
        }
        if(currentLocation <= 30) {
            current.fiveWidth = 30 - currentLocation;
            current.sixWidth = 70 + currentLocation;
        }
        if(currentLocation >= 30 && currentLocation <= 60){
            current.threeHeight = currentLocation;
            current.fourHeight = currentLocation;
        }

        this.setState({current});

    };
    responsiveChecker = () => {
        this.setState({
            pageWidth: window.innerWidth,
            pageHeight: window.innerHeight
        });
    };

    render() {
        return (
          <div className="canvas" style={{width: this.state.pageWidth, height: this.state.pageHeight}}>
              <p className="tracker">{this.state.location}</p>
              <div className="mainContainer">
                  <div className='one' style={{width: `${this.state.oneWidth}%`, height: `${this.state.oneHeight}%`}}> </div>
                  <div className='two' style={{width: `${this.state.twoWidth}%`, height: `${this.state.twoHeight}%`}}> </div>
                  <div className='three' style={{width: `${this.state.threeWidth}%`, height: `${this.state.threeHeight}%`}}> </div>
                  <div className='four' style={{width: `${this.state.fourWidth}%`, height: `${this.state.fourHeight}%`}}> </div>
                  <div className='five' style={{width: `${this.state.fiveWidth}%`, height: `${this.state.fiveHeight}%`}}> </div>
                  <div className='six' style={{width: `${this.state.sixWidth}%`, height: `${this.state.sixHeight}%`}}> </div>
              </div>
          </div>
        );
    }
}



export default App;
