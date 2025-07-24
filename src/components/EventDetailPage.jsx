import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

const EventDetailPage = () => {
  let params = useParams();
  const [event, updateEvent] = useState({});

  useEffect(() => {
    fetch(`https://agora-backend-pg31.onrender.com/api/events/${params.eventId}`)
      .then(res => res.json())
      .then(eventData => {
        updateEvent(eventData)
      })
  }, [params.eventId])
  
  const initialComments = [];

  const { title, createdBy, datetime, location, notes, imageUrl, initialRsvpStatus, onRsvpChange, eventId } = event;

  const [rsvpStatus, setRsvpStatus] = useState(initialRsvpStatus);
  const [newCommentText, setNewCommentText] = useState('');
  const [comments, setComments] = useState(initialComments); 

  useEffect(() => {
    setRsvpStatus(initialRsvpStatus);
  }, [initialRsvpStatus]);

  const handleRsvpClick = (status) => { 
    setRsvpStatus(status);
    if (onRsvpChange) {
      onRsvpChange(eventId, status);
    }
  };

  const handlePostComment = () => {
    if (newCommentText.trim()) {
      const newComment = { 
        id: Date.now().toString(), 
        userName: "Current User", 
        timeAgo: "Just now",
        text: newCommentText.trim(),
        avatarUrl: "https://via.placeholder.com/40/FF5733/FFFFFF?text=CU"
      };
      setComments((prevComments) => [...prevComments, newComment]);
      setNewCommentText('');
    }
  };

  const getRsvpButtonClasses = (buttonStatus) => { 
    let baseClasses = "py-2 px-6 rounded-full font-semibold transition duration-300 ease-in-out shadow-md";
    if (rsvpStatus === buttonStatus) {
      return `${baseClasses} bg-purple-600 text-white`;
    } else {
      return `${baseClasses} bg-gray-200 text-gray-800 hover:bg-gray-300`;
    }
  };

  const getRsvpStatusText = () => { 
    switch (rsvpStatus) {
      case 'attending':
        return <span className="text-green-600 font-bold">You are attending! 🎉</span>;
      case 'not_attending':
        return <span className="text-red-600 font-bold">You are not attending.</span>;
      default:
        return <span className="text-gray-600">Please let us know if you're attending.</span>;
    }
  };

  const formatDateTime = (datetime) => {
    if (!datetime) return '';
    const date = new Date(datetime);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const { date, time } = formatDateTime(datetime);

  return (
    <div className="min-h-screen bg-gray-50 overflow-auto flex w-full justify-center">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <p className="text-sm text-gray-500">Events / {title || 'Loading...'}</p>
        </nav>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              {title || 'Loading...'}
            </h1>
            <p className="text-gray-600 text-lg">
              Hosted by {createdBy || 'Unknown'}
            </p>
          </div>

          {/* Event Image */}
          <div className="relative h-64 sm:h-80 bg-gradient-to-br from-purple-500 to-pink-500">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-white text-xl font-semibold">Event Image</div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Event Details */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Event Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">📅</span>
                  <div>
                    <p className="font-semibold text-gray-800">Date</p>
                    <p className="text-gray-600">{date || 'TBD'}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">⏰</span>
                  <div>
                    <p className="font-semibold text-gray-800">Time</p>
                    <p className="text-gray-600">{time || 'TBD'}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 md:col-span-2">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-semibold text-gray-800">Location</p>
                    <p className="text-gray-600">{location || 'TBD'}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {notes || 'No description available.'}
                </p>
              </div>
            </section>

            {/* RSVP Section */}
            <section className="bg-gray-50 rounded-lg p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">RSVP Status</h3>
                  {getRsvpStatusText()}
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleRsvpClick('attending')}
                    className={getRsvpButtonClasses('attending')}
                  >
                    ✓ Attending
                  </button>
                  <button
                    onClick={() => handleRsvpClick('not_attending')}
                    className={getRsvpButtonClasses('not_attending')}
                  >
                    ✗ Not Attending
                  </button>
                </div>
              </div>
            </section>

            {/* Comments Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments & Questions</h2>
              
              {/* Comments List */}
              <div className="space-y-6 mb-8">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-4">
                      <img
                        src={comment.avatarUrl}
                        alt={`${comment.userName}'s avatar`}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline space-x-2 mb-1">
                          <p className="font-semibold text-gray-900">{comment.userName}</p>
                          <p className="text-sm text-gray-500">{comment.timeAgo}</p>
                        </div>
                        <p className="text-gray-700 break-words">{comment.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-lg">No comments yet.</p>
                    <p className="text-gray-400">Be the first to ask a question!</p>
                  </div>
                )}
              </div>

              {/* Add Comment */}
              <div className="border-t pt-6">
                <div className="flex space-x-4">
                  <img
                    src="https://via.placeholder.com/40/D3D3D3/000000?text=You"
                    alt="Your avatar"
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 flex space-x-3">
                    <input
                      type="text"
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder="Add a comment or question..."
                      className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && handlePostComment()}
                    />
                    <button
                      onClick={handlePostComment}
                      className="bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition duration-300 flex-shrink-0"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;