"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { useState } from "react"
import {
  FaKey,
  FaQrcode,
  FaPalette,
  FaCalculator,
  FaLink,
  FaRulerCombined,
  FaQuoteLeft,
  FaClock,
  FaRandom,
  FaImage,
  FaCode,
  FaHashtag,
  FaFileAlt,
  FaCompress,
  FaEye,
  FaSearch,
} from "react-icons/fa"

const tools = [
  {
    id: "password-generator",
    title: "Password Generator",
    description: "Generate secure passwords with custom options",
    icon: FaKey,
    category: "Security",
    color: "bg-red-500",
  },
  {
    id: "qr-generator",
    title: "QR Code Generator",
    description: "Create QR codes for text, URLs, and more",
    icon: FaQrcode,
    category: "Utility",
    color: "bg-blue-500",
  },
  {
    id: "color-palette",
    title: "Color Palette Generator",
    description: "Generate beautiful color schemes",
    icon: FaPalette,
    category: "Design",
    color: "bg-purple-500",
  },
  {
    id: "calculator",
    title: "Quick Calculator",
    description: "Simple calculator with history",
    icon: FaCalculator,
    category: "Utility",
    color: "bg-green-500",
  },
  {
    id: "url-shortener",
    title: "URL Shortener",
    description: "Shorten long URLs quickly",
    icon: FaLink,
    category: "Utility",
    color: "bg-indigo-500",
  },
  {
    id: "unit-converter",
    title: "Unit Converter",
    description: "Convert between different units",
    icon: FaRulerCombined,
    category: "Utility",
    color: "bg-yellow-500",
  },
  {
    id: "quote-generator",
    title: "Random Quote",
    description: "Get inspired with random quotes",
    icon: FaQuoteLeft,
    category: "Fun",
    color: "bg-pink-500",
  },
  {
    id: "random-generator",
    title: "Random Generator",
    description: "Generate random numbers, names, etc.",
    icon: FaRandom,
    category: "Fun",
    color: "bg-teal-500",
  },
  {
    id: "text-counter",
    title: "Text Counter",
    description: "Count words, characters, and lines",
    icon: FaFileAlt,
    category: "Productivity",
    color: "bg-emerald-500",
  },
  {
    id: "json-formatter",
    title: "JSON Formatter",
    description: "Format and validate JSON data",
    icon: FaCompress,
    category: "Developer",
    color: "bg-violet-500",
  },
  {
    id: "color-picker",
    title: "Color Picker",
    description: "Pick colors from images or generate palettes",
    icon: FaEye,
    category: "Design",
    color: "bg-rose-500",
  },
]

const categories = ["All", "Utility", "Design", "Security", "Developer", "Productivity", "Fun"]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleToolClick = (toolId) => {
    // For now, just log the tool ID. In a real app, you'd navigate to the tool page
    console.log(`Navigate to tool: ${toolId}`)
    alert(`${toolId} tool would open here!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">One-Minute Apps Collection</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Quick, simple tools for everyday tasks. Each app is designed to solve a specific problem in under a
              minute.
            </p>
          </div>
        </div>
      </header>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => {
            const IconComponent = tool.icon
            return (
              <Card
                key={tool.id}
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => handleToolClick(tool.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`p-3 rounded-lg ${tool.color} text-white group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {tool.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-gray-600 mb-4">{tool.description}</CardDescription>
                  <Button size="sm" className="w-full group-hover:bg-blue-600 transition-colors">
                    Open Tool
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tools found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">One-Minute Apps Collection</p>
            <p className="text-sm">Simple tools for complex problems. Built with ❤️ for productivity.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
