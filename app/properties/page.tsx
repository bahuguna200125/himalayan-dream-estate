'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Navigation from '@/components/Navigation'
import { MapPin, Search, Filter, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

interface Property {
  _id: string
  title: string
  description: string
  location: string
  landSize: number
  landSizeUnit: string
  askingPrice: number
  images: string[]
  status: string
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    minSize: '',
    maxSize: '',
  })

  useEffect(() => {
    fetchProperties()
  }, [])

  useEffect(() => {
    filterProperties()
  }, [properties, filters])

  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/properties')
      const data = await response.json()
      setProperties(data.properties || [])
    } catch (error) {
      console.error('Error fetching properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterProperties = () => {
    let filtered = properties.filter(property => property.status === 'approved')

    if (filters.location) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    if (filters.minPrice) {
      filtered = filtered.filter(property =>
        property.askingPrice >= parseInt(filters.minPrice)
      )
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(property =>
        property.askingPrice <= parseInt(filters.maxPrice)
      )
    }

    if (filters.minSize) {
      filtered = filtered.filter(property =>
        property.landSize >= parseFloat(filters.minSize)
      )
    }

    if (filters.maxSize) {
      filtered = filtered.filter(property =>
        property.landSize <= parseFloat(filters.maxSize)
      )
    }

    setFilteredProperties(filtered)
  }

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      location: '',
      minPrice: '',
      maxPrice: '',
      minSize: '',
      maxSize: '',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-himalayan-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading properties...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Browse Properties
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover premium properties in the Himalayan region with breathtaking mountain views and serene surroundings.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <div className="flex items-center mb-4">
              <Filter className="h-5 w-5 mr-2 text-himalayan-600" />
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Enter location..."
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="minPrice">Min Price (₹)</Label>
                <Input
                  id="minPrice"
                  type="number"
                  placeholder="Min price..."
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="maxPrice">Max Price (₹)</Label>
                <Input
                  id="maxPrice"
                  type="number"
                  placeholder="Max price..."
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="minSize">Min Size</Label>
                <Input
                  id="minSize"
                  type="number"
                  placeholder="Min size..."
                  value={filters.minSize}
                  onChange={(e) => handleFilterChange('minSize', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="maxSize">Max Size</Label>
                <Input
                  id="maxSize"
                  type="number"
                  placeholder="Max size..."
                  value={filters.maxSize}
                  onChange={(e) => handleFilterChange('maxSize', e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={clearFilters} className="mr-2">
                Clear Filters
              </Button>
              <Button variant="himalayan">
                <Search className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredProperties.length} Properties Found
            </h2>
          </div>

          {filteredProperties.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="max-w-md mx-auto">
                <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or check back later for new listings.
                </p>
                <Button variant="himalayan" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={property.images[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'}
                        alt={property.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl line-clamp-1">{property.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {property.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-himalayan-600">
                          {formatPrice(property.askingPrice)}
                        </span>
                        <span className="text-gray-600">
                          {property.landSize} {property.landSizeUnit}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2 flex-1">
                        {property.description}
                      </p>
                      <Button variant="himalayan" className="w-full" asChild>
                        <Link href={`/properties/${property._id}`}>
                          View Details
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-himalayan-gradient">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Let us know your requirements and we'll help you find the perfect property.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="premium" size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900" asChild>
                <Link href="/sell">List Your Property</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
