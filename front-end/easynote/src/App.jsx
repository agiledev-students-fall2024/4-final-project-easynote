import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProfileProvider } from './components/ProfileContext';
import Layout from './components/Layout';
import Home from './components/Home';
import NewNote from './components/NewNote.jsx';
import ExistingNotes from './components/ExistingNotes';
import Login from './components/Login';
import Signup from './components/SignUp';
import AuthGuard from './components/AuthGuard';
import EditNote from './components/EditNote';
import ViewNote from './components/ViewNote';
import Transcription from './components/Transcription';


const App = () => {
  return (
    <ProfileProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <AuthGuard>
                  <Home />
                </AuthGuard>
              }
            />
            <Route
              path="new-note"
              element={
                <AuthGuard>
                  <NewNote />
                </AuthGuard>
              }
            />
            <Route
              path="existing-notes"
              element={
                <AuthGuard>
                  <ExistingNotes />
                </AuthGuard>
              }
            />
            <Route
              path="edit-note"
              element={
                <AuthGuard>
                  <EditNote />
                </AuthGuard>
              }
            />
            <Route
              path="view-note"
              element={
                <AuthGuard>
                  <ViewNote />
                </AuthGuard>
              }
            />
            <Route
              path="transcription"
              element={
                <AuthGuard>
                  <Transcription />
                </AuthGuard>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProfileProvider>
  );
};

export default App;