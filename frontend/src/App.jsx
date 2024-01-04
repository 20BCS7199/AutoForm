import "./App.css";
import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    state: "",
    city: "",
    area: "",
    pan: "",
  });

  const [submitStatus, setSubmitStatus] = useState({
    isSubmitted: false,
    isSuccess: false,
  });

  const startSpeechRecognition = (targetInputId) => {
    const recognition =
      new window.webkitSpeechRecognition() || window.SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [targetInputId]: result,
      }));
    };

    recognition.onend = () => {
      recognition.stop();
    };

    recognition.onerror = (event) => {
      console.error(event.error);
    };
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/submitFormData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form data submitted successfully");
        setSubmitStatus({ isSubmitted: true, isSuccess: true });
      } else {
        console.error(
          "Failed to submit form data:",
          response.status,
          response.statusText
        );
        setSubmitStatus({ isSubmitted: true, isSuccess: false });
      }
    } catch (error) {
      console.error("Error submitting form data:", error.message);
      setSubmitStatus({ isSubmitted: true, isSuccess: false });
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">
            First Name<span className="red-asterisk">*</span>
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="Muskan"
              value={formData.firstName}
              onChange={handleChange}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => startSpeechRecognition("firstName")}
              >
                <i className="fas fa-microphone"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="form-group-line">
          <label htmlFor="exampleInputEmail1">
            Last Name<span className="red-asterisk">*</span>
          </label>
          <div className="input-group">
            <input
              value={formData.lastName}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="lastname"
              aria-describedby="emailHelp"
              placeholder="Rastogi"
            ></input>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => startSpeechRecognition("lastName")}
              >
                <i className="fas fa-microphone"></i>
              </button>
            </div>
          </div>
        </div>

        <p>- - - - - - - - - - - - - - - - - - - - - - - - - - - - -</p>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">
            State<span className="red-asterisk">*</span>
          </label>
          <div className="input-group">
            <input
              value={formData.state}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="state"
              aria-describedby="emailHelp"
              placeholder="Karnataka"
            ></input>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => startSpeechRecognition("state")}
              >
                <i className="fas fa-microphone"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">
            City<span className="red-asterisk">*</span>
          </label>
          <div className="input-group">
            <input
              value={formData.city}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="city"
              aria-describedby="emailHelp"
              placeholder="Bangalore"
            ></input>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => startSpeechRecognition("city")}
              >
                <i className="fas fa-microphone"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="form-group-line">
          <label htmlFor="exampleInputEmail1">
            Area<span className="red-asterisk">*</span>
          </label>
          <div className="input-group">
            <input
              value={formData.area}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="area"
              aria-describedby="emailHelp"
              placeholder="Whitefield"
            ></input>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => startSpeechRecognition("area")}
              >
                <i className="fas fa-microphone"></i>
              </button>
            </div>
          </div>
        </div>

        <p>- - - - - - - - - - - - - - - - - - - - - - - - - - - - -</p>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">
            Pan Number<span className="red-asterisk">*</span>
          </label>
          <div className="input-group">
            <input
              value={formData.pan}
              onChange={handleChange}
              type="alphanumeric"
              className="form-control"
              id="pan"
              aria-describedby="emailHelp"
              placeholder="AO647533"
            ></input>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => startSpeechRecognition("pan")}
              >
                <i className="fas fa-microphone"></i>
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`btn ${
            submitStatus.isSuccess ? "btn-success" : "btn-primary"
          }`}
          disabled={submitStatus.isSubmitted}
        >
          {submitStatus.isSubmitted ? "Submitted" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default App;
