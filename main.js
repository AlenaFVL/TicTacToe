const area = document.getElementById('area');
let count = 0;
let winner = '';
let circle = `<svg class="circle">
<circle r="30" cx="45" cy="45" stroke="#C923DD" stroke-width="15" fill="none" stroke-linecap="round" />
</svg>`;
let cross = `<svg class="cross">
<line class="first" x1="13" y1="13" x2="77" y2="77" stroke="#80E1FF" stroke-width="15" stroke-linecap="round" />
<line class="second" x1="77" y1="13" x2="13" y2="77" stroke="#80E1FF" stroke-width="15" stroke-linecap="round" />
</svg>`;

const content = document.getElementById('content');
const presentWinner = document.getElementById('present-winner');
const overlay = document.getElementById('overlay');
const newGame = document.getElementById('new-game');

area.addEventListener('click', e => {
    if( e.target.className = 'box') {
        if(count % 2 === 0 ) {
            e.target.innerHTML = cross
            e.target.classList.add('X');
            let crossAudio = new Audio('./resources/cross.mp3');
            crossAudio.play();
           } else {
              e.target.innerHTML = circle;
              e.target.classList.add('O');
              let circleAudio = new Audio('./resources/zero.mp3');
              circleAudio.play();
           }
        count++;
        checkWinner();
    }
})

const checkWinner = () => {
    const box = document.getElementsByClassName('box');
    const winnerPositions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for (let i = 0; i < winnerPositions.length; i++ ) {
        if( box[winnerPositions[i][0]].classList.contains('X') && 
            box[winnerPositions[i][1]].classList.contains('X') &&
            box[winnerPositions[i][2]].classList.contains('X')) {
                winner = 'Crosses';
                showingResult(winner);
            } else if (box[winnerPositions[i][0]].classList.contains('O') &&
                       box[winnerPositions[i][1]].classList.contains('O') &&
                       box[winnerPositions[i][2]].classList.contains('O')) {
                        winner = 'Zeros';
                        showingResult(winner);
                       } else if(count == 9) {
                        winner = 0;
                        showingResult(winner);
                       }
    }
}

const showingResult = w => {
    if (w === 0) {
        content.innerHTML = 'Unfortunately, nobody won 	&#128542';
    } else {
        content.innerHTML = `Congratulations! ${w} won! &#128522`;
    }
  presentWinner.style.display = 'block';

}

const closeWindow = () => {
    presentWinner.style.display = 'none';
    location.reload();
}

overlay.addEventListener('click', closeWindow);
newGame.addEventListener('click', closeWindow);
