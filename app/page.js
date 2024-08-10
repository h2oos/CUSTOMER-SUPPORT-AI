'use client'
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState({
    role: 'chatbot',
    content: `Hi! I'm a basketball chatbot. Ask me questions you have about teams, players, games, stats, and other NBA-related topics`
  })
}
