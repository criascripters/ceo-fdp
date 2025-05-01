import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  ids: [{ type: String, index: true }],
  usernames: [{ type: String, index: true }],
})

const Admins = mongoose.model('admins', schema)

export default Admins
