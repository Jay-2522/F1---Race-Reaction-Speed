import { Table } from "lucide-react"
import type { DriverResult } from "@/lib/types"

interface ScoreboardProps {
  results: DriverResult[]
}

export default function Scoreboard({ results }: ScoreboardProps) {
  return (
    <div className="bg-[#15151e] rounded-lg p-4 mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Table className="mr-2 w-5 h-5 text-[#e10600]" />
        Reaction Times
      </h3>

      <div className="overflow-hidden rounded-md border border-[#27272a]">
        <div className="grid grid-cols-12 bg-[#1a1a24] p-3 text-sm font-medium">
          <div className="col-span-2 text-center">Pos</div>
          <div className="col-span-6">Driver</div>
          <div className="col-span-4 text-right">Time</div>
        </div>

        <div className="divide-y divide-[#27272a]">
          {results.map((result) => {
            // Determine if this is the user's result
            const isUser = result.isUser

            return (
              <div
                key={result.name}
                className={`grid grid-cols-12 p-3 text-sm ${
                  isUser ? "bg-[#1a1a24] border-l-4 border-l-[#e10600]" : ""
                }`}
              >
                <div className="col-span-2 text-center">
                  <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#27272a] text-xs font-medium">
                    {result.position}
                  </div>
                </div>
                <div className="col-span-6">
                  <p className={`font-medium truncate ${isUser ? "text-[#e10600]" : "text-white"}`}>
                    {result.name}
                    {isUser && <span className="ml-2 text-xs text-gray-400">(You)</span>}
                  </p>
                </div>
                <div className="col-span-4 text-right">
                  <p className="text-base font-bold tabular-nums">{result.time.toFixed(3)}s</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
