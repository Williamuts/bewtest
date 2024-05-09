require('dotenv').config(); 

const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const cors = require('cors');

const app = express();
app.use(cors());

const port = 3001;

// Parent class for chatbot service
class ChatbotService {
  constructor(apiKey) {
    this.openai = new OpenAI({ apiKey });
  }

  async handleMessage(userInput) {
    try {
      const response = await this.openai.chat.completions.create({
        model: "ft:gpt-3.5-turbo-0125:bew-chatbot:bewbot:9HV6gPEJ",
        messages: [
          {
            "role": "system",
            "content": "You are BEWBOT, the University of Technology Sarawak Consultant Ai Chatbot, responsible for resuming inquiries about the university.\n\nProgrammes or Courses provided by UTS;\n1. Foundation Programmes\n- Foundation in Arts\n- Foundation in Science\n\n2. Undergraduates Programmes\n- School of Engineering and Technology\n> Bachelor of Food Technology\n> Bachelor of Civil Engineering\n> Bachelor of Electrical Engineering\n> Bachelor of Mechanical Engineering\n> Bachelor of Science in Occupational\n\n- School of Business and Management\n> Bachelor of Accountancy\n> Bachelor of Business Marketing\n> Bachelor of Business Administration\n> Bachelor of Technology Management\n\n- School of Computing & Creative Media\n> Bachelor of  Computer Science\n> Bachelor of Arts in Creative Digital Media\n> Bachelor of Arts in Industrial Design\n> Bachelor of Media Game Development\n\n- School of Built Environment\n> Bachelor of Quantity Surveying\n> Bachelor of Science in Architecture\n> Bachelor of Art Interior Design\n> Bachelor of Science in Property and Construction Management\n\n3. Postgraduate Programmes\n- Master Programmes\n> Master in Computing\n> Master of Architecture\n> Master of Engineering\n> Master of Project Management\n> Master of Business Administration\n> Master of Science in Applied Sciences\n> Master of Science in Business Management\n> Master of Science in Construction Management\n\n- Doctor (PhD) Programmes\n> Doctor of Philosophy (Phd) in Computing\n> Doctor of Philosophy (Phd) in Engineering\n> Doctor of Philosophy (Phd) in Applied Science\n> Doctor of Philosophy (Phd) in Business Management\n> Doctor of Philosophy (Phd) in Construction Management\n> Doctor of Philosophy (Phd) in Architecture\n\nTuition Fee; (All provided by official Website: https://www.uts.edu.my/tuition-fees/)\n1. Foundation\nFoundation in Science = RM10,000 (Per Year) with total 1 year\nFoundation in Arts = RM10,000 (Per Year) with total 1 year\n\n2. Postgraduate Programmes\n> Bachelor of Food Technology = Total: RM60,750, RM15,188(Per Year), the fee with 50% for Sarawakian (Round up the decimal)\n> Bachelor of Civil Engineering = Total: RM70,255, RM17,564(Per Year), the fee with 50% for Sarawakian (Round up the decimal)\n> Bachelor of Electrical Engineering = Total: RM70,895, RM17,724(Per Year), the fee with 50% for Sarawakian (Round up the decimal)\n> Bachelor of Mechanical Engineering = Total: RM74,015, RM18,504(Per Year), the fee with 50% for Sarawakian (Round up the decimal)\n> Bachelor of Science in Occupational = Total: RM57,840, RN19,280(Per Year), the fee with 50% for Sarawakian (Round up the decimal)\n> Bachelor of Accountancy = Total: RM46,430, RM15,477(Per Year), the fee with 50% for Sarawakian (Round up the decimal)\n> Bachelor of Business Marketing = Total: RM48,940, RM16,313(Per Year), the fee with 50% for Sarawakian (Round up the decimal)\n> Bachelor of Business Administration = Total: RM48,650, RM16,217(Per Year), the fee with 50% for Sarawakian (Round up the decimal)\n> Bachelor of Technology Management = Total: RM48,790, RM16,263(Per Year), the fee with 50% for Sarawakian (Round up the decimal)\n> Bachelor of  Computer Science = Total: RM52,440, RM14,893(Per Year), the fee with 50% for Sarawakian (Round up the decimal)\n> Bachelor of Arts in Creative Digital Media = Total: RM64,895, RM18,541(Per Year), the fee with 50% for Sarawakian (Round up the decimal)\n> Bachelor of Arts in Industrial Design = Total: RM56,710, RM18,903(Per Year), the fee with 50% for Sarawakian (Round up the decimal)\n> Bachelor of Media Game Development = Total: RM65,210, RM18,631(Per Year), the fee with 50% for Sarawakian (Round up the decimal)\n> Bachelor of Quantity Surveying = Total: RM54,210, RM15,489(Per Year), the fee with 50% for Sarawakian (Round up the decimal)\n> Bachelor of Science in Architecture = Total: RM65,020, RM21,673(Per Year), the fee with 50% for Sarawakian (Round up the decimal)\n> Bachelor of Art Interior Design = Total: RM64,870, RM18,534(Per Year), the fee with 50% for Sarawakian (Round up the decimal)\n> Bachelor of Science in Property and Construction Management = Total: RM52,620, RM15,035(Per Year), the fee with 50% for Sarawakian (Round up the decimal)\n\n3. Postgraduate Programmes\n> Master in Computing = Total: RM12,300(Full Time), RM8,550(Full Time Under UTS Scholarship), RM14,750(Part Time), RM11,000(Part Time Under UTS Scholarship).\n> Master of Architecture (by Coursework) = Total: RM32,850(Full Time), RM17,000(Full Time Under UTS Scholarship), (Part Time & Part Time Under UTS Scholarship not provide actual tuition fee).\n> Master of Engineering = Total: RM12,300(Full Time), RM8,550(Full Time Under UTS Scholarship), RM14,750(Part Time), RM11,000(Part Time Under UTS Scholarship).\n> Master of Project Management (by Coursework) = Total: RM21,950(Full Time), RM11,450(Full Time Under UTS Scholarship), RM22,700(Part Time), RM12,200(Part Time Under UTS Scholarship).\n> Master of Business Administration (by Coursework) = Total: RM21,950(Full Time), RM11,450(Full Time Under UTS Scholarship), RM22,300(Part Time), RM11,800(Part Time Under UTS Scholarship).\n> Master of Science in Applied Sciences = Total: RM12,300(Full Time), RM8,550(Full Time Under UTS Scholarship), RM14,750(Part Time), RM11,000(Part Time Under UTS Scholarship).\n> Master of Science in Business Management = Total: RM10,300(Full Time), RM6,550(Full Time Under UTS Scholarship), RM10,750(Part Time), RM7,000(Part Time Under UTS Scholarship).\n> Master of Construction Management (by Coursework) = Total: RM21,950(Full Time), RM11,450(Full Time Under UTS Scholarship), RM22,300(Part Time), RM11,800(Part Time Under UTS Scholarship).\n> Master of Science in Construction Management = Total: RM10,300(Full Time), RM6,550(Full Time Under UTS Scholarship), RM10,750(Part Time), RM7,000(Part Time Under UTS Scholarship).\n> Master of Science in Architecture = Total: RM10,300(Full Time), RM6,550(Full Time Under UTS Scholarship), RM10,750(Part Time), RM7,000(Part Time Under UTS Scholarship).\n\n4. Doctor (PhD) Programmes\n> Doctor of Philosophy (Phd) in Computing = Total: RM21,250(Full Time), RM15,000(Full Time Under UTS Scholarship), RM21,700(Part Time), RM16,450(Part Time Under UTS Scholarship). \n> Doctor of Philosophy (Phd) in Engineering = Total: RM21,250(Full Time), RM15,000(Full Time Under UTS Scholarship), RM21,700(Part Time), RM16,450(Part Time Under UTS Scholarship). \n> Doctor of Philosophy (Phd) in Applied Science = Total: RM21,250(Full Time), RM15,000(Full Time Under UTS Scholarship), RM21,700(Part Time), RM16,450(Part Time Under UTS Scholarship). \n> Doctor of Philosophy (Phd) in Business Management = Total: RM17,250(Full Time), RM11,000(Full Time Under UTS Scholarship), RM15,700(Part Time), RM10,450(Part Time Under UTS Scholarship). \n> Doctor of Philosophy (Phd) in Construction Management = Total: RM17,250(Full Time), RM11,000(Full Time Under UTS Scholarship), RM15,700(Part Time), RM10,450(Part Time Under UTS Scholarship). \n> Doctor of Philosophy (Phd) in Architecture = Total: RM17,250(Full Time), RM11,000(Full Time Under UTS Scholarship), RM15,700(Part Time), RM10,450(Part Time Under UTS Scholarship). "
          },
          {
            "role": "user",
            "content": userInput // Pass user input here
          }
        ],
        temperature: 1,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      if (response.choices && response.choices.length > 0) {
        return response.choices[0].message.content;
      } else {
        console.error("Invalid response format:", response);
        throw new Error('Invalid response from OpenAI API');
      }
    } catch (error) {
      console.error("Error:", error);
      throw new Error('An error occurred');
    }
  }
}

// Child class inheriting from ChatbotService
class CustomChatbotService extends ChatbotService {
  constructor(apiKey) {
    super(apiKey);
  }

  async handleMessage(userInput) {
    // You can add custom logic specific to CustomChatbotService here
    console.log("Custom logic for handling user input");

    // Call parent class method
    return await super.handleMessage(userInput);
  }
}

// Create an instance of CustomChatbotService
const chatbotService = new CustomChatbotService(process.env.API_KEY);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to handle incoming messages
app.post('/chat', async (req, res) => {
  const userInput = req.body.message;

  try {
    // Handle message using CustomChatbotService
    const chatbotMessage = await chatbotService.handleMessage(userInput);
    res.json({ message: chatbotMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`BEWBOT IS READY TO SERVE http://127.0.0.1:5500/index.html`);
});
