import openai
import fitz
import os
from flask import Flask, render_template

api = os.environ.get('MY_API_KEY')


def extract_text_from_pdf(file_path):
    text = ""
    with fitz.open(file_path) as doc:
        for page in doc:
            text += page.get_text()
    return text

if not api_key:
    print("API Key not found. Please set the MY_API_KEY environment variable.")

@app.route('/')
def home():
    return render_template('index.html', api_key_for_html=api_key)
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

resume_path = input("Enter the path to your RESUME PDF file: ")
job_path = input("Enter the path to the JOB DESCRIPTION PDF file: ")
client = openai.OpenAI(api_key = api)

resume_text = extract_text_from_pdf(resume_path)
job_text = extract_text_from_pdf(job_path)

prompt = f"""
    You are a job matching assistant.
    Compare the resume below to the job description.
    Give a match score (out of 100), list matched skills, missing skills, and give 3 improvement tips.

    Resume:
    {resume_text}

    Job Description:
    {job_text}
    """

response = client.chat.completions.create(
    model="gpt-3.5-turbo",  # or gpt-4.1 paid
    messages=[{"role": "user", "content": prompt}],
    temperature=0.5,
)

print("\n\nResult:\n")
print(response.choices[0].message.content)
