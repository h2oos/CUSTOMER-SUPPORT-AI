'use client'
import Image from 'next/image'
import { useState} from 'react'
import { Box } from '@mui/material'

export default function Home(){
  const [messages, setMessages] = useState({
    role: 'assistant',
    content: `Hi! I'm a basketball chatbot. Ask me questions you have about teams, players, games, stats, and other NBA-related topics` , 
  })

  const [message, setMessage] = useState('')
  
  return(
  <Box 
    width="100vh" 
    height="100vh" 
    display="flex" 
    flexDirection="column" 
    justifyContent="center" 
    alignItems="center"
  ></Box>)
} 
