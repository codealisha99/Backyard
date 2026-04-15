// server.js
const express = require("express");
const redis = require("redis");

const app = express();
const client = redis.createClient();

client.connect();

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


const fixedWindowLimiter = async (req, res, next) => {
    const ip = req.ip;
    const key = `fixed:${ip}`;
  
    const requests = await client.incr(key);
  
    if (requests === 1) {
      await client.expire(key, 10); // 10 sec window
    }
  
    if (requests > 5) {
      return res.status(429).send("Too many requests ❌");
    }
  
    next();
  };
  
  app.get("/fixed", fixedWindowLimiter, (req, res) => {
    res.send("Fixed window success ✅");
  });

  const slidingWindowLimiter = async (req, res, next) => {
    const ip = req.ip;
    const key = `sliding:${ip}`;
    const now = Date.now();
    const windowSize = 10000; // 10 sec
  
    await client.zRemRangeByScore(key, 0, now - windowSize);
  
    const requests = await client.zCard(key);
  
    if (requests >= 5) {
      return res.status(429).send("Too many requests ❌");
    }
  
    await client.zAdd(key, [{ score: now, value: `${now}` }]);
    await client.expire(key, 10);
  
    next();
  };
  
  app.get("/sliding", slidingWindowLimiter, (req, res) => {
    res.send("Sliding window success ✅");
  });

  const tokenBucketLimiter = async (req, res, next) => {
    const ip = req.ip;
    const key = `bucket:${ip}`;
  
    const maxTokens = 5;
    const refillRate = 1; // tokens per second
  
    let data = await client.get(key);
  
    if (!data) {
      const newData = {
        tokens: maxTokens - 1,
        lastRefill: Date.now()
      };
      await client.set(key, JSON.stringify(newData));
      return next();
    }
  
    data = JSON.parse(data);
  
    const now = Date.now();
    const elapsed = (now - data.lastRefill) / 1000;
  
    const refill = Math.floor(elapsed * refillRate);
    data.tokens = Math.min(maxTokens, data.tokens + refill);
    data.lastRefill = now;
  
    if (data.tokens <= 0) {
      return res.status(429).send("Too many requests ❌");
    }
  
    data.tokens -= 1;
  
    await client.set(key, JSON.stringify(data));
  
    next();
  };
  
  app.get("/bucket", tokenBucketLimiter, (req, res) => {
    res.send("Token bucket success ✅");
  });