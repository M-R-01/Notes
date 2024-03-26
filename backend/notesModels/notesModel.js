import mongoose from "mongoose";

const notesSchema = mongoose.Schema(
    {
        content: {type: String, required: true}
    },
    {
        timestamps: true
    }
)

export const Note = mongoose.model('Note', notesSchema);