# Career Readiness AI - Deployment Guide

## 🚀 Quick Start Deployment Options

### Option 1: Deploy to Vercel (Fastest - 5 minutes)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow prompts**
   - Link to your Vercel account
   - Configure project settings
   - Deploy!

4. **Your app will be live at**: `https://your-project.vercel.app`

### Option 2: Deploy to AWS (Production-Ready)

#### Prerequisites
- AWS Account
- AWS CLI installed and configured
- Node.js 18+ installed

#### Step 1: Deploy Infrastructure

```bash
# Navigate to infrastructure folder
cd infrastructure

# Deploy CloudFormation stack
aws cloudformation create-stack \
  --stack-name career-readiness-ai-prod \
  --template-body file://cloudformation-template.yaml \
  --parameters ParameterKey=Environment,ParameterValue=prod \
  --capabilities CAPABILITY_NAMED_IAM

# Wait for stack creation (5-10 minutes)
aws cloudformation wait stack-create-complete \
  --stack-name career-readiness-ai-prod

# Get outputs
aws cloudformation describe-stacks \
  --stack-name career-readiness-ai-prod \
  --query 'Stacks[0].Outputs'
```

#### Step 2: Deploy Lambda Function

```bash
# Navigate to lambda folder
cd backend/lambda

# Install dependencies
npm install

# Create deployment package
zip -r function.zip .

# Deploy to Lambda
aws lambda update-function-code \
  --function-name analyzeCareerReadiness-prod \
  --zip-file fileb://function.zip
```

#### Step 3: Build and Deploy Frontend

```bash
# Build React app
npm run build

# Get S3 bucket name from CloudFormation outputs
BUCKET_NAME=$(aws cloudformation describe-stacks \
  --stack-name career-readiness-ai-prod \
  --query 'Stacks[0].Outputs[?OutputKey==`FrontendBucketName`].OutputValue' \
  --output text)

# Upload to S3
aws s3 sync build/ s3://$BUCKET_NAME/ --delete

# Get CloudFront distribution ID
DISTRIBUTION_ID=$(aws cloudformation describe-stacks \
  --stack-name career-readiness-ai-prod \
  --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDistributionId`].OutputValue' \
  --output text)

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*"
```

#### Step 4: Configure Environment Variables

```bash
# Get API endpoint
API_ENDPOINT=$(aws cloudformation describe-stacks \
  --stack-name career-readiness-ai-prod \
  --query 'Stacks[0].Outputs[?OutputKey==`ApiEndpoint`].OutputValue' \
  --output text)

# Create .env file
echo "REACT_APP_API_ENDPOINT=$API_ENDPOINT" > .env.production

# Rebuild with new endpoint
npm run build

# Re-upload to S3
aws s3 sync build/ s3://$BUCKET_NAME/ --delete
```

### Option 3: Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm start

# Open browser to http://localhost:3000
```

## 🏗️ Architecture Overview

```
User Browser
    ↓
CloudFront (CDN)
    ↓
S3 (Static Frontend)
    ↓
API Gateway
    ↓
Lambda Function
    ↓
DynamoDB (Storage)
    ↓
Amazon Bedrock (AI - Optional)
```

## 🔧 AWS Services Used

1. **Amazon S3** - Static website hosting
2. **CloudFront** - Content delivery network
3. **API Gateway** - RESTful API endpoint
4. **AWS Lambda** - Serverless compute
5. **DynamoDB** - NoSQL database
6. **Amazon Bedrock** - AI/ML inference (optional)

## 📊 Cost Estimation

### Free Tier (First 12 months)
- S3: 5GB storage, 20,000 GET requests
- Lambda: 1M requests, 400,000 GB-seconds
- DynamoDB: 25GB storage, 25 read/write units
- CloudFront: 50GB data transfer

### Expected Monthly Cost (after free tier)
- **Light usage** (100 users/day): $5-10/month
- **Medium usage** (1000 users/day): $20-40/month
- **Heavy usage** (10000 users/day): $100-200/month

## 🔐 Security Best Practices

1. **Enable HTTPS** - CloudFront provides free SSL
2. **API Rate Limiting** - Configure in API Gateway
3. **Input Validation** - Implemented in Lambda
4. **CORS Configuration** - Properly configured
5. **IAM Roles** - Least privilege access

## 🧪 Testing Deployment

```bash
# Test API endpoint
curl -X POST https://your-api-endpoint/prod/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "department": "Computer Science",
    "year": "3",
    "targetCompany": "Amazon",
    "hoursPerDay": 4,
    "monthsAvailable": 6
  }'

# Expected response
{
  "success": true,
  "data": {
    "readinessScore": { ... },
    "aiAnalysis": { ... }
  }
}
```

## 🐛 Troubleshooting

### Issue: CloudFront shows 403 error
**Solution**: Check S3 bucket policy allows public read access

### Issue: API returns CORS error
**Solution**: Verify API Gateway CORS configuration

### Issue: Lambda timeout
**Solution**: Increase timeout in Lambda configuration (max 15 minutes)

### Issue: Build fails
**Solution**: Clear node_modules and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📈 Monitoring

### CloudWatch Logs
```bash
# View Lambda logs
aws logs tail /aws/lambda/analyzeCareerReadiness-prod --follow

# View API Gateway logs
aws logs tail /aws/apigateway/CareerReadinessAPI-prod --follow
```

### Metrics to Monitor
- Lambda invocations
- API Gateway requests
- DynamoDB read/write capacity
- CloudFront cache hit ratio
- Error rates

## 🔄 CI/CD Pipeline (Optional)

### GitHub Actions Example

```yaml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      
      - name: Build React app
        run: |
          npm install
          npm run build
      
      - name: Deploy to S3
        run: |
          aws s3 sync build/ s3://your-bucket-name/ --delete
```

## 📞 Support

For issues or questions:
- Check CloudWatch logs
- Review AWS documentation
- Contact AWS support

## 🎯 Next Steps

1. ✅ Deploy infrastructure
2. ✅ Test API endpoints
3. ✅ Configure custom domain (optional)
4. ✅ Set up monitoring alerts
5. ✅ Enable AWS WAF for security (optional)
6. ✅ Integrate Amazon Bedrock for enhanced AI (optional)
