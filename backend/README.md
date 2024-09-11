# Installation
This is the installation process to ensure a functional backend
1. Ensure you have the following installed in your local machine
   - Python (3.12)
   - Conda/MiniConda
2. Create a conda environment from the yml file `conda env create -f environment.yml`
3. Run the conda environment in the terminal `conda activate stockwise`
4. You'll need to retrieve an API key from
   - [NewsAPI](https://newsapi.org/)
   - [Google Gemini](https://gemini.google.com/)
5. Based from `.env.template` create a `.env` file and plug in the API keys
6. Create a database on Firebase naming the collection `stocks`
7. In `firebase_config.py` update the path to the credentials certificate and add a json folder of your firebase credentials
8. Run `flask run` in the terminal

Following these steps will properly set up the backend 
