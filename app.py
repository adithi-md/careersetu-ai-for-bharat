import streamlit as st

st.set_page_config(page_title="CareerSetu AI", layout="wide")

st.title("CareerSetu – AI Career Mentor 🇮🇳")

st.markdown("""
CareerSetu is an AI-powered Campus-to-Career Co-Pilot designed for Tier-2 and Tier-3 engineering students in India.

It helps students become job-ready through:
- Personalized learning roadmaps
- Career recommendations
- Mock interview preparation
- Curated learning resources
""")

st.subheader("Career Interest Form")

name = st.text_input("Enter your name")
interest = st.text_input("What field are you interested in?")

if st.button("Get Career Suggestion"):
    if interest:
        st.success(f"Hello {name}! Based on your interest in **{interest}**, you could explore careers in AI, Data Science, Software Development, or Cloud Engineering.")
    else:
        st.warning("Please enter your interest.")

st.divider()

st.subheader("Project Repository")
st.markdown("GitHub: https://github.com/adithi-md/careersetu-ai-for-bharat")
