const { execSync } = require('child_process');
const fs = require('fs');

try {
    console.log("1. Fetching current CloudFront configuration from AWS...");
    const output = execSync('aws cloudfront get-distribution-config --id E1P7YDKAOFILXM --output json', { encoding: 'utf8' });
    const parsed = JSON.parse(output);

    const config = parsed.DistributionConfig;
    const etag = parsed.ETag;

    const hasBackend = config.Origins.Items.some(o => o.Id === "EB-aim-backend");
    if (!hasBackend) {
        console.log("2. Wiring Elastic Beanstalk directly into CloudFront...");
        config.Origins.Quantity += 1;
        config.Origins.Items.push({
            "Id": "EB-aim-backend",
            "DomainName": "aim-backend-dev.eba-gsee7bgj.ca-central-1.elasticbeanstalk.com",
            "OriginPath": "",
            "CustomHeaders": { "Quantity": 0 },
            "CustomOriginConfig": {
                "HTTPPort": 80,
                "HTTPSPort": 443,
                "OriginProtocolPolicy": "http-only",
                "OriginSslProtocols": {
                    "Quantity": 3,
                    "Items": ["TLSv1", "TLSv1.1", "TLSv1.2"]
                },
                "OriginReadTimeout": 30,
                "OriginKeepaliveTimeout": 5
            },
            "ConnectionAttempts": 3,
            "ConnectionTimeout": 10
        });
    }

    console.log("3. Creating the /api/* routing security rules...");
    config.CacheBehaviors = {
        "Quantity": 1,
        "Items": [
            {
                "PathPattern": "/api/*",
                "TargetOriginId": "EB-aim-backend",
                "ViewerProtocolPolicy": "redirect-to-https",
                "AllowedMethods": {
                    "Quantity": 7,
                    "Items": ["HEAD", "DELETE", "POST", "GET", "OPTIONS", "PUT", "PATCH"],
                    "CachedMethods": {
                        "Quantity": 2,
                        "Items": ["HEAD", "GET"]
                    }
                },
                "ForwardedValues": {
                    "QueryString": true,
                    "QueryStringCacheKeys": { "Quantity": 0 },
                    "Cookies": { "Forward": "all" },
                    "Headers": {
                        "Quantity": 4,
                        "Items": ["Authorization", "Content-Type", "Accept", "Origin"]
                    }
                },
                "MinTTL": 0,
                "DefaultTTL": 0,
                "MaxTTL": 0,
                "Compress": true,
                "SmoothStreaming": false,
                "LambdaFunctionAssociations": { "Quantity": 0 },
                "FieldLevelEncryptionId": ""
            }
        ]
    };

    fs.writeFileSync('new-config.json', JSON.stringify(config, null, 2));

    console.log("4. Uploading new Architecture to AWS Global Servers...");
    execSync(`aws cloudfront update-distribution --id E1P7YDKAOFILXM --if-match ${etag} --distribution-config file://new-config.json`, {stdio: 'inherit'});
    
    console.log("\n✅ AMAZING! CloudFront is now proxying your backend!");
} catch (error) {
    console.error("Error updating CloudFront:", error.message);
}