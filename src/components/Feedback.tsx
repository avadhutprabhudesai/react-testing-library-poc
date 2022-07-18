import React, { FormEvent, useEffect, useState } from 'react';
import { httpGetCategories } from 'src/api/http';

export default function Feedback() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState('');
  const [details, setDetails] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState({
    title: false,
    category: false,
    details: false,
  });

  useEffect(() => {
    async function getCategories() {
      const result = await httpGetCategories();
      setCategories(result);
    }
    getCategories();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title) {
      setError((err) => {
        return {
          ...err,
          title: true,
        };
      });
    }
    if (!category) {
      setError((err) => {
        return {
          ...err,
          category: true,
        };
      });
    }
    if (!details) {
      setError((err) => {
        return {
          ...err,
          details: true,
        };
      });
    }
  };
  return (
    <form name="feedback-form" onSubmit={handleSubmit}>
      <label htmlFor="feedback-title">Feedback Title</label>
      <small>Add a short, descriptive headline</small>
      <input
        type="text"
        id="feedback-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      {error.title && <p>Please provide title for the feedback</p>}

      <label htmlFor="feedback-category">Category</label>
      <small>Choose a category for your feedback</small>
      <select
        id="feedback-category"
        name="feedback-category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        <option value="default">Please select a category</option>
        {categories.map((c) => (
          <option value={c.title} key={c.id}>
            {c.title}
          </option>
        ))}
      </select>
      {error.category && <p>Please select a category for the feedback</p>}

      <label htmlFor="feedback-details">Feedback Details</label>
      <small>
        Include any specific comments on what should be improved, added, etc.
      </small>
      <textarea
        id="feedback-details"
        onChange={(e) => setDetails(e.target.value)}
      ></textarea>
      {error.details && <p>Please provide details for the feedback</p>}

      <button type="submit">Add feedback</button>
      <button>Cancel</button>
    </form>
  );
}
