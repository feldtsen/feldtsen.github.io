import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './App.css';

injectTapEventPlugin();
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
                {
                    title: 'Widgify',
                    image: './pic/widgify.png',
                    description: 'Widgify makes the internet easy. ' +
                    'On this site we have gathered essential functions to keep you on track with the latest.',
                    used: ['Node.js', 'firebase', 'React.js', 'materialUI', 'API', 'SCRUM']
                },
                {
                    title: 'Chatnip',
                    image: './pic/chatnip.png',
                    description: 'Real-time chat',
                    used: ['firebase', 'Js', 'HTML5', 'CSS3']
                },
                {
                    title: 'Huehunch',
                    image: './pic/huehunch.png',
                    description: 'Can you pick the right RGB-color?',
                    used: ['Js', 'HTML5', 'CSS3']
                },
                {
                    title: 'Paperstack',
                    image: './pic/paperstack.png',
                    description: 'Perfect place to keep a list of your books.',
                    used: ['Crud', 'API', 'HTML5', 'Js']
                },
                {   title: 'Patatap clone',
                    image: './pic/patatapclone.png',
                    description: 'Do you feel the beat?',
                    used: ['Js libraries', 'HTML5', 'CSS3', 'Canvas']
                },
            ],
            projectsBottom: [
                {
                    title: 'Writeline',
                    image: './pic/writeline.png',
                    description: 'Draw geometric shapes.',
                    used: ['Js', 'Canvas', 'HTML5', 'CSS3']
                },
                {
                    title: 'Todo',
                    image: './pic/todo.png',
                    description: 'Be on track',
                    used: ['Js', 'jQuery', 'HTML5', 'CSS3']
                },
                {
                    title: 'Facile',
                    image: './pic/facile.png',
                    description: 'Webshop.',
                    used: ['HTML5', 'CSS3']
                },
                {
                    title: 'A tale untold',
                    image: './pic/ataleuntold.png',
                    description: 'Webshop for books.',
                    used: ['localStorage', 'CMS', 'Js', 'HTML', 'CSS3' ]
                },
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
            <ul style={{transform: `translateX(${-meta.location*100/meta.maxLocation}%)`, WebkitTransform: `translateX(${-meta.location*100/meta.maxLocation}%)`, MsTransform: `translateX(${-meta.location*100/meta.maxLocation}%)`,  marginLeft: meta.windowWidth}}>
                {
                    this.state.projectsTop.map((project, i )=> {
                        return(
                            <li key={project.title + i} style={{width: `${(meta.windowWidth*(this.state.projectsTop.length))/this.state.projectsTop.length}px`}}>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <ul className="used">
                                    {project.used.map((used, i)=>{return(
                                        <li key={used+i}>{used}</li>
                                    )})}
                                </ul>
                                <button style={{backgroundImage: `url(${project.image})`}}>+</button>
                            </li>
                        )
                    })
                }
            </ul>
            <ul style={{transform: `translateX(${(-meta.location*100/meta.maxLocation)/2}%)`, WebkitTransform: `translateX(${(-meta.location*100/meta.maxLocation)/2}%)`, MsTransform: `translateX(${(-meta.location*100/meta.maxLocation)/2}%)`, marginLeft: meta.windowWidth}}>
                {
                    this.state.projectsBottom.map((project, i) => {
                        return(
                            <li key={project + i} style={{width: `${(meta.windowWidth*(this.state.projectsTop.length / 2))/(this.state.projectsBottom.length)}px`}}>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <ul className="used">
                                    {project.used.map((used, i)=>{return(
                                        <li key={used+i}>{used}</li>
                                    )})}
                                </ul>
                                <button style={{backgroundImage:`url(${project.image})`}}>+</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div className="front" style={{width: meta.windowWidth}}>
                <h1>Feldtsen</h1>
            </div>
        </main>
        <div className="progressBar" style={{width: meta.windowWidth + 'px'}}>
            <div className="progress" style={{width: `${meta.location*100/meta.maxLocation}%`}}>
            </div>
        </div>

    </div>
    );
  }
}

