import { IProduct } from "@/models/Product";
import ImageComponent from "./ImageComponent";

interface ImageFeedProps {
	products: IProduct[];
}

export default function ImageFeed({ products }: ImageFeedProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white text-black">
			{products.map((product) => (
				<ImageComponent key={product._id?.toString()} product={product} />
			))}

			{products.length === 0 && (
				<div className="col-span-full text-center py-12">
					<p className="text-gray-700">No videos found</p>
				</div>
			)}
		</div>
	);
}
