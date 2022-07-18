import React, { useEffect, useState } from 'react';
import { httpGetCategories } from 'src/api/http';

export default function Feedback() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    async function getCategories() {
      const result = await httpGetCategories();
      setCategories(result);
    }
    getCategories();
  }, []);
  return (
    <form name="feedback-form">
      <label htmlFor="feedback-title">Feedback Title</label>
      <small>Add a short, descriptive headline</small>
      <input type="text" id="feedback-title" autoFocus />

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

      <label htmlFor="feedback-details">Feedback Details</label>
      <small>
        Include any specific comments on what should be improved, added, etc.
      </small>
      <textarea id="feedback-details"></textarea>

      <button type="submit">Add feedback</button>
      <button>Cancel</button>
    </form>
  );
}
