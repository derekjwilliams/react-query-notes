const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = // 'mongodb://127.0.0.1:27017/testNoteApp'
  `mongodb+srv://fullstackopenmongo:${password}@freestackopencluster.dhyth5u.mongodb.net/testNoteApp?retryWrites=true&w=majority`
//  `mongodb+srv://fullstackopenmongo:${password}@freestackopencluster.dhyth5u.mongodb.net/noteApp?retryWrites=true&w=majority`

///mongodb+srv://<username>:<password>@freestackopencluster.dhyth5u.mongodb.net/?retryWrites=true&w=majority



mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
const note = new Note({
  content: 'HTML is Easy',
  important: true,
})

note.save().then(() => {
  console.log('note saved!')
  mongoose.connection.close()
})