/* Hustl prototype, "Circles" concept: vanilla JS, hash routing, shared state in localStorage.
   A circle is a group of parents who already know each other. Only families inside a circle
   can post jobs to it or see its jobs. Teens join through their parent. */
(function () {
  'use strict';

  // ---------- Icons ----------
  var ICON = {
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    list: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/>',
    jar: '<path d="M7 7h10v11a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3z"/><path d="M6 4h12v3H6z"/><path d="M9 13h6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-5.5 7-5.5s7 2 7 5.5"/><circle cx="17" cy="9" r="3"/><path d="M17 14.5c3 0 5 2 5 5"/>',
    circle: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/>',
    star: '<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z"/>',
    pin: '<path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    check: '<path d="M5 12l4 4L19 6"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    chev: '<path d="M9 6l6 6-6 6"/>',
    back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.5 1.5"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-4.5A8 8 0 1 1 21 12z"/>',
    car: '<path d="M5 16l1.5-5.5a2 2 0 0 1 1.9-1.5h7.2a2 2 0 0 1 1.9 1.5L19 16"/><rect x="3" y="16" width="18" height="4" rx="1.5"/><circle cx="7.5" cy="18" r="1"/><circle cx="16.5" cy="18" r="1"/>',
    leaf: '<path d="M5 20c0-8 5-14 14-14 0 9-6 14-14 14z"/><path d="M5 20c3-5 6-8 10-10"/>',
    paw: '<circle cx="8" cy="7" r="2"/><circle cx="16" cy="7" r="2"/><circle cx="4.5" cy="12" r="2"/><circle cx="19.5" cy="12" r="2"/><path d="M12 11c-3 0-5.5 3-5.5 5.5 0 1.5 1 2.5 2.5 2.5h6c1.5 0 2.5-1 2.5-2.5C17.5 14 15 11 12 11z"/>',
    box: '<path d="M3 8l9-4 9 4-9 4z"/><path d="M3 8v9l9 4 9-4V8"/><path d="M12 12v9"/>',
    drop: '<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>',
    phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    flag: '<path d="M5 21V4h11l-1.5 4L16 12H5"/>',
    music: '<path d="M9 18V6l11-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
    plane: '<path d="M21 4L3 11l7 2 2 7z"/><path d="M10 13l11-9"/>',
    heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    school: '<path d="M2 9l10-4 10 4-10 4z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/><path d="M22 9v5"/>',
    ball: '<circle cx="12" cy="12" r="9"/><path d="M12 3c3 3 3 15 0 18M3 12h18M5 6.5c4 2 10 2 14 0M5 17.5c4-2 10-2 14 0"/>',
    bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h10"/>',
    send: '<path d="M21 3L10 14"/><path d="M21 3l-7 18-4-7-7-4z"/>'
  };
  function ico(name, size, style, cls) {
    size = size || 20;
    return '<svg class="' + (cls || 'ico') + '" viewBox="0 0 24 24" aria-hidden="true" style="width:' + size + 'px;height:' + size + 'px;' + (style || '') + '">' + ICON[name] + '</svg>';
  }
  function star(size, on) { return ico('star', size, '', on === false ? 'ico star-off' : 'ico star'); }
  function stars(n, size) { var s = ''; for (var i = 0; i < 5; i++) s += star(size, i < n); return '<span style="display:inline-flex;gap:2px">' + s + '</span>'; }
  function av(p, size, fs) { return '<div class="avatar" style="width:' + size + 'px;height:' + size + 'px;background:' + p.tint + ';font-size:' + (fs || Math.round(size / 3.4)) + 'px">' + p.init + '</div>'; }

  // ---------- Data ----------
  var CAT = {
    car: { label: 'Car wash', icon: 'car', tint: '#EDE9FE' },
    garden: { label: 'Lawn and garden', icon: 'leaf', tint: '#D6F2E7' },
    dog: { label: 'Dog walking', icon: 'paw', tint: '#FDE8D8' },
    box: { label: 'Garage and moving', icon: 'box', tint: '#EDE9FE' },
    clean: { label: 'Cleaning', icon: 'drop', tint: '#D6F2E7' },
    tech: { label: 'Tech help', icon: 'phone', tint: '#FDE8D8' }
  };
  var KINDS = [['street', 'Our street', 'home'], ['school', 'School parents', 'school'], ['club', 'Sports club', 'ball'], ['friends', 'Family friends', 'heart']];

  // Circles the Lawson family belongs to. "plateau" is the one Kate creates in the parent flow.
  var CIRCLES = {
    plateau: { id: 'plateau', name: 'Collaroy Plateau Parents', kind: 'Our street + Cromer Campus', admin: 'Kate L.', since: 'this week', tint: '#EDE9FE', ink: '#6D28D9' },
    nippers: { id: 'nippers', name: 'Long Reef Nippers U15', kind: 'Sports club', admin: 'Sam K.', since: 'March', tint: '#D6F2E7', ink: '#047857' }
  };

  // Parents. status: joined | invited | contact (not yet invited). "known" is how Kate knows them.
  var PARENTS = [
    { id: 'kate', name: 'Kate L.', first: 'Kate', init: 'KL', tint: '#B9F5D8', role: 'admin', status: 'joined', known: 'That’s you', teens: ['Zoe, 16'], circle: 'plateau' },
    { id: 'jenny', name: 'Jenny M.', first: 'Jenny', init: 'JM', tint: '#FDE8D8', status: 'joined', known: 'Next door on Anzac Ave, 6 years', teens: [], circle: 'plateau', jobs: 3 },
    { id: 'raj', name: 'Raj P.', first: 'Raj', init: 'RP', tint: '#D6F2E7', status: 'joined', known: 'Kids at Cromer Campus together', teens: ['Arjun, 15'], circle: 'plateau', jobs: 1 },
    { id: 'priya', name: 'Priya N.', first: 'Priya', init: 'PN', tint: '#EDE9FE', status: 'joined', known: 'Netball mums, 3 seasons', teens: ['Mia, 14'], circle: 'plateau', jobs: 2 },
    { id: 'margaret', name: 'Margaret W.', first: 'Margaret', init: 'MW', tint: '#FDE8D8', status: 'joined', known: 'Over the road, waters our plants', teens: [], circle: 'plateau', jobs: 1 },
    { id: 'liz', name: 'Liz and Tom H.', first: 'Liz', init: 'LT', tint: '#D6F2E7', status: 'invited', known: 'Tom coaches Zoe’s footy team', teens: ['Jack, 16'], circle: 'plateau' },
    { id: 'dave', name: 'Dave C.', first: 'Dave', init: 'DC', tint: '#EDE9FE', status: 'contact', known: 'Zoe’s swim squad, 2 years', teens: ['Ella, 15'], circle: 'plateau' },
    { id: 'anna', name: 'Anna B.', first: 'Anna', init: 'AB', tint: '#FDE8D8', status: 'contact', known: 'P&C committee with you', teens: ['Leo, 13'], circle: 'plateau' },
    { id: 'ben', name: 'Ben O.', first: 'Ben', init: 'BO', tint: '#D6F2E7', status: 'contact', known: 'Three doors up, new this year', teens: [], circle: 'plateau' }
  ];
  function parent(id) { return PARENTS.filter(function (p) { return p.id === id; })[0]; }

  // Jobs. Every job belongs to a circle and a poster who is in that circle.
  var TASKS = [
    { id: 1, cat: 'car', circle: 'plateau', poster: 'jenny', title: 'Wash and vacuum two cars', pay: 40, suburb: 'Collaroy Plateau', walk: '4 min walk', when: 'Sat 10am', longWhen: 'Sat 10:00am', dur: 'about 1.5 hrs', rate: '$27/hr', chips: [['Car wash', 'lav'], ['Gear provided', 'mint']], desc: 'Two cars in the driveway, a Kia and a Subaru. Outside wash, wheels, and a quick vacuum inside. Hose, bucket and vacuum are all here. I’ll be home the whole time.', weekend: true },
    { id: 2, cat: 'garden', circle: 'plateau', poster: 'raj', title: 'Mow the front lawn and edges', pay: 35, suburb: 'Collaroy Plateau', walk: '6 min walk', when: 'Sun 9am', longWhen: 'Sun 9:00am', dur: 'about 1 hr', rate: '$35/hr', chips: [['Lawn and garden', 'lav'], ['Mower provided', 'mint']], desc: 'Small front lawn, about 15 minutes of mowing plus edges along the path. I’ll show you the mower. Closed shoes please.', weekend: true },
    { id: 3, cat: 'dog', circle: 'nippers', poster: 'sam', title: 'Walk Biscuit the retriever', pay: 20, suburb: 'Long Reef', walk: '15 min walk', when: '4pm', longWhen: 'Weekdays 4:00pm', dur: '45 min', rate: '$27/hr', chips: [['Dog walking', 'lav'], ['Ongoing', 'mint']], desc: 'Biscuit is 4, friendly and pulls a little at the start. A loop to the beach and back is perfect. Send a photo from the walk if you can.', weekend: false },
    { id: 4, cat: 'box', circle: 'nippers', poster: 'liz', title: 'Help clear out the garage', pay: 60, suburb: 'Collaroy', walk: '12 min walk', when: 'Sat 1pm', longWhen: 'Sat 1:00pm', dur: 'about 3 hrs', rate: '$20/hr', chips: [['Garage + moving', 'lav'], ['2-player OK', 'mint']], desc: 'Carry boxes to a skip, sort keep vs chuck piles, sweep out. Gloves provided. Bring a mate from the circle and split a bonus $20.', weekend: true },
    { id: 5, cat: 'clean', circle: 'plateau', poster: 'priya', title: 'Wash the ground floor windows', pay: 45, suburb: 'Collaroy Plateau', walk: '8 min walk', when: 'Sun 2pm', longWhen: 'Sun 2:00pm', dur: 'about 2 hrs', rate: '$22/hr', chips: [['Cleaning', 'lav'], ['No ladders', 'mint']], desc: 'Eight windows around the house, outside only. All reachable from the ground. Squeegee and bucket here.', weekend: true },
    { id: 6, cat: 'tech', circle: 'plateau', poster: 'margaret', title: 'Set up my new phone', pay: 25, suburb: 'Collaroy Plateau', walk: '2 min walk', when: 'Any arvo', longWhen: 'Any afternoon this week', dur: 'about 1 hr', rate: '$25/hr', chips: [['Tech help', 'lav'], ['Indoors, adult home', 'mint']], desc: 'Move contacts and photos from the old phone, set up WhatsApp and show me how to video call the grandkids.', weekend: false }
  ];
  // Posters who are not in Kate's contact list (Sam runs the Nippers circle).
  var EXTRA = { sam: { id: 'sam', name: 'Sam K.', first: 'Sam', init: 'SK', tint: '#EDE9FE', known: 'Runs the Nippers circle. Invited Mum in March.', jobs: 6 } };
  function posterOf(t) { return parent(t.poster) || EXTRA[t.poster]; }

  // Teens who can see Kate's job (kids of joined Plateau members).
  var TEENS = [
    { id: 1, name: 'Arjun P.', first: 'Arjun', init: 'AP', tint: '#D6F2E7', age: 15, via: 'raj', done: 4, rating: '4.8', badge: 'Lawn regular', cls: 'tag-mint', msg: 'Hi Kate, I can do 10am Saturday. I’ve washed Dad’s car heaps and I’ll bring my own cloths.' },
    { id: 2, name: 'Mia N.', first: 'Mia', init: 'MN', tint: '#EDE9FE', age: 14, via: 'priya', done: 3, rating: '5.0', badge: 'New and keen', cls: 'tag-peach', msg: 'I’d love to help. Mum can walk me over at 10.' }
  ];

  // ---------- State ----------
  var KEY = 'hustl-circles-v1';
  function fresh() {
    return {
      // parent side
      circleStep: 1, circleName: 'Collaroy Plateau Parents', circleKind: 'street', inviteRule: 'admin', created: false,
      invites: {},          // parentId -> { at: ms }  (simulated accept after INVITE_MS)
      postCircle: 'plateau', postCat: 'car', pay: 40, posted: false, chosen: null,
      // teen side
      name: 'Zoe', age: 16, joined: false,
      circleTab: 'all', selected: null,
      applied: {},          // taskId -> { at: ms, ok: bool, no: bool }
      saved: {},
      tab: 'up', checkedOut: false, rated: false, rating: 0, tags: {},
      cashout: false, jars: { guitar: 180, trip: 60 }, jarSheet: false
    };
  }
  var S;
  try { S = JSON.parse(localStorage.getItem(KEY)) || fresh(); } catch (e) { S = fresh(); }
  var sheetFor = null, copied = false;
  var APPROVE_MS = 9000, INVITE_MS = 5000;
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function set(patch) { Object.keys(patch).forEach(function (k) { S[k] = patch[k]; }); save(); render(); }
  function approved(id) { var a = S.applied[id]; return !!a && !a.no && (a.ok || (Date.now() - a.at) > APPROVE_MS); }
  function declined(id) { var a = S.applied[id]; return !!a && !!a.no; }
  function pendingOffers() { return Object.keys(S.applied).filter(function (id) { return !approved(id) && !declined(id); }); }
  function memberStatus(p) {
    if (p.status === 'joined') return 'joined';
    var inv = S.invites[p.id];
    if (inv) return (Date.now() - inv.at) > INVITE_MS ? 'joined' : 'invited';
    return p.status === 'invited' ? 'invited' : 'contact';
  }
  function anyInvitePending() { return Object.keys(S.invites).some(function (id) { return (Date.now() - S.invites[id].at) <= INVITE_MS; }); }
  function circleMembers(cid) { return PARENTS.filter(function (p) { return p.circle === cid && memberStatus(p) !== 'contact'; }); }
  function joinedCount(cid) { return circleMembers(cid).filter(function (p) { return memberStatus(p) === 'joined'; }).length; }
  function teenCount(cid) { return circleMembers(cid).filter(function (p) { return memberStatus(p) === 'joined'; }).reduce(function (n, p) { return n + p.teens.length; }, 0); }

  // ---------- Shared pieces ----------
  function nav(active) {
    var items = [['Jobs', 'search', '#/browse'], ['My jobs', 'list', '#/jobs'], ['Money', 'jar', '#/earnings'], ['Profile', 'user', '#/profile']];
    return '<nav class="nav" aria-label="Main">' + items.map(function (it) {
      return '<a href="' + it[2] + '"' + (it[0] === active ? ' class="on"' : '') + '>' + ico(it[1], 22) + '<span>' + it[0] + '</span></a>';
    }).join('') + '</nav>';
  }
  function pnav(active) {
    var items = [['Circle', 'circle', '#/circle'], ['Post', 'plus', '#/post'], ['Approvals', 'bell', '#/approvals']];
    var n = pendingOffers().length;
    return '<nav class="nav" aria-label="Parent">' + items.map(function (it) {
      return '<a href="' + it[2] + '"' + (it[0] === active ? ' class="on"' : '') + ' style="position:relative">' + ico(it[1], 22) + '<span>' + it[0] + '</span>' + (it[0] === 'Approvals' && n ? '<span class="dotbadge">' + n + '</span>' : '') + '</a>';
    }).join('') + '</nav>';
  }
  function parentPill() {
    return '<div class="pill-glass" role="status"><span class="avatar" style="width:26px;height:26px;background:#6D28D9;color:#fff;font-size:10px">' + S.name.slice(0, 1).toUpperCase() + 'L</span>Mum linked <span style="color:#047857;font-size:14px;line-height:1">&#9679;</span></div>';
  }
  function circleChip(cid, small) {
    var c = CIRCLES[cid];
    return '<span class="tag" style="background:' + c.tint + ';color:' + c.ink + (small ? ';font-size:10px;padding:4px 9px' : '') + '">' + ico('circle', small ? 11 : 12) + c.name + '</span>';
  }
  function tile(cat, size, iconSize) {
    var c = CAT[cat];
    return '<div class="tile" style="width:' + size + 'px;height:' + size + 'px;background:' + c.tint + '">' + ico(c.icon, iconSize || 24) + '</div>';
  }
  function stack(people, size) {
    return '<div class="stack">' + people.slice(0, 5).map(function (p) { return av(p, size || 30, 10); }).join('') + (people.length > 5 ? '<div class="avatar more" style="width:' + (size || 30) + 'px;height:' + (size || 30) + 'px;font-size:10px">+' + (people.length - 5) + '</div>' : '') + '</div>';
  }
  function jobCard(t) {
    var p = posterOf(t);
    return '<a href="#/task/' + t.id + '" class="jobcard" id="job-' + t.id + '">' + tile(t.cat, 52, 24) +
      '<div style="flex:1;min-width:0"><div class="h" style="font-size:14px">' + t.title + '</div><div class="sec" style="font-size:12px;margin-top:2px">' + p.name + ' · ' + t.walk + ' · ' + t.when + '</div><div style="margin-top:6px">' + circleChip(t.circle, true) + '</div></div>' +
      '<div class="h vio" style="font-size:19px">$' + t.pay + '</div></a>';
  }
  function statusText(t) {
    if (!S.applied[t.id]) return '';
    if (declined(t.id)) return '<span style="color:#B45309;font-weight:700">Mum said not this one</span>';
    return approved(t.id) ? '<span class="grn" style="font-weight:700">Mum approved ✓</span>' : '<span style="color:#B45309;font-weight:700">Waiting on Mum ⏳</span>';
  }
  function tlEntry(on, inner) { return '<div class="tl"><div class="dot' + (on ? ' on' : '') + '"></div>' + inner + '</div>'; }
  function topbar(back, title, right) { return '<div class="topbar"><a href="' + back + '" class="iconbtn" aria-label="Back">' + ico('back', 20) + '</a><div class="h">' + title + '</div>' + (right || '') + '</div>'; }

  // ---------- Screens ----------
  var screens = {};

  screens.welcome = function () {
    var ring = PARENTS.slice(0, 6);
    var orbit = ring.map(function (p, i) {
      var a = (i / ring.length) * Math.PI * 2 - Math.PI / 2, r = 92;
      return '<div class="avatar orb" style="left:' + Math.round(150 + Math.cos(a) * r - 21) + 'px;top:' + Math.round(120 + Math.sin(a) * r - 21) + 'px;background:' + p.tint + '">' + p.init + '</div>';
    }).join('');
    return '<div class="screen">' +
      '<div style="position:relative;padding:24px 20px;display:flex;align-items:center;justify-content:space-between"><div class="pill-glass" style="font-size:15px;font-weight:800;padding:10px 16px">hustl ✦</div><div class="pill-glass">' + ico('pin', 14, 'color:#6D28D9') + 'Northern Beaches</div></div>' +
      '<div class="orbit" aria-hidden="true"><div class="orbit-line"></div><div class="avatar" style="position:absolute;left:129px;top:99px;width:42px;height:42px;background:#2A2440;color:#fff;font-size:12px;box-shadow:0 8px 22px rgba(42,36,64,.3)">ZL</div>' + orbit + '</div>' +
      '<div style="position:relative;padding:8px 24px 0"><h1 class="h" style="margin:0;font-size:36px;line-height:1.05;letter-spacing:-.02em">Paid jobs from people you already trust.</h1><p class="body" style="margin:12px 0 0;font-size:14px;line-height:1.55">Parents form a <strong>circle</strong> with families they know. Only the circle can post jobs, and only its teens can see them. No strangers, ever.</p></div>' +
      '<div style="position:relative;margin-top:auto;padding:0 20px 24px;display:flex;flex-direction:column;gap:10px">' +
      '<div class="glass" style="padding:14px 16px;display:flex;align-items:center;gap:12px">' + stack(PARENTS.slice(1, 6), 30) + '<div style="flex:1;font-size:12px;line-height:1.5;color:#3C3660"><strong>Invite only.</strong> Every member was vouched for by someone already inside.</div></div>' +
      '<a href="#/circle/new" class="btn-ink" style="justify-content:space-between;padding:0 22px"><span>I’m a parent · start a circle</span>' + ico('chev', 22) + '</a>' +
      '<div style="display:flex;gap:10px"><a href="#/join" class="btn-glass" style="flex:1;font-size:13px">I have an invite</a><a href="#/teen" class="btn-glass" style="flex:1;font-size:13px">I’m a teen</a></div></div></div>';
  };

  // ----- Parent: create a circle -----
  screens.circlenew = function () {
    var step = S.circleStep;
    var dots = '<div style="flex:1;display:flex;gap:6px;justify-content:center">' + [1, 2].map(function (i) { return '<span class="dot-step' + (step >= i ? ' on' : '') + '"></span>'; }).join('') + '</div>';
    var head = '<div style="display:flex;align-items:center;gap:12px;padding:24px 20px 8px"><a href="' + (step === 1 ? '#/' : '#/circle/new') + '" class="iconbtn" aria-label="Back"' + (step === 2 ? ' data-action="circleStep" data-value="1"' : '') + '>' + ico('back', 22) + '</a>' + dots + '<div style="width:40px"></div></div>';
    var body;
    if (step === 1) {
      body = '<div class="scroll" style="padding:12px 20px 20px;display:flex;flex-direction:column;gap:16px">' +
        '<div><h1 class="h" style="margin:0 0 6px;font-size:28px;line-height:1.1">Start a circle</h1><p class="sec" style="margin:0;font-size:13px;line-height:1.5">A circle is a small group of parents who know each other in real life. You decide who gets in.</p></div>' +
        '<div><label class="label" for="cname">Circle name</label><input id="cname" class="input" type="text" value="' + S.circleName + '" data-bind="circleName"></div>' +
        '<div><span class="label">What brings you together?</span><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">' + KINDS.map(function (k) { return '<button type="button" class="kind' + (S.circleKind === k[0] ? ' on' : '') + '" data-action="circleKind" data-value="' + k[0] + '">' + ico(k[2], 22) + '<span>' + k[1] + '</span></button>'; }).join('') + '</div></div>' +
        '<div><label class="label" for="carea">Area</label><input id="carea" class="input" type="text" value="Collaroy Plateau, 2097"></div>' +
        '<div class="mintcard" style="padding:14px;display:flex;gap:10px;font-size:12px;line-height:1.5">' + ico('shield', 20, 'color:#047857;flex-shrink:0') + '<div>Circles are private. They don’t appear in search, and nobody outside can see your members or jobs.</div></div></div>' +
        '<div style="padding:12px 20px 24px"><button type="button" class="btn-ink" data-action="circleStep" data-value="2">Next: who can invite ' + ico('chev', 20) + '</button></div>';
    } else {
      function rule(id, title, sub) { return '<button type="button" class="glass rule' + (S.inviteRule === id ? ' on' : '') + '" data-action="inviteRule" data-value="' + id + '"><div class="radio"></div><div style="flex:1"><div class="h" style="font-size:14px">' + title + '</div><div class="sec" style="font-size:12px;margin-top:2px;line-height:1.45">' + sub + '</div></div></button>'; }
      body = '<div class="scroll" style="padding:12px 20px 20px;display:flex;flex-direction:column;gap:16px">' +
        '<div><h1 class="h" style="margin:0 0 6px;font-size:28px;line-height:1.1">Who can invite?</h1><p class="sec" style="margin:0;font-size:13px;line-height:1.5">This is the whole safety model, so it’s worth a second. Smaller and tighter beats bigger.</p></div>' +
        '<div style="display:flex;flex-direction:column;gap:10px">' + rule('admin', 'Only me', 'Every member is someone I personally know. Recommended for a street or family-friends circle.') + rule('vouch', 'Members can suggest, I approve', 'A member proposes someone and says how they know them. Nobody joins until I say yes.') + rule('open', 'Any member can invite', 'Fastest to grow. Trust gets thinner with every hop, so use for a club or school year where the group already vets people.') + '</div>' +
        '<div class="glass" style="padding:4px 16px"><label class="row" style="min-height:54px;justify-content:space-between;cursor:pointer"><span style="font-weight:600;font-size:14px">Members must verify their ID</span><input class="check" type="checkbox" checked></label><label class="row" style="min-height:54px;justify-content:space-between;cursor:pointer;border-top:1.5px solid rgba(42,36,64,.1)"><span style="font-weight:600;font-size:14px">Parents see their teen’s messages</span><input class="check" type="checkbox" checked></label><label class="row" style="min-height:54px;justify-content:space-between;cursor:pointer;border-top:1.5px solid rgba(42,36,64,.1)"><span style="font-weight:600;font-size:14px">An adult must be home for every job</span><input class="check" type="checkbox" checked></label></div></div>' +
        '<div style="padding:12px 20px 24px;display:flex;gap:10px"><button type="button" class="btn-glass" style="flex:0 0 100px" data-action="circleStep" data-value="1">Back</button><button type="button" class="btn-ink" style="flex:1" data-action="createCircle">Create circle</button></div>';
    }
    return '<div class="screen">' + head + body + '</div>';
  };

  // ----- Parent: invite people -----
  screens.invite = function () {
    var contacts = PARENTS.filter(function (p) { return p.id !== 'kate' && (p.status === 'contact' || p.status === 'invited'); });
    var rows = contacts.map(function (p) {
      var st = memberStatus(p);
      var btn = st === 'joined' ? '<span class="tag tag-mint">Joined ✓</span>' : st === 'invited' ? '<span class="tag tag-peach">Invited · waiting</span>' : '<button type="button" class="pill" style="background:rgba(255,255,255,.9)" data-action="invite" data-value="' + p.id + '">' + ico('send', 14) + 'Invite</button>';
      return '<div class="glass" style="padding:12px 14px;display:flex;align-items:center;gap:12px">' + av(p, 42, 12) + '<div style="flex:1;min-width:0"><div class="h" style="font-size:14px">' + p.name + '</div><div class="sec" style="font-size:12px;line-height:1.4">' + p.known + (p.teens.length ? ' · ' + p.teens.join(', ') : '') + '</div></div>' + btn + '</div>';
    }).join('');
    var sent = Object.keys(S.invites).length;
    return '<div class="screen">' + topbar('#/circle', 'Invite parents', '<span class="tag tag-lav">' + S.circleName.split(' ')[0] + '</span>') +
      '<div class="scroll" style="padding:4px 20px 20px;display:flex;flex-direction:column;gap:14px">' +
      '<div class="mintcard" style="padding:14px;display:flex;gap:10px;font-size:12px;line-height:1.5">' + ico('shield', 20, 'color:#047857;flex-shrink:0') + '<div><strong>Only invite people you’d leave your kids with.</strong> Each invite records that you vouched for them, and members can see who vouched for whom.</div></div>' +
      '<div class="glass" style="padding:14px"><div class="h" style="font-size:13px;margin-bottom:8px">Share an invite code</div><div style="display:flex;gap:8px;align-items:center"><div class="code">PLATEAU-4K7Q</div><button type="button" class="iconbtn" style="width:48px;height:48px" aria-label="Copy code" data-action="copy">' + ico(copied ? 'check' : 'copy', 20, copied ? 'color:#047857' : '') + '</button></div><div class="sec" style="font-size:11px;margin-top:8px;line-height:1.45">Expires in 7 days. Anyone using it still has to be approved by you before they see anything.</div></div>' +
      '<div class="h" style="font-size:15px">People you know</div><div style="display:flex;flex-direction:column;gap:10px">' + rows + '</div></div>' +
      '<div style="padding:12px 20px 24px"><a href="#/circle" class="btn-ink">' + (sent ? 'Done · ' + sent + ' invite' + (sent > 1 ? 's' : '') + ' sent' : 'Skip for now') + '</a></div></div>';
  };

  // ----- Parent: join with a code -----
  screens.join = function () {
    return '<div class="screen">' + topbar('#/', 'Join a circle') +
      '<div class="scroll" style="padding:4px 20px 20px;display:flex;flex-direction:column;gap:16px">' +
      '<p class="sec" style="margin:0;font-size:13px;line-height:1.5">Someone who knows you sent a code. Enter it and they’ll get a ping to confirm it’s really you.</p>' +
      '<div><label class="label" for="code">Invite code</label><input id="code" class="input" type="text" value="NIPPERS-2M8X" style="font-family:ui-monospace,Menlo,monospace;letter-spacing:.08em"></div>' +
      '<div class="glass" style="padding:14px;display:flex;gap:12px;align-items:center"><div class="tile" style="width:46px;height:46px;background:#D6F2E7">' + ico('ball', 22, 'color:#047857') + '</div><div style="flex:1"><div class="h" style="font-size:14px">Long Reef Nippers U15</div><div class="sec" style="font-size:12px">Run by Sam K. · 14 families · 9 teens</div></div></div>' +
      '<div class="glass" style="padding:14px"><div class="h" style="font-size:13px;margin-bottom:6px">How does Sam know you?</div><textarea class="input" rows="2">Our kids are in the same Nippers age group. We’ve done Sunday patrol together for two seasons.</textarea><div class="sec" style="font-size:11px;margin-top:6px;line-height:1.45">Sam sees this before approving. It’s shown to other members next to your name.</div></div>' +
      '<div><label class="label">Your teens</label><div class="glass" style="padding:12px 14px;display:flex;align-items:center;gap:12px"><div class="avatar" style="width:38px;height:38px;background:#6D28D9;color:#fff;font-size:12px">ZL</div><div style="flex:1"><div class="h" style="font-size:14px">Zoe, 16</div><div class="sec" style="font-size:12px">Gets access once Sam approves you</div></div><input class="check" type="checkbox" checked></div></div></div>' +
      '<div style="padding:12px 20px 24px"><a href="#/circle" class="btn-ink">Ask Sam to let me in</a></div></div>';
  };

  // ----- Parent: circle home -----
  screens.circle = function () {
    var c = CIRCLES.plateau; c.name = S.circleName;
    var members = circleMembers('plateau');
    var joined = members.filter(function (p) { return memberStatus(p) === 'joined'; });
    var invited = members.filter(function (p) { return memberStatus(p) === 'invited'; });
    var jobs = TASKS.filter(function (t) { return t.circle === 'plateau'; });
    var hero = '<div class="hero" style="padding:18px"><div class="blob"></div>' +
      '<div style="display:flex;justify-content:space-between;align-items:flex-start"><span class="tag tag-mint2">' + (S.created ? 'YOUR CIRCLE · ADMIN' : 'YOUR CIRCLE') + '</span><span style="font-size:11px;opacity:.7">' + (S.inviteRule === 'admin' ? 'Invite: only you' : S.inviteRule === 'vouch' ? 'Invite: you approve' : 'Invite: any member') + '</span></div>' +
      '<div class="h" style="font-size:22px;margin-top:10px;line-height:1.15">' + c.name + '</div><div style="font-size:12px;opacity:.75;margin-top:3px">' + c.kind + ' · Collaroy Plateau</div>' +
      '<div style="display:flex;gap:16px;margin-top:14px"><div><div class="h" style="font-size:22px">' + joined.length + '</div><div style="font-size:11px;opacity:.7">families</div></div><div><div class="h" style="font-size:22px">' + teenCount('plateau') + '</div><div style="font-size:11px;opacity:.7">teens</div></div><div><div class="h" style="font-size:22px">' + (jobs.length + (S.posted ? 1 : 0)) + '</div><div style="font-size:11px;opacity:.7">open jobs</div></div></div>' +
      '<div style="display:flex;gap:8px;margin-top:14px"><a href="#/invite" class="btn-dim">' + ico('send', 14) + 'Invite</a><a href="#/post" class="btn-mint">' + ico('plus', 14) + 'Post a job</a></div></div>';
    var memberRows = joined.concat(invited).map(function (p) {
      var st = memberStatus(p);
      return '<div class="glass" style="padding:12px 14px;display:flex;align-items:center;gap:12px">' + av(p, 42, 12) + '<div style="flex:1;min-width:0"><div class="h" style="font-size:14px">' + p.name + (p.role === 'admin' ? ' <span class="tag tag-lav" style="font-size:9px;padding:2px 7px;vertical-align:middle">ADMIN</span>' : '') + '</div><div class="sec" style="font-size:12px;line-height:1.4">' + p.known + '</div>' + (p.teens.length ? '<div class="sec" style="font-size:11px;margin-top:2px">Teens: ' + p.teens.join(', ') + '</div>' : '') + '</div>' + (st === 'joined' ? '<span class="tag tag-mint">In</span>' : '<span class="tag tag-peach">Invited</span>') + '</div>';
    }).join('');
    var other = '<a href="#/join" class="glass" style="padding:12px 14px;display:flex;align-items:center;gap:12px;color:inherit"><div class="tile" style="width:42px;height:42px;background:#D6F2E7">' + ico('ball', 20, 'color:#047857') + '</div><div style="flex:1"><div class="h" style="font-size:14px">Long Reef Nippers U15</div><div class="sec" style="font-size:12px">Member · run by Sam K. · 14 families</div></div>' + ico('chev', 18, 'color:#5C5680') + '</a>';
    var zoe = '<div class="glass" style="padding:14px;display:flex;gap:12px;align-items:center"><div class="avatar" style="width:42px;height:42px;background:#6D28D9;color:#fff;font-size:12px">ZL</div><div style="flex:1;font-size:12px;line-height:1.5" class="body"><strong>Zoe</strong> can see jobs from ' + joined.length + ' families here and 14 in Nippers. ' + (pendingOffers().length ? '<a href="#/approvals" class="vio" style="font-weight:700">' + pendingOffers().length + ' offer' + (pendingOffers().length > 1 ? 's' : '') + ' waiting for you →</a>' : 'Nothing waiting on you.') + '</div></div>';
    return '<div class="screen"><div class="scroll navpad" style="padding:26px 20px 96px;display:flex;flex-direction:column;gap:14px">' +
      '<div style="display:flex;justify-content:space-between;align-items:center"><div class="h" style="font-size:22px">Circles</div><span class="tag tag-mint">ID verified ✓</span></div>' + hero + zoe +
      '<div class="h" style="font-size:15px;margin-top:4px">Members · ' + joined.length + ' in, ' + invited.length + ' invited</div><div style="display:flex;flex-direction:column;gap:10px">' + memberRows + '<a href="#/invite" class="dashed">Invite someone you know →</a></div>' +
      '<div class="h" style="font-size:15px;margin-top:4px">Circles you’re in</div>' + other +
      '</div>' + pnav('Circle') + '</div>';
  };

  // ----- Parent: post a job (into a circle) -----
  screens.post = function () {
    var top = topbar('#/circle', 'Post a job', '<span class="tag tag-mint">ID verified ✓</span>');
    var c = CIRCLES[S.postCircle]; if (S.postCircle === 'plateau') c.name = S.circleName;
    var fams = S.postCircle === 'plateau' ? joinedCount('plateau') : 14, teens = S.postCircle === 'plateau' ? teenCount('plateau') : 9;
    if (S.posted) {
      return '<div class="screen">' + top + '<div class="scroll" style="padding:40px 24px 20px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:16px"><div class="bigdisc pop" style="background:#B9F5D8;margin-top:20px">' + ico('check', 54, 'stroke-width:3;color:#0B4A33') + '</div><div class="h" style="font-size:28px;line-height:1.1">Posted to your circle</div><p class="sec" style="margin:0;font-size:13px;line-height:1.55">Only the ' + teens + ' teens in <strong>' + c.name + '</strong> can see this. Their parents get a copy too.</p>' +
        '<div class="glass" style="width:100%;padding:14px;display:flex;gap:12px;align-items:center;text-align:left">' + tile(S.postCat, 46, 22) + '<div style="flex:1"><div class="h" style="font-size:14px">Wash and vacuum two cars</div><div class="sec" style="font-size:12px">Sat 20 Sep · 10:00am · ' + circleChip(S.postCircle, true) + '</div></div><div class="h vio" style="font-size:18px">$' + S.pay + '</div></div></div>' +
        '<div style="padding:12px 20px 24px;display:flex;flex-direction:column;gap:10px"><a href="#/applicants" class="btn-ink">See who’s offered (2)</a><button type="button" class="btn-glass" data-action="editPost">Edit the job</button></div></div>';
    }
    var pay = S.pay;
    var hint = pay < 30 ? 'A bit low. Most car washes in circles pay $30 to $45.' : pay > 45 ? 'Generous. Expect offers fast.' : 'In the sweet spot. Similar jobs pay $30 to $45.';
    function chk(label) { return '<label class="row" style="min-height:50px;cursor:pointer"><input class="check" type="checkbox" checked><span style="font-size:13px;font-weight:600">' + label + '</span></label>'; }
    function pick(cid, sub) { var cc = CIRCLES[cid]; return '<button type="button" class="glass rule' + (S.postCircle === cid ? ' on' : '') + '" data-action="postCircle" data-value="' + cid + '"><div class="radio"></div><div style="flex:1"><div class="h" style="font-size:14px">' + (cid === 'plateau' ? S.circleName : cc.name) + '</div><div class="sec" style="font-size:12px;margin-top:2px">' + sub + '</div></div></button>'; }
    return '<div class="screen">' + top +
      '<div class="scroll" style="padding:4px 20px 20px;display:flex;flex-direction:column;gap:16px">' +
      '<div><span class="label">Post to which circle?</span><div style="display:flex;flex-direction:column;gap:8px">' + pick('plateau', joinedCount('plateau') + ' families · ' + teenCount('plateau') + ' teens · you run it') + pick('nippers', '14 families · 9 teens · run by Sam K.') + '</div></div>' +
      '<div class="mintcard" style="padding:14px;display:flex;gap:10px;font-size:12px;line-height:1.5">' + ico('eye', 20, 'color:#047857;flex-shrink:0') + '<div>Visible to <strong>' + fams + ' families</strong> you know. Not searchable. Not shown to anyone outside the circle.</div></div>' +
      '<div><span class="label">What kind of job?</span><div style="display:flex;flex-wrap:wrap;gap:8px">' + Object.keys(CAT).map(function (k) { return '<button type="button" class="pill' + (k === S.postCat ? ' on' : '') + '" style="' + (k === S.postCat ? '' : 'background:rgba(255,255,255,.88)') + '" data-action="postCat" data-value="' + k + '">' + CAT[k].label + '</button>'; }).join('') + '</div></div>' +
      '<div><label class="label" for="jt">Job title</label><input id="jt" class="input" type="text" value="Wash and vacuum two cars"></div>' +
      '<div><span class="label">Pay</span><div style="display:flex;align-items:center;gap:10px"><button type="button" class="iconbtn" style="width:52px;height:52px;border-radius:16px" aria-label="Less pay" data-action="pay" data-value="-5">' + ico('minus', 22) + '</button><div class="glass" style="flex:1;min-height:52px;display:flex;align-items:center;justify-content:center"><span class="h vio" style="font-size:26px">$' + pay + '</span></div><button type="button" class="iconbtn" style="width:52px;height:52px;border-radius:16px" aria-label="More pay" data-action="pay" data-value="5">' + ico('plus', 22) + '</button></div><div class="sec" style="font-size:12px;margin-top:6px">' + hint + '</div></div>' +
      '<div style="display:flex;gap:10px"><div style="flex:1"><label class="label" for="dt">Date</label><input id="dt" class="input" type="date" value="2026-09-20"></div><div style="flex:1"><label class="label" for="tm">Start</label><input id="tm" class="input" type="time" value="10:00"></div></div>' +
      '<div><label class="label" for="ds">Describe the job</label><textarea id="ds" class="input" rows="3">Two cars in the driveway. Outside wash, wheels and a quick vacuum. I’ll be home the whole time.</textarea></div>' +
      '<div class="glass" style="padding:6px 16px"><div class="label" style="padding:10px 0 2px;margin:0">Circle rules (all required)</div>' + chk('Outdoors or in a shared space') + chk('No ladders, power tools or heavy lifting') + chk('An adult will be home during the job') + '</div>' +
      '<div class="sec" style="font-size:12px;line-height:1.5">Pay is held by Hustl when you book someone and released when the teen checks out. The teen’s parent is copied on every message.</div></div>' +
      '<div style="padding:12px 20px 24px"><button type="button" class="btn-ink" data-action="post">Post to ' + (S.postCircle === 'plateau' ? S.circleName.split(' ')[0] : 'Nippers') + ' · $' + pay + '</button></div></div>';
  };

  // ----- Parent: choose a teen -----
  screens.applicants = function () {
    var top = topbar('#/post', 'Offers');
    var head = '<div class="pad" style="padding-bottom:10px"><div class="glass" style="padding:12px 14px;display:flex;gap:12px;align-items:center">' + tile('car', 44, 20) + '<div style="flex:1"><div class="h" style="font-size:14px">Wash and vacuum two cars</div><div class="sec" style="font-size:12px">Sat 20 Sep · 10:00am · $' + S.pay + '</div></div>' + circleChip(S.postCircle, true) + '</div></div>';
    var sel = TEENS.filter(function (p) { return p.id === S.chosen; })[0];
    if (sel) {
      var par = parent(sel.via);
      return '<div class="screen">' + top + head + '<div class="scroll" style="padding:24px 24px 20px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:16px">' +
        '<div class="ring pop" style="margin-top:10px"><div class="arc"></div><div class="disc" style="background:' + sel.tint + '">' + sel.init + '</div><div class="badge">' + ico('check', 12, 'stroke-width:3') + '</div></div>' +
        '<div class="h" style="font-size:28px;line-height:1.1">' + sel.first + ' is booked in</div><p class="sec" style="margin:0;font-size:13px;line-height:1.55">' + par.first + ' got the ping and approved. $' + S.pay + ' is held until ' + sel.first + ' checks out. You and ' + par.first + ' both get the job chat.</p>' +
        '<div class="glass" style="width:100%;padding:4px 16px;text-align:left"><div class="row" style="min-height:50px">' + ico('check', 18, 'color:#047857') + '<span style="font-size:13px;font-weight:600">Sat 20 Sep, 10:00am confirmed</span></div><div class="row" style="min-height:50px;border-top:1.5px solid rgba(42,36,64,.1)">' + ico('users', 18, 'color:#047857') + '<span style="font-size:13px;font-weight:600">' + par.first + ' is copied on messages</span></div><div class="row" style="min-height:50px;border-top:1.5px solid rgba(42,36,64,.1)">' + ico('lock', 18, 'color:#047857') + '<span style="font-size:13px;font-weight:600">Payment held by Hustl</span></div></div></div>' +
        '<div style="padding:12px 20px 24px;display:flex;flex-direction:column;gap:10px"><button type="button" class="btn-ink">' + ico('chat', 18) + 'Message ' + sel.first + ' and ' + par.first + '</button><button type="button" class="btn-glass" data-action="unchoose">Choose someone else</button></div></div>';
    }
    var liz = parent('liz'), lizIn = memberStatus(liz) === 'joined';
    return '<div class="screen">' + top + head + '<div class="scroll" style="padding:4px 20px 20px;display:flex;flex-direction:column;gap:10px"><div class="h" style="font-size:15px">2 teens from your circle offered</div>' +
      TEENS.map(function (p) {
        var par = parent(p.via);
        return '<div class="glass" style="padding:14px;display:flex;flex-direction:column;gap:12px"><div style="display:flex;gap:12px;align-items:center">' + av(p, 46, 13) + '<div style="flex:1"><div class="h" style="font-size:14px">' + p.name + ', ' + p.age + '</div><div class="sec" style="font-size:12px">' + par.first + '’s ' + (p.first === 'Mia' ? 'daughter' : 'son') + ' · ' + p.done + ' jobs in circle</div></div><div class="h" style="font-size:13px">★ ' + p.rating + '</div></div>' +
          '<div class="vouch">' + av(par, 22, 8) + '<span>You know <strong>' + par.first + '</strong>: ' + par.known + '</span></div>' +
          '<div style="display:flex;gap:6px;flex-wrap:wrap"><span class="tag tag-mint">Parent in circle ✓</span><span class="tag ' + p.cls + '">' + p.badge + '</span></div>' +
          '<div class="quote">“' + p.msg + '”</div>' +
          '<div style="display:flex;gap:8px"><button type="button" class="btn-glass" style="flex:0 0 52px;min-height:48px;padding:0;width:auto" aria-label="Message ' + p.name + '">' + ico('chat', 20) + '</button><button type="button" class="btn-ink" style="flex:1;min-height:48px;width:auto;box-shadow:none" data-action="choose" data-value="' + p.id + '">Choose ' + p.first + '</button></div></div>';
      }).join('') +
      (lizIn ? '' : '<div class="dashed" style="text-align:left;display:flex;gap:10px;align-items:center">' + av({ init: 'JT', tint: '#D6F2E7' }, 36, 11) + '<div style="flex:1"><strong>Jack T. can’t see this yet.</strong><br>Liz and Tom haven’t accepted your invite. <a href="#/invite">Nudge them →</a></div></div>') +
      '</div></div>';
  };

  // ----- Parent: approve Zoe's offers -----
  screens.approvals = function () {
    var ids = Object.keys(S.applied).sort(function (a, b) { return S.applied[a].at - S.applied[b].at; });
    var cards = ids.map(function (id) {
      var t = TASKS.filter(function (x) { return x.id === +id; })[0]; if (!t) return '';
      var p = posterOf(t), ok = approved(id), no = declined(id);
      var vouch = t.circle === 'plateau' ? 'You invited ' + p.first + '. ' + p.known + '.' : p.known;
      return '<div class="glass" style="padding:14px;display:flex;flex-direction:column;gap:12px">' +
        '<div style="display:flex;gap:12px;align-items:center">' + tile(t.cat, 46, 22) + '<div style="flex:1"><div class="h" style="font-size:14px">' + t.title + '</div><div class="sec" style="font-size:12px">' + t.longWhen + ' · ' + t.dur + ' · ' + circleChip(t.circle, true) + '</div></div><div class="h vio" style="font-size:18px">$' + t.pay + '</div></div>' +
        '<div class="vouch">' + av(p, 22, 8) + '<span><strong>' + p.name + '</strong> · ' + vouch + '</span></div>' +
        '<div style="display:flex;gap:6px;flex-wrap:wrap"><span class="tag tag-mint">' + ico('check', 11) + 'Adult home</span><span class="tag tag-mint">' + ico('check', 11) + 'Outdoors</span><span class="tag tag-mint">' + ico('check', 11) + 'ID verified</span><span class="tag tag-lav">' + t.walk + '</span></div>' +
        (ok ? '<div class="btn-mint" style="cursor:default;min-height:48px">' + ico('check', 16) + 'Approved · Zoe is booked</div>' : no ? '<div class="btn-glass" style="cursor:default;min-height:48px;color:#B45309">Declined · Zoe has been told</div>' :
          '<div style="display:flex;gap:8px"><button type="button" class="btn-glass" style="flex:1;min-height:48px" data-action="decline" data-value="' + id + '">Not this one</button><button type="button" class="btn-ink" style="flex:1.6;min-height:48px;box-shadow:none;background:#047857" data-action="approve" data-value="' + id + '">' + ico('check', 18) + 'Approve</button></div>') + '</div>';
    }).join('');
    var empty = '<div class="dashed" style="padding:24px 16px"><div style="font-size:26px;margin-bottom:6px">👋</div>Nothing waiting on you.<br><span style="font-weight:500">When Zoe offers on a job it lands here first.</span></div>';
    return '<div class="screen"><div class="scroll navpad" style="padding:26px 20px 96px;display:flex;flex-direction:column;gap:14px">' +
      '<div style="display:flex;justify-content:space-between;align-items:center"><div class="h" style="font-size:22px">Zoe’s bookings</div><div class="pill-glass"><span class="avatar" style="width:26px;height:26px;background:#6D28D9;color:#fff;font-size:10px">ZL</span>Zoe, 16</div></div>' +
      '<div class="mintcard" style="padding:12px 14px;display:flex;gap:10px;font-size:12px;line-height:1.5">' + ico('shield', 18, 'color:#047857;flex-shrink:0') + '<div>Zoe only ever sees jobs from your two circles. Nothing is booked until you tap approve.</div></div>' +
      (cards || empty) +
      '<div class="h" style="font-size:15px;margin-top:4px">Earlier</div>' +
      '<div class="glass" style="padding:12px 14px;display:flex;align-items:center;gap:12px">' + tile('box', 40, 18) + '<div style="flex:1"><div class="h" style="font-size:13px">Clear out the garage · Liz and Tom H.</div><div class="sec" style="font-size:12px">Sat 1pm · approved yesterday</div></div><span class="tag tag-mint">✓</span></div>' +
      '<div class="glass" style="padding:12px 14px;display:flex;align-items:center;gap:12px">' + tile('dog', 40, 18) + '<div style="flex:1"><div class="h" style="font-size:13px">Walk Biscuit · Sam K.</div><div class="sec" style="font-size:12px">Weekdays 4pm · approved as ongoing</div></div><span class="tag tag-mint">✓</span></div>' +
      '</div>' + pnav('Approvals') + '</div>';
  };

  // ----- Teen: join via parent -----
  screens.teen = function () {
    if (S.joined) {
      return '<div class="screen"><div style="display:flex;align-items:center;gap:12px;padding:24px 20px 8px"><a href="#/" class="iconbtn" aria-label="Back">' + ico('back', 22) + '</a></div>' +
        '<div class="scroll" style="padding:30px 24px 20px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:16px">' +
        '<div class="ring pop" style="margin-top:20px"><div class="arc" style="background:conic-gradient(#047857 0 25%,rgba(42,36,64,.1) 25% 100%)"></div><div class="disc">' + S.name.slice(0, 1).toUpperCase() + 'L</div><div class="badge">' + ico('check', 12, 'stroke-width:3') + '</div></div>' +
        '<h1 class="h" style="margin:0;font-size:30px;line-height:1.1">You’re in, ' + S.name + '</h1>' +
        '<p class="sec" style="margin:0;font-size:13px;line-height:1.55">You’re part of two circles through Mum. Every job you see comes from a family she knows. Mum approves each booking.</p>' +
        '<div style="width:100%;display:flex;flex-direction:column;gap:8px">' + ['plateau', 'nippers'].map(function (cid) { var c = CIRCLES[cid]; return '<div class="glass" style="padding:12px 14px;display:flex;gap:12px;align-items:center;text-align:left"><div class="tile" style="width:42px;height:42px;background:' + c.tint + '">' + ico('circle', 20, 'color:' + c.ink) + '</div><div style="flex:1"><div class="h" style="font-size:14px">' + (cid === 'plateau' ? S.circleName : c.name) + '</div><div class="sec" style="font-size:12px">' + (cid === 'plateau' ? joinedCount('plateau') + ' families · Mum runs it' : '14 families · run by Sam K.') + '</div></div></div>'; }).join('') + '</div></div>' +
        '<div style="padding:12px 20px 24px"><a href="#/browse" class="btn-ink">See jobs in my circles ' + ico('chev', 20) + '</a></div></div>';
    }
    function tog(label, on, first) { return '<label class="row" style="min-height:54px;justify-content:space-between;' + (first ? '' : 'border-top:1.5px solid rgba(42,36,64,.1)') + '"><span style="font-weight:600;font-size:14px">' + label + '</span><input class="check" type="checkbox"' + (on ? ' checked' : '') + ' disabled></label>'; }
    return '<div class="screen"><div style="display:flex;align-items:center;gap:12px;padding:24px 20px 8px"><a href="#/" class="iconbtn" aria-label="Back">' + ico('back', 22) + '</a></div>' +
      '<div class="scroll" style="padding:12px 20px 20px;display:flex;flex-direction:column;gap:16px">' +
      '<div class="glass" style="padding:14px;display:flex;gap:12px;align-items:center"><div class="avatar" style="width:46px;height:46px;background:#B9F5D8;color:#0B4A33;font-size:13px">KL</div><div style="flex:1"><div class="h" style="font-size:14px">Mum added you to a circle</div><div class="sec" style="font-size:12px">Kate Lawson · ' + S.circleName + '</div></div></div>' +
      '<div><h1 class="h" style="margin:0 0 6px;font-size:28px;line-height:1.1">Hey, is this you?</h1><p class="sec" style="margin:0;font-size:13px;line-height:1.5">You can’t sign up on your own. A parent has to bring you in, and they set what you can do.</p></div>' +
      '<div><label class="label" for="fname">First name</label><input id="fname" class="input" type="text" value="' + S.name + '" data-bind="name"></div>' +
      '<div><span class="label">Age</span><div style="display:flex;gap:8px">' + [13, 14, 15, 16, 17].map(function (a) { return '<button type="button" class="pill' + (S.age === a ? ' on' : '') + '" style="flex:1;justify-content:center;min-height:48px;font-size:14px;background:' + (S.age === a ? '' : 'rgba(255,255,255,.88)') + '" data-action="age" data-value="' + a + '">' + a + '</button>'; }).join('') + '</div></div>' +
      '<div><span class="label">Mum has set</span><div class="glass" style="padding:4px 16px">' + tog('She approves every booking', true, true) + tog('She’s copied on your messages', true) + tog('Live location on during a job', true) + '</div><div class="sec" style="font-size:11px;margin-top:6px">Only your parent can change these.</div></div>' +
      '<div class="mintcard" style="padding:14px;display:flex;gap:10px;font-size:12px;line-height:1.5">' + ico('shield', 20, 'color:#047857;flex-shrink:0') + '<div>Only families in your circles see your name and rating. Nobody else can find you.</div></div></div>' +
      '<div style="padding:12px 20px 24px"><button type="button" class="btn-ink" data-action="teenJoin">Yep, that’s me ' + ico('chev', 20) + '</button></div></div>';
  };

  // ----- Teen: browse jobs in circles -----
  screens.browse = function () {
    var tab = S.circleTab;
    var list = TASKS.filter(function (t) { return tab === 'all' || t.circle === tab; });
    var tabs = [['all', 'All my circles'], ['plateau', S.circleName.split(' ').slice(0, 2).join(' ')], ['nippers', 'Nippers']];
    var heading = tab === 'all' ? list.length + ' jobs from families Mum knows' : list.length + ' jobs in ' + (tab === 'plateau' ? S.circleName : CIRCLES.nippers.name);
    return '<div class="screen"><div class="scroll navpad" style="padding:26px 20px 96px">' +
      '<div style="display:flex;justify-content:space-between;align-items:center"><div class="pill-glass" style="font-size:15px;font-weight:800;padding:10px 16px">hustl ✦</div>' + parentPill() + '</div>' +
      '<div class="hero" style="padding:16px 18px;margin-top:16px;display:flex;align-items:center;gap:12px"><div class="blob"></div>' + stack(PARENTS.slice(1, 6).concat([EXTRA.sam]), 30) + '<div style="flex:1;font-size:12px;line-height:1.5;opacity:.9;position:relative"><strong>Your circles: 2</strong> · ' + (joinedCount('plateau') + 14) + ' families. Every poster here was vouched for by Mum or someone she trusts.</div></div>' +
      '<div class="hscroll" style="margin-top:16px">' + tabs.map(function (x) { return '<button type="button" class="pill' + (x[0] === tab ? ' on' : '') + '" data-action="circleTab" data-value="' + x[0] + '">' + (x[0] !== 'all' ? ico('circle', 12) : '') + x[1] + '</button>'; }).join('') + '</div>' +
      '<div class="h" style="font-size:17px;margin-top:16px">' + heading + '</div>' +
      '<div style="margin-top:12px;display:flex;flex-direction:column;gap:10px">' + list.map(jobCard).join('') +
      '<div class="dashed">No jobs from outside your circles. Ask Mum to join another circle to see more.</div></div></div>' + nav('Jobs') + '</div>';
  };

  // ----- Teen: job details + offer -----
  screens.task = function (id) {
    var t = TASKS.filter(function (x) { return x.id === +id; })[0] || TASKS[0];
    var p = posterOf(t);
    var applied = !!S.applied[t.id];
    var cta = applied
      ? '<div class="btn-ink" style="flex:2.2;background:' + (approved(t.id) ? '#047857' : '#B45309') + ';box-shadow:none">' + (declined(t.id) ? 'Mum said not this one' : approved(t.id) ? 'Mum approved ✓ You’re booked' : 'Offer sent · waiting on Mum ⏳') + '</div>'
      : '<button type="button" class="btn-ink" style="flex:2.2" data-action="apply" data-value="' + t.id + '">Offer to help · $' + t.pay + '</button>';
    var sheet = sheetFor === t.id ? '<div class="overlay" data-action="closeSheet"><div class="card"><div class="bigdisc pop" style="background:#B9F5D8">' + ico('check', 54, 'stroke-width:3;color:#0B4A33') + '</div>' +
      '<div class="h" style="font-size:26px">Offer sent</div><p class="body" style="margin:0;font-size:13px;line-height:1.55">' + p.first + ' has your offer and Mum just got a ping with who ' + p.first + ' is and how she knows them. Once she taps approve you’re booked.</p>' +
      '<a href="#/jobs" class="btn-ink">Watch it in My jobs</a><a href="#/browse" class="btn-glass">Keep browsing</a></div></div>' : '';
    var c = CIRCLES[t.circle];
    var hero = '<div style="position:absolute;inset:0;background:' + c.tint + '"></div>' +
      '<div style="position:absolute;left:0;right:0;top:64px;display:flex;flex-direction:column;align-items:center;gap:8px">' + av(p, 72, 22) + '<div class="pill-glass" style="font-size:11px;padding:6px 12px;min-height:0">' + ico('circle', 12, 'color:' + c.ink) + (t.circle === 'plateau' ? S.circleName : c.name) + '</div></div>' +
      '<a href="#/browse" class="iconbtn" style="position:absolute;left:20px;top:18px" aria-label="Back">' + ico('back', 20) + '</a>' +
      '<div class="pin on" style="position:absolute;right:20px;top:18px;font-size:14px;width:56px;height:56px;border-radius:20px;margin:0">$' + t.pay + '</div>';
    var vouch = t.circle === 'plateau'
      ? '<strong>Mum invited ' + p.first + '.</strong> ' + p.known + '.'
      : '<strong>' + p.name + '</strong> ' + p.known;
    return '<div class="screen">' +
      '<div style="position:relative;height:200px;flex-shrink:0;overflow:hidden;border-radius:0 0 28px 28px">' + hero + '</div>' +
      '<div class="scroll" style="padding:18px 20px 20px;display:flex;flex-direction:column;gap:14px">' +
      '<div><div style="display:flex;gap:8px;margin-bottom:8px">' + t.chips.map(function (x) { return '<span class="tag tag-' + x[1] + '">' + x[0] + '</span>'; }).join('') + '</div>' +
      '<h1 class="h" style="margin:0;font-size:24px;line-height:1.15">' + t.title + '</h1><div class="sec" style="font-size:13px;margin-top:4px">' + t.longWhen + ' · ' + t.dur + ' · ' + t.rate + '</div></div>' +
      '<div class="glass" style="padding:14px;display:flex;align-items:center;gap:12px">' + av(p, 46, 13) + '<div style="flex:1"><div class="h" style="font-size:14px">' + p.name + '</div><div class="sec" style="font-size:12px">' + (p.jobs || 1) + ' jobs in circle · ID verified · ' + t.suburb + '</div></div><button type="button" class="vio" style="border:0;background:none;font-size:12px;font-weight:700;cursor:pointer;min-height:44px;padding:0 6px">Chat</button></div>' +
      '<div class="mintcard" style="padding:14px;display:flex;gap:12px;align-items:center"><div class="avatar" style="width:40px;height:40px;border:3px solid #047857;color:#047857;font-size:11px">M</div><div style="flex:1;font-size:12px;line-height:1.5">' + vouch + '</div></div>' +
      '<div class="glass" style="padding:14px"><div class="h" style="font-size:13px;margin-bottom:8px">What you’ll do</div><div class="body" style="font-size:13px;line-height:1.6">' + t.desc + '</div></div>' +
      '<div class="glass" style="padding:12px 14px;display:flex;gap:10px;align-items:center;font-size:12px;line-height:1.5"><span class="sec">' + ico('eye', 18, 'color:#047857') + '</span><span class="body">Mum sees this job, the chat, and your live location while you’re there. ' + p.first + ' knows that too.</span></div></div>' +
      '<div style="padding:12px 20px 24px;display:flex;gap:10px;flex-shrink:0"><button type="button" class="btn-glass" style="flex:1" data-action="saveJob" data-value="' + t.id + '">' + (S.saved[t.id] ? ico('heart', 18, 'fill:#6D28D9;color:#6D28D9') + 'Saved' : 'Save') + '</button>' + cta + '</div>' + sheet + '</div>';
  };

  screens.jobs = function () {
    var tab = S.tab;
    var appliedTasks = TASKS.filter(function (t) { return S.applied[t.id]; }).sort(function (a, b) { return S.applied[a.id].at - S.applied[b.id].at; });
    var seg = '<div class="seg">' + [['up', 'Upcoming'], ['done', 'Done']].map(function (t) { return '<button type="button" class="' + (t[0] === tab ? 'on' : '') + '" data-action="tab" data-value="' + t[0] + '">' + t[1] + '</button>'; }).join('') + '</div>';
    var body = '';
    if (tab === 'up') {
      body += '<div class="hero" style="padding:18px;margin-top:18px"><div class="blob"></div>' +
        '<div style="display:flex;justify-content:space-between;align-items:flex-start"><span class="tag tag-mint2">' + (S.checkedOut ? 'CHECKED OUT' : 'HAPPENING NOW') + '</span><span class="h" style="font-size:20px">$40</span></div>' +
        '<div class="h" style="font-size:18px;margin-top:10px">Wash and vacuum two cars</div><div style="font-size:12px;opacity:.75;margin-top:3px">Jenny M. · next door · ' + (S.checkedOut ? 'done 11:38am · $40 released' : 'started 10:04am') + '</div>' +
        '<div style="display:flex;gap:8px;margin-top:14px"><button type="button" class="btn-dim">' + ico('chat', 14) + 'Message Jenny</button>' + (S.checkedOut ? (S.rated ? '<div class="btn-mint" style="cursor:default">Rated ★ ' + S.rating + '</div>' : '<a href="#/rate" class="btn-mint">Rate Jenny ★</a>') : '<button type="button" class="btn-mint" data-action="checkout">Check out ✓</button>') + '</div></div>' +
        '<div class="h" style="font-size:15px;margin-top:20px">This week</div><div class="rail" style="margin-top:12px">';
      if (!S.applied[4]) body += tlEntry(true, '<div class="glass" style="padding:14px"><div style="display:flex;justify-content:space-between"><div class="h" style="font-size:14px">Clear out the garage</div><div class="h vio" style="font-size:15px">$60</div></div><div class="sec" style="font-size:12px;margin-top:3px">Sat 1pm · Liz and Tom H. · <span class="grn" style="font-weight:700">Mum approved ✓</span></div></div>');
      appliedTasks.forEach(function (t) {
        body += tlEntry(approved(t.id), '<a href="#/task/' + t.id + '" class="glass" style="padding:14px;display:block;color:inherit"><div style="display:flex;justify-content:space-between"><div class="h" style="font-size:14px">' + t.title + '</div><div class="h vio" style="font-size:15px">$' + t.pay + '</div></div><div class="sec" style="font-size:12px;margin-top:3px">' + t.longWhen + ' · ' + posterOf(t).name + ' · ' + statusText(t) + '</div></a>');
      });
      body += tlEntry(false, '<a href="#/browse" class="dashed">Sunday’s free, 3 jobs open in your circles →</a>') + '</div>';
      var g = S.jars.guitar, pct = Math.min(100, Math.round((g + 100) / 450 * 100));
      body += '<div class="glass" style="border-radius:22px;padding:14px 16px;display:flex;align-items:center;gap:12px;margin-top:6px"><div class="tile" style="width:40px;height:40px;background:#EDE9FE">' + ico('music', 20, 'color:#6D28D9') + '</div><div class="body" style="flex:1;font-size:12px"><strong>$100 this weekend</strong> takes the guitar jar to ' + pct + '%</div><div class="bar" style="width:70px;height:10px"><div class="vio" style="width:' + pct + '%"></div></div></div>';
    } else {
      var done = [['Help clear out the garage', 'Sat 13 Sep · Liz and Tom H.', 60, 5], ['Wash and vacuum two cars', 'Sat 6 Sep · Jenny M.', 40, 5], ['Mow the front lawn', 'Sun 31 Aug · Raj P.', 35, 5], ['Walk Biscuit, 3 walks', 'Week of 25 Aug · Sam K.', 60, 4], ['Set up a new TV', 'Sat 16 Aug · Margaret W.', 25, 5]];
      body += '<div class="glass" style="margin-top:18px;padding:14px 16px;display:flex;align-items:center;gap:12px"><div class="h" style="font-size:26px">12</div><div class="sec" style="font-size:12px;line-height:1.4"><strong class="body">jobs done, $385 earned.</strong><br>All inside your circles, every one approved by Mum.</div></div>';
      body += '<div style="margin-top:14px;display:flex;flex-direction:column;gap:10px">' + done.map(function (d) {
        return '<div class="glass" style="padding:14px;display:flex;align-items:center;gap:12px"><div style="flex:1"><div class="h" style="font-size:14px">' + d[0] + '</div><div class="sec" style="font-size:12px;margin-top:2px">' + d[1] + '</div><div style="margin-top:4px">' + stars(d[3], 12) + '</div></div><div class="h grn" style="font-size:16px">+$' + d[2] + '</div></div>';
      }).join('') + '</div>';
    }
    return '<div class="screen"><div class="scroll navpad" style="padding:26px 20px 96px"><div style="display:flex;justify-content:space-between;align-items:center"><div class="h" style="font-size:22px">My jobs</div>' + seg + '</div>' + body + '</div>' + nav('My jobs') + '</div>';
  };

  screens.earnings = function () {
    var jars = [
      { id: 'guitar', name: 'Electric guitar', icon: 'music', tint: '#EDE9FE', target: 450, cls: 'vio', note: '≈ 7 more car washes · on track for July' },
      { id: 'trip', name: 'Schoolies trip', icon: 'plane', tint: '#D6F2E7', target: 600, cls: 'grn', note: '' }
    ];
    var jarHtml = jars.map(function (j) {
      var saved = S.jars[j.id], pct = Math.min(100, Math.round(saved / j.target * 100));
      return '<div class="glass" style="border-radius:22px;padding:16px"><div style="display:flex;align-items:center;gap:12px"><div class="tile" style="width:46px;height:46px;border-radius:16px;background:' + j.tint + '">' + ico(j.icon, 22) + '</div><div style="flex:1"><div class="h" style="font-size:14px">' + j.name + '</div><div class="sec" style="font-size:12px">$' + saved + ' of $' + j.target + '</div></div><div class="h ' + j.cls + '" style="font-size:14px">' + pct + '%</div></div>' +
        '<div class="bar" style="margin-top:12px"><div class="' + j.cls + '" style="width:' + pct + '%"></div></div>' + (j.note ? '<div class="sec" style="margin-top:10px;font-size:12px">' + j.note + '</div>' : '') + '</div>';
    }).join('');
    var days = [['M', 0], ['T', 20], ['W', 0], ['T', 0], ['F', 0], ['S', 40], ['S', 35]];
    var bars = '<div class="bars">' + days.map(function (d) { var h = Math.round(d[1] / 40 * 80); return '<div>' + (d[1] === 40 ? '<div class="v">$40</div>' : '') + (d[1] ? '<div class="b" style="height:' + h + 'px" title="$' + d[1] + '"></div>' : '<div class="z"></div>') + '<div class="d">' + d[0] + '</div></div>'; }).join('') + '</div>';
    var jarSheet = S.jarSheet ? '<div class="overlay" data-action="closeJar"><div class="card" style="text-align:left;align-items:stretch"><div class="h" style="font-size:20px;text-align:center">Add $95 to a jar</div>' +
      jars.map(function (j) { return '<button type="button" class="glass" style="border:0;padding:14px;display:flex;align-items:center;gap:12px;cursor:pointer;text-align:left" data-action="addJar" data-value="' + j.id + '"><div class="tile" style="width:46px;height:46px;border-radius:16px;background:' + j.tint + '">' + ico(j.icon, 22) + '</div><div style="flex:1"><div class="h" style="font-size:14px">' + j.name + '</div><div class="sec" style="font-size:12px">$' + S.jars[j.id] + ' of $' + j.target + '</div></div>' + ico('chev', 20, 'color:#5C5680') + '</button>'; }).join('') +
      '<button type="button" class="btn-glass" data-action="closeJar">Not now</button></div></div>' : '';
    return '<div class="screen"><div class="scroll navpad" style="padding:26px 20px 96px;display:flex;flex-direction:column;gap:0">' +
      '<div style="display:flex;justify-content:space-between;align-items:center"><div class="h" style="font-size:22px">Your money</div>' + parentPill() + '</div>' +
      '<div class="hero" style="padding:22px;margin-top:16px"><div class="blob"></div><div style="font-size:12px;font-weight:600;opacity:.75">' + (S.cashout ? 'Cash-out requested' : 'Earned this month') + '</div><div class="h" style="font-size:44px;letter-spacing:-.02em;margin-top:4px">$95.00</div>' +
      '<div style="display:flex;gap:8px;margin-top:14px">' + (S.cashout ? '<div class="btn-dim" style="cursor:default">' + ico('check', 14) + 'Mum approves, then it lands</div>' : '<button type="button" class="btn-dim" data-action="cashout">Cash out</button>') + '<button type="button" class="btn-mint" data-action="openJar">Add to a jar</button></div></div>' +
      '<div class="h" style="font-size:15px;margin-top:20px">Money jars</div><div style="margin-top:10px;display:flex;flex-direction:column;gap:12px">' + jarHtml + '</div>' +
      '<div class="glass" style="border-radius:22px;padding:16px;margin-top:12px"><div style="display:flex;justify-content:space-between;align-items:baseline"><div class="h" style="font-size:14px">This week</div><div class="sec" style="font-size:12px;font-weight:600">$95 across 2 jobs</div></div><div style="margin-top:12px">' + bars + '</div></div>' +
      '<div class="glass" style="border-radius:22px;padding:16px;margin-top:12px;display:flex;gap:12px;align-items:center"><div class="avatar" style="width:46px;height:46px;border:3px solid #047857;color:#047857;font-size:12px">M</div><div class="body" style="flex:1;font-size:12px;line-height:1.5"><strong>Mum sees every payout.</strong> Cash-outs go to the account she linked, not to you directly.</div></div>' +
      '</div>' + nav('Money') + jarSheet + '</div>';
  };

  screens.profile = function () {
    function chip(icn, label) { return '<span class="pill-glass" style="font-size:12px;padding:8px 14px;cursor:default">' + ico(icn, 16, 'color:#6D28D9') + label + '</span>'; }
    function quote(text, who) { return '<div class="glass" style="padding:14px"><div class="quote">“' + text + '”</div><div class="attr">' + who + ' · ★★★★★</div></div>'; }
    return '<div class="screen"><div class="scroll navpad" style="padding:26px 20px 96px">' +
      '<div style="display:flex;flex-direction:column;align-items:center;text-align:center"><div class="ring"><div class="arc"></div><div class="disc">' + S.name.slice(0, 1).toUpperCase() + 'L</div><div class="badge">' + ico('check', 12, 'stroke-width:3') + '</div></div>' +
      '<div class="h" style="font-size:24px;margin-top:12px">' + S.name + ' Lawson</div><div class="sec" style="font-size:13px;margin-top:2px">Collaroy Plateau · ' + S.age + ' · in 2 circles</div>' +
      '<div style="display:flex;gap:8px;margin-top:10px"><span class="tag tag-mint">Parent linked ✓</span><span class="tag tag-lav">Trust ring 75%</span></div></div>' +
      '<div style="display:flex;gap:10px;margin-top:18px"><div class="glass stat"><div class="n">12</div><div class="l">jobs done</div></div><div class="glass stat"><div class="n">4.9★</div><div class="l">rating</div></div><div class="glass stat"><div class="n vio">$385</div><div class="l">earned</div></div></div>' +
      '<div class="h" style="font-size:15px;margin-top:18px">Your circles</div><div style="margin-top:10px;display:flex;flex-direction:column;gap:8px">' + ['plateau', 'nippers'].map(function (cid) { var c = CIRCLES[cid]; return '<div class="glass" style="padding:12px 14px;display:flex;gap:12px;align-items:center"><div class="tile" style="width:40px;height:40px;background:' + c.tint + '">' + ico('circle', 20, 'color:' + c.ink) + '</div><div style="flex:1"><div class="h" style="font-size:13px">' + (cid === 'plateau' ? S.circleName : c.name) + '</div><div class="sec" style="font-size:12px">' + (cid === 'plateau' ? 'Through Mum · she runs it' : 'Through Mum · since March') + '</div></div></div>'; }).join('') + '</div>' +
      '<div class="glass" style="padding:12px 14px;display:flex;gap:10px;align-items:center;font-size:12px;line-height:1.5;margin-top:10px"><span class="sec">' + ico('lock', 18, 'color:#047857') + '</span><span class="body">Only people in these circles can see this profile.</span></div>' +
      '<div class="h" style="font-size:15px;margin-top:18px">Good at</div><div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px">' + chip('car', 'Car washing') + chip('paw', 'Dog walking') + chip('leaf', 'Gardens') + chip('phone', 'Tech help') + '</div>' +
      '<div class="h" style="font-size:15px;margin-top:18px">What your circle says</div><div style="margin-top:10px;display:flex;flex-direction:column;gap:10px">' + quote('Both cars spotless, and she was 10 minutes early. Booking again.', 'Jenny M. · Car wash') + quote('Biscuit loves her. Sends photos from the walk every time.', 'Sam K. · Dog walking') + quote('Straight lines, tidy edges, polite. Recommend.', 'Raj P. · Lawn') + '</div>' +
      '<div class="hero" style="border-radius:22px;padding:14px 16px;display:flex;align-items:center;gap:12px;margin-top:18px;box-shadow:var(--sh-cta)"><div class="avatar" style="width:40px;height:40px;background:#B9F5D8;color:#0B4A33;font-size:12px">K</div><div style="flex:1;font-size:12px;line-height:1.5;opacity:.9">Guardian: <strong>Kate Lawson</strong> · verified · approves all bookings</div><a href="#/approvals" style="border:0;background:none;color:#B9F5D8;font-size:12px;font-weight:700;cursor:pointer;min-height:44px;display:flex;align-items:center">Her view</a></div>' +
      '</div>' + nav('Profile') + '</div>';
  };

  screens.rate = function () {
    if (S.rated) {
      return '<div class="screen">' + topbar('#/jobs', 'Rate the job') +
        '<div class="scroll" style="padding:40px 24px 20px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:16px"><div class="bigdisc pop" style="background:#EDE9FE;margin-top:20px">' + ico('star', 54, 'fill:#6D28D9;stroke:#6D28D9') + '</div><div class="h" style="font-size:28px;line-height:1.1">Thanks, ' + S.name + '</div><p class="sec" style="margin:0;font-size:13px;line-height:1.55">Saved. Jenny rated you 5 stars too, so your trust ring just went up.</p><span class="tag tag-lav" style="font-size:12px;padding:8px 14px">Trust ring 75% → 80%</span></div>' +
        '<div style="padding:12px 20px 24px;display:flex;flex-direction:column;gap:10px"><a href="#/earnings" class="btn-ink">Put the $40 in a jar</a><a href="#/jobs" class="btn-glass">Back to my jobs</a></div></div>';
    }
    var words = ['', 'Not great', 'Meh', 'Fine', 'Good', 'Awesome'];
    var tags = ['Friendly', 'Clear instructions', 'Paid promptly', 'Safe and respectful', 'Job as described', 'Would work again'];
    return '<div class="screen">' + topbar('#/jobs', 'Rate the job') +
      '<div class="scroll" style="padding:4px 20px 20px;display:flex;flex-direction:column;gap:16px">' +
      '<div class="glass" style="display:flex;gap:12px;align-items:center;padding:14px">' + tile('car', 46, 22) + '<div style="flex:1"><div class="h" style="font-size:14px">Wash and vacuum two cars</div><div class="sec" style="font-size:12px">Jenny M. · next door · today</div></div><div class="h grn" style="font-size:18px">+$40</div></div>' +
      '<div style="text-align:center"><div class="h" style="font-size:24px;margin-bottom:8px">How was Jenny?</div><div style="display:flex;justify-content:center;gap:4px">' + [1, 2, 3, 4, 5].map(function (i) { return '<button type="button" class="starbtn" aria-label="' + i + ' star' + (i > 1 ? 's' : '') + '" data-action="rating" data-value="' + i + '">' + star(40, i <= S.rating) + '</button>'; }).join('') + '</div><div class="sec" style="font-size:13px;font-weight:700;margin-top:4px;min-height:20px">' + words[S.rating] + '</div></div>' +
      '<div><span class="label">What stood out?</span><div style="display:flex;flex-wrap:wrap;gap:8px">' + tags.map(function (t) { return '<button type="button" class="pill' + (S.tags[t] ? ' on' : '') + '" style="' + (S.tags[t] ? '' : 'background:rgba(255,255,255,.88)') + '" data-action="tag" data-value="' + t + '">' + t + '</button>'; }).join('') + '</div></div>' +
      '<div><label class="label" for="note">Anything else? (optional)</label><textarea id="note" class="input" rows="3" placeholder="Was the job as described? Would you go back?"></textarea></div>' +
      '<div class="mintcard" style="padding:12px 14px;display:flex;gap:10px;font-size:12px;line-height:1.5">' + ico('eye', 18, 'color:#047857;flex-shrink:0') + '<div>Ratings show once both sides have rated. Mum sees yours; the circle admin sees a flag if anything goes wrong.</div></div>' +
      '<a href="#/rate" style="font-size:12px;font-weight:700;color:#B45309;display:inline-flex;align-items:center;gap:6px;min-height:44px">' + ico('flag', 16) + 'Something felt off? Tell Mum and the admin privately</a></div>' +
      '<div style="padding:12px 20px 24px"><button type="button" class="btn-ink" data-action="sendRating"' + (S.rating ? '' : ' disabled style="opacity:.5;box-shadow:none"') + '>Send rating</button></div></div>';
  };

  // ---------- Actions ----------
  var actions = {
    age: function (v) { set({ age: +v }); },
    circleStep: function (v, el, ev) { if (ev) ev.preventDefault(); set({ circleStep: +v }); },
    circleKind: function (v) { set({ circleKind: v }); },
    inviteRule: function (v) { set({ inviteRule: v }); },
    createCircle: function () { S.created = true; S.circleStep = 1; save(); location.hash = '#/invite'; },
    invite: function (v) { S.invites[v] = { at: Date.now() }; save(); render(); },
    copy: function () { copied = true; render(); setTimeout(function () { copied = false; render(); }, 1500); },
    postCircle: function (v) { set({ postCircle: v }); },
    postCat: function (v) { set({ postCat: v }); },
    pay: function (v) { set({ pay: Math.min(200, Math.max(10, S.pay + (+v))) }); },
    post: function () { set({ posted: true }); },
    editPost: function () { set({ posted: false }); },
    choose: function (v) { set({ chosen: +v }); },
    unchoose: function () { set({ chosen: null }); },
    approve: function (v) { if (S.applied[v]) { S.applied[v].ok = true; S.applied[v].no = false; } save(); render(); },
    decline: function (v) { if (S.applied[v]) { S.applied[v].no = true; S.applied[v].ok = false; } save(); render(); },
    teenJoin: function () { set({ joined: true }); },
    circleTab: function (v) { set({ circleTab: v }); },
    apply: function (v) { S.applied[+v] = { at: Date.now() }; sheetFor = +v; save(); render(); },
    saveJob: function (v) { S.saved[+v] = !S.saved[+v]; save(); render(); },
    closeSheet: function (v, el, ev) { if (ev.target === el) { sheetFor = null; render(); } },
    tab: function (v) { set({ tab: v }); },
    checkout: function () { set({ checkedOut: true }); },
    rating: function (v) { set({ rating: +v }); },
    tag: function (v) { S.tags[v] = !S.tags[v]; save(); render(); },
    sendRating: function () { if (S.rating) set({ rated: true }); },
    cashout: function () { set({ cashout: true }); },
    openJar: function () { set({ jarSheet: true }); },
    closeJar: function (v, el, ev) { if (ev.target === el) set({ jarSheet: false }); },
    addJar: function (v) { S.jars[v] += 95; S.jarSheet = false; save(); render(); },
    reset: function () { S = fresh(); sheetFor = null; save(); location.hash = '#/'; render(); }
  };
  document.addEventListener('click', function (ev) {
    var el = ev.target.closest('[data-action]');
    if (!el) return;
    var fn = actions[el.getAttribute('data-action')];
    if (fn) fn(el.getAttribute('data-value'), el, ev);
  });
  document.addEventListener('input', function (ev) {
    var b = ev.target.getAttribute && ev.target.getAttribute('data-bind');
    if (b === 'name') { S.name = ev.target.value.trim() || 'Zoe'; save(); }
    if (b === 'circleName') { S.circleName = ev.target.value.trim() || 'Collaroy Plateau Parents'; save(); }
  });

  // ---------- Router ----------
  function route() {
    var h = (location.hash || '#/').replace(/^#\/?/, '');
    var parts = h.split('/');
    var name = parts[0] || 'welcome';
    if (name === 'task') return { screen: 'task', arg: parts[1] || 1, panel: '#/task/1' };
    if (name === 'circle' && parts[1] === 'new') return { screen: 'circlenew', panel: '#/circle/new' };
    if (!screens[name]) name = 'welcome';
    return { screen: name, panel: name === 'welcome' ? '#/' : '#/' + name };
  }
  var lastScreen = null, timer = null;
  function render() {
    var r = route();
    if (r.screen !== lastScreen) { sheetFor = null; }
    lastScreen = r.screen;
    var app = document.getElementById('app');
    app.innerHTML = screens[r.screen](r.arg);
    if (r.screen !== 'browse') { var sc = app.querySelector('.scroll'); if (sc) sc.scrollTop = 0; }
    document.querySelectorAll('.panel-group a').forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === r.panel); });
    // Simulations: Mum approving on her phone, and invited parents accepting.
    clearTimeout(timer);
    var wait = (pendingOffers().length && (r.screen === 'jobs' || r.screen === 'task' || r.screen === 'approvals' || r.screen === 'circle')) || (anyInvitePending() && (r.screen === 'invite' || r.screen === 'circle' || r.screen === 'applicants' || r.screen === 'post'));
    if (wait) timer = setTimeout(render, 1000);
  }
  window.addEventListener('hashchange', render);
  render();
})();
