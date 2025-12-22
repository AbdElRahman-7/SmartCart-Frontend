import React, { useState } from 'react';

const CommentSection = ({ productId }) => {
  const [comments, setComments] = useState([
    { id: 1, user: 'Alice', text: 'Great product! Highly recommended.', date: '2023-10-25' },
    { id: 2, user: 'Bob', text: 'Good value for money.', date: '2023-10-26' },
  ]);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      user: 'Guest User', // Placeholder for authenticated user
      text: newComment,
      date: new Date().toISOString().split('T')[0],
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>

      {/* Comment List */}
      <div className="space-y-4 mb-8">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-900">{comment.user}</span>
              <span className="text-sm text-gray-500">{comment.date}</span>
            </div>
            <p className="text-gray-700">{comment.text}</p>
          </div>
        ))}
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Add a Comment</h3>
        <div className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment here..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
