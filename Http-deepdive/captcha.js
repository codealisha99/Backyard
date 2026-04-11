
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"></script>


async function submitWithCaptcha() {
  const token = await grecaptcha.execute('YOUR_SITE_KEY', { action: 'login' });
  
  const res = await fetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, captchaToken: token })
  });
}


// Backend verification
async function verifyCaptcha(token) {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET,
        response: token
      })
    });
    
    const data = await res.json();
    
    // Score: 1.0 = human, 0.0 = bot
    if (!data.success || data.score < 0.5) {
      throw new Error('CAPTCHA verification failed');
    }
    return true;
  }
  
  // Middleware
  async function captchaMiddleware(req, res, next) {
    try {
      await verifyCaptcha(req.body.captchaToken);
      next();
    } catch {
      res.status(403).json({ error: 'Bot detected' });
    }
  }