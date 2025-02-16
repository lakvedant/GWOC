"use client"
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Star, ThumbsUp } from "lucide-react";
import Image from "next/image";

const reviews = [
    {
        name: "Sameer Gupta",
        rating: 5,
        product: "Very Berry Strawberry Cake",
        review: "Awesome",
        date: "02/02/2025",
        likes: 12
    },
    {
        name: "Sambit",
        rating: 5,
        product: "Very Berry Strawberry Cake",
        review: "Good",
        date: "30/01/2025",
        likes: 8
    },
    {
        name: "Sanjana Dutt",
        rating: 5,
        product: "Very Berry Strawberry Cake",
        review: "Very good experience with Bakingo. On-time delivery.",
        date: "18/01/2024",
        likes: 15
    },
    {
        name: "Veronika Zutshi",
        rating: 4,
        product: "Very Berry Strawberry Cake",
        review: "The cake was good in taste!!",
        date: "08/01/2025",
        likes: 6
    }
];

const ReviewPage = () => {
    const [filter, setFilter] = useState("All Star");

    const calculateStats = () => {
        const totalRatings = reviews.length;
        const fiveStarRatings = reviews.filter(r => r.rating === 5).length;
        const recommendationPercentage = (fiveStarRatings / totalRatings) * 100;
        return {
            averageRating: (reviews.reduce((acc, r) => acc + r.rating, 0) / totalRatings).toFixed(1),
            recommendationPercentage: Math.round(recommendationPercentage)
        };
    };

    const stats = calculateStats();

    const getFilteredReviews = () => {
        switch (filter) {
            case "Most Liked":
                return [...reviews].sort((a, b) => b.likes - a.likes);
            case "Most Critical":
                return [...reviews].sort((a, b) => a.rating - b.rating);
            case "Newest":
                return [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
            default:
                return reviews;
        }
    };

    const StatCard = ({ leftIcon, rightIcon, value, subtext }) => (
        <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                        {leftIcon}
                        <div className="flex flex-col">
                            <span className="text-xl font-bold">{value}</span>
                            <span className="text-sm text-gray-600">{subtext}</span>
                        </div>
                    </div>
                    {rightIcon && (
                        <div className="ml-2 w-20 flex items-center justify-center" style={{ minWidth: '100px' }}>
                            {rightIcon}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );

    const RecommendedTag = () => (
        <div className="flex items-center gap-1 text-green-600 text-sm">
            <ThumbsUp className="w-4 h-4" />
            <span>Recommended</span>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="w-full bg-pink-100 text-white  py-10 px-6 mb-6">
                <h1 className="text-[50px] font-semibold text-center">All Review & Ratings of Very Berry Strawberry Cake</h1>
            </div>

            <div className="px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        leftIcon={<Star className="text-green-600 w-6 h-6" />}
                        value={stats.averageRating}
                        subtext="Based on 16 Reviews & Ratings"
                    />
                    <StatCard
                        leftIcon={<Star className="text-yellow-400 w-6 h-6" />}
                        value={`${stats.recommendationPercentage}%`}
                        subtext="Based on 16 Recommendations"
                    />
                    <StatCard
                        leftIcon={<Star className="text-yellow-400 w-6 h-6" />}
                        rightIcon={<Image fill src="/pngegg.png" alt="Google" className="w-[100px] object-contain" />}
                        value="4.5"
                        subtext="Google"
                    />
                    <StatCard
                        leftIcon={<Star className="text-blue-600 w-6 h-6" />}
                        rightIcon={<Image fill src="/facebook.png" alt="Facebook" className="w-[500px] object-contain" />}
                        value="4.5"
                        subtext="Facebook"
                    />

                </div>

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">What others say about Bakingo</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Filter By:</span>
                        <Select onValueChange={(val) => setFilter(val)} className="w-32">
                            <SelectTrigger>
                                <SelectValue placeholder="All Star" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All Star">All Star</SelectItem>
                                <SelectItem value="Most Liked">Most Liked</SelectItem>
                                <SelectItem value="Most Critical">Most Critical</SelectItem>
                                <SelectItem value="Newest">Newest</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {getFilteredReviews().map((review, index) => (
                        <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-semibold">{review.name}</h3>
                                        <div className="flex items-center gap-1">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                    {review.rating >= 4 && <RecommendedTag />}
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{review.product}</p>
                                <p className="text-sm">{review.review}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewPage;