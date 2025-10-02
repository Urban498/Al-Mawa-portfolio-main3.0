//cards schema
import mongoose from "mongoose";

const cardsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    subtitle: {type: String, required: true},
})

const CardsModel = mongoose.models.Card || mongoose.model("Card", cardsSchema);
export default CardsModel;