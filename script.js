/* ============================================================
   FITBHARAT — script.js
   ============================================================ */

/* ==================== CUSTOM CURSOR ==================== */
(function initCursor() {
  const cur  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  document.addEventListener('mousemove', function(e) {
    cur.style.left  = e.clientX + 'px';
    cur.style.top   = e.clientY + 'px';
    setTimeout(function() {
      ring.style.left = e.clientX + 'px';
      ring.style.top  = e.clientY + 'px';
    }, 60);
  });
})();

/* ==================== SCROLL REVEAL ==================== */
(function initScrollReveal() {
  const reveals  = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  reveals.forEach(function(r) { observer.observe(r); });
})();

/* ==================== BMI CALCULATOR ==================== */
function calcBMI() {
  var h      = parseInt(document.getElementById('bmi-height').value) / 100;
  var w      = parseInt(document.getElementById('bmi-weight').value);
  var bmi    = +(w / (h * h)).toFixed(1);

  var num    = document.getElementById('bmi-num');
  var cat    = document.getElementById('bmi-cat');
  var circle = document.getElementById('bmi-circle');
  var marker = document.getElementById('gauge-marker');
  var advice = document.getElementById('bmi-advice');

  num.textContent = bmi;

  var color, category, pct, tip;

  if (bmi < 18.5) {
    color    = '#3b82f6';
    category = 'Underweight';
    pct      = 10;
    tip      = 'You need to gain healthy weight. A protein-rich Indian diet with strength training will help. We recommend our Muscle Gain plan.';
  } else if (bmi < 25) {
    color    = 'var(--green)';
    category = 'Normal';
    pct      = 38;
    tip      = 'Your BMI is in the healthy range! Focus on strength training and staying active. Our Fitness plan is perfect for you.';
  } else if (bmi < 30) {
    color    = 'var(--gold)';
    category = 'Overweight';
    pct      = 65;
    tip      = "You're slightly above the healthy range. A mix of cardio and diet control will help. Our Weight Loss plan is ideal for you.";
  } else {
    color    = 'var(--red)';
    category = 'Obese';
    pct      = 88;
    tip      = "It's time to take action! Our expert trainers with a personalised plan can help you get back on track safely. Start with our Pro plan.";
  }

  num.style.color           = color;
  cat.style.color           = color;
  cat.textContent           = category;
  circle.style.borderColor  = color + '66';
  marker.style.left         = pct + '%';
  advice.textContent        = tip;
}

// Run on page load
calcBMI();

/* ==================== PLAN QUIZ ==================== */
var questions = [
  {
    q: "What is your main fitness goal?",
    opts: [
      { i: "⚡", t: "Lose Weight Fast" },
      { i: "💪", t: "Build Muscle & Strength" },
      { i: "🏃", t: "Improve Stamina" },
      { i: "🧘", t: "Stay Fit & Healthy" }
    ]
  },
  {
    q: "How often can you visit the gym?",
    opts: [
      { i: "1️⃣", t: "1–2 times/week" },
      { i: "3️⃣", t: "3–4 times/week" },
      { i: "🔥", t: "5–6 times/week" },
      { i: "💯", t: "Every day!" }
    ]
  },
  {
    q: "What's your fitness experience?",
    opts: [
      { i: "🐣", t: "Complete Beginner" },
      { i: "📈", t: "Some Experience" },
      { i: "🏆", t: "Intermediate" },
      { i: "⚡", t: "Advanced Athlete" }
    ]
  },
  {
    q: "What's your budget per month?",
    opts: [
      { i: "💰", t: "Under ₹1,000" },
      { i: "💳", t: "₹1,000 – ₹2,000" },
      { i: "🌟", t: "₹2,000 – ₹5,000" },
      { i: "👑", t: "Best value, no limit" }
    ]
  }
];

var qStep    = 0;
var qAnswers = [];

function renderQuiz() {
  var prog = document.getElementById('quiz-progress');
  var body = document.getElementById('quiz-body');

  // Progress dots
  prog.innerHTML = questions.map(function(q, i) {
    return '<div class="qprog-dot ' + (i < qStep ? 'done' : '') + '"></div>';
  }).join('');

  // Show result if all answered
  if (qStep >= questions.length) {
    showQuizResult();
    return;
  }

  var q = questions[qStep];

  // Build option buttons
  var optsHTML = q.opts.map(function(o, i) {
    return (
      '<button class="qopt ' + (qAnswers[qStep] === i ? 'selected' : '') + '" onclick="selectQuizOpt(' + i + ')">' +
        '<span class="qopt-icon">' + o.i + '</span>' + o.t +
      '</button>'
    );
  }).join('');

  var backVisible = qStep === 0 ? 'style="visibility:hidden"' : '';
  var nextDisabled = qAnswers[qStep] === undefined ? 'disabled style="opacity:0.4;cursor:not-allowed"' : '';

  body.innerHTML =
    '<div class="quiz-q">Q' + (qStep + 1) + '. ' + q.q + '</div>' +
    '<div class="quiz-options">' + optsHTML + '</div>' +
    '<div class="quiz-nav">' +
      '<button class="quiz-back" onclick="quizBack()" ' + backVisible + '>← Back</button>' +
      '<span style="font-size:0.8rem;color:var(--muted)">' + (qStep + 1) + ' of ' + questions.length + '</span>' +
      '<button class="btn btn-primary" style="padding:10px 24px;font-size:0.85rem;" onclick="quizNext()" ' + nextDisabled + '>Next →</button>' +
    '</div>';
}

