from flask import Flask, jsonify
#from firebase_admin import credentials, firestore
#import firebase_admin

from stock_news import get_articles
from sentiment_analysis import generate_response
from newsapi import NewsApiClient
from datetime import datetime
import google.generativeai as genai
from dotenv import load_dotenv, dotenv_values
from flask_cors import CORS
import os
from firebase_config import store_stock_analysis

app = Flask(__name__)
CORS(app)
# TODO
# Firebase Initialization 
#cred = credentials.Certificate("path/to/firebase/credentials.json")
#firebase_admin.initialize_app(cred)
#db = firestore.client()

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

        store_stock_analysis(ticker, description, sentiment, action, positive, neutral, negative, date)

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