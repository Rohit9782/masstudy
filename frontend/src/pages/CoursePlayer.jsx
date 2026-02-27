import React, { useState } from "react";

const CoursePlayer = () => {

  const lectures = [
    {
      id: 1,
      title: "Introduction to Spoken English",
      duration: "08:45",
      url: "https://www.youtube.com/embed/8JJ101D3knE"
    },
    {
      id: 2,
      title: "English Alphabet & Pronunciation",
      duration: "12:10",
      url: "https://www.youtube.com/embed/7E-cwdnsiow"
    },
    {
      id: 3,
      title: "Basic Grammar Rules",
      duration: "15:40",
      url: "https://www.youtube.com/embed/kUMe1FH4CHE"
    },
    {
      id: 4,
      title: "Parts of Speech Explained",
      duration: "18:22",
      url: "https://www.youtube.com/embed/2IYqCzWmK2E"
    },
    {
      id: 5,
      title: "Tenses – Present, Past & Future",
      duration: "20:15",
      url: "https://www.youtube.com/embed/9bZkp7q19f0"
    },
    {
      id: 6,
      title: "Daily Conversation Practice",
      duration: "12:18",
      url: "https://www.youtube.com/embed/l482T0yNkeo"
    },
    {
      id: 7,
      title: "How to Improve Vocabulary",
      duration: "14:35",
      url: "https://www.youtube.com/embed/VbfpW0pbvaU"
    },
    {
      id: 8,
      title: "Sentence Formation Techniques",
      duration: "16:40",
      url: "https://www.youtube.com/embed/M7lc1UVf-VE"
    },
    {
      id: 9,
      title: "Public Speaking Confidence",
      duration: "17:55",
      url: "https://www.youtube.com/embed/i0x5F3b3yZc"
    },
    {
      id: 10,
      title: "Advanced English Speaking Practice",
      duration: "22:30",
      url: "https://www.youtube.com/embed/fLexgOxsZu0"
    }
  ];

  const [currentVideo, setCurrentVideo] = useState(lectures[0]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Video Section */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">{currentVideo.title}</h2>

          <div className="aspect-video">
            <iframe
              className="w-full h-full rounded-lg"
              src={currentVideo.url}
              title="Course Video"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Lecture List */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h3 className="text-xl font-semibold mb-4">Course Content</h3>

          <ul className="space-y-3 max-h-125 overflow-y-auto">
            {lectures.map((lecture) => (
              <li
                key={lecture.id}
                onClick={() => setCurrentVideo(lecture)}
                className={`p-3 rounded-lg cursor-pointer transition ${
                  currentVideo.id === lecture.id
                    ? "bg-blue-100 border border-blue-400"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    {lecture.id}. {lecture.title}
                  </span>
                  <span className="text-xs text-gray-500">
                    {lecture.duration}
                  </span>
                </div>
              </li>
            ))}
          </ul>

        </div>

      </div>
    </div>
  );
};

export default CoursePlayer;