function selectQuizOpt(i) {
  qAnswers[qStep] = i;
  renderQuiz();
}

function quizNext() {
  if (qAnswers[qStep] !== undefined) {
    qStep++;
    renderQuiz();
  }
}

function quizBack() {
  if (qStep > 0) {
    qStep--;
    renderQuiz();
  }
}

function showQuizResult() {
  var plans = [
    {
      name:     "STARTER",
      price:    "₹999",
      desc:     "Perfect for beginners wanting to lose weight",
      features: ["Member tracking", "Attendance system", "UPI billing", "WhatsApp reminders"],
      color:    "var(--blue)"
    },
    {
      name:     "PRO",
      price:    "₹1,999",
      desc:     "Most popular for serious fitness enthusiasts",
      features: ["Everything in Starter", "Diet & workout plans", "Advanced analytics", "Staff management", "GST invoices"],
      color:    "var(--orange)"
    },
    {
      name:     "ELITE",
      price:    "₹4,999",
      desc:     "For dedicated athletes & multi-branch gyms",
      features: ["Everything in Pro", "Multi-branch support", "Custom branded app", "Priority support", "Custom reports"],
      color:    "var(--gold)"
    }
  ];

  var idx = 1;
  if (qAnswers[3] === 0) idx = 0;
  else if (qAnswers[3] >= 2) idx = 2;

  var plan     = plans[idx];
  var featsHTML = plan.features.map(function(f) { return '<li>' + f + '</li>'; }).join('');

  document.getElementById('quiz-body').innerHTML =
    '<div class="quiz-result">' +
      '<p style="color:var(--muted);font-size:0.88rem;">Based on your answers, we recommend:</p>' +
      '<div class="plan-tag" style="background:linear-gradient(135deg,' + plan.color + ',' + plan.color + 'cc)">' + plan.name + ' PLAN</div>' +
      '<div class="plan-price" style="color:' + plan.color + '">' + plan.price + '<span style="font-size:1rem;color:var(--muted)">/month</span></div>' +
      '<p style="color:var(--muted);margin:8px 0 16px;font-size:0.9rem;">' + plan.desc + '</p>' +
      '<ul>' + featsHTML + '</ul>' +
      '<div style="display:flex;gap:12px;justify-content:center;margin-top:24px;flex-wrap:wrap;">' +
        '<a href="#booking" class="btn btn-primary" style="font-size:0.9rem;padding:12px 28px;">🚀 Start Free Trial</a>' +
        '<button class="quiz-back" onclick="resetQuiz()">Retake Quiz</button>' +
      '</div>' +
    '</div>';

  document.getElementById('quiz-progress').innerHTML =
    questions.map(function() { return '<div class="qprog-dot done"></div>'; }).join('');
}

function resetQuiz() {
  qStep    = 0;
  qAnswers = [];
  renderQuiz();
}

// Init quiz on load
renderQuiz();

/* ==================== BEFORE / AFTER ==================== */
var baData = {
  loss: [
    { name: "Vikram Nair",   city: "Chennai",   duration: "4 Months", before: "94kg",         after: "74kg",         change: "-20kg"  },
    { name: "Pooja Mehta",   city: "Mumbai",    duration: "3 Months", before: "82kg",         after: "68kg",         change: "-14kg"  },
    { name: "Suresh Yadav",  city: "Jaipur",    duration: "6 Months", before: "108kg",        after: "80kg",         change: "-28kg"  }
  ],
  muscle: [
    { name: "Arjun Singh",   city: "Delhi",     duration: "5 Months", before: "58kg",         after: "72kg",         change: "+14kg"  },
    { name: "Rohit Sharma",  city: "Pune",      duration: "4 Months", before: "62kg",         after: "75kg",         change: "+13kg"  },
    { name: "Deepak Verma",  city: "Bengaluru", duration: "6 Months", before: "55kg",         after: "70kg",         change: "+15kg"  }
  ],
  stamina: [
    { name: "Ananya Iyer",   city: "Hyderabad", duration: "3 Months", before: "5km/hr",       after: "12km/hr",      change: "2.4x"   },
    { name: "Kiran Desai",   city: "Ahmedabad", duration: "4 Months", before: "10 pushups",   after: "60 pushups",   change: "6x"     },
    { name: "Meera Nair",    city: "Kolkata",   duration: "3 Months", before: "Rest HR 90",   after: "Rest HR 62",   change: "-31%"   }
  ]
};

