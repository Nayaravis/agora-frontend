import React, { useState, useEffect } from 'react'; // Removed SyntheticEvent import as its type won't be used

// Removed TypeScript type alias for RsvpStatus
// export type RsvpStatus = 'attending' | 'not_attending' | 'not_responded';

// Removed TypeScript interface for Comment
// interface Comment {
//   id: string;
//   userName: string;
//   timeAgo: string;
//   text: string;
//   avatarUrl: string;
// }

// Removed TypeScript interface for EventDetailProps
// interface EventDetailProps {
//   eventName: string;
//   host: string;
//   date: string;
//   timeRange: string;
//   location: string;
//   description: string;
//   imageUrl?: string;
//   initialRsvpStatus: RsvpStatus;
//   onRsvpChange?: (eventId: string, status: RsvpStatus) => void;
//   eventId: string;
//   comments: Comment[];
// }

// Changed to a standard JavaScript functional component, no React.FC annotation
const EventDetailPage = ({
  eventName,
  host,
  date,
  timeRange,
  location,
  description,
  imageUrl,
  initialRsvpStatus,
  onRsvpChange,
  eventId,
  comments: initialComments = [], 
}) => {
  // Removed type annotations from useState calls
  const [rsvpStatus, setRsvpStatus] = useState(initialRsvpStatus);
  const [newCommentText, setNewCommentText] = useState('');
  
  const [comments, setComments] = useState(initialComments); 

  useEffect(() => {
    setRsvpStatus(initialRsvpStatus);
  }, [initialRsvpStatus]);

  // Removed type annotation for 'status' parameter
  const handleRsvpClick = (status) => { 
    setRsvpStatus(status);
    if (onRsvpChange) {
      onRsvpChange(eventId, status);
    }
  };

  const handlePostComment = () => {
    if (newCommentText.trim()) {
      // Defined newComment as a plain JavaScript object, no Comment interface
      const newComment = { 
        id: Date.now().toString(), 
        userName: "Current User", 
        timeAgo: "Just now",
        text: newCommentText.trim(),
        avatarUrl: "https://via.placeholder.com/40/FF5733/FFFFFF?text=CU" // Placeholder
      };
      setComments((prevComments) => [...prevComments, newComment]);
      setNewCommentText('');
    }
  };

  // Removed type annotation for 'buttonStatus' parameter
  const getRsvpButtonClasses = (buttonStatus) => { 
    let baseClasses = "py-2 px-6 rounded-full font-semibold transition duration-300 ease-in-out shadow-md";
    if (rsvpStatus === buttonStatus) {
      return `${baseClasses} bg-purple-600 text-white`;
    } else {
      return `${baseClasses} bg-gray-200 text-gray-800 hover:bg-gray-300`;
    }
  };

  // Removed type annotation for React.ReactNode
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

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full mx-auto transform hover:scale-105 transition-transform duration-300">
        {/* Breadcrumbs */}
        <div className="p-6 sm:p-8 pb-0">
          <p className="text-sm text-gray-500 mb-2">Events / Tech Meetup</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
            {eventName}
          </h1>
          <p className="text-gray-600 text-lg">Hosted by {host}</p>
        </div>

        {/* Event Image/Placeholder */}
        <div className="relative h-64 sm:h-80 bg-teal-500 flex items-center justify-center overflow-hidden mt-6">
          {imageUrl && ( 
            <img
              src={imageUrl}
              alt={eventName}
              className="w-full h-full object-cover object-center"
              onError={(e) => { // Removed SyntheticEvent type annotation and 'as HTMLImageElement' assertion
                const target = e.target; 
                target.onerror = null;
                target.src = `https://placehold.co/800x450/E0E0E0/333333?text=Event+Image`;
              }}
            />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30"></div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Details Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
              <div className="flex items-center">
                <span className="font-semibold text-gray-600 mr-2">📅 Date:</span> {date}
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-600 mr-2">⏰ Time:</span> {timeRange}
              </div>
              <div className="flex items-center col-span-1 md:col-span-2">
                <span className="font-semibold text-gray-600 mr-2">📍 Location:</span> {location}
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">
              {description}
            </p>
          </div>

          {/* RSVP Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-lg font-medium text-gray-800">
              RSVP Status: {getRsvpStatusText()}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleRsvpClick('attending')}
                className={getRsvpButtonClasses('attending')}
              >
                Attend
              </button>
              <button
                onClick={() => handleRsvpClick('not_attending')}
                className={getRsvpButtonClasses('not_attending')}
              >
                Not Attending
              </button>
            </div>
          </div>

          {/* Comments & Questions Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments & Questions</h2>
            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-3">
                    <img
                      src={comment.avatarUrl}
                      alt={`${comment.userName}'s avatar`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-baseline space-x-2">
                        <p className="font-semibold text-gray-900">{comment.userName}</p>
                        <p className="text-sm text-gray-500">{comment.timeAgo}</p>
                      </div>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No comments yet. Be the first to ask a question!</p>
              )}
            </div>

            {/* Add a comment input */}
            <div className="mt-6 flex items-center space-x-3">
              <img
                src="https://via.placeholder.com/40/D3D3D3/000000?text=You" // Placeholder for current user's avatar
                alt="Your avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Add a comment or question..."
                className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handlePostComment}
                className="bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;