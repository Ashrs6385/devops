// Utility function to get car images based on car type and brand
export const getCarImage = (car) => {
  const { brand, model, type, id } = car || {}
  
  // Map car types to specific Unsplash image IDs for better consistency
  const imageMap = {
    sedan: [
      '1549317661-bd32c8ce0db2',
      '1552519507-da3b142c6e3b',
      '1550355291-b161c0cbc35a',
      '1549317661-bd32c8ce0db2',
    ],
    suv: [
      '1519641471314-3b5d0e4b4e1c',
      '1552519507-da3b142c6e3b',
      '1550355291-b161c0cbc35a',
      '1549317661-bd32c8ce0db2',
    ],
    sports: [
      '1552519507-da3b142c6e3b',
      '1550355291-b161c0cbc35a',
      '1549317661-bd32c8ce0db2',
      '1552519507-da3b142c6e3b',
    ],
    luxury: [
      '1550355291-b161c0cbc35a',
      '1549317661-bd32c8ce0db2',
      '1552519507-da3b142c6e3b',
      '1550355291-b161c0cbc35a',
    ],
  }
  
  // Get images based on car type
  const typeImages = imageMap[type?.toLowerCase()] || imageMap.sedan
  
  // Use car ID to select a consistent image
  const index = id ? (id - 1) % typeImages.length : 0
  const imageId = typeImages[index]
  
  // Return high-quality Unsplash image
  return `https://images.unsplash.com/photo-${imageId}?w=800&h=600&fit=crop&auto=format`
}

// Fallback image
export const getDefaultCarImage = () => {
  return 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop&auto=format'
}

// Hero background image - luxury car showroom
export const getHeroImage = () => {
  return 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop&auto=format'
}

