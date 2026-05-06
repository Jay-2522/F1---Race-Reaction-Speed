import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Target } from "lucide-react"
import SiteHeader from "@/components/site-header"

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="container max-w-4xl">
          <Card className="bg-[#1a1a24] border-[#27272a] text-white overflow-hidden">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#e10600] to-transparent opacity-10"></div>
              <CardHeader className="relative">
                <CardTitle className="text-4xl md:text-5xl text-center text-[#e10600]">
                  F1 Race Start Reaction Test
                </CardTitle>
                <CardDescription className="text-center text-gray-400 text-lg mt-2">
                  Test your reaction time against F1 drivers
                </CardDescription>
              </CardHeader>
            </div>
            <CardContent className="space-y-8 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-lg bg-[#15151e] p-6 border border-[#27272a]">
                  <h3 className="mb-4 text-xl font-semibold flex items-center">
                    <FileText className="mr-2 w-5 h-5 text-[#e10600]" />
                    How It Works
                  </h3>
                  <ul className="space-y-2 list-disc pl-5 text-gray-300">
                    <li>Five red lights will illuminate one by one, just like in a real F1 race</li>
                    <li>After a random delay, all lights will go out - that's your signal to GO!</li>
                    <li>Click or tap as quickly as possible when the lights go out</li>
                    <li>Be careful! If you jump the start, you'll be penalized</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-[#15151e] p-6 border border-[#27272a]">
                  <h3 className="mb-4 text-xl font-semibold flex items-center">
                    <Target className="mr-2 w-5 h-5 text-[#e10600]" />
                    Features
                  </h3>
                  <ul className="space-y-2 list-disc pl-5 text-gray-300">
                    <li>Compete against AI drivers with realistic reaction times</li>
                    <li>Multiple difficulty levels to test your skills</li>
                    <li>Race visualization with animated cars</li>
                    <li>Detailed statistics to track your performance</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <Link href="/game">
                  <Button size="lg" className="bg-[#e10600] hover:bg-[#b30500] text-white font-bold px-8 py-6 text-lg">
                    Start Race
                  </Button>
                </Link>
                <p className="text-gray-400 text-sm">
                  Did you know? The average F1 driver reaction time is around 0.2-0.3 seconds
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-gray-400 border-t border-[#27272a] p-6">
              <p>Choose from multiple difficulty levels</p>
              <p>Realistic F1 start procedure</p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  )
}
