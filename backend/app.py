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
from firebase_config import create_stock_analysis, check_for_stock, read_stock_analysis, update_stock_analysis, delete_stock_analysis

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
#@app.route('/stock/<string:ticker>', methods=['GET'])
def get_stock_data(ticker):
    
    # Check to see if Stock is in FireBase First
    if check_for_stock(ticker):
    
        # Read Data and return to Front-End
        return read_stock_analysis(ticker)
    
    # If Stock not present, create entry in FireBase, then read and return to Front-End.
    else:
        # Fetch stock-related articles
        sample_size = 50
        articles = get_articles(ticker, sample_size, newsapi)

        # Generate response (description and sentiment)
        description, sentiment, action, positive, neutral, negative, price_per_stock = generate_response(articles, ticker, sample_size, model)
        date = datetime.today().strftime('%Y-%m-%d')

        # Create the entry in FireBase
        create_stock_analysis(ticker, description, sentiment, action, positive, neutral, negative, date, price_per_stock)

        # Read Data and return to Front-End
        return read_stock_analysis(ticker)