function showBA(type, btn) {
  // Update active tab
  document.querySelectorAll('.ba-tab').forEach(function(t) { t.classList.remove('active'); });
  btn.classList.add('active');

  // Render stories
  var cont = document.getElementById('ba-stories');
  cont.innerHTML = baData[type].map(function(d) {
    return (
      '<div class="ba-story active">' +
        '<div class="ba-images">' +
          '<div class="ba-img before-img">' +
            '<div class="ba-img-label">BEFORE</div>' +
            '<div class="ba-figure" style="color:var(--muted)">' + d.before + '</div>' +
            '<div class="ba-unit" style="font-size:0.7rem;letter-spacing:1px;">Starting Point</div>' +
          '</div>' +
          '<div class="ba-img after-img">' +
            '<div class="ba-img-label" style="color:var(--orange)">AFTER</div>' +
            '<div class="ba-figure" style="color:var(--orange)">' + d.after + '</div>' +
            '<div class="ba-unit" style="font-size:0.7rem;letter-spacing:1px;color:var(--orange)">Result</div>' +
          '</div>' +
        '</div>' +
        '<div class="ba-info">' +
          '<div class="ba-name">' + d.name + '</div>' +
          '<div class="ba-detail">' + d.city + ' · Change: <strong style="color:var(--orange)">' + d.change + '</strong></div>' +
          '<div class="ba-duration">' + d.duration + '</div>' +
        '</div>' +
      '</div>'
    );
  }).join('');
}

// Init default tab
showBA('loss', document.querySelector('.ba-tab'));

/* ==================== BOOKING ==================== */
var slots = [
  "6:00 AM","7:00 AM","8:00 AM","9:00 AM","10:00 AM","11:00 AM",
  "12:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM"
];
var selectedSlot = null;

function updateSlots() {
  var grid       = document.getElementById('time-grid');
  var takenIdxs  = [0, 3, 7];

  grid.innerHTML = slots.map(function(s, i) {
    var isTaken   = takenIdxs.includes(i);
    var isSelected = selectedSlot === s;
    var cls = 'time-slot' + (isTaken ? ' taken' : isSelected ? ' selected' : '');
    var onclick = isTaken ? '' : 'onclick="pickSlot(this,\'' + s + '\')"';
    var label   = isTaken ? '<s>' + s + '</s>' : s;
    return '<div class="' + cls + '" ' + onclick + '>' + label + '</div>';
  }).join('');
}

function pickSlot(el, slot) {
  selectedSlot = slot;
  document.querySelectorAll('.time-slot').forEach(function(s) { s.classList.remove('selected'); });
  el.classList.add('selected');
}

function bookSession() {
  var name  = document.getElementById('book-name').value.trim();
  var phone = document.getElementById('book-phone').value.trim();
  var date  = document.getElementById('book-date').value;

  if (!name)         { alert('Please enter your name');         return; }
  if (!phone)        { alert('Please enter your mobile number'); return; }
  if (!selectedSlot) { alert('Please select a time slot');      return; }

  // Hide form elements
  var wrap = document.getElementById('booking-form-wrap');
  wrap.querySelector('h3').style.display = 'none';
  wrap.querySelector('p').style.display  = 'none';
  document.querySelectorAll('.form-group').forEach(function(g) { g.style.display = 'none'; });
  document.querySelector('.booking-form .btn').style.display = 'none';

  // Show success
  document.getElementById('booked-phone').textContent = phone;
  document.getElementById('booked-time').textContent  = date + ' at ' + selectedSlot;
  document.getElementById('booking-success').style.display = 'block';
}

function resetBooking() {
  location.reload();
}

// Init date
(function initDate() {
  var today = new Date();
  var iso   = today.toISOString().split('T')[0];
  var el    = document.getElementById('book-date');
  el.value  = iso;
  el.min    = iso;
  updateSlots();
})();

