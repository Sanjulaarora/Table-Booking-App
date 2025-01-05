import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-screen w-full">
      <Image
        src="/bg-image.png"
        alt="Background"
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="absolute inset-0 flex mt-36 justify-center">
        <div className="text-center text-black">
          <h1 className="text-xl media1025:text-3xl font-bold">Welcome!!</h1>
          <p className="text-[10px] media1025:text-[14px] mt-4">Do you want to make a reservation?</p>
          <Link href={"/reservation"}>
            <button className="bg-amber-600 rounded-lg p-2 media1025:p-3 text-[10px] media1025:text-[14px] text-white font-semibold mt-10 hover:scale-110 hover:bg-amber-300">Make a Reservation</button>
          </Link>
        </div>
      </div>
    </div>
  )
}