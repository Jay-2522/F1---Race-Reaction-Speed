"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGameContext } from "@/lib/game-context"
import SiteHeader from "@/components/site-header"
import { formatDate } from "@/lib/utils"

export default function LeaderboardPage() {
  const { reactionTimes, clearReactionTimes, bestTime } = useGameContext()
  const [activeTab, setActiveTab] = useState("all")

  // Filter times based on active tab
  const filteredTimes =
    activeTab === "all" ? reactionTimes : reactionTimes.filter((time) => time.difficulty === activeTab)

  // Calculate average time
  const averageTime =
    filteredTimes.length > 0 ? filteredTimes.reduce((sum, record) => sum + record.time, 0) / filteredTimes.length : null

  return (
    <>
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="container max-w-4xl">
          <Card className="bg-[#1a1a24] border-[#27272a] text-white">
            <CardHeader>
              <CardTitle className="text-3xl text-center text-[#e10600]">Your Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#15151e] border border-[#27272a] rounded-lg p-4 text-center">
                  <h3 className="text-lg text-gray-400 mb-2">Best Time</h3>
                  <p className="text-3xl font-bold text-[#e10600]">
                    {bestTime ? `${bestTime.time.toFixed(3)}s` : "No data"}
                  </p>
                  {bestTime && (
                    <p className="text-xs text-gray-400 mt-1 capitalize">{bestTime.difficulty} difficulty</p>
                  )}
                </div>
                <div className="bg-[#15151e] border border-[#27272a] rounded-lg p-4 text-center">
                  <h3 className="text-lg text-gray-400 mb-2">Average Time</h3>
                  <p className="text-3xl font-bold text-[#e10600]">
                    {averageTime ? `${averageTime.toFixed(3)}s` : "No data"}
                  </p>
                </div>
                <div className="bg-[#15151e] border border-[#27272a] rounded-lg p-4 text-center">
                  <h3 className="text-lg text-gray-400 mb-2">Total Attempts</h3>
                  <p className="text-3xl font-bold text-[#e10600]">{reactionTimes.length}</p>
                </div>
              </div>

              <div className="bg-[#15151e] border border-[#27272a] rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Recent Times</h3>

                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="easy">Easy</TabsTrigger>
                    <TabsTrigger value="medium">Medium</TabsTrigger>
                    <TabsTrigger value="hard">Hard</TabsTrigger>
                  </TabsList>

                  <TabsContent value={activeTab} className="mt-0">
                    {filteredTimes.length > 0 ? (
                      <div className="rounded-md border border-[#27272a] overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-[#27272a] hover:bg-[#1a1a24]">
                              <TableHead className="text-gray-300 w-16">#</TableHead>
                              <TableHead className="text-gray-300">Date</TableHead>
                              <TableHead className="text-gray-300">Difficulty</TableHead>
                              <TableHead className="text-gray-300 text-right">Time</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredTimes.map((record, index) => (
                              <TableRow key={index} className="border-[#27272a] hover:bg-[#1a1a24]">
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{formatDate(record.date)}</TableCell>
                                <TableCell className="capitalize">{record.difficulty}</TableCell>
                                <TableCell className="text-right font-bold tabular-nums">
                                  {record.time.toFixed(3)}s
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="text-gray-400 text-center py-8 border border-[#27272a] rounded-md">
                        No reaction times recorded yet
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <Button
                  variant="outline"
                  className="border-[#27272a] text-white hover:bg-[#27272a]"
                  onClick={clearReactionTimes}
                  disabled={reactionTimes.length === 0}
                >
                  Clear Stats
                </Button>
                <Link href="/game">
                  <Button className="bg-[#e10600] hover:bg-[#b30500] w-full sm:w-auto">Try Again</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
