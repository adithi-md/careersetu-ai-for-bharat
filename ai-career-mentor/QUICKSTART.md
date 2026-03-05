# 🚀 Quick Start Guide - Career Readiness AI

## Get Running in 5 Minutes

### Prerequisites
- Node.js 18+ installed
- npm or yarn
- Git (optional)

### Step 1: Install Dependencies (1 minute)

```bash
npm install
```

### Step 2: Start Development Server (30 seconds)

```bash
npm start
```

Your app will open at `http://localhost:3000`

### Step 3: Test the Application (2 minutes)

1. Fill out the profile form:
   - Department: Computer Science
   - Year: 3
   - Target Company: Amazon
   - Hours Per Day: 4
   - Months Available: 6

2. Click "Generate Intelligent Report"

3. View your personalized dashboard!

## Deploy to Vercel (2 minutes)

### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts
```

### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Click "Deploy"

Done! Your app is live at `https://your-project.vercel.app`

## Deploy to AWS (10 minutes)

### Prerequisites
- AWS Account
- AWS CLI configured

### Quick Deploy

```bash
# 1. Deploy infrastructure
aws cloudformation create-stack \
  --stack-name career-readiness-ai \
  --template-body file://infrastructure/cloudformation-template.yaml \
  --capabilities CAPABILITY_NAMED_IAM

# 2. Wait for completion (5-10 minutes)
aws cloudformation wait stack-create-complete \
  --stack-name career-readiness-ai

# 3. Build frontend
npm run build

# 4. Get bucket name
BUCKET=$(aws cloudformation describe-stacks \
  --stack-name career-readiness-ai \
  --query 'Stacks[0].Outputs[?OutputKey==`FrontendBucketName`].OutputValue' \
  --output text)

# 5. Upload to S3
aws s3 sync build/ s3://$BUCKET/ --delete

# 6. Get CloudFront URL
aws cloudformation describe-stacks \
  --stack-name career-readiness-ai \
  --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontURL`].OutputValue' \
  --output text
```

Your app is now live on AWS!

## Project Structure

```
career-readiness-ai/
├── src/
│   ├── Home.js          # Profile form page
│   ├── Report.js        # Dashboard page
│   └── App.js           # Main router
├── backend/
│   └── lambda/          # AWS Lambda functions
├── infrastructure/
│   └── cloudformation-template.yaml
└── README.md            # Full documentation
```

## Key Features

### 🤖 AI Analysis
- Calculates readiness score (0-100)
- Identifies skill gaps
- Generates personalized roadmap
- Projects 3-month improvement

### 📊 Dashboard
- Animated score counter
- Visual skill comparisons
- Company intelligence
- Preparation roadmap

### 🎨 Modern UI
- Glassmorphism design
- Smooth animations
- Responsive layout
- Professional aesthetics

## Common Commands

```bash
# Development
npm start              # Start dev server
npm test              # Run tests
npm run build         # Production build

# Deployment
vercel                # Deploy to Vercel
npm run deploy:aws    # Deploy to AWS (after setup)

# Utilities
npm install           # Install dependencies
npm run eject         # Eject from Create React App (not recommended)
```

## Troubleshooting

### Issue: Port 3000 already in use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3001 npm start
```

### Issue: Module not found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Build fails
```bash
# Check Node version (should be 18+)
node --version

# Update if needed
nvm install 18
nvm use 18
```

## Next Steps

1. ✅ Run locally and test
2. ✅ Deploy to Vercel for demo
3. ✅ Customize for your needs
4. ✅ Deploy to AWS for production
5. ✅ Add your own features

## Resources

- **Full Documentation**: See [README.md](README.md)
- **Architecture**: See [ARCHITECTURE.md](ARCHITECTURE.md)
- **Deployment Guide**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Project Summary**: See [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

## Support

Having issues? Check:
1. Node.js version (18+)
2. npm version (8+)
3. All dependencies installed
4. Port 3000 available

## Demo Video

[Link to demo video showing the complete user flow]

---

**Ready to help students prepare for their dream tech careers!** 🎯
