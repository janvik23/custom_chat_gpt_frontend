import React, { useState } from "react";
import loadingGif from "./assets/loading.gif";

const QuizForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    gradeLevel: "",
    subject: "",
    curriculum: "",
    topics: "",
    subTopics: "",
    number: 0,
    questionType: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.gradeLevel.trim()) {
      errors.gradeLevel = "Grade Level is required";
    }
    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    }
    if (!formData.curriculum.trim()) {
      errors.curriculum = "Curriculum is required";
    }
    if (!formData.topics.trim()) {
      errors.topics = "Topics is required";
    }
    if (!formData.subTopics.trim()) {
      errors.subTopics = "Sub-Topics is required";
    }
    if (formData.number <= 0) {
      errors.number = "Number of Questions should be greater than 0";
    }
    if (!formData.questionType) {
      errors.questionType = "Question Type is required";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(e, formData);
    }
  };

  return (
    <form className="quiz-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Grade Level:</label>
        <div className="input-group">
          <input
            type="number"
            name="gradeLevel"
            value={formData.gradeLevel}
            onChange={handleInputChange}
            className="form-input"
            min={1}
            max={12}
          />
          {validationErrors.gradeLevel && (
            <span className="validation-error">
              {validationErrors.gradeLevel}
            </span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Subject:</label>
        <div className="input-group">
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="form-input"
          />
          {validationErrors.subject && (
            <span className="validation-error">{validationErrors.subject}</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Curriculum:</label>
        <div className="input-group">
          <input
            type="text"
            name="curriculum"
            value={formData.curriculum}
            onChange={handleInputChange}
            className="form-input"
          />
          {validationErrors.curriculum && (
            <span className="validation-error">
              {validationErrors.curriculum}
            </span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Topics:</label>
        <div className="input-group">
          <input
            type="text"
            name="topics"
            value={formData.topics}
            onChange={handleInputChange}
            className="form-input"
          />
          {validationErrors.topics && (
            <span className="validation-error">{validationErrors.topics}</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Sub-Topics:</label>
        <div className="input-group">
          <input
            type="text"
            name="subTopics"
            value={formData.subTopics}
            onChange={handleInputChange}
            className="form-input"
          />
          {validationErrors.subTopics && (
            <span className="validation-error">
              {validationErrors.subTopics}
            </span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Number of Questions:</label>
        <div className="input-group">
          <input
            type="number"
            name="number"
            value={formData.number}
            onChange={handleInputChange}
            className="form-input"
            min={0}
          />
          {validationErrors.number && (
            <span className="validation-error">{validationErrors.number}</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Question Type:</label>
        <div className="input-group">
          <select
            name="questionType"
            value={formData.questionType}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="">Select</option>
            <option value="MCQ">MCQ</option>
            <option value="Open-ended">Open-ended</option>
          </select>
          {validationErrors.questionType && (
            <span className="validation-error">
              {validationErrors.questionType}
            </span>
          )}
        </div>
      </div>

      <div className="form-group-btn">
        <button
          type="submit"
          className="form-button"
          style={{ opacity: loading ? 0.7 : 1 }}
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? (
            <div
              className="loader"
              style={{
                backgroundImage: `url(${loadingGif})`,
              }}
            />
          ) : (
            "Generate Quiz"
          )}
        </button>
      </div>
    </form>
  );
};

export default QuizForm;
