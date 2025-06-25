import os
import fitz  # PyMuPDF
import openai
from flask import Flask, render_template, request, flash

# --- Basic Flask App Setup ---
app = Flask(__name__)
# A secret key is needed for flashing messages (showing errors to the user)
app.config['SECRET_KEY'] = os.urandom(24) 

# --- OpenAI API Key Setup ---
# Get the API key from Render's environment variables
# Using a consistent name 'api_key' throughout the app
api_key = os.environ.get('MY_API_KEY')

# Check if the key exists and set up the OpenAI client
if not api_key:
    # This message is for you, in the logs
    print("CRITICAL ERROR: MY_API_KEY environment variable is not set.") 
    client = None
else:
    try:
        client = openai.OpenAI(api_key=api_key)
    except Exception as e:
        # This handles cases where the key is invalid
        print(f"Error initializing OpenAI client: {e}")
        client = None

# --- Helper Function ---
def extract_text_from_pdf(file_stream):
    """Extracts text from a PDF file stream (from an upload)."""
    text = ""
    try:
        # Open the PDF from the file stream in memory
        with fitz.open(stream=file_stream.read(), filetype="pdf") as doc:
            for page in doc:
                text += page.get_text()
    except Exception as e:
        print(f"Error extracting PDF text: {e}")
        return None
    return text

# --- Web Routes ---

# This route shows the main page with the upload form
@app.route('/')
def home():
    """Renders the main upload page."""
    return render_template('index.html')

# This route handles the file uploads and the analysis
@app.route('/analyze', methods=['POST'])
def analyze():
    """Handles the form submission, analyzes files, and shows results."""
    
    # 1. --- Check for API Key ---
    if not client:
        flash('Server is not configured correctly. Missing API Key.', 'danger')
        return render_template('index.html')

    # 2. --- Get Uploaded Files ---
    if 'resume' not in request.files or 'job_description' not in request.files:
        flash('Both resume and job description files are required.', 'danger')
        return render_template('index.html')

    resume_file = request.files['resume']
    job_file = request.files['job_description']

    if resume_file.filename == '' or job_file.filename == '':
        flash('Please select both files to upload.', 'danger')
        return render_template('index.html')

    # 3. --- Extract Text from PDFs ---
    resume_text = extract_text_from_pdf(resume_file)
    job_text = extract_text_from_pdf(job_file)

    if resume_text is None or job_text is None:
        flash('Could not read text from one of the PDF files. Please ensure they are valid PDFs.', 'danger')
        return render_template('index.html')
        
    # 4. --- Call OpenAI API ---
    prompt = f"""
        You are a highly skilled recruitment assistant.
        Compare the resume below to the job description and provide a detailed analysis.
        Structure your response in Markdown format with the following sections:
        - **Match Score**: A percentage score (e.g., 85%).
        - **Summary**: A brief paragraph explaining why the candidate is a strong or weak match.
        - **Matched Skills**: A bulleted list of skills and experiences from the resume that align with the job description.
        - **Missing Skills**: A bulleted list of key requirements from the job description that are not mentioned in the resume.
        - **Interview Questions**: Suggest 3 insightful interview questions to ask the candidate to probe their skills further.
        - **Resume Improvement Tips**: Provide 3 actionable tips for the candidate to improve their resume for this specific job.

        ---
        **Resume:**
        {resume_text}

        ---
        **Job Description:**
        {job_text}
    """

    try:
        # The 'analysis_result' variable will hold the text from OpenAI
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.5,
        )
        analysis_result = response.choices[0].message.content
    except Exception as e:
        print(f"Error calling OpenAI API: {e}")
        flash(f'An error occurred while contacting the AI service: {e}', 'danger')
        return render_template('index.html')

    # 5. --- Show the Result ---
    # We pass the result to the same 'index.html' template, which will now display it.
    return render_template('index.html', analysis_result=analysis_result)


# This part is only for running on your own computer.
# Render will use Gunicorn to run the app.
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000, debug=True)

