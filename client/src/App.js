import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    level: "Beginner",
    questionsCount: 1,
  });
  const [image, setImage] = useState(null); 
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataWithImage = new FormData();
    formDataWithImage.append("name", formData.name);
    formDataWithImage.append("description", formData.description);
    formDataWithImage.append("level", formData.level);
    formDataWithImage.append("questionsCount", formData.questionsCount);

    if (image) {
      formDataWithImage.append("image", image); 
    }

    try {
      const response = await axios.post("http://localhost:8000/api/quiz", formDataWithImage, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Quiz created successfully!");
      setErrors({}); 
      setFormData({ name: "", description: "", level: "Beginner", questionsCount: 1 });
      setImage(null); 
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="create-quiz-container">
      <h1>Create Quiz</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Quiz Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-input"
          />
          {errors.description && <p className="error-message">{errors.description.message}</p>}
        </div>

        <div className="form-group">
          <label>Level:</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="form-input"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          {errors.level && <p className="error-message">{errors.level.message}</p>}
        </div>

        <div className="form-group">
          <label>Questions Count:</label>
          <input
            type="number"
            name="questionsCount"
            value={formData.questionsCount}
            onChange={handleChange}
            className="form-input"
          />
          {errors.questionsCount && <p className="error-message">{errors.questionsCount.message}</p>}
        </div>

        <div className="form-group">
          <label>Quiz Image:</label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleImageChange}
            className="form-input"
          />
          {errors.image && <p className="error-message">{errors.image.message}</p>}
        </div>

        <button type="submit" className="submit-button">
          Create Quiz
        </button>
      </form>

      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default App;
