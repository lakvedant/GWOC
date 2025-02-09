import { IKImage } from "imagekitio-next";
import Link from "next/link";
import { IProduct } from "@/models/Product";

export default function ImageComponent({ product }: { product: IProduct }) {
  return (
    <div className="card shadow hover:shadow-lg transition-all duration-300 bg-white">
      {/* Centering image inside the figure */}
      <figure className="relative px-4 pt-4 flex justify-center items-center">
        <IKImage
          path={product.image}
          width={400}
          height={400}
          alt={product.name || "Product Image"}
          className="w-full h-auto object-contain"
        />
      </figure>

      <div className="card-body p-4">
        <Link
          href={`/products/${product._id}`}
          className="hover:opacity-80 transition-opacity"
        >
          <h2 className="card-title text-lg text-black">{product.name}</h2>
        </Link>

        <p className="text-sm text-gray-700 line-clamp-2">{product.description}</p>
        <p className="text-sm text-gray-700 line-clamp-2">{product.price}</p>
      </div>
    </div>
  );
}
