import React, { useState, useEffect } from 'react';
import { Star, Send, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { IKImage } from 'imagekitio-next';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}

interface UserProduct {
  productId: string;
  isReviewed: boolean;
  reviewId: string | null;
  _id: string;
  productDetails?: Product;
}

interface Review {
  _id: string;
  userName: string;
  userid: string;
  rating: number;
  comment: string;
  productId: string;
  productName: string;
  createdAt: string;
}

interface ReviewsProps {
  userId: string;
  userName: string;
}

const ReviewsSection: React.FC<ReviewsProps> = ({ userId, userName }) => {
  const [userProducts, setUserProducts] = useState<UserProduct[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newReview, setNewReview] = useState<{ rating: number; comment: string }>({
    rating: 0,
    comment: ''
  });
  const [hoverRating, setHoverRating] = useState(0);

  const ratingLabels: { [key: number]: string } = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent'
  };

  const fetchProductDetails = async (productId: string): Promise<Product> => {
    const response = await fetch(`/api/product/${productId}`);
    const data = await response.json();
    return data.product;
  };

  const fetchUserProducts = async () => {
    try {
      const response = await fetch(`/api/user/products?userId=${userId}`);
      const data = await response.json();
      
      // Filter out empty products and fetch details for each product
      const validProducts = data.products.filter((p: UserProduct) => p.productId);
      const productsWithDetails = await Promise.all(
        validProducts.map(async (product: UserProduct) => {
          const details = await fetchProductDetails(product.productId);
          return { ...product, productDetails: details };
        })
      );
      
      setUserProducts(productsWithDetails.sort((a, b) => b._id.localeCompare(a._id)));

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setIsLoading(false);
    }
  };

  const fetchUserReviews = async () => {
    try {
      const response = await fetch(`/api/reviews?userId=${userId}`);
      const data = await response.json();
      
      if (data.success) {
        setReviews(data.reviews);
      } else {
        console.error('Failed to fetch reviews:', data.message);
        setReviews([]);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviews([]);
    }
  };

  useEffect(() => {
    fetchUserProducts();
    fetchUserReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitReview = async (product: UserProduct, e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReview.rating || !newReview.comment.trim()) {
      alert('Please provide both a rating and comment');
      return;
    }

    try {
      // ✅ Create review
      const reviewResponse = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName,
          userid: userId,
          rating: newReview.rating,
          comment: newReview.comment,
          productId: product.productId,
          productName: product.productDetails?.name
        })
      });

      const reviewData = await reviewResponse.json();

      // 🔍 Debugging - Ensure review was created
      if (!reviewData.success || !reviewData.review?._id) {
        console.error('❌ Review creation failed:', reviewData);
        alert('Failed to submit review.');
        return;
      }

      console.log('✅ Review created successfully:', reviewData.review);

      // ✅ Ensure valid productId before proceeding
      if (!product.productId) {
        console.error("❌ Product ID is missing or invalid:", product);
        alert("Product ID is invalid. Please try again.");
        return;
      }

      // ✅ Update user's product review status
      const updateResponse = await fetch('/api/user/update-review-status', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          productId: product.productId,
          reviewId: reviewData.review._id,
          isReviewed: true,
          approved: false 
        })
      });

      const updateData = await updateResponse.json();

      // 🔍 Debugging - Ensure update was successful
      if (!updateData.success) {
        console.error('❌ Failed to update review status:', updateData);
        alert('Failed to update review status.');
        return;
      }

      console.log('✅ Review status updated successfully!');

      // ✅ Refresh products and reviews
      await fetchUserProducts();
      await fetchUserReviews();

      // ✅ Reset review form and collapse section
      setNewReview({ rating: 0, comment: '' });
      setExpandedProduct(null);
    } catch (error) {
      console.error('❌ Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    }
};


  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="flex gap-6">
      {/* Products List */}
      <div className="w-2/3 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Products to Review</h2>
        
        {userProducts.map(product => (
          <div key={product._id} className="bg-white rounded-lg shadow-sm">
            <div 
              className={`p-4 ${!product.isReviewed && 'cursor-pointer hover:bg-gray-50'}`}
              onClick={() => !product.isReviewed && setExpandedProduct(expandedProduct === product.productId ? null : product.productId)}
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <IKImage 
                    path={product.productDetails?.image}
                    alt={product.productDetails?.name || 'Product image'}
                    width={80}
                    height={80}
                    className={`w-full h-full object-cover transition-opacity ${product.isReviewed ? 'opacity-50' : ''}`}
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`font-medium ${product.isReviewed ? 'text-gray-500' : 'text-gray-800'}`}>
                        {product.productDetails?.name}
                      </h3>
                      <p className={`text-sm mt-1 ${product.isReviewed ? 'text-gray-500' : 'text-gray-600'}`}>
                      ₹{product.productDetails?.price}
                      </p>
                    </div>
                    {!product.isReviewed && (
                      <button className="text-gray-400">
                        {expandedProduct === product.productId ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    )}
                  </div>
                  
                  {product.isReviewed && (
                    <div className="flex items-center gap-2 mt-2 text-gray-500">
                      <Clock size={14} />
                      <span className="text-sm">Already reviewed</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Expandable Review Form */}
            {expandedProduct === product.productId && !product.isReviewed && (
              <div className="p-4 border-t bg-gray-50">
                <form onSubmit={(e) => handleSubmitReview(product, e)}>
                  <div className="mb-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          fill={(hoverRating || newReview.rating) >= star ? "#ec4899" : "none"}
                          color={(hoverRating || newReview.rating) >= star ? "#ec4899" : "#d1d5db"}
                          className="w-6 h-6 cursor-pointer transition-colors"
                          onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                        />
                      ))}
                      {(hoverRating || newReview.rating) > 0 && (
                        <span className="ml-2 text-sm text-pink-600 font-medium">
                          {ratingLabels[hoverRating || newReview.rating]}
                        </span>
                      )}
                    </div>
                  </div>

                  <textarea
                    rows={3}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
                    placeholder="Share your experience with this product..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  />

                  <div className="flex justify-end mt-3">
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Send size={14} />
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Reviews Section */}
      <div className="w-1/3">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800">My Reviews</h3>
          </div>
          
          <div className="divide-y max-h-[calc(100vh-180px)] overflow-y-auto">
            {reviews.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <Star className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No reviews yet</p>
              </div>
            ) : (
              reviews.map(review => (
                <div key={review._id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{review.productName}</h4>
                      <div className="flex items-center gap-1 mt-1 mb-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            fill={review.rating >= star ? "#ec4899" : "none"}
                            color={review.rating >= star ? "#ec4899" : "#d1d5db"}
                            className="w-4 h-4"
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">{review.comment}</p>
                      <div className="text-xs text-gray-400 mt-2">
                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;