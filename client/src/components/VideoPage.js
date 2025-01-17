import React, { useState } from "react";
import axios from 'axios';

export default function VideoPage() {
    // create a state for uploading the video file , need state for uploading purpose
    const [videoFile, setVideoFile] = useState(null);
    // user adds a file 
    let handleFileChange = (e) => {
        // variable e represents our event object (button click to upload a file)
        // change videoFile to now be our new file
        setVideoFile(e.target.files[0]); 
    };
    // user hits upload button 
    let handleUpload = async () => {
        // check if valid video file exists 
        if(!videoFile) {
            alert("No Video File Was Chosen!");
            return;
        }
        // we know we have some variable in the videoFile (maybe video maybe not TODO check)
        
        // create a new form , in which we will send the video to the backend for storage
        const data = new FormData();
        data.append('video', videoFile);

        try{
            console.log("Video File: ", videoFile);
            const x = 40;
            const resp = await axios.post('http://localhost:8000/upload/video', videoFile, x);
        } catch(err){

        }
    };
    return (
        <>
        <a href="home.html">fakeYoutube</a><div id="VideoPlacement">
            {/*insert using inner html */}
            <img src="https://images.app.goo.gl/m1gf6yBGxsbS4tVr8" alt=""/>
            </div>
            <input type="file" accept="video/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>

            
            <div id="Information">
                <p>Views:</p>
                <div id="Views">
                    <p></p>
                </div>
                <p>Date Posted:</p>
                <div id="Posted on">
                    <p></p>
                </div>
                <div id="Description">
                    <p></p>
                </div>
            </div>
        </>
    );
  }