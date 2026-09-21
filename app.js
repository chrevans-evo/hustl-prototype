/* Hustl prototype ("Soft OS" direction): vanilla JS, hash routing, shared state in localStorage. */
(function () {
  'use strict';

  // ---------- Icons ----------
  var ICON = {
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    map: '<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>',
    list: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/>',
    jar: '<path d="M7 7h10v11a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3z"/><path d="M6 4h12v3H6z"/><path d="M9 13h6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    star: '<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z"/>',
    pin: '<path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    check: '<path d="M5 12l4 4L19 6"/>',
    chev: '<path d="M9 6l6 6-6 6"/>',
    back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
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
    walk: '<circle cx="13" cy="4" r="1.5"/><path d="M10 21l2-7 3 2v5M8 12l3-4 3 1 3 4M12 14l-3 3"/>',
    heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>'
  };
  function ico(name, size, style, cls) {
    size = size || 20;
    return '<svg class="' + (cls || 'ico') + '" viewBox="0 0 24 24" aria-hidden="true" style="width:' + size + 'px;height:' + size + 'px;' + (style || '') + '">' + ICON[name] + '</svg>';
  }
  function star(size, on) { return ico('star', size, '', on === false ? 'ico star-off' : 'ico star'); }
  function stars(n, size) { var s = ''; for (var i = 0; i < 5; i++) s += star(size, i < n); return '<span style="display:inline-flex;gap:2px">' + s + '</span>'; }

  // ---------- Data ----------
  var CAT = {
    car: { label: 'Car wash', icon: 'car', tint: '#EDE9FE' },
    garden: { label: 'Lawn and garden', icon: 'leaf', tint: '#D6F2E7' },
    dog: { label: 'Dog walking', icon: 'paw', tint: '#FDE8D8' },
    box: { label: 'Garage and moving', icon: 'box', tint: '#EDE9FE' },
    clean: { label: 'Cleaning', icon: 'drop', tint: '#D6F2E7' },
    tech: { label: 'Tech help', icon: 'phone', tint: '#FDE8D8' }
  };
  var TASKS = [
    { id: 1, circle: 'curl', rel: 'Ava’s mum', invitedBy: 'Kate (your mum)', joined: 'March', cat: 'car', title: 'Wash and vacuum two cars', pay: 40, suburb: 'Collaroy', km: '1.2', walk: '15 min walk', when: 'Sat 10am', longWhen: 'Sat 10:00am', dur: 'about 1.5 hrs', rate: '$27/hr', poster: 'Jenny M.', init: 'JM', tint: '#FDE8D8', rating: '4.9', jobs: 23, chips: [['Car wash', 'lav'], ['Gear provided', 'mint']], desc: 'Two cars in the driveway, a Kia and a Subaru. Outside wash, wheels, and a quick vacuum inside. Hose, bucket and vacuum are all here. I’ll be home the whole time.', px: 300, py: 110, weekend: true },
    { id: 2, circle: 'curl', rel: 'Dev’s dad', invitedBy: 'Kate (your mum)', joined: 'March', cat: 'garden', title: 'Mow the front lawn and edges', pay: 35, suburb: 'Dee Why', km: '0.8', walk: '6 min walk', when: 'Sun 9am', longWhen: 'Sun 9:00am', dur: 'about 1 hr', rate: '$35/hr', poster: 'Raj P.', init: 'RP', tint: '#D6F2E7', rating: '5.0', jobs: 9, chips: [['Lawn and garden', 'lav'], ['Mower provided', 'mint']], desc: 'Small front lawn, about 15 minutes of mowing plus edges along the path. I’ll show you the mower. Closed shoes please.', px: 90, py: 90, weekend: true },
    { id: 3, circle: 'curl', rel: 'Biscuit’s owner at no. 14', invitedBy: 'Jenny M.', joined: 'April', cat: 'dog', title: 'Walk Biscuit the retriever', pay: 20, suburb: 'Freshwater', km: '2.4', walk: '25 min walk', when: '4pm', longWhen: 'Weekdays 4:00pm', dur: '45 min', rate: '$27/hr', poster: 'Sam K.', init: 'SK', tint: '#EDE9FE', rating: '4.8', jobs: 31, chips: [['Dog walking', 'lav'], ['Ongoing', 'mint']], desc: 'Biscuit is 4, friendly and pulls a little at the start. A loop to the beach and back is perfect. Send a photo from the walk if you can.', px: 150, py: 280, weekend: false },
    { id: 4, circle: 'y10', rel: 'Jack’s parents', invitedBy: 'started the circle', joined: 'July', cat: 'box', title: 'Help clear out the garage', pay: 60, suburb: 'Mona Vale', km: '6.1', walk: '12 min ride', when: 'Sat 1pm', longWhen: 'Sat 1:00pm', dur: 'about 3 hrs', rate: '$20/hr', poster: 'Liz and Tom H.', init: 'LT', tint: '#FDE8D8', rating: '4.7', jobs: 9, chips: [['Garage + moving', 'lav'], ['2-player OK', 'mint']], desc: 'Carry boxes to a skip, sort keep vs chuck piles, sweep out. Gloves provided. Bring a mate and split a bonus $20.', px: 230, py: 170, weekend: true },
    { id: 5, circle: 'y10', rel: 'Mia’s mum', invitedBy: 'Liz H.', joined: 'July', cat: 'clean', title: 'Wash the ground floor windows', pay: 45, suburb: 'Narrabeen', km: '3.5', walk: '8 min ride', when: 'Sun 2pm', longWhen: 'Sun 2:00pm', dur: 'about 2 hrs', rate: '$22/hr', poster: 'Priya N.', init: 'PN', tint: '#D6F2E7', rating: '4.9', jobs: 14, chips: [['Cleaning', 'lav'], ['No ladders', 'mint']], desc: 'Eight windows around the house, outside only. All reachable from the ground. Squeegee and bucket here.', px: 40, py: 220, weekend: true },
    { id: 6, circle: 'curl', rel: 'Raj’s mum', invitedBy: 'Raj P.', joined: 'May', cat: 'tech', title: 'Set up Grandad’s new phone', pay: 25, suburb: 'Curl Curl', km: '1.9', walk: '20 min walk', when: 'Any arvo', longWhen: 'Any afternoon this week', dur: 'about 1 hr', rate: '$25/hr', poster: 'Margaret W.', init: 'MW', tint: '#EDE9FE', rating: '5.0', jobs: 4, chips: [['Tech help', 'lav'], ['Indoors, adult home', 'mint']], desc: 'Move contacts and photos from the old phone, set up WhatsApp and show him how to video call the grandkids.', px: 320, py: 250, weekend: false }
  ];
  var CIRCLES = [
    { id: 'curl', name: 'Curl Curl Crew', code: 'CURL-2481', families: 6, kids: 9, admin: 'Kate L.', adminRel: 'your mum', since: 'March', members: [
      { init: 'KL', name: 'Kate L.', rel: 'Your mum', role: 'Started the circle', tint: '#D6F2E7' },
      { init: 'JM', name: 'Jenny M.', rel: 'Ava’s mum', role: 'Invited by Kate', tint: '#FDE8D8' },
      { init: 'RP', name: 'Raj P.', rel: 'Dev’s dad', role: 'Invited by Kate', tint: '#EDE9FE' },
      { init: 'SK', name: 'Sam K.', rel: 'Biscuit’s owner at no. 14', role: 'Invited by Jenny', tint: '#D6F2E7' },
      { init: 'MW', name: 'Margaret W.', rel: 'Raj’s mum', role: 'Invited by Raj', tint: '#FDE8D8' }
    ], teens: ['Zoe L. (you)', 'Ava M.', 'Dev P.', 'Ollie P.', 'Ruby K.'] },
    { id: 'y10', name: 'Year 10 parents, Cromer', code: 'CRMR-1093', families: 14, kids: 16, admin: 'Liz H.', adminRel: 'Jack’s mum', since: 'July', members: [
      { init: 'LT', name: 'Liz and Tom H.', rel: 'Jack’s parents', role: 'Started the circle', tint: '#FDE8D8' },
      { init: 'PN', name: 'Priya N.', rel: 'Mia’s mum', role: 'Invited by Liz', tint: '#EDE9FE' },
      { init: 'AB', name: 'Alicia B.', rel: 'Noah’s mum', role: 'Invited by Liz', tint: '#D6F2E7' },
      { init: 'DR', name: 'Dave R.', rel: 'Ella’s dad', role: 'Invited by Priya', tint: '#FDE8D8' },
      { init: 'KL', name: 'Kate L.', rel: 'Your mum', role: 'Invited by Liz', tint: '#D6F2E7' }
    ], teens: ['Zoe L. (you)', 'Jack H.', 'Mia N.', 'Noah B.', 'Ella R.'] }
  ];
  function circleOf(id) { return CIRCLES.filter(function (c) { return c.id === id; })[0]; }
  var PEOPLE = [
    { id: 1, name: 'Zoe L.', first: 'Zoe', init: 'ZL', tint: '#EDE9FE', meta: '16 · Kate L.’s daughter · 12 jobs · 1.2 km', rating: '4.9', badge: 'Car wash pro', cls: 'tag-lav', msg: 'Hi Jenny, I can do 10am Saturday. I’ve done 5 car washes on Hustl, happy to bring my own microfibre cloths.' },
    { id: 2, name: 'Jack T.', first: 'Jack', init: 'JT', tint: '#FDE8D8', meta: '16 · Liz H.’s son · 8 jobs · 0.4 km', rating: '4.7', badge: 'Lives nearby', cls: 'tag-mint', msg: 'Can be there at 10 sharp, I’m just up the road.' },
    { id: 3, name: 'Mia R.', first: 'Mia', init: 'MR', tint: '#D6F2E7', meta: '14 · Priya N.’s daughter · 3 jobs · 3.1 km', rating: '5.0', badge: 'New and keen', cls: 'tag-peach', msg: 'I’d love to help. My mum can drop me off at 10am.' }
  ];

  // ---------- State ----------
  var KEY = 'hustl-circles-v1';
  function fresh() {
    return {
      name: 'Zoe', age: 16, step: 1,
      filter: 'walk', view: 'map', selected: null,
      applied: {},            // taskId -> { at: ms }
      saved: {},
      tab: 'up', checkedOut: false, rated: false, rating: 0, tags: {},
      cashout: false, jars: { guitar: 180, trip: 60 }, jarSheet: false,
      postCat: 'car', pay: 40, posted: false, chosen: null,
      circle: 'all', postCircles: { curl: true, y10: false }, approvedBy: {}, requests: {}, copied: false
    };
  }
  var S;
  try { S = Object.assign(fresh(), JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) { S = fresh(); }
  var sheetFor = null;
  var APPROVE_MS = 6000;
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function set(patch) { Object.keys(patch).forEach(function (k) { S[k] = patch[k]; }); save(); render(); }
  function approved(id) { var a = S.applied[id]; return !!a && (S.approvedBy[id] || (Date.now() - a.at) > APPROVE_MS); }
  function anyPending() { return Object.keys(S.applied).some(function (id) { return !approved(id); }); }

  // ---------- Shared pieces ----------
  function nav(active) {
    var items = [['Browse', 'map', '#/browse'], ['My jobs', 'list', '#/jobs'], ['Money', 'jar', '#/earnings'], ['Profile', 'user', '#/profile']];
    return '<nav class="nav" aria-label="Main">' + items.map(function (it) {
      return '<a href="' + it[2] + '"' + (it[0] === active ? ' class="on"' : '') + '>' + ico(it[1], 22) + '<span>' + it[0] + '</span></a>';
    }).join('') + '</nav>';
  }
  function parentPill() {
    return '<div class="pill-glass" role="status"><span class="avatar" style="width:26px;height:26px;background:#6D28D9;color:#fff;font-size:10px">' + S.name.slice(0, 1).toUpperCase() + 'L</span>Mum linked <span style="color:#047857;font-size:14px;line-height:1">&#9679;</span></div>';
  }
  function mapLines(extra, noLabels) {
    return '<div class="map" aria-hidden="true">' +
      '<i style="left:-40px;top:120px;width:220px;height:3px;transform:rotate(24deg)"></i>' +
      '<i style="left:60px;top:60px;width:340px;height:3px;transform:rotate(-12deg)"></i>' +
      '<i style="left:-20px;top:300px;width:420px;height:3px;transform:rotate(8deg)"></i>' +
      '<i style="left:140px;top:-40px;width:3px;height:420px;transform:rotate(18deg)"></i>' +
      '<i style="left:250px;top:30px;width:3px;height:380px;transform:rotate(-8deg);opacity:.8"></i>' +
      (noLabels ? '' : '<b style="left:70px;top:150px">DEE WHY</b><b style="left:240px;top:250px">COLLAROY</b><b style="left:180px;top:330px">LONG REEF</b>') + (extra || '') + '</div>';
  }
  function tile(cat, size, iconSize) {
    var c = CAT[cat];
    return '<div class="tile" style="width:' + size + 'px;height:' + size + 'px;background:' + c.tint + '">' + ico(c.icon, iconSize || 24) + '</div>';
  }
  function jobCard(t, on) {
    return '<a href="#/task/' + t.id + '" class="jobcard' + (on ? ' on' : '') + '" id="job-' + t.id + '">' + tile(t.cat, 52, 24) +
      '<div style="flex:1;min-width:0"><div class="h" style="font-size:14px">' + t.title + '</div><div class="sec" style="font-size:12px;margin-top:2px">' + t.suburb + ' · ' + t.walk + ' · ' + t.when + '</div><div style="font-size:11px;margin-top:3px;display:flex;gap:5px;align-items:center"><span class="grn" style="font-size:9px">&#9679;</span><span class="sec">' + t.poster + ', ' + t.rel + ' · ' + circleOf(t.circle).name + '</span></div></div>' +
      '<div class="h vio" style="font-size:19px">$' + t.pay + '</div></a>';
  }
  function statusText(t) {
    if (!S.applied[t.id]) return '';
    return approved(t.id) ? '<span class="grn" style="font-weight:700">Mum approved ✓</span>' : '<span style="color:#B45309;font-weight:700">Waiting on Mum ⏳</span>';
  }
  function tlEntry(on, inner) { return '<div class="tl"><div class="dot' + (on ? ' on' : '') + '"></div>' + inner + '</div>'; }

  // ---------- Screens ----------
  var screens = {};

  screens.welcome = function () {
    var pins = '<b style="left:40px;top:392px">DEE WHY</b><b style="left:270px;top:330px">COLLAROY</b><button class="pin" style="left:60px;top:330px" tabindex="-1" aria-hidden="true">$35</button><button class="pin on" style="left:190px;top:300px" tabindex="-1" aria-hidden="true">$60</button><button class="pin" style="left:300px;top:380px" tabindex="-1" aria-hidden="true">$40</button><button class="pin" style="left:140px;top:420px" tabindex="-1" aria-hidden="true">$20</button><button class="pin" style="left:250px;top:460px" tabindex="-1" aria-hidden="true">$45</button>';
    return '<div class="screen">' + mapLines(pins, true) +
      '<div style="position:relative;padding:24px 20px;display:flex;align-items:center;justify-content:space-between"><div class="pill-glass" style="font-size:15px;font-weight:800;padding:10px 16px">hustl \u2726</div><div class="pill-glass">' + ico('pin', 14, 'color:#6D28D9') + 'Northern Beaches</div></div>' +
      '<div style="position:relative;padding:16px 24px 0"><h1 class="h" style="margin:0;font-size:36px;line-height:1.05;letter-spacing:-.02em">Jobs from adults your parents already know.</h1><p class="body" style="margin:12px 0 0;font-size:14px;line-height:1.55">Parents set up a circle with families they trust. Teens only ever see jobs posted inside it. No strangers, ever.</p></div>' +
      '<div style="position:relative;margin-top:auto;padding:0 20px 24px;display:flex;flex-direction:column;gap:10px">' +
      '<div class="glass" style="padding:14px 16px;display:flex;align-items:center;gap:12px"><div style="display:flex"><div class="avatar" style="width:34px;height:34px;background:#D6F2E7;font-size:11px;border:2px solid #fff">KL</div><div class="avatar" style="width:34px;height:34px;background:#FDE8D8;font-size:11px;border:2px solid #fff;margin-left:-10px">JM</div><div class="avatar" style="width:34px;height:34px;background:#EDE9FE;font-size:11px;border:2px solid #fff;margin-left:-10px">RP</div></div><div style="flex:1;font-size:12px;line-height:1.5;color:#3C3660"><strong>How a circle works.</strong> One parent starts it, invites parents they know, and each links their own kids.</div></div>' +
      '<a href="#/parent" class="btn-ink" style="justify-content:space-between;padding:0 22px"><span>I\u2019m a parent: set up or run a circle</span>' + ico('chev', 22) + '</a>' +
      '<a href="#/signup" class="btn-glass" style="justify-content:space-between;padding:0 22px"><span>I\u2019m 13 to 17: join with my parent\u2019s code</span>' + ico('chev', 22) + '</a></div></div>';
  };

  screens.signup = function () {
    var step = S.step;
    var dots = '<div style="flex:1;display:flex;gap:6px;justify-content:center">' + [1, 2, 3].map(function (i) { return '<span class="dot-step' + (step >= i ? ' on' : '') + '"></span>'; }).join('') + '</div>';
    var head = '<div style="display:flex;align-items:center;gap:12px;padding:24px 20px 8px"><a href="#/" class="iconbtn" aria-label="Back">' + ico('back', 22) + '</a>' + dots + '<div style="width:40px"></div></div>';
    var body;
    if (step === 1) {
      body = '<div class="scroll" style="padding:12px 20px 20px;display:flex;flex-direction:column;gap:16px">' +
        '<div><h1 class="h" style="margin:0 0 6px;font-size:28px;line-height:1.1">Let’s set you up</h1><p class="sec" style="margin:0;font-size:13px;line-height:1.5">About a minute. Your parent or guardian finishes the last step.</p></div>' +
        '<div><label class="label" for="fname">First name</label><input id="fname" class="input" type="text" placeholder="e.g. Zoe" value="' + S.name + '" data-bind="name"></div>' +
        '<div><span class="label">How old are you?</span><div style="display:flex;gap:8px">' + [13, 14, 15, 16, 17].map(function (a) { return '<button type="button" class="pill' + (S.age === a ? ' on' : '') + '" style="flex:1;justify-content:center;min-height:48px;font-size:14px;background:' + (S.age === a ? '' : 'rgba(255,255,255,.88)') + '" data-action="age" data-value="' + a + '">' + a + '</button>'; }).join('') + '</div></div>' +
        '<div><label class="label" for="suburb">Your suburb</label><input id="suburb" class="input" type="text" value="Dee Why"></div>' +
        '<div><label class="label" for="school">School (only your parent and Hustl see this)</label><input id="school" class="input" type="text" placeholder="e.g. Cromer Campus"></div>' +
        '<div class="mintcard" style="padding:14px;display:flex;gap:10px;font-size:12px;line-height:1.5">' + ico('shield', 20, 'color:#047857;flex-shrink:0') + '<div>Only your first name, suburb and rating are shown to people who post jobs.</div></div></div>' +
        '<div style="padding:12px 20px 24px"><button type="button" class="btn-ink" data-action="step" data-value="2">Next: parent check ' + ico('chev', 20) + '</button></div>';
    } else if (step === 2) {
      function tog(label, on, first) { return '<label class="row" style="min-height:54px;justify-content:space-between;cursor:pointer;' + (first ? '' : 'border-top:1.5px solid rgba(42,36,64,.1)') + '"><span style="font-weight:600;font-size:14px">' + label + '</span><input class="check" type="checkbox"' + (on ? ' checked' : '') + '></label>'; }
      body = '<div class="scroll" style="padding:12px 20px 20px;display:flex;flex-direction:column;gap:16px">' +
        '<div><h1 class="h" style="margin:0 0 6px;font-size:28px;line-height:1.1">Your parent’s circle code</h1><p class="sec" style="margin:0;font-size:13px;line-height:1.5">Your mum or dad got a code when they joined a circle. It links you to them and to every family they trust. That circle is the only place you’ll see jobs.</p></div>' +
        '<div><label class="label" for="ccode">Circle code</label><input id="ccode" class="input" type="text" value="CURL-2481" style="font-weight:800;letter-spacing:.08em"></div>' +
        '<div class="glass" style="padding:12px 14px;display:flex;align-items:center;gap:12px"><div class="avatar" style="width:40px;height:40px;background:#D6F2E7;font-size:12px">KL</div><div style="flex:1"><div class="h" style="font-size:14px">Curl Curl Crew</div><div class="sec" style="font-size:12px">Started by Kate L. · 6 families · 9 kids</div></div><span class="tag tag-mint">Found ✓</span></div>' +
        '<div><label class="label" for="pemail">Parent’s email, to confirm it’s you</label><input id="pemail" class="input" type="email" value="kate.lawson@email.com"></div>' +
        '<div class="glass" style="padding:4px 16px">' + tog('Parent sees my bookings', true, true) + tog('Share live location during a job', true) + tog('Parent gets a copy of messages', false) + '</div></div>' +
        '<div style="padding:12px 20px 24px;display:flex;gap:10px"><button type="button" class="btn-glass" style="flex:0 0 100px" data-action="step" data-value="1">Back</button><button type="button" class="btn-ink" style="flex:1" data-action="step" data-value="3">Ask Mum to approve</button></div>';
    } else {
      body = '<div class="scroll" style="padding:30px 24px 20px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:16px">' +
        '<div class="ring pop" style="margin-top:20px"><div class="arc" style="background:conic-gradient(#047857 0 25%,rgba(42,36,64,.1) 25% 100%)"></div><div class="disc">' + S.name.slice(0, 1).toUpperCase() + 'L</div><div class="badge">' + ico('check', 12, 'stroke-width:3') + '</div></div>' +
        '<h1 class="h" style="margin:0;font-size:30px;line-height:1.1">You’re in, ' + S.name + '</h1>' +
        '<p class="sec" style="margin:0;font-size:13px;line-height:1.55">Kate just got a ping to approve you into Curl Curl Crew. Browse now. Offers go live the moment she taps yes.</p>' +
        '<div class="glass" style="width:100%;padding:14px;display:flex;gap:12px;align-items:center;text-align:left"><div class="tile" style="width:46px;height:46px;background:#EDE9FE">' + ico('spark', 22, 'color:#6D28D9') + '</div><div><div class="h" style="font-size:14px">Your circle: Curl Curl Crew</div><div class="sec" style="font-size:12px">5 adults your mum knows can post jobs to you. Nobody else can.</div></div></div></div>' +
        '<div style="padding:12px 20px 24px"><a href="#/browse" class="btn-ink">See jobs near you ' + ico('chev', 20) + '</a></div>';
    }
    return '<div class="screen">' + head + body + '</div>';
  };

  screens.browse = function () {
    var f = S.filter, c = S.circle;
    var list = TASKS.filter(function (t) {
      if (c !== 'all' && t.circle !== c) return false;
      if (f === 'walk') return parseFloat(t.km) <= 2.5;
      if (f === 'weekend') return t.weekend;
      if (f === 'pay') return t.pay >= 30;
      return true;
    });
    var pins = TASKS.filter(function (t) { return c === 'all' || t.circle === c; }).map(function (t) {
      var on = S.selected === t.id;
      return '<button type="button" class="pin' + (on ? ' on' : '') + '" style="left:' + t.px + 'px;top:' + t.py + 'px" data-action="pin" data-value="' + t.id + '" aria-label="' + t.title + ', $' + t.pay + '">$' + t.pay + '</button>';
    }).join('');
    var filters = [['walk', 'Walkable'], ['weekend', 'This weekend'], ['pay', '$30+'], ['all', 'All']];
    var circles = [['all', 'All circles']].concat(CIRCLES.map(function (x) { return [x.id, x.name]; }));
    var where = c === 'all' ? 'in your circles' : 'in ' + circleOf(c).name;
    var heading = (f === 'walk' ? list.length + ' walkable jobs ' : f === 'weekend' ? list.length + ' weekend jobs ' : f === 'pay' ? list.length + ' jobs paying $30+ ' : list.length + ' jobs ') + where;
    return '<div class="screen">' + mapLines(pins) +
      '<div style="position:relative;padding:24px 20px;display:flex;align-items:center;justify-content:space-between"><div class="pill-glass" style="font-size:15px;font-weight:800;padding:10px 16px">hustl \u2726</div><a href="#/circles" class="pill-glass" style="color:inherit">' + ico('shield', 14, 'color:#047857') + '2 circles \u00b7 10 adults</a></div>' +
      '<div class="sheet' + (S.view === 'list' ? ' full' : '') + '"><div class="handle"></div>' +
      '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px"><div class="h" style="font-size:17px;line-height:1.2">' + heading + '</div><button type="button" class="sec" style="border:0;background:none;font-size:12px;font-weight:700;cursor:pointer;padding:6px 0;min-height:32px;white-space:nowrap" data-action="view">' + (S.view === 'map' ? 'Map \u2194 List' : 'List \u2194 Map') + '</button></div>' +
      '<div class="hscroll" style="margin-top:12px">' + circles.map(function (x) { return '<button type="button" class="pill' + (x[0] === c ? ' on' : '') + '" style="' + (x[0] === c ? '' : 'background:#D6F2E7;color:#0B4A33') + '" data-action="circle" data-value="' + x[0] + '">' + (x[0] === 'all' ? '' : ico('shield', 13)) + x[1] + '</button>'; }).join('') + '</div>' +
      '<div class="hscroll" style="margin-top:8px">' + filters.map(function (x) { return '<button type="button" class="pill' + (x[0] === f ? ' on' : '') + '" data-action="filter" data-value="' + x[0] + '">' + x[1] + '</button>'; }).join('') + '</div>' +
      '<div style="margin-top:14px;display:flex;flex-direction:column;gap:10px">' + list.map(function (t) { return jobCard(t, S.selected === t.id); }).join('') +
      (list.length === 0 ? '<div class="dashed">No jobs match yet. Try another filter \u2192</div>' : '') +
      '<div class="dashed" style="cursor:default">Every job here was posted by an adult a parent in your circle invited.</div></div></div>' + nav('Browse') + '</div>';
  };

  screens.task = function (id) {
    var t = TASKS.filter(function (x) { return x.id === +id; })[0] || TASKS[0];
    var applied = !!S.applied[t.id];
    var cta = applied
      ? '<div class="btn-ink" style="flex:2.2;background:' + (approved(t.id) ? '#047857' : '#B45309') + ';box-shadow:none">' + (approved(t.id) ? 'Mum approved ✓ You’re booked' : 'Offer sent · waiting on Mum ⏳') + '</div>'
      : '<button type="button" class="btn-ink" style="flex:2.2" data-action="apply" data-value="' + t.id + '">Offer to help · $' + t.pay + '</button>';
    var sheet = sheetFor === t.id ? '<div class="overlay" data-action="closeSheet"><div class="card"><div class="bigdisc pop" style="background:#B9F5D8">' + ico('check', 54, 'stroke-width:3;color:#0B4A33') + '</div>' +
      '<div class="h" style="font-size:26px">Offer sent</div><p class="body" style="margin:0;font-size:13px;line-height:1.55">' + t.poster.split(' ')[0] + ' has your offer and Mum just got a ping. Once she taps approve you’re booked. Usually under 5 min.</p>' +
      '<a href="#/jobs" class="btn-ink">Watch it in My jobs</a><a href="#/browse" class="btn-glass">Keep browsing</a></div></div>' : '';
    var pinHero = '<div class="map" style="background:#DCD6F2"><i style="left:-30px;top:60px;width:300px;height:3px;transform:rotate(14deg)"></i><i style="left:120px;top:-20px;width:3px;height:260px;transform:rotate(-10deg)"></i><i style="left:200px;top:100px;width:240px;height:3px;transform:rotate(-6deg)"></i></div>' +
      '<div class="pin on" style="left:170px;top:80px;font-size:14px;width:56px;height:56px;border-radius:20px;margin:0">$' + t.pay + '</div>' +
      '<a href="#/browse" class="iconbtn" style="position:absolute;left:20px;top:18px" aria-label="Back">' + ico('back', 20) + '</a>' +
      '<div class="pill-glass" style="position:absolute;right:20px;bottom:14px;font-size:11px;padding:6px 12px;min-height:0">' + t.suburb + ' · ' + t.km + ' km · ' + t.walk + '</div>';
    return '<div class="screen">' +
      '<div style="position:relative;height:210px;flex-shrink:0;overflow:hidden;border-radius:0 0 28px 28px">' + pinHero + '</div>' +
      '<div class="scroll" style="padding:18px 20px 20px;display:flex;flex-direction:column;gap:14px">' +
      '<div><div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap"><span class="tag tag-lav">' + CAT[t.cat].label + '</span><span class="tag tag-mint">' + ico('shield', 11) + circleOf(t.circle).name + '</span><span class="tag tag-peach">' + t.chips[1][0] + '</span></div>' +
      '<h1 class="h" style="margin:0;font-size:24px;line-height:1.15">' + t.title + '</h1><div class="sec" style="font-size:13px;margin-top:4px">' + t.longWhen + ' · ' + t.dur + ' · ' + t.rate + '</div></div>' +
      '<div class="glass" style="padding:14px;display:flex;align-items:center;gap:12px"><div class="avatar" style="width:46px;height:46px;background:' + t.tint + ';font-size:13px">' + t.init + '</div><div style="flex:1"><div class="h" style="font-size:14px">' + t.poster + ' <span class="sec" style="font-weight:600">· ' + t.rel + '</span></div><div class="sec" style="font-size:12px">★ ' + t.rating + ' · ' + t.jobs + ' jobs posted · ' + circleOf(t.circle).name + '</div></div><button type="button" class="vio" style="border:0;background:none;font-size:12px;font-weight:700;cursor:pointer;min-height:44px;padding:0 6px">Chat</button></div>' +
      '<div class="mintcard" style="padding:14px;display:flex;gap:12px;align-items:flex-start"><div style="display:flex;flex-shrink:0;margin-top:2px"><div class="avatar" style="width:32px;height:32px;background:#fff;font-size:10px;border:2px solid #047857">' + t.init + '</div><div class="avatar" style="width:32px;height:32px;background:#B9F5D8;font-size:10px;border:2px solid #047857;margin-left:-8px">KL</div></div><div style="flex:1;font-size:12px;line-height:1.5"><strong>In your circle.</strong> ' + t.poster.split(' ')[0] + ' ' + (t.invitedBy === 'started the circle' ? 'started ' + circleOf(t.circle).name : 'was invited into ' + circleOf(t.circle).name + ' by ' + t.invitedBy) + ' in ' + t.joined + '. Only adults a parent vouches for can post here.</div></div>' +
      '<div class="glass" style="padding:14px"><div class="h" style="font-size:13px;margin-bottom:8px">What you’ll do</div><div class="body" style="font-size:13px;line-height:1.6">' + t.desc + '</div></div>' +
      '<div class="mintcard" style="padding:14px;display:flex;gap:12px;align-items:center"><div class="avatar" style="width:40px;height:40px;border:3px solid #047857;color:#047857;font-size:11px">M</div><div style="flex:1;font-size:12px;line-height:1.5"><strong>Offer sends Mum a ping.</strong> She approves from her circle screen, usually under 5 min.</div></div>' +
      '<div class="glass" style="padding:12px 14px;display:flex;gap:10px;align-items:center;font-size:12px;line-height:1.5" ><span class="sec">' + ico('eye', 18, 'color:#047857') + '</span><span class="body">Exact address is shared with you and Mum after approval. Live location is on while you’re there.</span></div></div>' +
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
        '<div class="h" style="font-size:18px;margin-top:10px">Wash and vacuum two cars</div><div style="font-size:12px;opacity:.75;margin-top:3px">Jenny M. · Collaroy · ' + (S.checkedOut ? 'done 11:38am · $40 released' : 'started 10:04am') + '</div>' +
        '<div style="display:flex;gap:8px;margin-top:14px"><button type="button" class="btn-dim">' + ico('chat', 14) + 'Message Jenny</button>' + (S.checkedOut ? (S.rated ? '<div class="btn-mint" style="cursor:default">Rated ★ ' + S.rating + '</div>' : '<a href="#/rate" class="btn-mint">Rate Jenny ★</a>') : '<button type="button" class="btn-mint" data-action="checkout">Check out ✓</button>') + '</div></div>' +
        '<div class="h" style="font-size:15px;margin-top:20px">This week</div><div class="rail" style="margin-top:12px">';
      if (!S.applied[4]) body += tlEntry(true, '<div class="glass" style="padding:14px"><div style="display:flex;justify-content:space-between"><div class="h" style="font-size:14px">Clear out the garage</div><div class="h vio" style="font-size:15px">$60</div></div><div class="sec" style="font-size:12px;margin-top:3px">Sat 1pm · Liz and Tom H. · <span class="grn" style="font-weight:700">Mum approved ✓</span></div></div>');
      appliedTasks.forEach(function (t) {
        body += tlEntry(approved(t.id), '<a href="#/task/' + t.id + '" class="glass" style="padding:14px;display:block;color:inherit"><div style="display:flex;justify-content:space-between"><div class="h" style="font-size:14px">' + t.title + '</div><div class="h vio" style="font-size:15px">$' + t.pay + '</div></div><div class="sec" style="font-size:12px;margin-top:3px">' + t.longWhen + ' · ' + t.poster + ' · ' + statusText(t) + '</div></a>');
      });
      body += tlEntry(false, '<a href="#/browse" class="dashed">Sunday’s free — 3 jobs open near you →</a>') + '</div>';
      var g = S.jars.guitar, pct = Math.min(100, Math.round((g + 100) / 450 * 100));
      body += '<div class="glass" style="border-radius:22px;padding:14px 16px;display:flex;align-items:center;gap:12px;margin-top:6px"><div class="tile" style="width:40px;height:40px;background:#EDE9FE">' + ico('music', 20, 'color:#6D28D9') + '</div><div class="body" style="flex:1;font-size:12px"><strong>$100 this weekend</strong> takes the guitar jar to ' + pct + '%</div><div class="bar" style="width:70px;height:10px"><div class="vio" style="width:' + pct + '%"></div></div></div>';
    } else {
      var done = [['Help clear out the garage', 'Sat 13 Sep · Liz and Tom H.', 60, 5], ['Wash and vacuum two cars', 'Sat 6 Sep · Jenny M.', 40, 5], ['Mow the front lawn', 'Sun 31 Aug · Raj P.', 35, 5], ['Walk Biscuit, 3 walks', 'Week of 25 Aug · Sam K.', 60, 4], ['Set up a new TV', 'Sat 16 Aug · Margaret W.', 25, 5]];
      body += '<div class="glass" style="margin-top:18px;padding:14px 16px;display:flex;align-items:center;gap:12px"><div class="h" style="font-size:26px">12</div><div class="sec" style="font-size:12px;line-height:1.4"><strong class="body">jobs done, $385 earned.</strong><br>Every one approved by Mum, paid on check-out.</div></div>';
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
      '<div class="glass" style="border-radius:22px;padding:16px;margin-top:12px;display:flex;gap:12px;align-items:center"><div class="avatar" style="width:46px;height:46px;border:3px solid #047857;color:#047857;font-size:12px">M</div><div class="body" style="flex:1;font-size:12px;line-height:1.5"><strong>Trust ring.</strong> Mum sees every booking and payout. She approved the garage job 20 min ago.</div></div>' +
      '</div>' + nav('Money') + jarSheet + '</div>';
  };

  screens.profile = function () {
    function chip(icn, label) { return '<span class="pill-glass" style="font-size:12px;padding:8px 14px;cursor:default">' + ico(icn, 16, 'color:#6D28D9') + label + '</span>'; }
    function quote(text, who) { return '<div class="glass" style="padding:14px"><div class="quote">“' + text + '”</div><div class="attr">' + who + ' · ★★★★★</div></div>'; }
    return '<div class="screen"><div class="scroll navpad" style="padding:26px 20px 96px">' +
      '<div style="display:flex;flex-direction:column;align-items:center;text-align:center"><div class="ring"><div class="arc"></div><div class="disc">' + S.name.slice(0, 1).toUpperCase() + 'L</div><div class="badge">' + ico('check', 12, 'stroke-width:3') + '</div></div>' +
      '<div class="h" style="font-size:24px;margin-top:12px">' + S.name + ' Lawson</div><div class="sec" style="font-size:13px;margin-top:2px">Dee Why · ' + S.age + ' · member since March</div>' +
      '<div style="display:flex;gap:8px;margin-top:10px"><span class="tag tag-mint">Parent linked ✓</span><span class="tag tag-lav">Trust ring 75%</span></div></div>' +
      '<div style="display:flex;gap:10px;margin-top:18px"><div class="glass stat"><div class="n">12</div><div class="l">jobs done</div></div><div class="glass stat"><div class="n">4.9★</div><div class="l">rating</div></div><div class="glass stat"><div class="n vio">$385</div><div class="l">earned</div></div></div>' +
      '<div class="h" style="font-size:15px;margin-top:18px">Good at</div><div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px">' + chip('car', 'Car washing') + chip('paw', 'Dog walking') + chip('leaf', 'Gardens') + chip('phone', 'Tech help') + '</div>' +
      '<div class="h" style="font-size:15px;margin-top:18px">What neighbours say</div><div style="margin-top:10px;display:flex;flex-direction:column;gap:10px">' + quote('Both cars spotless, and she was 10 minutes early. Booking again.', 'Jenny M. · Car wash') + quote('Biscuit loves her. Sends photos from the walk every time.', 'Sam K. · Dog walking') + quote('Straight lines, tidy edges, polite. Recommend.', 'Raj P. · Lawn') + '</div>' +
      '<div class="h" style="font-size:15px;margin-top:18px">Your circles</div><div style="margin-top:10px;display:flex;flex-direction:column;gap:10px">' + CIRCLES.map(function (x) { return '<a href="#/circles" class="glass" style="padding:14px;display:flex;align-items:center;gap:12px;color:inherit"><div class="tile" style="width:44px;height:44px;background:#D6F2E7">' + ico('shield', 22, 'color:#047857') + '</div><div style="flex:1"><div class="h" style="font-size:14px">' + x.name + '</div><div class="sec" style="font-size:12px">' + x.families + ' families · ' + x.kids + ' kids · started by ' + x.admin + '</div></div>' + ico('chev', 20, 'color:#5C5680') + '</a>'; }).join('') + '</div>' +
      '<div class="hero" style="border-radius:22px;padding:14px 16px;display:flex;align-items:center;gap:12px;margin-top:12px;box-shadow:var(--sh-cta)"><div class="avatar" style="width:40px;height:40px;background:#B9F5D8;color:#0B4A33;font-size:12px">K</div><div style="flex:1;font-size:12px;line-height:1.5;opacity:.9">Guardian: <strong>Kate Lawson</strong> · runs Curl Curl Crew · approves every booking</div><button type="button" style="border:0;background:none;color:#B9F5D8;font-size:12px;font-weight:700;cursor:pointer;min-height:44px">Manage</button></div>' +
      '</div>' + nav('Profile') + '</div>';
  };

  screens.rate = function () {
    if (S.rated) {
      return '<div class="screen">' + '<div class="topbar"><a href="#/jobs" class="iconbtn" aria-label="Back">' + ico('back', 20) + '</a><div class="h">Rate the job</div></div>' +
        '<div class="scroll" style="padding:40px 24px 20px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:16px"><div class="bigdisc pop" style="background:#EDE9FE;margin-top:20px">' + ico('star', 54, 'fill:#6D28D9;stroke:#6D28D9') + '</div><div class="h" style="font-size:28px;line-height:1.1">Thanks, ' + S.name + '</div><p class="sec" style="margin:0;font-size:13px;line-height:1.55">Saved. Jenny rated you 5 stars too, so your trust ring just went up.</p><span class="tag tag-lav" style="font-size:12px;padding:8px 14px">Trust ring 75% → 80%</span></div>' +
        '<div style="padding:12px 20px 24px;display:flex;flex-direction:column;gap:10px"><a href="#/earnings" class="btn-ink">Put the $40 in a jar</a><a href="#/jobs" class="btn-glass">Back to my jobs</a></div></div>';
    }
    var words = ['', 'Not great', 'Meh', 'Fine', 'Good', 'Awesome'];
    var tags = ['Friendly', 'Clear instructions', 'Paid promptly', 'Safe and respectful', 'Job as described', 'Would work again'];
    return '<div class="screen"><div class="topbar"><a href="#/jobs" class="iconbtn" aria-label="Back">' + ico('back', 20) + '</a><div class="h">Rate the job</div></div>' +
      '<div class="scroll" style="padding:4px 20px 20px;display:flex;flex-direction:column;gap:16px">' +
      '<div class="glass" style="display:flex;gap:12px;align-items:center;padding:14px">' + tile('car', 46, 22) + '<div style="flex:1"><div class="h" style="font-size:14px">Wash and vacuum two cars</div><div class="sec" style="font-size:12px">Jenny M. · Collaroy · today</div></div><div class="h grn" style="font-size:18px">+$40</div></div>' +
      '<div style="text-align:center"><div class="h" style="font-size:24px;margin-bottom:8px">How was Jenny?</div><div style="display:flex;justify-content:center;gap:4px">' + [1, 2, 3, 4, 5].map(function (i) { return '<button type="button" class="starbtn" aria-label="' + i + ' star' + (i > 1 ? 's' : '') + '" data-action="rating" data-value="' + i + '">' + star(40, i <= S.rating) + '</button>'; }).join('') + '</div><div class="sec" style="font-size:13px;font-weight:700;margin-top:4px;min-height:20px">' + words[S.rating] + '</div></div>' +
      '<div><span class="label">What stood out?</span><div style="display:flex;flex-wrap:wrap;gap:8px">' + tags.map(function (t) { return '<button type="button" class="pill' + (S.tags[t] ? ' on' : '') + '" style="' + (S.tags[t] ? '' : 'background:rgba(255,255,255,.88)') + '" data-action="tag" data-value="' + t + '">' + t + '</button>'; }).join('') + '</div></div>' +
      '<div><label class="label" for="note">Anything else? (optional)</label><textarea id="note" class="input" rows="3" placeholder="Was the job as described? Would you go back?"></textarea></div>' +
      '<div class="mintcard" style="padding:12px 14px;display:flex;gap:10px;font-size:12px;line-height:1.5">' + ico('eye', 18, 'color:#047857;flex-shrink:0') + '<div>Ratings show once both sides have rated, so nobody sees yours first.</div></div>' +
      '<a href="#/rate" style="font-size:12px;font-weight:700;color:#B45309;display:inline-flex;align-items:center;gap:6px;min-height:44px">' + ico('flag', 16) + 'Something went wrong? Report it privately</a></div>' +
      '<div style="padding:12px 20px 24px"><button type="button" class="btn-ink" data-action="sendRating"' + (S.rating ? '' : ' disabled style="opacity:.5;box-shadow:none"') + '>Send rating</button></div></div>';
  };

  screens.post = function () {
    var top = '<div class="topbar"><a href="#/" class="iconbtn" aria-label="Back">' + ico('back', 20) + '</a><div class="h">Post a job</div>' + parentPillPoster() + '</div>';
    if (S.posted) {
      return '<div class="screen">' + top + '<div class="scroll" style="padding:40px 24px 20px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:16px"><div class="bigdisc pop" style="background:#B9F5D8;margin-top:20px">' + ico('check', 54, 'stroke-width:3;color:#0B4A33') + '</div><div class="h" style="font-size:28px;line-height:1.1">Job posted</div><p class="sec" style="margin:0;font-size:13px;line-height:1.55">Teens in your chosen circles can see it now, and their parents got a heads-up. Most jobs get a first offer within the hour.</p>' +
        '<div class="glass" style="width:100%;padding:14px;display:flex;gap:12px;align-items:center;text-align:left">' + tile(S.postCat, 46, 22) + '<div style="flex:1"><div class="h" style="font-size:14px">Wash and vacuum two cars</div><div class="sec" style="font-size:12px">Sat 20 Sep · 10:00am · Collaroy</div></div><div class="h vio" style="font-size:18px">$' + S.pay + '</div></div></div>' +
        '<div style="padding:12px 20px 24px;display:flex;flex-direction:column;gap:10px"><a href="#/applicants" class="btn-ink">See who’s offered (3)</a><button type="button" class="btn-glass" data-action="editPost">Edit the job</button></div></div>';
    }
    var pay = S.pay;
    var hint = pay < 30 ? 'A bit low. Most car washes pay $30 to $45.' : pay > 45 ? 'Generous. Expect offers fast.' : 'In the sweet spot. Similar jobs pay $30 to $45.';
    function chk(label) { return '<label class="row" style="min-height:50px;cursor:pointer"><input class="check" type="checkbox" checked><span style="font-size:13px;font-weight:600">' + label + '</span></label>'; }
    return '<div class="screen">' + top +
      '<div class="scroll" style="padding:4px 20px 20px;display:flex;flex-direction:column;gap:16px">' +
      '<div><span class="label">Who can see this job</span><div style="display:flex;flex-wrap:wrap;gap:8px">' + CIRCLES.map(function (x) { var on = !!S.postCircles[x.id]; return '<button type="button" class="pill' + (on ? ' on' : '') + '" style="' + (on ? '' : 'background:rgba(255,255,255,.88)') + '" data-action="postCircle" data-value="' + x.id + '">' + ico('shield', 13) + x.name + ' · ' + x.kids + ' kids</button>'; }).join('') + '</div><div class="sec" style="font-size:12px;margin-top:6px">Only teens whose parents are in these circles will see it. There is no public listing.</div></div>' +
      '<div class="mintcard" style="padding:14px;display:flex;gap:10px;font-size:12px;line-height:1.5">' + ico('shield', 20, 'color:#047857;flex-shrink:0') + '<div>You’re posting to families who know you. Each teen’s parent still approves the booking. Keep it simple, safe and in daylight.</div></div>' +
      '<div><span class="label">What kind of job?</span><div style="display:flex;flex-wrap:wrap;gap:8px">' + Object.keys(CAT).map(function (k) { return '<button type="button" class="pill' + (k === S.postCat ? ' on' : '') + '" style="' + (k === S.postCat ? '' : 'background:rgba(255,255,255,.88)') + '" data-action="postCat" data-value="' + k + '">' + CAT[k].label + '</button>'; }).join('') + '</div></div>' +
      '<div><label class="label" for="jt">Job title</label><input id="jt" class="input" type="text" value="Wash and vacuum two cars"></div>' +
      '<div><span class="label">Pay</span><div style="display:flex;align-items:center;gap:10px"><button type="button" class="iconbtn" style="width:52px;height:52px;border-radius:16px" aria-label="Less pay" data-action="pay" data-value="-5">' + ico('minus', 22) + '</button><div class="glass" style="flex:1;min-height:52px;display:flex;align-items:center;justify-content:center"><span class="h vio" style="font-size:26px">$' + pay + '</span></div><button type="button" class="iconbtn" style="width:52px;height:52px;border-radius:16px" aria-label="More pay" data-action="pay" data-value="5">' + ico('plus', 22) + '</button></div><div class="sec" style="font-size:12px;margin-top:6px">' + hint + '</div></div>' +
      '<div style="display:flex;gap:10px"><div style="flex:1"><label class="label" for="dt">Date</label><input id="dt" class="input" type="date" value="2026-09-20"></div><div style="flex:1"><label class="label" for="tm">Start</label><input id="tm" class="input" type="time" value="10:00"></div></div>' +
      '<div><label class="label" for="sb">Suburb</label><input id="sb" class="input" type="text" value="Collaroy"></div>' +
      '<div><label class="label" for="ds">Describe the job</label><textarea id="ds" class="input" rows="3">Two cars in the driveway. Outside wash, wheels and a quick vacuum. I’ll be home the whole time.</textarea></div>' +
      '<div class="glass" style="padding:6px 16px"><div class="label" style="padding:10px 0 2px;margin:0">Safety check (all three required)</div>' + chk('Outdoors or in a shared space') + chk('No ladders, power tools or heavy lifting') + chk('An adult will be home during the job') + '</div>' +
      '<div class="sec" style="font-size:12px;line-height:1.5">Pay is held by Hustl when you book someone and released when the teen checks out. A 10% service fee is added at booking.</div></div>' +
      '<div style="padding:12px 20px 24px"><button type="button" class="btn-ink" data-action="post">Post job · $' + pay + '</button></div></div>';
  };
  function parentPillPoster() { return '<a href="#/parent" class="tag tag-mint">' + ico('shield', 11) + 'Curl Curl Crew</a>'; }

  screens.applicants = function () {
    var top = '<div class="topbar"><a href="#/post" class="iconbtn" aria-label="Back">' + ico('back', 20) + '</a><div class="h">Offers</div></div>';
    var head = '<div class="pad" style="padding-bottom:10px"><div class="glass" style="padding:12px 14px;display:flex;gap:12px;align-items:center">' + tile('car', 44, 20) + '<div style="flex:1"><div class="h" style="font-size:14px">Wash and vacuum two cars</div><div class="sec" style="font-size:12px">Sat 20 Sep · 10:00am · Collaroy · $' + S.pay + '</div></div></div></div>';
    var sel = PEOPLE.filter(function (p) { return p.id === S.chosen; })[0];
    if (sel) {
      var fee = Math.round(S.pay * 1.1);
      return '<div class="screen">' + top + head + '<div class="scroll" style="padding:24px 24px 20px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:16px">' +
        '<div class="ring pop" style="margin-top:10px"><div class="arc"></div><div class="disc" style="background:' + sel.tint + '">' + sel.init + '</div><div class="badge">' + ico('check', 12, 'stroke-width:3') + '</div></div>' +
        '<div class="h" style="font-size:28px;line-height:1.1">' + sel.first + ' is booked in</div><p class="sec" style="margin:0;font-size:13px;line-height:1.55">' + sel.first + '’s parent, someone in your circle, got the ping and approved. $' + fee + ' ($' + S.pay + ' plus fee) is held until ' + sel.first + ' checks out.</p>' +
        '<div class="glass" style="width:100%;padding:4px 16px;text-align:left"><div class="row" style="min-height:50px">' + ico('check', 18, 'color:#047857') + '<span style="font-size:13px;font-weight:600">Sat 20 Sep, 10:00am confirmed</span></div><div class="row" style="min-height:50px;border-top:1.5px solid rgba(42,36,64,.1)">' + ico('lock', 18, 'color:#047857') + '<span style="font-size:13px;font-weight:600">Payment held by Hustl</span></div><div class="row" style="min-height:50px;border-top:1.5px solid rgba(42,36,64,.1)">' + ico('star', 18, 'color:#6D28D9') + '<span style="font-size:13px;font-weight:600">You both rate each other after</span></div></div></div>' +
        '<div style="padding:12px 20px 24px;display:flex;flex-direction:column;gap:10px"><button type="button" class="btn-ink">' + ico('chat', 18) + 'Message ' + sel.first + '</button><button type="button" class="btn-glass" data-action="unchoose">Choose someone else</button></div></div>';
    }
    return '<div class="screen">' + top + head + '<div class="scroll" style="padding:4px 20px 20px;display:flex;flex-direction:column;gap:10px"><div class="h" style="font-size:15px">3 teens offered to help</div>' +
      PEOPLE.map(function (p) {
        return '<div class="glass" style="padding:14px;display:flex;flex-direction:column;gap:12px"><div style="display:flex;gap:12px;align-items:center"><div class="avatar" style="width:46px;height:46px;background:' + p.tint + ';font-size:13px">' + p.init + '</div><div style="flex:1"><div class="h" style="font-size:14px">' + p.name + '</div><div class="sec" style="font-size:12px">' + p.meta + '</div></div><div class="h" style="font-size:13px">★ ' + p.rating + '</div></div>' +
          '<div style="display:flex;gap:6px;flex-wrap:wrap"><span class="tag tag-mint">' + ico('shield', 11) + 'In your circle</span><span class="tag ' + p.cls + '">' + p.badge + '</span></div>' +
          '<div class="quote">“' + p.msg + '”</div>' +
          '<div style="display:flex;gap:8px"><button type="button" class="btn-glass" style="flex:0 0 52px;min-height:48px;padding:0;width:auto" aria-label="Message ' + p.name + '">' + ico('chat', 20) + '</button><button type="button" class="btn-ink" style="flex:1;min-height:48px;width:auto;box-shadow:none" data-action="choose" data-value="' + p.id + '">Choose ' + p.first + '</button></div></div>';
      }).join('') + '</div></div>';
  };

  screens.circles = function () {
    var cards = CIRCLES.map(function (x) {
      return '<div class="glass" style="border-radius:22px;padding:16px;display:flex;flex-direction:column;gap:12px">' +
        '<div style="display:flex;align-items:center;gap:12px"><div class="tile" style="width:46px;height:46px;background:#D6F2E7">' + ico('shield', 22, 'color:#047857') + '</div><div style="flex:1"><div class="h" style="font-size:15px">' + x.name + '</div><div class="sec" style="font-size:12px">' + x.families + ' families · ' + x.kids + ' kids · since ' + x.since + '</div></div></div>' +
        '<div class="sec" style="font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase">Adults who can post to you</div>' +
        '<div style="display:flex;flex-direction:column;gap:8px">' + x.members.map(function (m) { return '<div style="display:flex;align-items:center;gap:10px"><div class="avatar" style="width:34px;height:34px;background:' + m.tint + ';font-size:11px">' + m.init + '</div><div style="flex:1;min-width:0"><div style="font-weight:700;font-size:13px">' + m.name + ' <span class="sec" style="font-weight:600">· ' + m.rel + '</span></div><div class="sec" style="font-size:11px">' + m.role + '</div></div>' + (m.rel === 'Your mum' ? '<span class="tag tag-mint">Mum</span>' : '') + '</div>'; }).join('') + '</div>' +
        '<div class="sec" style="font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;margin-top:2px">Teens in this circle</div><div class="body" style="font-size:12px;line-height:1.5">' + x.teens.join(', ') + ' and ' + (x.kids - x.teens.length) + ' more</div></div>';
    }).join('');
    return '<div class="screen"><div class="scroll navpad" style="padding:26px 20px 96px;display:flex;flex-direction:column;gap:12px">' +
      '<div style="display:flex;justify-content:space-between;align-items:center"><div class="h" style="font-size:22px">Your circles</div>' + parentPill() + '</div>' +
      '<div class="mintcard" style="padding:14px;font-size:12px;line-height:1.5"><strong>Why you only see these people.</strong> A circle is a group of parents who know each other. Your mum is in two. Only adults inside them can post jobs to you, and every one of them was invited by a parent who vouches for them.</div>' +
      cards +
      '<div class="dashed" style="cursor:default">Know a family who should be in? Ask Mum to invite them from her circle screen.</div>' +
      '</div>' + nav('Profile') + '</div>';
  };

  screens.parent = function () {
    var x = CIRCLES[0];
    var pendingOffers = TASKS.filter(function (t) { return S.applied[t.id] && !approved(t.id); });
    var req = S.requests.ben;
    var needs = '';
    if (req !== 'ok' && req !== 'no') needs += '<div class="glass" style="padding:14px;display:flex;flex-direction:column;gap:10px"><div style="display:flex;align-items:center;gap:10px"><div class="avatar" style="width:40px;height:40px;background:#EDE9FE;font-size:12px">BT</div><div style="flex:1"><div class="h" style="font-size:14px">Ben T. wants to join</div><div class="sec" style="font-size:12px">Oscar’s dad · invited by Jenny M. · lives on Pitt Rd</div></div></div><div style="display:flex;gap:8px"><button type="button" class="btn-glass" style="min-height:44px;font-size:13px" data-action="request" data-value="no">Not now</button><button type="button" class="btn-ink" style="min-height:44px;font-size:13px;box-shadow:none" data-action="request" data-value="ok">Let Ben in</button></div></div>';
    pendingOffers.forEach(function (t) {
      needs += '<div class="glass" style="padding:14px;display:flex;flex-direction:column;gap:10px"><div style="display:flex;align-items:center;gap:10px">' + tile(t.cat, 40, 18) + '<div style="flex:1"><div class="h" style="font-size:14px">Zoe offered to help ' + t.poster.split(' ')[0] + '</div><div class="sec" style="font-size:12px">' + t.title + ' · ' + t.longWhen + ' · $' + t.pay + ' · ' + t.rel + '</div></div></div><div style="display:flex;gap:8px"><a href="#/task/' + t.id + '" class="btn-glass" style="min-height:44px;font-size:13px">See the job</a><button type="button" class="btn-ink" style="min-height:44px;font-size:13px;box-shadow:none" data-action="approveOffer" data-value="' + t.id + '">Approve ✓</button></div></div>';
    });
    if (!needs) needs = '<div class="dashed" style="cursor:default">Nothing waiting on you. Zoe’s next offer will show up here.</div>';
    var members = x.members.map(function (m) { return '<div class="list-row" style="min-height:52px"><div style="display:flex;align-items:center;gap:10px;min-width:0"><div class="avatar" style="width:34px;height:34px;background:' + m.tint + ';font-size:11px">' + m.init + '</div><div style="min-width:0"><div style="font-weight:700;font-size:13px">' + m.name + (m.rel === 'Your mum' ? ' (you)' : '') + '</div><div class="sec" style="font-size:11px">' + (m.rel === 'Your mum' ? 'Zoe’s mum' : m.rel) + ' · ' + m.role + '</div></div></div>' + (m.role === 'Started the circle' ? '<span class="tag tag-lav">Admin</span>' : '') + '</div>'; }).join('');
    if (req === 'ok') members += '<div class="list-row" style="min-height:52px"><div style="display:flex;align-items:center;gap:10px"><div class="avatar" style="width:34px;height:34px;background:#EDE9FE;font-size:11px">BT</div><div><div style="font-weight:700;font-size:13px">Ben T.</div><div class="sec" style="font-size:11px">Oscar’s dad · Invited by Jenny · joined just now</div></div></div><span class="tag tag-mint">New</span></div>';
    return '<div class="screen"><div class="topbar"><a href="#/" class="iconbtn" aria-label="Back">' + ico('back', 20) + '</a><div class="h">Your circle</div><span class="tag tag-lav">You run it</span></div>' +
      '<div class="scroll" style="padding:4px 20px 24px;display:flex;flex-direction:column;gap:12px">' +
      '<div class="hero" style="padding:18px"><div class="blob"></div><div style="display:flex;justify-content:space-between;align-items:flex-start"><span class="tag tag-mint2">' + ico('shield', 11) + 'Parent circle</span><span style="font-size:12px;opacity:.75">since ' + x.since + '</span></div><div class="h" style="font-size:22px;margin-top:10px">' + x.name + '</div><div style="font-size:12px;opacity:.75;margin-top:3px">' + x.families + ' families · ' + x.kids + ' kids · 5 adults who post jobs</div>' +
      '<div style="display:flex;gap:8px;margin-top:14px"><div class="btn-dim" style="cursor:default;flex-direction:column;gap:2px;line-height:1.2"><span style="font-size:10px;opacity:.7">Invite code</span><span style="font-size:15px;font-weight:800;letter-spacing:.08em">' + x.code + '</span></div><button type="button" class="btn-mint" data-action="copy">' + (S.copied ? 'Link copied ✓' : 'Share invite link') + '</button></div></div>' +
      '<div class="mintcard" style="padding:12px 14px;font-size:12px;line-height:1.5">Only invite parents you actually know. Anyone you let in can post jobs that every teen in the circle will see, and they can see your kids’ first names and ratings.</div>' +
      '<div class="h" style="font-size:15px;margin-top:4px">Needs your OK</div>' + needs +
      '<div class="h" style="font-size:15px;margin-top:4px">Parents and adults in the circle</div><div class="glass" style="padding:4px 14px">' + members + '</div>' +
      '<div class="h" style="font-size:15px;margin-top:4px">Teens</div><div class="glass" style="padding:14px;font-size:13px;line-height:1.6">' + x.teens.map(function (t) { return t.replace(' (you)', ' (yours)'); }).join(', ') + ' and 4 more. Each was linked by their own parent.</div>' +
      '<a href="#/post" class="btn-ink" style="margin-top:4px">' + ico('plus', 18) + 'Post a job to the circle</a>' +
      '<a href="#/circles" class="btn-glass">See it as Zoe sees it</a></div></div>';
  };

  // ---------- Actions ----------
  var actions = {
    age: function (v) { set({ age: +v }); },
    step: function (v) { set({ step: +v }); },
    filter: function (v) { set({ filter: v, selected: null }); },
    circle: function (v) { set({ circle: v, filter: 'all', selected: null }); },
    postCircle: function (v) { S.postCircles[v] = !S.postCircles[v]; if (!S.postCircles.curl && !S.postCircles.y10) S.postCircles[v] = true; save(); render(); },
    approveOffer: function (v) { S.approvedBy[+v] = true; save(); render(); },
    request: function (v) { S.requests.ben = v; save(); render(); },
    copy: function () { set({ copied: true }); },
    view: function () { set({ view: S.view === 'map' ? 'list' : 'map' }); },
    widen: function (v, el, ev) { ev.preventDefault(); set({ filter: 'all' }); },
    pin: function (v) {
      var id = +v; set({ selected: S.selected === id ? null : id, filter: 'all' });
      var card = document.getElementById('job-' + id); if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },
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
    postCat: function (v) { set({ postCat: v }); },
    pay: function (v) { set({ pay: Math.min(200, Math.max(10, S.pay + (+v))) }); },
    post: function () { set({ posted: true }); },
    editPost: function () { set({ posted: false }); },
    choose: function (v) { set({ chosen: +v }); },
    unchoose: function () { set({ chosen: null }); },
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
  });

  // ---------- Router ----------
  function route() {
    var h = (location.hash || '#/').replace(/^#\/?/, '');
    var parts = h.split('/');
    var name = parts[0] || 'welcome';
    if (name === 'task') return { screen: 'task', arg: parts[1] || 1, panel: '#/task/1' };
    if (!screens[name]) name = 'welcome';
    return { screen: name, panel: name === 'welcome' ? '#/' : '#/' + name };
  }
  var lastScreen = null, approveTimer = null;
  function render() {
    var r = route();
    if (r.screen !== lastScreen) { sheetFor = null; }
    lastScreen = r.screen;
    var app = document.getElementById('app');
    app.innerHTML = screens[r.screen](r.arg);
    if (r.screen !== 'browse') { var sc = app.querySelector('.scroll'); if (sc) sc.scrollTop = 0; }
    document.querySelectorAll('.panel-group a').forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === r.panel); });
    // Simulated guardian approval: re-render once pending offers flip to approved.
    clearTimeout(approveTimer);
    if (anyPending() && (r.screen === 'jobs' || r.screen === 'task')) approveTimer = setTimeout(render, APPROVE_MS + 200);
  }
  window.addEventListener('hashchange', render);
  render();
})();
