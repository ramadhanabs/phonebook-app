export default function imageGenerator(type: "thumbs" | "notionists") {
  const seed = {
    thumbs: [
      "Bandit",
      "Bubba",
      "Lily",
      "Sammy",
      "Gizmo",
      "Leo",
      "Kiki",
      "Jasper",
      "Loki",
      "Charlie",
    ],
    notionists: [
      "Sammy",
      "Kiki",
      "Fluffy",
      "Jasper",
      "Leo",
      "Whiskers",
      "Charlie",
      "Zoe",
      "Cookie",
      "Abby",
    ],
  }

  const randomNumber = Math.floor(Math.random() * 5)

  return `https://api.dicebear.com/7.x/${type}/svg?seed=${seed[type][randomNumber]}`
}
