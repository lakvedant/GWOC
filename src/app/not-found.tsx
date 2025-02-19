import Image from "next/image"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="fixed inset-0 bg-pink-100 flex items-center justify-center p-4">
      <div className="relative w-full max-w-7xl aspect-video bg-white rounded-xl overflow-hidden">
        {/* White left section */}
        <div className="absolute left-0 top-0 h-full w-[35%] bg-white z-10">
          {/* Content container */}
          <div className="absolute bottom-[25%] left-[20%] z-20">
            <h1 className="text-pink-400 text-7xl font-bold mb-3">Uh Oh!</h1>
            <p className="text-4xl mb-8 max-w-80">
              Looks like you{" "}
              <span className="font-bold underline decoration-amber-300 decoration-4 underline-offset-2">donut</span>{" "}
              belong here.
            </p>
            
            <Link
              href="/"
              className="inline-block bg-pink-400 hover:bg-pink-500 text-white font-bold px-12 py-4 rounded-full text-xl transition-colors"
            >
              GO HOME
            </Link>
          </div>
        </div>
        
        {/* Purple wave section */}
        <div 
          className="absolute inset-0 bg-pink-200" 
          style={{
            clipPath: "polygon(35% 0, 100% 0, 100% 100%, 0% 100%, 0% 65%, 35% 65%, 55% 100%)",
          }}
        />
        
        {/* 404 Image - using actual image from screenshot */}
        <div className="absolute right-2 top-3 z-50">
          <Image
            src="/404donut.png" 
            alt="404 Error" 
            width={800}
            height={800}
          />
        </div>
      </div>
    </div>
  )
}