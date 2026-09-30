<!DOCTYPE html>
<html lang="bn"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>আল ইতকান ৪০ | Al-Itqan 40</title>
<link rel="icon" href="logo.jpg">
<link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;700&display=swap" rel="stylesheet">
<link href="style.css?v=3" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js"></script>
</head><body>
<div id="login" style="display:none"><h2 data-t="title"></h2><p class="sub" data-t="uni"></p>
<input id="em" type="email" placeholder="আপনার জিমেইল / Gmail" style="max-width:280px">
<input id="pw" type="password" placeholder="পাসওয়ার্ড / Password (min 6)" style="max-width:280px">
<div class="row" style="max-width:280px"><button class="btn" onclick="signIn()" data-t="login"></button><button class="btn ghost" onclick="signUp()" data-t="signup"></button></div>
<p id="err"></p><p class="meta" data-t="allow"></p></div>
<div class="hero"><div class="top"><span class="pill" id="role"></span><span><span class="pill" id="bell" onclick="go('notif')"></span><span class="pill" id="lang" onclick="toggleLang()"></span><span class="pill" onclick="sb.auth.signOut().then(()=>location.reload())">⎋ <span data-t="out"></span></span></span></div></div>
<div class="brand"><img src="logo.jpg" alt="Al-Itqan 40"><h1 data-t="title"></h1><div class="sub" data-t="uni"></div></div>
<nav id="nav"></nav><main id="view"></main><div id="toast"></div>
<script src="app1.js?v=3"></script>
<script src="app2.js?v=3"></script>
<script src="app3.js?v=3"></script>
<script src="app5.js?v=1"></script>
<script src="app6.js?v=1"></script>
<script src="app7.js?v=1"></script>
<script src="app8.js?v=1"></script>
</body></html>