/* ==================== CHATBOT ==================== */
var chatKB = {
  plan:       'We have 3 plans:\n• Starter – ₹999/month (up to 100 members)\n• Pro – ₹1,999/month (unlimited members + diet plans + analytics)\n• Elite – ₹4,999/month (multi-branch + custom app)\n\nAll plans come with a 30-day free trial! 🎉',
  price:      'Our pricing starts at just ₹999/month for the Starter plan. Pro is ₹1,999/month and Elite is ₹4,999/month. All include a 30-day FREE trial — no credit card needed!',
  whatsapp:   'Yes! FitBharat has deep WhatsApp integration:\n• Auto fee reminders\n• Birthday wishes\n• Batch schedule updates\n• Diet & workout plan sharing\n• Renewal alerts\n\nYour members get everything on WhatsApp — India\'s most used app! 📲',
  upi:        'Yes, we fully support UPI payments! Members can pay via:\n• UPI (GPay, PhonePe, Paytm)\n• Cash\n• EMI / Installments\n\nAuto GST invoices are generated and sent on WhatsApp instantly. 💳',
  trial:      'Booking a free trial is easy! Just scroll up to the "Book a Session" section, pick a date & time, and confirm. Our team will demo FitBharat live for 30 minutes. After the demo, you get 30 days FREE! 🚀',
  attendance: 'FitBharat has a powerful attendance system:\n• QR code check-in for members\n• Manual marking by staff\n• Auto daily reports\n• Peak hour analytics\n• Monthly attendance heatmaps 📊',
  hindi:      'Yes! FitBharat supports both Hindi and English across the entire platform — including invoices, WhatsApp messages, and the app interface. हिंदी में भी उपलब्ध है! 🇮🇳',
  support:    'We offer support via:\n• WhatsApp (fastest)\n• Phone: +91 98765 43210\n• Email: hello@fitbharat.in\n• In-app help center\n\nAvailable Mon–Sat, 9 AM – 7 PM IST',
  def:        'Great question! I\'m here to help. You can ask me about:\n• Plans & pricing\n• WhatsApp integration\n• UPI payments\n• Attendance tracking\n• Booking a free trial\n\nOr you can call us at +91 98765 43210 📞'
};

function getBotReply(msg) {
  var m = msg.toLowerCase();
  if (m.includes('plan') || m.includes('pricing'))                        return chatKB.plan;
  if (m.includes('price') || m.includes('cost') || m.includes('₹') || m.includes('fee')) return chatKB.price;
  if (m.includes('whatsapp'))                                              return chatKB.whatsapp;
  if (m.includes('upi') || m.includes('payment') || m.includes('pay'))   return chatKB.upi;
  if (m.includes('trial') || m.includes('book') || m.includes('demo') || m.includes('free')) return chatKB.trial;
  if (m.includes('attend'))                                                return chatKB.attendance;
  if (m.includes('hindi') || m.includes('language'))                      return chatKB.hindi;
  if (m.includes('support') || m.includes('contact') || m.includes('help')) return chatKB.support;
  return chatKB.def;
}

var chatIsOpen = false;

function openChat() {
  var win = document.getElementById('chatbot-window');
  win.classList.add('open');
  chatIsOpen = true;

  // Hide notification dot
  document.querySelector('.chat-notif').style.display = 'none';

  // Show greeting if first open
  if (document.getElementById('chat-messages').children.length === 0) {
    setTimeout(function() {
      addMsg('bot', '👋 Hi! I\'m the FitBharat Assistant. I can help you with plans, features, pricing, or booking a free trial. How can I help you today?');
    }, 400);
  }
}

function closeChat() {
  document.getElementById('chatbot-window').classList.remove('open');
  chatIsOpen = false;
}

function addMsg(type, text) {
  var msgs = document.getElementById('chat-messages');
  var d    = document.createElement('div');
  d.className = 'msg ' + type;

  var now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  d.innerHTML =
    '<div class="msg-bubble">' + text.replace(/\n/g, '<br>') + '</div>' +
    '<div class="msg-time">' + now + '</div>';

  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}

function showTyping() {
  var msgs = document.getElementById('chat-messages');
  var t    = document.createElement('div');
  t.className = 'msg bot';
  t.id        = 'typing-indicator';
  t.innerHTML = '<div class="msg-bubble typing"><span></span><span></span><span></span></div>';
  msgs.appendChild(t);
  msgs.scrollTop = msgs.scrollHeight;
  return t;
}

function sendChat() {
  var input = document.getElementById('chat-input');
  var txt   = input.value.trim();
  if (!txt) return;

  addMsg('user', txt);
  input.value = '';

  var typing = showTyping();
  setTimeout(function() {
    typing.remove();
    addMsg('bot', getBotReply(txt));
  }, 900 + Math.random() * 600);
}

function quickAsk(q) {
  if (!chatIsOpen) openChat();
  setTimeout(function() {
    addMsg('user', q);
    var t = showTyping();
    setTimeout(function() {
      t.remove();
      addMsg('bot', getBotReply(q));
    }, 900);
  }, 300);
}