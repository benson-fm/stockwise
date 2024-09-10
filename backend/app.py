# from newsapi import NewsApiClient
# import google.generativeai as genai
# import os
# from dotenv import load_dotenv, dotenv_values
# from textblob import TextBlob 

# load_dotenv() 

# genai.configure(api_key=os.getenv("GOOGLE_GEMINI_API_KEY"))
# model = genai.GenerativeModel("gemini-1.5-flash")

# # Init
# newsapi = NewsApiClient(api_key=os.getenv("NEWS_API_API_KEY"))


# stock = 'NFLX'
# all_articles = newsapi.get_everything(q=stock,
#                                       language='en',
#                                       sort_by='relevancy',
#                                       page=1,
#                                       page_size=10)

# # # /v2/top-headlines/sources
# # sources = newsapi.get_sources()
# contents = []
# # print(all_articles)
# articles = all_articles['articles']

# for article in articles:
#     contents.append(article['content'])

# print(contents)

# from textblob import TextBlob

# total = 0.0
# for content in contents:
#     blob = TextBlob(content)
#     print(blob.sentiment.polarity)
#     total += float(blob.sentiment.polarity)
# avg_polarity = total / 10
# print(f'polarity: {total / 10}')
# response = model.generate_content(f"You are a financial advisor giving advice to a client on whether to buy a specific stock, the stock is the {stock} stock and based off the the past month from 10 relevant news/article sources about the stock, they have been read through a sentiment reader in which it return {avg_polarity} which is based on a -1 to 1 scale where 1 is overwhelmingly positive and -1 is overwhelmingly negative. Provide them with the advice to buy, sell, or hold, don't address the score, this is some of the information from the news sources {contents}, give your reason on why you chose to buy, sell, or hold, and why you wouldn't do the other options. Do all of this in just two-three sentences")
# print(response.text)


from flask import Flask, jsonify
# from firebase_admin import credentials, firestore
# import firebase_admin
from stock_news import get_articles
from sentiment_analysis import generate_response
from newsapi import NewsApiClient
from datetime import datetime
import google.generativeai as genai
from dotenv import load_dotenv, dotenv_values
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)
# TODO
# Firebase Initialization 
# cred = credentials.Certificate("path/to/firebase/credentials.json")
# firebase_admin.initialize_app(cred)
# db = firestore.client()

load_dotenv()

newsapi = NewsApiClient(api_key=os.getenv("NEWS_API_API_KEY"))
genai.configure(api_key=os.getenv("GOOGLE_GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash") # Change for the version to the fine-tuned one

@app.route('/')
def home():
    return jsonify({"message": "Hello, World!"})


@app.route('/stocks/parse/<ticker>')
def get_stock_info(ticker):
    sample_size = 50
    try:
        # Fetch stock-related articles
        articles = get_articles(ticker, sample_size, newsapi)

        # Generate response (description and sentiment)
        description, sentiment, action, positive, neutral, negative = generate_response(articles, ticker, sample_size, model)
        date = datetime.today().strftime('%Y-%m-%d')
        # Structure and return the response as JSON
        return jsonify({
            "ticker": ticker,
            "sentiment": sentiment,
            "description": description,
            "action": action,
            "date": date, 
            "positive": positive,
            "neutral": neutral,
            "negative": negative 
        })

    except Exception as e:
        # Handle errors, return a meaningful message
        return jsonify({"error": str(e)}), 500


# @app.route('/stocks/<ticker>')
# def get_stock(ticker):
#     doc_ref = db.collection("stocks").document(ticker)
#     doc = doc_ref.get()
#     if doc.exists:
#         return jsonify(doc.to_dict())
#     return jsonify({"error": "Stock not found"})