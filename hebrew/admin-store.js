/* ── ADMIN STORE — in-memory only, no localStorage ── */

/* working copies — seeded from data.js at load time */
let _courses  = COURSES.map(c => ({ ...c }));
let _marathons = MARATHONS.map(m => ({ ...m }));

/* ── COURSES ── */
function getCourses()             { return _courses.slice(); }
function addCourse(data)          { const item = { ...data, id: 'c' + Date.now() }; _courses.push(item); return item; }
function updateCourse(id, data)   { _courses = _courses.map(c => c.id === id ? { ...c, ...data } : c); }
function deleteCourse(id)         { _courses = _courses.filter(c => c.id !== id); }

/* ── MARATHONS ── */
function getMarathons()           { return _marathons.slice(); }
function addMarathon(data)        { const item = { ...data, id: 'm' + Date.now() }; _marathons.push(item); return item; }
function updateMarathon(id, data) { _marathons = _marathons.map(m => m.id === id ? { ...m, ...data } : m); }
function deleteMarathon(id)       { _marathons = _marathons.filter(m => m.id !== id); }

/* ── REVIEWS (admin extras) ── */
function updateReview(id, data) {
  const list = getReviews().map(r => r.id === id ? { ...r, ...data } : r);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(list));
}
function deleteReview(id) {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(getReviews().filter(r => r.id !== id)));
}
function addReviewAdmin({ name, rating, text, createdAt }) {
  const list   = getReviews();
  const review = { id: 'r' + Date.now(), name: name.trim(), rating: Number(rating), text: text.trim(), createdAt };
  list.unshift(review);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(list));
  return review;
}
