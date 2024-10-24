// openaiSummarizer.js
require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function summarizeText(text) {
    if (!text) {
        throw new Error('Text is required');
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: `Summarize the following text:\n\n${text} Your output will be given to user directly so don't output any extra information.` },
            ],
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error generating summary:', error);
    }
}

async function testSummarization() {
    try {
        const result = await summarizeText("Contribution comment:This sprint is currently ongoing. Here are some notes on Git and GitHub activity by user GavinZhengOI in the main/master branch during the time period 10/10/2024 12:30 to 10/29/2024 12:30. Contributions made under any other username or made without the required Git/GitHub configuration settings will not be counted in this or future work. Contributions: files modified: 0; lines of code added: 0; lines of code deleted: 0; commits: 0; number of pull requests opened: 0; number of pull requests merged: 1. When considering your level of contribution for this and future work, these raw numbers are first capped (current caps: files=5, lines-added=150, lines-deleted=30, num-commits=5, pull-requests-opened=3, pull-requests-merged=3, although these are subject to change) and then your capped scores are compared to the post-cap averages for everyone in the course (current post-cap averages: files=2, lines-added=29, lines-deleted=9, num-commits=1, pull-requests-opened=1, pull-requests-merged=1 - these are only final once the sprint period has ended). If you score equal or greater than the post-cap average on any of these metrics, you receive full credit for that metric. If you score lower than average on any given metric, your score on that metric is reduced proportionally. Your contribution scores, compared to the average, are: files=0%, lines-added=0%, lines-deleted=0%, num-commits=0%, pull-requests-opened=0%, pull-requests-merged=100%. In general these metrics are given equal weight in our interpretation of your overall quantity of contribution to an sprint. These contribution scores are reviewed and taken into consideration when grading the sprint. But they are not the only factor in determining your final grade, which also depends upon the quality of your work and whether it meets the given requirements.");
        console.log(result);
    } catch (error) {
        console.error('Error during summarization:', error);
    }
}

