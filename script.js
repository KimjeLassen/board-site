const GRID_SIZE = 5;

function createGrid() {
    const grid = document.querySelector('.grid');
    grid.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 120px)`;
    grid.style.gridTemplateRows = `repeat(${GRID_SIZE}, 120px)`;
    for (let i = 1; i <= GRID_SIZE * GRID_SIZE; i++){
        const newElement = document.createElement("div");
        newElement.id = `square-${i}`;
        newElement.classList.add("square");
        
        grid.appendChild(newElement);

        if (i === 1) {
            newElement.classList.add("selected");
        }
        else 
        {
            const minCeiled = Math.ceil(1);
            const maxFloored = Math.floor(10);
            const percent = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
            if (percent === 1) {
                newElement.classList.add("rocks");
                const smallTriangle = document.createElement("div");
                smallTriangle.classList.add("triangle", "triangle-small");
                newElement.appendChild(smallTriangle);

                const mediumTriangle = document.createElement("div");
                mediumTriangle.classList.add("triangle", "triangle-medium");
                newElement.appendChild(mediumTriangle);

                const largeTriangle = document.createElement("div");
                largeTriangle.classList.add("triangle", "triangle-large");
                newElement.appendChild(largeTriangle);
            }

        }
    }
}
(createGrid)();

function drawColor() {
    const squares = document.querySelectorAll('.square');
    
    squares.forEach(square => {
        if (square.classList.contains('selected') && square.classList.contains('rocks'))
        {
            if (confirm('GAME OVER!'))
            {
                const grid = document.querySelector('.grid');
                grid.remove();
                const body = document.querySelector('body');
                const newGrid = document.createElement('div');
                newGrid.classList.add('grid');
                body.appendChild(newGrid);
                createGrid();
                drawColor();
            }
        }
        else if (square.classList.contains('selected')) {
            addTentSVG(square);
        }
        else {
            removeTentSVG(square);
        }
    });
}

function addTentSVG(square) {
    if (square.querySelector('.tent-svg')) return;
    
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 297 297");
    svg.setAttribute("class", "tent-svg");
    svg.style.width = "80px";
    svg.style.height = "80px";
    svg.style.position = "absolute";
    svg.style.top = "50%";
    svg.style.left = "50%";
    svg.style.transform = "translate(-50%, -50%)";
    svg.style.pointerEvents = "none";
    
    const g = document.createElementNS(svgNS, "g");
    
    const path1 = document.createElementNS(svgNS, "path");
    path1.setAttribute("d", "M295.431,225.622c-1.837-2.879-5.016-4.621-8.431-4.621H10c-3.415,0-6.594,1.742-8.431,4.621c-1.836,2.879-2.077,6.496-0.638,9.593l13,27.979c7.707,16.589,24.507,27.308,42.799,27.308h183.539c18.292,0,35.092-10.719,42.798-27.307l13.001-27.979C297.508,232.118,297.266,228.501,295.431,225.622z M264.93,254.767c-4.44,9.558-14.12,15.733-24.66,15.733H56.73c-10.54,0-20.22-6.176-24.661-15.734l-6.396-13.766h245.652L264.93,254.767z");
    path1.setAttribute("fill", "#333");
    
    const path2 = document.createElementNS(svgNS, "path");
    path2.setAttribute("d", "M16.5,208.001H165c5.522,0,10-4.478,10-10v-181.5c0-4.227-2.657-7.997-6.638-9.418c-3.981-1.42-8.425-0.186-11.102,3.086l-148.5,181.5c-2.447,2.99-2.952,7.123-1.298,10.614C9.118,205.775,12.636,208.001,16.5,208.001z M155,44.514v143.486H37.602L155,44.514z");
    path2.setAttribute("fill", "#333");
    
    const path3 = document.createElementNS(svgNS, "path");
    path3.setAttribute("d", "M198,208.001h82.5c3.4,0,6.567-1.728,8.408-4.586c1.84-2.858,2.103-6.457,0.695-9.552l-82.5-181.5c-1.947-4.287-6.62-6.633-11.221-5.636S188,11.794,188,16.501v181.5C188,203.523,192.477,208.001,198,208.001z M208,62.667l56.97,125.334H208V62.667z");
    path3.setAttribute("fill", "#333");
    
    g.appendChild(path1);
    g.appendChild(path2);
    g.appendChild(path3);
    svg.appendChild(g);
    
    square.appendChild(svg);
}

function removeTentSVG(square) {
    const tent = square.querySelector('.tent-svg');
    if (tent) {
        tent.remove();
    }
}
(drawColor)();

function moveLeft() {
    console.log("Move left")
    const square = document.querySelector('.selected');
    const id = parseInt(square.id.replace("square-", ""));

    if (id % GRID_SIZE === 1) {
        return;
    }

    const nextSquare = document.querySelector(`#square-${id - 1}`);
    square.classList.remove('selected');
    nextSquare.classList.add('selected');
    drawColor();
}

function moveRight() {
    console.log("Move right");
    const square = document.querySelector('.selected');
    const id = parseInt(square.id.replace("square-", ""));

    if (id % GRID_SIZE === 0) {
        return;
    }

    const nextSquare = document.querySelector(`#square-${id + 1}`);
    square.classList.remove('selected');
    nextSquare.classList.add('selected');
    drawColor();
}

function moveUp() {
    console.log("Move up");
    const square = document.querySelector('.selected');
    const id = parseInt(square.id.replace("square-", ""));

    if (id <= GRID_SIZE) {
        return;
    }

    const nextSquare = document.querySelector(`#square-${id - GRID_SIZE}`);
    square.classList.remove('selected');
    nextSquare.classList.add('selected');
    drawColor();
}

function moveDown() {
    console.log("Move down");
    const square = document.querySelector('.selected');
    const id = parseInt(square.id.replace("square-", ""));
    const totalSquares = document.querySelectorAll('.square').length;

    if (id > totalSquares - GRID_SIZE) {
        return;
    }

    const nextSquare = document.querySelector(`#square-${id + GRID_SIZE}`);
    square.classList.remove('selected');
    nextSquare.classList.add('selected');
    drawColor();
}

const keyAction = {
    ArrowLeft: { keydown: moveLeft },
    ArrowRight: { keydown: moveRight },
    ArrowUp: { keydown: moveUp },
    ArrowDown: { keydown: moveDown }
}
const keyHandler = (ev) => {
    if (ev.repeat) return;
    if (!(ev.key in keyAction) || !(ev.type in keyAction[ev.key])) return;
    keyAction[ev.key][ev.type]();
};

['keydown', 'keyup'].forEach((evType) => {
    document.body.addEventListener(evType, keyHandler);
});
