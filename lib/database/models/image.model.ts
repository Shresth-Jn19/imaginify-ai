// Importing necessary modules from mongoose
import { Document, Schema, model, models } from 'mongoose';

// Defining the TypeScript interface for an Image document
export interface IImage extends Document {
    title: string;  // Title of the image
    transformation: string;  // Transformation applied to the image
    publicId: string;  // Public ID of the image
    secureUrl: string;  // Secure URL of the image
    width?: number;  // Width of the image (optional)
    height?: number;  // Height of the image (optional)
    config?: object;  // Configuration object for the image (optional)
    transformationUrl?: string;  // URL of the transformed image (optional)
    aspectRatio?: string;  // Aspect ratio of the image (optional)
    color?: string;  // Dominant color of the image (optional)
    prompt?: string;  // Prompt related to the image (optional)
    author: { _id: string, firstName: string, lastName: string };  // Author of the image
    createdAt?: Date;  // Date when the image was created (optional)
    updatedAt?: Date;  // Date when the image was last updated (optional)
}

// Defining the mongoose schema for an Image document
const ImageSchema = new Schema ({
    title: { type: String, required: true },
    transformation: { type: String, required: true },
    publicId: { type: String, required: true },
    secureUrl: { type: URL, required: true },
    width: { type: Number },
    height: { type: Number },
    config: { type: Object },
    transformationUrl: { type: URL },
    aspectRatio: { type: String },
    color: { type: String },
    prompt: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User' },  // Reference to the User document of the author
    createdAt: { type: Date, default: Date.now },  // Default to current date if not provided
    updatedAt: { type: Date, default: Date.now }  // Default to current date if not provided
});

// Creating the Image model if it doesn't already exist
const Image = models?.Image || model('Image', ImageSchema);

// Exporting the Image model
export default Image;