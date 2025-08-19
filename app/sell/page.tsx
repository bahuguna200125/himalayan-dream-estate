'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Navigation from '@/components/Navigation'
import { Upload, X, Home, MapPin, DollarSign, Ruler } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function SellPage() {
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    landSize: '',
    landSizeUnit: 'sqft',
    askingPrice: '',
    sellerName: '',
    sellerPhone: '',
    sellerEmail: '',
    sellerDetails: ''
  })
  const [images, setImages] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    if (files.length + images.length > 5) {
      toast({
        title: "Error",
        description: "Maximum 5 images allowed",
        variant: "destructive",
      })
      return
    }

    setImages(prev => [...prev, ...files])
    
    // Create preview URLs
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImageUrls(prev => [...prev, e.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setImageUrls(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Upload images to Cloudinary (you'll need to implement this)
      const uploadedImages = await uploadImages(images)
      
      // Submit property data
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          images: uploadedImages,
          landSize: parseFloat(formData.landSize),
          askingPrice: parseFloat(formData.askingPrice),
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: "Your property has been submitted for review!",
        })
        
        // Reset form
        setFormData({
          title: '',
          description: '',
          location: '',
          landSize: '',
          landSizeUnit: 'sqft',
          askingPrice: '',
          sellerName: '',
          sellerPhone: '',
          sellerEmail: '',
          sellerDetails: ''
        })
        setImages([])
        setImageUrls([])
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to submit property",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error submitting property:', error)
      toast({
        title: "Error",
        description: "Failed to submit property",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const uploadImages = async (files: File[]): Promise<string[]> => {
    // This is a placeholder - you'll need to implement actual image upload
    // For now, we'll return placeholder URLs
    return files.map(() => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')
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
              Sell Your Property
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              List your Himalayan property with us and reach thousands of potential buyers. 
              Our expert team will help you showcase your property in the best possible way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Property Information</CardTitle>
                <CardDescription>
                  Fill in the details below to list your property. All fields marked with * are required.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Property Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="title">Property Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="e.g., Mountain View Estate"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="e.g., Manali, Himachal Pradesh"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe your property, its features, and what makes it special..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="landSize">Land Size *</Label>
                      <Input
                        id="landSize"
                        type="number"
                        step="0.01"
                        value={formData.landSize}
                        onChange={(e) => handleInputChange('landSize', e.target.value)}
                        placeholder="e.g., 2.5"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="landSizeUnit">Size Unit *</Label>
                      <select
                        id="landSizeUnit"
                        value={formData.landSizeUnit}
                        onChange={(e) => handleInputChange('landSizeUnit', e.target.value)}
                        className="w-full h-10 px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      >
                        <option value="sqft">Square Feet</option>
                        <option value="sqm">Square Meters</option>
                        <option value="acres">Acres</option>
                        <option value="hectares">Hectares</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="askingPrice">Asking Price (₹) *</Label>
                      <Input
                        id="askingPrice"
                        type="number"
                        value={formData.askingPrice}
                        onChange={(e) => handleInputChange('askingPrice', e.target.value)}
                        placeholder="e.g., 25000000"
                        required
                      />
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <Label>Property Images *</Label>
                    <div className="mt-2">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">
                          Upload up to 5 images of your property
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-himalayan-600 hover:bg-himalayan-700 cursor-pointer"
                        >
                          Choose Images
                        </label>
                      </div>
                      
                      {imageUrls.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                          {imageUrls.map((url, index) => (
                            <div key={index} className="relative">
                              <img
                                src={url}
                                alt={`Property ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Seller Information */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Seller Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="sellerName">Full Name *</Label>
                        <Input
                          id="sellerName"
                          value={formData.sellerName}
                          onChange={(e) => handleInputChange('sellerName', e.target.value)}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="sellerPhone">Phone Number *</Label>
                        <Input
                          id="sellerPhone"
                          type="tel"
                          value={formData.sellerPhone}
                          onChange={(e) => handleInputChange('sellerPhone', e.target.value)}
                          placeholder="Your phone number"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Label htmlFor="sellerEmail">Email Address *</Label>
                      <Input
                        id="sellerEmail"
                        type="email"
                        value={formData.sellerEmail}
                        onChange={(e) => handleInputChange('sellerEmail', e.target.value)}
                        placeholder="Your email address"
                        required
                      />
                    </div>
                    
                    <div className="mt-6">
                      <Label htmlFor="sellerDetails">Additional Details</Label>
                      <Textarea
                        id="sellerDetails"
                        value={formData.sellerDetails}
                        onChange={(e) => handleInputChange('sellerDetails', e.target.value)}
                        placeholder="Any additional information about you or the property..."
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setFormData({
                          title: '',
                          description: '',
                          location: '',
                          landSize: '',
                          landSizeUnit: 'sqft',
                          askingPrice: '',
                          sellerName: '',
                          sellerPhone: '',
                          sellerEmail: '',
                          sellerDetails: ''
                        })
                        setImages([])
                        setImageUrls([])
                      }}
                    >
                      Reset Form
                    </Button>
                    <Button
                      type="submit"
                      variant="premium"
                      disabled={submitting}
                    >
                      {submitting ? 'Submitting...' : 'Submit Property'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why List with Himalayan Dream Estate?
            </h2>
            <p className="text-xl text-gray-600">
              We provide comprehensive support to help you sell your property quickly and at the best price.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-himalayan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-himalayan-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Exposure</h3>
              <p className="text-gray-600">
                Your property gets featured on our premium platform with high-quality photography and detailed descriptions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-himalayan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-himalayan-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Targeted Marketing</h3>
              <p className="text-gray-600">
                We target serious buyers specifically looking for Himalayan properties, ensuring quality leads.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-himalayan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-himalayan-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">
                Our expert team helps you price your property competitively to maximize your returns.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
