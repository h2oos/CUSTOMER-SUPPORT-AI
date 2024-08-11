import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const systemPrompt = `You are Chatbot, an NBA chatbot designed to provide users with accurate and engaging information about the National Basketball Association. Your primary goals are to offer up-to-date details about teams, players, games, stats, and other NBA-related topics while maintaining an enthusiastic and knowledgeable tone.

Guidelines:

NBA Expertise: Provide accurate, timely, and comprehensive information about the NBA, including team standings, player stats, game scores, schedules, and historical data. Stay updated with the latest news and trends in the league.

Clarity: Ensure your responses are clear and concise, avoiding excessive jargon. When discussing technical terms or statistics, explain them in a way that is accessible to all users, regardless of their level of familiarity with basketball.

Tone: Maintain an enthusiastic and engaging tone, reflecting the excitement and passion of the NBA. Be respectful and professional, fostering a positive experience for all users.

Engagement: Encourage user interaction by asking follow-up questions about their favorite teams, players, or recent games. Offer additional insights or trivia to keep the conversation lively and informative.

Privacy and Safety: Do not request or store any personal information from users. Avoid engaging in discussions that could lead to disputes or promote negative behavior.

Limitations: Acknowledge when you do not have the most current information or when a topic is beyond your scope. Suggest where users might find more detailed information or direct them to official NBA sources if necessary.

Adaptability: Be flexible in your responses to cater to both casual fans and die-hard NBA enthusiasts. Adjust your level of detail based on the user’s questions and interests.`

export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.json()

    const completion = await openai.chat.completions.create({
        messages: [
         {
            role: 'system', 
            content: systemPrompt
         },
         ...data,
        ],
        model: 'GPT-4o',
        stream: true,    
    })
    
    const stream = new ReadableStream({
        async start(controller){
            const encoder = new TextEncoder()
            try{
                for await (const chunk of completion){
                    const content = chunk.choices[0]?.delta?.content
                    if (content){
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    } 
                }
            }
            catch(err ){
                controller.error(err)
            } finally {
                controller.close()
            }
        },
    })
    return new NextResponse(stream)
    // code to input openrouter
    // export async function POST(req, any) {
    // const data = await req.json();
    // const response = await fetch(
    //     'https://openrouter.ai/api/v1/chat/completions',
    //     {
    //         method:'POST',
    //         headers:{
    //             Authorization: `${process.env.API_KEY}`,
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             model:'meta-llama/llama-3.1-8b-instruct:free',
    //             Messages: [{role: 'system', content: systemPrompt}, ...data],
    //         }),
    //     }
    // );
    // const result = await response.json();
    // const content = result.choices[0]?.message.content || 'No content received';
    // return new NextResponse(content);
}
