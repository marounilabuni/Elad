/* ── REVIEWS STORE — in-memory only, no localStorage ── */

/* Review model: { id, name, rating(1-5), text, createdAt } */

let _reviews = [
  {
    id: 'r1', name: 'שרה מ.', rating: 5,
    text: 'ההסברים ברורים ומסודרים — לבסוף הבנתי דברים שבלבלו אותי שנים בחשבון 5 יח׳. קיבלתי 94 בבגרות!',
    createdAt: '2026-02-10',
  },
  {
    id: 'r2', name: 'יואב כ.', rating: 5,
    text: 'הגישה המסודרת עזרה לי להבין ולפתור כל סוג של שאלה באלגברה. עברתי מכישלון לציון גבוה תוך שבועיים.',
    createdAt: '2026-02-14',
  },
  {
    id: 'r3', name: 'מיכל ד.', rating: 4,
    text: 'הסברים ברורים מאוד. קצת קשה בהתחלה אבל שווה ממש. ממליצה לכל מי שמתקשה במתמטיקה.',
    createdAt: '2026-02-20',
  },
  {
    id: 'r4', name: 'אמיר ל.', rating: 5,
    text: 'לא הבנתי הסתברות בכלל לפני שלמדתי עם אלעד. עכשיו זה הנושא הכי חזק שלי. ממש מומלץ!',
    createdAt: '2026-03-01',
  },
  {
    id: 'r5', name: 'נועה ב.', rating: 4,
    text: 'המרתון היה אינטנסיבי אבל שווה כל שקל. נכנסתי לבחינה הרבה יותר בטוחה ומוכנה.',
    createdAt: '2026-03-15',
  },
];

function getReviews()  { return _reviews.slice(); }

function addReview({ name, rating, text }) {
  const review = {
    id: 'r' + Date.now(),
    name: name.trim(),
    rating: Number(rating),
    text: text.trim(),
    createdAt: new Date().toISOString().slice(0, 10),
  };
  _reviews.unshift(review);
  return review;
}

function getStats() {
  if (!_reviews.length) return { avg: '0.0', count: 0, dist: [0, 0, 0, 0, 0] };
  const dist = [0, 0, 0, 0, 0];
  let sum = 0;
  _reviews.forEach(r => { sum += r.rating; dist[r.rating - 1]++; });
  return { avg: (sum / _reviews.length).toFixed(1), count: _reviews.length, dist };
}
