const getPuzzle = async (wordCount) => {
    const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`)
    
    if (response.status === 200) {
        const data = await response.json()
        return data.puzzle
    } else {
        throw new Error('Unable to get puzzle')
    }
}

const getCountryDetails = async (countryCode) => {
    const response = await fetch('https://restcountries.eu/rest/v2/all')
    
    if (response.status === 200) {
        const data = await response.json()
        return data.find((country => country.alpha2Code === countryCode))
    } else {
        throw new Error('Unable to fetch country')
    }
}

const getLocation = async () => {
    const response = await fetch('//ipinfo.io/json?token=2ac3981b39ccbc')

    if (response.status === 200) {
        const data = await response.json()
        return data
    } else {
        throw new Error('Unable to fetch location')
    }
}

const getCurrentCountry = async () => {
    const location = await getLocation()
    return getCountryDetails(location.country)
}

export { getPuzzle as default }

// Old

// in fetch api we don't worry about ready state. it is going to resolve/reject whem it is ready for us
const getPuzzleOld = (wordCount) => {
    return fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`).then((response) => {
        if (response.status === 200) {
            return response.json()  // this returns a promise not JSON
        } else {
            throw new Error('Unable to fetch puzzle')  // trigers catch!
        }
    }).then((data) => {
        return data.puzzle
    })
}

const getCountryDetailsOld = (countryCode) => {
    return fetch(`https://restcountries.eu/rest/v2/all`).then((response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error('Unable to fetch country')
        }
    }).then((data) => {
        const countryName = data.find((country => country.alpha2Code === countryCode))
        return countryName.name
    })
}

const getLocationOld = () => {
    return fetch(`http://ipinfo.io/json?token=2ac3981b39ccbc`).then((response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error('Unable to fetch location')
        }
    })
}


// previous version:

// const getPuzzle = (wordCount) => new Promise((resolve, reject) => {
//     // making an HTTP request
//     const request = new XMLHttpRequest()

//     request.addEventListener('readystatechange', (e) => {
//         if (e.target.readyState === 4 && e.target.status === 200) {
//             const data = JSON.parse(e.target.responseText)
//             // we can't return data. returning from the wrong func- it will return to its parent: getPuzzle
//             // callback(undefined, data.puzzle)
//             resolve(data.puzzle)
//             console.log(data)
//         } else if (e.target.readyState === 4) {
//             reject('An error occoued')
//             // callback('An error occoued', undefined)
//         }
//     })

//     request.open('GET', `http://puzzle.mead.io/puzzle?wordCount=${wordCount}`)
//     request.send()
// })


// const getCountryDetails = (countryCode) => new Promise((resolve, reject) => {
//     const newReq = new XMLHttpRequest()

//     newReq.addEventListener('readystatechange', (e) => {
//         if (e.target.readyState === 4 && e.target.status === 200) {
//             const data = JSON.parse(e.target.responseText)
//             const countryName = data.find((country => country.alpha2Code === countryCode))
//             // callback(undefined, countryName.name)
//             resolve(countryName.name)
//         } else if (e.target.readyState === 4) {
//             // callback('Unable to fetch')
//             reject('Unable to fetch')
//         }
//     })

//     newReq.open('GET', 'https://restcountries.eu/rest/v2/all')
//     newReq.send()
// }) 