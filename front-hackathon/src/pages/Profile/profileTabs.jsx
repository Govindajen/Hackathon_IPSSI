import React, { useState } from "react";
import Post from "../../components/Twitter";
import "./tabs.scss";

const ProfileTabs = ({ userPosts, bookmarks }) => {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="profile-tabs-container">
      <div className="tabs-navigation">
        <button 
          className={`tab-button ${activeTab === "posts" ? "active" : ""}`} 
          onClick={() => setActiveTab("posts")}
        >
          Mes Posts
        </button>
        <button 
          className={`tab-button ${activeTab === "bookmarks" ? "active" : ""}`} 
          onClick={() => setActiveTab("bookmarks")}
        >
          Mes Signets
        </button>
      </div>

      <div className="tabs-content">
        {activeTab === "posts" ? (
          <div className="posts-section">
            {userPosts.length > 0 ? (
              userPosts
            ) : (
              <p className="empty-content">Aucun post.</p>
            )}
          </div>
        ) : (
          <div className="bookmarks-section">
            {bookmarks.length > 0 ? (
              bookmarks
            ) : (
              <p className="empty-content">Aucun signet enregistré.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileTabs;