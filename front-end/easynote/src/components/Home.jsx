import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from './ProfileContext';

// Using the same mock data structure from ExistingNotes.jsx
const mockNotes = [
  {
    id: 1,
    title: "Introduction to React Hooks",
    preview: "React Hooks are functions that allow you to use state and other React features in functional components...",
    category: "Programming",
    lastModified: "2024-10-25T14:48:00",
    tags: ["react", "javascript", "web development"],
    author: "john.doe@email.com"
  },
  {
    id: 2,
    title: "Linear Algebra Notes - Matrices",
    preview: "A matrix is a rectangular array of numbers, symbols, or expressions arranged in rows and columns...",
    category: "Mathematics",
    lastModified: "2024-10-24T09:30:00",
    tags: ["math", "linear algebra", "matrices"],
    author: "john.doe@email.com"
  },
  {
    id: 3,
    title: "Physics - Quantum Mechanics",
    preview: "Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties...",
    category: "Physics",
    lastModified: "2024-10-23T16:20:00",
    tags: ["physics", "quantum", "science"],
    author: "john.doe@email.com"
  }
];

const Home = () => {
  const { user } = useProfile(); 
  console.log('Current user:', user); 
  const [recentNotes, setRecentNotes] = useState([]); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem('token');

      try {
        //const response = await fetch('http://localhost:5000/notes', {
        const response = await fetch('https://easynote-aivlj.ondigitalocean.app/api/notes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Recent post:", data);
          const filteredNotes = data
            .filter(note => !user?.email || note.author.email === user.email) 
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) 
            .slice(0, 5);
          
          setRecentNotes(filteredNotes); 
        } else {
          throw new Error('Failed to fetch notes');
        }
      } catch (error) {
        setErrorMessage(error.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchNotes(); 
  }, [user]); 

  if (loading) {
    return <div>Loading...</div>; 
  }


  return (
    <section className="home-view">
      <h1 className="page-title">Easy Note</h1>
      <input type="text" className="search-bar" placeholder="Search for a note or folder here..." />
      
      <div className="notes-container">
        <div className="notes-header">
          <h2 className="notes-title">Recents</h2>
          <Link to="/new-note" className="create-button">New Note</Link>
          <Link to="/existing-notes" className="create-button">Existing Notes</Link>
          <Link to="/transcription" className="create-button">Speech-to-Text</Link>

        </div>
        <ul className="notes-list">
          {recentNotes.map(note => (
            <li key={note.id} className="note-item">
              <Link to={`/note/${note.id}`} className="note-link">
                <div className="note-item-content">
                  <div className="note-item-header">
                    <span className="note-item-title">{note.title}</span>
                    <span className="note-item-category">{note.category}</span>
                  </div>
                  <div className="note-item-details">
                    <span className="note-item-date">
                      {new Date(note.lastModified).toLocaleDateString()}
                    </span>
                    <div className="note-item-tags">
                      {note.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
          {recentNotes.length === 0 && (
            <li className="note-item empty-notes">
              <p>No recent notes. Create a new note to get started!</p>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
};

export default Home;