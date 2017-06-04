import React, { Component } from 'react';
import './App.css';
const wheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "wheel";

export default class App extends Component {
    constructor(){
        super();
        this.state = {
            meta: {
                location: 0,
                maxLocation: 150,
                touchMove: 0,
                windowHeight: window.innerHeight,
                windowWidth: window.innerWidth,
            },
            projectsTop: [
                {title: 'Widgify',
                image: './pic/widgify.png'},
                {title: 'Chatnip',
                image: './pic/chatnip.png'},
                {title: 'Huehunch',
                image: './pic/huehunch.png'},
                {title: 'Paperstack',
                image: './pic/paperstack.png'},
                {title: 'Patatap clone',
                image: './pic/patatapclone.png'},

            ],
            projectsBottom: [
                {title: 'Writeline',
                image: './pic/writeline.png'},
                {title: 'Todo',
                image: './pic/todo.png'},
                {title: 'Facile',
                image: './pic/facile.png'},
                {title: 'A tale untold',
                image: './pic/ataleuntold.png'},
            ]
        }
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
        let current = this.state.meta,
            yLocation = e.targetTouches[0].screenY;
        yLocation > current.touchMove ? current.location -- : current.location += 0.5;
        current.touchMove = yLocation;
        if(current.location < 0) current.location = 0;
        else if (current.location > current.maxLocation) current.location = current.maxLocation;
        this.pageTracker(current.location)
    };

    handleScroll=(e)=>{
        const direction = (e.detail<0 || e.wheelDelta>0) ? 1 : -1,
            current = this.state.meta;
        direction > 0 ? current.location-- : current.location += 0.5;
        if(current.location < 0) current.location = 0;
        else if (current.location > current.maxLocation) current.location = current.maxLocation;
        this.pageTracker(current.location);
    };

    handleKeydown = (e) =>{
        const key = e.keyCode,
            current = this.state.meta;
        if (key === 40  && current.location < current.maxLocation){
            current.location += 0.5;
            this.pageTracker(current.location);
        } else if (key === 38  && current.location > 0){
            current.location--;
            this.pageTracker(current.location);
        }
    };

    responsiveChecker = () => {
        const current = this.state.meta;
        current.windowWidth = window.innerWidth;
        current.windowHeight = window.innerHeight;
        this.setState({current});
    };

    pageTracker = (location) => {
        let current = this.state.meta;
        current.location = location;

        this.setState({current})
    };
    /*
     * style={{width: `${(this.state.meta.windowWidth/this.state.meta.maxLocation) * this.state.meta.location}px`}}
     * */

  render() {
      const meta = this.state.meta;
    return (
    <div style={{height: meta.windowHeight + 'px', width: (meta.windowWidth * this.state.projectsTop.length) +'px'}}>
        <p className='pageTracker'>{meta.location}</p>
        <main className="content" >
            <ul style={{transform: `translateX(${-meta.location*100/meta.maxLocation}%)`, marginLeft: meta.windowWidth}}>
                {
                    this.state.projectsTop.map((project, i )=> {
                        return(
                            <li key={project.title + i} style={{width: `${(meta.windowWidth*(this.state.projectsTop.length))/this.state.projectsTop.length}px`, backgroundImage: `url(${project.image})`}}>
                                <h1>{project.title}</h1>
                            </li>
                        )
                    })
                }
            </ul>
            <ul style={{transform: `translateX(${(-meta.location*100/meta.maxLocation)/2}%)`, marginLeft: meta.windowWidth}}>
                {
                    this.state.projectsBottom.map((project, i) => {
                        return(
                            <li key={project + i} style={{width: `${(meta.windowWidth*(this.state.projectsTop.length / 2))/(this.state.projectsBottom.length)}px`, backgroundImage: `url(${project.image})`}}>
                                <h1>{project.title}</h1>
                            </li>
                        )
                    })
                }
            </ul>
            <div className="end" style={{width: meta.windowWidth}}>

            </div>
        </main>
        <div className="progressBar" style={{width: meta.windowWidth + 'px'}}>
            <div className="progress" style={{width: `${meta.location*100/meta.maxLocation}%`}}> </div>
        </div>

    </div>
    );
  }
}

