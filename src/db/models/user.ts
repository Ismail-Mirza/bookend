import { Schema, model, Document, models } from 'mongoose'
import bcrypt from 'bcrypt'

interface IUser extends Document {
  email?: string;
  password: string;
}

const userSchema: Schema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: [true, 'email already exist'],
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, 'password is required'],
    },
  },
  { timestamps: true, versionKey: false }
)

userSchema.pre('save', async function (next): Promise<void> {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(this.password, salt)
  this.password = hash
  next()
})

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}

export default models.User || model<IUser>('User', userSchema)