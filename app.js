const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello Express!');
});

app.get('/sum', (req, res) => {
    const a = parseInt(req.query.a)
    const b = parseInt(req.query.b)
    if (!a) {
        return res.status(400).send('Please provide a number');
    }
    if (!b) {
        return res.status(400).send('Please provide a number');
    }
    res.send(`The sum of ${a} and ${b} is ${a + b}`);
});


app.get('/cipher', (req, res) => {
    const text = req.query.text;
    const shift = parseInt(req.query.shift);
    if (!text) {
        return res.status(400).send('Please provide some text');
    }
    if (!shift) {
        return res.status(400).send('Please provide a number');
    }
    const newText = text
                    .split('')
                    .map(char => {
                        const charCode = char.charCodeAt(0)
                        const shifted = charCode + shift;
                        const newChar = String.fromCharCode(shifted)
                        return newChar
                    }).join('')
    res.send(newText);
})

app.get('/lotto', (req, res) => {
    const numbers = req.query.numbers
    const lotto = [];
    let count = 0;

    for(let i = 0; i < 6; i++) {
        const random = Math.floor((Math.random() * 20) + 1)
        lotto.push(random)
    }

    console.log('numbers', numbers)
    console.log('lotto', lotto)

    for(let i = 0; i < numbers.length; i++) {
        
        for(let j = 0; j < lotto.length; j++) {
            if (parseInt(numbers[i]) === lotto[j]) {
                count++;
                console.log(count)
            }
        }
    }

    if(count < 4) {
        res.send("Sorry, you lose")
    } else {
        res.send("Congratulations! You win $100!")
    }

    
})


app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});