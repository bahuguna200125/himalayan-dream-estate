'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Navigation from '@/components/Navigation'
import { MapPin, Phone, Mail, Calendar, ArrowLeft, Play, Star } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { formatPrice } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

interface Property {
  _id: string
  title: string
  description: string
  location: string
  landSize: number
  landSizeUnit: string
  askingPrice: number
  images: string[]
  youtubeVideo?: string
  status: string
  createdAt: string
}

export default function PropertyDetailsPage() {
  const params = useParams()
  const { toast } = useToast()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showInterestForm, setShowInterestForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchProperty()
    }
  }, [params.id])

  const fetchProperty = async () => {
    try {
      const response = await fetch(`/api/properties/${params.id}`)
      const data = await response.json()
      
      if (data.success) {
        setProperty(data.property)
      } else {
        toast({
          title: "Error",
          description: "Property not found",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error fetching property:', error)
      toast({
        title: "Error",
        description: "Failed to load property details",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch(`/api/properties/${params.id}/interest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: "Your interest has been submitted successfully!",
        })
        setShowInterestForm(false)
        setFormData({ name: '', phone: '', email: '', message: '' })
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to submit interest",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error submitting interest:', error)
      toast({
        title: "Error",
        description: "Failed to submit interest",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-himalayan-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading property details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
            <p className="text-gray-600 mb-4">The property you're looking for doesn't exist.</p>
            <Button variant="himalayan" asChild>
              <Link href="/properties">Back to Properties</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Breadcrumb */}
      <section className="pt-20 pb-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 text-sm text-gray-600"
          >
            <Link href="/properties" className="hover:text-himalayan-600 transition-colors">
              Properties
            </Link>
            <span>/</span>
            <span className="text-gray-900">{property.title}</span>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="relative h-96 rounded-lg overflow-hidden mb-4">
                <img
                  src={property.images[selectedImage] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {property.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index ? 'border-himalayan-600' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${property.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Property Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl">{property.title}</CardTitle>
                  <CardDescription className="flex items-center text-lg">
                    <MapPin className="h-5 w-5 mr-2" />
                    {property.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-himalayan-600">
                        {formatPrice(property.askingPrice)}
                      </div>
                      <div className="text-gray-600">Asking Price</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">
                        {property.landSize}
                      </div>
                      <div className="text-gray-600">{property.landSizeUnit}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">
                        {new Date(property.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-gray-600">Listed Date</div>
                    </div>
                  </div>
                  
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-semibold mb-4">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{property.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* YouTube Video */}
              {property.youtubeVideo && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Play className="h-5 w-5 mr-2" />
                      Property Video
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <iframe
                        src={property.youtubeVideo.replace('watch?v=', 'embed/')}
                        title={property.title}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Show Interest Card */}
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Interested in this property?</CardTitle>
                  <CardDescription>
                    Get in touch with us to learn more about this property.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="premium" 
                    className="w-full mb-4"
                    onClick={() => setShowInterestForm(true)}
                  >
                    Show Interest
                  </Button>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-himalayan-600" />
                      <span>+91 98765 43210</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-himalayan-600" />
                      <span>info@himalayandreamestate.com</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Property Features */}
              <Card>
                <CardHeader>
                  <CardTitle>Property Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location</span>
                      <span className="font-medium">{property.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Land Size</span>
                      <span className="font-medium">{property.landSize} {property.landSizeUnit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price</span>
                      <span className="font-medium">{formatPrice(property.askingPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status</span>
                      <span className="font-medium capitalize">{property.status}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Interest Form Modal */}
      {showInterestForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Show Interest</h2>
              <button
                onClick={() => setShowInterestForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Tell us about your interest in this property..."
                  rows={4}
                />
              </div>
              
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowInterestForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="himalayan"
                  className="flex-1"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Interest'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
