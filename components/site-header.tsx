import Link from "next/link"
import { Flag } from "lucide-react"

export default function SiteHeader() {
  return (
    <header className="border-b border-[#27272a] bg-[#1a1a24] py-4 w-full">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#e10600] rounded-full flex items-center justify-center">
            <Flag className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            F1 <span className="text-[#e10600]">Reaction Test</span>
          </h1>
        </Link>
        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-white hover:text-[#e10600] transition-colors">
            Home
          </Link>
          <Link href="/game" className="text-white hover:text-[#e10600] transition-colors">
            Play
          </Link>
          <Link href="/leaderboard" className="text-white hover:text-[#e10600] transition-colors">
            Stats
          </Link>
        </nav>
      </div>
    </header>
  )
}
