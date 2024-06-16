import { Loader } from "lucide-react";


export default function Loading() {
  return (
    // <div className="flex flex-col space-y-3">
    //   <Skeleton className="min-h-[630px] h-full w-full bg-zinc-500 mt-5" />
    // </div>
    <div className="flex justify-center items-center min-h-screen">
      <Loader className="animate-spin" size={100} color="rgb(0,136,202,0.75)"/>
    </div>
  )
}