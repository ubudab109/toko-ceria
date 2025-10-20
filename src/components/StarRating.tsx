import React from "react";
import { TEXT_MUTED } from "../constant/mock";
import { Star } from "lucide-react";

const StarRating: React.FC<{ rating: any }> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    return (
        <div className="flex items-center space-x-0.5">
            {Array(fullStars)
                .fill(rating)
                .map((_, i) => (
                    <Star
                        key={`full-${i}`}
                        size={16}
                        className="text-yellow-400 fill-yellow-400"
                    />
                ))}
            {Array(emptyStars)
                .fill(rating)
                .map((_, i) => (
                    <Star key={`empty-${i}`} size={16} className={TEXT_MUTED} />
                ))}
            <span className={`ml-2 text-sm ${TEXT_MUTED}`}>
                {rating.toFixed(1)}
            </span>
        </div>
    );
};

export default StarRating;
