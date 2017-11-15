export const request = {
  loaded: false,
  loading: true,
  error: false
}

export const success = {
  loaded: true,
  loading: false,
  error: false
}

export const error = {
  loaded: true,
  loading: false,
  error: true
}

export const sampleData = {
  decks: {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
}

export const pluralise = (count, noun) => count === 1 ? noun : `${noun}s`