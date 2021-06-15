class Hangman {
    constructor(word, remainingGuesses) {
        this.word = word.toLowerCase().split('')
        this.remainingGuesses = remainingGuesses
        this.guessedLetters = []
        this.status = 'Playing'
    }

    setStatus() {
        const finished = this.word.every((letter => this.guessedLetters.includes(letter) || letter === ' '))

        if (this.remainingGuesses === 0) {
            this.status = 'Failed'
        } else if (finished) { 
            this.status = 'Finished'
        } else {
            this.status = 'Playing'
        }
    }

    get puzzle() {
        let puzzle = ''

        this.word.forEach(letter => {
            if (this.guessedLetters.includes(letter) || letter === ' ') {
                puzzle += letter
            } else {
                puzzle += '*'
            }
        });

        return puzzle
    }

    makeAGuess(letter) {
        if (this.remainingGuesses > 0) {
            letter = letter.toLowerCase()
            const isUnique = !this.guessedLetters.includes(letter)
            const isBadGuess = !this.word.includes(letter) 
        
            if (isUnique) {
                this.guessedLetters = [...this.guessedLetters, letter]
            }
        
            if (isUnique && isBadGuess) {
                this.remainingGuesses--
            }
        
            this.setStatus()
        }
    }

    get message() {
        if (this.status === 'Playing') {
            return `Guesses left: ${this.remainingGuesses}`
        } else if (this.status === 'Failed') {
            return `Nice try! The word was "${this.word.join('')}".`
        } else if (this.status === 'Finished') {
            return `Great work! You guessed the word.`
        }
    }

}

// if a file needs to export only one big thing- default export
export { Hangman as default }


    // 1.
    // const outOfGuesses = this.remainingGuesses === 0
    // let numOfLettersGuessed = 0
    
    // this.word.forEach(letter => {
    //     if (this.guessedLetters.includes(letter)) {
    //         numOfLettersGuessed++
    //     }
    // })

    // if (numOfLettersGuessed === this.word.length && !outOfGuesses) {
    //     this.status = 'Finished'
    // }

    // if (outOfGuesses && numOfLettersGuessed < this.word.length) {
    //     this.status = 'Failed'
    // }

    // ------------------

    //2.
    // let finished = true

    // this.word.forEach((letter) => {
    //     if (this.guessedLetters.includes(letter)) {

    //     } else {
    //         finished = false
    //     }
    // })

    // 3.
    // const lettersUnguessed = this.word.filter((letter => {
    //     return !this.guessedLetters.includes(letter)
    // }))

    // const finished = lettersUnguessed.length === 0

    // every() returns true only if every single item in the array passes the function