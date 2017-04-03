window.addEventListener('load', e => {
    let menuButton = document.getElementById('menuButton')
        , menuOptions = document.getElementsByClassName('menuOption')
        , pageContent = document.getElementsByClassName('pageContent')
        , projectsContainer = document.getElementById('projects')
        , pagestatus = false
        , hideMe = true
        , currentPage, menuStatus = false;
    let projectsObj = {
        paperstack: {
            title: `Paperstack`
            , image: `paperstack/cover.jpg`
            , description: `Paperstack something something`
            , path: `paperstack/`
        }
        , aTaleUntold: {
            title: `A Tale Untold`
            , image: `ataleuntold/cover.jpg`
            , description: `A Tale Untold something something`
            , path: `ataleuntold/`
        }
        , patatapClone: {
            title: `Patatap Clone`
            , image: `patatapclone/cover.jpg`
            , description: `patatap something something`
            , path: `patatapclone/`
        }
        , hueHunch: {
            title: `Hue Hunch`
            , image: `huehunch/cover.jpg`
            , description: `Hue hunch something something`
            , path: `huehunch/`
        }
        , jQueryTodo: {
            title: `jQuery todo list`
            , image: `jquerytodo/cover.jpg`
            , description: `jQuery todo something something`
            , path: `jquerytodo/`
        }
        , writeline: {
            title: `Writeline`
            , image: `writeline/cover.jpg`
            , description: `Writeline something something`
            , path: `writeline/`
        }
        , facile: {
            title: `Facile`
            , image: `facile/cover.jpg`
            , description: `Facile something something`
            , path: `facile/`
        }
    }
    addProject(projectsObj);
    menuButton.addEventListener('click', e => {
        menuToggle(!menuStatus);
        projectsContainer.classList.add(`toggleHidden`);
        if (pagestatus) {
            menuOptions[currentPage].classList.toggle('activePage');
            pagestatus = false;
            menuOptions[currentPage].classList.remove('pageContentActive');
        }
        else {
            document.getElementsByClassName('pages')[0].classList.toggle('active');
        }
        if (hideMe) {
            projectsContainer.classList.add(`toggleHidden`);
        }
    });
    for (let i = 0; i < menuOptions.length; i++) {
        menuOptions[i].addEventListener('click', e => {
            menuOptions[i].classList.add('activePage');
            currentPage = i;
            if(currentPage == '0')projectsContainer.classList.remove(`toggleHidden`);
            if (!pagestatus) {
                menuOptions[i].classList.add('pageContentActive');
                menuToggle(menuStatus, true);
            }
            pagestatus = true;
        });
    }

    function menuToggle(x, y) {
        if (x && !y) {
            menuButton.innerHTML = `<i class="fa fa-times" aria-hidden="true"></i>`;
        }
        else if (y) {
            menuButton.innerHTML = `<i class="fa fa-arrow-left" aria-hidden="true"></i>`;
        }
        else {
            menuButton.innerHTML = `<i class="fa fa-bars" aria-hidden="true"></i>`;
        }
        menuStatus = !menuStatus;
    }

    function addProject(projects) {
        for (let project in projects) {
            let current = projects[project]
                , liProject = document.createElement('li');
            liProject.innerHTML = (`
                <a href="${current.path}"><img src="${current.image}" alt="cover image for project"></a>
                <h1>${current.title}</h1>
                <p>${current.description}</p>
                <a href="${current.path}" target="_blank">Live</a>
            `);
            projectsContainer.appendChild(liProject);
        }
    }
});
/*
<i class="fa fa-bars" aria-hidden="true"></i>
*/