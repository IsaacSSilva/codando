import { CodeHeatmap, Day } from "@/components/CodeHeatmap";
import { GitCommitHorizontal, MessageSquareMore } from "lucide-react";

export default function Home() {
  const today = new Date();
const days: Day[] = Array.from({ length: 30 }).map((_, i) => {
  const date = new Date(today);
  date.setDate(today.getDate() - i);
  return { date: date.toISOString().split("T")[0], count: Math.floor(Math.random() * 10) };
});
  return (
    <div className="flex justify-center items-center">

      <main className="flex flex-col gap-5 justify-center items-center w-full h-screen bg-zinc-950">

        <div className="
        border-b border-white/20 lg:w-xl md:w-lg w-md h-10  p-2.5 flex gap-5 justify-between items-center
        px-5 text-zinc-50 font-light text-sm
        ">
          <div className="size-2.5 rounded-full bg-amber-400"/>
          <div className="w-full">
            <p className="font-[100] text-xs text-zinc-50/40">
              codando ao som de...
            </p>
            <p>
              lo-fi
            </p>
          </div>
          <div className="flex gap-3 transition-all duration-700">

              <button type="button"
              className="cursor-pointer hover:text-zinc-500">
                <GitCommitHorizontal className="size-5"/>
              </button>

            
            
            <button type="button"
            className="cursor-pointer hover:text-zinc-500">
              <MessageSquareMore className="size-5"/>
            </button>
          </div>
        </div>

        <div className="border border-white/20 lg:w-xl md:w-lg w-md p-2.5 rounded-md">
          <CodeHeatmap data={days.reverse()} />
        </div>
      </main>

    </div>
  );
}
