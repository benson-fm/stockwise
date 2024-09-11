import firebase_admin
from firebase_admin import credentials, firestore

# Use the downloaded service account key JSON file
cred = credentials.Certificate("./stockwise-6aef4-firebase-adminsdk-hbpo8-683e7bb49e.json")

# Initialize the Firebase app with your credentials
firebase_admin.initialize_app(cred)

# Access Firestore
db = firestore.client()


def store_stock_analysis(ticker, description, sentiment, action, positive, neutral, negative, date):
    # Extract data from the Gemini response
    
    # Create a Firestore document reference based on stock ticker
    doc_ref = db.collection('stocks').document(ticker)

    # Data structure that matches your Firestore scheme
    data = {
        'action': action,
        'date': date,
        'description': description,
        'negative': negative,
        'neutral': neutral,
        'positive': positive,
        'sentiment': sentiment
    }

    # Set document data in Firestore
    doc_ref.set(data)
    print(f'Stock data for {ticker} stored in Firestore')