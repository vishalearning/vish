export async function handler(event, context) {
  try {
    const MAX_WHATSAPP = 10;

    const encodedLinks = [

      "aHR0cHM6Ly93YS5tZS85MTcwOTMwNDExMDU=",
      "aHR0cHM6Ly93YS5tZS85MTkwMTI2NTM5NDc=",
      "aHR0cHM6Ly93YS5tZS85MTk2NDE4NDU0NTM=",
      "aHR0cHM6Ly93YS5tZS85MTg5NDk4Njg4NzQ=",
      "aHR0cHM6Ly93YS5tZS85MTkzMDkwMjk2Nzg=",
      "aHR0cHM6Ly93YS5tZS85MTg3NTM5NzU2NDA=",
      "aHR0cHM6Ly93YS5tZS85MTcwMDQwNDg1NjM=",
      "aHR0cHM6Ly93YS5tZS85MTkxNjI3Njk0NTY=",
      "aHR0cHM6Ly93YS5tZS85MTkyNjY1NzY3NzI=",
      "aHR0cHM6Ly93YS5tZS85MTcwNDkyMzUyNjU=",
      "aHR0cHM6Ly93YS5tZS85MTg3Njc5MjYxMTc=",

      "aHR0cHM6Ly90Lm1lLytob29TVHFzem5UWmxZek0x"
    ];

    const decoded = encodedLinks.map(l => Buffer.from(l, "base64").toString("utf8").trim());
    const telegram = decoded.find(l => l.includes("t.me"));
    const whatsapps = decoded.filter(l => l.includes("wa.me"));

    const cookie = event.headers.cookie || "";
    let count = 0;
    const match = cookie.match(/shown=(\d+)/);
    if (match) count = parseInt(match[1]);

    if (count >= MAX_WHATSAPP) {
      return {
        statusCode: 302,
        headers: {
          Location: telegram,
          "Set-Cookie": "shown=0; Path=/;"
        }
      };
    }

    const randomWA = whatsapps[Math.floor(Math.random() * whatsapps.length)];

    return {
      statusCode: 302,
      headers: {
        Location: randomWA,
        "Set-Cookie": `shown=${count + 1}; Path=/;`
      }
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: "Server Error"
    };
  }
}
