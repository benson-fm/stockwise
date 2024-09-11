# StockWise
<div align="center">
  <img alt="banner" src="https://github.com/benson-fm/stockwise/blob/main/frontend/src/assets/logoTitle.png">

  ### Stock sentiment analysis powered by Google Gemini
</div>


## Built with:
<div align="center">
  <img alt="Alt text" src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black"/>
  <img src=https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black>
  <img src=https://img.shields.io/badge/Tailwind%20CSS-06B6D4.svg?style=for-the-badge&logo=Tailwind-CSS&logoColor=white>
  <img alt="Alt text" src="https://img.shields.io/badge/DaisyUI-5A0EF8.svg?style=for-the-badge&logo=DaisyUI&logoColor=white" />
  <img src=https://img.shields.io/badge/Framer-0055FF.svg?style=for-the-badge&logo=Framer&logoColor=white>
  <img src=https://img.shields.io/badge/Vite-646CFF.svg?style=for-the-badge&logo=Vite&logoColor=white>
  <img src=https://img.shields.io/badge/Node.js-5FA04E.svg?style=for-the-badge&logo=nodedotjs&logoColor=white>
  <img src=https://img.shields.io/badge/Google%20Gemini-886FBF?style=for-the-badge&logo=googlebard&logoColor=fff alt="Google Gemini">
  <img src="https://img.shields.io/badge/Python-3776AB.svg?style=for-the-badge&logo=Python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/Flask-000000.svg?style=for-the-badge&logo=Flask&logoColor=white" alt="Flask">
  <img src=https://img.shields.io/badge/Firebase-DD2C00.svg?style=for-the-badge&logo=Firebase&logoColor=white>
  <img src=https://img.shields.io/badge/Anaconda-44A833.svg?style=for-the-badge&logo=Anaconda&logoColor=white>
  
</div>

## Overview
In today’s fast-paced stock market, investors are bombarded with vast amounts of news articles, social media posts, and financial reports related to various stocks. The challenge arises from the overwhelming volume of information, making it difficult for investors to assess the overall sentiment around a particular stock. Without a clear understanding of the sentiment (whether positive, negative, or neutral), investors may struggle to make informed decisions, potentially leading to missed opportunities or poor investments.

StockWise is an AI-powered tool designed to help investors make smarter decisions by analyzing the 50 most relevant news articles, reports, and social media posts related to a specific stock. With the overwhelming volume of information generated daily, it becomes nearly impossible for investors to stay on top of every relevant piece of news or understand the overall sentiment around a stock. StockWise simplifies this by leveraging advanced natural language processing (NLP) algorithms to filter, analyze, and interpret stock-related content through Google Gemini.

## Features
### Stock Sentiment Percentile Distribution
The Stock Sentiment Percentile Distribution feature offers a detailed visualization of the current market sentiment towards a stock, breaking down the overall sentiment into three categories: positive, neutral, and negative. This feature aggregates data from the 50 most relevant articles or reports and presents the percentage of each sentiment type. Investors can easily interpret this breakdown to understand the general market consensus. For instance, if 70% of the coverage is positive, the stock may have favorable news, while a higher percentage of negative sentiment might suggest concerns. The visual distribution helps users grasp market trends at a glance.

### Action Recommendations
The Action Recommendations feature provides clear investment guidance by analyzing sentiment and suggesting one of three actions: Buy, Sell, or Hold. Based on the sentiment analysis, market data, and performance indicators, the system offers a tailored recommendation to the investor. A recommendation to "Buy" may be triggered by a high positive sentiment and strong stock performance, while a "Sell" suggestion could result from significant negative news or financial instability. The "Hold" recommendation typically occurs when sentiment is mixed or neutral, advising users to wait before taking action. This feature simplifies decision-making by translating complex data into actionable steps.

### Stock Analysis
The Stock Analysis feature offers a concise, narrative summary of the overall news coverage and sentiment surrounding a stock. It analyzes the key drivers behind the stock’s current sentiment and explains why the market is responding positively, negatively, or neutrally. The feature dives deeper into the specific factors influencing the stock, such as financial performance, market trends, industry news, or external events. It also provides reasoning behind the recommended action (buy, sell, or hold), giving investors a holistic view of the stock’s situation. By providing both data and context, the Stock Analysis feature equips users with the knowledge needed to make informed investment decisions.

## Application Demo
https://github.com/user-attachments/assets/28d5a71a-0e7a-4e99-af01-05d11c646aee

## Installation
1. Install [Node.js](https://nodejs.org)
2. Clone the repository `git clone https://github.com/anonymous-himalayas/TrailQuest.git`
3. Get an API key for [Google Gemini](https://ai.google.dev/tutorials/get_started_web#set-up-project)
4. Enter your API key in `.env` (yes, the one in the file has expired!)
6. Install npm packages `npm install`
7. Start the development server `npm run dev` or create a production build `npm run build`
