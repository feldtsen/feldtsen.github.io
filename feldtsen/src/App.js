import React, { Component } from 'react';
import './App.css';

const wheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "wheel";

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: 0,
            maxLocation: 150,
            animationPoints: 0,
            letterArray: ['f', 'e', 'l' , 'd' , 't', 's' ,'e', 'n'],
            numberArray: [.7, .3, 1, .8, .7, 1, .2, .8],
            currentPage: 1,
            touchMove: 0,
            pageStyle: {
                width: window.innerWidth,
                height: window.innerHeight,
                classNameMain: 'intro',
                classNameContent: 'introContent',
                classNameBar: 'introBar',
                progress: 100/3
            }
        };
    }

    componentDidMount(){
        window.addEventListener(wheelevt, this.handleScroll, {passive: true});
        window.addEventListener("keydown", this.handleKeydown, {passive:true});
        window.addEventListener("resize", this.responsiveChecker);
        window.addEventListener("touchmove", this.handleMove, {passive:true});
    }

    componentWillUnmount(){
        window.removeEventListener(wheelevt, this.handleScroll);
        window.removeEventListener("keydown", this.handleKeydown);
        window.removeEventListener("resize", this.responsiveChecker);
        window.removeEventListener("touchmove", this.handleMove);
    }

    handleMove = (e) => {
        let current = this.state;
        let yLocation = e.targetTouches[0].screenY;
        console.log(yLocation);
        yLocation > current.touchMove ? current.location ++ : current.location --;
        current.touchMove = yLocation;
        if(current.location < 0) current.location = 0;
        else if (current.location > this.state.maxLocation) current.location = this.state.maxLocation;
        this.pageTracker(current.location)
    };

    handleScroll=(e)=>{
        const direction = (e.detail<0 || e.wheelDelta>0) ? 1 : -1,
            current = this.state;
        direction > 0 ? current.location-- : current.location++;
        if(current.location < 0) current.location = 0;
        else if (current.location > this.state.maxLocation) current.location = this.state.maxLocation;
        this.pageTracker(current.location);
    };

    handleKeydown = (e) =>{
        const key = e.keyCode;
        if (key === 40  && this.state.location < this.state.maxLocation){
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
        this.animationPointsTracker(currentLocation);
        this.displayTracker(currentLocation);
        this.setState({current});

    };


    displayTracker = (currentLocation) => {
        let current = this.state;
        switch (currentLocation) {
            case 49:
                if(current.pageStyle.classNameMain !== 'intro') {
                    current.currentPage = 1;
                    current.pageStyle.classNameMain = 'intro';
                    current.pageStyle.classNameContent = 'introContent';
                    current.pageStyle.classNameBar = 'introBar';
                    current.pageStyle.progress = 100/3;
                    this.sliceLettersToArray('feldtsen');
                }
                break;
            case 50:
                if(current.pageStyle.classNameMain !== 'projects'){
                    current.currentPage = 2;
                    current.pageStyle.classNameMain = 'projects';
                    current.pageStyle.classNameContent = 'projectsContent';
                    current.pageStyle.classNameBar = 'projectsBar';
                    current.pageStyle.progress = ((this.state.location + 50)*100) / this.state.maxLocation;
                    this.sliceLettersToArray('projects');
                }

                break;
            case 99:
                if(current.pageStyle.classNameMain !== 'projects'){
                    current.currentPage = 2;
                    current.pageStyle.classNameMain = 'projects';
                    current.pageStyle.classNameContent = 'projectsContent';
                    current.pageStyle.classNameBar = 'projectsBar';
                    current.pageStyle.progress = (this.state.location*100) / this.state.maxLocation;
                    this.sliceLettersToArray('projects');
                }

                break;
            case 100:
                if(current.pageStyle.classNameMain !== 'contact') {
                    current.currentPage = 3;
                    current.pageStyle.classNameMain = 'contact';
                    current.pageStyle.classNameContent = 'contactContent';
                    current.pageStyle.classNameBar = 'contactBar';
                    current.pageStyle.progress = 100;
                    this.sliceLettersToArray('contact');
                }
                break;
            default:
                break;
        }
    };

    animationPointsTracker = (currentLocation) => {
        let current = this.state;
        if(currentLocation >= 0 && currentLocation <= 50){
            current.animationPoints = currentLocation;
        }
        if (currentLocation >= 50 && currentLocation <= 100) {
            current.animationPoints = currentLocation - 50;
        }
        if (currentLocation >= 100){
            current.animationPoints = currentLocation - 100;
        }
    };

    responsiveChecker = () => {
        const current = this.state;
        current.pageStyle.width = window.innerWidth;
        current.pageStyle.height = window.innerHeight;
        this.setState({current});
    };
    sliceLettersToArray = (string) => {
        let stringToArray = string.split(''), newNumberArray = [], current = this.state;
        for(let i = 0; i<string.length; i++) newNumberArray.push(Math.random());
        current.letterArray = stringToArray;
        current.numberArray = newNumberArray;
    };

    render() {
        return (
          <div className="canvas" >
              <p className="tracker">{this.state.location} / {this.state.maxLocation}</p>
              <main className={this.state.pageStyle.classNameMain} style={{width: `${this.state.pageStyle.width}px`,
                  height: `${this.state.pageStyle.height}px`,
                  }}>

                  <div className={this.state.pageStyle.classNameContent} style={{width: `${this.state.pageStyle.width * 0.95}px`,
                      height: `${this.state.pageStyle.height}px`,
                  }}>
                      <h1>
                          {
                              this.state.letterArray.map((letter, i)=>{return <span key={letter + i} style={{
                                  transform: `translateY(${(this.state.animationPoints * this.state.numberArray[i])/2}px)`
                              }}>{letter}</span>})
                          }
                      </h1>
                  </div>
                  <div className="progress" style={{
                      width: `${this.state.pageStyle.width * 0.05}px`,
                      height: `${this.state.pageStyle.height}px`,
                  }}>
                        <div className={this.state.pageStyle.classNameBar} style={{height: `${this.state.pageStyle.progress}%`}}>
                            <div>
                                <h3>{this.state.currentPage}</h3>
                                <h3>/</h3>
                                <h3>3</h3>
                            </div>
                        </div>
                  </div>

              </main>
          </div>
        );
    }
}


// style={{height: `${(this.state.location*100) / this.state.maxLocation}%`}}


