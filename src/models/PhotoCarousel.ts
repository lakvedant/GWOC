import mongoose, { Schema, Document } from "mongoose";

export interface IPhotoCarouselSchema extends Document {
	title: string;
	description: string;
	image: string; // URL of the product image
	createdAt: Date;
};

const PhotoCarouselSchema = new Schema<IPhotoCarouselSchema>({
	title: { type: String, required: true },
	description: { type: String, required: true },
	image: { type: String, required: true },
}, { timestamps: true });

const PhotoCarousel = mongoose.models.PhotoCarousel || mongoose.model<IPhotoCarouselSchema>("Product", PhotoCarouselSchema);

export default PhotoCarousel;
