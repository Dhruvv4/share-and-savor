import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const ReviewForm = ({ onClose, id }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  let { user } = useSelector((state) => state.user);
  console.log(user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:3000/api/reviews/${id}`,
        {
          user_id: user.id,
          review: review,
          rating: rating,
          userName: user.firstName,
          lastName: user.lastName,
        },
      );
    } catch (e) {
      console.log(e);
    }
    // Close the form after handling the review
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="review"
              className="block text-sm font-medium text-gray-700"
            >
              Your Review:
            </label>
            <textarea
              id="review"
              name="review"
              rows="4"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700"
            >
              Rating:
            </label>
            <select
              id="rating"
              name="rating"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="0">Select a Rating</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300 border rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
