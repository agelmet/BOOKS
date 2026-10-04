/* BOOKS — Angelo's library. Vanilla JS, no dependencies. Progress lives in localStorage ("books-v1"). */
(function () {
'use strict';
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const KEY = 'books-v1', INT = [1, 3, 7, 21, 60, 120];
const SHELVES = ['mind', 'focus', 'sales', 'business', 'founders', 'people', 'wisdom'];
const SKILLS = ['sales', 'persuasion', 'communication', 'mindset', 'focus', 'leadership', 'strategy', 'wisdom'];
const L = {
 today: ['Today', 'Σήμερα'], library: ['Library', 'Βιβλιοθήκη'], plan: ['Plan', 'Πλάνο'], review: ['Review', 'Επανάληψη'], me: ['Me', 'Εγώ'],
 morning: ['Good morning, Angelo', 'Καλημέρα, Άγγελε'], noon: ['Hello, Angelo', 'Γεια σου, Άγγελε'], evening: ['Good evening, Angelo', 'Καλησπέρα, Άγγελε'],
 heroA: ['One book a week.', 'Ένα βιβλίο την εβδομάδα.'], heroB: ['Ten minutes at a time.', 'Δέκα λεπτά τη φορά.'],
 heroP: ['Learn in the morning, review at night. On a packed day, two minutes keep your streak alive.', 'Το πρωί μαθαίνεις, το βράδυ κάνεις επανάληψη. Σε γεμάτη μέρα, δύο λεπτά κρατούν το σερί σου ζωντανό.'],
 streak: ['day streak', 'μέρες σερί'], mastered: ['books mastered', 'βιβλία κατακτημένα'], ideasL: ['ideas learned', 'ιδέες που έμαθες'],
 level: ['Level', 'Επίπεδο'], toNext: ['XP to the next level', 'XP για το επόμενο επίπεδο'],
 weekBook: ['This week’s book', 'Το βιβλίο της εβδομάδας'], week: ['Week', 'Εβδομάδα'], of: ['of', 'από'],
 start: ['Start', 'Ξεκίνα'], cont: ['Continue', 'Συνέχισε'], open: ['Open the book', 'Άνοιξε το βιβλίο'], min: ['min', 'λεπτά'],
 night: ['Night review', 'Βραδινή επανάληψη'], nightS: ['questions waiting · 5 min', 'ερωτήσεις σε περιμένουν · 5 λεπτά'], nightN: ['Nothing due. Practise anyway · 3 min', 'Τίποτα σε εκκρεμότητα. Κάνε εξάσκηση · 3 λεπτά'],
 nightE: ['Opens after your first lesson', 'Ανοίγει μετά το πρώτο σου μάθημα'],
 quick: ['2-minute mode', 'Λειτουργία 2 λεπτών'], quickS: ['Packed day? 3 questions keep the streak.', 'Γεμάτη μέρα; 3 ερωτήσεις κρατούν το σερί.'],
 skills: ['Your skill wheel', 'Ο τροχός των δεξιοτήτων σου'], skillsP: ['It grows with every idea you learn and every book you master. It shrinks a little when reviews are overdue.', 'Μεγαλώνει με κάθε ιδέα που μαθαίνεις και κάθε βιβλίο που κατακτάς. Μικραίνει λίγο όταν αφήνεις επαναλήψεις να περιμένουν.'],
 sales: ['Sales', 'Πωλήσεις'], persuasion: ['Persuasion', 'Πειθώ'], communication: ['Communication', 'Επικοινωνία'], mindset: ['Mindset', 'Νοοτροπία'], focus: ['Focus', 'Συγκέντρωση'], leadership: ['Leadership', 'Ηγεσία'], strategy: ['Strategy', 'Στρατηγική'], wisdom: ['Wisdom', 'Σοφία'],
 s_mind: ['Mind & calm', 'Νους & ηρεμία'], s_focus: ['Focus & action', 'Συγκέντρωση & δράση'], s_sales: ['Sales & persuasion', 'Πωλήσεις & πειθώ'], s_business: ['Building a business', 'Χτίζοντας επιχείρηση'], s_founders: ['Founders’ stories', 'Ιστορίες ιδρυτών'], s_people: ['People & power', 'Άνθρωποι & εξουσία'], s_wisdom: ['Wisdom & the big picture', 'Σοφία & η μεγάλη εικόνα'],
 d_mind: ['Stay steady whatever happens around you.', 'Μείνε σταθερός, ό,τι κι αν συμβαίνει γύρω σου.'], d_focus: ['Do the important work, even when you don’t feel like it.', 'Κάνε τη σημαντική δουλειά, ακόμη κι όταν δεν έχεις όρεξη.'], d_sales: ['Why people say yes — and how to ask honestly.', 'Γιατί οι άνθρωποι λένε «ναι» — και πώς να το ζητάς τίμια.'], d_business: ['From doing everything yourself to a company that runs.', 'Από το «τα κάνω όλα μόνος» σε εταιρεία που τρέχει.'], d_founders: ['How the real ones did it, mistakes included.', 'Πώς το έκαναν οι πραγματικοί, μαζί με τα λάθη τους.'], d_people: ['Read people, groups and power clearly.', 'Διάβαζε καθαρά ανθρώπους, ομάδες και εξουσία.'], d_wisdom: ['What a good life is, and where we all came from.', 'Τι είναι μια καλή ζωή και από πού ερχόμαστε όλοι.'],
 libH: ['Your library', 'Η βιβλιοθήκη σου'], libP: ['Every book holds all its key ideas, a real example for each, and how to use it. Nothing lives in your phone notes any more.', 'Κάθε βιβλίο έχει όλες τις βασικές του ιδέες, ένα αληθινό παράδειγμα για την καθεμία και πώς να τη χρησιμοποιήσεις. Τίποτα δεν μένει πια στις σημειώσεις του κινητού.'],
 booksN: ['books', 'βιβλία'], ideasN: ['ideas', 'ιδέες'], next: ['Coming next', 'Έρχονται'], nextP: ['Books that fill your gaps (speaking, negotiation, offers, habits). Tick the ones you want, then tell Claude «add my ticked books».', 'Βιβλία που καλύπτουν τα κενά σου (ομιλία, διαπραγμάτευση, προσφορές, συνήθειες). Τσέκαρε όσα θέλεις και πες στον Claude «πρόσθεσε τα βιβλία που τσέκαρα».'],
 story: ['The book', 'Το βιβλίο'], forYou: ['Why it matters for you', 'Γιατί σε αφορά'], stations: ['Your 7 stations', 'Οι 7 στάσεις σου'], allIdeas: ['All the ideas', 'Όλες οι ιδέες'],
 idea: ['The idea', 'Η ιδέα'], example: ['Real example', 'Αληθινό παράδειγμα'], use: ['How you use it', 'Πώς το χρησιμοποιείς'], terms: ['Key terms', 'Βασικοί όροι'],
 missions: ['Missions for real life', 'Αποστολές στην πραγματική ζωή'], mantra: ['Say it out loud', 'Πες το δυνατά'], careful: ['Keep in mind', 'Κράτα στο μυαλό σου'], connects: ['Connects with', 'Συνδέεται με'],
 st0: ['New ideas', 'Νέες ιδέες'], st4: ['Real situations', 'Αληθινές καταστάσεις'], st5: ['Mission day', 'Μέρα αποστολής'], st6: ['Final test', 'Τελικό τεστ'],
 sd0: ['ideas, one quick question each', 'ιδέες, μία γρήγορη ερώτηση η καθεμία'], sd4: ['What would you do? + true or false + match', 'Τι θα έκανες; + σωστό ή λάθος + ταίριασμα'], sd5: ['Do one thing in real life and tick it', 'Κάνε ένα πράγμα στην πραγματική ζωή και τσέκαρέ το'], sd6: ['15 questions. 80% and the book is yours.', '15 ερωτήσεις. Με 80% το βιβλίο είναι δικό σου.'],
 mon: ['MON', 'ΔΕΥ'], tue: ['TUE', 'ΤΡΙ'], wed: ['WED', 'ΤΕΤ'], thu: ['THU', 'ΠΕΜ'], fri: ['FRI', 'ΠΑΡ'], sat: ['SAT', 'ΣΑΒ'], sun: ['SUN', 'ΚΥΡ'],
 r0: ['New ideas', 'Νέες ιδέες'], r4: ['Situations', 'Καταστάσεις'], r5: ['Mission', 'Αποστολή'], r6: ['Test', 'Τεστ'],
 planH: ['Your plan', 'Το πλάνο σου'], planP: ['26 books, 26 weeks. The days are a suggestion: do more when you have time, and nothing breaks if you miss a day.', '26 βιβλία, 26 εβδομάδες. Οι μέρες είναι πρόταση: κάνε περισσότερα όταν έχεις χρόνο, και τίποτα δεν χαλάει αν χάσεις μια μέρα.'],
 makeCur: ['Study this now', 'Μελέτησέ το τώρα'], current: ['Now', 'Τώρα'], done: ['Mastered', 'Κατακτήθηκε'],
 revH: ['Review', 'Επανάληψη'], revP: ['Every question comes back after 1, 3, 7, 21 and 60 days. Answer it right each time and it stays for good.', 'Κάθε ερώτηση επιστρέφει μετά από 1, 3, 7, 21 και 60 μέρες. Αν την απαντάς σωστά κάθε φορά, μένει για πάντα.'],
 due: ['due now', 'σε εκκρεμότητα'], startRev: ['Start review', 'Ξεκίνα επανάληψη'], practise: ['Practise', 'Εξάσκηση'], memory: ['How well each book sits in your memory', 'Πόσο καλά κάθεται κάθε βιβλίο στη μνήμη σου'], noRev: ['Finish your first lesson and your review cards will appear here.', 'Τελείωσε το πρώτο σου μάθημα και οι κάρτες επανάληψης θα εμφανιστούν εδώ.'],
 meH: ['Your progress', 'Η πρόοδός σου'], move: ['Move progress to another device', 'Μεταφορά προόδου σε άλλη συσκευή'], moveP: ['Progress is saved in this browser. To continue on your phone or laptop: copy the code here, open BOOKS there, paste it and press Load.', 'Η πρόοδος αποθηκεύεται σε αυτόν τον browser. Για να συνεχίσεις στο κινητό ή στο laptop: αντίγραψε τον κωδικό εδώ, άνοιξε το BOOKS εκεί, κάνε επικόλληση και πάτα Φόρτωση.'],
 copy: ['Copy my code', 'Αντιγραφή κωδικού'], load: ['Load', 'Φόρτωση'], paste: ['Paste a code here', 'Επικόλλησε εδώ έναν κωδικό'], copied: ['Copied', 'Αντιγράφηκε'], loaded: ['Progress loaded', 'Η πρόοδος φορτώθηκε'], bad: ['That code is not valid', 'Ο κωδικός δεν είναι έγκυρος'],
 reset: ['Start from zero', 'Ξεκίνα από το μηδέν'], resetQ: ['Tap again to erase all progress', 'Πάτα ξανά για να σβηστεί όλη η πρόοδος'],
 q_c: ['Quick check', 'Γρήγορος έλεγχος'], q_s: ['What would you do?', 'Τι θα έκανες;'], q_t: ['True or false?', 'Σωστό ή λάθος;'], tr: ['True', 'Σωστό'], fa: ['False', 'Λάθος'],
 right: ['Correct', 'Σωστά'], wrong: ['Not quite', 'Όχι ακριβώς'], nextB: ['Next', 'Επόμενο'], finish: ['Finish', 'Τέλος'], gotIt: ['Got it — test me', 'Το ’πιασα — ρώτα με'],
 showEx: ['Show me a real example', 'Δείξε μου ένα αληθινό παράδειγμα'], showUse: ['How do I use it?', 'Πώς το χρησιμοποιώ;'],
 pairsH: ['Match each term with its meaning', 'Ταίριαξε κάθε όρο με τη σημασία του'], pairsK: ['Match', 'Ταίριασμα'],
 misH: ['Pick one and do it for real', 'Διάλεξε μία και κάν’ την στ’ αλήθεια'], misP: ['Tick it only when it is done. You can come back tonight.', 'Τσέκαρέ την μόνο όταν γίνει. Μπορείς να γυρίσεις το βράδυ.'], later: ['I’ll do it and come back', 'Θα το κάνω και θα γυρίσω'],
 e_done: ['Station complete', 'Η στάση ολοκληρώθηκε'], e_rev: ['Review done', 'Η επανάληψη ολοκληρώθηκε'], e_pass: ['Book mastered', 'Το βιβλίο κατακτήθηκε'], e_fail: ['Almost there', 'Σχεδόν εκεί'],
 e_failP: ['You need 80%. Open the ideas below once more, then try again.', 'Χρειάζεσαι 80%. Άνοιξε ξανά τις παρακάτω ιδέες και δοκίμασε πάλι.'], e_passP: ['It goes on your shelf with a gold seal. Its questions will keep coming back so it stays.', 'Μπαίνει στο ράφι σου με χρυσή σφραγίδα. Οι ερωτήσεις του θα επιστρέφουν για να μείνει.'],
 correct: ['correct', 'σωστές'], back: ['Back', 'Πίσω'], again: ['Try again', 'Δοκίμασε ξανά'], tomorrow: ['See you at the next station.', 'Τα λέμε στην επόμενη στάση.'],
 lv: [['Curious reader', 'Περίεργος αναγνώστης'], ['Student', 'Μαθητής'], ['Apprentice', 'Μαθητευόμενος'], ['Practitioner', 'Εφαρμοστής'], ['Sharp mind', 'Κοφτερό μυαλό'], ['Strategist', 'Στρατηγός'], ['Master', 'Δάσκαλος'], ['Polymath', 'Πολυμαθής']],
 weeksLeft: ['Starts when you do', 'Ξεκινά όταν ξεκινήσεις'], readAll: ['Read all ideas', 'Διάβασε όλες τις ιδέες'], ahead: ['Finished. Start the next book early?', 'Τελείωσε. Ξεκινάς το επόμενο βιβλίο νωρίτερα;'], allDone: ['You mastered the whole library.', 'Κατέκτησες όλη τη βιβλιοθήκη.']
};
const LVX = [0, 300, 900, 2000, 3800, 6500, 10000, 15000];
const WISH = [
 ['Never Split the Difference', 'Chris Voss', ['Negotiation, from an FBI negotiator', 'Διαπραγμάτευση, από διαπραγματευτή του FBI']],
 ['How to Win Friends and Influence People', 'Dale Carnegie', ['The classic on getting along with people', 'Το κλασικό για τις σχέσεις με τους ανθρώπους']],
 ['$100M Offers', 'Alex Hormozi', ['Offers so good people feel silly saying no', 'Προσφορές που δύσκολα αρνείται κανείς']],
 ['Talk Like TED', 'Carmine Gallo', ['Public speaking that people remember', 'Ομιλία μπροστά σε κοινό που μένει στη μνήμη']],
 ['Made to Stick', 'Chip & Dan Heath', ['Why some messages stick and others die', 'Γιατί κάποια μηνύματα μένουν και άλλα χάνονται']],
 ['Atomic Habits', 'James Clear', ['Small habits, big change', 'Μικρές συνήθειες, μεγάλη αλλαγή']],
 ['Thinking, Fast and Slow', 'Daniel Kahneman', ['How your mind fools you', 'Πώς σε ξεγελά το μυαλό σου']],
 ['The Psychology of Money', 'Morgan Housel', ['How people really behave with money', 'Πώς φέρονται πραγματικά οι άνθρωποι με τα χρήματα']],
 ['Building a StoryBrand', 'Donald Miller', ['A clear message for any business', 'Καθαρό μήνυμα για κάθε επιχείρηση']],
 ['The Hard Thing About Hard Things', 'Ben Horowitz', ['Leading when there are no easy answers', 'Ηγεσία όταν δεν υπάρχουν εύκολες απαντήσεις']],
 ['Crucial Conversations', 'Patterson, Grenny, McMillan, Switzler', ['Talking when the stakes are high', 'Συζητήσεις όταν διακυβεύονται πολλά']],
 ['The 48 Laws of Power', 'Robert Greene', ['How power works, for better and worse', 'Πώς λειτουργεί η εξουσία, για καλό και για κακό']]
];
let S, IDX = null, BY = {}, CACHE = {};
const DEF = () => ({ v: 1, lang: 'en', xp: 0, days: {}, cur: null, start: null, b: {}, it: {}, wish: [] });
function load() { try { S = Object.assign(DEF(), JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { S = DEF(); } }
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }
const t = k => (L[k] || [k, k])[S.lang === 'el' ? 1 : 0];
const T = o => o ? (o[S.lang] || o.en) : '';
const day = (d = new Date()) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const addDays = (n, from) => { const d = from ? new Date(from + 'T12:00') : new Date(); d.setDate(d.getDate() + n); return day(d); };
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0;[a[i], a[j]] = [a[j], a[i]]; } return a; };
const bs = id => S.b[id] || (S.b[id] = { l: [], st: [0, 0, 0, 0, 0, 0, 0], m: [], best: 0, mast: null });
const peek = id => S.b[id] || { l: [], st: [0, 0, 0, 0, 0, 0, 0], m: [], best: 0, mast: null };
async function book(id) { if (!CACHE[id]) CACHE[id] = await (await fetch('data/books/' + id + '.json')).json(); return CACHE[id]; }
function streak() { let n = 0, d = new Date(); if (!S.days[day(d)]) d.setDate(d.getDate() - 1); while (S.days[day(d)]) { n++; d.setDate(d.getDate() - 1); } return n; }
function level() { let i = 0; while (i < LVX.length - 1 && S.xp >= LVX[i + 1]) i++; return i; }
function dueKeys() { const td = day(); return Object.keys(S.it).filter(k => S.it[k].d <= td); }
function curId() { if (S.cur && BY[S.cur] && !peek(S.cur).mast) return S.cur; const f = IDX.books.find(b => !peek(b.id).mast); return f ? f.id : null; }
function chunks(n) { const out = [], per = Math.ceil(n / 4); for (let i = 0; i < 4; i++) out.push([...Array(n).keys()].slice(i * per, (i + 1) * per)); return out; }
function nextStation(id) { const st = peek(id).st; const i = st.findIndex(x => !x); return i < 0 ? 6 : i; }
function progress(id) { const p = peek(id), m = BY[id]; return p.mast ? 1 : Math.min(.95, (p.l.length / m.n) * .7 + (p.st[4] ? .1 : 0) + (p.st[5] ? .1 : 0)); }
function retention(id) { const ks = Object.keys(S.it).filter(k => k.startsWith(id + ':')); if (!ks.length) return null; const td = day(); return ks.filter(k => S.it[k].d > td).length / ks.length; }
function skillScores() {
 return SKILLS.map(s => { let a = 0, w = 0; IDX.books.forEach(b => { const x = b.skills[s]; if (!x) return; const p = peek(b.id); let v = (p.l.length / b.n) * .5 + (p.mast ? .5 : 0); const r = retention(b.id); if (r !== null) v *= .7 + .3 * r; a += v * x; w += x; }); return w ? a / w : 0; });
}
/* ---------- little pieces ---------- */
const ICON = {
 sun: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/></svg>',
 moon: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z"/></svg>',
 bolt: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>',
 home: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z"/></svg>',
 lib: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v18M10 3v18M5 3h5M5 21h5M14 6l4-1 3 15-4 1z"/></svg>',
 cal: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
 rep: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0115-6.7L21 8M21 3v5h-5M21 12a9 9 0 01-15 6.7L3 16M3 21v-5h5"/></svg>',
 me: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>',
 star: '<svg viewBox="0 0 24 24" fill="#fff"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.900 20.6l1.4-6.8L2.200 9.100l6.9-.8z"/></svg>'
};
function hash(s) { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function pattern(id) {
 const h = hash(id), k = h % 5, a = 20 + (h >> 4) % 60, b = 30 + (h >> 9) % 50; let g = '';
 if (k === 0) for (let i = 0; i < 5; i++) g += `<circle cx="${a}" cy="${95 + b / 4}" r="${14 + i * 11}" fill="none" stroke="#fff" stroke-opacity="${.28 - i * .04}" stroke-width="1.2"/>`;
 else if (k === 1) for (let i = 0; i < 9; i++) g += `<path d="M${-10 + i * 14} 150L${30 + i * 14 + a / 3} 60" stroke="#fff" stroke-opacity=".16" stroke-width="5"/>`;
 else if (k === 2) g = `<circle cx="${a + 10}" cy="100" r="34" fill="#fff" fill-opacity=".14"/><circle cx="${a - 12}" cy="${92 + b / 5}" r="24" fill="#000" fill-opacity=".12"/><circle cx="${a + 30}" cy="118" r="12" fill="#fff" fill-opacity=".3"/>`;
 else if (k === 3) for (let i = 0; i < 6; i++) g += `<rect x="${12 + i * 13}" y="${128 - (10 + (((h >>> (i * 3)) % 46)))}" width="8" height="${10 + (((h >>> (i * 3)) % 46))}" rx="2" fill="#fff" fill-opacity="${.14 + i * .03}"/>`;
 else g = `<path d="M-5 ${90 + b / 4}Q25 ${60 + a / 3} 50 ${92 + b / 5}T105 ${88 + a / 6}V150H-5z" fill="#fff" fill-opacity=".13"/><path d="M-5 ${108 + b / 4}Q30 ${88 + a / 4} 55 ${112}T105 ${104}V150H-5z" fill="#000" fill-opacity=".12"/>`;
 return `<svg class="pt" viewBox="0 0 100 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${g}</svg>`;
}
const short = s => s.split(/[:(]/)[0].trim();
const fs = s => { const w = Math.max(...s.split(/\s+/).map(x => x.length)), n = s.length; return Math.min(1, 9.5 / w, n > 26 ? .8 : 1).toFixed(2); };
function cover(m, o = {}) {
 const p = peek(m.id), pr = progress(m.id), tag = o.link === false ? 'span' : 'a';
 return `<${tag} class="cover" data-shelf="${m.shelf}" ${tag === 'a' ? `href="#/book/${m.id}" aria-label="${esc(T(m.title))}"` : ''}>${pattern(m.id)}<span class="ct" style="--fs:${fs(short(T(m.title)))}">${esc(short(T(m.title)))}</span>` +
  (o.bare ? '' : (p.mast ? `<span class="seal">${ICON.star}</span>` : (pr > 0 ? `<span class="pg"><b style="width:${Math.round(pr * 100)}%"></b></span>` : '')) + `<span class="ca">${esc(S.lang === 'el' ? m.authorEl : m.author)}</span>`) + `</${tag}>`;
}
function toast(s) { const d = document.createElement('div'); d.className = 'toast'; d.textContent = s; document.body.appendChild(d); setTimeout(() => d.remove(), 2200); }
function confetti(n = 140) {
 if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
 const c = $('#fx'), x = c.getContext('2d'); c.width = innerWidth; c.height = innerHeight;
 const col = ['#E0502D', '#4450B5', '#0F7F6E', '#C2922A', '#9A2B4B', '#5C7A2C'];
 const P = Array.from({ length: n }, () => ({ x: innerWidth / 2 + (Math.random() - .5) * 120, y: innerHeight * .45, vx: (Math.random() - .5) * 16, vy: -Math.random() * 15 - 4, s: 5 + Math.random() * 7, r: Math.random() * 6, c: col[Math.random() * col.length | 0] }));
 let f = 0; (function tick() { x.clearRect(0, 0, c.width, c.height); P.forEach(p => { p.vy += .4; p.x += p.vx; p.y += p.vy; p.r += .2; p.vx *= .99; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * .6); x.restore(); }); if (++f < 150) requestAnimationFrame(tick); else x.clearRect(0, 0, c.width, c.height); })();
}
function stName(i) { return i < 4 ? t('st0') + ' ' + (i + 1) : t('st' + i); }
const DAYK = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
/* ---------- chrome ---------- */
function chrome() {
 const r = (location.hash || '#/').split('/')[1] || '', due = dueKeys().length;
 const items = [['', 'today', 'home'], ['library', 'library', 'lib'], ['plan', 'plan', 'cal'], ['review', 'review', 'rep'], ['me', 'me', 'me']];
 const on = k => (k === r || (k === 'library' && r === 'book')) ? 'on' : '';
 $('#nav').innerHTML = items.map(([k, l]) => `<a class="${on(k)}" href="#/${k}">${t(l)}${k === 'review' && due ? `<span class="dot">${due}</span>` : ''}</a>`).join('');
 $('#tabs').innerHTML = items.map(([k, l, i]) => `<a class="${on(k)}" href="#/${k}">${ICON[i]}${t(l)}${k === 'review' && due ? `<span class="dot">${due}</span>` : ''}</a>`).join('');
 $$('#lang button').forEach(b => b.classList.toggle('on', b.dataset.l === S.lang));
 document.documentElement.lang = S.lang;
}
/* ---------- views ---------- */
function vToday() {
 const id = curId(), h = new Date().getHours(), lv = level(), nx = LVX[lv + 1], due = dueKeys().length, has = Object.keys(S.it).length;
 const mast = IDX.books.filter(b => peek(b.id).mast).length, ideas = IDX.books.reduce((a, b) => a + peek(b.id).l.length, 0);
 const sc = skillScores();
 const pts = sc.map((v, i) => { const a = Math.PI * 2 * i / 8 - Math.PI / 2, r = 18 + v * 92; return [150 + Math.cos(a) * r, 150 + Math.sin(a) * r]; });
 const wheel = `<svg viewBox="-52 0 404 300" role="img" aria-label="${t('skills')}">${[1, .66, .33].map(k => `<polygon points="${SKILLS.map((_, i) => { const a = Math.PI * 2 * i / 8 - Math.PI / 2; return (150 + Math.cos(a) * 110 * k) + ',' + (150 + Math.sin(a) * 110 * k); }).join(' ')}" fill="none" stroke="var(--line)" stroke-width="1.2"/>`).join('')}` +
  SKILLS.map((s, i) => { const a = Math.PI * 2 * i / 8 - Math.PI / 2, x = 150 + Math.cos(a) * 128, y = 150 + Math.sin(a) * 128; return `<line x1="150" y1="150" x2="${150 + Math.cos(a) * 110}" y2="${150 + Math.sin(a) * 110}" stroke="var(--line)"/><text x="${x}" y="${y + 4}" text-anchor="${Math.abs(Math.cos(a)) < .3 ? 'middle' : Math.cos(a) > 0 ? 'start' : 'end'}">${t(s)} ${Math.round(sc[i] * 100)}</text>`; }).join('') +
  `<polygon class="poly" points="${pts.map(p => p.join(',')).join(' ')}"/></svg>`;
 let wk = '';
 if (id) {
  const m = BY[id], p = peek(id), n = nextStation(id), wkN = IDX.books.findIndex(b => b.id === id) + 1, started = p.st.some(x => x);
  wk = `<section class="card week" data-shelf="${m.shelf}"><div class="wtop">${cover(m)}</div><div>
   <span class="eyebrow">${t('weekBook')} · ${t('week')} ${wkN} ${t('of')} ${IDX.books.length}</span>
   <h2 class="h2">${esc(T(m.title))}</h2><p class="mut">${esc(T(m.oneLine))}</p>
   <div class="days">${DAYK.map((d, i) => `<button class="day ${p.st[i] ? 'dn' : i === n ? 'nx' : ''}" data-st="${i}"><b>${t(d)}</b>${i < 4 ? t('r0') : t('r' + i)}</button>`).join('')}</div>
   <div class="row"><button class="btn c1 shine" data-st="${n}">${ICON.sun}${started ? t('cont') : t('start')}: ${stName(n)} · ~10 ${t('min')}</button><a class="btn gh" href="#/book/${id}">${t('open')}</a></div></div></section>`;
 } else wk = `<section class="card c"><h2 class="h2">${t('allDone')}</h2></section>`;
 return `<section class="hero"><div class="hello"><span class="eyebrow">${t(h < 12 ? 'morning' : h < 18 ? 'noon' : 'evening')}</span>
  <h1 class="h1">${t('heroA')}<br><em>${t('heroB')}</em></h1><p class="mut" style="max-width:46ch">${t('heroP')}</p>
  </div><div class="side"><div class="stats"><div class="stat fire"><b>${streak()}</b><span>${t('streak')}</span></div><div class="stat"><b>${mast}<small> / ${IDX.books.length}</small></b><span>${t('mastered')}</span></div><div class="stat"><b>${ideas}<small> / ${IDX.books.reduce((a, b) => a + b.n, 0)}</small></b><span>${t('ideasL')}</span></div></div>
  <div class="lvl"><div class="row" style="justify-content:space-between"><b>${t('level')} ${lv + 1} · ${L.lv[lv][S.lang === 'el' ? 1 : 0]}</b><span class="sm mut">${nx ? (nx - S.xp) + ' ' + t('toNext') : S.xp + ' XP'}</span></div><div class="bar"><i data-w="${nx ? Math.round((S.xp - LVX[lv]) / (nx - LVX[lv]) * 100) : 100}"></i></div></div></div></section>${wk}
  <div class="duo"><button class="card act" data-shelf="mind" id="night" ${has ? '' : 'disabled style="opacity:.55"'}><span class="ic">${ICON.moon}</span><span><b>${t('night')}</b><span>${has ? (due ? due + ' ' + t('nightS') : t('nightN')) : t('nightE')}</span></span></button>
  <button class="card act" data-shelf="sales" id="quick" ${has ? '' : 'disabled style="opacity:.55"'}><span class="ic">${ICON.bolt}</span><span><b>${t('quick')}</b><span>${has ? t('quickS') : t('nightE')}</span></span></button></div>
  <section class="sec skl"><div><h2 class="h2">${t('skills')}</h2><p class="mut" style="max-width:44ch">${t('skillsP')}</p></div><div class="card wheel">${wheel}</div></section>`;
}
function vLibrary() {
 const mast = IDX.books.filter(b => peek(b.id).mast).length;
 return `<span class="eyebrow">${IDX.books.length} ${t('booksN')} · ${IDX.books.reduce((a, b) => a + b.n, 0)} ${t('ideasN')} · ${mast} ${t('done').toLowerCase()}</span><h1 class="h1" style="margin:8px 0 12px">${t('libH')}</h1><p class="mut" style="max-width:62ch">${t('libP')}</p>` +
  SHELVES.map(s => `<section class="shelf" data-shelf="${s}"><div class="shelf-h"><h2 class="h2">${t('s_' + s)}</h2><span class="mut sm">${t('d_' + s)}</span></div><div class="plank">${IDX.books.filter(b => b.shelf === s).map((b, i) => `<div class="bk" style="--i:${i}">${cover(b)}</div>`).join('')}</div></section>`).join('') +
  `<section class="sec"><h2 class="h2">${t('next')}</h2><p class="mut" style="max-width:62ch">${t('nextP')}</p><div class="wish">${WISH.map((w, i) => `<button data-w="${i}" class="${S.wish.includes(w[0]) ? 'on' : ''}"><i>✓</i><span><b>${esc(w[0])}</b><span>${esc(w[1])} · ${esc(w[2][S.lang === 'el' ? 1 : 0])}</span></span></button>`).join('')}</div></section>`;
}
async function vBook(id) {
 const m = BY[id]; if (!m) return vLibrary();
 const b = await book(id), p = peek(id), n = nextStation(id), ch = chunks(b.ideas.length);
 const sd = i => i < 4 ? ch[i].length + ' ' + t('sd0') : t('sd' + i);
 return `<div data-shelf="${b.shelf}"><section class="bh">${cover(m, { link: false })}<div><span class="eyebrow">${t('s_' + b.shelf)} · ${esc(S.lang === 'el' ? b.authorEl : b.author)} · ${b.year < 0 ? Math.abs(b.year) + (S.lang === 'el' ? ' π.Χ.' : ' BC') : b.year}</span>
  <h1 class="h1">${esc(T(b.title))}</h1><div class="row" style="margin-top:8px">${Object.keys(b.skills).map(s => `<span class="chip">${t(s)}</span>`).join('')}<span class="chip">${b.ideas.length} ${t('ideasN')}</span>${p.mast ? `<span class="chip" style="--c:var(--gold)">${t('done')}</span>` : ''}</div>
  <p class="one">${esc(T(b.oneLine))}</p><div class="row" style="margin-top:22px"><button class="btn c1 shine" data-st="${n}">${p.st.some(x => x) ? t('cont') : t('start')}: ${stName(n)}</button>${S.cur !== id && !p.mast && curId() !== id ? `<button class="btn gh" id="mk">${t('makeCur')}</button>` : ''}</div></div></section>
  <section class="sec grid2"><div class="card"><h3>${t('story')}</h3><p>${esc(T(b.story))}</p></div><div class="card"><h3>${t('forYou')}</h3><p>${esc(T(b.forYou))}</p></div></section>
  <section class="sec"><h2 class="h2">${t('stations')}</h2><div class="card" style="margin-top:12px;padding:8px 18px">${[0, 1, 2, 3, 4, 5, 6].map(i => `<button class="stn ${p.st[i] ? 'dn' : i === n ? 'nx' : ''}" data-st="${i}"><span class="n">${p.st[i] ? '✓' : i + 1}</span><span><b>${t(DAYK[i])} · ${stName(i)}</b><span>${sd(i)}</span></span><span class="go">${p.st[i] ? t('again') : t('start')} →</span></button>`).join('')}</div></section>
  <section class="sec"><h2 class="h2">${t('allIdeas')}</h2><div class="card" style="margin-top:12px;padding:6px 18px">${b.ideas.map((d, i) => `<details class="idea"><summary><span class="n">${i + 1}</span><span>${esc(T(d.title))}</span>${p.l.includes(i) ? '<span class="ck">✓</span>' : ''}</summary><div class="bd"><p>${esc(T(d.explain))}</p><div class="blk"><span class="lab">${t('example')}</span>${esc(T(d.example))}</div><div class="blk use"><span class="lab">${t('use')}</span>${esc(T(d.apply))}</div></div></details>`).join('')}</div></section>
  <section class="sec"><h2 class="h2">${t('terms')}</h2><div class="terms" style="margin-top:12px">${b.pairs.map(x => `<div><b>${esc(T(x.a))}</b>${esc(T(x.b))}</div>`).join('')}</div></section>
  <section class="sec"><h2 class="h2">${t('missions')}</h2><div class="card" style="margin-top:12px;padding:8px 18px">${b.missions.map((x, i) => `<button class="ms ${p.m.includes(i) ? 'on' : ''}" data-m="${i}"><i>✓</i><span>${esc(T(x))}</span></button>`).join('')}</div></section>
  <section class="sec"><div class="mantra"><small>${t('mantra')}</small>${esc(T(b.mantra))}</div></section>
  <section class="sec grid2"><div class="card warn"><h3>${t('careful')}</h3><p>${esc(T(b.careful))}</p></div><div class="card"><h3>${t('connects')}</h3>${b.connects.filter(c => BY[c.book]).map(c => `<a class="cn" href="#/book/${c.book}">${cover(BY[c.book], { link: false, bare: true })}<span><b>${esc(T(BY[c.book].title))}</b><span>${esc(T(c.note))}</span></span></a>`).join('')}</div></section></div>`;
}
function vPlan() {
 const cur = curId(), startD = S.start ? new Date(S.start + 'T12:00') : null;
 const fmt = d => d.toLocaleDateString(S.lang === 'el' ? 'el-GR' : 'en-GB', { day: 'numeric', month: 'short' });
 return `<span class="eyebrow">${t('plan')}</span><h1 class="h1" style="margin:8px 0 12px">${t('planH')}</h1><p class="mut" style="max-width:62ch">${t('planP')}</p>
  <div class="rhythm">${DAYK.map((d, i) => `<div><b>${t(d)}</b>${i < 4 ? t('r0') : t('r' + i)}</div>`).join('')}</div>
  <section class="sec card" style="padding:8px 14px">${IDX.books.map((b, i) => { const p = peek(b.id); let when = t('weeksLeft'); if (startD) { const a = new Date(startD); a.setDate(a.getDate() + i * 7); const z = new Date(a); z.setDate(z.getDate() + 6); when = fmt(a) + ' – ' + fmt(z); }
   return `<div class="wk ${b.id === cur ? 'cur' : ''}" data-shelf="${b.shelf}" style="--i:${Math.min(i, 12)}"><div class="w"><small>${t('week')}</small>${i + 1}</div>${cover(b, { bare: true })}<div><b>${esc(T(b.title))}</b><span>${t('s_' + b.shelf)} · ${p.mast ? t('done') : when}</span></div>${p.mast ? `<span class="chip" style="--c:var(--gold)">✓ ${t('done')}</span>` : b.id === cur ? `<span class="chip">${t('current')}</span>` : `<button class="btn gh sm" data-cur="${b.id}">${t('makeCur')}</button>`}</div>`; }).join('')}</section>`;
}
function vReview() {
 const due = dueKeys().length, has = Object.keys(S.it).length;
 const rows = IDX.books.map(b => [b, retention(b.id)]).filter(x => x[1] !== null);
 return `<span class="eyebrow">${due} ${t('due')}</span><h1 class="h1" style="margin:8px 0 12px">${t('revH')}</h1><p class="mut" style="max-width:62ch">${t('revP')}</p>
  <div class="row" style="margin-top:22px">${has ? `<button class="btn shine" id="night">${ICON.moon}${due ? t('startRev') + ' · ' + Math.min(due, 12) : t('practise')}</button><button class="btn gh" id="quick">${ICON.bolt}${t('quick')}</button>` : `<p class="card">${t('noRev')}</p>`}</div>
  ${rows.length ? `<section class="sec"><h2 class="h2">${t('memory')}</h2><div class="card" style="margin-top:12px;padding:8px 18px">${rows.map(([b, r]) => `<div class="ret" data-shelf="${b.shelf}"><a href="#/book/${b.id}">${esc(T(b.title))}</a><div class="bar"><i style="width:${Math.round(r * 100)}%"></i></div><span>${Math.round(r * 100)}%</span></div>`).join('')}</div></section>` : ''}`;
}
function vMe() {
 const lv = level(), mast = IDX.books.filter(b => peek(b.id).mast);
 return `<span class="eyebrow">${t('level')} ${lv + 1} · ${S.xp} XP</span><h1 class="h1" style="margin:8px 0 12px">${t('meH')}</h1>
  <div class="stats"><div class="stat fire"><b>${streak()}</b><span>${t('streak')}</span></div><div class="stat"><b>${mast.length}<small> / ${IDX.books.length}</small></b><span>${t('mastered')}</span></div><div class="stat"><b>${Object.keys(S.days).length}</b><span>${S.lang === 'el' ? 'μέρες μελέτης' : 'days studied'}</span></div><div class="stat"><b>${S.xp}</b><span>XP · ${L.lv[lv][S.lang === 'el' ? 1 : 0]}</span></div></div>
  ${mast.length ? `<section class="sec"><h2 class="h2">${t('done')}</h2><div class="plank">${mast.map((b, i) => `<div class="bk" style="--i:${i}">${cover(b)}</div>`).join('')}</div></section>` : ''}
  <section class="sec card"><h3 style="--c:var(--ink)">${t('move')}</h3><p class="mut sm" style="margin-bottom:14px">${t('moveP')}</p><div class="row"><button class="btn sm" id="exp">${t('copy')}</button></div><textarea id="imp" placeholder="${t('paste')}" style="margin-top:14px"></textarea><div class="row" style="margin-top:10px"><button class="btn gh sm" id="impB">${t('load')}</button><button class="btn gh sm" id="rst" style="margin-left:auto;color:var(--no)">${t('reset')}</button></div></section>`;
}
async function render() {
 const [, r, a] = (location.hash || '#/').split('/'); chrome();
 const app = $('#app');
 app.innerHTML = r === 'library' ? vLibrary() : r === 'book' ? await vBook(a) : r === 'plan' ? vPlan() : r === 'review' ? vReview() : r === 'me' ? vMe() : vToday();
 app.style.animation = 'none'; void app.offsetWidth; app.style.animation = '';
 requestAnimationFrame(() => $$('[data-w]', app).forEach(e => { if (e.tagName === 'I') e.style.width = e.dataset.w + '%'; }));
 const bid = r === 'book' ? a : curId();
 $$('[data-st]', app).forEach(e => e.onclick = () => station(bid, +e.dataset.st));
 $$('.ms', app).forEach(e => e.onclick = () => { toggleMission(bid, +e.dataset.m); e.classList.toggle('on'); });
 $$('[data-cur]', app).forEach(e => e.onclick = () => { S.cur = e.dataset.cur; save(); location.hash = '#/'; });
 $$('.wish button', app).forEach(e => e.onclick = () => { const n = WISH[+e.dataset.w][0], i = S.wish.indexOf(n); i < 0 ? S.wish.push(n) : S.wish.splice(i, 1); save(); e.classList.toggle('on'); });
 const on = (s, f) => { const e = $(s, app); if (e) e.onclick = f; };
 on('#night', () => review(12)); on('#quick', () => review(3));
 on('#mk', () => { S.cur = a; save(); toast(t('current')); render(); });
 on('#exp', () => { const code = btoa(unescape(encodeURIComponent(JSON.stringify(S)))); $('#imp').value = code; (navigator.clipboard ? navigator.clipboard.writeText(code) : Promise.reject()).then(() => toast(t('copied')), () => { $('#imp').select(); }); });
 on('#impB', () => { try { const o = JSON.parse(decodeURIComponent(escape(atob($('#imp').value.trim())))); if (!o || typeof o.b !== 'object' || typeof o.it !== 'object') throw 0; S = Object.assign(DEF(), o); save(); toast(t('loaded')); render(); } catch (e) { toast(t('bad')); } });
 on('#rst', function () { if (this.dataset.ok) { S = Object.assign(DEF(), { lang: S.lang }); save(); render(); } else { this.dataset.ok = 1; this.textContent = t('resetQ'); } });
 if (r !== 'book' || !render.same) scrollTo(0, 0); render.same = false;
}
function toggleMission(id, i) { const p = bs(id), k = p.m.indexOf(i); if (k < 0) { p.m.push(i); S.xp += 40; touch(); if (!p.st[5]) { p.st[5] = 1; S.xp += 50; } } else p.m.splice(k, 1); save(); chrome(); }
function touch() { const d = day(); S.days[d] = 1; if (!S.start) { const x = new Date(); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); S.start = day(x); } }
function grade(key, ok) { const it = S.it[key] || { x: 0 }; if (ok) { it.x = Math.min(it.x + 1, INT.length); it.d = addDays(INT[it.x - 1]); } else { it.x = 0; it.d = day(); } S.it[key] = it; }
function getQ(b, k) { const i = +k.slice(1); if (k[0] === 'c') return b.ideas[i] && Object.assign({ kind: 'c', idea: i }, b.ideas[i].check); if (k[0] === 's') return b.scenarios[i] && Object.assign({ kind: 's' }, b.scenarios[i]); return b.truefalse[i] && Object.assign({ kind: 't' }, b.truefalse[i]); }
/* ---------- sessions ---------- */
async function station(id, i) {
 if (!id) return; const b = await book(id), steps = [];
 if (i < 4) chunks(b.ideas.length)[i].forEach(n => { steps.push({ type: 'idea', b, i: n }); steps.push({ type: 'q', b, k: 'c' + n }); });
 else if (i === 4) { shuffle(b.scenarios.map((_, n) => 's' + n)).forEach(k => steps.push({ type: 'q', b, k })); steps.push({ type: 'pairs', b }); shuffle(b.truefalse.map((_, n) => 't' + n)).forEach(k => steps.push({ type: 'q', b, k })); }
 else if (i === 5) steps.push({ type: 'missions', b });
 else { const c = shuffle(b.ideas.map((_, n) => 'c' + n)).slice(0, 9), s = shuffle(b.scenarios.map((_, n) => 's' + n)).slice(0, 3), f = shuffle(b.truefalse.map((_, n) => 't' + n)).slice(0, 3); shuffle(c.concat(s, f)).forEach(k => steps.push({ type: 'q', b, k })); }
 run({ shelf: b.shelf, steps, retry: i < 5, test: i === 6, book: b, st: i });
}
async function review(n) {
 let keys = shuffle(dueKeys()).slice(0, n);
 if (keys.length < Math.min(n, 3)) keys = keys.concat(shuffle(Object.keys(S.it).filter(k => !keys.includes(k))).slice(0, Math.min(n, 6) - keys.length));
 if (!keys.length) return;
 const steps = []; for (const k of keys) { const [id, q] = k.split(':'); if (!BY[id]) continue; const b = await book(id); if (getQ(b, q)) steps.push({ type: 'q', b, k: q, tag: true }); }
 run({ shelf: 'mind', steps, retry: false, rev: true });
}
function run(o) {
 const stage = $('#stage'); let pos = 0, ok = 0, total = 0, xp0 = S.xp, missed = []; const steps = o.steps;
 stage.dataset.shelf = o.shelf; stage.className = 'on'; document.body.style.overflow = 'hidden';
 stage.innerHTML = `<div class="st-top"><button class="st-x" aria-label="Close">×</button><div class="st-bar"><i></i></div><span class="st-xp">+0 XP</span></div><div class="st-body"><div class="st-in"></div></div><div class="st-foot"></div>`;
 const body = $('.st-body', stage), foot = $('.st-foot', stage);
 const close = () => { stage.className = ''; stage.innerHTML = ''; document.body.style.overflow = ''; document.onkeydown = null; save(); render.same = true; render(); };
 $('.st-x', stage).onclick = close;
 const bar = () => { $('.st-bar i', stage).style.width = Math.round(pos / steps.length * 100) + '%'; $('.st-xp', stage).textContent = '+' + (S.xp - xp0) + ' XP'; };
 const put = html => { body.innerHTML = `<div class="st-in">${html}</div>`; body.scrollTop = 0; return $('.st-in', body); };
 const setFoot = (html) => { foot.innerHTML = html; };
 const nextBtn = (label, fn, cls = 'c1') => { setFoot(`<div><button class="btn ${cls}" id="go">${label}</button></div>`); $('#go', foot).onclick = fn; };
 const go = () => { pos++; bar(); save(); pos >= steps.length ? end() : show(); };
 function show() {
  const s = steps[pos]; setFoot(''); document.onkeydown = null; stage.dataset.shelf = s.b ? s.b.shelf : o.shelf;
  if (s.type === 'idea') {
   const d = s.b.ideas[s.i];
   const el = put(`<span class="ic-n">${esc(T(s.b.title))} · ${s.i + 1} / ${s.b.ideas.length}</span><h2 class="i-title">${esc(T(d.title))}</h2><p class="i-p">${esc(T(d.explain))}</p><div id="more"></div>`);
   let k = 0; const more = $('#more', el);
   const adv = () => { k++; if (k === 1) { more.insertAdjacentHTML('beforeend', `<div class="rv ex"><span class="lab">${t('example')}</span>${esc(T(d.example))}</div>`); nextBtn(t('showUse'), adv); } else if (k === 2) { more.insertAdjacentHTML('beforeend', `<div class="rv us"><span class="lab">${t('use')}</span>${esc(T(d.apply))}</div>`); nextBtn(t('gotIt'), adv); } else { const p = bs(s.b.id); if (!p.l.includes(s.i)) { p.l.push(s.i); S.xp += 5; } touch(); go(); return; } body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' }); document.onkeydown = e => { if (e.key === 'Enter') adv(); }; };
   nextBtn(t('showEx'), adv); document.onkeydown = e => { if (e.key === 'Enter') adv(); };
  } else if (s.type === 'q') {
   const q = getQ(s.b, s.k), key = s.b.id + ':' + s.k; total += s.again ? 0 : 1;
   const head = `<span class="chip q-k">${t('q_' + q.kind)}${s.tag ? ' · ' + esc(T(s.b.title)) : ''}</span>`;
   let el, opts;
   if (q.kind === 't') { el = put(`${head}<h2 class="q-t">${esc(T(q.s))}</h2><div class="tf"><button class="opt" data-a="1">${t('tr')}</button><button class="opt" data-a="0">${t('fa')}</button></div>`); opts = $$('.opt', el); }
   else { const ord = shuffle([0, 1, 2]); el = put(`${head}<h2 class="q-t">${esc(T(q.q))}</h2>${ord.map((n, j) => `<button class="opt" data-a="${n === q.answer ? 1 : 0}" data-r="${n === q.answer ? 1 : 0}"><kbd>${j + 1}</kbd><span>${esc(T(q.options[n]))}</span></button>`).join('')}`); opts = $$('.opt', el); }
   const answer = btn => {
    const right = q.kind === 't' ? (btn.dataset.a === '1') === q.answer : btn.dataset.a === '1';
    opts.forEach(x => { x.disabled = true; const isR = q.kind === 't' ? (x.dataset.a === '1') === q.answer : x.dataset.a === '1'; if (isR) x.classList.add('ok'); else if (x === btn) x.classList.add('no'); else x.classList.add('dim'); });
    grade(key, right); touch();
    if (right) { if (!s.again) ok++; S.xp += 10; } else { missed.push(s); if (o.retry && !s.again) steps.push(Object.assign({}, s, { again: true })); }
    setFoot(`<div class="fb ${right ? 'ok' : 'no'}"><b>${right ? t('right') : t('wrong')}</b>${esc(T(q.why))}</div><div><button class="btn ${right ? 'c1' : ''}" id="go">${t('nextB')}</button></div>`);
    $('#go', foot).onclick = go; bar(); document.onkeydown = e => { if (e.key === 'Enter') go(); };
   };
   opts.forEach(x => x.onclick = () => answer(x));
   document.onkeydown = e => { const n = +e.key; if (n >= 1 && n <= opts.length) answer(opts[n - 1]); };
  } else if (s.type === 'pairs') {
   const P = s.b.pairs, A = shuffle(P.map((_, i) => i)), B = shuffle(P.map((_, i) => i));
   const el = put(`<span class="chip q-k">${t('pairsK')}</span><h2 class="q-t">${t('pairsH')}</h2><div class="pairs">${A.map((a, i) => `<button class="pr" data-s="a" data-i="${a}">${esc(T(P[a].a))}</button><button class="pr" data-s="b" data-i="${B[i]}">${esc(T(P[B[i]].b))}</button>`).join('')}</div>`);
   let sel = null, left = P.length;
   $$('.pr', el).forEach(x => x.onclick = () => {
    if (!sel || sel.dataset.s === x.dataset.s) { if (sel) sel.classList.remove('sel'); sel = x; x.classList.add('sel'); return; }
    if (sel.dataset.i === x.dataset.i) { sel.classList.remove('sel'); sel.classList.add('ok'); x.classList.add('ok'); S.xp += 5; left--; sel = null; bar(); if (!left) { touch(); nextBtn(t('nextB'), go); } }
    else { const a = sel; a.classList.remove('sel'); a.classList.add('no'); x.classList.add('no'); sel = null; setTimeout(() => { a.classList.remove('no'); x.classList.remove('no'); }, 450); }
   });
  } else if (s.type === 'missions') {
   const p = bs(s.b.id);
   const el = put(`<span class="chip q-k">${t('st5')}</span><h2 class="q-t">${t('misH')}</h2><p class="mut" style="margin:-10px 0 14px">${t('misP')}</p><div class="card" style="padding:6px 16px">${s.b.missions.map((x, i) => `<button class="ms ${p.m.includes(i) ? 'on' : ''}" data-m="${i}"><i>✓</i><span>${esc(T(x))}</span></button>`).join('')}</div><div class="mantra" style="margin-top:18px"><small>${t('mantra')}</small>${esc(T(s.b.mantra))}</div>`);
   const upd = () => p.m.length ? nextBtn(t('finish'), go) : nextBtn(t('later'), close, 'gh');
   $$('.ms', el).forEach(x => x.onclick = () => { toggleMission(s.b.id, +x.dataset.m); x.classList.toggle('on'); bar(); upd(); }); upd();
  }
 }
 function end() {
  document.onkeydown = null; const pct = total ? Math.round(ok / total * 100) : 100; let title = o.rev ? t('e_rev') : t('e_done'), sub = t('tomorrow'), extra = '', pass = true;
  if (o.book && !o.rev) {
   const p = bs(o.book.id);
   if (o.test) { pass = pct >= 80; p.best = Math.max(p.best, pct); if (pass) { if (!p.mast) { p.mast = day(); S.xp += 300; } p.st[6] = 1; title = t('e_pass'); sub = t('e_passP'); if (S.cur === o.book.id) S.cur = null; } else { title = t('e_fail'); sub = t('e_failP'); const ids = [...new Set(missed.map(m => getQ(m.b, m.k)).map(q => q.idea).filter(x => x !== undefined))]; extra = `<div class="card" style="text-align:left;margin-top:18px;padding:8px 18px">${ids.map(i => `<details class="idea"><summary><span class="n">${i + 1}</span><span>${esc(T(o.book.ideas[i].title))}</span></summary><div class="bd"><p>${esc(T(o.book.ideas[i].explain))}</p></div></details>`).join('')}</div>`; } }
   else if (!p.st[o.st]) { p.st[o.st] = 1; S.xp += 50; }
  }
  touch(); save(); bar(); $('.st-bar i', stage).style.width = '100%';
  const C = 2 * Math.PI * 60;
  put(`<div class="end"><svg class="ring" viewBox="0 0 150 150"><circle class="bg" cx="75" cy="75" r="60"/><circle class="fg" cx="75" cy="75" r="60" stroke-dasharray="${C}" stroke-dashoffset="${C}" style="${pass ? '' : 'stroke:var(--no)'}"/><text x="75" y="87" text-anchor="middle">${pct}%</text></svg>
   <h2 class="big">${title}</h2><p class="mut" style="max-width:42ch;margin:0 auto">${sub}</p>
   <div class="pills"><div class="pill">${ok} / ${total}<small>${t('correct')}</small></div><div class="pill" style="animation-delay:.1s">+${S.xp - xp0} XP<small>${t('level')} ${level() + 1}</small></div><div class="pill" style="animation-delay:.2s">${streak()}<small>${t('streak')}</small></div></div>${extra}</div>`);
  requestAnimationFrame(() => requestAnimationFrame(() => { const f = $('.ring .fg', stage); if (f) f.style.strokeDashoffset = C * (1 - pct / 100); }));
  if (pass && (o.test || pct >= 80)) confetti(o.test ? 220 : 90);
  if (o.test && !pass) { setFoot(`<div><button class="btn gh" id="bk">${t('back')}</button><button class="btn c1" id="go">${t('again')}</button></div>`); $('#bk', foot).onclick = close; $('#go', foot).onclick = () => { close(); station(o.book.id, 6); }; }
  else nextBtn(t('back'), close);
 }
 bar(); steps.length ? show() : close();
}
/* ---------- boot ---------- */
load();
$('#lang').onclick = e => { const b = e.target.closest('button'); if (!b) return; S.lang = b.dataset.l; save(); render.same = true; render(); };
addEventListener('scroll', () => $('#top').classList.toggle('sc', scrollY > 8), { passive: true });
addEventListener('hashchange', render);
fetch('data/index.json').then(r => r.json()).then(j => { IDX = j; j.books.forEach(b => BY[b.id] = b); render(); }).catch(() => { $('#app').innerHTML = '<p class="card">Could not load the library. Check your connection and reload.</p>'; });
})();
