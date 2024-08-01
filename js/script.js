let squares = []
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d')
const person = new Image();
// person.src = '../images/person.gif'
person.src = './images/person.gif'
const personReverse = new Image()
// personReverse.src = '../images/person reverse.gif'
personReverse.src = './images/person reverse.gif'

person.onload = function() {
    ctx.drawImage(person, 0, 645);
};

let personX = 0

document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'd':
            ctx.clearRect(personX, 645, 40, 84);
            personX += 10;
            ctx.drawImage(person, personX, 645);
            break;
        case 'a': 
            ctx.clearRect(personX, 645, 40, 84);
            personX -= 10;
            ctx.drawImage(personReverse, personX, 645);
            break;
    }
})

class Rain {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    newObj() {
        this.x = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;

        let newArray = {
            square: {
                x: this.x,
                y: 0
            }
        }
        squares.push(newArray)
    }
    fall() {
        for (let i = 0; i < squares.length; i++) {
            ctx.clearRect(squares[i].square.x, squares[i].square.y, 50, 50);
            squares[i].square.y += 10;
            ctx.fillRect(squares[i].square.x, squares[i].square.y, 50, 50);
            ctx.fill()
            if (squares[i].square.y > 735) {
                squares.splice(i, 1)
            }
        }
    }

}

let seconds = 0;
let minutes = 0;
let check


const v = new Rain(-60, 0);

function interFunc() {
    setInterval(() => {
        v.newObj();
        if (seconds > 59) {
            seconds = 0;
            minutes++;
            check = ` Ваше время : ${minutes} минут, ${seconds} секунд`
        }
        else if (seconds < 59) {
            check = ` Ваше время : ${seconds} секунд`
        }
        seconds++;
    }, 1000)
}
interFunc();

let fallInterval = setInterval(() => {
    v.fall();
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].square.y + 50 >= 645 && squares[i].square.x < personX + 40 && squares[i].square.x + 50 > personX) {
            alert(`Игра окончена.` + check)
            // window.location.reload();
            clearInterval(fallInterval);
        }
    }
}, 90)